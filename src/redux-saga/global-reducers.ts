import { Obj } from "interfaces/common";
import { Action } from "interfaces/common";
import { createReducer } from "utils";
import { SAVE_EVENT_BASIC_INFO } from "./actions";

export const QUERY_CATEGORY_SUCCESS = "QUERY_CATEGORY_SUCCESS";
export const QUERY_CATEGORY_FAILURE = "QUERY_CATEGORY_FAILURE";

export const Category = createReducer(
  QUERY_CATEGORY_SUCCESS,
  QUERY_CATEGORY_FAILURE
);

export const QUERY_CATEGORY_TYPE_SUCCESS = "QUERY_CATEGORY_TYPE_SUCCESS";
export const QUERY_CATEGORY_TYPE_FAILURE = "QUERY_CATEGORY_TYPE_FAILURE";

export const CategoryType = createReducer(
  QUERY_CATEGORY_TYPE_SUCCESS,
  QUERY_CATEGORY_TYPE_FAILURE
);

export const BasicInfoLocal = (
  state: null | Obj = null,
  action: Action<Obj>
) => {
  switch (action.type) {
    case SAVE_EVENT_BASIC_INFO:
      return action.payload;
    default:
      return state;
  }
};

export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
export const CREATE_EVENT_FAILURE = "CREATE_EVENT_FAILURE";

export const CreateEventResult = createReducer(
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE
);

export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAILURE = "UPDATE_EVENT_FAILURE";

export const UpdateEventResult = createReducer(
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE
);

export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";

export const ImageUploaded = createReducer(
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE
);

export const CREATE_TICKET_SUCCESS = "CREATE_TICKET_SUCCESS";
export const CREATE_TICKET_FAILURE = "CREATE_TICKET_FAILURE";

export const CreateTicketResult = createReducer(
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAILURE
);

export const QUERY_TRENDING_EVENT_SUCCESS = "QUERY_TRENDING_EVENT_SUCCESS";
export const QUERY_TRENDING_EVENT_FAILURE = "QUERY_TRENDING_EVENT_FAILURE";

export const TrendingEvent = createReducer(
  QUERY_TRENDING_EVENT_SUCCESS,
  QUERY_TRENDING_EVENT_FAILURE
);

export const QUERY_EXPERIENCE_EVENT_SUCCESS = "QUERY_EXPERIENCE_EVENT_SUCCESS";
export const QUERY_EXPERIENCE_EVENT_FAILURE = "QUERY_EXPERIENCE_EVENT_FAILURE";

export const ExperienceEvent = createReducer(
  QUERY_EXPERIENCE_EVENT_SUCCESS,
  QUERY_TRENDING_EVENT_FAILURE
);

export const QUERY_EVENT_IN_HANOI_SUCCESS = "QUERY_EVENT_IN_HANOI_SUCCESS";
export const QUERY_EVENT_IN_HANOI_FAILURE = "QUERY_EVENT_IN_HANOI_FAILURE";

export const EventInHanoi = createReducer(
  QUERY_EVENT_IN_HANOI_SUCCESS,
  QUERY_EVENT_IN_HANOI_FAILURE
);

export const QUERY_SINGLE_EVENT_SUCCESS = "QUERY_SINGLE_EVENT_SUCCESS";
export const QUERY_SINGLE_EVENT_FAILURE = "QUERY_SINGLE_EVENT_FAILURE";

export const Event = createReducer(
  QUERY_SINGLE_EVENT_SUCCESS,
  QUERY_SINGLE_EVENT_FAILURE
);

export const QUERY_TICKET_SUCCESS = "QUERY_TICKET_SUCCESS";
export const QUERY_TICKET_FAILURE = "QUERY_TICKET_FAILURE";

export const Ticket = createReducer(QUERY_TICKET_SUCCESS, QUERY_TICKET_FAILURE);
