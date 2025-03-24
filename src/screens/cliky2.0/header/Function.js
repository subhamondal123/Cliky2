import { StorageDataModification, Toaster } from "../../../services/common-view-function";
import { DeviceInfo } from "../../../services/config";
import { ErrorCode } from "../../../services/constant";
import { MiddlewareCheck } from "../../../services/middleware";

export async function userInfoStore(stateData, props) {
    let attendanceData = await StorageDataModification.headerData({}, "get");
    if (attendanceData) {
        props.stateUserInformation(attendanceData);
        stateData.attendanceLoader = false
        if (await DeviceInfo.CheckConnection()) {
            await apiCallHere(stateData, props);
        }
    } else {
        await apiCallHere(stateData, props);
        stateData.attendanceLoader = false
    }
}

async function apiCallHere(stateData, props) {
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
