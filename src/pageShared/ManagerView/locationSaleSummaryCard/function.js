import { getAmountWithUnit, textTruncate } from "../../../services/common-view-function/commonFunctions";

//modify the hierarcy location  data
export function modData(data) {
    let arrData = [];
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {}
            if (data[i].hierarchyTypeId == undefined || data[i].hierarchyTypeId == null) {
                obj["id"] = 0
            } else {
                obj["id"] = data[i].hierarchyTypeId

            }
            if (data[i].hmTypDesc == undefined || data[i].hmTypDesc == null) {
                obj["name"] = ""
            } else {
                obj["name"] = data[i].hmTypDesc
            }

            arrData.push(obj)

        }

    }
    return arrData
}

//modify the chart data
export function modMainData(arr) {
    let modArr = { listData: [], totalAmount: 0 }
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {}
            if (arr[i].title == undefined || arr[i].title == null) {
                obj["x"] = "N/A"
            } else {
                obj["x"] = textTruncate(arr[i].title, 15)
            }
            if (arr[i].amount == undefined || arr[i].amount == null) {
                obj["y"] = ""
            } else {
                obj["y"] = arr[i].amount
            }

            modArr.listData.push(obj)
            modArr.totalAmount = modArr.totalAmount + parseFloat(arr[i].amount)
        }
    }

    return modArr
}


export function setChartData(arr) {
    let modArr = [];
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {}
            if (arr[i].x == undefined || arr[i].x == null) {
                obj["x"] = "N/A"
            } else {
                obj["x"] = textTruncate(arr[i].x, 15)
            }
            if (arr[i].y == undefined || arr[i].y == null) {
                obj["y"] = ""
            } else {
                obj["y"] = arr[i].y
            }

            modArr.push(obj)
            if (modArr.length == 4) {
                break;
            }
        }
    }

    return modArr
}