import { combineReducers } from "redux";
import homeReducer from "../Pages/Home/homeReducer";

const rootReducer = combineReducers({
    homeReducer,
});

export default rootReducer;
