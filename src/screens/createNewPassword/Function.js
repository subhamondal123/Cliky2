import { AlertMessage } from "../../enums";
import { Toaster } from "../../services/common-view-function";
import { DataValidator } from "../../validators";



export function validationCheck(value) {
    let errorCount = 0;
    let resObj = {
        status: false,
        stateObj: {
            passError: false,
            confirmPassError: false,
        }
    }

    if (value) {
        // //password check
        // if (DataValidator.passwordValidator(value.password) == false) {
        //     resObj.stateObj["passError"] = true;
        //     errorCount++;
        // }

        //password check
        if (value.password == undefined || value.password == null || value.password.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.PASSWORD.PASSWORD_EMPTY);
            resObj.stateObj["confirmPassError"] = true;
            errorCount++;
            // return false;
        }

        //confirm password check
        else if (value.confirmPassword == undefined || value.confirmPassword == null || value.confirmPassword.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.PASSWORD.CONFIRM_PASSWORD_EMPTY);
            resObj.stateObj["confirmPassError"] = true;
            errorCount++;
            // return false;
        }

        else if (value.confirmPassword !== value.password) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.PASSWORD.PASSWORD_NOT_MATCH);
            resObj.stateObj["confirmPassError"] = true;
            errorCount++;
        }

        if (errorCount == 0) {
            resObj.status = true
        }
    }

    return resObj;
}