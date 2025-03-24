import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";

export function validateData(data) {
    let errCounter = 0;
    let resObj = {
        status: false
    }

    if (data.taskName == undefined || data.taskName == null || data.taskName.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.TASK_DETAILS.TASK_NAME_ERROR);
        errCounter++;
    } else if (data.taskCategory == undefined || data.taskCategory == null || data.taskCategory == "0" || data.taskCategory.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.TASK_DETAILS.TASK_CATEGORY_ERROR);
        errCounter++;
    } 
    else if (assignToValidate(data.assignToType, data.assignToArr, data.designationId)) {
        errCounter++;
    } 
    else if (data.dueDate == undefined || data.dueDate == null || data.dueDate.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.TASK_DETAILS.DUE_DATE_ERROR);
        errCounter++;
    } else if (data.priorityStatus == undefined || data.priorityStatus == null || data.priorityStatus == "0" || data.priorityStatus.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.TASK_DETAILS.PRIORITY_STATUS_ERROR);
        errCounter++;
    } else if (data.taskStage == undefined || data.taskStage == null || data.taskStage == "0" || data.taskStage.length == 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.TASK_DETAILS.TASK_STAGE_ERROR);
        errCounter++;
    }

    if (errCounter == 0) {
        resObj.status = true;
    }

    return resObj;
}

export function modifyData(data, allTaskCategory, allPriorityStatus, allTaskStage, allUser, selectedUserIdArr) {
    let obj = {};
    if (data.assignToArr == undefined || data.assignToArr == null) {
        obj["selectedUserIdArr"] = [];
    } else {
        obj["selectedUserIdArr"] = data.assignToArr;
    }

    if (data.taskName == undefined || data.taskName == null) {
        obj["taskName"] = "";
    } else {
        obj["taskName"] = data.taskName;
    }

    if (data.taskCategory == undefined || data.taskCategory == null) {
        obj["selectedTaskCategoryObj"] = {};
    } else {
        obj["selectedTaskCategoryObj"] = getObjFromArrayById(allTaskCategory, data.taskCategory);
    }

    if (data.assignToType == undefined || data.assignToType == null) {
        obj["isUser"] = true;
    } else {
        obj["isUser"] = data.assignToType;
    }

    if (data.assignedUser == undefined || data.assignedUser == null) {
        obj["selectedUserObj"] = {};
    } else {
        obj["selectedUserObj"] = getObjFromArrayById(allUser, data.assignedUser);
    }

    if (data.dueDate == undefined || data.dueDate == null) {
        obj["dueDateObj"] = {
            rawDate: new Date(),
            dueDate: ""
        };
    } else {
        obj["dueDateObj"] = {
            rawDate: new Date(data.dueDate),
            dueDate: data.dueDate
        };
    }

    if (data.priorityStatus == undefined || data.priorityStatus == null) {
        obj["selectedPriorityStatusObj"] = {};
    } else {
        obj["selectedPriorityStatusObj"] = getObjFromArrayById(allPriorityStatus, data.priorityStatus);
    }

    if (data.taskStage == undefined || data.taskStage == null) {
        obj["selectedTaskStageObj"] = {};
    } else {
        obj["selectedTaskStageObj"] = getObjFromArrayById(allTaskStage, data.taskStage);
    }
    if (data.assignUsers == undefined || data.assignUsers == null) {
        obj["selectedUserIdArr"] = [];
    } else {
        obj["selectedUserIdArr"] = modifyAssingUser(data.assignUsers, selectedUserIdArr);
    }
    return obj;
}

function modifyAssingUser(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push(data[i].userId)
    }
    return arr;
}



export function getObjFromArrayById(data, id) {
    let obj = {};
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            obj = data[i];

        }
    }
    return obj;
}

export function assignToValidate(assignedType, assignedUser, designationId) {
    let status = false;
    let errCounter = 0;
    // if (assignedType) {
        if (assignedUser == undefined || assignedUser == null || assignedUser == "0" || assignedUser.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.TASK_DETAILS.ASSIGNED_USER_ERROR);
            errCounter++;
        }
    // }
    
    // else {
    //     if (designationId == undefined || designationId == null || designationId == "0" || designationId.length == 0) {
    //         Toaster.ShortCenterToaster("Please Select Designation !");
    //         errCounter++;
    //     } else if (assignedUser == undefined || assignedUser == null || assignedUser == "0" || assignedUser.length == 0) {
    //         Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_TASK.TASK_DETAILS.ASSIGNED_USER_ERROR);
    //         errCounter++;
    //     }
    // }

    if (errCounter == 0) {
        status = true;
    }

    return errCounter;
}


export function modifyDesignationData(arr) {
    let modArr = []
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {}
            if (arr[i].designationId == undefined || arr[i].designationId == null) {
                obj["id"] = ""
            } else {
                obj["id"] = arr[i].designationId
            }
            if (arr[i].designationName == undefined || arr[i].designationName == null) {
                obj["name"] = ""
            } else {
                obj["name"] = arr[i].designationName
            }

            modArr.push(obj)
        }
    }

    return modArr
}


export function modifyUserData(arr) {
    let modArr = []
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let obj = {}
            if (arr[i].userId == undefined || arr[i].userId == null) {
                obj["id"] = ""
            } else {
                obj["id"] = arr[i].userId
            }
            if (arr[i].userName == undefined || arr[i].userName == null) {
                obj["name"] = ""
            } else {
                obj["name"] = arr[i].userName
            }

            modArr.push(obj)
        }
    }

    return modArr
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