import { Toaster } from "../../../services/common-view-function";

export function modData(data) {
    var respData = { "List": [] };
    if (data) {
        let brandData = data.data;
        if (brandData && brandData.length > 0) {
            for (let i = 0; i < brandData.length; i++) {

                let modObj = {};
                if (brandData[i].id == undefined || brandData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = brandData[i].id;
                }
                if (brandData[i].recordNumber == undefined || brandData[i].recordNumber == null) {
                    modObj["recordNumber"] = "";
                } else {
                    modObj["recordNumber"] = brandData[i].recordNumber;
                }
                if (brandData[i].transactionType == undefined || brandData[i].transactionType == null) {
                    modObj["transactionType"] = "";
                } else {
                    modObj["transactionType"] = brandData[i].transactionType;
                }
                if (brandData[i].convertionCustTyp == undefined || brandData[i].convertionCustTyp == null) {
                    modObj["convertionCustTyp"] = "";
                } else {
                    modObj["convertionCustTyp"] = brandData[i].convertionCustTyp;
                }
                if (brandData[i].contactId == undefined || brandData[i].contactId == null) {
                    modObj["contactId"] = "";
                } else {
                    modObj["contactId"] = brandData[i].contactId;
                }
                if (brandData[i].approvedQuantity == undefined || brandData[i].approvedQuantity == null) {
                    modObj["approvedQuantity"] = "";
                } else {
                    modObj["approvedQuantity"] = brandData[i].approvedQuantity;
                }
                if (brandData[i].approvedStatus == undefined || brandData[i].approvedStatus == null) {
                    modObj["approvedStatus"] = "";
                } else {
                    modObj["approvedStatus"] = brandData[i].approvedStatus;
                }
                if (brandData[i].approvedTotalPrice == undefined || brandData[i].approvedTotalPrice == null) {
                    modObj["approvedTotalPrice"] = "";
                } else {
                    modObj["approvedTotalPrice"] = brandData[i].approvedTotalPrice;
                }

                if (brandData[i].hierarchyDataId == undefined || brandData[i].hierarchyDataId == null) {
                    modObj["hierarchyDataId"] = "";
                } else {
                    modObj["hierarchyDataId"] = brandData[i].hierarchyDataId;
                }
                if (brandData[i].hierarchyTypeId == undefined || brandData[i].hierarchyTypeId == null) {
                    modObj["hierarchyTypeId"] = "";
                } else {
                    modObj["hierarchyTypeId"] = brandData[i].hierarchyTypeId;
                }
                if (brandData[i].productName == undefined || brandData[i].productName == null) {
                    modObj["hmName"] = "";
                } else {
                    modObj["hmName"] = brandData[i].productName;
                }
                if (brandData[i].productName == undefined || brandData[i].productName == null) {
                    modObj["hmDescription"] = "";
                } else {
                    modObj["hmDescription"] = brandData[i].productName;
                }
                if (brandData[i].totalPrice == undefined || brandData[i].totalPrice == null) {
                    modObj["totalPrice"] = "";
                } else {
                    modObj["totalPrice"] = brandData[i].totalPrice;
                }
                if (brandData[i].totalQty == undefined || brandData[i].totalQty == null) {
                    modObj["totalQty"] = "";
                } else {
                    modObj["totalQty"] = brandData[i].totalQty;
                }
                if (brandData[i].unit == undefined || brandData[i].unit == null) {
                    modObj["unit"] = "";
                } else {
                    modObj["unit"] = brandData[i].unit;
                }
                if (brandData[i].unitPrice == undefined || brandData[i].unitPrice == null) {
                    modObj["unitPrice"] = "";
                } else {
                    modObj["unitPrice"] = brandData[i].unitPrice;
                }
                if (brandData[i].leafLevel == undefined || brandData[i].leafLevel == null) {
                    modObj["leafLevel"] = 0;
                } else {
                    modObj["leafLevel"] = brandData[i].leafLevel;
                }
                if (brandData[i].productAttributes == undefined || brandData[i].productAttributes == null) {
                    modObj["productAttributes"] = {};
                } else {
                    modObj["productAttributes"] = modAttributes(brandData[i].productAttributes);
                }
                modObj["check"] = i == 0 ? true : false;
                respData.List.push(modObj);
            }
        }
    }
    return (respData);
}


function modAttributes(data) {
    let attributeObj = {};
    for (let j = 0; j < data.length; j++) {
        attributeObj[data[j].attributeTyesDesc] = data[j].attributeValue;
    }
    return attributeObj
}

export function validData(data) {
    let errCount = 0,
        status = true;
    for (let i = 0; i < data.orderDetails.length; i++) {
        if (data.orderDetails[i].quantity == 0) {
            Toaster.ShortCenterToaster("Please enter quantity !")
            errCount++
        }
    }
    if (errCount > 0) {
        status = false
    }
    return status
}

export function modAddedItems(arr, itemList) {
    let modArr = []
    for (let i = 0; i < arr.length; i++) {
        let modObj = {};
        modObj["id"] = ""
        modObj["recordNumber"] = itemList[0].recordNumber
        modObj["transactionType"] = itemList[0].transactionType
        modObj["convertionCustTyp"] = itemList[0].convertionCustTyp
        modObj["contactId"] = itemList[0].contactId
        modObj["approvedQuantity"] = arr[i].quantity
        modObj["approvedStatus"] = itemList[0].approvedStatus
        modObj["approvedTotalPrice"] = arr[i].totalAmount
        modObj["hierarchyDataId"] = arr[i].hierarchyDataId
        modObj["hierarchyTypeId"] = arr[i].mstHierarchyTypeId
        modObj["hmName"] = arr[i].hmName
        modObj["hmDescription"] = arr[i].hmDescription
        modObj["totalPrice"] = arr[i].totalAmount
        modObj["totalQty"] = arr[i].quantity
        modObj["unit"] = arr[i].productAttributes.Unit
        modObj["leafLevel"] = arr[i].leafLevel
        modObj["productAttributes"] = arr[i].productAttributes
        modObj["check"] = false
        modObj["quantity"] = arr[i].quantity.toString()
        modObj["totalAmount"] = arr[i].totalAmount
        modObj["inputStdUnit"] = arr[i].inputStdUnit.toString()
        modObj["stdUnitDisableCheck"] = arr[i].stdUnitDisableCheck
        modObj["inputUnit"] = arr[i].inputUnit.toString()
        modObj["unitDisableCheck"] = arr[i].unitDisableCheck
        modObj["inputRate"] = arr[i].inputRate
        modObj["rateCheck"] = arr[i].rateCheck


        modArr.push(modObj)
    }

    return modArr
}