import { QUERY_EVENTS } from "redux-saga/actions";
import { QUERY_EVENT_FAILURE, QUERY_EVENT_SUCCESS } from "./reducers";

export const queryEvents = (payload: any) => ({
  type: QUERY_EVENTS,
  payload,
  response: {
    success: QUERY_EVENT_SUCCESS,
    failed: QUERY_EVENT_FAILURE,
  },
});
