import { NO_DATA_MESSAGE } from '../constants';
import { PlaceDto } from '../types/DtoType';

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
