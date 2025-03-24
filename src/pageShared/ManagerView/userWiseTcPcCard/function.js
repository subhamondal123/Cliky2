// modify designation data
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
            modArr.push(obj)
        }
    }
    return modArr
}

// modify list data
export function modData(data) {
    let arrData = { "list": [], maxValue: 0, tcMaxValue: 0, pcMaxValue: 0 };
    let maxVal = 0;
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {}
            if (data[i].totalSalesAmnt == undefined || data[i].totalSalesAmnt == null) {
                obj["totalSalesAmnt"] = 0
            } else {
                obj["totalSalesAmnt"] = data[i].totalSalesAmnt.toFixed(2)

            }
            if (data[i].totalVisits == undefined || data[i].totalVisits == null) {
                obj["totalVisits"] = 0
            } else {
                obj["totalVisits"] = data[i].totalVisits

            }
            if (data[i].totalProductiveVisits == undefined || data[i].totalProductiveVisits == null) {
                obj["totalProductiveVisits"] = 0
            } else {
                obj["totalProductiveVisits"] = data[i].totalProductiveVisits

            }
            if (data[i].firstname == undefined || data[i].firstname == null) {
                obj["firstname"] = ""
            } else {
                obj["firstname"] = data[i].firstname
            }
            if (data[i].lastname == undefined || data[i].lastname == null) {
                obj["lastname"] = 0
            } else {
                obj["lastname"] = data[i].lastname
            }

            arrData.maxValue = (data[i].totalSalesAmnt == null || data[i].totalSalesAmnt == undefined) ? 0 : arrData.maxValue + parseFloat(data[i].totalSalesAmnt)
            arrData.tcMaxValue = (data[i].totalVisits == null || data[i].totalVisits == undefined) ? 0 : arrData.tcMaxValue + parseInt(data[i].totalVisits)
            arrData.pcMaxValue = (data[i].totalProductiveVisits == null || data[i].totalProductiveVisits == undefined) ? 0 : arrData.pcMaxValue + parseInt(data[i].totalProductiveVisits)


            arrData.list.push(obj)

        }

    }
    return arrData
}