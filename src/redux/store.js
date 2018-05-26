import {applyMiddleware, combineReducers, createStore} from "redux";
import {allReducers} from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const middleware = applyMiddleware(thunk);
const rootReducer = combineReducers(allReducers);

export const store = createStore(rootReducer, composeWithDevTools(), middleware);