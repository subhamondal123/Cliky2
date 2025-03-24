import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import { createStore } from "redux";
import CRMSalesReducer from "./src/redux/Sales360Reducer";
import {
  CreateNewPassword,
  MailCheck,
  PasswordUpdateSuccess,
  PolicyView,
  OtpVerifyChangePassword,
  NetworkError,
  Map,
  NewVersionAvailable,
  CLIKY_2
} from './src/screens';

import { DrawerNav } from './src/navigation';
import { LogBox } from 'react-native';
import { DateConvert, GetUserData } from './src/services/common-view-function';
import { MiddlewareCheck } from './src/services/middleware';
import { LeaveHistoryTab, LeaveRequestTab, LmsCatalogueDetailsTab, LmsCatalogueTab, LmsDashboardTab, LmsPassbookTab, LmsSchemeCatalogueTab, MTradeDashboardTab, ManagerDashboardTab, MerchandisingPageTab, MyActivityTab, MyCalenderTab, NotificationTab, OrderDashBoardTab, OutletDetailTab, OutletLogInPageTab, ProfileTab, ReminderTab, RouteVisitTab, StockUpdateEditDeleteTab, StockUpdateTab, TradeDashboardTab, UnplanVisitFromTab, VisitHistoryTab } from './src/navigation/bottomTabNavigator';

const store = createStore(CRMSalesReducer);

const Stack = createStackNavigator();


LogBox.ignoreLogs([
  "Require cycle: node_modules/victory",
]);


class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount = () => {
    //get the lat long on 30 min of interval
    // setInterval(async () => {
    //   let loc = await GetUserData.getUserLocation();
    //   let reqData = {
    //     lattitude: loc.lattitude,
    //     longitude: loc.longitude,
    //     currentTimeStamp: DateConvert.fullDateFormat(new Date()),
    //     address: ""
    //   }
    //   await MiddlewareCheck("getCurrentLocation", reqData, this.props);
    // }, 1800000);
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen name="MailCheck" component={MailCheck} options={{ headerShown: false }} />
            <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} options={{ headerShown: false }} />
            <Stack.Screen name="PolicyView" component={PolicyView} options={{ headerShown: false }} />
            <Stack.Screen name="OtpVerifyChangePassword" component={OtpVerifyChangePassword} options={{ headerShown: false }} />
            <Stack.Screen name="NetworkError" component={NetworkError} options={{ headerShown: false }} />
            <Stack.Screen name='NewVersionAvailable' component={NewVersionAvailable} options={{ headerShown: false }} />
            <Stack.Screen name='Map' component={Map} options={{ headerShown: false }} />

            {/* For new Cliky 2 */}

            <Stack.Screen name="VisitHistory" component={VisitHistoryTab} options={{ headerShown: false }} />
            <Stack.Screen name="LeaveRequest" component={LeaveRequestTab} options={{ headerShown: false }} />
            <Stack.Screen name="RouteVisit" component={RouteVisitTab} options={{ headerShown: false }} />
            <Stack.Screen name="UnplanVisitForm" component={UnplanVisitFromTab} options={{ headerShown: false }} />
            <Stack.Screen name='LeaveHistory' component={LeaveHistoryTab} options={{ headerShown: false }} />
            <Stack.Screen name='OrderDashboard' component={OrderDashBoardTab} options={{ headerShown: false }} />
            <Stack.Screen name="MyActivity" component={MyActivityTab} options={{ headerShown: false }} />
            <Stack.Screen name="ProfilePage" component={ProfileTab} options={{ headerShown: false }} />
            <Stack.Screen name="DrawerNav" component={DrawerNav} options={{ headerShown: false }} />

            <Stack.Screen name="SplashScreen" component={CLIKY_2.SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WelcomeScreen" component={CLIKY_2.WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LogIn" component={CLIKY_2.Login} options={{ headerShown: false }} />
            <Stack.Screen name="Menu" component={CLIKY_2.DrawerMenu} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={CLIKY_2.ChangePassword} options={{ headerShown: false }} />
            <Stack.Screen name="PasswordUpdateSuccess" component={PasswordUpdateSuccess} options={{ headerShown: false }} />
            <Stack.Screen name="Notification" component={NotificationTab} options={{ headerShown: false }} />
            <Stack.Screen name="Reminder" component={ReminderTab} options={{ headerShown: false }} />
            <Stack.Screen name="UnplanVisitList" component={CLIKY_2.UnplanVisitList} options={{ headerShown: false }} />
            <Stack.Screen name="CreatePjp" component={CLIKY_2.CreatePjp} options={{ headerShown: false }} />
            <Stack.Screen name="PjpVisit" component={CLIKY_2.PjpVisit} options={{ headerShown: false }} />
            <Stack.Screen name='OrderProductList' component={CLIKY_2.OrderProductList} options={{ headerShown: false }} />
            <Stack.Screen name='OrderCartDetails' component={CLIKY_2.OrderCartDetails} options={{ headerShown: false }} />
            <Stack.Screen name='MyPocketMis' component={CLIKY_2.PocketMis} options={{ headerShown: false }} />
            <Stack.Screen name='OrderSuccessfull' component={CLIKY_2.OrderSuccessfull} options={{ headerShown: false }} />
            <Stack.Screen name='ProductWiseSales' component={CLIKY_2.ProductWiseSales} options={{ headerShown: false }} />
            <Stack.Screen name='DayWiseReport' component={CLIKY_2.DayWiseReport} options={{ headerShown: false }} />
            <Stack.Screen name='OutletDetailsPage' component={CLIKY_2.OutletDetailsPage} options={{ headerShown: false }} />
            <Stack.Screen name='OrderLastTenVisit' component={CLIKY_2.OrderLastTenVisit} options={{ headerShown: false }} />
            <Stack.Screen name='AddNewCustomer' component={CLIKY_2.AddNewCustomer} options={{ headerShown: false }} />
            <Stack.Screen name='OrderPrimaryCustomerList' component={CLIKY_2.OrderPrimaryCustomerList} options={{ headerShown: false }} />
            <Stack.Screen name='OrderSecondaryCustomerList' component={CLIKY_2.OrderSecondaryCustomerList} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={CLIKY_2.ForgotPassword} options={{ headerShown: false }} />
            <Stack.Screen name='ExpenseDashboard' component={CLIKY_2.ExpenseDashboard} options={{ headerShown: false }} />
            <Stack.Screen name='Expenses' component={CLIKY_2.Expenses} options={{ headerShown: false }} />
            <Stack.Screen name='OrderHistoryList' component={CLIKY_2.OrderHistoryList} options={{ headerShown: false }} />
            <Stack.Screen name='orderPaymentScreen' component={CLIKY_2.OrderPaymentScreen} options={{ headerShown: false }} />
            <Stack.Screen name='recentOrderList' component={CLIKY_2.RecentOrderList} options={{ headerShown: false }} />
            <Stack.Screen name='SelectedOrderDetail' component={CLIKY_2.SelectedOrderDetails} options={{ headerShown: false }} />
            <Stack.Screen name='selectedProductDetail' component={CLIKY_2.SelectedProductDetails} options={{ headerShown: false }} />
            <Stack.Screen name='Messages' component={CLIKY_2.Messages} options={{ headerShown: false }} />
            <Stack.Screen name="OdometerList" component={CLIKY_2.OdometerList} options={{ headerShown: false }} />
            <Stack.Screen name="AttendanceList" component={CLIKY_2.AttendanceList} options={{ headerShown: false }} />
            <Stack.Screen name='VisitedStore' component={CLIKY_2.StoreVisitedList} options={{ headerShown: false }} />
            <Stack.Screen name='SfaEnquiryList' component={CLIKY_2.SfaEnquiryList} options={{ headerShown: false }} />
            <Stack.Screen name='SfaUnplannedVisitForm' component={CLIKY_2.SfaUnplannedVisitForm} options={{ headerShown: false }} />
            <Stack.Screen name='AllOrderHistoryList' component={CLIKY_2.AllOrderHistoryList} options={{ headerShown: false }} />
            <Stack.Screen name='OrderHistoryItemList' component={CLIKY_2.OrderHistoryItemList} options={{ headerShown: false }} />
            <Stack.Screen name='OrderHistoryAddItemList' component={CLIKY_2.OrderHistoryAddItemList} options={{ headerShown: false }} />
            <Stack.Screen name='Survey' component={CLIKY_2.Survey} options={{ headerShown: false }} />
            <Stack.Screen name='SurveyList' component={CLIKY_2.SurveyList} options={{ headerShown: false }} />
            <Stack.Screen name='SurveyQuestions' component={CLIKY_2.SurveyQuestions} options={{ headerShown: false }} />
            <Stack.Screen name='partnerGift' component={CLIKY_2.PartnerGift} options={{ headerShown: false }} />

            {/* -------------------------------------Gamification--------------------------- */}

            <Stack.Screen name='GamificationDashboard' component={CLIKY_2.GAMIFICATION.GamificationDashboard} options={{ headerShown: false }} />
            <Stack.Screen name='GamificationChallengePage' component={CLIKY_2.GAMIFICATION.GamificationChallengeDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name='GamificationChallenges' component={CLIKY_2.GAMIFICATION.GamificationChallenges} options={{ headerShown: false }} />
            <Stack.Screen name='GamificationReferLead' component={CLIKY_2.GAMIFICATION.ReferLead} options={{ headerShown: false }} />
            <Stack.Screen name='GamificationLeadStatus' component={CLIKY_2.GAMIFICATION.ReferLeadStatus} options={{ headerShown: false }} />
            <Stack.Screen name='GamificationSurveyPage' component={CLIKY_2.GAMIFICATION.GamificationSurveyScreen} options={{ headerShown: false }} />
            <Stack.Screen name='GamificationCongratulatedByScreen' component={CLIKY_2.GAMIFICATION.CongratulatedByList} options={{ headerShown: false }} />
            <Stack.Screen name='GamificationTopGainList' component={CLIKY_2.GAMIFICATION.TopGainList} options={{ headerShown: false }} />
            <Stack.Screen name='GamificationNearToAchieveList' component={CLIKY_2.GAMIFICATION.NearToAchieveList} options={{ headerShown: false }} />
            <Stack.Screen name='GamificationPointsSummeryList' component={CLIKY_2.GAMIFICATION.PointsSummaryList} options={{ headerShown: false }} />


            {/* CRM */}
            <Stack.Screen name='CrmHome' component={CLIKY_2.CrmHome} options={{ headerShown: false }} />
            <Stack.Screen name='TaskList' component={CLIKY_2.CRM.TaskList} options={{ headerShown: false }} />
            <Stack.Screen name="CreateAndEditTask" component={CLIKY_2.CRM.CreateAndEditTask} options={{ headerShown: false }} />
            <Stack.Screen name='TaskDetails' component={CLIKY_2.CRM.TaskDetails} options={{ headerShown: false }} />
            <Stack.Screen name='CrmEnquiryList' component={CLIKY_2.CRM.EnquiryList} options={{ headerShown: false }} />
            <Stack.Screen name='CreateAndEditEnquiry' component={CLIKY_2.CRM.CreateAndEditEnquiry} options={{ headerShown: false }} />
            <Stack.Screen name="LeadsList" component={CLIKY_2.CRM.LeadList} options={{ headerShown: false }} />
            <Stack.Screen name="LeadDetails" component={CLIKY_2.CRM.LeadDetails} options={{ headerShown: false }} />
            <Stack.Screen name="CreateAndEditLeads" component={CLIKY_2.CRM.CreateAndEditLeads} options={{ headerShown: false }} />
            <Stack.Screen name='ContactListPage' component={CLIKY_2.CRM.ContactList} options={{ headerShown: false }} />
            <Stack.Screen name="CreateAndEditContact" component={CLIKY_2.CRM.CreateAndEditContact} options={{ headerShown: false }} />
            <Stack.Screen name="OrganizationList" component={CLIKY_2.CRM.OrganizationList} options={{ headerShown: false }} />
            <Stack.Screen name="OrganizationDetails" component={CLIKY_2.CRM.OrganizationDetails} options={{ headerShown: false }} />
            <Stack.Screen name="OrganizationActivityList" component={CLIKY_2.CRM.OrganizationActivityList} options={{ headerShown: false }} />
            <Stack.Screen name="OpportunityList" component={CLIKY_2.CRM.OpportunityList} options={{ headerShown: false }} />
            <Stack.Screen name="OpportunityDetails" component={CLIKY_2.CRM.OpportunityDetails} options={{ headerShown: false }} />
            <Stack.Screen name="OpportunityActivityList" component={CLIKY_2.CRM.OpportunityActivityList} options={{ headerShown: false }} />
            <Stack.Screen name="CreateAndEditOrganization" component={CLIKY_2.CRM.CreateAndEditOrganization} options={{ headerShown: false }} />
            <Stack.Screen name='ContactDetails' component={CLIKY_2.CRM.ContactDetails} options={{ headerShown: false }} />
            <Stack.Screen name='Conversion' component={CLIKY_2.CRM.Conversion} options={{ headerShown: false }} />
            <Stack.Screen name='EnquiryDetails' component={CLIKY_2.CRM.EnquiryDetails} options={{ headerShown: false }} />


            <Stack.Screen name='ViewCalendar' component={CLIKY_2.CRM.ViewCalendar} options={{ headerShown: false }} />
            <Stack.Screen name='MeetingSection' component={CLIKY_2.CRM.MeetingSection} options={{ headerShown: false }} />

            {/* MMS */}
            <Stack.Screen name='MmsDashboard' component={CLIKY_2.MMS.MmsDashboard} options={{ headerShown: false }} />
            <Stack.Screen name='MmsNewEvent' component={CLIKY_2.MMS.MmsNewEvent} options={{ headerShown: false }} />
            <Stack.Screen name='MmsCreateAndEditBudget' component={CLIKY_2.MMS.MmsCreateAndEditBudget} options={{ headerShown: false }} />
            <Stack.Screen name='MmsEvent' component={CLIKY_2.MMS.MmsEvent} options={{ headerShown: false }} />
            <Stack.Screen name='MmsEventList' component={CLIKY_2.MMS.MmsEventList} options={{ headerShown: false }} />
            <Stack.Screen name='MmsEventDetails' component={CLIKY_2.MMS.MmsEventDetails} options={{ headerShown: false }} />
            <Stack.Screen name='MmsMeetingDocUpload' component={CLIKY_2.MMS.MmsMeetingUploadDocument} options={{ headerShown: false }} />


            {/* LMS */}
            <Stack.Screen name="LmsDashboard" component={LmsDashboardTab} options={{ headerShown: false }} />
            <Stack.Screen name='Catalogue' component={LmsCatalogueTab} options={{ headerShown: false }} />
            <Stack.Screen name='CatalogueItemDetails' component={LmsCatalogueDetailsTab} options={{ headerShown: false }} />
            <Stack.Screen name='ActivityScreen' component={CLIKY_2.LMS.ActivityScreen} options={{ headerShown: false }} />
            <Stack.Screen name='PassbookAndRedemption' component={LmsPassbookTab} options={{ headerShown: false }} />
            <Stack.Screen name="RedemptionDetails" component={CLIKY_2.LMS.RedemptionDetails} options={{ headerShown: false }} />
            <Stack.Screen name='SchemeCatalogue' component={LmsSchemeCatalogueTab} options={{ headerShown: false }} />
            <Stack.Screen name='SchemePage' component={CLIKY_2.LMS.SchemePage} options={{ headerShown: false }} />
            <Stack.Screen name='SchemeTransferPoints' component={CLIKY_2.LMS.SchemeTransferPoints} options={{ headerShown: false }} />
            <Stack.Screen name='SalesConfirmation' component={CLIKY_2.LMS.SalesConfirmation} options={{ headerShown: false }} />
            <Stack.Screen name='ConfirmSalesListDetails' component={CLIKY_2.LMS.ConfirmSalesListDetails} options={{ headerShown: false }} />
            <Stack.Screen name="StockUpdateList" component={CLIKY_2.LMS.StockUpdateList} options={{ headerShown: false }} />
            <Stack.Screen name="TodaysOrderHistory" component={CLIKY_2.TodaySalesScreen} options={{ headerShown: false }} />
            <Stack.Screen name='InfluencerActivity' component={CLIKY_2.LMS.InfluencerActivity} options={{ headerShown: false }} />
            <Stack.Screen name='InfluencerActivityDetails' component={CLIKY_2.LMS.InfluencerActivityDetails} options={{ headerShown: false }} />
            <Stack.Screen name='InfluencerNewCustomer' component={CLIKY_2.LMS.InfluencerNewCustomer} options={{ headerShown: false }} />
            <Stack.Screen name='RequestRedemtion' component={CLIKY_2.LMS.RequestRedemtion} options={{ headerShown: false }} />
            <Stack.Screen name='RequestRedemtionCategory' component={CLIKY_2.LMS.RequestRedemtionCategory} options={{ headerShown: false }} />
            <Stack.Screen name='ValidateSales' component={CLIKY_2.LMS.ValidateSales} options={{ headerShown: false }} />
            <Stack.Screen name='NewOrder' component={CLIKY_2.LMS.NewOrder} options={{ headerShown: false }} />
            <Stack.Screen name='MyCalender' component={MyCalenderTab} options={{ headerShown: false }} />
            <Stack.Screen name='StockUpdatePage' component={StockUpdateTab} options={{ headerShown: false }} />

            {/* MANAGER */}

            <Stack.Screen name='ManagerDashboard' component={ManagerDashboardTab} options={{ headerShown: false }} />
            <Stack.Screen name='LocationWiseSales' component={CLIKY_2.MANAGER.LocationWiseSales} options={{ headerShown: false }} />
            <Stack.Screen name='UserWiseSalesValue' component={CLIKY_2.MANAGER.UserWiseSalesValue} options={{ headerShown: false }} />
            <Stack.Screen name='CategoryWiseSales' component={CLIKY_2.MANAGER.PrimaryCategory} options={{ headerShown: false }} />
            <Stack.Screen name='UserSummary' component={CLIKY_2.MANAGER.UserSummery} options={{ headerShown: false }} />
            <Stack.Screen name='TeamPerformance' component={CLIKY_2.MANAGER.TeamPerformance} options={{ headerShown: false }} />
            <Stack.Screen name='TeamPerformanceDrillDown' component={CLIKY_2.MANAGER.TeamPerformanceDrillDown} options={{ headerShown: false }} />

            {/* MORDERN TRADE */}
            <Stack.Screen name='MTradeDashboard' component={MTradeDashboardTab} options={{ headerShown: false }} />
            <Stack.Screen name='OutletDetail' component={OutletDetailTab} options={{ headerShown: false }} />
            <Stack.Screen name='OutletLogInPage' component={OutletLogInPageTab} options={{ headerShown: false }} />
            <Stack.Screen name='StockUpdateEditDeleteTab' component={StockUpdateEditDeleteTab} options={{ headerShown: false }} />
            <Stack.Screen name='TradeItemList' component={CLIKY_2.MORDERN_TRADE.TradeItemList} options={{ headerShown: false }} />
            <Stack.Screen name='CloseingStockEditDeleteList' component={CLIKY_2.MORDERN_TRADE.CloseingStockEditDeleteList} options={{ headerShown: false }} />
            <Stack.Screen name='ReportList' component={CLIKY_2.MORDERN_TRADE.ReportList} options={{ headerShown: false }} />
            <Stack.Screen name='MerchandisingPage' component={MerchandisingPageTab} options={{ headerShown: false }} />
            <Stack.Screen name='CloseStockListPage' component={CLIKY_2.MORDERN_TRADE.CloseStockListPage} options={{ headerShown: false }} />


          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App;