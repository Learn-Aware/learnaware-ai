/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { errorHandler } from "./errorHandler";

export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const headerConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

const defaultTimeout = 25000;

class RestClient {
  constructor() {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(errorHandler(error));
      }
    );
  }

  API(method: string, url: string, body: any, header?: any, timeout?: number) {
    if (!header) {
      header = headerConfig;
    }
    switch (method) {
      case METHODS.GET:
        return this._get(url, header, timeout);
      case METHODS.POST:
        body = body || {};
        return this._post(url, body, header, timeout);
      case METHODS.PUT:
        return this._put(url, body, header, timeout);
      case METHODS.DELETE:
        return this._delete(url, body, header, timeout);
      default:
        break;
    }
  }

  async _get(url: string, header: any, timeout = defaultTimeout) {
    axios.defaults.timeout = timeout;
    return axios
      .get(url, { headers: header })
      .then((response) => response)
      .catch((error) => error);
  }

  async _post(url: string, body: any, header: any, timeout = defaultTimeout) {
    axios.defaults.timeout = timeout;
    return axios
      .post(url, body, header)
      .then((response) => response)
      .catch((error) => error);
  }

  async _put(url: string, body: any, header: any, timeout = defaultTimeout) {
    axios.defaults.timeout = timeout;
    return axios
      .put(url, body, { headers: header })
      .then((response) => response)
      .catch((error) => error);
  }

  async _delete(url: string, body: any, header: any, timeout = defaultTimeout) {
    axios.defaults.timeout = timeout;
    return axios
      .delete(url, { headers: header, data: body })
      .then((response) => response)
      .catch((error) => error);
  }
}

export const client = new RestClient();
