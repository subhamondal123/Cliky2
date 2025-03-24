//modify list data
export function modData(data) {
    let arrData = []
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {}
            if (data[i].address == undefined || data[i].address == null) {
                obj["address"] = "N/A"
            } else {
                obj["address"] = data[i].address
            }
            if (data[i].designationName == undefined || data[i].designationName == null) {
                obj["designationName"] = "N/A"
            } else {
                obj["designationName"] = data[i].designationName
            }
            if (data[i].firstname == undefined || data[i].firstname == null) {
                obj["firstname"] = ""
            } else {
                obj["firstname"] = data[i].firstname
            }
            if (data[i].lastname == undefined || data[i].lastname == null) {
                obj["lastname"] = ""
            } else {
                obj["lastname"] = data[i].lastname
            }
            if (data[i].phone == undefined || data[i].phone == null) {
                obj["phone"] = ""
            } else {
                obj["phone"] = data[i].phone
            }
            if (data[i].date == undefined || data[i].date == null) {
                obj["date"] = ""
            } else {
                obj["date"] = data[i].date
            }
            if (data[i].userId == undefined || data[i].userId == null) {
                obj["userId"] = ""
            } else {
                obj["userId"] = data[i].userId
            }
            if (data[i].utc == undefined || data[i].utc == null) {
                obj["utc"] = ""
            } else {
                obj["utc"] = data[i].utc
            }
            if (data[i].upc == undefined || data[i].upc == null) {
                obj["upc"] = ""
            } else {
                obj["upc"] = data[i].upc
            }
            if (data[i].distributors == undefined || data[i].distributors == null) {
                obj["distributors"] = ""
            } else {
                obj["distributors"] = data[i].distributors
            }
            if (data[i].beats == undefined || data[i].beats == null) {
                obj["beats"] = ""
            } else {
                obj["beats"] = data[i].beats
            }
            if (data[i].outlets == undefined || data[i].outlets == null) {
                obj["outlets"] = ""
            } else {
                obj["outlets"] = data[i].outlets
            }
            
            arrData.push(obj)
        }
    }
    return arrData
}
