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
  placeTypeFrench: string;
  placeTypeColor: string;

  constructor(place: PlaceDto) {
    this.placeId = place.place_id || NO_DATA_MESSAGE;
    this.placeName = place.place_name || NO_DATA_MESSAGE;
    this.placeType = place.place_type || NO_DATA_MESSAGE;
    this.placeTypeFrench = this.translatePlaceType(this.placeType);
    this.placeTypeColor = this.getPlaceTypeColor(this.placeType);
  }

  private translatePlaceType(placeType: string): string {
    switch (placeType) {
      case 'INV':
        return 'INV';
      case 'OUT':
        return 'EXT';
      case 'IN':
        return 'INT';
      default:
        return NO_DATA_MESSAGE;
    }
  }

  private getPlaceTypeColor(placeType: string): string {
    switch (placeType) {
      case 'INV':
        return '#D2B48C';
      case 'OUT':
        return '#98FB98';
      case 'IN':
        return '#FFB6C1';
      default:
        return '#A9A9A9';
    }
  }
}
