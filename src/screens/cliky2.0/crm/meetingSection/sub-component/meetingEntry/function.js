import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";

export function modifyPageData(data) {
    let resData = {
        selectedStateObj: {},
        selectedDistrictObj: {},
        selectedZoneObj: {},
        title: "",
        titleActive: false,
        selecedTypeObj: {},
        startDate: "",
        statDateRaw: new Date(),
        duration: "",
        durationActive: false,
        // selectedDistributorObj: {},
        // selectedDealerObj: {},
        desc: "",
        descActive: false,
        locationText: "",
        locationTextActive: false,
        lat: "",
        latActive: false,
        long: "",
        longActive: false,
        estimatedBudget: "",
        estimatedBudgetActive: false,
        noOfAttendees: "",
        noOfAttendeesActive: false,
        attendeesArr: [
            // {
            //     attenName: "",
            //     attenNameActive: false,
            //     attenPhone: "",
            //     attenPhoneActive: false,
            //     attenEmail: "",
            //     attenEmailActive: false
            // }
        ]
    }
    if (data) {

    }
    return resData;
}

export function modifyStateArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].stateId;
            data[i]["name"] = data[i].stateName;
        }
    } else {
        data = [];
    }
    return data;
}

export function modifyDistArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].cityId;
            data[i]["name"] = data[i].cityName;
        }
    } else {
        data = [];
    }
    return data;
}


export function modifyZoneArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].zoneId;
            data[i]["name"] = data[i].zoneName;
        }
    } else {
        data = [];
    }
    return data;
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



export function modifyTypeArr(arr) {
    let respArr = [];
    if (arr) {
        respArr = arr;
        for (let i = 0; i < respArr.length; i++) {
            respArr[i]["id"] = respArr[i].meetingTypeId;
            respArr[i]["name"] = respArr[i].meetingTypeName;
        }
    }
    return respArr;
}

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.selectedStateObj.id == undefined || data.selectedStateObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.STATE_ERROR);
        errCounter++;
    } else if (data.selectedDistrictObj.id == undefined || data.selectedDistrictObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.DISTRICT_ERROR);
        errCounter++;
    } else if (data.selectedZoneObj.id == undefined || data.selectedZoneObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.ZONE_ERROR);
        errCounter++;
    } else if (data.title == undefined || data.title == null || data.title.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.TITLE_ERROR);
        errCounter++;
    } else if (data.selecedTypeObj.id == undefined || data.selecedTypeObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.TYPE_ERROR);
        errCounter++;
    } else if (data.startDate == undefined || data.startDate == null || data.startDate.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.DATE_ERROR);
        errCounter++;
    } else if (data.duration == undefined || data.duration == null || data.duration.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.DURATION_ERROR);
        errCounter++;
    }
    // else if (data.desc == undefined || data.desc == null || data.desc.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.DESC_ERROR);
    //     errCounter++;
    // } 
    else if (data.locationText == undefined || data.locationText == null || data.locationText.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.LOCATION_ERROR);
        errCounter++;
    } else if (data.estimatedBudget == undefined || data.estimatedBudget == null || data.estimatedBudget.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.EST_BUDGET_ERROR);
        errCounter++;
    } else if (data.noOfAttendees == undefined || data.noOfAttendees == null || data.noOfAttendees.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MEETING_ADD.NO_OF_ATTENDEES_ERROR);
        errCounter++;
    }

    if (errCounter == 0) {
        resObj.status = true
    }

    return resObj;
}