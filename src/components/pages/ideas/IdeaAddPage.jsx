import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";
import IdeaForm from "./IdeaForm";

const IdeaAddPage = () => {
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
    const requestBody = Object.fromEntries(formData.entries());
    fetch(API_ENDPOINT_URL, {
      headers: headers,
      method: form.method,
      body: JSON.stringify(requestBody),
    }).then((response) => {
      navigate("/my-ideas");
    });
  };

  return (
    <div className="ideas idea-add">
      <h1>Новая идея</h1>
      <IdeaForm method="POST" onSubmit={formSubmit} />
    </div>
  );
};

export default IdeaAddPage;
