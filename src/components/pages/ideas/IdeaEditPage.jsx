import React from "react";
import { useState } from "react";
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";
import IdeaForm from "./IdeaForm";
import IdeaAttachments from "./IdeaAttachments";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const IdeaEditPage = () => {
  const [state, setState] = useState();
  const { ideaId } = useParams();
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const fetchIdea = useCallback(() => {
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST + `/ideas/idea/${ideaId}`;
    const headers = { Authorization: "Bearer " + keycloak.token };
    return fetch(API_ENDPOINT_URL, {
      headers: headers,
    })
      .then((result) => result.json())
      .then((result) => {
        setState((oldState) => ({
          ...oldState,
          isLoaded: true,
          idea: result,
          editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(htmlToDraft(result.description))
          ),
        }));
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
    const requestBody = {
      ...Object.fromEntries(formData.entries()),
      description: draftToHtml(
        convertToRaw(state.editorState.getCurrentContent())
      ),
    };
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

  const onEditorStateChange = useCallback((editorState) => {
    setState((oldState) => ({
      ...oldState,
      editorState,
      idea: {
        ...oldState.idea,
        description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      },
    }));
  }, []);

  useEffect(() => {
    fetchIdea().then(() => {
      setState((oldState) => ({
        ...oldState,
        editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(oldState.idea.description)
          )
        ),
      }));
    });
  }, [fetchIdea, setState]);

  return (
    <div className="ideas idea-edit">
      {state && state.idea && (
        <React.Fragment>
          <h1>Редактирование идеи</h1>
          <IdeaForm
            method=""
            onSubmit={formSubmit}
            idea={state.idea}
            editorState={state.editorState}
            onEditorStateChange={onEditorStateChange}
          />

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
