import { getITCDateFormat, getITCtimeFormat, viewDateFormat } from "../../../services/common-view-function/dateConvert";

export function historyModifyData(data) {
    var respData = { "totalCount": 0, "historyList": [] };
    if (data) {
        let odometerData = data.data;
        respData.totalCount = data.count;
        if (odometerData && odometerData.length > 0) {
            for (let i = 0; i < odometerData.length; i++) {
                let modObj = {};
                if (odometerData[i].odometerId == undefined || odometerData[i].odometerId == null) {
                    modObj["odometerId"] = "";
                } else {
                    modObj["odometerId"] = odometerData[i].odometerId;
                }
                if (odometerData[i].profileImgUrl == undefined || odometerData[i].profileImgUrl == null) {
                    modObj["profileImgUrl"] = "images/DEBOJIT.jpg";
                } else {
                    modObj["profileImgUrl"] = odometerData[i].profileImgUrl;
                }
                if (odometerData[i].inTimeDateOnly == undefined || odometerData[i].inTimeDateOnly == null) {
                    modObj["inDate"] = "";
                } else {
                    modObj["inDate"] = odometerData[i].inTimeDateOnly;
                }
                if (odometerData[i].outTimeDateOnly == undefined || odometerData[i].outTimeDateOnly == null) {
                    modObj["outDate"] = "";
                } else {
                    modObj["outDate"] = odometerData[i].outTimeDateOnly;
                }
                if (odometerData[i].inTimeOnly == undefined || odometerData[i].inTimeOnly == null) {
                    modObj["inTime"] = "";
                } else {
                    modObj["inTime"] = odometerData[i].inTimeOnly;
                }
                if (odometerData[i].outTimeOnly == undefined || odometerData[i].outTimeOnly == null) {
                    modObj["outTime"] = "";
                } else {
                    modObj["outTime"] = odometerData[i].outTimeOnly;
                }
                if (odometerData[i].inTimePic == undefined || odometerData[i].inTimePic == null) {
                    modObj["inTimePic"] = "";
                } else {
                    modObj["inTimePic"] = odometerData[i].inTimePic;
                }
                if (odometerData[i].outTimePic == undefined || odometerData[i].outTimePic == null) {
                    modObj["outTimePic"] = "";
                } else {
                    modObj["outTimePic"] = odometerData[i].outTimePic;
                }
                if (odometerData[i].userName == undefined || odometerData[i].userName == null) {
                    modObj["userName"] = "";
                } else {
                    modObj["userName"] = odometerData[i].userName;
                }
                if (odometerData[i].inMeter == undefined || odometerData[i].inMeter == null) {
                    modObj["inMeter"] = "";
                } else {
                    modObj["inMeter"] = odometerData[i].inMeter;
                }
                if (odometerData[i].outMeter == undefined || odometerData[i].outMeter == null) {
                    modObj["outMeter"] = "";
                } else {
                    modObj["outMeter"] = odometerData[i].outMeter;
                }
                if (odometerData[i].reasonId == undefined || odometerData[i].reasonId == null) {
                    modObj["reasonId"] = "";
                } else {
                    modObj["reasonId"] = odometerData[i].reasonId;
                }


                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.historyList.push(modObj);
            }
        }
    }
    return (respData);
}

// convert list data
export function convertListData(historyData, item) {
    if (historyData && historyData.length > 0) {
        for (let i = 0; i < historyData.length; i++) {
            if (historyData[i].odometerId == item.odometerId) {
                historyData[i].check = !historyData[i].check;
            } else {
                historyData[i].check = false;
            }
        }
    }
    return historyData;
}

export function checkedListData(enquiryData, item) {
    if (enquiryData && enquiryData.length > 0) {
        for (let i = 0; i < enquiryData.length; i++) {
            if (enquiryData[i].odometerId == item.odometerId) {
                enquiryData[i].tick = !enquiryData[i].tick;
            } else {
                enquiryData[i].tick = false;
            }
        }
    }
    return enquiryData;
}

export function modHeaderData(data) {
    let modObj = {
        "totalWorkingDay": 0,
        "totalKms": 0,
        "avgKmsPerDay": 0
    }
    if (data.data && Object.keys(data.data).length > 0) {
        modObj.totalWorkingDay = data.data.totalWorkingDay
        modObj.totalKms = data.data.totalKms
        modObj.avgKmsPerDay = data.data.avgKmsPerDay

    }
    return modObj
}