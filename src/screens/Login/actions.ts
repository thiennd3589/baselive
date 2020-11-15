import { Obj } from "interfaces/common";
import { LOG_IN, SIGN_UP } from "redux-saga/actions";
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
} from "./reducers";

export const signUp = (payload: Obj) => ({
  type: SIGN_UP,
  payload,
  response: {
    success: SIGN_UP_SUCCESS,
    failed: SIGN_UP_FAILURE,
  },
});

export const logIn = (payload: Obj) => ({
  type: LOG_IN,
  payload,
  response: {
    success: LOG_IN_SUCCESS,
    failed: LOG_IN_FAILURE,
  },
});
