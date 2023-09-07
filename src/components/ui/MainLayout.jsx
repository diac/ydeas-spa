import React, { useEffect } from "react";
import Navigation from "./Navigation";
import MainContent from "./MainContent";
import { useKeycloak } from "@react-keycloak/web";

const MainLayout = () => {
  const { keycloak, initialized: keycloakInitialized } = useKeycloak();

  useEffect(() => {
    if (keycloakInitialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [keycloak, keycloakInitialized]);

  return (
    <React.Fragment>
      {keycloak.didInitialize && (
        <div className="container">
          {keycloak.authenticated && (
            <React.Fragment>
              <Navigation />
              <MainContent />
            </React.Fragment>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default MainLayout;
