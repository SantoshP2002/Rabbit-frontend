import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../components/Layout/UserLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CollectionPage from "../pages/CollectionPage";
import ProductDetails from "../components/Product/ProductDetails";
import Checkout from "../components/Cart/Checkout";
import OrderConformationPage from "../pages/OrderConformationPage";
import OrderDetailsPage from "../pages/OrderDetailsPage";
import MyOrdersPage from "../pages/MyOrdersPage";
import AdminLayout from "../components/Admin/AdminLayout";
import AdminHomePage from "../pages/AdminHomePage";
import UserManagement from "../components/Admin/UserManagement";
import ProductManagement from "../components/Admin/ProductManagement";
import EditProductPage from "../components/Admin/EditProductPage";
import OrderManagement from "../components/Admin/OrderManagement";
import ProtectedRoute from "../components/Common/ProtectedRoute";
import GenderWiseProduct from "../components/Product/GenderWiseProduct";
import ContactUs from "../pages/footerPages/ContactUs";
import AboutUs from "../pages/footerPages/AboutUs";
import FAQ from "../pages/footerPages/FAQ";
import Feature from "../pages/footerPages/Feature";
import ShopManagement from "../components/Admin/ShopManagement";
import Shop from "../pages/footerPages/Shop";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "collections/:collection",
        element: <CollectionPage />,
      },
      {
        path: "gender-products",
        element: <GenderWiseProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "order-conformation",
        element: <OrderConformationPage />,
      },
      {
        path: "order/:id",
        element: <OrderDetailsPage />,
      },
      {
        path: "my-orders",
        element: <MyOrdersPage />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "feature",
        element: <Feature />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
    ],
  },
  //  Admin ROUTES ONLY
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminHomePage />,
      },
      {
        path: "user",
        element: <UserManagement />,
      },
      {
        path: "products",
        element: <ProductManagement />,
      },
      {
        path: "products/:id/edit",
        element: <EditProductPage />,
      },
      {
        path: "orders",
        element: <OrderManagement />,
      },
      {
        path: "shop",
        element: <ShopManagement />,
      },
    ],
  },
]);
