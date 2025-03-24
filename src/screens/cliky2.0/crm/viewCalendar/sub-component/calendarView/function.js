// map function is here


export function modifyCalendarItemData(data, index) {
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