import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import IdeaAttachments from "./IdeaAttachments";

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

  const like = () => {
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST + `/ideas/idea_rate/${ideaId}/like`;
    const headers = { Authorization: `Bearer ${keycloak.token}` };
    fetch(API_ENDPOINT_URL, {
      headers: headers,
      method: "POST",
    });
  };

  const dislike = () => {
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST +
      `/ideas/idea_rate/${ideaId}/dislike`;
    const headers = { Authorization: `Bearer ${keycloak.token}` };
    fetch(API_ENDPOINT_URL, {
      headers: headers,
      method: "POST",
    });
  };

  const approve = () => {
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST +
      `/ideas/idea_review/${ideaId}/approve`;
    const headers = { Authorization: `Bearer ${keycloak.token}` };
    fetch(API_ENDPOINT_URL, {
      headers: headers,
      method: "POST",
    });
  };

  const decline = () => {
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST +
      `/ideas/idea_review/${ideaId}/decline`;
    const headers = { Authorization: `Bearer ${keycloak.token}` };
    fetch(API_ENDPOINT_URL, {
      headers: headers,
      method: "POST",
    });
  };

  const ideaDescriptionElement = (ideaDescription) => {
    const HtmlToReactParser = require("html-to-react").Parser;
    const htmlToReactParser = new HtmlToReactParser();
    const reactElement = htmlToReactParser.parse(state.idea.description);
    return reactElement;
  };

  useEffect(() => {
    fetchIdea();
  }, [fetchIdea]);

  return (
    <div className="idea single-idea">
      {state && state.idea && (
        <React.Fragment>
          <h1>{state.idea.title}</h1>
          <article className="mb-2">
            {ideaDescriptionElement(state.idea.description)}
          </article>
          <div>Автор: {state.idea.authorUuid}</div>
          <hr />
          <div className="attachments">
            <h2>Прикрепленные файлы</h2>

            <IdeaAttachments
              attachments={state.idea.attachments}
              allowRemove={keycloak.subject === state.idea.authorUuid}
              ideaId={state.idea.id}
              callback={fetchIdea}
            />
          </div>
          <hr />
          <div className="controls">
            <button type="button" className="btn btn-light" onClick={like}>
              Like
            </button>
            <button type="button" className="btn btn-light" onClick={dislike}>
              Dislike
            </button>
          </div>
          {keycloak.hasRealmRole("EXPERT") && (
            <div className="controls">
              <button type="button" className="btn btn-light" onClick={approve}>
                Approve
              </button>
              <button type="button" className="btn btn-light" onClick={decline}>
                Decline
              </button>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default IdeaViewPage;
