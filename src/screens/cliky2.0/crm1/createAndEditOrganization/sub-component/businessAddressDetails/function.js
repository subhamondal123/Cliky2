import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let arrCounter = 0;
    let resObj = {
        status: false
    }


    if (data.orgAddress == undefined || data.orgAddress == null || data.orgAddress.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SURVEY.ADDRESS_ERROR);
        errCounter++;
    }
    else if (data.locationArr == undefined || data.locationArr == null || Object.keys(data.locationArr).length == 0) {
        Toaster.ShortCenterToaster("Please add location !");
        errCounter++;
    }


    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}



export function modifyLocationMappedData(mainData, listData) {
    let finalData = [];
    if (mainData && mainData.length > 0) {
        const sortedLocationMapData = mainData.sort((a, b) => a.SlNo - b.SlNo);
        finalData = sortedLocationMapData.map(mainItem => {
            const matchingListItems = listData.filter(listItem => listItem.slNo === mainItem.SlNo);
            return {
                ...mainItem,
                fileItem: matchingListItems
            };
        });
    }
    return finalData;
}
