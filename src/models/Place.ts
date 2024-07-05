import { NO_DATA_MESSAGE } from '../constants';

export type PlaceDto = {
  place_id: number | undefined;
  place_name: string | undefined;
  place_type: string | undefined;
};

export const buildPlace = (place: PlaceDto): Place => {
  return new Place(place);
};

export class Place {
  placeId: number | string;
  placeName: string;
  placeType: number | string;

  constructor(place: PlaceDto) {
    this.placeId = place.place_id || NO_DATA_MESSAGE;
    this.placeName = place.place_name || NO_DATA_MESSAGE;
    this.placeType = place.place_type || NO_DATA_MESSAGE;
  }
}
