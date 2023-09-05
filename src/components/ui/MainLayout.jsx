import React from "react";
import Navigation from "./Navigation";
import MainContent from "./MainContent";
import { useKeycloak } from "@react-keycloak/web";

const MainLayout = () => {
  const { keycloak } = useKeycloak();

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

          {!keycloak.authenticated && (
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => keycloak.login()}
              >
                Login
              </button>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default MainLayout;
