import React from "react";
import { Image, SafeAreaView, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { stateCheckForNetwork } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, CheckBox, ImageViewModal, TextInputBox, VirtualizedView } from "../../../shared";
import { DataValidator } from "../../../validators";
import { DateConvert, FileDownload, FileUpload, Toaster } from "../../../services/common-view-function";
import { modifyPaymentHistoryList, validateData } from "./function";
import { MiddlewareCheck, MiddlewareFileCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { App_uri } from "../../../services/config";

let boxData = [
    {
        id: 1,
        text: 'Cash',
        image: ImageName.PURSE_ICON,
        check: false
    },
    {
        id: 2,
        text: 'Upi',
        image: ImageName.UPI_LOGO,
        check: false

    },
    {
        id: 3,
        text: 'Net Banking',
        image: ImageName.CHEQUE_LOGO,
        check: false

    },
    {
        id: 4,
        text: 'Cheque',
        image: ImageName.CHEQUE_LOGO,
        check: false

    },
    {
        id: 5,
        text: 'Demand Draft',
        image: ImageName.UPI_LOGO,
        check: false

    },
    {
        id: 6,
        text: 'Credit card',
        image: ImageName.CARD_LOGO,
        check: false

    },
    {
        id: 7,
        text: 'Debit card',
        image: ImageName.CARD_LOGO,
        check: false

    },
    {
        id: 8,
        text: 'Other',
        image: ImageName.UPI_LOGO,
        check: false

    }
]

const checkBoxArr = [
    {
        id: 0,
        name: 'Due',
        check: true
    },
    {
        id: 1,
        name: 'Full Pay',
        check: false

    },
    {
        id: 2,
        name: 'Partial Pay',
        check: false

    },
]

class OrderPaymentHistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentHistory: [],
            totalDataCount: "",
            paymentCheck: false,
            paidAmount: "",
            paidAmountActive: false,
            paymentMode: boxData,
            commentText: "",
            selectPaymentmode: {},
            selectPaymentStatus: "0",
            imgName: "",
            imgUri: "",
            docLoader: false,
            documentImg: "",
            paymentHistoryLoader: false,
            updatePaymentLoader: false,
            imageModalVisibility: false,
            totalBillAmount: 0
        };
    }

    componentDidMount = async () => {
        await this._load();
    }

    _load = async () => {
        this.setState({ paymentHistoryLoader: true });
        let responseData = await MiddlewareCheck("paymentHistory", { orderNumber: this.props.route.params.data.recordNumber }, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let paymentHistoryData = modifyPaymentHistoryList(responseData);
                this.setState({
                    paymentHistory: paymentHistoryData.paymentHistoryList,
                    totalBillAmount: paymentHistoryData.totalBillAmount
                });
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ paymentHistoryLoader: false });

    };

    _onBack = () => {
        this.props.navigation.goBack();
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }


    // this function used for header section design implement here
    _onHeaderSec = () => {
        return (
            <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                <View style={{ marginTop: 8, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, }}>Update Payment</Text>
                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 3 }} />
                </View>
                <View style={{ marginTop: 10 }} />
                <View style={{ backgroundColor: "#1F2B4D", borderRadius: 22, padding: 8, marginBottom: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}>
                        <Text style={{ color: "#D1D1D1", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Order ID  <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>#{this.props.route.params.data.recordNumber}</Text></Text>
                        <View style={{ flex: 1 }} />
                        <Text style={{ color: "#D1D1D1", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginRight: '5%' }}>{DateConvert.formatDDfullMonthYYYY(this.props.route.params.data.createdAt)}</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={ImageName.RED_CIRCEL_DOWNLOAD} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    // for total bill amount design here
    totalBillAmountSection = () => {
        return (
            <View style={styles.billSec}>
                <Image source={ImageName.ORDER_BILL_ICON} style={styles.billImg} />
                <Text style={styles.profileLocTxt}>Total Bill</Text>
                <Text style={styles.billAmountTxt}>{'\u20B9' + this.state.totalBillAmount}</Text>
            </View>
        )
    }

    // for check box function and design implement here
    checkBoxSection = () => {
        const _onCheck = (item, key) => {
            let selectedOption = "";
            for (let i = 0; i < checkBoxArr.length; i++) {
                if (i == key) {
                    checkBoxArr[i].check = true;
                    selectedOption = checkBoxArr[i].id
                    if (checkBoxArr[i].id == "1") {
                        this.setState({ paidAmount: this.state.totalBillAmount.toString() })
                    } else {
                        this.setState({ paidAmount: "" })
                    }
                } else {
                    checkBoxArr[i].check = false;
                }
            }
            this.setState({ selectPaymentStatus: selectedOption })
        }
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {checkBoxArr.map((item, key) => (
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row' }} key={key} >
                        <CheckBox
                            type={"tick"}
                            borderRadius={30}
                            data={item.check}
                            onClickValue={(value) => _onCheck(item, key)}
                            backgroundColor={"#D0D9DF"}
                            selectBackgroundColor={Color.COLOR.GREEN.LIGHT_GREEN}
                            borderWidth={0}
                        />
                        <Text style={styles.checkBoxTxt}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>
        )
    }
    onPaidAmount = (value) => {
        let newText = DataValidator.inputEntryValidate(value, "number")
        this.setState({ paidAmount: newText })
    }
    // this function used for paid amount text input field
    amountFieldSection = () => {
        return (
            <View style={{ marginTop: 25 }}>
                <TextInputBox
                    placeholder={"Paid Amount"}
                    height={45}
                    value={this.state.paidAmount}
                    onChangeText={(value) => this.onPaidAmount(value)}
                    keyboardType="number-pad"
                    isActive={this.state.paidAmountActive}
                    onFocus={() => { this.setState({ paidAmountActive: true }) }}
                    onBlur={() => { this.setState({ paidAmountActive: false }) }}
                    returnKeyType="done"
                    borderRadius={20}
                    activeBGColor={"#D0D9DF"}
                    inactiveBGColor={"#D0D9DF"}
                    placeholderTextColor={"#1F2B4D"}
                    editable={this.state.selectPaymentStatus == 1 ? false : true}
                />
            </View>
        )
    }

    // this function used for comment text
    _onCommentText = (value) => {
        this.setState({
            commentText: value
        })
    }

    // for select payment mode this function used
    _onPaymentMode = (item) => {
        for (let i = 0; i < this.state.paymentMode.length; i++) {
            if (this.state.paymentMode[i] == item) {
                this.state.paymentMode[i].check = true;
            } else {
                this.state.paymentMode[i].check = false;
            }
        }
        this.setState({
            selectPaymentmode: item,
            paymentMode: this.state.paymentMode
        })
    }

    //clear all data
    clearAllData = () => {
        for (let i = 0; i < this.state.paymentMode.length; i++) {
            this.state.paymentMode[i].check = false;
        }
        this.setState({
            selectPaymentmode: {},
            selectPaymentStatus: "0",
            documentImg: "",
            paidAmount: "",
            commentText: ""
        })
    }

    // this function used for update payment Api call 
    _onUpdatePayment = async () => {
        let validatedData = validateData(this.state);
        if (validatedData.status) {
            let reqData = {
                "paymentModeId": this.state.selectPaymentmode.id ? this.state.selectPaymentmode.id : "",
                "paymentStatus": this.state.selectPaymentStatus ? this.state.selectPaymentStatus : "",
                "suportingDocPath": this.state.documentImg,
                "paidAmount": this.state.paidAmount,
                "orderNumber": this.props.route.params.data.recordNumber,
                "createdAt": DateConvert.fullDateFormat(new Date())
            }
            this.setState({ updatePaymentLoader: true })
            let responseData = await MiddlewareCheck("updatePayment", reqData, this.props);
            if (responseData === false) {
                this._onNetworkError()
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.clearAllData();
                    this._load();
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ updatePaymentLoader: false })
        }
    }

    // for Upload document press button
    _onUploadDoc = async () => {
        let uploadData = await FileUpload.uploadDocumentAndImage();
        await this._onDocUpload(uploadData);
    }

    // for doc upload Api call here
    _onDocUpload = async (uploadData) => {
        this.setState({ docLoader: true, })
        this.setState({
            docLoader: true,
            imgName: uploadData.name,
            imgUri: uploadData.uri,
        })
        let responseData = await MiddlewareFileCheck("fileupload", uploadData, this.props);
        if (responseData == false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let imgData = responseData.response.fileName;
                this.setState({
                    documentImg: imgData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ docLoader: false })
    }

    // for payment history list design implementation

    paymentHistory = () => {
        const onDownloadDoc = async (doc) => {
            await FileDownload.downloadDocument(App_uri.CRM_BASE_URI + doc)

        }
        return (
            <View>
                {this.state.paymentHistoryLoader ?
                    <View>
                        <ActivityIndicator />
                    </View> :
                    <React.Fragment>
                        {this.state.paymentHistory.length > 0 ?
                            <React.Fragment>
                                <View style={{ flexDirection: "row", width: Dimension.width - 40 }}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                        {this.state.paymentHistory.map((item, key) => (
                                            <View key={key} >
                                                <View style={{ backgroundColor: Color.COLOR.WHITE.PURE_WHITE, borderRadius: 10, borderColor: "#F13748", borderWidth: 0.9, borderStyle: "dashed", marginHorizontal: 5, marginTop: 5, width: Dimension.width - 50, }} >
                                                    <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{DateConvert.formatDDfullMonthYYYY(item.createdAt)}</Text>

                                                            <View style={{ flexDirection: 'row', flex: 1, marginLeft: 15, }}>
                                                                <Image source={ImageName.CASH_IN_HAND_ICON} style={{ height: 26, width: 26, resizeMode: 'contain', top: -2 }} />
                                                                <Text style={{ color: "#00B65E", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 10 }}>{'\u20B9' + " " + item.paidAmount}</Text>
                                                            </View>

                                                            <View style={{ flexDirection: "row" }}>
                                                                <View style={{ height: 25, width: 25, borderRadius: 100, backgroundColor: '#F13748', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                                                    <Image source={ImageName.ORDER_RECEIPT_IMG} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
                                                                </View>
                                                                <Text style={{ color: '#F13748', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{'\u20B9' + " " + item.orderActtualBillAmount}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', marginTop: 2, alignItems: 'center' }}>
                                                            <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Paid by <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.paymentModeId == 1 ? "Cash" : item.paymentModeId == 2 ? "Upi" : item.paymentModeId == 3 ? "Net Banking" : item.paymentModeId == 4 ? "Cheque" : item.paymentModeId == 5 ? "Demand Draft" : item.paymentModeId == 6 ? "Credit Card" : item.paymentModeId == 7 ? "Debit Card" : "Others"}</Text></Text>
                                                            <View style={{ flex: 1, marginLeft: 15 }}>
                                                                <Image source={item.paymentModeId == 1 ? ImageName.PURSE_ICON : item.paymentModeId == 2 ? ImageName.UPI_LOGO : item.paymentModeId == 3 ? ImageName.CHEQUE_LOGO : item.paymentModeId == 4 ? ImageName.CHEQUE_LOGO : item.paymentModeId == 5 ? ImageName.UPI_LOGO : item.paymentModeId == 6 ? ImageName.CARD_LOGO : item.paymentModeId == 7 ? ImageName.CARD_LOGO : ImageName.UPI_LOGO} style={{ height: 30, width: 30, resizeMode: 'contain', }} />
                                                            </View>
                                                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }} onPress={() => onDownloadDoc(item.suportingDocPath)}>
                                                                <View style={{ height: 25, width: 25, borderRadius: 100, backgroundColor: '#FF6A4D', justifyContent: 'center', alignItems: 'center', flexDirection: "row", marginRight: 5 }}>
                                                                    <Image source={ImageName.ORDER_DOCUMENT_DOWNLOAD} style={{ height: 25, width: 25, resizeMode: 'contain' }} />

                                                                </View>
                                                                <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Document</Text>

                                                            </TouchableOpacity>
                                                        </View>

                                                    </View>
                                                </View>

                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            </React.Fragment>
                            :
                            null
                        }
                    </React.Fragment>
                }
            </View>
        )
    }

    paymentModeSec = () => {
        return (
            <View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Payment Mode</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.state.paymentMode.map((item, key) => (
                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20 }} key={key} onPress={() => this._onPaymentMode(item)} activeOpacity={0.9}>
                            <View style={item.check ? styles.selectActivePaymentMode : styles.inActivePaymentMode}>
                                <Image source={item.image} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                                <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 3, textAlign: "center" }}>{item.text}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        )
    }

    uploadDocSec = () => {
        const onRemoveDoc = () => {
            this.setState({ documentImg: "" })
        }

        const onShowDoc = (docData) => {
            this.setState({
                imageModalVisibility: true
            })
        }

        return (
            <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 0.7 }}>
                    <Text style={{ color: '#000', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Upload Document</Text>
                    <Text style={{ color: '#000', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>If any document available</Text>
                </View>
                {this.state.documentImg.length > 0 ?
                    <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <TouchableOpacity style={{ borderWidth: 0.6, borderRadius: 15, paddingVertical: 10, paddingHorizontal: 5, borderColor: Color.COLOR.BLUE.LOTUS_BLUE, justifyContent: "center", alignItems: "center" }} onPress={() => onShowDoc(this.state.documentImg)}>
                            <Image source={ImageName.DOCUMENT_YELLOW} style={{ height: 36, width: 36, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={{ top: -25, left: -10 }} onPress={() => onRemoveDoc()}>
                            <Image source={ImageName.RED_CLOSE_IMG} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flex: 0.3, marginTop: 3 }}>
                        {this.state.docLoader ?
                            <View>
                                <ActivityIndicator />
                            </View> :
                            <BigTextButton
                                text={"Upload"}
                                fontSize={12}
                                fontColor={"#000"}
                                backgroundColor={"#fff"}
                                borderRadius={18}
                                additionalStyles={{ borderColor: '#000', borderWidth: 1 }}
                                onPress={() => this._onUploadDoc()}
                            />
                        }
                    </View>
                }

            </View>
        )
    }

    modalSection = () => {
        const closeImageModal = () => {
            this.setState({ imageModalVisibility: false })
        }
        return (
            <>
                <ImageViewModal
                    isVisible={this.state.imageModalVisibility}
                    onBackButtonPress={() => closeImageModal()}
                    onBackdropPress={() => closeImageModal()}
                    props={this.props}
                    link={App_uri.CRM_BASE_URI + this.state.documentImg}
                />
            </>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._onHeaderSec()}
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <View style={{ marginHorizontal: '5%' }}>
                        {this.totalBillAmountSection()}
                        {this.paymentHistory()}
                        {this.checkBoxSection()}
                        {this.amountFieldSection()}
                        <View style={{ marginTop: 15 }}>
                            {this.paymentModeSec()}
                            {this.uploadDocSec()}
                            <View style={{ marginTop: 30 }}>
                                <TextInputBox
                                    placeholder={"Comment"}
                                    height={85}
                                    value={this.state.commentText}
                                    onChangeText={(value) => this._onCommentText(value)}
                                    borderRadius={20}
                                    alignItems={"flex-start"}
                                    placeholderTextColor={"#1F2B4D"}
                                />
                            </View>
                            <View style={{ justifyContent: 'center', marginTop: 25, marginHorizontal: '30%' }}>
                                {this.state.updatePaymentLoader ?
                                    <View>
                                        <ActivityIndicator />
                                    </View >
                                    :
                                    <React.Fragment>
                                        {
                                            this.state.docLoader ?
                                                null :
                                                <BigTextButton
                                                    text={"Update Payment"}
                                                    fontSize={12}
                                                    fontColor={"#fff"}
                                                    backgroundColor={"#1F2B4D"}
                                                    borderRadius={22}
                                                    onPress={() => this._onUpdatePayment()}

                                                />
                                        }

                                    </React.Fragment>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 80 }} />
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentHistoryPage);
