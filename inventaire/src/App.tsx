import * as React from 'react';
import styles from './styles/styles.module.css';

const welcome = {
  greeting: 'hey',
  title: 'React',
};

const useStorageState = (key: string, initialState: string) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue] as const;
};

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React'
  );

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>
        Hello {welcome.greeting} {welcome.title}
      </h1>
      <InputWithLabel
        id="search"
        type="text"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      <List list={searchedStories} />
    </div>
  );
};

type InputWithLabelProps = {
  id: string;
  children: React.ReactNode;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWithLabel = ({
  id,
  value,
  children,
  type = 'text',
  onInputChange,
}: InputWithLabelProps) => (
  <div className={styles.search}>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      id={id}
      className={styles.input}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </div>
);

type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
};

type ListProps = {
  list: Story[];
};

const List = ({ list }: ListProps) => (
  <>
    <ul className={styles.list}>
      {list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  </>
);

type ItemProps = {
  item: Story;
};

const Item = ({ item }: ItemProps) => (
  <li key={item.objectID} className={styles.item}>
    <span className={styles.input}>
      <a href={item.url}>{item.title}</a> by {item.author}
    </span>
    <span>with {item.num_comments} comments </span>
    <span>and {item.points} points</span>
  </li>
);

export default App;
