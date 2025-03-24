import { DateConvert } from "../../../services/common-view-function";
import { CommonData } from "../../../services/constant";

export function modifyExpenceDashboardArr(data) {
    var respData = { "totalCount": 0, "expenseDashBoardArr": [] };
    if (data) {
        let expenceTypeArrData = data.response;
        // respData.totalCount = data.count;
        if (expenceTypeArrData && expenceTypeArrData.length > 0) {
            for (let i = 0; i < expenceTypeArrData.length; i++) {
                let modObj = {};
                if (expenceTypeArrData[i].expenseTypeId == undefined || expenceTypeArrData[i].expenseTypeId == null) {
                    modObj["expenseTypeId"] = "";
                } else {
                    modObj["expenseTypeId"] = expenceTypeArrData[i].expenseTypeId;
                }
                if (expenceTypeArrData[i].expenseType == undefined || expenceTypeArrData[i].expenseType == null) {
                    modObj["expenseType"] = "";
                } else {
                    modObj["expenseType"] = expenceTypeArrData[i].expenseType;
                }
                if (expenceTypeArrData[i].totalCount == undefined || expenceTypeArrData[i].totalCount == null) {
                    modObj["totalCount"] = "";
                } else {
                    modObj["totalCount"] = expenceTypeArrData[i].totalCount;
                }
                if (expenceTypeArrData[i].totalCost == undefined || expenceTypeArrData[i].totalCost == null) {
                    modObj["totalCost"] = "";
                } else {
                    modObj["totalCost"] = expenceTypeArrData[i].totalCost;
                }
                respData.expenseDashBoardArr.push(modObj);

            }
        }

    }
    return (respData);
}

export function modifyCalenderScheduleData(data) {

    const expenseStatusArr = CommonData.COMMON.EXPENSES_STATUS;
    let resData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let selectDataArr = {};
            if (data[i].data) {
                let status = 0,
                    name = "",
                    time = "",
                    color = "",
                    txtColor = "",
                    refId = 0,
                    duration = "",
                    statusId = "",
                    date = "",
                    positionCheck = 0,
                    subDataCheck = 0;
                if (data[i].data.status || data[i].data.status.toString().length > 0) {
                    for (let k = 0; k < expenseStatusArr.length; k++) {
                        if (expenseStatusArr[k].id == data[i].data.statusId) {
                            status = data[i].data.status;
                            name = expenseStatusArr[k].name;
                            color = expenseStatusArr[k].color;
                            txtColor = expenseStatusArr[k].txtColor;
                            subDataCheck = subDataCheck + 1;
                        }
                    }
                }
                if (data[i].time) {
                  
                    time = data[i].data.time
                    subDataCheck = subDataCheck + 1;
                }
                if (data[i].data.id || data[i].data.id.toString().length > 0) {
                    refId = data[i].data.id;
                    subDataCheck = subDataCheck + 1;
                }

                if (data[i].data.date) {
                    date = DateConvert.formatYYYYMMDD(data[i].data.date);
                    subDataCheck = subDataCheck + 1;
                }
                if (data[i].data.status || data[i].data.status.toString().length > 0) {
                    status = data[i].data.status;
                    subDataCheck = subDataCheck + 1;
                }
                if (data[i].data.statusId || data[i].data.statusId.toString().length > 0) {
                    statusId = data[i].data.statusId;
                    subDataCheck = subDataCheck + 1;
                }
                if (subDataCheck == 6) {
                    selectDataArr["id"] = refId;
                    selectDataArr["status"] = status;
                    selectDataArr["statusId"] = statusId;
                    selectDataArr["name"] = name;
                    selectDataArr["time"] = time;
                    selectDataArr["color"] = color;
                    selectDataArr["txtColor"] = txtColor;
                    selectDataArr["date"] = date;
                    selectDataArr["positionCheck"] = positionCheck;
                }
            }
            if (data[i].date) {
                resData.push({
                    "date": DateConvert.formatYYYYMMDD(data[i].date),
                    "time": DateConvert.timeConvert(data[i].time).shortTime,
                    "data": selectDataArr
                })
            }
        }
    }
    return resData;
}

export function modRespData(arrData) {
    if (arrData && arrData.length > 0) {
        for (let i = 0; i < arrData.length; i++) {
            arrData[i]["time"] = (DateConvert.getAllTimeData(arrData[i].date)).rawTime
            arrData[i]["data"] = {
                "id": i + 1,
                "date": arrData[i].date,
                "time": (DateConvert.getAllTimeData(arrData[i].date)).rawTime,
                "expenseTypeId": arrData[i].expenseTypeId,
                "status": arrData[i].expenseTypeName,
                "statusId": arrData[i].approvedStatus
            };
        }
    }
    return arrData
}

export function modHeaderObj(obj) {
    let mainObj = {
        "TotalVisit": obj.TotalVisit == undefined || obj.TotalVisit == null || obj.TotalVisit == 0 ? "00" : obj.TotalVisit,
        "totalOdometerKms": obj.totalOdometerKms == undefined || obj.totalOdometerKms == null || obj.totalOdometerKms == 0 ? "00" : obj.totalOdometerKms,
        "odometerExpenses": obj.odometerExpenses == undefined || obj.odometerExpenses == null || obj.odometerExpenses == 0 ? "00" : obj.odometerExpenses,
        "totalOtherExpense": obj.totalOtherExpense == undefined || obj.totalOtherExpense == null || obj.totalOtherExpense == 0 ? "00" : obj.totalOtherExpense,
        "totalFoodExp": obj.totalFoodExp == undefined || obj.totalFoodExp == null || obj.totalFoodExp == 0 ? "00" : obj.totalFoodExp,
        "approvedExpenseAmount": obj.approvedExpenseAmount == undefined || obj.approvedExpenseAmount == null || obj.approvedExpenseAmount == 0 ? "00" : obj.approvedExpenseAmount,
        "rejectedExpenseAmount": obj.rejectedExpenseAmount == undefined || obj.rejectedExpenseAmount == null || obj.rejectedExpenseAmount == 0 ? "00" : obj.rejectedExpenseAmount,
    }
    return mainObj
}
