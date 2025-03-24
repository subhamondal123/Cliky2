import React from "react";
import {
    ActivityIndicator,
    SafeAreaView, ScrollView, View
} from "react-native";
import { stateCheckForNetwork } from "../../../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { FlatList } from "react-native";
import OrderListPage from "../../../../../pageShared/order/orderListPage";
import CustomerSubCategoryTab from "../../../../../pageShared/order/customerSubCategoryTab";
import { Color, Dimension, FontSize, ImageName } from "../../../../../enums";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../../services/middleware";
import { DateConvert, StorageDataModification, Toaster } from "../../../../../services/common-view-function";
import { pjpModifyData } from "./function";
import { ErrorCode } from "../../../../../services/constant";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { RefreshControl } from "react-native";
import { BigTextButton, FilterModal, Modal, NoDataFound, TextInputBox } from "../../../../../shared";
import { DynamicLocationMapping } from "../../../../../pageShared";

const subCategoryData = [
    {
        id: 1,
        title: "Regular",
        icon: ImageName.ORDER_DUMMY_LOGO,
        check: true
    },
    {
        id: 2,
        title: "Favourite",
        icon: ImageName.FAVOURITE_ICON,
        check: false
    },
    {
        id: 2,
        title: "Popular",
        icon: ImageName.YELLOW_STAR_ICON,
        check: false
    },
    {
        id: 4,
        title: "Suggested",
        icon: ImageName.BULLS_EYE_ICON,
        check: false
    },

]

class SecondaryCustomerList extends React.Component {
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
            customerListOrder: [],
            subCategoryArrData: subCategoryData,
            stateId: "",
            distId: "",
            zoneId: "",
            searchText: "",
            selectedContactTypeId: "",
            visibleModal: false,
            selectedCustomerData: {},
            countryArr: this.props.Sales360Redux.allCountries,
            stateArr: [],
            districtArr: [],
            zoneArr: [],
            selectedCountryObj: {},
            selectedDistrictObj: {},
            selectedStateObj: {},
            selectedZoneObj: {},
            stateLoader: false,
            distLoader: false,
            zoneLoader: false,
            locationObj: [],
            locationArr: [],
            isApiCall: true,
            filterVisibility: false,
            isProject: "0",
            proceedLoader: false,
            locationName: ""

        };
    }

    componentDidMount = async () => {
        await this._load();
        StoreUserOtherInformations("", {}, this.props);
    }

    _load = async () => {
        await this.storeInitialData();
        await this._apiCallRes();
    };

    _onBack = () => {
        this.props.navigation.goBack();
    };


    storeInitialData = async () => {
        let listData = await StorageDataModification.SecondaryOrderListData({}, "get");
        if (listData == null || listData == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                customerListOrder: listData.pjpList,
                totalDataCount: listData.totalCount,
                pageLoader: false
            })
        }
    }

    _apiCallRes = async () => {
        this.setState({ refreshing: false, });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchName": this.state.searchText ? this.state.searchText : "",
            "hierarchyDataIdArr": [],
            "searchTextCustName": "",
            "searchTextCustType": "",
            "searchTextCustPhone": "",
            "searchTextCustBusinessName": "",
            "searchCustPartyCode": "",
            "searchCustVisitDate": "",
            "customerAccessType": "2",
            "searchFrom": "",
            "searchTo": "",
            "status": "",
            "contactType": "",
            "phoneNo": "",
            "isProject": this.state.isProject,
            "contactTypeId": this.state.selectedContactTypeId ? this.state.selectedContactTypeId : "",
            "isDownload": "0",
            "approvalList": "0",
            "forOrderListing": "1",
            "hierarchyDataIdArr": [
                {
                    "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId,
                    "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId
                }
            ],

        }
        await this.fetchListData(dataReq);
    }

    fetchListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("registrationList", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (this.state.pageNum == 0) {
                    let pjpData = await StorageDataModification.SecondaryOrderListData({}, "get");
                    let pjpListData = pjpModifyData(responseData);
                    if (pjpListData.pjpList.length == 0) {
                        this.state.isApiCall = false;
                    }
                    this.setState(this.state);
                    if (pjpData == null || pjpData == undefined) {
                        this.setState({
                            customerListOrder: pjpListData.pjpList,
                            totalDataCount: pjpListData.totalCount
                        });
                        await StorageDataModification.SecondaryOrderListData(pjpListData, "store");
                    } else if (JSON.stringify(pjpData.pjpList) === JSON.stringify(pjpListData.pjpList)) {
                        this.setState({
                            customerListOrder: pjpListData.pjpList,
                            totalDataCount: pjpListData.totalCount
                        });
                        if (pjpData.totalCount !== pjpListData.totalCount) {
                            await StorageDataModification.SecondaryOrderListData(pjpListData, "store");
                        }
                    } else {
                        this.setState({
                            customerListOrder: pjpListData.pjpList,
                            totalDataCount: pjpListData.totalCount
                        });
                        await StorageDataModification.SecondaryOrderListData(pjpListData, "store");
                    }
                    this.setState({ initialApiCall: true })
                } else {
                    let pjpListData = pjpModifyData(responseData);
                    if (pjpListData.pjpList.length == 0) {
                        this.state.isApiCall = false;
                    }
                    this.setState(this.state);
                    this.setState({
                        customerListOrder: [...this.state.customerListOrder, ...pjpListData.pjpList],
                        totalDataCount: pjpListData.totalCount
                    });
                }
            } else {
                if (this.state.pageNum == 0) {
                    await StorageDataModification.SecondaryOrderListData({}, "clear");
                    this.setState({
                        pageNum: 0,
                        limit: 10,
                        totalDataCount: 0,
                        isApiCall: true,
                        customerListOrder: [],
                        initialApiCall: true
                    });
                }
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            filterLoader: false,
            pageLoader: false,
            listLoader: false,
            listDataLoader: false
        })
    }

    _onSelectCountry = async (data) => {
        this.state.selectedCountryObj = data;

        this.setState({
            selectedCountryObj: this.state.selectedCountryObj,
            stateArr: data.state
        })
        // await this.getStateData(data.id);
    }

    // for select state data
    _onSelectState = async (data) => {
        this.state.selectedStateObj = data;

        this.setState({
            selectedStateObj: this.state.selectedStateObj,
            districtArr: data.city
        })
        // await this.getDistrictData(data.id);
    }
    // for change the dist and city
    _onSelectDistCity = async (data) => {
        this.state.selectedDistrictObj = data;
        this.setState({
            selectedDistrictObj: this.state.selectedDistrictObj,
            zoneArr: data.zone
        })
        // await this.getZoneData(data);
    }
    // for select the the zone
    _onSelectZone = (data) => {
        this.state.selectedZoneObj = data;
        this.setState({
            selectedZoneObj: this.state.selectedZoneObj
        })
    }

    onPressTile = (value) => {
        this.setState({ visibleModal: true, selectedCustomerData: value })
        // this.props.navigation.navigate("OrderProductList", { data: value })
    }

    onDropdownSelect = (value) => {
        let arr = this.state.customerListOrder;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == value.id) {
                arr[i].showHide = !arr[i].showHide
            } else {
                arr[i].showHide = false
            }
        }
        this.state.customerListOrder = arr;
        this.setState({ customerListOrder: this.state.customerListOrder })
    }


    renderContactList = (item, key) => {
        return (
            <View style={{}}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    //refresh list
    onRefresh = async () => {
        await this._onStatusChange();
        await this._load();
    }

    listSection = (item, key) => {
        return (
            <View key={key}>
                <OrderListPage
                    data={item}
                    props={this.props}
                    onSelectTile={(value) => this.onPressTile(value)}
                    onSelectDropdown={(value) => this.onDropdownSelect(value)}
                />
            </View>
        )
    }

    subTabSec = () => {
        const onAddCustomer = () => {
            this.props.navigation.navigate("AddNewCustomer", { onPageRefresh: this.onRefresh })
        }
        const selectTab = (value) => {
            for (let i = 0; i < this.state.subCategoryArrData.length; i++) {
                if (this.state.subCategoryArrData[i] == value) {
                    this.state.subCategoryArrData[i].check = true
                } else {
                    this.state.subCategoryArrData[i].check = false
                }
            }
            this.setState({
                subCategoryArrData: this.state.subCategoryArrData
            })
        }
        return (
            <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 5 }}>
                {this.state.subCategoryArrData.length > 0 ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <TouchableOpacity style={styles.mainTab} onPress={() => onAddCustomer()} activeOpacity={0.9}>
                            <View style={styles.imgSec}>
                                <Image source={ImageName.WHITE_PLUS_LOGO} style={styles.mainImg} />
                            </View>
                            <View style={styles.titleSec}>
                                <Text style={styles.titleTxt}>Add New</Text>
                            </View>
                        </TouchableOpacity>
                        {this.state.subCategoryArrData.map((item, key) => (
                            <View key={key}>
                                <CustomerSubCategoryTab data={item} onPressTab={(value) => selectTab(value)} />
                            </View>
                        ))}
                    </ScrollView>
                    :
                    null}
            </View>
        )
    }
    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
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
        ) : (
            <View style={{ marginBottom: 200 }} />
        );
    };
    // fetch more
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
                    if (this.state.isApiCall) {
                        this._apiCallRes();
                    } else {
                        this.setState({ listLoader: false })
                        return null;
                    }
                }
            );
        }
    };
    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            isApiCall: true,
            customerListOrder: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
        })
    }

    headerSection = () => {
        return (
            <View style={{ marginTop: 8, flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                    <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>
                    <Text style={styles.headingTxt}>Secondary Order</Text>
                </View>
                {/* <TouchableOpacity>
                    <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 3 }} />
                </TouchableOpacity> */}
            </View>
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

    subTabSkeliton = () => {
        return (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
            </View>
        )
    }

    onSelectLocationData = (val) => {
        this.setState({ locationObj: val.value, locationArr: val.totalData, locationName: val.name })
    }

    onFilterOpenAndClose = () => {
        this.setState({
            filterVisibility: !this.state.filterVisibility
        })
    }

    _onFilterWithApi = async (data) => {
        this.state.isProject = data.selectisProjectType.id ? data.selectisProjectType.id.toString() : "";
        this.setState({ isProject: this.state.isProject })
        this.onFilterOpenAndClose();
        await this.onRefresh();
    }

    // for reset the data
    _onReset = async () => {
        this.onFilterOpenAndClose();
        this.setState({ isProject: "" })
        await this.onRefresh();
    }

    modalSection = () => {
        //for clear modal data
        const clearModalData = () => {
            this.setState({
                selectedCountryObj: {},
                selectedStateObj: {},
                selectedDistrictObj: {},
                selectedZoneObj: {}
            })
        }

        //for close modal
        const closeModal = () => {
            this.setState({ visibleModal: false, locationObj: [] })
            clearModalData()
        }

        //for proceed from modal
        const _onProceed = async () => {
            let reqData = {
                locationName: this.state.locationName,
                locationData: this.state.locationObj
            }
            if (this.state.locationObj.length == 0) {
                Toaster.ShortCenterToaster("Please Select Location!")
            } else {
                let modData = Object.assign(this.state.selectedCustomerData, reqData)
                let newObj = {
                    ...modData,
                    "fieldVisitId": 0
                };
                this.props.navigation.navigate("OrderProductList", { data: newObj, screenName: "OrderModule" })
                closeModal()
            }
        }

        return (
            <View>
                <Modal
                    isVisible={this.state.visibleModal}
                    onBackdropPress={() => closeModal()}
                    children={
                        <View style={styles.modalview}>
                            <View style={{ paddingHorizontal: 10, justifyContent: "center" }}>
                                <React.Fragment>
                                    <View style={{ justifyContent: "center", marginVertical: 10 }}>
                                        <Text style={styles.modalHeaderTxt}>Select Location</Text>
                                    </View>
                                    <DynamicLocationMapping
                                        type={"lastHierarcyField"}
                                        marginBottom={5}
                                        flexDirection={"column"}
                                        viewType={"add"}
                                        isLabelVisible={false}
                                        onApiCallData={(value) => this.onSelectLocationData(value)} />
                                </React.Fragment>
                                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                                    <TouchableOpacity onPress={() => _onProceed()} style={{ backgroundColor: "red", borderRadius: 10, alignSelf: "center", paddingHorizontal: 20, paddingVertical: 10 }}>
                                        <Text style={styles.selectedLocationTxt}>Proceed</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                />
                <FilterModal
                    isVisible={this.state.filterVisibility}
                    onCloseModal={() => this.onFilterOpenAndClose()}
                    type={"allOrderList"}
                    onApply={(data) => this._onFilterWithApi(data)}
                    resetData={() => this._onReset()}
                    props={this.props}
                />
            </View>


        )
    }

    searchSec = () => {
        const onSearch = (val) => {
            this.setState({ searchText: val })
        }
        const onPressSearchIcon = () => {

            this.onRefresh()
        }
        return (
            <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search Customer By Name"}
                        isRightIcon={true}
                        fontSize={FontSize.XS}
                        rightIcon={ImageName.SEARCH_LOGO}
                        rightIconStyle={{ height: 25, width: 25 }}
                        rightIconDisabled={this.state.listLoader}
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
                <View style={{ marginHorizontal: 15 }}>
                    {this.headerSection()}
                    {this.subTabSec()}
                    {this.searchSec()}
                    {this.state.pageLoader ?
                        <SkeletonPlaceholder>
                            {/* {this.subTabSkeliton()} */}
                            {this.ViewSkeletonPlaceholder()}
                        </SkeletonPlaceholder>
                        :
                        <React.Fragment>

                            {this.state.customerListOrder.length > 0 ?
                                <React.Fragment>
                                    <FlatList
                                        data={this.state.customerListOrder}
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

                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryCustomerList);
