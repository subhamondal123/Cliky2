import { DateConvert } from "../../../../services/common-view-function";

export function modifyApiResp(data) {
    let modifiedObj = {};
    if (data) {
        let resp = data[0];
        let modifiedOrgDetails = modifyDetails(resp);
        let modifedOpportunityOwnership = modifyOpportunityOwnership(resp);
        let modifiedCompetitor = modifyCompetitor(resp.Competitor);
        modifiedObj["allDetails"] = modifiedOrgDetails;
        modifiedObj["opportunityOwnershipData"] = modifedOpportunityOwnership;
        modifiedObj["competitors"] = modifiedCompetitor;
    }
    return modifiedObj;
}

export function modifyDetails(data) {
    let modifiedArr = [];
    let obj = {};
    let tabValue = {};
    obj["tabName"] = "Details";

    if (data.recordId == undefined || data.recordId == null || data.recordId.length == 0) {
        tabValue["Record Id"] = "";
    } else {
        tabValue["Record Id"] = data.recordId
    }

    if (data.opportunityName == undefined || data.opportunityName == null || data.opportunityName.length == 0) {
        tabValue["Opportunity Name"] = "";
    } else {
        tabValue["Opportunity Name"] = data.opportunityName
    }

    if (data.opportunityName == undefined || data.opportunityName == null || data.opportunityName.length == 0) {
        tabValue["Opportunity Name"] = "";
    } else {
        tabValue["Opportunity Name"] = data.opportunityName
    }

    if (data.OrgDetails.organizationName == undefined || data.OrgDetails.organizationName == null || data.OrgDetails.organizationName.length == 0) {
        tabValue["Organization"] = "";
    } else {
        tabValue["Organization"] = data.OrgDetails.organizationName
    }

    if (data.OrgDetails.phone == undefined || data.OrgDetails.phone == null || data.OrgDetails.phone.length == 0) {
        tabValue["Phone Number"] = "";
    } else {
        tabValue["Phone Number"] = data.OrgDetails.phone
    }

    if (data.OrgDetails.email == undefined || data.OrgDetails.email == null || data.OrgDetails.email.length == 0) {
        tabValue["Email Address"] = "";
    } else {
        tabValue["Email Address"] = data.OrgDetails.email
    }

    // if (data.OrgDetails.email == undefined || data.OrgDetails.email == null || data.OrgDetails.email.length == 0) {
    //     tabValue["Email Address :"] = "";
    // } else {
    //     tabValue["Email Address :"] = data.OrgDetails.email
    // }
    let contactFirstName = "";
    let contactLastName = "";

    if (data.ContactDetails.firstName == undefined || data.ContactDetails.firstName == null || data.ContactDetails.firstName.length == 0) {
        contactFirstName = "";
    } else {
        contactFirstName = data.ContactDetails.firstName
    }

    if (data.ContactDetails.lastName == undefined || data.ContactDetails.lastName == null || data.ContactDetails.lastName.length == 0) {
        contactLastName = "";
    } else {
        contactLastName = data.ContactDetails.lastName
    }

    tabValue["Contact Person"] = contactFirstName + " " + contactLastName;

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Additional Information";

    if (data.createdAt == undefined || data.createdAt == null || data.createdAt.length == 0) {
        tabValue["Opportunity Created"] = "";
    } else {
        tabValue["Opportunity Created"] = DateConvert.formatYYYYMMDD(data.createdAt)
    }

    if (data.expectedCloseDate == undefined || data.expectedCloseDate == null || data.expectedCloseDate.length == 0) {
        tabValue["Expected Close Date"] = "";
    } else {
        tabValue["Expected Close Date"] = DateConvert.formatYYYYMMDD(data.expectedCloseDate)
    }

    if (data.actualCloseDate == undefined || data.actualCloseDate == null || data.actualCloseDate.length == 0) {
        tabValue["Actual Close Date"] = "";
    } else {
        tabValue["Actual Close Date"] = DateConvert.formatYYYYMMDD(data.actualCloseDate)
    }

    if (data.expectedRevenue == undefined || data.expectedRevenue == null || data.expectedRevenue.length == 0) {
        tabValue["Expected Revenue"] = "";
    } else {
        tabValue["Expected Revenue"] = data.expectedRevenue.toString();
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Description";

    if (data.prodDescription == undefined || data.prodDescription == null || data.prodDescription.length == 0) {
        tabValue["Description"] = "";
    } else {
        tabValue["Description"] = data.prodDescription
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);
    obj = {};
    tabValue = {};
    obj["tabName"] = "Interested Items";

    if (data.productName == undefined || data.productName == null || data.productName.length == 0) {
        tabValue["Item name"] = "";
    } else {
        tabValue["Item name"] = data.productName
    }

    if (data.productQuantity == undefined || data.productQuantity == null) {
        data.productQuantity = "";
    } else {
        data.productQuantity = data.productQuantity
    }

    if (data.quantityType == undefined || data.quantityType == null || data.quantityType.length == 0) {
        data.quantityType = "";
    } else {
        data.quantityType = data.quantityType
    }

    tabValue["Qty :"] = data.productQuantity.toString() + " " + data.quantityType;

    if (data.listValue == undefined || data.listValue == null) {
        tabValue["List Price"] = "";
    } else {
        tabValue["List Price"] = data.listValue.toString();
    }

    if (data.discount == undefined || data.discount == null) {
        tabValue["Discount Added"] = "";
    } else {
        tabValue["Discount Added"] = data.discount.toString() + "%";
    }

    if (data.finalValue == undefined || data.finalValue == null) {
        tabValue["Total"] = "";
    } else {
        tabValue["Total"] = data.finalValue.toString();
    }

    obj["value"] = tabValue;
    modifiedArr.push(obj);

    return modifiedArr;
}

export function modifyOpportunityOwnership(data) {
    let obj = {};
    obj["Source"] = "";

    if (data.assignTofirstName == undefined || data.assignTofirstName == null || data.assignTofirstName.length == 0) {
        data.assignTofirstName = "";
    }

    if (data.assignTolastName == undefined || data.assignTolastName == null || data.assignTolastName.length == 0) {
        data.assignTolastName = "";
    }

    obj["Assigned User"] = data.assignTofirstName + " " + data.assignTolastName;

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