
import { PropTypes } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react'
import styles from './style';
import { Image, View, Text, TouchableOpacity, ActivityIndicator, Keyboard, } from "react-native";
import { Color, FontFamily, FontSize, ImageName } from "../../../../../enums";
import { BigTextButton, CalenderModal, CustomCamera, DropdownInputBox, ImagePreview, ImageUploadModal, Loader, TextInputBox } from "../../../../../shared";
import SvgComponent from "../../../../../assets/svg";
import { ErrorCode } from '../../../../../services/constant';
import { DateConvert, FileUpload, StorageDataModification, Toaster } from '../../../../../services/common-view-function';
import { MiddlewareCheck, MiddlewareFileCheck } from '../../../../../services/middleware';
import { modifyCategoryArr, modifyStatusArr, modifySubCategoryArr } from './function';
import { DataValidator } from '../../../../../validators';
import DatePicker from 'react-native-date-picker';
import { App_uri } from '../../../../../services/config';
import { ClientSettings } from '../../../../../services/userPermissions';

function VisitStatus({
    isHidden,
    isVisible,
    isLoading,
    type,
    data,
    onSubmitNote,
    props,
    successLoader

}) {
    if (isHidden) return null;

    const [calenderVisibility, setCalenderVisibility] = useState(false);
    const [selectedNextDate, setSelectedNextDate] = useState(false);
    const [selectStatusObj, setSelectStatusObj] = useState({});
    const [statusArr, setStatusArr] = useState([]);
    const [selectCategoryObj, setSelectCategoryObj] = useState({});
    const [category, setcategory] = useState([]);
    const [selectedSubCategoryObj, setSelectedSubCategoryObj] = useState({});
    const [subCategory, setSubCategory] = useState([]);
    const [submitLoader, setSubmitLoader] = useState(false);

    const [statusLoader, setStatusLoader] = useState(false);
    const [cameraLoader, setCameraLoader] = useState(false);
    const [profileImg, setProfileImg] = useState("");
    const [visibleProfileImgUploadModal, setVisibleProfileImgUploadModal] = useState(false);
    const [cameraVisible, setCameraVisible] = useState(false);

    const [dropDownFetchData, setDropDownFetchData] = useState({});
    const [loader, setLoader] = useState(true);

    const [addNotes, setAddNotes] = useState("");

    const [activeNotes, setActiveNotes] = useState(false);

    const [datePicker, setDatePicker] = useState(false);
    const [dateObj, setdateObj] = useState({ rawDate: new Date(), selectedDate: "" });
    const [isOffline, setIsOffline] = useState(false);

    const textInputRef = useRef(null);


    useEffect(() => {
        fetchData();
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            if (textInputRef.current) {
                textInputRef.current.blur(); // Ensure TextInput loses focus
            }
        });

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);


    const fetchData = async () => {
        let offlineCheck = await ClientSettings.OfflineAccess.getOfflineAccess();
        setIsOffline(offlineCheck);
        if (offlineCheck) {
            let getImgData = await StorageDataModification.imageData({}, "get");
            if (getImgData !== undefined && getImgData !== null && getImgData[props.route.params.item.id] && getImgData[props.route.params.item.id].visitNote) {
                setProfileImg(getImgData[props.route.params.item.id].visitNote.uri);
            }
            let visitDropdownData = await StorageDataModification.visitNotesDropDownData({}, "get");
            setDropDownFetchData(visitDropdownData);
            await fetchVisitStatusData(visitDropdownData.mstVisitStatusData);
            await onFetchAllCategory(visitDropdownData.mstVisitFeedbackCategoryData);
        } else {
            await visitApiCall();
        }
        setLoader(false);
    }


    const visitApiCall = async () => {
        let responseData = await MiddlewareCheck("getOfflineVisitFeedbackConfig", {}, props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setDropDownFetchData(responseData.response, "store");
                await fetchVisitStatusData(responseData.response.mstVisitStatusData);
                await onFetchAllCategory(responseData.response.mstVisitFeedbackCategoryData);
            }
        }
        return true;
    }


    const onSubmit = async () => {
        let resData = {};
        resData["visitImg"] = isOffline ? "" : profileImg;
        resData["selectVisitStatus"] = selectStatusObj;
        resData["selectCategoryObj"] = selectCategoryObj;
        resData["selectSubCategoryObj"] = selectedSubCategoryObj;
        resData["description"] = addNotes;
        resData["subCategory"] = subCategory;
        resData["dateObj"] = dateObj;
        onSubmitNote(resData)
    }

    const fetchVisitStatusData = async (data) => {
        setStatusArr(modifyStatusArr(data));
    }

    const _onSelectedStatus = (value) => {
        setSelectStatusObj(value)
    }

    const onFetchAllCategory = async (data) => {
        setcategory(modifyCategoryArr(data))
    }

    const _OnSelectCategory = async (value) => {
        let data = category;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        setSelectCategoryObj(value);
        setcategory(data);
        await getSubCategory(value.visitFeedbackSubCategories);
    }

    const getSubCategory = async (value) => {
        setSubCategory(modifySubCategoryArr(value))
    }

    const _OnSelectSubCategory = async (value) => {
        setSelectedSubCategoryObj(value)
    }

    const onaddNotes = (value) => {
        let newText = DataValidator.inputEntryValidate(value, "name")
        setAddNotes(newText)
    }


    const onShowCalender = () => {
        setCalenderVisibility(true)
    }

    const onCloseCalender = () => {
        setCalenderVisibility(false)
    }

    const OnCalenderDaySelect = (val) => {
        setSelectedNextDate(val)
        onCloseCalender()
    }

    const modalSec = () => {
        const OnChooseGallery = async () => {
            _onProfilePicModalVisible()
            let uploadData = await FileUpload.uploadImg();
            await ImageUploadApiCall(uploadData);
        }
        const OnChooseCamera = async () => {
            setCameraVisible(true)
        }
        return (
            <>
                <CalenderModal
                    isVisible={calenderVisibility}
                    onCloseModal={() => onCloseCalender()}
                    onApply={(data) => OnCalenderDaySelect(data)}
                    resetData={() => _onCalenderReset()}
                />
                <ImageUploadModal
                    isVisible={visibleProfileImgUploadModal}
                    onGallerySelect={(value) => OnChooseGallery(value)}
                    onCameraSelect={(value) => OnChooseCamera(value)}
                    onCloseModal={(value) => _onProfilePicModalVisible(value)}
                />

            </>

        )
    }

    const _onSelectDate = (date) => {
        setdateObj({
            rawDate: date,
            selectedDate: DateConvert.viewDateFormat(date)
        })
        closeDatePicker();
    }

    const closeDatePicker = () => {
        setDatePicker(false);

    }

    const _onOpenDatePicker = () => {
        setDatePicker(true);
    }

    const nextActionDate = () => {
        return (
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={styles.inputBoxStyle} activeOpacity={0.9} onPress={() => _onOpenDatePicker(true)}>
                    <Text style={[styles.inputBoxText, { color: dateObj.selectedDate.length == 0 ? "#C0C0C0" : "#0A0A0A" }]} numberOfLines={1}>{dateObj.selectedDate.length == 0 ? "Next Visit Date" : dateObj.selectedDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={[{ height: 25, width: 25, resizeMode: 'contain' }]} source={ImageName.CALENDER_LOGO} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={datePicker}
                    date={dateObj.rawDate}
                    mode={"date"}
                    minimumDate={new Date()}
                    onConfirm={(date) => { _onSelectDate(date); }}
                    onCancel={() => { closeDatePicker() }}
                />
            </View>

        )
    }

    // for profile image upload visible
    const _onProfilePicModalVisible = async () => {
        setCameraVisible(true)
        // setVisibleProfileImgUploadModal(!visibleProfileImgUploadModal)
    }

    const ImageUploadApiCall = async (uploadData) => {
        setCameraLoader(true);
        if (isOffline) {
            await storeOfflineImage(uploadData);
        } else {
            let imgData = await MiddlewareFileCheck("crmImageupload", uploadData, props);
            if (imgData) {
                if (imgData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    setProfileImg(imgData.response.fileName)
                }
            }
        }
        setCameraLoader(false);
    }

    // for store offline image data to storage
    const storeOfflineImage = async (uploadData) => {
        let getImgData = await StorageDataModification.imageData({}, "get");
        let getVisitData = await StorageDataModification.customerOrderANdVisitData({}, "get");
        uploadData["orderUnicId"] = getVisitData[props.route.params.item.id].orderUnicId;
        uploadData["customerId"] = props.route.params.item.id;
        setProfileImg(uploadData.uri);
        if (getImgData == null || getImgData == undefined) {
            let imgData = {};
            imgData[props.route.params.item.id] = { "visitNote": uploadData };
            await StorageDataModification.imageData(imgData, "store");
        } else {
            let count = 0;
            Object.keys(getImgData).forEach(async key => {
                if (props.route.params.item.id == key) {
                    count++;
                }
            });
            if (count == 0) {
                getImgData[props.route.params.item.id] = { ...getImgData[props.route.params.item.id], ...{ "visitNote": uploadData } };
            } else {
                getImgData[props.route.params.item.id]["visitNote"] = uploadData;
            }
            await StorageDataModification.imageData(getImgData, "store");
        }
    }

    // for click the image
    const onSelectPic = async (value) => {
        await _onProfilePicModalVisible(false);
        await ImageUploadApiCall(value);
        // let loactionCurData = await LocationData.fetchCurrentLocation();
        // uploadData["lattitude"] = loactionCurData.latitude;
        // uploadData["longitude"] = loactionCurData.longitude;
        // setProfileImgLoader(true);
        // await StorageDataModification.odometer(uploadData, "store");
        // // await storeData("odometer", uploadData);
        // setImgDataData(uploadData);
        // setProfileImgLoader(false);
    }

    const _onCameraClose = (value) => {
        setCameraVisible(value)
        setVisibleProfileImgUploadModal(value)

    }

    if (cameraVisible) {
        return <CustomCamera isVisible={cameraVisible} onCloseCamera={(value) => _onCameraClose(value)} picData={(value) => onSelectPic(value)} cameraType={"front"}/>
    } else {
        return (
            <React.Fragment>
                {modalSec()}
                {loader ?
                    <ActivityIndicator /> :
                    <View style={{ justifyContent: 'center', marginHorizontal: '5%', }}>
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, textAlign: 'center', }}>Please Provide your visit Status information below</Text>
                        <View style={styles.timeSec}>
                            <SvgComponent svgName={"clock"} strokeColor={"#F13748"} height={20} width={20} />
                            <View style={{ width: 8 }} />
                            <Text style={styles.dText}>Visit at <Text style={styles.namePText}>{DateConvert.view24TimeFormat(new Date()).hour + ":" + DateConvert.view24TimeFormat(new Date()).minutes}</Text> {DateConvert.view24TimeFormat(new Date()).lowerCaseAmpm}</Text>
                        </View>
                        <View >
                            <View style={{}} />
                            <View style={styles.profileImgView}>
                                {cameraLoader ?
                                    <ActivityIndicator size="small" color={Color.COLOR.INDICATOR_COLOR.GRAY} /> :
                                    <Image source={(profileImg.length > 0 && isOffline) ? { uri: profileImg } : profileImg.length > 0 ? { uri: App_uri.IMAGE_URI + profileImg } : ImageName.USER} style={styles.profileImg} />
                                }
                            </View>
                            {cameraLoader ?
                                null :
                                <View style={styles.cameraView}>
                                    <TouchableOpacity onPress={() => _onProfilePicModalVisible()} activeOpacity={0.8} >
                                        <Image source={ImageName.CAMERA} style={styles.cameraIconImg} />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <View style={{}}>
                            <DropdownInputBox
                                selectedValue={selectStatusObj.id ? selectStatusObj.id.toString() : "0"}
                                data={statusArr}
                                onSelect={(value) => _onSelectedStatus(value)}
                                headerText={"Visit Status"}
                            // selectedText={selectStatusObj.name ? selectStatusObj.name : "Choose Status"}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <DropdownInputBox
                                selectedValue={selectCategoryObj.id ? selectCategoryObj.id.toString() : "0"}
                                data={category}
                                onSelect={(value) => _OnSelectCategory(value)}
                                headerText={"*Category Name"}
                            />
                        </View>
                        {subCategory.length > 0 ?
                            <View style={{ marginTop: 10 }}>
                                <DropdownInputBox
                                    selectedValue={selectedSubCategoryObj.id ? selectedSubCategoryObj.id.toString() : "0"}
                                    data={subCategory}
                                    onSelect={(value) => _OnSelectSubCategory(value)}
                                    headerText={"*Sub-Category Name"}
                                />
                            </View> :
                            <View style={{ marginTop: 10 }}>
                                <TextInputBox
                                    placeholder={"Add Detail Note"}
                                    placeholderTextColor={"#C0C0C0"}
                                    height={90}
                                    alignItems={"flex-start"}
                                    multiline
                                    value={addNotes}
                                    onChangeText={(value) => onaddNotes(value)}
                                />
                            </View>}
                        {nextActionDate()}
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ flex: 1 }} />
                            <View style={{ width: 25 }} />
                            <View style={{ flex: 1 }}>
                                {successLoader ?
                                    <Loader type={"normal"} />
                                    :
                                    <BigTextButton
                                        text={"Submit"}
                                        backgroundColor={"#F13748"}
                                        borderRadius={26}
                                        height={40}
                                        fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                        fontSize={12}
                                        onPress={() => onSubmit()}
                                    />
                                }

                            </View>
                        </View>
                        {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Other Activity</Text>
                        </View> */}
                    </View>
                }
            </React.Fragment>
        )
    }
}

VisitStatus.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    data: {},
    onSubmitNote: () => { },
    props: "",
    successLoader: false
}

VisitStatus.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.instanceOf(Object),
    onSubmitNote: PropTypes.func,
    successLoader: PropTypes.bool,
}

export default VisitStatus;