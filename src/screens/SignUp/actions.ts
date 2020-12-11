import { Obj } from "interfaces/common";
import { SIGN_UP } from "redux-saga/actions";
import { SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "./reducers";

export const signUp = (payload: Obj) => ({
  type: SIGN_UP,
  payload,
  response: {
    success: SIGN_UP_SUCCESS,
    failure: SIGN_UP_FAILURE,
  },
});
