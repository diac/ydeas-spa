import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Paging from "../../ui/Paging";
import DateTime from "../../ui/DateTime";
import Loader from "../../ui/Loader";

const MyIdeasPage = () => {
  const [state, setState] = useState();
  const [searchParams] = useSearchParams();
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const fetchIdeas = useCallback(() => {
    setState((oldState) => ({
      ...oldState,
      isLoaded: false,
    }));
    const pageNumber = searchParams.get("page") || 1;
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST +
      `/ideas/idea/my_ideas?page=${pageNumber}`;
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
        if (result.content.length === 0) {
          navigate("/my-ideas");
        }
      });
  }, [keycloak.token, searchParams, navigate]);

  const deleteIdea = (ideaId) => {
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST + `/ideas/idea/${ideaId}`;
    const headers = { Authorization: "Bearer " + keycloak.token };
    fetch(API_ENDPOINT_URL, {
      method: "DELETE",
      headers: headers,
    }).then(() => {
      fetchIdeas();
    });
  };

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas, searchParams]);

  return (
    <React.Fragment>
      {state && state.page && (
        <div className="ideas my-ideas">
          <h1>Мои идеи</h1>
          <Loader isLoaded={state && state.isLoaded}>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Идея</th>
                  <th>Дата и время создания</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {state.page.content.map((idea) => (
                  <tr key={idea.id}>
                    <td>
                      <Link to={`/ideas/${idea.id}`}>{idea.title}</Link>
                    </td>
                    <td>
                      <DateTime value={idea.createdAt} />
                    </td>
                    <td>
                      <div className="btn-group">
                        <Link
                          to={`/ideas/${idea.id}/edit`}
                          className="btn btn-primary"
                        >
                          Редактировать
                        </Link>
                        <button
                          onClick={() => {
                            if (window.confirm(`Удалить идею ${idea.title}?`)) {
                              deleteIdea(idea.id);
                            }
                          }}
                          className="btn btn-danger"
                        >
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Loader>

          {state.page.content.length > 0 && (
            <Paging
              pageNumber={state.page.number + 1}
              totalPages={state.page.totalPages}
              onUpdate={fetchIdeas}
            />
          )}

          <div className="controls">
            <Link to="/ideas/new" className="btn btn-primary">
              Добавить новую идею
            </Link>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MyIdeasPage;
