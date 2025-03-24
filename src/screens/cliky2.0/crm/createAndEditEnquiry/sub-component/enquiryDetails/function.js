import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { DataValidator } from "../../../../../../validators";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.selectedContactType == 1 && (data.ownerFirstName == undefined || data.ownerFirstName == null || data.ownerFirstName.length == 0)) {
        Toaster.ShortCenterToaster("Please enter first name!");
        errCounter++;
    } else if (data.selectedContactType == 1 && (data.ownerLastName == undefined || data.ownerLastName == null || data.ownerLastName.length == 0)) {
        Toaster.ShortCenterToaster("Please enter last name!");
        errCounter++;
    } else if (data.selectedContactType == 2 && (data.selectedContact == undefined || data.selectedContact == null || Object.keys(data.selectedContact).length == 0)) {
        Toaster.ShortCenterToaster("Please Select Contact!");
        errCounter++;
    }
    else if (validatePhoneNumberArray(data.phoneNumber) == false) {
        errCounter++;
    }
    // else if (data.selectedContactType == 1 && (validateEmailArray(data.email) == false)) {
    //     errCounter++;
    // }
    else if (data.contactId == undefined || data.contactId == null || data.contactId.length == 0) {
        Toaster.ShortCenterToaster("Please add Contact!");

        errCounter++;
    }

    else if (data.enquerySourceId == undefined || data.enquerySourceId == null || data.enquerySourceId.length == 0 || data.enquerySourceId == "0") {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.ENQUIRY_SOURCE_ERROR);
        errCounter++;
    }
    else if (data.enquerySourceTypeId == undefined || data.enquerySourceTypeId == null || data.enquerySourceTypeId == "0" || data.enquerySourceTypeId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.ENQUIRY_TYPE_ERROR);
        errCounter++;
    }


    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function addNewContactValidation(data) {
    let errCounter = 0;
    let arrCounter = 0;
    let resObj = {
        status: false
    }

    if (data.firstName == undefined || data.firstName == null || data.firstName.length == 0) {
        Toaster.ShortCenterToaster("Please enter first name!");
        errCounter++;
    } else if (data.lastName == undefined || data.lastName == null || data.lastName.length == 0) {
        Toaster.ShortCenterToaster("Please enter last name!");
        errCounter++;
    } else if (data.phoneNumber == undefined || data.phoneNumber == null || data.phoneNumber.length == 0) {
        Toaster.ShortCenterToaster("Please enter phone number!");
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

export function isSameFunction(data) {
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
        if (data.length > 0) {
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


function setPhoneNum(arr) {
    let modArr = []
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let modObj = {};
            modObj["phoneNumber"] = arr[i].typeValue,
                modObj["countryCode"] = arr[i].prefix,
                modObj["isPrimary"] = arr[i].priority == 1 ? true : false,
                modObj["selectedPhoneType"] = {
                    id: arr[i].typeName == "personal" ? 3 : arr[i].typeName == "business" ? 1 : arr[i].typeName == "work" ? 2 : arr[i].typeName == "home" ? 4 : 5,
                    name: arr[i].typeName
                },
                modObj["phonetype"] = arr[i].typeName,
                modObj["phoneActive"] = false

            modArr.push(modObj)
        }
    }
    return modArr
}


function setEmail(arr) {
    let modArr = []
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let modObj = {};
            modObj["email"] = arr[i].typeValue,
                modObj["isPrimary"] = arr[i].priority == 1 ? true : false,
                modObj["selectedEmailType"] = {
                    id: arr[i].typeName == "personal" ? 3 : arr[i].typeName == "business" ? 1 : arr[i].typeName == "work" ? 2 : arr[i].typeName == "home" ? 4 : 5,
                    name: arr[i].typeName
                },
                modObj["emailtype"] = arr[i].typeName,
                modObj["emailActive"] = false

            modArr.push(modObj)
        }
    }
    return modArr
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
                if (stateData[i].createdBy == undefined || stateData[i].createdBy == null) {
                    modObj["createdBy"] = "";
                } else {
                    modObj["createdBy"] = stateData[i].createdBy;
                }
                if (stateData[i].createdByName == undefined || stateData[i].createdByName == null) {
                    modObj["createdByName"] = "";
                } else {
                    modObj["createdByName"] = stateData[i].createdByName;
                }
                if (stateData[i].title == undefined || stateData[i].title == null) {
                    modObj["title"] = "";
                } else {
                    modObj["title"] = stateData[i].title;
                }
                if (stateData[i].organizationId == undefined || stateData[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = stateData[i].organizationId;
                }
                if (stateData[i].createdAt == undefined || stateData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = stateData[i].createdAt;
                }
                if (stateData[i].organizationName == undefined || stateData[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = stateData[i].organizationName;
                }
                if (stateData[i].approvedStatus == undefined || stateData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "0";
                } else {
                    modObj["approvedStatus"] = stateData[i].approvedStatus;
                }
                if (stateData[i].phoneArr == undefined || stateData[i].phoneArr == null || stateData[i].phoneArr.length == 0) {
                    modObj["phoneNumber"] = [{
                        phoneNumber: "",
                        countryCode: "91",
                        isPrimary: true,
                        selectedPhoneType: {
                            id: 3,
                            name: "personal"
                        },
                        phonetype: "personal",
                        phoneActive: false
                    }];
                } else {
                    modObj["phoneNumber"] = setPhoneNum(stateData[i].phoneArr);
                }
                if (stateData[i].emailArr == undefined || stateData[i].emailArr == null || stateData[i].emailArr.length == 0) {
                    modObj["email"] = [{
                        email: "",
                        selectedEmailType: {
                            id: 3,
                            name: "personal"
                        },
                        emailtype: "personal",
                        isPrimary: true,
                        emailActive: false
                    }];
                } else {
                    modObj["email"] = setEmail(stateData[i].emailArr);
                }
                if (stateData[i].phone == undefined || stateData[i].phone == null) {
                    modObj["orgPhone"] = "";
                } else {
                    modObj["orgPhone"] = stateData[i].phone;
                }
                if (stateData[i].email == undefined || stateData[i].email == null) {
                    modObj["mainEmail"] = "";
                } else {
                    modObj["mainEmail"] = stateData[i].email;
                }

                modObj["check"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}