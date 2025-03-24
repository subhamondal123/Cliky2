import { AlertMessage } from "../../../enums";
import { Toaster } from "../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.inOutCheckBox == false) {
        if (data.travelMode == undefined || Object.keys(data.travelMode).length == 0 || data.travelMode == null) {
            Toaster.ShortCenterToaster("Please select travel mode !");
            errCounter++;
        }
        else if (data.inTimePic == undefined || data.inTimePic == null || data.inTimePic.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ODOMETER.IMAGE_ERROR);
            errCounter++;
        } else if (data.inMeter == undefined || data.inMeter.length == 0 || parseInt(data.inMeter) == 0 || data.inMeter == null) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ODOMETER.METER_READING_ERROR);
            errCounter++;
        }

    } else {

        if (data.outTimePic == undefined || data.outTimePic == null || data.outTimePic.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ODOMETER.IMAGE_ERROR);
            errCounter++;
        } else if (data.outMeter == undefined || data.outMeter.length == 0 || data.outMeter == null || parseInt(data.outMeter) == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ODOMETER.METER_READING_ERROR);
            errCounter++;
        }
    }

    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function modifyReasonArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].id;
            data[i]["name"] = data[i].name;
        }
    } else {
        data = [];
    }
    return data;
}