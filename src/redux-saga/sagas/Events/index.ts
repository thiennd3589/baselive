import {
  CREATE_EVENT,
  CREATE_TICKET,
  QUERY_CATEGORY,
  QUERY_CATEGORY_TYPE,
  QUERY_EVENTS,
  QUERY_EVENT_IN_HANOI,
  QUERY_EXPERIENCE_EVENT,
  QUERY_SINGLE_EVENT,
  QUERY_TRENDING_EVENT,
  UPDATE_EVENT,
} from "redux-saga/actions";
import { REQUEST_METHOD, watchQuery } from "utils/common";

export function* queryCategory() {
  return yield watchQuery(QUERY_CATEGORY, "ap", REQUEST_METHOD.GET);
}

export function* queryCategoryType() {
  return yield watchQuery(QUERY_CATEGORY_TYPE, "ap", REQUEST_METHOD.GET);
}

export function* queryEvents() {
  return yield watchQuery(QUERY_EVENTS, "e", REQUEST_METHOD.GET);
}

export function* createEvent() {
  yield watchQuery(CREATE_EVENT, "e", REQUEST_METHOD.POST, undefined, true);
}

export function* updateEvent() {
  yield watchQuery(UPDATE_EVENT, "e", REQUEST_METHOD.PUT, undefined, true);
}

export function* createTicket() {
  yield watchQuery(CREATE_TICKET, "t", REQUEST_METHOD.POST, undefined, true);
}

export function* queryTrendingEvent() {
  return yield watchQuery(QUERY_TRENDING_EVENT, "e", REQUEST_METHOD.GET);
}

export function* queryExperienceEvent() {
  return yield watchQuery(QUERY_EXPERIENCE_EVENT, "e", REQUEST_METHOD.GET);
}
export function* queryEventInHanoi() {
  return yield watchQuery(QUERY_EVENT_IN_HANOI, "e", REQUEST_METHOD.GET);
}

export function* querySingleEvent() {
  return yield watchQuery(QUERY_SINGLE_EVENT, "e/detail", REQUEST_METHOD.GET);
}
