import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const IdeaViewPage = () => {
  const { ideaId } = useParams();
  const { keycloak } = useKeycloak();
  const [state, setState] = useState();

  const fetchIdea = useCallback(() => {
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST + `/ideas/idea/${ideaId}`;
    const headers = { Authorization: `Bearer ${keycloak.token}` };
    fetch(API_ENDPOINT_URL, {
      headers: headers,
    })
      .then((result) => result.json())
      .then((result) => {
        setState({
          isLoaded: true,
          idea: result,
        });
      });
  }, [ideaId, keycloak]);

  useEffect(() => {
    fetchIdea();
  }, [fetchIdea]);

  return (
    <div className="idea single-idea">
      {state && state.idea && (
        <React.Fragment>
          <h1>{state.idea.title}</h1>
          <p className="mb-2">{state.idea.description}</p>
          <div>Автор: {state.idea.authorUuid}</div>
        </React.Fragment>
      )}
    </div>
  );
};

export default IdeaViewPage;
