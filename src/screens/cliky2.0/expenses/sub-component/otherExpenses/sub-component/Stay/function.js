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
 
      if (data.expenseSubCategoryId == undefined || data.expenseSubCategoryId == null || data.expenseSubCategoryId.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.EXPENSES.STAY_EXPENSE.HOTEL_TYPE_ERR);
            errCounter++;
        } 
         else if (data.expenseCategoryModeId == undefined || data.expenseCategoryModeId == null || data.expenseCategoryModeId.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.EXPENSES.STAY_EXPENSE.ROOM_TYPE_ERR);
            errCounter++;
        } 
        else if (data.startDateTime == undefined || data.startDateTime == null || data.startDateTime.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.EXPENSES.STAY_EXPENSE.FROM_DATE_ERR);
            errCounter++;
        } 
        else if (data.endDatetime == undefined || data.endDatetime == null || data.endDatetime.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.EXPENSES.STAY_EXPENSE.TO_DATE_ERR);
            errCounter++;
        } 
        else if (data.address == undefined || data.address == null || data.address.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.EXPENSES.STAY_EXPENSE.ADDRESS_ERR);
            errCounter++;
        } 
        else if (data.finalAmount == undefined || data.finalAmount == null || data.finalAmount.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.EXPENSES.STAY_EXPENSE.ACTUAL_BILL_AMT_ERR);
            errCounter++;
        } else if (data.allBillImage.length == 0){

            Toaster.ShortCenterToaster("Please Upload the Bill !");
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
                label: "Stay Services",
                fromDate: data.startDateTime == undefined || data.startDateTime == null ? "" : data.startDateTime,
                toDate: data.endDatetime == undefined || data.endDatetime == null ? "" : data.endDatetime,
                imageArr: _modifyAddDataArr(data.allBillImage),
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
