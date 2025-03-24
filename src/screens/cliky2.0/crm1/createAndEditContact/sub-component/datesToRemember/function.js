import { Toaster } from "../../../../../../services/common-view-function";

export function modifyData(data) {
    let obj = {};
    if (data.datesToRemArr == undefined || data.datesToRemArr == null || data.datesToRemArr.length == 0) {
        obj["allDataArr"] = [
            {
                selectedOccasion: {},
                datePicker: false,
                dateObj: {
                    rawDate: new Date(),
                    date: ""
                },
                isReminder: false,
                isYearlyRepeat: false
            }
        ];
    } else {
        obj["allDataArr"] = data.datesToRemArr;
    }

    return obj;
}

export function validateData(data) {
    let resStatus = false;
    let errCounter = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].selectedOccasion.id == undefined || data[i].selectedOccasion.id == null) {
            Toaster.ShortCenterToaster("Please select occasion!");
            errCounter++;
        } else if (data[i].dateObj.date == undefined || data[i].dateObj.date == null || data[i].dateObj.date.length == 0) {
            Toaster.ShortCenterToaster("Please select date!");
            errCounter++;
        }
    }

    if (errCounter == 0) {
        resStatus = true;
    }

    return resStatus;
}

export function modifyEventArr(data) {
    // [{ "occasionId": 100, "occasionDate": "2022-07-22", "occasionReminder": true, "occasionYrlyRepet": false }, { "occasionId": 101, "occasionDate": "2022-04-22", "occasionReminder": false, "occasionYrlyRepet": true }]
    let arr = [];
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj["occasionId"] = data[i].selectedOccasion.occasionId;
            obj["occasionDate"] = data[i].dateObj.date;
            obj["occasionReminder"] = data[i].isReminder;
            obj["occasionYrlyRepet"] = data[i].isYearlyRepeat;
            arr.push(obj);
        }
    }
    return arr;
}