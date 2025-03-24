import { AlertMessage } from "../../../../../enums";
import { Toaster } from "../../../../../services/common-view-function";
import { DataValidator } from "../../../../../validators";

export function modifyPageData(data) {
    let resData = {
        phoneNo: "",
        phoneNoActive: false,
        email: "",
        emailActive: false,
        address: "",
        addressActive: false,
        selectedStateObj: {},
        selectedDistrictObj: {},
        selectedZoneObj: {},
        remarks: "",
        remarksActive: false,
    }
    if (data) {
        if (data.phoneNo == undefined || data.phoneNo == null || data.phoneNo.length == 0) {
            resData.phoneNo = "";
        } else {
            resData.phoneNo = data.phoneNo;
        }
        if (data.email == undefined || data.email == null || data.email.length == 0) {
            resData.email = "";
        } else {
            resData.email = data.email;
        }
        if (data.address == undefined || data.address == null || data.address.length == 0) {
            resData.address = "";
        } else {
            resData.address = data.address;
        }
        if (data.selectedStateObj.id == undefined || data.selectedStateObj.id == null) {
            resData.selectedStateObj = {};
        } else {
            resData.selectedStateObj = data.selectedStateObj;
        }
        if (data.selectedDistrictObj.id == undefined || data.selectedDistrictObj.id == null) {
            resData.selectedDistrictObj = {};
        } else {
            resData.selectedDistrictObj = data.selectedDistrictObj;
        }
        if (data.selectedZoneObj.id == undefined || data.selectedZoneObj.id == null) {
            resData.selectedZoneObj = {};
        } else {
            resData.selectedZoneObj = data.selectedZoneObj;
        }
        if (data.remarks == undefined || data.remarks == null || data.remarks.length == 0) {
            resData.remarks = "";
        } else {
            resData.remarks = data.remarks;
        }
    }
    return resData;
}

export function modifyStateArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].stateId;
            data[i]["name"] = data[i].stateName;
        }
    } else {
        data = [];
    }
    return data;
}

export function modifyDistArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].cityId;
            data[i]["name"] = data[i].cityName;
        }
    } else {
        data = [];
    }
    return data;
}

export function validateRequestData(value) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (validatePhoneNumber(value.phoneNo) == false) {
        errCounter++;
    } else if (validateEmail(value.email) == false) {
        errCounter++;
    } else if (value.address == undefined || value.address == null || value.address.length == 0) {
        errCounter++;
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SURVEY.ADDRESS_ERROR);
    } 
    // else if (value.selectedStateObj.id == undefined || value.selectedStateObj.id == null) {
    //     errCounter++;
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SURVEY.STATE_ERROR);
    // } else if (value.selectedDistrictObj.id == undefined || value.selectedDistrictObj.id == null) {
    //     errCounter++;
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SURVEY.DISTRICT_ERROR);
    // } else if (value.selectedZoneObj.id == undefined || value.selectedZoneObj.id == null) {
    //     errCounter++;
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SURVEY.ZONE_ERROR);
    // } 
    else if (value.remarks == undefined || value.remarks == null || value.remarks.length == 0) {
        errCounter++;
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SURVEY.REMARK_ERROR);
    }

    if (errCounter == 0) {
        resObj.status = true
    }

    return resObj;
}

export function modifyZoneArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].zoneId;
            data[i]["name"] = data[i].zoneName;
        }
    } else {
        data = [];
    }
    return data;
}

export function validateEmail(data) {
    let errCounter = 0;
    let status = false;
    if (data.length > 0) {
        if (DataValidator.emailValidator(data) == false) {
            errCounter++;
        }
    }

    if (errCounter == 0) {
        status = true;
    }

    return status;
}

export function validatePhoneNumber(data) {
    let errCounter = 0;
    let status = false;
    if (data == undefined || data == null || data.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.PHONE_NUMBER_ERROR);
        errCounter++;
    } else {
        if (DataValidator.mobileNumberValidator(data) == false) {
            errCounter++;
        }
    }


    if (errCounter == 0) {
        status = true;
    }

    return status;
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
