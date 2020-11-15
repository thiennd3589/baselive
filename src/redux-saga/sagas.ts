import { all } from "redux-saga/effects";
import { queryEvents, queryCategory, queryCategoryType } from "./sagas/Events";
import { logIn, signUp } from "./sagas/Login";

function* sagas() {
  yield all([
    queryEvents(),
    queryCategory(),
    queryCategoryType(),

    logIn(),
    signUp(),
  ]);
}

export default sagas;
