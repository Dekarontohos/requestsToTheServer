import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { DataReducer } from "./reducers.js/DataReducer";
import { ActionStatusesReducer } from "./reducers.js/ActionStatusesReducer";

const reducer = combineReducers({
	dataState: DataReducer,
	actionsStatusesState: ActionStatusesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
