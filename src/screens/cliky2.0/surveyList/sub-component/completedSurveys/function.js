export function modifyListData(data) {
    var respData = { "totalCount": 0, "surveyList": [] };
    if (data) {
        let surveyData = data.data.surveyList;
        respData.totalCount = data.data.totalCount;
        if (surveyData && surveyData.length > 0) {
            for (let i = 0; i < surveyData.length; i++) {
                let modObj = {};
                if (surveyData[i].surveyId == undefined || surveyData[i].surveyId == null) {
                    modObj["surveyId"] = "";
                } else {
                    modObj["surveyId"] = surveyData[i].surveyId;
                }
                if (surveyData[i].title == undefined || surveyData[i].title == null) {
                    modObj["title"] = "";
                } else {
                    modObj["title"] = surveyData[i].title;
                }
                if (surveyData[i].startDate == undefined || surveyData[i].startDate == null) {
                    modObj["startDate"] = "";
                } else {
                    modObj["startDate"] = surveyData[i].startDate;
                }
                if (surveyData[i].endDate == undefined || surveyData[i].endDate == null) {
                    modObj["endDate"] = "";
                } else {
                    modObj["endDate"] = surveyData[i].endDate;
                }
                if (surveyData[i].productId == undefined || surveyData[i].productId == null) {
                    modObj["productId"] = "";
                } else {
                    modObj["productId"] = surveyData[i].productId;
                }
                if (surveyData[i].status == undefined || surveyData[i].status == null) {
                    modObj["status"] = "";
                } else {
                    modObj["status"] = surveyData[i].status;
                }
                if (surveyData[i].productName == undefined || surveyData[i].productName == null) {
                    modObj["productName"] = "";
                } else {
                    modObj["productName"] = surveyData[i].productName;
                }
                if (surveyData[i].labelCode == undefined || surveyData[i].labelCode == null) {
                    modObj["labelCode"] = "";
                } else {
                    modObj["labelCode"] = surveyData[i].labelCode;
                }
                if (surveyData[i].lebelId == undefined || surveyData[i].lebelId == null) {
                    modObj["lebelId"] = "";
                } else {
                    modObj["lebelId"] = surveyData[i].lebelId;
                }
                if (surveyData[i].id == undefined || surveyData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = surveyData[i].id;
                }
                if (surveyData[i].surveyDate == undefined || surveyData[i].surveyDate == null) {
                    modObj["surveyDate"] = "";
                } else {
                    modObj["surveyDate"] = surveyData[i].surveyDate;
                }

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.surveyList.push(modObj);
            }
        }
    }
    return (respData);
}