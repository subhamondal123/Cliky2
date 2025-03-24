import { AlertMessage } from "../../../enums";
import { Toaster } from "../../../services/common-view-function";
import { EMAIL_REGEX, NUMBER_REGEX } from "../../../services/config/regex";
import { DataValidator } from "../../../validators";

export function validateModifiedData(objData) {
  let resp = {
    isValidated: false,
    stateObj: {
      inputError: false,
    },
  };
  let errorCount = 0;

  if (DataValidator.inputEmptyValidator(objData.userCredentialText) == false) {
    Toaster.ShortCenterToaster(
      AlertMessage.MESSAGE.MOBILE.MOBILE_EMAIL_BOTH_EMPTY
    );
    errorCount++;
  } 
  // else {
  //   if (isNaN(objData.userCredentialText)) {
  //     if (!objData.userCredentialText.match(EMAIL_REGEX)) {
  //       if (DataValidator.emailValidator(objData.userCredentialText) == false) {
  //         errorCount++;
  //       }
  //     }
  //   } else {
  //     if (!objData.userCredentialText.match(NUMBER_REGEX)) {
  //       if (DataValidator.mobileNumberValidator(objData.userCredentialText) == false) {
  //         errorCount++;
  //       }
  //     }
  //   }
  // }

  if (errorCount == 0) {
    resp.isValidated = true;
  }

  return resp;
}
