import { AlertMessage } from "../../../enums";
import { Toaster } from "../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }
    if (data.selectedBrandObj.id == undefined || data.selectedBrandObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.STOCK_UPDATE_ADD.BRANDING_ITEM_ERROR);
        errCounter++;
    } else if (data.selectedSizeObj.id == undefined || data.selectedSizeObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.STOCK_UPDATE_ADD.SIZE_SPECS_ITEM_ERROR);
        errCounter++;
    } else if (data.quantity == undefined || data.quantity == null || data.quantity.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.STOCK_UPDATE_ADD.QUANTITY_NAME_ERROR);
        errCounter++;
    } else if (data.selectedUnitObj.id == undefined || data.selectedUnitObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.STOCK_UPDATE_ADD.UNIT_ITEM_ERROR);
        errCounter++;
    }
    if (errCounter == 0) {
        resObj.status = true;
    }
    return resObj;
};

export function inputEntryValidate(text) {
    let newText = "";
    for (var i = 0; i < text.length; i++) {
        if (text[i].match(Regex.NAME_REGEX)) {
            newText = newText + text[i];
        }
    }
    newText = text;
    return newText;
};

export function modifyUnitArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].unitId;
            data[i]["name"] = data[i].unitShort;
        }
    }
    return data;
};

export function modifyBrandArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].labelId;
            data[i]["name"] = data[i].labelCode;
        }
    } else {
        data = [];
    }
    return data;
}

export function modifySizeSpecsArr(data) {
    let Arr = [],
        modObj = {};
    for (let i = 0; i < data.length; i++) {
        modObj = {
            id: data[i].productId,
            name: data[i].productName

        }
        Arr.push(modObj)
    }

    return Arr;
}








