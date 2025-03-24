import { DateConvert } from "../../../../services/common-view-function";

export function listModifyData(data) {
    var respData = { "totalCount": 0, "list": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].pointMapId == undefined || pjpData[i].pointMapId == null) {
                    modObj["pointMapId"] = "";
                } else {
                    modObj["pointMapId"] = pjpData[i].pointMapId;
                }
                if (pjpData[i].userName == undefined || pjpData[i].userName == null) {
                    modObj["userName"] = "";
                } else {
                    modObj["userName"] = pjpData[i].userName;
                }
                if (pjpData[i].description == undefined || pjpData[i].description == null || pjpData[i].description == "N/A") {
                    modObj["description"] = "";
                } else {
                    modObj["description"] = pjpData[i].description;
                }
                if (pjpData[i].pointEarned == undefined || pjpData[i].pointEarned == null) {
                    modObj["pointEarned"] = "";
                } else {
                    modObj["pointEarned"] = pjpData[i].pointEarned;
                }
                if (pjpData[i].type == undefined || pjpData[i].type == null) {
                    modObj["type"] = "";
                } else {
                    modObj["type"] = pjpData[i].type;
                }
                if (pjpData[i].pointsEarnedDateTime == undefined || pjpData[i].pointsEarnedDateTime == null) {
                    modObj["pointsEarnedDateTime"] = "";
                } else {
                    modObj["pointsEarnedDateTime"] = DateConvert.formatDDfullMonthYYYY(pjpData[i].pointsEarnedDateTime);
                }
                

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}