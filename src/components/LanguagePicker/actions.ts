import { CHANGE_LANGUAGE } from "redux-saga/actions";

export const changeLanguage = (payload: string) => ({
  type: CHANGE_LANGUAGE,
  payload,
});
