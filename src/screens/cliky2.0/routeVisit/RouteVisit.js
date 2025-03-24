import React from "react";
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, FontSize, ImageName } from "../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { ImagePreview, Loader, NoDataFound, TextInputBox } from "../../../shared";
import SvgComponent from "../../../assets/svg";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";
import { ChangeRouteModal, OfflineCompletionProgress, UnplanVisitModal, VisitModal } from "../../../pageShared";
import Header from '../header/Header';
import { customerModifyData, getOutletListDataFromOffline, modifyData, targetModifyData } from "./Function";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { CommonFunctions, DateConvert, GetUserData, OfflineFunction, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { App_uri } from "../../../services/config";
import { ClientSettings, UserAccessPermission } from "../../../services/userPermissions";
import _debounce from 'lodash/debounce';


class RouteVisit extends React.Component {
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
            searchText: "",
            dataLoader: false,
            isTouchDisable: false,
            isSearchVisible: false,
            isOffline: false,
            offlineProgressModal: false,
            isProject: false,
            isCustomer: true
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        // await StorageDataModification.customerOrderANdVisitData({}, "clear")
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                this.state.isOffline = await ClientSettings.OfflineAccess.getOfflineAccess();
                let storeData = await StorageDataModification.userMenuPermision({}, "get");
                this.state.permissiondata.registration = UserAccessPermission.REGISTRATION.registrationPermission(storeData, this.props);
                this.setState(this.state);
                this._onSetChangeData();
                this._load();
            })
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
            // this._apiCallRes();
            if (this.state.isCustomer) {
                await this._apiCallCustomerRes();

            } else {
                await this._apiCallTargetRes();
            }
        }
        StoreUserOtherInformations("", {}, this.props);
    }

    _apiCallCustomerRes = async () => {
        this.setState({ refreshing: false, });
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
            "isProject": this.state.isProject ? "1" : "0",
            "contactTypeIdArr": this.state.customerIdArr,
            "isDownload": "0",
            "approvalList": "0",
            // "hierarchyDataIdArr": [{ "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId, "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId }],
            "hierarchyDataIdArr": [{ "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId, "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId }]
        }
        await this.fetchCustomerListData(dataReq);
    }

    fetchCustomerListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("registrationList", dataReq, this.props);

        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let custList = customerModifyData(responseData);
                if (custList.customerList.length == 0) {
                    this.state.isApiCall = false;
                }
                this.state.outletList = [...this.state.outletList, ...custList.customerList];
                this.setState(this.state);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
            dataLoader: false
        })
    }

    _apiCallTargetRes = async () => {
        this.setState({ refreshing: false, });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchName": this.state.searchText,
            "searchTextName": "",
            "searchTextPhone": "",
            "searchFrom": "",
            "searchTo": "",
            "searchContactStatus": "",
            "searchContactTyp": "",
            "phoneNo": "",
            "isProject": this.state.isProject ? "1" : "0",
            "contactTypeIdArr": this.state.customerIdArr,
            "isDownload": "0",
            // "hierarchyDataIdArr": [{ "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId, "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId }],
            "hierarchyDataIdArr": [{ "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId, "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId }]
        }
        await this.fetchTargetListData(dataReq);
    }

    fetchTargetListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("contactList", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let custList = targetModifyData(responseData);
                if (custList.customerList.length == 0) {
                    this.state.isApiCall = false;
                }
                this.state.outletList = [...this.state.outletList, ...custList.customerList];
                this.setState(this.state);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
            dataLoader: false
        })
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
            "orderOutlet": '1',
            "customerAccessType": "",
            "hierarchyDataIdArr": [{ "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId, "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId }],
        }
        await this.fetchListData(dataReq);
    }

    fetchListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("registrationList", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let listData = modifyData(responseData, this.props.Sales360Redux.routeData);
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
        this.props.navigation.push("UnplanVisitForm", { "type": "local" })
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
            <View style={{ flex: 1, marginHorizontal: '2%' }}>
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
        this.state.isTouchDisable = true;
        this.setState(this.state);
        await this.onDetailsScreen(item, key);
        this.state.outletList[key].itemLoader = false;
        this.setState(this.state)
    }

    onDetailsScreen = async (item, key) => {
        if (this.state.isOffline) {
            let userLocation = await GetUserData.getUserLocation()
            let userInfo = await StorageDataModification.userCredential({}, "get");
            let storeObj = {
                "orderUnicId": CommonFunctions.getGenerateNumber(),
                "currentDateTime": DateConvert.fullDateFormat(new Date()),
                "lattitude": userLocation.lattitude,
                "longitude": userLocation.longitude,
                "platform": Platform.OS,
                "cmpId": userInfo.clientId,
                "companyId": userInfo.clientId,
                "createdBy": userInfo.userId,
                "clientId": userInfo.clientId,
                "userId": userInfo.userId,
                "userType": userInfo.userType,
                "usertypeId": userInfo.userTypeId,
                "roleId": userInfo.roleId,
                "designationId": userInfo.designationId,
                "visitNoteData": {},
                "orderData": {
                    // "isPlaceOrder": false,
                    // "orderDetails": [],
                    // "contactId": item.id,
                    // "createdAt": "",
                    // "transactionType": item.customerAccessTypeName == "Primary" ? "2" : "3",
                    // "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId,
                    // "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId,
                    // "totalAmount": 0,
                    // "deliveryDate": "",
                    // "totalOrderQty": 0,
                    // "remarks": "",
                    // "isCustomer": "1",
                    // "isProject": "0"
                }
            }
            let storageData = await StorageDataModification.customerOrderANdVisitData({}, "get");

            if (storageData == null || storageData == undefined) {
                let customerStoreData = {};
                customerStoreData[item.id] = storeObj;
                await StorageDataModification.customerOrderANdVisitData(customerStoreData, "store");
            } else {
                let count = 0;
                Object.keys(storageData).forEach(async key => {
                    if (item.id == key) {
                        count++;
                    }
                });
                if (count == 0) {
                    storeObj.visitNoteData = storageData[item.id] == undefined || storageData[item.id] == null ? {} : storageData[item.id].visitNoteData
                    storeObj.orderData = storageData[item.id] == undefined || storageData[item.id] == null ? {} : storageData[item.id].orderData
                    storageData[item.id] = storeObj;
                }
                await StorageDataModification.customerOrderANdVisitData(storageData, "store");
            }
            this.state.outletList[key].itemLoader = false;
            this.state.isTouchDisable = false;
            this.setState(this.state);
            let mainItem = Object.assign(item, { "locationName": this.props.Sales360Redux.routeData.hmName })
            this.props.navigation.navigate("OutletDetailsPage", { item: mainItem });
        } else {
            let reqObj = {
                "visitedCustType": "1",
                "customerId": item.id,
                "hierarchyDataIdArr": [{ hierarchyDataId: this.props.Sales360Redux.routeData.hierarchyDataId, hierarchyTypeId: this.props.Sales360Redux.routeData.hierarchyTypeId }],
                "actualDate": DateConvert.fullDateFormat(new Date())
            };
            this.setState({ dataLoader: true });
            let responseData = await MiddlewareCheck("createFieldVisit", reqObj, this.props);
            this.state.outletList[key].itemLoader = false;
            this.state.isTouchDisable = false;
            this.setState(this.state);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    let respItem = Object.assign(item, responseData.response)
                    let mainItem = Object.assign(respItem, { "locationName": this.props.Sales360Redux.routeData.hmName })
                    this.props.navigation.navigate("OutletDetailsPage", { item: mainItem });
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ dataLoader: false });
        }
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
                    <ImagePreview source={item.profilePic.length == 0 ? ImageName.USER_IMG : { uri: App_uri.IMAGE_URI + item.profilePic }} style={styles.userImage} />
                </View>
                <View style={styles.userTextSec} onPress={() => this.onDetailsScreen(item)} activeOpacity={0.9}>
                    <Text style={styles.nameText}>{(item.custBusinessName && item.custBusinessName.length > 0) ? item.custBusinessName : (item.organizationName && item.organizationName.length > 0) ? item.organizationName : item.customerName}</Text>
                    <Text style={styles.dgText}>{item.contactTypeName}</Text>
                </View>
                {item.itemLoader ?
                    <View style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={"large"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                    </View> :
                    null
                    // <View style={styles.mSec} onPress={() => this.onDetailsScreen(item)} activeOpacity={0.9}>
                    //     <View>
                    //         <SvgComponent svgName={"stopwatch"} strokeColor={"#0D9478"} height={20} width={20} />
                    //     </View>
                    //     <View style={{ marginLeft: 10 }}>
                    //         <View style={{ flexDirection: 'row' }}>
                    //             <SvgComponent svgName={"location_with_route"} strokeColor={"#747C90"} height={20} width={20} />
                    //             <Text style={styles.kmText}>30 KM.</Text>
                    //         </View>
                    //         <Text style={styles.fromText}>from here</Text>
                    //     </View>
                    // </View>
                }
                {/* <View style={styles.dropdownSec}>
                        {item.showHide ?
                            <Image source={ImageName.USER_IMG} style={styles.userImage} />
                            :
                            <SvgComponent svgName={"downArrow"} height={20} width={20} />
                        }

                    </View> */}
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
            <View style={{ marginBottom: 300 }}>
                <Loader type={"normal"} />
            </View>
        ) : (
            <View style={{ marginBottom: 300 }} />
        );
    };

    onChangeRoute = (type) => {
        this.state.isVisibleRouteModal = type;
        this.setState(this.state);
    }

    RouteSelectionSec = () => {
        return (
            <View style={{ alignItems: "center", flexDirection: "row", backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, paddingHorizontal: 15, paddingVertical: 10 }}>
                <View style={{ height: 20, width: 20, borderRadius: 100, backgroundColor: "#E06336", alignItems: "center", justifyContent: "center" }}>
                    <SvgComponent svgName={"location_with_route"} strokeColor={"#fff"} height={12} width={12} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.routeNameTxt}>{this.props.Sales360Redux.routeData ? CommonFunctions.textTruncate(this.props.Sales360Redux.routeData.hmName, 25) : ""}</Text>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.onChangeRoute(true)}>
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
            if (this.state.isOffline) {
                await OfflineFunction.clearStorageForRouteChange(this.props);
                this.onVisibleProgressModal(true);
            }
            this.state.customerIdArr = [];
            this.setState(this.state);
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
        await this.onRefresh(); // Pass the searchText to fetchData
    }, 400);


    searchSec = () => {
        const onSearch = async (val) => {
            this.setState({ searchText: val })
            await this.debouncedFetchData()

        }

        const onPressSearchIcon = () => {
            this.onRefresh()
        }

        return (
            <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <TextInputBox
                        placeholder={"Search Customer By Name,Phone No."}
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
        await this._load();
    }

    // for filter the data
    filterData = async (data) => {
        this.state.customerIdArr = data.customerIdArr;
        this.state.isProject = data.isProject
        this.state.isCustomer = data.isCustomer
        this.setState(this.state);
        this.onRefresh();
    }

    onResetFilterData = async () => {
        this.state.customerIdArr = [];
        this.state.isProject = false;
        this.state.isCustomer = true;
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
                    {/* {this.state.permissiondata.registration.addPem ? */}
                    {this.buttonSec()}
                    {/* :
                        null
                    } */}
                    {/* {this.buttonSec()} */}
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
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RouteVisit);