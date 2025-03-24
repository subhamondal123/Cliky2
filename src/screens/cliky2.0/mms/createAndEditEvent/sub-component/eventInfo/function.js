import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";



export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.indentTitle == undefined || data.indentTitle == null || data.indentTitle.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MMS.MEETING.MEETING_TITLE);
        errCounter++;
    } else if (data.type == undefined || data.type == null || data.type.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MMS.MEETING.MEETING_TYPE);
        errCounter++;
    } else if (data.date == undefined || data.date == null || data.date.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.DATE_ERROR);
        errCounter++;
    } else if (data.time == undefined || data.time == null || data.time.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MMS.MEETING.MEETING_TIME);
        errCounter++;
    } 
    else if (data.probableAttendees == undefined || data.probableAttendees == null || data.probableAttendees.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MMS.MEETING.ATTENDEES);
        errCounter++;
    } else if (data.description == undefined || data.description == null || data.description.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MMS.MEETING.MEETING_DESCRIPTION);
        errCounter++;
    } 

    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function modifymeetingTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].meetingTypeId;
            data[i]["name"] = data[i].meetingTypeName;
        }
    } else {
        data = [];
    }
    return data;
}

export function modifyDistributorArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].id;
            data[i]["name"] = data[i].firstName + " " + data[i].lastName ;
        }
    } else {
        data = [];
    }
    return data;
}

export function modifyDealerArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].id;
            data[i]["name"] = data[i].firstName +  " " + data[i].lastName ;
        }
    } else {
        data = [];
    }
    return data;
}