import Axios from "axios";
import { Global } from "global";
import { Obj, Request } from "interfaces/common";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

export const BASE_URI = "https://baselive.net/app/api/v1/";
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
  return accessToken
    ? {
        url,
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            Global.user.token
              ? Global.user.token
              : localStorage.getItem("accessToken")
          }`,
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
  const config = configAxios(url, method, params, baseURL, accessToken, data);
  return Axios(config);
};

export function* doQuery(
  url: string,
  method: REQUEST_METHOD,
  baseURL?: string,
  accessToken?: boolean,
  notification?: boolean,
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
    if (response.status === 200) {
      if (notification) {
        yield notificationSuccess({ content: "Success" });
      }
      yield put({ type: request?.response?.success, payload: response });
    } else if (response.status === 201) {
      if (notification) {
        yield notificationSuccess({ content: "Success" });
      }
      yield put({ type: request?.response?.success, payload: response });
    } else {
      if (notification) {
        yield notificationError({ content: "Failure" });
      }
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
  notification?: boolean,
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
      yield takeLatest(
        action,
        doQuery,
        url,
        method,
        baseURL,
        accessToken,
        notification
      );
      break;
    case "every":
      yield takeEvery(
        action,
        doQuery,
        url,
        method,
        baseURL,
        accessToken,
        notification
      );
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

export const notificationSuccess = (params: Obj) => {
  toast.success(params.content, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notificationError = (params: Obj) => {
  toast.error(params.content, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const getIdFromYoutube = (link?: string) => {
  if (link) {
    let id = link.split("v=")[1];
    let ampersandPosition;
    if (id) {
      ampersandPosition = id.indexOf("&");
      if (ampersandPosition != -1) {
        id = id.substring(0, ampersandPosition);
      }
    } else {
      return undefined;
    }
    return id;
  } else {
    return undefined;
  }
};
