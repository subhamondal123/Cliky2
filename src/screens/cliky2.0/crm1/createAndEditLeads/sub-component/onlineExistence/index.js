import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { FileUpload, Toaster } from "../../../../../../services/common-view-function";
import { App_uri } from "../../../../../../services/config";
import { ErrorCode } from "../../../../../../services/constant";
import { MiddlewareFileCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, ImageUploadModal, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { validateData } from "./function";
import styles from "./style";


class OnlineExistence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
            visiblePhotoModal: false,
            profileImgLoader: false,
            allPlatformArr: [
                {
                    selectedPlatformObj: {},
                    link: "",
                    linkActive: false
                }
            ]
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {
        this.setState({ allPageData: this.props.allPageData, pageloader: false })
    }

    _onSelectPlatformType = (value, key) => {
        this.state.allPageData.platformData[key].selectedPlatformObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onChangeLink = (value, key) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.platformData[key].linkName = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _addAnother = () => {
        let obj = {
            selectedPlatformObj: {},
            linkName: "",
            linkNameActive: false
        }

        let arr = this.state.allPageData.platformData;
        arr.push(obj);
        this.state.allPageData.platformData = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeleteArray = (key) => {
        let arr = this.state.allPageData.platformData;
        arr.splice(key, 1);
        this.state.allPageData.platformData = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onBack = () => {
        let data = {
            pageNum: 5,
            type: "previous"
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = () => {
        let allArr = this.state.allPageData.platformData;
        let modArr = [];

        for (let i = 0; i < allArr.length; i++) {
            let modObj = {
                platform: allArr[i].selectedPlatformObj.id ? allArr[i].selectedPlatformObj.id : "",
                link: allArr[i].linkName ? allArr[i].linkName : "",
            };
            modArr.push(modObj);
        }
        let reqData = {
            profilePic: this.state.allPageData.imageName ,
            leadPlatform: modArr,
        }
        let validData = validateData(reqData);
        if (validData.status) {
            let data = {
                type: "next",
                pageNum: 7,
                data: reqData
            }
            this.props.onSaveDataToParent(data);
        }
    }

    renderItem = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: Color.COLOR.BLUE.LAPIS_LAZULI, marginBottom: 15 }}>
                    {key == 0 ?
                        null
                        :
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' }}
                            onPress={() => this._onDeleteArray(key)}>
                            <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CROSS_IMG} />
                        </TouchableOpacity>
                    }

                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{ }</Text>Platform</Text>
                        <View style={{ height: 10 }} />
                        <DropdownInputBox
                            selectedValue={item.selectedPlatformObj.id ? item.selectedPlatformObj.id.toString() : "0"}
                            data={this.state.allPageData.platformName}
                            onSelect={(value) => this._onSelectPlatformType(value, key)}
                            headerText={"Select Platform*"}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                        />
                        <View style={{ height: 10 }} />
                        <TextInputBox
                            value={item.linkName}
                            onChangeText={(value) => this._onChangeLink(value, key)}
                            placeholder={"Enter Link"}
                            keyboardType={"default"}
                            isActive={item.linkNameActive}
                            onFocus={() => {
                                this.state.allPageData.platformData[key].linkNameActive = true
                                this.setState({ allPageData: this.state.allPageData })
                            }}
                            onBlur={() => {
                                this.state.allPageData.platformData[key].linkNameActive = false
                                this.setState({ allPageData: this.state.allPageData })
                            }}
                            height={45}
                        />
                    </View>
                </View>
            </React.Fragment>
        )
    }

    //for image picker
    _onChooseGallery = async () => {
        let uploadData = await FileUpload.uploadImg();
        this._onImageUpload(uploadData);
    }

    // get photo from camera
    _onChooseCamera = async () => {
        let uploadData = await FileUpload.uploadCameraImg();
        this._onImageUpload(uploadData);
    }

    _onImageUpload = async (uploadData) => {
        this.state.allPageData.imageName = uploadData.name;
        this.setState({
            visiblePhotoModal: false,
            profileImgLoader: true,
           
        })

        let responseData = await MiddlewareFileCheck("imageupload", uploadData);
        this.setState({ profileImgLoader: false, })
        if (responseData == false) {

        } else {
            if (responseData.error == ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                this.state.allPageData.imageUrl = uploadData.uri;
                this.state.allPageData.imageName = responseData.data.path + responseData.data.filename,
                    this.setState({
                        allPageData: this.state.allPageData
                    })
                Toaster.ShortCenterToaster(responseData.message)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

    }

    _onTakePhoto = () => {
        this.setState({
            visiblePhotoModal: !this.state.visiblePhotoModal
        })
    }

    modalSection = () => {
        return (
            <ImageUploadModal
                isVisible={this.state.visiblePhotoModal}
                onGallerySelect={(value) => this._onChooseGallery(value)}
                onCameraSelect={(value) => this._onChooseCamera(value)}
                onCloseModal={(value) => this._onTakePhoto(value)}
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.pageloader ?
                    <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
                       <Loader/>
                    </View>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        {this.modalSection()}
                        <View style={styles.container}>

                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Online Existence</Text>

                                </View>
                            </View>


                            <View style={{ marginBottom: 35 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ height: 10 }} />
                                    <View style={styles.profileImgView}>
                                        {this.state.profileImgLoader ?
                                            <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} /> :
                                            <Image source={this.state.allPageData.imageName.length > 0 ? { uri:App_uri.SFA_IMAGE_URI + this.state.allPageData.imageName } : ImageName.USER} style={styles.profileImg} />
                                        }
                                    </View>
                                    {this.state.profileImgLoader ?
                                        null :
                                        <View style={styles.cameraView}>
                                            <TouchableOpacity onPress={() => this._onTakePhoto()} activeOpacity={0.8}>
                                                <Image source={ImageName.CAMERA} style={styles.cameraIconImg} />
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    <View style={styles.belowImageText}>
                                        <Text style={{
                                            fontSize: FontSize.XS,
                                            fontFamily: FontFamily.FONTS.INTER.REGULAR,
                                            color: Color.COLOR.BLACK.PURE_BLACK
                                        }}>
                                            {"Upload File Below 100mb.\nSupported Format : Jpeg, jpg, png"}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {this.state.allPageData.platformData.map((item, key) => (
                                this.renderItem(item, key)
                            ))}

                            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                                <TouchableOpacity
                                    style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS, borderRadius: 5 }}
                                    onPress={() => this._addAnother()}
                                >
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: 14 }}>Add Another</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row', flex: 1 }}>
                                <BigTextButton
                                    text={"Previous"}
                                    onPress={() => this._onBack()}
                                />
                                <View style={{ width: "5%" }} />
                                <BigTextButton
                                    text={"Save & Next"}
                                    onPress={() => this._onSave()}
                                />
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
        )
    }
}

export default OnlineExistence;