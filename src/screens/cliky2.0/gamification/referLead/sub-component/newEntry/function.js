import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { DataValidator } from "../../../../../../validators";

export function enquirySourceModifyData(data) {
    var respData = { "enquirySourceList": [], "enquiryTypeList": [] };
    if (data) {
        let enquirySourceData = data.enquirySource;
        let enquiryTypeData = data.enquiryType;
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

        if (enquiryTypeData && enquiryTypeData.length > 0) {
            for (let i = 0; i < enquiryTypeData.length; i++) {
                let modObj = {};
                if (enquiryTypeData[i].contactTypeId == undefined || enquiryTypeData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = enquiryTypeData[i].contactTypeId;
                }
                if (enquiryTypeData[i].contactTypeName == undefined || enquiryTypeData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "";
                } else {
                    modObj["contactTypeName"] = enquiryTypeData[i].contactTypeName;
                }
                if (enquiryTypeData[i].createdAt == undefined || enquiryTypeData[i].createdAt == null) {
                    modObj["createdAt"] = 0;
                } else {
                    modObj["createdAt"] = enquiryTypeData[i].createdAt;
                }
                if (enquiryTypeData[i].mstSlNo == undefined || enquiryTypeData[i].mstSlNo == null) {
                    modObj["mstSlNo"] = "";
                } else {
                    modObj["mstSlNo"] = enquiryTypeData[i].mstSlNo;
                }
                if (enquiryTypeData[i].masterContactTypeName == undefined || enquiryTypeData[i].masterContactTypeName == null) {
                    modObj["masterContactTypeName"] = "";
                } else {
                    modObj["masterContactTypeName"] = enquiryTypeData[i].masterContactTypeName;
                }

                modObj["check"] = false;
                respData.enquiryTypeList.push(modObj);
            }
        }
    }
    return (respData);
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

export function modifyEnquiryTypeArrData(enquiryTypeArr) {
    let modArrData = [];
    if (enquiryTypeArr && enquiryTypeArr.length > 0) {
        for (let i = 0; i < enquiryTypeArr.length; i++) {
            modArrData.push({
                id: enquiryTypeArr[i].contactTypeId,
                name: enquiryTypeArr[i].contactTypeName,
                check: false,
            })
        }
    }
    return modArrData;
}

export async function modifyConversionLanding(data) {
    let brandingList = await modifyProductList(data.productList);
    // let unitList = await modifyUnitList(data.unitList);
    // let enquiryList = await modifyEnquiryList(data.userTargetList.data);
    // let customerList = await modifyCustomerList(data.customerList);


    // return { "brandingList": brandingList, "unitList": unitList, "enquiryList": enquiryList, "customerList": customerList };
    return { "brandingList": brandingList, };
}
export async function modifyProductList(data) {
    for (let i = 0; i < data.length; i++) {
        data[i]["id"] = data[i].labelId;
        data[i]["name"] = data[i].labelValue;
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

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.ownerFirstName == undefined || data.ownerFirstName == null || data.ownerFirstName.length == 0) {
        Toaster.ShortCenterToaster("Please Enter First Name!");
        errCounter++;
    }
    else if (data.ownerLastName == undefined || data.ownerLastName == null || data.ownerLastName.length == 0) {
        Toaster.ShortCenterToaster("Please Enter Last Name!");
        errCounter++;
    }
    else if (data.enquirySourceId == undefined || data.enquirySourceId == null || data.enquirySourceId.length == 0 || data.enquirySourceId == "0") {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.ENQUIRY_SOURCE_ERROR);
        errCounter++;
    }
    else if (data.enquiryTypeId == undefined || data.enquiryTypeId == null || data.enquiryTypeId == "0" || data.enquiryTypeId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.ENQUIRY_TYPE_ERROR);
        errCounter++;
    }
   
    else if (data.countryId == undefined || data.countryId == null || data.countryId.length == 0) {
        Toaster.ShortCenterToaster("Please Select Country!");
        errCounter++;
    }
    else if (data.stateId == undefined || data.stateId == null || data.stateId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.STATE_ERROR);
        errCounter++;
    } else if (data.districtId == undefined || data.districtId == null || data.districtId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.DISTRICT_ERROR);
        errCounter++;
    }  else if (data.zoneId == undefined || data.zoneId == null || data.zoneId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.ZONE_ERROR);
        errCounter++;
    } 
    else if (data.pincode == undefined || data.pincode == null || data.pincode.length == 0) {
        Toaster.ShortCenterToaster("Please enter Pincode!");
        errCounter++;
    }
    else if (data.enqAddress == undefined || data.enqAddress == null || data.enqAddress.length == 0) {
        Toaster.ShortCenterToaster("Please enter Address!");
        errCounter++;
    }
    else if (DataValidator.mobileNumberValidator(data.ownerPhone[0]) == false) {
        // Toaster.ShortCenterToaster("Please enter Mobile No.!");
        errCounter++;
    }
    else if (DataValidator.emailValidator(data.ownerEmail[0]) == false) {
        // Toaster.ShortCenterToaster("Please enter Email!");
        errCounter++;
    }


    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

//for edit fetch data


export function modifyFetchData(data) {
    var respData = {};
    if (data) {
        let enquirySourceData = data[0];
        
        if (data && data.length > 0) {
                let modObj = {};
                if (enquirySourceData.leadRefId == undefined || enquirySourceData.leadRefId == null) {
                    modObj["leadRefId"] = "";
                } else {
                    modObj["leadRefId"] = enquirySourceData.leadRefId;
                }
                if (enquirySourceData.pjpVisitId == undefined || enquirySourceData.pjpVisitId == null) {
                    modObj["pjpVisitId"] = "";
                } else {
                    modObj["pjpVisitId"] = enquirySourceData.pjpVisitId;
                }
                if (enquirySourceData.enquerySourceTypeId == undefined || enquirySourceData.enquerySourceTypeId == null) {
                    modObj["enquerySourceTypeId"] = "";
                } else {
                    modObj["enquerySourceTypeId"] = enquirySourceData.enquerySourceTypeId;
                }
                if (enquirySourceData.enqueryBrandId == undefined || enquirySourceData.enqueryBrandId == null) {
                    modObj["enqueryBrandId"] = "";
                } else {
                    modObj["enqueryBrandId"] = enquirySourceData.enqueryBrandId;
                }
                if (enquirySourceData.enquerySourceId == undefined || enquirySourceData.enquerySourceId == null) {
                    modObj["enquerySourceId"] = "";
                } else {
                    modObj["enquerySourceId"] = enquirySourceData.enquerySourceId;
                }
                if (enquirySourceData.ownerFirstName == undefined || enquirySourceData.ownerFirstName == null) {
                    modObj["ownerFirstName"] = "";
                } else {
                    modObj["ownerFirstName"] = enquirySourceData.ownerFirstName;
                }

                if (enquirySourceData.ownerLastName == undefined || enquirySourceData.ownerLastName == null) {
                    modObj["ownerLastName"] = "";
                } else {
                    modObj["ownerLastName"] = enquirySourceData.ownerLastName;
                }
                if (enquirySourceData.ownerPhone == undefined || enquirySourceData.ownerPhone == null) {
                    modObj["ownerPhone"] = "";
                } else {
                    modObj["ownerPhone"] = enquirySourceData.ownerPhone;
                }
                if (enquirySourceData.ownerEmail == undefined || enquirySourceData.ownerEmail == null) {
                    modObj["ownerEmail"] = "";
                } else {
                    modObj["ownerEmail"] = enquirySourceData.ownerEmail;
                }
                if (enquirySourceData.address == undefined || enquirySourceData.address == null) {
                    modObj["address"] = "";
                } else {
                    modObj["address"] = enquirySourceData.address;
                }
                if (enquirySourceData.pinCode == undefined || enquirySourceData.pinCode == null) {
                    modObj["pinCode"] = "";
                } else {
                    modObj["pinCode"] = enquirySourceData.pinCode;
                }
                if (enquirySourceData.notes == undefined || enquirySourceData.notes == null) {
                    modObj["notes"] = "";
                } else {
                    modObj["notes"] = enquirySourceData.notes;
                }
                if (enquirySourceData.countryId == undefined || enquirySourceData.countryId == null) {
                    modObj["countryId"] = "";
                } else {
                    modObj["countryId"] = enquirySourceData.countryId;
                }
                if (enquirySourceData.stateId == undefined || enquirySourceData.stateId == null) {
                    modObj["stateId"] = "";
                } else {
                    modObj["stateId"] = enquirySourceData.stateId;
                }
                if (enquirySourceData.districtId == undefined || enquirySourceData.districtId == null) {
                    modObj["districtId"] = "";
                } else {
                    modObj["districtId"] = enquirySourceData.districtId;
                }
                if (enquirySourceData.zoneId == undefined || enquirySourceData.zoneId == null) {
                    modObj["zoneId"] = "";
                } else {
                    modObj["zoneId"] = enquirySourceData.zoneId;
                }
                
                if (enquirySourceData.cityVillage == undefined || enquirySourceData.cityVillage == null) {
                    modObj["cityVillage"] = "";
                } else {
                    modObj["cityVillage"] = enquirySourceData.cityVillage;
                }
                if (enquirySourceData.approvedStatus == undefined || enquirySourceData.approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = enquirySourceData.approvedStatus;
                }
                if (enquirySourceData.businessId == undefined || enquirySourceData.businessId == null) {
                    modObj["businessId"] = "";
                } else {
                    modObj["businessId"] = enquirySourceData.businessId;
                }
                
                respData = modObj;
            
        }

        
    }
    return (respData);
}


export function modifyCountryArrData(countryArr) {
    let modArrData = [];
    if (countryArr && countryArr.length > 0) {
        for (let i = 0; i < countryArr.length; i++) {
            modArrData.push({
                id: countryArr[i].countryId,
                name: countryArr[i].countryName
            })
        }
    }
    return modArrData;
}