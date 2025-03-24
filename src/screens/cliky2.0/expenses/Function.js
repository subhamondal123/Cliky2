// function is appear here

import { DateConvert } from "../../../services/common-view-function";


// for dunamic Tab data modification
export function modifyExpenceTypeArr(data) {
    var respData = { "totalCount": 0, "expencrTypeArr": [] };
    if (data) {
        let expenceTypeArrData = data.data;
        respData.totalCount = data.count;
        if (expenceTypeArrData && expenceTypeArrData.length > 0) {
            for (let i = 0; i < expenceTypeArrData.length; i++) {
                let modObj = {};
                if (expenceTypeArrData[i].id == undefined || expenceTypeArrData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = expenceTypeArrData[i].id;
                }
                if (expenceTypeArrData[i].expenseType == undefined || expenceTypeArrData[i].expenseType == null) {
                    modObj["label"] = "";
                } else {
                    modObj["label"] = expenceTypeArrData[i].expenseType;
                }
                if (expenceTypeArrData[i].clientId == undefined || expenceTypeArrData[i].clientId == null) {
                    modObj["clientId"] = "";
                } else {
                    modObj["clientId"] = expenceTypeArrData[i].clientId;
                }
                if (expenceTypeArrData[i].createdAt == undefined || expenceTypeArrData[i].createdAt == null) {
                    modObj["createdAt"] = "";
                } else {
                    modObj["createdAt"] = expenceTypeArrData[i].createdAt;
                }
                if (expenceTypeArrData[i].firstName == undefined || expenceTypeArrData[i].firstName == null) {
                    modObj["firstName"] = "";
                } else {
                    modObj["firstName"] = expenceTypeArrData[i].firstName;
                }
                if (expenceTypeArrData[i].lastName == undefined || expenceTypeArrData[i].lastName == null) {
                    modObj["lastName"] = "";
                } else {
                    modObj["lastName"] = expenceTypeArrData[i].lastName;
                }
                if (expenceTypeArrData[i].createdBy == undefined || expenceTypeArrData[i].createdBy == null) {
                    modObj["createdBy"] = "";
                } else {
                    modObj["createdBy"] = expenceTypeArrData[i].createdBy;
                }
                if (expenceTypeArrData[i].icon == undefined || expenceTypeArrData[i].icon == null) {
                    modObj["ImageUrl"] = "";
                } else {
                    modObj["ImageUrl"] = expenceTypeArrData[i].icon;
                }
                modObj["check"] = expenceTypeArrData[i].expenseType == "Fieldvisit" ? true : false;
                modObj["bottomText"] = "4000"
                respData.expencrTypeArr.push(modObj);

            }
        }

    }
    return (respData);
}

// for visit List Api modification
export function visitModifyData(data) {
    var respData = { "totalCount": 0, "visitListData": [] };
    if (data) {
        let visitList = data.response.data;
        respData.totalCount = data.response.totalData;
        if (visitList && visitList.length > 0) {
            for (let i = 0; i < visitList.length; i++) {
                let modObj = {};

                if (visitList[i].date == undefined || visitList[i].date == null) {
                    modObj["date"] = "";
                } else {
                    modObj["date"] = DateConvert.viewDateFormat(visitList[i].date);
                }
                if (visitList[i].count == undefined || visitList[i].count == null) {
                    modObj["totalVisitCount"] = "";
                } else {
                    modObj["totalVisitCount"] = visitList[i].count;
                }
                if (visitList[i].day == undefined || visitList[i].day == null) {
                    modObj["day"] = "";
                } else {
                    modObj["day"] = visitList[i].day;
                }
                if (visitList[i].mainDate == undefined || visitList[i].mainDate == null) {
                    modObj["mainDate"] = "";
                } else {
                    modObj["mainDate"] = visitList[i].mainDate;
                }
                if (visitList[i].totalExpenseValue == undefined || visitList[i].totalExpenseValue == null) {
                    modObj["totalExpenseValue"] = "";
                } else {
                    modObj["totalExpenseValue"] = visitList[i].totalExpenseValue;
                }
                if (visitList[i].odometerCount == undefined || visitList[i].odometerCount == null) {
                    modObj["odometerCount"] = "0";
                } else {
                    modObj["odometerCount"] = visitList[i].odometerCount;
                }
                if (visitList[i].totalExpenseAmount == undefined || visitList[i].totalExpenseAmount == null) {
                    modObj["totalExpenseAmount"] = "0";
                } else {
                    modObj["totalExpenseAmount"] = visitList[i].totalExpenseAmount;
                }
                modObj["currentDay"] = visitList[i].day == 1 ? "Sun" : visitList[i].day == 2 ? "Mon" : visitList[i].day == 3 ? "Tue" : visitList[i].day == 4 ? "Wed" : visitList[i].day == 5 ? "Thu" : visitList[i].day == 6 ? "Fri" : "Sat";
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


// for odometer List Api modification

export function odometerModifyData(data) {
    var respData = { "totalCount": 0, "odometerListData": [] };
    if (data) {
        let odometerList = data.response.odometerDetails;
        respData.totalCount = data.response.dataCount;
        if (odometerList && odometerList.length > 0) {
            for (let i = 0; i < odometerList.length; i++) {
                let modObj = {};

                if (odometerList[i].odometerId == undefined || odometerList[i].odometerId == null) {
                    modObj["odometerId"] = "";
                } else {
                    modObj["odometerId"] = odometerList[i].odometerId;
                }
                if (odometerList[i].inTime == undefined || odometerList[i].inTime == null) {
                    modObj["inTime"] = "";
                } else {
                    modObj["inTime"] = odometerList[i].inTime;
                }
                if (odometerList[i].inTimePic == undefined || odometerList[i].inTimePic == null) {
                    modObj["inTimePic"] = "";
                } else {
                    modObj["inTimePic"] = odometerList[i].inTimePic;
                }
                if (odometerList[i].inMeter == undefined || odometerList[i].inMeter == null) {
                    modObj["inMeter"] = "";
                } else {
                    modObj["inMeter"] = odometerList[i].inMeter;
                }
                if (odometerList[i].outTime == undefined || odometerList[i].outTime == null) {
                    modObj["outTime"] = "";
                } else {
                    modObj["outTime"] = odometerList[i].outTime;
                }
                if (odometerList[i].outTimePic == undefined || odometerList[i].outTimePic == null) {
                    modObj["outTimePic"] = "";
                } else {
                    modObj["outTimePic"] = odometerList[i].outTimePic;
                }
                if (odometerList[i].outMeter == undefined || odometerList[i].outMeter == null) {
                    modObj["outMeter"] = "";
                } else {
                    modObj["outMeter"] = odometerList[i].outMeter;
                }
                if (odometerList[i].expense == undefined || odometerList[i].expense == null) {
                    modObj["expense"] = "";
                } else {
                    modObj["expense"] = odometerList[i].expense;
                }
                if (odometerList[i].distanceTravelled == undefined || odometerList[i].distanceTravelled == null) {
                    modObj["distanceTravelled"] = "";
                } else {
                    modObj["distanceTravelled"] = odometerList[i].distanceTravelled;
                }
                if (odometerList[i].inTimeAddress == undefined || odometerList[i].inTimeAddress == null) {
                    modObj["inTimeAddress"] = "N/A";
                } else {
                    modObj["inTimeAddress"] = odometerList[i].inTimeAddress;
                }
                if (odometerList[i].outTmeAddress == undefined || odometerList[i].outTmeAddress == null) {
                    modObj["outTmeAddress"] = "N/A";
                } else {
                    modObj["outTmeAddress"] = odometerList[i].outTmeAddress;
                }
                if (odometerList[i].totalExpenseAmount == undefined || odometerList[i].totalExpenseAmount == null) {
                    modObj["totalExpenseAmount"] = "0";
                } else {
                    modObj["totalExpenseAmount"] = odometerList[i].totalExpenseAmount;
                }

                modObj["currentDay"] = new Date(odometerList[i].inTime).getDay() == 0 ? "Sun" : new Date(odometerList[i].inTime).getDay() == 1 ? "Mon" : new Date(odometerList[i].inTime).getDay() == 2 ? "Tue" : new Date(odometerList[i].inTime).getDay() == 3 ? "Wed" : new Date(odometerList[i].inTime).getDay() == 4 ? "Thu" : new Date(odometerList[i].inTime).getDay() == 5 ? "Fri" : "Sat";
                modObj["index"] = i + 1;

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.odometerListData.push(modObj);
            }
        }
    }
    return (respData);
}


// for food List Api modification

export function foodModifyData(data) {
    var respData = { "totalCount": 0, "foodListData": [] };
    if (data) {
        let foodList = data.response.finalArray;
        if (foodList && foodList.length > 0) {
            for (let i = 0; i < foodList.length; i++) {
                let modObj = {};
                if (foodList[i].expenseDate == undefined || foodList[i].expenseDate == null) {
                    modObj["expenseDate"] = "";
                } else {
                    modObj["expenseDate"] = foodList[i].expenseDate;
                }

                if (foodList[i].expenseDate_tz == undefined || foodList[i].expenseDate_tz == null) {
                    modObj["expenseDate_tz"] = "";
                } else {
                    modObj["expenseDate_tz"] = foodList[i].expenseDate_tz;
                }
                if (foodList[i].totalExpenseAmount == undefined || foodList[i].totalExpenseAmount == null) {
                    modObj["totalExpenseAmount"] = "0";
                } else {
                    modObj["totalExpenseAmount"] = foodList[i].totalExpenseAmount;
                }
                modObj["currentDay"] = new Date(foodList[i].expenseDate_tz).getDay() == 0 ? "Sun" : new Date(foodList[i].expenseDate_tz).getDay() == 1 ? "Mon" : new Date(foodList[i].expenseDate_tz).getDay() == 2 ? "Tue" : new Date(foodList[i].expenseDate_tz).getDay() == 3 ? "Wed" : new Date(foodList[i].expenseDate_tz).getDay() == 4 ? "Thu" : new Date(foodList[i].expenseDate_tz).getDay() == 5 ? "Fri" : "Sat";
                modObj["index"] = i + 1;

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.foodListData.push(modObj);
            }
        }
    }
    return (respData);
}


// export function modifyTypeData(data, index) {
//     if (data) {
//         for (let i = 0; i < data.length; i++) {
//             if (i == index) {
//                 data[i]["check"] = true;
//             } else {
//                 data[i]["check"] = false;
//             }
//         }
//     }
//     return data;
// }


// export function modifyDataForApi(data) {
//     let resCustomerArr = [];
//     if (data) {
//         for (var key of Object.keys(data)) {
//             for (let i = 0; i < data[key].length; i++) {
//                 resCustomerArr.push({ type: key, customerId: data[key][i].customerId })
//             }
//         }
//     }
//     return resCustomerArr;
// }


// export function modifyPurposeData(data) {
//     if (data) {
//         for (let i = 0; i < data.length; i++) {
//             data[i]["id"] = data[i].taskId.toString();
//             data[i]["name"] = data[i].taskName;
//         }
//     }
//     return data;
// }

// export function modifyUserList(data, propsData) {
//     let arr = [];
//     if (data) {
//         for (let i = 0; i < data.userList.length; i++) {
//             if (propsData.selectedSubordinateId == data.userList[i].userId.toString()) {

//             } else {
//                 let obj = {};
//                 obj["id"] = data.userList[i].userId.toString();
//                 obj["name"] = data.userList[i].userName;
//                 obj["userId"] = data.userList[i].userId;
//                 obj["userName"] = data.userList[i].userName;
//                 arr.push(obj);
//             }
//         }
//     }
//     return arr;
// }

// export function modifyJointVisitArr(visitor, selectedUser) {
//     let arr = [];
//     arr.push(visitor);
//     arr.push(selectedUser.id);
//     return arr;
// }

// 
export function modHeaderObj(obj) {
    let mainObj = {
        "TotalVisit": obj.TotalVisit == undefined || obj.TotalVisit == null || obj.TotalVisit == 0 ? "00" : obj.TotalVisit,
        "totalOdometerKms": obj.totalOdometerKms == undefined || obj.totalOdometerKms == null || obj.totalOdometerKms == 0 ? "00" : obj.totalOdometerKms.toFixed(1),
        "odometerExpenses": obj.odometerExpenses == undefined || obj.odometerExpenses == null || obj.odometerExpenses == 0 ? "00" : obj.odometerExpenses.toFixed(1),
        "totalOtherExpense": obj.totalOtherExpense == undefined || obj.totalOtherExpense == null || obj.totalOtherExpense == 0 ? "00" : obj.totalOtherExpense.toFixed(1),
        "totalFoodExp": obj.totalFoodExp == undefined || obj.totalFoodExp == null || obj.totalFoodExp == 0 ? "00" : obj.totalFoodExp,
        "approvedExpenseAmount": obj.approvedExpenseAmount == undefined || obj.approvedExpenseAmount == null || obj.approvedExpenseAmount == 0 ? "00" : obj.approvedExpenseAmount.toFixed(1),
        "rejectedExpenseAmount": obj.rejectedExpenseAmount == undefined || obj.rejectedExpenseAmount == null || obj.rejectedExpenseAmount == 0 ? "00" : obj.rejectedExpenseAmount.toFixed(1),
    }
    return mainObj
}

// for other expense data

export async function modifyFetchData(data){
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