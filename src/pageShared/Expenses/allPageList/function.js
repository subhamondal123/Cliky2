import { AlertMessage } from "../../../enums";
import { Toaster } from "../../../services/common-view-function";
import { App_uri } from "../../../services/config";

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

export function modifyFoodDataData(data) {
    let resArray = [];
    if (data && data.length > 0) {
        resArray = data;
        for (let i = 0; i < resArray.length; i++) {
            resArray[i]["id"] = resArray[i].subCategoryTypeId;
            resArray[i]["name"] = resArray[i].subCategoryTypeName;
        }
    }
    return resArray;
}

export function modifyArrTransportModeData(data) {
    let resArray = [];
    if (data && data.length > 0) {
        resArray = data;
        for (let i = 0; i < resArray.length; i++) {
            resArray[i]["id"] = resArray[i].modeTypeId;
            resArray[i]["name"] = resArray[i].modeTypeName;
        }
    }
    return resArray;
}

// visit sub list data modi
export function visitSubListModifyData(data) {
    var respData = { "totalCount": 0, "visitListData": [] };
    if (data) {
        let visitList = data.data.list;
        respData.totalCount = data.data.count;
        if (visitList && visitList.length > 0) {
            for (let i = 0; i < visitList.length; i++) {
                let modObj = {};
                if (visitList[i].id == undefined || visitList[i].id == null) {
                    modObj["visitId"] = "";
                } else {
                    modObj["visitId"] = visitList[i].id;
                }
                if (visitList[i].isProject == undefined || visitList[i].isProject == null) {
                    modObj["isProject"] = "";
                } else {
                    modObj["isProject"] = visitList[i].isProject;
                }
                if (visitList[i].visitdate == undefined || visitList[i].visitdate == null) {
                    modObj["visitdate"] = "N/A";
                } else {
                    modObj["visitdate"] = visitList[i].visitdate;
                }
                if (visitList[i].visiteddate == undefined || visitList[i].visiteddate == null) {
                    modObj["visiteddate"] = "N/A";
                } else {
                    modObj["visiteddate"] = visitList[i].visiteddate;
                }
                if (visitList[i].visitedby == undefined || visitList[i].visitedby == null) {
                    modObj["visitedby"] = "N/A";
                } else {
                    modObj["visitedby"] = visitList[i].visitedby;
                }
                if (visitList[i].visitto == undefined || visitList[i].visitto == null) {
                    modObj["visitto"] = "N/A";
                } else {
                    modObj["visitto"] = visitList[i].visitto;
                }
                if (visitList[i].visitnote == undefined || visitList[i].visitnote == null) {
                    modObj["visitnote"] = "N/A";
                } else {
                    modObj["visitnote"] = visitList[i].visitnote;
                }

                if (visitList[i].states == undefined || visitList[i].states == null) {
                    modObj["states"] = "N/A";
                } else {
                    modObj["states"] = visitList[i].states;
                }
                if (visitList[i].city == undefined || visitList[i].city == null) {
                    modObj["city"] = "N/A";
                } else {
                    modObj["city"] = visitList[i].city;
                }
                if (visitList[i].visitype == undefined || visitList[i].visitype == null) {
                    modObj["visitype"] = "";
                } else {
                    modObj["visitype"] = visitList[i].visitype;
                }
                if (visitList[i].profilePic == undefined || visitList[i].profilePic == null) {
                    modObj["profilePic"] = "";
                } else {
                    modObj["profilePic"] = App_uri.IMAGE_VIEW_URI + visitList[i].profilePic;
                }
                if (visitList[i].odometerCount == undefined || visitList[i].odometerCount == null || visitList[i].odometerCount == 0) {
                    modObj["odometerCount"] = "";
                } else {
                    modObj["odometerCount"] = visitList[i].odometerCount.toString();
                }
                if (visitList[i].odometerCountId == undefined || visitList[i].odometerCountId == null) {
                    modObj["odometerCountId"] = "";
                } else {
                    modObj["odometerCountId"] = visitList[i].odometerCountId;
                }
                if (visitList[i].visittime == undefined || visitList[i].visittime == null) {
                    modObj["visittime"] = "";
                } else {
                    modObj["visittime"] = visitList[i].visittime;
                }
                if (visitList[i].startingAddress == undefined || visitList[i].startingAddress == null) {
                    modObj["startingAddress"] = "";
                } else {
                    modObj["startingAddress"] = visitList[i].startingAddress;
                }
                if (visitList[i].addressOfVisit == undefined || visitList[i].addressOfVisit == null) {
                    modObj["addressOfVisit"] = "";
                } else {
                    modObj["addressOfVisit"] = visitList[i].addressOfVisit;
                }
                if (visitList[i].startingAddress == undefined || visitList[i].startingAddress == null) {
                    modObj["fromLoc"] = "N/A";
                } else {
                    modObj["fromLoc"] =visitList[i].startingAddress == "Home" ? "Home" : modAddress(visitList[i].startingAddress);
                }
                if (visitList[i].addressOfVisit == undefined || visitList[i].addressOfVisit == null) {
                    modObj["toLoc"] = "N/A";
                } else {
                    modObj["toLoc"] = modAddress(visitList[i].addressOfVisit);
                }
                modObj["check"] = false;
                respData.visitListData.push(modObj);
            }
        }
    }
    return (respData);
}

function modAddress (data) {
    let s= [];
    if(data){
         s = data.split(",");
    }
    return s[s.length - 2]
}


// for fetch food list data modification

export function foodSubListModifyData(data) {
    var respData = { "totalCount": 0, "foodListData": [] };
    if (data) {
        let foodList = data.expenseData.resp;
        respData.totalCount = data.expenseData.count;
        if (foodList && foodList.length > 0) {
            for (let i = 0; i < foodList.length; i++) {
                let modObj = {};
                if (foodList[i].expenseId == undefined || foodList[i].expenseId == null) {
                    modObj["expenseId"] = "";
                } else {
                    modObj["expenseId"] = foodList[i].expenseId;
                }
                if (foodList[i].expenseTypeId == undefined || foodList[i].expenseTypeId == null) {
                    modObj["expenseTypeId"] = "";
                } else {
                    modObj["expenseTypeId"] = foodList[i].expenseTypeId;
                }
                if (foodList[i].expenseCategoryId == undefined || foodList[i].expenseCategoryId == null) {
                    modObj["expenseCategoryId"] = "";
                } else {
                    modObj["expenseCategoryId"] = foodList[i].expenseCategoryId;
                }
                if (foodList[i].expenseCategoryModeId == undefined || foodList[i].expenseCategoryModeId == null) {
                    modObj["expenseCategoryModeId"] = "";
                } else {
                    modObj["expenseCategoryModeId"] = foodList[i].expenseCategoryModeId;
                }
                if (foodList[i].isProject == undefined || foodList[i].isProject == null) {
                    modObj["isProject"] = "";
                } else {
                    modObj["isProject"] = foodList[i].isProject;
                }
                if (foodList[i].expenseSubCategoryId == undefined || foodList[i].expenseSubCategoryId == null) {
                    modObj["expenseSubCategoryId"] = "";
                } else {
                    modObj["expenseSubCategoryId"] = foodList[i].expenseSubCategoryId;
                }
                if (foodList[i].finalAmount == undefined || foodList[i].finalAmount == null) {
                    modObj["finalAmount"] = "";
                } else {
                    modObj["finalAmount"] = foodList[i].finalAmount;
                }
                if (foodList[i].startDateTime == undefined || foodList[i].startDateTime == null) {
                    modObj["startDateTime"] = "";
                } else {
                    modObj["startDateTime"] = foodList[i].startDateTime;
                }
                if (foodList[i].endDateTime == undefined || foodList[i].endDateTime == null) {
                    modObj["endDateTime"] = "";
                } else {
                    modObj["endDateTime"] = foodList[i].endDateTime;
                }
                if (foodList[i].expenseTypeName == undefined || foodList[i].expenseTypeName == null) {
                    modObj["expenseTypeName"] = "";
                } else {
                    modObj["expenseTypeName"] = foodList[i].expenseTypeName;
                }
                if (foodList[i].expenseSubCatagoryName == undefined || foodList[i].expenseSubCatagoryName == null) {
                    modObj["foodType"] = "";
                } else {
                    modObj["foodType"] = foodList[i].expenseSubCatagoryName;
                }
                if (foodList[i].finalAmount == undefined || foodList[i].finalAmount == null) {
                    modObj["costText"] = "";
                } else {
                    modObj["costText"] = foodList[i].finalAmount;
                }
                if (foodList[i].expenseLocation == undefined || foodList[i].expenseLocation == null) {
                    modObj["expenseLocation"] = "";
                } else {
                    modObj["expenseLocation"] = foodList[i].expenseLocation;
                }
                if (foodList[i].docsPath == undefined || foodList[i].docsPath == null) {
                    modObj["allBillImage"] = "";
                } else {
                    modObj["allBillImage"] = modImgArr(foodList[i].docsPath);
                }
                modObj["check"] = false;
                respData.foodListData.push(modObj);
            }
        }
    }
    return (respData);
}

// for Food fatch list all image modify
export function modImgArr(arrData) {
    if (arrData.length > 0) {
        for (let i = 0; i < arrData.length; i++) {
            let obj = {};
            obj = {
                images: arrData[i].docsPath
            }

            Object.assign(arrData[i], obj)
        }

    }
    return arrData
}

// for food section add  data validation
export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }
    if (data.expenseCategoryId == undefined || data.expenseCategoryId == null || data.expenseCategoryId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.EXPENSE_CATAGORY_MODE);
        errCounter++;
    }
    else if (data.expenseSubCategoryId == undefined || data.expenseSubCategoryId == null || data.expenseSubCategoryId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.FOOD_MODE);
        errCounter++;
    } else if (data.expenseCategoryModeId == undefined || data.expenseCategoryModeId == null || data.expenseCategoryModeId.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.OTHER);
        errCounter++;
    } else if (data.finalAmount == undefined || data.finalAmount == null || data.finalAmount.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.COST);
        errCounter++;
    }

    else if (data.allBillImage.length == 0) {

        Toaster.ShortCenterToaster("Please Upload the Bill !");
        errCounter++;
    }


    if (errCounter == 0) {
        resObj.status = true;
    }
    return resObj;
};

// for food section save Arr dara modify
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
        return arrData
    }

}

export function modHeaderObj(obj) {
    let mainObj = {
        "TotalVisit": obj.TotalVisit == undefined || obj.TotalVisit == null || obj.TotalVisit == 0 ? "0" : obj.TotalVisit,
        "totalOdometerKms": obj.totalOdometerKms == undefined || obj.totalOdometerKms == null || obj.totalOdometerKms == 0 ? "0" : obj.totalOdometerKms,
        "odometerExpenses": obj.odometerExpenses == undefined || obj.odometerExpenses == null || obj.odometerExpenses == 0 ? "0" : obj.odometerExpenses,
        "totalOtherExpense": obj.totalOtherExpense == undefined || obj.totalOtherExpense == null || obj.totalOtherExpense == 0 ? "0" : obj.totalOtherExpense,
        "totalFoodExp": obj.totalFoodExp == undefined || obj.totalFoodExp == null || obj.totalFoodExp == 0 ? "0" : obj.totalFoodExp,
        "approvedExpenseAmount": obj.approvedExpenseAmount == undefined || obj.approvedExpenseAmount == null || obj.approvedExpenseAmount == 0 ? "0" : obj.approvedExpenseAmount,
        "rejectedExpenseAmount": obj.rejectedExpenseAmount == undefined || obj.rejectedExpenseAmount == null || obj.rejectedExpenseAmount == 0 ? "0" : obj.rejectedExpenseAmount,
        "totalOtherKilometers" : obj.totalOtherKilometers  == undefined || obj.totalOtherKilometers == null || obj.totalOtherKilometers == 0 ? "0" : obj.totalOtherKilometers,
    }
    return mainObj
}