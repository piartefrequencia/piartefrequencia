import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function RotaPrivada({ children, perfil }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (perfil && user.perfil !== perfil) {
    alert('Acesso negado! Seu perfil não permite acessar esta página.');
    return <Navigate to="/" />;
  }

  return children;
}

export default RotaPrivada;
