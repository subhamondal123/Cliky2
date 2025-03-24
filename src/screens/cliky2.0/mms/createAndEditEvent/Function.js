
export function modifymeetingTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].id;
            data[i]["name"] = data[i].meetingTypeName;
        }
    } else {
        data = [];
    }
    return data;
}


export function modifyDealerArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].id;
            data[i]["name"] = data[i].firstName +  " " + data[i].lastName ;
        }
    } else {
        data = [];
    }
    return data;
}

export function modifyDistributorArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].id;
            data[i]["name"] = data[i].firstName + " " + data[i].lastName ;
        }
    } else {
        data = [];
    }
    return data;
}

