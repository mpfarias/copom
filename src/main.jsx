import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from "./components/home/home.jsx";
import FormularioViolenciaDomestica from "./components/Routes/Pmdf/form/ViolDomestica/Form.jsx";
import SomAlto from './components/Routes/Pmdf/form/somAlto/Form.jsx';
import RouboFurto from './components/Routes/Pmdf/form/RouboFurto/Form.jsx';
import AlarmeAcionado from './components/Routes/Pmdf/form/AlarmeAcionado/Form.jsx';
import MausTratos from './components/Routes/Pmdf/form/MausTratos/Form.jsx';
import AcidenteTransito from './components/Routes/Pmdf/form/AcidenteTransito/Form.jsx';
import Ameaca from './components/Routes/Pmdf/form/Ameaca/Form.jsx';
import ViasDeFato from './components/Routes/Pmdf/form/ViasDeFato/Form.jsx';
import AtentadoAoPudor from './components/Routes/Pmdf/form/AtentadoAoPudor/Form.jsx';

import ErrorPage from './components/Routes/Pmdf/error/ErrorPage.jsx';
import TelefonesUteis from './components/Routes/Pmdf/contact/Contact.jsx';


const router = createBrowserRouter([
  {
    patch: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "ViolenciaDomestica",
        element: <FormularioViolenciaDomestica />
      },
      {
        path: "SomAlto",
        element: <SomAlto />
      },
      {
        path: "RouboFurto",
        element: <RouboFurto />
      },
      {
        path: "MausTratos",
        element: <MausTratos />
      },
      {
        path: "AlarmeAcionado",
        element: <AlarmeAcionado />
      },
      {
        path: "AcidenteTransito",
        element: <AcidenteTransito />
      },
      {
        path: "Ameaca",
        element: <Ameaca />
      },
      {
        path: "ViasDeFato",
        element: <ViasDeFato />
      },
      {
        path: "TelefonesUteis",
        element: <TelefonesUteis />
      },
      {
        path: "AtentadoAoPudor",
        element: <AtentadoAoPudor/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
