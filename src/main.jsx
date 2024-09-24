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
      <PrivateRoute allowedRoles={[1, 2, 3, 4]}>
        <App />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "Main", element: <Home /> },
      {
        path: "GerarOcorrencia", element: (
          <PrivateRoute allowedRoles={[1, 2, 4]}>
            <GerarOcorrencia />
          </PrivateRoute>
        )
      },

      {
        path: "BuscarVeiculo", element: (
          <PrivateRoute allowedRoles={[1, 2, 3, 4]}>
            <BuscarVeiculo />
          </PrivateRoute>
        )
      },
      {
        path: "BuscarPessoa", element: (
          <PrivateRoute allowedRoles={[1, 2, 3, 4]}>
            <BuscarPessoa />
          </PrivateRoute>
        )
      },
      {
        path: "ViolenciaDomestica", element: (
          <PrivateRoute allowedRoles={[1, 2, 4]}>
            <FormularioViolenciaDomestica />
          </PrivateRoute>)
      },
      {
        path: "SomAlto", element: (
          <PrivateRoute allowedRoles={[1, 2, 4]}>
            <SomAlto />
          </PrivateRoute>
        )
      },
      { path: "RouboFurto", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <RouboFurto />
          </PrivateRoute>
      ) },
      { path: "MausTratos", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <MausTratos />
          </PrivateRoute>
      ) },
      { path: "AlarmeAcionado", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <AlarmeAcionado />
          </PrivateRoute>
      ) },
      { path: "AcidenteTransito", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <AcidenteTransito />
          </PrivateRoute>
      ) },
      { path: "Ameaca", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <Ameaca />
          </PrivateRoute>
      ) },
      { path: "ViasDeFato", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <ViasDeFato />
          </PrivateRoute>
      ) },
      { path: "Drogas", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <Drogas />
          </PrivateRoute>
      ) },
      { path: "DanoAoPatrimonio", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <DanoPatrimonio />
          </PrivateRoute>
      ) },
      { path: "Abandono", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <Abandono />
          </PrivateRoute>
      ) },
      { path: "CrimesSexuais", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <CrimesSexuais />
          </PrivateRoute>
      ) },
      { path: "Homofobia", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <Homofobia />
          </PrivateRoute>
      ) },
      { path: "Racismo", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <Racismo />
          </PrivateRoute>
      ) },
      { path: "Suicidio", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <Suicidio />
          </PrivateRoute>
      ) },
      { path: "PessoaArmada", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <PessoaArmada />
          </PrivateRoute>
      ) },
      { path: "Agressao", element: (
        <PrivateRoute allowedRoles={[1, 2, 4]}>
            <Agressao />
          </PrivateRoute>
      ) },
      { path: "Relatorios", element: (
        <PrivateRoute allowedRoles={[1, 2]}>
            <Relatorios />
          </PrivateRoute>
      ) },      
      { path: "Admins/Comentarios", element: (
        <PrivateRoute allowedRoles={[1]}>
            <Comments />
          </PrivateRoute>
      ) },
      { path: "CadastrarUsuario", element: (
        <PrivateRoute allowedRoles={[1, 2]}>
            <CadastrarUsuario />
          </PrivateRoute>
      ) },

    ]
  },
  {
    path: "TelefonesUteis",
    element: (
      <PrivateRoute allowedRoles={[1, 2, 3, 4]}>
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