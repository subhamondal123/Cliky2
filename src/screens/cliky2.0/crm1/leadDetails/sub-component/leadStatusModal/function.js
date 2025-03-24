import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";

export function validationCheck(value) {
    let errorCount = 0;
    let resObj = {
        status: false,

    }

    if (value) {
        if (value.amount == undefined || value.amount == null || value.amount.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.AMOUNT_ERROR)
            errorCount++
        }
        else if (value.probablityWining == undefined || value.probablityWining == null || value.probablityWining.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.PROBABLITY_OF_WINING)
            errorCount++
        }
        else if (value.expectedRevenue == undefined || value.expectedRevenue == null || value.expectedRevenue.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.EXPECTED_REVENUE)
        }
        else if (value.startDate == undefined || value.startDate == null || value.startDate.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.CLOSEING_DATE)
        }
        else if (value.stageDuration == undefined || value.stageDuration == null || value.stageDuration.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.STAGE_DURATION)
        }


        if (errorCount == 0) {
            resObj.status = true
        }
    }
    return resObj;
}

export function validUpdateMarkStage(value) {
    let errorCount = 0;
    let resObj = {
        status: false,

    }

    if (value) {
        if (value.selectedNextStage.id == undefined || value.selectedNextStage.id == null) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAD_MARK_STAGE_COMPLETE.SELECT_STAGE);
            errorCount++;
        }
        else if (value.description == undefined || value.description == null || value.description.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAD_MARK_STAGE_COMPLETE.DESCRIPTION);
            errorCount++;
        }
        else if (value.followUpDate == undefined || value.followUpDate == null || value.followUpDate.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAD_MARK_STAGE_COMPLETE.FOLLOW_UP_DATE);
            errorCount++;
        }
        else if (value.amount == undefined || value.amount == null || value.amount.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAD_MARK_STAGE_COMPLETE.AMOUNT_ERROR);
            errorCount++;
        }
        else if (value.probablityWining == undefined || value.probablityWining == null || value.probablityWining.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAD_MARK_STAGE_COMPLETE.PROBABLITY_OF_WINING);
            errorCount++;
        }
        else if (value.expectedRevenue == undefined || value.expectedRevenue == null || value.expectedRevenue.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAD_MARK_STAGE_COMPLETE.EXPECTED_REVENUE);
            errorCount++;
        }
        else if (value.startDate == undefined || value.startDate == null || value.startDate.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAD_MARK_STAGE_COMPLETE.EXPECTED_CLOSING_DATE);
            errorCount++;
        }
        else if (value.stageDuration == undefined || value.stageDuration == null || value.stageDuration.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAD_MARK_STAGE_COMPLETE.STAGE_DURATION);
            errorCount++;
        }
        else if (validateMarkAsData(value) == false) {
            errorCount++;
        }





        if (errorCount == 0) {
            resObj.status = true
        }
    }
    return resObj;
}

export function modifyNextStageData(arr) {
    let respArr = [];
    if (arr) {
        respArr = arr;
        for (let i = 0; i < respArr.length; i++) {
            respArr[i]["id"] = respArr[i].salesStageId;
            respArr[i]["name"] = respArr[i].salesStageName;
        }
    }
    return respArr;
}


export function validateMarkAsData(data) {
    let status = false;
    let errorCount = 0;
    if (data.closeWonOrLost == false) {
        if (data.selectedLostStatus.id == undefined || data.selectedLostStatus.id == null) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LEAD_MARK_STAGE_COMPLETE.LOST_STATUS)
            errorCount++;
        }
    }

    if (errorCount == 0) {
        status = true;
    }

    return status;
}
