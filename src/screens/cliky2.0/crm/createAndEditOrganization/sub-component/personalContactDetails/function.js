
import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { DataValidator } from "../../../../../../validators";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.contactTypeId == undefined || data.contactTypeId == null || data.contactTypeId.length == 0 || data.contactTypeId == "0") {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORGANIZATION.CONTACT_TYPE_ERROR);
        errCounter++;
    }
    else if (data.firstName == undefined || data.firstName == null || data.firstName == "0" || data.firstName.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORGANIZATION.FIRST_NAME_ERROR);
        errCounter++;
    } else if (data.lastName == undefined || data.lastName == null || data.lastName.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORGANIZATION.LAST_NAME_ERROR);
        errCounter++;
    }
    else if (validatePhoneNumberArray(data.phoneArr) == false) {
        errCounter++;
    } 
    // else if (validateEmailArray(data.emailArr) == false) {
    //     errCounter++;
    // }
    else if (data.contactAddress == undefined || data.contactAddress == null || data.contactAddress.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SURVEY.ADDRESS_ERROR);
        errCounter++;
    }
    else if (data.locationArr == undefined || data.locationArr == null || Object.keys(data.locationArr).length == 0) {
        Toaster.ShortCenterToaster("Please add location !");
        errCounter++;
    }

    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}


export function modifyContactData(data) {
    let respData = { "list": [] };
    if (data) {
        let stateData = data;
        if (stateData && stateData.length > 0) {
            for (let i = 0; i < stateData.length; i++) {
                let modObj = {};
                if (stateData[i].contactId == undefined || stateData[i].contactId == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = stateData[i].contactId;
                }
                if (stateData[i].contactName == undefined || stateData[i].contactName == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = stateData[i].contactName;
                }
                
                modObj["check"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}
