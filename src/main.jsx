import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from "./components/home/Home.jsx";
import FormularioViolenciaDomestica from "./components/form/ViolDomestica/Form.jsx";
import SomAlto from './components/form/somAlto/Form.jsx';
import RouboFurto from './components/form/RouboFurto/Form.jsx';
import AlarmeAcionado from './components/form/AlarmeAcionado/Form.jsx';
import MausTratos from './components/form/MausTratos/Form.jsx';
import AcidenteTransito from './components/form/AcidenteTransito/Form.jsx';
import Ameaca from './components/form/Ameaca/Form.jsx';
import ViasDeFato from './components/form/ViasDeFato/Form.jsx';
import ErrorPage from './components/error/ErrorPage.jsx';


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
        path:"MausTratos",
        element:<MausTratos/>
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


    ]
  }


])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
