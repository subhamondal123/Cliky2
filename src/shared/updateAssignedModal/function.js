
import { AlertMessage } from "../../enums";


export function modifyBrandArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].userId;
            data[i]["name"] = data[i].userName;
        }
    } else {
        data = [];
    }
    return data;
}

export function modifyDesignationArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].designationId;
            data[i]["name"] = data[i].designationName;
        }
    } else {
        data = [];
    }
    return data;
}


export function modifyAssignedEmpArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].userId;
            data[i]["name"] =  data[i].userName;
        }
    } else {
        data = [];
    }
    return data;
}