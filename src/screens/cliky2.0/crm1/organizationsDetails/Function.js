import { DateConvert } from "../../../../services/common-view-function";
import { CommonData } from "../../../../services/constant";

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