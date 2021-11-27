import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import { fetchTokenAndData } from "./util/token";

//fetching initial data from localStorage: set in case of page reload
const data = fetchTokenAndData();

const store = createStore(combineReducers({ user: userReducer }), {
    user: data,
});

export default store;
