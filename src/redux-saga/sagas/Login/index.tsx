import { SIGN_UP } from "redux-saga/actions";
import { REQUEST_METHOD, watchQuery } from "utils/common";

export function* signUp() {
  return yield watchQuery(SIGN_UP, "register", REQUEST_METHOD.POST);
}
