import React from "react";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const Navigation = () => {
  const { keycloak } = useKeycloak();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Ydeas
        </Link>
        <div className="navbar-collapse collapse" id="basic-navbar-nav">
          <div className="me-auto navbar-nav">
            <Link to="/my-ideas" className="nav-link">
              Мои идеи
            </Link>
            <Link className="nav-link" onClick={() => keycloak.logout()}>
              Выйти
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
