export function modifyResp(data) {
    let modifiedResp = {};
    if (data) {

        if (data.contactId == undefined || data.contactId == null) {
            modifiedResp["contactId"] = "";
        } else {
            modifiedResp["contactId"] = data.contactId.toString();
        }
        if (data.contactFullName == undefined || data.contactFullName == null) {
            modifiedResp["contactFullName"] = "";
        } else {
            modifiedResp["contactFullName"] = data.contactFullName.toString();
        }
        if (data.organizationName == undefined || data.organizationName == null) {
            modifiedResp["organizationName"] = "";
        } else {
            modifiedResp["organizationName"] = data.organizationName.toString();
        }


        if (data.organizationId == undefined || data.organizationId == null) {
            modifiedResp["organizationId"] = "";
        } else {
            modifiedResp["organizationId"] = data.organizationId.toString();
        }
        if (data.leadName == undefined || data.leadName == null) {
            modifiedResp["leadName"] = "";
        } else {
            modifiedResp["leadName"] = data.leadName.toString();
        }
        if (data.leadType == undefined || data.leadType == null) {
            modifiedResp["leadType"] = "";
        } else {
            modifiedResp["leadType"] = data.leadType.toString();
        }
        if (data.leadStatus == undefined || data.leadStatus == null) {
            modifiedResp["leadStatus"] = "";
        } else {
            modifiedResp["leadStatus"] = data.leadStatus;
        }
        if (data.leadTypeStatus == undefined || data.leadTypeStatus == null) {
            modifiedResp["leadTypeStatus"] = "";
        } else {
            modifiedResp["leadTypeStatus"] = data.leadTypeStatus;
        }
        if (data.leadSourceType == undefined || data.leadSourceType == null) {
            modifiedResp["leadSourceType"] = "";
        } else {
            modifiedResp["leadSourceType"] = data.leadSourceType;
        }
        if (data.leadStageRemarks == undefined || data.leadStageRemarks == null) {
            modifiedResp["leadStageRemarks"] = "";
        } else {
            modifiedResp["leadStageRemarks"] = data.leadStageRemarks;
        }
        if (data.assignTo == undefined || data.assignTo == null) {
            modifiedResp["assignTo"] = "";
        } else {
            modifiedResp["assignTo"] = data.assignTo.toString();
        }
        if (data.location == undefined || data.location == null) {
            modifiedResp["location"] = [];
        } else {
            modifiedResp["location"] = data.location;
        }
        if (data.hierarchyDataId == undefined || data.hierarchyDataId == null) {
            modifiedResp["hierarchyDataId"] = "";
        } else {
            modifiedResp["hierarchyDataId"] = data.hierarchyDataId;
        }
        if (data.mstHierarchyTypeId == undefined || data.mstHierarchyTypeId == null) {
            modifiedResp["hierarchyTypeId"] = "";
        } else {
            modifiedResp["hierarchyTypeId"] = data.mstHierarchyTypeId;
        }
        if (data.leadValue == undefined || data.leadValue == null) {
            modifiedResp["leadValue"] = "";
        } else {
            modifiedResp["leadValue"] = data.leadValue;
        }
        if (data.leadCurrencyType == undefined || data.leadCurrencyType == null) {
            modifiedResp["leadCurrencyType"] = "";
        } else {
            modifiedResp["leadCurrencyType"] = data.leadCurrencyType;
        }
        if (data.productHierarchyArr == undefined || data.productHierarchyArr == null) {
            modifiedResp["productHierarchyArr"] = [];
        } else {
            modifiedResp["productHierarchyArr"] = data.productHierarchyArr;
        }
        if (data.assignDatetime == undefined || data.assignDatetime == null) {
            modifiedResp["assignDatetime"] = "";
        } else {
            modifiedResp["assignDatetime"] = data.assignDatetime;
        }


        if (data.probability == undefined || data.probability == null) {
            modifiedResp["probability"] = "";
        } else {
            modifiedResp["probability"] = data.probability.toString();
        }
        if (data.leadAge == undefined || data.leadAge == null) {
            modifiedResp["leadAge"] = "";
        } else {
            modifiedResp["leadAge"] = data.leadAge.toString();
        }


        if (data.leadOwnValue == undefined || data.leadOwnValue == null) {
            modifiedResp["leadOwnValue"] = "";
        } else {
            modifiedResp["leadOwnValue"] = data.leadOwnValue.toString();
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

            modObj["check"] = false;
            arr.push(modObj);
        }
    }
    return arr;
}

export function modifyUserData(arr) {
    let modArr = []
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {}
            if (arr[i].childId == undefined || arr[i].childId == null) {
                obj["id"] = ""
            } else {
                obj["id"] = arr[i].childId
            }
            if (arr[i].childUserName == undefined || arr[i].childUserName == null) {
                obj["name"] = ""
            } else {
                obj["name"] = arr[i].childUserName
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
            reqData[i]["sequence"] = reqData[i].sequence;
            reqData[i]["percentage"] = reqData[i].percentage;
        }
    }
    return reqData;
}
