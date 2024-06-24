import { Item } from '../models/Item';
import { ItemDto } from '../types/DtoType';

export const buildItem = (item: ItemDto): Item => {
  return new Item(item);
};
