export function modifyAttendanceData(data) {
    let resArray = [];
    if (data && data.length > 0) {
        resArray = data;
        for (let i = 0; i < resArray.length; i++) {
            resArray[i]["id"] = resArray[i].activityId;
            resArray[i]["name"] = resArray[i].activityName;
        }
    }
    return resArray;
}

export function getModData(data) {
    data["id"] = data.activityId;
    data["name"] = data.activityName;
    return data;
}


export function visibleActionItems(props) {
    let respData = {
        dateFilterVisible: false,
        shareVisible: false,
        iconVisible: false,
        searchVisible: false,
        filterVisible: false,
        downloadVisible: false
    };
    switch (props.route.name) {
        case "CreatePjp":
            respData.filterVisible = true;
            break;

        case "ManagerDashboard":
            respData.filterVisible = true;
            respData.dateFilterVisible = true
            break;


        default:
            respData = respData;
    }
    return respData;
}