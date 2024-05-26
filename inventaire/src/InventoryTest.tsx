import * as React from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './styles/styles.module.css';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

const columnsTest: GridColDef[] = [
  { field: 'nbOfItems', headerName: 'Qte', width: 100 },
  { field: 'itemName', headerName: 'Type', width: 300 },
];

//TODO: add env variable for link to server
//TODO: add components library and style UI
//TODO: refactor InventoryTest in separate files
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
  const [error, setError] = React.useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const result = await axios.get(API_ENDPOINT);
      const itemModels: ItemModel[] = result.data.map(ItemDtoToModel);
      setItems(itemModels);
      setError(null);
    } catch {
      setError('Something went wrong...');
    }
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      {/* <ButtonAppBar /> */}
      <Box display="flex" alignItems="center" justifyContent="left">
        <IconButton aria-label="refresh" onClick={fetchItems}>
          <RefreshIcon />
        </IconButton>
        <Typography component="span">Inventaire</Typography>
      </Box>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className={styles.list}>
          <DataGrid
            rows={items}
            columns={columnsTest}
            getRowId={(row) => row.itemId}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      )}
    </>
  );
};

export function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default App;
