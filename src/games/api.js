import Network from "utils/network";

const api = {};

api.getParameter = (childId, gameCodeName) =>
  Network.get(`config/${childId}/${gameCodeName}`);

export default api;
