
export function enquiryModifyData(data) {
    var respData = { "totalCount": 0, "enquiryList": [] };
    if (data) {
        let enquiryData = data.response;
        respData.totalCount = data.response.count;
        if (enquiryData && enquiryData.length > 0) {
            for (let i = 0; i < enquiryData.length; i++) {
                let modObj = {};
                if (enquiryData[i].enqueryId == undefined || enquiryData[i].enqueryId == null) {
                    modObj["enqueryId"] = "";
                } else {
                    modObj["enqueryId"] = enquiryData[i].enqueryId;
                }
                // if (enquiryData[i].isFavorite == undefined || enquiryData[i].isFavorite == null) {
                //     modObj["isFavorite"] = "";
                // } else {
                //     modObj["isFavorite"] = enquiryData[i].isFavorite;
                // }
                if (enquiryData[i].ownerName == undefined || enquiryData[i].ownerName == null) {
                    modObj["enqueryTitle"] = "";
                } else {
                    modObj["enqueryTitle"] = enquiryData[i].ownerName;
                }
                if (enquiryData[i].enquiryPage == undefined || enquiryData[i].enquiryPage == null) {
                    modObj["enquiryPage"] = "";
                } else {
                    modObj["enquiryPage"] = enquiryData[i].enquiryPage;
                }
                // if (enquiryData[i].enquerySource == undefined || enquiryData[i].enquerySource == null) {
                //     modObj["enquerySource"] = "N/A";
                // } else {
                //     modObj["enquerySource"] = enquiryData[i].enquerySource;
                // }
                // if (enquiryData[i].assignDueDate == undefined || enquiryData[i].assignDueDate == null) {
                //     modObj["assignDueDate"] = "";
                // } else {
                //     modObj["assignDueDate"] = enquiryData[i].assignDueDate;
                // }
                if (enquiryData[i].createdBy == undefined || enquiryData[i].createdBy == null) {
                    modObj["clientId"] = "";
                } else {
                    modObj["clientId"] = enquiryData[i].createdBy;
                }
                // if (enquiryData[i].leadRefId == undefined || enquiryData[i].leadRefId == null) {
                //     modObj["leadRefId"] = 0;
                // } else {
                //     modObj["leadRefId"] = enquiryData[i].leadRefId;
                // }
                // if (enquiryData[i].allocationId == undefined || enquiryData[i].allocationId == null) {
                //     modObj["allocationId"] = "";
                // } else {
                //     modObj["allocationId"] = enquiryData[i].allocationId;
                // }
                // if (enquiryData[i].profilePic == undefined || enquiryData[i].profilePic == null) {
                //     modObj["profilePic"] = "";
                // } else {
                //     modObj["profilePic"] = enquiryData[i].profilePic;
                // }
                // if (enquiryData[i].pageType == undefined || enquiryData[i].pageType == null) {
                //     modObj["pageType"] = "";
                // } else {
                //     modObj["pageType"] = enquiryData[i].pageType;
                // }
                // if (enquiryData[i].enquerySourceTypeId == undefined || enquiryData[i].enquerySourceTypeId == null) {
                //     modObj["enquerySourceTypeId"] = "";
                // } else {
                //     modObj["enquerySourceTypeId"] = enquiryData[i].enquerySourceTypeId;
                // }
                // if (enquiryData[i].enquerySourceId == undefined || enquiryData[i].enquerySourceId == null) {
                //     modObj["enquerySourceId"] = "";
                // } else {
                //     modObj["enquerySourceId"] = enquiryData[i].enquerySourceId;
                // }
                // if (enquiryData[i].ownerFirstName == undefined || enquiryData[i].ownerFirstName == null) {
                //     modObj["ownerFirstName"] = "";
                // } else {
                //     modObj["ownerFirstName"] = enquiryData[i].ownerFirstName;
                // }
                // if (enquiryData[i].ownerLastName == undefined || enquiryData[i].ownerLastName == null) {
                //     modObj["ownerLastName"] = "";
                // } else {
                //     modObj["ownerLastName"] = enquiryData[i].ownerLastName;
                // }
                if (enquiryData[i].ownerPhoneNo == undefined || enquiryData[i].ownerPhoneNo == null) {
                    modObj["ownerPhoneNo"] = "";
                } else {
                    modObj["ownerPhoneNo"] = enquiryData[i].ownerPhoneNo;
                }
                if (enquiryData[i].ownerEmail == undefined || enquiryData[i].ownerEmail == null) {
                    modObj["ownerEmail"] = "";
                } else {
                    modObj["ownerEmail"] = enquiryData[i].ownerEmail;
                }
                if (enquiryData[i].createdByName == undefined || enquiryData[i].createdByName == null) {
                    modObj["businessName"] = "";
                } else {
                    modObj["businessName"] = enquiryData[i].createdByName;
                }
                // if (enquiryData[i].address == undefined || enquiryData[i].address == null) {
                //     modObj["businessAddress"] = "";
                // } else {
                //     modObj["businessAddress"] = enquiryData[i].address;
                // }
                // if (enquiryData[i].ownerLastName == undefined || enquiryData[i].ownerLastName == null) {
                //     modObj["ownerLastName"] = "";
                // } else {
                //     modObj["ownerLastName"] = enquiryData[i].ownerLastName;
                // }
                // if (enquiryData[i].businessPhoneNo == undefined || enquiryData[i].businessPhoneNo == null) {
                //     modObj["businessPhoneNo"] = "";
                // } else {
                //     modObj["businessPhoneNo"] = enquiryData[i].businessPhoneNo;
                // }
                if (enquiryData[i].ownerEmail == undefined || enquiryData[i].ownerEmail == null) {
                    modObj["businessEmail"] = "";
                } else {
                    modObj["businessEmail"] = enquiryData[i].ownerEmail;
                }
                if (enquiryData[i].address == undefined || enquiryData[i].address == null) {
                    modObj["address"] = "";
                } else {
                    modObj["address"] = enquiryData[i].address;
                }
                // if (enquiryData[i].typeStatus == undefined || enquiryData[i].typeStatus == null) {
                //     modObj["typeStatus"] = "";
                // } else {
                //     modObj["typeStatus"] = enquiryData[i].typeStatus;
                // }
                // if (enquiryData[i].countryId == undefined || enquiryData[i].countryId == null) {
                //     modObj["countryId"] = "";
                // } else {
                //     modObj["countryId"] = enquiryData[i].countryId;
                // }
                // if (enquiryData[i].stateId == undefined || enquiryData[i].stateId == null) {
                //     modObj["stateId"] = "";
                // } else {
                //     modObj["stateId"] = enquiryData[i].stateId;
                // }
                // if (enquiryData[i].cityId == undefined || enquiryData[i].cityId == null) {
                //     modObj["cityId"] = "";
                // } else {
                //     modObj["cityId"] = enquiryData[i].cityId;
                // }
                // if (enquiryData[i].cityVillage == undefined || enquiryData[i].cityVillage == null) {
                //     modObj["cityVillage"] = "";
                // } else {
                //     modObj["cityVillage"] = enquiryData[i].cityVillage;
                // }
                // if (enquiryData[i].zoneId == undefined || enquiryData[i].zoneId == null) {
                //     modObj["zoneId"] = "";
                // } else {
                //     modObj["zoneId"] = enquiryData[i].zoneId;
                // }

                // if (enquiryData[i].pinCode == undefined || enquiryData[i].pinCode == null) {
                //     modObj["pinCode"] = "";
                // } else {
                //     modObj["pinCode"] = enquiryData[i].pinCode;
                // }
                // if (enquiryData[i].notes == undefined || enquiryData[i].notes == null) {
                //     modObj["notes"] = "";
                // } else {
                //     modObj["notes"] = enquiryData[i].notes;
                // }
                // if (enquiryData[i].empTypeId == undefined || enquiryData[i].empTypeId == null) {
                //     modObj["empTypeId"] = "";
                // } else {
                //     modObj["empTypeId"] = enquiryData[i].empTypeId;
                // }
                // if (enquiryData[i].assignTo == undefined || enquiryData[i].assignTo == null) {
                //     modObj["assignTo"] = "";
                // } else {
                //     modObj["assignTo"] = enquiryData[i].assignTo;
                // }
                // if (enquiryData[i].assignDatetime == undefined || enquiryData[i].assignDatetime == null) {
                //     modObj["assignDatetime"] = "";
                // } else {
                //     modObj["assignDatetime"] = enquiryData[i].assignDatetime;
                // }
                if (enquiryData[i].approvedStatus == undefined || enquiryData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = enquiryData[i].approvedStatus == "0" ? "Not Approved" : "Approved";
                }
                if (enquiryData[i].numberOfEmployee == undefined || enquiryData[i].numberOfEmployee == null) {
                    modObj["numberOfEmployee"] = "";
                } else {
                    modObj["numberOfEmployee"] = enquiryData[i].numberOfEmployee;
                }
                // if (enquiryData[i].approvedDatetime == undefined || enquiryData[i].approvedDatetime == null) {
                //     modObj["approvedDatetime"] = "";
                // } else {
                //     modObj["approvedDatetime"] = enquiryData[i].approvedDatetime;
                // }
                // if (enquiryData[i].approvedRemark == undefined || enquiryData[i].approvedRemark == null) {
                //     modObj["approvedRemark"] = "";
                // } else {
                //     modObj["approvedRemark"] = enquiryData[i].approvedRemark;
                // }
                if (enquiryData[i].createdAt == undefined || enquiryData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = enquiryData[i].createdAt;
                }
                // if (enquiryData[i].modifiedAt == undefined || enquiryData[i].modifiedAt == null) {
                //     modObj["modifiedAt"] = "";
                // } else {
                //     modObj["modifiedAt"] = enquiryData[i].modifiedAt;
                // }
                // if (enquiryData[i].enquerySourceName == undefined || enquiryData[i].enquerySourceName == null) {
                //     modObj["enquerySourceName"] = "N/A";
                // } else {
                //     modObj["enquerySourceName"] = enquiryData[i].enquerySourceName;
                // }
                // if (enquiryData[i].countryName == undefined || enquiryData[i].countryName == null) {
                //     modObj["countryName"] = "";
                // } else {
                //     modObj["countryName"] = enquiryData[i].countryName;
                // }
                // if (enquiryData[i].stateName == undefined || enquiryData[i].stateName == null) {
                //     modObj["stateName"] = "";
                // } else {
                //     modObj["stateName"] = enquiryData[i].stateName;
                // }
                // if (enquiryData[i].zoneName == undefined || enquiryData[i].zoneName == null) {
                //     modObj["zoneName"] = "";
                // } else {
                //     modObj["zoneName"] = enquiryData[i].zoneName;
                // }
                // if (enquiryData[i].assignToUserName == undefined || enquiryData[i].assignToUserName == null) {
                //     modObj["assignToUserName"] = "";
                // } else {
                //     modObj["assignToUserName"] = enquiryData[i].assignToUserName;
                // }
                // if (enquiryData[i].employeeTypeName == undefined || enquiryData[i].employeeTypeName == null) {
                //     modObj["employeeTypeName"] = "";
                // } else {
                //     modObj["employeeTypeName"] = enquiryData[i].employeeTypeName;
                // }
                // if (enquiryData[i].districtName == undefined || enquiryData[i].districtName == null) {
                //     modObj["districtName"] = "";
                // } else {
                //     modObj["districtName"] = enquiryData[i].districtName;
                // }


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

export function modCustomerData(data) {
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