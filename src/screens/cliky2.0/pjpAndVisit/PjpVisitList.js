import React from "react";
import { SafeAreaView, Image, View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation } from "../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { BigTextButton, BottomModal, Loader, NoDataFound, TextInputBox } from "../../../shared";
import SvgComponent from "../../../assets/svg";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";
import { UnplanVisitModal, VisitModal } from "../../../pageShared";
import Header from '../header/Header';
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { customerModifyData, pjpModifyData } from "./Function";
import { DateConvert, Toaster } from "../../../services/common-view-function";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import PjpAddModal from "../pjpAdddModal/PjpAddModal";
import { App_uri } from "../../../services/config";
import DatePicker from "react-native-date-picker";


const phoneNumber = '+1234567890';

class PjpVisit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            visiblePjpModal: false,
            authCheck: false,
            versionData: {},
            authorizationCheck: true,
            visitModal: false,
            mainPageLoader: true,
            refreshing: true,
            pageLoader: true,
            customerPageLoader: true,
            listLoader: false,
            customerListLoader: false,
            modaltype: "",
            selectedItem: {},
            pjpAllList: [],
            allCustomerList: [],
            customerIdArr: [],
            recordType: "1",
            subordinateIdArr: [],
            assignedId: "",
            limit: 10,
            pageNum: 0,
            fromDate: "",
            toDate: "",
            isApiCall: true,
            searchText: "",
            unplanVisitModal: false,
            isVisibleFilterModal: false,
            type: "1",
            //
            maxpjpList: "0",
            isVisibleRescheduleModal: false,
            selectedDateObj: {
                rawDate: new Date(),
                date: ""
            },
            rescheduleDatePicker: false,
            rescheduleReason: "",
            rescheduleReasonActive: false,
            selectItem: {},
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this.setInitialState()
                await this._load();
                StoreUserOtherInformations("", {}, this.props);
            })
    }

    // this is the first function where set the state data
    _load = async () => {
        await this._apiCallRes();
    }

    _apiCallRes = async () => {
        this.setState({ refreshing: false, });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchName": this.state.searchText,
            "searchFrom": this.state.fromDate,
            "searchTo": this.state.toDate,
            "isProject": "",
            "subordinateIdArr": this.state.subordinateIdArr,
            "contactTypeId": this.state.selectedContactTypeId ? this.state.selectedContactTypeId : "",
            "contactTypeIdArr": this.state.customerIdArr,
            "actualDate": this.state.currentDate ? this.state.currentDate : "",
            "searchDate": this.state.onDateSelected ? this.state.onDateSelected : "",
            "type": this.state.type ? this.state.type.toString() : "",
            "recordType": this.state.recordType ? this.state.recordType.toString() : "1",
            "subordinateId": this.state.assignedId ? this.state.assignedId.toString() : "",
            "device": "MOBILE",
            "isDownload": "0",
            "timePeriod": "next",


            "maxpjpId": this.state.maxpjpList
        }
        await this.fetchPjpListData(dataReq);
    }

    fetchPjpListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("pjpUnvisitReportList", dataReq, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let pjpListData = pjpModifyData(responseData);
                if (pjpListData.pjpList.length == 0) {
                    this.state.isApiCall = false;
                }
                this.state.pjpAllList = [...this.state.pjpAllList, ...pjpListData.pjpList];
                this.setState(this.state);
                this.state.maxpjpList = pjpListData.maxPjpId;
                this.setState({ maxpjpList: this.state.maxpjpList });
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            mainPageLoader: false,
            pageLoader: false,
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
                <TouchableOpacity style={styles.addUnplanSec} onPress={() => this.onUnplanVisitModal()}>
                    <Text style={styles.buttomTxt}>Add Unplan Visit</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity style={styles.addUnplanSec} onPress={() => this.onUnplanVisitModal()}>
                    <Text style={styles.buttomSuggestTxt}>Suggest Route Plan</Text>
                </TouchableOpacity>
                {/* <View style={{ flex: 1 }}>
                    <BigTextButton
                        text={"Add Unplan Visit"}
                        backgroundColor={"#fff"}
                        additionalStyles={styles.buttonAdditionalStyle}
                        borderRadius={26}
                        height={45}
                        fontColor={Color.COLOR.BLUE.LOTUS_BLUE}
                        fontSize={FontSize.XS}
                        onPress={() => this.onUnplanVisitModal()}
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
                    // onPress={() => this.onUnplanVisit()}
                    />
                </View> */}
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
            if (allItems[i].contactId == item.contactId) {
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
            } else {
                allItems[i].showHide = false
            }
        }
        this.state.allCustomerList = allItems;
        this.setState({ allCustomerList: this.state.allCustomerList })
    }


    phonePress = () => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    onReschedulePjp = (item) => {
        this.setState({ selectItem: item, isVisibleRescheduleModal: true })
    }
    onCloseReschedulePjp = () => {
        this.setState({
            isVisibleRescheduleModal: false,
            selectedDateObj: {
                rawDate: new Date(),
                date: ""
            },
            rescheduleDatePicker: false,
            rescheduleReason: "",
            selectItem: {},
            rescheduleReasonActive: false
        })
    }

    renderPjpList = (item, key) => {
        return (
            <View key={key}>
                <View style={{ flex: 1, marginHorizontal: '2%' }}>
                    {this.listSec(item, key)}
                </View>
            </View>
        );
    };
    listSec = (item, key) => {
        return (
            <View style={{}} key={key}>
                <TouchableOpacity style={item.showHide ? styles.inActiveboxshadowColor : styles.activeBoxshadowColor} onPress={() => this.onDetailsScreen(item)} activeOpacity={0.9}>

                    {/* <TouchableOpacity style={item.showHide ? styles.inActiveboxshadowColor : styles.activeBoxshadowColor} onPress={() => this.showHide(item)} activeOpacity={0.9}> */}
                    <View style={styles.userSec}>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <View style={{ height: 18, width: 18, backgroundColor: Color.COLOR.RED.AMARANTH, justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                                <SvgComponent svgName={"love"} height={10} width={10} />
                            </View>
                        </View>
                        <Image source={{ uri: App_uri.IMAGE_URI + item.profilePic }} style={styles.userImage} />
                    </View>
                    <View style={styles.userTextSec}>
                        <Text style={styles.nameText}>{item.shopName.length > 0 ? item.shopName : item.organizationName && item.organizationName.length > 0 ? item.organizationName : item.visitto}</Text>
                        <Text style={styles.dgText}>{item.contactTypeDataName}</Text>
                        <Text style={styles.dgText}><Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: 12 }}>Planned Date : </Text>{item.plannedDateData}</Text>

                    </View>
                    <View style={{ marginRight: 5 }}>
                        <TouchableOpacity style={{ borderRadius: 25, backgroundColor: Color.COLOR.RED.AMARANTH, paddingHorizontal: 10, paddingVertical: 5, alignItems: "center", justifyContent: "center" }} onPress={() => this.onReschedulePjp(item)}>
                            <Text style={styles.rescheduleTxt}>Reschedule</Text>

                        </TouchableOpacity>
                    </View>

                    {/* <View style={styles.mSec}>
                        <View>
                            <SvgComponent svgName={"stopwatch"} strokeColor={"#0D9478"} height={20} width={20} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <SvgComponent svgName={"location_with_route"} strokeColor={"#747C90"} height={20} width={20} />
                                <Text style={styles.kmText}>30 KM.</Text>
                            </View>
                            <Text style={styles.fromText}>from here</Text>
                        </View>
                    </View> */}
                    {/* <View style={styles.dropdownSec}>
                        {item.showHide ?
                            <Image source={ImageName.UP_ARROW_WITH_GREY_CIRCLE} style={{ height: 36, width: 36, resizeMode: "contain" }} />
                            :
                            <SvgComponent svgName={"downArrow"} height={20} width={20} />
                        }
                    </View> */}
                </TouchableOpacity>
                {item.showHide ?
                    <View style={styles.boxshadowOpen}>
                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <TouchableOpacity style={styles.actionSecImg} onpress={() => this.phonePress()} >
                                <SvgComponent svgName={"telephone"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actionSec}>
                            <TouchableOpacity style={styles.actionSecImg} onPress={() => this.onOpenModal("tenDaysVisit", item)} activeOpacity={0.9}>
                                <SvgComponent svgName={"achiveBook"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionSecImg} onPress={() => this.onOpenModal("reschedule", item)} activeOpacity={0.9}>
                                <SvgComponent svgName={"refresh"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionSecImg} onPress={() => this.onOpenModal("visitCancel", item)} activeOpacity={0.9}>
                                <SvgComponent svgName={"cross"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionSecImg} onPress={() => this.onOpenModal("visitStatus", item)} activeOpacity={0.9}>
                                <SvgComponent svgName={"tick"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                        </View>
                    </View> :
                    null
                }
            </View>
        )
    }

    onDetailsScreen = (item) => {
        if (this.props.Sales360Redux.attendanceData.isAttendance == "1") {
            if (item.plannedDateData == DateConvert.formatDDMMYYYY(new Date())) {
                this.props.navigation.navigate("OutletDetailsPage", { item: item })
            } else {
                Toaster.ShortCenterToaster("Your Planned date is " + item.plannedDateData)
            }
        } else if (this.props.Sales360Redux.attendanceData.isAttendance == "2") {
            Toaster.ShortCenterToaster("You have mark your Attendance for the day!")
        } else {
            Toaster.ShortCenterToaster("Please mark your Attendance !")
        }
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
                    {/* <TouchableOpacity style={styles.mSec} onPress={() => this.onDetailsScreen(item)} activeOpacity={0.9}>
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
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.dropdownSec} onPress={() => this.showHideCustomer(item)} activeOpacity={0.9}>
                        {item.showHide ?
                            <Image source={ImageName.UP_ARROW_WITH_GREY_CIRCLE} style={{ height: 32, width: 32, resizeMode: "contain" }} />
                            :
                            <SvgComponent svgName={"downArrow"} height={16} width={16} />
                        }
                    </TouchableOpacity>
                </View>
                {item.showHide ?
                    <View style={styles.boxshadowOpen}>
                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <TouchableOpacity style={styles.actionSecImg} onpress={() => this.phonePress()} >
                                <SvgComponent svgName={"telephone"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actionSec}>
                            <TouchableOpacity style={styles.actionSecImg} onPress={() => this.onOpenModal("tenDaysVisit", item)} activeOpacity={0.9}>
                                <SvgComponent svgName={"achiveBook"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionSecImg} onPress={() => this.onOpenModal("reschedule", item)} activeOpacity={0.9}>
                                <SvgComponent svgName={"refresh"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionSecImg} onPress={() => this.onOpenModal("visitCancel", item)} activeOpacity={0.9}>
                                <SvgComponent svgName={"cross"} strokeColor={"#F13748"} height={15} width={15} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionSecImg} onPress={() => this.onOpenModal("visitStatus", item)} activeOpacity={0.9}>
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
    renderCusmoterLoader = () => {
        return this.state.customerListLoader ? (
            <View style={{ marginBottom: 500 }}>
                <Loader type={"normal"} />
            </View>
        ) : (
            <View style={{ marginBottom: 500 }} />

        );
    };

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
        if (this.state.customerListLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { customerListLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.isApiCall) {
                    this._apiCallCustomerRes();
                } else {
                    this.setState({ customerListLoader: false })
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
    addUnplannedVisitSec = () => {
        const onSearch = (value) => {
            this.setState({ searchText: value })
        }
        const onPressSearchIcon = async () => {
            // if (this.state.searchText.length > 0) {
            await this._onSetChangeData();
            await this._apiCallCustomerRes();
            // }

        }
        return (
            <>
                <View style={{ flexDirection: 'row', marginTop: 18 }}>
                    <View style={{ flex: 1 }} />
                    <View style={{ width: 40 }} />
                    <View style={{ flex: 1 }}>
                        <BigTextButton
                            text={"Add Unplan Visit"}
                            backgroundColor={"#fff"}
                            additionalStyles={styles.buttonAdditionalStyle}
                            borderRadius={26}
                            height={35}
                            fontColor={Color.COLOR.BLUE.LOTUS_BLUE}
                            fontSize={FontSize.XS}
                            onPress={() => this.onUnplanVisitModal()}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 50 }}>
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

    onCreatePjp = () => {
        this.setState({ visiblePjpModal: true })
        // this.props.navigation.navigate("CreatePjp")
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

    onUnplanVisitModal = () => {
        this.setState({
            unplanVisitModal: !this.state.unplanVisitModal
        })
    }

    setVisiblePjpModal = (type) => {
        this.setState({ visiblePjpModal: type })
    }

    onRefresh = async () => {
        await this.setInitialState()
        await this._apiCallRes()
    }

    setInitialState = async () => {
        this.setState({
            pjpAllList: [],
            limit: 10,
            pageNum: 0,
            maxpjpList: "0",
            mainPageLoader: true,
            pageLoader: true,
            listLoader: true,
            // refreshing: true,
            isApiCall: true,
        })
    }

    // for filter the data
    filterData = async (data) => {
        this.state.customerIdArr = data.customerIdArr;
        this.state.fromDate = data.fromDateObj.rawFromDate.toString().length > 0 ? DateConvert.formatYYYYMMDD(data.fromDateObj.rawFromDate) : ""
        this.state.toDate = data.toDateObj.rawToDate.toString().length > 0 ? DateConvert.formatYYYYMMDD(data.toDateObj.rawToDate) : ""
        this.state.recordType = Object.keys(data.selectedRecordType).length > 0 ? data.selectedRecordType.id.toString() : "1";
        this.state.assignedId = Object.keys(data.selectedSubordinateId).length > 0 ? data.selectedSubordinateId.id.toString() : "";
        this.state.subordinateIdArr = Object.keys(data.selectedSubordinateId).length > 0 ? [data.selectedSubordinateId.id.toString()] : [];
        this.state.type = Object.keys(data.selectedTimePeriod).length > 0 ? data.selectedTimePeriod.id.toString() : "1"

        this.setState(this.state);
        this.onRefresh();
    }

    onResetFilterData = async () => {
        this.state.customerIdArr = [];
        this.state.fromDate = "";
        this.state.toDate = "";
        this.state.type = "1"
        this.setState(this.state);
        this.onRefresh();
    }

    modalSec = () => {
        const _onChangeRescheduleDescription = (value) => {
            this.state.rescheduleReason = value;
            this.setState({
                rescheduleReason: this.state.rescheduleReason
            })
        }
        const _onRescheduleDatePicker = (value) => {
            this.state.rescheduleDatePicker = value;
            this.setState({
                rescheduleDatePicker: this.state.rescheduleDatePicker
            })
        }
        const _onSelectDate = (date) => {
            this.state.selectedDateObj.rawDate = date.date;
            this.state.selectedDateObj.date = DateConvert.formatYYYYMMDD(date.date);
            this.setState({
                selectedDateObj: this.state.selectedDateObj
            });
            _onRescheduleDatePicker(false);
        }
        const _onRescheduleDate = async () => {
            if (this.state.selectedDateObj.date.length == 0) {
                Toaster.ShortCenterToaster("Please select reschedule date !");
            } else if (this.state.rescheduleReason.length == 0) {
                Toaster.ShortCenterToaster("Please enter a reason !");
            } else {
                this.setState({ rescheduleLoader: true });
                let reqdata = {
                    "fieldVisitId": this.state.selectItem.fieldVisitId,
                    "pjpDate": this.state.selectedDateObj.date,
                    "desc": this.state.rescheduleReason
                }
                let responseData = await MiddlewareCheck("reschedulePJP", reqdata);
                if (responseData) {
                    if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.data.message);
                        this.onCloseReschedulePjp();
                        await this.onRefresh();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message);
                    }
                }
                this.setState({ rescheduleLoader: false });
            }
        }
        return (
            <>
                <UnplanVisitModal isVisible={this.state.unplanVisitModal}
                    onCloseModal={() => this.onUnplanVisitModal()}
                    props={this.props}
                />
                {this.state.visiblePjpModal ?
                    <>
                        <PjpAddModal
                            {...this.props}
                            visibleModal={this.state.visiblePjpModal}
                            onPjpModalClose={() => this.setVisiblePjpModal(!this.state.visiblePjpModal)}
                        // navigation={navigation}
                        />
                    </>
                    :
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
                {this.state.isVisibleRescheduleModal ?
                    <>
                        <BottomModal
                            isVisible={this.state.isVisibleRescheduleModal}
                            // onRequestClose={() => this.onRequestCloseModal()}
                            // onBackdropPress={() => this.onBackDropPressModal()}
                            // onBackButtonPress={() => this.onBackButtonPressModal()}
                            children={
                                <View style={styles.modalview}>
                                    <View style={{ marginTop: 10, paddingBottom: 50 }}>
                                        <View style={{ marginHorizontal: "10%" }}>
                                            <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 5 }}>
                                                <Text style={styles.rescheduleHeaderTxt}>Reschedule</Text>
                                            </View>
                                            <View style={{ borderBottomWidth: 1, borderBottomColor: Color.COLOR.BLUE.LOTUS_BLUE }} />
                                            <TouchableOpacity style={styles.inputBoxStyle} onPress={() => _onRescheduleDatePicker(true)} activeOpacity={0.9}>
                                                <Text style={[styles.inputBoxText, this.state.selectedDateObj.date.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>
                                                    {this.state.selectedDateObj.date.length == 0 ? "yyyy-mm-dd" : this.state.selectedDateObj.date}
                                                </Text>
                                                <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                                                </View>
                                            </TouchableOpacity>
                                            <DatePicker
                                                modal
                                                open={this.state.rescheduleDatePicker}
                                                minimumDate={new Date()}
                                                date={this.state.selectedDateObj.rawDate}
                                                mode={"date"}
                                                onConfirm={(date) => {
                                                    _onSelectDate({ date })
                                                }}
                                                onCancel={() => {
                                                    _onRescheduleDatePicker(false)
                                                }}
                                            />
                                            <View style={{ marginTop: 10 }}>
                                                <TextInputBox
                                                    borderRadius={20}
                                                    value={this.state.rescheduleReason}
                                                    onChangeText={(value) => _onChangeRescheduleDescription(value)}
                                                    placeholder={"Reason"}
                                                    keyboardType={"default"}
                                                    isActive={this.state.rescheduleReasonActive}
                                                    onFocus={() => { this.state.rescheduleReasonActive = true, this.setState({ rescheduleReasonActive: this.state.rescheduleReasonActive }) }}
                                                    onBlur={() => { this.state.rescheduleReasonActive = false, this.setState({ rescheduleReasonActive: this.state.rescheduleReasonActive }) }}
                                                    height={90}
                                                    multiline={true}
                                                    returnKeyType={'default'}
                                                    alignItems={"flex-start"}
                                                // editable={this.state.allPageData.selectedCustomerSourceTypeObj.id == "1" ? false : true}
                                                />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 25, alignItems: "center", justifyContent: "center" }}>
                                                {this.state.rescheduleLoader ?
                                                    <ActivityIndicator size={"large"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                                                    :
                                                    <>
                                                        <TouchableOpacity style={styles.cancelButton}
                                                            onPress={() => this.onCloseReschedulePjp()}
                                                            activeOpacity={0.9}>
                                                            <Text style={styles.cancelText}>Cancel</Text>
                                                        </TouchableOpacity>
                                                        <View style={{ marginLeft: '5%' }} />
                                                        <TouchableOpacity style={styles.priorityChangeButton} onPress={() => _onRescheduleDate()} activeOpacity={0.9}>
                                                            <Text style={styles.cancelText}>Ok</Text>
                                                        </TouchableOpacity>
                                                    </>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            }
                        />
                    </>
                    :
                    null
                }
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onFilterData={(data) => this.filterData(data)} onReset={() => this.onResetFilterData()} onDownloadData={() => this.onDownload()} onSearchData={() => this.onSearch()} isVisibleFilter={true} />
                {this.modalSec()}


                {this.state.mainPageLoader ?
                    <Loader />
                    :
                    <>
                        {/* {this.state.pjpAllList.length > 0 ? null :
                            <View style={{ backgroundColor: "#FFDBDF", paddingVertical: 5, paddingHorizontal: 10, flexDirection: "row", alignItems: "center" }}>
                                <Image source={ImageName.AlERT_ICON} style={{ height: 14, width: 14, resizeMode: "contain" }} />
                                <Text style={styles.alertTxt}>You Don't have any pre schedule visit today</Text>
                            </View>
                        } */}
                        <View style={{ marginHorizontal: 15 }}>
                            <View>
                                {this.state.pageLoader ?
                                    <View >
                                        <SkeletonPlaceholder>
                                            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                                {this.ViewSkeletonPlaceholder()}
                                            </ScrollView>
                                        </SkeletonPlaceholder>
                                    </View> :
                                    <>
                                        {this.state.pjpAllList.length > 0 ?
                                            <FlatList
                                                data={this.state.pjpAllList}
                                                renderItem={({ item, index }) => this.renderPjpList(item, index)}
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
                                                <View style={{ height: Dimension.height, marginTop: 20 }}>
                                                    <NoDataFound />
                                                </View>
                                            </React.Fragment>
                                        }
                                    </>
                                }
                            </View>
                            < View style={{ marginTop: 20 }} />
                        </View >

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
                                        <TouchableOpacity style={{ borderRadius: 25, backgroundColor: Color.COLOR.RED.AMARANTH, paddingHorizontal: 10, paddingVertical: 5, alignItems: "center", justifyContent: "center" }} onPress={() => this.onCreatePjp()}>
                                            <Text style={styles.makePjpTxt}>Make a PJP</Text>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
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
        stateUserInformation
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PjpVisit);