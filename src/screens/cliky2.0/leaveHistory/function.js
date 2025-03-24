export function historyModifyData(data) {
    var respData = { "totalCount": 0, "historyList": [] };
    if (data) {
        let historyData = data.list;
        respData.totalCount = data.count;
        if (historyData && historyData.length > 0) {
            for (let i = 0; i < historyData.length; i++) {
                let modObj = {};
                if (historyData[i].id == undefined || historyData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = historyData[i].id;
                }
                if (historyData[i].profileImgUrl == undefined || historyData[i].profileImgUrl == null) {
                    modObj["profileImgUrl"] = "images/DEBOJIT.jpg";
                } else {
                    modObj["profileImgUrl"] = historyData[i].profileImgUrl;
                }
                if (historyData[i].startDate == undefined || historyData[i].startDate == null) {
                    modObj["startDate"] = "";
                } else {
                    modObj["startDate"] = historyData[i].startDate;
                }
                if (historyData[i].endDate == undefined || historyData[i].endDate == null) {
                    modObj["endDate"] = "N/A";
                } else {
                    modObj["endDate"] = historyData[i].endDate;
                }
                if (historyData[i].noOfDays == undefined || historyData[i].noOfDays == null) {
                    modObj["noOfDays"] = "N/A";
                } else {
                    modObj["noOfDays"] = historyData[i].noOfDays;
                }
                if (historyData[i].leaveType == undefined || historyData[i].leaveType == null) {
                    modObj["leaveType"] = "N/A";
                } else {
                    modObj["leaveType"] = historyData[i].leaveType;
                }
                if (historyData[i].name == undefined || historyData[i].name == null) {
                    modObj["name"] = "N/A";
                } else {
                    modObj["name"] = historyData[i].name;
                }
                if (historyData[i].leaveTypeName == undefined || historyData[i].leaveTypeName == null) {
                    modObj["leaveTypeName"] = "";
                } else {
                    modObj["leaveTypeName"] = historyData[i].leaveTypeName;
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
export function convertListData(enquiryData, item) {
    if (enquiryData && enquiryData.length > 0) {
        for (let i = 0; i < enquiryData.length; i++) {
            if (enquiryData[i].id == item.id) {
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
            if (enquiryData[i].id == item.id) {
                enquiryData[i].tick = !enquiryData[i].tick;
            } else {
                enquiryData[i].tick = false;
            }
        }
    }
    return enquiryData;
}