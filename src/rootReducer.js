import { combineReducers } from "redux";
import authReducer from "auth/reducer";
import dashboardReducer from "dashboard/reducer";

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer
});
