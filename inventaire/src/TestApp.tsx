import * as React from 'react';

const welcome = {
  greeting: 'hey',
  title: 'React',
};

const App = () => {
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    fetch('http://127.0.0.1:5432/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const searchedUsers = users.filter((user: User) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>
        Hello {welcome.greeting} {welcome.title}
      </h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedUsers} />
    </div>
  );
};

type SearchProps = {
  search: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

type User = {
  id: number;
  username: string;
};

type ListProps = {
  list: User[];
};

const List = ({ list }: ListProps) => (
  <ul>
    {list.map((item) => (
      <Item key={item.id} item={item} />
    ))}
  </ul>
);

type ItemProps = {
  item: User;
};

const Item = ({ item }: ItemProps) => (
  <li key={item.id}>
    <span>
      {item.id}: {item.username}
    </span>
  </li>
);

export default App;
