import { DataGrid, GridColDef } from '@mui/x-data-grid';

type CustomDataGridProps<T> = {
  error: string | null;
  items: T[];
  columns: GridColDef[];
  getRowId: (row: T) => string | number;
};
export const CustomDataGrid = <T,>({
  error,
  items,
  columns,
  getRowId,
}: CustomDataGridProps<T>) => {
  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <DataGrid
            rows={items}
            columns={columns}
            getRowId={getRowId}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            disableColumnMenu
            pageSizeOptions={[5, 10]}
          />
        </div>
      )}
    </>
  );
};
