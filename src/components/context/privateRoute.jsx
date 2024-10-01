import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles, children }) => {
  const nomeCpf = localStorage.getItem('cpf');
  const nivelUsuario = Number(localStorage.getItem('nivel_acesso')); 
  const nomeUsuario = localStorage.getItem('nome'); // Mantendo como string
  const usuarioID = localStorage.getItem('agente_id');

  console.log('Nome do usuário no PrivateRoute:', nomeCpf);
  console.log('Nível do usuário no PrivateRoute:', nivelUsuario);
  console.log('Nome do usuário no PrivateRoute:', nomeUsuario);
  console.log('agente ID PrivateRoute:', usuarioID);

  // Verificar se o CPF ou nível de acesso não estão definidos
  if (!nomeCpf || !nivelUsuario) {
    console.error('Usuário não está logado ou nível de acesso não encontrado.');
    return <Navigate to="/login" />; // Redireciona para login se não estiver autenticado
  }

  // Verifica se o nível de acesso do usuário está entre os níveis permitidos
  if (!allowedRoles || !allowedRoles.includes(nivelUsuario)) {
    console.error('Usuário não tem permissão de acesso.');
    return <Navigate to="/login" />; // Redireciona para página de acesso negado
  }

  // Se o usuário estiver autenticado e com as permissões corretas, renderiza o conteúdo
  return children ? children : <Outlet />;
};

export default PrivateRoute;
