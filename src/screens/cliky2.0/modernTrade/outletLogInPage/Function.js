import { StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { App_uri } from "../../../../services/config";
import { ErrorCode } from "../../../../services/constant";
import { MiddlewareCheck } from "../../../../services/middleware";

export async function onLoginApiCall(stateData, props) {
    let storeData = await StorageDataModification.routeData({}, "get");
    let errorCount = 0;
    if (stateData.profileImg == null || stateData.profileImg == undefined || stateData.profileImg == "") {
        Toaster.ShortCenterToaster("Please select picture !")
        errorCount++;
    }
    if (errorCount == 0) {
        let reqData = {
            "shopId": stateData.outletLoginList.shopId,
            "visitImage": stateData.profileImg,
            "locationData": [
                {
                    "hierarchyTypeId": storeData.hierarchyTypeId,
                    "hierarchyDataId": storeData.hierarchyDataId
                }
            ]
        }
        stateData.logInLoader = true;
        let responseData = await MiddlewareCheck("loginVisitMTCustomer", reqData, props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                stateData.isinisialView = false;
                Toaster.ShortCenterToaster(responseData.message);
                await StorageDataModification.visitIdStore(responseData.response.visitId, "store");
            }
        }
        stateData.logInLoader = false;
    }
    return stateData
}

export function modifyData(data, stateData) {
    let modObj = {}
    if (data) {
        if (data.profilePic == undefined || data.profilePic == null || data.profilePic.length == 0) {
            data["profilePic"] = "";
        } else {
            data["profilePic"] =  data.profilePic;
        }
        if (data.custBusinessName == undefined || data.custBusinessName == null || data.custBusinessName.length == 0) {
            data["custBusinessName"] = "";
        } else {
            data["custBusinessName"] = data.custBusinessName;
        }
        if (data.firstName == undefined || data.firstName == null || data.firstName.length == 0) {
            data["firstName"] = "";
        } else {
            data["firstName"] = data.firstName;
        }
        if (data.lastName == undefined || data.lastName == null || data.lastName.length == 0) {
            data["lastName"] = "";
        } else {
            data["lastName"] = data.lastName;
        }
        if (data.phoneNumber == undefined || data.phoneNumber == null || data.phoneNumber.length == 0) {
            data["phoneNumber"] = "";
        } else {
            data["phoneNumber"] = data.phoneNumber;
        }
        if (data.email == undefined || data.email == null || data.email.length == 0) {
            data["email"] = "";
        } else {
            data["email"] = data.email;
        }
        if (data.address == undefined || data.address == null || data.address.length == 0) {
            data["address"] = "";
        } else {
            data["address"] = data.address;
        }
        if (data.description == undefined || data.description == null || data.description.length == 0) {
            data["description"] = "";
        } else {
            data["description"] = data.description;
        }
        if (data.approvedDatetime == undefined || data.approvedDatetime == null || data.approvedDatetime.length == 0) {
            data["approvedDatetime"] = "";
        } else {
            data["approvedDatetime"] = data.approvedDatetime;
        }
        if (data.approvedRemarks == undefined || data.approvedRemarks == null || data.approvedRemarks.length == 0) {
            data["approvedRemarks"] = "";
        } else {
            data["approvedRemarks"] = data.approvedRemarks;
        }
        if (data.contactTypeName == undefined || data.contactTypeName == null || data.contactTypeName.length == 0) {
            data["contactTypeName"] = "";
        } else {
            data["contactTypeName"] = data.contactTypeName;
        }

        // stateData.outletLoginList.push(modObj);
    }
    return data;
}