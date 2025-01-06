/* eslint-disable @typescript-eslint/no-explicit-any */

import { statusHandler } from "./statusHandler";

export const errorHandler = (error: any) => {
  if (!error.response) {
    return { hasError: true, errorMessage: "NETWORK_ERROR" };
  } else {
    const { errorMessage } = statusHandler(error.response);
    return { hasError: true, errorMessage: errorMessage };
  }
};
