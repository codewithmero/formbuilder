/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css'
import "./App.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import FormBuilder from './pages/FormBuilder.jsx'
import Home from './pages/Home.jsx'
import AddEditDynamicForm from './pages/AddEditDynamicForm.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/form/create",
    element: <FormBuilder />
  },
  {
    path: "/form/:action/:formId",
    element: <AddEditDynamicForm />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
