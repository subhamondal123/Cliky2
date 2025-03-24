export function organizationModifyData(data) {
    var respData = { "totalCount": 0, "organizationList": [] };
    if (data) {
        let organizationData = data.data;
        respData.totalCount = data.count;
        if (organizationData && organizationData.length > 0) {
            for (let i = 0; i < organizationData.length; i++) {
                let modObj = {};
                if (organizationData[i].organizationId == undefined || organizationData[i].organizationId == null) {
                    modObj["organizationId"] = "";
                } else {
                    modObj["organizationId"] = organizationData[i].organizationId;
                }
                if (organizationData[i].organizationName == undefined || organizationData[i].organizationName == null) {
                    modObj["organizationName"] = "";
                } else {
                    modObj["organizationName"] = organizationData[i].organizationName;
                }
                if (organizationData[i].isFavorite == undefined || organizationData[i].isFavorite == null) {
                    modObj["isFavorite"] = "";
                } else {
                    modObj["isFavorite"] = organizationData[i].isFavorite;
                }
                if (organizationData[i].ownerName == undefined || organizationData[i].ownerName == null) {
                    modObj["ownerName"] = 0;
                } else {
                    modObj["ownerName"] = organizationData[i].ownerName;
                }
                if (organizationData[i].contactTypeId == undefined || organizationData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = organizationData[i].contactTypeId;
                }
                if (organizationData[i].contactTypeName == undefined || organizationData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "";
                } else {
                    modObj["contactTypeName"] = organizationData[i].contactTypeName;
                }
                if (organizationData[i].stateId == undefined || organizationData[i].stateId == null) {
                    modObj["stateId"] = "";
                } else {
                    modObj["stateId"] = organizationData[i].stateId;
                }
                if (organizationData[i].stateName == undefined || organizationData[i].stateName == null) {
                    modObj["stateName"] = "";
                } else {
                    modObj["stateName"] = organizationData[i].stateName;
                }
                if (organizationData[i].phone == undefined || organizationData[i].phone == null) {
                    modObj["phone"] = "";
                } else {
                    modObj["phone"] = organizationData[i].phone;
                }
                if (organizationData[i].cityName == undefined || organizationData[i].cityName == null) {
                    modObj["cityName"] = "";
                } else {
                    modObj["cityName"] = organizationData[i].cityName;
                }
                if (organizationData[i].status == undefined || organizationData[i].status == null) {
                    modObj["status"] = "";
                } else {
                    modObj["status"] = organizationData[i].status;
                }
                if (organizationData[i].hmUpperNodes == undefined || organizationData[i].hmUpperNodes == null) {
                    modObj["location"] = [];
                } else {
                    modObj["location"] = modifyLocationData(organizationData[i].hmUpperNodes);
                }
                if (organizationData[i].isConverted == undefined || organizationData[i].isConverted == null) {
                    modObj["isConverted"] = "0";
                } else {
                    modObj["isConverted"] = organizationData[i].isConverted;
                }
                if (organizationData[i].approvedStatus == undefined || organizationData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "0";
                } else {
                    modObj["approvedStatus"] = organizationData[i].approvedStatus;
                }
                


                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.organizationList.push(modObj);
            }
        }
    }
    return (respData);
}

modifyLocationData = (obj) => {
    const transformedArray = Object.keys(obj).map(key => ({ key, name: obj[key] }));

    return transformedArray

}

// convert list data
export function convertListData(organizationData, item) {
    if (organizationData && organizationData.length > 0) {
        for (let i = 0; i < organizationData.length; i++) {
            if (organizationData[i].organizationId == item.organizationId) {
                organizationData[i].check = !organizationData[i].check;
            } else {
                organizationData[i].check = false;
            }
        }
    }
    return organizationData;
}

export function checkedListData(organizationData, item) {
    if (organizationData && organizationData.length > 0) {
        for (let i = 0; i < organizationData.length; i++) {
            if (organizationData[i].organizationId == item.organizationId) {
                organizationData[i].tick = !organizationData[i].tick;
            } else {
                organizationData[i].tick = false;
            }
        }
    }
    return organizationData;
}