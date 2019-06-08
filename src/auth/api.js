import Network from "utils/network";

const api = {};

api.login = (email, password) =>
  Network.post("auth/login", {
    email,
    password
  });

api.logout = () => Network.post("auth/logout");

api.me = () => Network.get("auth/me");

export default api;
