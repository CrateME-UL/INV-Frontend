export type PlaceDto = {
  place_id: number | undefined;
  place_name: string | undefined;
  place_type: string | undefined;
};

export type ItemDto = {
  item_id: number | undefined;
  item_name: string | undefined;
  nb_of_items: number | undefined;
  place_id: number | undefined;
};
