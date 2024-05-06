import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from "./components/home/Home";
import FormularioViolenciaDomestica from "./components/form/ViolDomestica/Form";
import SomAlto from './components/form/somAlto/Form.jsx';
import RouboFurto from './components/form/RouboFurto/Form.jsx';
import AlarmeAcionado from './components/form/AlarmeAcionado/Form.jsx';
import MausTratos from './components/form/MausTratos/Form.jsx';

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
      }
    ]
  }


])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
