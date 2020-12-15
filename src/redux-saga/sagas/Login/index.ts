import { LOG_IN, SIGN_UP } from "redux-saga/actions";
import { REQUEST_METHOD, watchQuery } from "utils/common";

export function* signUp() {
  return yield watchQuery(SIGN_UP, "u/register", REQUEST_METHOD.POST);
}

export function* logIn() {
  return yield watchQuery(
    LOG_IN,
    "login",
    REQUEST_METHOD.POST,
    " https://baselive.net/app",
    undefined,
    true
  );
}
