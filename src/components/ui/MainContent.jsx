import React from "react";
import { Routes, Route } from "react-router-dom";
import IdeasRatingPage from "../pages/ideas_rating/IdeasRatingPage";
import MyIdeasPage from "../pages/my_ideas/MyIdeasPage";
import IdeaAddPage from "../pages/ideas/IdeaAddPage";

const MainContent = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route exact path="/" element={<IdeasRatingPage />} />
        <Route exact path="/my-ideas" element={<MyIdeasPage />} />
        <Route exact path="/ideas/new" element={<IdeaAddPage />} />
      </Routes>
    </div>
  );
};

export default MainContent;
