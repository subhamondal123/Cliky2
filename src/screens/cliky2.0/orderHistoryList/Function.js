
export function orderHistoryModifyData(data,props) {
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

                modObj["userId"] = props.data.userId;
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.pjpList.push(modObj);
            }
        }
    }
    return (respData);
}


export function modifyProfileData(objData) {
    // transactionType == 3 -> primary, 2 -> secondary
    let obj = {
        cartCount: objData.totalItemCount,
        title: objData.customerName == null || objData.customerName == undefined ? "" : objData.customerName,
        profileImg: objData.profilePic == null || objData.profilePic == undefined ? "" : objData.profilePic,
        userId: objData.customerId == null || objData.customerId == undefined ? "" : objData.customerId,
        customerType: objData.custType == null || objData.custType == undefined ? "" : objData.custType,
    }

    return obj
}