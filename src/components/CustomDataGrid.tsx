import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, frFR } from '@mui/x-data-grid';

type DataGridProps<T> = {
  error: string | null;
  rows: T[];
  columns: GridColDef[];
  getRowId: (row: T) => string | number;
};
export const CustomDataGrid = <T,>({
  error,
  rows,
  columns,
  getRowId,
}: DataGridProps<T>) => {
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
            rows={rows}
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
