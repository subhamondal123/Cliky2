import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork,
    stateUserInformation,
    stateAllCountries,
    mappedCountriesUserData,
    mappedProductUserData
} from '../../../redux/Sales360Action';
import { ImageName } from '../../../enums';
import { Image } from 'react-native';
import SvgComponent from '../../../assets/svg';
import { StorageDataModification, Toaster } from '../../../services/common-view-function';
import { AppInfo, App_uri } from '../../../services/config';
import { MiddlewareCheck, StoreUserOtherInformations } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import { LogOutModal } from '../../../shared';
import { CommonActions } from '@react-navigation/native';
import { ClientSettings, UserAccessPermission } from '../../../services/userPermissions';
import styles from './Style';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import { userInfoStore } from './Function';

const menuArr = [
    {
        name: "SFA",
        check: false,
        isHidden: false
    },
    {
        name: "CRM",
        check: false,
        isHidden: false
    },
    {
        name: "MMS",
        check: false,
        isHidden: false
    },
    {
        name: "MANAGER",
        check: false,
        isHidden: false
    },
    {
        name: "MODERN TRADE",
        check: false,
        isHidden: false
    },
]

class DrawerMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userInfo: {},
            userInfoLoader: false,
            menuData: menuArr,
            selectedMenu: "SFA",
            userData: {clientLogo:""},
            logoutModal: false,
            logOutLoader: false,
            pageLoader: true,
            permission: {
                leave: {},
                order: {},
                odometer: {},
                activity: {},
                expense: {},
                pjp: {},
                survey: {},
                sfaEnquiry: {},
                gamification: {},
                pocketMis: {},

                task: {},
                enquiry: {},
                contact: {},
                lead: {},
                organization: {},
                opportunity: {},
            },
            isCrmVisible: false,
            isSfaVisible: false
        }
    }

    componentDidMount = async () => {
        // this._unsubscribe = this.props.navigation.addListener(
        //     'focus', async () => {

        await StoreUserOtherInformations("", {}, this.props);
        await this.load();
        // })
    }

    //on Load
    load = async () => {
        await this.setMenuData()
        await this.getMenuListPermissions()
        await this._getUserInfoFromApi()

        this.state.pageLoader = false;
        this.setState(this.state);

    }
    // for get the user info
    _getUserInfoFromApi = async () => {
        this.setState({ userInfoLoader: true });
        // this.setState(await userInfoStore(this.state, this.props));
        let responseData = await MiddlewareCheck("getGeneralData", {}, this.props);
        if (responseData) {
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR && responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.props.stateUserInformation(responseData.data);
                await StorageDataModification.headerData(responseData.data, "store");
                this.setState({ userInfo: responseData.data })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ userInfoLoader: false, });
    }
    getMenuListPermissions = async () => {
        this.state.permission.leave = await UserAccessPermission.LEAVE.leavePermission(this.props);
        this.state.permission.order = await UserAccessPermission.ORDER.orderPermission(this.props);
        this.state.permission.activity = await UserAccessPermission.ACTIVITY.activityPermission(this.props);
        this.state.permission.expense = await UserAccessPermission.EXPENSE.expensePermission(this.props);
        this.state.permission.pjp = await UserAccessPermission.PJP.pjpPermission(this.props);
        this.state.permission.survey = await UserAccessPermission.SURVEY.surveyPermission(this.props);
        this.state.permission.sfaEnquiry = await UserAccessPermission.SFAENQUIRY.enquiryPermission(this.props);

        this.state.permission.gamification = await UserAccessPermission.GAMIFICATION.gamificationPermission(this.props);
        this.state.permission.pocketMis = await UserAccessPermission.POCKETMIS.pocketMisPermission(this.props);
        this.state.permission.odometer = await UserAccessPermission.ODOMETER.odometerPermission(this.props);

        this.state.permission.task = await UserAccessPermission.TASK.taskPermission(this.props);
        this.state.permission.enquiry = await UserAccessPermission.CRMENQUIRY.enquiryPermission(this.props);
        this.state.permission.lead = await UserAccessPermission.LEAD.leadPermission(this.props);
        this.state.permission.opportunity = await UserAccessPermission.OPPORTUNITY.opportunityPermission(this.props);
        this.state.permission.organization = await UserAccessPermission.ORGANIZATION.organizationPermission(this.props);
        this.state.permission.contact = await UserAccessPermission.CONTACT.contactPermission(this.props);
        let userData = await StorageDataModification.userCredential({}, "get")
        this.state.userData.clientLogo = userData ? userData.clientLogo : ""
    }

    //set the menu permissions
    setMenuData = async () => {
        let crmAccess = await ClientSettings.CrmAccess.getCrmAccess();
        let sfaAccess = await ClientSettings.SfaAccess.getSfaAccess();
        let mmsAccess = await ClientSettings.MmsAccess.getMmsAccess();
        let managerAccess = await ClientSettings.ManagerAccess.getManagerAccess();
        let mtAccess = await ClientSettings.ModernTradeAccess.getModernTradeAccess();
        let selectedTab = ""
        this.state.menuData[0].check = true;
        for (let i = 0; i < this.state.menuData.length; i++) {
            if (i == 0) {
                this.state.menuData[i].check = true;
                selectedTab = this.state.menuData[i].name
            } else {
                this.state.menuData[i].check = false;
            }
            if (this.state.menuData[i].name == "CRM") {
                this.state.menuData[i].isHidden = crmAccess ? false : true
                // selectedTab = this.state.menuData[i].name
            }
            if (this.state.menuData[i].name == "SFA") {
                this.state.menuData[i].isHidden = sfaAccess ? false : true
                // selectedTab = this.state.menuData[i].name
            }
            if (this.state.menuData[i].name == "MMS") {
                this.state.menuData[i].isHidden = mmsAccess ? false : true
                // selectedTab = this.state.menuData[i].name
            }
            if (this.state.menuData[i].name == "MANAGER") {
                this.state.menuData[i].isHidden = managerAccess ? false : true
                // selectedTab = this.state.menuData[i].name
            }
            if (this.state.menuData[i].name == "MODERN TRADE") {
                this.state.menuData[i].isHidden = mtAccess ? false : true
                // selectedTab = this.state.menuData[i].name
            }
        }

        this.setState({ menuData: this.state.menuData, selectedMenu: selectedTab })
    }

    //call activity selection api 
    updateWorkType = async (id) => {
        let reqData = {
            isAttendence: this.props.Sales360Redux.attendanceData.isAttendance,
            activityId: id
        }
        let responseData = await MiddlewareCheck("updateEmpWorkActivityType", reqData, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    //on click the drawer list item
    _onClick = async (type) => {
        let locationData = await StorageDataModification.mappedLocationData({}, "get");
        switch (type) {
            case "order":
                if (this.props.Sales360Redux.attendanceData.isAttendance == "1") {
                    await this.updateWorkType("1")
                    this.props.navigation.push("OrderDashboard");
                } else if (this.props.Sales360Redux.attendanceData.isAttendance == "2") {
                    Toaster.ShortCenterToaster("You have mark your Attendance for the day!")
                } else {
                    Toaster.ShortCenterToaster("Please mark your Attendance !")
                }
                break;
            case "leave":
                this.props.navigation.push("LeaveRequest");
                break;
            case "pjpVisit":
                if (locationData.length > 0) {
                    this.props.navigation.push("PjpVisit");
                } else {
                    Toaster.ShortCenterToaster("You don't have any work location, contact Admin !")
                }
                break;
            case "odometer":
                this.props.navigation.push("OdometerList");
                break;
            case "visitHistory":
                this.props.navigation.push("VisitHistory");
                break;
            case "routeVisit":
                if (locationData.length > 0) {
                    if (this.props.Sales360Redux.attendanceData.isAttendance == "1") {
                        this.props.navigation.push("RouteVisit");
                        await this.updateWorkType("1")
                    } else if (this.props.Sales360Redux.attendanceData.isAttendance == "2") {
                        Toaster.ShortCenterToaster("You have mark your Attendance for the day!")
                    } else {
                        Toaster.ShortCenterToaster("Please mark your Attendance !")
                    }
                } else {
                    Toaster.ShortCenterToaster("You don't have any work location, contact Admin !")
                }
                break;
            case "performanceMis":
                this.props.navigation.push("MyPocketMis");
                break;
            case "myActivity":
                this.props.navigation.push("MyActivity");
                break;
            case "ExpenseDashboard":
                this.props.navigation.push("ExpenseDashboard");
                break;
            case "lms":
                this.props.navigation.push("LmsDashboard");
                break;
            case "attendance":
                this.props.navigation.push("AttendanceList");
                break;
            case "calender":
                this.props.navigation.push("MyCalender");
                break;
            case "Enquiry":
                if (this.props.Sales360Redux.attendanceData.isAttendance == "1") {
                    this.props.navigation.push("SfaEnquiryList");
                } else if (this.props.Sales360Redux.attendanceData.isAttendance == "2") {
                    Toaster.ShortCenterToaster("You have mark your Attendance for the day!")
                } else {
                    Toaster.ShortCenterToaster("Please mark your Attendance !")
                }
                break;
            case "AllOrders":
                this.props.navigation.push("AllOrderHistoryList");
                break;
            case "survey":
                this.props.navigation.push("SurveyList");
                break;
            case "gift":
                this.props.navigation.push("partnerGift");
                break;
            //crm
            case "ViewCalender":
                this.props.navigation.push("ViewCalendar");
                break;
            case "Analytics":
                this.props.navigation.push("CrmHome");
                break;
            case "Registration":
                this.props.navigation.push("UnplanVisitForm", { type: "global" })
                break;
            case "Task":
                this.props.navigation.push("TaskList");
                break;
            case "CrmEnquiry":
                this.props.navigation.push("CrmEnquiryList");
                break;
            case "Lead":
                this.props.navigation.push("LeadsList");
                break;
            case "Contact":
                this.props.navigation.push("ContactListPage");
                break;
            case "Organization":
                this.props.navigation.push("OrganizationList");
                break;
            case "Opportunity":
                this.props.navigation.push("OpportunityList");
                break;
            case "CreateTask":
                this.props.navigation.push("CreateAndEditTask", { type: "add" });
                break;
            case "CreateCrmEnquiry":
                this.props.navigation.push("CreateAndEditEnquiry", { type: "add" });
                break;
            case "CreateLead":
                this.props.navigation.push("CreateAndEditLeads", { type: "add" });
                break;
            case "CreateContact":
                this.props.navigation.push("CreateAndEditContact", { type: "add" });
                break;
            case "CreateOrganization":
                this.props.navigation.push("CreateAndEditOrganization", { type: "add" });
                break;

            //mms
            case "MmsDashboard":
                this.props.navigation.push("MmsDashboard");
                break;
            case "MmsNewEvent":
                this.props.navigation.push("MmsNewEvent");
                break;
            case "MmsEventList":
                this.props.navigation.push("MmsEventList");
                break;

            //Manager
            case "ManagerDashboard":
                if (this.props.Sales360Redux.attendanceData.isAttendance == "1") {
                    this.props.navigation.push("ManagerDashboard");
                } else if (this.props.Sales360Redux.attendanceData.isAttendance == "2") {
                    Toaster.ShortCenterToaster("You have mark your Attendance for the day!")
                } else {
                    Toaster.ShortCenterToaster("Please mark your Attendance !")
                }
                break;

            // MODERN TRADE
            case "MTradeDashboard":
                if (this.props.Sales360Redux.attendanceData.isAttendance == "1") {
                    this.props.navigation.push("MTradeDashboard");
                } else if (this.props.Sales360Redux.attendanceData.isAttendance == "2") {
                    Toaster.ShortCenterToaster("You have mark your Attendance for the day!")
                } else {
                    Toaster.ShortCenterToaster("Please mark your Attendance !")
                }
                break;

            //GAMIFICATION

            case "GamificationDashboard":
                this.props.navigation.push("GamificationDashboard");
                break;

            case "changePassword":
                this.props.navigation.push("ChangePassword");
                break;
        }
    }

    //on logout modal open close
    _onLogoutModal = () => {
        this.setState({
            logoutModal: !this.state.logoutModal
        })
    }


    // all modal section
    modalSec = () => {
        // for logout api call
        const _onLogout = async () => {
            this.setState({ logOutLoader: true });
            // if (await DeviceInfo.CheckConnection()) {
            let responseData = await MiddlewareCheck("logout", {}, this.props);
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await StorageDataModification.removeLoginData();
                await StorageDataModification.removeAllStorageData();
                Toaster.ShortCenterToaster(responseData.message);
                // await multipleRemove(["auth", "userCredential", "headerData", ...StoreDataToStorage.allStorageVariable]);
                // this.props.dispatch({ type: "SET_USER_INFORMATION", payload: {} });
                this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LogIn' }] }));
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
            // } 
            // else {
            //     await StorageDataModification.removeLoginData();
            //     await StorageDataModification.removeAllStorageData();
            //     this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LogIn' }] }));
            // }

            this.setState({ logOutLoader: false, logoutModal: false });
        }

        return (
            <LogOutModal
                isVisible={this.state.logoutModal}
                isLoading={this.state.logOutLoader}
                onCloseModal={() => this._onLogoutModal()}
                onLogout={() => _onLogout()}
            />
        )
    }

    // on selecting edit icon
    onEdit = () => {
        this.props.navigation.push("ProfilePage", { data: { isEditable: true } });
    }

    //all SFA menu
    sfaMenu = () => {
        return (
            <>
                {this.state.permission.order.viewPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("order")} >
                        <SvgComponent svgName={"doubleUser"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>Order</Text>
                            <Text style={styles.analyticsDataTxt}>My Order & Report</Text>
                        </View>

                    </TouchableOpacity>
                    :
                    null
                }
                {this.state.permission.leave.viewPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("leave")} >
                        <SvgComponent svgName={"leave"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>Leave</Text>
                            <Text style={styles.analyticsDataTxt}>My Leave & Report</Text>
                        </View>

                    </TouchableOpacity>
                    :
                    null
                }
                {/* {this.state.permission.pjp.viewPem || this.state.permission.pjp.addPem ? */}
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("pjpVisit")} >
                    <SvgComponent svgName={"location"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Pjp</Text>
                        <Text style={styles.analyticsDataTxt}>Pjp List</Text>
                    </View>

                </TouchableOpacity>
                {/* : null} */}


                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("routeVisit")} >
                    <SvgComponent svgName={"location_with_route"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Unplanned Visit</Text>
                        <Text style={styles.analyticsDataTxt}>All Unplanned Visit List</Text>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("calender")} >
                            <SvgComponent svgName={"calender"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                            <View style={styles.txtViewSec}>
                                <Text style={styles.analyticsTxt}>My Calender</Text>
                                <Text style={styles.analyticsDataTxt}>Calender</Text>
                            </View>
                          
                        </TouchableOpacity> */}
                {this.state.permission.odometer.viewPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("odometer")} >
                        <SvgComponent svgName={"odomiter"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>Odometer</Text>
                            <Text style={styles.analyticsDataTxt}>Odometer History</Text>
                        </View>
                    </TouchableOpacity>
                    : null}

                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("attendance")} >
                    <SvgComponent svgName={"chartProgress"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Attendance</Text>
                        <Text style={styles.analyticsDataTxt}>Attendance History</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("visitHistory")} >
                    <SvgComponent svgName={"menu"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Visit History</Text>
                        <Text style={styles.analyticsDataTxt}>All Visits List</Text>
                    </View>
                </TouchableOpacity>
                {this.state.permission.pocketMis.viewPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("performanceMis")} >
                        <SvgComponent svgName={"suggested"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>Performance MIS</Text>
                            <Text style={styles.analyticsDataTxt}>Performance MIS</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    null}
                {this.state.permission.activity.viewPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("myActivity")} >
                        <SvgComponent svgName={"love"} hight={25} width={25} strokeColor={"grey"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>My Activity</Text>
                            <Text style={styles.analyticsDataTxt}>All Activities</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    null
                }
                {/* {this.state.permission.survey.viewPem || this.state.permission.survey.addPem ?
                                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("survey")} >
                                        <SvgComponent svgName={"achiveBook"} hight={25} width={25} strokeColor={"grey"} />
                                        <View style={styles.txtViewSec}>
                                            <Text style={styles.analyticsTxt}>Survey</Text>
                                            <Text style={styles.analyticsDataTxt}>Survey List</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    null
                                } */}
                {this.state.permission.expense.viewPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("ExpenseDashboard")} >
                        <SvgComponent svgName={"expenses"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>Expenses</Text>
                            <Text style={styles.analyticsDataTxt}>All Expenses</Text>
                        </View>
                    </TouchableOpacity>
                    : null}

                {this.state.permission.gamification.viewPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("GamificationDashboard")} >
                        <SvgComponent svgName={"expenses"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>Gamification</Text>
                            <Text style={styles.analyticsDataTxt}>Dashboard</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    null
                }
                {this.state.permission.sfaEnquiry.viewPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("Enquiry")} >
                        <SvgComponent svgName={"fevouritWithTick"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>Enquiry</Text>
                            <Text style={styles.analyticsDataTxt}>All Enquiries</Text>
                        </View>

                    </TouchableOpacity>
                    : null}


                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("AllOrders")} >
                    <SvgComponent svgName={"help"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Order History</Text>
                        <Text style={styles.analyticsDataTxt}>All Orders</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("gift")} >
                    <SvgComponent svgName={"fevouritWithTick"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Partner's Gift</Text>
                        <Text style={styles.analyticsDataTxt}>Available Gifts</Text>
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("lms")} >
                            <SvgComponent svgName={"leave"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                            <View style={styles.txtViewSec}>
                                <Text style={styles.analyticsTxt}>LMS</Text>
                                <Text style={styles.analyticsDataTxt}>Loyalty Management System</Text>
                            </View>
                        
                        </TouchableOpacity> */}
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("changePassword")} >
                    <SvgComponent svgName={"pencil"} hight={25} width={25} strokeColor={"grey"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Change Password</Text>
                        <Text style={styles.analyticsDataTxt}>Change Your Password</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    //ALL CRM Menu
    crmMenu = () => {
        return (
            <React.Fragment>
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("Analytics")}  >
                    <SvgComponent svgName={"chartProgress"} hight={25} width={25} strokeColor={"grey"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Analytics</Text>
                        <Text style={styles.analyticsDataTxt}>Analytics Data</Text>
                    </View>
                    {/* <View style={{ backgroundColor: Color.COLOR.RED.AMARANTH, justifyContent: 'center', alignItems: 'center', borderRadius: 100, height: 25, width: 25 }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 3 }}>0</Text>
                        </View> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("ViewCalender")}  >
                    <SvgComponent svgName={"chartProgress"} hight={25} width={25} strokeColor={"grey"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Calender</Text>
                        <Text style={styles.analyticsDataTxt}>Calender View</Text>
                    </View>
                    {/* <View style={{ backgroundColor: Color.COLOR.RED.AMARANTH, justifyContent: 'center', alignItems: 'center', borderRadius: 100, height: 25, width: 25 }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 3 }}>0</Text>
                        </View> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("Registration")}  >
                    <SvgComponent svgName={"hording"} hight={25} width={25} strokeColor={"grey"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>New Shop Registration</Text>
                        <Text style={styles.analyticsDataTxt}>Add New Shop</Text>
                    </View>
                </TouchableOpacity>
                {/* {this.state.permission.task.viewPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("Task")}  >
                        <SvgComponent svgName={"pencil"} hight={25} width={25} strokeColor={"grey"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>Task</Text>
                            <Text style={styles.analyticsDataTxt}>All Tasks</Text>
                        </View>
                    </TouchableOpacity>
                    : null
                }
                {this.state.permission.task.addPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("CreateTask")}  >
                        <SvgComponent svgName={"pencil"} hight={25} width={25} strokeColor={"grey"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>Create Task</Text>
                            <Text style={styles.analyticsDataTxt}>Create a Task</Text>
                        </View>

                    </TouchableOpacity>
                    : null
                } */}
                {/* {this.state.permission.enquiry.viewPem ? */}
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("CrmEnquiry")}  >
                    <SvgComponent svgName={"locationWithCircle"} hight={25} width={25} strokeColor={"grey"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Enquiry</Text>
                        <Text style={styles.analyticsDataTxt}>All Enquiries</Text>
                    </View>
                </TouchableOpacity>
                {/* :
                    null} */}
                {/* {this.state.permission.enquiry.addPem ? */}
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("CreateCrmEnquiry")}  >
                    <SvgComponent svgName={"locationWithCircle"} hight={25} width={25} strokeColor={"grey"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Create Enquiry</Text>
                        <Text style={styles.analyticsDataTxt}>Create a Enquiry</Text>
                    </View>
                </TouchableOpacity>
                {/* :
                    null} */}
                {/* {this.state.permission.lead.viewPem ? */}
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("Lead")}  >
                    <SvgComponent svgName={"doubleUser"} hight={25} width={25} strokeColor={"grey"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Lead</Text>
                        <Text style={styles.analyticsDataTxt}>All Leads</Text>
                    </View>
                </TouchableOpacity>
                {/* : null} */}
                {/* {this.state.permission.lead.addPem ? */}
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("CreateLead")}  >
                    <SvgComponent svgName={"doubleUser"} hight={25} width={25} strokeColor={"grey"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Create Lead</Text>
                        <Text style={styles.analyticsDataTxt}>Create a Lead</Text>
                    </View>
                </TouchableOpacity>
                {/* : null} */}
                {/* {this.state.permission.contact.viewPem ? */}
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("Contact")}  >
                    <SvgComponent svgName={"profileWithBorder"} hight={25} width={25} strokeColor={"grey"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Contact</Text>
                        <Text style={styles.analyticsDataTxt}>All Contacts</Text>
                    </View>
                </TouchableOpacity>
                {/* : null} */}
                {/* {this.state.permission.contact.addPem ? */}
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("CreateContact")}  >
                    <SvgComponent svgName={"profileWithBorder"} hight={25} width={25} strokeColor={"grey"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Create Contact</Text>
                        <Text style={styles.analyticsDataTxt}>Create a Contact</Text>
                    </View>
                </TouchableOpacity>
                {/* : null} */}
                {this.state.permission.organization.viewPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("Organization")}  >
                        <SvgComponent svgName={"leave"} hight={25} width={25} strokeColor={"grey"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>Accounts</Text>
                            <Text style={styles.analyticsDataTxt}>All Accounts</Text>
                        </View>
                    </TouchableOpacity>
                    : null}
                {this.state.permission.organization.addPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("CreateOrganization")}  >
                        <SvgComponent svgName={"leave"} hight={25} width={25} strokeColor={"grey"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>Create Account</Text>
                            <Text style={styles.analyticsDataTxt}>Create a Account</Text>
                        </View>
                    </TouchableOpacity>
                    : null}
                {/* {this.state.permission.opportunity.viewPem ?
                    <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("Opportunity")}  >
                        <SvgComponent svgName={"menu"} hight={25} width={25} strokeColor={"grey"} />
                        <View style={styles.txtViewSec}>
                            <Text style={styles.analyticsTxt}>Opportunity</Text>
                            <Text style={styles.analyticsDataTxt}>All Opportunities</Text>
                        </View>
                      
                    </TouchableOpacity>
                    : null} */}
            </React.Fragment>
        )
    }

    // ALL MMS MENU
    mmsMenu = () => {
        return (
            <React.Fragment>
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("MmsDashboard")} >
                    <SvgComponent svgName={"doubleUser"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Analytics MMS</Text>
                        <Text style={styles.analyticsDataTxt}>Analytics Data</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("MmsNewEvent")} >
                    <SvgComponent svgName={"doubleUser"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Create Event</Text>
                        <Text style={styles.analyticsDataTxt}>Create Event Data</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("MmsEventList")} >
                    <SvgComponent svgName={"doubleUser"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Event List</Text>
                        <Text style={styles.analyticsDataTxt}>Meeting List Data</Text>
                    </View>
                </TouchableOpacity>

            </React.Fragment>
        )
    }

    //ALL MANAGER MENU
    managerMenu = () => {
        return (
            <React.Fragment>
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("ManagerDashboard")} >
                    <SvgComponent svgName={"doubleUser"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Dashboard</Text>
                        <Text style={styles.analyticsDataTxt}>Analytics Data</Text>
                    </View>
                </TouchableOpacity>
            </React.Fragment>
        )
    }

    //ALL TRADE MENU
    tradeMenu = () => {
        return (
            <React.Fragment>
                <TouchableOpacity style={styles.clickTab} onPress={() => this._onClick("MTradeDashboard")} >
                    <SvgComponent svgName={"chartProgress"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                    <View style={styles.txtViewSec}>
                        <Text style={styles.analyticsTxt}>Dashboard</Text>
                        <Text style={styles.analyticsDataTxt}>Analytics Data</Text>
                    </View>
                </TouchableOpacity>
            </React.Fragment>
        )
    }

    //select the menu
    onSelectMenu = (item, index) => {
        for (let i = 0; i < this.state.menuData.length; i++) {
            if (i == index) {
                this.state.menuData[i].check = true
            } else {
                this.state.menuData[i].check = false
            }
        }
        this.state.selectedMenu = item.name
        this.setState({ selectedMenu: this.state.selectedMenu })
    }

    menuSkeliton = () => {
        return (
            <SkeletonPlaceholder backgroundColor={"#d67a8b"}>
                <View style={{ flexDirection: "row", }}>
                    <View style={{ height: 32, width: 50, borderRadius: 18, marginRight: 5 }} />
                    <View style={{ height: 32, width: 70, borderRadius: 18, marginRight: 5 }} />
                    <View style={{ height: 32, width: 80, borderRadius: 18 }} />
                </View>
            </SkeletonPlaceholder>
        )
    }

    profileImgSkeliton = () => {
        return (
            <>
                <SkeletonPlaceholder backgroundColor={"#d67a8b"}>
                    <View style={{ height: 80, width: 80, borderRadius: 40, marginTop: 10 }} />
                </SkeletonPlaceholder>
            </>
        )
    }

    profileDataSkeliton = () => {
        return (
            <SkeletonPlaceholder backgroundColor={"#d67a8b"}>
                <View style={{ height: 25, width: 150, borderRadius: 20, marginBottom: 15, marginLeft: 10 }} />
            </SkeletonPlaceholder>
        )
    }

    menuListSkeliton = () => {
        let arr = []
        for (let i = 0; i < 8; i++) {
            arr.push(
                <View>
                    <View style={styles.clickTab}>
                        <SkeletonPlaceholder>
                            <View style={{ height: 34, width: 34, borderRadius: 17, marginRight: 10, marginVertical: 5 }} />
                        </SkeletonPlaceholder>
                        <SkeletonPlaceholder>
                            <View style={{ height: 20, width: 100, marginBottom: 5, borderRadius: 20 }} />
                            <View style={{ height: 20, width: 180, borderRadius: 20 }} />
                        </SkeletonPlaceholder>
                    </View>
                </View>
            )
        }
        return (
            arr
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.subContainer}>
                    <View style={styles.drawerSec}>
                        <View style={styles.selectLogoutSec}>
                            <View style={styles.selectMenuSec}>
                                <View style={{}}>
                                    <Image source={{ uri: App_uri.AWS_S3_IMAGE_VIEW_URI + this.state.userData.clientLogo }} style={{ height: 40, width: 60, resizeMode: "contain",borderRadius:10 }} />
                                </View>
                                {this.state.pageLoader ?
                                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                                        {this.menuSkeliton()}
                                    </View>
                                    :
                                    <>
                                        {/* <View style={{ flex: 1 }} /> */}
                                        <View style={{ flex: 1, alignItems: "flex-end", marginHorizontal: 10 }}>
                                            <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                                {this.state.menuData.map((item, key) => (
                                                    <React.Fragment key={key}>
                                                        {item.isHidden ? null :
                                                            <TouchableOpacity style={[styles.selectMenuTab, { borderWidth: item.check ? 1 : 0 }]} onPress={() => this.onSelectMenu(item, key)}>
                                                                <Text style={styles.itemNameTxt}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                        }
                                                    </React.Fragment>
                                                ))}
                                            </ScrollView>
                                        </View>
                                    </>
                                }
                                <TouchableOpacity style={styles.editTab} onPress={() => this.onEdit()}>
                                    <SvgComponent svgName={"pencil"} hight={16} width={16} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.logOutTab} activeOpacity={0.8} onPress={() => this._onLogoutModal()}>
                                    <Image source={ImageName.LOGOUT_BLUE} style={styles.logOutImg} />
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ flex: 1 }} />
                            <TouchableOpacity style={styles.editTab} onPress={() => this.onEdit()}>
                                <SvgComponent svgName={"pencil"} hight={16} width={16} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logOutTab} activeOpacity={0.8} onPress={() => this._onLogoutModal()}>
                                <Image source={ImageName.LOGOUT_BLUE} style={styles.logOutImg} />
                            </TouchableOpacity> */}
                        </View>
                        <View style={styles.first_designationNameSec}>
                            {this.state.pageLoader ?
                                this.profileImgSkeliton()
                                :
                                <View style={styles.uriImgSec}>
                                    <Image source={{ uri: Object.keys(this.state.userInfo).length > 0 ? App_uri.IMAGE_URI + this.state.userInfo.details.profileImgUrl : App_uri.IMAGE_URI + "/images/business.jpg" }} style={styles.uriImg} />
                                </View>
                            }
                            {/* {this.state.pageLoader ?
                                this.profileDataSkeliton()
                                : */}
                            <View style={{ marginLeft: '5%', flex: 1, }}>
                                <Text style={styles.firstNameTxt}>{this.state.userInfo.details ? this.state.userInfo.details.name : ""}</Text>
                                <Text style={styles.designationNameTxt}>{this.state.userInfo.details ? this.state.userInfo.details.designationName : ""}</Text>
                            </View>
                            {/* } */}
                        </View>
                    </View>
                    {/* {this.state.pageLoader ?
                        <>
                            {this.menuListSkeliton()}
                            <View style={{ flex: 1 }} />
                        </>
                        : */}
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {this.state.selectedMenu == "SFA" ?
                            <>
                                {this.sfaMenu()}
                            </>
                            :
                            null
                        }
                        {this.state.selectedMenu == "CRM" ?
                            <>
                                {this.crmMenu()}
                            </>
                            :
                            null
                        }
                        {this.state.selectedMenu == "MMS" ?
                            <>
                                {this.mmsMenu()}
                            </>
                            :
                            null
                        }
                        {this.state.selectedMenu == "MANAGER" ?
                            <>
                                {this.managerMenu()}
                            </>
                            :
                            null
                        }
                        {this.state.selectedMenu == "MODERN TRADE" ?
                            <>
                                {this.tradeMenu()}
                            </>
                            :
                            null
                        }
                        <View style={{ height: 50 }} />
                    </ScrollView>
                    {/* } */}
                    <View style={styles.versionTxtSec}>
                        <Text style={styles.versionTxt}>V {AppInfo.getCurrentAppVersion()}</Text>
                    </View>
                </View>
                <View style={styles.viewStyle} />
                {this.modalSec()}
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
        stateUserInformation,
        stateAllCountries,
        mappedCountriesUserData,
        mappedProductUserData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu)