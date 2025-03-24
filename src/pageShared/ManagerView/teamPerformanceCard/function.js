//modify list data
export function modData(data) {
    let obj = {}
    if (data && Object.keys(data).length > 0) {

        if (data.totalVisit == undefined || data.totalVisit == null) {
            obj["totalVisit"] = 0
        } else {
            obj["totalVisit"] = data.totalVisit

        }
        if (data.productiveVisit == undefined || data.productiveVisit == null) {
            obj["productiveVisit"] = 0
        } else {
            obj["productiveVisit"] = data.productiveVisit
        }
        if (data.uniqueProdCount == undefined || data.uniqueProdCount == null) {
            obj["uniqueProdCount"] = 0
        } else {
            obj["uniqueProdCount"] = data.uniqueProdCount
        }
        if (data.uniqueTotalCount == undefined || data.uniqueTotalCount == null) {
            obj["uniqueTotalCount"] = 0
        } else {
            obj["uniqueTotalCount"] = data.uniqueTotalCount
        }
        if (data.zeroOrder == undefined || data.zeroOrder == null) {
            obj["zeroOrder"] = 0
        } else {
            obj["zeroOrder"] = data.zeroOrder
        }
        if (data.prodVisitPercentage == undefined || data.prodVisitPercentage == null || data.prodVisitPercentage == "NaN") {
            obj["prodVisitPercentage"] = 0
        } else {
            obj["prodVisitPercentage"] = data.prodVisitPercentage
        }

        obj["maxAmount"] = data.uniqueProdCount == null || data.uniqueProdCount == undefined || data.uniqueTotalCount == null || data.uniqueTotalCount == undefined ? 0 : (parseInt(data.uniqueProdCount) + parseInt(data.uniqueTotalCount) + parseInt(data.zeroOrder))

    }
    return obj
}