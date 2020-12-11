import { combineReducers } from "redux";
import { Events } from "components/EventPicker/reducers";
import {
  BasicInfoLocal,
  Category,
  CategoryType,
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

  //ticket
  createTicketResult: CreateTicketResult,
  ticket: Ticket,
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
