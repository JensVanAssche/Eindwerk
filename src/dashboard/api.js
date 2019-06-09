import Network from "utils/network";

const api = {};

api.getAll = parentId => Network.get(`children/${parentId}`);

export default api;
