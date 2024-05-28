import * as React from 'react';

import { ItemModel } from '../../types/ModelType';
import { getItems } from '../../API';
import { FetchSnackbar } from '../../components/FetchSnackbar';
import { CustomDataGrid } from '../../components/CustomDataGrid';
import { GridColDef } from '@mui/x-data-grid';

const ItemInventory = () => {
  const columns: GridColDef[] = [
    { field: 'nbOfItems', headerName: 'Qte', width: 90 },
    { field: 'itemName', headerName: 'Type', width: 260 },
  ];
  const [items, setItems] = React.useState<ItemModel[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleFetchItems = async () => {
    try {
      const result = await getItems();
      if (result instanceof Error) {
        setError('Something went wrong...');
      } else {
        setItems(result);
        setError(null);
      }
    } catch {
      setError('Something went wrong...');
    }
  };
  React.useEffect(() => {
    handleFetchItems();
  }, []);

  return (
    <>
      <FetchSnackbar
        title="Inventaire"
        fetchHandler={handleFetchItems}
      />
      <CustomDataGrid
        columns={columns}
        items={items}
        error={error}
        getRowId={(item: ItemModel) => item.itemId}
      ></CustomDataGrid>
    </>
  );
};

export default ItemInventory;
