import { DateConvert, StorageDataModification } from "../../../services/common-view-function";
import { ErrorCode } from "../../../services/constant";
import { MiddlewareCheck } from "../../../services/middleware";


export async function dailyOrderList(stateData, props) {
    let dailyList = await StorageDataModification.dayWiseOrderListData({}, "get");
    if (dailyList) {
        stateData.data = dailyList.data;
        stateData.orderCount = dailyList.totalOrderCount;
        stateData.loader = false;
        // await fetchOrderData(stateData, props)
    } else {
        await fetchOrderData(stateData, props, state)
        stateData.loader = false;
    }
}

export async function fetchOrderData(stateData, props) {
    let reqData = {
        currentDate: DateConvert.formatYYYYMMDD(stateData.changedDate),
        searchText: "",
        limit: "5",
        offset: "0"
    }
    let responseData = await MiddlewareCheck("getCurrentOrdersListForDashboard", reqData, props);
    if (responseData) {
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            stateData.data = responseData.response.data;
            stateData.orderCount = responseData.response.totalOrderCount;
            await StorageDataModification.dayWiseOrderListData(responseData.response, "store");
        }
    }
    return 
}

export function modifyOrderListData(arr) {
    let respArrData = [];
    for(let i = 0;i<arr.length;i++){
        if(arr[i].isPlaceOrder){
            respArrData.push(arr[i])
        }
    }
    return respArrData
}
