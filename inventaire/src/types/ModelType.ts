export type PlaceModel = {
  placeId: number;
  placeName: string;
  placeType: string;
};

export type ItemModel = {
  itemId: number;
  itemName: string;
  nbOfItems: number;
  placeId: number;
};
