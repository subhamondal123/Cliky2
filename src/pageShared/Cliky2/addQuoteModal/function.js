
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

export function modifyLocationMappedData(mainData, listData) {
    let finalData = [];
    if (mainData && mainData.length > 0) {
        const sortedLocationMapData = mainData.sort((a, b) => a.SlNo - b.SlNo);
        finalData = sortedLocationMapData.map(mainItem => {
            const matchingListItems = listData.filter(listItem => listItem.slNo === mainItem.SlNo);
            return {
                ...mainItem,
                fileItem: matchingListItems
            };
        });
    }
    return finalData;
}

export function modQuoteTypeData(data) {
    let respData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].id == undefined || data[i].id == null || data[i].id.length == "0") {
                modObj["id"] = "";
            } else {
                modObj["id"] = data[i].id;
            }
            if (data[i].typeName == undefined || data[i].typeName == null || data[i].typeName.length == "0") {
                modObj["name"] = "";
            } else {
                modObj["name"] = data[i].typeName;
            }
            respData.push(modObj);
        }
    }
    return respData;
}