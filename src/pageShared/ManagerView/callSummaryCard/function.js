//modify main list data
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
        if (data.totalVisitMTD == undefined || data.totalVisitMTD == null) {
            obj["totalVisitMTD"] = 0
        } else {
            obj["totalVisitMTD"] = data.totalVisitMTD
        }
        if (data.totalVisitLMTD == undefined || data.totalVisitLMTD == null) {
            obj["totalVisitLMTD"] = 0
        } else {
            obj["totalVisitLMTD"] = data.totalVisitLMTD
        }
        if (data.prodVisitPercentage == undefined || data.prodVisitPercentage == null || data.prodVisitPercentage == "NaN") {
            obj["prodVisitPercentage"] = 0
        } else {
            obj["prodVisitPercentage"] = parseFloat(data.prodVisitPercentage)
        }

        if (data.netVal == undefined || data.netVal == null) {
            obj["netVal"] = 0
        } else {
            obj["netVal"] = data.netVal.toFixed(2)
        }
    }
    return obj
}
//get the differnce percentage between totalVisitMTD and totalVisitLMTD
export function getVisitDifferencePercentage(totalVisitMTD, totalVisitLMTD) {
    let diff = parseInt(totalVisitLMTD) < parseInt(totalVisitMTD) ? (100 * (parseInt(totalVisitMTD) - parseInt(totalVisitLMTD))) / parseInt(totalVisitMTD) : (100 * (parseInt(totalVisitLMTD) - parseInt(totalVisitMTD))) / parseInt(totalVisitLMTD)

    let percentageValue = parseInt(totalVisitLMTD) > parseInt(totalVisitMTD) ? -diff : diff
    return percentageValue.toFixed(2)

}