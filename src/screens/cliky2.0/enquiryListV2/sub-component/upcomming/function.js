import { DateConvert } from "../../../../../services/common-view-function";

export function enquiryModifyData(data) {
    var respData = { "totalCount": 0, "enquiryList": [] };
    if (data) {
        let enquiriesListData = data.response.data;
        respData.totalCount = data.response.count;
        if (enquiriesListData && enquiriesListData.length > 0) {
            for (let i = 0; i < enquiriesListData.length; i++) {
                let modObj = {};
                if (enquiriesListData[i].enqueryId == undefined || enquiriesListData[i].enqueryId == null) {
                    modObj["enqueryId"] = "";
                } else {
                    modObj["enqueryId"] = enquiriesListData[i].enqueryId;
                }
                if (enquiriesListData[i].enqueryTitle == undefined || enquiriesListData[i].enqueryTitle == null) {
                    modObj["enqueryTitle"] = "";
                } else {
                    modObj["enqueryTitle"] = enquiriesListData[i].enqueryTitle;
                }

                if (enquiriesListData[i].assignDueDate == undefined || enquiriesListData[i].assignDueDate == null) {
                    modObj["assignDueDate"] = "";
                } else {
                    modObj["assignDueDate"] = enquiriesListData[i].assignDueDate;
                }
                if (enquiriesListData[i].isFavorite == undefined || enquiriesListData[i].isFavorite == null) {
                    modObj["isFavorite"] = "";
                } else {
                    modObj["isFavorite"] = enquiriesListData[i].isFavorite;
                }
                if (enquiriesListData[i].enquerySource == undefined || enquiriesListData[i].enquerySource == null) {
                    modObj["enquerySource"] = "N/A";
                } else {
                    modObj["enquerySource"] = enquiriesListData[i].enquerySource;
                }
                if (enquiriesListData[i].clientId == undefined || enquiriesListData[i].clientId == null) {
                    modObj["clientId"] = "";
                } else {
                    modObj["clientId"] = enquiriesListData[i].clientId;
                }
                if (enquiriesListData[i].contactId == undefined || enquiriesListData[i].contactId == null) {
                    modObj["contactId"] = "";
                } else {
                    modObj["contactId"] = enquiriesListData[i].contactId;
                }
                if (enquiriesListData[i].leadRefId == undefined || enquiriesListData[i].leadRefId == null) {
                    modObj["leadRefId"] = 0;
                } else {
                    modObj["leadRefId"] = enquiriesListData[i].leadRefId;
                }
                if (enquiriesListData[i].allocationId == undefined || enquiriesListData[i].allocationId == null) {
                    modObj["allocationId"] = "";
                } else {
                    modObj["allocationId"] = enquiriesListData[i].allocationId;
                }
                if (enquiriesListData[i].profilePic == undefined || enquiriesListData[i].profilePic == null) {
                    modObj["profilePic"] = enquiriesListData[i].profilePic;
                } else {
                    modObj["profilePic"] = enquiriesListData[i].profilePic;
                }
                if (enquiriesListData[i].pageType == undefined || enquiriesListData[i].pageType == null) {
                    modObj["pageType"] = "";
                } else {
                    modObj["pageType"] = enquiriesListData[i].pageType;
                }
                if (enquiriesListData[i].enquerySourceTypeId == undefined || enquiriesListData[i].enquerySourceTypeId == null) {
                    modObj["enquerySourceTypeId"] = "";
                } else {
                    modObj["enquerySourceTypeId"] = enquiriesListData[i].enquerySourceTypeId;
                }
                if (enquiriesListData[i].enquerySourceId == undefined || enquiriesListData[i].enquerySourceId == null) {
                    modObj["enquerySourceId"] = "";
                } else {
                    modObj["enquerySourceId"] = enquiriesListData[i].enquerySourceId;
                }
                if (enquiriesListData[i].enqueryOwnerName == undefined || enquiriesListData[i].enqueryOwnerName == null) {
                    modObj["enqueryOwnerName"] = "";
                } else {
                    modObj["enqueryOwnerName"] = enquiriesListData[i].enqueryOwnerName;
                }


                if (enquiriesListData[i].ownerFirstName == undefined || enquiriesListData[i].ownerFirstName == null) {
                    modObj["ownerFirstName"] = "";
                } else {
                    modObj["ownerFirstName"] = enquiriesListData[i].ownerFirstName;
                }
                if (enquiriesListData[i].ownerLastName == undefined || enquiriesListData[i].ownerLastName == null) {
                    modObj["ownerLastName"] = "";
                } else {
                    modObj["ownerLastName"] = enquiriesListData[i].ownerLastName;
                }
                if (enquiriesListData[i].ownerPhone == undefined || enquiriesListData[i].ownerPhone == null) {
                    modObj["ownerPhoneNo"] = "";
                } else {
                    modObj["ownerPhoneNo"] = enquiriesListData[i].ownerPhone;
                }
                if (enquiriesListData[i].ownerEmail == undefined || enquiriesListData[i].ownerEmail == null) {
                    modObj["ownerEmail"] = "";
                } else {
                    modObj["ownerEmail"] = enquiriesListData[i].ownerEmail;
                }
                if (enquiriesListData[i].businessName == undefined || enquiriesListData[i].businessName == null) {
                    modObj["businessName"] = "";
                } else {
                    modObj["businessName"] = enquiriesListData[i].businessName;
                }
                if (enquiriesListData[i].businessAddress == undefined || enquiriesListData[i].businessAddress == null) {
                    modObj["businessAddress"] = "";
                } else {
                    modObj["businessAddress"] = enquiriesListData[i].businessAddress;
                }
                if (enquiriesListData[i].ownerLastName == undefined || enquiriesListData[i].ownerLastName == null) {
                    modObj["ownerLastName"] = "";
                } else {
                    modObj["ownerLastName"] = enquiriesListData[i].ownerLastName;
                }
                if (enquiriesListData[i].businessPhone == undefined || enquiriesListData[i].businessPhone == null) {
                    modObj["businessPhoneNo"] = "";
                } else {
                    modObj["businessPhoneNo"] = enquiriesListData[i].businessPhone;
                }
                if (enquiriesListData[i].businessEmail == undefined || enquiriesListData[i].businessEmail == null) {
                    modObj["businessEmail"] = "";
                } else {
                    modObj["businessEmail"] = enquiriesListData[i].businessEmail;
                }
                if (enquiriesListData[i].address == undefined || enquiriesListData[i].address == null) {
                    modObj["address"] = "";
                } else {
                    modObj["address"] = enquiriesListData[i].address;
                }
                if (enquiriesListData[i].typeStatus == undefined || enquiriesListData[i].typeStatus == null) {
                    modObj["typeStatus"] = "";
                } else {
                    modObj["typeStatus"] = enquiriesListData[i].typeStatus;
                }
                if (enquiriesListData[i].countryId == undefined || enquiriesListData[i].countryId == null) {
                    modObj["countryId"] = "";
                } else {
                    modObj["countryId"] = enquiriesListData[i].countryId;
                }
                if (enquiriesListData[i].stateId == undefined || enquiriesListData[i].stateId == null) {
                    modObj["stateId"] = "";
                } else {
                    modObj["stateId"] = enquiriesListData[i].stateId;
                }
                if (enquiriesListData[i].cityId == undefined || enquiriesListData[i].cityId == null) {
                    modObj["cityId"] = "";
                } else {
                    modObj["cityId"] = enquiriesListData[i].cityId;
                }
                if (enquiriesListData[i].cityVillage == undefined || enquiriesListData[i].cityVillage == null) {
                    modObj["cityVillage"] = "";
                } else {
                    modObj["cityVillage"] = enquiriesListData[i].cityVillage;
                }
                if (enquiriesListData[i].zoneId == undefined || enquiriesListData[i].zoneId == null) {
                    modObj["zoneId"] = "";
                } else {
                    modObj["zoneId"] = enquiriesListData[i].zoneId;
                }

                if (enquiriesListData[i].pinCode == undefined || enquiriesListData[i].pinCode == null) {
                    modObj["pinCode"] = "";
                } else {
                    modObj["pinCode"] = enquiriesListData[i].pinCode;
                }
                if (enquiriesListData[i].notes == undefined || enquiriesListData[i].notes == null) {
                    modObj["notes"] = "";
                } else {
                    modObj["notes"] = enquiriesListData[i].notes;
                }
                if (enquiriesListData[i].empTypeId == undefined || enquiriesListData[i].empTypeId == null) {
                    modObj["empTypeId"] = "";
                } else {
                    modObj["empTypeId"] = enquiriesListData[i].empTypeId;
                }
                if (enquiriesListData[i].assignTo == undefined || enquiriesListData[i].assignTo == null) {
                    modObj["assignTo"] = "";
                } else {
                    modObj["assignTo"] = enquiriesListData[i].assignTo;
                }
                if (enquiriesListData[i].assignDatetime == undefined || enquiriesListData[i].assignDatetime == null) {
                    modObj["assignDatetime"] = "";
                } else {
                    modObj["assignDatetime"] = enquiriesListData[i].assignDatetime;
                }
                if (enquiriesListData[i].assignDate == undefined || enquiriesListData[i].assignDate == null) {
                    modObj["assignDate"] = "";
                } else {
                    modObj["assignDate"] = DateConvert.formatYearAndHour(enquiriesListData[i].assignDate);
                }
                if (enquiriesListData[i].approvedStatus == undefined || enquiriesListData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = enquiriesListData[i].approvedStatus;
                }
                if (enquiriesListData[i].approvedDatetime == undefined || enquiriesListData[i].approvedDatetime == null) {
                    modObj["approvedDatetime"] = "";
                } else {
                    modObj["approvedDatetime"] = enquiriesListData[i].approvedDatetime;
                }
                if (enquiriesListData[i].approvedRemark == undefined || enquiriesListData[i].approvedRemark == null) {
                    modObj["approvedRemark"] = "";
                } else {
                    modObj["approvedRemark"] = enquiriesListData[i].approvedRemark;
                }
                if (enquiriesListData[i].createdAt == undefined || enquiriesListData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = enquiriesListData[i].createdAt;
                }
                if (enquiriesListData[i].modifiedAt == undefined || enquiriesListData[i].modifiedAt == null) {
                    modObj["modifiedAt"] = "";
                } else {
                    modObj["modifiedAt"] = enquiriesListData[i].modifiedAt;
                }
                if (enquiriesListData[i].enquerySourceName == undefined || enquiriesListData[i].enquerySourceName == null) {
                    modObj["enquerySourceName"] = "N/A";
                } else {
                    modObj["enquerySourceName"] = enquiriesListData[i].enquerySourceName;
                }
                if (enquiriesListData[i].countryName == undefined || enquiriesListData[i].countryName == null) {
                    modObj["countryName"] = "";
                } else {
                    modObj["countryName"] = enquiriesListData[i].countryName;
                }
                if (enquiriesListData[i].stateName == undefined || enquiriesListData[i].stateName == null) {
                    modObj["stateName"] = "";
                } else {
                    modObj["stateName"] = enquiriesListData[i].stateName;
                }
                if (enquiriesListData[i].zoneName == undefined || enquiriesListData[i].zoneName == null) {
                    modObj["zoneName"] = "";
                } else {
                    modObj["zoneName"] = enquiriesListData[i].zoneName;
                }
                if (enquiriesListData[i].assignToUserName == undefined || enquiriesListData[i].assignToUserName == null || enquiriesListData[i].assignToUserName.length == 0) {
                    modObj["assignToUserName"] = "N/A";
                } else {
                    modObj["assignToUserName"] = enquiriesListData[i].assignToUserName;
                }
                if (enquiriesListData[i].employeeTypeName == undefined || enquiriesListData[i].employeeTypeName == null) {
                    modObj["employeeTypeName"] = "";
                } else {
                    modObj["employeeTypeName"] = enquiriesListData[i].employeeTypeName;
                }
                if (enquiriesListData[i].districtName == undefined || enquiriesListData[i].districtName == null) {
                    modObj["districtName"] = "";
                } else {
                    modObj["districtName"] = enquiriesListData[i].districtName;
                }
                if (enquiriesListData[i].visitFor == undefined || enquiriesListData[i].visitFor == null) {
                    modObj["visitFor"] = "";
                } else {
                    modObj["visitFor"] = enquiriesListData[i].visitFor;
                }
                if (enquiriesListData[i].leadFeedback == undefined || enquiriesListData[i].leadFeedback == null) {
                    modObj["leadFeedback"] = [];
                } else {
                    modObj["leadFeedback"] = enquiriesListData[i].leadFeedback;
                }
                if (enquiriesListData[i].typeStatusName == undefined || enquiriesListData[i].typeStatusName == null) {
                    modObj["typeStatusName"] = [];
                } else {
                    modObj["typeStatusName"] = enquiriesListData[i].typeStatusName;
                }
                if (enquiriesListData[i].hmName == undefined || enquiriesListData[i].hmName == null) {
                    modObj["hmName"] = "N/A";
                } else {
                    modObj["hmName"] = enquiriesListData[i].hmName;
                }
                if (enquiriesListData[i].businessId == undefined || enquiriesListData[i].businessId == null) {
                    modObj["businessId"] = "0";
                } else {
                    modObj["businessId"] = enquiriesListData[i].businessId;
                }


                if (enquiriesListData[i].assignedByUserName == undefined || enquiriesListData[i].assignedByUserName == null) {
                    modObj["assignedByUserName"] = [];
                } else {
                    modObj["assignedByUserName"] = enquiriesListData[i].assignedByUserName;
                }
                if (enquiriesListData[i].hierarchyDataId == undefined || enquiriesListData[i].hierarchyDataId == null) {
                    modObj["hierarchyDataId"] = "";
                } else {
                    modObj["hierarchyDataId"] = enquiriesListData[i].hierarchyDataId;
                }
                if (enquiriesListData[i].mstHierarchyTypeId == undefined || enquiriesListData[i].mstHierarchyTypeId == null) {
                    modObj["hierarchyTypeId"] = "";
                } else {
                    modObj["hierarchyTypeId"] = enquiriesListData[i].mstHierarchyTypeId;
                }
                if (enquiriesListData[i].hmUpperNodes == undefined || enquiriesListData[i].hmUpperNodes == null) {
                    modObj["hmUpperNodes"] = {
                        "Beat": "",
                        "Territory": "",
                        "Region": "",
                        "Zone": "",
                        "Country": ""
                    };
                } else {
                    modObj["hmUpperNodes"] = enquiriesListData[i].hmUpperNodes;
                }



                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.enquiryList.push(modObj);
            }
        }
    }
    return (respData);
}

// convert list data
export function convertListData(enquiryData, item) {
    if (enquiryData && enquiryData.length > 0) {
        for (let i = 0; i < enquiryData.length; i++) {
            if (enquiryData[i].enqueryId == item.enqueryId) {
                enquiryData[i].check = !enquiryData[i].check;
            } else {
                enquiryData[i].check = false;
            }
        }
    }
    return enquiryData;
}

export function checkedListData(enquiryData, item) {
    if (enquiryData && enquiryData.length > 0) {
        for (let i = 0; i < enquiryData.length; i++) {
            if (enquiryData[i].enqueryId == item.enqueryId) {
                enquiryData[i].tick = !enquiryData[i].tick;
            } else {
                enquiryData[i].tick = false;
            }
        }
    }
    return enquiryData;
}
export function modifySubordinateArr(data) {
    let resData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].childUserName == null || data[i].childUserName == undefined) {
                modObj["name"] = "N/A"
            } else {
                modObj["name"] = data[i].childUserName
            }
            if (data[i].childId == null || data[i].childId == undefined) {
                modObj["id"] = "0"
            } else {
                modObj["id"] = data[i].childId
            }
            resData.push(modObj)
        }
    }
    return resData;
}
