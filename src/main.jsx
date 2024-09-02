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
      { path: "MausTratos", element: <MausTratos /> },
      { path: "AlarmeAcionado", element: <AlarmeAcionado /> },
      { path: "AcidenteTransito", element: <AcidenteTransito /> },
      { path: "Ameaca", element: <Ameaca /> },
      { path: "ViasDeFato", element: <ViasDeFato /> },
      { path: "Drogas", element: <Drogas /> },
      { path: "DanoAoPatrimonio", element: <DanoPatrimonio /> },
      { path: "Abandono", element: <Abandono /> },
      { path: "CrimesSexuais", element: <CrimesSexuais /> },
      { path: "Homofobia", element: <Homofobia /> },
      { path: "Racismo", element: <Racismo /> },
      { path: "Suicidio", element: <Suicidio /> },
      { path: "PessoaArmada", element: <PessoaArmada /> },
      { path: "Agressao", element: <Agressao /> },
      { path: "Admins/Comentarios", element: <Comments /> },
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