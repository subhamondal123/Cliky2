export function leadModifyData(data) {
    var respData = { "totalCount": 0, "leadList": [] };
    if (data) {
        let leadData = data.data;
        respData.totalCount = data.count;
        respData.maxPjpId = leadData.length > 0 ? getMaxId(leadData) : "0";
        if (leadData && leadData.length > 0) {
            for (let i = 0; i < leadData.length; i++) {
                let modObj = {};
                if (leadData[i].leadId == undefined || leadData[i].leadId == null) {
                    modObj["leadId"] = "";
                } else {
                    modObj["leadId"] = leadData[i].leadId;
                }
                if (leadData[i].leadName == undefined || leadData[i].leadName == null) {
                    modObj["leadName"] = "";
                } else {
                    modObj["leadName"] = leadData[i].leadName;
                }
                if (leadData[i].leadValue == undefined || leadData[i].leadValue == null) {
                    modObj["leadValue"] = "";
                } else {
                    modObj["leadValue"] = leadData[i].leadValue;
                }
                if (leadData[i].leadCurrencyType == undefined || leadData[i].leadCurrencyType == null) {
                    modObj["leadCurrencyType"] = "";
                } else {
                    modObj["leadCurrencyType"] = leadData[i].leadCurrencyType;
                }
                if (leadData[i].probability == undefined || leadData[i].probability == null) {
                    modObj["probability"] = "";
                } else {
                    modObj["probability"] = leadData[i].probability;
                }
                if (leadData[i].leadAge == undefined || leadData[i].leadAge == null) {
                    modObj["leadAge"] = "";
                } else {
                    modObj["leadAge"] = leadData[i].leadAge;
                }
                if (leadData[i].enqueryRefId == undefined || leadData[i].enqueryRefId == null) {
                    modObj["enqueryRefId"] = "";
                } else {
                    modObj["enqueryRefId"] = leadData[i].enqueryRefId;
                }
                
                if (leadData[i].contactTypeId == undefined || leadData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = leadData[i].contactTypeId;
                }
                if (leadData[i].createDateTime == undefined || leadData[i].createDateTime == null) {
                    modObj["createDateTime"] = "";
                } else {
                    modObj["createDateTime"] = leadData[i].createDateTime;
                }
                if (leadData[i].approvedStatus == undefined || leadData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = leadData[i].approvedStatus;
                }
                if (leadData[i].assignDueDate == undefined || leadData[i].assignDueDate == null) {
                    modObj["assignDueDate"] = "";
                } else {
                    modObj["assignDueDate"] = leadData[i].assignDueDate;
                }
                if (leadData[i].expClosingDate == undefined || leadData[i].expClosingDate == null) {
                    modObj["expClosingDate"] = "";
                } else {
                    modObj["expClosingDate"] = leadData[i].expClosingDate;
                }
                if (leadData[i].assignDatetime == undefined || leadData[i].assignDatetime == null) {
                    modObj["assignDatetime"] = "";
                } else {
                    modObj["assignDatetime"] = leadData[i].assignDatetime;
                }
                if (leadData[i].assignRemarks == undefined || leadData[i].assignRemarks == null) {
                    modObj["assignRemarks"] = "";
                } else {
                    modObj["assignRemarks"] = leadData[i].assignRemarks;
                }
                if (leadData[i].assignTo == undefined || leadData[i].assignTo == null) {
                    modObj["assignTo"] = "";
                } else {
                    modObj["assignTo"] = leadData[i].assignTo;
                }
                if (leadData[i].approvedRemarks == undefined || leadData[i].approvedRemarks == null) {
                    modObj["approvedRemarks"] = "";
                } else {
                    modObj["approvedRemarks"] = leadData[i].approvedRemarks;
                }
                if (leadData[i].approvedDatetime == undefined || leadData[i].approvedDatetime == null) {
                    modObj["approvedDatetime"] = "";
                } else {
                    modObj["approvedDatetime"] = leadData[i].approvedDatetime;
                }
                if (leadData[i].approvedBy == undefined || leadData[i].approvedBy == null) {
                    modObj["approvedBy"] = "";
                } else {
                    modObj["approvedBy"] = leadData[i].approvedBy;
                }
                if (leadData[i].leadType == undefined || leadData[i].leadType == null) {
                    modObj["leadType"] = "";
                } else {
                    modObj["leadType"] = leadData[i].leadType;
                }
                if (leadData[i].createdAt == undefined || leadData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = leadData[i].createdAt;
                }
                if (leadData[i].leadOwnValue == undefined || leadData[i].leadOwnValue == null) {
                    modObj["leadOwnValue"] = "";
                } else {
                    modObj["leadOwnValue"] = leadData[i].leadOwnValue;
                }
                if (leadData[i].leadStageRemarks == undefined || leadData[i].leadStageRemarks == null) {
                    modObj["leadStageRemarks"] = "";
                } else {
                    modObj["leadStageRemarks"] = leadData[i].leadStageRemarks;
                }
                if (leadData[i].organizationId == undefined || leadData[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = leadData[i].organizationId;
                }
                if (leadData[i].firstName == undefined || leadData[i].firstName == null) {
                    modObj["firstName"] = "";
                } else {
                    modObj["firstName"] = leadData[i].firstName;
                }
                if (leadData[i].lastName == undefined || leadData[i].lastName == null) {
                    modObj["lastName"] = "";
                } else {
                    modObj["lastName"] = leadData[i].lastName;
                }
                if (leadData[i].salesStageName == undefined || leadData[i].salesStageName == null) {
                    modObj["salesStageName"] = "";
                } else {
                    modObj["salesStageName"] = leadData[i].salesStageName;
                }
                if (leadData[i].contactFullName == undefined || leadData[i].contactFullName == null) {
                    modObj["contactFullName"] = "";
                } else {
                    modObj["contactFullName"] = leadData[i].contactFullName;
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
                if (leadData[i].leadSourceType == undefined || leadData[i].leadSourceType == null) {
                    modObj["leadSourceType"] = "";
                } else {
                    modObj["leadSourceType"] = leadData[i].leadSourceType;
                }
                if (leadData[i].leadSourceTypeName == undefined || leadData[i].leadSourceTypeName == null) {
                    modObj["leadSourceTypeName"] = "";
                } else {
                    modObj["leadSourceTypeName"] = leadData[i].leadSourceTypeName;
                }
                if (leadData[i].contactEmail == undefined || leadData[i].contactEmail == null) {
                    modObj["contactEmail"] = "";
                } else {
                    modObj["contactEmail"] = leadData[i].contactEmail;
                }
                if (leadData[i].isProject == undefined || leadData[i].isProject == null) {
                    modObj["isProject"] = "";
                } else {
                    modObj["isProject"] = leadData[i].isProject;
                }
                if (leadData[i].contactAddress == undefined || leadData[i].contactAddress == null) {
                    modObj["contactAddress"] = "";
                } else {
                    modObj["contactAddress"] = leadData[i].contactAddress;
                }
                if (leadData[i].pinCode == undefined || leadData[i].pinCode == null) {
                    modObj["pinCode"] = "";
                } else {
                    modObj["pinCode"] = leadData[i].pinCode;
                }
                if (leadData[i].ownerName == undefined || leadData[i].ownerName == null) {
                    modObj["ownerName"] = "";
                } else {
                    modObj["ownerName"] = leadData[i].ownerName;
                }
                if (leadData[i].orgPhone == undefined || leadData[i].orgPhone == null) {
                    modObj["orgPhone"] = "";
                } else {
                    modObj["orgPhone"] = leadData[i].orgPhone;
                }
                if (leadData[i].orgEmail == undefined || leadData[i].orgEmail == null) {
                    modObj["orgEmail"] = "";
                } else {
                    modObj["orgEmail"] = leadData[i].orgEmail;
                }
                if (leadData[i].anualRevenue == undefined || leadData[i].anualRevenue == null) {
                    modObj["anualRevenue"] = "";
                } else {
                    modObj["anualRevenue"] = leadData[i].anualRevenue;
                }
                if (leadData[i].numberOfEmployee == undefined || leadData[i].numberOfEmployee == null) {
                    modObj["numberOfEmployee"] = "";
                } else {
                    modObj["numberOfEmployee"] = leadData[i].numberOfEmployee;
                }
                if (leadData[i].orgAddress == undefined || leadData[i].orgAddress == null) {
                    modObj["orgAddress"] = "";
                } else {
                    modObj["orgAddress"] = leadData[i].orgAddress;
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
                if (leadData[i].permissionType == undefined || leadData[i].permissionType == null) {
                    modObj["permissionType"] = "";
                } else {
                    modObj["permissionType"] = leadData[i].permissionType;
                }
                if (leadData[i].assignById == undefined || leadData[i].assignById == null) {
                    modObj["assignById"] = "";
                } else {
                    modObj["assignById"] = leadData[i].assignById;
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
                if (leadData[i].hmUpperNodes == undefined || leadData[i].hmUpperNodes == null) {
                    modObj["hmUpperNodes"] = {};
                } else {
                    modObj["hmUpperNodes"] = leadData[i].hmUpperNodes;
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

function getMaxId(arrData) {
    arrData.sort((a, b) => b.id - a.id);
   return arrData[0].id
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
export function modListData_onApprove(leadData, item,approveId) {
    if (leadData && leadData.length > 0) {
        for (let i = 0; i < leadData.length; i++) {
            if (leadData[i].leadId == item.leadId) {
                leadData[i].approvedStatus = approveId;
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
