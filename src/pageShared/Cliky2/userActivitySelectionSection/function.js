import { StorageDataModification } from "../../../services/common-view-function";
import { DeviceInfo } from "../../../services/config";
import { ErrorCode } from "../../../services/constant";
import { MiddlewareCheck } from "../../../services/middleware";


export async function storageTabData(stateData, props) {
    let storageData = await StorageDataModification.userActivitySelectionSectionData({}, "get")
    if (storageData) {
        if (await DeviceInfo.CheckConnection()) {
            return await onApiCalling(stateData, props);
        }
        // stateData.dayData = storageData;
        // stateData.loader = false
        return storageData

    } else {
        return await onApiCalling(stateData, props);
        // stateData.loader = false
    }
}
async function onApiCalling(stateData, props) {
    let arrData = [];
    let responseData = await MiddlewareCheck("UserActivitySelectionSection", {}, props);
    if (responseData) {
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            stateData.dayData = responseData.response;
            arrData = responseData.response
            await StorageDataModification.userActivitySelectionSectionData(responseData.response, "store")
        }
    }
    return arrData
}
