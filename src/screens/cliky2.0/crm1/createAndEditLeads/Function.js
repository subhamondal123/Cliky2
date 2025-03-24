export function modifyResp(data) {
    let modifiedResp = {};
    if (data) {

        if (data.leadTypeStatusId == undefined || data.leadTypeStatusId == null) {
            modifiedResp["leadTypeStatusId"] = "";
        } else {
            modifiedResp["leadTypeStatusId"] = data.leadTypeStatusId.toString();
        }
        if (data.contactTypeId == undefined || data.contactTypeId == null) {
            modifiedResp["contactTypeId"] = "";
        } else {
            modifiedResp["contactTypeId"] = data.contactTypeId.toString();
        }
        if (data.leadStatus == undefined || data.leadStatus == null) {
            modifiedResp["leadStatus"] = "";
        } else {
            modifiedResp["leadStatus"] = data.leadStatus;
        }
        if (data.leadSourceType == undefined || data.leadSourceType == null) {
            modifiedResp["leadSourceType"] = "";
        } else {
            modifiedResp["leadSourceType"] = data.leadSourceType;
        }
        if (data.assignTo == undefined || data.assignTo == null) {
            modifiedResp["assignTo"] = "";
        } else {
            modifiedResp["assignTo"] = data.assignTo.toString();
        }


        if (data.Competitor == undefined || data.Competitor == null) {
            modifiedResp["Competitor"] = [];
        } else {
            modifiedResp["Competitor"] = data.Competitor;
        }
        if (data.Platform == undefined || data.Platform == null) {
            modifiedResp["Platform"] = [];
        } else {
            modifiedResp["Platform"] = data.Platform;
        }
        if (data.profilePic == undefined || data.profilePic == null) {
            modifiedResp["profilePic"] = "";
        } else {
            modifiedResp["profilePic"] = data.profilePic;
        }
        if (data.permissionType == undefined || data.permissionType == null) {
            modifiedResp["permissionType"] = "";
        } else {
            modifiedResp["permissionType"] = data.permissionType;
        }
        if (data.accessId == undefined || data.accessId == null) {
            modifiedResp["accessId"] = "";
        } else {
            modifiedResp["accessId"] = data.accessId;
        }


    }
    if (data.ContactDetails) {
        if (data.ContactDetails.firstName == undefined || data.ContactDetails.firstName == null) {
            modifiedResp["firstName"] = "";
        } else {
            modifiedResp["firstName"] = data.ContactDetails.firstName;
        }
        if (data.ContactDetails.lastName == undefined || data.ContactDetails.lastName == null) {
            modifiedResp["lastName"] = "";
        } else {
            modifiedResp["lastName"] = data.ContactDetails.lastName;
        }
        if (data.ContactDetails.phoneNumber == undefined || data.ContactDetails.phoneNumber == null) {
            modifiedResp["phoneNumberArr"] = [{ phone: "", phoneActive: false }];
        } else {
            modifiedResp["phoneNumberArr"] = modifyContactPhoneNumStrToArr(data.ContactDetails.phoneNumber);
        }
        if (data.ContactDetails.email == undefined || data.ContactDetails.phoneNumber == null) {
            modifiedResp["emailArr"] = [{ email: "", emailActive: false }];
        } else {
            modifiedResp["emailArr"] = modifyContactEmailStrToArr(data.ContactDetails.email);
        }

        // personal contact

        if (data.ContactDetails.title == undefined || data.ContactDetails.title == null) {
            modifiedResp["title"] = "";
        } else {
            modifiedResp["title"] = data.ContactDetails.title.toString();
        }
        if (data.ContactDetails.address == undefined || data.ContactDetails.address == null) {
            modifiedResp["address"] = "";
        } else {
            modifiedResp["address"] = data.ContactDetails.address;
        }
        if (data.ContactDetails.countryId == undefined || data.ContactDetails.countryId == null) {
            modifiedResp["countryId"] = "";
        } else {
            modifiedResp["countryId"] = data.ContactDetails.countryId;
        }
        if (data.ContactDetails.stateId == undefined || data.ContactDetails.stateId == null) {
            modifiedResp["stateId"] = "";
        } else {
            modifiedResp["stateId"] = data.ContactDetails.stateId;
        }
        if (data.ContactDetails.districtId == undefined || data.ContactDetails.districtId == null) {
            modifiedResp["districtId"] = "";
        } else {
            modifiedResp["districtId"] = data.ContactDetails.districtId;
        }
        if (data.ContactDetails.zoneId == undefined || data.ContactDetails.zoneId == null) {
            modifiedResp["zoneId"] = "";
        } else {
            modifiedResp["zoneId"] = data.ContactDetails.zoneId;
        }
        if (data.ContactDetails == undefined || data.ContactDetails == null) {
            modifiedResp["ContactDetails"] = {};
        } else {
            modifiedResp["ContactDetails"] = data.ContactDetails;
        }
    }

    if (data.OrgDetails) {
        if (data.OrgDetails == undefined || data.OrgDetails == null) {
            modifiedResp["OrgDetails"] = {};
        } else {
            modifiedResp["OrgDetails"] = data.OrgDetails;
        }
        if (data.OrgDetails.organizationName == undefined || data.OrgDetails.organizationName == null) {
            modifiedResp["organizationName"] = "";
        } else {
            modifiedResp["organizationName"] = data.OrgDetails.organizationName;
        }
        if (data.OrgDetails.ownerName == undefined || data.OrgDetails.ownerName == null) {
            modifiedResp["ownerName"] = "";
        } else {
            modifiedResp["ownerName"] = data.OrgDetails.ownerName;
        }

        if (data.OrgDetails.phone == undefined || data.OrgDetails.phone == null) {
            modifiedResp["businessPhoneNumberArr"] = [{ phone: "", phoneActive: false }];
        } else {
            modifiedResp["businessPhoneNumberArr"] = modifyBusinessPhoneNumStrToArr(data.OrgDetails.phone);
        }
        if (data.OrgDetails.email == undefined || data.OrgDetails.email == null) {
            modifiedResp["businessEmailArr"] = [{ email: "", emailActive: false }];
        } else {
            modifiedResp["businessEmailArr"] = modifyBusinessEmailStrToArr(data.OrgDetails.email);
        }
        if (data.OrgDetails.address == undefined || data.OrgDetails.address == null) {
            modifiedResp["orgAddress"] = "";
        } else {
            modifiedResp["orgAddress"] = data.OrgDetails.address;
        }

        if (data.OrgDetails.countryId == undefined || data.OrgDetails.countryId == null) {
            modifiedResp["businessCountryId"] = "";
        } else {
            modifiedResp["businessCountryId"] = data.OrgDetails.countryId;
        }
        if (data.OrgDetails.stateId == undefined || data.OrgDetails.stateId == null) {
            modifiedResp["businessStateId"] = "";
        } else {
            modifiedResp["businessStateId"] = data.OrgDetails.stateId;
        }
        if (data.OrgDetails.districtId == undefined || data.OrgDetails.districtId == null) {
            modifiedResp["businessDistrictId"] = "";
        } else {
            modifiedResp["businessDistrictId"] = data.OrgDetails.districtId;
        }
        if (data.OrgDetails.zoneId == undefined || data.OrgDetails.zoneId == null) {
            modifiedResp["businessZoneId"] = "";
        } else {
            modifiedResp["businessZoneId"] = data.OrgDetails.zoneId;
        }
        if (data.OrgDetails.anualRevenue == undefined || data.OrgDetails.anualRevenue == null) {
            modifiedResp["anualRevenue"] = "";
        } else {
            modifiedResp["anualRevenue"] = data.OrgDetails.anualRevenue;
        }
        if (data.OrgDetails.numberOfEmployee == undefined || data.OrgDetails.numberOfEmployee == null) {
            modifiedResp["numberOfEmployee"] = "";
        } else {
            modifiedResp["numberOfEmployee"] = data.OrgDetails.numberOfEmployee;
        }
        if (data.OrgDetails.description == undefined || data.OrgDetails.description == null) {
            modifiedResp["description"] = "";
        } else {
            modifiedResp["description"] = data.OrgDetails.description;
        }
    }

    return modifiedResp;
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

export function modifyBusinessPhoneNumStrToArr(data) {
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

export function modifyBusinessEmailStrToArr(data) {
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




export function contactModifyData(data) {
    var arr = [];
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].contactId == undefined || data[i].contactId == null) {
                modObj["id"] = "";
            } else {
                modObj["id"] = data[i].contactId;
            }
            if (data[i].contactName == undefined || data[i].contactName == null) {
                modObj["name"] = "";
            } else {
                modObj["name"] = data[i].contactName;
            }

            arr.push(modObj)
        }
    }
    return arr;
}

export function customerModifyData(data) {
    var arr = [];
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].customerId == undefined || data[i].customerId == null) {
                modObj["id"] = "";
            } else {
                modObj["id"] = data[i].customerId;
            }
            if (data[i].customerName == undefined || data[i].customerName == null) {
                modObj["name"] = "";
            } else {
                modObj["name"] = data[i].customerName;
            }

            arr.push(modObj)
        }
    }
    return arr;
}

export function modifyUserData(arr) {
    let modArr = []
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {}
            if (arr[i].userId == undefined || arr[i].userId == null) {
                obj["id"] = ""
            } else {
                obj["id"] = arr[i].userId
            }
            if (arr[i].userName == undefined || arr[i].userName == null) {
                obj["name"] = ""
            } else {
                obj["name"] = arr[i].userName
            }

            modArr.push(obj)
        }
    }

    return modArr
}


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

export function sourceTypeModifyData(sourceType) {
    let modArrData = [];
    if (sourceType && sourceType.length > 0) {
        for (let i = 0; i < sourceType.length; i++) {
            modArrData.push({
                id: sourceType[i].id,
                name: sourceType[i].leadSourceTypeName,
                check: false,
            })
        }
    }
    return modArrData;
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
export function modifyBrandArr(data) {
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

export function modifyPlatformData(platformArr) {
    let modArrData = [];
    if (platformArr && platformArr.length > 0) {
        for (let i = 0; i < platformArr.length; i++) {
            modArrData.push({
                id: platformArr[i].platformId,
                name: platformArr[i].platformName,
                check: false,
            })
        }
    }
    return modArrData;
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

export function modifyStatgeArr(data) {
    let reqData = [];
    if (data.length > 0) {
        reqData = data;
        for (let i = 0; i < reqData.length; i++) {
            reqData[i]["id"] = reqData[i].salesStageId;
            reqData[i]["name"] = reqData[i].salesStageName;
        }
    }
    return reqData;
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
