import { Toaster } from "../../../services/common-view-function";

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

export function sourceTypeModifyData(sourceType) {
    let modArrData = [];
    if (sourceType && sourceType.length > 0) {
        for (let i = 0; i < sourceType.length; i++) {
            modArrData.push({
                id: sourceType[i].id,
                name: sourceType[i].leadSourceTypeName,
                check: false,
            })
        }
    }
    return modArrData;
}

export function modifyStatgeArr(data) {
    let reqData = [];
    if (data.length > 0) {
        reqData = data;
        for (let i = 0; i < reqData.length; i++) {
            reqData[i]["id"] = reqData[i].salesStageId;
            reqData[i]["name"] = reqData[i].salesStageName;
            reqData[i]["sequence"] = reqData[i].sequence;
            reqData[i]["percentage"] = reqData[i].percentage;
        }
    }
    return reqData;
}

export function modifyStatusData(statusArr) {
    let modArrData = [];
    if (statusArr && statusArr.length > 0) {
        for (let i = 0; i < statusArr.length; i++) {
            modArrData.push({
                id: statusArr[i].id,
                name: statusArr[i].name,
                check: false,
            })
        }
    }
    return modArrData;
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

export function enquirySourceModifyData(data) {
    var respData = { "enquiryTypeList": [] };
    if (data) {

        let enquiryTypeData = data.enquiryType;


        if (enquiryTypeData && enquiryTypeData.length > 0) {
            for (let i = 0; i < enquiryTypeData.length; i++) {
                let modObj = {};
                if (enquiryTypeData[i].contactTypeId == undefined || enquiryTypeData[i].contactTypeId == null) {
                    modObj["contactTypeId"] = "";
                } else {
                    modObj["contactTypeId"] = enquiryTypeData[i].contactTypeId;
                }
                if (enquiryTypeData[i].contactTypeName == undefined || enquiryTypeData[i].contactTypeName == null) {
                    modObj["contactTypeName"] = "";
                } else {
                    modObj["contactTypeName"] = enquiryTypeData[i].contactTypeName;
                }
                if (enquiryTypeData[i].createdAt == undefined || enquiryTypeData[i].createdAt == null) {
                    modObj["createdAt"] = 0;
                } else {
                    modObj["createdAt"] = enquiryTypeData[i].createdAt;
                }
                if (enquiryTypeData[i].mstSlNo == undefined || enquiryTypeData[i].mstSlNo == null) {
                    modObj["mstSlNo"] = "";
                } else {
                    modObj["mstSlNo"] = enquiryTypeData[i].mstSlNo;
                }
                if (enquiryTypeData[i].masterContactTypeName == undefined || enquiryTypeData[i].masterContactTypeName == null) {
                    modObj["masterContactTypeName"] = "";
                } else {
                    modObj["masterContactTypeName"] = enquiryTypeData[i].masterContactTypeName;
                }

                modObj["check"] = false;
                respData.enquiryTypeList.push(modObj);
            }
        }
    }
    return (respData);
}

export function modifyEnquiryTypeArrData(enquiryTypeArr) {
    let modArrData = [];
    if (enquiryTypeArr && enquiryTypeArr.length > 0) {
        for (let i = 0; i < enquiryTypeArr.length; i++) {
            modArrData.push({
                id: enquiryTypeArr[i].contactTypeId,
                name: enquiryTypeArr[i].contactTypeName,
                check: false,
            })
        }
    }
    return modArrData;
}

export function validateProductHeirarchyData(data) {
    let errorCount = 0;

    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].hierarchyDataId == undefined || data[i].hierarchyDataId == null || data[i].hierarchyDataId.length == 0) {
                Toaster.ShortCenterToaster("Please select Product!");
                errorCount++;
            }
        }
    }

    if (errorCount == 0) {
        return true;
    } else {
        return false;
    }
}

export function modProductHeirarchyData(data) {
    let respData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].hierarchyDataId == undefined || data[i].hierarchyDataId == null || data[i].hierarchyDataId.length == 0) {
                modObj["hierarchyDataId"] = "";
            } else {
                modObj["hierarchyDataId"] = data[i].hierarchyDataId;
            }
            if (data[i].hierarchyTypeId == undefined || data[i].hierarchyTypeId == null || data[i].hierarchyTypeId.length == 0) {
                modObj["hierarchyTypeId"] = "";
            } else {
                modObj["hierarchyTypeId"] = data[i].hierarchyTypeId;
            }
            // modObj["price"] = "0";
            // modObj["quantity"] = "0";
            // modObj["discount"] = "0";
            // modObj["unit"] = "0"
            respData.push(modObj);
        }
    }
    return respData;
}