export function modifyData(data, allPermissions) {
    let obj = {};

    obj["allPermissions"] = modifyArrById(allPermissions, data.permission);
    if (data.permission == undefined || data.permission == null) {
        obj["selectedPermission"] = "";
    } else {
        obj["selectedPermission"] = data.permission;
    }

    return obj;
}

export function modifyArrById(data, id) {
    for (let i = 0; i < data.length; i++) {
        if (id == undefined || id == null) {
            data[i]["check"] = false;
        } else {
            if (data[i].id == id) {
                data[i]["check"] = true;
            } else {
                data[i]["check"] = false;
            }
        }
    }

    return data;
}