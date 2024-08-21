import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App.jsx';

import Home from "./components/home/home.jsx";
import FormularioViolenciaDomestica from "./components/Routes/Pmdf/form/ViolDomestica/Form.jsx";
import SomAlto from './components/Routes/Pmdf/form/somAlto/Form.jsx';
import RouboFurto from './components/Routes/Pmdf/form/RouboFurto/Form.jsx';
import AlarmeAcionado from './components/Routes/Pmdf/form/AlarmeAcionado/Form.jsx';
import MausTratos from './components/Routes/Pmdf/form/MausTratos/Form.jsx';
import AcidenteTransito from './components/Routes/Pmdf/form/AcidenteTransito/Form.jsx';
import Ameaca from './components/Routes/Pmdf/form/Ameaca/Form.jsx';
import ViasDeFato from './components/Routes/Pmdf/form/ViasDeFato/Form.jsx';
import ErrorPage from './components/Routes/Pmdf/error/ErrorPage.jsx';
import TelefonesUteis from './components/Routes/Pmdf/contact/Contact.jsx';
import Drogas from './components/Routes/Pmdf/form/Drogas/Form.jsx';
import DanoPatrimonio from './components/Routes/Pmdf/form/Dano/Form.jsx';
import Abandono from './components/Routes/Pmdf/form/Abandono/Form.jsx';
import CrimesSexuais from './components/Routes/Pmdf/form/CrimesSexuais/Form.jsx';
import Homofobia from './components/Routes/Pmdf/form/Homofobia/Form.jsx';
import Racismo from './components/Routes/Pmdf/form/Racismo/Form.jsx';
import Suicidio from './components/Routes/Pmdf/form/Suicídio/Form.jsx';
import GerarOcorrencia from './components/Routes/Pmdf/form/GerarOcorrencia/Form.jsx';
import NoMenuLayout from './components/Routes/Pmdf/contact/NoMenuLayout.jsx';
import PessoaArmada from './components/Routes/Pmdf/form/PessoaArmada/Form.jsx';
import Agressao from './components/Routes/Pmdf/form/Agressao/Form.jsx';
import Comments from './components/Routes/Pmdf/internal/admin/coments/Comments.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "Main", element: <Home /> },
      { path: "GerarOcorrencia", element: <GerarOcorrencia /> },
      { path: "ViolenciaDomestica", element: <FormularioViolenciaDomestica /> },
      { path: "SomAlto", element: <SomAlto /> },
      { path: "RouboFurto", element: <RouboFurto /> },
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
      { path: "Admins/Comentarios", element: <Comments /> }
    ]
  },
  {
    path: "TelefonesUteis",
    element: <NoMenuLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <TelefonesUteis /> }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
