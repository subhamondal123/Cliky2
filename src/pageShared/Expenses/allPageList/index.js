import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    TextInput
} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize,
    ImageName
} from '../../../enums';
import { BigTextButton, CustomCamera, DropdownInputBox, ImageUploadModal, Loader, Modal, NormalLoader, TextInputBox } from '../../../shared';
import { CustomStyle } from '../../../screens/style';
import { MiddlewareCheck, MiddlewareFileCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import { DataConvert, DateConvert, FileUpload, Toaster } from '../../../services/common-view-function';
import { foodSubListModifyData, modifyArrTransportModeData, modifyExpenceCategoryArr, modifyFoodDataData, modTransportData, validateData, visitSubListModifyData, _modifyAddDataArr, modHeaderObj } from './function';
import { DataValidator } from '../../../validators';
import { App_uri } from '../../../services/config';
import ImageBlurLoading from 'react-native-image-blur-loading';

function AllPageList({
    type,
    data,
    isHidden,
    ListShowHide,
    onOtherButtonPress,
    onAddressButtonPress,
    props,
    onChoosePhoto,
    onSubmit

}) {
    if (isHidden) return null;
    const [customerLoder, setCustomerLoader] = useState(false);

    const [foodTypeArr, setFoodTypeArr] = useState([]);
    const [selectedFoodTypeObj, setSelectedFoodTypeObj] = useState({});

    const [expenseCategoryArr, setexpenseCategoryArr] = useState([]);
    const [selectedExpenseCategoryObj, setSelectedExpenseCategoryObj] = useState({});
    const [expenseModeArr, setexpenseModeArr] = useState([]);
    const [selectedExpenseModeObj, setSelectedExpenseModeObj] = useState({});

    const [cost, setCost] = useState("");
    const [costActive, setCostActive] = useState(false);

    const [comment, setComment] = useState("");
    const [commentActive, setCommentActive] = useState(false);

    const [visitList, setVistList] = useState([]);
    const [showHideLoader, setshowHideLoader] = useState(false);

    // for Image  upload 
    const [visiblePhotoModal, setVisiblePhotoModal] = useState(false);
    const [allImages, setAllImages] = useState([]);
    const [allImgShow, setallImgShow] = useState([]);
    const [imageLoader, setimageLoader] = useState(false);
    const [imgName, setimgName] = useState("");
    const [imgUri, setimgUri] = useState("");
    const [cameraVisible, setcameraVisible] = useState(false);
    // Image upload end

    const [allFoodData, setAllFoodData] = useState([]);
    const [finalLoader, setfinalLoader] = useState(false);
    const [foodSubLoader, setFoodSubLoader] = useState(false);
    const [foodList, setFoodList] = useState([]);
    const [addLoader, setAddLoader] = useState(false);

    const [foodLoader, setFoodLoader] = useState(false);
    const [otherLoader, setOtherLoader] = useState(false);
    // const [ex]

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const [bikeKm, setBikeKm] = useState("");
    const [bikeKmActive, setbikeKmActive] = useState(false);

    const [odo, setOdo] = useState("");

    const [headerData, setTotalHeaderData] = useState({});




    useEffect(() => {
        getCustomerData()
        _onExpenceCategory()
    }, [])


    const getCustomerData = async () => {
        // setCustomerLoader(true);
    }

    const showHideData = async (data) => {
        ListShowHide(data);
        if (data.check) {
            if (type == "visit") {
                setshowHideLoader(true)
                let reqData = {
                    "limit": "50",
                    "offset": "0",
                    "searchFrom": data.mainDate,
                    "searchTo": data.mainDate,
                    "reportType": "1",
                    "subordinateId": "0",
                    "hierarcyDataIdArr": [{
                        "hierarcyDataId": "",
                        "hierarcyTypeId": ""
                    }


                    ]
                }
                let responseData = await MiddlewareCheck("getAllFieldVisitDataForUser", reqData, props);
                if (responseData === false) {
                }
                else {
                    if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        let visitModiList = visitSubListModifyData(responseData)
                        setVistList(visitModiList.visitListData)
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }
                getAllExpensesCount(data.mainDate, data.mainDate)
                setshowHideLoader(false)

            } else if (type == "foodSection") {
                setFoodSubLoader(true)
                let reqData = {
                    "limit": "10",
                    "offset": (offset * limit).toString(),
                    "expenseTypeId": props.selectedTabData.id,
                    "searchDate": DateConvert.formatYYYYMMDD(data.expenseDate)
                }

                let responseData = await MiddlewareCheck("getFoodExpenseDetails", reqData, props);
                if (responseData === false) {
                }
                else {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        let foodModiList = foodSubListModifyData(responseData.response.finalArray[0])
                        setAllFoodData(foodModiList.foodListData)
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }
                setFoodSubLoader(false)

            }
        }
    }

    const getAllExpensesCount = async (firstDate, lastDate) => {
        // setCountLoader(true)

        let reqData = {
            searchFrom: firstDate,
            searchTo: lastDate,
            // expenseTypeId: selectedItem.id.toString()
        }
        let responseData = await MiddlewareCheck("getAllExpenseCount", reqData, props);
        let totalHeaderData = modHeaderObj(responseData.response)
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setTotalHeaderData(totalHeaderData)
                // this.setState({
                //     expenseHeaderData: totalHeaderData
                // })
            }

            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        // setCountLoader(false)

    }

    const otherButton = (item) => {
        onOtherButtonPress(item)
    }

    const addressButton = (item) => {
        onAddressButtonPress(item)
    }



    const _onExpenceCategory = async () => {
        let reqData = {
            "expenseTypeId": props.selectedTabData.id
        }
        let responseData = await MiddlewareCheck("masterExpenseCategoryTypes", reqData, props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setexpenseCategoryArr(modifyExpenceCategoryArr(responseData.response))
            }
        }
    }


    const expenceTypeSec = () => {
        const _onSelectExpenceType = (value) => {
            setSelectedExpenseCategoryObj(value)
            getFoodTypeDropdown(value.id)
        }
        return (
            <View style={{ flex: 1 }}>
                <DropdownInputBox
                    selectedValue={selectedExpenseCategoryObj.id ? selectedExpenseCategoryObj.id.toString() : "0"}
                    data={expenseCategoryArr}
                    onSelect={(value) => _onSelectExpenceType(value)}
                    headerText={"Expense category"}
                />
            </View>
        )
    }

    const getFoodTypeDropdown = async (value) => {
        setFoodLoader(true)
        let reqData = {
            "expenseTypeId": props.selectedTabData.id,
            "expenseCatagoryId": value
        }
        let responseData = await MiddlewareCheck("masterExpenseSubCategoryTypes", reqData, props);
        if (responseData === false) {
            this._onNetworkError();
        }
        else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setFoodTypeArr(modifyFoodDataData(responseData.response))
            }
        }
        setFoodLoader(false)
    }

    const foodTypeSec = () => {
        const _onSelectFoodType = (value) => {
            setSelectedFoodTypeObj(value);
            onTransportModeDropDown(value.id)
        }
        return (
            <View style={{ flex: 1 }}>
                {foodLoader ?
                    <View style={{ marginTop: 10 }}>
                        <ActivityIndicator size={"small"} color={Color.COLOR.GRAY.LIGHT_GRAY_COLOR} />
                    </View> :
                    <DropdownInputBox
                        selectedValue={selectedFoodTypeObj.id ? selectedFoodTypeObj.id.toString() : ""}
                        data={foodTypeArr}
                        onSelect={(value) => _onSelectFoodType(value)}
                        headerText={"Food Type"}
                    />
                }
            </View>
        )
    }

    const onTransportModeDropDown = async (value) => {
        setOtherLoader(true)
        let reqData = {
            "expenseTypeId": props.selectedTabData.id,
            "expenseCategoryId": selectedExpenseCategoryObj.id,
            "expenseSubCategoryId": value
        }
        let responseData = await MiddlewareCheck("masterExpenseCategoryModes", reqData, props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setexpenseModeArr(modifyArrTransportModeData(responseData.response))
            }
        }
        setOtherLoader(false)
    }

    const transportModeSec = () => {
        const _onSelectTransportModeSelect = (value) => {
            setSelectedExpenseModeObj(value)
        }
        return (
            <View style={{ flex: 1 }}>
                {otherLoader ?
                    <View style={{ marginTop: 10 }}>
                        <ActivityIndicator size={"small"} color={Color.COLOR.GRAY.LIGHT_GRAY_COLOR} />
                    </View> :
                    <DropdownInputBox
                        selectedValue={selectedExpenseModeObj.id ? selectedExpenseModeObj.id.toString() : "0"}
                        data={expenseModeArr}
                        onSelect={(value) => _onSelectTransportModeSelect(value)}
                        headerText={"Other"}

                    />
                }
            </View>
        )
    }


    const costSection = () => {
        const changeCost = (value) => {
            let p = DataConvert.uptoTwoDecimalInput(value)
            setCost(p)

        }
        return (
            <View style={{ flex: 1 }}>
                <TextInputBox
                    placeholder={"Cost"}
                    value={cost}
                    height={45}
                    onChangeText={(value) => changeCost(value)}
                    keyboardType="numeric"
                    isActive={costActive}
                    onFocus={() => {
                        setCostActive(true)
                    }}
                    onBlur={() => {
                        setCostActive(false)
                    }}
                    maxLength={10}
                />
            </View>
        )
    }

    const _onChangeBikeKm = (value, key) => {
        let arr = [...visitList];
        arr[key].odometerCount = DataValidator.inputEntryValidate(value, "number")
        setVistList(arr)
    }

    const commentSection = () => {
        const changeComment = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "name")
            setComment(newText)
        }
        return (
            <View style={{ flex: 1 }}>
                <TextInputBox
                    placeholder={"Comment"}
                    value={comment}
                    height={65}
                    onChangeText={(value) => changeComment(value)}
                    isActive={commentActive}
                    onFocus={() => {
                        setCommentActive(true)
                    }}
                    onBlur={() => {
                        setCommentActive(false)
                    }}
                />
            </View>
        )
    }


    const modalSection = () => {
        //for image picker
        const _onChooseGallery = async () => {
            await _onTakePhoto();
            let uploadData = await FileUpload.uploadImg();
            await _onImageUpload(uploadData);
        }

        // get photo from camera
        const _onChooseCamera = async () => {
            // await this._onTakePhoto();
            // let uploadData = await FileUpload.uploadCameraImg();
            // await _onImageUpload(uploadData);
            // this.setState({ cameraVisible: true });
            setcameraVisible(true)

        }
        return (
            <ImageUploadModal
                isVisible={visiblePhotoModal}
                onGallerySelect={(value) => _onChooseGallery(value)}
                onCameraSelect={(value) => _onChooseCamera(value)}
                onCloseModal={(value) => _onTakePhoto(value)}
            />
        )
    }

    const onSelectPic = async (value) => {
        await _onTakePhoto(false);
        await _onImageUpload(value);
    }

    const _onTakePhoto = async () => {
        setVisiblePhotoModal(!visiblePhotoModal)
    }

    const _onImageUpload = async (uploadData) => {
        setimgName(uploadData.name),
            setimgUri(uploadData.name)
        setimageLoader(true)
        let responseData = await MiddlewareFileCheck("crmImageupload", uploadData, props);
        if (responseData == false) {

        } else {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let data =
                {
                    "images": responseData.response.fileName,
                    "imagePath": uploadData.uri
                }

                allImages.push(data)
                setAllImages(allImages)
                _modifyImgShowingArr(allImages);
                Toaster.ShortCenterToaster(responseData.message)
            } else {
                // Toaster.ShortCenterToaster(responseData.message)
            }
        }
        setimageLoader(false)
    }

    const _modifyImgShowingArr = (data) => {
        setallImgShow(data)
    }

    const _onDelete = (item, key) => {
        let arr = allImages;
        let tempArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].imagePath == item.imagePath) {

            } else {
                tempArr.push(arr[i]);
            }
        }
        setAllImages(tempArr)
        _modifyImgShowingArr(allImages);
    }

    const _onClose = async (item, key) => {
        let arr = allFoodData;
        let tempArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
            } else {
                tempArr.push(arr[i]);
            }
        }
        setAllFoodData(tempArr)

        let reqData = {
            "expenseId": item.expenseId,
        }
        let responseData = await MiddlewareCheck("deleteExpenses", reqData, props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster("Deleted successfully!")
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }


    const _addFood = async () => {
        let addTransport = allFoodData;
        let other = {
            "expenseCategoryId": selectedExpenseCategoryObj.id ? selectedExpenseCategoryObj.id.toString() : "",
            "expenseSubCategoryId": selectedFoodTypeObj.id ? selectedFoodTypeObj.id.toString() : "",
            "startDateTime": DateConvert.formatYYYYMMDD(data.expenseDate),
            "endDatetime": DateConvert.formatYYYYMMDD(data.expenseDate),
            "expenseTypeId": props.selectedTabData.id,
            "expenseCategoryModeId": selectedExpenseModeObj.id ? selectedExpenseModeObj.id.toString() : "",
            "finalAmount": cost,
            "expenseUnitId": "",
            "expenseLocation": "1",
            "expenseValue": "",
            "allBillImage": allImgShow,
            "expenseId": "0",
            "expenseCatagoryName": selectedExpenseCategoryObj.name ? selectedExpenseCategoryObj.name : "",
            "costText": cost ? cost : "",
            "foodType": selectedFoodTypeObj.name ? selectedFoodTypeObj.name : ""
        }

        let validatedData = validateData(other);
        if (validatedData.status) {

            addTransport.push(other);
            // setAllFoodData(addTransport)
            _onSave(addTransport)
        }
    }


    const _onSave = async (addTransport) => {
        if (addTransport.length > 0) {
            let reqData = {
                "fieldVisitId": "0",
                "isProject": "0",
                "description": comment,
                "insertData": modTransportData(addTransport)
            }
            setfinalLoader(true)
            let responseData = await MiddlewareCheck("addExpenses", reqData, props);
            if (responseData === false) {
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message)
                    // addTransport.push(other);
                    onSubmit()
                    _onClearData()
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            setfinalLoader(false)
        } else {
            Toaster.ShortCenterToaster("Please add atleast a Food Expense")
        }

    }

    const _onClearData = () => {
        setSelectedExpenseCategoryObj({});
        setCost("");
        setSelectedFoodTypeObj({});
        setSelectedExpenseModeObj({});
        setAllImages([]);
        setallImgShow([])
    }

    const ImageSec = () => {
        if (cameraVisible) {
            return <CustomCamera isVisible={cameraVisible} onCloseCamera={(value) => setcameraVisible(value)} picData={(value) => onSelectPic(value)} />
        } else {
            return (
                <View style={{ marginTop: 20 }}>
                    <View style={styles.photoSec}>
                        {allImgShow.map((item, key) => (
                            <React.Fragment key={key}>
                                <View style={styles.flexANdMarginView}>
                                    <View style={styles.logisticImageView}>
                                        <ImageBlurLoading source={{ uri: App_uri.IMAGE_VIEW_URI + item.images }} style={styles.TakephotoImg} />
                                        <View style={{ position: 'absolute', right: 0, top: 0, alignItems: 'center', justifyContent: 'center' }}>
                                            <TouchableOpacity style={styles.deleteLogoSec} onPress={() => _onDelete(item, key)} activeOpacity={0.9}>
                                                <Image source={ImageName.WHITE_DELETE_LOGO} style={styles.whiteDeleteLogo} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </React.Fragment>
                        ))}
                    </View>
                    {imageLoader ?
                        <View style={{
                            width: '100%',
                            height: undefined,
                            paddingVertical: 15
                        }}>
                            <ActivityIndicator size="large" color={Color.COLOR.BLUE.VIOLET_BLUE} />
                        </View>
                        :
                        <>
                            <TouchableOpacity style={styles.addImgField} activeOpacity={0.9} onPress={() => _onTakePhoto()}>
                                <View style={styles.addImg}>
                                    <Image source={ImageName.ADD_BILL_IMAGE_LOGO} style={styles.addImgIcon} />
                                </View>
                            </TouchableOpacity>
                        </>

                    }
                </View>
            )
        }
    }

    return (
        <SafeAreaView>
            {modalSection()}
            {customerLoder ?
                <View style={{
                    backgroundColor: "#fff",
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                }}>
                    <NormalLoader />
                </View>
                :
                <React.Fragment>
                    {type == "visit" ?
                        <>
                            <View style={styles.mainView} >
                                <TouchableOpacity onPress={() => showHideData(data)} activeOpacity={1}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.boxView}>
                                            <Text style={styles.textdate}>{data.date.substring(0, 2)}</Text>
                                            <Text style={styles.textDay}>{data.currentDay}</Text>
                                        </View>
                                        <View style={{ marginLeft: '2%', flex: 1 }}>
                                            <Text style={styles.textCount}>{data.totalVisitCount} <Text style={styles.textVisitCount}>Visits Count</Text></Text>
                                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                                <Image source={ImageName.EXPENSE_FOOD_LOGO} style={styles.subViewImage} />
                                                <View style={{ width: 10 }} />
                                                <Image source={ImageName.EXPENSE_OTHER_ICON} style={styles.subViewImage} />
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row' }} >
                                            <Text style={styles.textAmount}>{'\u20B9' + " " + data.totalExpenseAmount}</Text>
                                            <Image source={data.check ? ImageName.UP_ARROW : ImageName.DOWN_ARROW} style={styles.imageDropDown} />
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                {data.check ?
                                    <React.Fragment>
                                        <View style={{ marginTop: 12, borderColor: "#e6e6e6", borderWidth: 0.6 }} />
                                        {showHideLoader ?
                                            <View style={styles.pageLoaderViewStyle}>
                                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                                            </View>
                                            :
                                            <>
                                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                                        <Image source={ImageName.GREEN_ODOMETER} style={styles.imageLogo} />
                                                        <Text style={styles.odometerOtherText}>Odometer: <Text style={styles.textKM}>{headerData.totalOdometerKms == undefined || headerData.totalOdometerKms == null ? 0 : headerData.totalOdometerKms} KM / <Text style={styles.odometrAmount}>{'\u20B9' + "" + headerData.odometerExpenses == undefined || headerData.odometerExpenses == null ? 0 : headerData.odometerExpenses}</Text></Text></Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Image source={ImageName.EXPENSE_OTHER_ICON} style={styles.imageLogo} />
                                                        <Text style={styles.otherExpText}>Other Exp: <Text style={styles.otherAmount}>{'\u20B9' + "" + headerData.totalOtherExpense == undefined || headerData.totalOtherExpense == null ? 0 : headerData.totalOtherExpense}</Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                    <Image source={ImageName.ORDER_BUS_ICON} style={styles.imageLogo} />
                                                    <Text style={styles.odometerOtherText}>Other: <Text style={styles.textKM}>{headerData.totalOtherKilometers == undefined || headerData.totalOtherKilometers == null ? 0 : headerData.totalOtherKilometers} KM</Text></Text>
                                                </View>
                                                <View style={{ marginTop: 12, borderColor: "#e6e6e6", borderWidth: 0.6, marginTop: 25 }} />
                                                <ScrollView showsHorizontalScrollIndicator={false}
                                                    showsVerticalScrollIndicator={false} >
                                                    {visitList && visitList.length > 0 ?
                                                        visitList.map((item, key) => (
                                                            <View style={{ marginTop: 15 }} key={key}>
                                                                <View style={styles.childView} >
                                                                    <View style={{ marginHorizontal: '2%' }}>
                                                                        <View style={styles.rowView}>
                                                                            <Image source={{ uri: item.profilePic }} style={styles.userImage} />
                                                                            <View style={{ flexDirection: 'column', marginLeft: '5%', flex: 1 }}>
                                                                                <Text style={styles.userNameText}>{item.visitto}</Text>
                                                                                <Text style={styles.loactionText}>{item.city}</Text>
                                                                            </View>
                                                                            <View style={{}}>
                                                                                <Text style={styles.rankText}>{item.rank}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={styles.inTextSec}>
                                                                            <Text style={styles.inTimeText}>In Time:<Text style={styles.timeValueText}>{item.visittime}</Text></Text>
                                                                        </View>
                                                                        <View style={styles.flexRow}>
                                                                            <View style={styles.centerView}>
                                                                                <Image source={ImageName.GRAY_LOCATION} style={styles.locationImage} />
                                                                            </View>
                                                                            <View style={styles.blueUnderline} />
                                                                            <View style={styles.centerView}>
                                                                                <Image source={ImageName.EXPENSE_VISIT_ICON} style={styles.locationImage} />
                                                                            </View>
                                                                        </View>
                                                                        <View style={styles.marginTopView}>
                                                                            <TouchableOpacity style={styles.centerView} onPress={() => addressButton(item.startingAddress)}>
                                                                                <Text style={styles.loactionStartEndText}>{item.fromLoc}</Text>
                                                                            </TouchableOpacity>
                                                                            <View style={{ flex: 1 }} />
                                                                            <TouchableOpacity style={styles.centerView} onPress={() => addressButton(item.addressOfVisit)}>
                                                                                <Text style={styles.loactionStartEndText}>{item.toLoc}</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={styles.flexRow}>
                                                                            <Image source={ImageName.GREEN_ODOMETER} style={styles.greenOdometerLogo} />
                                                                            <Text style={styles.bikeText}>Bike</Text>
                                                                            <View style={{ flex: 0.5, marginLeft: '5%', marginTop: 2 }}>
                                                                                <TextInputBox
                                                                                    height={45}
                                                                                    placeholder={"00 KM"}
                                                                                    isVisible={false}
                                                                                    value={item.odometerCount}
                                                                                    keyboardType={"numeric"}
                                                                                    onChangeText={(value) => _onChangeBikeKm(value, key, item)}
                                                                                    maxLength={6}

                                                                                />
                                                                                {/* <TextInput
        
                                                                                        value={odo}
                                                                                        keyboardType={"numeric"}
                                                                                        onChangeText={(value) => _onChangeBikeKm({value:value, key:key})}
                                                                                        placeholder={"sam"}
                                                                                        placeholderTextColor={"red"}
                                                                                        style={{color:"red"}}
                                                                                        
                                                                                    /> */}
                                                                            </View>
                                                                            <View style={{ width: 8 }} />
                                                                            <View style={{ flex: 0.5, marginTop: 5 }}>
                                                                                <BigTextButton
                                                                                    borderRadius={10}
                                                                                    backgroundColor={"#286a94"}
                                                                                    text={"Other"}
                                                                                    isLeftIcon={true}
                                                                                    leftIcon={ImageName.WHITE_PLUS}
                                                                                    leftIconStyle={{ height: 20, width: 20 }}
                                                                                    onPress={() => otherButton(item)}
                                                                                />
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        ))
                                                        : null}
                                                    {/* {} */}
                                                    <View style={{ marginBottom: "10%" }} />
                                                </ScrollView>
                                            </>
                                        }

                                    </React.Fragment>
                                    :
                                    null
                                }

                            </View>
                        </>
                        :
                        null

                    }
                    {
                        type == "odometer" ?
                            <>
                                <View style={styles.mainView}>
                                    <TouchableOpacity activeOpacity={1} onPress={() => showHideData(data)} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={styles.boxView}>
                                                <Text style={styles.textdate}>{DateConvert.viewDateFormat(data.inTime).substring(0, 2)}</Text>
                                                <Text style={styles.textDay}>{data.currentDay}</Text>
                                            </View>
                                            <View style={{ marginLeft: '2%', flex: 1 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={ImageName.GREEN_ODOMETER} style={{ height: 13, width: 13, resizeMode: 'contain', marginTop: 2 }} />
                                                    <View style={{ width: 4 }} />
                                                    <Text style={styles.textOdometer}>Odometer</Text>
                                                    <Text style={styles.textOdometerKM}>{data.distanceTravelled + " " + "KM"}</Text>
                                                </View>
                                                {/* <View style={{ marginTop: 5, flexDirection: 'row' }}>
                                                    <Text style={styles.textCount}>10</Text>
                                                    <Text style={styles.textVisitCount}>Visit Count</Text>
                                                </View> */}
                                            </View>
                                            <View style={{}} />
                                            <Text style={styles.odometerTextAmount}>{'\u20B9' + " " + data.totalExpenseAmount}</Text>
                                            <Image source={data.check ? ImageName.UP_ARROW : ImageName.DOWN_ARROW} style={styles.imageDropDown} />
                                        </View>
                                    </TouchableOpacity>
                                    {data.check ?
                                        <React.Fragment>
                                            <View style={{ marginTop: 10, borderColor: "#000", borderWidth: 0.6 }} />
                                            <View style={{ marginTop: 15, marginHorizontal: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={ImageName.ROAD_TRANSPORT_LOGO} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
                                            </View>
                                            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                                <View style={{ height: 10, width: 10, backgroundColor: '#156A94', borderRadius: 100, top: -4 }} />
                                                <View style={styles.blueUnderline} />
                                                <View style={{ height: 10, width: 10, backgroundColor: '#156A94', borderRadius: 100, top: -4 }} />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: '#22253A', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>{data.distanceTravelled + " " + "KM"}</Text>
                                                {/* <Text style={{ color: '#EF5C5C', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>{'\u20B9' + "" + 210}</Text> */}
                                            </View>
                                            <View style={{ marginTop: 15, flexDirection: "row", marginHorizontal: '2%' }}>
                                                <View style={{ paddingVertical: "5%", backgroundColor: '#CCCDD2', borderRadius: 12 }}>
                                                    <View style={{ marginHorizontal: '2%', justifyContent: 'center', alignItems: 'center' }}>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                            <ImageBlurLoading source={{ uri: App_uri.SFA_IMAGE_URI + data.inTimePic }} style={{ height: 110, width: 120, resizeMode: 'cover', borderRadius: 14 }} />
                                                        </View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Image source={ImageName.GREEN_CLOCK_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                                            <View style={{ marginLeft: '5%' }}>
                                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Start: <Text style={{ color: '#156A94', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.LIGHT, marginLeft: '5%' }}>{DateConvert.viewTimeFormat(data.inTime)}</Text></Text>
                                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>{data.inMeter + " " + "KM"}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: FontSize.SM }}>To</Text>
                                                </View>
                                                <View style={{ paddingVertical: "5%", backgroundColor: '#CCCDD2', borderRadius: 12 }}>
                                                    <View style={{ marginHorizontal: '2%', justifyContent: 'center', alignItems: 'center' }}>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                            <ImageBlurLoading source={{ uri: App_uri.SFA_IMAGE_URI + data.outTimePic }} style={{ height: 110, width: 120, resizeMode: 'cover', borderRadius: 14 }} />
                                                        </View>
                                                        {/* <Image source={ImageName.METER_LOGO} style={{ height: 110, width: 120, resizeMode: 'cover', borderRadius: 14 }} /> */}
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Image source={ImageName.RED_CLOCK_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                                            <View style={{ marginLeft: '5%' }}>
                                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>End: <Text style={{ color: '#156A94', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.LIGHT, marginLeft: '5%' }}>{DateConvert.viewTimeFormat(data.outTime)}</Text></Text>
                                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>{data.outMeter + " " + "KM"}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 15, flexDirection: "row", marginHorizontal: '2%' }}>
                                                <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>Start Address</Text>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: '1%' }}>{data.inTimeAddress}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>End Address:</Text>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: '1%' }}>{data.outTmeAddress}</Text>
                                                </View>
                                            </View>
                                            <View style={{ marginBottom: 20 }} />
                                        </React.Fragment> :
                                        null
                                    }
                                </View>
                            </> :
                            null
                    }

                    {type == "foodSection" ?
                        <View style={[styles.mainView, { backgroundColor: "#fff" }]}>
                            <TouchableOpacity activeOpacity={1} onPress={() => showHideData(data)} >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.boxView}>
                                        <Text style={styles.textdate}>{data.expenseDate.substring(8)}</Text>
                                        <Text style={styles.textDay}>{data.currentDay}</Text>
                                    </View>
                                    <View style={{ marginLeft: '2%', flex: 1 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={ImageName.EXPENSE_FOOD_ICON} style={{ height: 13, width: 13, resizeMode: 'contain', marginTop: 2 }} />
                                            {/* <View style={{ width: 4 }} />
                                            <Text style={styles.textOdometer}>Daily Allowance </Text>
                                            <Text style={styles.textOdometerKM}>{'\u20B9' + 0}</Text> */}
                                        </View>
                                        {/* <View style={{ marginTop: 5, flexDirection: 'row' }}>
                                            <Text style={styles.textCount}>3</Text>
                                            <Text style={styles.textVisitCount}>More Bill Added</Text>
                                        </View> */}
                                    </View>
                                    <View style={{ flexDirection: 'row' }} >
                                        <Text style={styles.foodTextAmount}>{'\u20B9' + " " + data.totalExpenseAmount}</Text>
                                        <Image source={data.check ? ImageName.UP_ARROW : ImageName.DOWN_ARROW} style={styles.imageDropDown} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {data.check ?
                                <>
                                    <View style={{ marginTop: 10, borderColor: "#A3A6AF", borderWidth: 0.5 }} />
                                    <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 10 }}>
                                        <Text style={styles.foodExpenseTitle}>Add Another Food Expenses</Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        {expenceTypeSec()}
                                    </View>
                                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                        {foodTypeSec()}
                                        <View style={{ width: 8 }} />
                                        {transportModeSec()}
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        {costSection()}
                                    </View>
                                    {ImageSec()}
                                    <View style={{ marginTop: 15 }}>
                                        {foodSubLoader == true ?
                                            <View style={styles.pageLoaderViewStyle}>
                                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                                            </View> :
                                            <>
                                                {allFoodData.map((item, key) => (
                                                    <React.Fragment key={key}>
                                                        <View style={{ padding: 5, borderTopWidth: 0.3, borderTopColor: '#000', borderBottomColor: '#000', borderBottomWidth: 0.8, backgroundColor: '#F2F0F0', marginTop: 10, paddingVertical: 10 }}>
                                                            <View style={{ flexDirection: 'row', marginHorizontal: '2%', marginBottom: 5 }}>
                                                                <Image source={ImageName.EXPENSE_FOOD_LOGO} style={{ height: 18, width: 18, resizeMode: 'contain', marginTop: 4 }} />
                                                                {/* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '5%' }}>{item.expenseCatagoryName}</Text> */}
                                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '5%' }}>{item.foodType}</Text>
                                                                <Text style={{ color: "#EF5C5C", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '5%', flex: 1 }}>{'\u20B9' + "" + item.costText}</Text>
                                                                <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => _onClose(item, key)} activeOpacity={0.9}>
                                                                    <Image source={ImageName.RED_DELETE_OUTLINE} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 1 }} />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={styles.photoSec}>
                                                                {item.allBillImage.map((item1, key1) => (
                                                                    <React.Fragment key={key1}>
                                                                        <View style={styles.flexANdMarginView}>
                                                                            <View style={styles.logisticImageView}>
                                                                                <ImageBlurLoading source={{ uri: App_uri.IMAGE_VIEW_URI + item1.images }} style={styles.TakephotoImg} />
                                                                                <View style={{ position: 'absolute', right: 0, top: 0, alignItems: 'center', justifyContent: 'center' }}>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </React.Fragment>
                                                                ))}
                                                            </View>
                                                        </View>
                                                    </React.Fragment>
                                                ))}
                                            </>
                                        }
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        {commentSection()}
                                        {finalLoader == true ?
                                            <View style={{ marginTop: 15, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <ActivityIndicator size="large" color={"#156A94"} />
                                            </View> :
                                            <View style={{ marginTop: 25, flexDirection: 'row', marginHorizontal: '10%' }}>
                                                {/* <BigTextButton
                                                    backgroundColor={"#156A94"}
                                                    onPress={() => _onSave()}
                                                    text={"Save"}
                                                />
                                                <View style={{ width: 10 }} /> */}
                                                <BigTextButton
                                                    isLeftIcon={true}
                                                    leftIcon={ImageName.ADD_ICON}
                                                    backgroundColor={"#156A94"}
                                                    onPress={() => _addFood()}
                                                    text={"Add"}
                                                />
                                            </View>
                                        }
                                    </View>
                                </> :
                                null
                            }
                        </View>
                        : null
                    }
                </React.Fragment >
            }
        </SafeAreaView >
    );

}

AllPageList.defaultProps = {
    isHidden: false,
    data: {},
    ListShowHide: () => { },
    type: "",
    onOtherButtonPress: () => { },
    onAddressButtonPress: () => { },
    onChoosePhoto: () => { },
    onSubmit: () => { }

};

AllPageList.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    ListShowHide: PropTypes.func,
    type: PropTypes.string,
    onOtherButtonPress: PropTypes.func,
    onAddressButtonPress: PropTypes.func,
    onChoosePhoto: PropTypes.func,
    onSubmit: PropTypes.func
};


export default AllPageList;