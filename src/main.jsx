import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from "./components/home/Home";
import FormularioViolenciaDomestica from "./components/form/ViolDomestica/Form";
import SomAlto from './components/form/somAlto/Form.jsx';
import ErrorPage from './components/error/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    patch:"/",
    element:<App/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path: "/",
        element:<Home/>
      },
      {
        path: "ViolenciaDomestica",
        element: <FormularioViolenciaDomestica/>
      },
      {
        path: "SomAlto",
        element: <SomAlto/>
      }
    ]
  }


])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
