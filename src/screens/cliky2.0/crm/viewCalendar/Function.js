// map function is here

import { Color } from "../../../../enums";
import { Toaster } from "../../../../services/common-view-function";
import { CommonData } from "../../../../services/constant";


export function modifyCalendarData(data) {
    let resData = {};
    if (data) {
        let indexDate = "";
        for (let i = 0; i < data.length; i++) {
            let getColor = { color: "#eac8ff" };
            if ((CommonData.ACTIVITY_DATA[data[i].eventName]) !== undefined) {
                getColor = CommonData.ACTIVITY_DATA[data[i].eventName];
            }
            if (indexDate !== data[i].date) {
                indexDate = data[i].date;
                resData[indexDate] = { dots: [], data: [], selected: false, selectedColor: "#ffffff", selectedTextColor: Color.COLOR.YELLOW.GARGOYLE_GAS };
                resData[indexDate].dots.push(getColor);
                resData[indexDate].data.push(data[i]);
            } else {
                if (resData[indexDate].dots.length <= 5) {
                    resData[indexDate].dots.push(getColor);
                }
                resData[indexDate].data.push(data[i]);
            }
        }
    }
    return resData;
}


export function modifyItemData(data) {
    let resData = [];
    if (data) {
        let eventName = "";
        for (let i = 0; i < data.length; i++) {
            if (eventName !== data[i].eventName) {
                eventName = data[i].eventName;
                let getColor = "#eac8ff";
                if ((CommonData.ACTIVITY_DATA[data[i].eventName]) !== undefined) {
                    getColor = CommonData.ACTIVITY_DATA[data[i].eventName].color;
                }
                resData.push({ eventName: eventName, color: getColor, date: data[i].date, data: data[i] })
            }
        }
    }
    return resData;
}


export function modifyCalenderType(data) {
    let respData = [];
    if (data) {
        respData = data;
        // for (let i = 0; i < respData.length; i++) {
        //     respData[i]["id"]:
        // }
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

export function validateInputData(selectedTime, selectedNotifyObj, selectedTaskCategory, selectedTaskStageObj, isSelfVisit, selectedSubordinate, remarks) {
    let errorCounter = 0;
    let status = false;

    if (selectedTime == undefined || selectedTime == null || selectedTime.length == 0) {
        Toaster.ShortCenterToaster("Please select time !");
        errorCounter++;
    } else if (selectedNotifyObj.id == undefined || selectedNotifyObj.id == null) {
        Toaster.ShortCenterToaster("Please select notify time !");
        errorCounter++;
    } else if (selectedTaskCategory.id == undefined || selectedTaskCategory.id == null) {
        Toaster.ShortCenterToaster("Please select task category !");
        errorCounter++;
    } else if (selectedTaskStageObj.id == undefined || selectedTaskStageObj.id == null) {
        Toaster.ShortCenterToaster("Please select task stage !");
        errorCounter++;
    } else if (validateSubordinate(isSelfVisit, selectedSubordinate) == false) {
        errorCounter++;
    } else if (remarks == undefined || remarks == null || remarks.length == 0) {
        Toaster.ShortCenterToaster("Please enter remarks !");
        errorCounter++;
    }

    if (errorCounter == 0) {
        status = true;
    }

    return status;
}

export function validateSubordinate(isSelfVisit, selectedSubordinate) {
    let errorCounter = 0;
    let status = false;

    if (isSelfVisit == false) {
        if (selectedSubordinate.id == undefined || selectedSubordinate.id == null) {
            Toaster.ShortCenterToaster("Please select subordinate !");
            errorCounter++;
        }
    }

    if (errorCounter == 0) {
        status = true;
    }

    return status;
}

export function modifyTaskCategoryArr(data) {
    let respData = [];
    if (data) {
        respData = data;
        // for (let i = 0; i < respData.length; i++) {
        //     respData[i]["id"] = respData[i].id;
        //     respData[i]["name"] = respData[i].stageName;
        // }
    }
    return respData;
}

export function modifyTaskStageArr(data) {
    let respData = [];
    if (data) {
        respData = data;
        for (let i = 0; i < respData.length; i++) {
            respData[i]["id"] = respData[i].id;
            respData[i]["name"] = respData[i].stageName;
        }
    }
    return respData;
}