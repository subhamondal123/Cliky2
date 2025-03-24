import { DateConvert } from "../../../../services/common-view-function";

export function listModifyData(data) {
    var respData = { "totalCount": 0, "list": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].profileImgUrl == undefined || pjpData[i].profileImgUrl == null) {
                    modObj["profileImgUrl"] = "";
                } else {
                    modObj["profileImgUrl"] = pjpData[i].profileImgUrl;
                }
                if (pjpData[i].userName == undefined || pjpData[i].userName == null) {
                    modObj["userName"] = "";
                } else {
                    modObj["userName"] = pjpData[i].userName;
                }
                if (pjpData[i].thanksBack == undefined || pjpData[i].thanksBack == null) {
                    modObj["thanksBack"] = "";
                } else {
                    modObj["thanksBack"] = pjpData[i].thanksBack;
                } 
                if (pjpData[i].userId == undefined || pjpData[i].userId == null) {
                    modObj["userId"] = "";
                } else {
                    modObj["userId"] = pjpData[i].userId;
                } 
                if (pjpData[i].createdAt == undefined || pjpData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = DateConvert.formatDDfullMonthYYYY(pjpData[i].createdAt);
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