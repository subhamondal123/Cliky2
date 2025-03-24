import React from "react";
import { Image, SafeAreaView, Text, View, TouchableOpacity, ScrollView, Linking } from "react-native";
import { stateCheckForNetwork } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, NoDataFound } from "../../../shared";
import { MiddlewareCheck } from "../../../services/middleware";
import { DateConvert, OfflineFunction, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { ErrorCode } from "../../../services/constant";
import { ActivityIndicator } from "react-native";
import { getReferalLinkText, orderSuccessfullmodifyData } from "./Function";
import { App_uri, DeviceInfo } from "../../../services/config";
import LottieViewLoad from "../../../shared/lottieViewLoad";
import { ClientSettings } from "../../../services/userPermissions";

// for OrderSuccessfull Page 
class OrderSuccessFully extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderSuccessfullData: {
                profilePic: "",
                createdAt: "",
                deliveryStatus: "",
                userName: "",
                profilePic: "",
                contactTypeName: "",
                deliveryPartnerDetails: [],
                approvedStatus: ""
            },
            oderSuccessfulLoader: false,
            isOffline: false

        };
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        let offlineCheck = await ClientSettings.OfflineAccess.getOfflineAccess();
        this.state.isOffline = offlineCheck;
        this.setState(this.state)
        // OfflineFunction.syncOfflineData(this.props, "placeOrder");
        if (this.props.route.params.flow == "fromAddShop") {
            await this._load();
        } else {
            if (!await ClientSettings.OfflineAccess.getOfflineAccess()) {
                await this._load();
            }
        }



    }

    // this is the first function where set the state data
    _load = async () => {
        this.setState({ oderSuccessfulLoader: true });
        let reqData = { "orderNumber": this.props.route.params.orderId };
        let responseData = await MiddlewareCheck("orderSuccessfullyDetails", reqData, this.props);

        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let oderData = orderSuccessfullmodifyData(responseData.response[0]);
                this.setState({ orderSuccessfullData: oderData });
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ oderSuccessfulLoader: false });
    };

    // for back button this function used
    _onBack = () => {
        this.props.navigation.goBack();
        this.props.route.params.onLoad();
    };

    // this function used for header design implement
    headerSec = () => {
        return (
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                    <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                {/* <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 3 }} /> */}
            </View>
        )
    }

    // for delivery partner design implement
    profileCardSection = () => {
        const onPressWhatsapp = (data) => {
            let url = "whatsapp://send?text=" + "" + "&phone=" + data.phoneNumber;
            Linking.openURL(url)
                .then(data => {
                    console.log("WhatsApp Opened");
                })
                .catch(() => {
                    alert("Make sure WhatsApp installed on your device");
                });
        }

        const onPressPhone = (data) => {
            Linking.openURL('tel:' + data.phoneNumber)
        }
        return (
            <View>
                <React.Fragment>
                    <View style={{ marginTop: 20 }} />
                    <View style={styles.cardSection}>
                        <View style={styles.profileSec}>
                            <Image source={this.state.orderSuccessfullData.deliveryPartnerDetails[0].profilePic ? { uri: App_uri.CRM_BASE_URI + this.state.orderSuccessfullData.deliveryPartnerDetails[0].profilePic } : ImageName.USER_IMG} style={styles.profileImgSec} />
                        </View>
                        <TouchableOpacity style={styles.profileMainDetailsSec} activeOpacity={0.9}>
                            <View style={styles.profileDetailsSec}>
                                <View>
                                    <Text style={styles.profileNameTxt} numberOfLines={1}>{this.state.orderSuccessfullData.deliveryPartnerDetails[0].deliveryPartnerName}</Text>
                                </View>
                            </View>
                            <View style={styles.profileDetailsBottomSec}>
                                <Text style={styles.profileTypeTxt}>{this.state.orderSuccessfullData.contactTypeName}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.iconSection}>
                            <TouchableOpacity onPress={() => onPressWhatsapp(this.state.orderSuccessfullData.deliveryPartnerDetails[0])} activeOpacity={0.9}>
                                <Image source={ImageName.REAL_WHATSAPP_ICON} style={styles.iconImg} />
                            </TouchableOpacity>
                            <View style={{ width: 5 }} />
                            <TouchableOpacity onPress={() => onPressPhone(this.state.orderSuccessfullData.deliveryPartnerDetails[0])} activeOpacity={0.9}>
                                <Image source={ImageName.TELEGRAM_LOGO} style={styles.iconImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10 }} />
                </React.Fragment>

            </View>
        )
    }

    // page render here

    shareBill = () => {
        let referalText = getReferalLinkText(this.props.route.params.prevProps, this.props.Sales360Redux.routeData, this.props.route.params.itemProps, this.props.Sales360Redux.loginData, this.props.route.params.finalCartData, this.props.route.params.finalAmount);
        let url = "whatsapp://send?text=" + referalText + "&phone=" + "";
        Linking.openURL(url)
            .then(data => {
                console.log("WhatsApp Opened");
            })
            .catch(() => {
                alert("Make sure WhatsApp installed on your device");
            });

    }

    onlineHtmlData = () => {
        return (
            <>
                {
                    this.state.oderSuccessfulLoader ?
                        <View style={styles.activityLoader}>
                            <ActivityIndicator size="large" color={"#F13748"} />
                        </View> :
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            {/* <ImageBackground source={ImageName.ORDER_SUCCESSFULLY} style={{ height: Dimension.height / 3, width: "100%", marginTop: 10 }} >
                    </ImageBackground> */}
                            <View style={styles.lottieLoadSec}>
                                <LottieViewLoad height={280} width={280} type={"Gpay_Tick"} autoPlay={true} loop={true} />
                            </View>
                            <View style={styles.textMainView}>
                                <Text style={styles.youHaveText}>You Have</Text>
                                <Text style={styles.succesfullyText}>Successfully</Text>
                                <Text style={styles.pleaseOrderText}>Place the Order</Text>
                            </View>
                            <View style={styles.viewStyle} />
                            <View style={{ marginTop: 10 }}>
                                <View style={styles.orderTxtSec}>
                                    <Text style={styles.orderTxt}>Order ID</Text>
                                    <Text style={styles.hashTxt}># {this.state.orderSuccessfullData.orderNumber}</Text>
                                </View>
                                <View style={styles.orderTxtSec}>
                                    <Text style={styles.orderTxt}>Order Date</Text>
                                    <Text style={styles.hashTxt}>{DateConvert.formatDDfullMonthYYYY(this.state.orderSuccessfullData.createdAt)}</Text>
                                </View>
                                <View style={styles.orderTxtSec}>
                                    <Text style={styles.orderStatusTxt}>Order Status</Text>
                                    <View style={styles.approveStatusSec}>
                                        <Text style={styles.approveStatusTxt}>{this.state.orderSuccessfullData.approvedStatus}</Text>
                                    </View>
                                </View>
                                {/* <View>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 5 }}>Delivery Partner</Text>
                        </View> */}
                            </View>
                            {this.state.orderSuccessfullData.deliveryPartnerDetails.length > 0 ?
                                <>
                                    <Text style={styles.deliveryStatus}>Delivery Partner</Text>
                                    {this.profileCardSection()}
                                </>
                                :
                                null
                            }

                            {/* <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#1F2B4D', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Your Bill Will Be available After Approval</Text>
                    </View>
                    <View style={{ marginHorizontal: '28%', marginTop: 20 }}>
                        <BigTextButton
                            text={"Download Bill"}
                            backgroundColor={"#D1D1D1"}
                            fontSize={14}
                            height={55}
                            borderRadius={28}
                        />
                    </View> */}

                            <View style={styles.bigBtnSec}>
                                <BigTextButton
                                    text={"Share Via Whatsapp"}
                                    backgroundColor={"#1F2B4D"}
                                    fontSize={14}
                                    height={55}
                                    borderRadius={28}
                                    onPress={() => this.shareBill()}
                                />
                            </View>

                            {this.props.route.params.screenName == undefined || this.props.route.params.screenName == null ?
                                <TouchableOpacity style={styles.outLetPageTab} onPress={() => this._onOutletPage()}>
                                    <Text style={styles.goShopePage}>Go to Shop page</Text>
                                </TouchableOpacity>
                                : null}
                            <View style={{ marginBottom: 100 }} />
                        </ScrollView>
                }
            </>

        )
    }

    _onOutletPage = () => {
        this.props.navigation.navigate("RouteVisit")
    }

    offlineHtmlData = () => {
        return (
            <>
                {
                    this.state.oderSuccessfulLoader ?
                        <View style={styles.activityLoader}>
                            <ActivityIndicator size="large" color={"#F13748"} />
                        </View> :
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            {/* <ImageBackground source={ImageName.ORDER_SUCCESSFULLY} style={{ height: Dimension.height / 3, width: "100%", marginTop: 10 }} >
                    </ImageBackground> */}
                            <View style={styles.lottieLoadSec}>
                                <LottieViewLoad height={280} width={280} type={"Gpay_Tick"} autoPlay={true} loop={true} />
                            </View>
                            <View style={styles.textMainView}>
                                <Text style={styles.youHaveText}>You Have</Text>
                                <Text style={styles.succesfullyText}>Successfully</Text>
                                <Text style={styles.pleaseOrderText}>Place the Order</Text>
                            </View>
                            <View style={styles.viewStyle} />
                            <View style={{ marginTop: 10 }}>

                                <View style={styles.orderTxtSec}>
                                    <Text style={styles.orderTxt}>Order Date</Text>
                                    <Text style={styles.dateConvertTxt}>{DateConvert.formatDDfullMonthYYYY(new Date())}</Text>
                                </View>
                                <View style={styles.orderTxtSec}>
                                    <Text style={styles.orderStatusTxt}>Order Status</Text>
                                    <View style={styles.approveStatusSec}>
                                        <Text style={styles.approveStatusTxt}>{"Pending"}</Text>
                                    </View>
                                </View>
                                {/* <View>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 5 }}>Delivery Partner</Text>
                        </View> */}
                            </View>
                            {this.state.orderSuccessfullData.deliveryPartnerDetails.length > 0 ?
                                <>
                                    <Text style={styles.deliveryStatus}>Delivery Partner</Text>
                                    {this.profileCardSection()}
                                </>
                                :
                                null
                            }

                            {/* <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#1F2B4D', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Your Bill Will Be available After Approval</Text>
                    </View>
                    <View style={{ marginHorizontal: '28%', marginTop: 20 }}>
                        <BigTextButton
                            text={"Download Bill"}
                            backgroundColor={"#D1D1D1"}
                            fontSize={14}
                            height={55}
                            borderRadius={28}
                        />
                    </View> */}
                            <TouchableOpacity style={styles.outLetPageTab} onPress={() => this._onOutletPage()}>
                                <Text style={styles.goShopePage}>Go to Shop page</Text>
                            </TouchableOpacity>
                            <View style={{ marginBottom: 100 }} />
                        </ScrollView>
                }
            </>

        )
    }


    render() {
        let status = ""
        if (this.state.orderSuccessfullData.deliveryStatus == 0) {
            status = "Delivery Start";
        } else if (this.state.orderSuccessfullData.deliveryStatus == 1) {
            status = "Delivered";
        } else if (this.state.orderSuccessfullData.deliveryStatus == 2) {
            status = "Pending";
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginHorizontal: 15 }}>
                    {this.headerSec()}
                    <>
                        {this.state.isOffline && (this.props.route.params.flow == "fromRouteVisit") ?
                            <>
                                {this.offlineHtmlData()}

                            </> :
                            <>
                                {this.onlineHtmlData()}
                            </>
                        }

                    </>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccessFully);
