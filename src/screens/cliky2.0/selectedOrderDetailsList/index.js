import React from "react";
import {
    ActivityIndicator,
    Image,
    RefreshControl,
    SafeAreaView, Text, View
} from "react-native";
import { stateCheckForNetwork } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { FlatList } from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, NoDataFound } from "../../../shared";
import { TouchableOpacity } from "react-native";
import { MiddlewareCheck } from "../../../services/middleware";
import { DateConvert, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { ErrorCode } from "../../../services/constant";
import { modifyProfileData, orderHistoryDetailsModifyData } from "./Function";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { App_uri } from "../../../services/config";

class OrderDetailsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: false,
            listLoader: false,
            refreshing: true,
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            initialApiCall: false,
            orderHistoryList: [],
            listCheck: true,
            profileData: {
                cartCount: 0,
                title: "",
                profileImg: "",
                userId: "",
                customerType: "",
            },
            totalBillAmount: "",
            placeOrderLoader: false
        };
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        await this.storeInitialData();
        await this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        await this.getProfileData();
        await this._orderHistoryDetailsApiCall();
    };

    // for store data call
    storeInitialData = async () => {
        let listData = await StorageDataModification.orderHistoryListDetails({}, "get");
        if (listData == null || listData == undefined) {
            this.setState({ pageLoader: true });
        } else {
            this.setState({
                orderHistoryList: listData.orderList,
                totalDataCount: listData.totalCount,
                pageLoader: false
            })
        }
    }

    getProfileData = async () => {
        let reqData = { customerId: this.props.route.params.data.userId }
        let responseData = await MiddlewareCheck("getCustomerDataWithCartItemCount", reqData, this.props)
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {

                let modifiedProfileData = modifyProfileData(responseData.response)
                this.setState({
                    profileData: modifiedProfileData
                })
            }
        }
    }

    _orderHistoryDetailsApiCall = async () => {
        this.setState({ refreshing: false });
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "orderNumber": this.props.route.params.data.recordNumber
        }
        let responseData = await MiddlewareCheck("getOrderHistoryDetails", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (this.state.pageNum == 0) {
                    let orderHistoryDetailsData = await StorageDataModification.orderHistoryListDetails({}, "get");
                    let orderHistoryData = orderHistoryDetailsModifyData(responseData);
                    if (orderHistoryDetailsData == null || orderHistoryDetailsData == undefined) {
                        this.setState({
                            orderHistoryList: orderHistoryData.orderList,
                            totalDataCount: orderHistoryData.totalCount
                        });
                        await StorageDataModification.orderHistoryListDetails(orderHistoryData, "store");
                    } else if (JSON.stringify(orderHistoryDetailsData.orderList) === JSON.stringify(orderHistoryData.orderList)) {
                        this.setState({
                            orderHistoryList: orderHistoryData.orderList,
                            totalDataCount: orderHistoryData.totalCount
                        });
                        if (orderHistoryDetailsData.totalCount !== orderHistoryData.totalCount) {
                            await StorageDataModification.orderHistoryListDetails(orderHistoryData, "store");
                        }
                    } else {
                        this.setState({
                            orderHistoryList: orderHistoryData.orderList,
                            totalDataCount: orderHistoryData.totalCount
                        });
                        await StorageDataModification.orderHistoryListDetails(orderHistoryData, "store");
                    }
                    this.setState({ initialApiCall: true })
                } else {
                    let orderHistoryData = orderHistoryDetailsModifyData(responseData);
                    this.setState({
                        orderHistoryList: [...this.state.orderHistoryList, ...orderHistoryData.orderList],
                        totalDataCount: orderHistoryData.totalCount
                    });
                }
            } else {
                if (this.state.pageNum == 0) {
                    await StorageDataModification.orderHistoryListDetails({}, "clear");
                    this.setState({
                        pageNum: 0,
                        limit: 10,
                        totalDataCount: 0,
                        orderHistoryList: [],
                        initialApiCall: true
                    });
                }
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
        })
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    renderContactList = (item, key) => {
        return (
            <React.Fragment key={key}>
                {this.listSection(item.item, item.index)}
            </React.Fragment>
        )
    }

    _onCheckBox = () => {
        this.setState({ listCheck: !this.state.listCheck });
    }

    listSection = (item, key) => {
        return (
            <View key={key}>
                <View style={styles.mainView}>
                    <View style={{ backgroundColor: '#F0F4F7', padding: 14, borderRadius: 22 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
                                <Text style={{ color: "#1F2B4D", fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.brandName}</Text>
                                <Text style={{ color: "#747C90", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, top: -8 }}>{item.productName}</Text>
                                <Text style={{ color: "#1F2B4D", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{(item.quantity.toFixed(1))} M.T</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Status : </Text>
                                    <Text style={{ color: item.approvedStatus == "1" ? Color.COLOR.GREEN.APPLE_GREEN : Color.COLOR.RED.AMARANTH, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, }}>{item.approvedStatus == "1" ? "Approved" : "Not Approved"}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ color: Color.COLOR.GREEN.APPLE_GREEN, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 8 }}>{'  \u20B9' + item.totalPrice}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    _onHeaderSec = () => {
        return (
            <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                <View style={{ marginVertical: 10, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Order History</Text>
                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 3 }} />
                </View>
                <View style={{ marginBottom: 10 }} />
            </View>
        )
    }

    updateCartDetail = () => {
        console.log("")
    }
    onPressCart = () => {
        this.props.navigation.navigate("OrderCartDetails", { data: this.props.route.params.data, onUpdateCart: this.updateCartDetail })
    }
    onRecentOrder = () => {
    }

    profileTileSec = () => {
        return (
            <View style={{ backgroundColor: '#1F2B4D', borderRadius: 12, padding: 8, marginHorizontal: 15, marginBottom: 2 }}>
                <View style={{ marginHorizontal: '2%', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flex: 1, flexDirection: "row", alignItems: "center", marginRight: 10 }} activeOpacity={0.9} onPress={() => this.onRecentOrder()}>
                        <Image source={this.state.profileData && this.state.profileData.profileImg.length > 0 ? { uri: App_uri.CRM_BASE_URI + this.state.profileData.profileImg } : ImageName.DUMMY_PROFILE} style={{ height: 42, width: 42, borderRadius: 100, resizeMode: 'cover' }} />
                        <View style={{ marginLeft: '3%' }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.profileData.title}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#F13748', paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 18, height: 35 }} onPress={() => this.onPressCart()}>
                        <Image source={ImageName.SHOPING_ORDER_BOX} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                        <View style={{ width: 5 }} />
                        <View style={{ marginHorizontal: 5 }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 2 }}>{this.state.profileData.cartCount}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 15 }} />
                <View style={{ backgroundColor: '#FFFFFF', borderRadius: 22, padding: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: "#747C90", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Order ID  <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>:{this.props.route.params.data.recordNumber}</Text></Text>
                        <View style={{ flex: 1 }} />
                        <Text style={{ color: "#747C90", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginRight: '5%' }}>{DateConvert.formatDDfullMonthYYYY(this.props.route.params.data.createdAt)}</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={ImageName.RED_CIRCEL_DOWNLOAD} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    onUpdatePayment = (propData) => {
        this.props.navigation.navigate("orderPaymentScreen", { data: this.props.route.params.data })
    }

    onUpdateCartData = () => {
        this.getProfileData()
    }

    onRepeatOrder = async () => {
        let reqData = {
            "orderNumber": this.props.route.params.data.recordNumber,
            "userId": this.props.route.params.data.userId
        }
        this.setState({ placeOrderLoader: true });
        let responseData = await MiddlewareCheck("repeatOrder", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.props.navigation.replace("OrderCartDetails", { data: this.props.route.params.data, onUpdateCart: this.onUpdateCartData })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ placeOrderLoader: false });
    }

    _onFooterSec = () => {
        let totalAountData = 0;
        for (let i = 0; i < this.state.orderHistoryList.length; i++) {
            totalAountData = totalAountData + parseFloat(this.state.orderHistoryList[i].totalPrice)
        }
        this.state.totalBillAmount = totalAountData;
        return (
            <React.Fragment>
                <View style={{ marginTop: 15, marginHorizontal: 15 }} />
                <View style={{ top: 10, flexDirection: 'row', marginHorizontal: 15, borderBottomColor: "#000", borderBottomWidth: 0.9, borderTopColor: '#000', borderTopWidth: 0.9, padding: 10, alignItems: 'center' }}>
                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, flex: 1, marginTop: 3 }}>Bill Information</Text>
                    <Text style={{ color: "#F13748", fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginRight: 15 }}>{'\u20B9' + " " + this.state.totalBillAmount}</Text>
                    <View style={{ backgroundColor: '#F68217', padding: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 8, paddingHorizontal: 14 }}>
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Partial</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 15, flexDirection: 'row', marginTop: 25 }}>
                    <BigTextButton
                        text={"Update Payment"}
                        backgroundColor={"#fff"}
                        additionalStyles={{ borderColor: "#000", borderWidth: 1 }}
                        borderRadius={22}
                        fontColor={"#000"}
                        fontSize={12}
                        onPress={() => this.onUpdatePayment(this.props.route.params.data)}
                    />
                    <View style={{ width: 95 }} />
                    {this.state.placeOrderLoader ?
                        <>
                            <View style={{ width: 95 }} />
                            <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                        </>
                        :
                        <BigTextButton
                            text={"Repeat Order"}
                            backgroundColor={"#1F2B4D"}
                            borderRadius={22}
                            fontSize={12}
                            onPress={() => this.onRepeatOrder()}
                        />
                    }

                </View>
                <View style={{ height: 50 }} />
            </React.Fragment>
        )
    }

    fetchMore = async () => {
        if (this.state.initialApiCall) {
            if (this.state.listLoader) {
                return null;
            }
            this.setState(
                (prevState) => {
                    return { listLoader: true, pageNum: prevState.pageNum + 1 };
                },
                () => {
                    if (this.state.orderHistoryList.length >= this.state.totalDataCount) {
                        this.setState({ listLoader: false });
                        return null;
                    } else {
                        this._load();
                    }
                }
            );
        }
    };

    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ?
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 200,
                }}
            >
                <ActivityIndicator
                    size="large"
                    color={Color.COLOR.INDICATOR_COLOR.GRAY}
                />
            </View>
            :
            <View style={{ marginBottom: 100 }} />
    };

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            orderHistoryList: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
        })
    }

    //refresh list data
    onRefresh = async () => {
        await this._onStatusChange();
        await this._load();
    }

    ViewSkeletonPlaceholder = () => {
        let resData = [];
        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10, marginHorizontal: 12 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._onHeaderSec()}
                {this.profileTileSec()}
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        {this.ViewSkeletonPlaceholder()}
                    </SkeletonPlaceholder> :
                    <React.Fragment>
                        {this.state.orderHistoryList.length > 0 ?
                            <React.Fragment>
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
                                {this._onFooterSec()}
                            </React.Fragment>
                            :
                            <React.Fragment>
                                {this.state.initialApiCall ?
                                    <View style={{ marginTop: 20, height: Dimension.height }}>
                                        <NoDataFound />
                                    </View>
                                    :
                                    null
                                }
                            </React.Fragment>
                        }
                    </React.Fragment>
                }

            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateCheckForNetwork,
    }, dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsList);
