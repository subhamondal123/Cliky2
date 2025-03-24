import { DateConvert } from "../../../services/common-view-function";

export function pjpModifyData(data) {
    var respData = { "totalCount": 0, "pjpList": [] };
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
                    modObj["dealerText"] = "";
                } else {
                    modObj["dealerText"] = pjpData[i].contactTypeName;
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
                if (pjpData[i].status == undefined || pjpData[i].status == null) {
                    modObj["status"] = "2";
                } else {
                    modObj["status"] = pjpData[i].status;
                }
                if (pjpData[i].orderData == undefined || pjpData[i].orderData == null || pjpData[i].orderData.length == 0) {
                    modObj["orderData"] = [];
                } else {
                    modObj["orderData"] = pjpData[i].orderData;
                }

                modObj["orderPrice"] = pjpData[i].orderData.length == 0 ? 0 : pjpData[i].orderData[0].orderActtualBillAmount
                modObj["orderPeriod"] = pjpData[i].orderData.length == 0 ? 0 : getOrderPeriod(pjpData[i].orderData[0].createdAt)
                modObj["lastOrderDate"] = pjpData[i].orderData.length == 0 ? "N/A" : DateConvert.formatDDfullMonthYYYY(pjpData[i].orderData[0].createdAt)

                // modObj["orderLocationModData"] = pjpData[i].locationData.length > 0 ? JSON.parse(CommonFunctions.getDesiredLocationFormat(pjpData[i].locationData)) : []

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.pjpList.push(modObj);
            }
        }
    }
    return (respData);
}

export function getOrderPeriod(createDate) {
    let currentDate = new Date();
    let desiredDate = new Date(createDate);

    // Calculate the difference in milliseconds
    var timeDiff = Math.abs(desiredDate.getTime() - currentDate.getTime());

    // Convert milliseconds to days
    var dayCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return (dayCount)
}

export function modifyStatisticData(obj) {
    let respData = {
        amount: "0",
        todaysOrder: "0",
        quantity: "0",
        approved: "0",
        partial: "0",
        pending: "0",
        targetAchievementpercentage: "0",
        targerQuantity: "0",
        tillDateOrderQuantity: "0",
        totalAmount: "0"
    }
    if (obj && Object.keys(obj).length > 0) {
        if (obj.amount == undefined || obj.amount == null) {
            respData.amount = "0"
        } else {
            respData.amount = obj.amount
        }
        if (obj.todaysOrder == undefined || obj.todaysOrder == null) {
            respData.todaysOrder = "0"
        } else {
            respData.todaysOrder = obj.todaysOrder
        }
        if (obj.quantity == undefined || obj.quantity == null) {
            respData.quantity = "0"
        } else {
            respData.quantity = obj.quantity
        }
        if (obj.approved == undefined || obj.approved == null) {
            respData.approved = "0"
        } else {
            respData.approved = obj.approved
        }
        if (obj.partial == undefined || obj.partial == null) {
            respData.partial = "0"
        } else {
            respData.partial = obj.partial
        }
        if (obj.pending == undefined || obj.pending == null) {
            respData.pending = "0"
        } else {
            respData.pending = obj.pending
        }
        if (obj.targetAchievementpercentage == undefined || obj.targetAchievementpercentage == null) {
            respData.targetAchievementpercentage = "0"
        } else {
            respData.targetAchievementpercentage = obj.targetAchievementpercentage
        }
        if (obj.targerQuantity == undefined || obj.targerQuantity == null) {
            respData.targerQuantity = "0"
        } else {
            respData.targerQuantity = obj.targerQuantity
        }
        if (obj.tillDateOrderQuantity == undefined || obj.tillDateOrderQuantity == null) {
            respData.tillDateOrderQuantity = "0"
        } else {
            respData.tillDateOrderQuantity = obj.tillDateOrderQuantity
        }
        if (obj.totalAmount == undefined || obj.totalAmount == null) {
            respData.totalAmount = "0"
        } else {
            respData.totalAmount = obj.totalAmount
        }
    }

    return respData
}