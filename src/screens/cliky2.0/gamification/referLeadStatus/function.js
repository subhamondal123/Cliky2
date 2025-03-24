import { DateConvert } from "../../../../services/common-view-function";
import { CommonData } from "../../../../services/constant";

export function enquiryModifyData(data) {
    var respData = { "totalCount": 0, "list": [] };
    if (data) {
        let enquiryData = data;
        // respData.totalCount = data.response.count;
        if (enquiryData && enquiryData.length > 0) {
            for (let i = 0; i < enquiryData.length; i++) {
                let modObj = {};
                if (enquiryData[i].description == undefined || enquiryData[i].description == null) {
                    modObj["title"] = "";
                } else {
                    modObj["title"] = enquiryData[i].description;
                }
                if (enquiryData[i].createdAt == undefined || enquiryData[i].createdAt == null) {
                    modObj["eventTime"] = "";
                } else {
                    modObj["eventTime"] = DateConvert.viewDateFormat(enquiryData[i].createdAt);
                }
                modObj["color"] =  CommonData.ACTIVITY_COLOR[i].color;


                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}