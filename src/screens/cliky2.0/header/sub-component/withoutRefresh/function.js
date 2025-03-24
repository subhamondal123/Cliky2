import { DateConvert, StorageDataModification, Toaster } from "../../../../../services/common-view-function";
import { DeviceInfo } from "../../../../../services/config";
import { ErrorCode } from "../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../services/middleware";

export function modifyAttendanceData(data) {
    let resArray = [];
    if (data && data.length > 0) {
        resArray = data;
        for (let i = 0; i < resArray.length; i++) {
            resArray[i]["id"] = resArray[i].activityId;
            resArray[i]["name"] = resArray[i].activityName;
        }
    }
    return resArray;
}

export function getModData(data) {
    data["id"] = data.activityId;
    data["name"] = data.activityName;
    return data;
}

export async function getGeneralData(stateData, props) {
    let headerData = await StorageDataModification.headerData({}, "get");
    if (headerData == null || headerData == undefined) {
        stateData.pageLoader = true;
    }
    if (headerData) {
        stateData.userGeneralData = headerData;
        stateData.attendanceLoader = false;
        stateData.pageLoader = false;
        if (await DeviceInfo.CheckConnection()) {
        await generalDataApiCall(stateData, props, headerData);
        }
    } else {
        await generalDataApiCall(stateData, props, headerData);
        stateData.attendanceLoader = false;
        stateData.pageLoader = false;
    }

}

async function generalDataApiCall(stateData, props, headerData) {
    stateData.attendanceLoader = true;
    let responseData = await MiddlewareCheck("getGeneralData", {}, this.props);
    if (responseData) {
        if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR && responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            if (headerData == null || headerData == undefined || headerData !== responseData.data) {
                stateData.pageLoader = true;
                props.stateUserInformation(responseData.data);
                await StorageDataModification.headerData(responseData.data, "store");
                stateData.userGeneralData = responseData.data;
                stateData.pageLoader = false;
                props.onRefresh();
            }
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
    }
   
}




export async function attendanceDataStore(stateData, props) {
    let attendanceData = await StorageDataModification.attendaceData({}, "get");
    await attendanceApiCall()

}

async function attendanceApiCall(stateData, props) {
    let reqData = { time: DateConvert.fullDateFormat(new Date()), "address": null, activityId: stateData.attendanceDropDownObj.id };
    // this.setState({ attendanceLoader: true });
    stateData.attendanceLoader = true
    let responseData = await MiddlewareCheck("addAttendance", reqData, props)
    if (responseData) {
        if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
            Toaster.ShortCenterToaster(responseData.data.message);
            this.setState({ attendanceSuccessLoader: true });
            this._onVisibleModal();
            this._getUserInfoFromApi();
            this._onAttendanceVisible();
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
    }
}
