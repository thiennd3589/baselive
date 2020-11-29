import { all } from "redux-saga/effects";
import { uploadImage } from "./sagas/Common";
import {
  queryEvents,
  queryCategory,
  queryCategoryType,
  createEvent,
  updateEvent,
  createTicket,
} from "./sagas/Events";
import { logIn, signUp } from "./sagas/Login";

function* sagas() {
  yield all([
    queryEvents(),
    queryCategory(),
    queryCategoryType(),
    createEvent(),
    updateEvent(),
    createTicket(),
    //
    uploadImage(),
    //
    logIn(),
    signUp(),
  ]);
}

export default sagas;
