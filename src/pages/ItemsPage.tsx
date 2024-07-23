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
import Chip from '@mui/material/Chip';
import ChipFilter from '../components/ChipFilter';

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
  const optionLabelHandler = (option: Place) => option.placeName;

  const [selectedPlaceTypes, setSelectedPlaceTypes] = React.useState<
    string[]
  >(['INV', 'EXT', 'INT']);

  React.useEffect(() => {
    const filters: { [key: string]: string } | undefined = {
      place_name: '',
    };

    if (placeName !== 'Tous' && placeName !== '') {
      filters.place_name = placeName;
    }

    Object.keys(filters).forEach((key) => {
      if (filters[key] === '') {
        delete filters[key];
      }
    });

    handleFetchItems('inventory/items', filters);
    const translatePlaceType = (placeType: string) => {
      switch (placeType) {
        case 'INV':
          return 'INV';
        case 'OUT':
          return 'EXT';
        case 'IN':
          return 'INT';
        default:
          return 'UNKNOWN';
      }
    };
    if (placeName !== 'Tous' && placeName !== '') {
      const selectedPlace = places.find(
        (place) => place.placeName === placeName
      );
      if (selectedPlace) {
        setSelectedPlaceTypes([
          translatePlaceType(
            String(selectedPlace.placeType ?? 'UNKNOWN')
          ),
        ]);
      }
    } else {
      setSelectedPlaceTypes(['INV', 'EXT', 'INT']);
    }
  }, [placeName, places]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    setSelectedPlaceTypes((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((type) => type !== value)
    );
  };
  const getPlaceTypeColor = (placeType: string): string => {
    switch (placeType) {
      case 'INV':
        return '#D2B48C';
      case 'EXT':
        return '#98FB98';
      case 'INT':
        return '#FFB6C1';
      default:
        return '#A9A9A9';
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="left"
        justifyContent="left"
        sx={{ mb: 1, mt: 1 }}
      >
        <ChipFilter
          chips={selectedPlaceTypes}
          selectedChips={selectedPlaceTypes}
          handleCheckboxChange={handleCheckboxChange}
          getChipColor={getPlaceTypeColor}
          showDeleteIcon={false}
        />
      </Box>
      <Box
        display="flex"
        alignItems="left"
        justifyContent="left"
        sx={{ mb: 1 }}
      >
        <SelectFilter
          label="Lieu"
          options={[{ placeName: 'Tous' } as Place, ...places]}
          optionLabelHandler={optionLabelHandler}
          onChangeHandler={(value) => {
            dispatch({
              type: 'SET_PLACE_FILTER',
              payload: value as string,
            });
          }}
          renderOption={(props, option) => (
            <li {...props} key={optionLabelHandler(option)}>
              {option.placeName === 'Tous' ? (
                <>
                  <Chip
                    label="INV"
                    size="small"
                    sx={{
                      mr: 0.5,
                      backgroundColor: '#D2B48C',
                      color: 'black',
                      border: '1px solid black',
                      height: '24px',
                      width: '44px',
                    }}
                  />
                  <Chip
                    label="EXT"
                    size="small"
                    sx={{
                      mr: 0.5,
                      backgroundColor: '#98FB98',
                      color: 'black',
                      border: '1px solid black',
                      height: '24px',
                      width: '44px',
                    }}
                  />
                  <Chip
                    label="INT"
                    size="small"
                    sx={{
                      mr: 0.5,
                      backgroundColor: '#FFB6C1',
                      color: 'black',
                      border: '1px solid black',
                      height: '24px',
                      width: '44px',
                    }}
                  />
                </>
              ) : (
                <Chip
                  label={option.placeTypeFrench}
                  size="small"
                  sx={{
                    mr: 0.5,
                    backgroundColor: option.placeTypeColor,
                    color: 'black',
                    border: '1px solid black',
                    height: '24px',
                    width: '44px',
                  }}
                />
              )}
              <Typography>{option.placeName}</Typography>
            </li>
          )}
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
