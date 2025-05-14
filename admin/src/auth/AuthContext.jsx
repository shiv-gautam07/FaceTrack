import { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_PREFIX } from '../lib/axios';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

const hydrateUser = () => {
  let authUser = sessionStorage.getItem(`${STORAGE_PREFIX}auth-user`);
  if (authUser) {
    authUser = JSON.parse(authUser);
    if (authUser.token) {
      return authUser;
    }
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(hydrateUser());
  const login = userData => {
    sessionStorage.setItem(
      `${STORAGE_PREFIX}auth-user`,
      JSON.stringify(userData),
    );
    setUser(userData);
  };
  const logout = () => {
    sessionStorage.setItem(`${STORAGE_PREFIX}auth-user`, '');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
