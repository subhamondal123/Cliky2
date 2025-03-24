// function is appear here

import { AlertMessage } from "../../../../../enums";
import { DateConvert, Toaster } from "../../../../../services/common-view-function";


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
                if (visitList[i].totalExpenseValue == undefined || visitList[i].totalExpenseValue == null) {
                    modObj["totalExpenseValue"] = "";
                } else {
                    modObj["totalExpenseValue"] = visitList[i].totalExpenseValue;
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
                    modObj["transPortData"] = "";
                } else {
                    modObj["transPortData"] = visitList[i].expenseSubCatagoryName;
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


export function modifyTypeData(data, index) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (i == index) {
                data[i]["check"] = true;
            } else {
                data[i]["check"] = false;
            }
        }
    }
    return data;
}


export function modifyDataForApi(data) {
    let resCustomerArr = [];
    if (data) {
        for (var key of Object.keys(data)) {
            for (let i = 0; i < data[key].length; i++) {
                resCustomerArr.push({ type: key, customerId: data[key][i].customerId })
            }
        }
    }
    return resCustomerArr;
}


export function modifyPurposeData(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].taskId.toString();
            data[i]["name"] = data[i].taskName;
        }
    }
    return data;
}

export function modifyUserList(data, propsData) {
    let arr = [];
    if (data) {
        for (let i = 0; i < data.userList.length; i++) {
            if (propsData.selectedSubordinateId == data.userList[i].userId.toString()) {

            } else {
                let obj = {};
                obj["id"] = data.userList[i].userId.toString();
                obj["name"] = data.userList[i].userName;
                obj["userId"] = data.userList[i].userId;
                obj["userName"] = data.userList[i].userName;
                arr.push(obj);
            }
        }
    }
    return arr;
}

export function modifyJointVisitArr(visitor, selectedUser) {
    let arr = [];
    arr.push(visitor);
    arr.push(selectedUser.id);
    return arr;
}

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

export function modifyArrTransportData(data) {
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

export function modifyUnitArr(data) {
    let resArray = [];
    if (data && data.length > 0) {
        resArray = data;
        for (let i = 0; i < resArray.length; i++) {
            resArray[i]["id"] = resArray[i].id;
            resArray[i]["name"] = resArray[i].unitShort;
        }
    }
    return resArray;
}




export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }
    if (data.expenceTypeSelectedObj.id == undefined || data.expenceTypeSelectedObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.EXPENSE_CATAGORY_MODE);
        errCounter++;
    } else if (data.transportSelectObj.id == undefined || data.transportSelectObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.TRANSPORT_MODE);
        errCounter++;
    }
    else if (data.transportModeSelectObj.id == undefined || data.transportModeSelectObj.id == null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.TRANSPORT_MODE_TYPE);
        errCounter++;
    }
    //  else if (data.approxKm == undefined || data.approxKm == null || data.approxKm.length == 0) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.APPROX_KM);
    //     errCounter++;
    // } else if (data.unitSelectedObj.id == undefined || data.unitSelectedObj.id == null) {
    //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.UNIT_MODE);
    //     errCounter++;
    // } 
    else if (data.cost == undefined || data.cost == null || data.cost.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.TRANSPORT_COST.COST);
        errCounter++;
    }


    if (errCounter == 0) {
        resObj.status = true;
    }
    return resObj;
};


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