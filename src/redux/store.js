import { createStore, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import { TeamReducer } from "./reducer";

export const Store = createStore(TeamReducer, applyMiddleware(ThunkMiddleware));
