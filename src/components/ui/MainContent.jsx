import React from "react";
import { Routes, Route } from "react-router-dom";

const MainContent = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route exact path="/" element={<div>Ydeas Main Content</div>} />
      </Routes>
    </div>
  );
};

export default MainContent;
