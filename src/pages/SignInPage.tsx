import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SignInPage = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (email && password) {
      try {
        const user_email = email.toString();
        const user_password = password.toString();
        const response = await axios.post(
          'http://localhost:3000/login',
          {
            user_email,
            user_password,
          }
        );
        console.log(response);
        const { token } = response.data;
        console.log(token.toString());
        if (token) {
          setToken(token);
          navigate('/', { replace: true });
        } else {
          console.log('Authentication failed');
        }
      } catch (error) {
        console.log('Invalid email or password');
      }
    } else {
      // Handle empty fields (optional)
      console.log('Please fill in both fields');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          se connrcter
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                mot de pass oublié?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}
