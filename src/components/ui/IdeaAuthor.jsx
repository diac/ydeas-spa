import React from "react";
import { useEffect, useCallback, useState } from "react";
import useUsersService from "../../services/UsersService";

const IdeaAuthor = (props) => {
  const [state, setState] = useState();
  const usersService = useUsersService();
  const { uuid } = props;

  const fetchUser = useCallback(
    (uuid) => {
      usersService
        .fetchUser(uuid)
        .then(() => setState({ user: usersService.get(uuid) }));
    },
    [usersService, setState]
  );

  useEffect(() => {
    fetchUser(uuid);
  }, [fetchUser, uuid]);

  return (
    <React.Fragment>
      {state && state.user && (
        <div className="idea-author">
          Автор:{" "}
          <span className="author-name">{`${state.user.firstName} ${state.user.lastName}`}</span>
        </div>
      )}
    </React.Fragment>
  );
};

export default IdeaAuthor;
