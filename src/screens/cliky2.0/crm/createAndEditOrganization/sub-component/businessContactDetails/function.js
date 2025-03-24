import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { DataValidator } from "../../../../../../validators";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.acc_name == undefined || data.acc_name == null || data.acc_name.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORGANIZATION.NAME_ERROR);
        errCounter++;
    }
    else if (data.ownerName == undefined || data.ownerName == null || data.ownerName.length == 0) {
        Toaster.ShortCenterToaster("Please enter Owner Name !");
        errCounter++;
    }
    else if (validatePhoneNumberArray(data.phoneNumber) == false) {
        errCounter++;
    }
    else if (validateEmailArray(data.email) == false) {
        errCounter++;
    }

    // else if ((data.description == null || data.description == undefined || data.description.length == 0)) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORGANIZATION.DESCRIPTION_ERROR);
    //     errCounter++;
    // } 
    // else if ((data.anualRevenue == null || data.anualRevenue == undefined || data.anualRevenue.length == 0)) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORGANIZATION.REVENUE_ERROR);
    //     errCounter++;
    // } else if ((data.orgNumberOfEmployee == null || data.orgNumberOfEmployee == undefined || data.orgNumberOfEmployee.length == 0)) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORGANIZATION.NO_OF_EMP_ERROR);
    //     errCounter++;
    // }
    //  else if ((data.assignTo == null || data.assignTo == undefined || data.assignTo.length == 0)) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAD.USER_ERROR);
    //     errCounter++;
    // }


    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function validatePhoneNumberArray(data) {

    let errCounter = 0;
    let status = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].phoneNumber == undefined || data[i].phoneNumber == null || data[i].phoneNumber.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.PHONE_NUMBER_ERROR);
            errCounter++;
        } else {
            if (DataValidator.mobileNumberValidator(data[i].phoneNumber) == false) {
                errCounter++;
            }
        }
    }

    if (errCounter == 0) {
        if (checkDuplicatePhoneNumber(data)) {
            status = true;
        } else {
            status = false;
        }
    }

    return status;
}

export function checkDuplicatePhoneNumber(data) {
    let errCounter = 0;
    let status = false;
    if (data.length > 1) {
        if (data[0].phoneNumber == data[1].phoneNumber) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.PHONE_NUMBER_DUPLICATE);
            errCounter++;
        }
    }

    if (errCounter == 0) {
        status = true;
    }

    return status;
}
export function validateEmailArray(data) {
    let errCounter = 0;
    let status = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].email == undefined || data[i].email == null || data[i].email.length == 0) {
            Toaster.ShortCenterToaster("Please enter email id !");
            errCounter++;
        } else {
            if (DataValidator.emailValidator(data[i].email) == false) {
                errCounter++;
            }
        }
    }

    if (errCounter == 0) {
        if (checkDuplicateEmail(data)) {
            status = true;
        } else {
            status = false;
        }
    }

    return status;
}

export function checkDuplicateEmail(data) {
    let errCounter = 0;
    let status = false;
    if (data.length > 1) {
        if (data.length > 1) {
            if (data[0].email == data[1].email) {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.EMAIL_ID_DUPLICATE);
                errCounter++;
            }
        }
    }

    if (errCounter == 0) {
        status = true;
    }

    return status;
}
