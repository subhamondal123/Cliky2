import { DateConvert } from "../../../../../../services/common-view-function";

export function enquiryModifyData(data) {
    var respData = { "totalCount": 0, "taskList": [] };
    if (data) {
        let taskData = data.response.list;
        respData.totalCount = data.response.count;
        if (taskData && taskData.length > 0) {
            for (let i = 0; i < taskData.length; i++) {
                let modObj = {};
                if (taskData[i].id == undefined || taskData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = taskData[i].id;
                }
                if (taskData[i].isBudget == undefined || taskData[i].isBudget == null) {
                    modObj["isBudget"] = "";
                } else {
                    modObj["isBudget"] = taskData[i].isBudget;
                }
                if (taskData[i].eventId == undefined || taskData[i].eventId == null) {
                    modObj["eventId"] = "";
                } else {
                    modObj["eventId"] = taskData[i].eventId;
                }
                if (taskData[i].indentId == undefined || taskData[i].indentId == null) {
                    modObj["indentId"] = "";
                } else {
                    modObj["indentId"] = taskData[i].indentId;
                }
                if (taskData[i].indentNumber == undefined || taskData[i].indentNumber == null) {
                    modObj["indentNumber"] = "";
                } else {
                    modObj["indentNumber"] = taskData[i].indentNumber;
                }
                if (taskData[i].meetingTitle == undefined || taskData[i].meetingTitle == null) {
                    modObj["meetingTitle"] = "";
                } else {
                    modObj["meetingTitle"] = taskData[i].meetingTitle;
                }
                if (taskData[i].type == undefined || taskData[i].type == null) {
                    modObj["type"] = "";
                } else {
                    modObj["type"] = taskData[i].type;
                }
                if (taskData[i].meetingDate == undefined || taskData[i].meetingDate == null) {
                    modObj["meetingDate"] = "";
                } else {
                    modObj["meetingDate"] = DateConvert.viewDateFormat(taskData[i].meetingDate);
                }
                if (taskData[i].duration == undefined || taskData[i].duration == null) {
                    modObj["duration"] = "";
                } else {
                    modObj["duration"] = taskData[i].duration;
                }
                if (taskData[i].moId == undefined || taskData[i].moId == null) {
                    modObj["moId"] = "";
                } else {
                    modObj["moId"] = taskData[i].moId;
                }
                if (taskData[i].description == undefined || taskData[i].description == null) {
                    modObj["description"] = "";
                } else {
                    modObj["description"] = taskData[i].description;
                }
                if (taskData[i].pincode == undefined || taskData[i].pincode == null) {
                    modObj["pincode"] = 0;
                } else {
                    modObj["pincode"] = taskData[i].pincode;
                }
                if (taskData[i].address == undefined || taskData[i].address == null) {
                    modObj["address"] = 0;
                } else {
                    modObj["address"] = taskData[i].address;
                }
                if (taskData[i].probableAttendees == undefined || taskData[i].probableAttendees == null) {
                    modObj["probableAttendees"] = "";
                } else {
                    modObj["probableAttendees"] = taskData[i].probableAttendees;
                }
                if (taskData[i].eventStatus == undefined || taskData[i].eventStatus == null) {
                    modObj["eventStatus"] = "";
                } else {
                    modObj["eventStatus"] = taskData[i].eventStatus;
                }
                if (taskData[i].estimatedBudget == undefined || taskData[i].estimatedBudget == null || taskData[i].estimatedBudget == "0") {
                    modObj["estimatedBudget"] = "00.00";
                } else {
                    modObj["estimatedBudget"] = taskData[i].estimatedBudget;
                }
                if (taskData[i].approvedBudget == undefined || taskData[i].approvedBudget == null || taskData[i].approvedBudget == "0") {
                    modObj["approvedBudget"] = "00.00";
                } else {
                    modObj["approvedBudget"] = taskData[i].approvedBudget;
                }
                if (taskData[i].isIndent == undefined || taskData[i].isIndent == null) {
                    modObj["isIndent"] = "";
                } else {
                    modObj["isIndent"] = taskData[i].isIndent;
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

export function modifyUpomingData(objData){
    let modObj = {}
    if(objData){
        if(objData.upcoming == null || objData.upcoming == undefined || objData.upcoming == 0 ){
            modObj["upcoming"] = "00"
        } else {
            modObj["upcoming"] = objData.upcoming
        }
        if(objData.rejected == null || objData.rejected == undefined || objData.rejected == 0 ){
            modObj["rejected"] = "00"
        } else {
            modObj["rejected"] = objData.rejected
        }
        if(objData.approved == null || objData.approved == undefined || objData.approved == 0 ){
            modObj["approved"] = "00"
        } else {
            modObj["approved"] = objData.approved
        }
        if(objData.pending == null || objData.pending == undefined || objData.pending == 0 ){
            modObj["pending"] = "00"
        } else {
            modObj["pending"] = objData.pending
        }
        if(objData.draft == null || objData.draft == undefined || objData.draft == 0 ){
            modObj["draft"] = "00"
        } else {
            modObj["draft"] = objData.draft
        }
    }

    return modObj
}