import React from "react";
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, ActivityIndicator, Platform, Image } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData, storeOutletListData } from "../../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { ImagePreview, Loader, NoDataFound, TextInputBox } from "../../../../shared";
import SvgComponent from "../../../../assets/svg";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";
import { ChangeRouteModal, OfflineCompletionProgress, UnplanVisitModal, VisitModal } from "../../../../pageShared";
import Header from '../../header/Header'
import { getOutletListDataFromOffline, modifyData } from "./Function";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { ErrorCode } from "../../../../services/constant";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { StorageDataModification } from "../../../../services/common-view-function";
import { App_uri } from "../../../../services/config";
import { BLUE_DROPDOWN_IMG_CLIKY2 } from "../../../../enums/image-name";
import _debounce from 'lodash/debounce';



class OutletDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            authCheck: false,
            versionData: {},
            authorizationCheck: true,
            visitModal: false,
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
            locationData: this.props.route.params ? this.props.route.params.heirarchyData : [],
            searchText: "",
            dataLoader: false,
            isTouchDisable: false,
            isSearchVisible: false,
            isOffline: false,
            offlineProgressModal: false,
            count: '',
            loginCheckLoader: false
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        // await StorageDataModification.customerOrderANdVisitData({}, "clear")
        // this._unsubscribe = this.props.navigation.addListener(
        //     'focus', async () => {
        //         this.state.isOffline = await ClientSettings.OfflineAccess.getOfflineAccess();
        //         this.state.permissiondata.registration = await UserAccessPermission.REGISTRATION.registrationPermission(this.props);
        //         this.setState(this.state);
        //         this._onSetChangeData();
        this._load();
        // })

    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    // this is the first function where set the state data
    _load = async () => {
        await this._onGetOfflineOnlineData();
    }

    // Get the data for offlien and online
    _onGetOfflineOnlineData = async () => {
        if (this.state.isOffline) {
            this.setState(await getOutletListDataFromOffline(this.state, this.props));
        } else {
            this._apiCallRes();
        }
        StoreUserOtherInformations("", {}, this.props);
    }

    _apiCallRes = async () => {
        this.setState({ refreshing: false });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchName": this.state.searchText,
            "searchTextCustName": "",
            "searchTextCustType": "",
            "searchTextCustPhone": "",
            "searchTextCustBusinessName": "",
            "searchCustPartyCode": "",
            "searchCustVisitDate": "",
            "searchFrom": "",
            "searchTo": "",
            "status": "",
            "contactType": "",
            "phoneNo": "",
            "isProject": "0",
            "contactTypeId": "",
            "contactTypeIdArr": this.state.customerIdArr,
            "isDownload": "0",
            "approvalList": "0",
            "customerAccessType": "",
            "hierarchyDataIdArr": this.state.locationData,
        }
        await this.fetchListData(dataReq);
    }

    fetchListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("getMTCustomerList", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let listData = modifyData(responseData);
                if (listData.list.length == 0) {
                    this.state.isApiCall = false;
                }
                this.state.outletList = [...this.state.outletList, ...listData.list];
                this.setState(this.state);
            }
        }
        this.setState({ filterLoader: false, pageLoader: false, listLoader: false, listDataLoader: false });
    }

    // this function used for navigate to another page
    onUnplanVisit = () => {
        this.props.navigation.navigate("UnplanVisitList");
    }

    onUnplanVisitModal = () => {
        this.setState({ unplanVisitModal: !this.state.unplanVisitModal });
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
            <View style={{ flex: 1, marginHorizontal: '2%' }} key={key}>
                {this.listSec(item, key)}
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


    // for item check
    _onClickItem = async (item, key) => {
        this.state.outletList[key].itemLoader = true;
        this.setState(this.state);
        let tempOutletDetails = {
            "heirarchyData": this.props.route.params.heirarchyData,
            "item": item,
            "storeCheckingData": {}
        }
        let reqData = { "shopId": item.shopId }
        let responseData = await MiddlewareCheck("CheckLoginMTCustomer", reqData, this.props);
        if (responseData) {
            if (responseData.success == ErrorCode.ERROR.ERROR.SUCCESS_WITH_TRUE) {
                tempOutletDetails.storeCheckingData = responseData.response;
            }
            this.props.storeOutletListData(tempOutletDetails);
            this.props.navigation.navigate("OutletLogInPage");
            await StorageDataModification.trandItemList({}, "clear");
            await StorageDataModification.closingStockItemList({}, "clear");
        }
        this.state.outletList[key].itemLoader = false;
        this.setState(this.state);
    }

    listSec = (item, key) => {
        return (
            <TouchableOpacity key={key} disabled={this.state.isTouchDisable} style={item.showHide ? styles.inActiveboxshadowColor : styles.activeBoxshadowColor} onPress={() => this._onClickItem(item, key)} activeOpacity={0.9}>
                <View style={styles.userSec}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <View style={{ height: 18, width: 18, backgroundColor: Color.COLOR.RED.AMARANTH, justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                            <SvgComponent svgName={"love"} height={10} width={10} />
                        </View>
                    </View>
                    <ImagePreview source={item.profilePic.length == 0 ? ImageName.USER_IMG : { uri: App_uri.AWS_S3_IMAGE_VIEW_URI + item.profilePic }} style={styles.userImage} />
                </View>
                <View style={styles.userTextSec} >
                    <Text style={styles.nameText}>{item.customerName}</Text>
                    <Text style={styles.dgText}>{item.contactTypeName}</Text>
                </View>
                {item.itemLoader ?
                    <View style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={"large"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                    </View> :
                    null

                }
            </TouchableOpacity>
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
                    this._onGetOfflineOnlineData();
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

    onChangeRoute = (type) => {
        this.state.isVisibleRouteModal = type;
        this.setState(this.state);
    }

    RouteSelectionSec = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let month = today.toLocaleString('default', { month: 'long' });

        return (
            <View style={{ alignItems: "center", flexDirection: "row", borderWidth: 1, borderColor: '#AAB6BF' }}>
                <View style={styles.montheTxt}>
                    <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: 14, color: '#FFFFFF', fontWeight: '500' }}>{dd}</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontWeight: '300' }}>{month}</Text>
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ color: '#F13748', fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: 15 }}>{this.state.outletList.length} <Text style={{ color: '#4B5263', fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: 15 }}>Outlet</Text></Text>

                </View>
                <View style={{ flex: 1, borderRightWidth: 0.5, padding: 20, borderRightColor: '#AAB6BF' }} />
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: "10%" }} activeOpacity={0.8} onPress={() => this.onChangeRoute(true)}>
                    <Text style={styles.changeRouteTxt}>Select Route</Text>
                    <Image source={BLUE_DROPDOWN_IMG_CLIKY2} style={{ height: 35, width: 35 }} />
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
            // this.props.userSelectedBeatRouteData(value);
            // await StorageDataModification.routeData(value, "store");
            onCloseRouteModal();
            // if (this.state.isOffline) {
            //     await OfflineFunction.clearStorageForRouteChange(this.props);
            //     this.onVisibleProgressModal(true);
            // }
            // this.state.customerIdArr = [];
            this.state.locationData = [{ "hierarchyDataId": value.hierarchyDataId, "hierarchyTypeId": value.hierarchyTypeId }]
            // this.setState(this.state);
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
    debouncedFetchData = _debounce(async () => {
        await this._onGetOfflineOnlineData(); // Pass the searchText to fetchData
    }, 500);


    searchSec = () => {
        const onSearch = async (val) => {
            this.setState({ searchText: val })

            await this._onSetChangeData();
            await this.debouncedFetchData()
        }

        const onPressSearchIcon = () => {
            this.onRefresh()
        }

        return (
            <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search Customer By Name"}
                        // isRightIcon={true}
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

    onRefresh = async () => {
        await this._onSetChangeData();
        await this._onGetOfflineOnlineData();
    }

    // for filter the data
    filterData = async (data) => {
        this.state.customerIdArr = data.customerIdArr;
        this.setState(this.state);
        this.onRefresh();
    }

    onResetFilterData = async () => {
        this.state.customerIdArr = [];
        this.setState(this.state);
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
            this.onRefresh();
        }
        this.setState({ isSearchVisible: searchVisible, searchText: searchData });
    }


    // for visible the progress modal
    onVisibleProgressModal = async (type) => {
        this.state.offlineProgressModal = type;
        this.setState(this.state);
        if (type == false) {
            this.state.customerIdArr = [];
            this.setState(this.state);
            await this.onRefresh();
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} />
                {this.state.offlineProgressModal ?
                    <OfflineCompletionProgress isVisible={this.state.offlineProgressModal} props={this.props} onCloseModal={() => this.onVisibleProgressModal(false)} /> :
                    null
                }
                {this.modalSec()}
                {this.RouteSelectionSec()}
                <View style={{ marginHorizontal: 15 }}>
                    {this.state.isSearchVisible ? this.searchSec() : null}
                    {this.state.pageLoader ?
                        <View >
                            <SkeletonPlaceholder>
                                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                    {this.ViewSkeletonPlaceholder()}
                                </ScrollView>
                            </SkeletonPlaceholder>
                        </View> :
                        <React.Fragment>
                            {this.state.outletList.length > 0 ?
                                < React.Fragment >
                                    <FlatList
                                        data={this.state.outletList}
                                        renderItem={({ item, index }) => this.renderContactList(item, index)}
                                        onEndReached={this.fetchMore}
                                        onEndReachedThreshold={0.1}
                                        ListFooterComponent={this.renderLoader}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        keyboardShouldPersistTaps="handled"
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
        userSelectedBeatRouteData,
        storeOutletListData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OutletDetail);