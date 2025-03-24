// for calender date change

import { CommonData } from "../../services/constant";

export function modifyMonthData(data, cellkey, selectKey) {
    for (let i = 0; i < data.view.length; i++) {
        for (let j = 0; j < data.view[i].length; j++) {
            if (cellkey && selectKey) {
                if (cellkey == i && selectKey == j) {
                    data.view[i][j].isClick = true;
                } else {
                    data.view[i][j].isClick = false;
                }
            } else {
                data.view[i][j]["isClick"] = false;
            }
        }
    }
    return data;
}


// modify data for month selecttion
export function modWeekData(data) {
    var view = data.view;
    if (view) {
        for (let i = 0; i < view.length; i++) {
            if (view[i]) {
                for (let j = 0; j < view[i].length; j++) {
                    if (view[i][j].data) {
                        let prevCount = 0;
                        let prevColor = "#FFFFFF";
                        let frontCount = 0;
                        let frontColor = "#FFFFFF";
                        for (let k = 0; k < view[i][j].data.length; k++) {
                            if (view[i][j].data[k].positionCheck == 0) {
                                prevCount = prevCount + 1;
                                prevColor = view[i][j].data[k].color;
                            }
                            if (view[i][j].data[k].positionCheck == 1) {
                                frontCount = frontCount + 1;
                                frontColor = view[i][j].data[k].color;
                            }
                        }
                        view[i][j]["prevCount"] = prevCount;
                        view[i][j]["prevColor"] = prevColor;
                        view[i][j]["prevCount"] = prevCount;
                        view[i][j]["frontColor"] = frontColor;
                    }
                }
            }
        }
        data.view = view;
    }
    return data;
}

// modify data for day selecttion
export function modDayData(data) {
    var view = data.view;
    if (view) {
        for (let i = 0; i < view.length; i++) {
            if (view[i].data) {
                if (view[i].data) {
                    let prevCount = 0;
                    let prevColor = "#FFFFFF";
                    let frontCount = 0;
                    let frontColor = "#FFFFFF";
                    for (let k = 0; k < view[i].data.length; k++) {
                        if (view[i].data[k].positionCheck == 0) {
                            prevCount = prevCount + 1;
                            prevColor = view[i].data[k].color;
                        }
                        if (view[i].data[k].positionCheck == 1) {
                            frontCount = frontCount + 1;
                            frontColor = view[i].data[k].color;
                        }
                    }
                    view[i]["prevCount"] = prevCount;
                    view[i]["prevColor"] = prevColor;
                    view[i]["prevCount"] = prevCount;
                    view[i]["frontColor"] = frontColor;
                }
            }
        }
        data.view = view;
    }
    return data;
}



export function modifyColorData(arrData) {
    let obj = {},
        color = "",
        txtColor = "#000000",
        approveCount = 0,
        rejectCount = 0,
        pendingCount = 0,
        partiallyRejected = false;

    if (arrData) {

        for (let i = 0; i < arrData.length; i++) {
            if (arrData[i].statusId == 1) {
                approveCount++
            }
            if (arrData[i].statusId == 0) {
                pendingCount++
            }
            if (arrData[i].statusId == 2) {
                rejectCount++
            }
        }

        if ((pendingCount > 0 && approveCount > 0) ) {
            color =  CommonData.EXPENSE_STATUS_COLOR.PARTIALLY_APPROVED.color // partially approved
            txtColor = CommonData.EXPENSE_STATUS_COLOR.PARTIALLY_APPROVED.txtColor
        } else if (approveCount == arrData.length) {
            color = CommonData.EXPENSE_STATUS_COLOR.ALL_APPROVED.color//all approved
            txtColor = CommonData.EXPENSE_STATUS_COLOR.ALL_APPROVED.txtColor
        } else if (pendingCount == arrData.length) {
            color = CommonData.EXPENSE_STATUS_COLOR.ALL_PENDING.color //all pending
            txtColor = CommonData.EXPENSE_STATUS_COLOR.ALL_PENDING.txtColor
        } else if ((rejectCount == arrData.length)) {
            color = CommonData.EXPENSE_STATUS_COLOR.REJECTED.color  //all rejected
            txtColor = CommonData.EXPENSE_STATUS_COLOR.REJECTED.txtColor
        } else if ((pendingCount > 0 && rejectCount > 0 )|| (rejectCount > 0 && approveCount > 0)){
            partiallyRejected = true  // partially rejected
        } else {
            color = "#EFEFEF"  //all rejected
        }

        obj = {
            color: color,
            txtColor:txtColor,
            partiallyRejected:partiallyRejected
        }

    }
    return obj
}