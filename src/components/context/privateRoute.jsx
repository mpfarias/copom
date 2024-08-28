import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const nomeUsuario = localStorage.getItem('usuario');
  console.log('Nome do usuário no PrivateRoute:', nomeUsuario);
  if (!nomeUsuario) {
    // Se o usuário não estiver logado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  // Se o usuário estiver logado, renderize o componente filho
  return children;
};

export default PrivateRoute;
