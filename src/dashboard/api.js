import Network from "utils/network";

const api = {};

api.getAll = parentId => Network.get(`children/${parentId}`);

api.deleteChild = id => Network.delete(`children/${id}`).then(() => ({ id }));

export default api;
