import { DateConvert, Toaster } from "../../../../services/common-view-function";

export function modifyApiResp(data) {
    let modifiedObj = {};
    if (data) {
        let resp = data[0];
        let modifiedOrgDetails = modifyOrgDetails(resp.OrgDetails, resp.ContactDetails, resp.Competitor, resp.recordId);
        let modifiedPersonalDetails = modifyPersonalInfo(resp.ContactDetails, resp.Platform, resp.recordId);
        let modifiedLeadBy = modifyLeadBy(resp);
        let modifiedCompetitor = modifyCompetitor(resp.Competitor);
        modifiedObj["businessDetails"] = modifiedOrgDetails;
        modifiedObj["personalDetails"] = modifiedPersonalDetails;
        modifiedObj["leadBy"] = modifiedLeadBy;
        modifiedObj["competitor"] = modifiedCompetitor;
    }
    return modifiedObj;
}

export function modifyOrgDetails(data, contactDetails, Competitor, recordId) {
    let modifiedArr = [];
    let obj = {};
    let tabValue = {};
    obj["tabName"] = "Organization";

    if (recordId == undefined || recordId == null || recordId == 0) {
        tabValue["Record Id"] = "";
    } else {
        tabValue["Record Id"] = recordId
    }

    if (data.organizationName == undefined || data.organizationName == null || data.organizationName.length == 0) {
        tabValue["Organization Name"] = "";
    } else {
        tabValue["Organization Name"] = data.organizationName
    }

    if (data.ownerName == undefined || data.ownerName == null || data.ownerName.length == 0) {
        tabValue["Owner name"] = "";
    } else {
        tabValue["Owner name"] = data.ownerName
    }

    if (contactDetails.firstName == undefined || contactDetails.firstName == null || contactDetails.firstName.length == 0) {
        contactDetails.firstName = "";
    }

    if (contactDetails.lastName == undefined || contactDetails.lastName == null || contactDetails.lastName.length == 0) {
        contactDetails.lastName = "";
    }

    tabValue["Lead Name "] = contactDetails.firstName + " " + contactDetails.lastName;

    if (contactDetails.title == undefined || contactDetails.title == null || contactDetails.title.length == 0) {
        tabValue["Title "] = "";
    } else {
        tabValue["Title "] = contactDetails.title
    }

    if (data.phone == undefined || data.phone == null || data.phone.length == 0) {
        tabValue["Phone Number"] = "";
    } else {
        tabValue["Phone Number"] = data.phone
    }

    if (data.email == undefined || data.email == null || data.email.length == 0) {
        tabValue["Email Address"] = "";
    } else {
        tabValue["Email Address"] = data.email
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Organization Address";

    if (data.address == undefined || data.address == null || data.address.length == 0) {
        tabValue["Full Address"] = "";
    } else {
        tabValue["Full Address"] = data.address
    }

    if (data.countryName == undefined || data.countryName == null || data.countryName.length == 0) {
        tabValue["Country"] = "";
    } else {
        tabValue["Country"] = data.countryName
    }

    if (data.stateName == undefined || data.stateName == null || data.stateName.length == 0) {
        tabValue["State"] = "";
    } else {
        tabValue["State"] = data.stateName
    }

    if (data.cityName == undefined || data.cityName == null || data.cityName.length == 0) {
        tabValue["District"] = "";
    } else {
        tabValue["District"] = data.cityName
    }

    if (data.zoneName == undefined || data.zoneName == null || data.zoneName.length == 0) {
        tabValue["Zone"] = "";
    } else {
        tabValue["Zone"] = data.zoneName
    }

    if (data.goLocation == undefined || data.goLocation == null || data.goLocation.length == 0) {
        tabValue["Geo Location"] = "";
    } else {
        tabValue["Geo Location"] = data.goLocation
    }

    if (data.latitude == undefined || data.latitude == null || data.latitude.length == 0) {
        data.latitude = "";
    }

    if (data.longitude == undefined || data.longitude == null || data.longitude.length == 0) {
        data.longitude = "";
    }

    tabValue["Lat. Long."] = data.latitude + " , " + data.longitude

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Other";

    if (data.anualRevenue == undefined || data.anualRevenue == null || data.anualRevenue.length == 0) {
        tabValue["Annual Revenue"] = "";
    } else {
        tabValue["Annual Revenue"] = data.anualRevenue
    }

    if (data.numberOfEmployee == undefined || data.numberOfEmployee == null || data.numberOfEmployee.length == 0) {
        tabValue["Number of Employee"] = "";
    } else {
        tabValue["Number of Employee"] = data.numberOfEmployee
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);

    return modifiedArr;
}

export function modifyPersonalInfo(data, platformData, recordId) {
    let modifiedArr = [];
    let obj = {};
    let tabValue = {};
    obj["tabName"] = "Lead Information";

    if (recordId == undefined || recordId == null || recordId == 0) {
        tabValue["Record Id"] = "";
    } else {
        tabValue["Record Id"] = recordId
    }

    if (data.firstName == undefined || data.firstName == null || data.firstName.length == 0) {
        data.firstName = "";
    }

    if (data.lastName == undefined || data.lastName == null || data.lastName.length == 0) {
        data.lastName = "";
    }

    tabValue["Lead Name"] = data.firstName + " " + data.lastName;

    if (data.title == undefined || data.title == null || data.title.length == 0) {
        tabValue["Title"] = "";
    } else {
        tabValue["Title"] = data.title
    }

    if (data.phoneNumber == undefined || data.phoneNumber == null || data.phoneNumber.length == 0) {
        tabValue["Phone Number"] = "";
    } else {
        tabValue["Phone Number"] = data.phoneNumber
    }

    if (data.email == undefined || data.email == null || data.email.length == 0) {
        tabValue["Email Address"] = "";
    } else {
        tabValue["Email Address"] = data.email
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Address";

    if (data.address == undefined || data.address == null || data.address.length == 0) {
        tabValue["Address"] = "";
    } else {
        tabValue["Address"] = data.address
    }

    if (data.stateName == undefined || data.stateName == null || data.stateName.length == 0) {
        tabValue["State"] = "";
    } else {
        tabValue["State"] = data.stateName
    }

    if (data.cityName == undefined || data.cityName == null || data.cityName.length == 0) {
        tabValue["District"] = "";
    } else {
        tabValue["District"] = data.cityName
    }

    if (data.zoneName == undefined || data.zoneName == null || data.zoneName.length == 0) {
        tabValue["Zone"] = "";
    } else {
        tabValue["Zone"] = data.zoneName
    }

    if (data.goLocation == undefined || data.goLocation == null || data.goLocation.length == 0) {
        tabValue["Geo Location"] = "";
    } else {
        tabValue["Geo Location"] = data.goLocation
    }

    if (data.latitude == undefined || data.latitude == null || data.latitude.length == 0) {
        data.latitude = "";
    }

    if (data.longitude == undefined || data.longitude == null || data.longitude.length == 0) {
        data.longitude = "";
    }

    tabValue["Lat. Long."] = data.latitude + " , " + data.longitude

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Description";

    if (data.description == undefined || data.description == null || data.description.length == 0) {
        tabValue["Description"] = "";
    } else {
        tabValue["Description"] = data.description
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Lead Conversion Details";

    tabValue["Converted Contact"] = "Yes";
    tabValue["Converted Organization"] = "";
    tabValue["Converted Opportunity"] = "";

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Online Existence";

    let tabArr = [];
    for (let i = 0; i < platformData.length; i++) {
        let param = ""
        switch (platformData[i].platformId) {
            case 1:
                param = "Facebook :";
                break;
            case 2:
                param = "Twitter :";
                break;
            case 3: param
                param = "Linkedin :";
                break;
            case 4:
                param = "Email :";
                break;
        }
        tabValue[param] = platformData[i].link;
        tabArr.push({ "value": tabValue })
        tabValue = {}
    }

    obj["value"] = tabArr;
    modifiedArr.push(obj);

    return modifiedArr;
}

export function modifyLeadBy(data) {
    let obj = {};

    if (data.leadSourceTypeName == undefined || data.leadSourceTypeName == null || data.leadSourceTypeName.length == 0) {
        obj["Lead source"] = ""
    } else {
        obj["Lead source"] = data.leadSourceTypeName
    }

    if (data.createdAt == undefined || data.createdAt == null || data.createdAt.length == 0) {
        obj["Created On"] = ""
    } else {
        obj["Created On"] = DateConvert.formatYYYYMMDD(data.createdAt)
    }

    if (data.createdByName == undefined || data.createdByName == null || data.createdByName.length == 0) {
        obj["Created By"] = ""
    } else {
        obj["Created By"] = data.createdByName;
    }

    if (data.contactName == undefined || data.contactName == null || data.contactName.length == 0) {
        obj["Lead owner"] = ""
    } else {
        obj["Lead owner"] = data.contactName
    }

    return obj;
}

export function modifyCompetitor(data) {
    let modifiedArr = [];
    for (let i = 0; i < data.length; i++) {
        let obj = {};
        if (data[i].productName == undefined || data[i].productName == null || data[i].productName.length == 0) {
            obj["Name"] = "";
        } else {
            obj["Name"] = data[i].productName;
        }

        if (data[i].productUsed == undefined || data[i].productUsed == null || data[i].productUsed.length == 0) {
            obj["Product used"] = "";
        } else {
            obj["Product used"] = data[i].productUsed;
        }


        if (data[i].monthlyPurchase == undefined || data[i].monthlyPurchase == null || data[i].monthlyPurchase.length == 0) {
            obj["Monthly Purchase"] = "";
        } else {
            obj["Monthly Purchase"] = data[i].monthlyPurchase;
        }

        if (data[i].description == undefined || data[i].description == null || data[i].description.length == 0) {
            obj["Description"] = "";
        } else {
            obj["Description"] = data[i].description;
        }

        modifiedArr.push(obj);
    }
    return modifiedArr;
}

export function modifySalesStage(data, leadStatus, nextleadStatusName) {
    let arr = [];
    let status = true;
    for (let i = 0; i < data.length; i++) {
        let getObj = checkSequence(data, i);
        getObj["isCompleted"] = status;
        arr.push(getObj);
        if (getObj.sequence == leadStatus) {
            status = false;
        }
    }
    let selectedStage = getSelectedStage(arr, nextleadStatusName);
    return { "stageArr": arr, "selectedStage": selectedStage };
}

export function checkSequence(data, pos) {
    let obj = {}
    for (let i = 0; i < data.length; i++) {
        if (data[i].sequence == pos) {
            obj = data[i];
        }
    }
    return obj;
}

export function getSelectedStage(data, nextleadStatusName) {
    let obj = {}
    for (let i = 0; i < data.length; i++) {
        if (data[i].salesStageName == nextleadStatusName) {
            obj = data[i]
        }
    }
    return obj;
}

export function modifyPriorityStatus(arr) {
    // for (let i = 0; i < arr.length; i++) {
    //     arr[i].id = arr[i].priorityId;
    //     arr[i].name = arr[i].priorityName;
    // }

    return arr;
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
        if (data.contactTypeName == undefined || data.contactTypeName == null) {
            modifiedResp["contactTypeName"] = "";
        } else {
            modifiedResp["contactTypeName"] = data.contactTypeName.toString();
        }
        if (data.leadSourceTypeName == undefined || data.leadSourceTypeName == null) {
            modifiedResp["leadSourceTypeName"] = "";
        } else {
            modifiedResp["leadSourceTypeName"] = data.leadSourceTypeName.toString();
        }
        if (data.leadTypeStatusName == undefined || data.leadTypeStatusName == null) {
            modifiedResp["leadTypeStatusName"] = "";
        } else {
            modifiedResp["leadTypeStatusName"] = data.leadTypeStatusName.toString();
        }
        if (data.lastUpdateNote == undefined || data.lastUpdateNote == null) {
            modifiedResp["lastUpdateNote"] = "";
        } else {
            modifiedResp["lastUpdateNote"] = data.lastUpdateNote.toString();
        }
        if (data.nextActivity == undefined || data.nextActivity == null) {
            modifiedResp["nextActivity"] = "";
        } else {
            modifiedResp["nextActivity"] = data.nextActivity.toString();
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
            modifiedResp["productHierarchyArr"] = modProdHeirarchyData(data.productHierarchyArr);
        }
        if (data.assignDatetime == undefined || data.assignDatetime == null) {
            modifiedResp["assignDatetime"] = "";
        } else {
            modifiedResp["assignDatetime"] = data.assignDatetime;
        }
        if (data.salesStageName == undefined || data.salesStageName == null) {
            modifiedResp["salesStageName"] = "";
        } else {
            modifiedResp["salesStageName"] = data.salesStageName;
        }
        if (data.LeadOwner == undefined || data.LeadOwner == null) {
            modifiedResp["LeadOwner"] = "";
        } else {
            modifiedResp["LeadOwner"] = data.LeadOwner;
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

function modProdHeirarchyData(data) {
    let arr = [];
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].hierarchyTypeId == undefined || data[i].hierarchyTypeId == null || data[i].hierarchyTypeId.length == 0) {
                modObj["hierarchyTypeId"] = "";
            } else {
                modObj["hierarchyTypeId"] = data[i].hierarchyTypeId;
            }
            if (data[i].hierarchyDataId == undefined || data[i].hierarchyDataId == null || data[i].hierarchyDataId.length == 0) {
                modObj["hierarchyDataId"] = "";
            } else {
                modObj["hierarchyDataId"] = data[i].hierarchyDataId;
            }
            if (data[i].prodhArr == undefined || data[i].prodhArr == null || data[i].prodhArr.length == 0) {
                modObj["prodhArr"] = [];
            } else {
                modObj["prodhArr"] = data[i].prodhArr;
            }
            modObj["deleteProductLoader"] = false;
            arr.push(modObj);
        }
    }
    return arr;
}

export function modActivityDetailsData(data) {
    let respData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].activityId == undefined || data[i].activityId == null || data[i].activityId.length == 0) {
                modObj["activityId"] = "";
            } else {
                modObj["activityId"] = data[i].activityId;
            }
            if (data[i].assignTo == undefined || data[i].assignTo == null || data[i].assignTo.length == 0) {
                modObj["assignTo"] = "";
            } else {
                modObj["assignTo"] = data[i].assignTo;
            }
            if (data[i].title == undefined || data[i].title == null || data[i].title.length == 0) {
                modObj["title"] = "";
            } else {
                modObj["title"] = data[i].title;
            }
            if (data[i].assignToName == undefined || data[i].assignToName == null || data[i].assignToName.length == 0) {
                modObj["assignToName"] = "";
            } else {
                modObj["assignToName"] = data[i].assignToName;
            }
            if (data[i].createdBy == undefined || data[i].createdBy == null || data[i].createdBy.length == 0) {
                modObj["createdBy"] = "";
            } else {
                modObj["createdBy"] = data[i].createdBy;
            }
            if (data[i].createdByName == undefined || data[i].createdByName == null || data[i].createdByName.length == 0) {
                modObj["createdByName"] = "";
            } else {
                modObj["createdByName"] = data[i].createdByName;
            }
            if (data[i].dueDate == undefined || data[i].dueDate == null || data[i].dueDate.length == 0) {
                modObj["dueDate"] = "";
            } else {
                modObj["dueDate"] = data[i].dueDate;
            }
            if (data[i].dueDateDate == undefined || data[i].dueDateDate == null || data[i].dueDateDate.length == 0) {
                modObj["dueDateDate"] = "";
            } else {
                modObj["dueDateDate"] = data[i].dueDateDate;
            }
            if (data[i].dueTime == undefined || data[i].dueTime == null || data[i].dueTime.length == 0) {
                modObj["dueTime"] = "";
            } else {
                modObj["dueTime"] = data[i].dueTime;
            }
            if (data[i].description == undefined || data[i].description == null || data[i].description.length == 0) {
                modObj["description"] = "";
            } else {
                modObj["description"] = data[i].description;
            }
            if (data[i].activityTypeId == undefined || data[i].activityTypeId == null || data[i].activityTypeId.length == 0) {
                modObj["activityTypeId"] = "";
            } else {
                modObj["activityTypeId"] = data[i].activityTypeId;
            }
            if (data[i].activityNameId == undefined || data[i].activityNameId == null || data[i].activityNameId.length == 0) {
                modObj["activityNameId"] = "";
            } else {
                modObj["activityNameId"] = data[i].activityNameId;
            }
            if (data[i].activityName == undefined || data[i].activityName == null || data[i].activityName.length == 0) {
                modObj["activityName"] = "";
            } else {
                modObj["activityName"] = data[i].activityName;
            }
            respData.push(modObj);
        }
    }
    return respData;
}


export function modSubordinateData(data) {
    let respData = []
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].childId == undefined || data[i].childId == null) {
                modObj["id"] = "";
            } else {
                modObj["id"] = data[i].childId;
            }
            if (data[i].childUserName == undefined || data[i].childUserName == null) {
                modObj["name"] = "";
            } else {
                modObj["name"] = data[i].childUserName;
            }
            respData.push(modObj);
        }
    }
    return respData;
}
export function validateActivityData(data) {
    let errorCount = 0;

    if (data.activityTypeId == undefined || data.activityTypeId == null || data.activityTypeId.length == "0") {
        Toaster.ShortCenterToaster("Please enter activity type!");
        errorCount++;
    } else if (data.assignDueDate == undefined || data.assignDueDate == null || data.assignDueDate.length == "0") {
        Toaster.ShortCenterToaster("Please enter date!");
        errorCount++;
    } else if (data.time == undefined || data.time == null || data.time.length == "0") {
        Toaster.ShortCenterToaster("Please enter time!");
        errorCount++;
    } else if (data.description == undefined || data.description == null || data.description.length == "0") {
        Toaster.ShortCenterToaster("Please enter note!");
        errorCount++;
    } else if (data.assignTo == undefined || data.assignTo == null || data.assignTo.length == "0") {
        Toaster.ShortCenterToaster("Please enter subordinate!");
        errorCount++;
    }

    if (errorCount == 0) {
        return true;
    } else {
        return false;
    }

}

export function modProductData(data) {
    let respData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].id == undefined || data[i].id == null || data[i].id.length == 0) {
                modObj["id"] = "";
            } else {
                modObj["id"] = data[i].id;
            }
            if (data[i].hmName == undefined || data[i].hmName == null || data[i].hmName.length == 0) {
                modObj["hmName"] = "";
            } else {
                modObj["hmName"] = data[i].hmName;
            }
            if (data[i].price == undefined || data[i].price == null || data[i].price.length == 0) {
                modObj["price"] = "";
            } else {
                modObj["price"] = data[i].price;
            }
            if (data[i].quantity == undefined || data[i].quantity == null || data[i].quantity.length == 0) {
                modObj["quantity"] = "";
            } else {
                modObj["quantity"] = data[i].quantity;
            }
            if (data[i].discount == undefined || data[i].discount == null || data[i].discount.length == 0) {
                modObj["discount"] = "";
            } else {
                modObj["discount"] = data[i].discount;
            }
            modObj["deleteProductLoader"] = false;
            respData.push(modObj);
        }
    }
    return respData;
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

export function validateProductHeirarchyData(data) {
    let errorCount = 0;

    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].hierarchyDataId == undefined || data[i].hierarchyDataId == null || data[i].hierarchyDataId.length == 0) {
                Toaster.ShortCenterToaster("Please select Product!");
                errorCount++;
            }
        }
    }

    if (errorCount == 0) {
        return true;
    } else {
        return false;
    }
}

export function modifyQuoteList(data) {
    let respData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].quoteId == undefined || data[i].quoteId == null || data[i].quoteId.length == 0) {
                modObj["quoteId"] = "";
            } else {
                modObj["quoteId"] = data[i].quoteId;
            }
            if (data[i].quoteName == undefined || data[i].quoteName == null || data[i].quoteName.length == 0) {
                modObj["quoteName"] = "";
            } else {
                modObj["quoteName"] = data[i].quoteName;
            }
            if (data[i].createdAt == undefined || data[i].createdAt == null || data[i].createdAt.length == 0) {
                modObj["createdAt"] = "";
            } else {
                modObj["createdAt"] = DateConvert.getDDthMonthNameYYYYformat(data[i].createdAt).day;
            }
            if (data[i].totalValue == undefined || data[i].totalValue == null || data[i].totalValue.length == 0) {
                modObj["totalValue"] = "";
            } else {
                modObj["totalValue"] = data[i].totalValue;
            }
            if (data[i].quoteType == undefined || data[i].quoteType == null || data[i].quoteType.length == 0) {
                modObj["quoteType"] = "";
            } else {
                modObj["quoteType"] = data[i].quoteType;
            }
            modObj["deleteItemLoader"] = false;
            respData.push(modObj);
        }
    }
    return respData;
}

export function validateQuoteData(data) {
    let errorCount = 0;

    if (data.quoteName == undefined || data.quoteName == null || data.quoteName.length == "0") {
        Toaster.ShortCenterToaster("Please enter quote name!");
        errorCount++;
    } else if (data.quoteTypeId == undefined || data.quoteTypeId == null || data.quoteTypeId.length == "0") {
        Toaster.ShortCenterToaster("Please select type!");
        errorCount++;
    } else if (!modProductHeirarchyData(data.productArr)) {
        errorCount++;
    }

    if (errorCount == 0) {
        return true;
    } else {
        return false;
    }
}

function modProductHeirarchyData(data) {
    let errorCount = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].hierarchyDataId == undefined || data[i].hierarchyDataId == null || data[i].hierarchyDataId.length == "0") {
            Toaster.ShortCenterToaster("Please select product!");
            errorCount++;
        } 
        else if (data[i].price == undefined || data[i].price == null || data[i].price.length == "0") {
            Toaster.ShortCenterToaster("Please enter price!");
            errorCount++;
        }
    }

    if (errorCount == 0) {
        return true;
    } else {
        return false;
    }
}