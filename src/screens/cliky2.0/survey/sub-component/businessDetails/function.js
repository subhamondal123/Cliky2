import { AlertMessage } from "../../../../../enums";
import { Toaster } from "../../../../../services/common-view-function";

export function modifyPageData(data) {
    let resData = {
        // allvisitorTypeArr: [],
        selectedVisitorTypeObj: {},
        orgName: "",
        orgNameActive: false,
        ownerName: "",
        ownerNameActive: false,
        selectedProduct: {}
    }
    if (data) {
        if (data.selectedVisitorTypeObj.id == undefined || data.selectedVisitorTypeObj.id == null) {
            resData.selectedVisitorTypeObj = {};
        } else {
            resData.selectedVisitorTypeObj = data.selectedVisitorTypeObj;
        }

        if (data.orgName == undefined || data.orgName == null || data.orgName.length == 0) {
            resData.orgName = "";
        } else {
            resData.orgName = data.orgName;
        }

        if (data.ownerName == undefined || data.ownerName == null || data.ownerName.length == 0) {
            resData.ownerName = "";
        } else {
            resData.ownerName = data.ownerName;
        }

        if (data.selectedProduct.id == undefined || data.selectedProduct.id == null) {
            resData.selectedProduct = {};
        } else {
            resData.selectedProduct = data.selectedProduct;
        }
    }
    return resData;
}

export function validateData(value) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (value.selectedVisitorTypeObj.id == undefined || value.selectedVisitorTypeObj.id == null) {
        errCounter++;
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SURVEY.VISITOR_ERROR);
    } else if (value.orgName == undefined || value.orgName == null || value.orgName.length == 0) {
        errCounter++;
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SURVEY.ORG_NAME_ERROR);
    } else if (value.ownerName == undefined || value.ownerName == null || value.ownerName.length == 0) {
        errCounter++;
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SURVEY.OWNER_NAME_ERROR);
    } 
    // else if (value.selectedProduct.id == undefined || value.selectedProduct.id == null) {
    //     errCounter++;
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SURVEY.PRODUCT_ERROR);
    // }

    if (errCounter == 0) {
        resObj.status = true
    }

    return resObj;
}

export function modifyCustomerType(arr) {
    let respArr = [];
    if (arr) {
        respArr = arr;
        for (let i = 0; i < respArr.length; i++) {
            respArr[i]["id"] = respArr[i].contactTypeId;
            respArr[i]["name"] = respArr[i].contactTypeName;
        }
    }
    return respArr;
}



export function modifyLocationMappedData(mainData, listData) {

    let finalData = [];
    if (mainData && mainData.length > 0) {
        const sortedLocationMapData = mainData.sort((a, b) => a.SlNo - b.SlNo);
        finalData = sortedLocationMapData.map(mainItem => {
            const matchingListItems = listData.filter(listItem => listItem.slNo === mainItem.SlNo);
            return {
                ...mainItem,
                fileItem: matchingListItems
            };
        });
    }
    return finalData;
}


export function modifyProductArr(arr) {
    let respArr = [];
    if (arr) {
        respArr = arr;
        for (let i = 0; i < respArr.length; i++) {
            respArr[i]["id"] = respArr[i].categoryId;
            respArr[i]["name"] = respArr[i].categoryName;
        }
    }
    return respArr;
}