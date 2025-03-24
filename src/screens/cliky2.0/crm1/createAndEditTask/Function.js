import { DateConvert } from "../../../../services/common-view-function";

export function modifyLanding(data) {
    if (data.categoryDtl.length > 0) {
        for (let i = 0; i < data.categoryDtl.length; i++) {
            data.categoryDtl[i]["id"] = data.categoryDtl[i].categoryId;
            data.categoryDtl[i]["name"] = data.categoryDtl[i].categoryName;
        }
    }

    if (data.userDtl.length > 0) {
        for (let i = 0; i < data.userDtl.length; i++) {
            data.userDtl[i]["id"] = data.userDtl[i].userId;
            data.userDtl[i]["name"] = data.userDtl[i].firstName + " " + data.userDtl[i].lastName;
        }
    }

    if (data.stageDtl.length > 0) {
        for (let i = 0; i < data.stageDtl.length; i++) {
            data.stageDtl[i]["id"] = data.stageDtl[i].taskStageId;
            data.stageDtl[i]["name"] = data.stageDtl[i].stageName;
        }
    }

    if (data.priorityDtl.length > 0) {
        for (let i = 0; i < data.priorityDtl.length; i++) {
            data.priorityDtl[i]["id"] = data.priorityDtl[i].priorityId;
            data.priorityDtl[i]["name"] = data.priorityDtl[i].priorityName;
        }
    }

    return data;
}

export function modifyResp(data) {

    let modifiedResp = {};
    if (data) {
        if (data.taskName == undefined || data.taskName == null) {
            modifiedResp["taskName"] = "";
        } else {
            modifiedResp["taskName"] = data.taskName;
        }

        if (data.taskCategoryId == undefined || data.taskCategoryId == null) {
            modifiedResp["taskCategory"] = null;
        } else {
            modifiedResp["taskCategory"] = data.taskCategoryId;
        }

        if (data.assignType == undefined || data.assignType == null) {
            modifiedResp["assignToType"] = false;
        } else {
            modifiedResp["assignToType"] = (data.assignType == 1) ? true : false;
        }

        if (data.assignTo == undefined || data.assignTo == null) {
            modifiedResp["assignedUser"] = null;
        } else {
            modifiedResp["assignedUser"] = data.assignTo;
        }

        if (data.dueDate == undefined || data.dueDate == null) {
            modifiedResp["dueDate"] = "";
        } else {
            modifiedResp["dueDate"] = data.dueDate;
        }

        if (data.priorityStatusId == undefined || data.priorityStatusId == null) {
            modifiedResp["priorityStatus"] = null;
        } else {
            modifiedResp["priorityStatus"] = data.priorityStatusId;
        }

        if (data.taskStageId == undefined || data.taskStageId == null) {
            modifiedResp["taskStage"] = null;
        } else {
            modifiedResp["taskStage"] = data.taskStageId;
        }

        if (data.organizationName == undefined || data.organizationName == null) {
            modifiedResp["organizationName"] = "";
        } else {
            modifiedResp["organizationName"] = data.organizationName;
        }

        if (data.contactPerson == undefined || data.contactPerson == null) {
            modifiedResp["contactPersonName"] = "";
        } else {
            modifiedResp["contactPersonName"] = data.contactPerson;
        }

        if (data.contactPersonPhone == undefined || data.contactPersonPhone == null) {
            modifiedResp["phoneNumberArr"] = [
                { phoneNumber: "", phoneNumberActive: false },
            ];
        } else {
            modifiedResp["phoneNumberArr"] = modifyPhoneNumStrToArr(data.contactPersonPhone);
        }

        if (data.contactPersonEmail == undefined || data.contactPersonEmail == null) {
            modifiedResp["emailArr"] = [
                { emailId: "", emailActive: false },
            ];
        } else {
            modifiedResp["emailArr"] = modifyEmailStrToArr(data.contactPersonEmail);
        }

        if (data.needMeeting == undefined || data.needMeeting == null) {
            modifiedResp["isNeedMeeting"] = false;
        } else {
            modifiedResp["isNeedMeeting"] = (data.needMeeting == "1") ? true : false;
        }

        if (data.meetingTime == undefined || data.meetingTime == null) {
            modifiedResp["dateTimeRaw"] = new Date();
            modifiedResp["dateTime"] = "";
        } else {
            let dateRaw = dateTimeFromApiToTZ(data.meetingTime);
            modifiedResp["dateTimeRaw"] = dateRaw;
            modifiedResp["dateTime"] = DateConvert.formatYYYYMMDDHHMM(dateRaw);
        }

        if (data.isRecurring == undefined || data.isRecurring == null) {
            modifiedResp["isRecurring"] = false;
        } else {
            modifiedResp["isRecurring"] = (data.isRecurring == "1") ? true : false;
        }

        if (data.recurringType == undefined || data.recurringType == null) {
            modifiedResp["recurringType"] = null;
        } else {
            modifiedResp["recurringType"] = parseInt(data.recurringType);
        }

        if (data.recurringType == '1') {
            if (data.startDate == undefined || data.startDate == null) {
                modifiedResp["date"] = "";
            } else {
                modifiedResp["date"] = data.startDate;
            }
        } else {
            if (data.startDate == undefined || data.startDate == null) {
                modifiedResp["startDate"] = "";
            } else {
                modifiedResp["startDate"] = data.startDate;
            }

            if (data.endDate == undefined || data.endDate == null) {
                modifiedResp["endDate"] = "";
            } else {
                modifiedResp["endDate"] = data.endDate;
            }
        }

        if (data.taskDescription == undefined || data.taskDescription == null) {
            modifiedResp["description"] = "";
        } else {
            modifiedResp["description"] = data.taskDescription;
        }

        if (data.permissionType == undefined || data.permissionType == null) {
            modifiedResp["permission"] = "";
        } else {
            modifiedResp["permission"] = data.permissionType;
        }

        if (data.accessId == undefined || data.accessId == null) {
            modifiedResp["selectedIndividualUser"] = "";
        } else {
            modifiedResp["selectedIndividualUser"] = data.accessId;
        }
        if (data.taskId == undefined || data.taskId == null) {
            modifiedResp["taskId"] = "";
        } else {
            modifiedResp["taskId"] = data.taskId;
        }
        if (data.assignUsers == undefined || data.assignUsers == null) {
            modifiedResp["assignUsers"] = "";
        } else {
            modifiedResp["assignUsers"] = data.assignUsers;
        }
      
    }

    return modifiedResp;
}

export function modifyPhoneNumStrToArr(data) {
    let splitArr = data.split(",");
    let retArr = [];
    for (let i = 0; i < splitArr.length; i++) {
        let obj = {};
        obj["phoneNumber"] = splitArr[i];
        obj["phoneNumberActive"] = false;
        retArr.push(obj);
    }
    return retArr;
}

export function modifyEmailStrToArr(data) {
    let splitArr = data.split(",");
    let retArr = [];
    for (let i = 0; i < splitArr.length; i++) {
        let obj = {};
        obj["emailId"] = splitArr[i];
        obj["emailActive"] = false;
        retArr.push(obj);
    }
    return retArr;
}

export function dateTimeFromApiToTZ(dateTime) {
    let splitedDateTime = dateTime.split('T');
    let splitedDate = splitedDateTime[0].split('-');
    let splitedTime = splitedDateTime[1].split(':');
    let rawDate = new Date(splitedDate[0], splitedDate[1], splitedDate[2], splitedTime[0], splitedTime[1], splitedTime[2], 0);
    return rawDate;
}