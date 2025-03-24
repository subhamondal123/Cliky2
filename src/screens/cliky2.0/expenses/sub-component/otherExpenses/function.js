import { DateConvert } from "../../../../../services/common-view-function";

export function _modifyAddDataArr(alldata) {
    let mainArr = [];
    let tempArr = [];
    for (let i = 0; i < alldata.length; i++) {
        tempArr = [...tempArr, ...[alldata[i]]]
        if (tempArr.length == 3) {
            mainArr = [...mainArr, ...[tempArr]]
            tempArr = [];
        }

        if (alldata.length % 3 == 1 || alldata.length % 3 == 2) {
            if (i == alldata.length - 1) {
                mainArr = [...mainArr, ...[tempArr]]
                tempArr = [];
            }
        }

    }

    return mainArr;
}

export function modTransportData(arrData) {
    if (arrData && arrData.length > 0) {

        for (let i = 0; i < arrData.length; i++) {
            let obj = {};

            if (arrData[i].allBillImage.length > 0) {
                for (let j = 0; j < arrData[i].allBillImage.length; j++) {
                    obj = {
                        imagePath: arrData[i].allBillImage[j].images
                    }

                    Object.assign(arrData[i].allBillImage[j], obj)
                }
            }

        }
    }
    return arrData
}

export function modifyOtherExpenseData(arrData){
    if (arrData && arrData.length > 0) {
        for (let i = 0; i < arrData.length; i++) {
            let obj = {
                rawDate:arrData[i].rawDate,
                currentDay: new Date(arrData[i].startRawDate).getDay() == 0 ? "Sun" : new Date(arrData[i].startRawDate).getDay() == 1 ? "Mon" : new Date(arrData[i].startRawDate).getDay() == 2 ? "Tue" : new Date(arrData[i].startRawDate).getDay() == 3 ? "Wed" : new Date(arrData[i].startRawDate).getDay() == 4 ? "Thu" : new Date(arrData[i].startRawDate).getDay() == 5 ? "Fri" : "Sat",
                
            };
            Object.assign(arrData[i], obj)
        }
    }
    return arrData
}

// for other expense data

export async function modifyOtherFetchData(data){
    var respData = { "totalCount": 0, "visitListData": [] };
    if (data) {
        let visitList = data.resp;
        if (visitList && visitList.length > 0) {
            for (let i = 0; i < visitList.length; i++) {
                let modObj = {};

                if (visitList[i].expenseId == undefined || visitList[i].expenseId == null) {
                    modObj["expenseId"] = "";
                } else {
                    modObj["expenseId"] = visitList[i].expenseId;
                }
                if (visitList[i].expenseSubCatagoryName == undefined || visitList[i].expenseSubCatagoryName == null) {
                    modObj["hotelName"] = "";
                } else {
                    modObj["hotelName"] = visitList[i].expenseSubCatagoryName;
                }
                if (visitList[i].expenseValue == undefined || visitList[i].expenseValue == null) {
                    modObj["expenseValue"] = "";
                } else {
                    modObj["expenseValue"] = visitList[i].expenseValue;
                }
                if (visitList[i].expenseUnitName == undefined || visitList[i].expenseUnitName == null) {
                    modObj["unitType"] = "";
                } else {
                    modObj["unitType"] = visitList[i].expenseUnitName;
                }
                
                if (visitList[i].startDateTime_tz == undefined || visitList[i].startDateTime_tz == null) {
                    modObj["rawDate"] = "";
                } else {
                    modObj["rawDate"] = visitList[i].startDateTime_tz;
                }
                if (visitList[i].startDateTime_tz == undefined || visitList[i].startDateTime_tz == null) {
                    modObj["currentDay"] = "";
                } else {
                    modObj["currentDay"] = new Date(visitList[i].startDateTime_tz).getDay() == 0 ? "Sun" : new Date(visitList[i].startDateTime_tz).getDay() == 1 ? "Mon" : new Date(visitList[i].startDateTime_tz).getDay() == 2 ? "Tue" : new Date(visitList[i].startDateTime_tz).getDay() == 3 ? "Wed" : new Date(visitList[i].startDateTime_tz).getDay() == 4 ? "Thu" : new Date(visitList[i].startDateTime_tz).getDay() == 5 ? "Fri" : "Sat";
                }

                // rawDate:DateConvert.viewDateFormat(arrData[i].startRawDate).substring(0,2),
                // currentDay: arrData[i].startRawDate.getDay() == 0 ? "Sun" : arrData[i].startRawDate.getDay() == 1 ? "Mon" : arrData[i].startRawDate.getDay() == 2 ? "Tue" : arrData[i].startRawDate.getDay() == 3 ? "Wed" : arrData[i].startRawDate.getDay() == 4 ? "Thu" : arrData[i].startRawDate.getDay() == 5 ? "Fri" : "Sat",
                
                
                if (visitList[i].finalAmount == undefined || visitList[i].finalAmount == null) {
                    modObj["totalAmount"] = "";
                } else {
                    modObj["totalAmount"] = visitList[i].finalAmount;
                }
                if (visitList[i].expenseCategoryName == undefined || visitList[i].expenseCategoryName == null) {
                    modObj["type"] = "";
                } else {
                    modObj["type"] = visitList[i].expenseCategoryName;
                }
                if (visitList[i].finalAmount == undefined || visitList[i].finalAmount == null) {
                    modObj["finalAmount"] = "";
                } else {
                    modObj["finalAmount"] = visitList[i].finalAmount;
                }
                if (visitList[i].expenseTypeId == undefined || visitList[i].expenseTypeId == null) {
                    modObj["expenseTypeId"] = "";
                } else {
                    modObj["expenseTypeId"] = visitList[i].expenseTypeId;
                }

                if (visitList[i].expenseCategoryId == undefined || visitList[i].expenseCategoryId == null) {
                    modObj["expenseCategoryId"] = "";
                } else {
                    modObj["expenseCategoryId"] = visitList[i].expenseCategoryId;
                }
                
                if (visitList[i].expenseSubCategoryId == undefined || visitList[i].expenseSubCategoryId == null) {
                    modObj["expenseSubCategoryId"] = "";
                } else {
                    modObj["expenseSubCategoryId"] = visitList[i].expenseSubCategoryId;
                }
                if (visitList[i].expenseCategoryModeName == undefined || visitList[i].expenseCategoryModeName == null) {
                    modObj["roomType"] = "";
                } else {
                    modObj["roomType"] = visitList[i].expenseCategoryModeName;
                }
                 
                if (visitList[i].expenseCategoryModeId == undefined || visitList[i].expenseCategoryModeId == null) {
                    modObj["expenseCategoryModeId"] = "";
                } else {
                    modObj["expenseCategoryModeId"] = visitList[i].expenseCategoryModeId;
                }
                  
                if (visitList[i].expenseUnitId == undefined || visitList[i].expenseUnitId == null) {
                    modObj["expenseUnitId"] = "";
                } else {
                    modObj["expenseUnitId"] = visitList[i].expenseUnitId;
                }
                
                if (visitList[i].expenseLocation == undefined || visitList[i].expenseLocation == null) {
                    modObj["expenseLocation"] = "";
                } else {
                    modObj["expenseLocation"] = visitList[i].expenseLocation.toString();
                }
                
                if (visitList[i].docsPath == undefined || visitList[i].docsPath == null || visitList[i].docsPath.length == 0) {
                    modObj["allBillImage"] = [];
                } else {
                    modObj["allBillImage"] = await modImageData(visitList[i].docsPath);
                }
                if (visitList[i].totalExpenseAmount == undefined || visitList[i].totalExpenseAmount == null) {
                    modObj["totalExpenseAmount"] = "0";
                } else {
                    modObj["totalExpenseAmount"] = visitList[i].totalExpenseAmount;
                }
                if (visitList[i].startLocation == undefined || visitList[i].startLocation == null) {
                    modObj["fromPoint"] = "";
                } else {
                    modObj["fromPoint"] = visitList[i].startLocation;
                }
                if (visitList[i].endLocation == undefined || visitList[i].endLocation == null) {
                    modObj["toPoint"] = "";
                } else {
                    modObj["toPoint"] = visitList[i].endLocation;
                }
                modObj["index"] = i + 1;
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.visitListData.push(modObj);
            }
        }
    }
    return (respData);
 }

 async function modImageData(data){
    let mainArr = [];
    for(let i = 0;i<data.length;i++){
        let obj = {
            images:data[i].docsPath
        }
        mainArr.push(obj)
    }
    return mainArr
 }


export function modifyExpenceCategoryArr(data) {
    let resArray = [];
    if (data && data.length > 0) {
        resArray = data;
        for (let i = 0; i < resArray.length; i++) {
            resArray[i]["id"] = resArray[i].expenseCatagoryId;
            resArray[i]["name"] = resArray[i].expenseCatagoryName;
        }
    }
    return resArray;
}
