import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { ErrorPage } from './shared/ErrorPage'
import { FrontPage } from './frontpage/FrontPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage/>,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
