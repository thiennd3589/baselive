import { combineReducers } from "redux";
import { Events } from "components/EventPicker/reducers";
import { Category, CategoryType } from "./global-reducers";
import { SignUp } from "screens/Login/reducers";

export const state = combineReducers({
  events: Events,
  category: Category,
  categoryType: CategoryType,
  signUp: SignUp,
});

export type State = ReturnType<typeof state>;
