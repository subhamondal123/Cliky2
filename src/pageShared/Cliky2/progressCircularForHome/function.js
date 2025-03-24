import { StorageDataModification } from "../../../services/common-view-function";
import { DeviceInfo } from "../../../services/config";
import { ErrorCode } from "../../../services/constant";
import { MiddlewareCheck } from "../../../services/middleware";

export async function stoteProgressData(stateData, props) {
    let progressData = await StorageDataModification.progressCircularForHomeData({}, "get");
    if (progressData) {
        stateData.progressData = progressData;
        stateData.loader = false;
        if (await DeviceInfo.CheckConnection()) {
            await onApiCalling(stateData, props);
        }
    } else {
        await onApiCalling(stateData, props);
        stateData.loader = false;
    }
}

export async function onApiCalling(stateData, props) {
    let responseData = await MiddlewareCheck("TargetVsAchievement", {}, props);
    if (responseData) {
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            stateData.progressData = responseData.response;
            await StorageDataModification.progressCircularForHomeData(responseData.response, "store");
        }
    }
}

