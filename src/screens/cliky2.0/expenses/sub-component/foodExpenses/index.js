import React from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../enums';
import { CustomStyle } from '../../../../style';
import styles from './style';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../../redux/Sales360Action';
import { AllPageList } from '../../../../../pageShared';
import { BigTextButton, CustomCamera, DropdownInputBox, ImageUploadModal, Modal, NoDataFound, TextInputBox } from '../../../../../shared';
import { MiddlewareCheck, MiddlewareFileCheck } from '../../../../../services/middleware';
import { ErrorCode } from '../../../../../services/constant';
import { modifyArrTransportData, modifyArrTransportModeData, modifyExpenceCategoryArr, modifyPicData, modTransportData, validateData } from './function';
import { DataConvert, DateConvert, FileUpload, Toaster } from '../../../../../services/common-view-function';
import ImageBlurLoading from 'react-native-image-blur-loading';
import { App_uri } from '../../../../../services/config';
import DatePicker from 'react-native-date-picker';


class FoodExpenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listDataArr: [],
            addFoodModal: false,
            selectedItem: this.props.selectedTabData,
            expenceTypeData: [],
            expenceTypeSelectedObj: {},
            foodTypeArr: [],
            foodTypeSelectedObj: {},
            transportMode: [],
            transportModeSelectObj: {},
            costTextInput: "",
            costActive: false,
            fromDatePicker: false,
            fromDateObj: {
                rawDate: new Date(),
                fromDate: ""
            },

            foodSaveLoader: false,

            // imageUpload
            allImages: [],
            allImgShow: [],
            visiblePhotoModal: false,
            imageLoader: false,
            imgName: "",
            imgUri: "",

            cameraVisible: false



        }
    }

    componentDidMount = async () => {
        await this._load();
    }

    _load = async () => {
        this.setState({
            listDataArr: this.props.mainData.foodListData
        })
        await this._onExpenceCategory()

    }
    _onBack = () => {
        this.props.navigation.goBack();
    };

    //for show hide accordian 
    showHideData = (data, key) => {
        let allItem = this.state.listDataArr;
        for (let i = 0; i < allItem.length; i++) {
            if (allItem[i].expenseDate == data.expenseDate) {
                allItem[i].check = !(allItem[i].check)

            } else {
                allItem[i].check = false
            }
        }
        this.state.listDataArr = allItem;
        this.setState({ listDataArr: this.state.listDataArr })
    }

    onAddFoodExpenses = () => {
        this.props.onReload()
    }

    // render the locationData
    renderPageList = (item) => {
        return (
            <View style={{}}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    listSection = (item, key) => {
        return (
            <View key={key}>
                <AllPageList
                    data={item}
                    type={"foodSection"}
                    props={this.props}
                    expenseTypeId={this.state.selectedItem.id}
                    ListShowHide={(data) => this.showHideData(data, key)}
                    onSubmit = {() => this.onAddFoodExpenses()}
                />


            </View>
        )
    }

    _onOpenModal = () => {
        this.setState({
            addFoodModal: !this.state.addFoodModal
        })
    }

    _onExpenceCategory = async () => {
        let reqData = {
            "expenseTypeId": this.state.selectedItem.id
        }
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
    }

    _onFoodDropDown = async (value) => {
        let reqData = {
            "expenseTypeId": this.state.selectedItem.id,
            "expenseCatagoryId": value
        }
        this.setState({ transportLoader: true })
        let responseData = await MiddlewareCheck("masterExpenseSubCategoryTypes", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    foodTypeArr: modifyArrTransportData(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ transportLoader: false })

    }

    expenceTypeSec = () => {
        const _onSelectExpenceType = (value) => {
            this.setState({ expenceTypeSelectedObj: value })
            this._onFoodDropDown(value.id)
        }
        return (
            <View style={{ flex: 1 }}>
                <DropdownInputBox
                    selectedValue={this.state.expenceTypeSelectedObj.id ? this.state.expenceTypeSelectedObj.id.toString() : "0"}
                    data={this.state.expenceTypeData}
                    onSelect={(value) => _onSelectExpenceType(value)}
                    headerText={"Expence category"}
                />
            </View>
        )
    }

    foodType = () => {
        const _onSelectFoodType = (value) => {
            this.setState({ foodTypeSelectedObj: value })
            this.onTransportModeDropDown(value.id)
        }
        return (
            <View style={{ flex: 1 }}>
                {this.state.transportLoader ?
                    <View style={{ marginTop: 10 }}>
                        <ActivityIndicator size={"small"} color={Color.COLOR.GRAY.LIGHT_GRAY_COLOR} />
                    </View> :
                    <DropdownInputBox
                        selectedValue={this.state.foodTypeSelectedObj.id ? this.state.foodTypeSelectedObj.id.toString() : "0"}
                        data={this.state.foodTypeArr}
                        onSelect={(value) => _onSelectFoodType(value)}
                        headerText={"Food Type"}
                    />
                }
            </View>
        )
    }

    onTransportModeDropDown = async (value) => {
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

    transportModeSec = () => {
        const _onSelectTransportModeSelect = (value) => {
            this.setState({ transportModeSelectObj: value });
        }
        return (
            <View style={{ flex: 1 }}>
                {this.state.transportModeLoader ?
                    <View style={{ marginTop: 10 }}>
                        <ActivityIndicator size={"small"} color={Color.COLOR.GRAY.LIGHT_GRAY_COLOR} />
                    </View> :
                    <DropdownInputBox
                        selectedValue={this.state.transportModeSelectObj.id ? this.state.transportModeSelectObj.id.toString() : "0"}
                        data={this.state.transportMode}
                        onSelect={(value) => _onSelectTransportModeSelect(value)}
                        headerText={"Other"}

                    />
                }
            </View>
        )
    }

    changeCost = (value) => {
        let p = DataConvert.uptoTwoDecimalInput(value)
        this.setState({
            costTextInput: p
        })

    }

    costSection = () => {
        return (
            <View style={{}}>
                <TextInputBox
                    placeholder={"Cost"}
                    value={this.state.costTextInput}
                    height={45}
                    onChangeText={(value) => this.changeCost(value)}
                    keyboardType="numeric"
                    // isActive={this.state.costActive}
                    // onFocus={() => {

                    // }}
                    // onBlur={() => {
                    //     setCostActive(false)
                    // }}
                    maxLength={10}
                />
            </View>
        )
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
        this.state.fromDateObj.fromDate = DateConvert.formatYYYYMMDD(date.date);
        this.setState({
            fromDateObj: this.state.fromDateObj
        });
        this._onFromCloseDatePicker()
    }

    dateSec = () => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onFromDatePicker()} activeOpacity={0.9}>
                    <Text style={[styles.inputBoxText, this.state.fromDateObj.fromDate.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>{this.state.fromDateObj.fromDate.length == 0 ? "*Select Date" : this.state.fromDateObj.fromDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={this.state.fromDatePicker}
                    maximumDate={new Date()}
                    date={this.state.fromDateObj.rawDate}
                    mode={"date"}
                    onConfirm={(date) => {
                        this._onSelectFromDate({ date })
                    }}
                    onCancel={() => {
                        this._onFromCloseDatePicker()
                    }}
                />
            </View>
        )
    }

    _onSave = async () => {
        let validatedData = validateData(this.state);
        if (validatedData.status) {
            let reqData = {
                "fieldVisitId": "0",
                "isProject": "0",
                "insertData": [{
                    "expenseCategoryId": this.state.expenceTypeSelectedObj.id ? this.state.expenceTypeSelectedObj.id.toString() : "",
                    "expenseSubCategoryId": this.state.foodTypeSelectedObj.id ? this.state.foodTypeSelectedObj.id.toString() : "",
                    "startDateTime": this.state.fromDateObj.fromDate ? this.state.fromDateObj.fromDate : "",
                    "endDatetime": this.state.fromDateObj.fromDate ? this.state.fromDateObj.fromDate : "",
                    "expenseTypeId": this.state.selectedItem.id.toString(),
                    "expenseCategoryModeId": this.state.transportModeSelectObj.id ? this.state.transportModeSelectObj.id.toString() : "",
                    "finalAmount": this.state.costTextInput,
                    "expenseUnitId": "",
                    "expenseLocation": "1",
                    "expenseValue": "",
                    "allBillImage": modifyPicData(this.state.allImgShow),
                }]
            }

            this.setState({
                foodSaveLoader: true
            })
            let responseData = await MiddlewareCheck("addExpenses", reqData, this.props);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message)
                    await this._onOpenModal()
                    this.props.onReload()
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({
                foodSaveLoader: false
            })
        }
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
        return (
            <Modal
                isVisible={this.state.addFoodModal}
                onRequestClose={() => this._onOpenModal()}
                // onBackdropPress={() => this._onOpenOtherModal()}
                // onBackButtonPress={() => this._onOpenOtherModal()}
                children={
                    <View style={styles.modalview}>

                        {this.modalSection()}
                        <View style={{ marginHorizontal: '5%' }}>
                            <View style={{ paddingVertical: 20, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ justifyContent: "center", alignItems: 'center' }}>
                                        <Text style={{ color: "#22253A", fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Add Food Expenses</Text>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={0.9} onPress={() => this._onOpenModal()}>
                                    <Image source={ImageName.BLACK_CROSS_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 10, borderColor: "#A3A6AF", borderWidth: 0.5 }} />
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
                                <View style={{ marginTop: 10 }} />
                                <View style={{}}>
                                    {this.dateSec()}
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    {this.expenceTypeSec()}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                    {this.foodType()}
                                    <View style={{ width: 8 }} />
                                    {this.transportModeSec()}
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    {this.costSection()}
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
                                {this.state.foodSaveLoader == true ?
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                        <ActivityIndicator size="large" color={Color.COLOR.BLUE.VIOLET_BLUE} />
                                    </View> :
                                    <View style={{ marginTop: 25 }}>
                                        <View style={{ marginHorizontal: '20%' }}>
                                            <BigTextButton
                                                backgroundColor={"#156A94"}
                                                onPress={() => this._onSave()}
                                                text={"Save"}
                                            />
                                        </View>
                                    </View>
                                }
                                <View style={{ height: 100 }} />
                            </ScrollView>
                        </View>
                        <View style={{ height: 50 }} />
                    </View>
                }
            />
        )
    }

    renderFooter = () => {
        return (
            <View style={{ marginBottom: 400 }} />
        )
    }

    render() {
        if (this.state.cameraVisible) {
            return <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
        } else {
            return (
                <>
                    <View style={{ height: Dimension.height }}>
                        {this.mainModalView()}
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <View style={{ flex: 1 }} />
                            <BigTextButton
                                isLeftIcon={true}
                                leftIcon={ImageName.ADD_ICON}
                                backgroundColor={"#156A94"}
                                onPress={() => this._onOpenModal()}
                                text={"Add New"}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            {this.state.listDataArr.length > 0 ? (
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
                                    //   <RefreshControl
                                    //     refreshing={this.state.refreshing}
                                    //     onRefresh={() => this.onRefresh()}
                                    // />
                                    // }
                                    />

                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <View style={CustomStyle.noDataFoundViewForTabList}>
                                        <NoDataFound />
                                    </View>
                                </React.Fragment>
                            )}
                        </View>

                    </View>
                </>

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


export default connect(mapStateToProps, mapDispatchToProps)(FoodExpenses);