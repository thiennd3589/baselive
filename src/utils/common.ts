import Axios from "axios";
import { Global } from "global";
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
  accessToken?: boolean,
  data?: Obj
) => {
  accessToken && console.log(accessToken);
  return accessToken
    ? {
        url,
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Global.user.token}`,
        },
        params,
        baseURL: baseURL ? baseURL : BASE_URI,
        data,
      }
    : {
        url,
        method,
        headers: {
          "Content-Type": "application/json",
        },
        params,
        baseURL: baseURL ? baseURL : BASE_URI,
        data,
      };
};
export const query = async (
  url: string,
  method: REQUEST_METHOD,
  params?: Obj,
  baseURL?: string,
  accessToken?: boolean,
  data?: Obj
) => {
  console.log(data);
  const config = configAxios(url, method, params, baseURL, accessToken, data);
  return Axios(config);
};

export function* doQuery(
  url: string,
  method: REQUEST_METHOD,
  baseURL?: string,
  accessToken?: boolean,
  request?: Request<Obj>
) {
  let response;
  try {
    if (method === REQUEST_METHOD.GET) {
      response = yield query(
        url,
        method,
        request?.payload,
        baseURL,
        accessToken
      );
    } else {
      response = yield query(
        url,
        method,
        undefined,
        baseURL,
        accessToken,
        request?.payload
      );
    }
    yield console.log(response);
    if (response.status === 200) {
      yield put({ type: request?.response?.success, payload: response });
    } else if (response.status === 201) {
      yield put({ type: request?.response?.success, payload: response });
    } else {
      yield put({ type: request?.response?.failure, payload: response });
    }
  } catch (error) {
    yield put({ type: request?.response?.failure, payload: error.response });
    console.log(error);
  }
}

export function* watchQuery(
  action: string,
  url: string,
  method: REQUEST_METHOD,
  baseURL?: string,
  accessToken?: boolean,
  mode?: "latest" | "every" | "throttle" | "debounce"
): Generator {
  if (mode == null) {
    if (method !== REQUEST_METHOD.GET) {
      mode = "latest";
    } else {
      mode = "every";
    }
  }

  switch (mode) {
    case "latest":
      yield takeLatest(action, doQuery, url, method, baseURL, accessToken);
      break;
    case "every":
      yield takeEvery(action, doQuery, url, method, baseURL, accessToken);
      break;
    default:
      break;
  }
}

export const handleRESTError = (response: Response) => {
  if (response.status !== 200) {
    throw {
      code: response.status,
      message: response.statusText,
    };
  }
  return response;
};

export const mapCategoryToDropdownOptions = (category: Obj[]) => {
  return category.map((item) => ({
    key: item.id,
    text: item.name,
    value: item.name,
    id: item.id,
  }));
};
