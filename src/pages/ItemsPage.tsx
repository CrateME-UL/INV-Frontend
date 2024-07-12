import * as React from 'react';
import { getResponse } from '../API';
import { CustomDataGrid } from '../components/CustomDataGrid';
import { GridColDef } from '@mui/x-data-grid';
import {
  InventoryItem,
  InventoryItemDto,
  buildInventoryItem,
} from '../models/InventoryItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { buildPlace, Place, PlaceDto } from '../models/Place';
import { SelectFilter } from '../components/SelectFilter';

interface InventoryState {
  items: InventoryItem[];
  places: Place[];
  error: string | null;
  placeName: string;
}

type InventoryAction =
  | { type: 'SET_ITEMS'; payload: InventoryItem[] }
  | { type: 'SET_PLACES'; payload: Place[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PLACE_FILTER'; payload: string };

const initialState: InventoryState = {
  items: [],
  places: [],
  error: null,
  placeName: '',
};

const itemsReducer = (
  state: InventoryState,
  action: InventoryAction
): InventoryState => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_PLACES':
      return { ...state, places: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PLACE_FILTER':
      return { ...state, placeName: action.payload };
    default:
      return state;
  }
};

export const ItemsPage = () => {
  const [state, dispatch] = React.useReducer(
    itemsReducer,
    initialState
  );
  const { items, places, error, placeName } = state;

  const columns: GridColDef[] = [
    { field: 'nbOfItems', headerName: 'Qte', width: 90 },
    { field: 'itemName', headerName: "Type d'objet", width: 260 },
  ];

  const handleFetchPlaces = async (path: string) => {
    try {
      const resultDto = await getResponse<PlaceDto[]>(
        path,
        undefined
      );
      if (resultDto instanceof Error) {
        dispatch({
          type: 'SET_ERROR',
          payload:
            'Oopsie...Vérifier la connexion Internet et rafraîchir la page.',
        });
      } else {
        const places = resultDto.map(buildPlace);
        dispatch({ type: 'SET_PLACES', payload: places });
      }
    } catch {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Something went wrong...',
      });
    }
  };

  React.useEffect(() => {
    handleFetchPlaces('places');
  }, []);

  const handleFetchItems = async (
    path: string,
    filter: { [key: string]: string } | undefined
  ) => {
    try {
      const resultDto = await getResponse<InventoryItemDto[]>(
        path,
        filter
      );
      if (resultDto instanceof Error) {
        dispatch({
          type: 'SET_ERROR',
          payload:
            'Oopsie...Vérifier la connexion Internet et rafraîchir la page.',
        });
      } else {
        const items = resultDto.map(buildInventoryItem);
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
    if (placeName === 'Tous') {
      handleFetchItems('inventory/items', undefined);
      return;
    }
    handleFetchItems('inventory/items', filters);
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
          options={places}
          optionLabelHandler={(option) => option.placeName}
          onChangeHandler={(value) =>
            dispatch({
              type: 'SET_PLACE_FILTER',
              payload: value as string,
            })
          }
        ></SelectFilter>
      </Box>
      <CustomDataGrid
        columns={columns}
        rows={items}
        error={error}
        getRowId={(item: InventoryItem) => item.itemId}
      ></CustomDataGrid>
    </>
  );
};
