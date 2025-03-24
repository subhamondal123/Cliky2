import { DateConvert } from "../../../../services/common-view-function";
import { CommonData } from "../../../../services/constant";

export function modifyApiResp(data, type) {
    let modifiedObj = {};
    if (data) {
        let resp = data[0];
        if (type == "business") {
            let modifiedOrgDetails = modifyOrgDetails(resp);
            modifiedObj["businessDetails"] = modifiedOrgDetails;
            let modifedBusinessInfo = modifyBusinessInfo(resp, resp.businessType);
            modifiedObj["businessInfo"] = modifedBusinessInfo;
        }
        let modifiedPersonalDetails = modifyPersonalDetails(resp);
        modifiedObj["personalDetails"] = modifiedPersonalDetails;
        let slectedStatusObj = selectStatus(resp.contactStatus);
        modifiedObj["slectedStatusObj"] = slectedStatusObj;

    }
    return modifiedObj;
}

export function modifyOrgDetails(value) {
    let data = value.organization[0]
    let modifiedArr = [];
    let obj = {};
    let tabValue = {};
    obj["tabName"] = "Organization";

    if (data.orgName == undefined || data.orgName == null || data.orgName == 0) {
        tabValue["Name"] = "";
    } else {
        tabValue["Name"] = data.orgName
    }

    if (data.orgPhone == undefined || data.orgPhone == null || data.orgPhone.length == 0) {
        tabValue["Phone number"] = "";
    } else {
        tabValue["Phone number"] = data.orgPhone
    }

    if (data.orgEmail == undefined || data.orgEmail == null || data.orgEmail.length == 0) {
        tabValue["Email address"] = "";
    } else {
        tabValue["Email address"] = data.orgEmail
    }

    if (value.contactFirstName == undefined || value.contactFirstName == null || value.contactFirstName.length == 0) {
        value.contactFirstName = "";
    }

    if (value.contactLastName == undefined || value.contactLastName == null || value.contactLastName.length == 0) {
        value.contactLastName = "";
    }

    tabValue["Owner name"] = value.contactFirstName + " " + value.contactLastName;
    tabValue["Contact person name"] = value.contactFirstName + " " + value.contactLastName;

    if (value.contactTitle == undefined || value.contactTitle == null || value.contactTitle.length == 0) {
        tabValue["Title :"] = "";
    } else {
        tabValue["Title :"] = value.contactTitle
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
        tabValue["State"] = "";
    } else {
        tabValue["State"] = data.orgState
    }

    if (data.orgDistictName == undefined || data.orgDistictName == null || data.orgDistictName.length == 0) {
        tabValue["District"] = "";
    } else {
        tabValue["District"] = data.orgDistictName
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
        data.orgLongitude = "";
    }

    tabValue["Lat. Long."] = data.orgLattitude + " , " + data.orgLongitude

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

    if (data.orgNumberOfEmployee == undefined || data.orgNumberOfEmployee == null) {
        tabValue["Number of Employee"] = "";
    } else {
        tabValue["Number of Employee"] = data.orgNumberOfEmployee.toString();
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);


    return modifiedArr;
}



export function modifyPersonalDetails(data) {

    let modifiedArr = [];
    let obj = {};
    let tabValue = {};
    obj["tabName"] = "Personal & Contact";

    if (data.contactFirstName == undefined || data.contactFirstName == null || data.contactFirstName.length == 0) {
        data.contactFirstName = "";
    }

    if (data.contactLastName == undefined || data.contactLastName == null || data.contactLastName.length == 0) {
        data.contactLastName = "";
    }

    tabValue["Name"] = data.contactFirstName + " " + data.contactLastName;


    if (data.contactPhone == undefined || data.contactPhone == null || data.contactPhone.length == 0) {
        tabValue["Phone number"] = "";
    } else {
        tabValue["Phone number"] = data.contactPhone
    }

    if (data.contactEmail == undefined || data.contactEmail == null || data.contactEmail.length == 0) {
        tabValue["Email address"] = "";
    } else {
        tabValue["Email address"] = data.contactEmail
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Personal Address";

    if (data.contactAddress == undefined || data.contactAddress == null || data.contactAddress.length == 0) {
        tabValue["Full Address"] = "";
    } else {
        tabValue["Full Address"] = data.contactAddress
    }

    if (data.contactStateName == undefined || data.contactStateName == null || data.contactStateName.length == 0) {
        tabValue["State"] = "";
    } else {
        tabValue["State"] = data.contactStateName
    }

    if (data.contactDistrictName == undefined || data.contactDistrictName == null || data.contactDistrictName.length == 0) {
        tabValue["District Name"] = "";
    } else {
        tabValue["District Name"] = data.contactDistrictName
    }

    if (data.contactZoneName == undefined || data.contactZoneName == null || data.contactZoneName.length == 0) {
        tabValue["Zone"] = "";
    } else {
        tabValue["Zone"] = data.contactZoneName
    }

    if (data.contactGeolocation == undefined || data.contactGeolocation == null || data.contactGeolocation.length == 0) {
        tabValue["Geo Location"] = "";
    } else {
        tabValue["Geo Location"] = data.contactGeolocation
    }

    if (data.contactLattitude == undefined || data.contactLattitude == null || data.contactLattitude.length == 0) {
        data.contactLattitude = "";
    }

    if (data.contactLongitude == undefined || data.contactLongitude == null || data.contactLongitude.length == 0) {
        data.contactLongitude = "";
    }

    tabValue["Lat. Long."] = data.contactLattitude + " , " + data.contactLongitude

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Dates to remember";

    let tabArr = [];
    for (let i = 0; i < data.enevtArr.length; i++) {
        let occasionName = ""
        switch (data.enevtArr[i].occasionId) {
            case 1:
                occasionName = "Diwali";
                break;
            case 2:
                occasionName = "Navratri";
                break;
            case 3:
                occasionName = "Durga Puja";
                break;
            case 4:
                occasionName = "Dussehra";
                break;
            case 5:
                occasionName = "Company Foundation Day";
                break;
        }
        tabValue["Occasion"] = occasionName;
        tabValue["Date"] = DateConvert.formatYYYYMMDD(data.enevtArr[i].occationDate);
        tabValue["Reminder"] = data.enevtArr[i].occasionReminder == '1' ? 'Yes' : 'No';
        tabValue["Yearly Repeat"] = data.enevtArr[i].occasionYrlyRepet == '1' ? 'Yes' : 'No';
        tabArr.push({ "value": tabValue })
        tabValue = {}
    }


    obj["value"] = tabArr;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Description";

    if (data.contactDescription == undefined || data.contactDescription == null || data.contactDescription.length == 0) {
        tabValue["Description"] = "";
    } else {
        tabValue["Description"] = data.contactDescription
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Online Existence";

    tabArr = [];
    for (let i = 0; i < data.platformArr.length; i++) {
        let param = ""
        switch (data.platformArr[i].platformId) {
            case 1:
                param = "Facebook :";
                break;
            case 2:
                param = "Twitter :";
                break;
            case 3:
                param = "Linkedin :";
                break;
            case 4:
                param = "Email ";
                break;
        }
        tabValue[param] = data.platformArr[i].platformUrl;
        tabArr.push({ "value": tabValue })
        tabValue = {}
    }

    obj["value"] = tabArr;
    modifiedArr.push(obj);

    return modifiedArr;
}




export function modifyBusinessInfo(value, businessType) {
    let data = value.organization[0];
    let tabValue = {};

    if (data.orgName == undefined || data.orgName == null || data.orgName.length == 0) {
        tabValue["Business Name"] = "";
    } else {
        tabValue["Business Name"] = data.orgName
    }
    if (businessType == undefined || businessType == null || businessType.length == 0) {
        tabValue["Business Type"] = "";
    } else {
        tabValue["Business Type"] = businessType == '1' ? 'Organization' : 'Self'
    }
    if (data.businessEstablishmentDate == undefined || data.businessEstablishmentDate == null || data.businessEstablishmentDate.length == 0) {
        tabValue["Business Establishment Date"] = "";
    } else {
        tabValue["Business Establishment Date"] = DateConvert.formatYYYYMMDD(data.businessEstablishmentDate);
    }
    if (data.orgAnualRevenue == undefined || data.orgAnualRevenue == null || data.orgAnualRevenue.length == 0) {
        tabValue["Annual Turnover"] = "";
    } else {
        tabValue["Annual Turnover"] = data.orgAnualRevenue
    }


    return tabValue;
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