import { Place } from '../models/Place';
import { PlaceDto } from '../types/DtoType';

export const buildPlace = (place: PlaceDto): Place => {
  return new Place(place);
};
