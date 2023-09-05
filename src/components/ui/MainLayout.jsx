import React from "react";
import Navigation from "./Navigation";
import MainContent from "./MainContent";

const MainLayout = () => {
  return (
    <React.Fragment>
      <div className="container">
        <Navigation />
        <MainContent />
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
