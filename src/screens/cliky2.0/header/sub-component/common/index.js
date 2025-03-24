
import React from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userAttendanceData } from "../../../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Color, ImageName } from "../../../../../enums";
import { DateConvert, StorageDataModification, Toaster } from "../../../../../services/common-view-function";
import { App_uri } from "../../../../../services/config";
import { ErrorCode } from "../../../../../services/constant";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../../services/middleware";
import styles from "./style";
import { getModData, modifyAttendanceData } from "./function";
import { AttendanceModal } from "../../../../../pageShared";
import { UserAccessPermission } from "../../../../../services/userPermissions";

class Common extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerText: "",
            isVisibleModal: false,
            isSuccessAttendance: false,
            pageLoader: false,
            attendanceLoader: false,
            attendanceSuccessLoader: false,
            isAttendancePermission: true,

            attendanceDropDownArr: [],
            attendanceDropDownObj: {},
            showDropDown: false,
            logoutModal: false,
            logOutLoader: false,
            userGeneralData: {},
            isAttendanceModal: false,
            userData: {},
            permissionData: {
                attendance: {}
            },
            userInfo: {},

            // attendanceModalViewLoader: Object.keys(this.props.Sales360Redux.userInfo).length > 0 ? false : true

            attendanceModalViewLoader: false

        }
    }

    componentDidMount = async () => {
        this.state.userInfo = await StorageDataModification.userCredential({}, "get");
        this.state.permissionData.attendance = await UserAccessPermission.ATTENDANCE.attendancePermission(this.props)
        this.setState(this.state)
        await this._load();
    }

    // componentWillUnmount() {
    //     this.setState = (state, callback) => {
    //         return;
    //     };
    // }


    _load = async () => {
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

    onRefeshScreen = async () => {
        // await this._getUserInfoFromApi();
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

    // for header name set
    setHeaderText = () => {
        let headerText = "";
        if (this.props.route) {
            if (this.props.route.name == "Dashboard") {
                headerText = "Dashboard";
            } else if (this.props.route.name == "TaskList") {
                headerText = "Task Management";
            } else if (this.props.route.name == "ContactListPage") {
                headerText = "Contact Management";
            } else if (this.props.route.name == "OrganizationList") {
                headerText = "Organizations";
            } else if (this.props.route.name == "LeadsList") {
                headerText = "Leads Management";
            } else if (this.props.route.name == "OpportunityList") {
                headerText = "Opportunity";
            } else if (this.props.route.name == "EnquiryList") {
                headerText = "Enquiry";
            } else if (this.props.route.name == "MyActivity") {
                headerText = "My Activity";
            } else if (this.props.route.name == "MmsEventList") {
                headerText = "Meetings";
            }
        }
        return headerText;
    }

    _onAttendanceModal = () => {
        this.setState({
            isAttendanceModal: !this.state.isAttendanceModal
        })
    }
    modalSec = () => {
        return (
            <>
                {this.state.attendanceModalViewLoader ?
                    null :
                    <AttendanceModal
                        props={this.props}
                        isVisible={this.state.isAttendanceModal}
                        onRefresh={() => this.onRefeshScreen()}
                        onCloseModal={() => this._onAttendanceModal()}
                        isLoading={this.state.attendanceLoader}
                    />
                }
            </>

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

        // let userImg = this.state.userInfo == undefined || this.state.userInfo == null || (Object.keys(this.state.userInfo).length) == 0 ? ImageName.PROFILE_GRAY : App_uri.IMAGE_URI + this.state.userInfo.profileImgUrl;
        let userImg = ImageName.PROFILE_GRAY;
        // let name = "";
        if (this.props.Sales360Redux.userInfo == null || this.props.Sales360Redux.userInfo == undefined) {
            userImg = ImageName.PROFILE_GRAY;
            profileCheck = false
        } else {
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
        }

        let clientLogo = ImageName.BACK_IMG;
        if (this.props.Sales360Redux.loginData == undefined || this.props.Sales360Redux.loginData == null || Object.keys(this.props.Sales360Redux.loginData).length == 0) {
            clientLogo = this.state.userInfo.clientLogo
        } else {
            clientLogo = this.props.Sales360Redux.loginData.clientLogo
        }
        return (
            <View style={styles.headerContainer}>
                {this.modalSec()}
                <>
                    <View style={styles.gamificationMainView}>
                        <View
                            style={styles.drawerIconSection}
                            activeOpacity={0.9}
                            onPress={() => this._onToggleDrawer()}>
                            <Image source={{ uri: App_uri.AWS_S3_IMAGE_VIEW_URI + clientLogo }} style={styles.gamificationDrawerIcon} />
                        </View>
                        <TouchableOpacity style={[styles.gamificationProfileImgView, profileCheck ? {} : { borderWidth: 1, borderColor: Color.COLOR.GRAY.GRAY_COLOR, }, { marginLeft: 10 }]} activeOpacity={0.8}
                            onPress={this._onProfile}>
                            <Image source={{ uri: profileCheck ? App_uri.AWS_S3_IMAGE_VIEW_URI + userImg : userImg }} style={styles.gamificationProfileImg} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                        {this.state.permissionData.attendance.viewPem ?
                            <TouchableOpacity onPress={() => this._onAttendanceModal()} activeOpacity={0.9} disabled={this.props.Sales360Redux.attendanceData.isAttendance == 2 ? true : false}>
                                <Image source={this.props.Sales360Redux.attendanceData.isAttendance == 0 || this.props.Sales360Redux.attendanceData.isAttendance == 2 ? ImageName.RED_KEY_ICON : ImageName.GREEN_KEY_ICON} style={styles.bellImg} />
                            </TouchableOpacity>
                            :
                            null
                        }
                    </View>
                </>
            </View>
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
        userAttendanceData,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Common);