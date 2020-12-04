import { EventInfo, Obj } from "interfaces/common";
import {
  CREATE_EVENT,
  CREATE_TICKET,
  QUERY_CATEGORY,
  QUERY_CATEGORY_TYPE,
  QUERY_EVENT_IN_HANOI,
  QUERY_EXPERIENCE_EVENT,
  QUERY_SINGLE_EVENT,
  QUERY_TICKET,
  QUERY_TRENDING_EVENT,
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
  QUERY_TRENDING_EVENT_SUCCESS,
  QUERY_TRENDING_EVENT_FAILURE,
  QUERY_EXPERIENCE_EVENT_SUCCESS,
  QUERY_EXPERIENCE_EVENT_FAILURE,
  QUERY_EVENT_IN_HANOI_SUCCESS,
  QUERY_EVENT_IN_HANOI_FAILURE,
  QUERY_SINGLE_EVENT_SUCCESS,
  QUERY_SINGLE_EVENT_FAILURE,
  QUERY_TICKET_SUCCESS,
  QUERY_TICKET_FAILURE,
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

export const queryTrendingEvent = () => ({
  type: QUERY_TRENDING_EVENT,
  payload: {
    fileterType: 0,
  },
  response: {
    success: QUERY_TRENDING_EVENT_SUCCESS,
    failure: QUERY_TRENDING_EVENT_FAILURE,
  },
});

export const queryExperienceEvent = () => ({
  type: QUERY_EXPERIENCE_EVENT,
  payload: {
    fileterType: 1,
  },
  response: {
    success: QUERY_EXPERIENCE_EVENT_SUCCESS,
    failure: QUERY_EXPERIENCE_EVENT_FAILURE,
  },
});

export const queryEventInHanoi = () => ({
  type: QUERY_EVENT_IN_HANOI,
  payload: {
    fileterType: 1,
  },
  response: {
    success: QUERY_EVENT_IN_HANOI_SUCCESS,
    failure: QUERY_EVENT_IN_HANOI_FAILURE,
  },
});

export const querySingleEvent = (payload: Obj) => ({
  type: QUERY_SINGLE_EVENT,
  payload,
  response: {
    success: QUERY_SINGLE_EVENT_SUCCESS,
    failure: QUERY_SINGLE_EVENT_FAILURE,
  },
});

export const queryTicket = (payload: Obj) => ({
  type: QUERY_TICKET,
  payload,
  response: {
    success: QUERY_TICKET_SUCCESS,
    failure: QUERY_TICKET_FAILURE,
  },
});
