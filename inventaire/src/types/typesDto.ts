export type ItemDto = {
    item_id: number;
    place_id: PlaceDto;
    nb_of_items: number;
    item_name: string;
  };
export type PlaceDto = {
    place_id: number;
    place_name: string;
    place_type: string;
};
