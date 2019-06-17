import Network from "utils/network";

const api = {};

api.getAll = parentId => Network.get(`children/${parentId}`);

api.deleteChild = id => Network.delete(`children/${id}`).then(() => ({ id }));

api.getChildConfig = childId => Network.get(`config/${childId}`);

api.updateChildConfig = data => Network.put(`config`, { data });

api.getStats = childId => Network.get(`stats/${childId}`);

export default api;
