import { StorageDataModification } from "../../../services/common-view-function";
import { SelectSql } from "../../../services/sql";

export function modifyBrandList(data) {
    var respData = { "brandList": [] };
    if (data) {
        let brandData = data.productList;
        if (brandData && brandData.length > 0) {
            for (let i = 0; i < brandData.length; i++) {
                let modObj = {};
                if (brandData[i].labelId == undefined || brandData[i].labelId == null) {
                    modObj["labelId"] = "";
                } else {
                    modObj["labelId"] = brandData[i].labelId;
                }
                if (brandData[i].labelCode == undefined || brandData[i].labelCode == null) {
                    modObj["labelCode"] = "";
                } else {
                    modObj["labelCode"] = brandData[i].labelCode;
                }
                if (brandData[i].labelValue == undefined || brandData[i].labelValue == null) {
                    modObj["title"] = "";
                } else {
                    modObj["title"] = brandData[i].labelValue;
                }
                modObj["check"] = i == 0 ? true : false;
                respData.brandList.push(modObj);
            }
        }
    }
    return (respData);
}

export async function modifyProductList(data, userId) {
    var respData = { "totalCount": 0, "pjpList": [] };
    if (data) {
        let pjpData = data.response.data;
        respData.totalCount = data.response.count;
        let storeData = await StorageDataModification.OrderCustomerProfileData({}, "get");
        if (pjpData && pjpData.length > 0) {
            for (let i = 0; i < pjpData.length; i++) {
                let modObj = {};
                let totalAmount = 0,
                    // storeData = await StorageDataModification.OrderCustomerProfileData({}, "get"),
                    quantity = 0;

                if (pjpData[i].productId == undefined || pjpData[i].productId == null) {
                    modObj["productId"] = "";
                } else {
                    modObj["productId"] = pjpData[i].productId;
                }
                if (pjpData[i].productName == undefined || pjpData[i].productName == null) {
                    modObj["productName"] = "";
                } else {
                    modObj["productName"] = pjpData[i].productName;
                }
                if (pjpData[i].productDescription == undefined || pjpData[i].productDescription == null) {
                    modObj["productDescription"] = "";
                } else {
                    modObj["productDescription"] = pjpData[i].productDescription;
                }
                if (pjpData[i].unitId == undefined || pjpData[i].unitId == null) {
                    modObj["unitId"] = "";
                } else {
                    modObj["unitId"] = pjpData[i].unitId;
                }
                if (pjpData[i].productRate == undefined || pjpData[i].productRate == null) {
                    modObj["productRate"] = "";
                } else {
                    modObj["productRate"] = pjpData[i].productRate;
                }

                if (storeData && storeData[userId].cartItems.length > 0) {
                    for (let j = 0; j < storeData[userId].cartItems.length; j++) {
                        if (storeData[userId].cartItems[j].productId == pjpData[i].productId) {
                            quantity = storeData[userId].cartItems[j].quantity == null || storeData[userId].cartItems[j].quantity == undefined ? 0 : parseFloat(storeData[userId].cartItems[j].quantity);
                            totalAmount = storeData[userId].cartItems[j].totalPrice == null || storeData[userId].cartItems[j].totalPrice == undefined ? 0 : storeData[userId].cartItems[j].totalPrice;
                        }
                    }
                }
                modObj["quantity"] = quantity.toFixed(1);
                modObj["totalAmount"] = totalAmount.toFixed(1);
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.pjpList.push(modObj);
            }
        }
    }
    return (respData);

}

export function modifyRequestProduct(arrData, selectedBrandId) {
    let modArr = [];
    if (arrData.length > 0) {
        for (let i = 0; i < arrData.length; i++) {
            let modObj = {}
            if (arrData[i].totalAmount > 0) {
                modObj["brandId"] = selectedBrandId;
                modObj["productId"] = arrData[i].productId;
                modObj["quantity"] = arrData[i].quantity;
                modObj["totalPrice"] = arrData[i].totalAmount

                modArr.push(modObj)
            }
        }
    }
    return modArr
}

export function modifyProfileData(objData) {
    // transactionType == 3 -> primary, 2 -> secondary
    // objData.totalItemCount
    let obj = {
        cartCount: (objData.totalItemCount == null || objData.totalItemCount == undefined) ? 0 : objData.totalItemCount,
        title: objData.customerName == null || objData.customerName == undefined ? "" : objData.customerName,
        profileImg: objData.profilePic == null || objData.profilePic == undefined ? "" : objData.profilePic,
        userId: objData.customerId == null || objData.customerId == undefined ? "" : objData.customerId,
        customerType: objData.custType == null || objData.custType == undefined ? "" : objData.custType,
    }

    return obj
}

export function modifyProductData(arrData) {
    let modArr = [];
    if (arrData.length > 0) {
        for (let i = 0; i < arrData.length; i++) {
            let modObj = {}
            if (arrData[i].totalAmount > 0) {
                modObj["productId"] = arrData[i].productId;
                modObj["quantity"] = arrData[i].quantity;
                modObj["totalPrice"] = arrData[i].totalAmount

                modArr.push(modObj)
            }
        }
    }
    return modArr
}

export function modHigherLevelData(arr) {
    let respArr = [];
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let modObj = {};
            modObj["mstHierarchyTypeId"] = arr[i].hierarchyTypeId;
            modObj["hierarchyDataId"] = arr[i].hierarchyDataId;
            modObj["hmName"] = arr[i].hmName;
            modObj["hmTypDesc"] = arr[i].hmTypDesc;
            modObj["check"] = false;

            respArr.push(modObj)
        }
    }

    return respArr;

}


function modOfflineHierarcyProductData(arr) {
    let respData = [];
    for (let i = 0; i < arr.length; i++) {
        let modObj = {}
        modObj["mstHierarchyTypeId"] = arr[i].typeId;
        modObj["hierarchyDataId"] = arr[i].itemId;
        modObj["hmName"] = arr[i].name;
        modObj["leafLevel"] = arr[i].leafLevel;
        modObj["check"] = false;

        respData.push(modObj)
    }

    return respData
}


export async function getUnitItemData() {
    let unitdata = await SelectSql.getAllITEM_UNIT()
    return unitdata;
}

////////////////////////////////////////////////////////////

// for offline user access
export async function getProductHierarcyDataFromOffline(hierarchyTypeId, hierarchyDataId, index, mainIndex, stateData, modMappedHigherLevelData, props) {
    let reqObj = {
        "hierarchyDataId": hierarchyDataId, "hierarchyTypeId": hierarchyTypeId
    };
    let apiRespData = modOfflineHierarcyProductData(await SelectSql.getItemHierarchyData(reqObj));
    if (apiRespData.length > 0) {
        let tempIndex = "";
        let isLeafLevelInsert = true;
        let finalArr = stateData.subCategoryArr;
        let finalObjData = {};
        if (index !== undefined && index !== null) {
            tempIndex = index;
        }
        // if reqObj data lenght is 0 and redux arr length is greater than 1 show the top divison 
        // else if reqObj data length is 0 and redux arr length is 1 then hide top division and call sub category length 
        // else if reqObj data lenght  is greater than 0 then su b category length is called
        // if (Object.keys(reqObjData).length == 0) {
        if (modMappedHigherLevelData.length > 1) {
            for (let i = 0; i < modMappedHigherLevelData.length; i++) {
                isLeafLevelInsert = true;
                finalObjData[((tempIndex.length > 0) ? tempIndex + "." : tempIndex) + (i.toString())] = modMappedHigherLevelData[i];
            }
        } else {
            for (let i = 0; i < apiRespData.length; i++) {
                if (apiRespData[i].leafLevel == 0) {
                    isLeafLevelInsert = false;
                }
                finalObjData[((tempIndex.length > 0) ? tempIndex + "." : tempIndex) + (i.toString())] = apiRespData[i];
            }
        }
        // } else {
        //     for (let i = 0; i < apiRespData.length; i++) {
        //         if (apiRespData[i].leafLevel == 0) {
        //             isLeafLevelInsert = false;
        //         }
        //         finalObjData[((tempIndex.length > 0) ? tempIndex + "." : tempIndex) + (i.toString())] = apiRespData[i];
        //     }
        // }

        for (let i = 0; i < apiRespData.length; i++) {
            if (apiRespData[i].leafLevel == 0) {
                isLeafLevelInsert = false;
            }
            finalObjData[((tempIndex.length > 0) ? tempIndex + "." : tempIndex) + (i.toString())] = apiRespData[i];
        }
        if (Object.keys(finalObjData).length > 0 && isLeafLevelInsert) {
            finalArr.push(finalObjData);
        }

        stateData.subCategoryArr = finalArr;
    }


    if (index === undefined || index === null) {
        stateData.subCategoryLoader = false;
    }
    // this.setState(this.state);



    // let outLetListArr = [];
    // let outletListData = await SelectSql.selectOUTLET_LISTByFilter({ search: stateData.searchText, customer: stateData.customerIdArr });
    // if (outletListData) {
    //     for (let i = 0; i < outletListData.rows.length; i++) {
    //         outLetListArr.push(outletListData.rows.item(i));
    //     }
    // }
    // stateData.outletList = modifyArrData(outLetListArr);
    // stateData.filterLoader = false;
    // stateData.pageLoader = false;
    // stateData.listLoader = false;
    // stateData.listDataLoader = false;
    // stateData.refreshing = false;
    // stateData.isApiCall = false;
    return stateData;
}


export async function getItemListDataFromOffline(reqData, prevStoreCartData, stateData, props) {
    let apiRespData = modItemList(await SelectSql.getItemListData({ "hierarchyTypeId": reqData.hierarchyTypeId, "hierarchyDataId": reqData.hierarchyDataId, "search": reqData.searchText }))

    if (apiRespData && apiRespData.length > 0) {
        stateData.fetchMoreProductDataCheck = true;
        for (let i = 0; i < apiRespData.length; i++) {
            apiRespData[i]["quantity"] = 0;
            apiRespData[i]["totalAmount"] = 0;
            apiRespData[i]["inputStdUnit"] = "";
            apiRespData[i]["stdUnitDisableCheck"] = false;
            apiRespData[i]["inputUnit"] = "";
            apiRespData[i]["unitDisableCheck"] = false;
            apiRespData[i]["inputRate"] = "";
            apiRespData[i]["rateCheck"] = false;

            if (apiRespData[i].productAttributes.StdUnit === undefined || apiRespData[i].productAttributes.StdUnit === null || apiRespData[i].productAttributes.StdUnit.length === 0) {
                apiRespData[i]["stdUnitDisableCheck"] = true;
            }
            if (apiRespData[i].productAttributes.Unit === undefined || apiRespData[i].productAttributes.Unit === null || apiRespData[i].productAttributes.Unit.length === 0) {
                apiRespData[i]["unitDisableCheck"] = true;
            }
            if (!(onCalculateProductRate(apiRespData[i], "Primary")).validCheck) {
                apiRespData[i]["rateCheck"] = true;
            }
            for (let j = 0; j < prevStoreCartData.length; j++) {
                if (apiRespData[i].hierarchyDataId == prevStoreCartData[j].hierarchyDataId) {
                    apiRespData[i].quantity = prevStoreCartData[j].quantity;
                    apiRespData[i].totalAmount = prevStoreCartData[j].totalAmount;
                    apiRespData[i].inputStdUnit = prevStoreCartData[j].inputStdUnit;
                    apiRespData[i].stdUnitDisableCheck = prevStoreCartData[j].stdUnitDisableCheck;
                    apiRespData[i].inputUnit = prevStoreCartData[j].inputUnit;
                    apiRespData[i].unitDisableCheck = prevStoreCartData[j].unitDisableCheck;
                    apiRespData[i].inputRate = prevStoreCartData[j].inputRate;
                    apiRespData[i].rateCheck = prevStoreCartData[j].rateCheck;
                    break;
                }
            }
        }

        stateData.selectProductList = apiRespData;
    }
    else {
        stateData.fetchMoreProductDataCheck = false;
    }

    stateData.listLoader = false;
    stateData.refreshing = false;
    stateData.productMainLoader = false;
    stateData.addCartLoader = false

    return stateData

};


function modItemList(arr) {

    let respData = [];
    for (let i = 0; i < arr.length; i++) {
        let modObj = {}
        modObj["mstHierarchyTypeId"] = arr[i].typeId;
        modObj["hierarchyDataId"] = arr[i].itemId;
        modObj["hmName"] = arr[i].name;
        modObj["hmDescription"] = arr[i].name;

        modObj["leafLevel"] = arr[i].leafLevel;
        modObj["productAttributes"] = arr[i].productAttributes;

        respData.push(modObj)
    }

    return respData
}

// for calculate product rate
export function onCalculateProductRate(item, type) {
    let tempRate = 0;
    let validCheck = false;
    // for product rate (customerType == "Primary" then PTD but retailer PTR)
    if (item.productAttributes.PTR) {
        tempRate = (parseFloat(item.productAttributes.PTR)).toFixed(2);
        validCheck = true;
    }
    if (type == "Primary") {
        if (item.productAttributes.PTD) {
            tempRate = (parseFloat(item.productAttributes.PTD)).toFixed(2);
            validCheck = true;
        }
    }
    return { rate: tempRate, validCheck: validCheck };
}

export function getTotalAmount(arr) {
    let totalAmount = 0;
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            totalAmount = totalAmount + parseFloat(arr[i].totalAmount)
        }

    }
    return totalAmount
}

export function modUnitData(arr){
    let respData = [];
    for (let i = 0; i < arr.length; i++) {
        let modObj = {}
        modObj["id"] = arr[i].unitId;
        modObj["name"] = arr[i].unitShort;
        
        respData.push(modObj)
    }

    return respData
}