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
            if (arr[i].designationName == undefined || arr[i].designationName == null) {
                obj["name"] = ""
            } else {
                obj["name"] = arr[i].designationName
            }

            arr[i]["check"] = false;
            modArr.push(obj)
        }
    }

    return modArr
}

export function modifyUserList(arr) {
    let modArr = []
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {}
            if (arr[i].designationId == undefined || arr[i].designationId == null) {
                obj["designationId"] = ""
            } else {
                obj["designationId"] = arr[i].designationId
            }
            if (arr[i].userId == undefined || arr[i].userId == null) {
                obj["id"] = ""
            } else {
                obj["id"] = arr[i].userId
            }
            // if (arr[i].userName == undefined || arr[i].userName == null) {
            //     obj["name"] = ""
            // } else {
            //     obj["name"] = arr[i].userName
            // }
            if (arr[i].userId == undefined || arr[i].userId == null) {
                obj["userId"] = ""
            } else {
                obj["userId"] = arr[i].userId
            }
            if (arr[i].designationName == undefined || arr[i].designationName == null) {
                obj["designationName"] = ""
            } else {
                obj["designationName"] = arr[i].designationName
            }

            obj["name"] = (arr[i].firstname == undefined || arr[i].firstname == null ? "" : arr[i].firstname) + " " + (arr[i].lastname == undefined || arr[i].lastname == null ? "" : arr[i].lastname)

            arr[i]["check"] = false;
            modArr.push(obj)
        }
    }

    return modArr
}



