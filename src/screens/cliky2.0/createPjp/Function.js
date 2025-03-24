
export function customerModifyData(data) {
    var respData = { "totalCount": 0, "customerList": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].customerId == undefined || pjpData[i].customerId == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = pjpData[i].customerId;
                }
                if (pjpData[i].organizationId == undefined || pjpData[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = pjpData[i].organizationId;
                }
                if (pjpData[i].customerName == undefined || pjpData[i].customerName == null) {
                    modObj["customerName"] = "N/A";
                } else {
                    modObj["customerName"] = pjpData[i].customerName;
                }

                if (pjpData[i].custBusinessName == undefined || pjpData[i].custBusinessName == null) {
                    modObj["custBusinessName"] = "";
                } else {
                    modObj["custBusinessName"] = pjpData[i].custBusinessName;
                }
                if (pjpData[i].name == undefined || pjpData[i].name == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = pjpData[i].name;
                }
                if (pjpData[i].ERPCode == undefined || pjpData[i].ERPCode == null || pjpData[i].ERPCode == "") {
                    modObj["ERPCode"] = "N/A";
                } else {
                    modObj["ERPCode"] = pjpData[i].ERPCode;
                }
                if (pjpData[i].isExpired == undefined || pjpData[i].isExpired == null) {
                    modObj["isExpired"] = "";
                } else {
                    modObj["isExpired"] = pjpData[i].isExpired;
                }
                if (pjpData[i].masterContactTypesName == undefined || pjpData[i].masterContactTypesName == null) {
                    modObj["masterContactTypesName"] = "";
                } else {
                    modObj["masterContactTypesName"] = pjpData[i].masterContactTypesName;
                }
                if (pjpData[i].phoneNumber == undefined || pjpData[i].phoneNumber == null) {
                    modObj["phone"] = "";
                } else {
                    modObj["phone"] = pjpData[i].phoneNumber;
                }
                if (pjpData[i].zoneName == undefined || pjpData[i].zoneName == null) {
                    modObj["zoneName"] = "";
                } else {
                    modObj["zoneName"] = pjpData[i].zoneName;
                }
                if (pjpData[i].zoneId == undefined || pjpData[i].zoneId == null) {
                    modObj["zoneId"] = "";
                } else {
                    modObj["zoneId"] = pjpData[i].zoneId;
                }
                if (pjpData[i].cityId == undefined || pjpData[i].cityId == null) {
                    modObj["cityId"] = "";
                } else {
                    modObj["cityId"] = pjpData[i].cityId;
                }
                if (pjpData[i].contactTypeName == undefined || pjpData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "N/A";
                } else {
                    modObj["contactTypeName"] = pjpData[i].contactTypeName;
                }
                if (pjpData[i].contactTypeId == undefined || pjpData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = pjpData[i].contactTypeId;
                }
                if (pjpData[i].visitStatusName == undefined || pjpData[i].visitStatusName == null) {
                    modObj["visitStatusName"] = "";
                } else {
                    modObj["visitStatusName"] = pjpData[i].visitStatusName;
                }
                if (pjpData[i].isConvertion == undefined || pjpData[i].isConvertion == null) {
                    modObj["isConvertion"] = 0;
                } else {
                    modObj["isConvertion"] = pjpData[i].isConvertion;
                }

                if (pjpData[i].email == undefined || pjpData[i].email == null) {
                    modObj["email"] = "";
                } else {
                    modObj["email"] = pjpData[i].email;
                }
                if (pjpData[i].isInfulencer == undefined || pjpData[i].isInfulencer == null) {
                    modObj["isInfulencer"] = 0;
                } else {
                    modObj["isInfulencer"] = pjpData[i].isInfulencer;
                }
                if (pjpData[i].userId == undefined || pjpData[i].userId == null) {
                    modObj["userId"] = 0;
                } else {
                    modObj["userId"] = pjpData[i].userId;
                }
                if (pjpData[i].organizationName == undefined || pjpData[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = pjpData[i].organizationName;
                }
                if (pjpData[i].stateId == undefined || pjpData[i].stateId == null) {
                    modObj["stateId"] = "";
                } else {
                    modObj["stateId"] = pjpData[i].stateId;
                }
                if (pjpData[i].profilePic == undefined || pjpData[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = pjpData[i].profilePic;
                }
                if (pjpData[i].isProject == undefined || pjpData[i].isProject == null) {
                    modObj["isProject"] = "";
                } else {
                    modObj["isProject"] = pjpData[i].isProject;
                }

                if (pjpData[i].ownerName == undefined || pjpData[i].ownerName == null) {
                    modObj["ownerName"] = "";
                } else {
                    modObj["ownerName"] = pjpData[i].ownerName;
                }
                if (pjpData[i].approvedStatus == undefined || pjpData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = pjpData[i].approvedStatus;
                }

                if (pjpData[i].hmUpperNodes == undefined || pjpData[i].hmUpperNodes == null) {
                    modObj["address"] = "";
                } else {
                    modObj["address"] = getAddress(pjpData[i].hmUpperNodes);
                }


                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.customerList.push(modObj);
            }
        }
    }
    return (respData);
}

export function targetModifyData(data) {
    var respData = { "totalCount": 0, "customerList": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].contactId == undefined || pjpData[i].contactId == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = pjpData[i].contactId;
                }
                if (pjpData[i].organizationId == undefined || pjpData[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = pjpData[i].organizationId;
                }
                if (pjpData[i].contactName == undefined || pjpData[i].contactName == null) {
                    modObj["customerName"] = "N/A";
                } else {
                    modObj["customerName"] = pjpData[i].contactName;
                }

                if (pjpData[i].custBusinessName == undefined || pjpData[i].custBusinessName == null) {
                    modObj["custBusinessName"] = "";
                } else {
                    modObj["custBusinessName"] = pjpData[i].custBusinessName;
                }
                if (pjpData[i].name == undefined || pjpData[i].name == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = pjpData[i].name;
                }
                if (pjpData[i].ERPCode == undefined || pjpData[i].ERPCode == null || pjpData[i].ERPCode == "") {
                    modObj["ERPCode"] = "N/A";
                } else {
                    modObj["ERPCode"] = pjpData[i].ERPCode;
                }
                if (pjpData[i].isExpired == undefined || pjpData[i].isExpired == null) {
                    modObj["isExpired"] = "";
                } else {
                    modObj["isExpired"] = pjpData[i].isExpired;
                }
                if (pjpData[i].masterContactTypeName == undefined || pjpData[i].masterContactTypeName == null) {
                    modObj["masterContactTypesName"] = "";
                } else {
                    modObj["masterContactTypesName"] = pjpData[i].masterContactTypeName;
                }
                if (pjpData[i].phoneNumber == undefined || pjpData[i].phoneNumber == null) {
                    modObj["phone"] = "";
                } else {
                    modObj["phone"] = pjpData[i].phoneNumber;
                }
                if (pjpData[i].zoneName == undefined || pjpData[i].zoneName == null) {
                    modObj["zoneName"] = "";
                } else {
                    modObj["zoneName"] = pjpData[i].zoneName;
                }
                if (pjpData[i].zoneId == undefined || pjpData[i].zoneId == null) {
                    modObj["zoneId"] = "";
                } else {
                    modObj["zoneId"] = pjpData[i].zoneId;
                }
                if (pjpData[i].cityId == undefined || pjpData[i].cityId == null) {
                    modObj["cityId"] = "";
                } else {
                    modObj["cityId"] = pjpData[i].cityId;
                }
                if (pjpData[i].contactTypeName == undefined || pjpData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "N/A";
                } else {
                    modObj["contactTypeName"] = pjpData[i].contactTypeName;
                }
                if (pjpData[i].contactTypeId == undefined || pjpData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = pjpData[i].contactTypeId;
                }
                if (pjpData[i].visitStatusName == undefined || pjpData[i].visitStatusName == null) {
                    modObj["visitStatusName"] = "";
                } else {
                    modObj["visitStatusName"] = pjpData[i].visitStatusName;
                }
                if (pjpData[i].isConverted == undefined || pjpData[i].isConverted == null) {
                    modObj["isConvertion"] = 0;
                } else {
                    modObj["isConvertion"] = pjpData[i].isConverted;
                }

                if (pjpData[i].email == undefined || pjpData[i].email == null) {
                    modObj["email"] = "";
                } else {
                    modObj["email"] = pjpData[i].email;
                }
                if (pjpData[i].isInfulencer == undefined || pjpData[i].isInfulencer == null) {
                    modObj["isInfulencer"] = 0;
                } else {
                    modObj["isInfulencer"] = pjpData[i].isInfulencer;
                }
                if (pjpData[i].userId == undefined || pjpData[i].userId == null) {
                    modObj["userId"] = 0;
                } else {
                    modObj["userId"] = pjpData[i].userId;
                }
                if (pjpData[i].organizationName == undefined || pjpData[i].organizationName == null || pjpData[i].organizationName == "N/A" || pjpData[i].organizationName == "No Organization") {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = pjpData[i].organizationName;
                }
                if (pjpData[i].stateId == undefined || pjpData[i].stateId == null) {
                    modObj["stateId"] = "";
                } else {
                    modObj["stateId"] = pjpData[i].stateId;
                }
                if (pjpData[i].profilePic == undefined || pjpData[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = pjpData[i].profilePic;
                }
                if (pjpData[i].isProject == undefined || pjpData[i].isProject == null) {
                    modObj["isProject"] = "";
                } else {
                    modObj["isProject"] = pjpData[i].isProject;
                }

                if (pjpData[i].ownerName == undefined || pjpData[i].ownerName == null) {
                    modObj["ownerName"] = "";
                } else {
                    modObj["ownerName"] = pjpData[i].ownerName;
                }
                if (pjpData[i].approvedStatus == undefined || pjpData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = pjpData[i].approvedStatus;
                }

                if (pjpData[i].hmUpperNodes == undefined || pjpData[i].hmUpperNodes == null) {
                    modObj["address"] = "";
                } else {
                    modObj["address"] = getAddress(pjpData[i].hmUpperNodes);
                }


                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.customerList.push(modObj);
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

export function modifyDataForApi(data, isCustomer) {
    let resCustomerArr = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            resCustomerArr.push({ type: isCustomer ? "customer" : "target", customerId: data[i].id })
        }
    }
    return resCustomerArr;
}

export function getSelectId(data, item) {
    let index = 0;
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].customerId == item.customerId) {
                index = i;
                break;
            }
        }
    }
    return index;
}