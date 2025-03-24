import { AlertMessage } from "../../../../enums";
import { DateConvert, Toaster } from "../../../../services/common-view-function";
import { CommonData } from "../../../../services/constant";
import { DataValidator } from "../../../../validators";

export function modifyApiResp(data) {
    let modifiedObj = {};
    if (data) {
        let resp = data[0];
        let modifiedOrgDetails = modifyOrgDetails(resp);
        let modifiedCompetitor = modifyCompetitor(resp.competitors);
        let selectedStatusObj = selectStatus(resp.status)
        let modifiedbusinessInfo = modifyBusinessInfo(resp)
        modifiedObj["orgDetails"] = modifiedOrgDetails;
        modifiedObj["competitors"] = modifiedCompetitor;
        modifiedObj["slectedStatusObj"] = selectedStatusObj;
        modifiedObj["businessRelativeInfo"] = modifiedbusinessInfo;
    }
    return modifiedObj;
}

export function modifyOrgDetails(data) {
    let modifiedArr = [];
    let obj = {};
    let tabValue = {};
    obj["tabName"] = "Organization";

    if (data.orgName == undefined || data.orgName == null || data.orgName.length == 0) {
        tabValue["Name"] = "";
    } else {
        tabValue["Name"] = data.orgName
    }

    if (data.orgPhone == undefined || data.orgPhone == null || data.orgPhone.length == 0) {
        tabValue["Phone Number"] = "";
    } else {
        tabValue["Phone Number"] = data.orgPhone
    }

    if (data.orgEmail == undefined || data.orgEmail == null || data.orgEmail.length == 0) {
        tabValue["Email Address"] = "";
    } else {
        tabValue["Email Address"] = data.orgEmail
    }

    if (data.ownerName == undefined || data.ownerName == null || data.ownerName.length == 0) {
        tabValue["Owner Name"] = "";
    } else {
        tabValue["Owner Name"] = data.ownerName
    }

    if (data.contactFirstName == undefined || data.contactFirstName == null || data.contactFirstName.length == 0) {
        data.contactFirstName = "";
    }

    if (data.contactLastName == undefined || data.contactLastName == null || data.contactLastName.length == 0) {
        data.contactLastName = "";
    }

    tabValue["Contact Person Name"] = data.contactFirstName + " " + data.contactLastName;

    if (data.contactTitle == undefined || data.contactTitle == null || data.contactTitle.length == 0) {
        tabValue["Title"] = "";
    } else {
        tabValue["Title"] = data.contactTitle
    }

    if (data.contactTitle == undefined || data.contactTitle == null || data.contactTitle.length == 0) {
        tabValue["Title"] = "";
    } else {
        tabValue["Title"] = data.contactTitle
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Organization Address";

    if (data.orgAddress == undefined || data.orgAddress == null || data.orgAddress.length == 0) {
        tabValue["Full Address"] = "";
    } else {
        tabValue["Full Address"] = data.orgAddress
    }

    if (data.orgState == undefined || data.orgState == null || data.orgState.length == 0) {
        tabValue["State Name"] = "";
    } else {
        tabValue["State Name"] = data.orgState
    }

    if (data.orgDistictName == undefined || data.orgDistictName == null || data.orgDistictName.length == 0) {
        tabValue["District Name"] = "";
    } else {
        tabValue["District Name"] = data.orgDistictName
    }

    if (data.zoneName == undefined || data.zoneName == null || data.zoneName.length == 0) {
        tabValue["Zone"] = "";
    } else {
        tabValue["Zone"] = data.zoneName
    }

    if (data.orgGeoLocation == undefined || data.orgGeoLocation == null || data.orgGeoLocation.length == 0) {
        tabValue["Geo Location"] = "";
    } else {
        tabValue["Geo Location"] = data.orgGeoLocation
    }

    if (data.orgLattitude == undefined || data.orgLattitude == null || data.orgLattitude.length == 0) {
        data.orgLattitude = "";
    }

    if (data.orgLongitude == undefined || data.orgLongitude == null || data.orgLongitude.length == 0) {
        data.longitude = "";
    }

    tabValue["Lat. Long."] = data.orgLattitude + " , " + data.orgLongitude;

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Other";

    if (data.orgAnualRevenue == undefined || data.orgAnualRevenue == null || data.orgAnualRevenue.length == 0) {
        tabValue["Annual Revenue"] = "";
    } else {
        tabValue["Annual Revenue"] = data.orgAnualRevenue
    }

    if (data.orgNumberOfEmployee == undefined || data.orgNumberOfEmployee == null || data.orgNumberOfEmployee == 0) {
        tabValue["Number of Employee"] = "";
    } else {
        tabValue["Number of Employee"] = data.orgNumberOfEmployee.toString()
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);

    return modifiedArr;
}

export function modifyBusinessInfo(data) {
    let obj = {};
    let tabValue = {};
    obj["tabName"] = "Business  Info";

    if (data.orgName == undefined || data.orgName == null || data.orgName.length == 0) {
        tabValue["Business Name"] = "";
    } else {
        tabValue["Business Name"] = data.orgName
    }
    // if (data.businessType == undefined || data.businessType == null || data.businessType.length == 0) {
    //     tabValue["Business Type"] = "";
    // } else {
    //     tabValue["Business Type"] = data.businessType
    // }
    if (data.businessEstablishmentDate == undefined || data.businessEstablishmentDate == null || data.businessEstablishmentDate.length == 0) {
        tabValue["Business Establishment Date"] = "";
    } else {
        tabValue["Business Establishment Date"] = DateConvert.formatYYYYMMDD(data.businessEstablishmentDate)
    }
    if (data.annualTurnover == undefined || data.annualTurnover == null || data.annualTurnover.length == 0) {
        tabValue["Annual Turnover"] = "";
    } else {
        tabValue["Annual Turnover"] = data.annualTurnover
    }
    return tabValue;
}






export function modifyCompetitor(data) {
    let modifiedArr = [];
    for (let i = 0; i < data.length; i++) {
        let obj = {};
        if (data[i].productName == undefined || data[i].productName == null || data[i].productName.length == 0) {
            obj["Name"] = "";
        } else {
            obj["Name "] = data[i].productName;
        }
        if (data[i].productDescription == undefined || data[i].productDescription == null || data[i].productDescription.length == 0) {
            obj["Description"] = "";
        } else {
            obj["Description"] = data[i].productDescription;
        }

        modifiedArr.push(obj);
    }

    return modifiedArr;
}

export function selectStatus(data) {
    if (data == undefined || data == null || data.length == 0) {
        data = 0
    }
    let allStatus = CommonData.COMMON.STATUS;
    let obj = {};
    for (let i = 0; i < allStatus.length; i++) {
        if (allStatus[i].value.toString() == data) {
            obj = allStatus[i];
        }
    }
    return obj;
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

export function validateContactData(data) {
    let errorCount = 0;

    if (data.firstName == undefined || data.firstName == null || data.firstName.length == "0") {
        Toaster.ShortCenterToaster("Please enter first name!");
        errorCount++;
    } else if (data.lastName == undefined || data.lastName == null || data.lastName.length == "0") {
        Toaster.ShortCenterToaster("Please last name!");
        errorCount++;
    } else if (data.title == undefined || data.title == null || data.title.length == "0") {
        Toaster.ShortCenterToaster("Please enter title!");
        errorCount++;
    }
    else if (validatePhoneNumberArray(data.phoneNumber) == false) {
        errorCount++;
    }
    //  else if (!emailValidator(data.phoneNumber)) {
    //     errorCount++;
    // }

    if (errorCount == 0) {
        return true;
    } else {
        return false;
    }

}

export function validatePhoneNumberArray(data) {
    let errCounter = 0;
    let status = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].phoneNumber == undefined || data[i].phoneNumber == null || data[i].phoneNumber.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.PHONE_NUMBER_ERROR);
            errCounter++;
        } else {
            if (DataValidator.mobileNumberValidator(data[i].phoneNumber) == false) {
                errCounter++;
            }
        }
    }


    if (errCounter == 0) {
        if (checkDuplicatePhoneNumber(data)) {
            status = true;
        } else {
            status = false;
        }
    }

    return status;
}
export function checkDuplicatePhoneNumber(data) {
    let errCounter = 0;
    let status = false;
    if (data.length > 1) {
        if (data[0].phoneNumber == data[1].phoneNumber) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.PHONE_NUMBER_DUPLICATE);
            errCounter++;
        }
    }


    if (errCounter == 0) {
        status = true;
    }

    return status;
}


function emailValidator(data) {
    let errorCount = 0;

    if (data.email == undefined || data.email == null || data.email.length == "0") {
        Toaster.ShortCenterToaster("Please enter email!");
        errorCount++;
    }

    if (errorCount == 0) {
        return true;
    } else {
        return false;
    }
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

export function modContactInfo(data) {
    let respData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].contactId == undefined || data[i].contactId == null || data[i].contactId.length == 0) {
                modObj["contactId"] = "";
            } else {
                modObj["contactId"] = data[i].contactId;
            }
            if (data[i].organizationId == undefined || data[i].organizationId == null || data[i].organizationId.length == 0) {
                modObj["organizationId"] = "";
            } else {
                modObj["organizationId"] = data[i].organizationId;
            }
            if (data[i].contactName == undefined || data[i].contactName == null || data[i].contactName.length == 0) {
                modObj["contactName"] = "";
            } else {
                modObj["contactName"] = data[i].contactName;
            }
            if (data[i].phoneNumber == undefined || data[i].phoneNumber == null || data[i].phoneNumber.length == 0) {
                modObj["phoneNumber"] = "";
            } else {
                modObj["phoneNumber"] = data[i].phoneNumber;
            }
            respData.push(modObj);
        }
    }
    return respData;
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