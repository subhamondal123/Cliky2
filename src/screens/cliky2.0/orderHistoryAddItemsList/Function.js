import { Toaster } from "../../../services/common-view-function";

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

export function validateData(data) {
    let errCount = 0,
        status = true;
    if (data.length == 0) {
        Toaster.ShortCenterToaster("Please add atleast one product !");
        errCount++
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].quantity == 0) {
                Toaster.ShortCenterToaster("Please enter quantity !")
                errCount++
            }
        }
    }

    if (errCount > 0) {
        status = false
    }
    return status
}