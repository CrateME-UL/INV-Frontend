import { ItemDto } from '../../types/typesDto';


export const mapItemDtoToModels = (item : ItemDto) => ({
    itemId: item.item_id,
    placeId: item.place_id,
    nbOfItems: item.nb_of_items,
    itemName: item.item_name,
});

