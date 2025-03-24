
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


export function modifyResp(data) {
    let modifiedResp = {};
    if (data) {
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
        if (data.address == undefined || data.address == null) {
            modifiedResp["address"] = "";
        } else {
            modifiedResp["address"] = data.address;
        }
        if (data.businessId == undefined || data.businessId == null) {
            modifiedResp["businessId"] = "";
        } else {
            modifiedResp["businessId"] = data.businessId;
        }

        

        // if (data.assignType == undefined || data.assignType == null) {
        //     modifiedResp["assignToType"] = false;
        // } else {
        //     modifiedResp["assignToType"] = (data.assignType == 1) ? true : false;
        // }

        // if (data.assignTo == undefined || data.assignTo == null) {
        //     modifiedResp["assignedUser"] = null;
        // } else {
        //     modifiedResp["assignedUser"] = data.assignTo;
        // }



        // if (data.priorityStatusId == undefined || data.priorityStatusId == null) {
        //     modifiedResp["priorityStatus"] = null;
        // } else {
        //     modifiedResp["priorityStatus"] = data.priorityStatusId;
        // }

        // if (data.taskStageId == undefined || data.taskStageId == null) {
        //     modifiedResp["taskStage"] = null;
        // } else {
        //     modifiedResp["taskStage"] = data.taskStageId;
        // }

        if (data.ownerPhone == undefined || data.ownerPhone == null) {
            modifiedResp["phoneNumberArr"] = [{ phone: "", phoneActive: false }];
        } else {
            modifiedResp["phoneNumberArr"] = modifyPhoneNumStrToArr(data.ownerPhone);
        }

        if (data.ownerEmail == undefined || data.ownerEmail == null) {
            modifiedResp["emailArr"] = [
                { email: "", emailActive: false },
            ];
        } else {
            modifiedResp["emailArr"] = modifyEmailStrToArr(data.ownerEmail);
        }

        // business details

        if (data.businessName == undefined || data.businessName == null) {
            modifiedResp["businessName"] = "";
        } else {
            modifiedResp["businessName"] = data.businessName;
        }
        if (data.businessPhone == undefined || data.businessPhone == null) {
            modifiedResp["businessPhoneArr"] = [{ phone: "", phoneActive: false }];
        } else {
            modifiedResp["businessPhoneArr"] = modifyPhoneNumStrToArr(data.businessPhone);
        }

        if (data.businessEmail == undefined || data.businessEmail == null) {
            modifiedResp["businessEmailArr"] = [
                { email: "", emailActive: false },
            ];
        } else {
            modifiedResp["businessEmailArr"] = modifyEmailStrToArr(data.businessEmail);
        }
        if (data.businessAddress == undefined || data.businessAddress == null) {
            modifiedResp["businessAddress"] = "";
        } else {
            modifiedResp["businessAddress"] = data.businessAddress;
        }
        if (data.approvedStatus == undefined || data.approvedStatus == null) {
            modifiedResp["approvedStatus"] = "0";
        } else {
            modifiedResp["approvedStatus"] = data.approvedStatus;
        }
        
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
        

        if (data.stateId == undefined || data.stateId == null) {
            modifiedResp["stateId"] = "";
        } else {
            modifiedResp["stateId"] = data.stateId;
        }
        if (data.cityId == undefined || data.cityId == null) {
            modifiedResp["cityId"] = "";
        } else {
            modifiedResp["cityId"] = data.cityId;
        }
        if (data.zoneId == undefined || data.zoneId == null) {
            modifiedResp["zoneId"] = "";
        } else {
            modifiedResp["zoneId"] = data.zoneId;
        }
        if (data.cityVillage == undefined || data.cityVillage == null) {
            modifiedResp["cityVillage"] = "";
        } else {
            modifiedResp["cityVillage"] = data.cityVillage;
        }
        if (data.pinCode == undefined || data.pinCode == null) {
            modifiedResp["pinCode"] = "";
        } else {
            modifiedResp["pinCode"] = data.pinCode.toString();
        }
        if (data.notes == undefined || data.notes == null) {
            modifiedResp["notes"] = "";
        } else {
            modifiedResp["notes"] = data.notes.toString();
        }
        if (data.empTypeId == undefined || data.empTypeId == null) {
            modifiedResp["empTypeId"] = "";
        } else {
            modifiedResp["empTypeId"] = data.empTypeId.toString();
        }
        if (data.assignTo == undefined || data.assignTo == null) {
            modifiedResp["assignTo"] = "";
        } else {
            modifiedResp["assignTo"] = data.assignTo.toString();
        }
        if (data.assignDatetime == undefined || data.assignDatetime == null) {
            modifiedResp["assignDatetime"] = "";
        } else {
            modifiedResp["assignDatetime"] = data.assignDatetime;
        }


        // if (data.needMeeting == undefined || data.needMeeting == null) {
        //     modifiedResp["isNeedMeeting"] = false;
        // } else {
        //     modifiedResp["isNeedMeeting"] = (data.needMeeting == "1") ? true : false;
        // }

        // if (data.meetingTime == undefined || data.meetingTime == null) {
        //     modifiedResp["dateTimeRaw"] = new Date();
        //     modifiedResp["dateTime"] = "";
        // } else {
        //     let dateRaw = dateTimeFromApiToTZ(data.meetingTime);
        //     modifiedResp["dateTimeRaw"] = dateRaw;
        //     modifiedResp["dateTime"] = DateConvert.formatYYYYMMDDHHMM(dateRaw);
        // }

        // if (data.isRecurring == undefined || data.isRecurring == null) {
        //     modifiedResp["isRecurring"] = false;
        // } else {
        //     modifiedResp["isRecurring"] = (data.isRecurring == "1") ? true : false;
        // }

        // if (data.recurringType == undefined || data.recurringType == null) {
        //     modifiedResp["recurringType"] = null;
        // } else {
        //     modifiedResp["recurringType"] = parseInt(data.recurringType);
        // }

        // if (data.recurringType == '1') {
        //     if (data.startDate == undefined || data.startDate == null) {
        //         modifiedResp["date"] = "";
        //     } else {
        //         modifiedResp["date"] = data.startDate;
        //     }
        // } else {
        //     if (data.startDate == undefined || data.startDate == null) {
        //         modifiedResp["startDate"] = "";
        //     } else {
        //         modifiedResp["startDate"] = data.startDate;
        //     }

        //     if (data.endDate == undefined || data.endDate == null) {
        //         modifiedResp["endDate"] = "";
        //     } else {
        //         modifiedResp["endDate"] = data.endDate;
        //     }
        // }

        // if (data.taskDescription == undefined || data.taskDescription == null) {
        //     modifiedResp["description"] = "";
        // } else {
        //     modifiedResp["description"] = data.taskDescription;
        // }

        // if (data.permissionType == undefined || data.permissionType == null) {
        //     modifiedResp["permission"] = "";
        // } else {
        //     modifiedResp["permission"] = data.permissionType;
        // }

        // if (data.accessId == undefined || data.accessId == null) {
        //     modifiedResp["selectedIndividualUser"] = "";
        // } else {
        //     modifiedResp["selectedIndividualUser"] = data.accessId;
        // }
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