import { AlertMessage } from "../../../enums";
import { DateConvert, Toaster } from "../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }
    if (data.startDate == undefined || data.startDate == null || data.startDate.length == 0) {
        Toaster.ShortCenterToaster("Please Enter From Date!");
        errCounter++;
    } else if (data.endDate == undefined || data.endDate == null || data.endDate.length == 0) {
        Toaster.ShortCenterToaster("Please Enter To Date!");
        errCounter++;
    }
    else if (data.leaveType == undefined || data.leaveType == null || data.leaveType.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAVE.TYPE_ERROR);
        errCounter++;
    } else if (data.noOfDays == undefined || data.noOfDays == null || data.noOfDays.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAVE.DAYS_ERROR);
        errCounter++;
    }

    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function dateCount(startDate, endDate) {
    let date1 = new Date(DateConvert.formatYYYYMMDD(startDate));
    let date2 = new Date(DateConvert.formatYYYYMMDD(endDate));
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days + 1;
}

export function modifyLeaveDataArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].id;
            data[i]["name"] = data[i].typeName;
        }
    }
    return data;
}
