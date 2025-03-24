//modify the designation response data

export function modifyDesignationData(arr) {
    let modArr = []
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {}
            if (arr[i].designationId == undefined || arr[i].designationId == null) {
                obj["id"] = ""
            } else {
                obj["id"] = arr[i].designationId
            }
            if (arr[i].userId == undefined || arr[i].userId == null) {
                obj["userId"] = ""
            } else {
                obj["userId"] = arr[i].userId
            }

            if (arr[i].designationId == undefined || arr[i].designationId == null) {
                obj["designationId"] = ""
            } else {
                obj["designationId"] = arr[i].designationId
            }
            if (arr[i].designationName == undefined || arr[i].designationName == null) {
                obj["name"] = ""
            } else {
                obj["name"] = arr[i].designationName
            }
            if (arr[i].designationName == undefined || arr[i].designationName == null) {
                obj["designationName"] = ""
            } else {
                obj["designationName"] = arr[i].designationName
            }

            obj["check"] = false;
            modArr.push(obj)
        }
    }

    return modArr
}

