import { all } from "redux-saga/effects";
import { queryEvents, queryCategory, queryCategoryType } from "./sagas/Events";
import { signUp } from "./sagas/Login";

function* sagas() {
  yield all([queryEvents(), queryCategory(), signUp(), queryCategoryType()]);
}

export default sagas;
