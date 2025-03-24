import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { DataValidator } from "../../../../../../validators";



export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }
    if (data.selectedContactBusinessTypeData == undefined || data.selectedContactBusinessTypeData == null || data.selectedContactBusinessTypeData.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CONTACT_DETAILS_CRM_CONTACT.CONTACT_BUSINESS_ERROR);
        errCounter++;
    }
    else if (data.firstName == undefined || data.firstName == null || data.firstName.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CONTACT_DETAILS_CRM_CONTACT.FRIST_NAME_ERROR);
        errCounter++;
    } else if (data.lastName == undefined || data.lastName == null || data.lastName.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CONTACT_DETAILS_CRM_CONTACT.LAST_NAME_ERROR);
        errCounter++;
    } else if (data.title == undefined || data.title == null || data.title.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CONTACT_DETAILS_CRM_CONTACT.TITLE_ERROR);
        errCounter++;
    } else if (data.selectedContactType == undefined || data.selectedContactType == null || data.selectedContactType == "0" || data.selectedContactType.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CONTACT_DETAILS_CRM_CONTACT.CONTACT_TYPE_ERROR);
        errCounter++;
    } else if (data.selectedStatus == undefined || data.selectedStatus == null || data.selectedStatus.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CONTACT_DETAILS_CRM_CONTACT.STATUS_ERROR);
        errCounter++;
    } else if (validatePhoneNumberArray(data.phoneNumberArr) == false) {
        errCounter++;
    }
    //  else if (validateEmailArray(data.emailArr) == false) {
    //     errCounter++;
    // }

    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function contactAddModifyData(data) {
    var respData = { "contactTypeDataArr": [] };
    if (data) {
        let contactTypeData = data.enquiryType;
        if (contactTypeData && contactTypeData.length > 0) {
            for (let i = 0; i < contactTypeData.length; i++) {
                let modObj = {};
                if (contactTypeData[i].contactTypeId == undefined || contactTypeData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = contactTypeData[i].contactTypeId;
                }
                if (contactTypeData[i].contactTypeName == undefined || contactTypeData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "";
                } else {
                    modObj["contactTypeName"] = contactTypeData[i].contactTypeName;
                }
                if (contactTypeData[i].createdAt == undefined || contactTypeData[i].createdAt == null) {
                    modObj["createdAt"] = 0;
                } else {
                    modObj["createdAt"] = contactTypeData[i].createdAt;
                }
                if (contactTypeData[i].mstSlNo == undefined || contactTypeData[i].mstSlNo == null) {
                    modObj["mstSlNo"] = "";
                } else {
                    modObj["mstSlNo"] = contactTypeData[i].mstSlNo;
                }
                if (contactTypeData[i].masterContactTypeName == undefined || contactTypeData[i].masterContactTypeName == null) {
                    modObj["masterContactTypeName"] = "";
                } else {
                    modObj["masterContactTypeName"] = contactTypeData[i].masterContactTypeName;
                }

                modObj["check"] = false;
                respData.contactTypeDataArr.push(modObj);
            }
        }

    }
    return (respData);
}

export function modifyContactTypeArrData(contactTypeArr) {
    let modArrData = [];
    if (contactTypeArr && contactTypeArr.length > 0) {
        for (let i = 0; i < contactTypeArr.length; i++) {
            modArrData.push({
                id: contactTypeArr[i].contactTypeId,
                name: contactTypeArr[i].contactTypeName,
                check: false,
            })
        }
    }
    return modArrData;
}

export function modifyData(data, allContactSource, allStatus, allBusinessTypeData) {

    let obj = {};
    if (data.firstName == undefined || data.firstName == null) {
        obj["firstName"] = "";
    } else {
        obj["firstName"] = data.firstName;
    }
    if (data.lastName == undefined || data.lastName == null) {
        obj["lastName"] = "";
    } else {
        obj["lastName"] = data.lastName;
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
    if (data.title == undefined || data.title == null) {
        obj["title"] = "";
    } else {
        obj["title"] = data.title;
    }
    if (data.selectedContactType == undefined || data.selectedContactType == null) {
        obj["selectedContactType"] = {};
    } else {
        obj["selectedContactType"] = getObjFromArrayById(allContactSource, data.selectedContactType);
    }

    if (data.selectedStatus == undefined || data.selectedStatus == null) {
        obj["selectedStatus"] = {};
    } else {
        obj["selectedStatus"] = getObjFromArrayByValue(allStatus, data.selectedStatus);
    }

    if (data.selectedContactBusinessTypeData == undefined || data.selectedContactBusinessTypeData == null) {
        obj["selectedContactBusinessTypeData"] = "";
    } else {
        obj["selectedContactBusinessTypeData"] = data.selectedContactBusinessTypeData;
        obj["allContactBusinessTypeData"] = loadSelectedAllContactBusinessTypeData(allBusinessTypeData, data.selectedContactBusinessTypeData);
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

export function getObjFromArrayByValue(data, id) {
    let obj = {};
    for (let i = 0; i < data.length; i++) {
        if (data[i].value == id) {
            obj = data[i];
        }
    }
    return obj;
}

export function modifyAllContactBusinessTypeData(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        obj["check"] = false;
        arr.push(obj);
    }
    return arr;
}

export function loadSelectedAllContactBusinessTypeData(arr, selectedData) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].value == selectedData) {
            arr[i].check = true;
        } else {
            arr[i].check = false;
        }
    }
    return arr;
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


// export function validateEmailArray(data) {
//     let errCounter = 0;
//     let status = false;
//     for (let i = 0; i < data.length; i++) {
//         if (data[i].emailId == undefined || data[i].emailId == null || data[i].emailId.length == 0) {
//             Toaster.ShortCenterToaster("Please enter email id !");
//             errCounter++;
//         } else {
//             if (DataValidator.emailValidator(data[i].emailId) == false) {
//                 errCounter++;
//             }
//         }
//     }

//     if (errCounter == 0) {
//         if (checkDuplicateEmail(data)) {
//             status = true;
//         } else {
//             status = false;
//         }
//     }

//     return status;
// }


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