import { createReducer } from "utils";

export const QUERY_EVENT_SUCCESS = "QUERY_EVENT_SUCCESS";
export const QUERY_EVENT_FAILURE = "QUERY_EVENT_FAILURE";

export const Events = createReducer(QUERY_EVENT_SUCCESS, QUERY_EVENT_FAILURE);
