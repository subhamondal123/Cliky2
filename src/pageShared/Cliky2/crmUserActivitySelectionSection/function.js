import { StorageDataModification } from "../../../services/common-view-function";
import { DeviceInfo } from "../../../services/config";
import { ErrorCode } from "../../../services/constant";
import { MiddlewareCheck } from "../../../services/middleware";


export async function storageTabData(stateData, props) {
    let storageData = await StorageDataModification.crmUserActivitySelectionSectionData({}, "get")

    if (storageData) {
        stateData.dayData = storageData;
        stateData.loader = false
        if (await DeviceInfo.CheckConnection()) {
            await onApiCalling(stateData, props);
        }
    } else {
        await onApiCalling(stateData, props);
        stateData.loader = false
    }
}

async function onApiCalling(stateData, props) {
    let responseData = await MiddlewareCheck("getCrmDashboardDataForMobile", {}, props);
    if (responseData) {
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            stateData.dayData = responseData.response;
            await StorageDataModification.crmUserActivitySelectionSectionData(responseData.response, "store")
        }
    }
}
