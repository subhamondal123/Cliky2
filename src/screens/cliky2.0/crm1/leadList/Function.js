export function leadModifyData(data) {
    var respData = { "totalCount": 0, "leadList": [] };
    if (data) {
        let leadData = data.data;
        respData.totalCount = data.count;
        if (leadData && leadData.length > 0) {
            for (let i = 0; i < leadData.length; i++) {
                let modObj = {};
                if (leadData[i].leadId == undefined || leadData[i].leadId == null) {
                    modObj["leadId"] = "";
                } else {
                    modObj["leadId"] = leadData[i].leadId;
                }
                if (leadData[i].firstName == undefined || leadData[i].firstName == null) {
                    modObj["firstName"] = "";
                } else {
                    modObj["firstName"] = leadData[i].firstName;
                }
                if (leadData[i].lastName == undefined || leadData[i].lastName == null) {
                    modObj["lastName"] = 0;
                } else {
                    modObj["lastName"] = leadData[i].lastName;
                }
                if (leadData[i].contactTypeName == undefined || leadData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "";
                } else {
                    modObj["contactTypeName"] = leadData[i].contactTypeName;
                }
                if (leadData[i].isFavorite == undefined || leadData[i].isFavorite == null) {
                    modObj["isFavorite"] = "";
                } else {
                    modObj["isFavorite"] = leadData[i].isFavorite;
                }
                if (leadData[i].status == undefined || leadData[i].status == null) {
                    modObj["status"] = "";
                } else {
                    modObj["status"] = leadData[i].status;
                }
                if (leadData[i].leadStatus == undefined || leadData[i].leadStatus == null) {
                    modObj["leadStatus"] = "";
                } else {
                    modObj["leadStatus"] = leadData[i].leadStatus;
                }
                if (leadData[i].leadTypeStatus == undefined || leadData[i].leadTypeStatus == null) {
                    modObj["leadTypeStatus"] = "";
                } else {
                    modObj["leadTypeStatus"] = leadData[i].leadTypeStatus;
                }
                if (leadData[i].leadSourceTypeName == undefined || leadData[i].leadSourceTypeName == null) {
                    modObj["leadSourceTypeName"] = "";
                } else {
                    modObj["leadSourceTypeName"] = leadData[i].leadSourceTypeName;
                }
                if (leadData[i].phone == undefined || leadData[i].phone == null) {
                    modObj["phone"] = "";
                } else {
                    modObj["phone"] = leadData[i].phone;
                }
                if (leadData[i].title == undefined || leadData[i].title == null) {
                    modObj["title"] = "";
                } else {
                    modObj["title"] = leadData[i].title;
                }
                if (leadData[i].organizationName == undefined || leadData[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = leadData[i].organizationName;
                }
                if (leadData[i].email == undefined || leadData[i].email == null) {
                    modObj["email"] = "";
                } else {
                    modObj["email"] = leadData[i].email;
                }
                if (leadData[i].LeadOwner == undefined || leadData[i].LeadOwner == null) {
                    modObj["LeadOwner"] = "";
                } else {
                    modObj["LeadOwner"] = leadData[i].LeadOwner;
                }
                if (leadData[i].profilePic == undefined || leadData[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = leadData[i].profilePic;
                }
                if (leadData[i].isConverted == undefined || leadData[i].isConverted == null) {
                    modObj["isConverted"] = "0";
                } else {
                    modObj["isConverted"] = leadData[i].isConverted;
                }
                if (leadData[i].leadTypeStatusName == undefined || leadData[i].leadTypeStatusName == null) {
                    modObj["leadTypeStatusName"] = "N/A";
                } else {
                    modObj["leadTypeStatusName"] = leadData[i].leadTypeStatusName;
                }
                if (leadData[i].fieldVisitId == undefined || leadData[i].fieldVisitId == null) {
                    modObj["fieldVisitId"] = "";
                } else {
                    modObj["fieldVisitId"] = leadData[i].fieldVisitId;
                }
                if (leadData[i].contactType == undefined || leadData[i].contactType == null) {
                    modObj["contactType"] = "";
                } else {
                    modObj["contactType"] = leadData[i].contactType;
                }
                if (leadData[i].hierarchyDataId == undefined || leadData[i].hierarchyDataId == null) {
                    modObj["hierarchyDataId"] = "";
                } else {
                    modObj["hierarchyDataId"] = leadData[i].hierarchyDataId;
                }
                if (leadData[i].mstHierarchyTypeId == undefined || leadData[i].mstHierarchyTypeId == null) {
                    modObj["hierarchyTypeId"] = "";
                } else {
                    modObj["hierarchyTypeId"] = leadData[i].mstHierarchyTypeId;
                }
                if (leadData[i].contactId == undefined || leadData[i].contactId == null) {
                    modObj["contactId"] = "";
                } else {
                    modObj["contactId"] = leadData[i].contactId;
                }
               
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.leadList.push(modObj);
            }
        }
    }
    return (respData);
}

// convert list data
export function convertListData(leadData, item) {
    if (leadData && leadData.length > 0) {
        for (let i = 0; i < leadData.length; i++) {
            if (leadData[i].leadId == item.leadId) {
                leadData[i].check = !leadData[i].check;
            } else {
                leadData[i].check = false;
            }
        }
    }
    return leadData;
}

export function checkedListData(leadData, item) {
    if (leadData && leadData.length > 0) {
        for (let i = 0; i < leadData.length; i++) {
            if (leadData[i].leadId == item.leadId) {
                leadData[i].tick = !leadData[i].tick;
            } else {
                leadData[i].tick = false;
            }
        }
    }
    return leadData;
}

export function textTruncate(stringValue,maxlength){
    if (stringValue.length > maxlength) {
        return stringValue.slice(0, maxlength) + "...";
      } else {
        return stringValue;
      }
}

export function modifyStatusData(statusArr){
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

export function modListData(leadData, item,statusType) {
    if (leadData && leadData.length > 0) {
        for (let i = 0; i < leadData.length; i++) {
            if (leadData[i].leadId == item.leadId) {
                leadData[i].leadTypeStatusName = statusType;
            } 
        }
    }
    return leadData;
}

export function modifyPriorityStatus(arr) {
    // for (let i = 0; i < arr.length; i++) {
    //     arr[i].id = arr[i].priorityId;
    //     arr[i].name = arr[i].priorityName;
    // }

    return arr;
}
