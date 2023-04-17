import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ErrorPage } from './shared/ErrorPage'
import { FrontPage } from './frontpage/FrontPage'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage/>,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FrontPage  />
  </React.StrictMode>,
)
