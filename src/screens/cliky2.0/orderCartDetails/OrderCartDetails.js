import React from "react";
import { Image, SafeAreaView, Text, View, TouchableOpacity, Linking } from "react-native";
import { stateCheckForNetwork, stateCartData } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, BottomModal, CheckBox, DropdownInputBox, Loader, Modal, NoDataFound, TextInputBox, VirtualizedView } from "../../../shared";
import { DynamicOrderListPage, DynamicProfileCard, OtpVerifyModal } from "../../../pageShared";
import { MiddlewareCheck } from "../../../services/middleware";
import { deliveryPartnerModifyData, modCartDetailsData, modifyProfileData, pjpModifyData } from "./Function";
import { CommonFunctions, DateConvert, OfflineFunction, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { ErrorCode } from "../../../services/constant";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ScrollView } from "react-native-gesture-handler";
import DatePicker from "react-native-date-picker";
import { DataValidator } from "../../../validators";
import { ClientSettings } from "../../../services/userPermissions";
import { DeviceInfo } from "../../../services/config";
import { maskData } from "../../../services/common-view-function/commonFunctions";

const orderArrData = [
    {
        id: 1,
        name: "Credited",
        shortName: "C"
    },
    {
        id: 2,
        name: "Not Credited",
        shortName: "N"
    },
]

class DealerCartDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            listLoader: false,
            refreshing: true,
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            cartDetailsList: [],
            showHideDeliveryPartner: false,
            totalAmount: 0,
            searchText: "",
            selectedContactTypeId: "",
            deliveryPartnerPageNum: 0,
            deliveryPartnerLimit: 30,
            deliveryPartnerArr: [],
            deliveryPartnerId: {},
            deliveryPartnerLoader: false,
            placeOrderLoader: false,
            propData: this.props.route.params.data,
            prevProps: this.props.route.params.prevProps,
            profileData: {},

            finalCartData: [],

            placeOrderModal: false,

            startDate: "",
            startDateCheck: false,
            statDateRaw: new Date(),

            expectedTime: "",
            expectedRawTime: "",
            timeCheck: false,
            timeRaw: new Date(),

            otpModal: false,

            userData: {},
            otpVirify: "",
            recordNumber: "",
            otpRespoData: {},
            isOffline: false,
            isNetActive: false,
            istelephonic: false,
            isTelephonicData: "0",
            orderTypeArr: orderArrData,
            selectedOrderTypeObj: {}

        };
    }

    // this is a initial function which is call first
    componentDidMount = async () => {

        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this.onInitialStateData();
                await this._load();
            })
    }

    // for set the initial state data 
    onInitialStateData = async () => {
        this.setState({
            cartDetailsList: [],
            totalDataCount: 0,
            finalCartData: []
        })
    }


    // componentWillUnmount() {
    //     this.setState = (state, callback) => {
    //         return;
    //     };
    // }

    // this is the first function where set the state data
    _load = async () => {
        let storageCartData = await StorageDataModification.customerOrderANdVisitData({}, "get")
        // await StorageDataModification.customerCartData({}, "clear")
        this.state.userData = await StorageDataModification.userCredential({}, "get");
        this.state.refreshing = false;
        let offlineCheck = await ClientSettings.OfflineAccess.getOfflineAccess();
        let netCheck = await DeviceInfo.CheckConnection()
        this.state.isOffline = offlineCheck;
        this.state.isNetActive = netCheck
        this.setState(this.state);
        if (offlineCheck) {
            if (this.props.route.params.flow == "fromRouteVisit") {
                await this.setProfileDataOffline()
                await this.setOfflineCartData()
            } else {
                await this.getProfileData();
                await this._onGetAllCartItem();
                await this._deliveryPartnerApiCall();
            }
        } else {
            await this.getProfileData();
            await this._onGetAllCartItem();
            await this._deliveryPartnerApiCall();
        }
    };

    setProfileDataOffline = async () => {
        let cartCountData = 0;
        let storageCartData = await StorageDataModification.customerOrderANdVisitData({}, "get")
        if (storageCartData == null || storageCartData == undefined) {
            cartCountData = 0;
        } else {
            Object.keys(storageCartData).forEach(key => {
                if (key == this.state.prevProps.id) {
                    if (Object.keys(storageCartData[key].orderData).length > 0) {
                        for (let i = 0; i < storageCartData[key].orderData.orderDetails.length; i++) {
                            if (storageCartData[key].orderData.orderDetails[i].isPlaceOrder == false) {
                                cartCountData = cartCountData + 1;
                            }
                        }
                    }
                }
            })
        }
        let obj = {
            title: this.state.prevProps.custBusinessName,
            profileImg: this.state.prevProps.profilePic,
            cartCount: cartCountData
        }
        this.setState({ profileData: obj })
    }

    setOfflineCartData = async () => {
        let storageCartData = await StorageDataModification.customerOrderANdVisitData({}, "get")

        if (storageCartData == null || storageCartData == undefined) {
            this.setState({
                finalCartData: [],
                filterLoader: false,
                pageLoader: false,
                listLoader: false,
                listDataLoader: false
            })
        } else {

            Object.keys(storageCartData).forEach(key => {
                if (this.state.prevProps.id == key) {
                    if (Object.keys(storageCartData[key].orderData).length > 0) {
                        let modDetailsData = modCartDetailsData(storageCartData[key])

                        this.setState({
                            finalCartData: modDetailsData,
                            filterLoader: false,
                            pageLoader: false,
                            listLoader: false,
                            listDataLoader: false
                        })
                    }
                }
                else {
                    this.setState({
                        // finalCartData: [],
                        filterLoader: false,
                        pageLoader: false,
                        listLoader: false,
                        listDataLoader: false
                    })
                }
            })
        }

    }

    // for get the login Data 
    onGetLoginData = async () => {
        let userCredentialData = await StorageDataModification.userCredential({}, "get");
        let respObjData = {};
        if (userCredentialData.productMasterHierarchyTypes && userCredentialData.productMasterHierarchyTypes.length > 0) {
            const trimmedData = userCredentialData.productMasterHierarchyTypes.slice(1, -1);

            // Create the result object
            let resultObject = {};
            trimmedData.forEach((item, index) => {
                resultObject[`${index + 1}stItem`] = item.hmTypDesc;
            });
            respObjData = resultObject;
        }
        return respObjData;
    }


    // for modify the cart data
    onModifyCartData = async (data) => {
        let productItemData = await this.onGetLoginData();
        const transformedData = data.reduce((acc, item) => {
            const primaryCategory = productItemData["1stItem"] ? item.brandData[productItemData["1stItem"]] : "";
            const secondaryCategory = productItemData["2stItem"] ? item.brandData[productItemData["2stItem"]] : "";
            let primaryItem = acc.find(elem => elem.itemName === primaryCategory);
            if (!primaryItem) {
                primaryItem = {
                    itemName: primaryCategory,
                    totalPrice: 0,
                    totalItem: 0,
                    itemArrData: []
                };
                acc.push(primaryItem);
            }
            let secondaryItem = primaryItem.itemArrData.find(elem => elem.itemName === secondaryCategory);
            if (!secondaryItem) {
                secondaryItem = {
                    itemName: secondaryCategory,
                    totalPrice: 0,
                    totalItem: 0,
                    itemArrData: []
                };
                primaryItem.itemArrData.push(secondaryItem);
            }
            secondaryItem.itemArrData.push(item);
            secondaryItem.totalPrice += item.totalPrice;
            secondaryItem.totalItem++;

            primaryItem.totalPrice += item.totalPrice;
            primaryItem.totalItem++;

            return acc;
        }, []);
        return JSON.stringify(transformedData, null, 2);
    }

    // for get all cart item
    _onGetAllCartItem = async () => {
        let reqData = {
            "limit": this.state.deliveryPartnerLimit.toString(),
            "offset": (this.state.deliveryPartnerPageNum * this.state.deliveryPartnerLimit).toString(),
            "customerId": this.props.route.params.data.userId,
            "orderStatus": "0",
            "isCustomer": "0"
        }
        let responseData = await MiddlewareCheck("getListForCartDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let cartData = pjpModifyData(responseData);
                this.state.cartDetailsList = [...this.state.cartDetailsList, ...cartData.pjpList];
                this.state.recordNumber = cartData.pjpList.length == 0 ? "" : cartData.pjpList[0].recordNumber;
                this.state.totalDataCount = cartData.totalCount;
                this.state.finalCartData = JSON.parse(await this.onModifyCartData(this.state.cartDetailsList));
                if (this.state.finalCartData) {
                    for (let i = 0; i < this.state.finalCartData.length; i++) {
                        this.state.finalCartData[i].totalItem = this.state.finalCartData[i].itemArrData.length;
                        for (let j = 0; j < this.state.finalCartData[i].itemArrData.length; j++) {
                            this.state.finalCartData[i].itemArrData[j].totalItem = this.state.finalCartData[i].itemArrData[j].itemArrData.length;
                        }
                    }
                }
                this.setState(this.state);
                this.onTotalAmountCount();
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
        this.setState({
            filterLoader: false,
            pageLoader: false,
            listLoader: false,
            listDataLoader: false
        })
    }

    // for calculate total amount
    onTotalAmountCount = () => {
        let tempTotalAmount = 0;
        if (this.state.cartDetailsList && this.state.cartDetailsList.length > 0) {
            for (let i = 0; i < this.state.cartDetailsList.length; i++) {
                tempTotalAmount = (parseFloat(tempTotalAmount) + parseFloat(this.state.cartDetailsList[i].totalPrice)).toFixed(2);
            }
        }
        this.state.totalAmount = tempTotalAmount;
        this.setState(this.state);
    }

    // romove card list api call here
    removeFromCart = async (item) => {
        if (this.state.isOffline && this.props.route.params.flow == "fromRouteVisit") {

        } else {
            let reqData = { "itemId": item.id };
            let responseData = await MiddlewareCheck("deleteItemFromCart", reqData, this.props);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message);
                    // this.onTotalAmountCount();
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
        }
    }

    // for render contact list 
    renderContactList = (item, index) => {
        return (
            <View style={{}} key={index}>
                {this.listSection(item, item)}
            </View>
        )
    }

    //for remove item
    onRemoveItem = (mainKey, subKey, subItemItem, subItemkey) => {
        let arr = this.state.finalCartData;
        let totalData = 0;
        arr[mainKey].itemArrData[subKey].itemArrData.splice(subItemkey, 1);
        arr[mainKey].itemArrData[subKey].totalItem = arr[mainKey].itemArrData[subKey].itemArrData.length;
        arr[mainKey].itemArrData[subKey].totalPrice = parseFloat(arr[mainKey].itemArrData[subKey].totalPrice) - parseFloat(subItemItem.totalPrice);
        arr[mainKey].totalItem = arr[mainKey].itemArrData.length;
        arr[mainKey].totalPrice = parseFloat(arr[mainKey].totalPrice) - parseFloat(subItemItem.totalPrice);
        this.state.finalCartData = arr;
        this.state.totalDataCount = this.state.totalDataCount - 1;
        this.state.totalAmount = totalData;
        this.state.profileData.cartCount = this.state.profileData.cartCount == 0 ? this.state.profileData.cartCount : this.state.profileData.cartCount - 1;
        this.setState(this.state);
        this.props.Sales360Redux.cartData.cartCount = this.state.cartDetailsList.length;
        this.props.stateCartData(this.props.Sales360Redux.cartData);
        if (this.state.isOffline) {
            if (this.props.route.params.flow == "fromRouteVisit") {
                this.setStoreData(this.state.finalCartData)
            } else {
                if (this.state.finalCartData[mainKey].itemArrData[subKey].itemArrData.length == 0) {
                    this.state.finalCartData.splice(mainKey, 1);
                }
                this.setState(this.state)
                this.removeFromCart(subItemItem);
            }
        } else {
            if (this.state.finalCartData[mainKey].itemArrData[subKey].itemArrData.length == 0) {
                this.state.finalCartData.splice(mainKey, 1);
            }
            this.setState(this.state)
            this.removeFromCart(subItemItem);
        }

    }

    setStoreData = async (finalCartData) => {
        let storageCartData = await StorageDataModification.customerOrderANdVisitData({}, "get")
        Object.keys(storageCartData).forEach(async key => {
            let modArr = [];
            storageCartData[key].orderData.totalAmount = this.state.totalAmount


            storageCartData[key].orderData.deliveryDate = (this.state.startDate.length == 0 ? null : DateConvert.formatYYYYMMDD(this.state.startDate) + " " + DateConvert.view24TimeFormat(this.state.expectedRawTime).rawTime)

            for (let i = 0; i < finalCartData[0].itemArrData[0].itemArrData.length; i++) {
                let modObj = {};
                modObj["isPlaceOrder"] = false
                modObj["isSync"] = false
                modObj["productName"] = finalCartData[0].itemArrData[0].itemArrData[i].brandData.Product
                modObj["prodhierarchyTypeId"] = finalCartData[0].itemArrData[0].itemArrData[i].brandId
                modObj["prodhierarchyDataId"] = finalCartData[0].itemArrData[0].itemArrData[i].productId
                modObj["quantity"] = finalCartData[0].itemArrData[0].itemArrData[i].quantity
                modObj["totalPrice"] = finalCartData[0].itemArrData[0].itemArrData[i].totalPrice
                // modObj["unitId"] = finalCartData[0].itemArrData[0].itemArrData[i].quantity
                modObj["unitShort"] = finalCartData[0].itemArrData[0].itemArrData[i].unitShort
                modObj["rate"] = finalCartData[0].itemArrData[0].itemArrData[i].rate

                modArr.push(modObj)
            }
            if (this.state.prevProps.id == key) {
                storageCartData[key].orderData.totalOrderQty = modArr.length
                storageCartData[key].orderData.orderDetails = modArr;
                // let storageCartData = await StorageDataModification.customerOrderANdVisitData(storageCartData, "store")
                await StorageDataModification.customerOrderANdVisitData(storageCartData, "store")
            }

        })

    }


    // list section design here
    listSection = (item, key) => {
        return (
            <View key={key}>
                {/* <DynamicOrderListPage
                    data={item}
                    props={this.props}
                    onPressRemove={() => this.onRemoveItem(item, key)}
                /> */}
            </View>
        )
    }

    // for headersection design
    _onHeaderSec = () => {
        return (
            <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                <View style={{ marginTop: 8, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, }}>Cart Detail</Text>
                    </View>
                    {/* <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 3 }} /> */}
                </View>
            </View>
        )
    }

    // this function used for navigate to orderHistoryList
    onRecentOrder = () => {
        this.props.navigation.navigate("OrderHistoryList")
    }

    // for profile  design here
    profileTileSec = () => {
        const onTabSelect = (item) => {
            // this.props.navigation.navigate("OrderHistoryList", { data: this.props.route.params.data })
        }
        return (
            <View>
                <DynamicProfileCard data={this.state.profileData} props={this.props} onPressTab={(val) => onTabSelect(val)} />
            </View>
        )
    }

    // for delivery partner list api call request params here
    _deliveryPartnerApiCall = async () => {
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchName": this.state.searchText ? this.state.searchText : "",
            "hierarchyDataIdArr": this.props.route.params.prevProps.locationData,
            "isDownload": "0",
            "approvalList": "0",
            "customerAccessType": '1'
        }
        await this.fetchListData(dataReq);
    }

    // delivery partner api call here
    fetchListData = async (dataReq) => {
        this.setState({ deliveryPartnerLoader: true });
        let responseData = await MiddlewareCheck("registrationList", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let partnerList = deliveryPartnerModifyData(responseData);
                this.state.deliveryPartnerArr = [...this.state.deliveryPartnerArr, ...partnerList.deliveryPartnerList]
                this.setState(this.state);
            } else {
                Toaster.ShortCenterToaster(responseData.message)

            }
        }
        this.setState({ deliveryPartnerLoader: false });
    }

    // profile section
    profileCardSection = () => {
        const onPressWhatsapp = (item) => {
            let url = "whatsapp://send?text=" + "" + "&phone=" + item.phoneNumber;
            Linking.openURL(url)
                .then(data => {
                    console.log("WhatsApp Opened");
                })
                .catch(() => {
                    alert("Make sure WhatsApp installed on your device");
                });
        }
        const onPressPhone = (item) => {
            Linking.openURL('tel:' + item.phoneNumber)
        }

        return (
            <View>
                {this.state.deliveryPartnerLoader ?
                    <View style={{ marginBottom: 30 }}>
                        <Loader type={"normal"} />
                    </View> :
                    <React.Fragment>
                        {this.state.deliveryPartnerArr.map((item, key) => (
                            <React.Fragment key={key}>
                                <View style={item.check ? styles.activeCardSection : styles.cardSection} >
                                    <View style={styles.profileSec}>
                                        <Image source={ImageName.USER_IMG} style={styles.profileImgSec} />
                                    </View>
                                    <TouchableOpacity style={styles.profileMainDetailsSec} onPress={() => this._onDeliveryPartner(item)} activeOpacity={0.9}>
                                        <View style={styles.profileDetailsSec}>
                                            <View>
                                                <Text style={styles.profileNameTxt} numberOfLines={1}>{item.customerName}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.profileDetailsBottomSec}>
                                            <Text style={styles.profileTypeTxt}>{item.contactTypeName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.iconSection}>
                                        <TouchableOpacity onPress={() => onPressWhatsapp(item)} activeOpacity={0.9}>
                                            <Image source={ImageName.REAL_WHATSAPP_ICON} style={styles.iconImg} />
                                        </TouchableOpacity>
                                        <View style={{ width: 5 }} />
                                        <TouchableOpacity onPress={() => onPressPhone(item)} activeOpacity={0.9}>
                                            <Image source={ImageName.TELEGRAM_LOGO} style={styles.iconImg} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 10 }} />
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                }
            </View>
        )
    }

    // for add more
    onAddMore = () => {
        this._onBack();
        // this.props.onLoad()
    }

    ontelephonic = () => {
        this.state.istelephonic = !this.state.istelephonic;
        if (this.state.istelephonic == true) {
            this.state.isTelephonicData = "1"
        } else {
            this.state.isTelephonicData = "0"
        }
        this.setState(this.state);
    }

    _onSelectOrderType = (val) => {
        this.setState({ selectedOrderTypeObj: val })
    }

    // this function used for footerSec design implement
    _onfooterSec = () => {
        const deliveryPartnerShowHide = () => {
            this.setState({ showHideDeliveryPartner: !this.state.showHideDeliveryPartner });
        }


        return (
            <View style={{ bottom: 0, }}>
                <View style={{ marginTop: 15, marginHorizontal: '5%' }}>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, flex: 1 }}>Net Amount</Text>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{"₹" + " " + (this.props.Sales360Redux.loginData.clientId == 19 ? maskData(this.state.totalAmount.toFixed(1)) : this.state.totalAmount.toFixed(1))}</Text>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_COLOR, marginTop: 8 }} />
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, flex: 1 }}>Payable Amount</Text>
                        <Text style={{ color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{"₹" + " " + (this.props.Sales360Redux.loginData.clientId == 19 ? maskData(this.state.totalAmount.toFixed(1)) : this.state.totalAmount.toFixed(1))}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 15, marginTop: 15 }}>
                    <DropdownInputBox
                        // backgroundColor={"transparent"}
                        isSearchable={true}
                        selectedValue={this.state.selectedOrderTypeObj.id ? this.state.selectedOrderTypeObj.id.toString() : "0"}
                        data={this.state.orderTypeArr}
                        onSelect={(value) => this._onSelectOrderType(value)}
                        headerText={"Order Type"}
                        fontSize={14}
                        additionalTextStyle={{ marginLeft: 10, marginRight: 5 }}
                        additionalBoxStyle={{ borderWidth: 0.5, width: 80, borderRadius: 20, width: "100%" }}
                    />
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: "5%" }}>
                    <View style={{ marginTop: 2 }}>
                        <CheckBox
                            borderWidth={0.7}
                            borderColor={"#000"}
                            borderRadius={20}
                            type={"circle"}
                            onClickValue={() => this.ontelephonic()}
                            selectBackgroundColor={"#000"}
                            data={this.state.istelephonic}
                        />
                    </View>
                    <View style={{ width: 10 }} />
                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Telephonic Order</Text>
                </View>
                <View style={{ marginTop: 15, marginHorizontal: '5%', flexDirection: 'row' }}>
                    <View style={{ flex: 0.5 }}>
                        <View style={{ flex: 1 }}>
                            <BigTextButton
                                text={"Add More"}
                                borderRadius={30}
                                fontSize={14}
                                backgroundColor={"#1F2B4D"}
                                onPress={() => this.onAddMore()}
                            />
                        </View>
                    </View>
                    <View style={{ width: 40 }} />
                    <View style={{ flex: 0.5 }} >
                        <View style={{ flex: 1 }}>
                            <BigTextButton
                                text={"Place Order"}
                                borderRadius={30}
                                fontSize={14}
                                onPress={() => this._onCloseModal(true)}
                                isDisabled={this.state.isOffline ? false : (this.state.cartDetailsList.length > 0 ? false : true)}
                            />
                        </View>
                    </View>
                </View>
                {this.state.profileData.customerType == "Primary" ?
                    null :
                    <React.Fragment>
                        {this.state.cartDetailsList.length > 0 ?
                            <React.Fragment>
                                <TouchableOpacity style={styles.delivaryPartnerView} onPress={() => deliveryPartnerShowHide()} activeOpacity={0.9} >
                                    <Text style={styles.deliveryPartnerText}>Delivery Partner</Text>
                                    <Text style={{ color: "#1F2B4D", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Available Other {this.state.deliveryPartnerArr.length}</Text>
                                    <View style={{ width: 8 }} />
                                    <Image source={ImageName.BLUE_DROPDOWN} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                                {/* <VirtualizedView> */}
                                {this.state.showHideDeliveryPartner ?
                                    <View style={{ marginTop: 15, marginHorizontal: 10 }}>
                                        {this.profileCardSection()}
                                    </View>
                                    : null
                                }
                                {/* </VirtualizedView> */}
                            </React.Fragment> :
                            null
                        }
                    </React.Fragment>
                }
                <View style={{ height: this.state.showHideDeliveryPartner ? 5 : 70 }} />
            </View>
        )
    }

    // for fetch more the list data
    fetchMore = async () => {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.cartDetailsList.length >= this.state.totalDataCount) {
                    this.setState({ listLoader: false })
                    return null;
                } else {
                    this._load();
                }
            }
        );
    };

    // loader for scroll
    renderLoader = () => {
        let resView = <View style={{ marginBottom: 100 }} />;
        if (this.state.listLoader) {
            resView = <Loader type={"normal"} />
        }
        return resView;
    };

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            cartDetailsList: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
        })
    }

    //refresh list data
    onRefresh = async () => {
        await this._onStatusChange();
        await this._load();
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

    // for back action 
    _onBack = () => {
        this.props.navigation.goBack();
        // this.props.route.params.onLoad();
    };

    clearCartDataOffline = async (storageCartData, key) => {
        await StorageDataModification.customerOrderANdVisitData(storageCartData, "store")
    }

    placeOrderOffline = async () => {
        this.setState({ placeOrderLoader: true });
        let storageCartData = await StorageDataModification.customerOrderANdVisitData({}, "get")
        let finalCartData = this.state.finalCartData;
        Object.keys(storageCartData).forEach(async key => {
            if (key == this.state.prevProps.id) {
                if (storageCartData[key].orderData && storageCartData[key].orderData.orderDetails) {
                    for (let i = 0; i < storageCartData[key].orderData.orderDetails.length; i++) {
                        if (storageCartData[key].orderData.orderDetails[i].isPlaceOrder == false) {
                            storageCartData[key].orderData.orderDetails[i].isPlaceOrder = true
                        }
                    }
                }

            }
            await StorageDataModification.customerPlaceOrderData(storageCartData, "store")
            this.clearCartDataOffline(storageCartData, this.state.prevProps.id)


        })
        Toaster.ShortCenterToaster("Order Placed Successfully !")
        this.setState({
            placeOrderModal: false
        })

        this.props.navigation.navigate("OrderSuccessfull", { data: this.state.deliveryPartnerId, orderId: this.state.recordNumber, prevProps: this.props.route.params.data, onLoad: this._load, flow: this.props.route.params.flow, screenName: this.props.route.params.screenName })


        this.setState({ placeOrderLoader: false });
    }

    // this function used for place order api call here
    _onPlaceOrder = async () => {
        if (this.state.isOffline && (this.props.route.params.flow == "fromRouteVisit")) {
            this.placeOrderOffline()
        } else {
            let totalQuantity = 0;
            for (let i = 0; i < this.state.cartDetailsList.length; i++) {
                totalQuantity = parseFloat(totalQuantity) + parseFloat(this.state.cartDetailsList[i].quantity)
            }
            if (this.state.expectedRawTime && this.state.startDate.length == 0) {
                Toaster.ShortCenterToaster("Please Select the Date !");
            } else if (this.state.startDate.length > 0 && this.state.expectedRawTime.length == 0) {
                Toaster.ShortCenterToaster("Please Select the Time !");
            } else if (this.state.profileData.cartCount == 0) {
                Toaster.ShortCenterToaster("Please Select atleast one item !");
            } else {
                let reqData = {
                    "totalAmount": this.state.totalAmount ? this.state.totalAmount : "0",
                    "remarks": '',
                    "createdAt": DateConvert.fullDateFormat(new Date()),
                    "deliveryDate": (this.state.startDate.length == 0 ? null : DateConvert.formatYYYYMMDD(this.state.startDate) + " " + DateConvert.view24TimeFormat(this.state.expectedRawTime).rawTime),
                    "vehicleNo": '',
                    "deliveryStartDatetime": null,
                    "deliveryEndDatetime": null,
                    "approvedAt": DateConvert.fullDateFormat(new Date()),
                    "orderNumber": this.state.cartDetailsList[0].recordNumber ? this.state.cartDetailsList[0].recordNumber : "",
                    "contactId": this.props.route.params.data.userId ? this.props.route.params.data.userId : "",
                    "deliveryPartnerId": this.state.deliveryPartnerId.customerId ? this.state.deliveryPartnerId.customerId : "0",
                    "totalOrderQty": totalQuantity,
                    "isTelephonic": this.state.isTelephonicData,
                    "orderType": this.state.selectedOrderTypeObj.shortName ? this.state.selectedOrderTypeObj.shortName : ""

                }
                this.setState({ placeOrderLoader: true });
                let responseData = await MiddlewareCheck("placeNewOrder", reqData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        if (this.state.userData.orderOTPVerification == 1) {
                            this._onOtpmodal()
                        } else {
                            this.props.navigation.navigate("OrderSuccessfull", { data: this.state.deliveryPartnerId, orderId: this.state.cartDetailsList[0].recordNumber, prevProps: this.props.route.params.data, onLoad: this._load, finalCartData: this.state.finalCartData, itemProps: this.props.route.params.prevProps, finalAmount: this.state.totalAmount, flow: this.props.route.params.flow, screenName: this.props.route.params.screenName })
                        }
                        this.props.Sales360Redux.cartData.cartCount = 0;
                        this.props.stateCartData(this.props.Sales360Redux.cartData);
                        this.setState({
                            placeOrderModal: false
                        })
                        this.setState({ cartDetailsList: [] });
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }
                this.setState({ placeOrderLoader: false });
            }
        }
    }


    onOtpSubmit = async () => {
        let reqData = {
            "orderNumber": this.state.recordNumber,
            "otp": this.state.otpVirify,
        }
        if (reqData.otp.length == 0) {
            Toaster.ShortCenterToaster("Please enter the OTP !")
        } else {
            let responseData = await MiddlewareCheck("orderOTPverification", reqData, this.props);
            this.setState({
                otpVirify: "",
                otpRespoData: responseData
            })
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.setState({
                        otpVirify: "",
                        otpModal: false
                    })
                    Toaster.ShortCenterToaster(responseData.message)
                    this.props.navigation.navigate("OrderSuccessfull", { data: this.state.deliveryPartnerId, orderId: this.state.recordNumber, prevProps: this.props.route.params.data, onLoad: this._load })
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
        }
    }

    _onOtpmodal = () => {
        this.setState({
            otpModal: !this.state.otpModal
        })
    }

    _onChangeOtp = (value) => {
        let newText = DataValidator.inputEntryValidate(value, "number");
        this.setState({
            otpVirify: newText
        })
    }



    // for delivery partner onpress  
    _onDeliveryPartner = (item) => {
        for (let i = 0; i < this.state.deliveryPartnerArr.length; i++) {
            if (this.state.deliveryPartnerArr[i] == item) {
                this.state.deliveryPartnerArr[i].check = true;
            } else {
                this.state.deliveryPartnerArr[i].check = false;
            }
        }
        this.setState({
            deliveryPartnerId: item,
            deliveryPartnerArr: this.state.deliveryPartnerArr
        })
    }

    // for show the profile data
    getProfileData = async () => {
        let reqData = { customerId: this.props.route.params.data.userId, isCustomer: this.props.route.params.prevProps.visitType == 0 || this.props.route.params.prevProps.visitType == 1 || this.props.route.params.prevProps.visitType == undefined || this.props.route.params.prevProps.visitType == null ? "1" : "2" }
        let responseData = await MiddlewareCheck("getCustomerDataWithCartItemCount", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedProfileData = modifyProfileData(responseData.response);
                this.setState({ profileData: modifiedProfileData });
            }
        }
    }

    _onCloseModal = (type) => {
        this.setState({
            placeOrderModal: type
        })
    }


    _onOpenStartDate = () => {
        this.setState({
            startDateCheck: true
        })
    }

    _onStartDateSelect = (selectedDate) => {
        let statDateRaw = this.state.statDateRaw,
            startDate = "";
        if (selectedDate) {
            startDate = DateConvert.formatYYYYMMDD(selectedDate);
            statDateRaw = selectedDate;
        }
        this.setState({
            startDate: startDate,
            statDateRaw: statDateRaw
        })
        this._onCloseDate();
    }

    _onCloseDate = () => {
        this.setState({
            startDateCheck: false
        })
    }


    _onExpectedTime = () => {
        this.setState({
            timeCheck: false
        })
    }

    _onTimeSelect = (selectedDate) => {
        let statDateRaw = this.state.timeRaw,
            expectedTime = "";
        if (selectedDate) {
            expectedTime = DateConvert.viewTimeFormat(selectedDate);
            // expectedTime = selectedDate;
            statDateRaw = selectedDate;
        }
        this.setState({
            expectedRawTime: selectedDate,
            expectedTime: expectedTime,
            timeRaw: statDateRaw
        })
        this._onExpectedTime();
    }

    alertMsg = () => {
        Toaster.ShortCenterToaster("Please enter your OTP")
    }

    _onOpenExpectedTime = () => {
        this.setState({
            timeCheck: true
        })
    }


    modalSection = () => {
        return (
            <>
                <Modal
                    isVisible={this.state.placeOrderModal}
                    children={
                        <>
                            <View style={styles.modalview}>
                                <View style={styles.marginView}>
                                    <TouchableOpacity style={styles.cancelSec}
                                        activeOpacity={0.8}
                                        onPress={() => this._onCloseModal(false)}  >
                                        <Image source={ImageName.WHITE_CROSS} style={styles.cancelImg} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginHorizontal: 15 }}>
                                    <View>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Expected delivery Date</Text>
                                        <TouchableOpacity style={styles.canlenderSec}
                                            activeOpacity={0.9}
                                            onPress={() => this._onOpenStartDate(true)}>
                                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, paddingLeft: 10, top: 10 }}>
                                                {this.state.startDate.length > 0 ? this.state.startDate : "Select Date"}
                                            </Text>
                                            <View style={styles.calenderImgSec}>
                                                <Image source={ImageName.CALENDER_LOGO} style={styles.calenderLogo} />
                                            </View>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            open={this.state.startDateCheck}
                                            date={this.state.statDateRaw}
                                            minimumDate={new Date()}
                                            mode="date"
                                            onConfirm={(date) => this._onStartDateSelect(date)}
                                            onCancel={() => this._onCloseDate()}
                                        />
                                    </View>
                                    <View style={{ marginTop: 20 }} >
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Expected delivery Time</Text>
                                        <TouchableOpacity style={styles.canlenderSec}
                                            activeOpacity={0.9}
                                            onPress={() => this._onOpenExpectedTime()}>
                                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, paddingLeft: 10, top: 10 }}>
                                                {this.state.expectedTime.length > 0 ? this.state.expectedTime : "Select Time"}
                                            </Text>
                                            <View style={styles.calenderImgSec}>
                                                <Image source={ImageName.CLOCK_LOGO} style={styles.calenderLogo} />
                                            </View>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            open={this.state.timeCheck}
                                            date={this.state.timeRaw}
                                            // maximumDate={this.state.timeRaw}
                                            mode="time"
                                            onConfirm={(date) => this._onTimeSelect(date)}
                                            onCancel={() => this._onExpectedTime()}
                                        />
                                    </View>
                                    <View style={{ marginTop: 20, marginHorizontal: "20%" }}>
                                        {this.state.placeOrderLoader ?
                                            <Loader type={"normal"} /> :
                                            <BigTextButton
                                                text={"Submit"}
                                                borderRadius={30}
                                                fontSize={14}
                                                onPress={() => this._onPlaceOrder()}
                                            />
                                        }
                                    </View>
                                </View>
                                <View style={{ marginBottom: 40 }} />
                            </View>
                        </>
                    }
                />
                <BottomModal
                    isVisible={this.state.otpModal}
                    onCloseModal={() => this.alertMsg()}
                    onBackdropPress={() => this.alertMsg()}
                    onBackButtonPress={() => this.alertMsg()}
                    children={
                        <View style={styles.modalview}>
                            <View style={{ marginTop: 10, marginHorizontal: '10%' }}>
                                <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}> Please enter the OTP confirm the order</Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <TextInputBox
                                        placeholder={"Enter Your OTP"}
                                        value={this.state.otpVirify}
                                        onChangeText={(value) => this._onChangeOtp(value)}
                                        keyboardType={"number-pad"}
                                        returnKeyType="done"
                                        maxLength={10}
                                        height={45}
                                        borderRadius={12}
                                    />
                                </View>
                                <View style={{ marginTop: 20, marginHorizontal: 60 }}>
                                    <BigTextButton
                                        text={this.state.otpRespoData.success == false ? "Try Again" : "Submit"}
                                        borderRadius={30}
                                        fontSize={14}
                                        onPress={() => this.onOtpSubmit()}
                                    />
                                </View>
                                <View style={{ marginBottom: 40 }} />
                            </View>
                        </View>
                    }
                />
            </>
        )
    }



    render() {
        // if(this.state.isOffline){
        let totalData = 0;
        let totalItemData = 0;
        let arr = this.state.finalCartData
        for (let i = 0; i < this.state.finalCartData.length; i++) {
            if (this.state.finalCartData[i].itemArrData !== undefined || this.state.finalCartData[i].itemArrData !== null) {
                for (let j = 0; j < this.state.finalCartData[i].itemArrData.length; j++) {

                    for (let k = 0; k < this.state.finalCartData[i].itemArrData[j].itemArrData.length; k++) {
                        totalData = totalData + this.state.finalCartData[i].itemArrData[j].itemArrData[k].totalPrice

                    }
                }
            }

        }
        this.state.totalAmount = totalData;
        // }
        // this.state.finalCartData = arr;

        return (
            <SafeAreaView style={styles.container}>
                {this.modalSection()}
                {this._onHeaderSec()}
                {this.profileTileSec()}
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        {this.ViewSkeletonPlaceholder()}
                    </SkeletonPlaceholder> :
                    <React.Fragment>
                        {this.state.profileData.cartCount > 0 ?
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                style={{ minHeight: 500 }}
                                nestedScrollEnabled={true}>
                                {this.state.finalCartData.map((item, key) => (
                                    <View style={{ flex: 1, borderColor: "#FFD4D8", borderWidth: 1, marginHorizontal: 20, borderRadius: 20, marginTop: 10, }} key={key}>
                                        <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 15, backgroundColor: "#FFD4D8", borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection: 'row' }}>
                                            <View style={{ flex: 0.7 }}>
                                                {this.state.isOffline && (this.props.route.params.flow == "fromRouteVisit") ? null :
                                                    <Text style={{ fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#AD3636" }}>{item.itemName}</Text>
                                                }
                                                <Text style={{ fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#634E50" }}>{item.totalItem + " Unit"}{parseInt(item.totalItem) > 0 ? "s" : ""}</Text>
                                            </View>
                                            <View style={{ flex: 0.3, justifyContent: "center", alignItems: 'flex-end' }}>
                                                {this.state.isOffline && (this.props.route.params.flow == "fromRouteVisit") ?
                                                    <Text style={{ fontSize: 14, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, color: Color.COLOR.BLUE.LOTUS_BLUE }}>{"₹ " + this.state.totalAmount.toFixed(1)}</Text>

                                                    :
                                                    <Text style={{ fontSize: 14, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, color: Color.COLOR.BLUE.LOTUS_BLUE }}>{"₹ " + (this.props.Sales360Redux.loginData.clientId == 19 ? maskData((parseFloat(item.totalPrice)).toFixed(2)) : (parseFloat(item.totalPrice)).toFixed(2))}</Text>

                                                }
                                            </View>
                                        </TouchableOpacity>
                                        {item.itemArrData.map((subItem, subKey) => (
                                            <React.Fragment key={subKey}>
                                                {this.state.isOffline && (this.props.route.params.flow == "fromRouteVisit") ? null :
                                                    <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 15, backgroundColor: "#C7E5F5", flexDirection: 'row', marginTop: 5, marginHorizontal: 1 }}>
                                                        <View style={{ flex: 0.7 }}>
                                                            <Text style={{ fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#103F56" }}>{subItem.itemName}</Text>
                                                            <Text style={{ fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#634E50" }}>{subItem.totalItem + " Unit"}{parseInt(subItem.totalItem) > 0 ? "s" : ""}</Text>
                                                        </View>
                                                        <View style={{ flex: 0.3, justifyContent: "center", alignItems: 'flex-end' }}>
                                                            <Text style={{ fontSize: 14, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, color: Color.COLOR.BLUE.LOTUS_BLUE }}>{"₹ " + (this.props.Sales360Redux.loginData.clientId == 19 ? maskData((parseFloat(subItem.totalPrice)).toFixed(2)) : (parseFloat(subItem.totalPrice)).toFixed(2))}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                }
                                                {subItem.itemArrData.length > 0 ?
                                                    <React.Fragment>
                                                        {subItem.itemArrData.map((subProductItem, subProductKey) => (
                                                            <View key={subProductKey}>
                                                                <View style={{ paddingHorizontal: 15, paddingVertical: 15, backgroundColor: "#F0F4F7", marginTop: 5, marginHorizontal: 1, borderRadius: 20, marginHorizontal: 10 }} >
                                                                    <View style={{ flexDirection: 'row', }}>
                                                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, flex: 1 }}>{subProductItem.brandData.Product}</Text>
                                                                        <TouchableOpacity onPress={() => this.onRemoveItem(key, subKey, subProductItem, subProductKey)}>
                                                                            <Image source={ImageName.GRAY_CIRCEL_CANCEL_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
                                                                        <View style={{ flex: 1, }}>
                                                                            {/* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{"PTR ₹ 60 X "}{subProductItem.quantity + " " + subProductItem.unitShort}</Text> */}
                                                                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}> {subProductItem.rate} X {subProductItem.quantity + " " + subProductItem.unitShort}</Text>

                                                                        </View>
                                                                        <View>
                                                                            {/* <Text style={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#747C90" }}>Applied Discount <Text style={{ color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>20%</Text></Text> */}
                                                                            <View style={{ flexDirection: 'row' }}>
                                                                                {/* <Text style={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#747C90", top: 8, textDecorationLine: 'line-through' }}>{"₹" + " " + subProductItem.totalPrice.toString()}</Text> */}
                                                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 8, }}>  {"₹" + " " + (this.props.Sales360Redux.loginData.clientId == 19 ? maskData(subProductItem.totalPrice.toFixed(1)) : subProductItem.totalPrice.toFixed(1))}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                                <View style={{ marginBottom: 8 }} />
                                                            </View>
                                                        ))}
                                                    </React.Fragment>
                                                    : null}

                                            </React.Fragment>
                                        ))}
                                        <View style={{ marginBottom: 8 }} />
                                    </View>
                                ))}
                                {this._onfooterSec()}
                            </ScrollView> :
                            <React.Fragment>
                                <View style={{ marginTop: 20, height: Dimension.height }}>
                                    <NoDataFound />
                                </View>
                            </React.Fragment>
                        }
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
    bindActionCreators({
        stateCheckForNetwork,
        stateCartData
    },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DealerCartDetails);
