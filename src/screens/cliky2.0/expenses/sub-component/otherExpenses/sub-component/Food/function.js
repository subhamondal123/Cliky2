import { AlertMessage } from "../../../../../../../enums";
import { Toaster } from "../../../../../../../services/common-view-function";

export function _modifyAddDataArr(alldata) {
    let mainArr = [];
    let tempArr = [];
    for (let i = 0; i < alldata.length; i++) {
        tempArr = [...tempArr, ...[alldata[i]]]
        if (tempArr.length == 3) {
            mainArr = [...mainArr, ...[tempArr]]
            tempArr = [];
        }

        if (alldata.length % 3 == 1 || alldata.length % 3 == 2) {
            if (i == alldata.length - 1) {
                mainArr = [...mainArr, ...[tempArr]]
                tempArr = [];
            }
        }

    }

    return mainArr;
}

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.cost == undefined || data.cost == null || data.cost.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.EXPENSES.FOOD_EXPENSE.COST_ERR);
        errCounter++;
    } else if (data.roomType == undefined || data.roomType == null || data.roomType.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.EXPENSES.FOOD_EXPENSE.FOOD_TYPE_ERR);
        errCounter++;
    } else if (data.billImage.length == 0) {

        Toaster.ShortCenterToaster("Please Upload Image !");
        errCounter++;
    }

    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function modArrData(data) {
    if (data ) {
           let obj = {
                type: data.type,
                hotelName: data.hotelName == undefined || data.hotelName == null ? "" : data.hotelName,
                address: data.address == undefined || data.address == null ? "" : data.address,
                label: "Food Services",
                fromDate: data.fromDate == undefined || data.fromDate == null ? "" : data.fromDate,
                toDate: data.toDate == undefined || data.toDate == null ? "" : data.toDate,
                imageArr: _modifyAddDataArr(data.billImage),
                totalAmount: data.totalAmount
            }

        return obj;

    }
}


export function modifyExpenceCategoryArr(data) {
    let resArray = [];
    if (data && data.length > 0) {
        resArray = data;
        for (let i = 0; i < resArray.length; i++) {
            resArray[i]["id"] = resArray[i].expenseCatagoryId;
            resArray[i]["name"] = resArray[i].expenseCatagoryName;
        }
    }
    return resArray;
}

export function modifyArrTransportData(data) {
    let resArray = [];
    if (data && data.length > 0) {
        resArray = data;
        for (let i = 0; i < resArray.length; i++) {
            resArray[i]["id"] = resArray[i].subCategoryTypeId;
            resArray[i]["name"] = resArray[i].subCategoryTypeName;
        }
    }
    return resArray;
}

export function modifyArrTransportModeData(data) {
    let resArray = [];
    if (data && data.length > 0) {
        resArray = data;
        for (let i = 0; i < resArray.length; i++) {
            resArray[i]["id"] = resArray[i].modeTypeId;
            resArray[i]["name"] = resArray[i].modeTypeName;
        }
    }
    return resArray;
}
