export function modifyCategoryData(arr) {
    let respData = [];
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let modObj = {};
            if (arr[i].id == undefined || arr[i].id == null) {
                modObj["id"] = ""
            } else {
                modObj["id"] = arr[i].id
            }
            if (arr[i].categoryname == undefined || arr[i].categoryname == null) {
                modObj["text"] = ""
            } else {
                modObj["text"] = arr[i].categoryname
            }

            modObj["check"] = false;

            respData.push(modObj)
        }
    }

    return respData;
}