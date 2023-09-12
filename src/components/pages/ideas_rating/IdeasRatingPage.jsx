import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import Paging from "../../ui/Paging";
import IdeaRatingCard from "./IdeaRatingCard";

const IdeasRatingPage = () => {
  const [state, setState] = useState();
  const [searchParams] = useSearchParams();
  const { keycloak } = useKeycloak();

  const fetchIdeas = useCallback(() => {
    const pageNumber = searchParams.get("page") || 1;
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST +
      `/ideas/idea_rating?page=${pageNumber}&size=${process.env.REACT_APP_IDEAS_RATING_RESULTS_PER_PAGE}`;
    const headers = { Authorization: "Bearer " + keycloak.token };
    fetch(API_ENDPOINT_URL, {
      headers: headers,
    })
      .then((result) => result.json())
      .then((result) => {
        setState({
          isLoaded: true,
          page: result,
        });
      });
  }, [keycloak, searchParams]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas, searchParams]);

  return (
    <React.Fragment>
      <h1>Идеи</h1>
      {state && state.page && (
        <div className="ideas ideas-rating">
          <div className="row">
            {state.page.content.map((ideaRating) => (
              <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                <IdeaRatingCard
                  key={ideaRating.ideaId}
                  ideaRating={ideaRating}
                />
              </div>
            ))}
          </div>

          {state.page.content.length > 0 && (
            <Paging
              pageNumber={state.page.number + 1}
              totalPages={state.page.totalPages}
              onUpdate={fetchIdeas}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default IdeasRatingPage;
