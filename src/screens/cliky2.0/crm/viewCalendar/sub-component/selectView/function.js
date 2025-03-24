// for modify the data

import { DateConvert } from "../../../../../../services/common-view-function";
import { modifyItemData } from "../../Function";

export function modifyCalendarData(data) {
    for (let i = 0; i < data.length; i++) {
        data[i]["check"] = true;
    }
    return data;
}

export function modifyCalenderItemData(data, startDateRaw, endDateRaw) {
    let date = startDateRaw;
    let modifiedData = insertVarToModData(modifyItemData(data));
    let resData = [];
    if (data) {
        for (let i = 0; i < 7; i++) {
            let obj = {};
            obj["date"] = DateConvert.formatYYYYMMDD(date);
            obj["data"] = filterDataAccordingToADate(modifiedData, date);
            resData.push(obj);
            date = DateConvert.dateChangeForBeforeAfter(startDateRaw, "after", 1);
        }
    }
    return resData;
}

export function filterDataAccordingToADate(data, date) {
    let curDate = DateConvert.formatYYYYMMDD(date);
    let resArr = [];
    for (let i = 0; i < data.length; i++) {
        if (curDate == data[i].date) {
            resArr.push(data[i]);
        }
    }

    return resArr;
}

export function insertVarToModData(data) {
    let resArr = [];
    if (data && data.length > 0) {
        resArr = data;
        for (let i = 0; i < resArr.length; i++) {
            resArr[i]["check"] = false
        }
    }
    return resArr;
}

export function showHideDescription(dateItem, dateKey, item, key, allItem) {
    let resArr = [];
    if (allItem && allItem.length > 0) {
        resArr = allItem;
        for (let i = 0; i < resArr.length; i++) {
            if (i == key) {
                resArr[i].data = showHideDesc(dateItem, dateKey, resArr[i].data);
            } else {
                resArr[i].data = hideAll(dateItem, dateKey, resArr[i].data);
            }
        }
    }
    return resArr;
}

export function showHideDesc(dateItem, dateKey, dateAllData) {
    let arr = [];
    if (dateAllData && dateAllData.length > 0) {
        arr = dateAllData;
        for (let i = 0; i < arr.length; i++) {
            if (i == dateKey) {
                arr[i].check = !arr[i].check;
            } else {
                arr[i].check = false;
            }
        }
    }
    return arr;
}

export function hideAll(dateItem, dateKey, dateAllData) {
    let arr = [];
    if (dateAllData && dateAllData.length > 0) {
        arr = dateAllData;
        for (let i = 0; i < arr.length; i++) {
            arr[i].check = false;
        }
    }
    return arr;
}