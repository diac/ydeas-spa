import React, { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import IdeaForm from "./IdeaForm";

const IdeaAddPage = () => {
  const [state, setState] = useState();
  const { keycloak } = useKeycloak();

  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST + "/ideas/idea";
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
      method: form.method,
      body: JSON.stringify(requestBody),
    }).then((response) => {
      navigate("/my-ideas");
    });
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

  useEffect(
    () => setState((oldState) => ({ ...oldState, idea: {} })),
    [setState]
  );

  return (
    <div className="ideas idea-add">
      <h1>Новая идея</h1>
      <IdeaForm
        method="POST"
        onSubmit={formSubmit}
        editorState={(state && state.editorState) || EditorState.createEmpty()}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default IdeaAddPage;
