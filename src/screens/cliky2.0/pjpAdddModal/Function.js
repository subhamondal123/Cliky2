// function section here

import { DateConvert, Toaster } from "../../../services/common-view-function";
import { DataValidator } from "../../../validators";

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

export function modifySubordinateArr(data) {
    let resData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].childUserName != null || data[i].childUserName != undefined) {
                resData.push({ id: data[i].childId, name: data[i].childUserName, countryId: data[i].childCountryId, stateId: data[i].childStateId, districtId: data[i].childDistrictId, zoneId: data[i].childZoneId })
            }
        }
    } else {
        resData = [];
    }
    return resData;
}

export function modifySubordinateArrV2(data) {
    // let resData = [];
    // if (data) {
    //     for (let i = 0; i < data.length; i++) {
    //         if (data[i].userName != null || data[i].userName != undefined) {
    //             resData.push({ id: data[i].userId, name: data[i].userName , countryId: data[i].countryId, stateId: data[i].stateId, districtId: data[i].districtId, zoneId: data[i].zoneId})
    //         }
    //     }
    // } else {
    //     resData = [];
    // }
    // return resData;

    let arr = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj["id"] = data[i].userId.toString();
            obj["name"] = data[i].userName;
            obj["userId"] = data[i].userId;
            obj["userName"] = data[i].userName;
            obj["countryId"] = data[i].countryId
            arr.push(obj);
        }
    }
    return arr;
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

export function validatePjpDetails(data) {
    let errorCounter = 0;
    // for address section
    if (data.assigningType == false) {
        if (!DataValidator.dropdownEmptyValidator(data.subOrdinateObj.id)) {
            Toaster.ShortCenterToaster("Please select subordinate");
            errorCounter++;
        } else if (!DataValidator.inputEmptyValidator(data.selectDate)) {
            Toaster.ShortCenterToaster("Please select date");
            errorCounter++;
        }
        else if (data.locationObj == undefined || data.locationObj == null || Object.keys(data.locationObj).length == 0) {
            Toaster.ShortCenterToaster("Please select Location!");
            errorCounter++;
        }
        // else if (!DataValidator.dropdownEmptyValidator(data.stateObj.id)) {
        //     Toaster.ShortCenterToaster("Please select state");
        //     errorCounter++;
        // } else if (!DataValidator.dropdownEmptyValidator(data.districtObj.id)) {
        //     Toaster.ShortCenterToaster("Please select district");
        //     errorCounter++;
        // } else if (!DataValidator.dropdownEmptyValidator(data.zoneObj.id)) {
        //     Toaster.ShortCenterToaster("Please select zone");
        //     errorCounter++;
        // }
    } else {
        if (!DataValidator.inputEmptyValidator(data.selectDate)) {
            Toaster.ShortCenterToaster("Please select date");
            errorCounter++;
        }
        else if (data.locationObj == undefined || data.locationObj == null || Object.keys(data.locationObj).length == 0) {
            Toaster.ShortCenterToaster("Please select Location!");
            errorCounter++;
        }
        // else if (!DataValidator.dropdownEmptyValidator(data.stateObj.id)) {
        //     Toaster.ShortCenterToaster("Please select state");
        //     errorCounter++;
        // } else if (!DataValidator.dropdownEmptyValidator(data.districtObj.id)) {
        //     Toaster.ShortCenterToaster("Please select district");
        //     errorCounter++;
        // } else if (!DataValidator.dropdownEmptyValidator(data.zoneObj.id)) {
        //     Toaster.ShortCenterToaster("Please select zone");
        //     errorCounter++;
        // }
    }

    if (errorCounter === 0) {
        return { status: true, reqData: modifyData(data) };
    } else {
        return { status: false, stateObj: data };
    }
}

export function modifyData(data) {
    let resObj = {};
    resObj["selectDate"] = DateConvert.formatYYYYMMDD(data.selectRawDate);
    // resObj["stateId"] = data.stateObj.id ? data.stateObj.id : "0";
    // resObj["districtId"] = data.districtObj.id ? data.districtObj.id : "0";
    // resObj["zoneId"] = data.zoneObj.id ? data.zoneObj.id : "0";
    resObj["fieldVisitId"] = data.fieldVisitId ? data.fieldVisitId : "0";
    resObj["selectedSubordinateId"] = data.subOrdinateObj.id ? data.subOrdinateObj.id : "0";
    // resObj["locationArr"] = data.locationArr ? data.locationArr : [];
    resObj["hierarchyTypeId"] = data.locationObj ? data.locationObj.hierarchyTypeId : "";
    resObj["hierarchyDataId"] = data.locationObj ? data.locationObj.hierarchyDataId : "";

    return resObj;
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

export function modifyDataForApi(data) {
    let arr = [];
    let obj = {
        "customerId": data.customerId,
        "type": (data.isInfulencer == 6 || data.isInfulencer == 2 || data.isInfulencer == 3) ? 'target' : (data.isInfulencer == 0 || data.isInfulencer == 7) ? 'customer' : data.isInfulencer == 1 ? 'influencer' : '',
    }
    arr.push(obj);
    return arr;
}