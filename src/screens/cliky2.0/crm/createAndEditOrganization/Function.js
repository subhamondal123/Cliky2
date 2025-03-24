
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
        if (data.organizationName == undefined || data.organizationName == null) {
            modifiedResp["organizationName"] = "";
        } else {
            modifiedResp["organizationName"] = data.organizationName;
        }
        if (data.ownerName == undefined || data.ownerName == null) {
            modifiedResp["ownerName"] = "";
        } else {
            modifiedResp["ownerName"] = data.ownerName;
        }

        if (data.phoneNumber == undefined || data.phoneNumber == null) {
            modifiedResp["phoneNumber"] = [{
                phoneNumber: "",
                countryCode: "91",
                isPrimary: true,
                selectedPhoneType: {
                    id: 3,
                    name: "Personal"
                },
                phonetype: "Personal",
                phoneActive: false
            }];
        } else {
            modifiedResp["phoneNumber"] = setPhoneNum(data.phoneNumber);
        }

        if (data.email == undefined || data.email == null) {
            modifiedResp["emailArr"] = [{
                email: "",
                selectedEmailType: {
                    id: 3,
                    name: "Personal"
                },
                emailtype: "Personal",
                isPrimary: true,
                emailActive: false
            }];
        } else {
            modifiedResp["emailArr"] = setEmail(data.email);
        }

        if (data.anualRevenue == undefined || data.anualRevenue == null) {
            modifiedResp["anualRevenue"] = "";
        } else {
            modifiedResp["anualRevenue"] = data.anualRevenue.toString();
        }
        if (data.numberOfEmployee == undefined || data.numberOfEmployee == null) {
            modifiedResp["numberOfEmployee"] = "";
        } else {
            modifiedResp["numberOfEmployee"] = data.numberOfEmployee.toString();
        }

        // personal contact
        if (data.contactType == undefined || data.contactType == null) {
            modifiedResp["contactType"] = "";
        } else {
            modifiedResp["contactType"] = data.contactType.toString();
        }
        if (data.contactName == undefined || data.contactName == null) {
            modifiedResp["contactName"] = "";
        } else {
            modifiedResp["contactName"] = data.contactName.toString();
        }
        if (data.address == undefined || data.address == null) {
            modifiedResp["address"] = "";
        } else {
            modifiedResp["address"] = data.address.toString();
        }
        if (data.location == undefined || data.location == null) {
            modifiedResp["location"] = [];
        } else {
            modifiedResp["location"] = data.location;
        }



        if (data.website == undefined || data.website == null || data.website.length == 0) {
            modifiedResp["website"] = "";
        } else {
            modifiedResp["website"] = data.website.toString();
        }
        if (data.domain == undefined || data.domain == null || data.domain.length == 0) {
            modifiedResp["domain"] = "";
        } else {
            modifiedResp["domain"] = data.domain.toString();
        }
        if (data.sub_domain == undefined || data.sub_domain == null || data.sub_domain.length == 0) {
            modifiedResp["sub_domain"] = "";
        } else {
            modifiedResp["sub_domain"] = data.sub_domain.toString();
        }
        if (data.parent_org_id == undefined || data.parent_org_id == null || data.parent_org_id.length == 0) {
            modifiedResp["parent_org_id"] = "";
        } else {
            modifiedResp["parent_org_id"] = data.parent_org_id;
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

function setPhoneNum(arr) {
    let modArr = []
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let modObj = {};
            modObj["phoneNumber"] = arr[i].typeValue,
                modObj["countryCode"] = arr[i].prefix,
                modObj["isPrimary"] = arr[i].priority == 1 ? true : false,
                modObj["selectedPhoneType"] = {
                    id: arr[i].typeName == "personal" ? 3 : arr[i].typeName == "business" ? 1 : arr[i].typeName == "work" ? 2 : arr[i].typeName == "home" ? 4 : 5,
                    name: arr[i].typeName
                },
                modObj["phonetype"] = arr[i].typeName,
                modObj["phoneActive"] = false

            modArr.push(modObj)
        }
    }
    return modArr
}


function setEmail(arr) {
    let modArr = []
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let modObj = {};
            modObj["email"] = arr[i].typeValue,
                modObj["isPrimary"] = arr[i].priority == 1 ? true : false,
                modObj["selectedEmailType"] = {
                    id: arr[i].typeName == "personal" ? 3 : arr[i].typeName == "business" ? 1 : arr[i].typeName == "work" ? 2 : arr[i].typeName == "home" ? 4 : 5,
                    name: arr[i].typeName
                },
                modObj["emailtype"] = arr[i].typeName,
                modObj["emailActive"] = false

            modArr.push(modObj)
        }
    }
    return modArr
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


export function modifyOrgData(data){
    let respData = { "list": [] };
    if (data) {
        let stateData = data;
        if (stateData && stateData.length > 0) {
            for (let i = 0; i < stateData.length; i++) {
                let modObj = {};
                if (stateData[i].organizationId == undefined || stateData[i].organizationId == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = stateData[i].organizationId;
                }
                if (stateData[i].organizationName == undefined || stateData[i].organizationName == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = stateData[i].organizationName;
                }
                
                modObj["check"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}

export function modifyDomainData(data){
    let respData = { "list": [] };
    if (data) {
        let stateData = data;
        if (stateData && stateData.length > 0) {
            for (let i = 0; i < stateData.length; i++) {
                let modObj = {};
                if (stateData[i].id == undefined || stateData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = stateData[i].id;
                }
                if (stateData[i].clientId == undefined || stateData[i].clientId == null) {
                    modObj["clientId"] = "";
                } else {
                    modObj["clientId"] = stateData[i].clientId;
                }
                if (stateData[i].domainName == undefined || stateData[i].domainName == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = stateData[i].domainName;
                }
              
                
                modObj["check"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}