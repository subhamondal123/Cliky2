import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { DataValidator } from "../../../../../../validators";
 
export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.organizationName == undefined || data.organizationName == null || data.organizationName.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.ORG_NAME_ERROR);
        errCounter++;
    } else if (data.contactPersonName == undefined || data.contactPersonName == null || data.contactPersonName.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.CONTACT_PERSON_ERROR);
        errCounter++;
    } else if (validatePhoneNumberArray(data.phoneNumberArr) == false) {
        errCounter++;
    } else if (validateEmailArray(data.emailArr) == false) {
        errCounter++;
    } 
    // else if (data.isNeedMeeting == false) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.NEED_MEETING_ERROR);
    //     errCounter++;
    // }
     else if (validateNeedMeeting(data.isNeedMeeting, data.dateTime) == false) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.DATE_TIME_ERROR);
        errCounter++;
    } 
    // else if (data.isRecurring == false) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.RECURRING_STATUS);
    //     errCounter++;
    // }
    //  else if (validateRecurring(data.isRecurring, data.recurringType, data.date, data.startDate, data.endDate) == false) {
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
        if (data.length > 0 && i !== 0) {
            if (data[i].emailId == undefined || data[i].emailId == null || data[i].emailId.length == 0) {
                Toaster.ShortCenterToaster("Please enter email id !");
                errCounter++;
            } else {
                if (DataValidator.emailValidator(data[i].emailId) == false) {
                    errCounter++;
                }
            }
        } else {
            if (data[i].emailId.length > 0) {
                if (DataValidator.emailValidator(data[i].emailId) == false) {
                    errCounter++;
                }
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
            if (data[0].emailId == data[1].emailId) {
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

export function validateNeedMeeting(isNeedMeeting, date) {
    let errCounter = 0;
    let status = false;

    if (isNeedMeeting) {
        if (date == undefined || date == null || date.length == 0) {
            errCounter++;
        }
    }

    if (errCounter == 0) {
        status = true;
    }

    return status;
}


export function validateRecurring(isRecurring, recurringType, date, startDate, endDate) {
    let errCounter = 0;
    let status = false;

    if (isRecurring) {
        if (recurringType == undefined || recurringType == null || recurringType == "0" || recurringType.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.REC_TYPE_ERROR);
            errCounter++;
        } else {
            if (validateRecurringDate(recurringType, date, startDate, endDate) == false) {
                errCounter++;
            }
        }
    }

    if (errCounter == 0) {
        status = true;
    }

    return status;
}

export function validateRecurringDate(recurringType, date, startDate, endDate) {
    let errCounter = 0;
    let status = false;

    if (recurringType == 1) {
        if (date == undefined || date == null || date.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.DATE_ERROR);
            errCounter++;
        }
    } else {
        if (startDate == undefined || startDate == null || startDate.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.START_DATE_ERROR);
            errCounter++;
        } else if (endDate == undefined || endDate == null || endDate.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.END_DATE_ERROR);
            errCounter++;
        }
    }

    if (errCounter == 0) {
        status = true;
    }

    return status;
}


export function modifyData(data, allRecurringType) {
    let obj = {};

    if (data.organizationName == undefined || data.organizationName == null) {
        obj["organizationName"] = "";
    } else {
        obj["organizationName"] = data.organizationName;
    }

    if (data.contactPersonName == undefined || data.contactPersonName == null) {
        obj["contactPersonName"] = "";
    } else {
        obj["contactPersonName"] = data.contactPersonName;
    }

    if (data.phoneNumberArr == undefined || data.phoneNumberArr == null) {
        obj["phoneNumberArr"] = [
            { phoneNumber: "", phoneNumberActive: false },
        ];
    } else {
        obj["phoneNumberArr"] = modifyPhoneNumberObject(data.phoneNumberArr);
    }

    if (data.emailArr == undefined || data.emailArr == null) {
        obj["emailArr"] = [
            { emailId: "", emailActive: false },
        ];
    } else {
        obj["emailArr"] = modifyEmailObject(data.emailArr);
    }

    if (data.isNeedMeeting == undefined || data.isNeedMeeting == null) {
        obj["isNeedMeeting"] = false;
    } else {
        obj["isNeedMeeting"] = data.isNeedMeeting;
    }

    if (data.dateTime == undefined || data.dateTime == null) {
        obj["dateTimeObj"] = {
            rawDateTime: new Date(),
            date: "",
            time: ""
        };
    } else {
        obj["dateTimeObj"] = {
            rawDateTime: new Date(data.dateTimeRaw),
            date: data.dateTime,
            time: ""
        };
    }

    if (data.isRecurring == undefined || data.isRecurring == null) {
        obj["isRecurring"] = false;
    } else {
        obj["isRecurring"] = data.isRecurring;
    }

    if (data.recurringType == undefined || data.recurringType == null) {
        obj["selectedRecurringTypeObj"] = {};
        obj["dateObj"] = {
            rawDate: new Date(),
            date: ""
        };
        obj["startDateObj"] = {
            rawDate: new Date(),
            date: ""
        };
        obj["endDateObj"] = {
            rawDate: new Date(),
            date: ""
        };
    } else {
        let recurringTypeObj = getObjFromArrayById(allRecurringType, data.recurringType);
        let recurringTypeDateModifiedData = recurringTypeDateModify(data.recurringType, data.date, data.startDate, data.endDate);
        obj["selectedRecurringTypeObj"] = recurringTypeObj;
        obj["dateObj"] = recurringTypeDateModifiedData.dateObj;
        obj["startDateObj"] = recurringTypeDateModifiedData.startDateObj;
        obj["endDateObj"] = recurringTypeDateModifiedData.endDateObj;
    }

    return obj;
}


export function modifyPhoneNumberObject(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push({ phoneNumber: data[i].phoneNumber, phoneNumberActive: false })
    }
    return arr;
}

export function modifyEmailObject(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push({ emailId: data[i].emailId, emailActive: false })
    }
    return arr;
}

export function getObjFromArrayById(data, id) {
    let obj = {};
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            obj = data[i];
        }
    }
    return obj;
}

export function recurringTypeDateModify(recurringType, date, startDate, endDate) {
    let obj = {
        dateObj: {
            rawDate: new Date(),
            date: ""
        },
        startDateObj: {
            rawDate: new Date(),
            date: ""
        },
        endDateObj: {
            rawDate: new Date(),
            date: ""
        },
    }

    if (recurringType == 1) {
        if (date == undefined || date == null) {
            obj.dateObj = {
                rawDate: new Date(),
                date: ""
            };
        } else {
            obj.dateObj = {
                rawDate: new Date(date),
                date: date
            };
        }
    } else {
        if (startDate == undefined || startDate == null) {
            obj.startDateObj = {
                rawDate: new Date(),
                date: ""
            };
        } else {
            obj.startDateObj = {
                rawDate: new Date(startDate),
                date: startDate
            };
        }

        if (endDate == undefined || endDate == null) {
            obj.endDateObj = {
                rawDate: new Date(),
                date: ""
            };
        } else {
            obj.endDateObj = {
                rawDate: new Date(endDate),
                date: endDate
            };
        }
    }

    return obj;
}

