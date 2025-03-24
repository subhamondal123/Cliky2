import React from 'react';
import { CommonActions } from '@react-navigation/native';
import styles from './style';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    Share,
} from 'react-native';
import { Crmdash, EnquiryList, LeadsList, OpportunityList, OrganizationList, Sfpdash, ViewCalendar } from '../../screens';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums';
import {  BrandingList, CreateEnquiry, Expenses, ExpensesDashBoard, GamificationDashboard, StockMainDetails } from '../../screens/sfa';
import { LogOutModal, LottyViewLoad } from '../../shared';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import { useDispatch, useSelector } from 'react-redux'
import { PLAYSTORE_URL } from '../../../globalConstant';
import { AppInfo } from '../../services/config';
import { modifyMenuArrData } from './function';
import {
    CreatePjpTab,
    LeaveHistoryTab,
    LeaveRequestTab,
    LeaveTab,
    MainBottomTab,
    MenuTab,
    MyActivityTab,
    NotificationTab,
    PjpVisitTab,
    ReminderTab,
    RouteVisitTab,
    UnplanVisitFromTab,
    UnplanVisitTab,
    VisitHistoryTab
} from '../bottomTabNavigator';
import { OrderDashboard } from '../../screens/cliky2.0';

const Drawer = createDrawerNavigator();

let drawerMainData = [
    {
        name: "SFA",
        check: false,
        drawerItemValue: [

            {
                id: 1,
                name: "Home",
                icon: ImageName.HOME_WHITE,
                routeName: "Home",
                menuName: "home"
            }, {
                id: 2,
                name: "Analytics",
                icon: ImageName.ANALYTICS_WHITE,
                routeName: "Analytics",
                menuName: "analytics"
            }, {
                id: 3,
                name: "Activity",
                icon: ImageName.ACTIVITY_WHITE,
                routeName: "Activity",
                menuName: "activity"

            }, {
                id: 4,
                name: "Retail Visits",
                icon: ImageName.VISITS_WHITE,
                routeName: "Visits",
                menuName: "retailVisit"

            }, {
                id: 5,
                name: "Project Visits",
                icon: ImageName.VISITS_WHITE,
                routeName: "ProjectPjpAndVisitedList",
                menuName: "projectVisit"

            }, {
                id: 6,
                name: "Enquiries",
                icon: ImageName.ENQUIRIES_WHITE,
                routeName: "Enquiries",
                menuName: "Enquiry"

            }, {
                id: 7,
                name: "Calendar",
                icon: ImageName.CALENDAR_WHITE,
                routeName: "Calendar",
                menuName: "calender"

            },
            {
                id: 8,
                name: "Partners",
                icon: ImageName.SELF_SERVICE_WHITE,
                routeName: "Partners",
                menuName: "partners"

            },

            {
                id: 9,
                name: "Attendance",
                icon: ImageName.REPORT_WHITE,
                routeName: "Attendance",
                menuName: "attendance"

            }, {
                id: 10,
                name: "Apply Leave",
                icon: ImageName.EXPENSES_WHITE,
                routeName: "ApplyLeave",
                menuName: "leave"

            },
            // {
            //     id: 11,
            //     name: "Meeting",
            //     icon: ImageName.MEETING_WHITE,
            //     routeName: "MeetingSection",
            //     menuName: "meeting"

            // },
            {
                id: 12,
                name: "Odometer Reading",
                icon: ImageName.MEETING_WHITE,
                routeName: "OdometerReading",
                menuName: "otometer"

            },
            {
                id: 13,
                name: "Survey",
                icon: ImageName.SELF_SERVICE_WHITE,
                routeName: "Survey",
                menuName: "survey"


            }, {
                id: 14,
                name: "Conversion History",
                icon: ImageName.ANALYTICS_WHITE,
                routeName: "ConvertionHistory",
                menuName: "conversion"

            },
            {
                id: 15,
                name: "Feedback",
                icon: ImageName.FEEDBACK_WHITE,
                routeName: "Feedback",
                menuName: "feedback"

            },
            {
                id: 16,
                name: "Visit Reports",
                icon: ImageName.CSR_WHITE,
                routeName: "VisitReports",
                menuName: "visitReport"

            },
            {
                id: 17,
                name: "Approval Section",
                icon: ImageName.CSR_WHITE,
                routeName: "ApprovalSection",
                menuName: "approvalSection"

            },
            {
                id: 18,
                name: "Expenses",
                icon: ImageName.EXPENSES_WHITE,
                routeName: "ExpensesDashboard",
                menuName: "expense"

            },
            {
                id: 19,
                name: "Book Order",
                icon: ImageName.EXPENSES_WHITE,
                routeName: "Order",
                menuName: "order"

            },
            {
                id: 19,
                name: "Gamification",
                icon: ImageName.EXPENSES_WHITE,
                routeName: "GamificationDashboard",
                menuName: "gamification"

            },
            {
                id: 19,
                name: "Branding",
                icon: ImageName.BRANDING_WHITE,
                routeName: "UserBrandingList",
                menuName: "branding"

            },
            {
                id: 20,
                name: "CSR",
                icon: ImageName.CSR_WHITE,
                routeName: "CSR",
                menuName: "csr"
            },
            {
                id: 21,
                name: "Change Password",
                icon: ImageName.FEEDBACK_WHITE,
                routeName: "ChangePassword",
                menuName: "changePassword"

            },
            {
                id: 22,
                name: "Share App",
                icon: ImageName.SHARE_APP_WHITE,
                routeName: "ShareApp",
                menuName: "shareApp"
            },
            {
                id: 23,
                name: "Performance MIS",
                icon: ImageName.EXPENSES_WHITE,
                routeName: "MyPocketMis",
                menuName: "myPocketMis"

            }

        ]
    },
    {
        name: "CRM",
        check: false,
        drawerItemValue: [

            {
                id: 1,
                name: "Home",
                icon: ImageName.HOME_WHITE,
                routeName: "CrmHome",
                menuName: "crmHome"

            }, {
                id: 2,
                name: "Task",
                icon: ImageName.ANALYTICS_WHITE,
                routeName: "Task",
                menuName: "task"

            }, {
                id: 3,
                name: "Enquiry",
                icon: ImageName.ACTIVITY_WHITE,
                routeName: "Enquery",
                menuName: "crmEnquiry"

            }, {
                id: 4,
                name: "Lead",
                icon: ImageName.VISITS_WHITE,
                routeName: "Lead",
                menuName: "lead"

            }, {
                id: 5,
                name: "Opportunity",
                icon: ImageName.ENQUIRIES_WHITE,
                routeName: "Opportunity",
                menuName: "opportunity"

            }, {
                id: 6,
                name: "Contact",
                icon: ImageName.CALENDAR_WHITE,
                routeName: "Contact",
                menuName: "contact"

            }, {
                id: 7,
                name: "Organizations",
                icon: ImageName.BRANDING_WHITE,
                routeName: "Organizations",
                menuName: "organization"

            }, {
                id: 8,
                name: "Change Password",
                icon: ImageName.FEEDBACK_WHITE,
                routeName: "ChangePassword",
                menuName: "changePassword"
            },
            {
                id: 9,
                name: "Share App",
                icon: ImageName.SHARE_APP_WHITE,
                routeName: "ShareApp",
                menuName: "shareApp"

            }
        ]
    },

    {
        name: "MMS",
        check: false,
        drawerItemValue: [

            {
                id: 1,
                name: "Home",
                icon: ImageName.HOME_WHITE,
                routeName: "MmsDashboard",
                menuName: "mmsHome"
            },
            {
                id: 2,
                name: "Event",
                icon: ImageName.CSR_WHITE,
                routeName: "MmsEvent",
                menuName: "event"

            }, {
                id: 3,
                name: "Change Password",
                icon: ImageName.FEEDBACK_WHITE,
                routeName: "ChangePassword",
                menuName: "changePassword"
            },
            {
                id: 4,
                name: "Share App",
                icon: ImageName.SHARE_APP_WHITE,
                routeName: "ShareApp",
                menuName: "shareApp"

            }

        ]
    }, {
        name: "LMS",
        check: false,
        drawerItemValue: []
    }, {
        name: "OTS",
        check: false,
        drawerItemValue: []
    }
]

class DrawerContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerItems: [],
            pageLoader: true,
            nextActionCheck: false,
            selectDrawerItem: [],
            selectDrowerItemIndex: 0,
            selectDrawerSubItemIndex: 0,
            prevCheck: false,
            nextPrevHideCheck: false,
            logoutModal: false,
            logOutLoader: false,
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        let modArrData = modifyMenuArrData(drawerMainData, await StorageDataModification.userMenuPermision({}, "get"), 8);
        this.state.drawerItems = modArrData;
        this.setState({
            drawerItems: this.state.drawerItems
        })
        this._onModifyTypeData(this.state.selectDrawerSubItemIndex);
        this.setState({
            pageLoader: false
        })
    }

    _onShareApp = async () => {
        try {
            const result = await Share.share({
                message:
                    'Use this link to download the new SFA application named Cliky....\n' + PLAYSTORE_URL,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    _onSelectItem = (type) => {
        this.closeDrawer();
        switch (type) {
            case "Home":
                this.props.navigation.navigate("SfaDashboard");
                break;
            // for CRM
            case "CrmHome":
                this.props.navigation.navigate("CrmDashboard");
                break;
            case "Task":
                this.props.navigation.navigate("TaskList");
                break;

            case "Enquery":
                this.props.navigation.navigate("EnquiryList");
                break;

            case "Lead":
                this.props.navigation.navigate("LeadsList");
                break;

            case "Opportunity":
                this.props.navigation.navigate("OpportunityList");
                break;

            case "Contact":
                this.props.navigation.navigate("ContactListPage");
                break;

            case "Organizations":
                this.props.navigation.navigate("OrganizationList");
                break;

            // for SFA
            case "Analytics":
                this.props.navigation.navigate("Map");
                break;

            case "Activity":
                this.props.navigation.navigate("MyActivity");
                break;

            case "Visits":
                this.props.navigation.navigate("PjpAndVisitList");
                break;

            case "ProjectPjpAndVisitedList":
                this.props.navigation.navigate("ProjectPjpAndVisitedList");
                break;

            case "Enquiries":
                this.props.navigation.navigate("SfaEnquiryList");
                break;

            case "VisitReports":
                this.props.navigation.navigate("VisitReports");
                break;

            case "Calendar":
                this.props.navigation.navigate("ViewCalendar");
                break;

            case "UserBrandingList":
                this.props.navigation.navigate("UserBrandingList");
                break;

            case "ApplyLeave":
                this.props.navigation.navigate("LeaveScreen");
                break;

            case "ExpensesDashboard":
                this.props.navigation.navigate("ExpensesDashboard");
                break;

            case "GamificationDashboard":
                this.props.navigation.navigate("GamificationDashboard");
                break;

            case "Order":
                this.props.navigation.navigate("OrderDashboard");
                break;

            case "Attendance":
                this.props.navigation.navigate("SfaAttendance");
                break;

            case "Report":
                this.props.navigation.navigate("SfaDashboard");
                break;

            case "MeetingSection":
                this.props.navigation.navigate("MeetingSection");
                break;

            case "OdometerReading":
                this.props.navigation.navigate("odometer");
                break;

            case "SelfService":
                this.props.navigation.navigate("SfaDashboard");
                break;

            case "Survey":
                this.props.navigation.navigate("SurveyList");
                break;

            case "CSR":
                this.props.navigation.navigate("Csr");
                break;

            case "Tour":
                this.props.navigation.navigate("SfaDashboard");
                break;

            case "Feedback":
                this.props.navigation.navigate("Feedback");
                break;

            case "Partners":
                this.props.navigation.navigate("Partners");
                break;

            case "ApprovalSection":
                this.props.navigation.navigate("ApprovalSection");
                break;

            case "ShareApp":
                this._onShareApp();
                break;

            case "ConvertionHistory":
                this.props.navigation.navigate("ConvertionHistory");
                break;

            case "ChangePassword":
                this.props.navigation.navigate("ChangePassword");
                break;

            case "MyPocketMis":
                this.props.navigation.navigate("MyPocketMis");
                break;

            // for mms
            case "MmsEvent":
                this.props.navigation.navigate("MmsEventList");
                break;
            case "MmsDashboard":
                this.props.navigation.navigate("MmsDashboard");
                break;
        }
    }

    closeDrawer = () => {
        this.props.navigation.closeDrawer();
    }

    // for modify the type
    _onModifyTypeData = (index) => {
        for (let i = 0; i < this.state.drawerItems.length; i++) {

            if (index == 0 || index == 1 || index == 2) {
                if (index == i) {
                    this.state.drawerItems[i].check = true;
                    if (this.state.drawerItems[i].drawerItemValue) {
                        this._onDrawerSubItemSelect(this.state.drawerItems[i].drawerItemValue, 0);
                    }
                } else {
                    this.state.drawerItems[i].check = false;
                }
            }
        }
        this.setState({
            drawerItems: this.state.drawerItems,
            selectDrawerSubItemIndex: index,
            selectDrowerItemIndex: 0,
            prevCheck: false
        })
    }

    // for chnage the select drawer item 
    _onDrawerSubItemSelect = (drawerItemValue, selectDrowerItemIndex) => {
        let selectDrawerItem = [];
        if (drawerItemValue[selectDrowerItemIndex]) {
            selectDrawerItem = drawerItemValue[selectDrowerItemIndex];
        }
        this.setState({
            selectDrawerItem: selectDrawerItem,
            selectDrowerItemIndex: selectDrowerItemIndex
        })
    }

    // for next button
    _onNext = () => {
        this.setState({
            prevCheck: true,
            nextPrevLoadCheck: true
        })
        let selectDrowerItemIndex = 0;
        if ((this.state.drawerItems[this.state.selectDrawerSubItemIndex].drawerItemValue.length - 1) > this.state.selectDrowerItemIndex) {
            selectDrowerItemIndex = this.state.selectDrowerItemIndex + 1;
        }
        this._onDrawerSubItemSelect(this.state.drawerItems[this.state.selectDrawerSubItemIndex].drawerItemValue, selectDrowerItemIndex);
        this.setState({ nextPrevLoadCheck: false })
    }

    // for prev button
    _onPrev = () => {
        this.setState({
            prevCheck: false,
            nextPrevLoadCheck: true
        })
        this._onDrawerSubItemSelect(this.state.drawerItems[this.state.selectDrawerSubItemIndex].drawerItemValue, this.state.selectDrowerItemIndex > 0 ? this.state.selectDrowerItemIndex - 1 : 0);
        this.setState({ nextPrevLoadCheck: false })
    }

    // for logout section
    _onLogoutModal = () => {
        this.setState({
            logoutModal: !this.state.logoutModal
        })
    }

    // for logout api call
    _onLogout = async () => {
        this.setState({ logOutLoader: true });
        let responseData = await MiddlewareCheck("logout", {});
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            await StorageDataModification.removeLoginData();
            await StorageDataModification.removeAllStorageData();
            // await multipleRemove(["auth", "userCredential", "headerData", ...StoreDataToStorage.allStorageVariable]);
            this.props.dispatch({ type: "SET_USER_INFORMATION", payload: {} });
            this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LogIn' }] }));
        } else {
            Toaster.ShortCenterToaster(responseData.message);
        }
        this.setState({ logOutLoader: false, logoutModal: false });
    }


    render() {
        let marginBottom = 9;
        if (Dimension.height > 840) {
            marginBottom = 10;
        }

        if (this.state.pageLoader == true) {
            return null;
        } else {
            return (
                // <View style={{ flex: 1, backgroundColor: '#1974FF', height: Dimension.height }}>
                // <View>
                <DrawerContentScrollView
                    {...this.props}
                    contentContainerStyle={{ backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: Dimension.height }}>
                    <LogOutModal
                        isVisible={this.state.logoutModal}
                        isLoading={this.state.logOutLoader}
                        onCloseModal={() => this._onLogoutModal()}
                        onLogout={() => this._onLogout()}
                    />
                    <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginHorizontal: '5%' }}>
                        <View style={{ borderRadius: 100, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={ImageName.CHALO_BACHO_LOGO} style={{ height: 40, width: 40, resizeMode: "contain", borderRadius: 100 }} />
                            {/* <Text style={{ fontFamily: FontFamily.FONTS.INTER.BOLD, color: "#1974FF", fontSize: FontSize.MD, padding: 10 }}>CB</Text> */}
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1, marginHorizontal: '5%' }}>
                            <Text style={{ fontFamily: FontFamily.FONTS.INTER.BOLD, color: "#FFF", fontSize: FontSize.MD }}>Chalo Becho</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                            <TouchableOpacity style={{ height: 23, width: 23, borderRadius: 100, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._onLogoutModal()} activeOpacity={0.7}>
                                <Image source={ImageName.LOGOUT_BLUE} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                            <View style={{ width: '15%' }} />
                            <TouchableOpacity style={{ height: 23, width: 23, borderRadius: 100, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.closeDrawer()} activeOpacity={0.7}>
                                <Image source={ImageName.BLUE_COLOR_CROSS} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: '5%' }}>
                        <View style={{ width: '78%' }}>
                            {this.state.selectDrawerItem.map((item, key) => (
                                <View style={{ flexDirection: 'row' }} key={key}>
                                    {item.isHidden ?
                                        null
                                        :
                                        <>
                                            <TouchableOpacity style={[styles.drawerImg, key == 0 ? { borderTopRightRadius: 10 } : key == this.state.selectDrawerItem.length - 1 ? { borderBottomRightRadius: 10 } : {}]} onPress={() => this._onSelectItem(item.routeName)}>
                                                <Image source={{ uri: item.icon }} style={styles.imgView} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.textView} onPress={() => this._onSelectItem(item.routeName)}>
                                                <Text style={styles.text}>{item.name}</Text>
                                            </TouchableOpacity>
                                        </>
                                    }

                                </View>
                            ))}
                        </View>
                        {/* <View style={{ backgroundColor: '#FEE142', width: '15%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                    {this.state.selectDrawerItem.map((item, key) => (
                        <TouchableOpacity style={[styles.drawerImgView, { marginBottom: marginBottom, marginTop: marginBottom }]} onPress={() => this._onSelectItem(item.routeName)} key={key}>
                            <Image source={{ uri: item.icon }} style={styles.imgView} />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ width: '63%', paddingLeft: '5%' }}>
                    {this.state.selectDrawerItem.map((item, key) => (
                        <TouchableOpacity style={[styles.textView, { marginBottom: marginBottom, marginTop: marginBottom }]} onPress={() => this._onSelectItem(item.routeName)} key={key}>
                            <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View> */}
                        {/* backgroundColor: '#5499FD' */}
                        <View style={{ backgroundColor: Color.COLOR.BLUE.EBONY_CLAY, width: '15%', borderBottomLeftRadius: 20, borderTopLeftRadius: 20, marginVertical: '20%', left: 8, paddingVertical: '2%' }}>
                            {this.state.drawerItems.map((item, key) => (
                                <React.Fragment key={key}>
                                    {item.isHidden ?
                                        null
                                        :
                                        <TouchableOpacity style={[styles.drawerImgView, item.check ? { borderLeftColor: Color.COLOR.RED.AMARANTH, borderLeftWidth: 2, right: 3 } : {}]} key={key} onPress={() => this._onModifyTypeData(key)}>
                                            <Text style={item.check ? [styles.text, { color: Color.COLOR.RED.AMARANTH }] : [styles.textType, { color: Color.COLOR.WHITE.PURE_WHITE }]}>{item.name}</Text>
                                        </TouchableOpacity>
                                    }

                                </React.Fragment>

                            ))}
                        </View>
                        {/* <View style={{ backgroundColor: '#FEE142', width: '15%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                            {this.state.selectDrawerItem.map((item, key) => (
                                <TouchableOpacity style={[styles.drawerImgView, { marginBottom: marginBottom, marginTop: marginBottom }]} onPress={() => this._onSelectItem(item.routeName)} key={key}>
                                    <Image source={{ uri: item.icon }} style={styles.imgView} />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={{ width: '63%', paddingLeft: '5%' }}>
                            {this.state.selectDrawerItem.map((item, key) => (
                                <TouchableOpacity style={[styles.textView, { marginBottom: marginBottom, marginTop: marginBottom }]} onPress={() => this._onSelectItem(item.routeName)} key={key}>
                                    <Text style={styles.text}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={{ backgroundColor: '#5499FD', width: '15%', borderBottomLeftRadius: 20, borderTopLeftRadius: 20, marginVertical: '20%', left: 8, paddingVertical: '2%' }}>
                            {this.state.drawerItems.map((item, key) => (
                                <TouchableOpacity style={[styles.drawerImgView, item.check ? { borderLeftColor: '#fff', borderLeftWidth: 2, right: 3 } : {}]} key={key} onPress={() => this._onModifyTypeData(key)}>
                                    <Text style={item.check ? styles.text : styles.textType}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View> */}
                        <View style={{ backgroundColor: Color.COLOR.BLUE.EBONY_CLAY, width: '7%', borderBottomLeftRadius: 150, borderTopLeftRadius: 150, marginVertical: '5%', left: 8 }} />
                        {/* <View style={{ width: '8%' }}>
                            <Image source={ImageName.DASHBOARD_SIDE} style={{ resizeMode: 'stretch', borderBottomLeftRadius: 150, borderTopLeftRadius: 150 }} />
                        </View> */}
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 10, right: 0, left: 0, position: 'absolute' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '2%' }}>
                            <Text style={{ fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.XS }}>V {AppInfo.getCurrentAppVersion()}</Text>
                        </View>
                        {this.state.drawerItems[this.state.selectDrawerSubItemIndex].drawerItemValue.length == 0 || this.state.drawerItems[this.state.selectDrawerSubItemIndex].drawerItemValue.length == 1 ?
                            null :
                            <TouchableOpacity onPress={() => this._onNext()} activeOpacity={0.9}>
                                <LottyViewLoad type={"rightYellowArrow"} isHidden={this.state.nextPrevHideCheck} height={40} width={40} />
                            </TouchableOpacity>
                        }
                    </View>
                    {/* <View style={{ flex: 1, paddingTop: 10 }}>
                        <DrawerItemList {...this.props} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100, flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => this._onShareApp()}
                            activeOpacity={0.9}
                            style={{ marginRight: 20 }}
                        >
                            <Image source={ImageName.SHARE_APP_LOGO} style={{ height: 25, width: 25, resizeMode: "contain" }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("LogoutAndImageUpload")
                            }}
                            activeOpacity={0.9}
                            style={{ marginLeft: 20 }}
                        >
                            <Image source={ImageName.SHUT_DOWN} style={{ height: 35, width: 35, resizeMode: "contain" }} />
                        </TouchableOpacity>
                    </View> */}
                </DrawerContentScrollView>
                // </View>
            )
        }
    }
}

function DrawerNav() {
    const reduxData = useSelector(state => state);
    const dispatch = useDispatch();
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <DrawerContent {...props} {...reduxData} dispatch={dispatch} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#002955',
                // drawerInactiveBackgroundColor: '#014a8b',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#fff',
                swipeEnabled: false,
                drawerLabelStyle: {
                    marginLeft: -20,
                    fontFamily: FontFamily.FONTS.INTER.BOLD,
                    fontSize: 15,
                },
                drawerStyle: {
                    width: Dimension.width
                }
            }}>
            <Drawer.Screen
                name="Home"
                component={MainBottomTab}
                options={{
                    headerShown: false,
                    drawerLabel: "Home",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.MENU_SQUARED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="Menu"
                component={MenuTab}
                options={{
                    headerShown: false,
                    drawerLabel: "Menu",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.MENU_SQUARED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="Reminder"
                component={ReminderTab}
                options={{
                    headerShown: false,
                    drawerLabel: "Reminder",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.MENU_SQUARED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="Notification"
                component={NotificationTab}
                options={{
                    headerShown: false,
                    drawerLabel: "Notification",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.MENU_SQUARED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="PjpVisit"
                component={PjpVisitTab}
                options={{
                    headerShown: false,
                    drawerLabel: "PjpVisit",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.MENU_SQUARED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
           
            <Drawer.Screen
                name="VisitHistory"
                component={VisitHistoryTab}
                options={{
                    headerShown: false,
                    // swipeEnabled: false,
                    drawerLabel: "VisitHistory",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.MENU_SQUARED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="UnplanVisitList"
                component={UnplanVisitTab}
                options={{
                    headerShown: false,
                    drawerLabel: "UnplanVisitList",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.MENU_SQUARED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="CreatePjp"
                component={CreatePjpTab}
                options={{
                    headerShown: false,
                    drawerLabel: "CreatePjp",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.MENU_SQUARED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />

            {/* <Drawer.Screen
                name="UnplanVisitForm"
                component={UnplanVisitFromTab}
                options={{
                    headerShown: false,
                    drawerLabel: "UnplanVisitForm",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.MENU_SQUARED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            /> */}

            <Drawer.Screen
                name="RouteVisit"
                component={RouteVisitTab}
                options={{
                    headerShown: false,
                    drawerLabel: "RouteVisit",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.MENU_SQUARED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />

            <Drawer.Screen
                name="LeaveRequest"
                component={LeaveRequestTab}
                options={{
                    headerShown: false,
                    drawerLabel: "LeaveRequest",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.MENU_SQUARED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />







{/*         
            <Drawer.Screen
                name="LeadsList"
                component={LeadsList}
                options={{
                    headerShown: false,
                    drawerLabel: "Leads",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.PLANNER} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="OpportunityList"
                component={OpportunityList}
                options={{
                    headerShown: false,
                    drawerLabel: "Opportunity",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.COINS} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="EnquiryList"
                component={EnquiryList}
                options={{
                    headerShown: false,
                    drawerLabel: "Enquiry",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.COINS} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            /> */}
          
          
            <Drawer.Screen
                name="OrderDashboard"
                component={OrderDashboard}
                options={{
                    headerShown: false,
                    drawerLabel: "Book Order",
                }}
            />

            <Drawer.Screen
                name='MyActivity'
                component={MyActivityTab}
                options={{
                    headerShown: false,
                    drawerLabel: "MyActivity",
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNav;