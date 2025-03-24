import { SelectSql } from "../../../services/sql";

export function modifyData(data,) {
    var respData = { "totalCount": 0, "list": [] };
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
                if (pjpData[i].zoneName == undefined || pjpData[i].zoneName == null) {
                    modObj["address"] = "";
                } else {
                    modObj["address"] = pjpData[i].zoneName;
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
                if (pjpData[i].customerAccessTypeName == undefined || pjpData[i].customerAccessTypeName == null) {
                    modObj["customerAccessType"] = "";
                } else {
                    modObj["customerAccessType"] = pjpData[i].customerAccessTypeName;
                }



                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}


export function modifyArrData(data) {
    var respData = [];
    if (data) {
        let pjpData = data;
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
                if (pjpData[i].zoneName == undefined || pjpData[i].zoneName == null) {
                    modObj["address"] = "";
                } else {
                    modObj["address"] = pjpData[i].zoneName;
                }
                if (pjpData[i].ownerName == undefined || pjpData[i].ownerName == null) {
                    modObj["ownerName"] = "";
                } else {
                    modObj["ownerName"] = pjpData[i].ownerName;
                }
                if (pjpData[i].customerAccessTypeName == undefined || pjpData[i].customerAccessTypeName == null) {
                    modObj["customerAccessTypeName"] = "";
                } else {
                    modObj["customerAccessTypeName"] = pjpData[i].customerAccessTypeName;
                }
                if (pjpData[i].customerAccessType == undefined || pjpData[i].customerAccessType == null) {
                    modObj["customerAccessType"] = "";
                } else {
                    modObj["customerAccessType"] = pjpData[i].customerAccessType;
                }



                if (pjpData[i].approvedStatus == undefined || pjpData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = pjpData[i].approvedStatus;
                }
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.push(modObj);
            }
        }
    }
    return (respData);
}

// convert list data
export function convertListData(enquiryData, item) {
    if (enquiryData && enquiryData.length > 0) {
        for (let i = 0; i < enquiryData.length; i++) {
            if (enquiryData[i].id == item.id) {
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
            if (enquiryData[i].id == item.id) {
                enquiryData[i].tick = !enquiryData[i].tick;
            } else {
                enquiryData[i].tick = false;
            }
        }
    }
    return enquiryData;
}


export function modifyCustomerTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].contactTypeId;
            data[i]["name"] = data[i].contactTypeName;
        }
    } else {
        data = [];
    }
    return data;
}

// for offline user access
export async function getOutletListDataFromOffline(stateData, props) {
    let outletListData = await SelectSql.selectOUTLET_LISTByFilter({ search: stateData.searchText, customer: stateData.customerIdArr });
    if (outletListData) {
        stateData.outletList = modifyArrData(outletListData);
    }
    stateData.filterLoader = false;
    stateData.pageLoader = false;
    stateData.listLoader = false;
    stateData.listDataLoader = false;
    stateData.refreshing = false;
    stateData.isApiCall = false;
    return stateData;
}


export function customerModifyData(data) {
    var respData = { "totalCount": 0, "customerList": [] };
    if (data) {
        let customer = data.response.data;
        respData.totalCount = data.response.count;
        if (customer && customer.length > 0) {
            for (let i = 0; i < customer.length; i++) {
                let modObj = {};
                if (customer[i].customerId == undefined || customer[i].customerId == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = customer[i].customerId;
                }
                if (customer[i].organizationId == undefined || customer[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = customer[i].organizationId;
                }
                if (customer[i].customerName == undefined || customer[i].customerName == null) {
                    modObj["customerName"] = "N/A";
                } else {
                    modObj["customerName"] = customer[i].customerName;
                }

                if (customer[i].custBusinessName == undefined || customer[i].custBusinessName == null || customer[i].custBusinessName.length == 0) {
                    modObj["custBusinessName"] = "";
                } else {
                    modObj["custBusinessName"] = customer[i].custBusinessName;
                }
                if (customer[i].name == undefined || customer[i].name == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = customer[i].name;
                }
                if (customer[i].ERPCode == undefined || customer[i].ERPCode == null || customer[i].ERPCode == "") {
                    modObj["ERPCode"] = "N/A";
                } else {
                    modObj["ERPCode"] = customer[i].ERPCode;
                }
                if (customer[i].phoneNumber == undefined || customer[i].phoneNumber == null) {
                    modObj["phone"] = "";
                } else {
                    modObj["phone"] = customer[i].phoneNumber;
                }
                if (customer[i].contactTypeName == undefined || customer[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "N/A";
                } else {
                    modObj["contactTypeName"] = customer[i].contactTypeName;
                }
                if (customer[i].contactTypeId == undefined || customer[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = customer[i].contactTypeId;
                }

                if (customer[i].email == undefined || customer[i].email == null) {
                    modObj["email"] = "";
                } else {
                    modObj["email"] = customer[i].email;
                }
                if (customer[i].isInfulencer == undefined || customer[i].isInfulencer == null) {
                    modObj["isInfulencer"] = 0;
                } else {
                    modObj["isInfulencer"] = customer[i].isInfulencer;
                }
                if (customer[i].organizationName == undefined || customer[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = customer[i].organizationName;
                }
                if (customer[i].stateId == undefined || customer[i].stateId == null) {
                    modObj["stateId"] = "";
                } else {
                    modObj["stateId"] = customer[i].stateId;
                }
                if (customer[i].profilePic == undefined || customer[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = customer[i].profilePic;
                }
                if (customer[i].isProject == undefined || customer[i].isProject == null) {
                    modObj["isProject"] = "";
                } else {
                    modObj["isProject"] = customer[i].isProject;
                }

                if (customer[i].ownerName == undefined || customer[i].ownerName == null) {
                    modObj["ownerName"] = "";
                } else {
                    modObj["ownerName"] = customer[i].ownerName;
                }
                if (customer[i].address == undefined || customer[i].address == null) {
                    modObj["address"] = "";
                } else {
                    modObj["address"] = customer[i].address;
                }
                if (customer[i].approvedStatus == undefined || customer[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = customer[i].approvedStatus;
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
        let target = data.response.data;
        respData.totalCount = data.response.count;
        if (target && target.length > 0) {
            for (let i = 0; i < target.length; i++) {
                let modObj = {};
                if (target[i].contactId == undefined || target[i].contactId == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = target[i].contactId;
                }
                if (target[i].organizationId == undefined || target[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = target[i].organizationId;
                }
                if (target[i].contactName == undefined || target[i].contactName == null) {
                    modObj["customerName"] = "N/A";
                } else {
                    modObj["customerName"] = target[i].contactName;
                }

                if (target[i].masterContactTypeName == undefined || target[i].masterContactTypeName == null) {
                    modObj["masterContactTypesName"] = "";
                } else {
                    modObj["masterContactTypesName"] = target[i].masterContactTypeName;
                }
                if (target[i].phoneNumber == undefined || target[i].phoneNumber == null) {
                    modObj["phone"] = "";
                } else {
                    modObj["phone"] = target[i].phoneNumber;
                }
                if (target[i].contactTypeName == undefined || target[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "N/A";
                } else {
                    modObj["contactTypeName"] = target[i].contactTypeName;
                }
                if (target[i].contactTypeId == undefined || target[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = target[i].contactTypeId;
                }
                if (target[i].isConverted == undefined || target[i].isConverted == null) {
                    modObj["isConvertion"] = 0;
                } else {
                    modObj["isConvertion"] = target[i].isConverted;
                }

                if (target[i].email == undefined || target[i].email == null) {
                    modObj["email"] = "";
                } else {
                    modObj["email"] = target[i].email;
                }
                if (target[i].isInfulencer == undefined || target[i].isInfulencer == null) {
                    modObj["isInfulencer"] = 0;
                } else {
                    modObj["isInfulencer"] = target[i].isInfulencer;
                }
                if (target[i].userId == undefined || target[i].userId == null) {
                    modObj["userId"] = 0;
                } else {
                    modObj["userId"] = target[i].userId;
                }
                if (target[i].organizationName == undefined || target[i].organizationName == null || target[i].organizationName == "N/A" || target[i].organizationName == "No Organization") {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = target[i].organizationName;
                }
                if (target[i].profilePic == undefined || target[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = target[i].profilePic;
                }
                if (target[i].isProject == undefined || target[i].isProject == null) {
                    modObj["isProject"] = "";
                } else {
                    modObj["isProject"] = target[i].isProject;
                }

                if (target[i].approvedStatus == undefined || target[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = target[i].approvedStatus;
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

