import { all } from "redux-saga/effects";
import { uploadImage } from "./sagas/Common";
import {
  queryEvents,
  queryCategory,
  queryCategoryType,
  createEvent,
  updateEvent,
  createTicket,
  queryTrendingEvent,
  queryExperienceEvent,
  queryEventInHanoi,
  querySingleEvent,
} from "./sagas/Events";
import { logIn, signUp } from "./sagas/Login";
import { queryTicket } from "./sagas/Ticket";

function* sagas() {
  yield all([
    queryEvents(),
    queryCategory(),
    queryCategoryType(),
    createEvent(),
    updateEvent(),
    createTicket(),
    queryTrendingEvent(),
    queryExperienceEvent(),
    queryEventInHanoi(),
    querySingleEvent(),
    queryTicket(),
    //
    uploadImage(),
    //
    logIn(),
    signUp(),
  ]);
}

export default sagas;
