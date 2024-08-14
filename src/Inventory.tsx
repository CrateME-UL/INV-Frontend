import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Category, Place, Logout } from '@mui/icons-material';
import { ErrorPage } from './pages/ErrorPage';
import { ItemsPage } from './pages/ItemsPage';
import { PlacesPage } from './pages/PlacesPage';
import { SignInPage } from './pages/SignInPage';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useAuth } from './utils/useAuth';

const RouterComponent = () => {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      const selectedLinks =
        document.querySelectorAll('.Mui-selected');
      selectedLinks.forEach((link) => {
        link.classList.remove('Mui-selected');
      });
      let pageTitle = location.pathname
        .replace('/', '')
        .toUpperCase();
      switch (location.pathname.replace('/', '').toUpperCase()) {
        case 'ITEMS':
          pageTitle = 'Objets';
          document
            .getElementById('itemsLink')
            ?.classList.add('Mui-selected');
          break;
        case 'PLACES':
          pageTitle = 'Lieux';
          document
            .getElementById('placesLink')
            ?.classList.add('Mui-selected');
          break;
        default:
          pageTitle = '404';
      }
      document.title = pageTitle
        ? `${pageTitle} | Crate ME!`
        : 'Crate ME!';
    }
  }, [location.pathname]);

  const shouldShowNavigation = location.pathname !== '/login';

  const handleSignOut = () => {
    setToken(null);
    navigate('/login', { replace: true });
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Box sx={{ pb: shouldShowNavigation ? 7 : 0 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/items" />} />
          <Route path="/login" element={<SignInPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/places" element={<PlacesPage />} />
          </Route>

          <Route
            path="*"
            element={
              <ErrorPage
                errorCode={404}
                errorMessage="Oopsie! La page n'existe pas"
              />
            }
          />
        </Routes>
      </Box>
      {shouldShowNavigation && (
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
            onChange={(_event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              id={'itemsLink'}
              component={Link}
              to="/items"
              label="Objets"
              icon={<Category />}
              tabIndex={0}
            />
            <BottomNavigationAction
              id={'placesLink'}
              component={Link}
              to="/places"
              label="Lieux"
              icon={<Place />}
              tabIndex={1}
            />
            <BottomNavigationAction
              label="Déconnexion"
              icon={<Logout />}
              onClick={handleSignOut}
              tabIndex={2}
            />
          </BottomNavigation>
        </Box>
      )}
    </Box>
  );
};

export const Inventory = () => {
  return (
    <Router>
      <RouterComponent />
    </Router>
  );
};
