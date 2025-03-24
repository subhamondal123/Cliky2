import { DateConvert } from "../../../../services/common-view-function";

export function meetingModifyData(data) {
    var respData = { "totalCount": 0, "meetingList": [] };
    if (data) {
        let taskData = data.response;
        if (taskData && taskData.length > 0) {
            for (let i = 0; i < taskData.length; i++) {
                let modObj = {};
                if (taskData[i].id == undefined || taskData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = taskData[i].id;
                }
                if (taskData[i].indentNumber == undefined || taskData[i].indentNumber == null|| taskData[i].indentNumber.length == 0) {
                    modObj["indentNumber"] = "N/A";
                } else {
                    modObj["indentNumber"] = taskData[i].indentNumber;
                }
                if (taskData[i].meetingTitle == undefined || taskData[i].meetingTitle == null) {
                    modObj["meetingTitle"] = "";
                } else {
                    modObj["meetingTitle"] = taskData[i].meetingTitle;
                }
                if (taskData[i].type == undefined || taskData[i].type == null) {
                    modObj["type"] = "";
                } else {
                    modObj["type"] = taskData[i].type;
                }
                if (taskData[i].meetingDate == undefined || taskData[i].meetingDate == null) {
                    modObj["meetingDate"] = "";
                } else {
                    modObj["meetingDate"] = DateConvert.getITCDateFormat(taskData[i].meetingDate);
                }
                if (taskData[i].meetingDate == undefined || taskData[i].meetingDate == null) {
                    modObj["meetingDateRaw"] = "";
                } else {
                    modObj["meetingDateRaw"] =DateConvert.formatYYYYMMDD(taskData[i].meetingDate);
                }
                if (taskData[i].meetingDate == undefined || taskData[i].meetingDate == null) {
                    modObj["time"] = "";
                } else {
                    modObj["time"] = DateConvert.getITCtimeFormat(taskData[i].meetingDate);
                }
                if (taskData[i].duration == undefined || taskData[i].duration == null || taskData[i].duration == 0) {
                    modObj["duration"] = "00:00";
                } else {
                    modObj["duration"] = taskData[i].duration;
                }
                if (taskData[i].moId == undefined || taskData[i].moId == null) {
                    modObj["moId"] = "";
                } else {
                    modObj["moId"] = taskData[i].moId;
                }
                if (taskData[i].description == undefined || taskData[i].description == null) {
                    modObj["description"] = "";
                } else {
                    modObj["description"] = taskData[i].description;
                }
                if (taskData[i].pincode == undefined || taskData[i].pincode == null) {
                    modObj["pincode"] = 0;
                } else {
                    modObj["pincode"] = taskData[i].pincode;
                }
                if (taskData[i].address == undefined || taskData[i].address == null) {
                    modObj["address"] = 0;
                } else {
                    modObj["address"] = taskData[i].address;
                }
                if (taskData[i].probableAttendees == undefined || taskData[i].probableAttendees == null) {
                    modObj["probableAttendees"] = "";
                } else {
                    modObj["probableAttendees"] = taskData[i].probableAttendees;
                }
                if (taskData[i].eventStatus == undefined || taskData[i].eventStatus == null) {
                    modObj["eventStatus"] = "";
                } else {
                    modObj["eventStatus"] = taskData[i].eventStatus;
                }
                if (taskData[i].estimatedBudget == undefined || taskData[i].estimatedBudget == null || taskData[i].estimatedBudget == "0") {
                    modObj["estimatedBudget"] = "00.00";
                } else {
                    modObj["estimatedBudget"] = taskData[i].estimatedBudget;
                }
                if (taskData[i].approvedBudget == undefined || taskData[i].approvedBudget == null || taskData[i].approvedBudget == "0") {
                    modObj["approvedBudget"] = "00.00";
                } else {
                    modObj["approvedBudget"] = taskData[i].approvedBudget;
                }
                if (taskData[i].isIndent == undefined || taskData[i].isIndent == null) {
                    modObj["isIndent"] = "";
                } else {
                    modObj["isIndent"] = taskData[i].isIndent;
                }
                if (taskData[i].dealerFirstName == undefined || taskData[i].dealerFirstName == null || taskData[i].dealerFirstName.length == 0) {
                    modObj["dealerFirstName"] = "";
                } else {
                    modObj["dealerFirstName"] = taskData[i].dealerFirstName;
                }
                if (taskData[i].dealerMiddleName == undefined || taskData[i].dealerMiddleName == null || taskData[i].dealerMiddleName.length == 0 ) {
                    modObj["dealerMiddleName"] = "";
                } else {
                    modObj["dealerMiddleName"] = taskData[i].dealerMiddleName;
                }
                if (taskData[i].dealerLastName == undefined || taskData[i].dealerLastName == null || taskData[i].dealerLastName.length == 0) {
                    modObj["dealerLastName"] = "";
                } else {
                    modObj["dealerLastName"] = taskData[i].dealerLastName;
                }

                if (taskData[i].distributorFirstName == undefined || taskData[i].distributorFirstName == null) {
                    modObj["distributorFirstName"] = "";
                } else {
                    modObj["distributorFirstName"] = taskData[i].distributorFirstName;
                }
                if (taskData[i].distributorMiddleName == undefined || taskData[i].distributorMiddleName == null) {
                    modObj["distributorMiddleName"] = "";
                } else {
                    modObj["distributorMiddleName"] = taskData[i].distributorMiddleName;
                }
                if (taskData[i].distributorLastName == undefined || taskData[i].distributorLastName == null) {
                    modObj["distributorLastName"] = "";
                } else {
                    modObj["distributorLastName"] = taskData[i].distributorLastName;
                }
                if (taskData[i].meetingTypeName == undefined || taskData[i].meetingTypeName == null) {
                    modObj["meetingTypeName"] = "";
                } else {
                    modObj["meetingTypeName"] = taskData[i].meetingTypeName;
                }
                if (taskData[i].meetingNumber == undefined || taskData[i].meetingNumber == null|| taskData[i].meetingNumber.length == 0) {
                    modObj["meetingNumber"] = "N/A";
                } else {
                    modObj["meetingNumber"] = taskData[i].meetingNumber;
                }
                if (taskData[i].stateName == undefined || taskData[i].stateName == null|| taskData[i].stateName.length == 0) {
                    modObj["stateName"] = "N/A";
                } else {
                    modObj["stateName"] = taskData[i].stateName;
                }
                if (taskData[i].districtName == undefined || taskData[i].districtName == null|| taskData[i].districtName.length == 0) {
                    modObj["districtName"] = "N/A";
                } else {
                    modObj["districtName"] = taskData[i].districtName;
                }
                if (taskData[i].cityName == undefined || taskData[i].cityName == null|| taskData[i].cityName.length == 0) {
                    modObj["cityName"] = "N/A";
                } else {
                    modObj["cityName"] = taskData[i].cityName;
                } 
                if (taskData[i].indentAddress == undefined || taskData[i].indentAddress == null|| taskData[i].indentAddress.length == 0) {
                    modObj["indentAddress"] = "N/A";
                } else {
                    modObj["indentAddress"] = taskData[i].indentAddress;
                }
                if (taskData[i].companyBudget == undefined || taskData[i].companyBudget == null|| taskData[i].companyBudget == 0) {
                    modObj["companyBudget"] = "00.00";
                } else {
                    modObj["companyBudget"] = taskData[i].companyBudget;
                }
                if (taskData[i].partnerBudget == undefined || taskData[i].partnerBudget == null|| taskData[i].partnerBudget == 0) {
                    modObj["partnerBudget"] = "00.00";
                } else {
                    modObj["partnerBudget"] = taskData[i].partnerBudget;
                }
                if (taskData[i].IsPaymentReleased == undefined || taskData[i].IsPaymentReleased == null       ) {
                    modObj["IsPaymentReleased"] = "";
                } else {
                    modObj["IsPaymentReleased"] = taskData[i].IsPaymentReleased;
                }
                if (taskData[i].attendeesArr == undefined || taskData[i].attendeesArr == null       ) {
                    modObj["attendeesArr"] = [];
                } else {
                    modObj["attendeesArr"] = taskData[i].attendeesArr;
                }

                if (taskData[i].hmUpperNodes == undefined || taskData[i].hmUpperNodes == null       ) {
                    modObj["hmUpperNodes"] = [];
                } else {
                    modObj["hmUpperNodes"] = getAddress(taskData[i].hmUpperNodes);
                }                
             
                modObj["distributorName"] = taskData[i].distributorFirstName + " " + taskData[i].distributorMiddleName + " " + taskData[i].distributorLastName;
                modObj["dealerName"] = taskData[i].dealerFirstName + " " + taskData[i].dealerMiddleName + " " + taskData[i].dealerLastName;
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.meetingList.push(modObj);
            }
        }
    }
    return (respData);
}


function getAddress(obj) {
    let mainString = "";
    if (Object.keys(obj).length > 0) {
        for (let key in obj) {
            mainString = mainString + (obj[key] + "\n")
        }
    }
    return mainString
}