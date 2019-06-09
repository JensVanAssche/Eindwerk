import Network from "utils/network";

const api = {};

api.signupParent = (firstName, lastName, email, password) =>
  Network.post("parents", {
    firstName,
    lastName,
    email,
    password
  });

api.signupChild = (firstName, lastName, parentId, password) =>
  Network.post("children", {
    firstName,
    lastName,
    parentId,
    password
  });

api.loginParent = (email, password) =>
  Network.post("auth/login-parent", {
    email,
    password
  });

api.loginChild = (firstName, lastName, email, password) =>
  Network.post("auth/login-child", {
    firstName,
    lastName,
    email,
    password
  });

api.logout = () => Network.post("auth/logout");

api.me = () => Network.get("auth/me");

export default api;
