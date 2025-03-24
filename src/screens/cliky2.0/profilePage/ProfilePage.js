import React from "react";
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../enums';
import styles from './Style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,

} from 'react-native';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../redux/Sales360Action';
import { ErrorCode } from '../../../services/constant';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomCamera, ImageUploadModal } from "../../../shared";
import { DateConvert, FileUpload, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { MiddlewareCheck, MiddlewareFileCheck } from "../../../services/middleware";
import { App_uri } from "../../../services/config";
import { DistZoneStateViewModal } from "../../../pageShared";
import { modifyResData } from "./Function";
import SvgComponent from "../../../assets/svg";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const bar = {
    activeStrokeWidth: 5,
    inActiveStrokeWidth: 5,
    inActiveStrokeOpacity: 0.2
};

let optionsArr = [
    {
        id: 1,
        name: "Profile",
        icon: "barGraphWithStar",
        check: true
    },
    {
        id: 2,
        name: "Activity",
        icon: "calender",
        check: false
    },

    // {
    //     id: 4,
    //     name: "Challenge",
    //     icon: "grievance",
    //     check: false
    // },
    // {
    //     id: 5,
    //     name: "Performane",
    //     icon: "performanceGraph",
    //     check: false
    // },
    // {
    //     id: 6,
    //     name: "Grievance",
    //     icon: "grievance",
    //     check: false
    // },
    // {
    //     id: 7,
    //     name: "Help",
    //     icon: "help",
    //     check: false
    // },
]

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.scrollViewRef = React.createRef();
        this.state = {
            visiblePhotoModal: false,
            profileImgLoader: false,
            imageUrl: "",
            userInfoData: {},
            imageName: "",
            pageLoader: true,

            zoneDistDetailsModal: false,
            modalDataType: "state",
            cameraVisible: false,
            showHideArea: false,
            userData: {},
            optionsArrData: optionsArr,
            isEditable: ""
        }
    }

    componentDidMount() {
        this.state.isEditable = this.props.route.params ? true : false;
        this.setState(this.state);
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                this._load();
            })
    }

    _detailsModal = () => {
        this.setState({
            detailsModal: !this.state.detailsModal
        })
    }

    _onBack = () => {
        this.props.navigation.goBack()
    }

    _getUserInfoFromApi = async () => {
        let responseData = await MiddlewareCheck("getGeneralData", {}, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    userInfoData: modifyResData(responseData.data.details)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _load = async () => {
        let userData = await StorageDataModification.userCredential({}, "get")
        this.setState({ userData: userData })
        await this._getUserInfoFromApi()
        this.setState({
            imageName: this.state.userInfoData.profileImgUrl ? this.state.userInfoData.profileImgUrl : "",
            pageLoader: false
        })
    }

    _onDistZoneDetailsModal = (value) => {
        this.setState({
            zoneDistDetailsModal: !this.state.zoneDistDetailsModal
        })

        if (value !== undefined || value !== null) {
            this.state.modalDataType = value;
            this.setState({
                modalDataType: this.state.modalDataType
            })
        }
    }

    modalSection = () => {
        return (
            <>
                <ImageUploadModal
                    isVisible={this.state.visiblePhotoModal}
                    onGallerySelect={(value) => this._onChooseGallery(value)}
                    onCameraSelect={(value) => this._onChooseCamera(value)}
                    onCloseModal={(value) => this._onTakePhoto(value)}
                />
                {this.state.zoneDistDetailsModal ?
                    <DistZoneStateViewModal
                        isVisible={this.state.zoneDistDetailsModal}
                        data={this.state.modalDataType == 'state' ? this.state.userInfoData.hmUpperNodes.State : this.state.modalDataType == 'district' ? this.state.userInfoData.hmUpperNodes.District : this.state.modalDataType == 'zone' ? this.state.userInfoData.hmUpperNodes.Zone : ""}
                        headerText={this.state.modalDataType == 'state' ? 'All States' : this.state.modalDataType == 'district' ? 'All Districts' : this.state.modalDataType == 'zone' ? 'All Zones' : ''}
                        onCloseModal={() => this._onDistZoneDetailsModal()}
                    />
                    :
                    null
                }
            </>
        )
    }

    // get photo from Gallery
    _onChooseGallery = async () => {
        await this._onTakePhoto(false);
        let uploadData = await FileUpload.uploadImg();
        await this._onImageUpload(uploadData);
    }

    // get photo from camera
    _onChooseCamera = async () => {
        await this._onTakePhoto(false);
        // let uploadData = await FileUpload.uploadCameraImg();
        // await this._onImageUpload(uploadData);
        this.setState({ cameraVisible: true });
    }

    _onImageUpload = async (uploadData) => {
        this.setState({
            visiblePhotoModal: false,
            profileImgLoader: true,
            pageLoader: true,
        })

        let responseData = await MiddlewareFileCheck("crmImageupload", uploadData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await this._onSaveProfilePic(responseData);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ profileImgLoader: false, pageLoader: false })
    }

    _onSaveProfilePic = async (imageUploadData) => {
        let responseData = await MiddlewareCheck("profilePicUpdate", { "profilePic": imageUploadData.response.fileName }, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let userInfo = this.props.Sales360Redux.userInfo;
                userInfo.details.profileImgUrl = imageUploadData.response.fileName;
                this.props.stateUserInformation(userInfo);
                this.setState({
                    imageName: imageUploadData.response.fileName,
                })
                Toaster.ShortCenterToaster(responseData.message);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

    }
    // for custom camera open
    onSelectPic = async (value) => {
        await this._onTakePhoto(false);
        await this._onImageUpload(value);
    }

    _onTakePhoto = async (type) => {
        this.state.visiblePhotoModal = type;
        this.setState({
            visiblePhotoModal: this.state.visiblePhotoModal
        })
    }

    onSelectWorkingArea = () => {
        this.setState({
            showHideArea: !this.state.showHideArea
        })
        this.scrollViewRef.current.scrollTo({ y: 500, animated: true });
    }

    selectOption = (item, key) => {
        let arr = this.state.optionsArrData
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].check = true
                if (item.name == "Activity") {
                    this.props.navigation.navigate("MyActivity")
                }
            } else {
                arr[i].check = false
            }
        }
        this.state.optionsArrData = arr;
        // optionsArr
        this.setState({ optionsArrData: this.state.optionsArrData })
    }

    render() {
        if (this.state.cameraVisible) {
            return <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    {this.modalSection()}
                    <View style={styles.profileHead}>
                        <View style={{ flex: 0.55 }}>
                            {this.state.profileImgLoader ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                    <ActivityIndicator size="small" color={Color.COLOR.BLUE.VIOLET_BLUE} />
                                </View> :
                                <React.Fragment>
                                    <Image source={{ uri: App_uri.IMAGE_URI + this.state.imageName }} style={{ flex: 1, resizeMode: "cover" }} />
                                    <TouchableOpacity style={{ top: 10, right: 5, position: "absolute", }} onPress={() => this._onTakePhoto(true)} >
                                        <Image source={ImageName.PROFILE_EDIT} style={{ height: 40, width: 40, resizeMode: "contain" }} />
                                    </TouchableOpacity>
                                </React.Fragment>
                            }
                        </View>
                        <View style={{ flex: 0.45, backgroundColor: Color.COLOR.RED.AMARANTH, padding: 10 }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 17, fontFamily: FontFamily.FONTS.POPPINS.BOLD }}>{this.state.userData.firstName}</Text>
                            {this.state.pageLoader ?
                                <SkeletonPlaceholder>
                                    <View style={{ height: 8, borderRadius: 10, width: "80%", marginBottom: 10 }} />
                                    <View style={{ height: 8, borderRadius: 10, width: "60%" }} />
                                </SkeletonPlaceholder>
                                :
                                <>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{this.state.userInfoData.roleName}</Text>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }} numberOfLines={2}>{this.state.userInfoData.address}</Text>
                                </>
                            }
                            <View style={{ flexDirection: "row", height: Dimension.height - (Dimension.height - 100) }}>
                                {/* <View style={{ flex: 0.7 }}>
                                    <View style={{ flexDirection: "row", borderRadius: 25, borderWidth: 1, borderColor: Color.COLOR.WHITE.PURE_WHITE, paddingHorizontal: 10, paddingVertical: 5, alignSelf: "flex-start", alignItems: "center", marginTop: 10 }}>
                                        <Image source={ImageName.YELLOW_STAR_ICON} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginLeft: 10 }}>{this.state.userInfoData.levelName}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", borderRadius: 25, borderWidth: 1, borderColor: Color.COLOR.WHITE.PURE_WHITE, paddingHorizontal: 10, paddingVertical: 5, alignSelf: "flex-start", alignItems: "center", marginTop: 10 }}>
                                        <Image source={ImageName.YELLOW_COIN_ICON} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginLeft: 10 }}>{this.state.userInfoData.pointsEarned}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.3, alignItems: "center", alignSelf: "flex-end" }}>
                                    <CircularProgressBase
                                        {...bar}
                                        value={75}
                                        radius={20}
                                        rotation={90}
                                        activeStrokeColor={'#fff'}
                                        inActiveStrokeColor={'#D1D1D1'}
                                        clockwise={false}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.BOLD, top: 2 }}>{75}%</Text>
                                        </View>
                                    </CircularProgressBase>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Profile</Text>

                                </View> */}
                            </View>
                        </View>
                    </View>
                    <View>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={true}>
                            <View style={{ flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderColor: Color.COLOR.GRAY.GRAY_COLOR, marginTop: 5, paddingVertical: 5, height: 75 }}>
                                {this.state.optionsArrData.map((item, key) => (
                                    <TouchableOpacity style={{ width: 90, borderRightWidth: 1, borderRightColor: Color.COLOR.GRAY.GRAY_COLOR, paddingVertical: 5, alignItems: "center", justifyContent: "center", backgroundColor: item.check ? "#F0F4F7" : "#fff" }} onPress={() => this.selectOption(item, key)} key={key}>
                                        <SvgComponent svgName={item.icon} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={30} width={30} />
                                        <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 10 }}>{item.name}</Text>
                                        <View style={{ position: "absolute", top: 0, right: 10 }}>
                                            <View style={{ height: 5, width: 5, backgroundColor: 'red', borderRadius: 50, }} />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                    {this.state.pageLoader ?
                        <SkeletonPlaceholder>
                            <View style={{ height: 80, marginVertical: 5, marginHorizontal: 10 }} />
                            <View style={{ height: 80, marginVertical: 5, marginHorizontal: 10 }} />
                            <View style={{ height: 80, marginVertical: 5, marginHorizontal: 10 }} />
                            <View style={{ height: 80, marginVertical: 5, marginHorizontal: 10 }} />
                            <View style={{ height: 80, marginVertical: 5, marginHorizontal: 10 }} />
                            <View style={{ height: 80, marginVertical: 5, marginHorizontal: 10 }} />

                        </SkeletonPlaceholder>
                        :
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} ref={this.scrollViewRef}>
                            <View style={styles.textInputView}>
                                <View style={styles.detailsMainView}>
                                    <View style={{ marginRight: 20 }}>
                                        <SvgComponent svgName={"phone"} strokeColor={"#292D32"} height={38} width={38} />
                                    </View>
                                    <View>
                                        <Text style={styles.headerText}>{this.state.userInfoData.phone}</Text>
                                        <Text style={styles.subTextName}>Personal Contact Number</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 5, borderWidth: 0.4, borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY }} />
                            </View>
                            <View style={styles.textInputView}>
                                <View style={styles.detailsMainView}>
                                    <View style={{ marginRight: 20 }}>
                                        <SvgComponent svgName={"mail"} strokeColor={"#292D32"} height={35} width={35} />
                                    </View>
                                    <View>
                                        <Text style={styles.headerText}>{this.state.userInfoData.email}</Text>
                                        <Text style={styles.subTextName}>Contact mail ID</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 5, borderWidth: 0.4, borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY }} />
                            </View>
                            <View style={styles.textInputView}>
                                <View style={styles.detailsMainView}>
                                    <View style={{ marginRight: 20 }}>
                                        <SvgComponent svgName={"designation"} strokeColor={"#292D32"} height={35} width={35} />
                                    </View>
                                    <View>
                                        <Text style={styles.headerText}>{this.state.userInfoData.designationName}</Text>
                                        <Text style={styles.subTextName}>Designation</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 5, borderWidth: 0.4, borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY }} />
                            </View>
                            <View style={styles.textInputView}>
                                <View style={styles.detailsMainView}>
                                    <View style={{ marginRight: 20 }}>
                                        <SvgComponent svgName={"profileWithBorder"} strokeColor={"#292D32"} height={38} width={38} />
                                    </View>
                                    <View>
                                        <Text style={styles.headerText}>{this.state.userInfoData.roleName}</Text>
                                        <Text style={styles.subTextName}>Role Name</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 5, borderWidth: 0.4, borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY }} />
                            </View>
                            <View style={[styles.textInputView,{backgroundColor:"red"}]}>
                                <View style={styles.detailsMainView}>
                                    <View style={{ marginRight: 20 }}>
                                        <SvgComponent svgName={"locationWithCircle"} strokeColor={"#292D32"} height={35} width={35} />
                                    </View>
                                    <View>
                                        <Text style={styles.headerText}>{this.state.userInfoData.address}</Text>
                                        <Text style={styles.subTextName}>Address</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 5, borderWidth: 0.4, borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY }} />
                            </View>
                            <View style={styles.textInputView}>
                                <View style={styles.detailsMainView}>
                                    <View style={{ marginRight: 20 }}>
                                        <SvgComponent svgName={"contactId"} strokeColor={"#292D32"} height={35} width={35} />
                                    </View>
                                    <View>
                                        <Text style={styles.headerText}>{this.state.userInfoData.erpCode}</Text>
                                        <Text style={styles.subTextName}>Registered : {DateConvert.viewDateFormat(this.state.userInfoData.createdAt)}</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 5, borderWidth: 0.4, borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY }} />
                            </View>
                            <View style={styles.textInputView}>
                                <TouchableOpacity style={styles.detailsMainView} onPress={() => this.onSelectWorkingArea()}>
                                    <View style={{ marginRight: 20 }}>
                                        <SvgComponent svgName={"location"} strokeColor={"#292D32"} height={35} width={35} />
                                    </View>
                                    <View>
                                        <Text style={styles.headerText}>Working Area</Text>
                                        <Text style={styles.subTextName}>Assign to working area</Text>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                    {this.state.showHideArea ?
                                        <View>
                                            <Image source={ImageName.UP_ARROW} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                                        </View>
                                        :
                                        <View>
                                            <Image source={ImageName.DOWN_ARROW} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                                        </View>
                                    }

                                </TouchableOpacity>
                                <View style={{ marginTop: 5, borderWidth: 0.4, borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY }} />
                            </View>
                            <View style={{ maxHeight: 200, marginHorizontal: 15 }}>
                                {this.state.showHideArea ?
                                    <>
                                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                                            {this.state.userInfoData.hmName.map((item, key) => (
                                                <View style={{ justifyContent: "flex-start", flexDirection: "row", paddingVertical: 10, paddingHorizontal: 10 }} key={key}>
                                                    <View style={{ height: 20, width: 20, borderRadius: 100, backgroundColor: Color.COLOR.RED.AMARANTH, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: 11, top: 1 }}>{key + 1}</Text>
                                                    </View>
                                                    <Text style={styles.locationTxt}>{item}</Text>
                                                </View>
                                            ))
                                            }
                                        </ScrollView>
                                    </>
                                    : null
                                }
                            </View>
                            <View style={{ marginBottom: 30 }} />
                        </ScrollView>
                    }

                </SafeAreaView>
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
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);