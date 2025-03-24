import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";

export function modifyData(data, allPermissions, allUser) {
    let obj = {};

    obj["allPermissions"] = modifyArrById(allPermissions, data.permission);
    if (data.permission == undefined || data.permission == null) {
        obj["selectedPermission"] = "";
    } else {
        obj["selectedPermission"] = data.permission;
    }

    if (data.selectedIndividualUser == undefined || data.selectedIndividualUser == null) {
        obj["selectedUserObj"] = {};
    } else {
        obj["selectedUserObj"] = getObjFromArrayById(allUser, data.selectedIndividualUser);
    }

    return obj;
}

export function modifyArrById(data, id) {
    for (let i = 0; i < data.length; i++) {
        if (id == undefined || id == null) {
            data[i]["check"] = false;
        } else {
            if (data[i].id == id) {
                data[i]["check"] = true;
            } else {
                data[i]["check"] = false;
            }
        }
    }

    return data;
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

export function validateData(data) {
    let resp = false;
    let errCounter = 0;
    if (data.selectedPermission == undefined || data.selectedPermission == null || data.selectedPermission.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.VISIBILITY_PERMISSION.PERMISSION_ERROR);
        errCounter++;
    } else if (validateSelectedIndividual(data) == false) {
        errCounter++;
    }

    if (errCounter == 0) {
        resp = true
    }

    return resp;
}

export function validateSelectedIndividual(data) {
    let resp = false;
    let errCounter = 0;
    if (data.selectedPermission == 4) {
        if (data.selectedUserObj.id == undefined || data.selectedUserObj.id == null) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.VISIBILITY_PERMISSION.ASSIGNED_USER_ERROR);
            errCounter++;
        }
    }

    if (errCounter == 0) {
        resp = true;
    }

    return resp;
}

export function convertPhoneNumbersToAString(phoneArr) {
    let arr = [];
    for (let i = 0; i < phoneArr.length; i++) {
        arr.push(phoneArr[i].phoneNumber)
    }

    return arr;
}

export function convertEmailsToAString(emailArr) {
    let arr = [];
    let str = "";
    for (let i = 0; i < emailArr.length; i++) {
        arr.push(emailArr[i].emailId);
    }

    return arr;
}
