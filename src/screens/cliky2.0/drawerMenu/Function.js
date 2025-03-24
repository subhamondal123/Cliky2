import { StorageDataModification, Toaster } from "../../../services/common-view-function";
import { DeviceInfo } from "../../../services/config";
import { ErrorCode } from "../../../services/constant";
import { MiddlewareCheck } from "../../../services/middleware";


export async function userInfoStore(stateData, props) {
    let headerData = await StorageDataModification.headerData({}, "get");
    if (headerData) {
        stateData.userInfo = headerData;
        if (await DeviceInfo.CheckConnection()) {
            await getGeneralData(stateData, props);
        } else {
            props.stateUserInformation(headerData);
        }
    } else {
        await getGeneralData(stateData, props);
    }
    stateData.userInfoLoader = false;
    // stateData.refreshing = false;
    return stateData;
}

// for fetch the general data from api
async function getGeneralData(stateData, props) {
    let responseData = await MiddlewareCheck("getGeneralData", {}, props);
    if (responseData) {
        if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR && responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            props.stateUserInformation(responseData.data);
            await StorageDataModification.headerData(responseData.data, "store");
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
    }
}
