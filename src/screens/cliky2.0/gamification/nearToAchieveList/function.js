import { DateConvert } from "../../../../services/common-view-function";

export function listModifyData(data) {
    var respData = { "totalCount": 0, "list": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                if (pjpData[i].description == undefined || pjpData[i].description == null) {
                    modObj["description"] = "";
                } else {
                    modObj["description"] = pjpData[i].description;
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