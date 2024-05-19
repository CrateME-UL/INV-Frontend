import * as React from 'react';
import styles from './styles/styles.module.css';

const welcome = {
  greeting: 'hey',
  title: 'React',
};

const initialStories = [
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
  const [stories, setStories] = React.useState(initialStories);

  const handleRemoveStory = (item: Story) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    setStories(newStories);
  };

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
        isFocused
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

type InputWithLabelProps = {
  id: string;
  children: React.ReactNode;
  value: string;
  type?: string;
  isFocused: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWithLabel = ({
  id,
  value,
  children,
  type = 'text',
  isFocused,
  onInputChange,
}: InputWithLabelProps) => {
  //ici on utilise une méthode impérative, bien que déclarative possible
  //(utile pour des cas spécifiques ou un certain rendu n'est pas possible, mais si possible: utiliser une méthode déclarative. Autrement dit, faire abstraction de la complexité)
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <div className={styles.search}>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        className={styles.input}
        type={type}
        value={value}
        autoFocus={isFocused}
        onChange={onInputChange}
      />
    </div>
  );
};

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
  onRemoveItem: (story: Story) => void;
};

const List = ({ list, onRemoveItem }: ListProps) => (
  <>
    <ul className={styles.list}>
      {list.map((item) => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </ul>
  </>
);

type ItemProps = {
  item: Story;
  onRemoveItem: (story: Story) => void;
};

const Item = ({ item, onRemoveItem }: ItemProps) => {
  // const handleRemoveItem = () => {
  //   onRemoveItem(item);
  // };

  return (
    <li key={item.objectID} className={styles.item}>
      <span className={styles.input}>
        <a href={item.url}>{item.title}</a> by {item.author}
      </span>
      <span>with {item.num_comments} comments </span>
      <span>and {item.points} points</span>
      {/* <span>
        <button type="button" onClick={handleRemoveItem}>
          Dismiss
        </button>
      </span> */}
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss (inline)
        </button>
      </span>
    </li>
  );
};

export default App;
