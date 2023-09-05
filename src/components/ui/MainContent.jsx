import React from "react";
import { Routes, Route } from "react-router-dom";
import IdeasRatingPage from "../pages/ideas_rating/IdeasRatingPage";

const MainContent = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route exact path="/" element={<IdeasRatingPage />} />
      </Routes>
    </div>
  );
};

export default MainContent;
