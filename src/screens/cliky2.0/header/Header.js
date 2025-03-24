
import React from "react";
import {
    View
} from "react-native";
import styles from "./style";
import {
    stateCheckForNetwork,
    stateUserInformation,
    userAttendanceData,
    storeNotificationCountData
} from "../../../redux/Sales360Action";

import { BackWithIconAndPageName, BackWithPageName, Common, LmsCommonHeader, LmsHeader, LmsHeaderWithFilter, ManagerHeader, ProfileWithPageName, TeamPerformanceDrilldownHeader, WithFilter, WithoutRefresh } from "./sub-component";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userInfoStore } from "./Function";
import { StorageDataModification } from "../../../services/common-view-function";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            attendanceLoader: true
        }
    }

    componentDidMount = async () => {
        this._getUserInfoFromApi();
        await this.getNotificationCount()
        this.setState({ pageLoader: false })
    }

    getNotificationCount = async () => {
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);

        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        await StorageDataModification.storeNotificationCountData(count, 'store');
        this.props.storeNotificationCountData(count)
    }


    // for get the user info
    _getUserInfoFromApi = async () => {
        this.setState(await userInfoStore(this.state, this.props));
    }

    getHeaderData = () => {
        let headerRespObj = {
            withFilterHeaderVisible: false,
            commonHeaderVisible: false,
            profileWithPageNameHeaderVisible: false,
            backWithPageNameHeaderVisible: false,
            backWithIconAndPageNameHeaderVisible: false,
            withoutRefresh: false,
            //lms
            lmsHeader: false,
            lmsCommonHeader: false,
            lmsHeaderWithFilter: false,
            //manager
            managerHeaderVisible: false,
            withManagerTeamPerformanceHeaderVisible: false,

            headerText: "",
            isVisibleFilter: this.props.isVisibleFilter == undefined ? true : this.props.isVisibleFilter
        }

        switch (this.props.route.name) {
            case "PjpVisit":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "PJP & Visit";
                break;

            case "CreatePjp":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "Create Pjp";
                break;
            case "RouteVisit":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "Route Visit";
                break;

            case "Home":
                headerRespObj.commonHeaderVisible = true;
                break;

            case "VisitHistory":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "Visit List";
                break;

            case "MyActivity":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "My Activity";
                break;

            case "OrderDashboard":
                headerRespObj.withoutRefresh = true;
                break;

            case "FavoriteMenu":
                headerRespObj.withoutRefresh = true;
                break;

            case "LeaveRequest":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Apply Leave";
                break;

            case "LeaveHistory":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Leave History";
                break;

            case "Notification":
                headerRespObj.withoutRefresh = true;
                break;

            case "ExpenseDashboard":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "Expenses";
                break;

            case "UnplanVisitForm":
                headerRespObj.headerText = "Add Shop/Outlet";
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                break;

            case "OdometerList":
                headerRespObj.headerText = "Odometer List";
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                break;

            case "AttendanceList":
                headerRespObj.headerText = "Attendance List";
                headerRespObj.lmsHeader = true;
                break;

            case "TodaysOrderHistory":
                headerRespObj.headerText = "Sales History";
                headerRespObj.withFilterHeaderVisible = true;
                break;

            case "VisitedStore":
                headerRespObj.headerText = "Store Visited";
                headerRespObj.withFilterHeaderVisible = true;
                break;
            case "MyCalendar":
                headerRespObj.headerText = "My Calender";
                headerRespObj.lmsHeader = true;
                break;
            case "StockUpdatePage":
                headerRespObj.headerText = "Stock Update";
                headerRespObj.lmsHeader = true;
                break;
            case "AllOrderHistoryList":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "All Orders";
                break;

            case "OrderHistoryItemList":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Update Order";
                break;

            case "OrderHistoryAddItemList":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Add Items";
                break;

            //lms
            case "LmsDashboard":
                headerRespObj.lmsCommonHeader = true;
                break;
            case "Catalogue":
                headerRespObj.lmsHeaderWithFilter = true;
                headerRespObj.headerText = "Catalogue";
                break;
            case "CatalogueItemDetails":
                headerRespObj.lmsHeader = true;
                headerRespObj.headerText = "Catalogue";
                break;
            case "PassbookAndRedemption":
                headerRespObj.lmsHeaderWithFilter = true;
                headerRespObj.headerText = "Pass Book";
                break;

            case "SchemePage":
                headerRespObj.lmsHeaderWithFilter = true;
                headerRespObj.headerText = "Scheme";
                break;

            case "SalesConfirmation":
                headerRespObj.lmsHeader = true;
                headerRespObj.headerText = "Confirm Sale";
                break;

            case "SchemeCatalogue":
                headerRespObj.lmsHeader = true;
                headerRespObj.headerText = "Redemption";
                break;

            case "StockUpdateList":
                headerRespObj.lmsHeader = true;
                headerRespObj.headerText = "Stock Update";
                break;

            case "ConfirmSalesListDetails":
                headerRespObj.lmsHeaderWithFilter = true;
                headerRespObj.headerText = "Confirm Sale";
                break;

            case "InfluencerActivity":
                headerRespObj.lmsHeaderWithFilter = true;
                headerRespObj.headerText = "Influencer Activity";
                break;

            case "RequestRedemtionCategory":
                headerRespObj.lmsHeader = true;
                headerRespObj.headerText = "Request Redemption";
                break;

            case "RequestRedemtion":
                headerRespObj.lmsHeaderWithFilter = true;
                headerRespObj.headerText = "Request Redemption";
                break;

            case "InfluencerActivityDetails":
                headerRespObj.lmsHeader = true;
                headerRespObj.headerText = "Influencer Activity";
                break;
            case "InfluencerNewCustomer":
                headerRespObj.lmsHeader = true;
                headerRespObj.headerText = "Influencer Activity";
                break;

            case "RedemptionDetails":
                headerRespObj.lmsHeader = true;
                headerRespObj.headerText = "Redemption";
                break;
            case "ValidateSales":
                headerRespObj.lmsHeader = true;
                headerRespObj.headerText = "Validate Sales";
                break;

            case "NewOrder":
                headerRespObj.lmsHeaderWithFilter = true;
                headerRespObj.headerText = "New Order";
                break;


            //CRM
            case "CrmHome":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Analytics";
                break;
            case "ViewCalendar":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Calender";
                break;

            case "TaskList":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Task Management";
                break;
            case "CrmEnquiryList":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Enquiry Management";
                break;
            case "LeadsList":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Lead Management";
                break;
            case "ContactListPage":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Contact Management";
                break;
            case "OrganizationList":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Account Management";
                break;
            case "OpportunityList":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Opportunity Management";
                break;
            case "LeadDetails":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Lead Details";
                break;
            case "EnquiryDetails":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Enquiry Details";
                break;
            case "OrganizationDetails":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Account Details";
                break;
            case "ContactDetails":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Contact Details";
                break;



            // MMS
            case "MmsDashboard":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "Dashboard";
                break;

            case "MmsEventList":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "Meetings";
                break;

            //Manager

            case "ManagerDashboard":
                headerRespObj.managerHeaderVisible = true;
                break;
            case "LocationWiseSales":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "Location Wise Sales";
                break;

            case "UserWiseSalesValue":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "User Wise TC PC & Sale Value";
                break;
            case "CategoryWiseSales":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "Category Wise Order & Sales";
                break;

            case "UserSummary":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "User Summary";
                break;

            case "TeamPerformance":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "Team Performance";
                break;

            case "TeamPerformanceDrillDown":
                headerRespObj.withManagerTeamPerformanceHeaderVisible = true;
                headerRespObj.headerText = "Team Performance";
                break;

            //modern trade
            case "MTradeDashboard":
                headerRespObj.profileWithPageNameHeaderVisible = true;
                break;

            case "OutletDetail":
                headerRespObj.withFilterHeaderVisible = true;
                headerRespObj.headerText = "Outlet Details";
                break;

            case "ClosingStockList":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Closing Stock Update";
                break;

            //GAMIFICATION
            case "GamificationDashboard":
                headerRespObj.backWithIconAndPageNameHeaderVisible = true;
                headerRespObj.headerText = "Gamification";
                break;


            default:
                headerRespObj.commonHeaderVisible = true;
                break;
        }

        return headerRespObj;
    }

    onFilterApply = (data) => {
        this.props.onFilterData(data)
    }

    onDataReset = () => {
        this.props.onReset()
    }

    onDataDownload = () => {
        this.props.onDownloadData()
    }

    onShareData = () => {
        this.props.onShare()
    }

    onSelectNotification = () => {
        this.props.navigation.navigate("Notification")
    }

    onSearchField = () => {
        this.props.onSearchData()
    }

    onDateFilter = () => {
        this.props.onFilterByDate()
    }

    onBack = () => {
        this.props.onBackPress()
    }


    render() {
        let headerData = this.getHeaderData();
        return (
            <View style={styles.headerContainer}>
                {headerData.commonHeaderVisible ? <Common  {...this.props} headerText={headerData.headerText} /> : null}
                {headerData.withFilterHeaderVisible ? <WithFilter  {...this.props} isVisibleFilter={headerData.isVisibleFilter} headerText={headerData.headerText} onApplyFilter={(data) => this.onFilterApply(data)} onResetFilter={() => this.onDataReset()} onDownloadData={() => this.onDataDownload()} onSearchData={() => this.onSearchField()} onShare={() => this.onShareData()} /> : null}
                {headerData.profileWithPageNameHeaderVisible ? <ProfileWithPageName  {...this.props} headerText={headerData.headerText} /> : null}
                {headerData.backWithPageNameHeaderVisible ? <BackWithPageName  {...this.props} headerText={headerData.headerText} /> : null}
                {headerData.backWithIconAndPageNameHeaderVisible ? <BackWithIconAndPageName  {...this.props} headerText={headerData.headerText} /> : null}
                {headerData.withoutRefresh ? <WithoutRefresh  {...this.props} headerText={headerData.headerText} /> : null}
                {headerData.lmsHeaderWithFilter ? <LmsHeaderWithFilter  {...this.props} headerText={headerData.headerText} onApplyFilter={(data) => this.onFilterApply(data)} onResetFilter={() => this.onDataReset()} onNotificationData={() => this.onSelectNotification()} /> : null}
                {headerData.lmsHeader ? <LmsHeader  {...this.props} headerText={headerData.headerText} onNotificationData={() => this.onSelectNotification()} /> : null}
                {headerData.lmsCommonHeader ? <LmsCommonHeader  {...this.props} headerText={headerData.headerText} onNotificationData={() => this.onSelectNotification()} /> : null}

                {headerData.managerHeaderVisible ? <ManagerHeader  {...this.props} headerText={headerData.headerText} onApplyFilter={(data) => this.onFilterApply(data)} onResetFilter={() => this.onDataReset()} onDownloadData={() => this.onDataDownload()} onSearchData={() => this.onSearchField()} onShare={() => this.onShareData()} onFilterByDate={() => this.onDateFilter()} /> : null}
                {headerData.withManagerTeamPerformanceHeaderVisible ? <TeamPerformanceDrilldownHeader  {...this.props} isVisibleFilter={headerData.isVisibleFilter} headerText={headerData.headerText} onApplyFilter={(data) => this.onFilterApply(data)} onResetFilter={() => this.onDataReset()} onDownloadData={() => this.onDataDownload()} onSearchData={() => this.onSearchField()} onShare={() => this.onShareData()} backPress={() => this.onBack()} /> : null}

            </View>
        )
    }
}

// export default Header;


const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateCheckForNetwork,
        stateUserInformation,
        userAttendanceData,
        storeNotificationCountData
    }, dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
