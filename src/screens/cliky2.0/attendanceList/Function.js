import { getITCtimeFormat, viewDateFormat, viewTimeFormat } from "../../../services/common-view-function/dateConvert";

export function enquiryModifyData(data) {
    var respData = { "totalCount": 0, "enquiryList": [] };
    if (data) {
        let attendanceData = data.list;
        respData.totalCount = data.count;
        if (attendanceData && attendanceData.length > 0) {
            for (let i = 0; i < attendanceData.length; i++) {
                let modObj = {};
                if (attendanceData[i].id == null || attendanceData[i].id == undefined) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = attendanceData[i].id;
                }
                if (attendanceData[i].profileImgUrl == null || attendanceData[i].profileImgUrl == undefined) {
                    modObj["profileImgUrl"] = "images/DEBOJIT.jpg";
                } else {
                    modObj["profileImgUrl"] = attendanceData[i].profileImgUrl;
                }
                if (attendanceData[i].inTimeFormat == null || attendanceData[i].inTimeFormat == undefined) {
                    modObj["inTime"] = "N/A";
                } else {
                    modObj["inTime"] = attendanceData[i].inTimeFormat;
                }

                if (attendanceData[i].outTimeFormat == null || attendanceData[i].outTimeFormat == undefined) {
                    modObj["outTime"] = "N/A";
                } else {
                    modObj["outTime"] = attendanceData[i].outTimeFormat;
                }
                if (attendanceData[i].created_at == undefined || attendanceData[i].created_at == null) {
                    modObj["created_at"] = "";
                } else {
                    modObj["created_at"] = attendanceData[i].created_at;
                }
                if (attendanceData[i].name == undefined || attendanceData[i].name == null) {
                    modObj["name"] = 0;
                } else {
                    modObj["name"] = attendanceData[i].name;
                }
                if (attendanceData[i].inTimeDate == undefined || attendanceData[i].inTimeDate == null) {
                    modObj["inTimeDate"] = "N/A";
                } else {
                    modObj["inTimeDate"] = attendanceData[i].inTimeDate;
                }
                if (attendanceData[i].outTimeDate == undefined || attendanceData[i].outTimeDate == null) {
                    modObj["outTimeDate"] = "N/A";
                } else {
                    modObj["outTimeDate"] = attendanceData[i].outTimeDate;
                }
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = true;
                respData.enquiryList.push(modObj);
            }
        }
    }
    return (respData);
}


export function modifyAttendanceDetails(data) {
    if (data) {
        if (data.attendenceCount == undefined || data.attendenceCount == null || data.attendenceCount.length == 0) {
            data.attendenceCount = "0";
        } else {
            data.attendenceCount = data.attendenceCount;
        }
        if (data.leaveCount == undefined || data.leaveCount == null || data.leaveCount.length == 0) {
            data.leaveCount = "0";
        } else {
            data.leaveCount = data.leaveCount;
        }
        if (data.lateCount == undefined || data.lateCount == null || data.lateCount.length == 0) {
            data.lateCount = "0";
        } else {
            data.lateCount = data.lateCount;
        }
        if (data.absent == undefined || data.absent == null || data.absent.length == 0) {
            data.absent = "0";
        } else {
            data.absent = data.absent;
        }

    }
    return (data);
}

// convert list data
export function convertListData(enquiryData, item) {
    if (enquiryData && enquiryData.length > 0) {
        for (let i = 0; i < enquiryData.length; i++) {
            if (enquiryData[i].enqueryId == item.enqueryId) {
                enquiryData[i].check = !enquiryData[i].check;
            } else {
                enquiryData[i].check = false;
            }
        }
    }
    return enquiryData;
}

export function checkedListData(enquiryData, item) {
    if (enquiryData && enquiryData.length > 0) {
        for (let i = 0; i < enquiryData.length; i++) {
            if (enquiryData[i].enqueryId == item.enqueryId) {
                enquiryData[i].tick = !enquiryData[i].tick;
            } else {
                enquiryData[i].tick = false;
            }
        }
    }
    return enquiryData;
}