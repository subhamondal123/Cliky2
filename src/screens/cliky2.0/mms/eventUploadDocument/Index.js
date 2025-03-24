
import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator
} from "react-native";

import { Color, Dimension, FontFamily, ImageName } from "../../../../enums";
import { FileUpload, Toaster } from "../../../../services/common-view-function";
import { ErrorCode } from "../../../../services/constant";
import { MiddlewareFileCheck } from "../../../../services/middleware";
import { BigTextButton, ImageUploadModal, Loader, TextButton, TextInputBox } from "../../../../shared";
import { CustomStyle } from "../../../style";
import styles from "./Style";
import { stateCheckForNetwork,stateUserInformation } from "../../../../redux/Sales360Action";

import { AttendeeUpload, DocumentUpload, MeetingUpload } from "./sub-component";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class MeetingUploadDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            allPageData: {},

            registrationObjData: {},
            pageLoader: true,
            visibleProfileImgUploadModal: false,
            imageArr: [],
            allImages: [],
            allImgShow: [],
            visiblePhotoModal: false,
            imageLoader: false,
            imgName: "",
            imgUri: "",
            remarks: "",
            pageNum: 1
        };
    }

    componentDidMount = async () => {
        this._onLoad();
    }
    _onLoad = async () => {
        this.setState({ pageLoader: false })
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    headerSec = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: "2%", marginVertical: "5%" }}>
                <TouchableOpacity style={CustomStyle.backButtonView} onPress={() => this._onBack()}>
                    <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                </TouchableOpacity>
                <View style={CustomStyle.headerTextView}>
                    <Text style={styles.headerTxtMain}></Text>
                </View>
                <View style={CustomStyle.backButtonView} />
            </View>
        )
    }

    onTabSelect = (type) => {
        if (type == "meeting") {
            this.setState({ pageNum: 1 })
        }
        if (type == "attendee") {
            this.setState({ pageNum: 2 })
        }
        if (type == "document") {
            this.setState({ pageNum: 3 })
        }
    }


    eventHeaderSection = () => {
        const mainHeaderTabSection = () => {
            return (
                <View style={styles.mainHeadSec}>
                    <View>
                        <Text style={styles.mainHeadLeftSecTxt}>Upload Meeting Photo</Text>
                    </View>
                    {/* <Text style={styles.statusTxt}>For Event Name</Text> */}

                </View>
            )
        }

        const tabButtonSection = () => {
            return (
                <View style={{ flexDirection: "row", marginTop: "5%" }}>
                    <TouchableOpacity style={styles.tabMeetingButtonSec} activeOpacity={0.9} onPress={() => this.onTabSelect("meeting")}>
                        <View>
                            <Image source={ImageName.MEETING_GROUP} style={styles.group} />
                        </View>
                        <View >
                            <Text style={styles.tabButtonTxt}>Meeting</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 0.03 }} />
                    <TouchableOpacity style={styles.tabAttendeeButtonSec} activeOpacity={0.9} onPress={() => this.onTabSelect("attendee")}>
                        <View>
                            <Image source={ImageName.BLUE_USER} style={styles.group} />
                        </View>
                        <View >
                            <Text style={styles.tabAttendeeButtonTxt}>Attendees</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 0.03 }} />
                    <TouchableOpacity style={styles.tabDocumentButtonSec} activeOpacity={0.9} onPress={() => this.onTabSelect("document")}>
                        <View>
                            <Image source={ImageName.DOCUMENT_YELLOW} style={styles.group} />
                        </View>
                        <View >
                            <Text style={styles.tabDocButtonTxt}>Document</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }



        const mainBody = () => {

            return (
                <>
                    {this.state.pageNum == 1 ?
                        <React.Fragment>
                            <MeetingUpload {...this.props} />
                        </React.Fragment> : null}

                    {this.state.pageNum == 2 ?
                        <React.Fragment>
                            <AttendeeUpload {...this.props} />
                        </React.Fragment> : null}

                    {this.state.pageNum == 3 ?
                        <React.Fragment>
                            <DocumentUpload {...this.props} />
                        </React.Fragment> : null}

                </>
            )
        }


        return (
            <View style={{ marginVertical: 10 }}>
                <View style={styles.detailHeaderSec}>
                    {mainHeaderTabSection()}
                    {tabButtonSection()}
                    {mainBody()}
                </View>
            </View>
        )
    }

    underLineSec = () => {
        return (
            <View style={styles.mainUnderLine} />
        )
    }

    modalSection = () => {
        //for image picker
        const _onChooseGallery = async () => {
            await this._onTakePhoto();
            let uploadData = await FileUpload.uploadImg();
            await _onImageUpload(uploadData);
        }

        // get photo from camera
        const _onChooseCamera = async () => {
            await this._onTakePhoto();
            let uploadData = await FileUpload.uploadCameraImg();
            await _onImageUpload(uploadData);
        }

        const _onImageUpload = async (uploadData) => {
            this.setState({
                listLoader: true,
                // imageLoader: true,
                imgName: uploadData.name,
                imgUri: uploadData.name,
            })
            this.setState({ imageLoader: true, })
            let responseData = await MiddlewareFileCheck("imageupload", uploadData, this.props);
            if (responseData == false) {

            } else {
                if (responseData.error == ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                    let data = [
                        {
                            "images": responseData.data.filename,
                            "imagePath": uploadData.uri
                        }
                    ]
                    this.setState({
                        allImages: [...this.state.allImages, ...data]
                    })

                    this._modifyImgShowingArr(this.state.allImages);
                    Toaster.ShortCenterToaster(responseData.message)
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }

            this.setState({ imageLoader: false, })

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

    render() {
        return (
            <SafeAreaView style={styles.container} >
                {this.state.pageLoader ? <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                    <Loader />
                </View> : <>
                    {this.headerSec()}
                    {this.underLineSec()}

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View>
                            {this.eventHeaderSection()}
                        </View>
                    </ScrollView>
                </>}

            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateUserInformation,
        stateCheckForNetwork
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MeetingUploadDocument);