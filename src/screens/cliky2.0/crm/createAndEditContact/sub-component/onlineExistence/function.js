import { Toaster } from "../../../../../../services/common-view-function";

export function validateData(data) {
    let status = false;
    let errCounter = 0;
    if (data.profilePic == undefined || data.profilePic == null || data.profilePic.length == 0) {
        Toaster.ShortCenterToaster("Please Upload Image!");
        errCounter++;
    } else if (validatePlatformDataArr(data.platformArr) == false) {
        errCounter++;
    }

    if (errCounter == 0) {
        status = true
    }

    return status;
}

export function validatePlatformDataArr(data) {

    let status = false;
    let errCounter = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].platformId == undefined || data[i].platformId == null) {
            Toaster.ShortCenterToaster("Please select platform!");
            errCounter++
        } else if (data[i].platformUrl == undefined || data[i].platformUrl == null || data[i].platformUrl.length == 0) {
            Toaster.ShortCenterToaster("Please enter link!");
            errCounter++
        }
    }

    if (errCounter == 0) {
        status = true
    }
    return status;
}

export function convertPhoneNumbersToAString(phoneArr) {
    let arr = [];
    for (let i = 0; i < phoneArr.length; i++) {
        // if (i == phoneArr.length - 1) {
        //     str = str + phoneArr[i].phoneNumber;
        // } else {
        //     str = str + phoneArr[i].phoneNumber + ","
        // }
        arr.push(phoneArr[i].phoneNumber)
    }

    return arr;
}

export function convertEmailsToAString(emailArr) {
    let arr = [];
    let str = "";
    for (let i = 0; i < emailArr.length; i++) {
        // if (i == emailArr.length - 1) {
        //     str = str + emailArr[i].emailId;
        // } else {
        //     str = str + emailArr[i].emailId + ","
        // }

        arr.push(emailArr[i].emailId);
    }

    return arr;
}

export function modifyEventArr(data) {
    // [{ "occasionId": 100, "occasionDate": "2022-07-22", "occasionReminder": true, "occasionYrlyRepet": false }, { "occasionId": 101, "occasionDate": "2022-04-22", "occasionReminder": false, "occasionYrlyRepet": true }]
    let arr = [];
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj["occasionId"] = data[i].selectedOccasion.occasionId;
            obj["occasionDate"] = data[i].dateObj.date;
            obj["occasionReminder"] = data[i].isReminder;
            obj["occasionYrlyRepet"] = data[i].isYearlyRepeat;
            arr.push(obj);
        }
    }
    return arr;
}

// [{ "platformId": 450, "platformUrl": "www.test12.com" }, { "platformId": 451, "platformUrl": "www.test23.com" }]
export function modifyPlatformData(data) {
    let arr = [];
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj["platformId"] = data[i].selectedTypeObj.id;
            obj["platformUrl"] = data[i].link;
            arr.push(obj);
        }
    }
    return arr;
}

export function modifyAllData(data) {
    let obj = {};

    if (data.contactPrflPic == undefined || data.contactPrflPic == null) {
        obj["imageName"] = "";
    } else {
        obj["imageName"] = data.contactPrflPic;
    }

    if (data.platformArr == undefined || data.platformArr == null || data.platformArr.length == 0) {
        obj["allPlatformArr"] = [
            {
                selectedTypeObj: {},
                link: "",
                linkActive: false
            }
        ];
    } else {
        obj["allPlatformArr"] = data.platformArr;
    }

    return obj;
}