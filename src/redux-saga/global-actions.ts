import { EventInfo, Obj } from "interfaces/common";
import {
  CREATE_EVENT,
  CREATE_TICKET,
  QUERY_CATEGORY,
  QUERY_CATEGORY_TYPE,
  SAVE_EVENT_BASIC_INFO,
  UPDATE_EVENT,
  UPLOAD_IMAGE,
} from "redux-saga/actions";
import {
  QUERY_CATEGORY_SUCCESS,
  QUERY_CATEGORY_FAILURE,
  QUERY_CATEGORY_TYPE_SUCCESS,
  QUERY_CATEGORY_TYPE_FAILURE,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAILURE,
} from "./global-reducers";

export const queryCategory = (payload: Obj) => ({
  type: QUERY_CATEGORY,
  payload,
  response: {
    success: QUERY_CATEGORY_SUCCESS,
    failure: QUERY_CATEGORY_FAILURE,
  },
});

export const queryCategoryType = (payload?: Obj) => ({
  type: QUERY_CATEGORY_TYPE,
  payload: payload,
  response: {
    success: QUERY_CATEGORY_TYPE_SUCCESS,
    failure: QUERY_CATEGORY_TYPE_FAILURE,
  },
});

export const saveEventBasicInfo = (payload: Obj) => ({
  type: SAVE_EVENT_BASIC_INFO,
  payload: payload,
});

export const createEvent = (payload: Obj) => ({
  type: CREATE_EVENT,
  payload: payload,
  response: {
    success: CREATE_EVENT_SUCCESS,
    failure: CREATE_EVENT_FAILURE,
  },
});

export const updateEvent = (payload: Obj) => ({
  type: UPDATE_EVENT,
  payload: payload,
  response: {
    success: UPDATE_EVENT_SUCCESS,
    failure: UPDATE_EVENT_FAILURE,
  },
});

export const uploadImage = (payload: FormData) => ({
  type: UPLOAD_IMAGE,
  payload: payload,
  response: {
    success: UPLOAD_IMAGE_SUCCESS,
    failure: UPLOAD_IMAGE_FAILURE,
  },
});

export const createTicket = (payload: Obj) => ({
  type: CREATE_TICKET,
  payload: payload,
  response: {
    success: CREATE_TICKET_SUCCESS,
    failure: CREATE_TICKET_FAILURE,
  },
});
