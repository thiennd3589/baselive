import { QUERY_CATEGORY, QUERY_CATEGORY_TYPE, QUERY_EVENTS } from "redux-saga/actions";
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
