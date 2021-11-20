import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";

const store = createStore(combineReducers({ user: userReducer }));

export default store;
