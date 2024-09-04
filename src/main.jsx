import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App.jsx';

import Home from "./components/home/home.jsx";
import FormularioViolenciaDomestica from "./components/Routes/Pmdf/form/FormsBases/ViolDomestica/Form.jsx";
import SomAlto from './components/Routes/Pmdf/form/FormsBases/somAlto/Form.jsx';
import RouboFurto from './components/Routes/Pmdf/form/FormsBases/RouboFurto/Form.jsx';
import MausTratos from './components/Routes/Pmdf/form/FormsBases/MausTratos/Form.jsx';
import AcidenteTransito from './components/Routes/Pmdf/form/FormsBases/AcidenteTransito/Form.jsx';
import Ameaca from './components/Routes/Pmdf/form/FormsBases/Ameaca/Form.jsx';
import ViasDeFato from './components/Routes/Pmdf/form/FormsBases/ViasDeFato/Form.jsx';
import ErrorPage from './components/Routes/Pmdf/error/ErrorPage.jsx';
import TelefonesUteis from './components/Routes/Pmdf/contact/Contact.jsx';
import Drogas from './components/Routes/Pmdf/form/FormsBases/Drogas/Form.jsx';
import DanoPatrimonio from './components/Routes/Pmdf/form/FormsBases/Dano/Form.jsx';
import CrimesSexuais from './components/Routes/Pmdf/form/FormsBases/CrimesSexuais/Form.jsx';
import Homofobia from './components/Routes/Pmdf/form/FormsBases/Homofobia/Form.jsx';
import Suicidio from './components/Routes/Pmdf/form/FormsBases/Suicídio/Form.jsx';
import GerarOcorrencia from './components/Routes/Pmdf/form/FormsBases/GerarOcorrencia/Form.jsx';
import NoMenuLayout from './components/Routes/Pmdf/contact/NoMenuLayout.jsx';
import PessoaArmada from './components/Routes/Pmdf/form/FormsBases/PessoaArmada/Form.jsx';
import Agressao from './components/Routes/Pmdf/form/FormsBases/Agressao/Form.jsx';
import Comments from './components/Routes/Pmdf/internal/admin/coments/Comments.jsx';
import Abandono from './components/Routes/Pmdf/form/FormsBases/Abandono/Form.jsx';
import Racismo from './components/Routes/Pmdf/form/FormsBases/Racismo/Form.jsx';
import AlarmeAcionado from './components/Routes/Pmdf/form/FormsBases/AlarmeAcionado/Form.jsx';
import BuscarVeiculo from './components/Routes/Pmdf/Search/BuscarVeiculo/BuscarVeiculo.jsx';
import BuscarPessoa from './components/Routes/Pmdf/Search/BuscarPessoa/BuscarPessoa.jsx';
import Login from './components/Routes/Pmdf/login/login.jsx';
import PrivateRoute from './components/context/privateRoute.jsx';
import CadastrarUsuario from './components/Routes/Pmdf/form/Cadastro/CadastrarUsuario.jsx';
import Relatorios from './components/Routes/Pmdf/reports/relatorios.jsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,  // Rota para o Login, fora da estrutura da aplicação principal
  },
  {
    path: "/",
    element: <Navigate to="/login" />,  // Redireciona a raiz para a página de login
  },
  {
    path: "/",
    element: (
      <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Comando', 'Usuario']}>
        <App />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "Main", element: <Home /> },
      {
        path: "GerarOcorrencia", element: (
          <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <GerarOcorrencia />
          </PrivateRoute>
        )
      },

      {
        path: "BuscarVeiculo", element: (
          <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Comando', 'Usuario']}>
            <BuscarVeiculo />
          </PrivateRoute>
        )
      },
      {
        path: "BuscarPessoa", element: (
          <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Comando', 'Usuario']}>
            <BuscarPessoa />
          </PrivateRoute>
        )
      },
      {
        path: "ViolenciaDomestica", element: (
          <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <FormularioViolenciaDomestica />
          </PrivateRoute>)
      },
      {
        path: "SomAlto", element: (
          <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <SomAlto />
          </PrivateRoute>
        )
      },
      { path: "RouboFurto", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <RouboFurto />
          </PrivateRoute>
      ) },
      { path: "MausTratos", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <MausTratos />
          </PrivateRoute>
      ) },
      { path: "AlarmeAcionado", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <AlarmeAcionado />
          </PrivateRoute>
      ) },
      { path: "AcidenteTransito", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <AcidenteTransito />
          </PrivateRoute>
      ) },
      { path: "Ameaca", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <Ameaca />
          </PrivateRoute>
      ) },
      { path: "ViasDeFato", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <ViasDeFato />
          </PrivateRoute>
      ) },
      { path: "Drogas", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <Drogas />
          </PrivateRoute>
      ) },
      { path: "DanoAoPatrimonio", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <DanoPatrimonio />
          </PrivateRoute>
      ) },
      { path: "Abandono", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <Abandono />
          </PrivateRoute>
      ) },
      { path: "CrimesSexuais", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <CrimesSexuais />
          </PrivateRoute>
      ) },
      { path: "Homofobia", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <Homofobia />
          </PrivateRoute>
      ) },
      { path: "Racismo", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <Racismo />
          </PrivateRoute>
      ) },
      { path: "Suicidio", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <Suicidio />
          </PrivateRoute>
      ) },
      { path: "PessoaArmada", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <PessoaArmada />
          </PrivateRoute>
      ) },
      { path: "Agressao", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Usuario']}>
            <Agressao />
          </PrivateRoute>
      ) },
      { path: "Relatorios", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor']}>
            <Relatorios />
          </PrivateRoute>
      ) },      
      { path: "Admins/Comentarios", element: (
        <PrivateRoute allowedRoles={['Administrador']}>
            <Comments />
          </PrivateRoute>
      ) },
      { path: "CadastrarUsuario", element: (
        <PrivateRoute allowedRoles={['Administrador', 'Gestor']}>
            <CadastrarUsuario />
          </PrivateRoute>
      ) },

    ]
  },
  {
    path: "TelefonesUteis",
    element: (
      <PrivateRoute allowedRoles={['Administrador', 'Gestor', 'Comando', 'Usuario']}>
        <NoMenuLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <TelefonesUteis /> }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/login" />, // Redireciona qualquer rota não encontrada para a página de login
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);