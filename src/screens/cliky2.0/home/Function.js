import { StorageDataModification, Toaster } from "../../../services/common-view-function";
import { DeviceInfo } from "../../../services/config";
import { ErrorCode } from "../../../services/constant";
import { MiddlewareCheck } from "../../../services/middleware";

export async function attendanceSyncData(props) {
    let attendanceData = await StorageDataModification.attendanceData({}, "get");
    if (attendanceData) {
        let reqData = { "address": null };
        if (attendanceData.inLattitude !== null && attendanceData.inLongitude !== null && attendanceData.inTime !== null) {
            reqData = { "lattitude": attendanceData.inLattitude, "longitude": attendanceData.inLongitude, "time": attendanceData.inTime, "currentDateTime": attendanceData.inTime, "address": null, activityId: "0" };
            await attendanceApiCall(reqData, "in", props)
        }
        if (attendanceData.outLattitude !== null && attendanceData.outLongitude !== null && attendanceData.outTime !== null) {
            reqData = { "lattitude": attendanceData.outLattitude, "longitude": attendanceData.outLongitude, "time": attendanceData.outTime, "currentDateTime": attendanceData.outTime, "address": null, activityId: "0" }
            await attendanceApiCall(reqData, "out", props)
        }
    }
}


async function attendanceApiCall(reqData, type, props) {
    let attendanceReduxData = props.Sales360Redux.attendanceData;
    if (await DeviceInfo.CheckConnection()) {
        let responseData = await MiddlewareCheck("addAttendance", reqData, props)
        if (responseData) {
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                if (type == "in") {
                    attendanceReduxData.inLattitude = null;
                    attendanceReduxData.inLongitude = null;
                    attendanceReduxData.inTime = null;
                } else {
                    attendanceReduxData.outLattitude = null;
                    attendanceReduxData.outLongitude = null;
                    attendanceReduxData.outTime = null;
                }
                props.userAttendanceData(attendanceReduxData);
                await StorageDataModification.attendanceData(attendanceReduxData, "store");
            }
        }
    }

}



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
    stateData.attendanceLoader = false;
    stateData.refreshing = false;
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

