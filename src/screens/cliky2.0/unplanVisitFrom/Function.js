import { stat } from "react-native-fs";
import { AlertMessage } from "../../../enums";
import { Toaster } from "../../../services/common-view-function";
import { Regex } from "../../../services/config";
import { DataValidator } from "../../../validators";


export function modifyUnitArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].unitId;
            data[i]["name"] = data[i].unitShort;
        }
    }
    return data;
};


export function modifySubordinateArr(data) {
    let resData = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].childUserName != null || data[i].childUserName != undefined) {
                resData.push({ id: data[i].childId, name: data[i].childUserName })
            }
        }
    } else {
        resData = [];
    }
    return resData;
}

export function modifyCustomerTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].contactTypeId;
            data[i]["name"] = data[i].contactTypeName;
            data[i]["customerAccessType"] = data[i].customerAccessType;
        }
    } else {
        data = [];
    }
    return data;
}


export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.firstName == undefined || data.firstName == null || data.firstName.length == 0) {
        Toaster.ShortCenterToaster("Please Enter Owner Name !");
        errCounter++;
    }
    else if (data.customerTypeId == undefined || data.customerTypeId == null || data.customerTypeId.length == 0 || data.customerTypeId == "0") {
        Toaster.ShortCenterToaster("Please select Customer Type!");
        errCounter++;
    } else if (data.custBusinessName == undefined || data.custBusinessName == null || data.custBusinessName.length == 0 || data.custBusinessName == "") {
        Toaster.ShortCenterToaster("Please Enter Shop Name !");
        errCounter++;
    } else if (DataValidator.mobileNumberValidator(data.phone) == false) {
        // Toaster.ShortCenterToaster("Please Enter  Contact Number");
        errCounter++;
    }
    // else if (data.phoneNumber == undefined || data.phoneNumber == null || data.phoneNumber.length == 0 || data.phoneNumber == "") {
    //     Toaster.ShortCenterToaster("Please Enter Contact Number");
    //     errCounter++;
    // }
    else if (data.locationData == undefined || data.locationData == null || data.locationData.length == 0) {
        Toaster.ShortCenterToaster("Please Select Location");
        errCounter++;
    }
    else if (data.pinCode == undefined || data.pinCode == null || data.pinCode.length == 0 || data.pinCode.length < 5) {
        Toaster.ShortCenterToaster("Please Enter Pincode No !");
        errCounter++;
    } else if (/^0+$/.test(data.pinCode)) {
        Toaster.ShortCenterToaster("Please Enter Valid Pin No !");
        errCounter++;
    } else if (data.custAddress == undefined || data.custAddress == null || data.custAddress.length == 0 || data.custAddress == "") {
        Toaster.ShortCenterToaster("Please Enter Address !");
        errCounter++;
    } else if (validateDynamicForm(data.formData)) {
        errCounter++;

    }
    else if (data.docTypeArr.length > 0 && validateDocumentArr(data.docTypeArr, data.custDocArray)) {
        errCounter++;
    }

    // else if (data.brandId == undefined || data.brandId == null || data.brandId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CONVERSION_ERROR.BRAND_ERROR);
    //     errCounter++;
    // } 
    // else if (data.counterVolume == undefined || data.counterVolume == null || data.counterVolume.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.VISIT_FORM.COUNTER_VOLUME);
    //     errCounter++;
    // } else if (data.unitId == undefined || data.unitId == null || data.unitId.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.BRANDING.NEW_ENTRY.UNIT_ERROR);
    //     errCounter++;
    // } 
    // else if (data.visitNote == undefined || data.visitNote == null || data.visitNote.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.VISIT_FORM.NOTE);
    //     errCounter++;
    // } else if (data.visitType === "0" && (data.jointVisitorId == null || data.jointVisitorId == undefined || data.jointVisitorId.length == 0)) {
    //     Toaster.ShortCenterToaster("Please select Sub-Ordinate !");
    //     errCounter++;
    // }
    // else if (data.visitType === "0" && (data.jointVisitorId == null || data.jointVisitorId == undefined || data.jointVisitorId.length == 0)) {
    //     Toaster.ShortCenterToaster("Please select Sub-Ordinate !");
    //     errCounter++;
    // }
    // else if (data.counterName == undefined || data.counterName == null || data.counterName.length == 0) {
    //     Toaster.ShortCenterToaster("Please enter Counter Name !");
    //     errCounter++;
    // }
    // // else if (data.email.length > 0) {
    // else if (data.email.length > 0 && !data.email.match(Regex.EMAIL_REGEX)) {
    //     Toaster.ShortCenterToaster("Invalid Email !");
    //     errCounter++;
    // }
    // }


    if (errCounter == 0) {
        resObj.status = true
    }

    return resObj;
}

export function validateDocumentArr(arr, docArr) {
    let t = false;
    let errCount = 0;
    if (docArr.length > 0) {
        let filteredArr = arr.filter(item => item.isMandatory == 1);

        let missingFileTypes = filteredArr.filter(item1 =>
            !docArr.some(item2 => item1.name === item2.fileType)
        ).map(item => item.name);

        // Output
        if (missingFileTypes.length > 0) {
            console.log("Missing file types:", missingFileTypes);
            missingFileTypes.map(item => Toaster.ShortCenterToaster(`Please upload ${item}`))
            t = true
        }
    } else {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].isMandatory == 1) {
                Toaster.ShortCenterToaster(`Please upload ${arr[i].name}`)
                t = true
            }
        }
    }
    return t
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

export function modDocTypeData(data) {
    let respArr = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {}
            modObj["id"] = data[i].docTypeId
            modObj["name"] = data[i].documentTypeName;
            modObj["isMandatory"] = data[i].isMandatory
            modObj["docCode"] = data[i].docCode

            respArr.push(modObj)
        }
    }
    return respArr;
}


export function modCustDocArr(data) {
    let arr = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let obj = {}
            obj["docTypeId"] = data[i].docTypeId;
            obj["docFileName"] = data[i].docFileName;
            obj["docNumber"] = data[i].documentNumber;
            obj["isMandatory"] = data[i].isMandatory;
            obj["fileType"] = data[i].fileType;

            arr.push(obj)
        }
    }
    return arr
}


export function validateInfluencerData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.firstName == undefined || data.firstName == null || data.firstName.length == 0) {
        Toaster.ShortCenterToaster("Please Enter Owner Name !");
        errCounter++;
    }
    else if (data.customerTypeId == undefined || data.customerTypeId == null || data.customerTypeId.length == 0 || data.customerTypeId == "0") {
        Toaster.ShortCenterToaster("Please select Customer Type!");
        errCounter++;
    }
    // else if (data.custBusinessName == undefined || data.custBusinessName == null || data.custBusinessName.length == 0 || data.custBusinessName == "") {
    //     Toaster.ShortCenterToaster("Please Enter  Name !");
    //     errCounter++;
    // }
    else if (DataValidator.mobileNumberValidator(data.phone) == false) {
        // Toaster.ShortCenterToaster("Please Enter  Contact Number");
        errCounter++;
    }
    else if (data.locationData == undefined || data.locationData == null || data.locationData.length == 0) {
        Toaster.ShortCenterToaster("Please Select Location");
        errCounter++;
    }
    else if (data.custAddress == undefined || data.custAddress == null || data.custAddress.length == 0 || data.custAddress == "") {
        Toaster.ShortCenterToaster("Please Enter Address !");
        errCounter++;
    } else if (validateDynamicForm(data.formData)) {
        errCounter++;

    }
    // else if (data.docTypeArr.length > 0 && validateDocumentArr(data.docTypeArr, data.custDocArray)) {
    //     errCounter++;
    // }


    if (errCounter == 0) {
        resObj.status = true
    }

    return resObj;
}


export function modDynamicFieldArr(arr) {
    let respArr = [];
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {};
            if (arr[i].name == null || arr[i].name == null) {
                obj["name"] = ""
            } else {
                obj["name"] = arr[i].name
            }

            if (arr[i].clientId == null || arr[i].clientId == null) {
                obj["clientId"] = ""
            } else {
                obj["clientId"] = arr[i].clientId
            }
            if (arr[i].formId == null || arr[i].formId == null) {
                obj["formId"] = ""
            } else {
                obj["formId"] = arr[i].formId
            }

            if (arr[i].fieldId == null || arr[i].fieldId == null) {
                obj["fieldId"] = ""
            } else {
                obj["fieldId"] = arr[i].fieldId
            }
            if (arr[i].label == null || arr[i].label == null) {
                obj["label"] = ""
            } else {
                obj["label"] = arr[i].label
            }
            if (arr[i].type == null || arr[i].type == null) {
                obj["type"] = ""
            } else {
                obj["type"] = arr[i].type
            }
            if (arr[i].subTypeId == null || arr[i].subTypeId == null) {
                obj["subTypeId"] = ""
            } else {
                obj["subTypeId"] = arr[i].subTypeId
            }
            if (arr[i].subType == null || arr[i].subType == null) {
                obj["subType"] = ""
            } else {
                obj["subType"] = arr[i].subType
            }
            if (arr[i].value == null || arr[i].value == null || arr[i].value.length == 0) {
                obj["value"] = ""
            } else {
                obj["value"] = modValue(JSON.parse(arr[i].value))
            }
            if (arr[i].isRequired == null || arr[i].isRequired == null) {
                obj["isRequired"] = ""
            } else {
                obj["isRequired"] = arr[i].isRequired
            }
            if (arr[i].fieldValue == null || arr[i].fieldValue == null) {
                obj["fieldValue"] = ""
            } else {
                obj["fieldValue"] = arr[i].type == "checkbox" ? arr[i].fieldValue.split("") : arr[i].fieldValue
            }

            respArr.push(obj)
        }
    }

    return respArr
}

function modValue(val) {
    let respArr = []
    if (typeof val !== "string") {
        if (val.length > 0) {
            for (let i = 0; i < val.length; i++) {
                let obj = {};
                obj["id"] = val[i].k
                obj["name"] = val[i].v
                obj["check"] = false

                respArr.push(obj)
            }
        }
    }
    return respArr
}

function validateDynamicForm(arr) {
    let errCnt = 0;
    if (arr.length == 0) {
        return false
    } else {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].isRequired == 1 && arr[i].fieldValue.length == 0) {
                Toaster.ShortCenterToaster("Please enter " + arr[i].label)
                errCnt++
                break;
            }
        }
        if (errCnt == 0) {
            return false
        } else {
            return true
        }
    }
}
