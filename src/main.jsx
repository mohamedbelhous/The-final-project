import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { BookingProvider } from "./context/BookingContext";
import { AuthProvider } from "./context/AuthContext";
import { ContentProvider } from "./context/ContentContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./styles/global.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ContentProvider>
        <FavoritesProvider>
          <BookingProvider>
            <RouterProvider router={router} />
          </BookingProvider>
        </FavoritesProvider>
      </ContentProvider>
    </AuthProvider>
  </React.StrictMode>,
);
