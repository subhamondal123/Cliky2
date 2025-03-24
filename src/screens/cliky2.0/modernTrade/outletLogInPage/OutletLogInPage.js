
import React from "react";
import { ImageName, Dimension, Color, FontSize, FontFamily } from '../../../../enums'
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    ImageBackground,
    Linking
} from "react-native";
import {
    stateCheckForNetwork, stateUserInformation, stateCartData, storeOutletListData
} from "../../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";
import { BigTextButton, CustomCamera, ImageUploadModal, Loader, Modal, TextInputBox } from "../../../../shared";
import { MiddlewareCheck, MiddlewareFileCheck } from '../../../../services/middleware';
import { ErrorCode } from '../../../../services/constant';
import { DateConvert, FileUpload, StorageDataModification, Toaster } from '../../../../services/common-view-function';
import { App_uri } from '../../../../services/config';
import SvgComponent from "../../../../assets/svg";
import { resDataDateFormat } from "../../../../services/common-view-function/dateConvert";
import { modifyData, onLoginApiCall } from "./Function";
import { JumpingTransition } from "react-native-reanimated";



// for leave entry page
class OutletLogInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            profileImg: "",
            profileRaw: "",
            imageLoader: false,
            visibleProfileImgUploadModal: false,
            cameraVisible: false,
            isLoggedIn: this.props.Sales360Redux.storeOutletListData.storeCheckingData.needLogin,
            outletLoginList: [],
            isMobileModalVisible: false,
            logInLoader: false,

            currentLoaction: "",
            isLogOutVisiableModal: false
        };
    }

    // this is a initial function which is call first
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this.onSelectInitialState();
                this._load();
                // if (offlineCheck) {
                // if (this.props.route.params.flow == "fromRouteVisit") {
                //     await this.setProfileDataOffline();
                // }
                // }
            })
    }

    // for set the initial state
    onSelectInitialState = async () => {
        this.setState({
            pageloader: true,
            outletLoginList: [],

        })
    }

    // this is the first function where set the state data
    _load = async () => {
        let reqData = { "shopId": this.props.Sales360Redux.storeOutletListData.item.shopId }
        let responseData = await MiddlewareCheck("fetchMTCustomerDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let listData = modifyData(responseData.response, this.state);
                this.state.outletLoginList = listData;
            }
        }
        this.state.pageloader = false;
        this.setState(this.state);
        this._isLoggedInCheck();
        this._onCurrentLocation();
    };

    _onCurrentLocation = async () => {
        let responseData = await MiddlewareCheck("getAddressByLatLng", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.currentLoaction = responseData.response;
                this.setState(this.state);
            }
        }
    }

    // check user logged in or not
    _isLoggedInCheck = () => {
        if (this.props.Sales360Redux.storeOutletListData.storeCheckingData && Object.keys(this.props.Sales360Redux.storeOutletListData.storeCheckingData).length && this.props.Sales360Redux.storeOutletListData.storeCheckingData.needLogin == false) {
            this.state.isLoggedIn = false;
            this.setState(this.state);
        }
    }

    // here the login Api call
    onLoginOutlet = async () => {
        let errorCount = 0;
        if (this.state.profileImg == null || this.state.profileImg == undefined || this.state.profileImg == "") {
            Toaster.ShortCenterToaster("Please select picture !")
            errorCount++;
        }
        if (errorCount == 0) {
            let reqData = {
                "shopId": this.state.outletLoginList.shopId,
                "visitImage": this.state.profileImg,
                "locationData": this.props.Sales360Redux.storeOutletListData.heirarchyData
            }
            this.setState({ logInLoader: true });
            let responseData = await MiddlewareCheck("loginVisitMTCustomer", reqData, this.props);
            if (responseData) {
                if (responseData.response.login === ErrorCode.ERROR.ERROR.SUCCESS_WITH_TRUE) {
                    this.state.isLoggedIn = false;
                    this.setState(this.state);
                    this.props.Sales360Redux.storeOutletListData.storeCheckingData["visitId"] = responseData.response.visitId;
                    this.props.storeOutletListData(this.props.Sales360Redux.storeOutletListData);
                    Toaster.ShortCenterToaster(responseData.message);
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                }
            }
            this.setState({ logInLoader: false });
        }
    }

    // here the logout Api call
    onLogout = async () => {
        this.state.isLogOutVisiableModal = true;
        this.setState(this.state);
    }

    logOutApi = async () => {
        this.setState({ logoutLoader: true });
        let reqData = { "visitId": this.props.Sales360Redux.storeOutletListData.storeCheckingData.visitId }
        let responseData = await MiddlewareCheck("logoutVisitMTCustomer", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.props.navigation.navigate("OutletDetail", { "heirarchyData": this.props.Sales360Redux.storeOutletListData.heirarchyData });
                await StorageDataModification.trandItemList({}, "clear");
                await StorageDataModification.closingStockItemList({}, "clear");
                this.state.isLogOutVisiableModal = false;
                this.setState(this.state);
            }
        }
        this.setState({ logoutLoader: false });
    }

    _onLogoutClose = () => {
        this.state.isLogOutVisiableModal = false;
        this.setState(this.state);
    }

    // here the phone no call 
    onMobileModalOpen = () => {
        this.state.isMobileModalVisible = true;
        this.setState(this.state);
    }

    onMobileModalClose = () => {
        this.state.isMobileModalVisible = false;
        this.setState(this.state);
    }

    phonePress = () => {
        Linking.openURL(`tel:${this.state.outletLoginList.phoneNumber}`);
    };

    // for profile image upload visible
    _onProfilePicModalVisible = async () => {
        this.state.visibleProfileImgUploadModal = true
        this.setState(this.state);
    }

     // for profile image close upload visible
     _onProfilePicModalCloseVisible = async () => {
        this.state.visibleProfileImgUploadModal = false
        this.setState(this.state);
    }

    // for camera Selected
    onSelectPic = async (value) => {
        // await this._onProfilePicModalVisible(false);
        await this.ImageUploadApiCall(value);
    }

    // for Image Upload Api call
    ImageUploadApiCall = async (uploadData) => {
        this.setState({ profileImgLoader: true });
        let imgData = await MiddlewareFileCheck("crmImageupload", uploadData, this.props);
        if (imgData) {
            if (imgData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.profileImg = imgData.response.fileName;
                this.state.profileRaw = uploadData.uri;
                this.setState(this.state);
            }
        }
        this.setState({ profileImgLoader: false });
    }

    onChooseCamera = async () => {
        this.setState({ cameraVisible: true });
    }

    // for image MOdal show Hide
    imageUploadModalSection = () => {
        const OnChooseGallery = async () => {
            this._onProfilePicModalVisible()
            let uploadData = await FileUpload.uploadImg();
            await this.ImageUploadApiCall(uploadData);
        }

        return (
            <ImageUploadModal
                isVisible={this.state.visibleProfileImgUploadModal}
                onGallerySelect={(value) => OnChooseGallery(value)}
                onCameraSelect={(value) => this.onChooseCamera(value)}
                onCloseModal={(value) => this._onProfilePicModalCloseVisible(value)}
            />
        )
    }

    dateFormat = (date) => {
        let today = DateConvert.viewDateFormat(date)
        var dd = String(today.getDate()).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0');
        const month = today.toLocaleString('default', { month: 'long' });
    }


    onOpeningStock = (type) => {
        this.props.navigation.navigate("TradeItemList", { data: this.state.outletLoginList, type: type });
    }

    onCloseStock = (type) => {
        if (this.state.outletLoginList.lastOpeningUpdated.isUpdated == 1) {
            this.props.navigation.navigate("CloseStockListPage", { data: this.state.outletLoginList, type: type });
        } else {
            Toaster.ShortCenterToaster("Please Add Your Opening Stock First !")
        }

    }

    _onReport = () => {
        this.props.navigation.navigate("ReportList", { data: this.state.outletLoginList });
    }

    _onMerchandising = () => {
        this.props.navigation.navigate("MerchandisingPage", { data: this.state.outletLoginList })
    }


    mobileModalSec = () => {
        return (
            <>
                {this.imageUploadModalSection()}
                {this.state.isMobileModalVisible ?
                    <Modal
                        isVisible={this.state.isMobileModalVisible}
                        onRequestClose={() => this.onMobileModalClose()}
                        onBackdropPress={() => this.onMobileModalClose()}
                        onBackButtonPress={() => this.onMobileModalClose()}
                        children={
                            <View style={styles.modalview}>
                                <View style={{}}>
                                    <View style={{ justifyContent: "center", alignItems: 'center', marginVertical: 10 }}>
                                        <Text style={styles.modalHeaderTxt}>Phone Number Info</Text>
                                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, borderWidth: 0.5, borderRadius: 30, height: 40, width: 40, margin: 20 }}>
                                            <Image source={ImageName.PHONE} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{}}>
                                            <Image source={ImageName.CALL_BLACK} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                                        </View>
                                        <View style={{ width: 10 }} />
                                        <TouchableOpacity style={{ alignItems: 'flex-start' }} onPress={() => this.phonePress()} activeOpacity={0.9}>
                                            <Text style={{ color: Color.COLOR.BLUE.CAPRI, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.MD }} >Phone Number</Text>
                                            <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: Color.COLOR.BLACK.BLACK_PEARL, fontSize: FontSize.SM }}>{this.state.outletLoginList.phoneNumber}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                    :
                    null
                }
            </>
        )
    }


    tabSec = () => {
        return (
            <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, flex: 1 }}>
                        <View>
                            <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Location Track</Text>
                        </View>
                        <View style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: Color.COLOR.RED.AMARANTH, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                            <Text style={styles.circleText}>i</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', marginTop: 10, }}>
                        <Text style={styles.todayText}>Today :  <Text style={styles.todayTextValue}>{DateConvert.viewTimeFormat(new Date())} Start</Text></Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.todayTextValue}>{this.state.outletLoginList.address}</Text>
                        {/* <Text style={styles.todayTextValue}>{this.state.currentLoaction ? this.state.currentLoaction : ""}</Text> */}
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        {this.state.logoutLoader ?
                            <ActivityIndicator size={"small"} color={Color.COLOR.RED.AMARANTH} /> :
                            <View style={{ width: "45%", }}>
                                <BigTextButton
                                    backgroundColor={Color.COLOR.RED.AMARANTH}
                                    text={"Logout"}
                                    height={30}
                                    fontSize={FontSize.XS}
                                    onPress={() => this.onLogout()}
                                    borderRadius={25}
                                />
                            </View>
                        }
                    </View>
                </View>
                <View style={{ marginTop: 40 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, borderTopWidth: 1, borderColor: '#747C90', borderRightWidth: 1, borderBottomWidth: 1 }}>
                            <TouchableOpacity style={{ marginTop: 5 }} onPress={() => this.onOpeningStock("openingStock")} activeOpacity={0.8} disabled={this.state.outletLoginList.lastOpeningUpdated.isUpdated == 0 ? false : true}>
                                {this.state.outletLoginList.lastOpeningUpdated.isUpdated == 1 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 0.9 }} />
                                        <View style={{ width: 25, height: 25, borderRadius: 15, backgroundColor: '#00B65E', alignItems: 'center', justifyContent: 'center' }}>
                                            <SvgComponent svgName={"tick"} hight={15} width={15} strokeColor={"#FFFFFF"} />
                                        </View>
                                    </View> :
                                    null
                                }
                                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8 }}>
                                    <SvgComponent svgName={"3dBoxWithTick"} hight={30} width={30} strokeColor={"#1F2B4D"} />
                                    <Text style={styles.boxTittle}>Opening Stock</Text>
                                    <Text style={styles.todayText}>Last Update Date {this.state.outletLoginList.lastOpeningUpdated.lastUpdatedDate ? this.state.outletLoginList.lastOpeningUpdated.lastUpdatedDate : ""}</Text>
                                    <Text style={styles.todayText}>Last Update Time {this.state.outletLoginList.lastOpeningUpdated.lastUpdatedTime ? this.state.outletLoginList.lastOpeningUpdated.lastUpdatedTime : ""}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ flex: 1, borderTopWidth: 1, borderColor: '#747C90', borderBottomWidth: 1 }} activeOpacity={0.9} onPress={() => this._onMerchandising()} >
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 8, padding: 8 }}>
                                <SvgComponent svgName={"expenses"} hight={30} width={30} strokeColor={"#1F2B4D"} />
                                <Text style={styles.boxTittle}>Merchandising</Text>
                                <Text style={styles.todayText}>Last Update Date {this.state.outletLoginList.lastMarchandiseUpdated.lastUpdatedDate ? this.state.outletLoginList.lastMarchandiseUpdated.lastUpdatedDate : ""}</Text>
                                <Text style={styles.todayText}>Last Update Time {this.state.outletLoginList.lastMarchandiseUpdated.lastUpdatedTime ? this.state.outletLoginList.lastMarchandiseUpdated.lastUpdatedTime : ""}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, borderColor: '#747C90', borderRightWidth: 1, borderBottomWidth: 1 }}>
                            <TouchableOpacity style={{ marginTop: 5 }} onPress={() => this.onCloseStock("closeingStock")} activeOpacity={0.8} disabled={this.state.outletLoginList.lastClosingUpdated.isUpdated == 0 ? false : true}>
                                {this.state.outletLoginList.lastClosingUpdated.isUpdated == 1 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 0.9 }} />
                                        <View style={{ width: 25, height: 25, borderRadius: 15, backgroundColor: '#00B65E', alignItems: 'center', justifyContent: 'center' }}>
                                            <SvgComponent svgName={"tick"} hight={15} width={15} strokeColor={"#FFFFFF"} />
                                        </View>
                                    </View> :
                                    null
                                }
                                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8 }}>
                                    <SvgComponent svgName={"3dBoxWithTick"} hight={30} width={30} strokeColor={"#1F2B4D"} />
                                    <Text style={styles.boxTittle}>Closing Stock</Text>
                                    <Text style={styles.todayText}>Last Update Date {this.state.outletLoginList.lastClosingUpdated.lastUpdatedDate ? this.state.outletLoginList.lastClosingUpdated.lastUpdatedDate : ""}</Text>
                                    <Text style={styles.todayText}>Last Update Time {this.state.outletLoginList.lastClosingUpdated.lastUpdatedTime ? this.state.outletLoginList.lastClosingUpdated.lastUpdatedTime : ""}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, borderColor: '#747C90', borderBottomWidth: 1 }}>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginTop: 8, padding: 8 }} onPress={() => this._onReport()}>
                                <SvgComponent svgName={"help"} hight={30} width={30} strokeColor={"#1F2B4D"} />
                                <Text style={styles.boxTittle}>Report</Text>
                                <Text style={styles.todayText}>Last Report Available  {this.state.outletLoginList.lastReport.lastUpdatedDate ? this.state.outletLoginList.lastReport.lastUpdatedDate : ""}</Text>
                                {/* <Text style={styles.todayText}>Last Update Time {this.state.outletLoginList.lastReport.lastUpdatedTime ? this.state.outletLoginList.lastReport.lastUpdatedTime : ""}</Text> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
                <View style={{ alignItems: 'center', justifyContent: 'center', bottom: 0 }}>
                    <Image source={ImageName.OUTLET_BUTTON} style={{ resizeMode: 'contain', height: 190, }} />
                </View>
            </View >
        )
    }

    // for back the page
    onBack = () => {
        this.props.navigation.goBack();
    }

    headerSec = () => {
        return (
            <View style={{ backgroundColor: '#fff', marginVertical: 10, }}>
                <View style={{ marginHorizontal: '5%', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={ImageName.OUTLET_LOGO} style={{ height: 40, width: 45, resizeMode: 'contain' }} />
                    <View style={{ width: 8 }} />
                    <TouchableOpacity style={{}} onPress={() => this.onBack()} activeOpacity={0.9}>
                        <SvgComponent svgName={"back"} hight={20} width={20} strokeColor={"#1F2B4D"} />
                    </TouchableOpacity>
                    <View style={{ width: 8 }} />
                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.props.Sales360Redux.storeOutletListData.item.customerName }</Text>
                </View>
            </View>
        )
    }


    _modalSec = () => {
        return (
            <Modal
                isVisible={this.state.isLogOutVisiableModal}
                onRequestClose={() => this._onLogoutClose()}
                onBackdropPress={() => this._onLogoutClose()}
                onBackButtonPress={() => this._onLogoutClose()}
                children={
                    <View style={styles.modalview}>
                        <React.Fragment>
                            <View style={styles.modalHeaderSec}>
                                <View style={styles.crossImgSec}>
                                    <Image source={ImageName.LOGOUT_BLUE} style={styles.redCrossImg} />
                                </View>
                            </View>

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={styles.modalMainMarginSec}>
                                    <Text style={styles.headerModalText}>Do you want to logout ?</Text>
                                    <View style={{ flexDirection: 'row', marginTop: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.cancelButton}
                                            onPress={() => this._onLogoutClose()}
                                            activeOpacity={0.9}>
                                            <Text style={styles.cancelText}>Cancel</Text>
                                        </TouchableOpacity>
                                        <View style={{ marginLeft: '5%' }} />
                                        <TouchableOpacity style={styles.logoutButton} onPress={() => this.logOutApi()} activeOpacity={0.9}>
                                            <Text style={styles.cancelText}>Logout</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>

                        </React.Fragment>
                    </View>

                }
            />
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._modalSec()}
                {this.state.cameraVisible ?
                    <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} cameraType={"front"} />
                    :
                    null
                }
                {this.mobileModalSec()}
                {this.state.pageloader ?
                    <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View> :
                    <>
                        {this.headerSec()}
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <View style={{ flex: 1 }}>
                                <ImageBackground source={this.state.outletLoginList.profilePic.length == 0 ? ImageName.USER : { uri: App_uri.IMAGE_URI + this.state.outletLoginList.profilePic }} style={{ height: 200, width: Dimension.width, resizeMode: 'cover' }}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: '5%', marginTop: 10 }}>
                                        <View style={{ flex: 1 }} />
                                        <Image source={ImageName.RED_LOVE_ICON} style={{ height: 40, width: 40, resizeMode: "contain" }} />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 60, }}>
                                            <View style={{ marginHorizontal: '5%', flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.outletLoginList.custBusinessName ? this.state.outletLoginList.custBusinessName : this.state.outletLoginList.firstName + " " + this.state.outletLoginList.lastName}</Text>
                                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{this.state.outletLoginList.firstName + " " + this.state.outletLoginList.lastName}</Text>
                                                </View>
                                                <TouchableOpacity style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 40, width: 40, borderRadius: 100 }} onPress={() => this.onMobileModalOpen()} activeOpacity={0.9}>
                                                    <Image source={ImageName.CALL_BLACK} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>
                            {this.state.isLoggedIn ?
                                <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.todayText}>Last Work  Date :  <Text style={styles.todayTextValue}>{this.state.outletLoginList.lastLogin.lastUpdatedDate}</Text></Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={styles.todayText}>Today :  <Text style={styles.todayTextValue}>{DateConvert.viewDateFormat(new Date())}</Text></Text>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                                        <View style={{ height: 130, width: 130, borderRadius: 100, borderColor: Color.COLOR.BLUE.LOTUS_BLUE, borderWidth: 1.4, alignItems: 'center', justifyContent: 'center' }}>
                                            {this.state.profileImgLoader ?
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                    <ActivityIndicator size="small" color={Color.COLOR.BLUE.VIOLET_BLUE} />
                                                </View> :
                                                <React.Fragment>
                                                    {this.state.profileImg.length > 0 ?
                                                        // <TouchableOpacity onPress={() => this._onProfilePicModalVisible()} activeOpacity={0.9}>
                                                        <TouchableOpacity onPress={() => this.onChooseCamera()} activeOpacity={0.9}>
                                                            <Image source={{ uri: App_uri.IMAGE_VIEW_URI + this.state.profileImg }} style={{ height: 110, width: 110, resizeMode: 'cover', borderRadius: 100 }} />
                                                        </TouchableOpacity>
                                                        :
                                                        // <TouchableOpacity style={{ height: 110, width: 110, borderRadius: 100, backgroundColor: '#1F2B4D', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._onProfilePicModalVisible()} activeOpacity={0.9}>
                                                        <TouchableOpacity style={{ height: 110, width: 110, borderRadius: 100, backgroundColor: '#1F2B4D', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.onChooseCamera()} activeOpacity={0.9}>
                                                            <SvgComponent svgName={"camera"} hight={70} width={70} strokeColor={"#FFFFFF"} />
                                                        </TouchableOpacity>
                                                    }
                                                </React.Fragment>
                                            }
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                            <View>
                                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.XS }}>Take a Photo</Text>
                                            </View>
                                            <View style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                                <Text style={styles.circleText}>i</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 10, marginHorizontal: '5%' }}>
                                            <Text style={styles.currentLocationTextValue}>{this.state.currentLoaction ? this.state.currentLoaction : ""}</Text>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                                        {this.state.logInLoader ?
                                            <ActivityIndicator size={"large"} color={Color.COLOR.RED.AMARANTH} /> :
                                            <View style={{ width: "60%", }}>
                                                <BigTextButton
                                                    backgroundColor={Color.COLOR.RED.AMARANTH}
                                                    text={"Login to the Outlet"}
                                                    fontSize={FontSize.SM}
                                                    onPress={() => this.onLoginOutlet()}
                                                    borderRadius={25}
                                                    height={40}
                                                />
                                                <View style={{ flex: 1 }} />
                                            </View>
                                        }
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', bottom: 0 }}>
                                        <Image source={ImageName.OUTLET_BUTTON} style={{ resizeMode: 'contain', height: 190, }} />
                                    </View>
                                </View>
                                :
                                <>
                                    {this.tabSec()}
                                </>
                            }
                        </ScrollView>
                    </>

                }
            </SafeAreaView>
        );
    }
}
// }

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateUserInformation,
            stateCheckForNetwork,
            stateCartData,
            storeOutletListData

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OutletLogInPage);
