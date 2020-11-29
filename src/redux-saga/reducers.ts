import { combineReducers } from "redux";
import { Events } from "components/EventPicker/reducers";
import {
  BasicInfoLocal,
  Category,
  CategoryType,
  CreateEventResult,
  CreateTicketResult,
  ImageUploaded,
  UpdateEventResult,
} from "./global-reducers";
import { LogIn, SignUp } from "screens/Login/reducers";

export const state = combineReducers({
  //
  imageUploaded: ImageUploaded,
  //events
  events: Events,
  createEventResult: CreateEventResult,
  updateEventResult: UpdateEventResult,
  createTicketResult: CreateTicketResult,
  //category
  category: Category,
  categoryType: CategoryType,

  //login
  signUp: SignUp,
  logIn: LogIn,

  //local
  basicInfoLocal: BasicInfoLocal,
});

export type State = ReturnType<typeof state>;
