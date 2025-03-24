import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import styles from './Style';
import { Color, ImageName } from "../../../../enums";
import { stateCheckForNetwork, stateUserInformation } from "../../../../redux/Sales360Action";
import { CircularProgressBase } from 'react-native-circular-progress-indicator';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FloatingButton, Loader } from '../../../../shared';
import Tooltip from 'react-native-walkthrough-tooltip';
import { modifyDashData } from './Function';
import { CommonActions } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Header from '../../header/Header';
import { StorageDataModification, Toaster } from '../../../../services/common-view-function';
import { storeMMSDashBoardData } from '../../../../services/common-view-function/storeDataToStorage';
import { MiddlewareCheck } from '../../../../services/middleware';
import { ErrorCode } from '../../../../services/constant';
const bar = {
    activeStrokeWidth: 15,
    inActiveStrokeWidth: 15,
    inActiveStrokeOpacity: 0.2
};


class MmsDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: false,
            isVisibleModal: false,
            isVisibleFilterModal: false,
            filterLoader: false,
            filterVisibility: false,
            userLocationArr: [],
            timePeriod: "",
            typeId: "0",
            locationAreaRegion: {
                latitude: 0.000,
                longitude: 0.000
            },
            settingsData: {},
            dashData: {
                upcomingMeetings: "",
                expensesPending: "",
                approvalPending: "",
                approvedMeetings: "",
                totalMeetings: "",
                totalCanceledPending: "",
                companyBudget: "",
                partnerBudget: "",
                meetingPercentage: 0,
                expensePercentage: 0,
                totalPendingCanceledUpcomingCount: 0,
                totalExpances: 0,
            },
            meetingWithPaymentDue: {
                paymentPendingCount: "",
                paymentReleasedCount: ""
            },

        }
    }


    componentDidMount = async () => {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this._onSetInitialStateData();
                await this.onLoad();
            })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
        this._unsubscribe();
    }

    // for get data and store in the state
    _onGetStoreData = async () => {

        let dashData = await StorageDataModification.MMSDashBoardData({}, "get");
        if (dashData === null || dashData === undefined) {
            this.state.pageLoader = true;
        } else {
            this.state.dashData = dashData.dashData;
        }
        this.setState(this.state);
    }

    onLoad = async () => {
        let settingsData = await StorageDataModification.userSettingsData({}, "get");
        this.setState({ settingsData: settingsData })
        await this._onGetStoreData();
        await this.onApiCallRes();
        await this.onPaymentDueApiCall()
        this.setState({ pageLoader: false })
        await storeMMSDashBoardData({
            dashData: this.state.dashData
        })
    }

    // set the initial data
    _onSetInitialStateData = async () => {
        this.setState({
            pageLoader: false,
            isVisibleModal: false,
            isVisibleFilterModal: false,
            filterLoader: false,
            filterVisibility: false,
            userLocationArr: [],
            timePeriod: "",
            typeId: "0",
            locationAreaRegion: {
                latitude: 0.000,
                longitude: 0.000
            },
            dashData: {
                upcomingMeetings: "",
                expensesPending: "",
                approvalPending: "",
                approvedMeetings: "",
                totalMeetings: "",
                totalCanceledPending: "",
                companyBudget: "",
                partnerBudget: "",
                meetingPercentage: 0,
                expensePercentage: 0,
                totalPendingCanceledUpcomingCount: 0,
                totalExpances: 0,
            }
        })
    }


    onPaymentDueApiCall = async () => {
        let userInfo = await StorageDataModification.userCredential({}, "get");
        reqData = {
            "companyId": userInfo.clientId,
            "createdBy": userInfo.userId,
            "userId": userInfo.userId,
            "clientId": userInfo.clientId
        }
        let responseData = await MiddlewareCheck("getMeetingWithPaymentDueDetails", reqData, this.props);
        // console.log("getMeetingWithPaymentDueDetails>>>>>>>>>>>>>>", JSON.stringify(responseData));
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.meetingWithPaymentDue.paymentPendingCount = responseData.response.paymentPendingCount.toString().length < 2 ? "0" + responseData.response.paymentPendingCount : responseData.response.paymentPendingCount;
                this.state.meetingWithPaymentDue.paymentReleasedCount = responseData.response.paymentReleasedCount.toString().length < 2 ? "0" + responseData.response.paymentReleasedCount : responseData.response.paymentReleasedCount;
                this.setState(this.state);
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
    }

    onApiCallRes = async () => {
        let reqData = {
            "type": this.state.typeId
        }
        let responseData = await MiddlewareCheck("mmsDashboardData", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let dashData = modifyDashData(responseData.response);
                this.state.dashData.upcomingMeetings = dashData.upcomingMeetingCount;
                this.state.dashData.expensesPending = dashData.estimatedBudgetAmount;
                this.state.dashData.approvalPending = dashData.pendingMeetingCount;
                this.state.dashData.approvedMeetings = dashData.approvedMeetingCount;
                this.state.dashData.totalCanceledPending = dashData.totalCanceledPending.toString().length < 2 ? "0" + dashData.totalCanceledPending : dashData.totalCanceledPending;

                this.state.dashData.companyBudget = dashData.companyBudget;
                this.state.dashData.partnerBudget = dashData.partnerExpenses == 0 ? "00.00" : dashData.partnerExpenses.toString().length < 2 ? "0" + dashData.partnerExpenses : dashData.partnerExpenses;

                this.state.dashData.totalPendingCanceledUpcomingCount = dashData.totalPendingCanceledUpcomingCount;
                this.state.dashData.meetingPercentage = dashData.meetingApprovedPercentage;
                this.state.dashData.expensePercentage = dashData.expensePercentage;
                this.state.dashData.totalExpances = dashData.totalExpenses;
                this.setState({
                    dashData: this.state.dashData,
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
    }

    onOpenCloseModal = () => {
        if (this.state.isVisibleModal == false) {
            this.setState({ isVisibleModal: true })
        } else {
            this.setState({ isVisibleModal: false })
        }

    }
    onOpenCloseFilterModal = () => {
        if (this.state.isVisibleFilterModal == false) {
            this.setState({ isVisibleFilterModal: true })
        } else {
            this.setState({ isVisibleFilterModal: false })
        }

    }

    circularBarSection = () => {
        return (
            <>
                {this.state.filterLoader ? <View style={styles.loaderSec}>
                    <Loader />
                </View> : <>
                    <TouchableOpacity style={styles.circularBarSec} activeOpacity={0.9} onPress={() => this.onOpenCloseModal()}>
                        <CircularProgressBase
                            {...bar}
                            value={this.state.dashData.meetingPercentage}
                            radius={140}
                            activeStrokeColor={this.state.dashData.totalPendingCanceledUpcomingCount > 0 ? '#336dff' : Color.COLOR.GRAY.LIGHT_GRAY_COLOR}
                            inActiveStrokeColor={this.state.dashData.totalPendingCanceledUpcomingCount > 0 ? '#336dff' : Color.COLOR.GRAY.LIGHT_GRAY_COLOR}
                        >
                            <CircularProgressBase
                                {...bar}
                                value={this.state.dashData.expensePercentage}
                                radius={100}
                                activeStrokeColor={this.state.dashData.totalExpances > 0 ? '#ff9c66' : Color.COLOR.GRAY.LIGHT_GRAY_COLOR}
                                inActiveStrokeColor={this.state.dashData.totalExpances > 0 ? '#ff9c66' : Color.COLOR.GRAY.LIGHT_GRAY_COLOR}
                            >
                                {/* <CircularProgressBase
                            {...bar}
                            value={62}
                            radius={60}
                            activeStrokeColor={'#E7D74B'}
                            inActiveStrokeColor={'#E7D74B'}
                        /> */}
                            </CircularProgressBase>
                        </CircularProgressBase>
                    </TouchableOpacity>
                </>}

            </>

        )
    }

    filterSection = () => {
        return (
            <TouchableOpacity style={styles.filterImgSec} onPress={() => this.onOpenCloseFilterModal()} activeOpacity={0.9}>
                <Image source={ImageName.BLUE_FILTER_LOGO} style={styles.filterImg} />
            </TouchableOpacity>
        )
    }


    tooltipFilterSection = () => {

        const OnSelect = async (type) => {
            if (type == "lastMonth") {
                this.setState({ pageLoader: true, typeId: "0" })

                await this.onApiCallRes()
                this.setState({ pageLoader: false })
            }
            if (type == "lastQuarter") {
                this.setState({ pageLoader: true, typeId: "1" })
                await this.onApiCallRes()
                this.setState({ pageLoader: false })
            }
        }

        const onActionTooltipClick = async (type) => {
            this.onOpenCloseFilterModal()
            switch (type) {
                case "lastMonth":
                    OnSelect(type);
                    break;
                case "lastQuarter":
                    OnSelect(type);
                    break;

            }
        };
        return (
            <Tooltip
                animated={true}
                arrowSize={{ width: 16, height: 10 }}
                placement="top"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={this.state.isVisibleFilterModal}
                onClose={() => this.onOpenCloseFilterModal()}
                content={
                    <View style={styles.filterbar}>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <TouchableOpacity
                                style={styles.tooltipListView}
                                onPress={() => onActionTooltipClick("lastMonth")}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.filterFieldTxt}>
                                    Last Month
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tooltipListView}
                                onPress={() => onActionTooltipClick("lastQuarter")}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.filterFieldTxt}>
                                    Last Quarter
                                </Text>
                            </TouchableOpacity>

                        </ ScrollView>
                    </View>
                }
            >
                {this.filterSection()}
            </Tooltip>
        )
    }

    tooltipSection = () => {
        return (
            <Tooltip
                animated={true}
                arrowSize={{ width: 16, height: 10 }}
                placement="center"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={this.state.isVisibleModal}
                onClose={() => this.onOpenCloseModal()}
                content={
                    <View style={styles.barTooltipSec}>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ flexDirection: 'row' }} >
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.barTitleTxt}>MMS Detail</Text>
                                </View>
                                <Text style={styles.barTimeTxt}>{this.state.typeId == "0" ? "Last Month" : "Last Quarter"}</Text>
                            </View>
                            <View style={styles.meetingCountSec}>
                                <View style={styles.meetingApprovedSec}>
                                    <View style={styles.dot} />
                                    <View style={{ paddingLeft: "5%" }}>
                                        <Text style={styles.labelApprovedTxt}>Approved Meetings</Text>
                                        <Text style={styles.valueTxt}>{this.state.dashData.approvedMeetings}</Text>
                                    </View>
                                </View>
                                <View style={styles.meetingPendingSec}>
                                    <View style={styles.dotCanceled} />
                                    <View style={{ paddingLeft: "5%" }}>
                                        <Text style={styles.labelTxt}>Meetings Pending/Rejectced</Text>
                                        <Text style={styles.valueTxt}>{this.state.dashData.totalCanceledPending}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.meetingCountSec}>
                                <View style={styles.meetingApprovedSec}>
                                    <View style={styles.dotCompany} />
                                    <View style={{ paddingLeft: "5%" }}>
                                        <Text style={styles.labelApprovedTxt}>Exp by Company</Text>
                                        <Text style={styles.valueTxt}>{this.state.dashData.companyBudget}</Text>
                                    </View>
                                </View>
                                <View style={styles.meetingPendingSec}>
                                    <View style={styles.dotPartner} />
                                    <View style={{ paddingLeft: "5%" }}>
                                        <Text style={styles.labelApprovedTxt}>Exp by Partner</Text>
                                        <Text style={styles.valueTxt}>{this.state.dashData.partnerBudget}</Text>
                                    </View>
                                </View>
                            </View>


                        </ ScrollView>
                    </View>
                }
            >

                {this.circularBarSection()}
            </Tooltip>
        )
    }

    // for refresh the item data
    _onRefresh = async () => {
        await this._onSetInitialStateData();
        await this.onLoad();
    }


    // for shimmer view
    shimmerView = () => {
        return (
            <SkeletonPlaceholder borderRadius={4}>
                <View style={styles.space}>
                    <View style={styles.headerBelowBox} />
                    <View style={styles.smallBox}>
                        <View style={styles.smallLeftBox} />
                        <View style={styles.smallRightBox} />
                    </View>
                    <View style={styles.graphBox} />
                    <View style={styles.graphBox} />
                </View>
            </SkeletonPlaceholder>
        )
    }



    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.pageLoader ?
                    <View style={styles.container}>
                        <React.Fragment>
                            {this.shimmerView()}
                        </React.Fragment>
                    </View> : <>
                        <Header {...this.props} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} />
                        <View style={styles.underLine} />

                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.space}>
                                <View style={styles.rcBox}>
                                    <View style={styles.calenderImgSec}>
                                        <Image source={ImageName.COLORFUL_CALENDER_LOGO} style={styles.calenderImg} />
                                    </View>
                                    <View style={styles.meetingBoxSec}>
                                        <Text style={styles.upcomingText}>Upcoming Meetings</Text>
                                        <Text style={styles.upcomingValue}>{this.state.dashData.upcomingMeetings}</Text>
                                    </View>
                                </View>

                                <View style={styles.boxRow}>
                                    <View style={[styles.boxSec, {backgroundColor: Color.COLOR.RED.FADED_RED}]}>
                                        <View style={styles.boxSideSpace}>
                                            <View style={styles.whiteCircleSec}>
                                                <View style={styles.whiteCircle}></View>
                                            </View>
                                            <View>
                                                <Text style={styles.meetingText}>Payment Count</Text>
                                                <Text style={styles.exText}>Pending Payment</Text>
                                            </View>
                                            <View style={{ marginTop: 20 }}>
                                                <Text style={styles.text}>{this.state.meetingWithPaymentDue.paymentPendingCount}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.boxApproveSec, {backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR}]}>
                                        <View style={styles.boxSideSpace}>
                                            <View style={styles.whiteCircleSec}>
                                                <View style={styles.whiteCircle}></View>
                                            </View>
                                            <View>
                                                <Text style={styles.meetingApproveText}>Payment Count</Text>
                                                <Text style={styles.exApproveText}>Released Payment</Text>
                                            </View>
                                            <View style={{ marginTop: 20 }}>
                                                <Text style={styles.textApprove}>{this.state.meetingWithPaymentDue.paymentReleasedCount}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.boxRow}>
                                    <View style={[styles.boxSec, {backgroundColor: '#BECDF4'}]}>
                                        <View style={styles.boxSideSpace}>
                                            <View style={styles.whiteCircleSec}>
                                                <View style={styles.whiteCircle}></View>
                                            </View>
                                            <View>
                                                <Text style={styles.meetingText}>Meeting</Text>
                                                <Text style={styles.exText}>Expenses Pending</Text>
                                            </View>
                                            <View style={{ marginTop: 20 }}>
                                                <Text style={styles.text}>{this.state.dashData.expensesPending}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.boxApproveSec, {backgroundColor: '#F3E990'}]}>
                                        <View style={styles.boxSideSpace}>
                                            <View style={styles.whiteCircleSec}>
                                                <View style={styles.whiteCircle}></View>
                                            </View>
                                            <View>
                                                <Text style={styles.meetingApproveText}>Meeting</Text>
                                                <Text style={styles.exApproveText}>Approval Pending</Text>
                                            </View>
                                            <View style={{ marginTop: 20 }}>
                                                <Text style={styles.textApprove}>{this.state.dashData.approvalPending}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginTop: '7%', flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }} />
                                    {this.tooltipFilterSection()}
                                </View>
                                {this.tooltipSection()}

                            </View>
                            {/* <View style={{ flexDirection: 'row' }}>
                                {this.state.settingsData.hasSFA == 0 ?
                                    null
                                    :
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <TouchableOpacity style={[styles.bottomButton, {
                                            borderTopRightRadius: 300,
                                            borderBottomRightRadius: 300
                                        }]} activeOpacity={0.8} onPress={() => this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'SfaDashboard' }] }))}>
                                            <Text style={styles.nextBtnText}>SFA</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                {this.state.settingsData.hasLMS == 0 ?
                                    null
                                    :
                                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                        <TouchableOpacity style={[styles.bottomButton, {
                                            borderTopLeftRadius: 300,
                                            borderBottomLeftRadius: 300,
                                            alignSelf: 'flex-end'
                                        }]} activeOpacity={0.8} >
                                            <Text style={styles.nextBtnText}>LMS</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View> */}
                            <View style={{ height: 50 }} />
                        </ScrollView>
                        {/* <FloatingButton
                            // moduleType = "crm", "crmSales"
                            // pageNamePosition will SFA [PJP => 1, Enquiry =>2, Unplanned Visit => 3, Odometer => 4, Calendar => 5, Leave =>6, CSR =>7, Survey =>8, New Request =>9] , CRM [Task=>1, Lead =>2, Enquiry => 3, Contact => 4, Organization => 5] 
                            moduleType="mms"
                            navigation={this.props.navigation.navigate}
                        /> */}
                    </>}

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
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MmsDash);