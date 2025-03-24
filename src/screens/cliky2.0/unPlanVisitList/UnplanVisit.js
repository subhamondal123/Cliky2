import React from "react";
import { SafeAreaView, Image, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { BigTextButton, BottomModal, Loader, NoDataFound, TextInputBox } from "../../../shared";
import SvgComponent from "../../../assets/svg";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";
import { ChangeRouteModal, VisitModal } from "../../../pageShared";
import Header from '../header/Header';
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { customerModifyData, getSelectId, modifyDataForApi, pjpModifyData } from "./Function";
import { DateConvert, StorageDataModification, Toaster } from "../../../services/common-view-function";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const phoneNumber = '+1234567890';

class UnpalnVisitList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            authCheck: false,
            versionData: {},
            authorizationCheck: true,
            visitModal: false,
            refreshing: true,
            pageLoader: true,
            customerPageLoader: true,
            listLoader: false,
            modaltype: "",
            selectedItem: {},
            pjpAllList: [],
            allCustomerList: [],
            limit: 10,
            pageNum: 0,
            fromDate: "",
            toDate: "",
            isApiCall: true,
            searchText: "",
            selectedCustomer: [],
            createPjpLoader: false,
            isVisibleRouteModal: false,
            locationData: {}
        }
    }


    // this is a initial function which is call first
    componentDidMount = async () => {
        await this._load();
        StoreUserOtherInformations("", {}, this.props);
    }

    // this is the first function where set the state data
    _load = async () => {
        await this._apiCallCustomerRes();
    }

    // for network error check 
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
        this.props.stateCheckForNetwork("OrderSplashScreen");
    }

    // onFetchCustomerData 

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
            "isProject": "0",
            "contactTypeId": this.state.selectedContactTypeId ? this.state.selectedContactTypeId : "",
            "isDownload": "0",
            "approvalList": "0",
            "hierarchyDataIdArr": [{ hierarchyDataId: "9137", hierarchyTypeId: "12" }],
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
                this.state.allCustomerList = [...this.state.allCustomerList, ...custList.customerList];
                this.setState(this.state);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            customerPageLoader: false,
            listLoader: false,
            listDataLoader: false
        })
    }

    leaveReasonSec = () => {
        return (
            <View style={{ padding: 5, borderTopColor: "#000", borderTopWidth: 0.5, borderBottomColor: "#000", borderBottomWidth: 0.5, flexDirection: 'row', marginTop: 10 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{ flex: 1, marginHorizontal: 2 }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 5, justifyContent: 'center' }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>23</Text>
                            <View style={{ width: 10 }} />
                            <View style={{ backgroundColor: Color.COLOR.GREEN.SEA_GREEN, height: 8, width: 8, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }} />
                        </View>
                        <Text style={{ color: "#747C90", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Yesterday</Text>
                    </View>
                    <View style={{ borderRightWidth: 0.8, borderRightColor: '#000', marginLeft: 8 }} />
                    <View style={{ flex: 1, marginHorizontal: 2 }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 5, justifyContent: 'center' }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>24</Text>
                            <View style={{ width: 10 }} />
                            <View style={{ backgroundColor: Color.COLOR.RED.AMARANTH, height: 8, width: 8, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }} />
                        </View>
                        <Text style={{ color: "#747C90", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Today</Text>
                    </View>
                    <View style={{ borderRightWidth: 0.8, borderRightColor: '#000', marginLeft: 8 }} />
                    <View style={{ flex: 1, marginHorizontal: 2 }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 5, justifyContent: 'center' }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>25</Text>
                            <View style={{ width: 10 }} />
                            <View style={{ backgroundColor: Color.COLOR.GREEN.SEA_GREEN, height: 8, width: 8, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }} />
                        </View>
                        <Text style={{ color: "#747C90", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Tomorrow</Text>
                    </View>
                    <View style={{ borderRightWidth: 0.8, borderRightColor: '#000', marginLeft: 8 }} />
                    <View style={{ flex: 1, marginHorizontal: 2 }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 5, justifyContent: 'center' }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>26</Text>
                            <View style={{ width: 10 }} />
                            <View style={{ backgroundColor: Color.COLOR.GRAY.TAPA, height: 8, width: 8, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }} />
                        </View>
                        <Text style={{ color: "#747C90", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>March</Text>
                    </View>
                    <View style={{ borderRightWidth: 0.8, borderRightColor: '#000', marginLeft: 8 }} />
                    <View style={{ marginHorizontal: 2, flex: 1 }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 5, justifyContent: 'center' }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>June</Text>
                            <View style={{ width: 18 }} />
                            <SvgComponent svgName={"calender"} strokeColor={"#000"} height={20} width={20} />
                        </View>
                        <View style={{ flexDirection: 'row', marginHorizontal: 5, justifyContent: 'center' }}>
                            <View style={{ flex: 1 }} />
                            <View style={{ width: 10 }} />
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>2023</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

    buttonSec = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 18 }}>
                <View style={{ flex: 1 }}>
                    <BigTextButton
                        text={"Add Unplan Visit"}
                        backgroundColor={"#fff"}
                        additionalStyles={styles.buttonAdditionalStyle}
                        borderRadius={26}
                        height={45}
                        fontColor={Color.COLOR.BLUE.LOTUS_BLUE}
                        fontSize={FontSize.XS}
                        onPress={() => this.onUnplanVisit("tenDaysVisit")}
                    />
                </View>
                <View style={{ width: 40 }} />
                <View style={{ flex: 1 }}>
                    <BigTextButton
                        text={"Suggest Route Plan"}
                        backgroundColor={"#F13748"}
                        borderRadius={26}
                        height={45}
                        fontColor={Color.COLOR.WHITE.PURE_WHITE}
                        fontSize={FontSize.XS}
                        isLeftIcon={true}
                        leftIcon={ImageName.SUGGESTED_LOGO}
                        leftIconStyle={{ height: 22, width: 22 }}
                        onPress={() => this.onUnplanVisit()}
                    />
                </View>
            </View>
        )
    }
    onOpenModal = (type, item) => {
        this.setState({
            visitModal: true,
            modaltype: type,
            selectedItem: item
        })
    }

    onCloseModal = () => {
        this.setState({ visitModal: false })
    }

    showHide = (item) => {
        let allItems = this.state.pjpAllList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].id == item.id) {
                allItems[i].showHide = !(allItems[i].showHide)
            } else {
                allItems[i].showHide = false
            }
        }
        this.state.pjpAllList = allItems;
        this.setState({ pjpAllList: this.state.pjpAllList })
    }

    showHideCustomer = (item) => {
        let allItems = this.state.allCustomerList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].id == item.id) {
                allItems[i].showHide = !(allItems[i].showHide)
            }
            // else {
            //     allItems[i].showHide = false
            // }
        }
        this.state.allCustomerList = allItems;
        this.setState({ allCustomerList: this.state.allCustomerList })

    }

    phonePress = () => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    onDetailsScreen = (item) => {
        this.props.navigation.navigate("OutletDetailsPage", { item: item })
    }

    //for customer data
    renderCustomerList = (item, key) => {
        return (
            <View key={key}>
                <View style={{ flex: 1, marginHorizontal: '2%' }}>
                    {this.customerListSec(item, key)}
                </View>
            </View>
        );
    };

    customerListSec = (item, key) => {
        return (
            <View style={{}} key={key}>
                <View style={item.showHide ? styles.inActiveboxshadowColor : styles.activeBoxshadowColor} >
                    <View style={styles.userSec}>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <View style={{ height: 18, width: 18, backgroundColor: Color.COLOR.RED.AMARANTH, justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                                <SvgComponent svgName={"love"} height={10} width={10} />
                            </View>
                        </View>
                        <Image source={ImageName.USER_IMG} style={styles.userImage} />
                    </View>
                    <TouchableOpacity style={styles.userTextSec} onPress={() => this.onDetailsScreen(item)} activeOpacity={0.9}>
                        <Text style={styles.nameText}>{item.custBusinessName.length > 0 ? item.custBusinessName : item.customerName}</Text>
                        <Text style={styles.dgText}>{item.contactTypeName}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mSec} onPress={() => this.onDetailsScreen(item)} activeOpacity={0.9}>
                        <View>
                            <SvgComponent svgName={"stopwatch"} strokeColor={"#0D9478"} height={14} width={14} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <SvgComponent svgName={"location_with_route"} strokeColor={"#747C90"} height={20} width={20} />
                                <Text style={styles.kmText}>30 KM.</Text>
                            </View>
                            <Text style={styles.fromText}>from here</Text>
                        </View>
                    </TouchableOpacity>
                    {item.showHide ?
                        <TouchableOpacity style={styles.dropdownSec} onPress={() => this.showHideCustomer(item)} activeOpacity={0.9} >
                            <Image source={ImageName.UP_ARROW_WITH_GREY_CIRCLE} style={{ height: 32, width: 32, resizeMode: "contain" }} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.dropdownSec} onPress={() => this.showHideCustomer(item)} activeOpacity={0.9}>
                            <Image source={ImageName.BLUE_DROPDOWN_IMG_CLIKY2} style={{ height: 32, width: 32, resizeMode: "contain" }} />
                        </TouchableOpacity>
                    }

                </View>
                {item.showHide ?
                    <View style={styles.boxshadowOpen}>
                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <TouchableOpacity style={styles.actionSecImg} onpress={() => this.phonePress()} >
                                <SvgComponent svgName={"telephone"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actionSec}>
                            <TouchableOpacity style={styles.actionSecImg} onPress={() => this.onOpenModal("tenDaysVisit")} activeOpacity={0.9}>
                                <SvgComponent svgName={"achiveBook"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionSecImg} onPress={() => this.onOpenModal("reschedule")} activeOpacity={0.9}>
                                <SvgComponent svgName={"refresh"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionSecImg} onPress={() => this.onOpenModal("visitCancel")} activeOpacity={0.9}>
                                <SvgComponent svgName={"cross"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionSecImg} onPress={() => this.onOpenModal("visitStatus")} activeOpacity={0.9}>
                                <SvgComponent svgName={"tick"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                        </View>
                    </View> :
                    null
                }
            </View>
        )
    }

    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
            <View style={{ marginBottom: 500 }}>
                <Loader type={"normal"} />
            </View>
        ) : (
            <View style={{ marginBottom: 500 }} />

        );
    };
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

    // fetch more
    fetchMoreCustomer = async () => {
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
                    this._apiCallCustomerRes();
                } else {
                    this.setState({ listLoader: false })
                    return null;
                }
            }
        );
        // }
    };

    // for change the state for refrace
    _onSetChangeData = async () => {
        this.setState({
            allCustomerList: [],
            customerPageLoader: true,
            listLoader: true,
            refreshing: true,
            limit: 10,
            pageNum: 0,
        })
    }

    searchSec = () => {
        const onSearch = (value) => {
            this.setState({ searchText: value })
        }
        const onPressSearchIcon = async () => {
            if (this.state.searchText.length > 0) {
                await this._onSetChangeData();
                await this._apiCallCustomerRes();
            }

        }
        return (
            <>
                <View style={{ marginTop: 18 }}>
                    <TextInputBox
                        placeholder={"Search by customer"}
                        placeholderTextColor={"#747C90"}
                        isRightIcon={true}
                        rightIcon={ImageName.SEARCH_IMG}
                        rightIconStyle={{ height: 35, width: 35 }}
                        height={40}
                        borderRadius={12}
                        value={this.state.searchText}
                        onChangeText={(value) => onSearch(value)}
                        onPressRightIcon={() => onPressSearchIcon()}
                    />
                </View>
            </>

        )
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

    getBeatData = () => {

    }

    onCreatePjp = async () => {
        let visitor = "";
        let info = await StorageDataModification.userCredential({}, "get");
        visitor = info.userId.toString();

        if (this.state.selectedCustomer.length == 0) {
            Toaster.ShortCenterToaster("Please select a customer !")
        } else {
            if (this.props.Sales360Redux.selectedBeatRouteData == undefined || Object.keys(this.props.Sales360Redux.selectedBeatRouteData).length == 0) {
                this.setState({ isVisibleRouteModal: true })
            } else {
                let dataReq = {
                    "customerList": modifyDataForApi(this.state.selectedCustomer),
                    "pjpDate": DateConvert.formatYYYYMMDD(new Date()),
                    "purposeId": "",
                    "note": "",
                    "isProject": "0",
                    "assignedUserId": visitor,
                    "hierarchyDataIdArr": [{ hierarchyDataId: this.state.locationData.hierarchyDataId, hierarchyTypeId: this.state.locationData.hierarchyTypeId }]
                }
                this.setState({ createPjpLoader: true })
                let responseData = await MiddlewareCheck("addNewPlannedVisit", dataReq, this.props);
                if (responseData) {
                    if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message);
                        await this._onSetChangeData();
                        await this._apiCallCustomerRes();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message);

                    }
                }
                this.setState({ createPjpLoader: false })
            }

        }

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

    onCloseRouteModal = () => {
        this.setState({ isVisibleRouteModal: false })
    }

    onSelection = (val) => {
        this.setState({ locationData: val })
        this.props.userSelectedBeatRouteData(val)

        this.onCloseRouteModal()
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} />
                {this.state.isVisibleRouteModal ?
                    <ChangeRouteModal
                        isVisible={this.state.isVisibleRouteModal}
                        props={this.props}
                        onCloseModal={() => this.onCloseRouteModal()}
                        onSelectRoute={(val) => this.onSelection(val)}
                    /> :
                    null
                }
                <VisitModal isVisible={this.state.visitModal}
                    props={this.props}
                    onCloseModal={() => this.onCloseModal()}
                    type={this.state.modaltype}
                    data={this.state.selectedItem}
                    onSubmitVisitNote={(value) => this.onSubmitVisitNote(value)}
                    onSubmitCancelVisit={(value) => this.onCancelVisit(value)}
                    onRescheduleVisit={(value) => this.onRescheduleVisit(value)}
                />
                {/* {this.leaveReasonSec()} */}
                <View style={{ marginHorizontal: 15 }}>

                    <>
                        {this.searchSec()}
                    </>
                    <View>

                        {/* // <React.Fragment>
                                //     <View style={{ marginTop: 20, height: Dimension.height }}>
                                //         <NoDataFound />
                                //     </View>
                                // </React.Fragment> */}
                        <React.Fragment>
                            {this.state.customerPageLoader ?
                                <View >
                                    <SkeletonPlaceholder>
                                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                            {this.ViewSkeletonPlaceholder()}
                                        </ScrollView>
                                    </SkeletonPlaceholder>
                                </View> :
                                <React.Fragment>
                                    {this.state.allCustomerList.length > 0 ?
                                        <FlatList
                                            data={this.state.allCustomerList}
                                            renderItem={({ item, index }) => this.renderCustomerList(item, index)}
                                            // keyExtractor={(item, key) => key}
                                            onEndReached={this.fetchMoreCustomer}
                                            onEndReachedThreshold={0.1}
                                            ListFooterComponent={this.renderLoader}
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                        // refreshControl={
                                        //     <RefreshControl
                                        //         refreshing={this.state.refreshing}
                                        //         onRefresh={() => this.onRefresh()}
                                        //     />
                                        // }
                                        />
                                        :
                                        <View style={{ height: Dimension.height, marginTop: 10 }}>
                                            <NoDataFound />
                                        </View>


                                    }

                                    <View>
                                    </View>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    </View>
                    < View style={{ marginTop: 20 }} />
                </View >
                {this.state.customerPageLoader ?
                    null :
                    <View style={{ position: "absolute", bottom: 0, marginBottom: 20 }} >
                        <View style={{ backgroundColor: "#fff", width: Dimension.width - 30, marginHorizontal: 15 }}>
                            <View style={styles.makePjpSec}>
                                <View style={{ flex: 0.2 }}>
                                    <Image source={ImageName.PJP_MAP} style={{ height: 40, width: 40, resizeMode: "contain" }} />
                                </View>
                                <View style={{ flex: 0.3 }}>
                                    <Text style={styles.createPjpTxt}>Create a Pjp Schedule</Text>
                                </View>
                                <View style={{ flex: 0.2 }} />
                                <View style={{ flex: 0.3 }}>
                                    {this.state.createPjpLoader ?
                                        <Loader type="normal" />
                                        :
                                        <TouchableOpacity style={{ borderRadius: 25, backgroundColor: Color.COLOR.RED.AMARANTH, paddingHorizontal: 10, paddingVertical: 5, alignItems: "center", justifyContent: "center" }} onPress={() => this.onCreatePjp()}>
                                            <Text style={styles.makePjpTxt}>Make a PJP</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(UnpalnVisitList);