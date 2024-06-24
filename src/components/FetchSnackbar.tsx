import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import SelectFilter from './SelectFilter';

export function FetchSnackbar({
  title,
  fetchHandler,
}: {
  title: string;
  fetchHandler: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    fetchHandler;
    setOpen(true);
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="left"
        sx={{ m: 0.5 }}
      >
        <IconButton aria-label="refresh" onClick={handleClick}>
          <RefreshIcon />
        </IconButton>
        <Typography component="span">{title}</Typography>
      </Box>
      <Box display="flex" alignItems="left" justifyContent="left">
        <SelectFilter fetchHandler={fetchHandler}></SelectFilter>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Données mises à jour!"
        action={action}
        ContentProps={{
          style: { backgroundColor: 'green' },
        }}
      />
    </div>
  );
}
