import Network from "utils/network";

const api = {};

api.getAll = () => Network.get(`games`);

api.findByChildId = childId => Network.get(`games/${childId}`);

export default api;
