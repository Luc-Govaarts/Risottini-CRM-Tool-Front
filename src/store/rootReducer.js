import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import appFeed from "./appFeed/reducer"

export default combineReducers({
  appFeed,
  appState,
  user
});
