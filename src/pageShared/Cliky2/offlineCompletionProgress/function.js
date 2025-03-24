import { OfflineFunction, StorageDataModification } from "../../../services/common-view-function";
import { DeviceInfo } from "../../../services/config";
import { ErrorCode } from "../../../services/constant";
import { MiddlewareCheck } from "../../../services/middleware";
import { CountSql, CreateSql, DropSql, InsertSql, SelectSql } from "../../../services/sql";
import { ClientSettings } from "../../../services/userPermissions";


export async function offlineDataFetch(props) {
    if (await ClientSettings.OfflineAccess.getOfflineAccess()) {
        await CreateSql.createAllTable();
        let itemListCount = await CountSql.getCountForITEM_LIST();
        let itemAttributesCount = await CountSql.getCountForITEM_ATTRIBUTES();
        let outletListCount = await CountSql.getCountForOUTLET_LIST();
        let salesReportOutletCount = await CountSql.getCountForSALES_REPORT_OUTLET();
        let itemUnitCount = await CountSql.getCountForITEM_UNIT();
        let dataReq = { "searchName": "", "searchTextCustName": "", "searchTextCustType": "", "searchTextCustPhone": "", "searchTextCustBusinessName": "", "searchCustPartyCode": "", "searchCustVisitDate": "", "searchFrom": "", "searchTo": "", "status": "", "contactType": "", "phoneNo": "", "isProject": "0", "contactTypeId": "", "contactTypeIdArr": [], "isDownload": "0", "approvalList": "0", "customerAccessType": "", "hierarchyDataIdArr": [{ "hierarchyTypeId": props.Sales360Redux.routeData.hierarchyTypeId, "hierarchyDataId": props.Sales360Redux.routeData.hierarchyDataId }] };
        let itemData = null;
        let shopData = null;
        let shopDetailsData = null;
        let itemUnitData = null;

        // for item list
        if (itemListCount.dataCount == 0 || itemAttributesCount.dataCount == 0) {
            itemData = await MiddlewareCheck("getOfflineLtemsConfig", {}, props);
        }
        // for Customer list
        if (outletListCount.dataCount == 0) {
            shopData = await MiddlewareCheck("gn_getListOfNewRegCustomersForOffline", dataReq, props);
        }
        // for Customer Details list
        // if (salesReportOutletCount.dataCount == 0) {
        //     shopDetailsData = await MiddlewareCheck("gn_getListOfNewRegCustomerDetailsForOffline", dataReq, props);
        // }
        // for Unit and List
        if (itemUnitCount.dataCount == 0) {
            itemUnitData = await MiddlewareCheck("getAllMasterUnitList", {}, props);
        }
        // for insert item and item attribute
        if (itemData) {
            if (itemData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let itemList = itemData.response.itemList;
                let itemAttributes = itemData.response.itemAttributes;
                if (itemListCount.dataCount == 0) {
                    for (let i = 0; i < itemList.length; i++) {
                        await InsertSql.insertITEM_LIST(itemList[i]);
                    }
                }
                if (itemAttributesCount.dataCount == 0) {
                    for (let i = 0; i < itemAttributes.length; i++) {
                        await InsertSql.insertITEM_ATTRIBUTES(itemAttributes[i]);
                    }
                }


            }
        }

        // for insert shop list data
        if (shopData) {
            if (shopData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let customerListData = shopData.response.customerListData;
                for (let i = 0; i < customerListData.length; i++) {
                    await InsertSql.insertOUTLET_LIST(customerListData[i]);
                }
            }
        }

        // for insert shop sales report data
        // if (shopDetailsData) {
        //     if (shopDetailsData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //         let customerOtherDetails = shopDetailsData.response
        //         for (let i = 0; i < customerOtherDetails.length; i++) {
        //             await InsertSql.insertSALES_REPORT_OUTLET(customerOtherDetails[i]);
        //         }
        //     }
        // }

        // for insert item unit
        if (itemUnitData) {
            if (itemUnitData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let listData = itemUnitData.data;
                for (let i = 0; i < listData.length; i++) {
                    await InsertSql.insertITEM_UNIT(listData[i]);
                }
            }
        }
    }
    await OfflineFunction.syncOfflineData(this.props,"routeChange");

    return true;
}



// for visit notes data store
export async function visitNotesData(props) {
    let visitNotesStorageData = await StorageDataModification.visitNotesDropDownData({}, "get");
    if (visitNotesStorageData) {
        if (await DeviceInfo.CheckConnection()) {
            await visitApiCall(props);
        }
    } else {
        await visitApiCall(props);
    }
    return true;
}

async function visitApiCall(props) {
    let responseData = await MiddlewareCheck("getOfflineVisitFeedbackConfig", {}, props);
    if (responseData) {
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            await StorageDataModification.visitNotesDropDownData(responseData.response, "store");
        }
    }
    return true;
}

// for route filter data store 
export async function routeFilter(props) {
    let routeStorageData = await StorageDataModification.routeFilterList({}, "get");
    if (routeStorageData) {
        if (await DeviceInfo.CheckConnection()) {
            await apiCall(props);
        }
    } else {
        await apiCall(props);
    }
    return true;
}

async function apiCall(props) {
    let responseData = await MiddlewareCheck("getContactTypes_v2", { isProject: "0" }, props);
    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let custData = modifyCustomerTypeArr(responseData.response);
        await StorageDataModification.routeFilterList(custData, "store");
    }
    return true;
}

function modifyCustomerTypeArr(data) {
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