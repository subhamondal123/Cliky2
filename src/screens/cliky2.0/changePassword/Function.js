import { AlertMessage } from "../../../enums";
import { Toaster } from "../../../services/common-view-function";


export function validationCheck(value) {
    let errorCount = 0;
    let resObj = {
        status: false,
        stateObj: {
            currentPassError: false,
            passError: false,
            confirmPassError: false,

        }
    }

    if (value) {
        //password check
        // if (DataValidator.passwordValidator(value.currentPassword) == false) {
        //     resObj.stateObj["currentPassError"] = true;
        //     errorCount++;
        // } else if (value.currentPassword === value.password) {
        //     resObj.stateObj["passError"] = true;
        //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.PASSWORD.PASSWORD_NOT_SAME_AS_CURRENT)
        //     errorCount++;
        // } else if (!DataValidator.passwordValidator(value.password)) {
        //     resObj.stateObj["passError"] = true;
        //     errorCount++;
        // }
        // else if (value.password != value.confirmPassword) {
        //     resObj.stateObj["passError"] = true;
        //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.PASSWORD.PASSWORD_NOT_MATCH_CONFIRM)
        //     errorCount++;
        // }

        //current password check
        if (currentPasswordValidate(value.currentPassword) == false) {
            resObj.stateObj["currentPassError"] = true;
            errorCount++;
        }

        // //password check
        // else if (DataValidator.passwordValidator(value.password) == false) {
        //     resObj.stateObj["passError"] = true;
        //     errorCount++;
        // }

        else if (value.currentPassword === value.password) {
            resObj.stateObj["passError"] = true;
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.PASSWORD.PASSWORD_NOT_SAME_AS_CURRENT)
            errorCount++;
        }

        //confirm password check
        else if (value.confirmPassword == undefined || value.confirmPassword == null || value.confirmPassword.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.PASSWORD.CONFIRM_PASSWORD_EMPTY);
            resObj.stateObj["rePassError"] = true;
            errorCount++;
            // return false;
        }

        else if (value.password !== value.confirmPassword) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.PASSWORD.NEW_PASSWORD_CONFIRM_PASSWORD_MISMATCH);
            resObj.stateObj["rePassError"] = true;
            errorCount++;
            // return false;
        }


        if (errorCount == 0) {
            resObj.status = true
        }
    }

    return resObj;
}

function currentPasswordValidate(currentPass) {
    if (currentPass == undefined || currentPass == null || currentPass.length == 0) {
        Toaster.ShortCenterToaster("Please Enter Your Current Password");
        return false;
    } else {
        // if (DataValidator.passwordValidator(currentPass) == true) {
            return true;
        // } else {
        //     return false;
        // }
    }
}