import { ItemModel } from '../../types/ModelType';
import { ItemDto } from '../../types/DtoType';

export const ItemDtoToModel = (item: ItemDto): ItemModel => ({
  itemId: item.item_id,
  itemName: item.item_name,
  nbOfItems: item.nb_of_items,
  placeId: item.place_id,
});
