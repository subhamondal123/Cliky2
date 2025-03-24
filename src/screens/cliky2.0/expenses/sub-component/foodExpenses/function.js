import { AlertMessage } from "../../../../../enums";
import { Toaster } from "../../../../../services/common-view-function";

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


export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }
    if (data.fromDateObj.fromDate == undefined || data.fromDateObj.fromDate == null || data.fromDateObj.fromDate.length == 0) {
        Toaster.ShortCenterToaster("Please Select date");
        errCounter++;
    }
    if (data.expenceTypeSelectedObj.id == undefined || data.expenceTypeSelectedObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.EXPENSE_CATAGORY_MODE);
        errCounter++;
    }
    else if (data.foodTypeSelectedObj.id == undefined || data.foodTypeSelectedObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.FOOD_MODE);
        errCounter++;
    } else if (data.transportModeSelectObj.id == undefined || data.transportModeSelectObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.OTHER);
        errCounter++;
    } else if (data.costTextInput == undefined || data.costTextInput == null || data.costTextInput.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.COST);
        errCounter++;
    }
    else if (data.allImgShow.length == 0) {

        Toaster.ShortCenterToaster("Please Upload the Bill !");
        errCounter++;
    }


    if (errCounter == 0) {
        resObj.status = true;
    }
    return resObj;
};

export function modifyPicData(arrData) {

    if (arrData.length > 0) {
        for (let i = 0; i < arrData.length; i++) {
            let obj = {};
            obj = {
                imagePath: arrData[i].images
            }

            Object.assign(arrData[i], obj)
        }

    }
    return arrData

}