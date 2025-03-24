import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";

export function validateData(data, locationObj, selectedContact) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    // if (data.state == undefined || data.state == null || data.state.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.STATE_ERROR);
    //     errCounter++;
    // } else if (data.district == undefined || data.district == null || data.district.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.DISTRICT_ERROR);
    //     errCounter++;
    // } else if (data.zoneId == undefined || data.zoneId == null || data.zoneId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.ZONE_ERROR);
    //     errCounter++;
    // } 
    // if (data.distributorId == undefined || data.distributorId == null || data.distributorId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MMS.MEETING.DISTRIBUTOR);
    //     errCounter++;
    // } else if (data.dealerId == undefined || data.dealerId == null || data.dealerId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MMS.MEETING.DEALER);
    //     errCounter++;
    // } 
    // else if (data.city == undefined || data.city == null || data.city.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MMS.MEETING.CITY);
    //     errCounter++;
    // } 
    if (locationObj == undefined || locationObj == null || Object.keys(locationObj).length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.LOCATION_ERROR);
        errCounter++;
    }
    else if (data.attendeesArr.length == 0) {
        Toaster.ShortCenterToaster("Please Add a Contact!");
        errCounter++;
    }
    // else if (selectedContact.customerName == undefined || selectedContact.customerName == null || Object.keys(selectedContact.customerName).length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.CUSTOMER_ERROR);
    //     errCounter++;
    // }
    else if (data.pincode == undefined || data.pincode == null || data.pincode.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.PINCODE_ERROR);
        errCounter++;
    } else if (data.address == undefined || data.address == null || data.address.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.ADDRESS_ERROR);
        errCounter++;
    }

    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

// export function validateHierarchyData(data) {
//     let errCounter = 0;
//     let resObj = {
//         status: false
//     }

//     if (data.typeName == undefined || data.typeName == null || data.typeName.length == 0) {
//         Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.COUNTRY_ERROR);
//         errCounter++;
//     }

//     if (errCounter == 0) {
//         resObj.status = true;
//     }

//     return resObj;
// }

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
                if (districtData[i].id == undefined || districtData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = districtData[i].id;
                }
                if (districtData[i].name == undefined || districtData[i].name == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = districtData[i].name;
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
export function cityModifyData(data) {
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
                if (zoneData[i].id == undefined || zoneData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = zoneData[i].id;
                }
                if (zoneData[i].name == undefined || zoneData[i].name == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = zoneData[i].name;
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
                id: districtArr[i].id,
                name: districtArr[i].name,
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
export function modifyCityArrData(zoneArr) {
    let modArrData = [];
    if (zoneArr && zoneArr.length > 0) {
        for (let i = 0; i < zoneArr.length; i++) {
            modArrData.push({
                id: zoneArr[i].id,
                name: zoneArr[i].name,
                check: false,
            })
        }
    }
    return modArrData;
}

export function modifyDistributorArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].id;
            data[i]["name"] = data[i].firstName + " " + data[i].lastName;
        }
    } else {
        data = [];
    }
    return data;
}

export function modifyContactTypeArr(data) {
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

export function modifyContactUserArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].customerId;
            data[i]["name"] = data[i].customerName;
        }
    } else {
        data = [];
    }
    return data;
}

export function modifyDealerArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].id;
            data[i]["name"] = data[i].firstName + " " + data[i].lastName;
        }
    } else {
        data = [];
    }
    return data;
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


export function modSelectItem(data) {
    let obj = {
        id: data.customerId,
        name: data.customerName
    }

    return obj
}

export function modifyContactData(arr, selectedContactTypeObj) {
    let mainArr = [];
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {
                "typeName": selectedContactTypeObj.name,
                "typeId": selectedContactTypeObj.id,
                "attendeesId": arr[i].customerId,
                "attendeesName": arr[i].customerName
            }
            mainArr.push(obj)
        }

    }
    return mainArr
}