
import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { DataValidator } from "../../../../../../validators";

export function validateData(data) {
    
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if ((data.businessType == undefined || data.businessType == null || data.businessType.length == 0) && data.type == "add") {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.BUSINESS_INFO.TYPE);
        errCounter++;
    } else if (data.businessType == "New" && (data.businessName == undefined || data.businessName == null || data.businessName.length == 0)) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.BUSINESS_INFO.NAME_ERROR);
        errCounter++;
    } else if (data.businessType == "Existing" && (data.businessId == undefined || data.businessId == null || data.businessId.length == 0)) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORGANIZATION.NAME_ID_ERROR);
        errCounter++;
    }
    else if (validatePhoneNumberArray(data.businessPhoneArr) == false) {
        errCounter++;
    }
    else if (validateEmailArray(data.businessEmailArr) == false) {
        errCounter++;
    }
    else if (data.businessAddress == undefined || data.businessAddress == null || data.businessAddress.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.BUSINESS_INFO.ADDRESS_ERROR);
        errCounter++;
    }
    else if (data.locationArr == undefined || data.locationArr == null || Object.keys(data.locationArr).length == 0) {
        Toaster.ShortCenterToaster("Please add location !");
        errCounter++;
    }
    // else if (data.stateId == undefined || data.stateId == null || data.stateId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.STATE_ERROR);
    //     errCounter++;
    // } else if (data.districtId == undefined || data.districtId == null || data.districtId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.DISTRICT_ERROR);
    //     errCounter++;
    // }  else if (data.zoneId == undefined || data.zoneId == null || data.zoneId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.ZONE_ERROR);
    //     errCounter++;
    // } 
    // else if (data.pincode == undefined || data.pincode == null || data.pincode.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.PINCODE_ERROR);
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

export function organizationModifyData(data) {
    var respData = { "organizationList": [] };
    if (data) {
        let organizationData = data.response;

        if (organizationData && organizationData.length > 0) {
            for (let i = 0; i < organizationData.length; i++) {
                let modObj = {};
                if (organizationData[i].organizationId == undefined || organizationData[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = organizationData[i].organizationId;
                }
                if (organizationData[i].organizationName == undefined || organizationData[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = organizationData[i].organizationName;
                }

                modObj["check"] = false;
                respData.organizationList.push(modObj);
            }
        }


    }
    return (respData);
}

export function modifyOrganizationArrData(organizationArr) {
    let modArrData = [];
    if (organizationArr && organizationArr.length > 0) {
        for (let i = 0; i < organizationArr.length; i++) {
            modArrData.push({
                id: organizationArr[i].organizationId,
                name: organizationArr[i].organizationName,
                check: false,
            })
        }
    }
    return modArrData;
}
// export function validateEmail(data) {
//     let errCounter = 0;
//     let status = false;
//     for (let i = 0; i < data.length; i++) {
//         if (data[i].emailId.length > 0 ) {
//              if (DataValidator.emailValidator(data[i].emailId) == false) {
//                 errCounter++;
//             }
//         }
//     }

//     if (errCounter == 0) {
//         status = true;
//     }

//     return status;
// }


export function getObjFromArrayById(data, id) {
    let obj = {};
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                obj = data[i];
            }
        }
        return obj;
    }
}

export function getDistFromArrayById(data, id) {
    let obj = {};
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                obj = data[i];
            }
        }

        return obj;
    }
}
export function getZoneFromArrayById(data, id) {
    let obj = {};
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                obj = data[i];
            }
        }
        return obj;
    }
}

export function getDataFromState(data, id) {
    let obj = {};
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                obj = data[i];
            }
        }
        return obj;
    }
}

export function getObjFromArrayByName(data, name) {
    let obj = {};
    for (let i = 0; i < data.length; i++) {
        if (data[i].name == name) {
            obj = data[i];
        }
    }
    return obj;
}

export function stateModifyData(data) {
    var respData = { "stateList": [] };
    if (data) {
        let stateData = data.response;
        if (stateData && stateData.length > 0) {
            for (let i = 0; i < stateData.length; i++) {
                let modObj = {};
                if (stateData[i].createdAt == undefined || stateData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = stateData[i].createdAt;
                }
                if (stateData[i].stateId == undefined || stateData[i].stateId == null) {
                    modObj["stateId"] = "";
                } else {
                    modObj["stateId"] = stateData[i].stateId;
                }
                if (stateData[i].stateName == undefined || stateData[i].stateName == null) {
                    modObj["stateName"] = "";
                } else {
                    modObj["stateName"] = stateData[i].stateName;
                }

                modObj["check"] = false;
                respData.stateList.push(modObj);
            }
        }
    }
    return (respData);
}

export function districtModifyData(data) {
    var respData = { "districtList": [] };
    if (data) {
        let districtData = data.response;
        if (districtData && districtData.length > 0) {
            for (let i = 0; i < districtData.length; i++) {
                let modObj = {};
                if (districtData[i].createdAt == undefined || districtData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = districtData[i].createdAt;
                }
                if (districtData[i].cityId == undefined || districtData[i].cityId == null) {
                    modObj["cityId"] = "";
                } else {
                    modObj["cityId"] = districtData[i].cityId;
                }
                if (districtData[i].cityName == undefined || districtData[i].cityName == null) {
                    modObj["cityName"] = "";
                } else {
                    modObj["cityName"] = districtData[i].cityName;
                }

                modObj["check"] = false;
                respData.districtList.push(modObj);
            }
        }
    }
    return (respData);
}


export function zoneModifyData(data) {
    var respData = { "zoneList": [] };
    if (data) {
        let zoneData = data.response;
        if (zoneData && zoneData.length > 0) {
            for (let i = 0; i < zoneData.length; i++) {
                let modObj = {};
                if (zoneData[i].createdAt == undefined || zoneData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = zoneData[i].createdAt;
                }
                if (zoneData[i].zoneId == undefined || zoneData[i].zoneId == null) {
                    modObj["zoneId"] = "";
                } else {
                    modObj["zoneId"] = zoneData[i].zoneId;
                }
                if (zoneData[i].zoneName == undefined || zoneData[i].zoneName == null) {
                    modObj["zoneName"] = "";
                } else {
                    modObj["zoneName"] = zoneData[i].zoneName;
                }

                modObj["check"] = false;
                respData.zoneList.push(modObj);
            }
        }
    }
    return (respData);
}

export function modifyStateArrData(stateArr) {
    let modArrData = [];
    if (stateArr && stateArr.length > 0) {
        for (let i = 0; i < stateArr.length; i++) {
            modArrData.push({
                id: stateArr[i].stateId,
                name: stateArr[i].stateName,
                check: false,
            })
        }
    }
    return modArrData;
}

export function modifyDistrictArrData(districtArr) {
    let modArrData = [];
    if (districtArr && districtArr.length > 0) {
        for (let i = 0; i < districtArr.length; i++) {
            modArrData.push({
                id: districtArr[i].cityId,
                name: districtArr[i].cityName,
                check: false,
            })
        }
    }
    return modArrData;
}

export function modifyZoneArrData(zoneArr) {
    let modArrData = [];
    if (zoneArr && zoneArr.length > 0) {
        for (let i = 0; i < zoneArr.length; i++) {
            modArrData.push({
                id: zoneArr[i].zoneId,
                name: zoneArr[i].zoneName,
                check: false,
            })
        }
    }
    return modArrData;
}

export function modifyPhoneNumberObject(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push({ phone: data[i], phoneActive: false })
    }
    return arr;
}
export function modifyEmailObject(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push({ email: data[i], emailActive: false })
    }
    return arr;
}

export function modifyLocationMappedData(mainData, listData) {
    let finalData = [];
    if (mainData && mainData.length > 0) {
        const sortedLocationMapData = mainData.sort((a, b) => a.SlNo - b.SlNo);
        finalData = sortedLocationMapData.map(mainItem => {
            const matchingListItems = listData.filter(listItem => listItem.slNo === mainItem.SlNo);
            return {
                ...mainItem,
                fileItem: matchingListItems
            };
        });
    }
    return finalData;
}
