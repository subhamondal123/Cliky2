// for calender date change

export function modifyMonthData(data, cellkey, selectKey) {
    for (let i = 0; i < data.view.length; i++) {
        for (let j = 0; j < data.view[i].length; j++) {
            if (cellkey && selectKey) {
                if (cellkey == i && selectKey == j) {
                    data.view[i][j].isClick = true;
                } else {
                    data.view[i][j].isClick = false;
                }
            } else {
                data.view[i][j]["isClick"] = false;
            }
        }
    }
    return data;
}


// modify data for month selecttion
export function modWeekData(data) {
    var view = data.view;
    if (view) {
        for (let i = 0; i < view.length; i++) {
            if (view[i]) {
                for (let j = 0; j < view[i].length; j++) {
                    if (view[i][j].data) {
                        let prevCount = 0;
                        let prevColor = "#FFFFFF";
                        let frontCount = 0;
                        let frontColor = "#FFFFFF";
                        for (let k = 0; k < view[i][j].data.length; k++) {
                            if (view[i][j].data[k].positionCheck == 0) {
                                prevCount = prevCount + 1;
                                prevColor = view[i][j].data[k].color;
                            }
                            if (view[i][j].data[k].positionCheck == 1) {
                                frontCount = frontCount + 1;
                                frontColor = view[i][j].data[k].color;
                            }
                        }
                        view[i][j]["prevCount"] = prevCount;
                        view[i][j]["prevColor"] = prevColor;
                        view[i][j]["prevCount"] = prevCount;
                        view[i][j]["frontColor"] = frontColor;
                    }
                }
            }
        }
        data.view = view;
    }
    return data;
}

// modify data for day selecttion
export function modDayData(data) {
    var view = data.view;
    if (view) {
        for (let i = 0; i < view.length; i++) {
            if (view[i].data) {
                if (view[i].data) {
                    let prevCount = 0;
                    let prevColor = "#FFFFFF";
                    let frontCount = 0;
                    let frontColor = "#FFFFFF";
                    for (let k = 0; k < view[i].data.length; k++) {
                        if (view[i].data[k].positionCheck == 0) {
                            prevCount = prevCount + 1;
                            prevColor = view[i].data[k].color;
                        }
                        if (view[i].data[k].positionCheck == 1) {
                            frontCount = frontCount + 1;
                            frontColor = view[i].data[k].color;
                        }
                    }
                    view[i]["prevCount"] = prevCount;
                    view[i]["prevColor"] = prevColor;
                    view[i]["prevCount"] = prevCount;
                    view[i]["frontColor"] = frontColor;
                }
            }
        }
        data.view = view;
    }
    return data;
}
