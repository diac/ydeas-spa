import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import MainLayout from "./components/ui/MainLayout";
import keycloakClient from "./config/keycloak";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloakClient}>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;
