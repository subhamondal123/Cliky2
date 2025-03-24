import { AlertMessage } from "../../../../enums";
import { Toaster } from "../../../../services/common-view-function";

export async function modifyConversionLanding(data) {
    let brandingList = await modifyProductList(data.productList);
    let unitList = await modifyUnitList(data.unitList);
    // let enquiryList = await modifyEnquiryList(data.userTargetList.data);
    // let customerList = await modifyCustomerList(data.customerList);


    // return { "brandingList": brandingList, "unitList": unitList, "enquiryList": enquiryList, "customerList": customerList };
    return { "brandingList": brandingList, "unitList": unitList };
}

export async function modifyProductList(data) {
    for (let i = 0; i < data.length; i++) {
        data[i]["id"] = data[i].labelId;
        data[i]["name"] = data[i].labelValue;
    }
    return data;
}

export async function modifyUnitList(data) {
    for (let i = 0; i < data.length; i++) {
        data[i]["id"] = data[i].unitId;
        data[i]["name"] = data[i].unitShort;
    }
    return data;
}

export async function modifyEnquiryList(data) {
    for (let i = 0; i < data.length; i++) {
        data[i]["id"] = data[i].customerId;
        data[i]["name"] = data[i].customerName;
    }
    return data;
}

export async function modifyCustomerList(data) {
    // for (let i = 0; i < data.length; i++) {
    //     data[i]["id"] = data[i].customerId;
    //     data[i]["name"] = data[i].customerName;
    // }
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

export function validateProductItem(data) {
    let status = false;
    let errCounter = 0;
    if (data.productObj == undefined || data.productObj == null || Object.keys(data.productObj).length == 0) {
        Toaster.ShortCenterToaster("Please Select Product !");
        errCounter++;
    }
    // else if (data.size == undefined || data.size == null || data.size.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.STOCK_UPDATE_ADD.SIZE_SPECS_ITEM_ERROR);
    //     errCounter++;
    // } 
    else if (data.quantity == undefined || data.quantity == null || data.quantity.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.STOCK_UPDATE_ADD.QUANTITY_NAME_ERROR);
        errCounter++;
    } else if (data.unit == undefined || data.unit == null || data.unit.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.STOCK_UPDATE_ADD.UNIT_ITEM_ERROR);
        errCounter++;
    }
    if (errCounter == 0) {
        status = true;
    }
    return status;
}

export function _modifyAddDataArr(alldata) {
    let mainArr = [];
    let tempArr = [];
    for (let i = 0; i < alldata.length; i++) {
        tempArr = [...tempArr, ...[alldata[i]]]
        if (i % 2 == 1) {
            mainArr = [...mainArr, ...[tempArr]]
            tempArr = [];
        }

        if (alldata.length % 2 == 1) {
            if (i == alldata.length - 1) {
                mainArr = [...mainArr, ...[tempArr]]
                tempArr = [];
            }
        }
    }

    return mainArr;
}

export function modifyContactArr(data) {
    let respArr = [];
    if (data) {
        respArr = data;
        for (let i = 0; i < respArr.length; i++) {
            respArr[i].id = respArr[i].contactTypeId;
            respArr[i].name = respArr[i].contactTypeName;
        }
    }

    return respArr;
}

export function modifyCustomerArr(arr, visitor) {
    let respArr = [];
    if (arr) {
        respArr = arr;
        for (let i = 0; i < respArr.length; i++) {
            respArr[i]["isCheck"] = false;
            respArr[i]["isConvertion"] = 0;
            respArr[i]["id"] = "0";
            respArr[i]["userId"] = visitor;
        }
    }

    return respArr;
}

export function modifyContactList(data) {

    return data;
}

export function validateConversionData(data, propsData) {
    let status = false;
    let errCounter = 0;
    if (data.allProductItemArr == undefined || data.allProductItemArr == null || data.allProductItemArr.length == 0) {
        Toaster.ShortCenterToaster("Please add atleast a product !");
        errCounter++;
    } else if (data.remarks == undefined || data.remarks == null || data.remarks.length == 0) {
        Toaster.ShortCenterToaster("Please enter remarks !");
        errCounter++;
    } else if (validateLiftedFromData(data, propsData) == false) {
        // Toaster.ShortCenterToaster("Please select a customer from where customer/contact has lifted the item !");
        errCounter++;
    } else if (data.dateObj.selectedDate.length == 0) {
        Toaster.ShortCenterToaster("Please enter Probable Lifting Date !");
        errCounter++;
    }

    else if (valiDateStageData(data, propsData) == false) {
        errCounter++;
    }

    if (errCounter == 0) {
        status = true;
    }

    return status;
}

export function valiDateStageData(data, propsData) {
    let status = false;
    let errCounter = 0;
    if (propsData.isInfulencer == 2 || propsData.isInfulencer == 3 || propsData.isInfulencer == 6) {
        if (data.selectedStage.id == undefined || data.selectedStage.id == null) {
            Toaster.ShortCenterToaster("Please Select Stage !");
            errCounter++;
        }
    }
    if (errCounter == 0) {
        status = true;
    }
    return status;
}

export function modifyStatgeArr(data) {
    let reqData = [];
    if (data.length > 0) {
        reqData = data;
        for (let i = 0; i < reqData.length; i++) {
            reqData[i]["id"] = reqData[i].salesStageId;
            reqData[i]["name"] = reqData[i].salesStageName;
        }
    }
    return reqData;
}

export function validateLiftedFromData(data, propsData) {
    let status = false;
    let errCounter = 0;
    if (propsData.isInfulencer == 0 || propsData.isInfulencer == 1 || propsData.isInfulencer == 2 || propsData.isInfulencer == 3) {
        if (data.selectedLiftFromCustomer.id == undefined || data.selectedLiftFromCustomer.id == null) {
            Toaster.ShortCenterToaster("Please select a customer from where customer/contact has lifted the item !");
            errCounter++;
        }
    }
    if (errCounter == 0) {
        status = true;
    }
    return status;
}

export function getProductName(arr) {
    let modName = "";
    if (arr.length > 0) {
        modName = arr[arr.length - 1].name
    }

    return modName;

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