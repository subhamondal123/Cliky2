export function modGiftTypeData(data) {
    var respData = { list: [] }
    let mainData = data.data
    if (mainData && mainData.length > 0) {
        for (let i = 0; i < mainData.length; i++) {
            let modObj = {};
            if (mainData[i].giftTypeId == undefined || mainData[i].giftTypeId == null) {
                modObj["id"] = "";
            } else {
                modObj["id"] = mainData[i].giftTypeId;
            }
            if (mainData[i].giftsTypeName == undefined || mainData[i].giftsTypeName == null) {
                modObj["name"] = "";
            } else {
                modObj["name"] = mainData[i].giftsTypeName;
            }

            respData.list.push(modObj)
        }
    }
    return respData
}

export function modGiftCategoryData(data) {
    var respData = { list: [] }
    let mainData = data.data
    if (mainData && mainData.length > 0) {
        for (let i = 0; i < mainData.length; i++) {
            let modObj = {};
            if (mainData[i].giftCategoryId == undefined || mainData[i].giftCategoryId == null) {
                modObj["id"] = "";
            } else {
                modObj["id"] = mainData[i].giftCategoryId;
            }
            if (mainData[i].giftCategoryName == undefined || mainData[i].giftCategoryName == null) {
                modObj["name"] = "";
            } else {
                modObj["name"] = mainData[i].giftCategoryName;
            }

            respData.list.push(modObj)
        }
    }
    return respData
}

export function modListData(data) {
    var respData = { list: [] }
    let mainData = data.data
    if (mainData.length > 0) {
        for (let i = 0; i < mainData.length; i++) {
            let modObj = {};
            if (mainData[i].stockId == undefined || mainData[i].stockId == null) {
                modObj["id"] = "";
            } else {
                modObj["id"] = mainData[i].stockId;
            }
            if (mainData[i].giftName == undefined || mainData[i].giftName == null) {
                modObj["name"] = "";
            } else {
                modObj["name"] = mainData[i].giftName;
            }

            if (mainData[i].requestQty == undefined || mainData[i].requestQty == null) {
                modObj["requestQty"] = "";
            } else {
                modObj["requestQty"] = mainData[i].requestQty;
            }
            if (mainData[i].stockQty == undefined || mainData[i].stockQty == null) {
                modObj["qty"] = "";
            } else {
                modObj["qty"] = mainData[i].stockQty;
            }
            if (mainData[i].giftDesc == undefined || mainData[i].giftDesc == null) {
                modObj["desc"] = "";
            } else {
                modObj["desc"] = mainData[i].giftDesc;
            }
            if (mainData[i].approvedStatus == undefined || mainData[i].approvedStatus == null) {
                modObj["status"] = "";
            } else {
                modObj["status"] = mainData[i].approvedStatus;
            }

            if (mainData[i].requesteOn == undefined || mainData[i].requesteOn == null) {
                modObj["date"] = "";
            } else {
                modObj["date"] = mainData[i].requesteOn;
            }




            respData.list.push(modObj)
        }
    }
    return respData
}