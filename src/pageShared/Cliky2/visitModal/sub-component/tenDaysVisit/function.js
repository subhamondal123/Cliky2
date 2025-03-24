
export function orderHistoryModifyData(data) {
    var respData = { "totalCount": 0, "pjpList": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.billcount;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].orderNumber == undefined || pjpData[i].orderNumber == null) {
                    modObj["recordNumber"] = "";
                } else {
                    modObj["recordNumber"] = pjpData[i].orderNumber;
                }
                if (pjpData[i].createdAt == undefined || pjpData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = pjpData[i].createdAt;
                }
                if (pjpData[i].deliveryStatus == undefined || pjpData[i].deliveryStatus == null) {
                    modObj["deliveryStatus"] = "";
                } else {
                    modObj["deliveryStatus"] = pjpData[i].deliveryStatus;
                }
                if (pjpData[i].totalPrice == undefined || pjpData[i].totalPrice == null) {
                    modObj["totalPrice"] = "";
                } else {
                    modObj["totalPrice"] = pjpData[i].totalPrice;
                }

                if (pjpData[i].approvedStatus == undefined || pjpData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = pjpData[i].approvedStatus;
                }

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.pjpList.push(modObj);
            }
        }
    }
    return (respData);
}
