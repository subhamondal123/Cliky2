// modify the response data
export function modData(data) {
    let obj = {}
    if (data && Object.keys(data).length > 0) {

        if (data.retailCount == undefined || data.retailCount == null) {
            obj["retailCount"] = 0
        } else {
            obj["retailCount"] = data.retailCount

        }
        if (data.officeCount == undefined || data.officeCount == null) {
            obj["officeCount"] = 0
        } else {
            obj["officeCount"] = data.officeCount
        }
        if (data.leaveCount == undefined || data.leaveCount == null) {
            obj["leaveCount"] = 0
        } else {
            obj["leaveCount"] = data.leaveCount
        }
        if (data.userCount == undefined || data.userCount == null) {
            obj["userCount"] = 0
        } else {
            obj["userCount"] = data.userCount
        }
        if (data.absentCount == undefined || data.absentCount == null) {
            obj["absentCount"] = 0
        } else {
            obj["absentCount"] = data.absentCount
        }
        if (data.attandace == undefined || data.attandace == null) {
            obj["attandace"] = 0
        } else {
            obj["attandace"] = data.attandace
        }

        obj["totalCount"] = parseInt(data.attandace) + parseInt(data.absentCount) + parseInt(data.userCount) + parseInt(data.leaveCount) + parseInt(data.officeCount) + parseInt(data.retailCount)
    }
    return obj
}

// normalize the count value in percentage
export function normalizeValue(value, maxCount) {
    let normalizeValue = Math.min((parseInt(value) / maxCount) * 100, 100);
    return normalizeValue
}