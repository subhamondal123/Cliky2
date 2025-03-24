import { StorageDataModification, Toaster } from "../../../../../services/common-view-function";
import { ErrorCode } from "../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../services/middleware";

export function modifySubordinateArr(data) {
    let resData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].childUserName != null || data[i].childUserName != undefined) {
                resData.push({ id: data[i].childId, name: data[i].childUserName })
            }
        }
    } else {
        resData = [];
    }
    return resData;
}

export function validateData(data) {
    let respStatus = true;
    if (Object.keys(data.selectedSubordinateObj).length == 0 && data.dateObj.date.length == 0) {
        respStatus = false;
        Toaster.ShortCenterToaster("Please select Date or Subordinate !");
    }
    return respStatus;
}


export async function subordinateStore(stateData, props) {
    let subordinateData = await StorageDataModification.storeSubordinateData({}, "get")
    if (subordinateData) {
        stateData.data = subordinateData;
        stateData.pageLoader = false;
        await subordinateApiCall(stateData, props)
    } else {
        await subordinateApiCall(stateData, props)
        stateData.pageLoader = false;

    }
}

async function subordinateApiCall(stateData, props) {
    let responseData = await MiddlewareCheck("getChildUserByParent", {}, props);
    if (responseData) {
        if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR && responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            stateData.data = modifySubordinateArr(responseData.data);
            await StorageDataModification.storeSubordinateData(stateData.data, "store")
        }
    }
}