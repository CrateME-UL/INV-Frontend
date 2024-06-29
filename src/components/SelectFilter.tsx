import * as React from 'react';
import { getResponse } from '../API';
import { PlaceDto } from '../types/DtoType';
import { buildPlace } from '../factories/PlaceFactory';
import { Place } from '../models/Place';
import { Autocomplete, TextField, Box } from '@mui/material';

export default function SelectLabels({
  fetchHandler,
}: {
  fetchHandler: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [itemName, setItemName] = React.useState('');
  const [places, setPlaces] = React.useState<Place[]>([]);

  const handleFetchPlaces = async (path: string) => {
    try {
      const placesDto = await getResponse<PlaceDto[]>(path);
      if (!(placesDto instanceof Error)) {
        setPlaces(placesDto.map(buildPlace));
      }
    } catch (error) {
      console.error('Failed to fetch places', error);
    }
  };

  React.useEffect(() => {
    handleFetchPlaces('places');
  }, []);

  return (
    <Box sx={{ width: '100%', alignContent: 'flex-start' }}>
      <Autocomplete
        id="combo-box-demo"
        options={places}
        getOptionLabel={(option) => option.placeName}
        value={
          places.find((place) => place.placeName === itemName) || null
        }
        onChange={(_event, newValue) => {
          setItemName(newValue ? newValue.placeName : '');
          fetchHandler(newValue ? newValue.placeName : '');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Lieu"
            placeholder="Choisissez un lieu"
          />
        )}
        noOptionsText="Aucune option"
        fullWidth
      />
    </Box>
  );
}
