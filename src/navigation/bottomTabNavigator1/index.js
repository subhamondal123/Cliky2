import * as React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Color } from '../../enums';
import SvgComponent from '../../assets/svg';
import {
    selectUnselectFevouritImage,
    selectUnselectFevouritView,
    selectUnselectTabView
} from './function';
import {
    DrawerMenu,
    Home,
    Leave,
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
    MyActivity
} from '../../screens/cliky2.0';


const Tab = createBottomTabNavigator();


// for main bottom tab navigation
class MainBottomTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
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
                            if (this.state.fevMenuShowCheck) {
                                navigation.goBack();
                            }
                            this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: -6 }}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={50}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : "appLogo"} />
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


// for menu tab navigation
class MenuTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
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
                            if (this.state.fevMenuShowCheck) {
                                navigation.goBack();
                            }
                            this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: -6 }}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={50}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : "appLogo"} />
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


// for reminder tab navigation
class ReminderTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
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
                            if (this.state.fevMenuShowCheck) {
                                navigation.goBack();
                            }
                            this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: -6 }}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={50}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : "appLogo"} />
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



// for notification tab navigation
class NotificationTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
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
                            if (this.state.fevMenuShowCheck) {
                                navigation.goBack();
                            }
                            this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: -6 }}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={50}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : "appLogo"} />
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

// for Pjp And Visit page
class PjpVisitTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
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
                <Tab.Screen name="PjpVisitTab" component={PjpVisit}
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
                            if (this.state.fevMenuShowCheck) {
                                navigation.goBack();
                            }
                            this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: -6 }}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={50}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : "appLogo"} />
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


// for Visit History page
class VisitHistoryTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
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
                            if (this.state.fevMenuShowCheck) {
                                navigation.goBack();
                            }
                            this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: -6 }}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={50}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : "appLogo"} />
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


// for UnplanVisit page
class UnplanVisitTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="UnplanVisit"
                screenOptions={{
                    tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
                    activeTintColor: 'rgb(29,128,226)',
                    tabBarInactiveTintColor: 'rgb(146,146,146)',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen name="UnplanVisit" component={UnplanVisitList}
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
                            if (this.state.fevMenuShowCheck) {
                                navigation.goBack();
                            }
                            this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: -6 }}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={50}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : "appLogo"} />
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

// for CreatePJP page
class CreatePjpTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
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
                            if (this.state.fevMenuShowCheck) {
                                navigation.goBack();
                            }
                            this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: -6 }}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={50}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : "appLogo"} />
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

// for Unplan Visit from page
// class UnplanVisitFromTab extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             fevMenuShowCheck: false
//         }
//     }
//     render() {
//         return (
//             <Tab.Navigator
//                 initialRouteName="UnplanVisitForm"
//                 screenOptions={{
//                     tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
//                     activeTintColor: 'rgb(29,128,226)',
//                     tabBarInactiveTintColor: 'rgb(146,146,146)',
//                     tabBarHideOnKeyboard: true,
//                     tabBarShowLabel: false
//                 }}
//             >
//                 <Tab.Screen name="UnplanVisitForm" component={UnplanVisitFrom}
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


// for Route visit from page
class RouteVisitTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
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
                            if (this.state.fevMenuShowCheck) {
                                navigation.goBack();
                            }
                            this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: -6 }}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={50}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : "appLogo"} />
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

// for leave request from page
class LeaveRequestTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
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
                            if (this.state.fevMenuShowCheck) {
                                navigation.goBack();
                            }
                            this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: -6 }}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={50}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : "appLogo"} />
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


// // for leave request from page
// class LeaveHistoryTab extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             fevMenuShowCheck: false
//         }
//     }
//     render() {
//         return (
//             <Tab.Navigator
//                 initialRouteName="LeaveHistory"
//                 screenOptions={{
//                     tabBarStyle: { backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 60 },
//                     activeTintColor: 'rgb(29,128,226)',
//                     tabBarInactiveTintColor: 'rgb(146,146,146)',
//                     tabBarHideOnKeyboard: true,
//                     tabBarShowLabel: false
//                 }}
//             >
//                 <Tab.Screen name="LeaveHistory" component={LeaveHistory}
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


// for My Activity from page
class MyActivityTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fevMenuShowCheck: false
        }
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
                            if (this.state.fevMenuShowCheck) {
                                navigation.goBack();
                            }
                            this.setState({ fevMenuShowCheck: !this.state.fevMenuShowCheck });
                        }
                    })}
                    options={{
                        headerShown: false,
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: -6 }}>
                                <SvgComponent svgName={"footerCurve"} width={150} height={50}>
                                    <View activeOpacity={1} style={selectUnselectFevouritView(focused)}>
                                        <SvgComponent strokeColor={"#FF686A"} height={50} width={50} svgName={focused ? "cross" : "appLogo"} />
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


export {
    MainBottomTab,
    MenuTab,
    ReminderTab,
    NotificationTab,
    // LeaveTab,
    PjpVisitTab,
    VisitHistoryTab,
    UnplanVisitTab,
    CreatePjpTab,
    // UnplanVisitFromTab,
    RouteVisitTab,
    LeaveRequestTab,
    // LeaveHistoryTab,
    MyActivityTab
};