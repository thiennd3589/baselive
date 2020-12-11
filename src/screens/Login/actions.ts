import { Obj } from "interfaces/common";
import { LOG_IN, SIGN_UP } from "redux-saga/actions";
import { LOG_IN_SUCCESS, LOG_IN_FAILURE } from "./reducers";

export const logIn = (payload: Obj) => ({
  type: LOG_IN,
  payload,
  response: {
    success: LOG_IN_SUCCESS,
    failure: LOG_IN_FAILURE,
  },
});
