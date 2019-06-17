import Network from "utils/network";

const api = {};

api.getParameter = (childId, gameCodeName) =>
  Network.get(`config/${childId}/${gameCodeName}`);

api.createStat = (childId, gameCodeName, statValue, time) =>
  Network.post(`stats`, {
    childId,
    gameCodeName,
    statValue,
    time
  });

export default api;
