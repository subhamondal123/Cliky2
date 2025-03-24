import { Toaster } from "../../../../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }
    if (data.description == undefined || data.description == null || data.description.length == 0) {
        Toaster.ShortCenterToaster("Enter your description");
        errCounter++;
    }
    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function modifyData(data) {
    let res = {}
    if (data.description == undefined || data.description == null || data.description.length == 0) {
        res["description"] = "";
    } else {
        res["description"] = data.description;
    }

    return res;
}

