import * as React from 'react';
import { getResponse } from '../API';
import { CustomDataGrid } from '../components/CustomDataGrid';
import { GridColDef } from '@mui/x-data-grid';
import { Place, PlaceDto, buildPlace } from '../models/Place';
import SelectFilter from '../components/SelectFilter';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface InventoryState {
  places: Place[];
  error: string | null;
  itemsName: string;
}

type InventoryAction =
  | { type: 'SET_PLACES'; payload: Place[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ITEM_NAME'; payload: string };

const initialState: InventoryState = {
  places: [],
  error: null,
  itemsName: '',
};

const placeReducer = (
  state: InventoryState,
  action: InventoryAction
): InventoryState => {
  switch (action.type) {
    case 'SET_PLACES':
      return { ...state, places: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ITEM_NAME':
      return { ...state, itemsName: action.payload };
    default:
      return state;
  }
};

const Places = () => {
  const [state, dispatch] = React.useReducer(
    placeReducer,
    initialState
  );
  const { places, error, itemsName } = state;

  const columns: GridColDef[] = [
    { field: 'placeName', headerName: 'Lieu', width: 260 },
  ];

  const handleFetchItems = async (
    path: string,
    filter: { [key: string]: string } | undefined
  ) => {
    try {
      const resultDto = await getResponse<PlaceDto[]>(path, filter);
      if (resultDto instanceof Error) {
        dispatch({
          type: 'SET_ERROR',
          payload:
            'Oopsie...Vérifier la connexion Internet et rafraîchir la page.',
        });
      } else {
        console.log(resultDto);
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
    handleFetchItems('places', undefined);
  }, []);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="left"
        sx={{ m: 1.5 }}
      >
        <Typography component="span">Inventaire par </Typography>
      </Box>
      <Box display="flex" alignItems="left" justifyContent="left">
        <SelectFilter
          label="Type d'objet"
          fetchHandler={(value) =>
            dispatch({
              type: 'SET_ITEM_NAME',
              payload: value as string,
            })
          }
        ></SelectFilter>
      </Box>
      <CustomDataGrid
        columns={columns}
        rows={places}
        error={error}
        getRowId={(place: Place) => place.placeId}
      ></CustomDataGrid>
    </>
  );
};

export default Places;
