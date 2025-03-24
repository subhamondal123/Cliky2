export function modifyCustomerTypeArr(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            data[i]["id"] = data[i].contactTypeId;
            data[i]["name"] = data[i].contactTypeName;
            data[i]["check"] = false;
            data[i]["counter"] = 0;
        }
    } else {
        data = [];
    }
    return data;
}