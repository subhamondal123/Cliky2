import { StorageDataModification } from ".";
import { DeviceInfo } from "../config";
import { ErrorCode } from "../constant";
import { MiddlewareCheck } from "../middleware";
import { CountSql, CreateSql, DropSql } from "../sql";
import { ClientSettings } from "../userPermissions";

// for check the offline table data
export async function offlineUserCheck(stateData, props) {
    if (await ClientSettings.OfflineAccess.getOfflineAccess()) {
        await CreateSql.createAllTable();
        let outletListCountSql = await CountSql.getCountForOUTLET_LIST();
        // let salesReportOutletCountSql = await CountSql.getCountForSALES_REPORT_OUTLET();
        let itemListDataCountSql = await CountSql.getCountForITEM_LIST();
        let itemAttributesCountSql = await CountSql.getCountForITEM_ATTRIBUTES();
        let itemUnitCountSql = await CountSql.getCountForITEM_UNIT();
        let emptyCount = 0;
        if (outletListCountSql && itemListDataCountSql && itemAttributesCountSql && itemUnitCountSql) {
            if (outletListCountSql.dataCount == 0) {
                emptyCount++;
            }
            // if (salesReportOutletCountSql.dataCount == 0) {
            //     emptyCount++;
            // }
            if (itemListDataCountSql.dataCount == 0) {
                emptyCount++;
            }
            if (itemAttributesCountSql.dataCount == 0) {
                emptyCount++;
            }
            if (itemUnitCountSql.dataCount == 0) {
                emptyCount++;
            }
        } else {
            emptyCount++;
        }
        if (emptyCount > 0) {
            stateData.offlineProgressModal = true;
        }
    }
    return stateData;
}


export async function syncOfflineData(props, type) {
    let visitOfflineData = await StorageDataModification.customerOrderANdVisitData({}, "get");
    if (await DeviceInfo.CheckConnection()) {
        if (visitOfflineData !== null && visitOfflineData !== undefined && Object.keys(visitOfflineData).length > 0) {
            for (const property in visitOfflineData) {
                let curfound = false; //if the order data is in cart or not variable ,true ==> in cart , false ==>order placed

                if (Object.keys(visitOfflineData[property].visitNoteData).length > 0 && Object.keys(visitOfflineData[property].orderData).length == 0) {
                    curfound = true;
                }

                if (Object.keys(visitOfflineData[property].orderData).length > 0) {
                    if (visitOfflineData[property].orderData.orderDetails && visitOfflineData[property].orderData.orderDetails.length > 0) {
                        for (let i = 0; i < visitOfflineData[property].orderData.orderDetails.length; i++) {
                            if (visitOfflineData[property].orderData.orderDetails[i].isPlaceOrder && visitOfflineData[property].orderData.orderDetails[i].isSync == false) {
                                curfound = true;
                            }
                        }
                    }
                }

                if (curfound) {
                    if (Object.keys(visitOfflineData[property].visitNoteData).length > 0 || Object.keys(visitOfflineData[property].orderData).length > 0) {

                        let responseSyncData = await MiddlewareCheck("saveOfflineVisitAndOrders", visitOfflineData[property], props);
                        if (responseSyncData) {
                            if (responseSyncData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                                visitOfflineData[property].visitNoteData = {}
                                if (Object.keys(visitOfflineData[property].orderData).length > 0) {
                                    if (visitOfflineData[property].orderData.orderDetails && visitOfflineData[property].orderData.orderDetails.length > 0) {
                                        for (let i = 0; i < visitOfflineData[property].orderData.orderDetails.length; i++) {
                                            if (visitOfflineData[property].orderData.orderDetails[i].isPlaceOrder == true) {
                                                visitOfflineData[property].orderData.orderDetails[i].isSync = true

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            await deleteSyncedData(visitOfflineData)
            if (type == "routeChange") {
                await StorageDataModification.customerOrderANdVisitData({}, "clear")
            }
        }
    }
    return true;
}

modifyStoreData = (objData) => {
    let arr = [];
    for (let i = 0; objData.orderData.orderDetails.length; i++) {
        if (objData.orderData.orderDetails[i].isPlaceOrder == true && objData.orderData.orderDetails[i].isSync == false) {
            arr.push(objData.orderData.orderDetails[i])
        }
    }
    objData.objData.orderData.orderDetails = arr
    return objData
}

deleteSyncedData = async (visitOfflineData) => {
    for (const property in visitOfflineData) {
        if (Object.keys(visitOfflineData[property].orderData).length > 0) {
            if (visitOfflineData[property].orderData.orderDetails && visitOfflineData[property].orderData.orderDetails.length > 0) {
                for (let i = 0; i < visitOfflineData[property].orderData.orderDetails.length; i++) {
                    if (visitOfflineData[property].orderData.orderDetails[i].isSync == true) {
                        visitOfflineData[property].orderData.orderDetails.splice(i, 1);
                    }
                }
            } else {
                visitOfflineData[property].orderData = {}
            }
        }
        if ((Object.keys(visitOfflineData[property].visitNoteData).length == 0 && Object.keys(visitOfflineData[property].orderData).length == 0) || (Object.keys(visitOfflineData[property].visitNoteData).length == 0 && visitOfflineData[property].orderData.orderDetails.length == 0)) {
            delete visitOfflineData[property]
        }
    }
    await StorageDataModification.customerOrderANdVisitData(visitOfflineData, "store");
}


// for clear the table
export async function clearStorageForRouteChange(props) {
    await CreateSql.createAllTable();
    await DropSql.dropAllTable();
    // await StorageDataModification.customerOrderANdVisitData(null, "store")
    return true;
}


// for attendance 


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
