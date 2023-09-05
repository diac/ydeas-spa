import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";
import IdeaForm from "./IdeaForm";

const IdeaEditPage = () => {
  const [state, setState] = useState();
  const { ideaId } = useParams();
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
    <div className="ideas idea-edit">
      {state && state.idea && (
        <React.Fragment>
          <h1>Редактирование идеи</h1>
          <IdeaForm method="" onSubmit={formSubmit} idea={state.idea} />
        </React.Fragment>
      )}
    </div>
  );
};

export default IdeaEditPage;
