
export function enquirySourceModifyData(data) {
    var respData = { "enquiryTypeList": [] };
    if (data) {

        let enquiryTypeData = data.enquiryType;

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
export function modifyProductData(productArr) {
    let modArrData = [];
    if (productArr && productArr.length > 0) {
        for (let i = 0; i < productArr.length; i++) {
            modArrData.push({
                id: productArr[i].productId,
                name: productArr[i].productName,
                check: false,
            })
        }
    }
    return modArrData;
}


export function modifyResp(data) {
    let modifiedResp = {};
    if (data) {
        if (data.contactId == undefined || data.contactId == null) {
            modifiedResp["contactId"] = "";
        } else {
            modifiedResp["contactId"] = data.contactId;
        }
        if (data.orgName == undefined || data.orgName == null) {
            modifiedResp["orgName"] = "";
        } else {
            modifiedResp["orgName"] = data.orgName;
        }
        if (data.orgPhone == undefined || data.orgPhone == null) {
            modifiedResp["phoneNumberArr"] = [{ phone: "", phoneActive: false }];
        } else {
            modifiedResp["phoneNumberArr"] = modifyPhoneNumStrToArr(data.orgPhone);
        }
        if (data.orgEmail == undefined || data.orgEmail == null) {
            modifiedResp["emailArr"] = [{ email: "", emailActive: false }];
        } else {
            modifiedResp["emailArr"] = modifyEmailStrToArr(data.orgEmail);
        }
        if (data.contactDescription == undefined || data.contactDescription == null) {
            modifiedResp["contactDescription"] = "";
        } else {
            modifiedResp["contactDescription"] = data.contactDescription;
        }
        if (data.orgAnualRevenue == undefined || data.orgAnualRevenue == null) {
            modifiedResp["orgAnualRevenue"] = "";
        } else {
            modifiedResp["orgAnualRevenue"] = data.orgAnualRevenue.toString();
        }
        if (data.orgNumberOfEmployee == undefined || data.orgNumberOfEmployee == null) {
            modifiedResp["orgNumberOfEmployee"] = "";
        } else {
            modifiedResp["orgNumberOfEmployee"] = data.orgNumberOfEmployee.toString();
        }
        if (data.assignTo == undefined || data.assignTo == null) {
            modifiedResp["assignTo"] = "";
        } else {
            modifiedResp["assignTo"] = data.assignTo.toString();
        }

        // personal contact

        if (data.hierarchyDataIdArr == undefined || data.hierarchyDataIdArr == null || data.hierarchyDataIdArr.length == 0) {
            modifiedResp["hierarchyDataIdArr"] = [];
        } else {
            modifiedResp["hierarchyDataIdArr"] = data.hierarchyDataIdArr;
        }

        if (data.hierarchyDataId == undefined || data.hierarchyDataId == null || data.hierarchyDataId.length == 0) {
            modifiedResp["hierarchyDataId"] = "";
        } else {
            modifiedResp["hierarchyDataId"] = data.hierarchyDataId;
        }

        if (data.mstHierarchyTypeId == undefined || data.mstHierarchyTypeId == null || data.mstHierarchyTypeId.length == 0) {
            modifiedResp["hierarchyTypeId"] = "";
        } else {
            modifiedResp["hierarchyTypeId"] = data.mstHierarchyTypeId;
        }


        if (data.contactTypeId == undefined || data.contactTypeId == null) {
            modifiedResp["contactTypeId"] = "";
        } else {
            modifiedResp["contactTypeId"] = data.contactTypeId.toString();
        }
        if (data.contactFirstName == undefined || data.contactFirstName == null) {
            modifiedResp["contactFirstName"] = "";
        } else {
            modifiedResp["contactFirstName"] = data.contactFirstName.toString();
        }
        if (data.contactLastName == undefined || data.contactLastName == null) {
            modifiedResp["contactLastName"] = "";
        } else {
            modifiedResp["contactLastName"] = data.contactLastName.toString();
        }
        if (data.contactPhone == undefined || data.contactPhone == null) {
            modifiedResp["contactphoneNumberArr"] = [{ phone: "", phoneActive: false }];
        } else {
            modifiedResp["contactphoneNumberArr"] = modifyContactPhoneNumStrToArr(data.contactPhone);
        }
        if (data.contactEmail == undefined || data.contactEmail == null) {
            modifiedResp["contactemailArr"] = [{ email: "", emailActive: false }];
        } else {
            modifiedResp["contactemailArr"] = modifyContactEmailStrToArr(data.contactEmail);
        }
        if (data.contactAddress == undefined || data.contactAddress == null) {
            modifiedResp["contactAddress"] = "";
        } else {
            modifiedResp["contactAddress"] = data.contactAddress.toString();
        }
        if (data.contactCountryId == undefined || data.contactCountryId == null) {
            modifiedResp["contactCountryId"] = "";
        } else {
            modifiedResp["contactCountryId"] = data.contactCountryId.toString();
        }
        if (data.contactStateId == undefined || data.contactStateId == null) {
            modifiedResp["contactStateId"] = "";
        } else {
            modifiedResp["contactStateId"] = data.contactStateId.toString();
        }
        if (data.contactDistrictId == undefined || data.contactDistrictId == null) {
            modifiedResp["contactDistrictId"] = "";
        } else {
            modifiedResp["contactDistrictId"] = data.contactDistrictId.toString();
        }
        if (data.contactZoneId == undefined || data.contactZoneId == null) {
            modifiedResp["contactZoneId"] = "";
        } else {
            modifiedResp["contactZoneId"] = data.contactZoneId.toString();
        }

        // business details
        if (data.orgAddress == undefined || data.orgAddress == null) {
            modifiedResp["orgAddress"] = "";
        } else {
            modifiedResp["orgAddress"] = data.orgAddress.toString();
        }
        if (data.orgCountryId == undefined || data.orgCountryId == null) {
            modifiedResp["orgCountryId"] = "";
        } else {
            modifiedResp["orgCountryId"] = data.orgCountryId.toString();
        }
        if (data.orgStateId == undefined || data.orgStateId == null) {
            modifiedResp["orgStateId"] = "";
        } else {
            modifiedResp["orgStateId"] = data.orgStateId.toString();
        }
        if (data.orgCityId == undefined || data.orgCityId == null) {
            modifiedResp["orgCityId"] = "";
        } else {
            modifiedResp["orgCityId"] = data.orgCityId.toString();
        }
        if (data.orgZoneId == undefined || data.orgZoneId == null) {
            modifiedResp["orgZoneId"] = "";
        } else {
            modifiedResp["orgZoneId"] = data.orgZoneId.toString();
        }

        if (data.orgDescription == undefined || data.orgDescription == null) {
            modifiedResp["orgDescription"] = "";
        } else {
            modifiedResp["orgDescription"] = data.orgDescription.toString();
        }
        if (data.competitors == undefined || data.competitors == null) {
            modifiedResp["competitors"] = [];
        } else {
            modifiedResp["competitors"] = data.competitors;
        }
        if (data.permissionTo == undefined || data.permissionTo == null) {
            modifiedResp["permissionTo"] = "";
        } else {
            modifiedResp["permissionTo"] = data.permissionTo.toString();
        }
        if (data.permissionType == undefined || data.permissionType == null) {
            modifiedResp["permissionType"] = "";
        } else {
            modifiedResp["permissionType"] = data.permissionType.toString();
        }

    }

    return modifiedResp;
}



export function modifyPhoneNumStrToArr(data) {
    let splitArr = data.split(",");
    let retArr = [];
    for (let i = 0; i < splitArr.length; i++) {
        let obj = {};
        obj["phone"] = splitArr[i];
        obj["phoneActive"] = false;
        retArr.push(obj);
    }
    return retArr;
}

export function modifyEmailStrToArr(data) {
    let splitArr = data.split(",");
    let retArr = [];
    for (let i = 0; i < splitArr.length; i++) {
        let obj = {};
        obj["email"] = splitArr[i];
        obj["emailActive"] = false;
        retArr.push(obj);
    }
    return retArr;
}
export function modifyContactPhoneNumStrToArr(data) {
    let splitArr = data.split(",");
    let retArr = [];
    for (let i = 0; i < splitArr.length; i++) {
        let obj = {};
        obj["phone"] = splitArr[i];
        obj["phoneActive"] = false;
        retArr.push(obj);
    }
    return retArr;
}

export function modifyContactEmailStrToArr(data) {
    let splitArr = data.split(",");
    let retArr = [];
    for (let i = 0; i < splitArr.length; i++) {
        let obj = {};
        obj["email"] = splitArr[i];
        obj["emailActive"] = false;
        retArr.push(obj);
    }
    return retArr;
}

export function userModifyData(user) {
    let modArrData = [];
    if (user && user.length > 0) {
        for (let i = 0; i < user.length; i++) {
            modArrData.push({
                id: user[i].userId,
                name: user[i].firstName + " " + user[i].lastName,
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
