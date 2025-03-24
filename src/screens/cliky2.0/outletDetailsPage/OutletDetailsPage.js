import React from "react";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from '../../../enums';
import styles from './Style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Platform,
} from 'react-native';
import {
    stateUserInformation,
    stateCheckForNetwork,
    stateCartData
} from '../../../redux/Sales360Action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BigTextButton from "../../../shared/big-text-button";
import { ErrorCode } from "../../../services/constant";
import { DateConvert, FileUpload, GetUserData, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { MiddlewareCheck, MiddlewareFileCheck } from "../../../services/middleware";
import { _modifyAddDataArr, modListData } from "./Function";
import { VisitModal } from "../../../pageShared";
import { LastTenVisits, OrderHistory, OtherInfo, SalesReport } from "./sub-component";
import { BottomModal, CustomCamera, DropdownInputBox, ImageUploadModal, NoDataFound, TextInputBox, VirtualizedView } from "../../../shared";
import { ActivityIndicator } from "react-native";
import { ClientSettings, UserAccessPermission } from "../../../services/userPermissions";
import { App_uri, DeviceInfo, Regex } from "../../../services/config";
import SvgComponent from "../../../assets/svg";
import { DataValidator } from "../../../validators";

let tabData = [
    {
        id: 1,
        tabText: "Sales Report",
        check: true
    },
    {
        id: 2,
        tabText: "Order History",
        check: false
    },
    {
        id: 3,
        tabText: "Other Info",
        check: false
    },
    {
        id: 4,
        tabText: "Last 10 Visits",
        check: false
    },

]


let oflinetabData = [
    // {
    //     id: 1,
    //     tabText: "Sales Report",
    //     check: true
    // },
    {
        id: 2,
        tabText: "Order History",
        check: true
    },

]

class OutletDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            popUpModal: false,
            popUpType: "",
            // tabData: tabData,
            tabPress: true,
            visitModal: false,
            submitLoader: false,

            prevPropsData: this.props.route.params.prevProps ? this.props.route.params.prevProps : {},
            prevSelectedItem: this.props.route.params.item,
            prevApiResData: this.props.route.params.item ? this.props.route.params.item : {},

            tabData: [],
            selectedTabObj: {},
            permissionData: {
                order: {}
            },
            salesReportData: {},

            visibleProfileImgUploadModal: false,
            cameraVisible: false,
            profileImgLoader: false,
            profileImg: "",
            profileRaw: "",
            visitIsVisiable: {},
            isOffline: false,
            networkCheck: false,
            addOrderLoader: false,

            isVisibleGiftModal: false,
            giftBtnLoader: false,
            submitGiftLoader: false,
            giftArr: [],
            giftRequestArr: [{ selectedGiftTypeObj: {}, quantity: "", quantityActive: false }]

        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                let offlineCheck = await ClientSettings.OfflineAccess.getOfflineAccess();
                let getImgData = await StorageDataModification.imageData({}, "get");
                this.state.isOffline = offlineCheck;
                if (getImgData !== undefined && getImgData !== null && getImgData[this.props.route.params.item.id] && getImgData[this.props.route.params.item.id].outlet) {
                    this.state.profileImg = getImgData[this.props.route.params.item.id].outlet.uri;
                }
                this.state.tabData = offlineCheck ? oflinetabData : tabData
                this.state.permissionData.order = await UserAccessPermission.ORDER.orderPermission(this.props);
                this.setState(this.state);
                this._load();
            })
    }

    // this is the first function where set the state data
    _load = async () => {
        this.setLabelName(this.state.tabData);
        this.state.networkCheck = await DeviceInfo.CheckConnection();
        await this.getGiftListData()
        this.state.pageloader = false;
        this.setState(this.state);
    }


    getGiftListData = async () => {
        let reqData = {
            "searchText": "",
            "isGiftApproved": 1
        }
        let responseData = await MiddlewareCheck("getGiftStockList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modListData(responseData.response)
                this.setState({
                    giftArr: modData.list,
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    // for label change
    setLabelName = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].check == true) {
                this.state.selectedTabObj = arr[i]
            }
        }
        this.setState(this.state);
    }

    // for back the page
    onBack = () => {
        this.props.navigation.goBack();
    }

    onOpenAndClosePopUp = (type) => {
        if (this.state.popUpModal == false) {
            this.setState({
                popUpModal: true,
                popUpType: type
            })
        } else {
            this.setState({
                popUpModal: false,
            })
        }
    }

    onVisitNote = () => {
        if (this.state.isVisitNoteAdded) {
            Toaster.ShortCenterToaster("You have already added visit note !")
        } else {
            this.props.navigation.navigate("VisitNote", { data: this.props.route.params.data, onVisitNoteAdd: this._onVisitNoteAdd })
        }
    }

    onSelectOrder = () => {
        if (this.props.route.params.data.ERPCode == "" || this.props.route.params.data.ERPCode == null) {
            Toaster.ShortCenterToaster("No Data Found !")
        } else {
            this.props.navigation.navigate("OrderList", { data: this.props.route.params.data })
        }
    }
    // for order section
    _onOrder = () => {
        // this.props.navigation.navigate("OrderProductList", { type: "OrderProductList", data: this.props.route.params.data, flow: "fromRouteVisit" });
    }

    // for tab change this function used
    selectedTab = (item, key) => {
        let allItems = this.state.tabData;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].id == item.id) {
                allItems[i].check = true
            } else {
                allItems[i].check = false
            }
        }
        this.state.tabData = allItems;
        this.state.selectedTabObj = item;
        this.setState(this.state);

    }

    // for add order this function used
    addOrder = async () => {
        if (this.state.permissionData.order.addPem) {
            await this.checkNoOrderVisit()

        } else {
            Toaster.ShortCenterToaster("Access Denied !")
        }
    }

    checkNoOrderVisit = async () => {
        if (this.state.isOffline) {
            let reqData = {
                ...this.props.route.params.item,
                "locationData": [
                    {
                        "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId,
                        "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId
                    }
                ]
            };
            this.props.stateCartData({ "allCart": [] });
            this.props.navigation.navigate("OrderProductList", { type: "OutletDetailsPage", data: reqData, flow: "fromRouteVisit" });
        } else {
            this.setState({ addOrderLoader: true })
            let reqData = {
                "fieldVisitId": this.props.route.params.item.fieldVisitId
            }

            let responseData = await MiddlewareCheck("getNoOrderVisitStatusChecking", reqData, this.props);
            if (responseData) {
                if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    let reqData = {
                        ...this.props.route.params.item,
                        "locationData": [
                            {
                                "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId,
                                "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId
                            }
                        ]
                    };
                    this.props.stateCartData({ "allCart": [] });
                    this.props.navigation.navigate("OrderProductList", { type: "OutletDetailsPage", data: reqData, flow: "fromRouteVisit" });

                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ addOrderLoader: false })
        }


    }

    // for add visit note
    onAddVisitNote = () => {
        let reqData = {
            ...this.props.route.params.item,
            "locationData": [{ "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId, "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId }]
        };
        this.props.navigation.navigate("VisitNote", { data: reqData, onVisitNoteAdd: this._onVisitNoteAdd })
    }

    _onVisitNoteAdd = () => {
    }

    // for visit notes modal open and close this function used
    onNoOrder = () => {
        this.setState({
            visitModal: !this.state.visitModal
        })
    }

    closeVisitModal = () => {
        this.setState({
            visitModal: false
        })
    }

    onGift = async () => {
        let reqData = {
            "fieldVisitId": this.props.route.params.item.fieldVisitId
        }
        this.setState({ giftBtnLoader: true })
        let responseData = await MiddlewareCheck("getNoOrderVisitStatusChecking", reqData, this.props);
        if (responseData) {
            if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({ isVisibleGiftModal: true })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ giftBtnLoader: false })

    }

    // for visit notes submit button  press
    onSubmitVisitNote = async (value) => {
        let locationData = [
            {
                "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId,
                "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId
            }
        ]
        let errorCount = 0;
        if (value.selectVisitStatus.id == undefined || value.selectVisitStatus.id == null || value.selectVisitStatus.id == "") {
            Toaster.ShortCenterToaster("Please select Status !")
            errorCount++
        } else if (value.selectCategoryObj.id == undefined || value.selectCategoryObj.id == null || value.selectCategoryObj.id == "") {
            Toaster.ShortCenterToaster("Please select category name !")
            errorCount++
        } else if (value.subCategory.length > 0 && (value.selectSubCategoryObj.id == undefined || value.selectSubCategoryObj.id == null)) {
            Toaster.ShortCenterToaster("Please Select Sub-Category!");
            errorCount++;
        } else if (value.subCategory.length == 0 && value.description.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.NEW_NOTES.DESCRIPTION_ERROR);
            errorCount++;
        }

        if (errorCount === 0) {
            let allNotes = [];
            allNotes.push({
                categoryName: value.selectCategoryObj.name ? value.subCategory.length > 0 ? value.selectCategoryObj.name : value.selectCategoryObj.name : "",
                note: value.description.length > 0 ? value.description : value.selectSubCategoryObj.name
            })
            let isCust = "";
            if (this.props.route.params.item.isInfulencer.toString() == "0" || this.props.route.params.item.isInfulencer.toString() == "1" || this.props.route.params.item.isInfulencer.toString() == "7") {
                isCust = "1";
            } else {
                isCust = "0";
            }
            let reqData = {
                "visitImg": value.visitImg == undefined || value.visitImg == null ? "" : value.visitImg,
                "fieldVisitId": this.props.route.params.item.fieldVisitId,
                "status": value.selectVisitStatus.id ? value.selectVisitStatus.id : "",
                "visitNotes": allNotes,
                "visitorsId": [this.props.Sales360Redux.userInfo.details.userId],
                "customerId": this.props.route.params.item.id,
                "isProject": this.props.route.params.item.isProject,
                "isCustomer": isCust,
                "nxtFollowUpDate": value.dateObj.selectedDate.length > 0 ? DateConvert.formatYYYYMMDD(value.dateObj.rawDate) : "",
                "hierarchyDataIdArr": locationData
            }
            if (this.state.isOffline) {
                this.setState({ submitLoader: true })
                let storageData = await StorageDataModification.customerOrderANdVisitData({}, "get");
                if (storageData) {
                    storageData[this.props.route.params.item.id].visitNoteData = reqData;
                    await StorageDataModification.customerOrderANdVisitData(storageData, "store");
                    let responseData = { "message": "Success" };
                    Toaster.ShortCenterToaster("Visit Notes Added Successfuly");
                    this.closeVisitModal();
                    this.setState({ visitIsVisiable: responseData });
                }
            } else {
                this.setState({ submitLoader: true })
                let responseData = await MiddlewareCheck("fieldVisitAdd", reqData, this.props);
                if (responseData) {
                    if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                        Toaster.ShortCenterToaster(responseData.data.message)
                        this.closeVisitModal();
                        this.setState({ visitIsVisiable: responseData });
                    }
                }
            }
            this.setState({ submitLoader: false })
        }
    }

    // this is modal design 
    modalSec = () => {
        if (this.state.visitModal) {
            return (
                <VisitModal isVisible={this.state.visitModal}
                    props={this.props}
                    onCloseModal={() => this.closeVisitModal()}
                    type={"visitStatus"}
                    data={this.state.prevSelectedItem}
                    onSubmitVisitNote={(value) => this.onSubmitVisitNote(value)}
                    isLoading={this.state.submitLoader}
                />
            )
        } else {
            return null;
        }
    }

    onCloseGiftModal = () => {
        this.setState({ isVisibleGiftModal: false })
    }


    _onChangeQuantity = (value, index) => {
        let newText = "";

        if (value.startsWith('0')) {
            // If it starts with '0', you can set newText to an empty string or handle it differently
            newText = "";
        } else {
            // If it does not start with '0', proceed to validate each character
            for (let i = 0; i < value.length; i++) {
                // Assuming you want to allow only numeric characters 1-9
                if (/^[0-9]$/.test(value[i])) {
                    newText = newText + value[i];
                }
            }
        }

        this.state.giftArr[index].newQuantity = newText
        this.setState({ giftArr: this.state.giftArr })
    }

    modReqGiftData = (arrData) => {
        let arr = []
        for (let i = 0; i < arrData.length; i++) {
            let obj = {
                "giftTypeId": arrData[i].id,
                "quantity": parseInt(arrData[i].newQuantity),
                "remarks": ""
            }

            arr.push(obj)
        }
        return arr
    }

    onSubmitGift = async () => {
        let c = 0;
        let quantityValidCheckCounter = 0;
        for (let i = 0; i < this.state.giftArr.length; i++) {
            if (this.state.giftArr[i].newQuantity.length == 0) {
                c++;
            }
        }
        if (c == this.state.giftArr.length) {
            Toaster.ShortCenterToaster("Please add Quantity!")
        } else {
            const updatedItems = this.state.giftArr.filter(item => item.newQuantity.length > 0);
            for (let i = 0; i < updatedItems.length; i++) {
                if (parseInt(updatedItems[i].newQuantity) > parseInt(updatedItems[i].qty)) {
                    quantityValidCheckCounter++;
                }
            }
            if (quantityValidCheckCounter > 0) {
                Toaster.ShortCenterToaster("You don't have enough Quantity!")
            } else {
                this.setState({ submitGiftLoader: true })
                let reqData = {
                    fieldVisitId: this.props.route.params.item.fieldVisitId,
                    customerId: this.props.route.params.item.id,
                    giftDetails: this.modReqGiftData(updatedItems)
                }
                let responseData = await MiddlewareCheck("addEmpVisitGifts", reqData, this.props)
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message)
                        this.setState({
                            isVisibleGiftModal: false,
                            giftArr: []
                        })
                        await this.getGiftListData()
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }
                this.setState({ submitGiftLoader: false })
            }

        }

    }

    giftModalSec = () => {
        return (
            <>
                {this.state.isVisibleGiftModal ?
                    <>
                        <BottomModal
                            isVisible={this.state.isVisibleGiftModal}
                            children={
                                <View style={styles.modalview}>
                                    <TouchableOpacity style={styles.dropdownSec} onPress={() => this.onCloseGiftModal()} >
                                        <SvgComponent svgName={"cross"} strokeColor={"#fff"} height={15} width={15} />
                                    </TouchableOpacity>
                                    <View>
                                        <ScrollView>
                                            <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 20, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 5 }}>
                                                    <View style={{ flex: 0.25, paddingLeft: 10 }}>
                                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.RAILWAY.BOLD, fontSize: FontSize.SM }}>Category</Text>

                                                    </View>
                                                    <View style={{ flex: 0.25, alignItems: "center" }}>
                                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.RAILWAY.BOLD, fontSize: FontSize.SM, textAlign: "center" }}>Item</Text>

                                                    </View>
                                                    <View style={{ flex: 0.25, alignItems: "center" }}>
                                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.RAILWAY.BOLD, fontSize: FontSize.SM, textAlign: "center" }}>Available Qty</Text>

                                                    </View>
                                                    <View style={{ flex: 0.25, alignItems: "center" }}>
                                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.RAILWAY.BOLD, fontSize: FontSize.SM }}>Qty</Text>
                                                    </View>
                                                </View>
                                                {this.state.giftArr.length == 0 ? <View style={{ height: 350, marginTop: 50 }}>
                                                    <NoDataFound />
                                                </View> : <>
                                                    {this.state.giftArr.map((item, key) => (
                                                        <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10, marginHorizontal: 10 }} key={key} >
                                                            <View style={{ flex: 0.3 }}>
                                                                <View style={{ alignItems: "flex-start", paddingHorizontal: 10 }}>
                                                                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.RAILWAY.BOLD, fontSize: FontSize.SM }}>{item.desc}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ width: 5 }} />
                                                            <View style={{ flex: 0.3 }}>
                                                                <View style={{ alignItems: "flex-start", paddingHorizontal: 10 }}>
                                                                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.RAILWAY.BOLD, fontSize: FontSize.SM }}>{item.name}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ width: 5 }} />
                                                            <View style={{ flex: 0.2 }}>
                                                                <TextInputBox
                                                                    placeholder={"QTY*"}
                                                                    value={item.qty}
                                                                    borderRadius={25}
                                                                    height={45}
                                                                    maxLength={6}
                                                                    activeBGColor={"#F0F4F7"}
                                                                    inactiveBGColor={"#F0F4F7"}
                                                                    editable={false}
                                                                />
                                                            </View>
                                                            <View style={{ width: 5 }} />
                                                            <View style={{ flex: 0.25 }}>
                                                                <TextInputBox
                                                                    placeholder={"QTY*"}
                                                                    value={item.newQuantity}
                                                                    borderRadius={25}
                                                                    height={45}
                                                                    onChangeText={(value) => this._onChangeQuantity(value, key)}
                                                                    // isActive={item.quantityActive}
                                                                    // onFocus={() => { item.quantityActive = true; this.setState({ giftRequestArr: this.state.giftRequestArr }) }}
                                                                    // onBlur={() => { item.quantityActive = false; this.setState({ giftRequestArr: this.state.giftRequestArr }) }}
                                                                    maxLength={5}
                                                                    activeBGColor={"#F0F4F7"}
                                                                    inactiveBGColor={"#F0F4F7"}
                                                                    additionalBoxStyle={{ borderWidth: 0.5, borderColor: Color.COLOR.BLACK.BLACK_PEARL }}
                                                                />
                                                            </View>
                                                        </View>
                                                    ))}
                                                </>}


                                            </View>
                                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                                                {this.state.submitGiftLoader ? <ActivityIndicator /> :
                                                    <TouchableOpacity onPress={() => this.onSubmitGift()} style={{ backgroundColor: Color.COLOR.RED.AMARANTH, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20 }}>
                                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.RAILWAY.BOLD, fontSize: FontSize.MD }}>Submit</Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                            <View style={{ height: 50 }} />
                                        </ScrollView>


                                    </View>
                                </View>
                            }
                        />
                    </>
                    : null}
            </>
        )
    }

    // for footer section this function 
    footerSec = () => {
        return (
            <View style={styles.footerSec}>
                <View style={{ flex: 0.5 }}>
                    <BigTextButton
                        text={"Visit Note"}
                        backgroundColor={"#1F2B4D"}
                        borderRadius={22}
                        fontSize={12}
                        onPress={() => this.onNoOrder()}
                    // isDisabled={this.state.visitIsVisiable.message == "Success" ? true : false}
                    />
                </View>

                <View style={{ width: 5 }} />
                <View style={{ flex: 0.5 }}>
                    {this.state.giftBtnLoader ?
                        <View>
                            <ActivityIndicator size={"small"} />
                        </View>
                        :
                        <BigTextButton
                            text={"Gift"}
                            backgroundColor={Color.COLOR.ORANGE.PURE_ORANGE}
                            borderRadius={22}
                            fontSize={12}
                            onPress={() => this.onGift()}
                        // isDisabled={this.state.visitIsVisiable.message == "Success" ? true : false}
                        />
                    }
                </View>
                <View style={{ width: 5 }} />
                <View style={{ flex: 0.5 }}>
                    {this.state.addOrderLoader ?
                        <View>
                            <ActivityIndicator size={"small"} />
                        </View>
                        :
                        <BigTextButton
                            text={"Add Order"}
                            borderRadius={22}
                            fontSize={12}
                            onPress={() => this.addOrder()}
                        />
                    }

                </View>
            </View>
        )
    }

    //header section design
    headerSec = () => {
        return (
            <View style={styles.headerSec}>
                <TouchableOpacity style={{ flex: 0.1 }} activeOpacity={0.9} onPress={() => this.onBack()}>
                    <Image source={ImageName.BACK_IMG} style={styles.BackImg} />
                </TouchableOpacity>
                <View style={styles.business_imgSec}>
                    <View style={styles.imgUriSec}>
                        <Image source={{ uri: App_uri.IMAGE_URI + this.state.prevSelectedItem.profilePic }} style={styles.uriImg} />
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <Text style={styles.businessNameTxt} numberOfLines={1}>{this.state.prevSelectedItem.custBusinessName ? this.state.prevSelectedItem.custBusinessName : this.state.prevSelectedItem.organizationName ? this.state.prevSelectedItem.organizationName : this.state.prevSelectedItem.customerName ? this.state.prevSelectedItem.customerName : this.state.prevSelectedItem.visitto}</Text>
                    </View>
                </View>
                {/* <View activeOpacity={0.9} style={{ flex: 0.1, backgroundColor: '#F13748', paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 18, height: 35 }}>
                    <Image source={ImageName.SHOPING_ORDER_BOX} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                    <View style={{ width: 5 }} />
                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 2 }}>0</Text>
                </View> */}
            </View>
        )
    };

    onLastTenVisitClick = () => {
        this.props.navigation.navigate("OrderLastTenVisit", { prevProps: this.props.route.params.item })
    }


    onLastTenInvoiceClick = () => {
        // this.props.navigation.navigate("DayWiseReport", { prevProps: this.props.route.params.item });
    }

    onOutletSaleslick = () => {
        // this.props.navigation.navigate("ProductWiseSales", { prevProps: this.props.route.params.item });
    }

    footerButtonSec = () => {
        return (
            <View style={styles.footerBtnSec}>
                <TouchableOpacity style={styles.visitClickTab} onPress={() => this.onLastTenVisitClick()}>
                    <Image source={ImageName.LOCATION_WHITE_LOGO} style={styles.footerBtnImg} />
                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM }}>Last 10 Visit</Text>
                </TouchableOpacity>
                <View style={{ width: 5 }} />
                <TouchableOpacity style={styles.visitClickTab} onPress={() => this.onLastTenInvoiceClick()}>
                    <Image source={ImageName.RECEIPT_LOGO} style={styles.footerBtnImg} />
                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM }}>Last 10 Invoice</Text>
                </TouchableOpacity>
                <View style={{ width: 5 }} />

                <TouchableOpacity style={styles.visitClickTab} onPress={() => this.onOutletSaleslick()}>
                    <Image source={ImageName.BACKWARD_TEN_SECONDES_LOGO} style={styles.footerBtnImg} />
                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM }}>Outlet Sales</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onSelectTab = (val) => {
        if (val == "stockUpdate") {
            this.props.navigation.navigate("StockUpdatePage", { data: this.props.route.params.item })
        }
    }

    // for profile image upload visible
    _onProfilePicModalVisible = async (type) => {
        this.setState({
            visibleProfileImgUploadModal: type
        })
    }

    // for custom camera open
    onSelectPic = async (value) => {
        await this._onProfilePicModalVisible(false);
        await this.ImageUploadApiCall(value);
    }

    ImageUploadApiCall = async (uploadData) => {
        this.setState({ profileImgLoader: true })
        if (this.state.isOffline) {
            await this.storeOfflineImage(uploadData);
        } else {
            let imgData = await MiddlewareFileCheck("crmImageupload", uploadData, this.props);
            if (imgData) {
                if (imgData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    // this.state.profileImg = imgData.response.fileName;
                    await this._onSaveShopPic(imgData);
                    // this.state.profileRaw = uploadData.uri;
                    // this.setState(this.state);
                }
            }
        }
        this.setState({ profileImgLoader: false })
    }

    // for store offline image data to storage
    storeOfflineImage = async (uploadData) => {
        let getImgData = await StorageDataModification.imageData({}, "get");
        let getVisitData = await StorageDataModification.customerOrderANdVisitData({}, "get");
        uploadData["orderUnicId"] = getVisitData[this.props.route.params.item.id].orderUnicId;
        uploadData["customerId"] = this.props.route.params.item.id;
        this.state.profileImg = uploadData.uri;
        this.setState(this.state);
        if (getImgData == null || getImgData == undefined) {
            let imgData = {};
            imgData[this.props.route.params.item.id] = { "outlet": uploadData };
            await StorageDataModification.imageData(imgData, "store");
        } else {
            let count = 0;
            Object.keys(getImgData).forEach(async key => {
                if (this.props.route.params.item.id == key) {
                    count++;
                }
            });
            if (count == 0) {
                getImgData[this.props.route.params.item.id] = { ...getImgData[this.props.route.params.item.id], ...{ "outlet": uploadData } };
            } else {
                getImgData[this.props.route.params.item.id]["outlet"] = uploadData;
            }
            await StorageDataModification.imageData(getImgData, "store");
        }
    }

    _onSaveShopPic = async (imageUploadData) => {
        let responseData = await MiddlewareCheck("updateCustomerImages", { imageName: imageUploadData.response.fileName, customerId: this.props.route.params.item.id }, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                // let userInfo = this.props.Sales360Redux.userInfo;
                // userInfo.details.profileImgUrl = imageUploadData.response.fileName;
                // this.props.stateUserInformation(userInfo);
                this.setState({
                    profileImg: responseData.response,
                })
                Toaster.ShortCenterToaster(responseData.message);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

    }

    _imageUploadModalSection = () => {
        const OnChooseGallery = async () => {
            this._onProfilePicModalVisible(false)
            let uploadData = await FileUpload.uploadImg();
            await this.ImageUploadApiCall(uploadData);
        }
        const OnChooseCamera = async () => {
            this.setState({ cameraVisible: true });
        }
        return (
            <ImageUploadModal
                isVisible={this.state.visibleProfileImgUploadModal}
                onGallerySelect={(value) => OnChooseGallery(value)}
                onCameraSelect={(value) => OnChooseCamera(value)}
                onCloseModal={(value) => this._onProfilePicModalVisible(value)}
            />
        )
    }

    tabBar = () => {
        return (
            // <React.Fragment>
            //     {/* <ScrollView horizontal> */}
            //         <View style={styles.tabBarSec}>
            //             {this.state.tabData.map((item, key) => (
            //                 <TouchableOpacity style={item.check ? styles.activeTab : styles.inActiveTab} key={key} onPress={() => this.selectedTab(item, key)}>
            //                     <Text style={item.check ? styles.activeText : styles.inActiveText}>{item.tabText}</Text>
            //                 </TouchableOpacity>
            //             ))}
            //         </View>
            //     {/* </ScrollView> */}
            // </React.Fragment>
            <>
                <ScrollView horizontal>
                    <View style={styles.tabBarSec}>
                        {this.state.tabData.map((item, key) => (
                            <TouchableOpacity style={item.check ? styles.activeTab : styles.inActiveTab} key={key} onPress={() => this.selectedTab(item, key)}>
                                <Text style={item.check ? styles.activeText : styles.inActiveText}>{item.tabText}</Text>

                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.cameraVisible ?
                    <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
                    :
                    null
                }
                {this._imageUploadModalSection()}
                {this.headerSec()}
                <View style={{ borderColor: "#000", borderWidth: 0.2 }} />
                {this.modalSec()}
                {this.giftModalSec()}
                {this.state.pageloader ?
                    <View style={styles.loaderSec}>
                        <ActivityIndicator size={"large"} />
                    </View> :
                    <VirtualizedView>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            {/* {this.state.profileImg.length > 0 ? */}
                            <React.Fragment>
                                {this.state.profileImgLoader ?
                                    <View style={styles.profileImgLoaderSec}>
                                        <ActivityIndicator size="large" color={Color.COLOR.RED.AMARANTH} />
                                    </View> :
                                    <ImageBackground source={(this.state.isOffline && this.state.profileImg.length > 0) ? { uri: this.state.profileImg } : (this.state.networkCheck ? (this.state.profileImg ? { uri: App_uri.IMAGE_URI + this.state.profileImg } : { uri: App_uri.IMAGE_URI + this.state.prevApiResData.profilePic }) : ImageName.CHALO_BACHO_LOGO)} style={{ height: 240, width: Dimension.width, resizeMode: 'cover' }}>
                                        <View style={styles.profilePicModal}>
                                            <View style={{ flex: 0.8 }} />
                                            <View style={styles.profilePicModalTabSec} >
                                                <TouchableOpacity style={styles.profilePicModalTab} activeOpacity={0.9} onPress={() => this._onProfilePicModalVisible(true)}>
                                                    <SvgComponent svgName={"camera_with_pencil"} strokeColor={"#fff"} height={30} width={30} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ marginBottom: 15 }} />
                                    </ImageBackground>
                                }
                            </React.Fragment>
                            <View style={{ borderColor: "#000", borderWidth: 0.2 }} />
                            <View style={styles.ptrMrp}>
                                {/* <View style={styles.ptrMrpImgSec}>
                                    <View style={styles.ptrMrpImgsection}>
                                        <Image source={ImageName.CALL_RECEIVED_IMG} style={styles.callRecieveImg} />
                                    </View>
                                    <View style={styles.ptrMrpImgsection}>
                                        <Image source={ImageName.ACHIVED_LOGO} style={styles.achivedImg} />
                                    </View>
                                    <View style={styles.ptrMrpImgsection}>
                                        <Image source={ImageName.GRAPH_LOGO} style={styles.callRecieveImg} />
                                    </View>
                                </View> */}
                                {/* {this.state.isOffline ?
                                    null :
                                    <View style={styles.ptrMrpTxtSec}>
                                        <View style={styles.ptrTxtSec}>
                                            <Text style={styles.ptrMrpTxt}>PTR <Text style={styles.ptrMrpValTxt}>{'\u20B9' + " " + (this.state.prevApiResData.totalAchievement ? this.state.prevApiResData.totalAchievement : "0")}</Text></Text>
                                        </View>
                                        <View style={styles.mrpTxtSec}>
                                            <Text style={styles.ptrMrpTxt}>MRP <Text style={styles.ptrMrpValTxt}>{'\u20B9' + " " + (this.state.prevApiResData.totalTarget ? this.state.prevApiResData.totalTarget : "0")}</Text></Text>
                                        </View>
                                    </View>
                                } */}
                                <View style={{ marginTop: 20, }} />
                                {this.tabBar()}
                                <View style={styles.viewStyle} />
                                {this.state.selectedTabObj.id == 1 ?
                                    <SalesReport {...this.props} /> :
                                    this.state.selectedTabObj.id == 2 ?
                                        <OrderHistory  {...this.props} /> :
                                        this.state.selectedTabObj.id == 3 ?
                                            <OtherInfo  {...this.props} onSelect={(val) => this.onSelectTab(val)} /> :
                                            <LastTenVisits {...this.props} />

                                }
                            </View>
                            <View style={{ marginBottom: 40 }} />
                        </ScrollView>
                    </VirtualizedView>
                }
                {this.footerSec()}
            </SafeAreaView >
        )
    }
};

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateUserInformation,
        stateCheckForNetwork,
        stateCartData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(OutletDetailsPage);