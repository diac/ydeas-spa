import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { Link } from "react-router-dom";

const IdeasRatingPage = () => {
  const [state, setState] = useState();
  const [searchParams] = useSearchParams();
  const { keycloak } = useKeycloak();

  const fetchIdeas = useCallback(() => {
    const pageNumber = searchParams.get("page") || 1;
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST +
      `/ideas/idea_rating?page=${pageNumber}`;
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
      {state && state.page && (
        <div className="ideas ideas-rating">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Идея</th>
                <th>Автор</th>
                <th>Рейтинг</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {state.page.content.map((ideaRating) => (
                <tr key={ideaRating.ideaId}>
                  <td>
                    <Link to={`/ideas/${ideaRating.ideaId}`}>
                      {ideaRating.ideaTitle}
                    </Link>
                  </td>
                  <td>{ideaRating.ideaAuthorUuid}</td>
                  <td>{ideaRating.rating}</td>
                  <td>{ideaRating.ideaStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

export default IdeasRatingPage;
