import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, frFR } from '@mui/x-data-grid';

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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="left"
          sx={{ m: 1.5 }}
        >
          <Typography component="span">{error}</Typography>
        </Box>
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
            localeText={
              frFR.components.MuiDataGrid.defaultProps.localeText
            }
          />
        </div>
      )}
    </>
  );
};
