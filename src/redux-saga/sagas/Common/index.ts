import { UPLOAD_IMAGE } from "redux-saga/actions";
import { REQUEST_METHOD, watchQuery } from "utils/common";

export function* uploadImage() {
  return yield watchQuery(
    UPLOAD_IMAGE,
    "f/i",
    REQUEST_METHOD.POST,
    undefined,
    true
  );
}
