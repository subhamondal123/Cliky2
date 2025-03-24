
// import { CommonData } from "../../services/constant";

import { DateConvert, Toaster } from "../../../../services/common-view-function";

export function modifyApiResp(data, type) {
    let modifiedObj = {};
    if (data) {
        let resp = data[0];
        let modifiedTaskDetails = modifyDetails(resp, data);
        let modifiedTaskOwnership = modifyTaskOwnerShip(resp);

        modifiedObj["allDetails"] = modifiedTaskDetails;
        modifiedObj["taskOwnerShip"] = modifiedTaskOwnership;
    }
    return modifiedObj;
}


export function modifyDetails(data) {
    let modifiedArr = [];
    let obj = {};
    let tabValue = {};
    obj["tabName"] = "Details";
    if (data.recordNo == undefined || data.recordNo == null || data.recordNo.length == 0) {
        tabValue["Record Id"] = "";
    } else {
        tabValue["Record Id"] = data.recordNo
    }

    if (data.taskName == undefined || data.taskName == null || data.taskName.length == 0) {
        tabValue["Task Name"] = "";
    } else {
        tabValue["Task Name"] = data.taskName
    }
    if (data.dueDate == undefined || data.dueDate == null || data.dueDate.length == 0) {
        tabValue["Due Date"] = "";
    } else {
        tabValue["Due Date"] = DateConvert.viewDateFormat(data.dueDate)
    }

    if (data.priorityName == undefined || data.priorityName == null || data.priorityName.length == 0) {
        tabValue["Priority Status"] = "";
    } else {
        tabValue["Priority Status"] = data.priorityName
    }

    if (data.taskType == undefined || data.taskType == null || data.taskType.length == 0) {
        tabValue["Task Stage"] = "";
    } else {
        tabValue["Task Stage"] = data.taskType
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Additional Information";

    if (data.organizationName == undefined || data.organizationName == null || data.organizationName.length == 0) {
        tabValue["Organization Name"] = "";
    } else {
        tabValue["Organization Name"] = data.organizationName
    }

    if (data.contactPerson == undefined || data.contactPerson == null || data.contactPerson.length == 0) {
        tabValue["Contact Person"] = "";
    } else {
        tabValue["Contact Person"] = data.contactPerson
    }

    if (data.contactPersonPhone == undefined || data.contactPersonPhone == null || data.contactPersonPhone.length == 0) {
        tabValue["Phone number"] = "";
    } else {
        tabValue["Phone number"] = data.contactPersonPhone.toString();
    }

    if (data.contactPersonEmail == undefined || data.contactPersonEmail == null || data.contactPersonEmail.length == 0) {
        tabValue["Email ID"] = "";
    } else {
        tabValue["Email ID"] = data.contactPersonEmail
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Description";

    if (data.taskDescription == undefined || data.taskDescription == null || data.taskDescription.length == 0) {
        tabValue["Description"] = "";
    } else {
        tabValue["Description"] = data.taskDescription
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);

    return modifiedArr;
}



export function modifyTaskOwnerShip(data) {
    let tabValue = {};

    if (data.createdBy == undefined || data.createdBy == null || data.createdBy.length == 0) {
        tabValue["Created By"] = "";
    } else {
        tabValue["Created By"] = data.createdBy
    }

    if (data.createdAt == undefined || data.createdAt == null || data.createdAt.length == 0) {
        tabValue["Date Created"] = "";
    } else {
        tabValue["Date Created"] = DateConvert.viewDateFormat(data.createdAt)
    }
    if (data.dueDate == undefined || data.dueDate == null || data.dueDate.length == 0) {
        tabValue["Due Date"] = "";
    } else {
        tabValue["Due Date"] = DateConvert.viewDateFormat(data.dueDate)
    }


    return tabValue;
}

export function modifyPriorityData(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].priorityId;
            data[i]["name"] = data[i].priorityName;
        }
    } else {
        data = [];
    }
    return data;
}

export function modifyTaskStageData(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].taskStageId;
            data[i]["name"] = data[i].stageName;
        }
    } else {
        data = [];
    }
    return data;
}

export function validateStatusUpdateData(data) {
    let err = 0;
    let status = false;
    if ((data.priorityStatusId == undefined || data.priorityStatusId.length == 0) && (data.taskStageId == undefined || data.taskStageId.length == 0)) {
        Toaster.ShortCenterToaster("Please select status or priority !");
        err++;
    }

    if (err == 0) {
        status = true;
    }

    return status;
}