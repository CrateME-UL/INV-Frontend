import * as React from 'react';
import { getResponse } from '../API';
import { CustomDataGrid } from '../components/CustomDataGrid';
import { GridColDef } from '@mui/x-data-grid';
import { Item, ItemDto, buildItem } from '../models/Item';
import SelectFilter from '../components/SelectFilter';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface InventoryState {
  items: Item[];
  error: string | null;
  placeName: string;
}

type InventoryAction =
  | { type: 'SET_ITEMS'; payload: Item[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PLACE_NAME'; payload: string };

const initialState: InventoryState = {
  items: [],
  error: null,
  placeName: '',
};

const inventoryReducer = (
  state: InventoryState,
  action: InventoryAction
): InventoryState => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PLACE_NAME':
      return { ...state, placeName: action.payload };
    default:
      return state;
  }
};

const ItemInventory = () => {
  const [state, dispatch] = React.useReducer(
    inventoryReducer,
    initialState
  );
  const { items, error, placeName } = state;

  const columns: GridColDef[] = [
    { field: 'nbOfItems', headerName: 'Qte', width: 90 },
    { field: 'itemName', headerName: "Type d'objet", width: 260 },
  ];

  const handleFetchItems = async (
    path: string,
    filter: { [key: string]: string } | undefined
  ) => {
    try {
      const resultDto = await getResponse<ItemDto[]>(path, filter);
      if (resultDto instanceof Error) {
        dispatch({
          type: 'SET_ERROR',
          payload:
            'Oopsie...Vérifier la connexion Internet et rafraîchir la page.',
        });
      } else {
        console.log(resultDto);
        const items = resultDto.map(buildItem);
        console.log(items);
        dispatch({ type: 'SET_ITEMS', payload: items });
      }
    } catch {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Something went wrong...',
      });
    }
  };

  React.useEffect(() => {
    const filters = {
      place_name: placeName === 'Tous' ? '' : placeName,
    };
    handleFetchItems('items', filters);
  }, [placeName]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="left"
        sx={{ m: 1.5 }}
      >
        <Typography component="span">Inventaire</Typography>
      </Box>
      <Box display="flex" alignItems="left" justifyContent="left">
        <SelectFilter
          label="Lieu"
          fetchHandler={(value) =>
            dispatch({
              type: 'SET_PLACE_NAME',
              payload: value as string,
            })
          }
        ></SelectFilter>
      </Box>
      <CustomDataGrid
        columns={columns}
        rows={items}
        error={error}
        getRowId={(item: Item) => item.itemId}
      ></CustomDataGrid>
    </>
  );
};

export default ItemInventory;
