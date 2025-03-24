import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Image, Linking, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import styles from './Style'
import { stateUserInformation, stateCheckForNetwork } from '../../../redux/Sales360Action';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MiddlewareCheck } from '../../../services/middleware';
import { orderHistoryModifyData } from './Function';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Color, FontFamily, FontSize, ImageName } from '../../../enums';
import { DateConvert, FileCreation, FileDownload, ShareFile, Toaster } from '../../../services/common-view-function';
import Header from '../header/Header';
import { ErrorCode } from '../../../services/constant';
import SvgComponent from '../../../assets/svg';
import { TextInputBox } from '../../../shared';
import { App_uri } from '../../../services/config';

class AllOrderHistoryList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageLoader: true,
            listLoader: true,
            refreshing: true,
            pageNum: 0,
            limit: 10,
            orderHistoryList: [],
            reportType: "1",
            subordinateIdArr: [],
            fromDate: "",
            toDate: "",
            orderNumber: "",
            isSearchVisible: false,
            isApiCall: true
        }
    }

    // this is a initial function which is call first
    componentDidMount() {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this.setInitialState()
                await this.orderHistoryApi()
            })
    }

    setInitialState = async () => {
        this.setState({
            pageLoader: true,
            listLoader: true,
            refreshing: true,
            pageNum: 0,
            limit: 10,
            isApiCall: true,
            orderHistoryList: [],
        })
    }

    // this function used for list api call here
    orderHistoryApi = async (selectedCategoryId) => {
        this.setState({ refreshing: false, });
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchText": this.state.orderNumber,
            "searchFrom": this.state.fromDate,
            "searchTo": this.state.toDate,
            "orderNumber": "",
            "reportType": this.state.reportType,
            "subordinateIdArr": this.state.subordinateIdArr,
            // "customerId": this.props.route.params.item.id,
            "orderStatus": "1",
            "isCustomer": "0",
            "approvedStatus": ""
        }

        let responseData = await MiddlewareCheck("getOrderHistory", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let listData = orderHistoryModifyData(responseData, this.props.route.params);
                this.state.orderHistoryList = [...this.state.orderHistoryList, ...listData.pjpList];
                if (listData.pjpList && listData.pjpList.length == 0) {
                    this.state.isApiCall = false;
                }
                this.setState(this.state);
            }
        }

        this.setState({ pageLoader: false, listLoader: false })
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
                    this.orderHistoryApi();
                } else {
                    this.setState({ listLoader: false })
                    return null;
                }
            }
        );
    };

    // for render the contact list
    renderContactList = (item) => {
        return (
            <View style={{ paddingHorizontal: 5 }}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    statusSection = (status) => {
        return (
            <Image source={status == 0 ? ImageName.RED_CLOSE_IMG :
                status == 2 ? ImageName.GREY_CIRCLE_IMG :
                    status == 3 ? ImageName.ORDER_PROCESSED_IMG :
                        status == 4 ? ImageName.ORDER_PROCESSED_IMG :
                            status == 1 ? ImageName.ORDER_APPROVED_TICK :
                                status == 5 ? ImageName.RED_CLOSE_IMG :
                                    null}
                style={{ height: 22, width: 22, resizeMode: 'contain' }} />
        )
    }

    onSelectTile = (item, key) => {
        let arr = this.state.orderHistoryList;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].recordNumber == item.recordNumber) {
                arr[i].check = !(arr[i].check)
            } else {
                arr[i].check = false
            }
        }

        this.state.orderHistoryList = arr;
        this.setState(this.state)

    }

    onEdit = (item, key) => {
        this.props.navigation.navigate("OrderHistoryItemList", { itemData: item })
    }

    // this function used for list section
    listSection = (item, key) => {
        return (
            <View key={key}>
                <View style={[styles.mainView, { borderColor: item.check ? Color.COLOR.BLUE.LOTUS_BLUE : Color.COLOR.WHITE.PURE_WHITE }]}>
                    <TouchableOpacity style={{ marginHorizontal: '2%', padding: 8 }} activeOpacity={0.8} onPress={() => this.onSelectTile(item, key)}>
                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                            <View style={{ flexDirection: "row", flex: 0.65 }}>
                                <Image source={ImageName.CONTACT_TYPE} style={{ height: 24, width: 24, resizeMode: 'contain' }} />
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: 14, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginLeft: 10 }}>{item.custBusinessName.length > 0 ? item.custBusinessName : item.customerName}</Text>
                            </View>
                            <View style={{ flex: 0.15 }} />
                            <View style={{ backgroundColor: Color.COLOR.SKY.LIGHT_SKY, borderRadius: 15, paddingHorizontal: 10, paddingVertical: 5, flex: 0.2 ,alignItems:"center"}}>
                                <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.orderTypeName}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                <Image source={ImageName.CALENDER_CLOCK_IMG} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 10 }}>{DateConvert.getITCDateFormat(item.createdAt)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: '9%' }}>
                                <Image source={ImageName.ORDER_HISTORYLIST_LOGO} style={{ height: 19, width: 18, resizeMode: 'contain', top: -1 }} />
                                <View style={{ width: 8 }} />
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.recordNumber}</Text>
                            </View>
                            <View style={{ flex: 1 }} />
                            {this.statusSection(item.approvedStatus)}
                            <View style={{ width: 10 }} />
                            <View>
                                <Image source={item.check ? ImageName.UP_ARROW : ImageName.DOWN_ARROW} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    {item.check ?
                        <View style={{ borderTopWidth: 0.5, borderTopColor: "#000", backgroundColor: "#fff", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            <View style={[styles.textFlexView, { borderBottomWidth: 0 }]}>
                                <View style={styles.iconView}>
                                    <Image source={ImageName.CLIPBOARD} style={styles.iconImg} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.headerText}>Total Items</Text>
                                    <Text style={styles.textVisites}>{item.itemcount}</Text>
                                </View>
                                <View style={styles.iconView}>
                                    <Image source={ImageName.COINS} style={styles.iconImg} />
                                </View>
                                {/* <View style={{ flex: 1 }}>
                                    <Text style={styles.headerText}>Total Amount</Text>
                                    <Text style={styles.textVisites}>{'\u20B9' + item.orderActtualBillAmount}</Text>
                                </View> */}
                                {/* <TouchableOpacity onPress={() => this.onEdit(item, key)}
                                    style={{ borderWidth: 1, borderRadius: 10, borderColor: Color.COLOR.BLUE.LOTUS_BLUE, paddingHorizontal: 15, paddingVertical: 5, alignItems: "center", backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE }}>
                                    <SvgComponent svgName={"pencilWithUnderline"} strokeColor={Color.COLOR.WHITE.PURE_WHITE} height={28} width={28} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.headerText, { color: "#fff" }]}>Edit</Text>
                                    </View>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                        : null}


                </View>
            </View>
        )
    }


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
        await this.setInitialState();
        await this.orderHistoryApi();
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

    filterData = async (data) => {
        this.state.fromDate = data.fromDateObj.rawFromDate.toString().length > 0 ? DateConvert.formatYYYYMMDD(data.fromDateObj.rawFromDate) : ""
        this.state.toDate = data.toDateObj.rawToDate.toString().length > 0 ? DateConvert.formatYYYYMMDD(data.toDateObj.rawToDate) : ""
        this.state.reportType = Object.keys(data.selectedRecordType).length > 0 ? data.selectedRecordType.id.toString() : "1";
        this.state.subordinateIdArr = Object.keys(data.selectedSubordinateId).length > 0 ? [data.selectedSubordinateId.id.toString()] : [];

        this.setState(this.state)
        this.onRefresh();

    }

    onResetFilterData = () => {
        this.state.fromDate = "";
        this.state.toDate = "";
        this.state.reportType = "1";
        this.state.subordinateIdArr = [];
        this.setState(this.state)
        this.onRefresh();
    }

    onSearch = () => {
        let searchVisible = this.state.isSearchVisible,
            searchData = this.state.orderNumber;
        if (searchVisible == false) {
            searchVisible = true;
        } else {
            searchVisible = false;
        }
        if (searchVisible == false) {
            searchData = "";
            this.onRefresh();
        }
        this.setState({ isSearchVisible: searchVisible, orderNumber: searchData });
    }

    searchSec = () => {
        const onSearch = (val) => {
            this.setState({ orderNumber: val })
        }

        const onPressSearchIcon = () => {
            this.onRefresh()
        }

        return (
            <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center', paddingHorizontal: 10 }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search By Order Id"}
                        isRightIcon={true}
                        fontSize={FontSize.XS}
                        rightIcon={ImageName.SEARCH_LOGO}
                        rightIconStyle={{ height: 25, width: 25 }}
                        rightIconDisabled={this.state.listLoader}
                        height={42}
                        borderRadius={22}
                        value={this.state.orderNumber}
                        onChangeText={(value) => onSearch(value)}
                        onPressRightIcon={() => onPressSearchIcon()}
                    />
                </View>
            </View>
        )
    }


    onDownload = async () => {
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchFrom": this.state.fromDate,
            "searchText": this.state.orderNumber,
            "searchTo": this.state.toDate,
            "orderNumber": "",
            "reportType": this.state.reportType,
            "subordinateIdArr": this.state.subordinateIdArr,
            // "customerId": this.props.route.params.item.id,
            "orderStatus": "1",
            "isCustomer": "0",
            "approvedStatus": "",
            isDownload: "1"
        }
        let responseData = await MiddlewareCheck("getOrderHistory", reqData, this.props);
        if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            await FileDownload.downloadDocument(App_uri.BASE_URI + "temp/" + responseData.response);
        }

    }

    onShareWhatsapp = async () => {
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchFrom": this.state.fromDate,
            "searchText": this.state.orderNumber,
            "searchTo": this.state.toDate,
            "orderNumber": "",
            "reportType": this.state.reportType,
            "subordinateIdArr": this.state.subordinateIdArr,
            // "customerId": this.props.route.params.item.id,
            "orderStatus": "1",
            "isCustomer": "0",
            "approvedStatus": "",
            "isDownload": "1",
            "isShared": "1"
        }
        let responseData = await MiddlewareCheck("getOrderHistory", reqData, this.props);
        if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            if (responseData.response.sharedText == undefined || responseData.response.sharedText == null) {
                Toaster.ShortCenterToaster("No Data to Share !")
            } else {
                const filepath = await FileCreation.createTXTfile(responseData.response.sharedText, "Order Details")
                if (filepath) {
                    console.log('Text file created at:', filepath);
                    // Share the .txt file on WhatsApp
                    await ShareFile.shareTextFile(filepath, 'Order Details', 'Sharing order details via WhatsApp');
                } else {
                    console.log('Error creating text file.');
                }
            }

        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} onShare={() => this.onShareWhatsapp()} />
                {this.state.isSearchVisible ? this.searchSec() : null}

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
                                    <Text style={styles.noDataFound}>No Data Found !</Text>
                                </View>
                            </React.Fragment>
                        }
                    </React.Fragment>
                }
            </SafeAreaView>
        )
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
            stateUserInformation
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderHistoryList)