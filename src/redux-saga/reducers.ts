import { combineReducers } from "redux";
import { Events } from "components/EventPicker/reducers";
import {
  BasicInfoLocal,
  Bill,
  Category,
  CategoryType,
  CreateBillResult,
  CreateEventResult,
  CreateTicketResult,
  Event,
  EventInHanoi,
  ExperienceEvent,
  ImageUploaded,
  Language,
  Ticket,
  TrendingEvent,
  UpdateEventResult,
  UserEvent,
} from "./global-reducers";
import { LogIn } from "screens/Login/reducers";
import { SignUp } from "screens/SignUp/reducers";

export const state = combineReducers({
  //
  imageUploaded: ImageUploaded,

  //events
  events: Events,
  createEventResult: CreateEventResult,
  updateEventResult: UpdateEventResult,
  trendingEvent: TrendingEvent,
  experieneEvent: ExperienceEvent,
  eventInHanoi: EventInHanoi,
  event: Event,
  userEvent: UserEvent,

  //ticket
  createBillResult: CreateBillResult,
  createTicketResult: CreateTicketResult,
  ticket: Ticket,
  bill: Bill,

  //category
  category: Category,
  categoryType: CategoryType,

  //login
  signUp: SignUp,
  logIn: LogIn,

  //local
  basicInfoLocal: BasicInfoLocal,
  language: Language,
});

export type State = ReturnType<typeof state>;
