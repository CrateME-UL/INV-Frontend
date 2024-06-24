import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getResponse } from '../API';
import { PlaceDto } from '../types/DtoType';
import { buildPlace } from '../factories/PlaceFactory';
import { Place } from '../models/Place';

export default function SelectLabels({
  fetchHandler,
}: {
  fetchHandler: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [itemName, setItemName] = React.useState('');
  const [places, setPlaces] = React.useState<Place[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setItemName(event.target.value);
    fetchHandler(event.target.value);
  };

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
    <div style={{ width: '100%', alignContent: 'flex-start' }}>
      <FormControl fullWidth={true}>
        <InputLabel id="demo-simple-select-helper-label">
          Lieu
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={itemName}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="Tous">
            <em>Tous</em>
          </MenuItem>
          {places.map((place) => (
            <MenuItem key={place.placeId} value={place.placeName}>
              {place.placeName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
