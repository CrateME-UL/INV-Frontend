export type PlaceType = {
  placeId: number;
  placeName: string;
  placeType: string;
};

export type ItemType = {
  itemId: number;
  place: PlaceType;
  nbOfItems: number;
  itemName: string;
};

export type ListProps = {
  list: ItemType[];
};

export type ItemProps = {
  item: ItemType;
};

export type SearchProps = {
  search: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};