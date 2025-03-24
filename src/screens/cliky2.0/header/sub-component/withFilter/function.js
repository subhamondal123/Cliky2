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


export function getIconName(props) {
    let iconName = null;
    switch (props.route.name) {
        case "MyActivity":
            iconName = "location_with_route";
            break;
        case "MmsEventList":
            iconName = "doubleUser";
            break;

        default:
            iconName = "location_with_route";
    }
    return iconName;
}


export function visibleActionItems(props) {
    let respData = {
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

        case "PjpVisit":
            respData.filterVisible = props.isVisibleFilter;
            break;

        case "RouteVisit":
            respData.iconVisible = true;
            respData.searchVisible = true;
            respData.filterVisible = true;
            break;

        case "VisitHistory":
            respData.searchVisible = true;
            respData.filterVisible = true;
            break;

        case "MyActivity":
            respData.filterVisible = true;
            respData.iconVisible = true;
            break;

        case "Messages":
            respData.filterVisible = true;
            break;

        case "TodaysOrderHistory":
            respData.filterVisible = true;
            respData.searchVisible = true;
            break;

        case "VisitedStore":
            respData.filterVisible = true;
            respData.searchVisible = true;
            break;

        case "AllOrderHistoryList":
            respData.shareVisible = true;
            respData.filterVisible = true;
            respData.searchVisible = true;
            respData.downloadVisible = true;
            break;

        //manager

        // case "LocationWiseSales":
        //     respData.filterVisible = true;
        //     respData.searchVisible = true;
        //     respData.downloadVisible = true;
        //     break;

        //MODERN TRADE
        case "OutletDetail":
            respData.iconVisible = true;
            respData.searchVisible = true;
            break;


        default:
            respData = respData;
    }
    return respData;
}

export function hideIcon(props) {
    let hide = false;
    switch (props.route.name) {
        case "VisitHistory":
            hide = true
            break;
        case "CreatePjp":
            hide = true
            break;
        case "PjpVisit":
            hide = true
            break;
        case "MmsDashboard":
            hide = true
            break;
        case "ExpenseDashboard":
            hide = true
            break;
        case "LocationWiseSales":
            hide = true
            break;
        case "UserWiseSalesValue":
            hide = true
            break;
        case "CategoryWiseSales":
            hide = true
            break;
        case "UserSummary":
            hide = true
            break;
        case "TeamPerformance":
            hide = true
            break;
        case "TeamPerformanceDrillDown":
            hide = true
            break;

        default:
            hide = false;
    }
    return hide;
}