import { StorageDataModification } from "../../../../../services/common-view-function";
import { DeviceInfo } from "../../../../../services/config";
import { ErrorCode } from "../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../services/middleware";

// for modify the customer type array data
export function modifyCustomerTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].contactTypeId;
            data[i]["name"] = data[i].contactTypeName;
            data[i]["check"] = false;
            data[i]["counter"] = 0;
        }
    } else {
        data = [];
    }
    return data;
}

// for get customer list from api and storage
export async function setCustomerType(stateData, props) {
    let routeVisitData = await StorageDataModification.routeFilterList({}, "get");
    if (routeVisitData) {
        stateData.customerTypeArr = routeVisitData;
        stateData.pageLoader = false;
        if (await DeviceInfo.CheckConnection()) {
            await onApiCall(stateData, props);
        }
    } else {
        stateData = await onApiCall(stateData, props);
        stateData.pageLoader = false;
    }
    return stateData;
}

// for api call to get the contact type data
async function onApiCall(stateData, props) {
    let responseData = await MiddlewareCheck("getContactTypes_v2", { isProject: "0" }, props);
    if (responseData)
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            let custData = modifyCustomerTypeArr(responseData.response);
            stateData.customerTypeArr = custData;
            await StorageDataModification.routeFilterList(custData, "store")
        }
    return stateData;
}