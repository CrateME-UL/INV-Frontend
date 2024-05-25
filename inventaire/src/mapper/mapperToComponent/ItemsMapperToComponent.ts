import { ItemType } from '../../types/types';
import { ItemDto } from '../../types/typesDto';

export const mapItemDtoToModels = (item: ItemDto): ItemType => {
  console.log(item);
  const ItemDtoToModel: ItemType = {
    itemId: item.item_id,
    place: {
      placeId: item.place_id,
      placeName: 'item.place_name',
      placeType: 'item.place_id.place_type',
    },
    nbOfItems: item.nb_of_items,
    itemName: item.item_name,
  };
  console.log(ItemDtoToModel);
  return {
    itemId: item.item_id,
    place: {
      placeId: item.place_id,
      placeName: 'item.place_name',
      placeType: 'item.place_id.place_type',
    },
    nbOfItems: item.nb_of_items,
    itemName: item.item_name,
  };
};
