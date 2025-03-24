import React from "react";
import { SafeAreaView, Image, View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, FontSize, ImageName } from "../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { Loader, NoDataFound, TextInputBox } from "../../../shared";
import SvgComponent from "../../../assets/svg";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";
import { ChangeRouteModal, UnplanVisitModal, VisitModal } from "../../../pageShared";
import Header from '../header/Header';
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { CommonFunctions, DateConvert, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { ClientSettings, UserAccessPermission } from "../../../services/userPermissions";
import { modifyOrderListData } from "./Function";
import { DeviceInfo } from "../../../services/config";


let data = [
    {
        id: 1,
        showHide: false
    },
    {
        id: 2,
        showHide: false
    },
    {
        id: 3,
        showHide: false
    },
    {
        id: 4,
        showHide: false
    }
]

const phoneNumber = '+1234567890';

class TodaySalesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            authCheck: false,
            versionData: {},
            authorizationCheck: true,
            visitModal: false,
            pjpVisitList: data,
            modaltype: "",
            isVisibleRouteModal: false,
            limit: 10,
            pageNum: 0,
            refreshing: true,
            pageLoader: true,
            listLoader: false,
            isApiCall: true,
            outletList: [],
            selectedItem: {},
            unplanVisitModal: false,
            customerIdArr: [],
            permissiondata: {
                registration: {}
            },
            searchText: "",
            fromDate: new Date(),
            toDate: "",
            dataLoader: false,
            isTouchDisable: false,
            changedDate: "",
            isSearchVisible: false,
            isOffline: false,
            isNetActive: false,
            offlineListData: [],
            orderCount: 0
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this.state.isOffline = await ClientSettings.OfflineAccess.getOfflineAccess();
        this.state.isNetActive = await DeviceInfo.CheckConnection()
        this.state.permissiondata.registration = await UserAccessPermission.REGISTRATION.registrationPermission(this.props);
        this.setState(this.state)

        // this._onSetChangeData()
        this._load();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    // this is the first function where set the state data
    _load = async () => {
        // let dayList = await StorageDataModification.todaySaleListData({}, "get");
        // if (dayList) {
        //     this.state.outletList = dayList.data;
        //     this.state.orderCount = dayList.totalOrderCount;
        //     this.state.pageLoader = false;
        //     this._apiCallRes();
        // } else {
        // if (!this.state.isNetActive) {
        //     this.setOfflineOrderList()
        // }
        // else {
        await this._apiCallRes();
        // }
        this.state.pageLoader = false;
        // }

        this.setState(this.state)

        StoreUserOtherInformations("", {}, this.props);
    }

    setOfflineOrderList = async () => {
        let orderListArr = [],
            orderCount = 0;
        let visitOfflineData = await StorageDataModification.customerOrderANdVisitData({}, "get");
        if (visitOfflineData !== null && visitOfflineData !== undefined && Object.keys(visitOfflineData).length > 0) {

            const outputArray = Object.values(visitOfflineData)
                .filter(entry => entry.orderData && entry.orderData.orderDetails)
                .flatMap(entry => {
                    const orderData = entry.orderData;
                    return orderData.orderDetails.map(detail => ({
                        isPlaceOrder: detail.isPlaceOrder,
                        isSync: detail.isSync,
                        productName: detail.productName,
                        prodhierarchyTypeId: detail.prodhierarchyTypeId,
                        prodhierarchyDataId: detail.prodhierarchyDataId,
                        quantity: detail.quantity,
                        totalPrice: detail.totalPrice,
                        unitShort: detail.unitShort,
                        rate: detail.rate
                    }));
                });

            orderListArr = modifyOrderListData(outputArray)
            orderCount = modifyOrderListData(outputArray).length

            this.setState(this.state)
        }
        this.setState({ offlineListData: orderListArr, orderCount: orderCount })
    }

    isViewOfflineListItem = () => {
        let listData = [];
        for (let i = 0; i < this.state.offlineListData.length; i++) {
            listData.push(
                <View style={styles.listMainView} key={i}>
                    <View style={styles.imageView}>
                        <Image source={ImageName.CHALO_BACHO_LOGO} style={styles.image} />
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <Text style={styles.bodyHeadText}>{this.state.offlineListData[i].productName}</Text>

                    </View>

                    <View style={{ flex: 0.3 }}>
                        <Text style={styles.amountText}>{"₹" + " " + (this.state.offlineListData[i].totalPrice ? this.state.offlineListData[i].totalPrice : "0")}</Text>
                    </View>
                </View>
            )
        }
        return listData;
    }

    _apiCallRes = async () => {
        let date = this.state.changedDate;
        this.setState({ refreshing: false, });
        let dataReq = {
            currentDate: "",
            searchText: this.state.searchText,
            searchFrom: DateConvert.formatYYYYMMDD(this.state.fromDate),
            searchTo: this.state.toDate,
            limit: this.state.limit.toString(),
            offset: (this.state.pageNum * this.state.limit).toString(),
        }
        await this.fetchListData(dataReq);
    }

    fetchListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("getCurrentOrdersListForDashboard", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await StorageDataModification.todaySaleListData(responseData.response, "store");
                if (responseData.response.data.length == 0) {
                    this.state.isApiCall = false;
                }
                this.setState({
                    outletList: [...this.state.outletList, ...responseData.response.data],
                });
            }
        }
        this.setState({
            filterLoader: false,
            pageLoader: false,
            listLoader: false,
            listDataLoader: false
        })
    }

    // for network error check 
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
        this.props.stateCheckForNetwork("OrderSplashScreen");
    }

    // this function used for navigate to another page
    onUnplanVisit = () => {
        this.props.navigation.navigate("UnplanVisitList")
    }

    onUnplanVisitModal = () => {
        this.setState({
            unplanVisitModal: !this.state.unplanVisitModal
        })
    }

    onAddOutlet = () => {
        this.props.navigation.navigate("UnplanVisitForm")
    }

    buttonSec = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 18, paddingBottom: 10 }}>
                <TouchableOpacity style={styles.addUnplanSec} onPress={() => this.onAddOutlet()}>
                    <Text style={styles.buttomTxt}>Add Shop/Outlet</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                {/* <TouchableOpacity style={styles.addUnplanSuggestSec} onPress={() => this.onUnplanVisitModal()}>
                    <SvgComponent svgName={"suggested"} strokeColor={"#fff"} height={20} width={20} />

                    <Text style={styles.buttomSuggestTxt}>Suggest Route Plan</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
    onOpenModal = (type, item) => {
        this.setState({
            visitModal: !this.state.visitModal,
            modaltype: type,
            selectedItem: item
        })
    }

    renderContactList = (item, key) => {
        return (
            <View >
                <View style={{ flex: 1, marginHorizontal: '2%' }}>
                    {this.listSec(item, key)}
                </View>
            </View>
        );
    };

    showHide = (item) => {
        let allItems = this.state.outletList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].id == item.id) {
                allItems[i].showHide = !(allItems[i].showHide)
            } else {
                allItems[i].showHide = false
            }
        }
        this.state.outletList = allItems;
        this.setState({ outletList: this.state.outletList })
    }


    phonePress = () => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    // for item check
    _onClickItem = async (item, key) => {
        this.state.outletList[key]["itemLoader"] = true;
        this.state.isTouchDisable = true;
        this.setState(this.state);
        await this.onDetailsScreen(item, key);
    }


    onDetailsScreen = async (item, key) => {
        let reqObj = {
            "visitedCustType": "1",
            "customerId": item.id,
            "hierarchyDataIdArr": [{ hierarchyDataId: this.props.Sales360Redux.routeData.hierarchyDataId, hierarchyTypeId: this.props.Sales360Redux.routeData.hierarchyTypeId }],
            "actualDate": DateConvert.fullDateFormat(new Date())
        };
        this.setState({ dataLoader: true });
        let responseData = await MiddlewareCheck("createFieldVisit", reqObj, this.props);
        this.state.isTouchDisable = false;
        this.state.outletList[key].itemLoader = false;
        this.setState(this.state);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Object.assign(item, responseData.response)
                this.props.navigation.navigate("OutletDetailsPage", { item: item });
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ dataLoader: false });
    }

    // for api call to create visit for order
    onApiCallGetVisitData = async (item, key) => {

    }

    listSec = (item, key) => {
        let headName = "",
            subName = "",
            objData = item.prodHmUpperNodes;
        if (objData && Object.keys(objData).length > 0) {
            const keys = Object.keys(objData);
            if (keys.length >= 2) {
                subName = objData[keys[0]];
                headName = objData[keys[1]];
            } else {
                console.log("Data object does not have enough properties.");
            }
        }
        return (
            <View style={{}} key={key}>
                <View style={styles.listMainView} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.imageView}>
                            <Image source={ImageName.PAPAD_IMG} style={styles.image} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.bodyHeadText}>{item.shopName == null || item.shopName == undefined ? "" : item.shopName}</Text>
                        </View>
                    </View>
                    <View style={styles.bodyTextView}>
                        <Text style={styles.SubText}>{headName} <Text style={styles.amountText}>{(this.props.Sales360Redux.loginData.clientId == 19 ? null : "₹" + " " + (item.totalPrice))}</Text>
                        </Text>
                        <Text style={styles.bodySubText}>{subName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '1%', marginTop: 5 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.SubText}>{item.orderDate == null || item.orderDate == undefined ? "" : item.orderDate}</Text>
                        </View>
                        <View style={styles.scoreTextView}>
                            <Text style={styles.firstText}>{parseInt(item.storeCount).toFixed(2)}</Text>
                            <View style={{ width: 8 }} />
                            <View style={styles.deviderLine} />
                            <View style={{ width: 8 }} />
                            <Text style={styles.totalItemText}>{parseInt(item.totalQty).toFixed(2)}</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    // fetch more
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
                    this._apiCallRes();
                } else {
                    this.setState({ listLoader: false })
                    return null;
                }
            }
        );
        // }
    };
    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
            <View style={{ marginBottom: 200 }}>
                <Loader type={"normal"} />
            </View>
        ) : (
            <View style={{ marginBottom: 200 }} />
        );
    };

    onChangeRoute = () => {
        this.setState({ isVisibleRouteModal: true })
    }

    RouteSelectionSec = () => {
        return (
            <View style={{ alignItems: "center", flexDirection: "row", backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, paddingHorizontal: 15, paddingVertical: 10 }}>
                <View style={{ height: 20, width: 20, borderRadius: 100, backgroundColor: "#E06336", alignItems: "center", justifyContent: "center" }}>
                    <SvgComponent svgName={"location_with_route"} strokeColor={"#fff"} height={12} width={12} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.routeNameTxt}>{CommonFunctions.textTruncate(this.props.Sales360Redux.routeData.hmName, 25)}</Text>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.onChangeRoute()}>
                    <Text style={styles.changeRouteTxt}>Change Route</Text>
                </TouchableOpacity>

            </View>
        )
    }

    // for change the state for refrace
    _onSetChangeData = async () => {
        this.setState({
            outletList: [],
            pageLoader: true,
            listLoader: true,
            refreshing: true,
            isApiCall: true,
            limit: 10,
            pageNum: 0,
        })
    }

    onSubmitVisitNote = (val) => {
        this.onCloseModal()
    }

    onCancelVisit = (val) => {
        this.onCloseModal()
    }

    onRescheduleVisit = (val) => {
        this.onCloseModal()
    }
    onCloseModal = () => {
        this.setState({ visitModal: false })
    }

    modalSec = () => {
        const onCloseRouteModal = () => {
            this.setState({ isVisibleRouteModal: false })
        }
        const onSelection = async (value) => {
            this.props.userSelectedBeatRouteData(value);
            await StorageDataModification.routeData(value, "store");
            onCloseRouteModal();
            await this._onSetChangeData();
            this.setState({ customerIdArr: [] })
            await this.onRefresh();


        }
        return (
            <>
                <UnplanVisitModal isVisible={this.state.unplanVisitModal}
                    onCloseModal={() => this.onUnplanVisitModal()}
                    props={this.props}
                />
                <VisitModal isVisible={this.state.visitModal}
                    props={this.props}
                    onCloseModal={() => this.onCloseModal()}
                    type={this.state.modaltype}
                    data={this.state.selectedItem}
                    onSubmitVisitNote={(value) => this.onSubmitVisitNote(value)}
                    onSubmitCancelVisit={(value) => this.onCancelVisit(value)}
                    onRescheduleVisit={(value) => this.onRescheduleVisit(value)}
                />
                {this.state.isVisibleRouteModal ?
                    <ChangeRouteModal
                        isVisible={this.state.isVisibleRouteModal}
                        props={this.props}
                        onCloseModal={() => onCloseRouteModal()}
                        onSelectRoute={(val) => onSelection(val)}
                    /> :
                    null
                }
            </>
        )
    }

    ViewSkeletonPlaceholder = () => {
        let resData = [];

        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    dateSec = () => {
        return (
            <View style={{ marginBottom: 10, marginHorizontal: 15 }}>
                <Text style={styles.changeRouteTxt}>Date : </Text>

            </View>
        )
    }

    onRefresh = async () => {
        await this._onSetChangeData();
        await this._apiCallRes()
    }

    onFilter = async (data) => {
        let fromDateData = data.fromDateObj.rawFromDate.toString().length > 0 ? DateConvert.formatYYYYMMDD(data.fromDateObj.rawFromDate).toString() : "";
        let toDateData = data.toDateObj.rawToDate.toString().length > 0 ? DateConvert.formatYYYYMMDD(data.toDateObj.rawToDate).toString() : "";
        this.setState({ fromDate: fromDateData, toDate: toDateData })
        this.onRefresh();
    }

    onResetFilterData = async () => {
        this.setState({ fromDate: "", toDate: "" })
        this.onRefresh();
    }

    onDownload = () => {
        console.log("download")
    }
    onSearch = () => {
        let searchVisible = this.state.isSearchVisible,
            searchData = this.state.searchText;
        if (searchVisible == false) {
            searchVisible = true;
        } else {
            searchVisible = false;
        }
        if (searchVisible == false) {
            searchData = "";
            this.onRefresh()
        }
        this.setState({ isSearchVisible: searchVisible, searchText: searchData })
    }

    searchSec = () => {
        const onSearch = (val) => {
            this.setState({ searchText: val })
        }
        const onPressSearchIcon = () => {

            this.onRefresh()
        }
        return (
            <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center', paddingBottom: 20 }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search Product"}
                        isRightIcon={true}
                        fontSize={FontSize.XS}
                        rightIcon={ImageName.SEARCH_LOGO}
                        rightIconStyle={{ height: 25, width: 25 }}
                        height={42}
                        borderRadius={22}
                        value={this.state.searchText}
                        onChangeText={(value) => onSearch(value)}
                        onPressRightIcon={() => onPressSearchIcon()}
                    />
                </View>
            </View>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} onSearchData={() => this.onSearch()} onFilterData={(data) => this.onFilter(data)} onReset={() => this.onResetFilterData()} />
                {/* {this.modalSec()} */}

                <View style={{ marginHorizontal: 15 }}>
                    {/* {this.buttonSec()} */}
                    {this.state.pageLoader ?
                        <View >
                            <SkeletonPlaceholder>
                                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                    {this.ViewSkeletonPlaceholder()}
                                </ScrollView>
                            </SkeletonPlaceholder>
                        </View> :
                        <React.Fragment>
                            {!this.state.isNetActive ?
                                this.isViewOfflineListItem()
                                :
                                <React.Fragment>
                                    {this.state.outletList.length > 0 ?
                                        <React.Fragment>
                                            {this.state.isSearchVisible ? this.searchSec() : null}
                                            {/* {this.dateSec()} */}
                                            <FlatList
                                                data={this.state.outletList}
                                                renderItem={({ item, index }) => this.renderContactList(item, index)}
                                                // keyExtractor={(item, key) => key}
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

                        </React.Fragment>
                    }


                    <View style={{ marginTop: 20 }} />
                </View >
            </SafeAreaView >
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
        userSelectedBeatRouteData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodaySalesScreen);