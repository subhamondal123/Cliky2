import { CommonActions } from "@react-navigation/native";
import React from "react";
import {
    SafeAreaView,
    Image,
    View
} from "react-native";
import { connect } from "react-redux";
import { ImageName } from "../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData, userAttendanceData, storeNotificationCountData, mappedCountriesUserData, mappedHigherLevelProducts, loginData } from "../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { StorageDataModification, userWarning } from "../../../services/common-view-function";
import { modifyCountryArrData } from "./Function";
import { CreateSql } from "../../../services/sql";

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            authCheck: false,
            versionData: {},
            authorizationCheck: true,
            attendanceCheck: {}

        }
    }

    componentDidMount = async () => {
        await this._load();
    }

    _load = async () => {
        await CreateSql.createAllTable();
        let storeNotificationCountData = await StorageDataModification.storeNotificationCountData({}, "get");
        if (storeNotificationCountData) {
            this.props.storeNotificationCountData(storeNotificationCountData)
        }
        let routeData = await StorageDataModification.routeData({}, "get");
        if (routeData) {
            this.props.userSelectedBeatRouteData(routeData)
        }
        let headerData = await StorageDataModification.headerData({}, "get");
        if (headerData) {
            this.props.stateUserInformation(headerData);
        }
        let attendanceData = await StorageDataModification.attendanceData({}, "get");
        if (attendanceData) {
            this.props.userAttendanceData(attendanceData);
        } else {
            this.props.userAttendanceData({ isAttendance: 0, inLattitude: null, inLongitude: null, inTime: null, outLattitude: null, outLongitude: null, outTime: null });
        }
        let mappedLocationData = await StorageDataModification.mappedLocationData({}, "get");
        if (mappedLocationData) {
            this.props.mappedCountriesUserData(mappedLocationData);
        }
        let mappedHigherLevelProducts = await StorageDataModification.mappedHigherLevelProductData({}, "get");
        if (mappedHigherLevelProducts) {
            this.props.mappedHigherLevelProducts(mappedHigherLevelProducts);
        }
        let userCredentialData = await StorageDataModification.userCredential({}, "get");
        if (userCredentialData) {
            this.props.loginData(userCredentialData);
        }

        //.........
        this.setState({ authorizationCheck: await userWarning.actionUnauthorizedDeviceWarning(this.props) });
        if (await StorageDataModification.authData({}, "get")) {    //chcek if user is logIn or not
            this.setState({
                authCheck: true
            })
            this._onHideGoToNextPage()
        } else {
            this._onHideGoToNextPage()
        }
        let userCredential = await StorageDataModification.userCredential({}, "get");
        if (await StorageDataModification.userCredential({}, "get") == null) {

        } else {
            this.props.stateAllCountries(modifyCountryArrData(userCredential.mappedCountires))
        }
    }

    // for get the app version info
    // _onGetAppVersionInfo = async () => {
    //     let responseData = await MiddlewareOnlyApiCheck("getCurrentAppVersionInfo", { "packageName": AppInfo.getAppPackageName(), "appIndex": APP_INDEX });
    //     if (responseData === false) {
    //         // this._onNetworkError()
    //     } else {
    //         if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR && responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
    //             this.setState({ versionData: responseData.data })
    //         } else {
    //             Toaster.ShortCenterToaster(responseData.message)
    //         }
    //     }
    // }


    _onHideGoToNextPage = async () => {
        var that = this;
        that.myVar = setTimeout(function () {         // for splash screen hide and redirect to another page autometicaly
            that._Hide_Splash_Screen();
        }, 2000);
    }

    _Hide_Splash_Screen = async () => {

        // if (this.state.versionData.version !== AppInfo.getCurrentAppVersion()) {
        //     if (this.state.versionData.isUpdate == 2) {
        //         this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'NewVersionAvailable' }] }));
        //     } else {
        //         if (this.state.versionData.isUpdate == 1) {
        //             Toaster.LongCenterToaster("A new update is available. You can update the apk.");
        //         }
        //         this.setState({
        //             isVisible: false
        //         })
        //         if (this.state.authCheck) {
        //             this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'DrawerNav' }] }))
        //         } else {
        //             this._onWelcome();
        //         }
        //     }
        // } else {
        //     this.setState({
        //         isVisible: false
        //     })
        if (this.state.authCheck && this.state.authorizationCheck) {
            let userInfo = await StorageDataModification.headerData({}, "get");
            this.props.stateUserInformation(userInfo);
            this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'DrawerNav' }] }))
        } else {
            this._onWelcome();
        }
        // }
    }

    _onWelcome = () => {
        if (this.state.authorizationCheck) {
            this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LogIn' }] }));
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginBottom: 30 }}>
                    <Image source={ImageName.SPLASH_SCREEN_CLIKY_ICON_IMAGE} style={{ height: 180, width: 180, resizeMode: 'contain' }} />
                </View>
                <View style={{ marginTop: 30 }}>
                    <Image source={ImageName.SPLASH_SCREEN_CLIKY_LOGO_IMAGE} style={{ height: 50, width: 190, resizeMode: 'contain' }} />
                </View>
                {/* <Image source={ImageName.SPLASH_SCREEN_IMAGE} style={{ height: Dimension.height, width: Dimension.width, resizeMode: 'stretch' }} /> */}
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateAllCountries,
        stateCheckForNetwork,
        stateUserInformation,
        storeNotificationCountData,
        userSelectedBeatRouteData,
        userAttendanceData,
        mappedCountriesUserData,
        mappedHigherLevelProducts,
        loginData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);