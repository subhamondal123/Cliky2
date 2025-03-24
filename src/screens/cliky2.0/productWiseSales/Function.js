export function modResponseData(arr) {
    let modArr = [];
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {};
            if (arr[i].Category == undefined || arr[i].Category == null) {
                obj["Category"] = ""
            } else {
                obj["Category"] = arr[i].Category
            }
            if (arr[i].Unit == undefined || arr[i].Unit == null) {
                obj["Unit"] = ""
            } else {
                obj["Unit"] = arr[i].Unit
            }
            if (arr[i].Amount == undefined || arr[i].Amount == null) {
                obj["Amount"] = "0"
            } else {
                obj["Amount"] = arr[i].Amount
            }
            if (arr[i].Quantity == undefined || arr[i].Quantity == null) {
                obj["Quantity"] = ""
            } else {
                obj["Quantity"] = arr[i].Quantity
            }

            modArr.push(obj)
        }
    }
    return modArr
}

export function modResponseSkuData(arr) {
    let modArr = [];
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {};
            if (arr[i].Sku == undefined || arr[i].Sku == null) {
                obj["Sku"] = ""
            } else {
                obj["Sku"] = arr[i].Sku
            }
            if (arr[i].Unit == undefined || arr[i].Unit == null) {
                obj["Unit"] = ""
            } else {
                obj["Unit"] = arr[i].Unit
            }
            if (arr[i].Amount == undefined || arr[i].Amount == null) {
                obj["Amount"] = ""
            } else {
                obj["Amount"] = arr[i].Amount
            }
            if (arr[i].Quantity == undefined || arr[i].Quantity == null) {
                obj["Quantity"] = ""
            } else {
                obj["Quantity"] = arr[i].Quantity
            }

            modArr.push(obj)
        }
    }
    return modArr
}