import React from "react";
import { Color, Dimension, ImageName } from "../../../../../../enums";
import styles from "./style";
import {

    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { stateCheckForNetwork, stateUserInformation } from "../../../../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BigTextButton, CustomCamera, ImageUploadModal, Loader, TextInputBox } from "../../../../../../shared";
import ImageBlurLoading from "react-native-image-blur-loading";
import { modifyLoadData, _modifyAddDataArr } from "./function";
import { FileUpload, GetUserData, Toaster } from "../../../../../../services/common-view-function";
import { MiddlewareCheck, MiddlewareFileCheck } from "../../../../../../services/middleware";
import { ErrorCode } from "../../../../../../services/constant";
import { App_uri } from "../../../../../../services/config";


class AttendeeUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            visibleProfileImgUploadModal: false,
            // imageArr: [],
            allImages: [],
            allImgShow: [],
            visiblePhotoModal: false,
            imageLoader: false,
            imgName: "",
            imgUri: "",
            remarks: "",
            uploadLoader: false,
            cameraVisible: false
        }
    }

    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        await this._loadAllPhoto();
        this.setState({ pageLoader: false })
    }

    _loadAllPhoto = async () => {
        let reqData = {
            "indentId": this.props.route.params.data.indentId ? this.props.route.params.data.indentId : "",
            "type": "all",
            "photoType": "1"
        }
        let responseData = await MiddlewareCheck("mmsGetMeetingPhotography", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allImages = await modifyLoadData(responseData.response);
                this.setState({
                    allImages: this.state.allImages,
                    remarks: this.state.allImages.length == 0 || this.state.allImages[0].photoDescription == null || this.state.allImages[0].photoDescription == undefined ? "" : this.state.allImages[0].photoDescription

                })
                this._modifyImgShowingArr(this.state.allImages);
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
    }

    _onRelaod = async () => {
        this.setState({
            pageLoader: true
        });
        await this.resetAllStateVarData();
        await this._load();
        this.setState({
            pageLoader: false
        })
    }

    resetAllStateVarData = async () => {
        this.setState({
            allImgShow: [],
            allImages: [],
            imgName: "",
            imgUri: "",
            remarks: ""
        })
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    _onTakePhoto = async () => {
        this.state.visiblePhotoModal = !this.state.visiblePhotoModal;
        this.setState({
            visiblePhotoModal: this.state.visiblePhotoModal
        })
    }

    _modifyImgShowingArr = (data) => {
        this.setState({ allImgShow: _modifyAddDataArr(data) })

    }

    _onRemarkChange = (value) => {
        this.setState({
            remarks: value
        })
    }

    onUpload = async () => {
        let reqData = {
            "indentId": this.props.route.params.data.indentId ? this.props.route.params.data.indentId : "",
            "type": "1",
            "meetingArr": this.state.allImages,
            "remarks": this.state.remarks
        }

        if (reqData.meetingArr.length == 0) {
            Toaster.ShortCenterToaster("Please Upload atleast one Document !")
        } else if (this.state.remarks.length == 0) {
            Toaster.ShortCenterToaster("Please enter Remark !")
        } else {
            this.setState({ uploadLoader: true })
            let responseData = await MiddlewareCheck("mmsAddMeetingPhotography", reqData, this.props);
            if (responseData) {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message);
                    await this._onRelaod();
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                }
            }
            this.setState({ uploadLoader: false })
        }
    }

    _onImageUpload = async (uploadData) => {
        this.setState({
            listLoader: true,
            // imageLoader: true,
            imgName: uploadData.name,
            imgUri: uploadData.name,
        })
        this.setState({ imageLoader: true })
        let responseData = await MiddlewareFileCheck("mmsFileUpload", uploadData, this.props);
        if (responseData == false) {

        } else {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let locationData = await GetUserData.getUserLocation();
                let modNameArr = this.state.allImages;
                let modObj = {
                    "orgfilename": responseData.response.orgfilename,
                    "fileName": responseData.response.fileName,
                    "latitude": locationData.lattitude,
                    "longitude": locationData.longitude
                }

                modNameArr.push(modObj);
                this.state.allImages = modNameArr;
                this.setState({ allImages: this.state.allImages });

                this._modifyImgShowingArr(this.state.allImages);
                Toaster.ShortCenterToaster(responseData.message)
            } else {
                // Toaster.ShortCenterToaster(responseData.message)
            }
        }

        this.setState({ imageLoader: false })
    }



    // for custom camera open
    onSelectPic = async (value) => {
        await this._onTakePhoto(false);
        await this._onImageUpload(value);
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

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    render() {

        const _onDelete = (item, key) => {
            let arr = this.state.allImages;
            let tempArr = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].fileName == item.fileName) {

                } else {
                    tempArr.push(arr[i]);
                }
            }

            this.state.allImages = tempArr;
            this.setState({
                allImages: this.state.allImages
            })
            this._modifyImgShowingArr(this.state.allImages);
            deletePhoto(item)
        }

        const deletePhoto = async (item) => {
            let reqData = {
                meetingId: this.props.route.params.data.id
            }
            let responseData = await MiddlewareCheck("getMeetingPhotographyDelete", reqData, this.props);
            if (responseData == false) {

            } else {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message)
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
        }


        if (this.state.cameraVisible) {
            return <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
        } else {
            return (
                <View style={styles.body}>
                    <View style={styles.mainBody}>
                        {this.state.pageLoader ?
                            <View style={{ height: Dimension.height / 1.5, marginTop: 30 }}>
                                <Loader backgroundColor={"#BECDF4"} />
                            </View>
                            :
                            <>
                                <View style={styles.mainHeadBody}>
                                    <View style={styles.headerLogoSec}>
                                        <Image source={ImageName.ATTENDEE_DOC_MAIN_LOGO} style={styles.mainHeaderLogo} />
                                    </View>
                                    <View>
                                        <Text style={styles.headerLogoTxt}>Take a photo from your</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.headerLogoTxt}>Phone or upload from phone gallery</Text>
                                    </View>

                                </View>
                                <View style={styles.underLine} />
                                <View style={styles.arraySection}>

                                    {/* <ScrollView> */}
                                    <View style={styles.photoSec}>
                                        {this.state.allImgShow.map((item, key) => (
                                            <React.Fragment key={key}>
                                                <View style={styles.mainView}>
                                                    <View style={styles.mainImageView}>
                                                        {item.map((item1, key1) => (
                                                            <React.Fragment key={key1}>
                                                                <View style={styles.flexANdMarginView}>
                                                                    <View style={styles.logisticImageView}>
                                                                        <ImageBlurLoading source={{ uri: App_uri.MMS_AWS_S3_IMAGE_VIEW_URI + item1.fileName }} style={styles.TakephotoImg} />
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

                                    {/* </ScrollView> */}
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
                                                    <Image source={ImageName.WHITE_PLUS} style={styles.addImgIcon} />
                                                </View>
                                            </TouchableOpacity>
                                        </>
                                    }

                                </View>
                                <View style={styles.remarkSec}>
                                    <TextInputBox
                                        multiline={true}
                                        placeholderTextColor={"#37625C"}
                                        placeholder={"Type your Remarks"}
                                        value={this.state.remarks}
                                        height={95}
                                        onChangeText={(value) => this._onRemarkChange(value)}
                                        keyboardType="default"
                                        isActive={this.state.descriptionNotesActive}
                                        onFocus={() => { this.setState({ descriptionNotesActive: true }) }}
                                        onBlur={() => { this.setState({ descriptionNotesActive: false }) }}
                                        // blurOnSubmit={false}
                                        alignItems='flex-start'
                                    />
                                </View>
                                <View style={styles.bottomButtonSec}>
                                    {this.state.uploadLoader ?
                                        <View style={{ justifyContent: "center" }}>
                                            <ActivityIndicator size={"small"} color={Color.COLOR.WHITE.FLASH_WHITE} />
                                        </View>
                                        :
                                        <BigTextButton
                                            backgroundColor={Color.COLOR.BLUE.DARK_BLUE}
                                            text={"Upload"}
                                            fontSize={12}
                                            borderRadius={25}
                                            onPress={() => this.onUpload()}
                                        />
                                    }
                                </View>
                                <View style={{ height: 100 }} />
                                {this.modalSection()}
                            </>
                        }
                    </View>

                </View>

            )
        }
    };
};

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateUserInformation,
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeUpload);