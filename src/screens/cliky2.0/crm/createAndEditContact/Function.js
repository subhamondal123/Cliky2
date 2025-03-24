import { AlertMessage } from "../../../../enums";
import { DateConvert, Toaster } from "../../../../services/common-view-function";
import { DataValidator } from "../../../../validators";

export function modifyAllContactBusinessTypeData(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        obj["check"] = false;
        arr.push(obj);
    }
    return arr;
}

export function modifyLandingData(data) {
    if (data.contactTypData.length > 0) {
        for (let i = 0; i < data.contactTypData.length; i++) {
            data.contactTypData[i]["id"] = data.contactTypData[i].contactTypeId;
            data.contactTypData[i]["name"] = data.contactTypData[i].contactTypeName;
        }
    }

    if (data.platformData.length > 0) {
        for (let i = 0; i < data.platformData.length; i++) {
            data.platformData[i]["id"] = data.platformData[i].platformId;
            data.platformData[i]["name"] = data.platformData[i].platformName;
        }
    }

    if (data.occassionData.length > 0) {
        for (let i = 0; i < data.occassionData.length; i++) {
            data.occassionData[i]["id"] = data.occassionData[i].occasionId;
            data.occassionData[i]["name"] = data.occassionData[i].occasionName;
        }
    }

    if (data.countryData.length > 0) {
        for (let i = 0; i < data.countryData.length; i++) {
            data.countryData[i]["id"] = data.countryData[i].countryId;
            data.countryData[i]["name"] = data.countryData[i].countryName;
        }
    }

    if (data.activityList.length > 0) {
        for (let i = 0; i < data.activityList.length; i++) {
            data.activityList[i]["id"] = data.activityList[i].activityId;
            data.activityList[i]["name"] = data.activityList[i].activiryName;
        }
    }

    if (data.userList.length > 0) {
        for (let i = 0; i < data.userList.length; i++) {
            data.userList[i]["id"] = data.userList[i].userId;
            data.userList[i]["name"] = data.userList[i].firstName + " " + data.userList[i].lastName;
        }
    }

    return data;
}


function setPhoneNum(arr) {
    let modArr = []
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let modObj = {};
            modObj["phoneNumber"] = arr[i].typeValue,
                modObj["countryCode"] = arr[i].prefix,
                modObj["isPrimary"] = arr[i].priority == 1 ? true : false,
                modObj["selectedPhoneType"] = {
                    id: arr[i].typeName == "personal" ? 3 : arr[i].typeName == "business" ? 1 : arr[i].typeName == "work" ? 2 : arr[i].typeName == "home" ? 4 : 5,
                    name: arr[i].typeName
                },
                modObj["phonetype"] = arr[i].typeName,
                modObj["phoneActive"] = false

            modArr.push(modObj)
        }
    }
    return modArr
}


function setEmail(arr) {
    let modArr = []
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let modObj = {};
            modObj["email"] = arr[i].typeValue,
                modObj["isPrimary"] = arr[i].priority == 1 ? true : false,
                modObj["selectedEmailType"] = {
                    id: arr[i].typeName == "personal" ? 3 : arr[i].typeName == "business" ? 1 : arr[i].typeName == "work" ? 2 : arr[i].typeName == "home" ? 4 : 5,
                    name: arr[i].typeName
                },
                modObj["emailtype"] = arr[i].typeName,
                modObj["emailActive"] = false

            modArr.push(modObj)
        }
    }
    return modArr
}

export function modifyResp(data) {
    let modifiedResp = {};
    if (data) {
        if (data.firstName == undefined || data.firstName == null) {
            modifiedResp["firstName"] = "";
        } else {
            modifiedResp["firstName"] = data.firstName;
        }
        if (data.lastName == undefined || data.lastName == null) {
            modifiedResp["lastName"] = "";
        } else {
            modifiedResp["lastName"] = data.lastName;
        }
        if (data.title == undefined || data.title == null) {
            modifiedResp["title"] = "";
        } else {
            modifiedResp["title"] = data.title;
        }

        if (data.phoneNumber == undefined || data.phoneNumber == null) {
            modifiedResp["phoneNumber"] = [{
                phoneNumber: "",
                countryCode: "91",
                isPrimary: true,
                selectedPhoneType: {
                    id: 3,
                    name: "Personal"
                },
                phonetype: "Personal",
                phoneActive: false
            }];
        } else {
            modifiedResp["phoneNumber"] = setPhoneNum(data.phone);
        }

        if (data.email == undefined || data.email == null) {
            modifiedResp["emailArr"] = [{
                email: "",
                selectedEmailType: {
                    id: 3,
                    name: "Personal"
                },
                emailtype: "Personal",
                isPrimary: true,
                emailActive: false
            }];
        } else {
            modifiedResp["emailArr"] = setEmail(data.email);
        }

        if (data.organizationName == undefined || data.organizationName == null) {
            modifiedResp["organizationName"] = "";
        } else {
            modifiedResp["organizationName"] = data.organizationName.toString();
        }
        if (data.organizationId == undefined || data.organizationId == null) {
            modifiedResp["organizationId"] = "";
        } else {
            modifiedResp["organizationId"] = data.organizationId.toString();
        }
        if (data.location == undefined || data.location == null) {
            modifiedResp["location"] = [];
        } else {
            modifiedResp["location"] = data.location;
        }
        if (data.accounts == undefined || data.accounts == null) {
            modifiedResp["accounts"] = [];
        } else {
            modifiedResp["accounts"] = data.accounts;
        }

    }

    return modifiedResp;
}

export function modifyPhoneNumStrToArr(data) {
    let splitArr = data.split(",");
    let retArr = [];
    for (let i = 0; i < splitArr.length; i++) {
        let obj = {};
        obj["phoneNumber"] = splitArr[i];
        obj["phoneNumberActive"] = false;
        retArr.push(obj);
    }
    return retArr;
}

export function modifyEmailStrToArr(data) {
    let splitArr = data.split(",");
    let retArr = [];
    for (let i = 0; i < splitArr.length; i++) {
        let obj = {};
        obj["emailId"] = splitArr[i];
        obj["emailActive"] = false;
        retArr.push(obj);
    }
    return retArr;
}

export function modifyEventArr(data, occassionData) {
    let modArr = [];
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {};

            if (data[i].occasionId == undefined || data[i].occasionId == null) {
                obj["selectedOccasion"] = {};
            } else {
                obj["selectedOccasion"] = getOccasionObjFromArrById(data[i], occassionData);
            }

            obj["datePicker"] = false;

            if (data[i].occationDate == undefined || data[i].occationDate == null || data[i].occationDate.length == 0) {
                obj["dateObj"] = {
                    "rawDate": new Date(),
                    "date": ""
                };
            } else {
                obj["dateObj"] = {
                    "rawDate": new Date(data[i].occationDate),
                    "date": DateConvert.formatYYYYMMDD(new Date(data[i].occationDate))
                };
            }

            if (data[i].occasionReminder == undefined || data[i].occasionReminder == null) {
                obj["isReminder"] = false;
            } else {
                obj["isReminder"] = data[i].occasionReminder == "1" ? true : false;
            }

            if (data[i].occasionYrlyRepet == undefined || data[i].occasionYrlyRepet == null) {
                obj["isYearlyRepeat"] = false;
            } else {
                obj["isYearlyRepeat"] = data[i].occasionYrlyRepet == "1" ? true : false;
            }

            modArr.push(obj);
        }
    }
    return modArr;
}

export function getOccasionObjFromArrById(data, occassionData) {
    let obj = {};
    for (let i = 0; i < occassionData.length; i++) {
        if (occassionData[i].id == data.occasionId) {
            obj = occassionData[i];
        }
    }
    return obj;
}

export function modifyPlatformArr(data, platformData) {
    let modArr = [];
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {};

            if (data[i].platformId == undefined || data[i].platformId == null) {
                obj["selectedTypeObj"] = {};
            } else {
                obj["selectedTypeObj"] = getPlatformObjFromArrById(data[i], platformData);
            }

            if (data[i].platformUrl == undefined || data[i].platformUrl == null) {
                obj["link"] = "";
            } else {
                obj["link"] = data[i].platformUrl;
            }

            obj["linkActive"] = false;

            modArr.push(obj);
        }
    }
    return modArr;
}

export function getPlatformObjFromArrById(data, platformData) {
    let obj = {};
    for (let i = 0; i < platformData.length; i++) {
        if (platformData[i].id == data.platformId) {
            obj = platformData[i];
        }
    }
    return obj;
}


export function onSaveValidation(stateData) {
    let errorCount = 0;
    if (stateData.contactDetails.firstName.length == 0 || stateData.contactDetails.firstName == null || stateData.contactDetails.firstName == undefined) {
        Toaster.ShortCenterToaster("Please enter first name !");
        errorCount++;
    } else if (stateData.contactDetails.lastName.length == 0 || stateData.contactDetails.lastName == null || stateData.contactDetails.lastName == undefined) {
        Toaster.ShortCenterToaster("Please enter last name !");
        errorCount++;
    } else if (stateData.contactDetails.title.length == 0 || stateData.contactDetails.title == null || stateData.contactDetails.title == undefined) {
        Toaster.ShortCenterToaster("Please enter title !");
        errorCount++;
    } else if (validatePhoneNumberArray(stateData.businessPhoneArr) == false) {
        errorCount++;
    } else if (validateEmailArray(stateData.businessEmailArr) == false) {
        errorCount++;
    } 
    // else if (stateData.contactDetails.account.length == 0 || stateData.contactDetails.account == null || stateData.contactDetails.account == undefined) {
    //     Toaster.ShortCenterToaster("Please enter account !");
    //     errorCount++;
    // } else if (stateData.selectedOrganization.organizationName == undefined || stateData.selectedOrganization.organizationName == null || stateData.selectedOrganization.organizationName.length == 0) {
    //     Toaster.ShortCenterToaster("Please add Organization !");
    //     errorCount++;
    // }

    if (errorCount > 0) {
        return false
    } else {
        return true;
    }
}

export function validatePhoneNumberArray(data) {

    let errCounter = 0;
    let status = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].phoneNumber == undefined || data[i].phoneNumber == null || data[i].phoneNumber.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.PHONE_NUMBER_ERROR);
            errCounter++;
        } else {
            if (DataValidator.mobileNumberValidator(data[i].phoneNumber) == false) {
                errCounter++;
            }
        }
    }


    if (errCounter == 0) {
        if (checkDuplicatePhoneNumber(data)) {
            status = true;
        } else {
            status = false;
        }
    }

    return status;
}


export function checkDuplicatePhoneNumber(data) {
    let errCounter = 0;
    let status = false;
    if (data.length > 1) {
        if (data[0].phoneNumber == data[1].phoneNumber) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.PHONE_NUMBER_DUPLICATE);
            errCounter++;
        }
    }


    if (errCounter == 0) {
        status = true;
    }

    return status;
}


export function validateEmailArray(data) {
    let errCounter = 0;
    let status = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].email == undefined || data[i].email == null || data[i].email.length == 0) {
            Toaster.ShortCenterToaster("Please enter email id !");
            errCounter++;
        } else {
            if (DataValidator.emailValidator(data[i].email) == false) {
                errCounter++;
            }
        }
    }

    if (errCounter == 0) {
        if (checkDuplicateEmail(data)) {
            status = true;
        } else {
            status = false;
        }
    }

    return status;
}

export function checkDuplicateEmail(data) {
    let errCounter = 0;
    let status = false;
    if (data.length > 1) {
        if (data.length > 1) {
            if (data[0].email == data[1].email) {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.ADDITIONAL_INFORMATION.EMAIL_ID_DUPLICATE);
                errCounter++;
            }
        }
    }

    if (errCounter == 0) {
        status = true;
    }

    return status;
}

export function onAddOrgValidation(stateData) {
    let errorCount = 0;
    if (onSaveValidation(stateData) == false) {
        errorCount++;
    }

    if (errorCount == 0) {
        return true;
    } else {
        return false;
    }

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
