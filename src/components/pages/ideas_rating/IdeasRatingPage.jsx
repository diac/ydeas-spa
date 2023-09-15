import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import Paging from "../../ui/Paging";
import IdeaRatingCard from "./IdeaRatingCard";
import Loader from "../../ui/Loader";

const IdeasRatingPage = () => {
  const [state, setState] = useState();
  const [searchParams] = useSearchParams();
  const { keycloak } = useKeycloak();

  const fetchIdeas = useCallback(() => {
    setState((oldState) => ({
      ...oldState,
      isLoaded: false,
    }));
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
      <div className="ideas-rating-page">
        <h1>Идеи</h1>
        <div className="ideas-cards">
          <Loader isLoaded={state && state.isLoaded}>
            {state && state.page && (
              <div className="ideas ideas-rating">
                <div className="row">
                  {state.page.content.map((ideaRating) => (
                    <div
                      className="col-sm-12 col-md-6 col-lg-4 mb-2"
                      key={ideaRating.ideaId}
                    >
                      <IdeaRatingCard ideaRating={ideaRating} />
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
          </Loader>
        </div>
      </div>
    </React.Fragment>
  );
};

export default IdeasRatingPage;
