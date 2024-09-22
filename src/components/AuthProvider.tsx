import axios from 'axios';
import {
  createContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem('token')
  );

  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
