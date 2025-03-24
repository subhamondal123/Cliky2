import { Text, View, SafeAreaView, ScrollView, ImageBackground, Image, window, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { ImageName, Dimension, Color, FontSize, FontFamily } from '../../../../enums'
import { BigTextButton, CustomCamera, ImageUploadModal, Loader, Modal, TextInputBox } from "../../../../shared";

import SvgComponent from "../../../../assets/svg";

import styles from './Style';
import { MiddlewareCheck, MiddlewareFileCheck } from '../../../../services/middleware';
import { ErrorCode } from '../../../../services/constant';
import { DateConvert, FileUpload, StorageDataModification, Toaster } from '../../../../services/common-view-function';
import { App_uri } from '../../../../services/config';
import { modImgData } from './Function';

import {
    stateUserInformation,
    stateCheckForNetwork,
    stateCartData,
    storeOutletListData
} from '../../../../redux/Sales360Action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createImageProgress } from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';

const ProgressImage = createImageProgress(FastImage);


class MerchandisingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            profileImg: "",
            profileRaw: "",
            profileRaw1: "",
            imageLoader: false,
            visibleProfileImgUploadModal: false,
            cameraVisible: false,
            isinisialView: true,
            profileImg1: "",
            profileRaw1: "",
            visibleProfileImgUploadModal1: false,
            profileImg2: "",
            profileRaw2: "",
            visibleProfileImgUploadModal_2: false,
            visiblePhotoModalAll: false,
            allImages: [],
            allImgShow: [],
            listLoader: true,
            imageLoader: false,
            imgName: "",
            imgUri: "",
            visiblePhotoModal: false,
            staticImg: [],
            allImgs: [],
            tempImgArr: [],
            uploadLoader: false,
            pageloader: true,
            fetchImgArr: [],

            imageIndex: {},
            imageShowModal: false,
            viewImage: ""

        }
    }

    componentDidMount = () => {
        this._load();
    }

    _load = async () => {
        let reqData = {
            "visitId": this.props.Sales360Redux.storeOutletListData.storeCheckingData.visitId,
            "shopId": this.props.route.params.data.shopId,
        }
        let responseData = await MiddlewareCheck("getMerchandisingImages", reqData, this.props);
        this.setState({ pageloader: false })
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allImgShow = responseData.response;
                this.setState({ fetchImgArr: this.state.fetchImgArr });
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }


    // for back the page
    onBack = () => {
        this.props.navigation.goBack();
    }

    // for profile image upload visible
    _onProfilePicModalVisible = async () => {
        this.state.visibleProfileImgUploadModal = !this.state.visibleProfileImgUploadModal
        this.setState({
            visibleProfileImgUploadModal: this.state.visibleProfileImgUploadModal
        })
    }


    headerSec = () => {
        return (
            <View style={{ backgroundColor: '#fff', marginVertical: 10, }}>
                <View style={{ marginHorizontal: '5%', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={ImageName.OUTLET_LOGO} style={{ height: 45, width: 45, resizeMode: 'contain' }} />
                    <View style={{ width: 8 }} />
                    <TouchableOpacity style={{}} onPress={() => this.onBack()} activeOpacity={0.9}>
                        <SvgComponent svgName={"back"} hight={20} width={20} strokeColor={"#1F2B4D"} />
                    </TouchableOpacity>
                    <View style={{ width: 8 }} />
                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Merchandising</Text>
                </View>
            </View>
        )
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
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let data = [
                    {
                        "images": responseData.response.fileName,
                        "imagePath": uploadData.uri,
                        "isupdate": "0"
                    }
                ]
                this.setState({
                    allImgShow: [...this.state.allImgShow, ...data]
                })
                this._modifyImgShowingArr(this.state.allImgShow);
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ imageLoader: false, visiblePhotoModalAll: false })

    }

    _onDelete = async (item) => {
        let reqData = {
            "id": item.id,
        }
        let responseData = await MiddlewareCheck("deleteMerchandisingImages", reqData, this.props);
    }

    _onClose = async (item, index) => {
        this.state.imageIndex = item;
        this.setState({ imageIndex: this.state.imageIndex });
        let indexToDelete = this.state.allImgShow.findIndex(item => item === this.state.imageIndex);
        if (indexToDelete !== -1) {
            this.state.allImgShow.splice(indexToDelete, 1);
            if (item.isUpdate == 1) {
                this._onDelete(item);
            }
            this.setState({ allImgShow: this.state.allImgShow });
            this._modifyImgShowingArr(this.state.allImgShow);
        }
    }

    _modifyImgShowingArr = (allData) => {
        let imgData = allData;
        let Arr = []
        for (let i = 0; i < imgData.length; i++) {
            Arr.push({ "image": imgData[i].images, isUpdate: imgData[i].isupdate || imgData[i].isUpdate })
        }
        this.state.tempImgArr = Arr;
        this.state.allImgShow = imgData;
        this.setState({
            allImgShow: this.state.allImgShow,
            tempImgArr: this.state.tempImgArr
        })

    }


    onUpdate = async () => {
        if (this.state.tempImgArr.length <= 4) {
            Toaster.ShortCenterToaster("Pleace Select atleast 5 images")
        } else {
            let reqData = {
                "visitId": this.props.Sales360Redux.storeOutletListData.storeCheckingData.visitId,
                "shopId": this.props.route.params.data.shopId,
                "images": this.state.tempImgArr,
            }
            this.setState({ uploadLoader: true });
            let responseData = await MiddlewareCheck("addMerchandisingImages", reqData, this.props);
            if (responseData) {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster("Image Upload Successfully");
                    this.onBack()
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ uploadLoader: false });
        }
    }

    _onChooseGallery = async () => {
        await this._onTakePhoto();
        let uploadData = await FileUpload.uploadImg();
        await this._onImageUpload(uploadData);
    }

    // get photo from camera
    _onChooseCamera = async () => {
        this.setState({ cameraVisible: true });
    }

    _onTakePhoto = async () => {
        this.state.visiblePhotoModalAll = !this.state.visiblePhotoModalAll;
        this.setState({
            visiblePhotoModalAll: this.state.visiblePhotoModalAll
        })
    }
    onSelectPic = async (value) => {
        await this._onTakePhoto(false);
        await this._onImageUpload(value);
    }

    onRequestCloseModal = (item) => {
        this.state.imageShowModal = true;
        this.state.viewImage = item.images
        this.setState(this.state);
    }


    onCloseModal = () => {
        this.state.imageShowModal = false;
        this.state.viewImage = ""
        this.setState(this.state);
    }

    modalSection = () => {
        return (
            <>
                <ImageUploadModal
                    isVisible={this.state.visiblePhotoModalAll}
                    // onGallerySelect={(value) => this._onChooseGallery(value)}
                    isGalary = {false}
                    onCameraSelect={(value) => this._onChooseCamera(value)}
                    onCloseModal={(value) => this._onTakePhoto(value)}
                />

                <Modal
                    isVisible={this.state.imageShowModal}
                    onRequestClose={() => this.onCloseModal()}
                    onBackdropPress={() => this.onCloseModal()}
                    onBackButtonPress={() => this.this.onCloseModal()}
                    children={
                        <View style={styles.modalview}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 14 }}>
                                <ProgressImage
                                    source={{ uri: App_uri.IMAGE_VIEW_URI + this.state.viewImage }}
                                    style={{ height: 350, width: Dimension.width - 50, borderRadius: 100, backgroundColor: "#e6f2ff" }}
                                    indicator={Progress.Circle}
                                    indicatorProps={{
                                        size: 40,
                                        borderWidth: 0,
                                        color: 'rgba(150, 150, 150, 1)',
                                        unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                    }}
                                />
                            </View>

                        </ View>
                    }
                />
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.cameraVisible ?
                    <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
                    :
                    null
                }
                {this.headerSec()}
                {this.modalSection()}
                {this.state.pageloader ?
                    <Loader /> :
                    <>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                                {this.state.allImgShow.length == 0 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ marginRight: 5, backgroundColor: '#F0F4F7', width: Dimension.width / 3.5, height: 100, justifyContent: 'center', marginTop: 5 }} activeOpacity={0.8}>
                                            <React.Fragment>
                                                <TouchableOpacity style={styles.tauchableSec} onPress={() => this._onTakePhoto()}>
                                                    <SvgComponent svgName={"camera"} hight={30} width={30} strokeColor={"#4B5263"} />
                                                    <Text style={styles.cameraText}>Take a Photo</Text>
                                                </TouchableOpacity>
                                            </React.Fragment>
                                        </View>

                                        <View style={{ marginRight: 5, backgroundColor: '#F0F4F7', width: Dimension.width / 3.5, height: 100, justifyContent: 'center', marginTop: 5 }} activeOpacity={0.8}>
                                            <React.Fragment>
                                                <TouchableOpacity style={styles.tauchableSec} onPress={() => this._onTakePhoto()}>
                                                    <SvgComponent svgName={"camera"} hight={30} width={30} strokeColor={"#4B5263"} />
                                                    <Text style={styles.cameraText}>Take a Photo</Text>
                                                </TouchableOpacity>
                                            </React.Fragment>
                                        </View>
                                        <View style={{ marginRight: 5, backgroundColor: '#F0F4F7', width: Dimension.width / 3.5, height: 100, justifyContent: 'center', marginTop: 5 }} activeOpacity={0.8}>
                                            <React.Fragment>
                                                <TouchableOpacity style={styles.tauchableSec} onPress={() => this._onTakePhoto()}>
                                                    <SvgComponent svgName={"camera"} hight={30} width={30} strokeColor={"#4B5263"} />
                                                    <Text style={styles.cameraText}>Take a Photo</Text>
                                                </TouchableOpacity>
                                            </React.Fragment>
                                        </View>
                                    </View>
                                    :
                                    <React.Fragment>
                                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                                            {this.state.allImgShow.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <TouchableOpacity onPress={() => this.onRequestCloseModal(item)}>
                                                        <Image source={{ uri: App_uri.IMAGE_VIEW_URI + item.images }} resizeMode='cover' style={{ height: 100, width: Dimension.width / 3.5, marginTop: 5, marginRight: 5 }} />
                                                    </TouchableOpacity>
                                                    <View style={{ alignItems: 'flex-end' }}>
                                                        <TouchableOpacity style={{ height: 22, width: 22, borderRadius: 100, backgroundColor: '#FF0000', alignItems: 'center', justifyContent: 'center', position: 'absolute', marginRight: '10%', marginTop: 5 }} onPress={() => this._onClose(item, index)} activeOpacity={0.8}>
                                                            <SvgComponent svgName={"cross"} hight={10} width={10} strokeColor={"#FFFFFF"} />
                                                        </TouchableOpacity>
                                                    </View>

                                                </React.Fragment>

                                            ))}
                                        </View>
                                    </React.Fragment>
                                }
                                {this.state.imageLoader ?
                                    <View style={{
                                        width: '100%',
                                        height: undefined,
                                        paddingVertical: 15
                                    }}>
                                        <ActivityIndicator size="large" color={Color.COLOR.RED.AMARANTH} />
                                    </View>
                                    :
                                    <>
                                        {this.state.allImgShow.length == 0 ?
                                            null : (
                                                <React.Fragment>
                                                    <TouchableOpacity style={styles.addImgField} activeOpacity={0.9} onPress={() => this._onTakePhoto()}>
                                                        <View style={styles.addImg}>
                                                            <Image source={ImageName.WHITE_PLUS} style={styles.addImgIcon} />
                                                        </View>
                                                    </TouchableOpacity>
                                                </React.Fragment>
                                            )}
                                    </>
                                }
                                <View style={{ alignItems: 'center', marginTop: 40 }}>
                                    {this.state.uploadLoader ?
                                        <ActivityIndicator color={Color.COLOR.RED.AMARANTH} size={"large"} /> :
                                        <View style={{ width: "50%", }}>
                                            <BigTextButton
                                                backgroundColor={Color.COLOR.RED.AMARANTH}
                                                text={this.state.allImgShow.length == 0 ? "Upload" : "Update"}
                                                onPress={() => this.onUpdate()}
                                                borderRadius={25}
                                            />
                                        </View>
                                    }
                                </View>
                            </View>
                        </ScrollView>

                        <View style={{ marginTop: 10 }} />
                        <View style={{ alignItems: 'center', justifyContent: 'center', bottom: 0 }}>
                            <Image source={ImageName.OUTLET_BUTTON} style={{ resizeMode: 'contain', height: 160 }} />
                        </View>
                    </>
                }
            </SafeAreaView>

        )
    }
}


const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateUserInformation,
        stateCheckForNetwork,
        stateCartData,
        storeOutletListData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MerchandisingPage);


