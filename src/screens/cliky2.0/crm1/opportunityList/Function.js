export function opportunityModifyData(data) {
    var respData = { "totalCount": 0, "opportunityList": [] };
    if (data) {
        let opportunityData = data.allExitingUser;
        respData.totalCount = data.count;
        if (opportunityData && opportunityData.length > 0) {
            for (let i = 0; i < opportunityData.length; i++) {
                let modObj = {};
                if (opportunityData[i].id == undefined || opportunityData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = opportunityData[i].id;
                }
                if (opportunityData[i].typeStatusName == undefined || opportunityData[i].typeStatusName == null) {
                    modObj["typeStatusName"] = "";
                } else {
                    modObj["typeStatusName"] = opportunityData[i].typeStatusName;
                }
                if (opportunityData[i].opportunityName == undefined || opportunityData[i].opportunityName == null) {
                    modObj["opportunityName"] = "";
                } else {
                    modObj["opportunityName"] = opportunityData[i].opportunityName;
                }
                if (opportunityData[i].isFavorite == undefined || opportunityData[i].isFavorite == null) {
                    modObj["isFavorite"] = "";
                } else {
                    modObj["isFavorite"] = opportunityData[i].isFavorite;
                }
                if (opportunityData[i].expectedRevenue == undefined || opportunityData[i].expectedRevenue == null) {
                    modObj["expectedRevenue"] = 0;
                } else {
                    modObj["expectedRevenue"] = opportunityData[i].expectedRevenue;
                }
                if (opportunityData[i].opportunityTypeStatus == undefined || opportunityData[i].opportunityTypeStatus == null) {
                    modObj["opportunityTypeStatus"] = 0;
                } else {
                    modObj["opportunityTypeStatus"] = opportunityData[i].opportunityTypeStatus;
                }
                if (opportunityData[i].salseStageId == undefined || opportunityData[i].salseStageId == null) {
                    modObj["salseStageId"] = "";
                } else {
                    modObj["salseStageId"] = opportunityData[i].salseStageId;
                }
                if (opportunityData[i].firstName == undefined || opportunityData[i].firstName == null) {
                    modObj["firstName"] = "";
                } else {
                    modObj["firstName"] = opportunityData[i].firstName;
                }
                if (opportunityData[i].lastName == undefined || opportunityData[i].lastName == null) {
                    modObj["lastName"] = "";
                } else {
                    modObj["lastName"] = opportunityData[i].lastName;
                }
                if (opportunityData[i].phoneNumber == undefined || opportunityData[i].phoneNumber == null) {
                    modObj["phoneNumber"] = "";
                } else {
                    modObj["phoneNumber"] = opportunityData[i].phoneNumber;
                }
                if (opportunityData[i].organizationName == undefined || opportunityData[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = opportunityData[i].organizationName;
                }
                if (opportunityData[i].salesStageName == undefined || opportunityData[i].salesStageName == null) {
                    modObj["salesStageName"] = "";
                } else {
                    modObj["salesStageName"] = opportunityData[i].salesStageName;
                }
                if (opportunityData[i].profilePic == undefined || opportunityData[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = opportunityData[i].profilePic;
                }

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.opportunityList.push(modObj);
            }
        }
    }
    return (respData);
}

// convert list data
export function convertListData(opportunityData, item) {
    if (opportunityData && opportunityData.length > 0) {
        for (let i = 0; i < opportunityData.length; i++) {
            if (opportunityData[i].id == item.id) {
                opportunityData[i].check = !opportunityData[i].check;
            } else {
                opportunityData[i].check = false;
            }
        }
    }
    return opportunityData;
}

export function checkedListData(opportunityData, item) {
    if (opportunityData && opportunityData.length > 0) {
        for (let i = 0; i < opportunityData.length; i++) {
            if (opportunityData[i].id == item.id) {
                opportunityData[i].tick = !opportunityData[i].tick;
            } else {
                opportunityData[i].tick = false;
            }
        }
    }
    return opportunityData;
}

export function modifyPriorityStatus(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].id = arr[i].id;
        arr[i].name = arr[i].name;
    }

    return arr;
}
export function modListData(opportunityData, item, statusType) {
    if (opportunityData && opportunityData.length > 0) {
        for (let i = 0; i < opportunityData.length; i++) {
            if (opportunityData[i].id == item.id) {
                opportunityData[i].typeStatusName = statusType;
            }
        }
    }
    return opportunityData;
}
