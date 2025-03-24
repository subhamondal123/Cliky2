import { DateConvert } from "../../../../services/common-view-function";

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