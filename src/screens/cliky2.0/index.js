import * as LMS from "./lms/index"
import * as CRM from "./crm/index"
import * as MMS from "./mms/index";
import * as MANAGER from './managerView/index'
import * as MORDERN_TRADE from './modernTrade/index'

import * as GAMIFICATION from "./gamification/index";

export { default as Header } from './header/Header';
export { default as Login } from './login/LogIn';
export { default as WelcomeScreen } from './welcomeScreen/WelcomeScreen';
export { default as DrawerMenu } from './drawerMenu/DrawerMenu';

export { default as Home } from './home/Home';
export { default as PjpVisit } from './pjpAndVisit/PjpVisitList';
export { default as PjpAddModal } from './pjpAdddModal/PjpAddModal';

export { default as Notification } from "./notification/Notification";
export { default as ProfilePage } from "./profilePage/ProfilePage";
export { default as VisitHistory } from "./visitHistory/VisitHistory";
export { default as RouteVisit } from "./routeVisit/RouteVisit";
export { default as FavoriteMenu } from './favoriteMenu/FavoriteMenu';
export { default as UnplanVisitList } from "./unPlanVisitList/UnplanVisit";
export { default as Reminder } from './reminder/Reminder';
export { default as CreatePjp } from './createPjp/CreatePjp';
export { default as MyActivity } from './myActivity/MyActivity';
export { default as UnplanVisitFrom } from "./unplanVisitFrom/UnplanVisitFrom";
export { default as OrderProductList } from "./orderProductList/OrderProductList";
export { default as OrderCartDetails } from "./orderCartDetails/OrderCartDetails";
export { default as PocketMis } from "./pocketMis/PocketMis";
export { default as OrderDashboard } from "./orderDashboard/OrderDashboard";
export { default as OrderSuccessfull } from "./orderSuccessfully/OrderSuccessfully";
export { default as ProductWiseSales } from "./productWiseSales/ProductWiseSales";
export { default as DayWiseReport } from "./dayWiseReport/DayWiseReport";
export { default as OutletDetailsPage } from "./outletDetailsPage/OutletDetailsPage";
export { default as OrderLastTenVisit } from "./orderLastTenVisit/OrderLastTenVisit";
export { default as LeaveRequest } from "./leaveRequest/leaveRequest";
export { default as LeaveHistory } from "./leaveHistory/leaveHistory";
export { default as AddNewCustomer } from "./addNewCustomerScreen/index";

export { default as OrderPrimaryCustomerList } from './customerOrderLIst/sub-component/primaryCustomerList/index';
export { default as OrderSecondaryCustomerList } from './customerOrderLIst/sub-component/secondaryCustomerList/index';
// export { default as AddNewSecondaryCustomer } from './addNewSecondaryCustomerScreen/AddNewSecondaryCustomerScreen';
export { default as SplashScreen } from './splashScreen/SplashScreen';
export { default as ChangePassword } from './changePassword/ChangePassword';
export { default as ForgotPassword } from './forgotPassword/ForgotPassword';

export { default as Expenses } from './expenses/Expenses';
export { default as ExpenseDashboard } from './expenseDashboard/index';
export { default as OrderHistoryList } from './orderHistoryList/OrderHistoryList';
export { default as OrderPaymentScreen } from './orderPaymentScreen/index';
export { default as RecentOrderList } from './recentOrderList/index';
export { default as SelectedOrderDetails } from './selectedOrderDetailsList/index';
export { default as SelectedProductDetails } from './selectedProductDetails/index';

export { default as TodaySalesScreen } from './todaysSalesScreen/TodaySalesScreen';
export { default as Messages } from './messages/messages';
export { default as OdometerList } from './odometerList/OdometerList';
export { default as AttendanceList } from './attendanceList/AttendanceList';
export { default as StoreVisitedList } from './storeVisitedList/StoreVisitedList';
export { default as StockUpdatePage } from './stockUpdate/StockUpdate';
export { default as SfaEnquiryList } from './enquiryListV2/index';
export { default as SfaUnplannedVisitForm } from './sfaUnplannedVisitForm/SfaUnplannedVisitForm';
export { default as AllOrderHistoryList } from './allOrderHistoryList/AllOrderHistoryList';
export { default as OrderHistoryItemList } from './orderHistoryItemList/OrderHistoryItemList';
export { default as OrderHistoryAddItemList } from './orderHistoryAddItemsList/OrderHistoryAddItemsList';
export { default as Survey } from './survey/Survey';
export { default as SurveyList } from './surveyList/SurveyList';
export { default as SurveyQuestions } from './surveyQuestions/SurveyQuestions';

export { default as PartnerGift } from './partnerGift/PartnerGift';


export { default as CrmHome } from './home/subComponent/crmHome/crmHome';



export { LMS, CRM, MMS, MANAGER, MORDERN_TRADE, GAMIFICATION }