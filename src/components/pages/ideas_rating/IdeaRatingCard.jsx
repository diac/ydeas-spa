import React from "react";
import { Link } from "react-router-dom";
import IdeaStatus from "../../ui/IdeaStatus";

const IdeaRatingCard = (props) => {
  const { ideaRating } = props;

  const cardClasses = {
    approved: "text-bg-success",
    declined: "text-bg-danger",
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
            <IdeaStatus ideaStatus={ideaRating.ideaStatus} />
            <div className="author">Автор: {ideaRating.ideaAuthorUuid}</div>
            <div className="rating-score">Рейтинг: {ideaRating.rating}</div>
          </div>
          <div className="card-body">Подробнее</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default IdeaRatingCard;
