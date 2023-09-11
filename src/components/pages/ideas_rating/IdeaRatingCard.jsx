import React from "react";
import { Link } from "react-router-dom";
import IdeaStatus from "../../ui/IdeaStatus";
import IdeaAuthor from "../../ui/IdeaAuthor";

const IdeaRatingCard = (props) => {
  const { ideaRating } = props;

  const cardClasses = {
    approved: "border-success",
    declined: "border-danger",
  };

  return (
    <React.Fragment>
      {ideaRating && (
        <div
          className={`idea-card mb-2 p-2 card ${
            (ideaRating.ideaStatus &&
              cardClasses[ideaRating.ideaStatus.toLowerCase()]) ||
            "text-bg-light"
          }`}
        >
          <div className="card-header">
            <div className="title">
              <Link to={`/ideas/${ideaRating.ideaId}`}>
                {ideaRating.ideaTitle}
              </Link>
            </div>
            <div className="author">
              <IdeaAuthor uuid={ideaRating.ideaAuthorUuid} />
            </div>
            <div className="rating-score">Рейтинг: {ideaRating.rating}</div>
          </div>
          <div className="card-body">
            <div className="idea-status mb-2">
              <IdeaStatus ideaStatus={ideaRating.ideaStatus} />
            </div>
            <Link
              to={`/ideas/${ideaRating.ideaId}`}
              className={`btn ${"btn-light"}`}
            >
              Подробнее
            </Link>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default IdeaRatingCard;
