import { DateConvert } from "../../../services/common-view-function";

export function modifyDayreport(data) {
    var respData = { "dayWiseReport": [] };
    if (data) {
        let dayWiseReportList = data;
        if (dayWiseReportList && dayWiseReportList.length > 0) {
            for (let i = 0; i < dayWiseReportList.length; i++) {
                let modObj = {};
                if (dayWiseReportList[i].inTime == undefined || dayWiseReportList[i].inTime == null) {
                    modObj["inTime"] = "N/A";
                } else {
                    modObj["inTime"] = DateConvert.getAllTimeData(dayWiseReportList[i].inTime).viewTime;
                }
                if (dayWiseReportList[i].outTime == undefined || dayWiseReportList[i].outTime == null) {
                    modObj["outTime"] = "";
                } else {
                    modObj["outTime"] = dayWiseReportList[i].outTime;
                }
                if (dayWiseReportList[i].activityName == undefined || dayWiseReportList[i].activityName == null) {
                    modObj["activityName"] = "";
                } else {
                    modObj["activityName"] = dayWiseReportList[i].activityName;
                }
                if (dayWiseReportList[i].initials == undefined || dayWiseReportList[i].initials == null) {
                    modObj["initials"] = "";
                } else {
                    modObj["initials"] = dayWiseReportList[i].initials;
                }
                if (dayWiseReportList[i].isLate == undefined || dayWiseReportList[i].isLate == null) {
                    modObj["isLate"] = "";
                } else {
                    modObj["isLate"] = dayWiseReportList[i].isLate;
                }
                if (dayWiseReportList[i].absentRemark == undefined || dayWiseReportList[i].absentRemark == null) {
                    modObj["absentRemark"] = "";
                } else {
                    modObj["absentRemark"] = dayWiseReportList[i].absentRemark;
                }
                if (dayWiseReportList[i].selectedBeatName == undefined || dayWiseReportList[i].selectedBeatName == null) {
                    modObj["selectedBeatName"] = "";
                } else {
                    modObj["selectedBeatName"] = dayWiseReportList[i].selectedBeatName;
                }
                if (dayWiseReportList[i].firstCallTime == undefined || dayWiseReportList[i].firstCallTime == null) {
                    modObj["firstCallTime"] = "N/A";
                } else {
                    modObj["firstCallTime"] = DateConvert.getAllTimeData(dayWiseReportList[i].firstCallTime).viewTime;
                }
                if (dayWiseReportList[i].firstProductiveCallTime == undefined || dayWiseReportList[i].firstProductiveCallTime == null) {
                    modObj["firstProductiveCallTime"] = "N/A";
                } else {
                    modObj["firstProductiveCallTime"] = DateConvert.getAllTimeData(dayWiseReportList[i].firstProductiveCallTime).viewTime;
                }
                if (dayWiseReportList[i].sc == undefined || dayWiseReportList[i].sc == null) {
                    modObj["sc"] = "";
                } else {
                    modObj["sc"] = dayWiseReportList[i].sc;
                }
                if (dayWiseReportList[i].tc == undefined || dayWiseReportList[i].tc == null) {
                    modObj["tc"] = "";
                } else {
                    modObj["tc"] = dayWiseReportList[i].tc;
                }
                if (dayWiseReportList[i].pc == undefined || dayWiseReportList[i].pc == null) {
                    modObj["pc"] = "";
                } else {
                    modObj["pc"] = dayWiseReportList[i].pc;
                }

                modObj["currentDate"] = new Date().getDate();
                modObj["dayName"] = DateConvert.getDayName(new Date());

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.dayWiseReport.push(modObj);

            }
        }
    }
    return (respData);
}