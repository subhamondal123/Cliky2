import React from "react";
import { Color, Dimension } from '../../../../../enums';
import styles from './Style';
import { View, FlatList, RefreshControl, ActivityIndicator, Text } from 'react-native';
import { stateUserInformation, stateCheckForNetwork, stateCartData } from '../../../../../redux/Sales360Action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { OrderHistoryListPage, OrderHistoryListTile } from "../../../../../pageShared";
import { orderHistoryModifyData } from "./Function";
import { NoDataFound } from "../../../../../shared";
import { MiddlewareCheck } from "../../../../../services/middleware";
import { ErrorCode } from "../../../../../services/constant";
import { ClientSettings } from "../../../../../services/userPermissions";
import { StorageDataModification } from "../../../../../services/common-view-function";

// for order History page
class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            listLoader: true,
            refreshing: true,
            pageNum: 0,
            limit: 10,
            initialApiCall: false,
            orderHistoryList: [],
            selectedCategoryId: "",
            isOfflineEnable: false,
            isApiCall: true
        }
    }

    // this is a initial function which is call first
    componentDidMount() {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        let offlineAccessCheck = await ClientSettings.OfflineAccess.getOfflineAccess();
        this.state.isOfflineEnable = offlineAccessCheck;
        this.setState(this.state);
        if (offlineAccessCheck) {
            let orderHistoryData = await StorageDataModification.customerPlaceOrderData({}, "get");
            if (orderHistoryData) {
                if (orderHistoryData[this.props.route.params.item.id]) {
                    if (orderHistoryData[this.props.route.params.item.id].orderData && orderHistoryData[this.props.route.params.item.id].orderData.orderDetails) {
                        let temorderData = orderHistoryData[this.props.route.params.item.id].orderData.orderDetails;
                        for (let i = 0; i < temorderData.length; i++) {
                            temorderData[i]["orderDate"] = orderHistoryData[this.props.route.params.item.id].currentDateTime
                        }
                        this.state.orderHistoryList = temorderData;
                        this.setState(this.state);
                    }
                }
            }
        } else {
            await this.orderHistoryApi(this.state.selectedCategoryId)
        }
        this.setState({ pageLoader: false, listLoader: false })
    }

    // this function used for list api call here
    orderHistoryApi = async (selectedCategoryId) => {
        this.setState({ refreshing: false, });
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "customerId": this.props.route.params.item.id,
            "orderStatus": "1",
            "approvedStatus": selectedCategoryId,
            "isDownload": "0",
        }

        let responseData = await MiddlewareCheck("getOrderHistory", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (responseData.response.data.length == 0) {
                    this.state.isApiCall = false;
                }
                let pjpListData = orderHistoryModifyData(responseData, this.props.route.params);
                this.state.orderHistoryList = [...this.state.orderHistoryList, ...pjpListData.pjpList];

                this.setState(this.state);
            } else {
                this.state.isApiCall = false;
                this.setState(this.state);
            }
        }
        this.setState({ listLoader:false })
    }

    // here fetch more function here 
    fetchMore = async () => {
        // if (this.state.initialApiCall) {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.isApiCall) {
                    this.orderHistoryApi(this.state.selectedCategoryId);
                } else {
                    this.setState({ listLoader: false })
                    return null;
                }
            }
        );
    };

    // loader for scroll
    renderLoader = () => {
        return (
            <React.Fragment>
                {this.state.listLoader ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 100 }} >
                        <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                    </View> :
                    <View style={{ marginBottom: 100 }} />

                }
            </React.Fragment>
        )
    };

    // for render the contact list
    renderContactList = (item,) => {
        return (
            <View >
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    onPressTile = (item) => {
        let allItems = this.state.orderHistoryList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].recordNumber == item.recordNumber) {
                allItems[i].showHide = !(allItems[i].showHide)
            } else {
                allItems[i].showHide = false
            }
        }
        this.state.orderHistoryList = allItems;
        this.setState({ orderHistoryList: this.state.orderHistoryList })
    }

    // this function used for list section
    listSection = (item, key) => {
        return (
            <View key={key}>
                <OrderHistoryListPage
                    type={this.state.isOfflineEnable ? "offline" : "online"}
                    data={item}
                    props={this.props}
                    onSelect={() => this.onPressTile(item)}
                />
            </View>
        )
    }

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            isApiCall: true,
            orderHistoryList: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
        })
    }

    //refresh list data
    onRefresh = async () => {
        await this._onStatusChange();
        await this.orderHistoryApi(this.state.selectedCategoryId);
    }

    // for skelecton place design 
    ViewSkeletonPlaceholder = () => {
        let resData = [];
        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10, marginHorizontal: 16 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }


    render() {
        return (
            <View style={{}}>
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        {this.ViewSkeletonPlaceholder()}
                    </SkeletonPlaceholder> :
                    <React.Fragment>
                        {this.state.orderHistoryList.length > 0 ?
                            <FlatList
                                data={this.state.orderHistoryList}
                                renderItem={(item, key) => this.renderContactList(item, key)}
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
                            :
                            <React.Fragment>
                                <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
                                    {/* <NoDataFound /> */}
                                    <Text style={styles.noDataFound}>No Data Found !</Text>
                                </View>
                            </React.Fragment>
                        }
                    </React.Fragment>
                }
            </View >
        )
    }
};

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateUserInformation,
        stateCheckForNetwork,
        stateCartData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);