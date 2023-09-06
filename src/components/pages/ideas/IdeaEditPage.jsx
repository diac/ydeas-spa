import React from "react";
import { useState } from "react";
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";
import IdeaForm from "./IdeaForm";
import IdeaAttachments from "./IdeaAttachments";

const IdeaEditPage = () => {
  const [state, setState] = useState();
  const { ideaId } = useParams();
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const fetchIdea = useCallback(() => {
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST + `/ideas/idea/${ideaId}`;
    const headers = { Authorization: "Bearer " + keycloak.token };
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
  }, [ideaId, keycloak.token]);

  const formSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST + `/ideas/idea/${ideaId}`;
    const headers = {
      Authorization: "Bearer " + keycloak.token,
      "Content-Type": "application/json",
    };
    const requestBody = Object.fromEntries(formData.entries());
    fetch(API_ENDPOINT_URL, {
      headers: headers,
      method: "PUT",
      body: JSON.stringify(requestBody),
    }).then((response) => {
      navigate("/my-ideas");
    });
  };

  const attachFile = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST +
      `/ideas/media/upload_for_idea/${ideaId}`;
    const headers = {
      Authorization: "Bearer " + keycloak.token,
    };
    fetch(API_ENDPOINT_URL, {
      headers: headers,
      method: "POST",
      body: formData,
    }).then(() => fetchIdea());
  };

  useEffect(() => {
    fetchIdea();
  }, [fetchIdea]);

  return (
    <div className="ideas idea-edit">
      {state && state.idea && (
        <React.Fragment>
          <h1>Редактирование идеи</h1>
          <IdeaForm method="" onSubmit={formSubmit} idea={state.idea} />

          <hr />
          <div className="attachments">
            <h2>Прикрепленные файлы</h2>

            <IdeaAttachments
              attachments={state.idea.attachments}
              allowRemove={keycloak.subject === state.idea.authorUuid}
              ideaId={state.idea.id}
              callback={fetchIdea}
            />

            <form method="POST" onSubmit={attachFile}>
              <div className="mb-2">
                <label htmlFor="file">Прикрепить файл</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  className="form-control"
                />
              </div>
              <div className="controls">
                <button type="submit" className="btn btn-success">
                  Прикрепить
                </button>
              </div>
            </form>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default IdeaEditPage;
