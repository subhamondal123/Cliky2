
export function modifyData(data) {
    let respData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].activityId == undefined || data[i].activityId == null || data[i].activityId.length == "0") {
                modObj["id"] = "";
            } else {
                modObj["id"] = data[i].activityId;
            }
            if (data[i].activityName == undefined || data[i].activityName == null || data[i].activityName.length == "0") {
                modObj["name"] = "";
            } else {
                modObj["name"] = data[i].activityName;
            }
            respData.push(modObj);
        }
    }
    return respData;
}

