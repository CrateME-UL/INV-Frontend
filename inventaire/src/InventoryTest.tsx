import * as React from 'react';
import axios from 'axios';

//TODO: add env variable for link to server
//TODO: add components library and style UI
//TODO: refactor InventoryTest in seperate files
//TODO: add tests
//TODO: add places instead of numbers -> implement different request server side

const API_ENDPOINT = 'http://localhost:3000/items';

type ItemDto = {
  item_id: number;
  item_name: string;
  nb_of_items: number;
  place_id: number;
};

type ItemModel = {
  itemId: number;
  itemName: string;
  nbOfItems: number;
  placeId: number;
};

const ItemDtoToModel = (item: ItemDto): ItemModel => ({
  itemId: item.item_id,
  itemName: item.item_name,
  nbOfItems: item.nb_of_items,
  placeId: item.place_id,
});

const App = () => {
  const [items, setItems] = React.useState<ItemModel[]>([]);
  const fetchItems = async () => {
    try {
      const result = await axios.get(API_ENDPOINT);
      const itemModels: ItemModel[] = result.data.map(ItemDtoToModel);
      setItems(itemModels);
    } catch {
      console.log('Something went wrong ...');
    }
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <h1>Hello</h1>
      <button type="button" onClick={fetchItems}>
        fetch items
      </button>
      <List items={items} />
    </>
  );
};

const List = ({ items }: { items: ItemModel[] }) => (
  <ul>
    {items.map((item: ItemModel) => (
      <Item key={item.itemId} item={item} />
    ))}
  </ul>
);

const Item = ({ item }: { item: ItemModel }) => (
  <li key={item.itemId}>
    {item.nbOfItems} {item.itemName}: emplacement {'-> '}
    {item.placeId}
  </li>
);

export default App;
