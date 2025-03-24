export function modifyChartData(arr) {
    let arrData = [

    ]
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let modObj = {}
            if (arr[i].value == undefined || arr[i].value == null) {
                modObj["y"] = 0
            } else {
                modObj["y"] = arr[i].value + " " + arr[i].qty
            }
            if (arr[i].label == undefined || arr[i].label == null) {
                modObj["x"] = "Label"
            } else {
                modObj["x"] = arr[i].label
            }
            arrData.push(modObj)
        }
    }
    return arrData

}


export function modifyTargetAchievementChartData(arr) {
    let arrData = [

    ]
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let modObj = {}
            if (arr[i].achievement == undefined || arr[i].achievement == null) {
                modObj["y"] = 0
            } else {
                modObj["y"] = arr[i].achievement
            }
            if (arr[i].label == undefined || arr[i].label == null) {
                modObj["x"] = "Label"
            } else {
                modObj["x"] = arr[i].label
            }
            arrData.push(modObj)
        }
    }
    return arrData

}
