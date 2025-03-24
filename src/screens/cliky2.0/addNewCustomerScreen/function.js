import { AlertMessage } from "../../../enums";
import { Toaster } from "../../../services/common-view-function";
import { DataValidator } from "../../../validators";

export async function modifyConversionLanding(data) {
    let brandingList = await modifyProductList(data.productList);
    let unitList = await modifyUnitList(data.unitList);
    return { "brandingList": brandingList, "unitList": unitList };
}
export async function modifyProductList(data) {
    for (let i = 0; i < data.length; i++) {
        data[i]["id"] = data[i].labelId;
        data[i]["name"] = data[i].labelValue;
    }
    return data;
}

export async function modifyUnitList(data) {
    for (let i = 0; i < data.length; i++) {
        data[i]["id"] = data[i].unitId;
        data[i]["name"] = data[i].unitShort;
    }
    return data;
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

export function modifyPartnerData(data) {
    var respData = { "totalCount": 0, "list": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                let name = "";

                if (pjpData[i].customerName.length > 0) {
                    name = pjpData[i].customerName
                } else if (pjpData[i].custBusinessName.length > 0) {
                    name = pjpData[i].custBusinessName
                } else if (pjpData[i].ownerName.length > 0) {
                    name = pjpData[i].ownerName
                }

                if (pjpData[i].customerId == undefined || pjpData[i].customerId == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = pjpData[i].customerId;
                }
                modObj["name"] = name + " " + pjpData[i].phoneNumber;



                respData.list.push(modObj);
            }
        }
    }
    return (respData);
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

export function validateData(data) {

    let errCounter = 0;
    let resObj = {
        status: false
    }

    // if (data.profilePic == undefined || data.profilePic == null || data.profilePic.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.BRANDING.NEW_ENTRY.IMAGE_ERROR);
    //     errCounter++;
    // }
    if (data.firstName == undefined || data.firstName == null || data.firstName.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORGANIZATION.FIRST_NAME_ERROR);
        errCounter++;
    }
    else if (data.lastName == undefined || data.lastName == null || data.lastName.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORGANIZATION.LAST_NAME_ERROR);
        errCounter++;
    }
    else if (data.customerTypeId == undefined || data.customerTypeId == null || data.customerTypeId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.UNPLANNED_NOTES.CUSTOMER_TYPE_ERROR);
        errCounter++;
    } 
    else if (validatePhoneNumberArray(data.phoneNumber) == false) {
        errCounter++;
    }
    else if (data.locationData == undefined || data.locationData == null || data.locationData.length == 0) {
        Toaster.ShortCenterToaster("Please select the location!");
        errCounter++;
    }

    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function validatePhoneNumberArray(data) {
    let errCounter = 0;
    let status = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i] == undefined || data[i] == null || data[i].length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.PHONE_NUMBER_ERROR);
            errCounter++;
        } else {
            if (DataValidator.mobileNumberValidator(data[i]) == false) {
                errCounter++;
            }
        }
    }
    if (errCounter == 0) {
        status = true;
    } else {
        status = false;
    }
    return status;
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
