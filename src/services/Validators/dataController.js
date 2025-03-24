//data validate here


export function stringDataReturnValueCheck(data) {
    let resData = "";
    if (data == undefined || data == null) {
        resData = "";
    } else {
        resData = data;
    }
    return resData;
}