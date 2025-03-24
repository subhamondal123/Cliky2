import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { stateCheckForNetwork, stateUserInformation, stateAllCountries, stateCartData, stateDayActivitySelectionData, userSelectedBeatRouteData, userAttendanceData } from '../../../../../redux/Sales360Action';
import SvgComponent from '../../../../../assets/svg';
import { Color, FontFamily, FontSize, ImageName } from '../../../../../enums';
import Header from '../../../header/Header';
import { ChangeRouteModal, CrmDashboardBarChart, CrmUserActivitySelectionSection, DayActivitySelectionSection, OdometerModal, OfficeActivityModal, OfflineCompletionProgress, OrderListWithNextPreview, ProgressCircularForHome, UserActivitySelectionSection } from '../../../../../pageShared';
import { CommonFunctions, OfflineFunction, StorageDataModification, Toaster } from '../../../../../services/common-view-function';
import { MiddlewareCheck, StoreUserOtherInformations } from '../../../../../services/middleware';
import { ErrorCode } from '../../../../../services/constant';
import { userInfoStore } from './function';
import { DeviceInfo } from '../../../../../services/config';



class CrmHome extends Component {
    constructor(props) {
        super(props);
        this.progessbarRef = React.createRef();
        this.activitySelectionRef = React.createRef();
        this.orderListRef = React.createRef()
        this.state = {
            userInfo: {},
            odometerCount: 0,
            odometerModalVisible: false,
            apiCountCalling: 0,
            isVisibleChangeRouteModal: false,
            visibleDayActivitySelectionSection: false,
            selectedDayActivitySelectionSectionData: {},

            isAttendanceModal: false,
            isVisibleOfficeModal: false,
            refreshing: false,
            offlineProgressModal: false,
            pageLoader: true,
            isOffline: false,
            odometerLoader: false
        };
    }

    componentDidMount = async () => {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this.setInitialState()
                await this.onLoad();
                // this.activitySelectionRef.current.onRefresh()
            })
    }

    setInitialState = async () => {
        this.state.userInfo = {};
        this.state.refreshing = false;
        this.setState(this.state);
    }

    getOdometerData = async () => {
        let odometerCount = "";
        let odometerData = await StorageDataModification.odometerData({}, "get");
        if (this.props.Sales360Redux.userInfo.isOdometer == undefined || this.props.Sales360Redux.userInfo.isOdometer == null) {
            if (odometerData !== null && odometerData !== undefined) {
                odometerCount = odometerData.type;
            }
        } else {
            odometerCount = this.props.Sales360Redux.userInfo.isOdometer
        }
        this.setState({ odometerCount: odometerCount })
    }

    // for load the function
    onLoad = async () => {
        this.state.pageLoader = false;
        this.setState(this.state);
        await this._getUserInfoFromApi()
        await this.onGetDayActivitySectionSelectedData();
        this.state.userInfo = await StorageDataModification.userCredential({}, "get");
        this.setState(this.state);
        StoreUserOtherInformations("", {}, this.props);
    }

    // for get the user info
    _getUserInfoFromApi = async () => {
        this.setState({ attendanceLoader: true });
        this.setState(await userInfoStore(this.state, this.props));
        this.setState({ attendanceLoader: false, });
    }

    // for get the selected Day Activity Selection Section Data
    onGetDayActivitySectionSelectedData = async () => {
        let dayData = await StorageDataModification.dayActivitySelectionSectionData({}, "get");
        if (dayData) {
            for (let i = 0; i < dayData.length; i++) {
                if (dayData[i].check) {
                    this.state.selectedDayActivitySelectionSectionData = dayData[i];
                    break;
                }
            }
        }
        this.setState(this.state);
    }

    openOdometerModal = () => {
        if (this.props.Sales360Redux.attendanceData.isAttendance == 1) {
            this.setState({ odometerModalVisible: true });
        } else if (this.props.Sales360Redux.attendanceData.isAttendance == 0) {
            this.onAttandenceModalVisible(true)
        }
    }

    _onCloseOdometerModal = () => {
        this.setState({ odometerModalVisible: false })
    }


    // for set the odometer data
    onSetOdometerData = (value) => {
        this.state.odometerCount = value;
        this.setState(this.state);
    }

    //for odometer
    modalSection = () => {
        const onCloseRouteModal = () => {
            this.setState({ isVisibleChangeRouteModal: false })
        }
        const onSelection = async (value) => {
            this.props.userSelectedBeatRouteData(value);
            await StorageDataModification.routeData(value, "store");
            onCloseRouteModal();
            await OfflineFunction.clearStorageForRouteChange(this.props);
            await this.onLoad();
        }

        const closeOfficeModal = () => {
            this.setState({ isVisibleOfficeModal: false })
        }

        return (
            <>
                {this.state.odometerModalVisible ?
                    <OdometerModal
                        props={this.props}
                        isVisible={this.state.odometerModalVisible}
                        onCloseModal={() => this._onCloseOdometerModal()}
                        getOdometerData={(value) => this.onSetOdometerData(value)}
                    /> :
                    null
                }
                {this.state.isVisibleChangeRouteModal ?
                    <ChangeRouteModal
                        isVisible={this.state.isVisibleChangeRouteModal}
                        props={this.props}
                        onCloseModal={() => onCloseRouteModal()}
                        onSelectRoute={(val) => onSelection(val)}
                    /> :
                    null
                }
                {this.state.isVisibleOfficeModal ?
                    <OfficeActivityModal
                        props={this.props}
                        isVisible={this.state.isVisibleOfficeModal}
                        onCloseModal={() => closeOfficeModal()}
                    />
                    :
                    null
                }
                {/* : null} */}


            </>

        )
    }

    // for selected Day activity section
    onSelecteDayActivityData = (value) => {
        this.state.selectedDayActivitySelectionSectionData = value;
        this.setState(this.state);

        if (value.dataId == 2) {
            this.setState({ isVisibleOfficeModal: true })
        }
    }

    // for day activity section
    dayActivitySelectionSection = () => {
        return (<DayActivitySelectionSection {...this.props} onClickItem={(value) => this.onSelecteDayActivityData(value)} onVisibleAttandance={() => this.onAttandenceModalVisible(true)} />);
    }

    // for user info section
    onViewUserInfoSection = () => {
        return (
            <View style={{ flex: 0.7 }}>
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Hi, <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>{this.state.userInfo.firstName}</Text></Text>
                {this.props.Sales360Redux.attendanceData.isAttendance == 0 ?
                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>You Need<Text style={{ color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, textDecorationLine: 'underline' }} onPress={() => this.onAttandenceModalVisible(true)}> Day Login </Text>before start work.</Text> :
                    <React.Fragment>
                        {this.props.Sales360Redux.attendanceData.isAttendance == 1 ?
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Start your Activity.</Text> :
                            null
                        }
                    </React.Fragment>
                }
            </View>
        );
    }

    // for odometer start section
    onOdometer = () => {
        if (this.state.odometerCount > 1) {
            return null;
        } else {
            return (
                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: "flex-end" }}>
                    {this.props.Sales360Redux.attendanceData.isAttendance == 1 ?
                        <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 10, backgroundColor: this.props.Sales360Redux.userInfo.isOdometer == 0 ? Color.COLOR.WHITE.PURE_WHITE : Color.COLOR.RED.AMARANTH, borderColor: Color.COLOR.RED.AMARANTH, borderWidth: 1, borderRadius: 50, alignItems: 'center' }} onPress={() => this.openOdometerModal()} activeOpacity={0.8}>
                            <SvgComponent svgName={"odomiter"} strokeColor={this.props.Sales360Redux.userInfo.isOdometer == 0 ? Color.COLOR.BLUE.LOTUS_BLUE : Color.COLOR.WHITE.PURE_WHITE} />
                            <Text style={{ color: this.props.Sales360Redux.userInfo.isOdometer == 0 ? Color.COLOR.BLUE.LOTUS_BLUE : Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 10 }}>{this.props.Sales360Redux.userInfo.isOdometer == 0 ? "Start" : "End"}</Text>
                        </TouchableOpacity>
                        :
                        null
                    }

                </View>
            );
        }
    }

    // for attandence modal visible
    onAttandenceModalVisible = (type) => {
        this.state.isAttendanceModal = type;
        this.setState(this.state);
    }

    // for users activity section
    onUserActivitySelectionSection = () => {
        return (<CrmUserActivitySelectionSection {...this.props} onClickItem={(value) => { }} onVisibleAttandance={() => this.onAttandenceModalVisible(true)} />);
    }

    // for view the visit section
    onViewVisitSection = () => {
        return (
            <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 15, borderRadius: 10, marginVertical: 10 }} onPress={() => this.onClickBeatRoute()}>
                    <TouchableOpacity style={{ backgroundColor: "#1F2B4D", flex: 0.3, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, justifyContent: "center", alignItems: 'center', paddingVertical: 5 }} onPress={() => this.onClickBeatRoute()}>
                        <Text style={{ color: '#fff', fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, fontSize: 14 }}>Beat Route</Text>
                        <Image source={ImageName.BEAT_ROUTE_WHITE} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: "#F0F4F7", alignItems: "center", flex: 0.7, borderBottomRightRadius: 10, borderTopRightRadius: 10, borderWidth: 1, borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR, paddingHorizontal: 10, justifyContent: 'center', flexDirection: "row" }} >
                        <TouchableOpacity onPress={() => this.onClickBeatRoute()}>
                            <Text style={{ color: Color.COLOR.GRAY.TAPA, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, fontSize: 14 }}>Go for</Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, fontSize: 14 }}>{CommonFunctions.textTruncate(this.props.Sales360Redux.routeData.hmName, 16)}</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 25, borderColor: Color.COLOR.RED.AMARANTH, paddingHorizontal: 10, paddingVertical: 5 }} onPress={() => this.changeRouteModal()}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, fontSize: 12 }}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    // for view Day Activity Selection section
    onDayActivitySelectionSection = () => {
        let respView = null;
        if (this.state.selectedDayActivitySelectionSectionData.dataId == 1) {
            respView = this.onViewVisitSection();
        }
        return respView;
    }

    onOfficeModalClose = () => {
        this.setState({ isVisibleOfficeModal: false })
    }

    changeRouteModal = () => {
        if (this.props.Sales360Redux.attendanceData.isAttendance == 1) {
            // await this.setLoader(true);
            this.updateWorkType("1")
            this.setState({ isVisibleChangeRouteModal: true });
            // this.setState(this.state);
            // this.props.onClickItem(itemData);
            // await this.setLoader(false);
        } else if (this.props.Sales360Redux.attendanceData.isAttendance == 0) {
            this.onAttandenceModalVisible(true)
        }

    }

    // for visible office modal
    onVisibleOfficeModal = async () => {
        if (this.props.Sales360Redux.attendanceData.isAttendance == 1) {
            if (await DeviceInfo.CheckConnection()) {
                this.updateWorkType("2")
            }
            this.setState({ isVisibleOfficeModal: true });
        } else if (this.props.Sales360Redux.attendanceData.isAttendance == 0) {
            this.onAttandenceModalVisible(true)
        }
    }

    // for redirect to the shop list page 
    onClickBeatRoute = async () => {
        if (this.props.Sales360Redux.attendanceData.isAttendance == 1) {
            if (await DeviceInfo.CheckConnection()) {
                this.updateWorkType("1")
            }
            this.props.navigation.navigate("RouteVisit");
        } else if (this.props.Sales360Redux.attendanceData.isAttendance == 0) {
            this.onAttandenceModalVisible(true)
        }
    }

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

    // for day activity action
    onViewActivityAction = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.8, backgroundColor: Color.COLOR.RED.AMARANTH, borderRadius: 30, flexDirection: 'row', paddingVertical: 10 }}>
                    <TouchableOpacity style={{ flex: 0.8, flexDirection: 'row' }} activeOpacity={0.7} onPress={() => this.onClickBeatRoute()}>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <SvgComponent svgName={"location_with_route"} />
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.XS, color: Color.COLOR.WHITE.PURE_WHITE }} numberOfLines={1}>{this.props.Sales360Redux.routeData.hmName ? this.props.Sales360Redux.routeData.hmName : ""}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.7} onPress={() => this.changeRouteModal()}>
                        <SvgComponent svgName={"downArrow"} strokeColor={Color.COLOR.WHITE.PURE_WHITE} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ borderWidth: 1, borderColor: Color.COLOR.RED.AMARANTH, borderRadius: 500, paddingVertical: 10, paddingHorizontal: 10 }} activeOpacity={0.7} onPress={() => this.onVisibleOfficeModal()}>
                        <SvgComponent svgName={"office"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    //refresh list
    _onRefresh = async () => {
        await this.setInitialState();
        await this.onLoad();
        this.activitySelectionRef.current.onRefresh()
    }

    // for visible the progress modal
    _onVisibleProgressModal = (type) => {
        this.state.offlineProgressModal = type;
        this.setState(this.state);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                {/* {this.state.pageLoader ?
                    null :
                    <React.Fragment>
                        {this.state.offlineProgressModal ?
                            <OfflineCompletionProgress isVisible={this.state.offlineProgressModal} props={this.props} onCloseModal={() => this._onVisibleProgressModal(false)} /> :
                            null
                        }
                    </React.Fragment>
                } */}
                {/* {this.state.isAttendanceModal ?
                    <AttendanceModal
                        props={this.props}
                        isVisible={this.state.isAttendanceModal}
                        onRefresh={() => this._onRefresh()}
                        onCloseModal={() => this.onAttandenceModalVisible(false)}
                    /> : null
                } */}
                <Header {...this.props} onRefresh={() => this._onRefresh()} />
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.state.refreshing}
                //         onRefresh={() => this._onRefresh()}
                //     />
                // }
                >
                    {/* <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 10 }}>
                        {this.onViewUserInfoSection()}
                        {this.state.odometerLoader ? null : this.onOdometer()}
                    </View> */}
                    {/* for day activity action with respect to new design */}
                    {/* <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                        {this.onViewActivityAction()}
                    </View> */}
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        horizontal={true}>
                        <View style={{ flexDirection: "row", marginTop: 5, marginHorizontal: 20 }}>
                            {this.onUserActivitySelectionSection()}
                        </View>
                    </ScrollView>
                    {/* {this.onDayActivitySelectionSection()} */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 30 }}>
                        {/* <ProgressCircularForHome {...this.props} ref={this.progessbarRef} /> */}
                        <CrmDashboardBarChart  {...this.props} type={"materialConversion"} />

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 30 }}>
                        {/* <ProgressCircularForHome {...this.props} ref={this.progessbarRef} /> */}
                        <CrmDashboardBarChart  {...this.props} type={"targetVsAchievement"} />

                    </View>
                    {/* for show the today's order list */}
                    {/* <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                        <OrderListWithNextPreview {...this.props} ref={this.orderListRef} />
                    </View> */}
                </ScrollView>
                {this.modalSection()}
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
        stateCartData,
        stateDayActivitySelectionData,
        userSelectedBeatRouteData,
        userAttendanceData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CrmHome)