import { DateConvert } from "../../../../services/common-view-function"

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
            if (data[i].prodactivity == undefined || data[i].prodactivity == null) {
                obj["prodactivity"] = ""
            } else {
                obj["prodactivity"] = data[i].prodactivity
            }

            
            if (data[i].description == undefined || data[i].description == null) {
                obj["description"] = ""
            } else {
                obj["description"] = data[i].description
            }



            if (data[i].prodactivity == undefined || data[i].prodactivity == null) {
                obj["prodactivity"] = ""
            } else {
                obj["prodactivity"] = data[i].prodactivity
            }
            if (data[i].firstCall == undefined || data[i].firstCall == null) {
                obj["firstCall"] = "N/A"
            } else {
                obj["firstCall"] = DateConvert.timeConvert(data[i].firstCall).fullTime
            }
            if (data[i].firstPC == undefined || data[i].firstPC == null) {
                obj["firstPC"] = "N/A"
            } else {
                obj["firstPC"] = DateConvert.timeConvert(data[i].firstPC).fullTime
            }
            if (data[i].sc == undefined || data[i].sc == null) {
                obj["sc"] = "0"
            } else {
                obj["sc"] = data[i].sc
            }
            if (data[i].cap == undefined || data[i].cap == null) {
                obj["cap"] = "0"
            } else {
                obj["cap"] = data[i].cap
            }
            if (data[i].tc == undefined || data[i].tc == null) {
                obj["tc"] = "0"
            } else {
                obj["tc"] = data[i].tc
            }
            if (data[i].pc == undefined || data[i].pc == null) {
                obj["pc"] = "0"
            } else {
                obj["pc"] = data[i].pc
            }
            if (data[i].schProductivity == undefined || data[i].schProductivity == null) {
                obj["schProductivity"] = ""
            } else {
                obj["schProductivity"] = data[i].schProductivity
            }

            if (data[i].netval == undefined || data[i].netval == null) {
                obj["netval"] = ""
            } else {
                obj["netval"] = data[i].netval.toFixed(2)
            }
            if (data[i].quantityData == undefined || data[i].quantityData == null) {
                obj["quantityData"] = ""
            } else {
                obj["quantityData"] = data[i].quantityData
            }
            if (data[i].ovc == undefined || data[i].ovc == null) {
                obj["ovc"] = ""
            } else {
                obj["ovc"] = data[i].ovc
            }
            if (data[i].login == undefined || data[i].login == null) {
                obj["login"] = ""
            } else {
                obj["login"] = DateConvert.timeConvert(data[i].login).fullTime
            }
            if (data[i].beat == undefined || data[i].beat == null) {
                obj["beat"] = ""
            } else {
                obj["beat"] = data[i].beat
            }

            arrData.push(obj)

        }
    }
    return arrData
}
