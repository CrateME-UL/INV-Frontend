import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

export const SignOut = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setToken(null);
    navigate('/signIn', { replace: true });
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};
