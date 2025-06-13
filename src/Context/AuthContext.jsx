import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (usuario, senha) => {
    if (usuario === 'admin' && senha === '1234') {
      setUser({ usuario: 'admin', perfil: 'Adm' });
      return true;
    } else if (usuario === 'colaborador' && senha === '1234') {
      setUser({ usuario: 'colaborador', perfil: 'Colaborador' });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
