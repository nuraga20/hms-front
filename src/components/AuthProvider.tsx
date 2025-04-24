// CHECK POINT 2

// AuthProvider.tsx
import { getUser, login } from '../api/auth';
import { User } from '../types/hms';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextType = {
  authToken?: string | null;
  currentUser?: User | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // On mount, try to load the current user from sessionStorage.
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUser();
        const { authToken, user } = response[1];
        setAuthToken(authToken);
        setCurrentUser(user);
      } catch {
        setAuthToken(null);
        setCurrentUser(null);
      }
    }
    fetchUser();
  }, []);

  async function handleLogin(email: string, password: string) {
    try {
      const response = await login(email, password);
      const { authToken, user } = response[1];
      setAuthToken(authToken);
      setCurrentUser(user);

      // Persist the auth data in sessionStorage
      sessionStorage.setItem('auth', JSON.stringify({ authToken, user }));
    } catch (error) {
      setAuthToken(null);
      setCurrentUser(null);
      throw error; // so the UI can handle it
    }
  }

  async function handleLogout() {
    setAuthToken(null);
    setCurrentUser(null);
    sessionStorage.removeItem('auth');
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
