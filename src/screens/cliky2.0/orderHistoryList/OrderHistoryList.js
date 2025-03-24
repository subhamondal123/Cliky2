
import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View, FlatList, ScrollView, ActivityIndicator } from "react-native";
import { stateCheckForNetwork } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, FilterModal, NoDataFound } from "../../../shared";
import { DynamicProfileCard, OrderHistoryListTile } from "../../../pageShared";
import { MiddlewareCheck } from "../../../services/middleware";
import { DateConvert } from "../../../services/common-view-function";
import { ErrorCode } from "../../../services/constant";
import { modifyProfileData, orderHistoryModifyData } from "./Function";
import { RefreshControl } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

// status -- 1:not reviewed,2:pending,3:Approved,4:order proccessed,5:order delivered,6:order rejected

const subCategoryData = [
    {
        id: "",
        title: "All",
        check: true

    },
    {
        id: 1,
        title: "Approved",
        check: false

    },
    {
        id: 2,
        title: "Pending",
        check: false

    },
    {
        id: 3,
        title: "Hold",
        check: false
    },
    {
        id: 4,
        title: "Partially Approved",
        check: false
    },
    {
        id: 0,
        title: "Rejected",
        check: false

    },

]

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            listLoader: true,
            refreshing: true,
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            initialApiCall: false,
            orderHistoryList: [],
            subCategoryArrData: subCategoryData,
            profileData: {},
            profileLoader: false,
            fromDate: "",
            toDate: "",
            selectedCategoryId: "",
            filterVisibility: false
        };
    }

    componentDidMount = async () => {
        await this.getProfileData()
        await this._load();
    }
    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }
    _onBack = () => {
        this.props.navigation.goBack();
    };
    _load = async () => {
        await this.orderHistoryApi(this.state.selectedCategoryId)
    };

    getProfileData = async () => {
        let reqData = { customerId: this.props.route.params.data.userId }
        this.setState({ profileLoader: true })
        let responseData = await MiddlewareCheck("getCustomerDataWithCartItemCount", reqData, this.props)
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedProfileData = modifyProfileData(responseData.response)

                this.setState({
                    profileData: modifiedProfileData
                })
            }
        }
        this.setState({ profileLoader: false })
    }

    orderHistoryApi = async (selectedCategoryId) => {
        this.setState({ refreshing: false, });
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "customerId": this.props.route.params.data.userId,
            "orderStatus": "1",
            "approvedStatus": selectedCategoryId
        }
        let responseData = await MiddlewareCheck("getOrderHistory", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let pjpListData = orderHistoryModifyData(responseData, this.props.route.params);
                this.setState({
                    orderHistoryList: [...this.state.orderHistoryList, ...pjpListData.pjpList],
                    totalDataCount: pjpListData.totalCount
                });
            }
        }

        this.setState({
            pageLoader: false,
            listLoader: false,
        })
    }

    renderContactList = (item,) => {
        return (
            <View style={{}}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    onPressTile = (item) => {
        this.props.navigation.navigate("SelectedOrderDetail", { data: item })
    }

    listSection = (item, key) => {
        return (
            <View key={key}>
                <OrderHistoryListTile
                    data={item}
                    props={this.props}
                    onSelect={() => this.onPressTile(item)}
                />
            </View>
        )
    }

    _onHeaderSec = () => {
        return (
            <View style={{ marginHorizontal: '5%', marginTop: 10, alignItems: 'center' }}>
                <View style={{ marginTop: 8, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: '5%', top: -5 }}>Order History</Text>
                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 3 }} />
                </View>
            </View>
        )
    }

    updateCartDetail = () => {
    }

    profileTileSec = () => {
        const onCart = (item) => {
            this.props.navigation.navigate("OrderCartDetails", { data: this.state.profileData, onUpdateCart: this.updateCartDetail })
        }
        return (
            <View>
                {this.state.profileLoader ?
                    <SkeletonPlaceholder>
                        <View style={{ height: 60, marginHorizontal: 15, borderRadius: 15, marginTop: 10 }} />
                    </SkeletonPlaceholder>
                    :
                    <DynamicProfileCard data={this.state.profileData} props={this.props} onPressCart={() => onCart()} />
                }

            </View>
        )
    }

    onFilterOpenAndClose = () => {
        this.setState({
            filterVisibility: !this.state.filterVisibility
        })
    }

    // for filter with api call
    _onFilterWithApi = async (data) => {
        this.setState({
            fromDate: data.fromDateObj.fromDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.fromDateObj.rawDate),
            toDate: data.toDateObj.toDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.toDateObj.rawDate),
        })
        this.onFilterOpenAndClose();
        await this.onRefresh();
    }

    clearFilterData = async () => {
        this.setState({
            fromDate: "",
            toDate: "",
        })
    }

    previousOrderSec = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 20, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>This Month</Text>
                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '5%' }}>June 23</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#1F2B4D', justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 14 }} onPress={() => this.onFilterOpenAndClose()}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 5, alignItems: 'center' }}>
                        <Image source={ImageName.CALENDER_WHITE_CLOCK} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
                        <View style={{ width: 5 }} />
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Date Range</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    subCategorySec = () => {
        const onSubCategory = async (item) => {
            let arr = this.state.subCategoryArrData;
            for (let i = 0; i < arr.length; i++) {
                if (item == arr[i]) {
                    arr[i].check = true
                } else {
                    arr[i].check = false
                }
            }
            this.state.subCategoryArrData = arr;
            this.setState({ subCategoryArrData: this.state.subCategoryArrData, selectedCategoryId: item.id })
            await this._onStatusChange();
            await this.orderHistoryApi(item.id);
        }

        return (
            <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 5, marginHorizontal: 15 }}>
                {this.state.subCategoryArrData.length > 0 ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {this.state.subCategoryArrData.map((data, key) => (
                            <View key={key}>
                                <TouchableOpacity style={data.check ? styles.ActiveMainTab : styles.mainTab} onPress={() => onSubCategory(data)} activeOpacity={0.9}>
                                    {data.title ?
                                        <View >
                                            <Text style={data.check ? styles.activeTitleTxt : styles.titleTxt}>{data.title}</Text>
                                        </View>
                                        : null}

                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                    :
                    null}
            </View>
        )
    }

    _onFooterSec = () => {
        return (
            <View style={{ marginTop: 10, marginHorizontal: "20%" }}>
                <BigTextButton
                    text={"Create New Order"}
                    fontSize={12}
                    backgroundColor={"#F13748"}
                    borderRadius={24}
                />
                <View style={{ height: 100 }} />
            </View>
        )
    }

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
                if (this.state.orderHistoryList.length >= this.state.totalDataCount) {
                    this.setState({ listLoader: false })
                    return null;
                } else {
                    this.orderHistoryApi(this.state.selectedCategoryId);
                }
            }
        );
        // }
    };
    // loader for scroll
    renderLoader = () => {
        return (
            <React.Fragment>
                {this.state.listLoader ?
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
                    :
                    <View style={{ marginBottom: 100 }} />

                }
            </React.Fragment>
        )
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
        await this.orderHistoryApi(this.state.selectedCategoryId);
    }

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

    // for reset the data
    _onReset = async () => {
        this.onFilterOpenAndClose();
        // this._onStatusChange();
        await this.clearFilterData();
        await this.onRefresh();
    }

    modalSection = () => {
        return (
            <FilterModal
                isVisible={this.state.filterVisibility}
                onCloseModal={() => this.onFilterOpenAndClose()}
                type={"oderList"}
                onApply={(data) => this._onFilterWithApi(data)}
                resetData={() => this._onReset()}
                props={this.props}
            />
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._onHeaderSec()}
                {this.profileTileSec()}
                {this.previousOrderSec()}
                {this.subCategorySec()}
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
                                <View style={{ marginTop: 20, height: Dimension.height }}>
                                    <NoDataFound />
                                </View>
                            </React.Fragment>
                        }
                        {this.modalSection()}
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
    bindActionCreators(
        {
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
