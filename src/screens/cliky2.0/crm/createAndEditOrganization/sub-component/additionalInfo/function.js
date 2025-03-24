import { AlertMessage } from "../../../../../../enums";
import { CommonFunctions, Toaster } from "../../../../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let arrCounter = 0;
    let resObj = {
        status: false
    }
    // if (data.website == undefined || data.website == null || data.website.length == 0) {
    //     Toaster.ShortCenterToaster("Please enter website !");
    //     errCounter++;
    // } else if (!CommonFunctions.isValidWebsiteUrl(data.website)) {
    //     Toaster.ShortCenterToaster("Invalid URL !");
    //     errCounter++;
    // }


    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function modifyOrgData(data){
    let respData = { "list": [] };
    if (data) {
        let stateData = data;
        if (stateData && stateData.length > 0) {
            for (let i = 0; i < stateData.length; i++) {
                let modObj = {};
                if (stateData[i].organizationId == undefined || stateData[i].organizationId == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = stateData[i].organizationId;
                }
                if (stateData[i].organizationName == undefined || stateData[i].organizationName == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = stateData[i].organizationName;
                }
                
                modObj["check"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}
modifySubDomain

export function modifySubDomain(data){
    let respData = { "list": [] };
    if (data) {
        let stateData = data;
        if (stateData && stateData.length > 0) {
            for (let i = 0; i < stateData.length; i++) {
                let modObj = {};
                if (stateData[i].id == undefined || stateData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = stateData[i].id;
                }
                if (stateData[i].subDomainName == undefined || stateData[i].subDomainName == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = stateData[i].subDomainName;
                }
                
                modObj["check"] = false;
                respData.list.push(modObj);
            }
        }
    }
    return (respData);
}