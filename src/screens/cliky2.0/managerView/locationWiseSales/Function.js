
//main list data modify
export function modRespData(data) {
    let arrData = []
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {}
            if (data[i].parent == undefined || data[i].parent == null) {
                obj["parent"] = ""
            } else {
                obj["parent"] = data[i].parent
            }
            if (data[i].total == undefined || data[i].total == null) {
                obj["total"] = 0
            } else {
                obj["total"] = data[i].total
            }
            if (data[i].childs == undefined || data[i].childs == null) {
                obj["childs"] = []
            } else {
                obj["childs"] = getChildsData(data[i].childs).list
            }

            obj["maxVal"] = getChildsData(data[i].childs).maxVal
            arrData.push(obj)

        }
    }
    return arrData
}

//child data modify
function getChildsData(data) {
    let arrData = { list: [], maxVal: 0 }
    for (let i = 0; i < data.length; i++) {
        let obj = {}
        if (data[i].totalSalesAmnt == undefined || data[i].totalSalesAmnt == null) {
            obj["totalSalesAmnt"] = 0
        } else {
            obj["totalSalesAmnt"] = data[i].totalSalesAmnt
        }
        if (data[i].hmDescription == undefined || data[i].hmDescription == null) {
            obj["hmDescription"] = ""
        } else {
            obj["hmDescription"] = data[i].hmDescription
        }
        if (data[i].parent == undefined || data[i].parent == null) {
            obj["parent"] = ""
        } else {
            obj["parent"] = data[i].parent
        }
        arrData.maxVal = data[i].totalSalesAmnt > arrData.maxVal ? data[i].totalSalesAmnt : arrData.maxVal

        arrData.list.push(obj)
    }
    return arrData
}

//modify main data
export function modMainData(arr,levelData) {
    let modArr = [
        {
            "parent": levelData.name,
            "maxVal": getTotalAmount(arr),
            "total": getTotalAmount(arr),
            "childs": getChilds(arr)
        }
    ]
    return modArr
}

//get total amount 
function getTotalAmount(arr) {
    let amt = 0;
    for (let i = 0; i < arr.length; i++) {
        amt = amt + arr[i].amount
    }

    return amt
}

//modify the childs items
function getChilds(arr) {
    let modArr = []
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {}
            if (arr[i].title == undefined || arr[i].title == null) {
                obj["hmDescription"] = "N/A"
            } else {
                obj["hmDescription"] = arr[i].title
            }
            if (arr[i].amount == undefined || arr[i].amount == null) {
                obj["totalSalesAmnt"] = 0
            } else {
                obj["totalSalesAmnt"] = arr[i].amount
            }

            modArr.push(obj)
        }
    }
    return modArr

}