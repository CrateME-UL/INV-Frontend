export type PlaceModel = {
  placeId: number;
  placeName: string;
  placeType: string;
};

export type ItemModel = {
  itemId: string;
  itemName: string;
  nbOfItems: number;
  placeId: number;
};
