
import React from "react";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { stateCheckForNetwork, stateUserInformation } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CheckBox, CustomCamera, DropdownInputBox, ImageUploadModal, Loader, TextInputBox } from "../../../shared";
import { ErrorCode } from "../../../services/constant";
import styles from "./style";
import BigTextButton from "../../../shared/big-text-button";
import { DateConvert, FileUpload, Toaster } from "../../../services/common-view-function";
import { DataValidator } from "../../../validators";
import { dateCount, modifyLeaveDataArr, validateData } from "./function";
import DatePicker from "react-native-date-picker";
import { fullDateFormat, viewDateFormat } from "../../../services/common-view-function/dateConvert";
import { MiddlewareCheck, MiddlewareFileCheck } from "../../../services/middleware";
import SvgComponent from "../../../assets/svg";
import { App_uri } from "../../../services/config";
import Header from "../header/Header";
import { UserAccessPermission } from "../../../services/userPermissions";


let leaveRequestData = [
    {
        id: 7,
        typeName: "Casual",
        shortName: "CL",
        check: true
    },
    {
        id: 6,
        typeName: "Privilege",
        shortName: "PL",
        check: false
    },
    {
        id: 8,
        typeName: "Medical",
        shortName: "ML",
        check: false
    },
    {
        id: 10,
        typeName: "Emergency",
        shortName: "EL",
        check: false
    }
]



// for leave entry page
class LeaveRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            remark: "",
            remarkActive: false,
            assignedDatePicker: false,
            assignedDateObj: {
                rawDate: new Date(),
                assignedDate: ""
            },
            endDatePicker: false,
            endDateObj: {
                rawDate: new Date(),
                endDate: ""
            },
            typeArr: [],
            selectedTypeObj: {},
            noOfDay: "",
            teamsConditionCheck: false,
            visiblePhotoModal: false,
            cameraVisible: false,
            profileImg: "",
            profileRaw: "",
            profileImgLoader: false,

            leaveReason: leaveRequestData,
            selectedReasonObj: {},
            submitLoader: false,
            //...................
            permissionData: {}

        };
    }

    // this is a initial function which is call first
    componentDidMount() {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        const currentDate = new Date();
        // Add one day
        currentDate.setDate(currentDate.getDate() + 1);
        // The currentDate now represents the date one day in the future
        this.state.assignedDateObj.rawDate = currentDate
        let permissionData = await UserAccessPermission.LEAVE.leavePermission(this.props)
        this.setState({ permissionData: permissionData, assignedDateObj: this.state.assignedDateObj })

        this.setLabelName(this.state.leaveReason)
        this.onLeaveTypeApi()
    };

    setLabelName = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].check == true) {
                this.state.selectedReasonObj = arr[i]
            }
        }
        this.setState(this.state);
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    // for back action this function used
    _onBack = () => {
        this.props.navigation.goBack();
    };

    // for from date visiable 
    _onAssignedDatePicker = () => {
        this.setState({
            assignedDatePicker: false
        })
    }

    _onOpenAssignedDatePicker = () => {
        this.setState({
            assignedDatePicker: true
        })
    }


    // this function used for changed the select from date
    _onSelectAssignedDate = (date) => {
        this.state.assignedDateObj.rawDate = date;
        this.state.assignedDateObj.assignedDate = DateConvert.formatYYYYMMDD(date);
        this.setState({
            assignedDateObj: this.state.assignedDateObj
        });
        if (this.state.assignedDateObj.rawDate.getTime() > this.state.endDateObj.rawDate.getTime()) {
            //date 1 is newer
            this.state.endDateObj.rawDate = date;
            this.state.endDateObj.endDate = "";
            this.setState({
                endDateObj: this.state.endDateObj
            });
        }
        this.calculateNoOfDate();
    }

    // for to date visiable this function used 
    _onEndDatePicker = () => {
        this.setState({
            endDatePicker: false
        })
    }

    _onOpenToDate = () => {
        this.setState({
            endDatePicker: true
        })
    }

    // for to date select changeg
    _onSelectEndDate = (date) => {
        this.state.endDateObj.rawDate = date;
        this.state.endDateObj.endDate = DateConvert.formatYYYYMMDD(date);
        this.setState({
            endDateObj: this.state.endDateObj
        });

        this.calculateNoOfDate();
    }

    // this function used for calculate from to end date
    calculateNoOfDate = () => {
        if (this.state.assignedDateObj.assignedDate.length == 0 || this.state.endDateObj.endDate.length == 0) {
            this.state.noOfDay = "";
            this.setState({
                noOfDay: this.state.noOfDay
            })
        } else {
            this.state.noOfDay = (dateCount(this.state.assignedDateObj.rawDate, this.state.endDateObj.rawDate)).toString();
            this.setState({
                noOfDay: this.state.noOfDay
            })
        }
        this._onAssignedDatePicker();
        this._onEndDatePicker();

    }



    _onSelectType = (value) => {
        this.state.selectedTypeObj = value;
        this.setState({
            selectedTypeObj: this.state.selectedTypeObj
        })
    }

    // for leave reason  api call here
    onLeaveTypeApi = async () => {
        let responseData = await MiddlewareCheck("getLeaveReasons", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        }
        else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.typeArr = modifyLeaveDataArr(responseData.data.leaveRsnList.data)
                this.setState({
                    typeArr: this.state.typeArr,
                })
            }
        }
    }
    // for remark text changed
    _onChangeRemark = (value) => {
        this.setState({
            remark: value
        })
    }

    // treams and condition chaeckbox this function used
    _onCheckBox = () => {
        this.setState({
            teamsConditionCheck: !this.state.teamsConditionCheck
        })
    }

    _onTakePhoto = async () => {
        this.setState({
            visiblePhotoModal: !this.state.visiblePhotoModal
        })
    }

    // for custom camera open
    onSelectPic = async (value) => {
        await this._onTakePhoto(false);
        await this.ImageUploadApiCall(value);
    }

    ImageUploadApiCall = async (uploadData) => {
        this.setState({ profileImgLoader: true })
        let imgData = await MiddlewareFileCheck("crmImageupload", uploadData, this.props);
        if (imgData === false) {

        } else {
            if (imgData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.profileImg = imgData.response.fileName;
                this.state.profileRaw = uploadData.uri;
                this.setState(this.state);
            }
        }
        this.setState({ profileImgLoader: false })
    }

    closeImgModal = () => {
        this.setState({ visiblePhotoModal: false })
    }

    _imageUploadModalSection = () => {
        const OnChooseGallery = async () => {
            this._onTakePhoto()
            let uploadData = await FileUpload.uploadDocumentAndImage();
            await this.ImageUploadApiCall(uploadData);
        }
        const OnChooseCamera = async () => {
            this.setState({ cameraVisible: true });
        }
        return (
            <ImageUploadModal
                isVisible={this.state.visiblePhotoModal}
                onGallerySelect={(value) => OnChooseGallery(value)}
                onCameraSelect={(value) => OnChooseCamera(value)}
                onCloseModal={(value) => this.closeImgModal(value)}
            />
        )
    }


    // for apply button this function used
    _onSubmit = async () => {
        let reqData = {
            "startDate": this.state.assignedDateObj.rawDate ? fullDateFormat(this.state.assignedDateObj.rawDate) : "",
            "endDate": this.state.endDateObj.rawDate ? fullDateFormat(this.state.endDateObj.rawDate) : "",
            "noOfDays": this.state.noOfDay,
            "leaveType": this.state.selectedTypeObj.id ? this.state.selectedTypeObj.id : "",
            "remark": this.state.remark ? this.state.remark : ""
        }
        let validatedData = validateData(reqData);
        if (validatedData.status) {
            this.setState({ pageLoader: true, submitLoader: true });
            let responseData = await MiddlewareCheck("addLeave", reqData, this.props);
            if (responseData) {
                if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                    Toaster.ShortCenterToaster(responseData.data.message)
                    await this._onBlankData();
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ pageLoader: false, submitLoader: false })
        }
    }


    _onBlankData = async () => {
        this.state.assignedDateObj.assignedDate = "";
        this.state.assignedDateObj.rawDate = new Date();
        this.state.endDateObj.rawDate = new Date();
        this.state.endDateObj.endDate = "";
        this.state.noOfDay = "";
        this.state.selectedTypeObj = {};
        this.state.remark = "";
        this.state.profileImg = "";
        this.state.teamsConditionCheck = false;
        this.setState(this.state);
    }

    onTabClick = (item, key) => {
        let allItems = this.state.leaveReason;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].id == item.id) {
                allItems[i].check = true
            } else {
                allItems[i].check = false
            }
        }
        this.state.leaveReason = allItems;
        this.state.selectedReasonObj = item;
        this.setState(this.state);
    }


    onLeaveHistory = () => {
        this.props.navigation.navigate("LeaveHistory")
    }

    onDelete = () => {
        this.state.profileImg = "";
        this.setState(this.state)
    }

    leaveReasonSec = () => {
        return (
            <View style={{ padding: 5, borderTopColor: "#000", borderTopWidth: 0.5, borderBottomColor: "#000", borderBottomWidth: 0.5, flexDirection: 'row', marginTop: 10 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {this.state.leaveReason.map((item, key) => (
                        <React.Fragment key={key}>
                            <TouchableOpacity style={item.check == true ? { flex: 1, marginHorizontal: 2, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE } : { flex: 1, marginHorizontal: 2 }} onPress={() => this.onTabClick(item, key)}>
                                <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                                    <Text style={item.check == true ? styles.activeReasonShortName : styles.reasonShortName}>{item.shortName}</Text>
                                    <View style={{ width: 10 }} />
                                    {/* <View style={[styles.circelView, { backgroundColor: item.shortName == "CL" ? "#43b65e" : item.shortName == "ML" ? "#43b65e" : item.shortName == "PL" ? Color.COLOR.RED.AMARANTH : "#747c8f" }]}>
                                        <Text style={styles.leaveCount}>0</Text>
                                    </View> */}
                                </View>
                                <Text style={item.check == true ? styles.activeReasonText : styles.reasonText}>{item.typeName}</Text>
                            </TouchableOpacity>
                            <View style={{ borderRightWidth: 0.8, borderRightColor: '#000' }} />
                        </React.Fragment>
                    ))}

                    <View style={{ borderRightWidth: 0.8, borderRightColor: '#000' }} />
                    <TouchableOpacity style={{ marginHorizontal: 2, flex: 1 }} onPress={() => this.onLeaveHistory()}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Leave</Text>
                            <View style={{ width: 18 }} />
                            <SvgComponent svgName={"calender"} strokeColor={"#000"} height={20} width={20} />
                        </View>
                        <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>History</Text>
                            <View style={{ width: 10 }} />
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>2023</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View >
        )
    }

    render() {
        // if (this.state.cameraVisible) {
        //     return <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
        // } else {
        const currentDate = new Date();
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() + 1);

        return (
            <View style={styles.container}>
                {this.state.cameraVisible ?
                    <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
                    :
                    null
                }
                <Header {...this.props} onRefresh={() => console.log("")} />
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardStyle}>
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {this.leaveReasonSec()}
                        {this._imageUploadModalSection()}
                        <View style={{ marginTop: 10, marginHorizontal: 15 }}>
                            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: "center" }}>
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, flex: 1 }}>{this.state.selectedReasonObj.typeName}</Text>
                                <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginRight: '5%' }}>Apply Date</Text>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{DateConvert.formatDDfullMonthYYYY(new Date())}</Text>
                            </View>
                            <View style={{ marginTop: 20, flexDirection: 'row' }}>
                                <TouchableOpacity style={{ borderRadius: 10, flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: Color.COLOR.BLUE.LOTUS_BLUE, borderWidth: 0.6 }} onPress={() => this._onOpenAssignedDatePicker()} activeOpacity={0.9}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 8, height: 50 }}>
                                        <SvgComponent svgName={"calender"} hight={25} width={25} strokeColor={"#000"} />
                                        <Text style={[styles.inputBoxText, this.state.assignedDateObj.assignedDate.length > 0 ? {} : { color: Color.COLOR.GRAY.SILVER }]}>{this.state.assignedDateObj.assignedDate.length == 0 ? "From Date" : viewDateFormat(this.state.assignedDateObj.assignedDate)}</Text>
                                    </View>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={this.state.assignedDatePicker}
                                    date={currentDate}
                                    mode={"date"}
                                    minimumDate={currentDate}
                                    onConfirm={(date) => { this._onSelectAssignedDate(date) }}
                                    onCancel={() => { this._onAssignedDatePicker() }}
                                />
                                <View style={{ width: 35 }} />
                                <TouchableOpacity style={{ borderRadius: 10, flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: Color.COLOR.BLUE.LOTUS_BLUE, borderWidth: 0.6 }} onPress={() => this._onOpenToDate()} activeOpacity={0.9}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 8, height: 50 }}>
                                        <SvgComponent svgName={"calender"} hight={25} width={25} strokeColor={"#000"} />
                                        <Text style={[styles.inputBoxText, this.state.endDateObj.endDate.length > 0 ? {} : { color: Color.COLOR.GRAY.SILVER }]}>{this.state.endDateObj.endDate.length == 0 ? "To Date" : viewDateFormat(this.state.endDateObj.endDate)}</Text>
                                    </View>
                                </TouchableOpacity>
                                <DatePicker
                                    minimumDate={this.state.assignedDateObj.rawDate}
                                    modal
                                    open={this.state.endDatePicker}
                                    date={this.state.endDateObj.rawDate}
                                    mode={"date"}
                                    onConfirm={(date) => { this._onSelectEndDate(date) }}
                                    onCancel={() => { this._onEndDatePicker() }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                                <View style={{ marginLeft: '1%' }} />
                                <SvgComponent svgName={"sun"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={28} width={28} />
                                <View style={{ marginLeft: '5%' }}>
                                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Total Days</Text>
                                    <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>You applying for leave</Text>
                                </View>
                                <Text style={{ color: Color.COLOR.GREEN.SEA_GREEN, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginLeft: '5%', marginTop: 15 }}>{this.state.noOfDay ? this.state.noOfDay : 0}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                                <View style={{ marginLeft: '1%' }} />
                                <SvgComponent svgName={"upload"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={28} width={28} />
                                <View style={{ marginLeft: '5%' }}>
                                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Upload </Text>
                                    <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Support Document</Text>
                                </View>
                                <View style={{ width: 8 }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 9, elevation: 1, backgroundColor: '#D1D1D1', marginHorizontal: '2%', justifyContent: 'center', alignItems: 'center' }} onPress={() => this._onTakePhoto()} activeOpacity={0.9}>
                                        {this.state.profileImgLoader ?
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                <ActivityIndicator size="small" color={Color.COLOR.BLUE.VIOLET_BLUE} />
                                            </View> :
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.profileImg.length > 0 ?
                                                    <Image source={{ uri: App_uri.IMAGE_URI + this.state.profileImg }} style={{ height: 60, width: 60, resizeMode: 'cover', borderRadius: 9 }} /> :
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image source={ImageName.ADD_ICON} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                                                    </View>
                                                }
                                            </View>}
                                        {this.state.profileImg.length > 0 ?
                                            <View style={{ position: 'absolute', right: -4, top: -2, alignItems: 'center', justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.crossBtnImg} onPress={() => this.onDelete()}>
                                                    <SvgComponent svgName={"delete"} height={14} width={14} />
                                                </TouchableOpacity>
                                            </View> :
                                            null
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                {this.state.Loader ?
                                    <ActivityIndicator /> :
                                    <DropdownInputBox
                                        selectedValue={this.state.selectedTypeObj.id ? this.state.selectedTypeObj.id.toString() : ""}
                                        data={this.state.typeArr}
                                        onSelect={(value) => this._onSelectType(value)}
                                        headerText={"Leave Reason"}
                                        additionalBoxStyle={{ borderWidth: 0.4, borderColor: "#000" }}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                }
                            </View>
                            <View style={{ marginTop: 30 }}>
                                <TextInputBox
                                    placeholder={"Remarks*"}
                                    value={this.state.remark}
                                    height={90}
                                    onChangeText={(value) => this._onChangeRemark(value)}
                                    keyboardType="default"
                                    isActive={this.state.remarkActive}
                                    onFocus={() => { this.setState({ remarkActive: true }) }}
                                    onBlur={() => { this.setState({ remarkActive: false }) }}
                                    maxLength={999999999}
                                    multiline={true}
                                    returnKeyType={'default'}
                                    alignItems={"flex-start"}
                                    additionalBoxStyle={{ borderWidth: 0.5, borderColor: Color.COLOR.BLUE.LOTUS_BLUE }}

                                />
                            </View>
                            <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                                <CheckBox
                                    type={"tick"}
                                    data={this.state.teamsConditionCheck}
                                    onClickValue={() => this._onCheckBox()}
                                />
                                <View style={{ marginHorizontal: '5%' }}>
                                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, textDecorationLine: "underline" }}>Accept T&C</Text>
                                    <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Please read teams & condition before apply the leave</Text>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: '28%', marginTop: 25 }}>
                                {this.state.submitLoader ?
                                    <ActivityIndicator /> :
                                    <BigTextButton
                                        height={45}
                                        borderRadius={22}
                                        backgroundColor={Color.COLOR.RED.AMARANTH}
                                        text={"Apply"}
                                        onPress={() => this._onSubmit()}
                                        isDisabled={!this.state.permissionData.addPem}
                                    />
                                }
                            </View>
                        </View>
                        <View style={{ marginBottom: 100 }} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
// }

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateUserInformation,
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(LeaveRequest);
