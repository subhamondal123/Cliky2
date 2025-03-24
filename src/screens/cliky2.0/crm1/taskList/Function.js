import { DateConvert } from "../../../../services/common-view-function";

export function taskModifyData(data) {
    var respData = { "totalCount": 0, "taskList": [] };
    if (data) {
        let taskData = data.response;
        respData.totalCount = data.response.counter;
        if (taskData && taskData.length > 0) {
            for (let i = 0; i < taskData.length; i++) {
                let modObj = {};
                if (taskData[i].taskId == undefined || taskData[i].taskId == null) {
                    modObj["taskId"] = "";
                } else {
                    modObj["taskId"] = taskData[i].taskId;
                }
                if (taskData[i].color == undefined || taskData[i].color == null) {
                    modObj["color"] = "";
                } else {
                    modObj["color"] = taskData[i].color;
                }
                if (taskData[i].assignUsers == undefined || taskData[i].assignUsers == null) {
                    modObj["assignUsers"] = [];
                } else {
                    modObj["assignUsers"] = taskData[i].assignUsers;
                }

                if (taskData[i].taskName == undefined || taskData[i].taskName == null) {
                    modObj["taskName"] = "";
                } else {
                    modObj["taskName"] = taskData[i].taskName;
                }
                if (taskData[i].isImportant == undefined || taskData[i].isImportant == null) {
                    modObj["isImportant"] = "";
                } else {
                    modObj["isImportant"] = taskData[i].isImportant;
                }
                if (taskData[i].dueDate == undefined || taskData[i].dueDate == null) {
                    modObj["dueDate"] = "";
                } else {
                    modObj["dueDate"] = taskData[i].dueDate;
                }
                if (taskData[i].profilePic == undefined || taskData[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = taskData[i].profilePic;
                }
                if (taskData[i].assignToUser == undefined || taskData[i].assignToUser == null) {
                    modObj["assignToUser"] = "";
                } else {
                    modObj["assignToUser"] = taskData[i].assignToUser;
                }
                if (taskData[i].contactPerson == undefined || taskData[i].contactPerson == null) {
                    modObj["contactPerson"] = "";
                } else {
                    modObj["contactPerson"] = taskData[i].contactPerson;
                }
                if (taskData[i].createUser == undefined || taskData[i].createUser == null) {
                    modObj["createUser"] = 0;
                } else {
                    modObj["createUser"] = taskData[i].createUser;
                }
                if (taskData[i].phone == undefined || taskData[i].phone == null) {
                    modObj["phone"] = 0;
                } else {
                    modObj["phone"] = taskData[i].phone;
                }
                if (taskData[i].priorityName == undefined || taskData[i].priorityName == null) {
                    modObj["priorityName"] = "";
                } else {
                    modObj["priorityName"] = taskData[i].priorityName;
                }
                if (taskData[i].priorityStatusId == undefined || taskData[i].priorityStatusId == null) {
                    modObj["priorityStatusId"] = "";
                } else {
                    modObj["priorityStatusId"] = taskData[i].priorityStatusId;
                }
                if (taskData[i].organizationName == undefined || taskData[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = taskData[i].organizationName;
                }
                if (taskData[i].contactPersonEmail == undefined || taskData[i].contactPersonEmail == null) {
                    modObj["contactPersonEmail"] = "";
                } else {
                    modObj["contactPersonEmail"] = taskData[i].contactPersonEmail;
                }
                if (taskData[i].taskCategoryId == undefined || taskData[i].taskCategoryId == null) {
                    modObj["taskCategoryId"] = "";
                } else {
                    modObj["taskCategoryId"] = taskData[i].taskCategoryId;
                }
                if (taskData[i].categoryName == undefined || taskData[i].categoryName == null) {
                    modObj["categoryName"] = "";
                } else {
                    modObj["categoryName"] = taskData[i].categoryName;
                }
                if (taskData[i].stageName == undefined || taskData[i].stageName == null) {
                    modObj["stageName"] = "";
                } else {
                    modObj["stageName"] = taskData[i].stageName;
                }
                if (taskData[i].taskStageId == undefined || taskData[i].taskStageId == null) {
                    modObj["taskStageId"] = "";
                } else {
                    modObj["taskStageId"] = taskData[i].taskStageId;
                }
                if (taskData[i].contactPersonPhone == undefined || taskData[i].contactPersonPhone == null) {
                    modObj["contactPersonPhone"] = "";
                } else {
                    modObj["contactPersonPhone"] = taskData[i].contactPersonPhone;
                }
                if (taskData[i].taskDescription == undefined || taskData[i].taskDescription == null) {
                    modObj["taskDescription"] = "";
                } else {
                    modObj["taskDescription"] = taskData[i].taskDescription;
                }
                if (taskData[i].permissionType == undefined || taskData[i].permissionType == null) {
                    modObj["permissionType"] = "";
                } else {
                    modObj["permissionType"] = taskData[i].permissionType;
                }
                if (taskData[i].needMeeting == undefined || taskData[i].needMeeting == null) {
                    modObj["needMeeting"] = "";
                } else {
                    modObj["needMeeting"] = taskData[i].needMeeting;
                }
                if (taskData[i].isRecurring == undefined || taskData[i].isRecurring == null) {
                    modObj["isRecurring"] = "";
                } else {
                    modObj["isRecurring"] = taskData[i].isRecurring;
                }
                if (taskData[i].meetingTime == undefined || taskData[i].meetingTime == null) {
                    modObj["meetingTime"] = "";
                } else {
                    modObj["meetingTime"] = taskData[i].meetingTime;
                }

                if (taskData[i].recurringType == undefined || taskData[i].recurringType == null) {
                    modObj["recurringType"] = "";
                } else {
                    modObj["recurringType"] = taskData[i].recurringType;
                }
                if (taskData[i].createdAt == undefined || taskData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = taskData[i].createdAt;
                }
                if (taskData[i].startDate == undefined || taskData[i].startDate == null) {
                    modObj["startDate"] = "";
                } else {
                    modObj["startDate"] = taskData[i].startDate;
                }
                if (taskData[i].endDate == undefined || taskData[i].endDate == null) {
                    modObj["endDate"] = "";
                } else {
                    modObj["endDate"] = taskData[i].endDate;
                }

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.taskList.push(modObj);
            }
        }
    }
    return (respData);
}

// convert list data
export function convertListData(taskData, item) {
    if (taskData && taskData.length > 0) {
        for (let i = 0; i < taskData.length; i++) {
            if (taskData[i].taskId == item.taskId) {
                taskData[i].check = !taskData[i].check;
            } else {
                taskData[i].check = false;
            }
        }
    }
    return taskData;
}

export function checkedListData(taskData, item) {
    if (taskData && taskData.length > 0) {
        for (let i = 0; i < taskData.length; i++) {
            if (taskData[i].taskId == item.taskId) {
                taskData[i].tick = !taskData[i].tick;
            } else {
                taskData[i].tick = false;
            }
        }
    }
    return taskData;
}