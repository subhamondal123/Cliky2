import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { DataValidator } from "../../../../../../validators";



export function validateData(data) {
    let errCounter = 0;
    let arrCounter = 0;
    let resObj = {
        status: false
    }
    if (data.orgName == undefined || data.orgName == null || data.orgName.length == 0) {
        Toaster.ShortCenterToaster("Enter Organization Name");
        errCounter++;
    } else if (data.orgAddress == undefined || data.orgAddress == null || data.orgAddress.length == 0) {
        Toaster.ShortCenterToaster("Enter Address ");
        errCounter++;
    } else if (data.selectedOrgCountry == undefined || data.selectedOrgCountry == null || data.selectedOrgCountry == "0" || data.selectedOrgCountry.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ADDRESS_DETAILS_CRM_CONTACT.COUNTRY_ERROR);
        errCounter++;
    } else if (data.selectedOrgState == undefined || data.selectedOrgState == null || data.selectedOrgState == "0" || data.selectedOrgState.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ADDRESS_DETAILS_CRM_CONTACT.STATE_ERROR);
        errCounter++;
    } else if (data.selectedOrgDistrictCity == undefined || data.selectedOrgDistrictCity == null || data.selectedOrgDistrictCity == "0" || data.selectedOrgDistrictCity.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ADDRESS_DETAILS_CRM_CONTACT.DISTRICT_CITY_ERROR);
        errCounter++;
    } else if (data.selectedOrgZone == undefined || data.selectedOrgZone == null || data.selectedOrgZone == "0" || data.selectedOrgZone.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ADDRESS_DETAILS_CRM_CONTACT.ZONE_ERROR);
        errCounter++;
    } else if (data.orgAnnualRevenue == undefined || data.orgAnnualRevenue == null || data.orgAnnualRevenue.length == 0) {
        Toaster.ShortCenterToaster("Enter annual revenue");
        errCounter++;
    } else if (data.orgNumOfEmp == undefined || data.orgNumOfEmp == null || data.orgNumOfEmp.length == 0) {
        Toaster.ShortCenterToaster("Enter number of Employee");
        errCounter++;
    } else {
        if (data.orgPhoneNumberArr) {
            data.orgPhoneNumberArr.map((obj) => {
                if (DataValidator.mobileNumberValidator(obj.phoneNumber) == false) {
                    arrCounter++;
                    errCounter++;
                }
            })
        } if (arrCounter === 0) {
            data.orgEmailArr.map((obj) => {
                if (DataValidator.emailValidator(obj.emailId) == false) {
                    errCounter++;
                }
            })
        }
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


export function modifyData(data, allCountry, allState, allDistrictCity, allZone) {

    let obj = {};
    if (data.orgName == undefined || data.orgName == null) {
        obj["orgName"] = "";
    } else {
        obj["orgName"] = data.orgName;
    }
    if (data.orgAddress == undefined || data.orgAddress == null) {
        obj["address"] = "";
    } else {
        obj["address"] = data.orgAddress;
    }
    if (data.selectedOrgCountry == undefined || data.selectedOrgCountry == null) {
        obj["selectedCountry"] = {};
    } else {
        obj["selectedCountry"] = getObjFromArrayById(allCountry, data.selectedOrgCountry);
    }
    if (data.selectedOrgState == undefined || data.selectedOrgState == null) {
        obj["selectedState"] = {};
    } else {
        obj["selectedState"] = getObjFromArrayById(allState, data.selectedOrgState);
    }
    if (data.selectedOrgDistrictCity == undefined || data.selectedOrgDistrictCity == null) {
        obj["selectedDistrictCity"] = {};
    } else {
        obj["selectedDistrictCity"] = getObjFromArrayById(allDistrictCity, data.selectedOrgDistrictCity);
    }
    if (data.selectedOrgZone == undefined || data.selectedOrgZone == null) {
        obj["selectedZone"] = {};
    } else {
        obj["selectedZone"] = getObjFromArrayById(allZone, data.selectedOrgZone);
    }
    if (data.orgAnnualRevenue == undefined || data.orgAnnualRevenue == null) {
        obj["annualRevenue"] = "";
    } else {
        obj["annualRevenue"] = data.orgAnnualRevenue;
    }
    if (data.orgNumOfEmp == undefined || data.orgNumOfEmp == null) {
        obj["numOfEmp"] = "";
    } else {
        obj["numOfEmp"] = data.orgNumOfEmp;
    }
    if (data.orgPhoneNumberArr == undefined || data.orgPhoneNumberArr == null) {
        obj["phoneNumberArr"] = [
            { phoneNumber: "", phoneNumberActive: false },
        ];
    } else {
        obj["phoneNumberArr"] = modifyPhoneNumberObj(data.orgPhoneNumberArr);
    }
    if (data.orgEmailArr == undefined || data.orgEmailArr == null) {
        obj["emailArr"] = [
            { emailId: "", emailActive: false },
        ];
    } else {
        obj["emailArr"] = modifyEmailObj(data.orgEmailArr);
    }


    return obj;
}




export function modifyPhoneNumberObj(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push({ phoneNumber: data[i].phoneNumber, phoneNumberActive: false })
    }
    return arr;
}
export function modifyEmailObj(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push({ emailId: data[i].emailId, emailActive: false })
    }
    return arr;
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