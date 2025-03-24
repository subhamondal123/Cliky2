
import { Toaster } from "../../../../../../services/common-view-function";

export function validateData(data,imageUrl) {
    let errCounter = 0;
    let resObj = {
        status: false
    }
    
    let prodArr = data.leadPlatform

    if ( data.profilePic == undefined || data.profilePic == null || data.profilePic.length == 0 ) {
        Toaster.ShortCenterToaster("Please select Image");
        errCounter++;
    } else if(validatePlatformArr(prodArr) == false){
        errCounter++;
    }

   

    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function validatePlatformArr(prodArr){
    let errorCounter = 0;
    for(let i = 0;i < prodArr.length;i++){
       
        if ( prodArr[i].platform == undefined || prodArr[i].platform == null || prodArr[i].platform.length == 0) {
            Toaster.ShortCenterToaster("Please select Platform");
            errorCounter++;
        } else if (prodArr[i].link == undefined || prodArr[i].link == null || prodArr[i].link.length == 0) {
            Toaster.ShortCenterToaster("Please enter link");
            errorCounter++;
        } 
      
    }

    if(errorCounter == 0){
        return true;
    } else {
        return false
    }
}