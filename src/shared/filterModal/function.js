export function modifySubordinateArr(data) {
    let resData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].childUserName != null || data[i].childUserName != undefined) {
                resData.push({ id: data[i].childId, name: data[i].childUserName })
            }
        }
    } else {
        resData = [];
    }
    return resData;
}
export function modifyCustomerTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].contactTypeId;
            data[i]["name"] = data[i].contactTypeName;
        }
    } else {
        data = [];
    }
    return data;
}

export function orgModifyData(org) {
    let modArrData = [];
    if (org && org.length > 0) {
        for (let i = 0; i < org.length; i++) {
            modArrData.push({
                id: org[i].organizationId,
                name: org[i].organizationName,
                check: false,
            })
        }
    }
    return modArrData;
}

export function modifyBrandTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].labelId;
            data[i]["name"] = data[i].labelCode;
        }
    } else {
        data = [];
    }
    return data;
}
export function modifyPriorityData(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].priorityId;
            data[i]["name"] = data[i].priorityName;
        }
    } else {
        data = [];
    }
    return data;
}


export function modifyEnquirySourceArrData(enquirySourceArr) {
    let modArrData = [];
    if (enquirySourceArr && enquirySourceArr.length > 0) {
        for (let i = 0; i < enquirySourceArr.length; i++) {
            modArrData.push({
                id: enquirySourceArr[i].id,
                name: enquirySourceArr[i].leadSourceTypeName,
                check: false,
            })
        }
    }
    return modArrData;
}

export function modifyPriorityStatus(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].id = arr[i].id;
        arr[i].name = arr[i].name;
    }

    return arr;
}

export function enquirySourceModifyData(data) {
    var respData = { "enquirySourceList": [] };
    if (data) {
        let enquirySourceData = data.enquirySource;
        if (enquirySourceData && enquirySourceData.length > 0) {
            for (let i = 0; i < enquirySourceData.length; i++) {
                let modObj = {};
                if (enquirySourceData[i].id == undefined || enquirySourceData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = enquirySourceData[i].id;
                }
                if (enquirySourceData[i].leadSourceTypeName == undefined || enquirySourceData[i].leadSourceTypeName == null) {
                    modObj["leadSourceTypeName"] = "";
                } else {
                    modObj["leadSourceTypeName"] = enquirySourceData[i].leadSourceTypeName;
                }

                modObj["check"] = false;
                respData.enquirySourceList.push(modObj);
            }
        }

    }
    return (respData);
}
export function modifyStatusData(statusArr) {
    let modArrData = [];
    if (statusArr && statusArr.length > 0) {
        for (let i = 0; i < statusArr.length; i++) {
            modArrData.push({
                id: statusArr[i].id,
                name: statusArr[i].name,
                check: false,
            })
        }
    }
    return modArrData;
}


export function stateModifyData(data) {
    var respData = { "stateList": [] };
    if (data) {
        let stateData = data.response;
        if (stateData && stateData.length > 0) {
            for (let i = 0; i < stateData.length; i++) {
                let modObj = {};
                if (stateData[i].createdAt == undefined || stateData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = stateData[i].createdAt;
                }
                if (stateData[i].stateId == undefined || stateData[i].stateId == null) {
                    modObj["stateId"] = "";
                } else {
                    modObj["stateId"] = stateData[i].stateId;
                }
                if (stateData[i].stateName == undefined || stateData[i].stateName == null) {
                    modObj["stateName"] = "";
                } else {
                    modObj["stateName"] = stateData[i].stateName;
                }

                modObj["check"] = false;
                respData.stateList.push(modObj);
            }
        }
    }
    return (respData);
}



export function modifyStateArrData(stateArr) {
    let modArrData = [];
    if (stateArr && stateArr.length > 0) {
        for (let i = 0; i < stateArr.length; i++) {
            modArrData.push({
                id: stateArr[i].stateId,
                name: stateArr[i].stateName,
                check: false,
            })
        }
    }
    return modArrData;
}


export function zoneModifyData(data) {
    var respData = { "zoneList": [] };
    if (data) {
        let zoneData = data.response;
        if (zoneData && zoneData.length > 0) {
            for (let i = 0; i < zoneData.length; i++) {
                let modObj = {};
                if (zoneData[i].createdAt == undefined || zoneData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = zoneData[i].createdAt;
                }
                if (zoneData[i].zoneId == undefined || zoneData[i].zoneId == null) {
                    modObj["zoneId"] = "";
                } else {
                    modObj["zoneId"] = zoneData[i].zoneId;
                }
                if (zoneData[i].zoneName == undefined || zoneData[i].zoneName == null) {
                    modObj["zoneName"] = "";
                } else {
                    modObj["zoneName"] = zoneData[i].zoneName;
                }

                modObj["check"] = false;
                respData.zoneList.push(modObj);
            }
        }
    }
    return (respData);
}

export function modifyZoneArrData(zoneArr) {
    let modArrData = [];
    if (zoneArr && zoneArr.length > 0) {
        for (let i = 0; i < zoneArr.length; i++) {
            modArrData.push({
                id: zoneArr[i].zoneId,
                name: zoneArr[i].zoneName,
                check: false,
            })
        }
    }
    return modArrData;
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

export function modifyDistrictArrData(districtArr) {
    let modArrData = [];
    if (districtArr && districtArr.length > 0) {
        for (let i = 0; i < districtArr.length; i++) {
            modArrData.push({
                id: districtArr[i].cityId,
                name: districtArr[i].cityName,
                check: false,
            })
        }
    }
    return modArrData;
}