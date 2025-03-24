
export function modifyData(data) {
    for (let i = 0; i < data.length; i++) {
        data[i]["check"] = true;
    }
    return data;
}
