import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

// HOCs
import RequireAuth from './hoc/RequireAuth';
import GuestRoute from "./hoc/GuestRoute";


// Pages
import LoginPage from "./pages/Login/LoginPage";
import RegistrationPage from "./pages/Register/RegistrationPage";
import HomePage from "./pages/Home/HomePage";
import MessageDisplayPage from "./pages/MessageDisplay/MessageDisplayPage";
import ServerErrorPage from "./pages/MessageDisplay/ServerErrorPage";
import MessageLayout from "./layouts/MessageLayout";
import XOXPage  from './pages/XOX/XOXPage';


const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/login",
      element: <GuestRoute>
        <LoginPage />
      </GuestRoute>,
    },
    {
      path: "/register",
      element: <GuestRoute>
        <RegistrationPage />
      </GuestRoute>,
    },
    {
      path: '/',
      element: <RequireAuth>
        <MainLayout />
      </RequireAuth>,
      children: [
        {
          path: '',
          element: <Navigate to="/chat" />
        },
        {
          path: '/chat',
          element: <HomePage />
        },
        {
          path:'/xox',
          element:<XOXPage/>
        }
      ]
    },
    {
      path: 'message',
      element: <MessageLayout />,
      children: [
        {
          path: 'message/:message',
          element: <MessageDisplayPage />
        },
        {
          path: 'server-error/:errorMessage',
          element: <ServerErrorPage />
        },
      ]
    },
    {
      path: '*',
      element: <Navigate to="/message/message/Page Not Found! The page you're looking for doesn't exist." replace />,
    }

  ]);

  return routes;
};

export default AppRoutes;
