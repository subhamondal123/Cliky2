import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }
    let prodArr = data.productArr

    for(let i = 0;i < prodArr.length;i++){
        if ( prodArr[i].productArr == undefined || prodArr[i].productArr == null || prodArr[i].productArr.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CSR_ADD.PRODUCT_ERROR);
            errCounter++;
        } else if (prodArr[i].productDescription == undefined || prodArr[i].productDescription == null || prodArr[i].productDescription.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.NEW_NOTES.DESCRIPTION_ERROR);
            errCounter++;
        }   
        else if (prodArr[i].competitorType == undefined || prodArr[i].competitorType == null || prodArr[i].competitorType.length == 0) {
            Toaster.ShortCenterToaster("Please select current or competitor !");
            errCounter++;
        }
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