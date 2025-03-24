
import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { DataValidator } from "../../../../../../validators";

export function validateData(data, props) {
    let errCounter = 0;
    let resObj = {
        status: false
    }
    if (data.contactId == null || data.contactId == null || data.contactId.length == 0) {
        Toaster.ShortCenterToaster("Please select a Contact !");
        errCounter++;
    } else if (data.orgName == null || data.orgName == null || data.orgName == "Default") {
        Toaster.ShortCenterToaster("Please select a Account !");
        errCounter++;
    } else if (data.leadName == null || data.leadName == null || data.leadName.length == 0) {
        Toaster.ShortCenterToaster("Please enter Lead Name !");
        errCounter++;
    } else if (data.leadType == null || data.leadType == null || data.leadType.length == 0) {
        Toaster.ShortCenterToaster("Please select Contact type !");
        errCounter++;
    } else if (data.leadStatus == null || data.leadStatus == null || data.leadStatus.length == 0) {
        Toaster.ShortCenterToaster("Please select Lead Status !");
        errCounter++;
    } else if (data.leadSourceType == null || data.leadSourceType == null || data.leadSourceType.length == 0) {
        Toaster.ShortCenterToaster("Please select Lead Source Type !");
        errCounter++;
    } else if (data.leadStage == null || data.leadStage == null || data.leadStage.length == 0) {
        Toaster.ShortCenterToaster("Please select Lead Stage !");
        errCounter++;
    } else if (data.leadStageRemarks == null || data.leadStageRemarks == null || data.leadStageRemarks.length == 0) {
        Toaster.ShortCenterToaster("Please enter Lead Stage Remarks!");
        errCounter++;
    } else if (data.leadOwner == null || data.leadOwner == null || data.leadOwner.length == 0) {
        Toaster.ShortCenterToaster("Please select Lead Owner!");
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

export function validateEmailArray(data) {
    let errCounter = 0;
    let status = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].email == undefined || data[i].email == null || data[i].email.length == 0) {
            Toaster.ShortCenterToaster("Please enter email id !");
            errCounter++;
        } else {
            if (DataValidator.emailValidator(data[i].email) == false) {
                errCounter++;
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




export function customerModifyData(data) {
    var arr = [];
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].contactId == undefined || data[i].contactId == null) {
                modObj["id"] = "";
            } else {
                modObj["id"] = data[i].contactId;
            }
            if (data[i].contactName == undefined || data[i].contactName == null) {
                modObj["name"] = "";
            } else {
                modObj["name"] = data[i].contactName;
            }
            if (data[i].organizationId == undefined || data[i].organizationId == null) {
                modObj["organizationId"] = "";
            } else {
                modObj["organizationId"] = data[i].organizationId;
            }
            if (data[i].organizationName == undefined || data[i].organizationName == null) {
                modObj["organizationName"] = "";
            } else {
                modObj["organizationName"] = data[i].organizationName;
            }

            modObj["check"] = false;
            arr.push(modObj);
        }
    }
    return arr;
}

export function orgModifyData(data) {
    let modArrData = [];
    if (data && data.length > 0) {

        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].organizationId == undefined || data[i].organizationId == null) {
                modObj["id"] = "";
            } else {
                modObj["id"] = data[i].organizationId;
            }
            if (data[i].organizationName == undefined || data[i].organizationName == null) {
                modObj["name"] = "";
            } else {
                modObj["name"] = data[i].organizationName;
            }

            modObj["check"] = false;
            modArrData.push(modObj);
        }

    }
    return modArrData;
}


export function modifyUserData(arr) {
    let modArr = []
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {}
            if (arr[i].childId == undefined || arr[i].childId == null) {
                obj["id"] = ""
            } else {
                obj["id"] = arr[i].childId
            }
            if (arr[i].childUserName == undefined || arr[i].childUserName == null) {
                obj["name"] = ""
            } else {
                obj["name"] = arr[i].childUserName
            }

            modArr.push(obj)
        }
    }

    return modArr
}
