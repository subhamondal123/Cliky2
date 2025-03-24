import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (errCounter == 0) {
        resObj.status = true;
    }

    if (data.permissionType == undefined || data.permissionType == null || data.permissionType == 3){
        Toaster.ShortCenterToaster("Please select the permission !");
        errCounter++;
    } else if(data.permissionType == "4" && (data.permissionTo == undefined || data.permissionTo == null || data.permissionTo == "0" )){
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAD.USER_ERROR);
        errCounter++;
    }

    return resObj;
}

export function modifyData(data, allPermissions) {
    let obj = {};

    obj["allPermissions"] = modifyArrById(allPermissions, data.permission);
    if (data.permission == undefined || data.permission == null) {
        obj["selectedPermission"] = "";
    } else {
        obj["selectedPermission"] = data.permission;
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