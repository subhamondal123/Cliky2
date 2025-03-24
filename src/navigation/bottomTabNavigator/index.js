import * as React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Color, FontFamily, ImageName } from '../../enums';
import SvgComponent from '../../assets/svg';
import {
    stateCheckForNetwork,
    stateUserInformation,
    stateAllCountries,
    stateCartData,
    stateDayActivitySelectionData,
    userSelectedBeatRouteData,
    storeNotificationCountData
} from '../../redux/Sales360Action';
import {
    getNotificationCount,
    selectUnselectFevouritImage,
    selectUnselectFevouritView,
    selectUnselectTabView,
    setNotificationCount
} from './function';
import {
    DrawerMenu,
    Home,
    PjpVisit,
    Notification,
    VisitHistory,
    FavoriteMenu,
    UnplanVisitList,
    Reminder,
    CreatePjp,
    UnplanVisitFrom,
    RouteVisit,
    LeaveHistory,
    LeaveRequest,
    MyActivity,
    OrderDashboard,
    ProfilePage,
    StockUpdatePage
} from '../../screens/cliky2.0';
import { CLIKY_2, MyCalendar } from '../../screens';
import { ActivityScreen, Catalogue, CatalogueItemDetails, LmsDashboard, SchemeCatalogue, SchemePage } from '../../screens/cliky2.0/lms';
import { Text } from 'react-native';
import PassbookAmdRedemption from '../../screens/cliky2.0/lms/passbookAndRedemption/PassbookAmdRedemption';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { MerchandisingPage, OutletDetail, OutletLogInPage, StockUpdateEditDeleteList } from '../../screens/cliky2.0/modernTrade';
import styles from './style';
import { StorageDataModification } from '../../services/common-view-function';
import { App_uri } from '../../services/config';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';


const Tab = createBottomTabNavigator();

// for main bottom tab navigation
class MainBottomTabScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            loader: false,
            notificationCount: 0
        }
    }

    componentDidMount = async () => {
        console.log("--MainBottomTabScreen---")
        this.setNotificationCount();
        let userDataa = await StorageDataModification.userCredential({}, "get");
        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }

    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}

            >

                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                            //   e.preventDefault(); // Prevents the default behavior (navigating to the tab's screen)
                            // Perform your custom action here
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.setNotificationCount();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen

                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.props.Sales360Redux.attendanceData.isAttendance == 0) {
                            //     Toaster.ShortCenterToaster("Please mark your Attendance !");
                            //     e.preventDefault();
                            // } else if (this.props.Sales360Redux.attendanceData.isAttendance == 2) {
                            //     Toaster.ShortCenterToaster("You have mark your Attendance Out for the day !")
                            e.preventDefault();
                            // } else {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            // }
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        {/* <Image source={{ uri: App_uri.AWS_S3_IMAGE_VIEW_URI + this.state.clientLogo }} style={{ height: 50, width: 50, resizeMode: "contain" }} /> */}

                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.setNotificationCount();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.props.Sales360Redux.attendanceData.isAttendance == 0) {
                            //     Toaster.ShortCenterToaster("Please mark your Attendance !");
                            //     e.preventDefault();
                            // } else if (this.props.Sales360Redux.attendanceData.isAttendance == 2) {
                            //     Toaster.ShortCenterToaster("You have mark your Attendance Out for the day !")
                            //     e.preventDefault();
                            // } else {
                            // }
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}

                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}


// for menu tab navigation
class MenuTabScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            loader: false,
            notificationCount: 0
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        console.log("notificationCount--MenuTabScreen----")

        this.setState({ notificationCount: notificationCount })
        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }

    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="Menu"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}

            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                            //   e.preventDefault(); // Prevents the default behavior (navigating to the tab's screen)
                            // Perform your custom action here
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            e.preventDefault();
                            navigation.dispatch(DrawerActions.toggleDrawer());
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                            //   e.preventDefault(); // Prevents the default behavior (navigating to the tab's screen)
                            // Perform your custom action here
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}


// for reminder tab navigation
class ReminderTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false,
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");

        this.setState({ notificationCount: notificationCount })
        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="Reminder"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}

            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.handleNotificationClick();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}



// for notification tab navigation
class NotificationTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            loader: false,
            notificationCount: 0
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        let notificationCount = await StorageDataModification.storeNotificationCountData({}, 'get')
        console.log("notificationCount--NotificationTab----", notificationCount)
        this.setState({ notificationCount: notificationCount })

        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="Notification"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}

            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.setNotificationCount();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.setNotificationCount();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.setNotificationCount();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

// for Pjp And Visit page
class PjpVisitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            loader: false,
            notificationCount: 0
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        console.log("notificationCount--PjpVisitTab----")

        this.setState({ notificationCount: notificationCount })
        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }

    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="PjpVisitTab"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen
                    name="PjpVisitTab"
                    component={PjpVisit}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}


// for Visit History page
class VisitHistoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            loader: false,
            notificationCount: 0
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        console.log("notificationCount--VisitHistoryTab----")
        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }

    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="VisitHistory"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="VisitHistory" component={VisitHistory}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}
//for My Calender page
class MyCalenderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            loader: false,
            notificationCount: 0
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        console.log("notificationCount--MyCalenderTab----")
        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="MyCalendar"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="MyCalendar" component={MyCalendar}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

// for UnplanVisit page
// class UnplanVisitTab extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             fevMenuShowCheck: false
//         }
//     }
//     render() {
//         return (
//             <Tab.Navigator
//                 initialRouteName="UnplanVisit"
//                 screenOptions={{
//                     tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
//                     activeTintColor: 'rgb(29,128,226)',
//                     tabBarInactiveTintColor: 'rgb(146,146,146)',
//                     tabBarHideOnKeyboard: true,
//                     tabBarShowLabel: false
//                 }}
//             >
//                 <Tab.Screen name="UnplanVisit" component={UnplanVisitList}
//                     // listeners={{
//                     //     tabPress: e => { GetFooterData() },
//                     // }}
//                     options={{
//                         headerShown: false,
//                         tabBarButton: () => null
//                     }} />
//                 <Tab.Screen
//                     name="Home"
//                     component={Home}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"home"} />
//                             </View>
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="Menu"
//                     component={DrawerMenu}
//                     // listeners={({ navigation }) => ({
//                     //     tabPress: e => {
//                     //         e.preventDefault();
//                     //         navigation.dispatch(DrawerActions.toggleDrawer());
//                     //     }
//                     // })}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"menu"} />
//                             </View>
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="FavoriteMenu"
//                     component={FavoriteMenu}
//                     listeners={({ navigation }) => ({
//                         tabPress: e => {
//                             if (this.state.fevMenuShowCheck) {
//                                 navigation.goBack();
//                             }
//                             this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
//                         }
//                     })}
//                     options={{
//                         headerShown: false,
//                         tabBarLabel: '',
//                         tabBarIcon: ({ focused }) => (
//                             <View style={{ justifyContent: 'center', alignItems: 'center', top: -6 }}>
//                                 <SvgComponent svgName={"footerCurve"} width={150} height={50}>
//                                     <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
//                                         <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : "appLogo"} />
//                                     </View>
//                                 </SvgComponent>
//                             </View>
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="Reminder"
//                     component={Reminder}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"calender"} />
//                             </View>
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="Notification"
//                     component={Notification}
//                     options={{
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <View style={selectUnselectTabView(focused)}>
//                                 <SvgComponent svgName={"notification"} />
//                             </View>
//                         ),
//                     }}
//                 />
//             </Tab.Navigator>
//         );
//     }
// }

// for CreatePJP page
class CreatePjpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            loader: false,
            notificationCount: 0
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        console.log("notificationCount--CreatePjpTab----")
        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="CreatePjp"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="CreatePjp" component={CreatePjp}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

// for Unplan Visit from page
class UnplanVisitFromScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        let notificationCount = await StorageDataModification.storeNotificationCountData({}, 'get')
        console.log("notificationCount--UnplanVisitFromTab----", notificationCount)

        this.setState({ notificationCount: notificationCount })

        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="UnplanVisitForm"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="UnplanVisitForm"
                    children={() => <UnplanVisitFrom {...this.props} />}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}


// for Route visit from page
class RouteVisitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        let notificationCount = await StorageDataModification.storeNotificationCountData({}, 'get')
        console.log("notificationCount--RouteVisitTab----", notificationCount)

        this.setState({ notificationCount: notificationCount })
        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="RouteVisit"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="RouteVisit" component={RouteVisit}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.handleNotificationClick();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

// for leave request from page
class LeaveRequestScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        console.log("notificationCount--LeaveRequestTab----",)
        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="LeaveRequest"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="LeaveRequest" component={LeaveRequest}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.handleNotificationClick();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}


// // for leave request from page
class LeaveHistoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        console.log("notificationCount--LeaveHistoryTab----")

        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="LeaveHistory"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="LeaveHistory" component={LeaveHistory}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.handleNotificationClick();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}


// for My Activity from page
class MyActivityScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        console.log("notificationCount--MyActivityTab----")

        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="MyActivity"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="MyActivity" component={MyActivity}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.handleNotificationClick();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}


// for Order DashBoard  from page
class OrderDashBoardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        console.log("notificationCount--OrderDashBoardTab----")
        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="OrderDashboard"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="OrderDashboard" component={OrderDashboard}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.setNotificationCount();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.setNotificationCount();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.setNotificationCount();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.setNotificationCount();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}


// for Profile Page  from page
class ProfileTabScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        console.log("notificationCount--ProfileTabScreen----")

        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="ProfilePage"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="ProfilePage" component={ProfilePage}
                    // listeners={{
                    //     tabPress: e => { GetFooterData() },
                    // }}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.props.Sales360Redux.attendanceData.isAttendance == 0) {
                            //     Toaster.ShortCenterToaster("Please mark your Attendance !");
                            //     e.preventDefault();
                            // } else if (this.props.Sales360Redux.attendanceData.isAttendance == 2) {
                            //     Toaster.ShortCenterToaster("You have mark your Attendance Out for the day !")
                            //     e.preventDefault();
                            // } else {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            // }
                            e.preventDefault();
                        }
                    })}

                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

// lms

// for dashboard Page  from page
class LmsDashboardTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="LmsDashboard"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: 80, paddingTop: 10, paddingBottom: 10 },
                    // activeTintColor: 'rgb(29,128,226)',
                    // tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: true
                }}
            >
                {/* <Tab.Screen name="LmsDashboard" component={LmsDashboard}
                    // listeners={{
                    //     tabPress: e => { GetFooterData() },
                    // }}
                    options={{

                        headerShown: false,
                        tabBarButton: () => null
                    }} /> */}
                <Tab.Screen
                    name="LmsDashboard"
                    component={LmsDashboard}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"lmsHome"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Home
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="SchemePage"
                    component={SchemePage}
                    // listeners={({ navigation }) => ({
                    //     tabPress: e => {
                    //         e.preventDefault();
                    //         navigation.dispatch(DrawerActions.toggleDrawer());
                    //     }
                    // })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"fourDot"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Scheme
                            </Text>
                        ),
                    }}
                />

                <Tab.Screen
                    name="PassbookAndRedemption"
                    component={PassbookAmdRedemption}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"userWithPlus"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Reedem
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="ActivityScreen"
                    component={ActivityScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"plusWithCircle"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Add Activity
                            </Text>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}


// for catalogue Page  from page
class LmsCatalogueTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="Catalogue"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: 80, paddingTop: 10, paddingBottom: 10 },
                    // activeTintColor: 'rgb(29,128,226)',
                    // tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: true
                }}
            >
                <Tab.Screen name="Catalogue" component={Catalogue}
                    // listeners={{
                    //     tabPress: e => { GetFooterData() },
                    // }}
                    options={{

                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="LmsDashboard"
                    component={LmsDashboard}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"lmsHome"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Home
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="SchemePage"
                    component={SchemePage}
                    // listeners={({ navigation }) => ({
                    //     tabPress: e => {
                    //         e.preventDefault();
                    //         navigation.dispatch(DrawerActions.toggleDrawer());
                    //     }
                    // })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"fourDot"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Scheme
                            </Text>
                        ),
                    }}
                />

                <Tab.Screen
                    name="PassbookAndRedemption"
                    component={PassbookAmdRedemption}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"userWithPlus"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Reedem
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="ActivityScreen"
                    component={ActivityScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"plusWithCircle"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Add Activity
                            </Text>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

// for catalogue details page  from page
class LmsCatalogueDetailsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="CatalogueItemDetails"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: 80, paddingTop: 10, paddingBottom: 10 },
                    // activeTintColor: 'rgb(29,128,226)',
                    // tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: true
                }}
            >
                <Tab.Screen name="CatalogueItemDetails" component={CatalogueItemDetails}
                    // listeners={{
                    //     tabPress: e => { GetFooterData() },
                    // }}
                    options={{

                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="LmsDashboard"
                    component={LmsDashboard}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"lmsHome"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Home
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="SchemePage"
                    component={SchemePage}
                    // listeners={({ navigation }) => ({
                    //     tabPress: e => {
                    //         e.preventDefault();
                    //         navigation.dispatch(DrawerActions.toggleDrawer());
                    //     }
                    // })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"fourDot"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Scheme
                            </Text>
                        ),
                    }}
                />

                <Tab.Screen
                    name="PassbookAndRedemption"
                    component={PassbookAmdRedemption}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"userWithPlus"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Reedem
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="ActivityScreen"
                    component={ActivityScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"plusWithCircle"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Add Activity
                            </Text>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}



// for scheme catalogue Page  from page
class LmsSchemeCatalogueTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="SchemeCatalogue"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: 80, paddingTop: 10, paddingBottom: 10 },
                    // activeTintColor: 'rgb(29,128,226)',
                    // tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: true
                }}
            >
                <Tab.Screen name="SchemeCatalogue" component={SchemeCatalogue}
                    // listeners={{
                    //     tabPress: e => { GetFooterData() },
                    // }}
                    options={{

                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="LmsDashboard"
                    component={LmsDashboard}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"lmsHome"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Home
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="SchemePage"
                    component={SchemePage}
                    // listeners={({ navigation }) => ({
                    //     tabPress: e => {
                    //         e.preventDefault();
                    //         navigation.dispatch(DrawerActions.toggleDrawer());
                    //     }
                    // })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"fourDot"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Scheme
                            </Text>
                        ),
                    }}
                />

                <Tab.Screen
                    name="PassbookAndRedemption"
                    component={PassbookAmdRedemption}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"userWithPlus"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Reedem
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="ActivityScreen"
                    component={ActivityScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"plusWithCircle"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Add Activity
                            </Text>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

// for catalogue details page  from page
class LmsPassbookTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="PassbookAndRedemption"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: 80, paddingTop: 10, paddingBottom: 10 },
                    // activeTintColor: 'rgb(29,128,226)',
                    // tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: true
                }}
            >
                {/* <Tab.Screen name="PassbookAndRedemption" component={PassbookAmdRedemption}
                    // listeners={{
                    //     tabPress: e => { GetFooterData() },
                    // }}
                    options={{

                        headerShown: false,
                        tabBarButton: () => null
                    }} /> */}
                <Tab.Screen
                    name="LmsDashboard"
                    component={LmsDashboard}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"lmsHome"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Home
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="SchemePage"
                    component={SchemePage}
                    // listeners={({ navigation }) => ({
                    //     tabPress: e => {
                    //         e.preventDefault();
                    //         navigation.dispatch(DrawerActions.toggleDrawer());
                    //     }
                    // })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"fourDot"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Scheme
                            </Text>
                        ),
                    }}
                />

                <Tab.Screen
                    name="PassbookAndRedemption"
                    component={PassbookAmdRedemption}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"userWithPlus"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Reedem
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="ActivityScreen"
                    component={ActivityScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"plusWithCircle"} strokeColor={focused ? "#fff" : "#1F2B4D"} />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? "#1F2B4D" : "#3C3C3C", fontSize: 12, fontWeight: focused ? 'bold' : 'normal', fontFamily: FontFamily.FONTS.INTER.REGULAR }}>
                                Add Activity
                            </Text>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

// for stock update from page
class StockUpdateTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="StockUpdatePage"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="StockUpdatePage"
                    children={() => <StockUpdatePage {...this.props} />}
                    // listeners={{
                    //     tabPress: e => { GetFooterData() },
                    // }}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    // listeners={({ navigation }) => ({
                    //     tabPress: e => {
                    //         e.preventDefault();
                    //         navigation.dispatch(DrawerActions.toggleDrawer());
                    //     }
                    // })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}


//////////////////////////////////////MORDERN TRADE////////////////////////////////////////////////

class MTradeDashboardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        console.log("notificationCount--MTradeDashboardTab----")

        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }

    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="MTradeDashboard"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="MTradeDashboard"
                    // component={CLIKY_2.MORDERN_TRADE.Dashboard}
                    children={() => <CLIKY_2.MORDERN_TRADE.Dashboard {...this.props} />}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />

                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

class OutletDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        let notificationCount = await StorageDataModification.storeNotificationCountData({}, 'get')
        this.setState({ notificationCount: notificationCount })

        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="OutletDetail"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >

                <Tab.Screen name="OutletDetail"
                    children={() => <OutletDetail {...this.props} />}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen name="TradeDashboard" component={CLIKY_2.MORDERN_TRADE.OutletDetail}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />

                <Tab.Screen name="OrderDashboard" component={OrderDashboard}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}


// for stock update from page
class OutletLogInPageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");

        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="OutletLogInPage"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="OutletLogInPage"
                    // component={OutletLogInPage} {...this.props()}
                    children={() => <OutletLogInPage {...this.props} />}

                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator >
        );
    }
}



class StockUpdateEditDeleteScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        let notificationCount = await StorageDataModification.storeNotificationCountData({}, 'get')
        this.setState({ notificationCount: notificationCount })

        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="StockUpdateEditDelete"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >

                <Tab.Screen name="StockUpdateEditDelete"
                    children={() => <StockUpdateEditDeleteList {...this.props} />}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen name="TradeDashboard" component={CLIKY_2.MORDERN_TRADE.OutletDetail}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />

                <Tab.Screen name="OrderDashboard" component={OrderDashboard}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}


class MerchandisingPageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }

    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="MerchandisingPage"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="MerchandisingPage"
                    // component={MerchandisingPage}
                    children={() => <MerchandisingPage {...this.props} />}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}



class ManagerDashboardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false,
            userData: { clientId: 4 },
            notificationCount: 0,
            loader: false
        }
    }
    componentDidMount = async () => {
        let userDataa = await StorageDataModification.userCredential({}, "get");
        let notificationCount = await StorageDataModification.storeNotificationCountData({}, 'get')
        this.setState({ notificationCount: notificationCount })

        if (this.props.Sales360Redux == undefined || this.props.Sales360Redux == null || Object.keys(this.props.Sales360Redux).length == 0) {
            this.state.userData.clientId = userDataa.clientId
        } else {
            this.state.userData.clientId = this.props.Sales360Redux.loginData.clientId
        }
        this.setState({ userData: this.state.userData })
    }
    handleNotificationClick = async () => {
        this.setLoader(true)
        await StorageDataModification.storeNotificationCountData(0, 'store')
        this.props.storeNotificationCountData(0)
        this.setLoader(false)
    }

    setLoader = async (type) => {
        this.setState({ loader: type })
    }

    setNotificationCount = async () => {
        await this.setLoader(true)
        let count = 0;
        let notificationData = await MiddlewareCheck("getUnreadNotificationCount", {}, this.props);
        if (notificationData) {
            if (notificationData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                count = notificationData.response.unreadNotificationCount;
            }
        }
        this.props.storeNotificationCountData(count)
        await StorageDataModification.storeNotificationCountData(count, 'store');
        await this.setLoader(false)
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="ManagerDashboard"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="ManagerDashboard"
                    // component={MerchandisingPage}
                    children={() => <CLIKY_2.MANAGER.ManagerDashboard {...this.props} />}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }} />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"home"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={DrawerMenu}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"menu"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="FavoriteMenu"
                    component={FavoriteMenu}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            // if (this.state.fevMenuShowCheck) {
                            //     navigation.goBack();
                            // }
                            // this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                            e.preventDefault();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.favouriteMenuSec}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={40}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : this.state.userData.clientId == 19 ? "kalikaAppLogo" : "appLogo"} />
                                    </View>
                                </SvgComponent>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            this.setNotificationCount();
                        },
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"calender"} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            this.handleNotificationClick();
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={selectUnselectTabView(focused)}>
                                <SvgComponent svgName={"notification"} />
                                {this.state.loader ? null : <>
                                    {this.props.Sales360Redux.notificationCount > 0 ?
                                        <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "red", top: 5, right: 8, position: "absolute" }} />
                                        : null}
                                </>}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
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
        stateCartData,
        stateDayActivitySelectionData,
        userSelectedBeatRouteData,
        storeNotificationCountData
    }, dispatch)
);


// Connect home to Redux
const MainBottomTab = connect(mapStateToProps, mapDispatchToProps)(MainBottomTabScreen);

// Connect menu to Redux
const MenuTab = connect(mapStateToProps, mapDispatchToProps)(MenuTabScreen);

// Connect menu to Redux
const ProfileTab = connect(mapStateToProps, mapDispatchToProps)(ProfileTabScreen);

const RouteVisitTab = connect(mapStateToProps, mapDispatchToProps)(RouteVisitScreen);

const PjpVisitTab = connect(mapStateToProps, mapDispatchToProps)(PjpVisitScreen);

const VisitHistoryTab = connect(mapStateToProps, mapDispatchToProps)(VisitHistoryScreen);

const MyCalenderTab = connect(mapStateToProps, mapDispatchToProps)(MyCalenderScreen);

const CreatePjpTab = connect(mapStateToProps, mapDispatchToProps)(CreatePjpScreen);

const UnplanVisitFromTab = connect(mapStateToProps, mapDispatchToProps)(UnplanVisitFromScreen);

const LeaveRequestTab = connect(mapStateToProps, mapDispatchToProps)(LeaveRequestScreen);

const LeaveHistoryTab = connect(mapStateToProps, mapDispatchToProps)(LeaveHistoryScreen);

const MyActivityTab = connect(mapStateToProps, mapDispatchToProps)(MyActivityScreen);

const OrderDashBoardTab = connect(mapStateToProps, mapDispatchToProps)(OrderDashBoardScreen);

const MTradeDashboardTab = connect(mapStateToProps, mapDispatchToProps)(MTradeDashboardScreen);

const OutletDetailTab = connect(mapStateToProps, mapDispatchToProps)(OutletDetailScreen);

const OutletLogInPageTab = connect(mapStateToProps, mapDispatchToProps)(OutletLogInPageScreen);

const StockUpdateEditDeleteTab = connect(mapStateToProps, mapDispatchToProps)(StockUpdateEditDeleteScreen);

const MerchandisingPageTab = connect(mapStateToProps, mapDispatchToProps)(MerchandisingPageScreen);

const ManagerDashboardTab = connect(mapStateToProps, mapDispatchToProps)(ManagerDashboardScreen);




export {
    MainBottomTab,
    MenuTab,
    ReminderTab,
    NotificationTab,
    PjpVisitTab,
    VisitHistoryTab,
    MyCalenderTab,
    // UnplanVisitTab,
    CreatePjpTab,
    UnplanVisitFromTab,
    RouteVisitTab,
    LeaveRequestTab,
    LeaveHistoryTab,
    MyActivityTab,
    OrderDashBoardTab,
    ProfileTab,
    LmsCatalogueTab,
    LmsCatalogueDetailsTab,
    LmsDashboardTab,
    LmsSchemeCatalogueTab,
    LmsPassbookTab,
    StockUpdateTab,

    MTradeDashboardTab,
    OutletDetailTab,
    OutletLogInPageTab,
    StockUpdateEditDeleteTab,
    MerchandisingPageTab,

    ManagerDashboardTab
};