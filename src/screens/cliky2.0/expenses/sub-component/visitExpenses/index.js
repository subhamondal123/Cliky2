import React from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../enums';
import styles from './style';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../../redux/Sales360Action';
import { AllPageList } from '../../../../../pageShared';
import { BigTextButton, CheckBox, CustomCamera, DropdownInputBox, ImageUploadModal, Modal, NoDataFound, TextInputBox } from '../../../../../shared';
import { modifyArrTransportData, modifyArrTransportModeData, modifyExpenceCategoryArr, modifyFetchData, modifyUnitArr, modTransportData, validateData, _modifyAddDataArr } from './function';
import { DataConvert, FileUpload, Toaster } from '../../../../../services/common-view-function';
import { MiddlewareCheck, MiddlewareFileCheck } from '../../../../../services/middleware';
import { ErrorCode } from '../../../../../services/constant';
import { App_uri } from '../../../../../services/config';
import ImageBlurLoading from 'react-native-image-blur-loading';
import { CustomStyle } from '../../../../style';

class Expenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            pageNum: 0,
            fromDate: "",
            toDate: "",
            listDataArr: this.props.mainData.visitListData,
            otherModal: false,
            expenceTypeData: [],
            expenceTypeSelectedObj: {},
            unitData: [],
            unitSelectedObj: {},
            transportData: [],
            transportSelectObj: {},
            transportMode: [],
            transportModeSelectObj: {},
            approxKm: "",
            cost: "",
            addLoader: false,
            allTransportData: [],
            commentText: "",
            mainTransportData: [],
            selectedItem: this.props.selectedTabData,
            otherData: {},
            domesticAbroadCheck: true,
            expenseLocation: 1,
            finalSaveLoader: false,

            // imageUpload
            allImages: [],
            allImgShow: [],
            visiblePhotoModal: false,
            imageLoader: false,
            imgName: "",
            imgUri: "",

            cameraVisible: false,
            addressData: "",
            addressModal: false


        }
    }

    componentDidMount = async () => {
        await this._load();
    }

    _load = async () => {
        this._onunitDropDown()
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    //for show hide accordian 
    showHideData = (data, key) => {
        let allItem = this.state.listDataArr;
        for (let i = 0; i < allItem.length; i++) {
            if (allItem[i].index == data.index) {
                allItem[i].check = !(allItem[i].check)

            } else {
                allItem[i].check = false
            }
        }
        this.state.listDataArr = allItem;
        this.setState({ listDataArr: this.state.listDataArr })

    }

    _onOpenOtherModal = async (data) => {
        this.setState({ otherData: data })
        // let modArr = data.other == undefined || data.other == null 
        if (data.other == undefined || data.other == null) {
            this.setState({
                otherModal: true,
                allTransportData: []
            })
        } else {
            this.setState({
                otherModal: true,
                allTransportData: data.other.length == 0 ? [] : data.other
            })
        }

        await this._onExpenceCategory()
        await this._onExpenseList()

    }

    _onOpenAddressModal = async (data) => {
        this.setState({ addressData: data })

        this.setState({
            addressModal: !this.state.addressModal,
        })

    }

    _onExpenseList = async () => {
        let dataReq = {
            "limit": "50",
            "offset": "0",
            "fieldVisitId": this.state.otherData.visitId.toString(),
        }
        this.setState({ fetchLoader: true })
        let responseData = await MiddlewareCheck("getExpenseList", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let fetchedData = await modifyFetchData(responseData.response);
                this.state.allTransportData = fetchedData.visitListData;
                this.setState({
                    allTransportData: this.state.allTransportData
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ fetchLoader: false })
    }

    _onCloseModal = () => {
        this.setState({
            otherModal: false,
        })
    }

    // render the locationData
    renderPageList = (item) => {
        return (
            <View style={{ marginHorizontal: '1%' }}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    listSection = (item, key) => {
        return (
            <View key={key}>
                <AllPageList
                    data={item}
                    type={"visit"}
                    props={this.props}
                    ListShowHide={(data) => this.showHideData(data, key)}
                    onOtherButtonPress={(data) => this._onOpenOtherModal(data)}
                    onAddressButtonPress={(data) => this._onOpenAddressModal(data)}
                />
            </View>
        )
    }

    _onExpenceCategory = async () => {
        let reqData = {
            "expenseTypeId": this.state.selectedItem.id
        }
        let responseData = await MiddlewareCheck("masterExpenseCategoryTypes", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    expenceTypeData: modifyExpenceCategoryArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onTransportDropDown = async (value) => {
        let reqData = {
            "expenseTypeId": this.state.selectedItem.id,
            "expenseCatagoryId": value
        }
        this.setState({ transportLoader: true })
        let responseData = await MiddlewareCheck("masterExpenseSubCategoryTypes", reqData, this.props);
        if (responseData) {
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

    _onTransportModeDropDown = async (value) => {
        let reqData = {
            "expenseTypeId": this.state.selectedItem.id,
            "expenseCategoryId": this.state.expenceTypeSelectedObj.id,
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

    expenceTypeSec = () => {
        const _onSelectExpenceType = (value) => {
            this.setState({ expenceTypeSelectedObj: value })
            this._onTransportDropDown(value.id)
        }
        return (
            <DropdownInputBox
                selectedValue={this.state.expenceTypeSelectedObj.id ? this.state.expenceTypeSelectedObj.id.toString() : "0"}
                data={this.state.expenceTypeData}
                onSelect={(value) => _onSelectExpenceType(value)}
                headerText={"Expense Category"}
            />
        )
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
                        // headerText={"Mode of Transport"}
                        headerText={"Expense Sub-Category"}

                    />
                }
            </>
        )
    }

    transportModeSec = () => {
        const _onSelectTransportModeSelect = (value) => {
            this.setState({ transportModeSelectObj: value });
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
                        // headerText={"Travel Type*"}
                        headerText={"Expense For"}

                    />
                }
            </>
        )
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
            cost: p
        })
    }

    _onCommentTextChange = (value) => {
        this.setState({
            commentText: value
        })
    }

    _onAdd = () => {
        let validatedData = validateData(this.state);
        if (validatedData.status) {
            let addTransport = this.state.allTransportData;
            let other = {
                "transPortData": this.state.transportSelectObj.name ? this.state.transportSelectObj.name : "",
                "expenseCategory": this.state.expenceTypeSelectedObj.name ? this.state.expenceTypeSelectedObj.name : "",
                "expenseCategoryId": this.state.expenceTypeSelectedObj.id ? this.state.expenceTypeSelectedObj.id.toString() : "",
                "expenseSubCategoryId": this.state.transportSelectObj.id ? this.state.transportSelectObj.id.toString() : "",
                "startDateTime": this.state.otherData.visiteddate ? this.state.otherData.visiteddate : "",
                "endDatetime": this.state.otherData.visiteddate ? this.state.otherData.visiteddate : "",
                "unitType": this.state.unitSelectedObj.name ? this.state.unitSelectedObj.name : "",
                "expenseValue": this.state.approxKm,
                "expenseTypeId": this.state.selectedItem.id.toString(),
                "expenseCategoryModeId": this.state.transportModeSelectObj.id.toString(),
                "expenseLocation": this.state.expenseLocation.toString(),
                "expenseUnitId": this.state.unitSelectedObj.id ? this.state.unitSelectedObj.id.toString() : "",
                "finalAmount": this.state.cost,
                "allBillImage": this.state.allImgShow,
                "expenseId": "0"
            }
            addTransport.push(other);
            this.state.allTransportData = addTransport;
            this.setState({
                allTransportData: this.state.allTransportData
            })
            this._onClearData()
        }
        this.setState({ addLoader: false })

    }

    _onSave = async () => {
        if (this.state.allTransportData.length > 0) {
            this.setState({
                finalSaveLoader: true
            })
            let reqData = {
                "fieldVisitId": this.state.otherData.visitId.toString(),
                "isProject": this.state.otherData.isProject.toString(),
                "description": this.state.commentText,
                "odometerCount": this.state.otherData.odometerCount,
                "insertData": modTransportData(this.state.allTransportData)
            }
            let responseData = await MiddlewareCheck("addExpenses", reqData, this.props);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message)
                    await this._onCloseModal()

                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({
                finalSaveLoader: false
            })
        } else {
            Toaster.ShortCenterToaster("Please add atleast a Transport Cost")
        }

    }

    _onReset = () => {
        this.state.allTransportData = [];
        this.setState({
            allTransportData: this.state.allTransportData
        })
    }

    _onClearData = () => {
        this.state.transportSelectObj = {};
        this.state.expenceTypeSelectedObj = {};
        this.state.unitSelectedObj = {};
        this.state.transportModeSelectObj = {};
        this.state.cost = "";
        this.state.approxKm = "";
        this.state.allImages = [];
        this.state.allImgShow = [];

        this.setState({
            transportSelectObj: this.state.transportSelectObj,
            expenceTypeSelectedObj: this.state.expenceTypeSelectedObj,
            transportModeSelectObj: this.state.transportModeSelectObj,
            unitSelectedObj: this.state.unitSelectedObj,
            cost: this.state.cost,
            approxKm: this.state.approxKm,
            allImgShow: this.state.allImgShow,
            allImages: this.state.allImages
        })
    }

    _onClose = async (item, key) => {

        let arr = this.state.allTransportData;
        let tempArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {

            } else {
                tempArr.push(arr[i]);
            }
        }
        this.state.allTransportData = tempArr;
        this.setState({
            allTransportData: this.state.allTransportData
        })

        let reqData = {
            "expenseId": item.expenseId.toString(),
        }
        let responseData = await MiddlewareCheck("deleteExpenses", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster("Deleted successfully!")
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
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

    onSelectPic = async (value) => {
        await this._onTakePhoto(false);
        await this._onImageUpload(value);
    }

    _onTakePhoto = async () => {
        this.state.visiblePhotoModal = !this.state.visiblePhotoModal;
        this.setState({
            visiblePhotoModal: this.state.visiblePhotoModal
        })
    }

    _onImageUpload = async (uploadData) => {
        this.setState({
            listLoader: true,
            // imageLoader: true,
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
        this.setState({ imageLoader: false, })
    }

    _modifyImgShowingArr = (data) => {
        this.setState({ allImgShow: data })

    }

    mainModalView = () => {
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

        const onClickDomestic = (type) => {
            if (this.state.domesticAbroadCheck == false) {
                this.state.domesticAbroadCheck = true;
                this.state.expenseLocation = 1;
                this.setState({
                    domesticAbroadCheck: this.state.domesticAbroadCheck,
                    expenseLocation: this.state.expenseLocation
                })
            }
        }
        const onClickAbroad = (type) => {
            if (this.state.domesticAbroadCheck == true) {
                this.state.domesticAbroadCheck = false;
                this.state.expenseLocation = 0;
                this.setState({
                    domesticAbroadCheck: this.state.domesticAbroadCheck,
                    expenseLocation: this.state.expenseLocation
                })

            }
        }
        return (
            <>
                <Modal
                    isVisible={this.state.otherModal}
                    onRequestClose={() => this._onCloseModal()}
                    // onBackdropPress={() => this._onOpenOtherModal()}
                    // onBackButtonPress={() => this._onOpenOtherModal()}
                    children={

                        < View style={styles.modalview}>
                            {this.modalSection()}
                            <View style={{ marginHorizontal: '5%' }}>
                                <View style={{ paddingVertical: 20, flexDirection: 'row' }}>
                                    {/* <Image source={ImageName.EXPENCE_USER} style={styles.userImage} /> */}
                                    <Image source={{ uri: this.state.otherData.profilePic }} style={styles.userImage} />
                                    <View style={{ flex: 1, flexDirection: 'column', marginLeft: '5%' }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>{this.state.otherData.visitto}</Text>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>{this.state.otherData.addressOfVisit}</Text>
                                        {/* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>District Zone 2</Text> */}
                                    </View>
                                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onCloseModal()}>
                                        <Image source={ImageName.BLACK_CROSS_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ borderColor: "#000", borderWidth: 0.6, marginTop: 5 }} />
                                <ScrollView showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}>
                                    <View style={styles.flexRow}>
                                        <View style={styles.centerView}>
                                            <Image source={ImageName.GRAY_LOCATION} style={styles.locationImage} />
                                        </View>
                                        <View style={styles.blueUnderline} />
                                        <View style={styles.centerView}>
                                            <Image source={ImageName.EXPENSE_VISIT_ICON} style={styles.locationImage} />
                                        </View>
                                    </View>
                                    <View style={styles.marginTopView}>
                                        <View style={styles.centerView}>
                                            <Text style={styles.loactionStartEndText}>Home</Text>
                                        </View>
                                        <View style={{ flex: 1 }} />
                                        <View style={styles.centerView}>
                                            <Text style={styles.loactionStartEndText}>Nandakumar</Text>
                                        </View>
                                    </View>
                                    <View style={styles.flexRow}>
                                        <Image source={ImageName.GREEN_ODOMETER} style={styles.greenOdometerLogo} />
                                        <Text style={styles.bikeText}>Bike</Text>
                                        <View style={{ flex: 0.5, marginLeft: '5%' }}>
                                            <TextInputBox
                                                placeholder={"00 KM"}
                                                value={this.state.otherData.odometerCount}
                                                editable={false}
                                            // onChangeText={(value) => this._onCurrentPassword(value)}
                                            />
                                        </View>
                                        <View style={{ width: 18 }} />
                                        <View style={{ flex: 0.5, marginTop: 5 }}>
                                            <Text style={styles.inTimeText}>In Time:<Text style={styles.timeValueText}>{this.state.otherData.visittime}</Text></Text>
                                        </View>
                                    </View>
                                    <View style={{ borderColor: "#000", borderWidth: 0.6, marginTop: 25 }} />
                                    <View style={{ marginHorizontal: '15%', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>If any Other Transport Cost</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: '2%' }}>
                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                                            <View style={{ marginTop: 2 }}>
                                                <CheckBox
                                                    borderRadius={35}
                                                    borderColor={"#286a94"}
                                                    type="circle"
                                                    data={this.state.domesticAbroadCheck}
                                                    onClickValue={() => onClickDomestic("domestic")}
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
                                                    onClickValue={() => onClickAbroad("abroad")}
                                                />
                                            </View>
                                            <View style={{ marginLeft: '5%' }}>
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Abroad</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 10 }} />
                                    {this.expenceTypeSec()}
                                    {this.transportSec()}
                                    {this.transportModeSec()}
                                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
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
                                    <View style={{ marginTop: 20 }}>
                                        <View style={styles.photoSec}>
                                            {this.state.allImgShow.map((item, key) => (
                                                <React.Fragment key={key}>
                                                    <View style={styles.flexANdMarginView}>
                                                        <View style={styles.logisticImageView}>
                                                            <ImageBlurLoading source={{ uri: App_uri.IMAGE_VIEW_URI + item.images }} style={styles.TakephotoImg} />
                                                            <View style={{ position: 'absolute', right: 0, top: 0, alignItems: 'center', justifyContent: 'center' }}>
                                                                <TouchableOpacity style={styles.deleteLogoSec} onPress={() => _onDelete(item, key)} activeOpacity={0.9}>
                                                                    <Image source={ImageName.WHITE_DELETE_LOGO} style={styles.whiteDeleteLogo} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>

                                                </React.Fragment>
                                            ))}
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
                                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                        <View style={{ flex: 2.5 }} />
                                        <BigTextButton
                                            borderRadius={10}
                                            backgroundColor={"#286a94"}
                                            text={"Add"}
                                            isLeftIcon={true}
                                            leftIcon={ImageName.ADD_WHITE}
                                            leftIconStyle={{ height: 20, width: 20 }}
                                            onPress={() => this._onAdd()}
                                        />
                                    </View>
                                    <View style={{ borderColor: "#000", borderWidth: 0.6, marginTop: 15 }} />
                                    <>
                                        {this.state.fetchLoader ?
                                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.DARK_BLUE} />
                                            </View>
                                            :
                                            <>
                                                {this.state.allTransportData.length > 0 ?
                                                    <React.Fragment>
                                                        {this.state.allTransportData.map((item, key) => (
                                                            <React.Fragment key={key}>
                                                                <View style={{ padding: 5, borderTopWidth: 0.3, borderTopColor: '#000', borderBottomColor: '#000', borderBottomWidth: 0.8, backgroundColor: '#F2F0F0', marginTop: 10, paddingVertical: 10 }}>
                                                                    <View style={{ flexDirection: 'row', marginHorizontal: '2%', marginBottom: 5 }}>
                                                                        <Image source={ImageName.ORDER_BUS_ICON} style={{ height: 18, width: 18, resizeMode: 'contain', marginTop: 4 }} />
                                                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '5%' }}>{item.transPortData}</Text>
                                                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '5%' }}>{item.expenseValue + " " + item.unitType}</Text>
                                                                        <Text style={{ color: "#EF5C5C", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '5%', flex: 1 }}>{'\u20B9' + "" + item.finalAmount}</Text>
                                                                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this._onClose(item, key)} activeOpacity={0.9}>
                                                                            <Image source={ImageName.RED_DELETE_OUTLINE} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 1 }} />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={styles.photoSec}>
                                                                        {item.allBillImage.map((item1, key1) => (
                                                                            <React.Fragment key={key1}>
                                                                                <View style={styles.flexANdMarginView}>
                                                                                    <View style={styles.logisticImageView}>
                                                                                        <ImageBlurLoading source={{ uri: App_uri.IMAGE_VIEW_URI + item1.images }} style={styles.TakephotoImg} />
                                                                                        <View style={{ position: 'absolute', right: 0, top: 0, alignItems: 'center', justifyContent: 'center' }}>
                                                                                        </View>
                                                                                    </View>
                                                                                </View>
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </View>
                                                                </View>
                                                            </React.Fragment>
                                                        ))}
                                                    </React.Fragment>
                                                    : null}
                                            </>
                                        }

                                    </>

                                    <View style={{ marginTop: 10 }}>
                                        <TextInputBox
                                            placeholder={"Comment"}
                                            height={90}
                                            multiline={true}
                                            alignItems={"flex-start"}
                                            value={this.state.commentText}
                                            onChangeText={(value) => this._onCommentTextChange(value)}
                                        />
                                    </View>
                                    {this.state.finalSaveLoader == true ?
                                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                            <View style={{ flex: 0.6 }} />
                                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.4 }}>
                                                <ActivityIndicator size="large" color={"#286a94"} />
                                            </View>
                                        </View> :
                                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                            <View style={{ flex: 1 }} />
                                            <BigTextButton
                                                borderRadius={10}
                                                backgroundColor={"#fff"}
                                                fontSize={FontSize.SM}
                                                additionalStyles={{ borderColor: "#000", borderWidth: 0.8 }}
                                                text={"Reset"}
                                                fontColor={"#000"}
                                                onPress={() => this._onReset()}
                                            />
                                            <View style={{ width: 10 }} />
                                            <BigTextButton
                                                borderRadius={10}
                                                backgroundColor={"#286a94"}
                                                fontSize={FontSize.SM}
                                                text={"Save"}
                                                onPress={() => this._onSave()}
                                            />
                                        </View>
                                    }

                                    <View style={{ height: 100 }} />
                                </ScrollView>
                            </View>
                            <View style={{ height: 50 }} />
                        </View>
                    }
                />

                {/* // addresss modal */}

                <Modal
                    isVisible={this.state.addressModal}
                    // onRequestClose={() => this._onCloseModal()}
                    onBackdropPress={() => this._onOpenAddressModal()}
                    onBackButtonPress={() => this._onOpenAddressModal()}
                    children={
                        <View style={styles.modalview}>
                            <View style={{ marginHorizontal: '5%' }}>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={styles.addressHeaderTxt}>Address</Text>
                                </View>
                                <View style={styles.underLine} />
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={styles.addressTxt}>{this.state.addressData}</Text>
                                </View>
                            </View>
                        </View>
                    }
                />



            </>





        )
    }
    renderFooter = () => {
        return (
            <>
                {/* {this.state.listDataArr.length > 0 ?
                    <View style={{ marginTop: 10, padding: 8, borderBottomColor: "#000", borderBottomWidth: 0.5, borderTopColor: "#000", borderTopWidth: 0.5, alignItems: 'center', }}>
                        <View style={{ marginHorizontal: '4%', flexDirection: 'row' }}>
                            <Text style={{ color: '#22253A', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, flex: 1 }}>Total</Text>
                            <Text style={{ color: '#EF5C5C', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD }}>{'\u20B9' + " " + 2140}</Text>
                        </View>
                    </View>
                    :
                    null
                } */}
                <View style={{ marginBottom: 400 }} />
            </>
        )
    }
    render() {
        if (this.state.cameraVisible) {
            return <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
        } else {
            return (
                <View style={{ height: Dimension.height }}>
                    {this.mainModalView()}
                    <View style={{ marginTop: 10 }}>
                        {this.state.listDataArr.length > 0 ?
                            <React.Fragment>
                                <FlatList
                                    data={this.state.listDataArr}
                                    renderItem={(item, key) => this.renderPageList(item, key)}
                                    keyExtractor={(item, key) => key}
                                    // onEndReached={this.fetchMore}
                                    // onEndReachedThreshold={0.1}
                                    ListFooterComponent={this.renderFooter()}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                // refreshControl={
                                // <RefreshControl
                                // refreshing={this.state.refreshing}
                                // onRefresh={() => this.onRefresh()}
                                // />
                                // }
                                />
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <View style={CustomStyle.noDataFoundViewForTabList}>
                                    <NoDataFound />
                                </View>
                            </React.Fragment>

                        }
                    </View>
                </View>
            )
        }



    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Expenses);