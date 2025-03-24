export function getIconName(props) {
    let iconName = null;
    switch (props.route.name) {

        case "MyActivity":
            iconName = "location";
            break;

        case "OrderHistoryAddItemList":
            iconName = "threeDCubeScan";
            break;

        case "GamificationDashboard":
            iconName = "threeDCubeScan";
            break;

        default:
            iconName = "location_with_route";

    }
    return iconName;
}

export function hideIcon(props) {
    let hide = false;
    switch (props.route.name) {
        case "CrmHome":
            hide = true;
            break;
        case "TaskList":
            hide = true;
            break;
        case "CrmEnquiryList":
            hide = true;
            break;
        case "LeadsList":
            hide = true;
            break;
        case "ContactListPage":
            hide = true;
            break;
        case "AllOrderHistoryList":
            hide = true;
            break;
        case "OrderHistoryItemList":
            hide = true;
            break;
        case "OrganizationList":
            hide = true;
            break;
        case "OpportunityList":
            hide = true;
            break;
        case "OdometerList":
            hide = true;
            break;
        case "LeadDetails":
            hide = true;
            break;
        case "EnquiryDetails":
            hide = true;
            break;
        case "OrganizationDetails":
            hide = true;
            break;
        case "ContactDetails":
            hide = true;
            break;


        default:
            hide = false;

    }
    return hide;
}