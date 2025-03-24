
import { Toaster } from "../../../../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.organizationId == undefined || data.organizationId == null || data.organizationId.length == 0) {
        Toaster.ShortCenterToaster("Please add Account !");
        errCounter++;
    } else if (data.hierarchyDataId == undefined || data.hierarchyDataId == null || data.hierarchyDataId.length == 0) {
        Toaster.ShortCenterToaster("Please add Location !");
        errCounter++;
    } else if (data.address == undefined || data.address == null || data.address.length == 0) {
        Toaster.ShortCenterToaster("Please add Address !");
        errCounter++;
    }

    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}


export function organizationModifyData(data) {
    var respData = { "organizationList": [] };
    if (data) {
        let organizationData = data;

        if (organizationData && organizationData.length > 0) {
            for (let i = 0; i < organizationData.length; i++) {
                let modObj = {};
                if (organizationData[i].organizationId == undefined || organizationData[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = organizationData[i].organizationId;
                }
                if (organizationData[i].organizationName == undefined || organizationData[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = organizationData[i].organizationName;
                }

                modObj["check"] = false;
                respData.organizationList.push(modObj);
            }
        }
    }
    return (respData);
}

export function modifyOrganizationArrData(organizationArr) {
    let modArrData = [];
    if (organizationArr && organizationArr.length > 0) {
        for (let i = 0; i < organizationArr.length; i++) {
            modArrData.push({
                id: organizationArr[i].organizationId,
                name: organizationArr[i].organizationName,
                check: false,
            })
        }
    }
    return modArrData;
}
// export function validateEmail(data) {
//     let errCounter = 0;
//     let status = false;
//     for (let i = 0; i < data.length; i++) {
//         if (data[i].emailId.length > 0 ) {
//              if (DataValidator.emailValidator(data[i].emailId) == false) {
//                 errCounter++;
//             }
//         }
//     }

//     if (errCounter == 0) {
//         status = true;
//     }

//     return status;
// }


export function getObjFromArrayById(data, id) {
    let obj = {};
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                obj = data[i];
            }
        }
        return obj;
    }
}

export function getDistFromArrayById(data, id) {
    let obj = {};
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                obj = data[i];
            }
        }

        return obj;
    }
}
export function getZoneFromArrayById(data, id) {
    let obj = {};
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                obj = data[i];
            }
        }
        return obj;
    }
}

export function getDataFromState(data, id) {
    let obj = {};
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                obj = data[i];
            }
        }
        return obj;
    }
}

export function getObjFromArrayByName(data, name) {
    let obj = {};
    for (let i = 0; i < data.length; i++) {
        if (data[i].name == name) {
            obj = data[i];
        }
    }
    return obj;
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

export function districtModifyData(data) {
    var respData = { "districtList": [] };
    if (data) {
        let districtData = data.response;
        if (districtData && districtData.length > 0) {
            for (let i = 0; i < districtData.length; i++) {
                let modObj = {};
                if (districtData[i].createdAt == undefined || districtData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = districtData[i].createdAt;
                }
                if (districtData[i].cityId == undefined || districtData[i].cityId == null) {
                    modObj["cityId"] = "";
                } else {
                    modObj["cityId"] = districtData[i].cityId;
                }
                if (districtData[i].cityName == undefined || districtData[i].cityName == null) {
                    modObj["cityName"] = "";
                } else {
                    modObj["cityName"] = districtData[i].cityName;
                }

                modObj["check"] = false;
                respData.districtList.push(modObj);
            }
        }
    }
    return (respData);
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

export function modifyPhoneNumberObject(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push({ phone: data[i], phoneActive: false })
    }
    return arr;
}
export function modifyEmailObject(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push({ email: data[i], emailActive: false })
    }
    return arr;
}

export function modifyLocationMappedData(mainData, listData) {
    let finalData = [];
    if (mainData && mainData.length > 0) {
        const sortedLocationMapData = mainData.sort((a, b) => a.SlNo - b.SlNo);
        finalData = sortedLocationMapData.map(mainItem => {
            const matchingListItems = listData.filter(listItem => listItem.slNo === mainItem.SlNo);
            return {
                ...mainItem,
                fileItem: matchingListItems
            };
        });
    }
    return finalData;
}
