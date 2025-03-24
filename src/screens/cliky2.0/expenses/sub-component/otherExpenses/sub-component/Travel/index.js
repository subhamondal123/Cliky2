import React, { Component } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import DatePicker from 'react-native-date-picker'
import ImageBlurLoading from 'react-native-image-blur-loading'
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../../../enums'
import { DataConvert, DateConvert, FileUpload, Toaster } from '../../../../../../../services/common-view-function'
import { App_uri } from '../../../../../../../services/config'
import { ErrorCode } from '../../../../../../../services/constant'
import { MiddlewareCheck, MiddlewareFileCheck } from '../../../../../../../services/middleware'
import { BigTextButton, CheckBox, CustomCamera, DropdownInputBox, ImageUploadModal, TextInputBox } from '../../../../../../../shared'
import { DataValidator } from '../../../../../../../validators'
import { modArrData, modifyArrTransportData, modifyArrTransportModeData, modifyExpenceCategoryArr, validateData, _modifyAddDataArr, modifyUnitArr } from './function'
import styles from './style'

const roomArr = [
    {
        id: 1,
        name: "Standard Room"
    },
    {
        id: 2,
        name: "Economy Ac Room"
    },
    {
        id: 3,
        name: "Super Deluxe Room"
    },
    {
        id: 4,
        name: "Suite Room"
    },
]

export class Travel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hotelName: "",
            hotelNameActive: false,
            roomTypeArr: [],
            selectedRoomTypeObj: {},
            expenceTypeData: [],
            expenceTypeSelectedObj: {},
            transportData: [],
            transportSelectObj: {},
            transportMode: [],
            transportModeSelectObj: {},
            fromDatePicker: false,
            fromDateObj: {
                rawDate: new Date(),
                fromDate: ""
            },
            toDatePicker: false,
            toDateObj: {
                rawDate: new Date(),
                toDate: ""
            },
            address: "",
            addressActive: false,
            actualBillAmount: "",
            actualBillAmountActive: false,
            totalAmount: 0,
            approxKm: "",
            cost: "",
            unitData: [],
            unitSelectedObj: {},

            allImages: [],
            allImgShow: [],
            visiblePhotoModal: false,
            imageLoader: false,
            imgName: "",
            imgUri: "",
            domesticAbroadCheck: true,
            expenseLocation: 1,
            allotedRate: "0",

            cameraVisible: false,
            pageLoader: false,
            fromPoints: "",
            toPoints: ""
        }
    }

    componentDidMount = () => {
        this._onLoad()
    }

    _onLoad = async () => {
        // await this._onExpenceCategory()
        this._onSubcategoryDropDown()
        this._onunitDropDown()
    }

    _onExpenceCategory = async () => {
        let reqData = {
            "expenseTypeId": this.props.selectedTabData.id
        }
        this.setState({ pageLoader: true })
        let responseData = await MiddlewareCheck("masterExpenseCategoryTypes", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    expenceTypeData: modifyExpenceCategoryArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ pageLoader: false })
    }

    _onChangeHotelName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.setState({
            hotelName: newText
        })
    }
    _OnSelectRoomType = (value) => {
        this.setState({
            selectedRoomTypeObj: value,
        })
    }

    _onunitDropDown = async (value) => {
        let responseData = await MiddlewareCheck("getUnitsDropdown", {}, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    unitData: modifyUnitArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }
    unitSec = () => {
        const _onUnitType = (value) => {
            this.setState({ unitSelectedObj: value })
        }
        return (
            <>
                <View style={{}} />
                <DropdownInputBox
                    selectedValue={this.state.unitSelectedObj.id ? this.state.unitSelectedObj.id.toString() : "0"}
                    data={this.state.unitData}
                    onSelect={(value) => _onUnitType(value)}
                    headerText={"Unit"}
                />
            </>
        )
    }

    _onApproxKm = (value) => {
        this.setState({
            approxKm: value
        })
    }


    _onCostTextChange = (value) => {
        let p = DataConvert.uptoTwoDecimalInput(value)
        this.setState({
            cost: p,
            totalAmount: p
        })
    }

    //...............................................
    _onFromDatePicker = () => {
        this.setState({
            fromDatePicker: true
        })
    }
    _onFromCloseDatePicker = () => {
        this.setState({
            fromDatePicker: false
        })
    }


    _onSelectFromDate = (date) => {
        this.state.fromDateObj.rawDate = date.date;
        this.state.toDateObj.toDate = ""
        this.state.toDateObj.rawDate = new Date()
        this.state.fromDateObj.fromDate = DateConvert.formatYYYYMMDD(date.date);
        this.setState({
            toDateObj: this.state.toDateObj,
            fromDateObj: this.state.fromDateObj
        });
        this._onFromCloseDatePicker()
    }

    _onToDatePicker = () => {
        this.setState({
            toDatePicker: true
        })
    }
    _onToCloseDatePicker = () => {
        this.setState({
            toDatePicker: false
        })
    }

    _onSelectToDate = (date) => {
        this.state.toDateObj.rawDate = date.date;
        this.state.toDateObj.toDate = DateConvert.formatYYYYMMDD(date.date);
        this.setState({
            toDateObj: this.state.toDateObj
        });
        this._onToCloseDatePicker()
    }
    _onChangeAddress = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.setState({
            address: newText
        })
    }
    _onChangeActualBill = (value) => {
        let p = DataConvert.uptoTwoDecimalInput(value)
        this.setState({
            actualBillAmount: p,

        })
    }
    _onTakePhoto = async () => {
        this.state.visiblePhotoModal = !this.state.visiblePhotoModal;
        this.setState({
            visiblePhotoModal: this.state.visiblePhotoModal
        })
    }

    _modifyImgShowingArr = (data) => {
        this.setState({ allImgShow: _modifyAddDataArr(data) })

    }
    // for custom camera open
    onSelectPic = async (value) => {
        await this._onTakePhoto(false);
        await this._onImageUpload(value);
        // this.setState({ fromDatePicker: false, toDatePicker: false })
    }

    _onImageUpload = async (uploadData) => {
        this.setState({
            listLoader: true,
            imgName: uploadData.name,
            imgUri: uploadData.name,
        })
        this.setState({ imageLoader: true, })
        let responseData = await MiddlewareFileCheck("crmImageupload", uploadData, this.props);

        if (responseData == false) {

        } else {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let data = [
                    {
                        "images": responseData.response.fileName,
                        "imagePath": uploadData.uri
                    }
                ]
                this.setState({
                    allImages: [...this.state.allImages, ...data]
                })

                this._modifyImgShowingArr(this.state.allImages);
                Toaster.ShortCenterToaster(responseData.message)
            } else {
                // Toaster.ShortCenterToaster(responseData.message)
            }
        }

        this.setState({ imageLoader: false })
    }

    modalSection = () => {
        //for image picker
        const _onChooseGallery = async () => {
            await this._onTakePhoto();
            let uploadData = await FileUpload.uploadImg();
            await this._onImageUpload(uploadData);
        }

        // get photo from camera
        const _onChooseCamera = async () => {
            // await this._onTakePhoto();
            // let uploadData = await FileUpload.uploadCameraImg();
            // await _onImageUpload(uploadData);
            this.setState({ cameraVisible: true });
        }



        return (
            <ImageUploadModal
                isVisible={this.state.visiblePhotoModal}
                onGallerySelect={(value) => _onChooseGallery(value)}
                onCameraSelect={(value) => _onChooseCamera(value)}
                onCloseModal={(value) => this._onTakePhoto(value)}
            />
        )
    }

    expenceTypeSec = () => {
        const _onSelectExpenceType = (value) => {
            this.setState({ expenceTypeSelectedObj: value })
            this._onSubcategoryDropDown(value.id)
        }
        return (
            <DropdownInputBox
                selectedValue={this.state.expenceTypeSelectedObj.id ? this.state.expenceTypeSelectedObj.id.toString() : "0"}
                data={this.state.expenceTypeData}
                onSelect={(value) => _onSelectExpenceType(value)}
                headerText={"Expense category"}
            />
        )
    }

    _onSubcategoryDropDown = async (value) => {
        let reqData = {
            "expenseTypeId": this.props.selectedTabData.id,
            "expenseCatagoryId": this.props.selectedSubTabItem.id
        }
        this.setState({ transportLoader: true })
        let responseData = await MiddlewareCheck("masterExpenseSubCategoryTypes", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    transportData: modifyArrTransportData(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ transportLoader: false })
    }

    transportSec = () => {
        const _onSelectTransportSelect = (value) => {
            this.setState({ transportSelectObj: value });
            this._onTransportModeDropDown(value.id)
        }
        return (
            <>
                <View style={{ marginTop: 15 }} />
                {this.state.transportLoader ?
                    <View style={{ marginTop: 10 }}>
                        <ActivityIndicator size={"small"} color={Color.COLOR.GRAY.LIGHT_GRAY_COLOR} />
                    </View> :
                    <DropdownInputBox
                        selectedValue={this.state.transportSelectObj.id ? this.state.transportSelectObj.id.toString() : "0"}
                        data={this.state.transportData}
                        onSelect={(value) => _onSelectTransportSelect(value)}
                        headerText={"Mode of Transport"}

                    />
                }
            </>
        )
    }

    _onTransportModeDropDown = async (value) => {
        let reqData = {
            "expenseTypeId": this.props.selectedTabData.id,
            "expenseCategoryId": this.props.selectedSubTabItem.id.toString(),
            "expenseSubCategoryId": value
        }
        this.setState({ transportModeLoader: true })
        let responseData = await MiddlewareCheck("masterExpenseCategoryModes", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    transportMode: modifyArrTransportModeData(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ transportModeLoader: false })
    }

    getAllowanceRate = async (value) => {
        let reqData = {
            "expenseTypeId": this.props.selectedTabData.id,
            "expenseCategoryId": this.props.selectedSubTabItem.id.toString(),
            "expenseSubCategoryId": this.state.transportSelectObj.id,
            "expenseCategoryModeId": value

        }
        let responseData = await MiddlewareCheck("getAllowanceRate", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allotedRate: responseData.response
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    transportModeSec = () => {
        const _onSelectTransportModeSelect = (value) => {
            this.setState({ transportModeSelectObj: value });
            this.getAllowanceRate(value.id)
        }
        return (
            <>
                <View style={{ marginTop: 15 }} />
                {this.state.transportModeLoader ?
                    <View style={{ marginTop: 10 }}>
                        <ActivityIndicator size={"small"} color={Color.COLOR.GRAY.LIGHT_GRAY_COLOR} />
                    </View> :
                    <DropdownInputBox
                        selectedValue={this.state.transportModeSelectObj.id ? this.state.transportModeSelectObj.id.toString() : "0"}
                        data={this.state.transportMode}
                        onSelect={(value) => _onSelectTransportModeSelect(value)}
                        headerText={"Travel Type*"}

                    />
                }
            </>
        )
    }

    _onLoader = (value) => {
        this.setState({ mainLoader: value })
    }

    onFinalSubmit = () => {
        let reqData = {
            "type": "Travelling",
            "hotelName": this.state.transportSelectObj.name ? this.state.transportSelectObj.name.toString() : "",
            "roomType": this.state.transportModeSelectObj.name ? this.state.transportModeSelectObj.name.toString() : "",
            "expenseTypeId": this.props.selectedTabData.id.toString(),
            "expenseCategoryModeId": this.state.transportModeSelectObj.id ? this.state.transportModeSelectObj.id.toString() : "",
            "expenseCategoryId": this.props.selectedSubTabItem.id.toString(),
            "expenseSubCategoryId": this.state.transportSelectObj.id ? this.state.transportSelectObj.id.toString() : "",
            "startDateTime": this.state.fromDateObj.fromDate ? this.state.fromDateObj.fromDate : "",
            "startRawDate": this.state.fromDateObj.rawDate ? this.state.fromDateObj.rawDate : "",
            "endRawDate": this.state.toDateObj.rawDate ? this.state.toDateObj.rawDate : "",
            "endDatetime": this.state.toDateObj.toDate ? this.state.toDateObj.toDate : "",
            "rawDate": this.state.fromDateObj.rawDate ? this.state.fromDateObj.rawDate : "",
            "address": this.state.address,
            "expenseValue": this.state.approxKm,
            "expenseUnitId": this.state.unitSelectedObj.id ? this.state.unitSelectedObj.id.toString() : "",
            "expenseLocation": this.state.expenseLocation.toString(),
            "finalAmount": this.state.cost,
            "allBillImage": this.state.allImages,
            "totalAmount": this.state.totalAmount,
            "expenseId": "0",
            "fromPoint": this.state.fromPoints,
            "toPoint": this.state.toPoints
        }

        let validData = validateData(reqData);
        if (validData.status) {
            this.props.onSaveDataToParent(reqData)
            this.clearFieldData()
        }
    }

    clearFieldData = () => {
        this.setState({
            hotelName: "",
            transportSelectObj: {},
            transportModeSelectObj: {},
            expenceTypeSelectedObj: {},
            selectedRoomTypeObj: {},
            fromDateObj: {
                rawDate: new Date(),
                fromDate: ""
            },
            toDateObj: {
                rawDate: new Date(),
                toDate: ""
            },
            allImages: [],
            allImgShow: [],
            address: "",
            actualBillAmount: "",
            totalAmount: "",
            approxKm: "",
            unitSelectedObj: {},
            cost: "",
            fromPoints: "",
            toPoints: ""
        })
    }

    checkboxsec = () => {
        return (
            <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: '2%' }}>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                    <View style={{ marginTop: 2 }}>
                        <CheckBox
                            borderRadius={35}
                            borderColor={"#286a94"}
                            type="circle"
                            data={this.state.domesticAbroadCheck}
                            onClickValue={() => this.onClickDomestic("domestic")}
                            height={20}
                            width={20}
                            borderWidth={2}
                        />
                    </View>
                    <View style={{ marginLeft: '5%' }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Domestic</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                    <View style={{ marginTop: 2 }}>
                        <CheckBox
                            borderRadius={35}
                            borderWidth={2}
                            height={20}
                            width={20}
                            borderColor={"#286a94"}
                            type="circle"
                            data={!this.state.domesticAbroadCheck}
                            onClickValue={() => this.onClickAbroad("abroad")}
                        />
                    </View>
                    <View style={{ marginLeft: '5%' }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Abroad</Text>
                    </View>
                </View>

            </View>
        )
    }

    onClickDomestic = (type) => {
        if (this.state.domesticAbroadCheck == false) {
            this.state.domesticAbroadCheck = true;
            this.state.expenseLocation = 1;
            this.setState({
                domesticAbroadCheck: this.state.domesticAbroadCheck,
                expenseLocation: this.state.expenseLocation
            })
        }
    }
    onClickAbroad = (type) => {
        if (this.state.domesticAbroadCheck == true) {
            this.state.domesticAbroadCheck = false;
            this.state.expenseLocation = 0;
            this.setState({
                domesticAbroadCheck: this.state.domesticAbroadCheck,
                expenseLocation: this.state.expenseLocation
            })

        }
    }

    _onFromPoints = (value) => {
        this.state.fromPoints = value;
        this.setState({
            fromPoints: this.state.fromPoints
        })
    }

    _onToPoints = (value) => {
        this.state.toPoints = value;
        this.setState({
            toPoints: this.state.toPoints
        })
    }


    render() {
        const _onDelete = (item, key) => {
            let arr = this.state.allImages;
            let tempArr = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].imagePath == item.imagePath) {

                } else {
                    tempArr.push(arr[i]);
                }
            }

            this.state.allImages = tempArr;
            this.setState({
                allImages: this.state.allImages
            })
            this._modifyImgShowingArr(this.state.allImages);
        }

        if (this.state.cameraVisible) {
            return <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
        } else {
            return (
                <View>
                    {this.state.pageLoader ?
                        <View style={{ justifyContent: "center", alignItems: "center", height: Dimension.height / 2.2 }}>
                            <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.DARK_BLUE} />
                        </View>

                        :
                        <>
                            {this.checkboxsec()}
                            {/* {this.expenceTypeSec()} */}
                            {this.transportSec()}
                            {this.transportModeSec()}

                            <View style={{ marginBottom: 15, flexDirection: "row", flex: 1, marginTop: 15 }}>
                                <View style={{ flex: 0.5 }}>
                                    <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onFromDatePicker()} activeOpacity={0.9}>
                                        <Text style={[styles.inputBoxText, this.state.fromDateObj.fromDate.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>{this.state.fromDateObj.fromDate.length == 0 ? "*From Date" : this.state.fromDateObj.fromDate}</Text>
                                        <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                                        </View>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        open={this.state.fromDatePicker}
                                        date={this.state.fromDateObj.rawDate}
                                        maximumDate={new Date()}
                                        mode={"date"}
                                        onConfirm={(date) => {
                                            this._onSelectFromDate({ date })
                                        }}
                                        onCancel={() => {
                                            this._onFromCloseDatePicker()
                                        }}
                                    />
                                </View>
                                <View style={{ width: 5 }} />
                                <View style={{ flex: 0.5 }}>
                                    <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onToDatePicker()} activeOpacity={0.9}>
                                        <Text style={[styles.inputBoxText, this.state.toDateObj.toDate.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>{this.state.toDateObj.toDate.length == 0 ? "*To Date" : this.state.toDateObj.toDate}</Text>
                                        <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                                        </View>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        open={this.state.toDatePicker}
                                        date={this.state.toDateObj.rawDate}
                                        mode={"date"}
                                        minimumDate={this.state.fromDateObj.rawDate}
                                        onConfirm={(date) => {
                                            this._onSelectToDate({ date })
                                        }}
                                        onCancel={() => {
                                            this._onToCloseDatePicker()
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: 10, flexDirection: 'row', marginBottom: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <TextInputBox
                                        placeholder={"From Point"}
                                        // keyboardType="numeric"
                                        value={this.state.fromPoints}
                                        // maxLength={15}
                                        height={45}
                                        onChangeText={(value) => this._onFromPoints(value)}
                                    />
                                </View>
                                <View style={{ width: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <TextInputBox
                                        placeholder={"To Point"}
                                        // keyboardType="numeric"
                                        value={this.state.toPoints}
                                        // maxLength={15}
                                        height={45}
                                        onChangeText={(value) => this._onToPoints(value)}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <TextInputBox
                                        placeholder={"Distance"}
                                        keyboardType="numeric"
                                        value={this.state.approxKm}
                                        maxLength={15}
                                        height={45}
                                        onChangeText={(value) => this._onApproxKm(value)}
                                    />
                                </View>
                                <View style={{ width: 8 }} />
                                <View style={{ flex: 1 }}>
                                    {this.unitSec()}
                                </View>
                            </View>

                            <View style={{ flex: 1, marginTop: 15 }}>
                                <TextInputBox
                                    placeholder={"Cost"}
                                    keyboardType="numeric"
                                    maxLength={10}
                                    value={this.state.cost}
                                    onChangeText={(value) => this._onCostTextChange(value)}
                                />
                            </View>
                            {/* <View style={{ marginBottom: 15 }}>
                                <TextInputBox
                                    value={this.state.address}
                                    onChangeText={(value) => this._onChangeAddress(value)}
                                    placeholder={"Address*"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={this.state.addressActive}
                                    onFocus={() => { this.setState({ addressActive: true }) }}
                                    onBlur={() => { this.setState({ addressActive: false }) }}
                                    height={45}
                                    returnKeyType="done"
                                />
                            </View>
                            <View style={{ marginBottom: 15, flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 0.5, flexDirection: "row" }}>
                                    <Text style={styles.allotedTxt}>Alloted</Text>
                                    <Text style={styles.allotedAmt}>{'\u20B9' + " " + this.state.allotedRate}</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <TextInputBox
                                        value={this.state.actualBillAmount}
                                        onChangeText={(value) => this._onChangeActualBill(value)}
                                        placeholder={"Actual Bill Amount*"}
                                        keyboardType={"number-pad"}
                                        isActive={this.state.actualBillAmountActive}
                                        onFocus={() => { this.setState({ actualBillAmountActive: true }) }}
                                        onBlur={() => { this.setState({ actualBillAmountActive: false }) }}
                                        height={45}
                                        returnKeyType="done"
                                    />
                                </View>
                            </View> */}
                            <View style={{ marginBottom: 10 }}>
                                <View style={styles.photoSec}>
                                    <View style={styles.photoSec}>
                                        {this.state.allImgShow.map((item, key) => (
                                            <React.Fragment key={key}>
                                                <View style={styles.mainView}>
                                                    <View style={styles.mainImageView}>
                                                        {item.map((item1, key1) => (
                                                            <React.Fragment key={key1}>
                                                                <View style={styles.flexANdMarginView}>
                                                                    <View style={styles.logisticImageView}>
                                                                        <ImageBlurLoading source={{ uri: App_uri.IMAGE_VIEW_URI + item1.images }} style={styles.TakephotoImg} />
                                                                        <View style={{ position: 'absolute', right: 0, top: 0, alignItems: 'center', justifyContent: 'center' }}>
                                                                            <TouchableOpacity style={styles.deleteLogoSec} onPress={() => _onDelete(item1, key1)} activeOpacity={0.9}>
                                                                                <Image source={ImageName.WHITE_DELETE_LOGO} style={styles.whiteDeleteLogo} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </React.Fragment>
                                                        ))}
                                                    </View>
                                                </View>

                                            </React.Fragment>
                                        ))}
                                    </View>
                                </View>
                                {this.state.imageLoader ?
                                    <View style={{
                                        width: '100%',
                                        height: undefined,
                                        paddingVertical: 15
                                    }}>
                                        <ActivityIndicator size="large" color={Color.COLOR.BLUE.VIOLET_BLUE} />
                                    </View>
                                    :
                                    <>
                                        <TouchableOpacity style={styles.addImgField} activeOpacity={0.9} onPress={() => this._onTakePhoto()}>
                                            <View style={styles.addImg}>
                                                <Image source={ImageName.ADD_BILL_IMAGE_LOGO} style={styles.addImgIcon} />
                                            </View>
                                        </TouchableOpacity>
                                    </>

                                }
                            </View>
                            <View style={{ marginVertical: 20, flexDirection: "row", marginHorizontal: "30%", justifyContent: "center" }}>
                                {this.state.mainLoader ?
                                    <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.DARK_BLUE} />
                                    :
                                    <BigTextButton text={"Save"} backgroundColor={Color.COLOR.BLUE.SKY_BLUE} onPress={() => this.onFinalSubmit()} />
                                }

                            </View>
                            <View style={{ marginBottom: 10 }}>

                                {/* <View style={styles.underline} />
                                <View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.totalTxt}>Total</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.totalAmtTxt}>{'\u20B9' + " " + this.state.totalAmount}</Text>
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Image source={ImageName.DOWN_ARROW} style={styles.downArrowImg} />
                                    </View>
                                </View>
                                <View style={styles.underline} /> */}

                            </View>
                            {/* <View style={{ marginVertical: 20, flexDirection: "row" }}>
                    <View style={{ flex: 0.5 }}></View>
                    <View style={{ flex: 0.5 }}>
                        <BigTextButton text={"Final Submit"} backgroundColor={Color.COLOR.BLUE.SKY_BLUE} onPress={() => this.onFinalSubmit()} />
                    </View>
                </View> */}
                        </>
                    }

                    <View style={{ marginBottom: 10 }} />
                    {this.modalSection()}
                </View>

            )
        }
    }
}

export default Travel