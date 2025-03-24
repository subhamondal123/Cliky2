import React from "react";
import {
    ActivityIndicator,
    Image,
    SafeAreaView, Text, TouchableOpacity, View
} from "react-native";
import { stateCheckForNetwork } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { FlatList } from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, FilterModal, NoDataFound } from "../../../shared";
import { DateConvert, StorageDataModification } from "../../../services/common-view-function";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { pjpModifyData } from "./function";
import { RefreshControl } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ScrollView } from "react-native";
import { App_uri } from "../../../services/config";

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
        id: "0",
        title: "Rejected",
        check: false
    },

]

class RecentOrder extends React.Component {
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
            recentOrderList: [],
            subCategoryArrData: subCategoryData,
            fromDate: "",
            toDate: "",
            filterVisibility: false,
            currentMonth: "",
            selectedCategoryId: ""
        };
    }

    componentDidMount = async () => {
        this.getCurrentMonth();
        await this._load(this.state.selectedCategoryId);
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    getCurrentMonth = () => {
        const currentDate = new Date();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = monthNames[currentDate.getMonth()];
        const currentYear = currentDate.getFullYear();
        const currentMonthYear = `${currentMonth} ${currentYear}`;
        this.setState({ currentMonth: currentMonthYear })
    }

    _load = async (selectedCategoryId) => {
        this.setState({ refreshing: false });
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchFrom": this.state.fromDate,
            "searchTo": this.state.toDate,
            "approvedStatus": selectedCategoryId
        }
        let responseData = await MiddlewareCheck("recentOrderDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let recentOrderListData = pjpModifyData(responseData);
                this.setState({
                    recentOrderList: [...this.state.recentOrderList, ...recentOrderListData.orderList],
                    totalDataCount: recentOrderListData.totalCount
                });
            }
            this.setState({
                pageLoader: false,
                listLoader: false,
                listDataLoader: false
            })
        }
    }

    storeInitialData = async () => {
        let listData = await StorageDataModification.recentOrderList({}, "get");
        if (listData == null || listData == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                recentOrderList: listData.orderList,
                totalDataCount: listData.totalCount,
                pageLoader: false
            })
        }
    }

    onOrderDetails = (item) => {
        this.props.navigation.navigate("SelectedOrderDetail", { data: item })
    }

    renderContactList = (item,) => {
        return (
            <View style={{ marginHorizontal: 15 }}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    listSection = (item, key) => {
        const statusSection = (status) => {
            return (
                <Image source={status == 0 ? ImageName.RED_CLOSE_IMG :
                    status == 2 ? ImageName.GREY_CIRCLE_IMG :
                        status == 3 ? ImageName.ORDER_PROCESSED_IMG :
                            status == 4 ? ImageName.ORDER_PENDING_IMG :
                                status == 1 ? ImageName.ORDER_APPROVED_TICK :
                                    status == 5 ? ImageName.RED_CLOSE_IMG :
                                        null}
                    style={{ height: 22, width: 22, resizeMode: 'contain' }} />
            )
        }
        return (
            <View key={key}>
                <TouchableOpacity style={styles.mainView} activeOpacity={0.9} onPress={() => this.onOrderDetails(item)}>
                    <View style={styles.orderCycleSec}>
                        <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2, backgroundColor: '#F0F4F7', paddingHorizontal: 5, paddingVertical: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={ImageName.ORDER_CALENDER_ICON} style={{ height: 18, width: 18, resizeMode: 'contain', top: -2 }} />
                                <View style={{ width: 5 }} />
                                <Text style={styles.dateText}>{DateConvert.formatDDfullMonthYYYY(item.createdAt)}</Text>
                            </View>
                            <View style={{ width: 20 }} />
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Text style={styles.orderValue}>ID <Text style={styles.aidTxt}>#{item.recordNumber}</Text></Text>
                            </View>
                            <Image source={ImageName.DOWN_ARROW} style={styles.blackDropDown} />
                        </View>
                    </View>
                    <View style={styles.marginSec} >
                        <Image source={item.profileImg.length == 0 ? ImageName.USER_IMG : { uri: App_uri.CRM_BASE_URI + item.profileImg }} style={styles.userImg} />
                        <View style={styles.nameSec}>
                            <Text style={styles.nameText} numberOfLines={1}>{item.userName}</Text>
                            <Text style={styles.dealerText}>{item.contactTypeName}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: "center", marginRight: 5 }}>
                            {/* <Image source={ImageName.BULLS_EYE_ICON} style={{ height: 23, width: 23, resizeMode: 'contain', marginRight: '2%'}} /> */}
                            {statusSection(item.approvedStatus)}
                        </View>
                        <Text style={styles.orderAmount}>{'\u20B9' + "" + item.totalPrice}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    _onHeaderSec = () => {
        return (
            <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                <View style={{ marginTop: 8, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: '5%', top: -5 }}>Recent Order</Text>
                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 3 }} />
                </View>

            </View>
        )
    }

    previousOrderSec = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 20, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>This Month</Text>
                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '5%' }}>{this.state.currentMonth}</Text>
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

    _onFooterSec = () => {
        const onCreate = () => {
            this.props.navigation.navigate("")
        }
        return (
            <View style={{ marginTop: 10, marginHorizontal: '28%' }}>
                <BigTextButton
                    text={"Create a Sales Order"}
                    fontSize={12}
                    backgroundColor={"#1F2B4D"}
                    borderRadius={22}
                    onPress={() => onCreate()}
                />
                <View style={{ height: 100 }} />
            </View>
        )
    }

    fetchMore = async () => {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.recentOrderList.length >= this.state.totalDataCount) {
                    this.setState({ listLoader: false })
                    return null;
                } else {
                    this._load(this.state.selectedCategoryId);
                }
            }
        );

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
            recentOrderList: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
        })
    }

    //refresh list data
    onRefresh = async () => {
        await this._onStatusChange();
        await this._load(this.state.selectedCategoryId);
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
            this.setState({ subCategoryArrData: this.state.subCategoryArrData, selectedCategoryId: item.id });
            await this._onStatusChange();
            await this._load(item.id)
        }

        return (
            <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 5, marginHorizontal: 15 }}>
                {this.state.subCategoryArrData.length > 0 ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {this.state.subCategoryArrData.map((data, key) => (
                            <TouchableOpacity style={data.check ? styles.ActiveMainTab : styles.mainTab} onPress={() => onSubCategory(data)} activeOpacity={0.9} key={key}>
                                {data.title ?
                                    <View >
                                        <Text style={data.check ? styles.activeTitleTxt : styles.titleTxt}>{data.title}</Text>
                                    </View>
                                    : null}

                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    :
                    null}
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

    // for reset the data
    _onReset = async () => {
        this.onFilterOpenAndClose();
        await this.clearFilterData();
        await this.onRefresh();
    }

    clearFilterData = async () => {
        this.setState({
            fromDate: "",
            toDate: "",
        })
    }

    modalSection = () => {
        return (
            <>
                <FilterModal
                    isVisible={this.state.filterVisibility}
                    onCloseModal={() => this.onFilterOpenAndClose()}
                    type={"oderList"}
                    onApply={(data) => this._onFilterWithApi(data)}
                    resetData={() => this._onReset()}
                    props={this.props}
                />
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._onHeaderSec()}
                {this.previousOrderSec()}
                {this.subCategorySec()}
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        {this.ViewSkeletonPlaceholder()}
                    </SkeletonPlaceholder> :
                    <React.Fragment>
                        {this.state.recentOrderList.length > 0 ?
                            <React.Fragment>
                                <FlatList
                                    data={this.state.recentOrderList}
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
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <View style={{ marginTop: 20, height: Dimension.height }}>
                                    <NoDataFound />
                                </View>
                            </React.Fragment>
                        }
                    </React.Fragment>
                }
                {this.modalSection()}
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

export default connect(mapStateToProps, mapDispatchToProps)(RecentOrder);
