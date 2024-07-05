import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Category, HomeWork, Place } from '@mui/icons-material';

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%', alignContent: 'flex-center' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          href="/"
          label="Acceuil"
          icon={<HomeWork />}
        />
        <BottomNavigationAction
          href="/items"
          label="Objets"
          icon={<Category />}
        />
        <BottomNavigationAction
          href="/places"
          label="Lieux"
          icon={<Place />}
        />
      </BottomNavigation>
    </Box>
  );
}
