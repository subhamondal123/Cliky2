// for modify the sub data
export function modifySubMappedData(data) {
    let finalData = [];
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            finalData.push({
                "id": data[i].hierarchyDataId,
                "name": data[i].hmName,
                "typeId": data[i].mstHierarchyTypeId,
                "typeName": data[i].hmTypeName,
                "slNo": (i + 1)
            })
        }
    }
    return finalData;
}

export function modifyMapData(arr) {
    let modArr = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].fileItem.length; j++) {
            if (arr[i].selectedId == arr[i].fileItem[j].id) {
                modArr.push(arr[i].fileItem[j]);
                break;
            }
        }
    }
    return modArr;
}