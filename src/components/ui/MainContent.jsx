import React from "react";
import { Routes, Route } from "react-router-dom";
import IdeasRatingPage from "../pages/ideas_rating/IdeasRatingPage";
import MyIdeasPage from "../pages/my_ideas/MyIdeasPage";
import IdeaAddPage from "../pages/ideas/IdeaAddPage";
import IdeaViewPage from "../pages/ideas/IdeaViewPage";
import IdeaEditPage from "../pages/ideas/IdeaEditPage";

const MainContent = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route exact path="/" element={<IdeasRatingPage />} />
        <Route exact path="/my-ideas" element={<MyIdeasPage />} />
        <Route exact path="/ideas/new" element={<IdeaAddPage />} />
        <Route exact path="/ideas/:ideaId" element={<IdeaViewPage />} />
        <Route exact path="/ideas/:ideaId/edit" element={<IdeaEditPage />} />
      </Routes>
    </div>
  );
};

export default MainContent;
