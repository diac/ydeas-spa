import { useKeycloak } from "@react-keycloak/web";

class UsersService {
  #keycloak;
  #users = {};
  #promises = {};

  setKeycloak = (keycloak) => {
    this.#keycloak = keycloak;
  };

  getAll = () => {
    return this.#users;
  };

  get = (uuid) => {
    return this.#users[uuid];
  };

  put = (uuid, user) => {
    this.#users[uuid] = user;
    return this.get(uuid);
  };

  fetchUser = (uuid) => {
    if (this.get(uuid)) {
      return Promise.resolve();
    }
    const apiEndpointUrl =
      process.env.REACT_APP_YDEAS_API_HOST + `/users/${uuid}`;
    if (this.#promises[uuid]) {
      return this.#promises[uuid];
    }
    const headers = { Authorization: "Bearer " + this.#keycloak.token };
    this.#promises[uuid] = fetch(apiEndpointUrl, {
      headers: headers,
    })
      .then((result) => result.json())
      .then((result) => {
        delete this.#promises[uuid];
        this.put(uuid, result);
      });
    return this.#promises[uuid];
  };
}

const usersService = new UsersService();

const useUsersService = () => {
  const { keycloak } = useKeycloak();
  usersService.setKeycloak(keycloak);
  return usersService;
};

export default useUsersService;
