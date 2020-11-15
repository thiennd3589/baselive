import { createReducer } from "utils";

export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const SignUp = createReducer(SIGN_UP_SUCCESS, SIGN_UP_FAILURE);
