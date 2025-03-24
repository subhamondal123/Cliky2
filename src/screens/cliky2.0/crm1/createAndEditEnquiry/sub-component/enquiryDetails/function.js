import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { DataValidator } from "../../../../../../validators";

export function validateData(data) {
    let errCounter = 0;
    let arrCounter = 0;
    let resObj = {
        status: false
    }

    if (data.enquirySourceId == undefined || data.enquirySourceId == null || data.enquirySourceId.length == 0 || data.enquirySourceId == "0") {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.ENQUIRY_SOURCE_ERROR);
        errCounter++;
    }
    else if (data.enquiryTypeId == undefined || data.enquiryTypeId == null || data.enquiryTypeId == "0" || data.enquiryTypeId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.ENQUIRY_TYPE_ERROR);
        errCounter++;
    } else if (data.ownerFirstName == undefined || data.ownerFirstName == null || data.ownerFirstName.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.OWNER_FIRST_NAME_ERROR);
        errCounter++;
    }
    else if (data.ownerLastName == undefined || data.ownerLastName == null || data.ownerLastName.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.OWNER_LAST_NAME_ERROR);
        errCounter++;
    }
    else if (validatePhoneNumberArray(data.phoneNumberArr) == false) {
        errCounter++;
    } 
    else if (validateEmailArray(data.emailArr) == false) {
        errCounter++;
    }


    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function validatePhoneNumberArray(data) {
    let errCounter = 0;
    let status = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].phone == undefined || data[i].phone == null || data[i].phone.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.PHONE_NUMBER_ERROR);
            errCounter++;
        } else {
            if (DataValidator.mobileNumberValidator(data[i].phone) == false) {
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
        if (data[0].phone == data[1].phone) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.PHONE_NUMBER_DUPLICATE);
            errCounter++;
        }
    }


    if (errCounter == 0) {
        status = true;
    }

    return status;
}

export function isSameFunction(data) {
    let errCounter = 0;
    let status = false;
    if (data.length > 1) {
        if (data[0].phone == data[1].phone) {
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
            if (data[i].email == undefined || data[i].email == null || data[i].email.length == 0) {
                Toaster.ShortCenterToaster("Please enter email id !");
                errCounter++;
            } else {
                if (DataValidator.emailValidator(data[i].email) == false) {
                    errCounter++;
                }
            }
        } else {
            if (data[i].email.length > 0) {
                if (DataValidator.emailValidator(data[i].email) == false) {
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




// export function validateEmailArray(data) {
//     let errCounter = 0;
//     let status = false;
//     for (let i = 0; i < data.length; i++) {
//         if (data[i].email == undefined || data[i].email == null || data[i].email.length == 0) {
//             Toaster.ShortCenterToaster("Please enter email id !");
//             errCounter++;
//         } else {
//             if (DataValidator.emailValidator(data[i].email) == false) {
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

// export function checkDuplicateEmail(data) {
//     let errCounter = 0;
//     let status = false;
//     if (data.length > 1) {
//         if (data.length > 1) {
//             if (data[0].email == data[1].email) {
//                 Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.EMAIL_ID_DUPLICATE);
//                 errCounter++;
//             }
//         }
//     }

//     if (errCounter == 0) {
//         status = true;
//     }

//     return status;
// }

export function enquirySourceModifyData(data) {
    var respData = { "enquirySourceList": [], "enquiryTypeList": [] };
    if (data) {
        let enquirySourceData = data.enquirySource;
        let enquiryTypeData = data.enquiryType;
        if (enquirySourceData && enquirySourceData.length > 0) {
            for (let i = 0; i < enquirySourceData.length; i++) {
                let modObj = {};
                if (enquirySourceData[i].id == undefined || enquirySourceData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = enquirySourceData[i].id;
                }
                if (enquirySourceData[i].leadSourceTypeName == undefined || enquirySourceData[i].leadSourceTypeName == null) {
                    modObj["leadSourceTypeName"] = "";
                } else {
                    modObj["leadSourceTypeName"] = enquirySourceData[i].leadSourceTypeName;
                }

                modObj["check"] = false;
                respData.enquirySourceList.push(modObj);
            }
        }

        if (enquiryTypeData && enquiryTypeData.length > 0) {
            for (let i = 0; i < enquiryTypeData.length; i++) {
                let modObj = {};
                if (enquiryTypeData[i].contactTypeId == undefined || enquiryTypeData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = enquiryTypeData[i].contactTypeId;
                }
                if (enquiryTypeData[i].contactTypeName == undefined || enquiryTypeData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "";
                } else {
                    modObj["contactTypeName"] = enquiryTypeData[i].contactTypeName;
                }
                if (enquiryTypeData[i].createdAt == undefined || enquiryTypeData[i].createdAt == null) {
                    modObj["createdAt"] = 0;
                } else {
                    modObj["createdAt"] = enquiryTypeData[i].createdAt;
                }
                if (enquiryTypeData[i].mstSlNo == undefined || enquiryTypeData[i].mstSlNo == null) {
                    modObj["mstSlNo"] = "";
                } else {
                    modObj["mstSlNo"] = enquiryTypeData[i].mstSlNo;
                }
                if (enquiryTypeData[i].masterContactTypeName == undefined || enquiryTypeData[i].masterContactTypeName == null) {
                    modObj["masterContactTypeName"] = "";
                } else {
                    modObj["masterContactTypeName"] = enquiryTypeData[i].masterContactTypeName;
                }

                modObj["check"] = false;
                respData.enquiryTypeList.push(modObj);
            }
        }
    }
    return (respData);
}


export function modifyEnquirySourceArrData(enquirySourceArr) {
    let modArrData = [];
    if (enquirySourceArr && enquirySourceArr.length > 0) {
        for (let i = 0; i < enquirySourceArr.length; i++) {
            modArrData.push({
                id: enquirySourceArr[i].id,
                name: enquirySourceArr[i].leadSourceTypeName,
                check: false,
            })
        }
    }
    return modArrData;
}

export function modifyEnquiryTypeArrData(enquiryTypeArr) {
    let modArrData = [];
    if (enquiryTypeArr && enquiryTypeArr.length > 0) {
        for (let i = 0; i < enquiryTypeArr.length; i++) {
            modArrData.push({
                id: enquiryTypeArr[i].contactTypeId,
                name: enquiryTypeArr[i].contactTypeName,
                check: false,
            })
        }
    }
    return modArrData;
}
