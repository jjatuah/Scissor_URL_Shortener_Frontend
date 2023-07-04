import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Home from './pages/home/Home';
import MyLinks from './pages/myLinks/MyLinks';
import Nav from './components/nav/Nav';
import QR from './pages/QR/QR';
import Register from './pages/register/Register';
import Login from './pages/login/Login';



// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },

//   {
//     path: "/links",
//     element: <MyLinks />,
//   },

//   {
//     path: "/qr",
//     element: <QR />,
//   },

//   {
//     path: "/register",
//     element: <Register />,
//   },

//   {
//     path: "/login",
//     element: <Login />,
//   },

  
// ]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

