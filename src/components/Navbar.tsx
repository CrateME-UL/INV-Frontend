import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Category, HomeWork, Place } from '@mui/icons-material';
import ItemInventory from '../pages/ItemInventory';
import Items from '../pages/Items';
import Places from '../pages/Places';

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  return (
    <Router>
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <Box sx={{ pb: 7 }}>
          {' '}
          {/* pb is padding bottom */}
          <Routes>
            <Route path="/" element={<ItemInventory />} />
            <Route path="/items" element={<Items />} />
            <Route path="/places" element={<Places />} />
          </Routes>
        </Box>
        <Box
          sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              component={Link}
              to="/"
              label="Acceuil"
              icon={<HomeWork />}
            />
            <BottomNavigationAction
              component={Link}
              to="/items"
              label="Objets"
              icon={<Category />}
            />
            <BottomNavigationAction
              component={Link}
              to="/places"
              label="Lieux"
              icon={<Place />}
            />
          </BottomNavigation>
        </Box>
      </Box>
    </Router>
  );
}
