import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Root";
import QueryProvider from "./lib/tanstack-query/QueryProvider";
import AuthProvider from "./context/AuthContext";

const WrappedRoot = () => (
  <QueryProvider>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </QueryProvider>
)

const router = createBrowserRouter([
  { path: "*", Component: WrappedRoot },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);