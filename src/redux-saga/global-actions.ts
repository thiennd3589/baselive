import { Obj } from "interfaces/common";
import { QUERY_CATEGORY, QUERY_CATEGORY_TYPE } from "redux-saga/actions";
import {
  QUERY_CATEGORY_SUCCESS,
  QUERY_CATEGORY_FAILURE,
  QUERY_CATEGORY_TYPE_SUCCESS,
  QUERY_CATEGORY_TYPE_FAILURE,
} from "./global-reducers";

export const queryCategory = (payload: Obj) => ({
  type: QUERY_CATEGORY,
  payload,
  response: {
    success: QUERY_CATEGORY_SUCCESS,
    failed: QUERY_CATEGORY_FAILURE,
  },
});

export const queryCategoryType = (payload?: Obj) => ({
  type: QUERY_CATEGORY_TYPE,
  payload: { type: 0},
  response: {
    success: QUERY_CATEGORY_TYPE_SUCCESS,
    failed: QUERY_CATEGORY_TYPE_FAILURE,
  },
});
