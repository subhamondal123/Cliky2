import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

   if (data.employeeTypeId == undefined || data.employeeTypeId == null || data.employeeTypeId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.ASSIGN_INFO.EMPLOYEE_TYPE_ERROR);
        errCounter++;
    } else if (data.assignTo == undefined || data.assignTo == null || data.assignTo == "0" || data.assignTo.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.ASSIGN_INFO.ASSIGNED_PERSON_ERROR);
        errCounter++;
    } else if (data.assignDate == undefined || data.assignDate == null || data.assignDate.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.ASSIGN_INFO.ASSIGNED_DATE_ERROR);
        errCounter++;
    }
    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function modifyPhoneNumberObject(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push({ phoneNumber: data[i].phoneNumber, phoneNumberActive: false })
    }
    return arr;
}
export function modifyEmailObject(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push({ emailId: data[i].emailId, emailActive: false })
    }
    return arr;
}

export function assignedEmployeeModifyData(data) {
    var respData = {"assignedEmployeeList":[]};
    if (data) {
        let assignedEmployeeData = data.response;
        if (assignedEmployeeData && assignedEmployeeData.length > 0) {
            for (let i = 0; i < assignedEmployeeData.length; i++) {
                let modObj = {};
                if (assignedEmployeeData[i].userId == undefined || assignedEmployeeData[i].userId == null) {
                    modObj["userId"] = "";
                } else {
                    modObj["userId"] = assignedEmployeeData[i].userId;
                }
                if (assignedEmployeeData[i].userName == undefined || assignedEmployeeData[i].userName == null) {
                    modObj["userName"] = "";
                } else {
                    modObj["userName"] = assignedEmployeeData[i].userName;
                }
                
                modObj["check"] = false;
                respData.assignedEmployeeList.push(modObj);
            }
        }
    }

    return respData;
}

export function enquirySourceModifyData(data) {
    var respData = {"employeeTypeList":[]};
    if (data) {
        let employeeTypeData = data.employeeType;
        if (employeeTypeData && employeeTypeData.length > 0) {
            for (let i = 0; i < employeeTypeData.length; i++) {
                let modObj = {};
                if (employeeTypeData[i].designationId == undefined || employeeTypeData[i].designationId == null) {
                    modObj["designationId"] = "";
                } else {
                    modObj["designationId"] = employeeTypeData[i].designationId;
                }
                if (employeeTypeData[i].designationName == undefined || employeeTypeData[i].designationName == null) {
                    modObj["designationName"] = "";
                } else {
                    modObj["designationName"] = employeeTypeData[i].designationName;
                }
                modObj["check"] = false;
                respData.employeeTypeList.push(modObj);
            }
        }
    }
    return (respData);
}
export function modifyEmployeeTypeArrData(employeeTypeArr) {
    let modArrData = [];
    if (employeeTypeArr && employeeTypeArr.length > 0) { 
        for (let i = 0; i < employeeTypeArr.length; i++) {
              modArrData.push({
                id: employeeTypeArr[i].designationId,
                name: employeeTypeArr[i].designationName,
                check:false,
              })
        }
    }
    return modArrData;
}
export function modifyAssignedEmployeeArrData(assignedArr) {
    let modArrData = [];
    if (assignedArr && assignedArr.length > 0) { 
        for (let i = 0; i < assignedArr.length; i++) {
              modArrData.push({
                id: assignedArr[i].userId,
                name: assignedArr[i].userName,
                check:false,
              })
        }
    }
    return modArrData;
}