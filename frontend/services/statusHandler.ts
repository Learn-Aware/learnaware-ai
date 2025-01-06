/* eslint-disable @typescript-eslint/no-explicit-any */

const alert = (title: string, message: string) => {
  console.log(title, message);
};

export const statusHandler = (responseObj: any) => {
  if (responseObj == undefined) {
    return { hasError: true, errorMessage: "SERVER_ERROR" };
  } else {
    switch (responseObj.status) {
      case 400:
        alert("Bad request", "");
        return {
          hasError: true,
          errorMessage: responseObj?.data?.error,
        };
      case 401:
        alert("Authentication Error", "");
        return { hasError: true, errorMessage: "UNAUTHORIZED" };
      case 403:
        return { hasError: true, errorMessage: "FORBIDDEN" };
      case 404:
        return { hasError: true, errorMessage: "NOT_FOUND" };
      case 500:
        alert("Server Error", "Internal Backend Error");
        return { hasError: true, errorMessage: "SERVER_ERROR" };
      case 200:
        if (responseObj?.data?.success) {
          return { hasError: false, errorMessage: "" };
        } else {
          let errorMsg = "";
          errorMsg = JSON.stringify(responseObj?.data?.error);
          alert("Server Error", "Error returned from server : " + errorMsg);
          return {
            hasError: true,
            errorMessage: responseObj?.data?.error,
          };
        }
      default:
        return { hasError: false, errorMessage: "" };
    }
  }
};
