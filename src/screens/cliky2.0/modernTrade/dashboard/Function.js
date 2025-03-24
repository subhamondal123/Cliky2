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

export function modOutletData(data) {
    var respData = { "outletList": [] };
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].hmName == undefined || data[i].hmName == null) {
                modObj["hmName"] = "";
            } else {
                modObj["hmName"] = data[i].hmName;
            }
            if (data[i].hierarchyDataId == undefined || data[i].hierarchyDataId == null) {
                modObj["hierarchyDataId"] = "";
            } else {
                modObj["hierarchyDataId"] = data[i].hierarchyDataId;
            }
            if (data[i].hierarchyTypeId == undefined || data[i].hierarchyTypeId == null) {
                modObj["hierarchyTypeId"] = "";
            } else {
                modObj["hierarchyTypeId"] = data[i].hierarchyTypeId;
            }
            if (data[i].SlNo == undefined || data[i].SlNo == null) {
                modObj["SlNo"] = "";
            } else {
                modObj["SlNo"] = data[i].SlNo;
            }
            if (data[i].hmTypDesc == undefined || data[i].hmTypDesc == null) {
                modObj["hmTypDesc"] = "";
            } else {
                modObj["hmTypDesc"] = data[i].hmTypDesc;
            }
            


            modObj["check"] = false;
            respData.outletList.push(modObj);
        }

    }

    return respData;
}