import { NO_DATA_MESSAGE } from '../constants';
import { ItemDto } from '../types/DtoType';

export class Item {
  itemId: number | string;
  itemName: string;
  nbOfItems: number | string;
  placeId: number | string;

  constructor(item: ItemDto) {
    this.itemId = item.item_id || NO_DATA_MESSAGE;
    this.itemName = item.item_name || NO_DATA_MESSAGE;
    this.nbOfItems =
      item.nb_of_items !== undefined
        ? item.nb_of_items >= 0
          ? item.nb_of_items
          : NO_DATA_MESSAGE
        : NO_DATA_MESSAGE;
    this.placeId = item.place_id || NO_DATA_MESSAGE;
  }
}
