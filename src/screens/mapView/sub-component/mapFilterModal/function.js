// page function is here

import { Toaster } from "../../../../services/common-view-function";


export function modifyEmployeeTypeArr(data) {
    let resData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = (data[i].designationId).toString();
            data[i]["name"] = data[i].designationName;
        }
        resData = data;
    }
    return resData;
}


// for modify the state data
export function modifyStateData(data) {
    let resData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].district.length > 0) {
                resData.push(data[i]);
            }
        }
    }
    return resData;
}


// for modify the state data
export function modifyEmployeeNameData(data) {
    let resData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            resData.push({
                "id": data[i].userId.toString(),
                "name": data[i].firstName + " " + data[i].lastName
            })
        }
    }
    return resData;
}

// for validate Beat Route data
export function validateBeatRouteData(data) {
    let errCounter = 0;
    if (data.employeeType.id == undefined || data.employeeType.id == null || data.employeeType.id.length == 0) {
        Toaster.ShortCenterToaster("Please select Employee Type");
        errCounter++;
    } else if(data.employeeId.id == undefined || data.employeeId.id == null || data.employeeId.id.length == 0) {
        Toaster.ShortCenterToaster("Please select Employee");
        errCounter++;
    } else if(data.visitDate.viewDate == undefined || data.visitDate.viewDate == null || data.visitDate.viewDate.length == 0) {
        Toaster.ShortCenterToaster("Please select Date");
        errCounter++;
    }
    if (errCounter == 0) {
        return true;
    }
}
