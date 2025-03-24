import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let arrCounter = 0;
    let resObj = {
        status: false
    }

   
     if (data.orgDescription == undefined || data.orgDescription == null || data.orgDescription.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.ORGANIZATION.DESCRIPTION_ERROR);
        errCounter++;
    }
    

    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}
