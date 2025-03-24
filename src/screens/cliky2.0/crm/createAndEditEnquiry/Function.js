
export function enquirySourceModifyData(data) {
    var respData = { "enquirySourceList": [], "enquiryTypeList": [], "employeeTypeList": [] };
    if (data) {
        let enquirySourceData = data.enquirySource;
        let enquiryTypeData = data.enquiryType;
        let employeeTypeData = data.employeeType;
        if (employeeTypeData && employeeTypeData.length > 0) {
            for (let i = 0; i < employeeTypeData.length; i++) {
                let modObj = {};
                if (employeeTypeData[i].designationId == undefined || employeeTypeData[i].designationId == null) {
                    modObj["designationId"] = "";
                } else {
                    modObj["designationId"] = employeeTypeData[i].designationId;
                }
                if (employeeTypeData[i].designationName == undefined || employeeTypeData[i].designationName == null) {
                    modObj["designationName"] = "";
                } else {
                    modObj["designationName"] = employeeTypeData[i].designationName;
                }
                modObj["check"] = false;
                respData.employeeTypeList.push(modObj);
            }
        }
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
export function modifyEmployeeTypeArrData(employeeTypeArr) {
    let modArrData = [];
    if (employeeTypeArr && employeeTypeArr.length > 0) {
        for (let i = 0; i < employeeTypeArr.length; i++) {
            modArrData.push({
                id: employeeTypeArr[i].designationId,
                name: employeeTypeArr[i].designationName,
                check: false,
            })
        }
    }
    return modArrData;
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



export function organizationModifyData(data) {
    var respData = { "organizationList": [] };
    if (data) {
        let organizationData = data.response;

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



export function modifyResp(data) {
    let modifiedResp = {};
    if (data) {
        if (data.contactId == undefined || data.contactId == null) {
            modifiedResp["contactId"] = "";
        } else {
            modifiedResp["contactId"] = data.contactId;
        }
        if (data.enquerySourceId == undefined || data.enquerySourceId == null) {
            modifiedResp["enquerySourceId"] = "";
        } else {
            modifiedResp["enquerySourceId"] = data.enquerySourceId;
        }

        if (data.enquerySourceTypeId == undefined || data.enquerySourceTypeId == null) {
            modifiedResp["enquerySourceTypeId"] = "";
        } else {
            modifiedResp["enquerySourceTypeId"] = data.enquerySourceTypeId;
        }
        if (data.ownerFirstName == undefined || data.ownerFirstName == null) {
            modifiedResp["ownerFirstName"] = "";
        } else {
            modifiedResp["ownerFirstName"] = data.ownerFirstName;
        }
        if (data.ownerLastName == undefined || data.ownerLastName == null) {
            modifiedResp["ownerLastName"] = "";
        } else {
            modifiedResp["ownerLastName"] = data.ownerLastName;
        }
        if (data.ownerEmail == undefined || data.ownerEmail == null) {
            modifiedResp["ownerEmail"] = "";
        } else {
            modifiedResp["ownerEmail"] = data.ownerEmail;
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

        // business details

        if (data.organizationId == undefined || data.organizationId == null) {
            modifiedResp["organizationId"] = "";
        } else {
            modifiedResp["organizationId"] = data.organizationId;
        }
        if (data.organizationName == undefined || data.organizationName == null) {
            modifiedResp["organizationName"] = "";
        } else {
            modifiedResp["organizationName"] = data.organizationName;
        }
        if (data.location == undefined || data.location == null) {
            modifiedResp["location"] = [];
        } else {
            modifiedResp["location"] = data.location;
        }
        if (data.address == undefined || data.address == null) {
            modifiedResp["address"] = "";
        } else {
            modifiedResp["address"] = data.address;
        }
        //
        if (data.numberOfEmployee == undefined || data.numberOfEmployee == null) {
            modifiedResp["numberOfEmployee"] = "";
        } else {
            modifiedResp["numberOfEmployee"] = data.numberOfEmployee.toString();
        }
        if (data.productHierarchyArr == undefined || data.productHierarchyArr == null) {
            modifiedResp["productHierarchyArr"] = [];
        } else {
            modifiedResp["productHierarchyArr"] = data.productHierarchyArr;
        }
        if (data.notes == undefined || data.notes == null) {
            modifiedResp["notes"] = "";
        } else {
            modifiedResp["notes"] = data.notes.toString();
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
export function modifyDistrictData(data) {
    let modObj = {}
    return retArr;
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

export function assignedEmployeeModifyData(data) {
    var respData = { "assignedEmployeeList": [] };
    if (data) {
        let assignedEmployeeData = data.response;
        if (assignedEmployeeData && assignedEmployeeData.length > 0) {
            for (let i = 0; i < assignedEmployeeData.length; i++) {
                let modObj = {};
                if (assignedEmployeeData[i].userId == undefined || assignedEmployeeData[i].userId == null) {
                    modObj["userId"] = "";
                } else {
                    modObj["userId"] = assignedEmployeeData[i].userId;
                }
                if (assignedEmployeeData[i].userName == undefined || assignedEmployeeData[i].userName == null) {
                    modObj["userName"] = "";
                } else {
                    modObj["userName"] = assignedEmployeeData[i].userName;
                }

                modObj["check"] = false;
                respData.assignedEmployeeList.push(modObj);
            }
        }
    }

    return respData;
}
export function modifyAssignedEmployeeArrData(assignedArr) {
    let modArrData = [];
    if (assignedArr && assignedArr.length > 0) {
        for (let i = 0; i < assignedArr.length; i++) {
            modArrData.push({
                id: assignedArr[i].userId,
                name: assignedArr[i].userName,
                check: false,
            })
        }
    }
    return modArrData;
}



export function modifyContactData(data) {
    let respData = { "list": [] };
    if (data) {
        let stateData = data;
        if (stateData && stateData.length > 0) {
            for (let i = 0; i < stateData.length; i++) {
                let modObj = {};
                if (stateData[i].contactId == undefined || stateData[i].contactId == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = stateData[i].contactId;
                }
                if (stateData[i].contactName == undefined || stateData[i].contactName == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = stateData[i].contactName;
                }
                if (stateData[i].createdBy == undefined || stateData[i].createdBy == null) {
                    modObj["createdBy"] = "";
                } else {
                    modObj["createdBy"] = stateData[i].createdBy;
                }
                if (stateData[i].createdByName == undefined || stateData[i].createdByName == null) {
                    modObj["createdByName"] = "";
                } else {
                    modObj["createdByName"] = stateData[i].createdByName;
                }
                if (stateData[i].title == undefined || stateData[i].title == null) {
                    modObj["title"] = "";
                } else {
                    modObj["title"] = stateData[i].title;
                }
                if (stateData[i].organizationId == undefined || stateData[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = stateData[i].organizationId;
                }
                if (stateData[i].createdAt == undefined || stateData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = stateData[i].createdAt;
                }
                if (stateData[i].organizationName == undefined || stateData[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = stateData[i].organizationName;
                }
                if (stateData[i].approvedStatus == undefined || stateData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "0";
                } else {
                    modObj["approvedStatus"] = stateData[i].approvedStatus;
                }
                if (stateData[i].phoneArr == undefined || stateData[i].phoneArr == null || stateData[i].phoneArr.length == 0) {
                    modObj["phoneNumber"] = [{
                        phoneNumber: "",
                        countryCode: "91",
                        isPrimary: true,
                        selectedPhoneType: {
                            id: 3,
                            name: "personal"
                        },
                        phonetype: "personal",
                        phoneActive: false
                    }];
                } else {
                    modObj["phoneNumber"] = setPhoneNum(stateData[i].phoneArr);
                }
                if (stateData[i].emailArr == undefined || stateData[i].emailArr == null || stateData[i].emailArr.length == 0) {
                    modObj["email"] = [{
                        email: "",
                        selectedEmailType: {
                            id: 3,
                            name: "personal"
                        },
                        emailtype: "personal",
                        isPrimary: true,
                        emailActive: false
                    }];
                } else {
                    modObj["email"] = setEmail(stateData[i].emailArr);
                }
                if (stateData[i].phone == undefined || stateData[i].phone == null) {
                    modObj["orgPhone"] = "";
                } else {
                    modObj["orgPhone"] = stateData[i].phone;
                }

                modObj["check"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}

export function orgModifyData(data) {
    let modArrData = [];
    if (data && data.length > 0) {

        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].organizationId == undefined || data[i].organizationId == null) {
                modObj["id"] = "";
            } else {
                modObj["id"] = data[i].organizationId;
            }
            if (data[i].organizationName == undefined || data[i].organizationName == null) {
                modObj["name"] = "";
            } else {
                modObj["name"] = data[i].organizationName;
            }

            modObj["check"] = false;
            modArrData.push(modObj);
        }

    }
    return modArrData;
}