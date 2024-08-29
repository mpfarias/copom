import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles, children }) => {
  const nomeUsuario = localStorage.getItem('usuario');
  const nivelUsuario = localStorage.getItem('nivel'); // Pegue o nível do usuário do localStorage
  console.log('Nome do usuário no PrivateRoute:', nomeUsuario);
  console.log('Nível do usuário no PrivateRoute:', nivelUsuario);

  if (!nomeUsuario) {
    // Se o usuário não estiver logado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(nivelUsuario)) {
    // Se o usuário não tem permissão, redirecione para uma página de acesso negado
    return <Navigate to="/acesso-negado" />;
  }

  // Se o usuário estiver logado e tiver o nível de acesso permitido, renderize o componente filho
  return children ? children : <Outlet />;
};

export default PrivateRoute;
