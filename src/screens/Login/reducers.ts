import { createReducer } from "utils";

export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LogIn = createReducer(LOG_IN_SUCCESS, LOG_IN_FAILURE);
