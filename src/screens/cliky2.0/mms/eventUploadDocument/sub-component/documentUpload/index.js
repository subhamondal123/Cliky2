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
    TextInput,
} from "react-native";
import { stateCheckForNetwork, stateUserInformation } from "../../../../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BigTextButton, CustomCamera, ImageUploadModal, Loader, TextInputBox } from "../../../../../../shared";
import { modifyLoadData } from "./function";
import { FileUpload, GetUserData, Toaster } from "../../../../../../services/common-view-function";
import { MiddlewareCheck, MiddlewareFileCheck } from "../../../../../../services/middleware";
import { ErrorCode } from "../../../../../../services/constant";


class DocumentUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            visibleProfileImgUploadModal: false,
            // imageArr: [],
            // fileArr: [],
            allImgShow: [],
            visiblePhotoModal: false,
            imageLoader: false,
            imgName: "",
            imgUri: "",
            remarks: "",
            fileArr: [],
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
            "photoType": "2"
        }
        let responseData = await MiddlewareCheck("mmsGetMeetingPhotography", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.fileArr = await modifyLoadData(responseData.response);
                this.setState({
                    fileArr: this.state.fileArr,
                    remarks: this.state.fileArr.length == 0 || this.state.fileArr[0].photoDescription == null || this.state.fileArr[0].photoDescription == undefined ? "" : this.state.fileArr[0].photoDescription
            
                })
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
            // allImgShow: [],
            fileArr: [],
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

    // _modifyImgShowingArr = (data) => {
    //     this.setState({ allImgShow: _modifyAddDataArr(data) })

    // }

    _onRemarkChange = (value) => {
        this.setState({
            remarks: value
        })
    }

    onUpload = async () => {
      
        let reqData = {
            "indentId": this.props.route.params.data.indentId ? this.props.route.params.data.indentId : "",
            "type": "2",
            "meetingArr": this.state.fileArr,
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

    onDelete = (item, key) => {
        let docNameArr = this.state.fileArr;
        docNameArr.splice(key, 1);
        this.state.fileArr = docNameArr;
        this.setState({ fileArr: this.state.fileArr })
    }


    _onImageUpload = async (uploadData) => {
        this.setState({
            listLoader: true,
            // imageLoader: true,
            imgName: uploadData.name,
            imgUri: uploadData.name,
        })
        this.setState({ imageLoader: true, })
        let responseData = await MiddlewareFileCheck("mmsFileUpload", uploadData);
        if (responseData == false) {

        } else {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let locationData = await GetUserData.getUserLocation();
                let modNameArr = this.state.fileArr;
                let modObj = {
                    "orgfilename": responseData.response.orgfilename,
                    "fileName": responseData.response.fileName,
                    "latitude": locationData.lattitude,
                    "longitude": locationData.longitude
                }

                modNameArr.push(modObj);
                this.state.fileArr = modNameArr;
                this.setState({ fileArr: this.state.fileArr });

                // this._modifyImgShowingArr(this.state.fileArr);
                Toaster.ShortCenterToaster(responseData.message)
            } else {
                // Toaster.ShortCenterToaster(responseData.message)
            }
        }

        this.setState({ imageLoader: false, })

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
            let uploadData = await FileUpload.uploadDocumentAndImage();
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

    importDocSection = () => {
        return (
            <View style={styles.importDocSec}>
                <View style={{ flex: 1 }}>
                    {this.state.imageLoader ?
                        <ActivityIndicator />
                        :
                        <BigTextButton text={"Import"} borderRadius={25}
                            backgroundColor={Color.COLOR.BLUE.DARK_BLUE}
                            fontSize={13} height={40}
                            onPress={() => this._onTakePhoto()}
                        />
                    }
                </View>
            </View>
        )
    }

    render() {

        const _onClose = (item, key) => {
            let arr = this.state.fileArr;
            let tempArr = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].imagePath == item.imagePath) {

                } else {
                    tempArr.push(arr[i]);
                }
            }

            this.state.fileArr = tempArr;
            this.setState({
                fileArr: this.state.fileArr
            })
            // this._modifyImgShowingArr(this.state.fileArr);
        }



        if (this.state.cameraVisible) {
            return <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
        } else {

            return (

                <View style={styles.body}>
                    <View style={styles.mainBody}>

                        {this.state.pageLoader ?
                            <View style={{ height: Dimension.height / 1.5, marginTop: 30 }}>
                                <Loader backgroundColor={"#F3E990"} />
                            </View>
                            :
                            <>
                                <View style={styles.mainHeadBody}>
                                    <View style={styles.headerLogoSec}>
                                        <Image source={ImageName.ATTENDEE_DOC_MAIN_LOGO} style={styles.mainHeaderLogo} />
                                    </View>
                                    <View>
                                        <Text style={styles.headerLogoTxt}>Take a photo of your document or upload photo</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.headerLogoTxt}>from phone gallery</Text>
                                    </View>

                                    <View style={styles.eclipseSec}>
                                        <Text style={styles.eclipseSecTxt}>Or</Text>
                                    </View>

                                    <View style={styles.logSec}>
                                        <View style={{ paddingRight: 10 }}>
                                            <Image source={ImageName.PDF_LOGO} style={styles.pdflogo} />
                                        </View>
                                        <Image source={ImageName.MICROSOFT_WORD_LOGO} style={styles.wordlogo} />
                                    </View>
                                </View>
                                {this.importDocSection()}

                                <View style={styles.fileSizeSec}>
                                    <Text style={styles.fileSizeTxt}>**File size should not more than 100mb</Text>
                                </View>

                                <View style={styles.whiteMainUnderline} />
                                <View style={styles.arraySection}>
                                    {this.state.fileArr.map((item, key) => (
                                        <View style={styles.mainArrayItemSec} key={key}>
                                            <View style={{ flex: 0.8, flexDirection: 'row' }}>
                                                <Text style={styles.fileNameTxt} numberOfLines={1}>{key + 1}. {item.orgfilename}</Text>
                                            </View>
                                            <View style={{ flex: 0.1 }} />
                                            <View style={styles.loaderAndDeleteSec}>
                                                <TouchableOpacity style={styles.deleteLogoSec} activeOpacity={0.9} onPress={() => this.onDelete(item, key)}>
                                                    <Image source={ImageName.WHITE_DELETE_LOGO} style={styles.whiteDeleteLogo} />
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                    ))}


                                </View>

                                <View style={styles.remarkSec}>
                                    <TextInputBox
                                        multiline={true}
                                        placeholderTextColor={"#7B7115"}
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
                                            onPress={() => this.onUpload()}
                                            backgroundColor={Color.COLOR.BLUE.DARK_BLUE}
                                            // fontColor={Color.COLOR.BLUE.DARK_BLUE}
                                            text={"Upload"}
                                            fontSize={12}
                                            borderRadius={25}

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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentUpload);