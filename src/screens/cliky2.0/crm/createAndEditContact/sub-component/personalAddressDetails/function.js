import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }
    if (data.address == undefined || data.address == null || data.address.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ADDRESS_DETAILS_CRM_CONTACT.ADDRESS_ERROR);
        errCounter++;
    }
    else if (data.locationArr == undefined || data.locationArr == null || Object.keys(data.locationArr).length == 0) {
        Toaster.ShortCenterToaster("Please add location !");
        errCounter++;
    }
    if (errCounter == 0) {
        resObj.status = true;
    }
    return resObj;
}
export function countryAddModifyData(data) {
    var respData = { "countryTypeDataArr": [] };
    if (data) {
        let countryTypeData = data.countryData;
        if (countryTypeData && countryTypeData.length > 0) {
            for (let i = 0; i < countryTypeData.length; i++) {
                let modObj = {};
                if (countryTypeData[i].countryId == undefined || countryTypeData[i].countryId == null) {
                    modObj["countryId"] = "";
                } else {
                    modObj["countryId"] = countryTypeData[i].countryId;
                }
                if (countryTypeData[i].countryName == undefined || countryTypeData[i].countryName == null) {
                    modObj["countryName"] = "";
                } else {
                    modObj["countryName"] = countryTypeData[i].countryName;
                }
                if (countryTypeData[i].createdAt == undefined || countryTypeData[i].createdAt == null) {
                    modObj["createdAt"] = 0;
                } else {
                    modObj["createdAt"] = countryTypeData[i].createdAt;
                }

                modObj["check"] = false;
                respData.countryTypeDataArr.push(modObj);
            }
        }

    }
    return (respData);
}
export function modifyCountryTypeArrData(countryTypeArr) {
    let modArrData = [];
    if (countryTypeArr && countryTypeArr.length > 0) {
        for (let i = 0; i < countryTypeArr.length; i++) {
            modArrData.push({
                id: countryTypeArr[i].countryId,
                name: countryTypeArr[i].countryName,
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

export function modifyData(data, allContactSource, allState, allDistCity, allZone) {
    let obj = {};
    if (data.address == undefined || data.address == null) {
        obj["address"] = "";
    } else {
        obj["address"] = data.address;
    }
    if (data.selectedCountry == undefined || data.selectedCountry == null) {
        obj["selectedCountry"] = {};
    } else {
        obj["selectedCountry"] = getObjFromArrayById(allContactSource, data.selectedCountry);
    }
    if (data.selectedState == undefined || data.selectedState == null) {
        obj["selectedState"] = {};
    } else {
        obj["selectedState"] = getDataFromState(allState, data.selectedState);
    }
    if (data.selectedDistrictCity == undefined || data.selectedDistrictCity == null) {
        obj["selectedDistrictCity"] = {};
    } else {
        obj["selectedDistrictCity"] = getDistFromArrayById(allDistCity, data.selectedDistrictCity);
    }
    if (data.selectedZone == undefined || data.selectedZone == null) {
        obj["selectedZone"] = {};
    } else {
        obj["selectedZone"] = getZoneFromArrayById(allZone, data.selectedZone);
    }

    return obj;
}

export function getObjFromArrayById(data, id) {
    let obj = {};
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            obj = data[i];
        }
    }
    return obj;
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
