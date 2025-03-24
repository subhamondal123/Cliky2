export function pjpModifyData(data) {
    var respData = { "totalCount": 0, "orderList": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].contactId == undefined || pjpData[i].contactId == null) {
                    modObj["userId"] = "";
                } else {
                    modObj["userId"] = pjpData[i].contactId;
                }
                if (pjpData[i].orderNumber == undefined || pjpData[i].orderNumber == null) {
                    modObj["recordNumber"] = "";
                } else {
                    modObj["recordNumber"] = pjpData[i].orderNumber;
                }
                if (pjpData[i].orderActtualBillAmount == undefined || pjpData[i].orderActtualBillAmount == null) {
                    modObj["totalPrice"] = "";
                } else {
                    modObj["totalPrice"] = pjpData[i].orderActtualBillAmount;
                }
                if (pjpData[i].createdAt == undefined || pjpData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = pjpData[i].createdAt;
                }
                if (pjpData[i].contactName == undefined || pjpData[i].contactName == null) {
                    modObj["userName"] = "";
                } else {
                    modObj["userName"] = pjpData[i].contactName;
                }
                if (pjpData[i].contactTypeName == undefined || pjpData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "";
                } else {
                    modObj["contactTypeName"] = pjpData[i].contactTypeName;
                }
                if (pjpData[i].orderStatus == undefined || pjpData[i].orderStatus == null) {
                    modObj["deliveryStatus"] = "";
                } else {
                    modObj["deliveryStatus"] = pjpData[i].orderStatus;
                }
                if (pjpData[i].profilePic == undefined || pjpData[i].profilePic == null) {
                    modObj["profileImg"] = "";
                } else {
                    modObj["profileImg"] = pjpData[i].profilePic;
                }
                if (pjpData[i].approvedStatus == undefined || pjpData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = pjpData[i].approvedStatus;
                }
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.orderList.push(modObj);
            }
        }
    }
    return (respData);
}