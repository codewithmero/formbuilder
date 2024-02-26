/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css'
import "./App.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import FormListing from './pages/FormListing.jsx'
import FormBuilder from './pages/FormBuilder.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/form",
    element: <FormListing />,
  },
  {
    path: "/form/create",
    element: <FormBuilder />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
