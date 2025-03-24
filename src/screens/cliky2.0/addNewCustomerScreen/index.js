import React from "react";
import {
    Image,
    SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator
} from "react-native";
import { stateCheckForNetwork } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { DynamicLocationMapping } from "../../../pageShared";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, CheckBox, CustomCamera, DropdownInputBox, ImageUploadModal, TextInputBox } from "../../../shared";
import { ScrollView } from "react-native-gesture-handler";
import { DateConvert, FileUpload, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { MiddlewareCheck, MiddlewareFileCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { App_uri } from "../../../services/config";
import { modifyConversionLanding, modifyCustomerTypeArr, modifyLocationMappedData, modifyPartnerData, validateData } from "./function";
import { DataValidator } from "../../../validators";
class AddNewCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 20,
            pageNum: 0,
            totalDataCount: 0,
            profileImg: "",
            profileRaw: "",
            visibleProfileImgUploadModal: false,
            customerName: "",
            customerNameActive: false,
            customerLastName: "",
            customerLastNameActive: false,
            businessName: "",
            businessNameActive: false,
            customerTypeArr: [],
            phone: "",
            phoneActive: false,
            selectedCustomerTypeObj: {},
            tradeNo: "",
            tradeNoActive: false,
            gstNo: "",
            gstNoActive: false,
            productArr: [],
            selectedProductObj: {},
            approxOrderValue: "",
            approxOrderValueActive: false,
            shopName: "",
            shopNameActive: false,
            stateArr: [],
            selectedStateObj: {},
            districtArr: [],
            selectedDistrictObj: {},
            zoneArr: [],
            selectedZoneObj: {},
            pincode: "",
            pincodeActive: false,
            address: "",
            addressActive: false,
            deliveryPartnerArr: [],
            selectedDeliveryPartnerObj: {},
            cameraVisible: false,
            cameraLoader: false,
            stateLoader: false,
            distLoader: false,
            zoneLoader: false,
            brandLoader: false,
            customerTypeLoader: false,
            addLoader: false,
            deliveryPartnerLoader: false,
            checkPhoneLoader: false,
            isPhoneExists: false,
            isApiCall: true,

            // locationObj: {},
            locationObj: [],
            locationArr: [],
            assigningType: false,
            pageLoader: false,
            locationLoader: false,
            locationName: "",
            custAccessType: "0",
        };
    }

    componentDidMount = async () => {
        await this._load();
        await this._getHierarchyTypesSlNo();
        await this._getProductHierarchyTypesSlNo();

    }

    _load = async () => {
        this.setState({ pageLoader: true });
        await this.getCustomerType(this.state.assigningType)
        await this.getBrandData()
        await this.getPartnerData(this.state.assigningType)
        this.setState({ pageLoader: false });

    };

    _onBack = () => {
        this.props.navigation.goBack();
    };

    // for get the get Hierarchy Types With Sl No for country
    _getHierarchyTypesSlNo = async () => {
        this.setState({ locationLoader: true })
        if ((await StorageDataModification.locationMappedData({}, "get")) === null) {
            let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "1" });
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    await StorageDataModification.locationMappedData(modifyLocationMappedData(responseData.response, this.props.Sales360Redux.countryMappedUserArr), "store");
                } else {
                    // this.setState({ alertMessage: responseData.message });
                }
            }
        }
        this.setState({ locationLoader: false })

        return true;
    }

    // for get the get Hierarchy Types With Sl No for Products
    _getProductHierarchyTypesSlNo = async () => {
        this.setState({ locationLoader: true })
        let mappedProductData = await StorageDataModification.mappedProductData({}, "get")

        if ((await StorageDataModification.locationMappedDataProduct({}, "get")) === null) {
        let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "2" });
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await StorageDataModification.locationMappedDataProduct(modifyLocationMappedData(responseData.response, mappedProductData), "store");
            } else {
                // this.setState({ alertMessage: responseData.message });
            }
        }
        }
        this.setState({ locationLoader: false })
        return true;
    }

    //get brand data

    getBrandData = async () => {
        this.setState({ brandLoader: true })
        let responseData = await MiddlewareCheck("conversionAllLanding", {}, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedData = await modifyConversionLanding(responseData.data);
                this.state.productArr = modifiedData.brandingList;
                this.setState({
                    productArr: this.state.productArr,
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ brandLoader: false })
    }

    // fpr get customer type
    getCustomerType = async (assigningType) => {
        this.setState({ customerTypeLoader: true })
        let reqData = { isProject: "0" };
        let responseData = await MiddlewareCheck("getContactTypes_v2", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    customerTypeArr: modifyCustomerTypeArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ customerTypeLoader: false })
    }

    getPartnerData = async (assigningType) => {
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "hierarchyDataIdArr": [],
            "searchTextCustName": "",
            "searchTextCustType": "",
            "searchTextCustPhone": "",
            "searchTextCustBusinessName": "",
            "searchCustPartyCode": "",
            "searchCustVisitDate": "",
            "customerAccessType": "1",
            "searchFrom": "",
            "searchTo": "",
            "status": "",
            "contactType": "",
            "phoneNo": "",
            "isProject": assigningType == false ? "1" : "0",
            "contactTypeId": this.state.selectedContactTypeId ? this.state.selectedContactTypeId : "",
            "isDownload": "0",
            "approvalList": "0",
        }

        this.setState({ deliveryPartnerLoader: true })
        let responseData = await MiddlewareCheck("registrationList", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let partnerData = modifyPartnerData(responseData).list
                if (partnerData.length == 0) {
                    this.state.isApiCall = false;
                }
                this.state.deliveryPartnerArr = [...this.state.deliveryPartnerArr, ...partnerData];
                this.state.totalDataCount = modifyPartnerData(responseData).totalCount;
                this.setState(this.state);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ deliveryPartnerLoader: false })
    }


    _onHeaderSec = () => {
        return (
            <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                <View style={{ marginTop: 8, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, }}>Add New Customer</Text>

                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 3 }} />
                </View>
            </View>
        )
    }

    // for profile image upload visible
    _onProfilePicModalVisible = async () => {
        this.setState({
            visibleProfileImgUploadModal: !this.state.visibleProfileImgUploadModal
        })
    }

    _imageUploadModalSection = () => {
        const OnChooseGallery = async () => {
            this._onProfilePicModalVisible()
            let uploadData = await FileUpload.uploadImg();
            await this.ImageUploadApiCall(uploadData);
        }
        const OnChooseCamera = async () => {
            this.setState({ cameraVisible: true });
        }

        return (
            <ImageUploadModal
                isVisible={this.state.visibleProfileImgUploadModal}
                onGallerySelect={(value) => OnChooseGallery(value)}
                onCameraSelect={(value) => OnChooseCamera(value)}
                onCloseModal={(value) => this._onProfilePicModalVisible(value)}
            />
        )
    }
    ImageUploadApiCall = async (uploadData) => {
        this.setState({ cameraLoader: true })
        let imgData = await MiddlewareFileCheck("crmImageupload", uploadData, this.props);
        if (imgData) {
            if (imgData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.profileImg = imgData.response.fileName;
                this.state.profileRaw = uploadData.uri;
                this.setState({
                    profileImg: this.state.profileImg,
                    profileRaw: this.state.profileRaw
                })
            }
        }
        this.setState({ cameraLoader: false })
    }

    // for custom camera open
    onSelectPic = async (value) => {
        await this._onProfilePicModalVisible(false);
        await this.ImageUploadApiCall(value);
    }

    uploadImgSec = () => {
        return (
            <View style={{ marginTop: 30, justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity style={styles.blueCircle} activeOpacity={0.9} onPress={() => this._onProfilePicModalVisible()}>
                    {this.state.cameraLoader ?
                        <ActivityIndicator size="small" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                        :
                        <>
                            {this.state.profileImg.length > 0 ?
                                <Image source={{ uri: App_uri.IMAGE_URI + this.state.profileImg }} style={styles.profileImg} />
                                :
                                <>
                                    <Image source={ImageName.CAMERA_LOGO} style={styles.cameraImg} />
                                    <Text style={styles.uploadLabelTxt}>Upload Image</Text>
                                </>
                            }
                        </>
                    }
                </TouchableOpacity>
            </View>
        )
    }

    customerNameSec = () => {
        const _onChange = (value) => {
            let t = DataValidator.checkFirstIndexWhiteSpace(value)
            this.setState({
                customerName: t
            })
        }
        return (
            <TextInputBox
                placeholder={"First Name*"}
                value={this.state.customerName}
                borderRadius={25}
                height={50}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.customerNameActive}
                onFocus={() => { this.setState({ customerNameActive: true }) }}
                onBlur={() => { this.setState({ customerNameActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
            />
        )
    }

    customerLastNameSec = () => {
        const _onChange = (value) => {
            let t = DataValidator.checkFirstIndexWhiteSpace(value)
            this.setState({
                customerLastName: t
            })
        }
        return (
            <TextInputBox
                placeholder={"Last Name*"}
                value={this.state.customerLastName}
                borderRadius={25}
                height={50}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.customerLastNameActive}
                onFocus={() => { this.setState({ customerLastNameActive: true }) }}
                onBlur={() => { this.setState({ customerLastNameActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
            />
        )
    }

    businessNameSec = () => {
        const _onChange = (value) => {
            let t = DataValidator.checkFirstIndexWhiteSpace(value);
            this.setState({
                businessName: t
            })
        }
        return (
            <TextInputBox
                placeholder={"Business Name"}
                value={this.state.businessName}
                borderRadius={25}
                height={50}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.businessNameActive}
                onFocus={() => { this.setState({ businessNameActive: true }) }}
                onBlur={() => { this.setState({ businessNameActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
            />
        )
    }
    customerTypeSec = () => {
        const _onChange = (value) => {
            this.setState({
                selectedCustomerTypeObj: value,
                custAccessType: value.customerAccessType
            })
        }
        return (
            <DropdownInputBox
                selectedValue={this.state.selectedCustomerTypeObj.id ? this.state.selectedCustomerTypeObj.id.toString() : "0"}
                data={this.state.customerTypeArr}
                borderRadius={25}
                onSelect={(value) => _onChange(value)}
                headerText={"Customer Type*"}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                selectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                backgroundColor={"#F0F4F7"}
                isBackButtonPressRequired={true}
                isBackdropPressRequired={true}
                isSearchable={true}
            />
        )
    }

    checkMobileNoExistOrNot = async (txt) => {
        let reqData = {
            "phoneNumber": txt,
            "isProject": "0"
        }
        this.setState({ checkPhoneLoader: true })
        let responseData = await MiddlewareCheck("phoneNumberExist_customer", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message)
                this.setState({ isPhoneExists: true })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
                this.setState({ isPhoneExists: false })
                // this.clearExistsData()
            }
        }
        this.setState({ checkPhoneLoader: false })
    }

    phoneSec = () => {
        const _onChange = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "number")
            this.setState({
                phone: newText
            })
            if (newText.length > 9) {
                this.checkMobileNoExistOrNot(newText);
            }
        }
        return (

            <TextInputBox
                placeholder={"Phone*"}
                value={this.state.phone}
                borderRadius={25}
                height={50}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.phoneActive}
                onFocus={() => { this.setState({ phoneActive: true }) }}
                onBlur={() => { this.setState({ phoneActive: false }) }}
                maxLength={10}
                keyboardType={"number-pad"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                isActivityLoader={this.state.checkPhoneLoader ? true : false}
                activityLoaderColor={Color.COLOR.BLUE.CYAN_BLUE_AZURE}
                activityLoaderSize={"small"}
            />
        )
    }
    targetLicenseSec = () => {
        const _onChange = (value) => {
            let t = DataValidator.checkFirstIndexWhiteSpace(value);
            this.setState({
                tradeNo: t
            })
        }
        return (
            <TextInputBox
                placeholder={"Trade License No."}
                value={this.state.tradeNo}
                borderRadius={25}
                height={50}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.tradeNoActive}
                onFocus={() => { this.setState({ tradeNoActive: true }) }}
                onBlur={() => { this.setState({ tradeNoActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
            />
        )
    }
    gstSec = () => {
        const _onChange = (value) => {
            let t = DataValidator.checkFirstIndexWhiteSpace(value);
            this.setState({
                gstNo: t
            })
        }
        return (
            <TextInputBox
                placeholder={"GST No."}
                value={this.state.gstNo}
                borderRadius={25}
                height={50}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.gstNoActive}
                onFocus={() => { this.setState({ gstNoActive: true }) }}
                onBlur={() => { this.setState({ gstNoActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
            />
        )
    }

    pincodeSec = () => {
        const _onChange = (value) => {
            let newText = DataValidator.inputEntryValidate(value, "number");
            let t = DataValidator.checkFirstIndexWhiteSpace(newText);
            this.setState({
                pincode: t
            })
        }
        return (
            <TextInputBox
                placeholder={"Pincode"}
                value={this.state.pincode}
                borderRadius={25}
                height={50}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.pincodeActive}
                onFocus={() => { this.setState({ pincodeActive: true }) }}
                onBlur={() => { this.setState({ pincodeActive: false }) }}
                maxLength={6}
                keyboardType={"number-pad"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}

            />
        )
    }

    addressSec = () => {
        const _onChange = (value) => {
            let t = DataValidator.checkFirstIndexWhiteSpace(value);
            this.setState({
                address: t
            })
        }
        return (
            <TextInputBox
                placeholder={"Detail Address"}
                value={this.state.address}
                borderRadius={25}
                height={90}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.addressActive}
                onFocus={() => { this.setState({ addressActive: true }) }}
                onBlur={() => { this.setState({ addressActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
            />
        )
    }

    geoLocationSec = () => {
        return (
            <>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 15 }}>
                    <Image source={ImageName.ORDER_CUSOMER_LOCATION_IMG} style={styles.locationImg} />
                    <Text style={styles.locationTxt}>Fetch Geo Location of the shop</Text>
                    <View style={{ flex: 1 }} />
                    <Image source={ImageName.BLUE_GOOGLE_MAP_ICON} style={styles.deliveryImg} />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 15 }}>
                    <Image source={ImageName.DELIVERY_PARTNER_ICON} style={styles.locationImg} />
                    <Text style={styles.locationTxt}>Mapped with Delivery Partner</Text>
                </View>
            </>

        )
    }

    deliveryPartnerSec = () => {
        const _onChange = (value) => {
            this.setState({
                selectedDeliveryPartnerObj: value
            })
        }

        const fetchMore = async () => {
            if (this.state.deliveryPartnerLoader) {
                return null;
            }
            this.setState(
                (prevState) => {
                    return { deliveryPartnerLoader: true, pageNum: prevState.pageNum + 1 };
                },
                () => {
                    if (this.state.isApiCall) {
                        this.getPartnerData();
                    } else {
                        this.setState({ deliveryPartnerLoader: false })
                        return null;
                    }
                }
            );
        };
        return (
            <View style={{ marginHorizontal: 15 }}>
                <DropdownInputBox
                    selectedValue={this.state.selectedDeliveryPartnerObj.id ? this.state.selectedDeliveryPartnerObj.id.toString() : "0"}
                    data={this.state.deliveryPartnerArr}
                    borderRadius={18}
                    onSelect={(value) => _onChange(value)}
                    headerText={"Select Delivery Partner of the location"}
                    fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                    selectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                    unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                    backgroundColor={"#F0F4F7"}
                    isSearchable={true}
                    fetchMore={() => fetchMore()}
                    endReachedLoader={this.state.deliveryPartnerLoader}
                />
            </View>

        )
    }

    // for check and umcheck the value
    _onCheckType = async (value) => {
        this.state.assigningType = value;
        this.state.selectedCustomerTypeObj = {};

        this.setState({
            assigningType: this.state.assigningType,
            selectedCustomerTypeObj: this.state.selectedCustomerTypeObj
        })
        this.getCustomerType(value)
        this.getPartnerData(value)
    }


    checkboxSec = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <CheckBox
                        type={"singleSelectBox"}
                        borderRadius={40}
                        data={!this.state.assigningType}
                        onClickValue={() => this._onCheckType(true)}
                    />
                    <Text style={styles.selectionText}>Retail</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <CheckBox
                        type={"singleSelectBox"}
                        borderRadius={40}
                        data={this.state.assigningType}
                        onClickValue={() => this._onCheckType(false)}
                    />
                    <Text style={styles.selectionText}>Project</Text>
                </View>
            </View>
        )
    }

    addNewSec = () => {
        return (
            <View style={{ marginHorizontal: 15 }}>
                <View style={styles.underline} />
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Text style={styles.locationTxt}>If the customer belongs any {'\n'} other Location</Text>
                    <View style={{ flex: 1 }} />
                    <View style={{ width: 130 }}>
                        <BigTextButton
                            text={"Add New Shop"}
                            backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                            fontSize={12}
                            fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                            borderRadius={25}
                        />
                    </View>
                </View>
                <View style={styles.underline} />
            </View>
        )
    }

    buttonSec = () => {
        const onReset = async () => {
            this.state.locationArr = [],
                this.state.locationObj = {},
                this.state.locationObj.hierarchyDataId = ""
            this.setState({
                profileImg: "",
                selectedCustomerTypeObj: {},
                businessName: "",
                customerName: "",
                customerLastName: "",
                phone: "",
                address: "",
                pincode: "",
                selectedStateObj: "",
                selectedDistrictObj: "",
                selectedZoneObj: "",
                approxOrderValue: "",
                selectedProductObj: {},
                tradeNo: "",
                gstNo: "",
                selectedDeliveryPartnerObj: {},
                locationArr: this.state.locationArr,
                locationObj: this.state.locationObj
            })
            await this._load()
        }

        const onSubmit = async () => {
            let reqData = {
                "sourceType": "",
                "contactType": "",
                "profilePic": this.state.profileImg ? this.state.profileImg : "",
                "visitDate": "",
                "customerTypeId": this.state.selectedCustomerTypeObj.id ? this.state.selectedCustomerTypeObj.id : "",
                "custBusinessName": this.state.businessName ? this.state.businessName : "",
                "firstName": this.state.customerName ? this.state.customerName : "",
                "lastName": this.state.customerLastName ? this.state.customerLastName : "",
                "gender": "",
                "dob": "",
                "title": "",
                "customerDescription": "",
                "erpCode": "",
                "phoneNumber": [this.state.phone],
                "phone": this.state.phone,
                "email": [],
                "custAddress": this.state.address ? this.state.address : "",
                "residentAddress": "",
                "geoLocation": "",
                "landmark": "",
                "pinCode": this.state.pincode ? this.state.pincode : "",
                "yearOfEstd": "",
                "godownCapacity": "",
                "godownLocation": "",
                "advanced": "",
                "appliedCreditLimit": "",
                "partyCrLimit": this.state.approxOrderValue,
                "primaryItemId": this.state.selectedProductObj.id ? this.state.selectedProductObj.id : "",
                "firsmStatus": "",
                "tradeLicenceDoc": this.state.tradeNo,
                "GSTcertificateDoc": this.state.gstNo,
                "panCardDoc": "",
                "aadharCardDoc": "",
                "cancelChequeDoc": "",
                "custDocArray": [],
                "createdAt": DateConvert.fullDateFormat(new Date()),
                "isProject": "0",
                "primaryCustomer": "0",
                "hierarchyDataId": this.state.locationObj.length > 0 ? this.state.locationObj[0].hierarchyDataId : "",
                "hierarchyTypeId": this.state.locationObj.length > 0 ? this.state.locationObj[0].hierarchyTypeId : "",
                // "locationData": [{ "hierarchyDataId": this.state.locationObj.hierarchyDataId, "hierarchyTypeId": this.state.locationObj.hierarchyTypeId }],
                "locationData": this.state.locationObj,
                "locationName": this.state.locationName,
                // "customerAccessType":"Secondary"
            }
            let validatedData = validateData(reqData);
            if (validatedData.status) {
                this.setState(({ addLoader: true }))
                let responseData = await MiddlewareCheck("addNewRegCustomer", reqData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        let propData = {
                            ...reqData,
                            id: responseData.response.customerId,
                            locationData: this.state.locationObj
                        }
                        Toaster.ShortCenterToaster(responseData.message)
                        this.props.navigation.replace("OrderProductList", { data: propData, screenName: "OrderModule", custAccessType: this.state.custAccessType });
                        this.props.route.params.onPageRefresh()
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }
                this.setState(({ addLoader: false }))
            }
        }

        return (
            <View style={{ flexDirection: "row", marginHorizontal: 15, marginTop: 10 }}>
                {this.state.addLoader ?
                    <View style={{ width: Dimension.width - 60, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                    </View>
                    :
                    <>
                        <View style={{ flex: 1 }} />
                        <View style={{ width: 80 }}>
                            {this.state.checkPhoneLoader ?
                                <ActivityIndicator color={Color.COLOR.BLUE.DARK_BLUE} />
                                :
                                <>
                                    {this.state.isPhoneExists ? null :
                                        <BigTextButton
                                            text={"Submit"}
                                            fontSize={12}
                                            fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                                            borderRadius={25}
                                            onPress={() => onSubmit()}
                                        />
                                    }
                                </>
                            }
                        </View>
                    </>
                }
            </View>
        )
    }

    onSelectLocationData = (val) => {
        this.state.locationArr = val.totalData;
        this.state.locationObj = val.value;
        this.setState({ locationArr: this.state.locationArr, locationObj: this.state.locationObj, locationName: val.name })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.cameraVisible ?
                    <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
                    :
                    null
                }
                {this._onHeaderSec()}
                {this._imageUploadModalSection()}
                {this.state.pageLoader ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <ActivityIndicator size={"large"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                    </View> :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ marginHorizontal: 15, justifyContent: "center" }}>
                            {this.uploadImgSec()}
                            <View style={{ marginTop: 20 }} />
                            {this.customerNameSec()}
                            <View style={{ marginTop: 20 }} />
                            {this.customerLastNameSec()}
                            <View style={{ marginTop: 20 }} />
                            {this.businessNameSec()}
                            <View style={{ marginTop: 20 }} />
                            {this.checkboxSec()}
                            <View style={{ marginTop: 20 }} />
                            {this.customerTypeSec()}
                            <View style={{ marginTop: 20 }} />
                            {this.phoneSec()}
                            <View style={{ marginTop: 20 }} />
                            <Text style={styles.headTxt}>Statutory Information</Text>
                            <View style={{ marginTop: 20 }} />
                            {this.targetLicenseSec()}
                            <View style={{ marginTop: 20 }} />
                            {this.gstSec()}
                            <View style={{ marginTop: 20 }} />
                            <Text style={styles.headTxt}>Shop Address</Text>
                            <View style={{ marginTop: 20 }}>
                                {this.state.locationLoader ?
                                    null :
                                    // <DynamicLocationMapping
                                    //     viewType={"add"}
                                    //     isLabelVisible={false}
                                    //     onApiCallData={(value) => this.onSelectLocationData(value)} />
                                    <DynamicLocationMapping
                                        type={"lastHierarcyField"}
                                        marginBottom={5}
                                        flexDirection={"column"}
                                        viewType={"add"}
                                        isLabelVisible={false}
                                        onApiCallData={(value) => this.onSelectLocationData(value)} />
                                }
                            </View>
                            <View style={{ marginTop: 20 }} />
                            {this.pincodeSec()}
                            <View style={{ marginTop: 20 }} />
                            {this.addressSec()}
                            <View style={{ marginTop: 20 }} />
                        </View>
                        {this.geoLocationSec()}
                        <View style={{ marginTop: 20 }} />
                        {this.deliveryPartnerSec()}
                        {/* <View style={{ marginTop: 20 }} />
                        {this.addNewSec()} */}
                        <View style={{ marginTop: 20 }} />
                        {this.buttonSec()}
                        <View style={{ height: 120 }} />
                    </ScrollView>
                }
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCustomer);
