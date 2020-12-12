import { CREATE_BILL, QUERY_BILL, QUERY_TICKET } from "redux-saga/actions";
import { REQUEST_METHOD, watchQuery } from "utils/common";

export function* queryTicket() {
  return yield watchQuery(QUERY_TICKET, "t", REQUEST_METHOD.GET);
}

export function* createBill() {
  return yield watchQuery(
    CREATE_BILL,
    "c",
    REQUEST_METHOD.POST,
    undefined,
    true,
    true
  );
}

export function* queryBill() {
  return yield watchQuery(
    QUERY_BILL,
    "c/userCart",
    REQUEST_METHOD.GET,
    undefined,
    true
  );
}
