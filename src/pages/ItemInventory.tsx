import * as React from 'react';
import { getResponse } from '../API';
import { FetchSnackbar } from '../components/FetchSnackbar';
import { CustomDataGrid } from '../components/CustomDataGrid';
import { GridColDef } from '@mui/x-data-grid';
import { ItemDto } from '../types/DtoType';
import { buildItem } from '../factories/ItemFactory';
import { Item } from '../models/Item';

const ItemInventory = () => {
  const columns: GridColDef[] = [
    { field: 'nbOfItems', headerName: 'Qte', width: 90 },
    { field: 'itemName', headerName: "Type d'objet", width: 260 },
  ];
  const [items, setItems] = React.useState<Item[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [placeName, setPlaceName] = React.useState<string>('');
  const handleFetchItems = async (
    path: string,
    filter: { [key: string]: string } | undefined
  ) => {
    try {
      const resultDto = await getResponse<ItemDto[]>(path, filter);
      if (resultDto instanceof Error) {
        setError('Something went wrong...');
      } else {
        setItems(resultDto.map(buildItem));
        setError(null);
      }
    } catch {
      setError('Something went wrong...');
    }
  };
  React.useEffect(() => {
    const filters = {
      place_name: placeName === 'Tous' ? '' : placeName,
    };
    handleFetchItems('items', filters);
  }, [placeName]);

  return (
    <>
      <FetchSnackbar title="Inventaire" fetchHandler={setPlaceName} />
      <CustomDataGrid
        columns={columns}
        items={items}
        error={error}
        getRowId={(item: Item) => item.itemId}
      ></CustomDataGrid>
    </>
  );
};

export default ItemInventory;
