const welcome = {
  greeting: 'hey',
  title: 'React',
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
  return (
    <div>
      <h1>
        Hello {welcome.greeting} {welcome.title}
      </h1>
      <Search />
      <hr />
      <List list={stories} />
    </div>
  );
};

const Search = () => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event);
    console.log(event.target.value);
  };
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
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
};

const List = (props: ListProps) => (
  <ul>
    {props.list.map((item) => (
      <Item item={item} />
    ))}
  </ul>
);

type ItemProps = {
  item: Story;
};

export default App;
const Item = (props: ItemProps) => (
  <li key={props.item.objectID}>
    <span>
      <a href={props.item.url}>{props.item.title}</a> by{' '}
      {props.item.author}
    </span>
    <span>with {props.item.num_comments} comments </span>
    <span>and {props.item.points} points</span>
  </li>
);
