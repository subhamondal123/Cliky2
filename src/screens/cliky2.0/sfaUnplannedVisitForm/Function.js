import { AlertMessage } from "../../../enums";
import { Toaster } from "../../../services/common-view-function";
import { Regex } from "../../../services/config";
import { DataValidator } from "../../../validators";


export function modifyCustomerTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].contactTypeId;
            data[i]["name"] = data[i].contactTypeName;
        }
    } else {
        data = [];
    }
    return data;
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


export function modifyBrandArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].labelId;
            data[i]["name"] = data[i].labelCode;
        }
    } else {
        data = [];
    }
    return data;
}

export function modifySizeSpecsArr(data) {
    let Arr = [],
        modObj = {};
    for (let i = 0; i < data.length; i++) {
        modObj = {
            id: data[i].productId,
            name: data[i].productName

        }
        Arr.push(modObj)
    }

    return Arr;
}

export function modifyStatusArr(statusArr) {
    let modObj = {},
        arr = [];
    if (statusArr) {
        for (let i = 0; i < statusArr.length; i++) {
            modObj = {
                id: statusArr[i].id,
                name: statusArr[i].name,
            }
            arr.push(modObj)
        }
    }
    return arr;
}

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.visitType === "0" && (data.jointVisitorId == null || data.jointVisitorId == undefined || data.jointVisitorId.length == 0)) {
        Toaster.ShortCenterToaster("Please select Sub-Ordinate !");
        errCounter++;
    } else if (data.customerName == undefined || data.customerName == null || data.customerName.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.CONTACT_PERSON_ERROR);
        errCounter++;
    }
    // else if (data.counterName == undefined || data.counterName == null || data.counterName.length == 0) {
    //     Toaster.ShortCenterToaster("Please enter Counter Name !");
    //     errCounter++;
    // }
    // else if (data.stateId == undefined || data.stateId == null || data.stateId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.STATE_ERROR);
    //     errCounter++;
    // }
    // else if (data.districtId == undefined || data.districtId == null || data.districtId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.DISTRICT_ERROR);
    //     errCounter++;
    // } else if (data.zoneId == undefined || data.zoneId == null || data.zoneId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.ZONE_ERROR);
    //     errCounter++;

    // }
     else if (DataValidator.mobileNumberValidator(data.contactNumber) == false) {
        // Toaster.ShortCenterToaster(AlertMessage.MESSAGE.REGISTRATION.BUSINESS_INFO.CONTACT_NUMBER);
        errCounter++;
    } else if (data.visitAddress == undefined || data.visitAddress == null || data.visitAddress.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.ADDRESS_ERROR);
        errCounter++;
    }

    // else if (data.email.length > 0) {
      else if (data.email.length > 0 && !data.email.match(Regex.EMAIL_REGEX)) {
            Toaster.ShortCenterToaster("Invalid Email !");
            errCounter++;
        } 
    // }


    // else if (data.pincode == undefined || data.pincode == null || data.pincode.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.PINCODE_ERROR);
    //     errCounter++;
    // }
    // else if (DataValidator.emailValidator(data.email) == false) {
    //     errCounter++;
    // }
    //  else if (data.brandId == undefined || data.brandId == null || data.brandId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CONVERSION_ERROR.BRAND_ERROR);
    //     errCounter++;
    // }
    //  else if (data.counterVolume == undefined || data.counterVolume == null || data.counterVolume.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.VISIT_FORM.COUNTER_VOLUME);
    //     errCounter++;
    // } else if (data.unitId == undefined || data.unitId == null || data.unitId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.BRANDING.NEW_ENTRY.UNIT_ERROR);
    //     errCounter++;
    // }
    //  else if (data.visitDate == undefined || data.visitDate == null || data.visitDate.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.VISIT_FORM.VISIT_DATE);
    //     errCounter++;
    // }
    else if (data.status == undefined || data.status == null || data.status.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.VISIT_FORM.STATUS);
        errCounter++;
    }
    else if (data.visitNote == undefined || data.visitNote == null || data.visitNote.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.VISIT_FORM.NOTE);
        errCounter++;
    }

    if (errCounter == 0) {
        resObj.status = true
    }

    return resObj;
}
export function modifyUnitArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].unitId;
            data[i]["name"] = data[i].unitShort;
        }
    }
    return data;
};
export function setCustomerType(arr, contactName) {
    let modObj = {}
    arr.map((obj, key) => {
        if (obj.name == contactName) {
            modObj = {
                id: obj.id,
                name: obj.name
            }
        }
    })
    return modObj;
}
export function modifyVisitorTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].contactTypeId;
            data[i]["name"] = data[i].contactTypeName;
        }
    } else {
        data = [];
    }
    return data;
}

export function unplannedModifyData(data) {
    var respData = { "totalCount": 0, "unplannedlist": [] };
    if (data) {
        let pjpData = data.response;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].id == undefined || pjpData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = pjpData[i].id;
                }
                if (pjpData[i].customerName == undefined || pjpData[i].customerName == null) {
                    modObj["customerName"] = "";
                } else {
                    modObj["customerName"] = pjpData[i].customerName;
                }
                if (pjpData[i].name == undefined || pjpData[i].name == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = pjpData[i].name;
                }
                if (pjpData[i].isExpired == undefined || pjpData[i].isExpired == null) {
                    modObj["isExpired"] = "";
                } else {
                    modObj["isExpired"] = pjpData[i].isExpired;
                }
                if (pjpData[i].phone == undefined || pjpData[i].phone == null) {
                    modObj["phone"] = "";
                } else {
                    modObj["phone"] = pjpData[i].phone;
                }
                if (pjpData[i].zoneName == undefined || pjpData[i].zoneName == null) {
                    modObj["zoneName"] = "";
                } else {
                    modObj["zoneName"] = pjpData[i].zoneName;
                }
                if (pjpData[i].zoneId == undefined || pjpData[i].zoneId == null) {
                    modObj["zoneId"] = "";
                } else {
                    modObj["zoneId"] = pjpData[i].zoneId;
                }
                if (pjpData[i].cityId == undefined || pjpData[i].cityId == null) {
                    modObj["cityId"] = "";
                } else {
                    modObj["cityId"] = pjpData[i].cityId;
                }
                if (pjpData[i].contactTypeName == undefined || pjpData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "N/A";
                } else {
                    modObj["contactTypeName"] = pjpData[i].contactTypeName;
                }
                if (pjpData[i].contactTypeId == undefined || pjpData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = pjpData[i].contactTypeId;
                }
                if (pjpData[i].visitStatusName == undefined || pjpData[i].visitStatusName == null) {
                    modObj["visitStatusName"] = "";
                } else {
                    modObj["visitStatusName"] = pjpData[i].visitStatusName;
                }
                if (pjpData[i].isConvertion == undefined || pjpData[i].isConvertion == null) {
                    modObj["isConvertion"] = 0;
                } else {
                    modObj["isConvertion"] = pjpData[i].isConvertion;
                }
                if (pjpData[i].customerId == undefined || pjpData[i].customerId == null) {
                    modObj["customerId"] = 0;
                } else {
                    modObj["customerId"] = pjpData[i].customerId;
                }
                if (pjpData[i].email == undefined || pjpData[i].email == null) {
                    modObj["email"] = "";
                } else {
                    modObj["email"] = pjpData[i].email;
                }
                if (pjpData[i].isInfulencer == undefined || pjpData[i].isInfulencer == null) {
                    modObj["isInfulencer"] = 0;
                } else {
                    modObj["isInfulencer"] = pjpData[i].isInfulencer;
                }
                if (pjpData[i].userId == undefined || pjpData[i].userId == null) {
                    modObj["userId"] = 0;
                } else {
                    modObj["userId"] = pjpData[i].userId;
                }
                if (pjpData[i].plannedDate == undefined || pjpData[i].plannedDate == null) {
                    modObj["plannedDate"] = 0;
                } else {
                    modObj["plannedDate"] = pjpData[i].plannedDate;
                }
                if (pjpData[i].stateId == undefined || pjpData[i].stateId == null) {
                    modObj["stateId"] = "";
                } else {
                    modObj["stateId"] = pjpData[i].stateId;
                }
                if (pjpData[i].profilePic == undefined || pjpData[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = pjpData[i].profilePic;
                }
                if (pjpData[i].isProject == undefined || pjpData[i].isProject == null) {
                    modObj["isProject"] = "";
                } else {
                    modObj["isProject"] = pjpData[i].isProject;
                }
                respData.unplannedlist.push(modObj);
            }
        }
    }
    return (respData);
}

export function modifySubordinateArr(data) {
    let resData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].childUserName != null || data[i].childUserName != undefined) {
                resData.push({ id: data[i].childId, name: data[i].childUserName })
            }
        }
    } else {
        resData = [];
    }
    return resData;
}

export function modifyEnquiryStatusArr(data) {
    let resData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].childUserName != null || data[i].childUserName != undefined) {
                resData.push({ id: data[i].childId, name: data[i].childUserName })
            }
        }
    } else {
        resData = [];
    }
    return resData;
}
