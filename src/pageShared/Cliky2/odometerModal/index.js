import React, { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import {
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import { BigTextButton, CheckBox, CustomCamera, DropdownInputBox, ImageUploadModal, Loader, Modal, TextInputBox } from "../../../shared";
import styles from "./style";
import { DateConvert, FileUpload, LocationData, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { MiddlewareCheck, MiddlewareFileCheck, StoreUserOtherInformations } from "../../../services/middleware";
import { DataValidator } from "../../../validators";
import { modifyReasonArr, validateData } from "./function";
import { ErrorCode } from "../../../services/constant";
import { Text } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import SvgComponent from "../../../assets/svg";


const travelModeArr = [
    {
        id: 1,
        name: "Bike"
    },
    {
        id: 2,
        name: "Car"
    },
]


function OdometerModal({ props, isVisible, onCloseModal, getOdometerData }) {
    const [odometerModalVisible, setOdometerModalVisible] = useState(false);

    const [imgData, setImgDataData] = useState({});
    const [pageLoader, setPageLoader] = useState(true);
    const [profileImgLoader, setProfileImgLoader] = useState(false);
    const [visiblePhotoModal, setVisiblePhotoModal] = useState(false);
    const [reasonData, setReasonData] = useState([]);
    const [selectedreasonDataTypeObj, setSelectedreasonDataTypeObj] = useState({});
    const [meterReading, setMeterReading] = useState("");
    const [meterReadingActive, setMeterReadingActive] = useState(false);
    const [remarks, setRemarks] = useState("");
    const [remarksActive, setRemarksActive] = useState(false);
    const [inOutCheckBox, setInOutCheckBox] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [odometerData, setOdometerData] = useState({});

    const [travelMode, setTravelMode] = useState(travelModeArr);
    const [selectedTravelModeObj, setSelectedTravelModeObj] = useState({});
    const netInfo = useNetInfo(); // declare the constant

    // props.Sales360Redux.userInfo.isOdometer == undefined ? false : props.Sales360Redux.userInfo.isOdometer == 0 || props.Sales360Redux.userInfo.isOdometer == 2 ? false : true


    let odometerCount = props.Sales360Redux.userInfo.isOdometer;

    useEffect(() => {
        getOdometerApiData();
        getInfo();
    }, [])

    let uploadCheck = false;
    // check the image will upload or not
    if ((imgData !== null || imgData !== undefined) && netInfo.isConnected) {
        uploadCheck = true;
        if (reasonData.length == 0) {
            OnReasonData();
        }
    }

    // for get odometer data
    const getOdometerApiData = async () => {
        let responseData = await MiddlewareCheck("getOdometerStatusData", {});
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setOdometerData(responseData.data);
            }
            else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
        setProfileImgLoader(false);
    }

    // for get the informetion store data
    const getInfo = async () => {
        let odometerData = await StorageDataModification.odometerData({}, "get");
        if (odometerCount == undefined) {
            if (odometerData !== null && odometerData !== undefined) {
                odometerCount = odometerData.type;
            }
        } else {
            odometerCount = props.Sales360Redux.userInfo.isOdometer
        }

        setInOutCheckBox(odometerCount == undefined || odometerCount == null ? false : odometerCount == 0 || odometerCount == 2 ? false : true);
        let imgData = await StorageDataModification.odometer({}, "get");
        if (odometerData !== null && odometerData !== undefined) {
            setMeterReading(odometerData.reading);
            setSelectedTravelModeObj(odometerData.travelMode == undefined || odometerData.travelMode == null ? {} : odometerData.travelMode)
            setSelectedreasonDataTypeObj(odometerData.reason);
        }
        setImgDataData(imgData);
        // await OnReasonData();
        setPageLoader(false);
        StoreUserOtherInformations("", {}, props);
        getOdometerData(odometerCount);
    }

    // for get the reason data from api
    async function OnReasonData() {
        let responseData = await MiddlewareCheck("getAllReasonData", {});
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setReasonData(modifyReasonArr(responseData.response));
            }
            else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
    }

    // for clear the store data
    const OnClearStore = async () => {
        setPageLoader(true);
        StorageDataModification.odometer({}, "store");
        StorageDataModification.odometerData({ "reading": "","travelMode":{}, "reason": {}, "remarks": "", "type": null }, "store");
        // storeData("odometer", {});
        // storeData("odometerData", { "reading": "", "reason": {}, "remarks": "", "type": null });
        getInfo();
    }

    // for clear the page data
    const OnClearPageData = () => {
        setMeterReading("");
        setSelectedreasonDataTypeObj({});
    }

    // for check box change
    const OnInOutCheckBox = () => {
        OnClearPageData()
        setInOutCheckBox(!inOutCheckBox);
    }

    // get photo from camera
    const OnVisibleFileModal = () => {
        setVisiblePhotoModal(!visiblePhotoModal);
    }

    // get photo from camera
    const OnChooseCamera = async () => {
        setProfileImgLoader(true)
        setCameraVisible(true);
        setProfileImgLoader(false)

    }

    // for click the image
    const onSelectPic = async (uploadData) => {
        setProfileImgLoader(true);
        let loactionCurData = await LocationData.fetchCurrentLocation();
        uploadData["lattitude"] = loactionCurData.latitude;
        uploadData["longitude"] = loactionCurData.longitude;

        await StorageDataModification.odometer(uploadData, "store");
        // await storeData("odometer", uploadData);
        setImgDataData(uploadData);
        setProfileImgLoader(false);
    }

    // for chang the reading
    const OnChangeMeterReading = async (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        setMeterReading(newText);
        StorageDataModification.odometerData({ "reading": newText,"travelMode":selectedTravelModeObj, "reason": selectedreasonDataTypeObj, "remarks": remarks, "type": inOutCheckBox ? "1" : "0" }, "store");
        // storeData("odometerData", { "reading": newText, "reason": selectedreasonDataTypeObj, "remarks": remarks, "type": inOutCheckBox ? "1" : "0" });
    }

    // select the reason
    const OnSelectReason = (value) => {
        setSelectedreasonDataTypeObj(value);
        StorageDataModification.odometerData({ "reading": meterReading,"travelMode":selectedTravelModeObj, "reason": value, "remarks": remarks, "type": inOutCheckBox ? "1" : "0" }, "store");

        // storeData("odometerData", { "reading": meterReading, "reason": value, "remarks": remarks, "type": inOutCheckBox ? "1" : "0" });
    }

    // select travel mode
    
    const OnSelectTravelMode = (value) => {
        setSelectedTravelModeObj(value);
        StorageDataModification.odometerData({ "reading": meterReading,"travelMode":value, "reason": selectedreasonDataTypeObj, "remarks": remarks, "type": inOutCheckBox ? "1" : "0" }, "store");

        // storeData("odometerData", { "reading": meterReading, "reason": value, "remarks": remarks, "type": inOutCheckBox ? "1" : "0" });
    }

    // add the remark
    const OnRemark = (value) => {
        setRemarks(value);
        StorageDataModification.odometerData({ "reading": meterReading,"travelMode":selectedTravelModeObj, "reason": selectedreasonDataTypeObj, "remarks": value, "type": inOutCheckBox ? "1" : "0" }, "store");

        // storeData("odometerData", { "reading": meterReading, "reason": selectedreasonDataTypeObj, "remarks": value, "type": inOutCheckBox ? "1" : "0" });
    }

    // set the user informention
    const SetUserInfoToRedux = (type) => {
        let info = props.Sales360Redux.userInfo;
        info.isOdometer = parseInt(type) + 1;
        props.stateUserInformation(info);
        if (inOutCheckBox == false) {
            setInOutCheckBox(true);
        }
    }


    const OnSubmit = async () => {
        if (odometerCount == 2) {
            Toaster.ShortCenterToaster("Odometer reading marked successfully for the day.");
        } else {
            let uploadData = await ImgUpload();
            let loactionCurData = await LocationData.fetchCurrentLocation();
            if (uploadData) {
                let reqData = {
                    inTime: inOutCheckBox == false ? DateConvert.fullDateFormat(new Date()) : "",
                    inTimePic: inOutCheckBox == false ? uploadData : "",
                    inMeter: inOutCheckBox == false ? meterReading : "",
                    outTime: inOutCheckBox == true ? DateConvert.fullDateFormat(new Date()) : "",
                    outTimePic: inOutCheckBox == true ? uploadData : "",
                    outMeter: inOutCheckBox == true ? meterReading : "",
                    remarks: inOutCheckBox == true ? remarks : "",
                    travelMode:selectedTravelModeObj.id ? selectedTravelModeObj.id : "",
                    reasonId: selectedreasonDataTypeObj.id ? selectedreasonDataTypeObj.id : "",
                    lattitude: imgData.lattitude ? imgData.lattitude : loactionCurData.latitude,
                    longitude: imgData.longitude ? imgData.longitude : loactionCurData.longitude,
                    type: inOutCheckBox == false ? "0" : "1"
                }

                let responseData = await MiddlewareCheck("addOdometer", reqData);

                if (responseData) {
                    if (responseData.error == ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                        SetUserInfoToRedux(reqData.type);
                        OnClearPageData();
                        Toaster.ShortCenterToaster(responseData.data.message);
                        // props.onSaveDataToParent({ pageNum: 2 })
                        if (inOutCheckBox) {
                            getOdometerData(parseInt(reqData.type) + 1);
                            await OnClearStore();
                            OnCloseOdometerModal();
                        } else {
                            // storeData("odometer", {});
                            StorageDataModification.odometer({}, "store");
                            StorageDataModification.odometerData({ "reading": "","travelMode":selectedTravelModeObj,"reason": {}, "remarks": "", "type": parseInt(reqData.type) + 1 }, "store");
                            getOdometerData(parseInt(reqData.type) + 1);
                            getInfo();
                            OnCloseOdometerModal();
                            // storeData("odometerData", { "reading": "", "reason": {}, "remarks": "", "type": parseInt(reqData.type) + 1 });
                        }
                        setProfileImgLoader(true);
                        getOdometerApiData();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message);
                    }
                }
                setSubmitLoader(false);
            }
        }
        StoreUserOtherInformations("", {}, props);
    }

    // for upload image
    const ImgUpload = async () => {
        let reqData = {
            inOutCheckBox: inOutCheckBox,
            inTimePic: inOutCheckBox == false ? imgData ? imgData.name : "" : "",
            outTimePic: inOutCheckBox == true ? imgData ? imgData.name : "" : "",
            inMeter: inOutCheckBox == false ? meterReading : "",
            outMeter: inOutCheckBox == true ? meterReading : "",
            travelMode:selectedTravelModeObj
        }
        let validatedData = validateData(reqData);
        if (validatedData.status) {
            setSubmitLoader(true);
            let responseData = await MiddlewareFileCheck("imageupload", imgData, props);
            // setSubmitLoader(false);
            if (responseData == false) {
                return false;
            } else {
                if (responseData.error == ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                    // Toaster.ShortCenterToaster(responseData.message);
                    return (responseData.data.path + responseData.data.filename);
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                    return false;
                }
            }
        }
    }

    const OnCloseOdometerModal = () => {
        onCloseModal()
    }

    const ListSection = () => {
        let imgDataCheck = true;
        if ((imgData == null || imgData == undefined) || imgData.uri == undefined) {
            imgDataCheck = false;
        }

        let isDisabled = true;
        if (odometerCount == undefined) {
            if (uploadCheck == false) {
                isDisabled = false;
            }
            if (uploadCheck == true && odometerCount == false) {
                isDisabled = false;
            }
        } else {
            if (odometerCount < 2) {
                if (uploadCheck == false) {
                    isDisabled = false;
                }
            }
        }

        if (cameraVisible) {
            return <CustomCamera isVisible={cameraVisible} onCloseCamera={(value) => setCameraVisible(value)} picData={(value) => onSelectPic(value)} />
        } else {

            let totalDistance = 0,
                totalDays = 0,
                inMeter = 0,
                outMeter = 0,
                odometerInRange = 0;
            if (odometerData) {
                if (odometerData.totalDays) {
                    totalDays = odometerData.totalDays;
                }
                if (odometerData.totalDistance) {
                    totalDistance = odometerData.totalDistance;
                }
                if (odometerData.todayOdometerData && odometerData.todayOdometerData.length > 0) {
                    inMeter = odometerData.todayOdometerData[0].inMeter ? odometerData.todayOdometerData[0].inMeter : 0;
                    outMeter = odometerData.todayOdometerData[0].outMeter ? odometerData.todayOdometerData[0].outMeter : 0;
                }
            }

            return (
                <Modal
                    isVisible={isVisible}
                    onBackButtonPress={() => OnCloseOdometerModal()}
                    onBackdropPress={() => OnCloseOdometerModal()}
                    onRequestClose={() => OnCloseOdometerModal()}
                    children={
                        <View style={styles.odometermodalview}>
                            <View style={{ flexDirection: "row", marginTop: 5, marginRight: 5 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <SvgComponent svgName={"calender"} strokeColor={"#292D32"} height={20} width={20} />
                                    <Text style={styles.dateTxt}>{DateConvert.getDDthMonthNameYYYYformat(new Date()).day + " " + DateConvert.getDDthMonthNameYYYYformat(new Date()).month + " " + DateConvert.getDDthMonthNameYYYYformat(new Date()).year}</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                                <TouchableOpacity
                                    style={styles.crossImgSec}
                                    activeOpacity={0.9}
                                    onPress={() => OnCloseOdometerModal()}>
                                    <SvgComponent svgName={"cross"} height={16} width={16} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.totalKMSec}>
                                <Text style={styles.totalKmTxt}>{totalDistance}</Text>
                                <Text style={styles.KmTxt}>kM.</Text>
                            </View>

                            <View style={styles.totalOdometerTillDate}>
                                <Text style={styles.OdoDate}>Total Odometer till <Text style={styles.mainDate}>{DateConvert.getDDthMonthNameYYYYformat(new Date()).day + " " + DateConvert.getDDthMonthNameYYYYformat(new Date()).month}</Text></Text>
                                <Text style={styles.totalOdoDate}> {totalDays} Day{parseInt(totalDays) > 1 ? "s" : ""}</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Image source={ImageName.ODOMETER_BANNER_LOGO} style={{ height: 90, width: Dimension.width / 1.20, resizeMode: "cover" }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 0.2 }}>
                                        <Text style={[styles.mainDate, { textAlign: 'left' }]}>{inMeter}</Text>
                                    </View>
                                    <View style={{ flex: 0.6 }} />
                                    <View style={{ flex: 0.2 }}>
                                        <Text style={[styles.mainDate, { textAlign: 'right' }]}>{outMeter}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                <TouchableOpacity
                                    // style={[styles.profileImgView, imgDataCheck ? { borderWidth: 3, borderColor: uploadCheck ? 'green' : 'red' } : {}]}
                                    activeOpacity={0.9}
                                    onPress={(value) => OnChooseCamera(value)}
                                    disabled={profileImgLoader ? true : odometerCount == 2 ? true : false}>
                                    {profileImgLoader ?
                                        <ActivityIndicator size="small" color={Color.COLOR.BLUE.VIOLET_BLUE} /> :
                                        <>
                                            {imgDataCheck ?
                                                <Image source={{ uri: imgData.uri }} style={styles.profileUploadImg} />
                                                :
                                                < SvgComponent svgName={"cameraInsidePhone"} height={90} width={90} strokeColor={"#292D32"} />
                                            }
                                        </>
                                        // <Image source={imgDataCheck ? { uri: imgData.uri } : ImageName.CAMERA_LOGO} style={imgDataCheck ? styles.profileUploadImg : styles.profileImg} />
                                    }
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                                    <Text style={styles.takePhotoTxt}>Take a Photo</Text>
                                    <Image source={ImageName.RED_EXCLAMATION_ODOMETER_LOGO} style={{ height: 21, width: 21, resizeMode: "contain", marginLeft: 10 }} />
                                </View>
                            </View>
                            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                <View style={{ marginTop: 30, marginHorizontal: 15 }}>
                                    <DropdownInputBox
                                        selectedValue={selectedTravelModeObj.id ? selectedTravelModeObj.id.toString() : "0"}
                                        data={travelMode}
                                        upDownImages={[ImageName.GRAY_UP, ImageName.GRAY_DOWN]}
                                        onSelect={(value) => OnSelectTravelMode(value)}
                                        headerText={"Travel Mode"}
                                        selectedText={selectedTravelModeObj.name ? selectedTravelModeObj.name : "Type"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                        borderRadius={20}
                                        fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                                        selectedTextColor={"#747C90"}
                                        unSelectedTextColor={"#747C90"}
                                        backgroundColor={"#F0F4F7"}
                                        isDisabled={inOutCheckBox}
                                    />
                                </View>
                                <View style={{ marginTop: 10, marginHorizontal: 15 }}>
                                    <TextInputBox
                                        placeholder={"Give Your Odometer Reading"}
                                        value={meterReading}
                                        alignItems={"flex-start"}
                                        multiline={true}
                                        height={45}
                                        maxLength={10}
                                        onChangeText={(value) => OnChangeMeterReading(value)}
                                        keyboardType="numeric"
                                        isActive={meterReadingActive}
                                        onFocus={() => { setMeterReadingActive(true) }}
                                        onBlur={() => { setMeterReadingActive(false) }}
                                        blurOnSubmit={true}
                                        editable={odometerCount == 2 ? false : true}
                                        inactiveBGColor={"#F0F4F7"}
                                        activeBGColor={"#F0F4F7"}
                                        activeTextColor={"#747C90"}
                                        inactiveTextColor={"#747C90"}
                                        placeholderTextColor={"#747C90"}
                                        borderRadius={20}
                                        fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                                    />
                                </View>
                                <View style={{ marginTop: 10, marginHorizontal: 15 }}>
                                    {inOutCheckBox == true ?
                                        <DropdownInputBox
                                            selectedValue={selectedreasonDataTypeObj.id ? selectedreasonDataTypeObj.id.toString() : "0"}
                                            data={reasonData}
                                            upDownImages={[ImageName.GRAY_UP, ImageName.GRAY_DOWN]}
                                            onSelect={(value) => OnSelectReason(value)}
                                            headerText={"Reason"}
                                            selectedText={selectedreasonDataTypeObj.name ? selectedreasonDataTypeObj.name : "Type"}
                                            isBackButtonPressRequired={true}
                                            isBackdropPressRequired={true}
                                            borderRadius={20}
                                            fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                                            selectedTextColor={"#747C90"}
                                            unSelectedTextColor={"#747C90"}
                                            backgroundColor={"#F0F4F7"}
                                        />
                                        :
                                        null
                                    }
                                </View>
                                <View style={{ marginTop: 10, marginHorizontal: 15 }}>
                                    {inOutCheckBox == true ?
                                        <TextInputBox
                                            placeholder={"Other Remarks"}
                                            value={remarks}
                                            alignItems={"flex-start"}
                                            multiline={true}
                                            height={55}
                                            maxLength={100000000}
                                            onChangeText={(value) => OnRemark(value)}
                                            //    keyboardType="numeric"
                                            isActive={remarksActive}
                                            onFocus={() => { setRemarksActive(true) }}
                                            onBlur={() => { setRemarksActive(false) }}
                                            blurOnSubmit={true}
                                            editable={odometerCount == 2 ? false : true}
                                            inactiveBGColor={"#F0F4F7"}
                                            activeBGColor={"#F0F4F7"}
                                            activeTextColor={"#747C90"}
                                            inactiveTextColor={"#747C90"}
                                            placeholderTextColor={"#747C90"}
                                            borderRadius={20}
                                            fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}

                                        />
                                        :
                                        null
                                    }
                                </View>
                                {submitLoader ?
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <ActivityIndicator size="large" color={Color.COLOR.BLUE.VIOLET_BLUE} />
                                    </View> :
                                    <React.Fragment>
                                        <View style={{ marginTop: 15, paddingHorizontal: "25%" }}>
                                            {uploadCheck ?
                                                <BigTextButton
                                                    height={38}
                                                    borderRadius={25}
                                                    text={odometerCount >= 1 ? "End Odometer" : "Start Odometer"}
                                                    onPress={() => OnSubmit()}
                                                    isLeftIcon={true}
                                                    leftIcon={ImageName.ODOMETER_IMG}
                                                    fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                                                    fontSize={12}

                                                /> :
                                                <Text style={styles.networkNotAvailableError}>Network Unavailable ! {"\n"}Please try again later to submit your Odometer Reading</Text>
                                            }
                                        </View>
                                    </React.Fragment>
                                }
                                {/* <View style={{height:500}}/> */}
                            </ScrollView>

                        </View>
                    }
                />
            )
        }
    }

    const modalSection = () => {
        return (
            <ImageUploadModal
                isVisible={visiblePhotoModal}
                onCameraSelect={(value) => OnChooseCamera(value)}
                onCloseModal={(value) => OnVisibleFileModal(value)}
            />
        )
    }

    if (pageLoader) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Loader />
            </View>
        )
    } else {
        return (<View>
            {modalSection()}
            {ListSection()}
        </View>);
    }
}


OdometerModal.defaultProps = {
    isVisible: false,
    onCloseModal: () => { },
    getOdometerData: () => { }
};

OdometerModal.propTypes = {
    isVisible: PropTypes.bool,
    onCloseModal: PropTypes.func,
    getOdometerData: PropTypes.func
};

export default OdometerModal;

