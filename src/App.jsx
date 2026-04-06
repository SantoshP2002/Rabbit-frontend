import React from "react";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Product/ProductDetails";
import { router } from "./Routes";

import { Provider } from "react-redux"
import  store  from "./redux/store";

const App = () => {
  return (

    <Provider store={store}> 

    <div className="w-dvw h-dvh">
      <Toaster position="top-center" />
      <RouterProvider router={router}/>

      </div>
      </Provider>
    // <BrowserRouter
    //   future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      
    // >
      
    // </BrowserRouter>
  );
};

export default App;
