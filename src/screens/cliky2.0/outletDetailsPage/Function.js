
export function modListData(data) {
    var respData = { list: [] }
    let mainData = data.data
    if (mainData.length > 0) {
        for (let i = 0; i < mainData.length; i++) {
            let modObj = {};
            if (mainData[i].giftTypeId == undefined || mainData[i].giftTypeId == null) {
                modObj["id"] = "";
            } else {
                modObj["id"] = mainData[i].giftTypeId;
            }
            if (mainData[i].giftName == undefined || mainData[i].giftName == null) {
                modObj["name"] = "";
            } else {
                modObj["name"] = mainData[i].giftName;
            }
            if (mainData[i].stockQty == undefined || mainData[i].stockQty == null) {
                modObj["qty"] = "";
            } else {
                modObj["qty"] = mainData[i].stockQty.toString();
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

            modObj["remark"] = ""
            modObj["newQuantity"] = ""
            
            
            respData.list.push(modObj)
        }
    }
    return respData
}