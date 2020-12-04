import { QUERY_TICKET } from "redux-saga/actions";
import { REQUEST_METHOD, watchQuery } from "utils/common";

export function* queryTicket() {
  return yield watchQuery(QUERY_TICKET, "t", REQUEST_METHOD.GET);
}
