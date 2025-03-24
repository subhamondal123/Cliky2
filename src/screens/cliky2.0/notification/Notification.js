import React from 'react';
import { AlertMessage, Color, FontFamily, ImageName } from '../../../enums';
import styles from './Style';
import { CustomStyle } from '../../style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { stateCheckForNetwork, stateUserInformation, storeNotificationCountData } from "../../../redux/Sales360Action";
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    BackHandler,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    Platform
} from 'react-native';
import { CommonData, ErrorCode } from '../../../services/constant';
import { MiddlewareCheck, StoreUserOtherInformations } from '../../../services/middleware';
import { getIndex, registrationlistModifyData } from './Function';
import { EditAndDeleteModal, Loader, Modal, NoDataFound } from '../../../shared';
import Tooltip from 'react-native-walkthrough-tooltip';
import { DateConvert, StorageDataModification, Toaster } from '../../../services/common-view-function';
import SvgComponent from '../../../assets/svg';
import Header from '../header/Header';
import { ExpandableTextView } from '../../../pageShared';


class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            pageNum: 0,
            limit: 5,
            totalDataCount: 0,
            notificationArrData: [],
            refreshing: true,
            listLoader: true,
            unReadMsg: 0,
            showHideCheckBox: false,
            actionTooltip: false,

            listDataLoader: true,
            isVisibleModal: false,
            modalLoader: false,

            selectedItem: {},
            isApiCall: true
        }
    }

    _onSetInitialStateData = async () => {
        this.setState({
            pageLoader: true,
            listLoader: true,
            pageNum: 0,
            limit: 5,
            notificationArrData: [],
            isApiCall: true
        })
    }

    componentDidMount = async () => {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this._onSetInitialStateData();
                await this._load();
                await StoreUserOtherInformations("", {}, this.props);
            })
    }

    componentWillUnmount() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }

    // for back
    _backAction = () => {
        this._onBack();
    };

    _onBack = () => {
        this.props.navigation.goBack();
    }

    _load = async () => {
        // this._loaderCheck();
        // this.setState({ pageLoader: true, isApiCall: true })
        this.setState({ refreshing: false, });

        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
        }
        let responseData = await MiddlewareCheck("notificationList", dataReq, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let registrationList = registrationlistModifyData(responseData.data);
                if (registrationList.notificationList.length == 0) {
                    this.setState({ isApiCall: false })
                }

                this.setState({
                    notificationArrData: [...this.state.notificationArrData, ...registrationList.notificationList],
                    totalDataCount: registrationList.count
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

        this.setState({
            pageLoader: false,
            listDataLoader: false,
            listLoader: false,
        })
        await this.checkReadNotificationCount()
    }

    _loaderCheck = () => {
        this.setState({
            pageLoader: false,
            listLoader: false,
            refreshing: false,
        })
    }

    // _onMarkAllRead = async () => {
    //     let reqData = [];
    //     this.state.unReadMsg = 0;
    //     for (let i = 0; i < this.state.notificationArrData.length; i++) {
    //         if (this.state.notificationArrData[i].isRead == 0) {
    //             reqData.push(this.state.notificationArrData[i].id);
    //             this.state.notificationArrData[i].isRead = 1;
    //         }
    //     }
    //     // let updateData = await this._apiCallForUpdate({ "ids": reqData, "type": "READ" });
    //     if (updateData == true) {
    //         this.setState({
    //             notificationData: this.state.notificationData
    //         })
    //     }
    // }

    // _onCheckNotification = async (item) => {
    //     let key = getIndex(this.state.notificationArrData, item);
    //     // if (item.isRead == 0) {
    //     //     this.state.unReadMsg = this.state.unReadMsg - 1;
    //     //     await this._apiCallForUpdate({ "ids": [item.id], "type": "READ" });
    //     // }
    //     this.state.notificationArrData[key].isCheck = !this.state.notificationArrData[key].isCheck;
    //     this.state.notificationArrData[key].isRead = 1;
    //     this.setState({
    //         notificationData: this.state.notificationData
    //     })
    // }


    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
        this.props.stateCheckForNetwork("Notification");
    }

    // fetch more data
    fetchMore = () => {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.isApiCall) {
                    this._load();
                } else {
                    this.setState({ listLoader: false })
                    return null;
                }
            }
        );
    };


    renderLoader = () => {
        return this.state.listLoader ? (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 100,
                }}
            >
                <ActivityIndicator
                    size="large"
                    color={Color.COLOR.INDICATOR_COLOR.GRAY}
                />
            </View>
        ) : (
            <View style={{ marginBottom: 200 }} />
        );
    };

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 5,
            totalDataCount: 0,
            notificationArrData: [],
            listLoader: false,
            refreshing: true,
            pageLoader: true,
            listDataLoader: true,
            isApiCall: true
        })
    }

    onRefresh = async () => {
        this.setState({
            notificationArrData: [],
        })
        await this._onStatusChange();
        await this._load();
    }

    _onPopupModal = (item) => {
        if (this.state.isVisibleModal == false) {
            this.setState({
                isVisibleModal: true,
                selectedItem: item
            })
        } else {
            this.setState({
                isVisibleModal: false
            })
        }

    }

    _onListDelete = async () => {
        this.setState({
            modalLoader: true
        })
        let key = getIndex(this.state.notificationArrData, this.state.selectedItem);
        this.state.notificationArrData.splice(key, 1);
        this.state.totalDataCount = this.state.totalDataCount - 1;
        this.setState({
            notificationArrData: this.state.notificationArrData,
            totalDataCount: this.state.totalDataCount
        })
        let reqData = {
            "platform": "android",
            "ids": [this.state.selectedItem.id.toString()],
        }
        let responseData = await MiddlewareCheck("deleteNotification", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR && responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.data.message);
                this._onPopupModal()
            } else {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SERVER.INTERNAL_SERVER_ERROR);
            }
        }
        this.setState({
            modalLoader: false
        })
    }

    // rendering the data
    renderNotificationItem = ({ item, key }) => {
        return (
            <View key={key}>
                <View style={{}}>
                    {this.ListData(item, key)}
                </View>
            </View>
        );
    };

    _onPressNotification = async (item) => {
        await this.markSeenUnseen(item)

        if (item.refType) {
            if (item.refType == "newPjp_retail") {
                this.props.navigation.navigate("PjpVisit", { type: "newPjp" });
            } else if (item.refType == "newPjp_project") {
                this.props.navigation.navigate("PjpVisit", { type: "newPjp" });
            } else if (item.refType == "newBrandingRequisition") {
                this.props.navigation.navigate("PjpAndVisitList", { type: "newBrandingRequisition" });
            } else if (item.refType == "fieldVisitNotification") {
                this.props.navigation.navigate("PjpAndVisitList", { type: "fieldVisitNotification" });
            } else if (item.refType == "jointVisitRequest") {
                this.props.navigation.navigate("RequestList", { type: "jointVisitRequest" });
            } else if (item.refType == "addNewLead") {
                this.props.navigation.navigate("SfaEnquiryList", { type: "addNewLead" });
            } else if (item.refType == "leadAssignUpdate") {
                this.props.navigation.navigate("LeadsList", { type: "leadAssignUpdate" });
            } else if (item.refType == "leadToOpportunity") {
                this.props.navigation.navigate("OpportunityList", { type: "leadToOpportunity" });
            } else if (item.refType == "opportunityToCustomer") {
                this.props.navigation.navigate("Partners", { type: "opportunityToCustomer" });
            } else if (item.refType == "taskAssigned") {
                this.props.navigation.navigate("TaskList", { type: "taskAssigned" });
            } else if (item.refType == "EnquiryLeadAssigned") {
                this.props.navigation.navigate("SfaEnquiryList", { type: "EnquiryLeadAssigned" });
            } else if (item.refType == "Odometer_end") {
                this.props.navigation.navigate("OdometerList", { type: "odometer" });
            }
        }
    }

    markSeenUnseen = async (item) => {
        let arr = this.state.notificationArrData;
        for (let i = 0; i < arr.length; i++) {
            if (item.id == arr[i].id) {
                arr[i].isSeen = 1
            }
        }

        this.setState({ notificationArrData: arr })

        let dataReq = {
            "notificationId": item.id,
        }
        let responseData = await MiddlewareCheck("readNotification", dataReq, this.props);
        // if (responseData) {
        //     if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) { }
        // }

        // await this.checkReadNotificationCount()
    }

    checkReadNotificationCount = async () => {
        let count = 0;
        let arr = this.state.notificationArrData
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].isSeen == 0) {
                count++
            }
        }
        await StorageDataModification.storeNotificationCountData(count, 'store')
        this.props.storeNotificationCountData(count)


    }

    ListData = (item, key) => {
        return (
            <React.Fragment>
                {/* <View style={[styles.contentSec, item.isSeen == 1 ? { backgroundColor: Color.COLOR.BLUE.LIGHT_BLUE } : {}]}> */}
                <View style={styles.contentSec}>
                    {/* <TouchableOpacity
                        style={{ marginHorizontal: '2%', flexDirection: 'row', alignItems: 'center' }}
                        activeOpacity={0.9}
                        onPress={() => this._onPressNotification(item)}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Image source={{ uri: item.image }} style={styles.notificationImg} />
                            <View style={styles.textSec}>
                                <Text style={item.isSeen == 1 ? styles.textInactive : styles.text}>{item.subject}</Text>
                                <Text style={item.isSeen == 1 ? styles.bodyTextInactive : styles.bodyText}>{item.body}</Text>
                                <Text style={styles.dateTimeText}>{DateConvert.viewDateFormat(item.createdAt)}</Text>
                            </View>
                        </View>
                       
                        <View style={{ flexDirection: 'column' }}>
                            {item.isSeen == 1 ?
                                <TouchableOpacity
                                    onPress={() => this._onPopupModal(item)}
                                    activeOpacity={0.7}
                                    style={{}}>
                                    <Image source={ImageName.DELETE_WITH_RED} style={styles.deleteImg} />
                                </TouchableOpacity> :
                                <React.Fragment >
                                    <View style={{ top: -5, marginRight: '2%' }}>
                                        <View style={styles.redCircel}>
                                            <View style={styles.Circel} />
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => this._onPopupModal(item)}
                                        activeOpacity={0.7}
                                        style={{}}>
                                        <Image source={ImageName.DELETE_WITH_RED} style={styles.deleteImg} />
                                    </TouchableOpacity>
                                </React.Fragment>
                            }
                        </View>
                    </TouchableOpacity> */}



                    <TouchableOpacity style={styles.notificationSec} onPress={() => this._onPressNotification(item)}>
                        <View style={{ backgroundColor: Color.COLOR.RED.AMARANTH, height: 48, width: 48, borderRadius: 24, justifyContent: "center", alignItems: "center", marginTop: 5 }}>
                            <Image source={item.image.length > 0 ? { uri: item.image } : ImageName.YELLOW_COIN_ICON} style={{ height: 34, width: 34, resizeMode: 'contain' }} />
                        </View>
                        <View style={styles.notificationTextSec}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                <Text style={item.isSeen == 1 ? styles.textInactive : styles.text}>{item.subject}</Text>
                                <View style={{ flex: 1 }} />
                                {item.isSeen == 1 ? null :
                                    <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: "red" }} />
                                }
                            </View>
                            {/* <Text style={styles.notibody}>{item.body}</Text> */}
                            <ExpandableTextView
                                additionalTextStyle={{ fontSize: 13, color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}
                                maxLength={100}
                                data={item.body} />
                            {/* <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: "red" }} /> */}

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.spaceUnderline} />
            </React.Fragment>
        )
    }

    filterSection = () => {
        return (
            <React.Fragment>
                {/* <EditAndDeleteModal
                    type={'delete'}
                    isVisible={this.state.isVisibleModal}
                    onCancel={() => this._onPopupModal()}
                    isLoading={this.state.modalLoader}
                    onDelete={() => this._onListDelete()}

                /> */}
                <View style={{ marginHorizontal: '5%' }}>
                    <View style={styles.filterSec}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.dgText}>Notifications</Text>
                        </View>
                        {/* <View>
                            <Image source={ImageName.FILTER_LOGO} style={{ height: 22, width: 22, resizeMode: 'contain', marginTop: 12 }} />
                        </View> */}
                    </View>
                    <View style={styles.filterUnderLIne} />
                </View>
            </React.Fragment>
        )
    }
    // ..............open action header tooltip ............
    _TooltipAction = () => {
        const onClickActionTooltip = () => {
            if (this.state.actionTooltip == false) {
                this.setState({
                    actionTooltip: true
                })
            } else {
                this.setState({
                    actionTooltip: false
                })
            }
        }
        const onActionTooltipClick = async (type, item) => {
            switch (type) {
                case "delete":
                    this._onDeleteAction(type, item);
                    break;
                case "status":
                    this._onStatus(type, item);
                    break;
            }
        };

        return (
            <Tooltip
                animated={true}
                arrowSize={{ width: 16, height: 8 }}
                placement="left"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={this.state.actionTooltip}
                content={
                    <ScrollView>

                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("delete")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("status")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Status</Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
                onClose={() => onClickActionTooltip()}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onClickActionTooltip()}
                    disabled={true}
                // disabled={this.state.showHideCheckBox || this.state.opportunityList.length < 1}
                >
                    <Image
                        source={ImageName.HORIZONTAL_THREE_DOT} style={styles.tooltipBtn}
                    />
                </TouchableOpacity>
            </Tooltip>
        )
    }



    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                {this.state.pageLoader ?
                    <View style={styles.loaderView}>
                        <Loader />
                    </View> :
                    <React.Fragment>
                        {this.filterSection()}
                        {this.state.notificationArrData.length > 0 ? (
                            <React.Fragment>
                                <FlatList
                                    data={this.state.notificationArrData}
                                    renderItem={(item, key) => this.renderNotificationItem(item, key)}
                                    keyExtractor={(item, key) => key}
                                    onEndReached={this.fetchMore}
                                    onEndReachedThreshold={0.1}
                                    ListFooterComponent={this.renderLoader}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={() => this.onRefresh()}
                                        />
                                    }
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <ScrollView>
                                    <View style={CustomStyle.noDataFoundViewForTabList}>
                                        <NoDataFound />
                                    </View>
                                </ScrollView>

                            </React.Fragment>
                        )}
                    </React.Fragment>}
            </SafeAreaView >
        );
    }
};


const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
        stateUserInformation,
        storeNotificationCountData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Notification);