
import React from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Color, FontFamily, FontSize, ImageName } from "../../../../../enums";
import { DateConvert, StorageDataModification, Toaster } from "../../../../../services/common-view-function";
import { App_uri } from "../../../../../services/config";
import { ErrorCode } from "../../../../../services/constant";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../../services/middleware";
import { DropdownInputBox, LogOutModal, LottyViewLoad, Modal, NormalLoader } from "../../../../../shared";
import { CustomStyle } from "../../../../style";
import styles from "./style";
import { getModData, modifyAttendanceData } from "./function";
import { CommonActions } from "@react-navigation/native";

class ProfileWithPageName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerText: "",
            isVisibleModal: false,
            isSuccessAttendance: false,
            pageLoader: false,
            attendanceLoader: true,
            attendanceSuccessLoader: false,
            isAttendancePermission: true,

            attendanceDropDownArr: [],
            attendanceDropDownObj: {},
            showDropDown: false,
            logoutModal: false,
            logOutLoader: false,
            userData: {},
        }
    }

    componentDidMount() {
        this._load();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }


    _load = async () => {
        let moduleSettingsData = await StorageDataModification.userModuleSettingsData({}, "get");
        // this.onCheckPermission(moduleSettingsData);
        let userMainData = await StorageDataModification.userCredential({}, "get");

        this.setState({ userData: userMainData })
        await StoreUserOtherInformations("", {}, this.props);
    }

    onCheckPermission = async (moduleSettingsData) => {
        let attendancePermission = false;
        if (moduleSettingsData.sfa_attendanceAddPem == "1") {
            attendancePermission = true;
        } else {
            attendancePermission = false;
        }
        this.setState({
            isAttendancePermission: attendancePermission
        })
    }

    // for network errror
    _onNetworkError = async () => {
        let headerData = await StorageDataModification.headerData({}, "get")
        if (headerData !== null || headerData !== undefined) {
            this.setState({ pageLoader: true });
            this.props.stateUserInformation(headerData);
            this.setState({ pageLoader: false });
        }
    }

    _onProfile = () => {
        this.props.navigation.navigate("ProfilePage")
    }


    _onToggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    }

    _onVisibleModal = () => {
        this.state.isVisibleModal = !this.state.isVisibleModal
        this.setState({
            isVisibleModal: this.state.isVisibleModal
        });

        this.onDropDown()
    };
    _onCloseVisibleModal = () => {
        this.setState({
            isVisibleModal: false
        })
    }

    // for notification page
    _onNotification = () => {
        this.props.navigation.navigate("Notification");
    }

    // .....for open success modal of attendance,,,,,,,,,
    _onAddAttendance = async () => {
        let reqData = { time: DateConvert.fullDateFormat(new Date()), "address": null, activityId: this.state.attendanceDropDownObj.id };
        this.setState({ attendanceLoader: true });
        let responseData = await MiddlewareCheck("addAttendance", reqData, this.props)
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                Toaster.ShortCenterToaster(responseData.data.message);
                this.setState({ attendanceSuccessLoader: true });
                this._onVisibleModal();
                // this._getUserInfoFromApi();
                this._onAttendanceVisible();
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ attendanceLoader: false });
    }

    onDropDown = async () => {
        let reqData = {}
        let responseData = await MiddlewareCheck("getDailyActivities", reqData);
        if (responseData === false) {
            this._onNetworkError();
        }
        else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    attendanceDropDownArr: modifyAttendanceData(responseData.response),
                    attendanceDropDownObj: responseData.response.length == 1 ? getModData(responseData.response[0]) : {},
                    showDropDown: responseData.response.length == 1 ? false : true
                })
            }
        }
    }

    _onAdd = async () => {
        if (this.state.attendanceDropDownArr.length == 1) {
            await this._onAddAttendance()
        } else {
            if ((this.state.attendanceDropDownObj.id == null || this.state.attendanceDropDownObj.id == undefined) && this.props.Sales360Redux.userInfo.isAttendence == 0) {
                Toaster.ShortCenterToaster("Please select Your actitivity for the day!")
            } else {
                await this._onAddAttendance()
            }
        }
    }

    _onSelectExpenceType = async (value) => {
        this.setState({

            attendanceDropDownObj: value
        })
    }

    // for visiblr attendance
    _onAttendanceVisible = () => {
        this.state.isSuccessAttendance = !this.state.isSuccessAttendance;
        this.setState({
            isSuccessAttendance: this.state.isSuccessAttendance
        })
    }

    // Ok for attendance completed view
    _onAttandenceComplete = () => {
        this.props.onRefresh();
        this._onAttendanceVisible()
    }


    modalAttendanceSection = () => {
        return (
            <Modal
                isVisible={this.state.isVisibleModal}
                onRequestClose={() => this._onCloseVisibleModal()}
                // for back drop close
                onBackdropPress={() => this._onCloseVisibleModal()}
                // for back button close
                onBackButtonPress={() => this._onCloseVisibleModal()}
                children={
                    <View style={styles.modalview}>
                        <View style={styles.modalMainView}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                            >
                                <View style={styles.crossCircelView}>
                                    <Image
                                        source={ImageName.ATTENDANCE_SHEET}
                                        style={styles.redCrossImage}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.attendanceHeader}>

                                <Text style={styles.attendanceHeaderText}>Today's Attendance</Text>
                            </View>
                            <View style={styles.underline} />

                            <View style={styles.attendanceBody}>
                                <Text style={styles.attendanceBodyText}>
                                    {this.props.Sales360Redux.userInfo.isAttendence == 0 ? "Do you want to mark your Attendance for Today ?" : this.props.Sales360Redux.userInfo.isAttendence == 1 ? "Do you want to logout for Today ?" : "Your Attendance for Today is completed."}
                                </Text>
                            </View>
                            {this.state.attendanceDropDownArr.length > 1 && this.props.Sales360Redux.userInfo.isAttendence == 0 ?
                                <View style={{ marginHorizontal: '5%', marginTop: 10, width: '100%' }}>
                                    <DropdownInputBox
                                        selectedValue={this.state.attendanceDropDownObj.id ? this.state.attendanceDropDownObj.id.toString() : "0"}
                                        data={this.state.attendanceDropDownArr}
                                        onSelect={(value) => this._onSelectExpenceType(value)}
                                        headerText={"Please Select"}
                                    />
                                </View>
                                :
                                null
                            }

                            {this.state.attendanceLoader ?
                                <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.CYAN_BLUE_AZURE} />
                                :
                                <React.Fragment>
                                    <View style={styles.attendanceButton}>
                                        <TouchableOpacity style={styles.noBtnMain} activeOpacity={0.9} onPress={() => this._onCloseVisibleModal()}>
                                            <Text style={styles.noBtn}>{this.props.Sales360Redux.userInfo.isAttendence == 2 ? "Thank You" : "No"}</Text>
                                        </TouchableOpacity>
                                        {this.props.Sales360Redux.userInfo.isAttendence == 2 ?
                                            null :
                                            <TouchableOpacity style={styles.yesBtnMain} activeOpacity={0.9} onPress={() => this._onAdd()}>
                                                <Text style={styles.yesBtn}>Yes</Text>
                                            </TouchableOpacity>
                                        }


                                    </View>


                                </React.Fragment>
                            }


                        </View>


                    </View>
                }
            />
        )
    }

    modalAttendanceSuccessSection = () => {
        return (
            <Modal
                isVisible={this.state.isSuccessAttendance}
                onRequestClose={() => this._onAttendanceVisible()}
                // for back drop close
                onBackdropPress={() => this._onAttendanceVisible()}
                // for back button close
                onBackButtonPress={() => this._onAttendanceVisible()}
                children={
                    <View style={styles.modalview}>
                        <View style={styles.attendanceSuccessBody}>
                            <View>
                                <Text style={styles.congratulationTxt}>Congratulations!</Text>
                            </View>
                            {this.state.attendanceSuccessLoader ?
                                <NormalLoader /> :
                                <React.Fragment>
                                    <View style={{ marginHorizontal: '5%' }}>
                                        <Text style={styles.congratulationFooterTxt}>{this.props.Sales360Redux.userInfo.isAttendence == 1 ? "Your Attendance is submitted Successfully" : "You have Successfully Logout"}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.yesBtnMainOk} activeOpacity={0.9} onPress={() => this._onAttandenceComplete()}>
                                        <Text style={styles.yesBtnok}>Ok</Text>
                                    </TouchableOpacity>
                                </React.Fragment>
                            }
                        </View>
                    </View>
                }
            />
        )
    }


    // for header name set
    setHeaderText = () => {
        let headerText = "";
        if (this.props.route) {
            if (this.props.route.name == "Dashboard") {
                headerText = "Dashboard";
            }
        }
        return headerText;
    }

    _onLogoutModal = () => {
        this.setState({
            logoutModal: !this.state.logoutModal
        })
    }
    modalSec = () => {
        // for logout api call
        const _onLogout = async () => {
            this.setState({ logOutLoader: true });
            let responseData = await MiddlewareCheck("logout", {});
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await StorageDataModification.removeLoginData();
                await StorageDataModification.removeAllStorageData();
                // await multipleRemove(["auth", "userCredential", "headerData", ...StoreDataToStorage.allStorageVariable]);
                // this.props.dispatch({ type: "SET_USER_INFORMATION", payload: {} });
                this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LogIn' }] }));
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
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

    render() {
        let headerNameViewCheck = true,
            fingerprintViewCheck = false,
            notificationViewCheck = false,
            profileCheck = false;
        // userImg = ImageName.PROFILE_GRAY;
        if (this.props.route.name == "SfaDashboard") {
            headerNameViewCheck = false;
            fingerprintViewCheck = true;
            notificationViewCheck = true;
        } else if (this.props.route.name == "CrmDashboard") {
            headerNameViewCheck = false;
            notificationViewCheck = true;
        } else if (this.props.route.name == "MmsDashboard") {
            headerNameViewCheck = false;
            notificationViewCheck = true;
        }

        let userImg = ImageName.PROFILE_GRAY;
        if (this.state.pageLoader == false) {
            if (Object.keys(this.props.Sales360Redux.userInfo).length > 0) {
                if (this.props.Sales360Redux.userInfo.details == undefined || this.props.Sales360Redux.userInfo.details == null || (Object.keys(this.props.Sales360Redux.userInfo.details).length) == 0) {
                } else {
                    if (this.props.Sales360Redux.userInfo.details.profileImgUrl == undefined || this.props.Sales360Redux.userInfo.details.profileImgUrl == null || this.props.Sales360Redux.userInfo.details.profileImgUrl.length == 0) {
                    } else {
                        userImg = this.props.Sales360Redux.userInfo.details.profileImgUrl;
                        profileCheck = true;
                    }
                }
            }
        }
        let headerText = this.setHeaderText();
        return (
            <View style={styles.headerContainer}>
                {this.modalSec()}
                <View style={styles.gamificationMainView}>
                    <View
                        style={styles.drawerIconSection}
                        activeOpacity={0.9}
                        onPress={() => this._onToggleDrawer()}>
                        <Image source={{ uri: App_uri.CRM_BASE_URI + this.state.userData.clientLogo }} style={styles.gamificationDrawerIcon} />
                    </View>
                    <TouchableOpacity style={[styles.gamificationProfileImgView, profileCheck ? {} : { borderWidth: 1, borderColor: Color.COLOR.GRAY.GRAY_COLOR, }, { marginLeft: 10 }]} activeOpacity={0.8}
                        onPress={this._onProfile}>
                        <Image source={{ uri: profileCheck ? App_uri.IMAGE_URI + userImg : userImg }} style={styles.gamificationProfileImg} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginHorizontal: 10 }} >
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, fontSize: FontSize.SM, textAlign: 'right' }}>{headerText}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default ProfileWithPageName;