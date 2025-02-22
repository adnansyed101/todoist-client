import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./provider/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./routes/router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <ToastContainer position="top-left" />
    </AuthProvider>
  </StrictMode>
);
