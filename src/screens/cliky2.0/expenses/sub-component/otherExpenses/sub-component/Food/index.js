import React, { Component } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import DatePicker from 'react-native-date-picker'
import ImageBlurLoading from 'react-native-image-blur-loading'
import { Color, ImageName } from '../../../../../../../enums'
import { DateConvert, FileUpload, Toaster } from '../../../../../../../services/common-view-function'
import { App_uri } from '../../../../../../../services/config'
import { ErrorCode } from '../../../../../../../services/constant'
import { MiddlewareCheck, MiddlewareFileCheck } from '../../../../../../../services/middleware'
import { BigTextButton, CustomCamera, DropdownInputBox, ImageUploadModal, TextInputBox } from '../../../../../../../shared'
import { DataValidator } from '../../../../../../../validators'
import { modArrData, modifyArrTransportData, modifyArrTransportModeData, modifyExpenceCategoryArr, validateData, _modifyAddDataArr } from './function'
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

export class Food extends Component {
    constructor(props) {
        super(props)

        this.state = {
            totalAmount: 0,
            allImages: [],
            allImgShow: [],
            visiblePhotoModal: false,
            imageLoader: false,
            imgName: "",
            imgUri: "",
            //................
            expenceTypeData:[],
            expenceTypeSelectedObj:{},

            transportData: [],
            transportSelectObj: {},
            transportMode:[],
            transportModeSelectObj:{},
            foodTypeArr: roomArr,
            selectedFoodTypeObj: {},
            cost: "",
            costActive: false,
            cameraVisible: false
        }
    }

    componentDidMount = async() => {
        await this._onExpenceCategory()
    }


    _onExpenceCategory  = async () => {
        let reqData = {
            "expenseTypeId": this.props.selectedTabData.id
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
                headerText={"Expense category"}
            />
        )
    }
    _onTransportDropDown = async (value) => {
        let reqData = {
            "expenseTypeId": this.props.selectedTabData.id,
            "expenseCatagoryId": value
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
                        headerText={"Fooding Type"}

                    />
                }
            </>
        )
    }

    _onTransportModeDropDown = async (value) => {
        let reqData = {
            "expenseTypeId": this.props.selectedTabData.id,
            "expenseCategoryId": this.state.expenceTypeSelectedObj.id,
            "expenseSubCategoryId":value
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

    _onChangeCost = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "amount");
        this.setState({
            cost: newText,
            totalAmount: newText
        })
    }
    _OnSelectFoodType = (value) => {
        this.setState({
            selectedFoodTypeObj: value,
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

        this.setState({ imageLoader: false, })
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

    onFinalSubmit = () => {
        let reqData = {
            "type": "food",
            "cost": this.state.cost,
            "roomType": this.state.selectedFoodTypeObj.id ? this.state.selectedFoodTypeObj.id : "",
            "billImage": this.state.allImages,
            "totalAmount": this.state.totalAmount
        }

        let validData = validateData(reqData);
        if (validData.status) {
            this.props.onSaveDataToParent(modArrData(reqData))
            this.clearFieldData()
        }
    }

    clearFieldData = () => {
        this.setState({
            cost: "",
            selectedFoodTypeObj: {},
            allImages: [],
            allImgShow: [],
            totalAmount: ""
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

                    {this.expenceTypeSec()}
                    {this.transportSec()}
                    {this.transportModeSec()}

                    <View style={{ marginBottom: 10, flexDirection: "row", flex: 1 }}>
                        <View style={{ flex: 0.5 }}>
                            <DropdownInputBox
                                selectedValue={this.state.selectedFoodTypeObj.id ? this.state.selectedFoodTypeObj.id.toString() : "0"}
                                data={this.state.foodTypeArr}
                                onSelect={(value) => this._OnSelectFoodType(value)}
                                headerText={"Food Type*"}
                                selectedText={this.state.selectedFoodTypeObj.name ? this.state.selectedFoodTypeObj.name : "Select Room Type"}
                                selectedTextColor={this.state.selectedFoodTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                isBackButtonPressRequired={true}
                                isBackdropPressRequired={true}
                            />
                        </View>
                        <View style={{ width: 5 }} />
                        <View style={{ flex: 0.5 }}>
                            <TextInputBox
                                value={this.state.cost}
                                onChangeText={(value) => this._onChangeCost(value)}
                                placeholder={"Cost*"}
                                keyboardType={"number-pad"}
                                isActive={this.state.costActive}
                                onFocus={() => { this.setState({ costActive: true }) }}
                                onBlur={() => { this.setState({ costActive: false }) }}
                                height={45}
                                returnKeyType="done"
                            />
                        </View>
                    </View>


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
                    <View style={{ marginVertical: 20, flexDirection: "row", marginHorizontal: "30%" }}>
                        <BigTextButton text={"Save"} backgroundColor={Color.COLOR.BLUE.SKY_BLUE} onPress={() => this.onFinalSubmit()} />
                    </View>
                    <View style={{ marginBottom: 10 }}>

                        <View style={styles.underline} />
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
                        <View style={styles.underline} />

                    </View>


                    <View style={{ marginBottom: 10 }} />
                    {this.modalSection()}
                </View>

            )
        }
    }
}

export default Food