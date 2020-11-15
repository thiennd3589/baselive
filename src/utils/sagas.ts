import { Obj, Action } from "interfaces/common";

export const createReducer = (success: string, failure: string) => {
  return (state: Obj | null = null, action: Action<Obj>) => {
    switch (action.type) {
      case success:
        return { response: action.payload, success: true };
      case failure:
        return { response: action.payload, success: false };
      default:
        return state;
    }
  };
};
