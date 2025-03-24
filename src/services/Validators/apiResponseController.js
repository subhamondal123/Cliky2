import { Toaster } from "../common-view-function";

// for api response error validate
export function apiErrorResponseValidator(response) {
  if (response !== null || response !== undefined) {
    Toaster.ShortCenterToaster(response.message);
  }
}
export function apiSuccessResponseValidator(response) {
  if (response !== null || response !== undefined) {
    Toaster.ShortCenterToaster(response.data.message);
  }
}
