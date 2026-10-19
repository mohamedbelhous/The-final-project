import { createBrowserRouter, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";

// Layouts
import MainLayout from "../layouts/MainLayout";

// Components & Helpers
import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import Home from "../pages/Home/Home";
import Destinations from "../pages/Destinations/Destinations";
import DestinationDetails from "../pages/DestinationDetails/DestinationDetails";
import Booking from "../pages/Booking/Booking";
import MyTrips from "../pages/MyTrips/MyTrips";
import Profile from "../pages/Profile/Profile";
import Activities from "../pages/Activities/Activities";
import TravelGuide from "../pages/TravelGuide/TravelGuide";
import Deals from "../pages/Deals/Deals";
import DealDetails from "../pages/DealDetails/DealDetails";
import About from "../pages/About/About";

import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

// Auth Pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import TravelGuideDetails from "../pages/TravelGuideDetails/TravelGuideDetails";

// Helper Component to reset scroll position on path change
const ScrollToTopLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <MainLayout />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ScrollToTopLayout />,
    errorElement: (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>Oops! Something went wrong.</h2>
        <p>An unexpected error occurred. Please try refreshing the page.</p>
        <a
          href="/"
          style={{
            color: "#176b50",
            textDecoration: "underline",
            marginTop: "10px",
            display: "inline-block",
          }}
        >
          Return to Home
        </a>
      </div>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "destinations",
        element: <Destinations />,
      },
      {
        path: "destinations/:id",
        element: <DestinationDetails />,
      },
      {
        path: "activities",
        element: <Activities />,
      },
      {
        path: "travel-guide",
        element: <TravelGuide />,
      },
      {
        path: "deals",
        element: <Deals />,
      },
      {
        path: "deal/:id",
        element: <DealDetails />,
      },
      {
        path: "about",
        element: <About />,
      },

      /* Authentication Routes */
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "guide/:id",
        element: <TravelGuideDetails />,
      },

      /* Protected Routes */
      {
        path: "booking",
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        ),
      },
      {
        path: "trips",
        element: (
          <ProtectedRoute>
            <MyTrips />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly={true}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
]);
