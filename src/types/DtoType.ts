export type PlaceDto = {
  place_id: number;
  place_name: string;
  place_type: string;
};

export type ItemDto = {
  item_id: number;
  item_name: string;
  nb_of_items: number;
  place_id: number;
};
