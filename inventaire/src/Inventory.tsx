import * as React from 'react';
import {
  ItemProps,
  ListProps,
  SearchProps,
  ItemType,
} from './types/types';
import { ItemDto } from './types/typesDto';
import { mapItemDtoToModels } from './mapper/mapperToComponent/ItemsMapperToComponent';
//TODO: add env variable for link to server

const welcome = {
  greeting: 'List by object types!',
};

const App = () => {
  const [items, setItems] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    fetch('http://0.0.0.0:3000/items')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  // const searchedItems = items.filter((item: ItemType) =>
  //   item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const searchedItems = items.filter((item: ItemDto) => {
    console.log(mapItemDtoToModels(item));
    const itemModel: ItemType = mapItemDtoToModels(item);
    return itemModel.itemName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Hello {welcome.greeting}</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedItems} />
    </div>
  );
};

const Search = ({ search, onSearch }: SearchProps) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={search}
        onChange={onSearch}
      />
    </div>
  );
};

const List = ({ list }: ListProps) => (
  <ul>
    {list.map((item) => (
      <Item key={item.itemId} item={item} />
    ))}
  </ul>
);

const Item = ({ item }: ItemProps) => (
  <li key={item.itemId}>
    <span>
      {item.itemName}: {item.nbOfItems}
    </span>
  </li>
);

export default App;
