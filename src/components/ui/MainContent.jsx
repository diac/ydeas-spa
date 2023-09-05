import React from "react";
import { Routes, Route } from "react-router-dom";
import IdeasRatingPage from "../pages/ideas_rating/IdeasRatingPage";
import MyIdeasPage from "../pages/my_ideas/MyIdeasPage";

const MainContent = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route exact path="/" element={<IdeasRatingPage />} />
        <Route exact path="/my-ideas" element={<MyIdeasPage />} />
      </Routes>
    </div>
  );
};

export default MainContent;
