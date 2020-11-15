import Axios from "axios";
import { Obj, Request } from "interfaces/common";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

export const BASE_URI = "http://45.77.24.242:8080/api/v1/";
export enum REQUEST_METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export const configAxios = (
  url: string,
  method: REQUEST_METHOD,
  params?: Obj,
  baseURL?: string,
  data?: Obj
) => ({
  url,
  method,
  headers: {
    "Content-Type": "application/json",
  },
  params,
  baseURL: baseURL ? baseURL : BASE_URI,
  data,
});

export const query = async (
  url: string,
  method: REQUEST_METHOD,
  params?: Obj,
  baseURL?: string,
  data?: Obj
) => {
  const config = configAxios(url, method, params, baseURL, data);
  return Axios(config);
};

export function* doQuery(
  url: string,
  method: REQUEST_METHOD,
  baseURL?: string,
  request?: Request<Obj>
) {
  try {
    console.log(method, request);
    let response;
    if (method === REQUEST_METHOD.GET) {
      response = yield query(url, method, request?.payload, baseURL);
    } else if (method === REQUEST_METHOD.POST) {
      response = yield query(url, method, undefined, baseURL, request?.payload);
    }
    if (response.status === 200) {
      yield put({ type: request?.response?.success, payload: response });
    } else if (response.status === 201) {
      yield put({ type: request?.response?.success, payload: response });
    } else {
      yield put({ type: request?.response?.failure, payload: response });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchQuery(
  action: string,
  url: string,
  method: REQUEST_METHOD,
  baseURL?: string,
  mode?: "latest" | "every" | "throttle" | "debounce"
): Generator {
  if (mode == null) {
    if (method !== REQUEST_METHOD.GET) {
      mode = "latest";
    } else {
      mode = "every";
    }
  }

  console.log(action);
  switch (mode) {
    case "latest":
      yield takeLatest(action, doQuery, url, method, baseURL);
      break;
    case "every":
      yield takeEvery(action, doQuery, url, method, baseURL);
      break;
    default:
      break;
  }
}
