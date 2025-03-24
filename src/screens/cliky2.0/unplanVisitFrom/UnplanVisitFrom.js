import React from "react";
import { SafeAreaView, Image, View, ScrollView, Text, TouchableOpacity, Linking, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userSelectedBeatRouteData } from "../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { BigTextButton, BottomModal, CheckBox, CustomCamera, DropdownInputBox, ImageUploadModal, TextInputBox } from "../../../shared";
import SvgComponent from "../../../assets/svg";
import { BravoModal, ChangeRouteModal, DynamicLocationMapping, VisitModal } from "../../../pageShared";
import Header from "../header/Header";
import { DataValidator } from "../../../validators";
import { MiddlewareCheck, MiddlewareFileCheck, StoreUserOtherInformations } from "../../../services/middleware";
import { DateConvert, FileUpload, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { modCustDocArr, modDocTypeData, modDynamicFieldArr, modifyCustomerTypeArr, modifyLocationMappedData, modifySubordinateArr, modifyUnitArr, modifyVisitorTypeArr, validateData, validateInfluencerData } from "./Function";
import { ErrorCode } from "../../../services/constant";
import { App_uri } from "../../../services/config";
import DatePicker from "react-native-date-picker";
import { ClientSettings } from "../../../services/userPermissions";


// const ar = [
//     {
//         "docTypeId": 109,
//         "documentTypeName": "GST Document",
//         "docCode": "GSTN",
//         "createdAt": "2023-12-14T14:08:48.000Z",
//         "isMandatory": 1,
//         "contactTypeId": 0,
//         "contactTypeName": ""
//     },
//     {
//         "docTypeId": 110,
//         "documentTypeName": "Pan Card",
//         "docCode": "PAN",
//         "createdAt": "2023-12-14T14:09:03.000Z",
//         "isMandatory": 1,
//         "contactTypeId": 0,
//         "contactTypeName": ""
//     },
//     {
//         "docTypeId": 111,
//         "documentTypeName": "Aadhaar Card",
//         "docCode": "AD",
//         "createdAt": "2024-06-19T13:09:10.000Z",
//         "isMandatory": 0,
//         "contactTypeId": 0,
//         "contactTypeName": ""
//     },
// ]

// for unplan visit page 
class UnplanVisitFrom extends React.Component {
    constructor(props) {
        super(props);
        this.scrollViewRef = React.createRef();
        this.state = {
            customerType: [],
            customerTypeObj: {},

            checkPhoneLoader: false,
            isPhoneExists: false,
            isRetailOrProject: true,
            visibleProfileImgUploadModal: false,
            profileImgLoader: false,
            cameraVisible: false,
            bravoModalVisiable: false,
            locationLoader: false,

            pageLoader: false,
            submitLoader: false,
            routeData: this.props.Sales360Redux.routeData,
            documentArr: [],
            documentTypeArr: [],
            selectedDocumentTypeObj: {},
            isVisibleDocModal: false,
            docImgLoader: false,
            docType: "",
            docName: "",
            documentNumber: "",
            gstDocumentArr: [],
            adhaarDocArr: [],
            docImg: "",
            selectedDocType: "",
            data: {

            },
            isVisibleChangeRouteModal: false,

            allData: {
                contactPerson: "",
                customerType: [],
                customerTypeObj: {},
                counterName: "",
                contactNo: "",
                pincode: "",
                address: "",
                market: "",
                counterVolume: "",
                unitArr: [],
                selectedUnitObj: {},
                visitNote: "",
                birthDatePicker: false,
                birthDateObj: {
                    rawDate: new Date(),
                    selectedDate: ""
                },
                anniversaryDatePicker: false,
                anniversaryDateObj: {
                    rawDate: new Date(),
                    selectedDate: ""
                },
                subordinateArr: [],
                selectedSubordinateObj: {},
                checkedItem: true,
                locationArr: [],
                locationObj: [],
                profileImg: "",
                profileRaw: "",
                imageLoader: false,
                custAccessType: "0",
                locationName: "",
                gstDoc: "",
                adhaarDoc: "",
                dynamicFieldArr: []

            },

            customerPartner: true,
            influencerPartner: false,
            checkBoxArr: [],

            visitModal: false,
            customerData: {},
            submitVisitLoader: false
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this._load();
                await this._getHierarchyTypesSlNo();
                await this._getProductHierarchyTypesSlNo();
            })
    }

    // this is the first function where set the state data
    _load = async () => {
        this.setState({ pageLoader: true })
        // await this.getDocTypeApiCall();
        await this.getDynamicFormField("1")//1-customer,4-influencer
        await this.getUnitData();
        await this.getSubordinateData();
        await this._onFetchVisitorType("1") //1-customer,4-influencer
        // await this.setBeatData()
        this.setState({ pageLoader: false })
    }


    getDynamicFormField = async (partnerType) => {
        let reqData = {
            refId: "0",
            formId: "CUST",
            formModuleSubId: partnerType
        }
        let responseData = await MiddlewareCheck("getFormFieldsValueById", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.dynamicFieldArr = modDynamicFieldArr(responseData.response);
                this.setState({ allData: this.state.allData });
            } else {
                // this.setState({ alertMessage: responseData.message });
            }
        }
    }

    getDocTypeApiCall = async () => {
        let docAccess = await ClientSettings.CustomerDocValidationAccess.getCustomerDocumentValidationAccess();
        let reqData = {};
        if (docAccess) {
            reqData["contactTypeId"] = this.state.allData.customerTypeObj.id
        }
        let responseData = await MiddlewareCheck("getRegistrationDocumentDropdownData", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.documentTypeArr = modDocTypeData(responseData.response.data);
                this.setState({ documentTypeArr: this.state.documentTypeArr });
            } else {
                // this.setState({ alertMessage: responseData.message });
            }
        }
    }

    // for get the get Hierarchy Types With Sl No for country
    _getHierarchyTypesSlNo = async () => {
        this.setState({ locationLoader: true })
        if ((await StorageDataModification.locationMappedData({}, "get")) === null) {
            let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "1" });
            if (responseData == false) {
                // this.setState({ alertMessage: "Network Error!" });
            } else {
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
        if ((await StorageDataModification.locationMappedDataProduct({}, "get")) === null) {
            let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "2" });
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    await StorageDataModification.locationMappedDataProduct(modifyLocationMappedData(responseData.response, this.props.Sales360Redux.productMappedUserArr), "store");
                } else {
                    // this.setState({ alertMessage: responseData.message });
                }
            }
        }
        this.setState({ locationLoader: false })
        return true;
    }

    setBeatData = async () => {
        if (this.props.route.params.type == "global") {

        }
    }

    // for onChange Customer Name
    _onChangeContactPerson = (text) => {
        this.state.allData.contactPerson = DataValidator.inputEntryValidate(text, "nameSpace");
        this.setState({
            allData: this.state.allData
        })
    }

    // for shop name onChange
    _onChangeCounterName = (text) => {
        this.state.allData.counterName = DataValidator.inputEntryValidate(text, "nameSpace");
        this.setState({
            allData: this.state.allData
        })
    }

    // for contact phone onChange
    _onChangeContactNo = (text) => {
        let txt = DataValidator.inputEntryValidate(text, "mobile");
        this.state.allData.contactNo = txt;
        this.setState({
            allData: this.state.allData
        })
        if (txt.length > 9) {
            this.checkMobileNoExistOrNot(txt);
        }
    }

    // for pincode onChange
    _onChangePincode = (text) => {
        this.state.allData.pincode = DataValidator.inputEntryValidate(text, "number");
        this.setState({
            allData: this.state.allData
        })
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
                // this.clearExistsData()
            } else {
                Toaster.ShortCenterToaster(responseData.message)
                this.setState({ isPhoneExists: false })

            }
        }
        this.setState({ checkPhoneLoader: false })
    }

    clearExistsData = async () => {
        await this._getHierarchyTypesSlNo();
        this.state.allData.market = "";
        this.state.allData.pincode = "";
        this.state.allData.address = "";
        this.state.allData.counterVolume = "";
        this.state.allData.selectedUnitObj = {};
        this.state.allData.locationObj = [];
        this.state.allData.locationArr = [];
        this.setState({
            allData: this.state.allData
        })
    }

    // for address on change
    _onChangeAddress = (text) => {
        this.state.allData.address = text;
        this.setState({
            allData: this.state.allData
        })
    }

    //  for brand currently using on change
    _onChangeBrand = (text) => {
        this.state.allData.market = DataValidator.inputEntryValidate(text, "nameSpace");
        this.setState({
            allData: this.state.allData
        })
    }


    // for counter volume on change
    _onChangeVolume = (text) => {
        this.state.allData.counterVolume = DataValidator.inputEntryValidate(text, "number");
        this.setState({
            allData: this.state.allData
        })
    }
    // for unit change
    _onChangeUnit = (data) => {
        this.state.allData.selectedUnitObj = data;
        this.setState({
            allData: this.state.allData
        })
    }

    // unit
    getUnitData = async () => {
        let responseData = await MiddlewareCheck("getAllMasterUnitList", {}, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.unitArr = modifyUnitArr(responseData.data)
                this.setState({
                    allData: this.state.allData
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onChangeVisitNote = (text) => {
        this.state.allData.visitNote = text;
        this.setState({
            allData: this.state.allData
        })
    }

    _onFetchVisitorType = async (partnerType) => {
        let reqData = {
            "isProject": this.state.isRetailOrProject ? '0' : '1',
            "partnerType": partnerType
        }
        let responseData = await MiddlewareCheck("getContactTypes_v2", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.customerType = modifyCustomerTypeArr(responseData.response)
                this.setState({
                    allData: this.state.allData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onSelectVisitorType = async (value) => {
        this.state.allData.customerTypeObj = value;
        this.state.allData.custAccessType = value.customerAccessType
        this.setState({
            allData: this.state.allData,
            // documentTypeArr:modDocTypeData(ar)
        })

        await this.getDocTypeApiCall();
    }


    _onOpenAndCloseBirthDatePicker = (type) => {
        this.state.allData.birthDatePicker = type;
        this.setState({
            allData: this.state.allData
        });
    }

    _onSelectBirthDate = (date) => {
        if (date) {
            this.state.allData.birthDateObj.rawDate = date;
            this.state.allData.birthDateObj.selectedDate = DateConvert.formatYYYYMMDD(date);
            this.setState({
                allData: this.state.allData
            });
        }
        this._onOpenAndCloseBirthDatePicker(false);
    }

    _onOpenAndCloseAnniversaryDatePicker = (type) => {
        this.state.allData.anniversaryDatePicker = type;
        this.setState({
            allData: this.state.allData
        });
    }
    _onSelectAnniversaryDate = (date) => {
        if (date) {
            this.state.allData.anniversaryDateObj.rawDate = date;
            this.state.allData.anniversaryDateObj.selectedDate = DateConvert.formatYYYYMMDD(date);
            this.setState({
                allData: this.state.allData
            });
        }
        this._onOpenAndCloseAnniversaryDatePicker(false);
    }

    _onOpenAndCloseDoc = (type, docType) => {
        this.setState({ isVisibleDocModal: type, selectedDocType: docType })
        this.clearDocData()
    }

    getSubordinateData = async () => {
        let responseData = await MiddlewareCheck("getChildUserByParent", {}, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                // let subordinateArrData = modifySubordinateArr(responseData.data);
                this.state.allData.subordinateArr = modifySubordinateArr(responseData.data);
                this.setState({
                    allData: this.state.allData
                })
            }

        }
    }

    _onSubordinateChange = (data) => {
        this.state.allData.selectedSubordinateObj = data;
        this.setState({
            allData: this.state.allData
        })
    }


    onPressSolo = () => {
        if (this.state.allData.checkedItem == false) {
            this.state.allData.checkedItem = true;
            this.state.allData.selectedSubordinateObj.id = "";
            this.setState({
                allData: this.state.allData,
            })
        }
    }

    onPressJoint = async () => {
        if (this.state.allData.checkedItem == true) {
            this.state.allData.checkedItem = false;
            await this.getSubordinateData();
            this.setState({
                allData: this.state.allData,
            })
        }
    }

    onSelectLocationData = (value) => {
        this.state.allData.locationName = value.name;
        this.state.allData.locationArr = value.totalData;
        this.state.allData.locationObj = value.value;
        this.setState({
            allData: this.state.allData
        })
    }

    // for profile image upload visible
    _onProfilePicModalVisible = async () => {
        this.setState({
            visibleProfileImgUploadModal: !this.state.visibleProfileImgUploadModal
        })
    }

    // for custom camera open
    onSelectPic = async (value) => {
        await this._onProfilePicModalVisible(false);
        await this.ImageUploadApiCall(value);
    }

    ImageUploadApiCall = async (uploadData) => {
        this.setState({ profileImgLoader: true })
        let imgData = await MiddlewareFileCheck("crmImageupload", uploadData, this.props);
        if (imgData) {
            if (imgData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.profileImg = imgData.response.fileName;
                this.state.allData.profileRaw = uploadData.uri;
                this.setState({ allData: this.state.allData })
            }
        }
        this.setState({ profileImgLoader: false })
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

    closeBravoModal = async () => {
        this.setState({ bravoModalVisiable: false })
    }

    openBravoModal = async () => {
        this.setState({ bravoModalVisiable: true })
    }

    addVisitNote = () => {
        this.setState({ bravoModalVisiable: false, visitModal: true })
    }

    _onSubmit = async () => {
        // this.bravoModal()
        let reqData = {
            "customerTypeId": this.state.allData.customerTypeObj.id ? this.state.allData.customerTypeObj.id.toString() : "",
            "custBusinessName": !this.state.allData.counterName.replace(/\s/g, '') ? "" : this.state.allData.counterName,
            "firstName": !this.state.allData.contactPerson.replace(/\s/g, '') ? "" : this.state.allData.contactPerson,
            "phoneNumber": [this.state.allData.contactNo],
            "phone": this.state.allData.contactNo,
            "address": this.state.allData.address ? this.state.allData.address : "",
            "custAddress": this.state.allData.address ? this.state.allData.address : "",
            "market": this.state.allData.market ? this.state.allData.market : "",
            "pinCode": this.state.allData.pincode ? this.state.allData.pincode : "",
            "profilePic": this.state.allData.profileImg ? this.state.allData.profileImg : "",
            "locationData": this.props.route.params.type == "global" ? this.state.allData.locationObj
                : [{
                    "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId,
                    "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId
                }],
            "godownCapacity": this.state.allData.counterVolume ? this.state.allData.counterVolume : "",
            "godownCapacityUnit": this.state.allData.selectedUnitObj.id ? this.state.allData.selectedUnitObj.id.toString() : "",
            "isProject": "0",
            "locationObj": this.state.allData.locationObj,

            "contactType": "",
            "visitDate": "",
            "lastName": "",
            "gender": "",
            "dob": this.state.allData.birthDateObj.selectedDate ? this.state.allData.birthDateObj.selectedDate : "",
            "title": "",
            "customerDescription": "",
            "erpCode": "",
            "email": [],
            "residentAddress": "",
            "geoLocation": "",
            "landmark": "",
            "hierarchyDataId": "",
            "hierarchyTypeId": "",
            "phoneArr": [],
            "emailArr": [],
            "yearOfEstd": this.state.allData.anniversaryDateObj.selectedDate ? this.state.allData.anniversaryDateObj.selectedDate : "",
            "godownCapacity": "",
            "godownLocation": "",
            "advanced": "",
            "appliedCreditLimit": "",
            "primaryItemId": "",
            "firsmStatus": "",
            "tradeLicenceDoc": "",
            "GSTcertificateDoc": "",
            "panCardDoc": "",
            "aadharCardDoc": "",
            "cancelChequeDoc": "",
            "custDocArray": modCustDocArr(this.state.documentArr),
            "locationName": this.props.route.params.type == "global" ? this.state.allData.locationName : this.props.Sales360Redux.routeData.hmName,
            "docTypeArr": this.state.documentTypeArr,
            "partnerType": "1",
            "formData": this.state.allData.dynamicFieldArr
            // "outletVisit": this.props.route.params.type == "global" ? null : "1"
        }

        if (this.props.route.params.type !== "global") {
            reqData["outletVisit"] = "1"
        }

        let validatedDataForAdd = validateData(reqData);
        if (validatedDataForAdd.status) {
            this.setState({ submitLoader: true, locationLoader: true })
            let responseData = await MiddlewareCheck("addNewRegCustomer", reqData, this.props);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    if (this.state.allData.dynamicFieldArr.length > 0) {
                        await this.saveDynamicFormData(responseData.response)
                    }
                    Object.assign(reqData, responseData.response)
                    this.setState({
                        data: reqData,
                        customerData: {
                            "customerName": this.state.allData.contactPerson,
                            "contactTypeName": this.state.allData.customerTypeObj.name,
                            "customerId": responseData.response.customerId
                        }
                    })
                    await this.openBravoModal()
                    await this._onClearData()
                    Toaster.ShortCenterToaster(responseData.message)
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ submitLoader: false, locationLoader: false })
        }
    }

    saveDynamicFormData = async (data) => {
        let reqData = {
            refId: data.customerId,
            formId: "CUST",
            formData: this.state.allData.dynamicFieldArr
        }

        let responseData = await MiddlewareCheck("saveFormFieldsValue", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                // Toaster.ShortCenterToaster(responseData.message)

            } else {
                // Toaster.ShortCenterToaster(responseData.message)

            }


        }
    }

    _onClearData = async () => {
        this.state.allData.counterName = "",
            this.state.allData.locationName = "",
            this.state.allData.contactPerson = "",
            this.state.allData.contactNo = [],
            this.state.allData.address = "",
            this.state.allData.market = "",
            this.state.allData.pincode = "",
            this.state.allData.profileImg = "",
            this.state.allData.locationObj = [],
            this.state.allData.locationArr = [],
            this.state.allData.counterVolume = "",
            this.state.allData.selectedUnitObj = {},
            this.state.allData.customerTypeObj = {},
            this.state.allData.dynamicFieldArr = [],
            this.state.documentArr = [],
            this.setState(this.state);
    }

    back = () => {
        this.props.navigation.goBack();
        this._onClearData()
    }

    // on set document number
    _onChangeDocumentNumber = (value) => {
        let d = DataValidator.inputEntryValidate(value, "alphanumeric")
        this.setState({ documentNumber: d })
    }

    // on select file
    onSelectFile = async (type) => {
        let uploadData = await FileUpload.uploadDocumentAndImage();
        await this.DocUploadApiCall(uploadData);
    }

    DocUploadApiCall = async (uploadData) => {
        this.setState({ docImgLoader: true })
        let imgData = await MiddlewareFileCheck("crmImageupload", uploadData, this.props);
        if (imgData) {
            if (imgData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let type = imgData.response.fileName.split('.').pop()
                this.setState({ docType: type })
                this.setState({ docImg: imgData.response.fileName, docName: imgData.response.orgfilename })
            }
        }
        this.setState({ docImgLoader: false })
    }

    onCloseUploadFileModal = () => {
        this.setState({ isVisibleDocModal: false, docImg: "", docName: "", docType: "", documentNumber: "", selectedDocumentTypeObj: {}, docImgLoader: false });
    }

    onUploadFile = () => {
        if (this.state.docName.length == 0) {
            Toaster.ShortCenterToaster("Please add Document !")
        } else if (this.state.documentNumber.length == 0) {
            Toaster.ShortCenterToaster("Please add Document Number !")
        } else {
            let docData = {
                docName: this.state.docName,
                docType: this.state.docType,
                docImg: this.state.docImg,
                fileType: this.state.selectedDocumentTypeObj.name,
                "docTypeId": this.state.selectedDocumentTypeObj.id,
                "isMandatory": this.state.selectedDocumentTypeObj.isMandatory,
                "docFileName": this.state.docImg,
                "documentNumber": this.state.documentNumber
            }
            this.state.documentArr.push(docData)
            this.onCloseUploadFileModal()
            this.scrollToBottom()
        }
    }

    scrollToBottom = () => {
        if (this.scrollViewRef.current) {
            this.scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    clearDocData = () => {
        this.setState({
            docName: "",
            docType: "",
            docImg: "",
            documentNumber: ""
        })
    }

    onRemoveDoc = async (index) => {
        // await this.getDocTypeApiCall();
        let arr = this.state.documentArr;
        // arr.splice(index, 1)
        const newDocumentArr = arr.filter((_, i) => i !== index);
        this.setState({ documentArr: newDocumentArr })
    }

    _onChangeDocumentType = (value) => {
        this.setState({ selectedDocumentTypeObj: value })
    }

    onAttachPress = () => {
        if (this.state.selectedDocumentTypeObj.id == undefined || this.state.selectedDocumentTypeObj.id == null) {
            Toaster.ShortCenterToaster("Please select the Document Type !")
        } else {
            this.setState({ isVisibleDocModal: true })
        }
    }

    closeVisitModal = () => {
        this.setState({
            visitModal: false
        })
    }

    modalSec = () => {
        const onCloseRouteModal = () => {
            this.setState({ isVisibleChangeRouteModal: false })
        }
        const onSelection = async (value) => {
            this.setState({ routeData: value })
            this.props.userSelectedBeatRouteData(value);
            await StorageDataModification.routeData(value, "store");
            onCloseRouteModal();
        }

        const onSubmitVisitNote = async (value) => {
            let locationData = [
                {
                    "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId,
                    "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId
                }
            ]
            let errorCount = 0;
            if (value.selectVisitStatus.id == undefined || value.selectVisitStatus.id == null || value.selectVisitStatus.id == "") {
                Toaster.ShortCenterToaster("Please select Status !")
                errorCount++
            } else if (value.selectCategoryObj.id == undefined || value.selectCategoryObj.id == null || value.selectCategoryObj.id == "") {
                Toaster.ShortCenterToaster("Please select category name !")
                errorCount++
            } else if (value.subCategory.length > 0 && (value.selectSubCategoryObj.id == undefined || value.selectSubCategoryObj.id == null)) {
                Toaster.ShortCenterToaster("Please Select Sub-Category!");
                errorCount++;
            } else if (value.subCategory.length == 0 && value.description.length == 0) {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.NEW_NOTES.DESCRIPTION_ERROR);
                errorCount++;
            }

            if (errorCount === 0) {
                let allNotes = [];
                allNotes.push({
                    categoryName: value.selectCategoryObj.name ? value.subCategory.length > 0 ? value.selectCategoryObj.name : value.selectCategoryObj.name : "",
                    note: value.description.length > 0 ? value.description : value.selectSubCategoryObj.name
                })
              
                let reqData = {
                    "visitImg": value.visitImg == undefined || value.visitImg == null ? "" : value.visitImg,
                    "fieldVisitId": "0",
                    "status": value.selectVisitStatus.id ? value.selectVisitStatus.id : "",
                    "visitNotes": allNotes,
                    "visitorsId": [this.props.Sales360Redux.userInfo.details.userId],
                    "customerId": this.state.customerData.customerId,
                    "isProject": "0",
                    "isCustomer": "1",
                    "nxtFollowUpDate": value.dateObj.selectedDate.length > 0 ? DateConvert.formatYYYYMMDD(value.dateObj.rawDate) : "",
                    "hierarchyDataIdArr": locationData
                }

                this.setState({ submitVisitLoader: true })

                let responseData = await MiddlewareCheck("fieldVisitAdd", reqData, this.props);
                if (responseData) {
                    if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                        Toaster.ShortCenterToaster(responseData.data.message)
                        this.closeVisitModal();
                    }
                }

                this.setState({ submitVisitLoader: false })
            }
        }
        return (
            <>
                {this.state.visitModal ?
                    <VisitModal isVisible={this.state.visitModal}
                        props={this.props}
                        onCloseModal={() => this.closeVisitModal()}
                        type={"visitStatus"}
                        data={this.state.customerData}
                        onSubmitVisitNote={(value) => onSubmitVisitNote(value)}
                        isLoading={this.state.submitVisitLoader}
                    />
                    : null}

                {this.state.isVisibleChangeRouteModal ?
                    <ChangeRouteModal
                        isVisible={this.state.isVisibleChangeRouteModal}
                        props={this.props}
                        onCloseModal={() => onCloseRouteModal()}
                        onSelectRoute={(val) => onSelection(val)}
                    /> :
                    null
                }
                {this.state.isVisibleDocModal ?
                    <>
                        <BottomModal
                            isVisible={this.state.isVisibleDocModal}
                            children={
                                <View style={styles.modalview}>
                                    <View style={{ flexDirection: 'row', marginVertical: 15, alignItems: "center" }}>
                                        <View style={{ flex: 1, marginLeft: 15 }} >
                                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Upload Files</Text>
                                        </View>
                                        <TouchableOpacity style={styles.dropdownSec} onPress={() => this._onOpenAndCloseDoc(false, "")} >
                                            <SvgComponent svgName={"cross"} strokeColor={"#fff"} height={15} width={15} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ justifyContent: "center", paddingHorizontal: 20 }}>
                                        <TouchableOpacity onPress={() => this.onSelectFile(true)} style={{ borderStyle: "dashed", borderWidth: 1, justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
                                            {this.state.docImgLoader ?
                                                <View style={{ height: 200, justifyContent: "center", alignItems: "center" }}>
                                                    <ActivityIndicator />
                                                </View>
                                                :
                                                <React.Fragment>
                                                    {this.state.docImg.length > 0 ?
                                                        <>
                                                            <Image source={this.state.docType == "pdf" ? ImageName.PDF_ICON :
                                                                this.state.docType == "xlsx" || this.state.docType == "xls" ? ImageName.XLS_ICON :
                                                                    this.state.docType == "docX" ? ImageName.DOC_ICON :
                                                                        { uri: App_uri.AWS_S3_IMAGE_VIEW_URI + this.state.docImg }} style={{ height: 250, width: 150, resizeMode: "contain" }} />
                                                            <View style={{ paddingHorizontal: 20 }}>
                                                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.docName}</Text>
                                                            </View>
                                                        </>
                                                        :
                                                        <View style={{ padding: 100 }}>
                                                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Select File</Text>
                                                        </View>
                                                    }
                                                </React.Fragment>
                                            }
                                        </TouchableOpacity>
                                        <View style={{ marginTop: 15 }}>
                                            <TextInputBox
                                                value={this.state.documentNumber}
                                                onChangeText={(value) => this._onChangeDocumentNumber(value)}
                                                keyboardType={"default"}
                                                placeholder={"Write the Number"}
                                                placeholderTextColor={"#5F5F5F"}
                                                height={45}
                                                borderRadius={25}
                                                additionalBoxStyle={{ borderColor: "#273441", borderWidth: 0.5, backgroundColor: "#fff" }}
                                            />
                                        </View>
                                        <View style={{ marginTop: 15 }}>
                                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onUploadFile()} style={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, borderRadius: 25, paddingHorizontal: 15, paddingVertical: 12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                <Image source={ImageName.UPLOAD_LOGO} style={{ height: 18, width: 18, resizeMode: "contain" }} />
                                                <Text style={{ fontSize: 14, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: Color.COLOR.WHITE.PURE_WHITE, marginLeft: 10 }}>Upload</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ height: 50 }} />
                                </View>
                            }
                        />
                    </>
                    : null}
            </>
        )
    }

    changeRouteModal = () => {
        this.setState({ isVisibleChangeRouteModal: true });
    }



    _onCheck = async (type) => {
        this.setState({ pageLoader: true })
        this.clearFormData()
        if (type == "customer") {
            this.setState({ customerPartner: true, influencerPartner: false })
            await this._onFetchVisitorType("1")
            await this.getDynamicFormField("1")
        } else {
            this.setState({ customerPartner: false, influencerPartner: true })
            await this._onFetchVisitorType("4")
            await this.getDynamicFormField("4")
        }

        this.setState({ pageLoader: false })
    }


    dynamicFieldSec = () => {
        const onCheckRadio = (mainIndex, subIndex, item) => {
            for (let i = 0; i < this.state.allData.dynamicFieldArr.length; i++) {
                for (let j = 0; j < this.state.allData.dynamicFieldArr[i].value.length; j++) {
                    if (item.id == this.state.allData.dynamicFieldArr[i].value[j].id) {
                        this.state.allData.dynamicFieldArr[i].value[j].check = true
                    } else {
                        this.state.allData.dynamicFieldArr[i].value[j].check = false

                    }
                }
            }
            this.state.allData.dynamicFieldArr[mainIndex].fieldValue = item.name
            this.setState({ allData: this.state.allData })
        }

        const onCheckcheckBox = (mainIndex, subIndex, item) => {
            this.state.allData.dynamicFieldArr[mainIndex].value[subIndex].check = !item.check
            let filteredData = this.state.allData.dynamicFieldArr[mainIndex].value.filter((item) => item.check)
            const result = filteredData.map(item => item.id);
            this.state.allData.dynamicFieldArr[mainIndex].fieldValue = result;
            this.setState({ allData: this.state.allData })
        }

        const onSelect = (val, mainIndex) => {
            this.state.allData.dynamicFieldArr[mainIndex].fieldValue = val.name
            this.setState({ allData: this.state.allData })
        }

        const onChangeInput = (val, mainIndex) => {
            this.state.allData.dynamicFieldArr[mainIndex].fieldValue = val
            this.setState({ allData: this.state.allData })
        }

        return (
            <>
                {this.state.allData.dynamicFieldArr.map((item, key) => (
                    <View key={key}>

                        {item.type == "select" ?
                            <View style={{ marginTop: 15 }}>
                                <DropdownInputBox
                                    selectedValue={item.fieldValue}
                                    data={item.value}
                                    additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                                    onSelect={(value) => onSelect(value, key)}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                    headerText={item.label}
                                />
                            </View>
                            :
                            item.type == "input" ?
                                <View style={{ marginTop: 15 }}>
                                    < TextInputBox
                                        placeholder={item.label}
                                        value={item.fieldValue}
                                        height={45}
                                        borderRadius={12}
                                        returnKeyType="done"
                                        keyboardType={"default"}
                                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                                        onChangeText={(value) => onChangeInput(value, key)}
                                    />
                                </View>
                                :
                                item.type == "radio" ?
                                    <View style={{ marginTop: 15 }}>
                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM, color: "#0A0A0A" }} numberOfLines={1}>{item.label}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginHorizontal: 10, }}>
                                            {item.value.map((radioData, radioKey) => (
                                                <View style={{ flex: 1, flexDirection: 'row' }} key={radioKey}>
                                                    <CheckBox
                                                        type={"singleSelectBox"}
                                                        borderRadius={40}
                                                        data={radioData.check}
                                                        onClickValue={() => onCheckRadio(key, radioKey, radioData)}
                                                    />
                                                    <Text style={styles.selectionText}>{radioData.name}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                    :
                                    item.type == "checkbox" ?
                                        <View style={{ marginTop: 15 }}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM, color: "#0A0A0A" }} numberOfLines={1}>{item.label}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 15, flexWrap: "wrap", flex: 1 }}>
                                                {item.value.map((checkBoxData, checkBoxKey) => (
                                                    <View style={{ flexDirection: 'row', paddingRight: 20, marginBottom: 5 }} key={checkBoxKey}>
                                                        <CheckBox
                                                            type={"tick"}
                                                            borderRadius={5}
                                                            data={checkBoxData.check}
                                                            onClickValue={() => onCheckcheckBox(key, checkBoxKey, checkBoxData)}
                                                        />
                                                        <Text style={styles.selectionText}>{checkBoxData.name}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                        :
                                        null


                        }
                    </View>

                ))
                }
            </>
        )
    }

    customerForm = () => {
        return (
            <>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Owner Name"}
                        value={this.state.allData.contactPerson}
                        height={45}
                        borderRadius={12}
                        returnKeyType="done"
                        keyboardType={"default"}
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                        onChangeText={(value) => this._onChangeContactPerson(value)}
                    />
                </View>
                <View style={{ marginTop: 18 }}>
                    <DropdownInputBox
                        selectedValue={this.state.allData.customerTypeObj.id ? this.state.allData.customerTypeObj.id.toString() : "0"}
                        data={this.state.allData.customerType}
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                        onSelect={(value) => this._onSelectVisitorType(value)}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                        headerText={"Customer Type"}
                    />
                </View>
                <View style={{ marginTop: 18 }}>
                    <TextInputBox
                        placeholder={"Shop Name"}
                        value={this.state.allData.counterName}
                        height={45}
                        borderRadius={12}
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                        onChangeText={(value) => this._onChangeCounterName(value)}
                    />
                </View>
                <View style={{ marginTop: 18 }}>
                    <TextInputBox
                        value={this.state.allData.contactNo}
                        onChangeText={(value) => this._onChangeContactNo(value)}
                        isActivityLoader={this.state.checkPhoneLoader ? true : false}
                        placeholder={"Contact No"}
                        keyboardType={"number-pad"}
                        isRightIcon={true}
                        rightIcon={ImageName.PHONE}
                        maxLength={10}
                        rightIconStyle={{ height: 15, width: 15 }}
                        height={45}
                        borderRadius={12}
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}

                    />
                </View>
                {this.props.route.params.type == "global" ?
                    <View style={{ marginTop: 20 }}>
                        {this.state.locationLoader ?
                            null :
                            <DynamicLocationMapping
                                type={"lastHierarcyField"}
                                viewType={"add"}
                                screenName={"registrationFrom"}
                                isLabelVisible={false}
                                onApiCallData={(value) => this.onSelectLocationData(value)} />
                        }

                    </View>
                    :
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity style={styles.beatSelectionSec} activeOpacity={0.7} onPress={() => this.changeRouteModal()}>
                            <View style={{ flex: 0.9, flexDirection: 'row' }}>
                                <View style={{ flex: 0.8, paddingLeft: 20 }}>
                                    <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM, color: "#0A0A0A" }} numberOfLines={1}>{this.state.routeData.hmName ? this.state.routeData.hmName : ""}</Text>
                                </View>
                            </View>
                            <View style={styles.beatSvgIconSec}>
                                <SvgComponent svgName={"downArrow"} strokeColor={Color.COLOR.GRAY.GRAY_TINTS} height={15} width={15} />
                            </View>
                        </TouchableOpacity>
                        {/* <TextInputBox
                                            editable={false}
                                            multiline={true}
                                            alignItems={"flex-start"}
                                            value={this.state.routeData.hmName}
                                            // onChangeText={(value) => this._onChangeContactNo(value)}
                                            // isActivityLoader={this.state.checkPhoneLoader ? true : false}
                                            placeholder={"Contact No"}
                                            keyboardType={"number-pad"}
                                            // maxLength={10}
                                            height={90}
                                            borderRadius={12}
                                            additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}

                                        /> */}
                    </View>
                }
                <View style={{ marginTop: 18 }}>
                    <TextInputBox
                        value={this.state.allData.market}
                        onChangeText={(value) => this._onChangeBrand(value)}
                        placeholder={"Market"}
                        keyboardType={"default"}
                        height={45}
                        returnKeyType="done"
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                        editable={!this.state.isPhoneExists ? true : false}
                    />
                </View>
                <View style={{ marginTop: 18 }}>
                    <TextInputBox
                        placeholder={"Pin No"}
                        value={this.state.allData.pincode}
                        onChangeText={(value) => this._onChangePincode(value)}
                        keyboardType={"number-pad"}
                        returnKeyType="done"
                        maxLength={6}
                        height={45}
                        borderRadius={12}
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                        editable={!this.state.isPhoneExists ? true : false}
                    />
                </View>
                <View style={{ marginTop: 18 }}>
                    <TextInputBox
                        placeholder={"Add Details Note of Address"}
                        value={this.state.allData.address}
                        onChangeText={(value) => this._onChangeAddress(value)}
                        height={90}
                        borderRadius={12}
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                        editable={!this.state.isPhoneExists ? true : false}
                    />
                </View>

                <View style={{ marginTop: 18, flexDirection: 'row' }}>
                    <View style={{ flex: 0.6 }}>
                        <TextInputBox
                            value={this.state.allData.counterVolume}
                            onChangeText={(value) => this._onChangeVolume(value)}
                            keyboardType={"number-pad"}
                            placeholder={"Counter Volume"}
                            height={45}
                            borderRadius={12}
                            additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                            editable={!this.state.isPhoneExists ? true : false}
                        />
                    </View>
                    <View style={{ width: 10 }} />
                    <View style={{ flex: 0.4 }}>
                        <DropdownInputBox
                            selectedValue={this.state.allData.selectedUnitObj.id ? this.state.allData.selectedUnitObj.id.toString() : "0"}
                            data={this.state.allData.unitArr}
                            onSelect={(value) => this._onChangeUnit(value)}
                            headerText={"Unit"}
                            additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                            isDisabled={this.state.isPhoneExists ? true : false}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 18 }}>
                    <TouchableOpacity style={styles.inputBoxStyle} activeOpacity={0.9} onPress={() => this._onOpenAndCloseBirthDatePicker(true)} >
                        <Text style={[styles.inputBoxText, { color: this.state.allData.birthDateObj.selectedDate.length == 0 ? "#C0C0C0" : "#0A0A0A" }]} numberOfLines={1}>{this.state.allData.birthDateObj.selectedDate.length == 0 ? "Birth Date" : this.state.allData.birthDateObj.selectedDate}</Text>
                        <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={[{ height: 25, width: 25, resizeMode: 'contain' }]} source={ImageName.CALENDER_LOGO} />
                        </View>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={this.state.allData.birthDatePicker}
                        date={this.state.allData.birthDateObj.rawDate}
                        mode={"date"}
                        // maximumDate={new Date()}
                        onConfirm={(date) => {
                            this._onSelectBirthDate(date);
                        }}
                        onCancel={() => {
                            this._onOpenAndCloseBirthDatePicker(false)
                        }}
                    />
                </View>
                <View style={{ marginTop: 18 }}>
                    <TouchableOpacity style={styles.inputBoxStyle} activeOpacity={0.9} onPress={() => this._onOpenAndCloseAnniversaryDatePicker(true)} >
                        <Text style={[styles.inputBoxText, { color: this.state.allData.anniversaryDateObj.selectedDate.length == 0 ? "#C0C0C0" : "#0A0A0A" }]} numberOfLines={1}>{this.state.allData.anniversaryDateObj.selectedDate.length == 0 ? "Anniversary Date" : this.state.allData.anniversaryDateObj.selectedDate}</Text>
                        <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={[{ height: 25, width: 25, resizeMode: 'contain' }]} source={ImageName.CALENDER_LOGO} />
                        </View>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={this.state.allData.anniversaryDatePicker}
                        date={this.state.allData.anniversaryDateObj.rawDate}
                        mode={"date"}
                        // maximumDate={new Date()}
                        onConfirm={(date) => {
                            this._onSelectAnniversaryDate(date);
                        }}
                        onCancel={() => {
                            this._onOpenAndCloseAnniversaryDatePicker(false)
                        }}
                    />
                </View>
                {this.dynamicFieldSec()}
                <View style={{ marginTop: 18, flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <DropdownInputBox
                            selectedValue={this.state.selectedDocumentTypeObj.id ? this.state.selectedDocumentTypeObj.id.toString() : "0"}
                            data={this.state.documentTypeArr}
                            onSelect={(value) => this._onChangeDocumentType(value)}
                            headerText={"Document Type"}
                            additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                            // unSelectedTextColor={"#5F5F5F"}
                            // selectedTextColor={"#1F2B4D"}
                            fontFamily={FontFamily.FONTS.INTER.SEMI_BOLD}
                            borderRadius={15}
                            isSearchable={true}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.onAttachPress()} style={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, borderRadius: 15, paddingHorizontal: 15, paddingVertical: 12, flexDirection: "row", alignItems: "center" }}>
                        <Image source={ImageName.UPLOAD_LOGO} style={{ height: 18, width: 18, resizeMode: "contain" }} />
                        <Text style={{ fontSize: 14, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: Color.COLOR.WHITE.PURE_WHITE, marginLeft: 10 }}>Attach</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 18, flexDirection: "row", flexWrap: "wrap" }}>
                    {this.state.documentArr.map((item, key) => (
                        <View key={key}>
                            <View style={{ marginHorizontal: 5, width: Dimension.width / 3 - 25 }}>
                                <Image source={item.docType == "pdf" ? ImageName.PDF_ICON :
                                    item.docType == "xlsx" || item.docType == "xls" ? ImageName.XLS_ICON :
                                        item.docType == "docX" ? ImageName.DOC_ICON : { uri: App_uri.AWS_S3_IMAGE_VIEW_URI + item.docImg }} style={{ height: 160, width: 100, resizeMode: "contain" }} />
                                <Text style={{ fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: Color.COLOR.BLUE.LOTUS_BLUE, textAlign: "center" }}>{item.fileType}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.onRemoveDoc(key)} style={{ position: "absolute", right: 0, backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR, height: 25, width: 25, borderRadius: 20, padding: 10, alignItems: "center", justifyContent: "center" }}>
                                <Image source={ImageName.CROSS_IMG} style={{ height: 12, width: 12, resizeMode: "contain" }} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={{ marginTop: 25, flexDirection: 'row' }}>
                    <View style={{ flex: 0.4 }}>

                    </View>
                    <View style={{ width: 10 }} />
                    <View style={{ flex: 0.6 }}>
                        {this.state.submitLoader ?
                            <View style={{ marginTop: 9 }}>
                                <ActivityIndicator size={"small"} />
                            </View> :
                            <React.Fragment>
                                {this.state.isPhoneExists ?
                                    null :
                                    <BigTextButton
                                        height={45}
                                        borderRadius={22}
                                        text={"Add New Customer"}
                                        onPress={() => this._onSubmit()}
                                    // isDisabled={this.state.isPhoneExists}
                                    />
                                }
                            </React.Fragment>

                        }
                    </View>
                </View>
            </>
        )
    }

    influencerForm = () => {
        const onInfluencerSubmit = async () => {
            let reqData = {
                "customerTypeId": this.state.allData.customerTypeObj.id ? this.state.allData.customerTypeObj.id.toString() : "",
                "custBusinessName": !this.state.allData.counterName.replace(/\s/g, '') ? "" : this.state.allData.counterName,
                "firstName": !this.state.allData.contactPerson.replace(/\s/g, '') ? "" : this.state.allData.contactPerson,
                "phoneNumber": [this.state.allData.contactNo],
                "phone": this.state.allData.contactNo,
                "address": this.state.allData.address ? this.state.allData.address : "",
                "custAddress": this.state.allData.address ? this.state.allData.address : "",
                "market": this.state.allData.market ? this.state.allData.market : "",
                "pinCode": this.state.allData.pincode ? this.state.allData.pincode : "",
                "profilePic": this.state.allData.profileImg ? this.state.allData.profileImg : "",
                "locationData": this.props.route.params.type == "global" ? this.state.allData.locationObj
                    : [{
                        "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId,
                        "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId
                    }],
                "godownCapacity": this.state.allData.counterVolume ? this.state.allData.counterVolume : "",
                "godownCapacityUnit": this.state.allData.selectedUnitObj.id ? this.state.allData.selectedUnitObj.id.toString() : "",
                "isProject": "0",
                "locationObj": this.state.allData.locationObj,

                "contactType": "",
                "visitDate": "",
                "lastName": "",
                "gender": "",
                "dob": this.state.allData.birthDateObj.selectedDate ? this.state.allData.birthDateObj.selectedDate : "",
                "title": "",
                "customerDescription": "",
                "erpCode": "",
                "email": [],
                "residentAddress": "",
                "geoLocation": "",
                "landmark": "",
                "hierarchyDataId": "",
                "hierarchyTypeId": "",
                "phoneArr": [],
                "emailArr": [],
                "yearOfEstd": this.state.allData.anniversaryDateObj.selectedDate ? this.state.allData.anniversaryDateObj.selectedDate : "",
                "godownCapacity": "",
                "godownLocation": "",
                "advanced": "",
                "appliedCreditLimit": "",
                "primaryItemId": "",
                "firsmStatus": "",
                "tradeLicenceDoc": "",
                "GSTcertificateDoc": "",
                "panCardDoc": "",
                "aadharCardDoc": "",
                "cancelChequeDoc": "",
                "custDocArray": modCustDocArr(this.state.documentArr),
                "locationName": this.props.route.params.type == "global" ? this.state.allData.locationName : this.props.Sales360Redux.routeData.hmName,
                "docTypeArr": this.state.documentTypeArr,
                "partnerType": "4",
                "formData": this.state.allData.dynamicFieldArr
                // "outletVisit": this.props.route.params.type == "global" ? null : "1"
            }
            let validatedDataForAdd = validateInfluencerData(reqData);
            if (validatedDataForAdd.status) {
                this.setState({ submitLoader: true, locationLoader: true })
                let responseData = await MiddlewareCheck("addNewRegCustomer", reqData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        if (this.state.allData.dynamicFieldArr.length > 0) {
                            await this.saveDynamicFormData(responseData.response)
                        }
                        Object.assign(reqData, responseData.response)
                        this.setState({
                            data: reqData,
                            customerData: {
                                "customerName": this.state.allData.contactPerson,
                                "contactTypeName": this.state.allData.customerTypeObj.name,
                                "customerId": responseData.response.customerId
                            }
                        })
                        await this.openBravoModal()
                        await this._onClearData()
                        Toaster.ShortCenterToaster(responseData.message)
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }
            }
            this.setState({ submitLoader: false, locationLoader: false })
        }
        return (
            <>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Owner Name"}
                        value={this.state.allData.contactPerson}
                        height={45}
                        borderRadius={12}
                        returnKeyType="done"
                        keyboardType={"default"}
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                        onChangeText={(value) => this._onChangeContactPerson(value)}
                    />
                </View>
                <View style={{ marginTop: 18 }}>
                    <DropdownInputBox
                        selectedValue={this.state.allData.customerTypeObj.id ? this.state.allData.customerTypeObj.id.toString() : "0"}
                        data={this.state.allData.customerType}
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                        onSelect={(value) => this._onSelectVisitorType(value)}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                        headerText={"Influencer Type"}
                    />
                </View>
                <View style={{ marginTop: 18 }}>
                    <TextInputBox
                        placeholder={"Site Name"}
                        value={this.state.allData.counterName}
                        height={45}
                        borderRadius={12}
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                        onChangeText={(value) => this._onChangeCounterName(value)}
                    />
                </View>
                <View style={{ marginTop: 18 }}>
                    <TextInputBox
                        value={this.state.allData.contactNo}
                        onChangeText={(value) => this._onChangeContactNo(value)}
                        isActivityLoader={this.state.checkPhoneLoader ? true : false}
                        placeholder={"Contact No"}
                        keyboardType={"number-pad"}
                        isRightIcon={true}
                        rightIcon={ImageName.PHONE}
                        maxLength={10}
                        rightIconStyle={{ height: 15, width: 15 }}
                        height={45}
                        borderRadius={12}
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}

                    />
                </View>
                {this.props.route.params.type == "global" ?
                    <View style={{ marginTop: 20 }}>
                        {this.state.locationLoader ?
                            null :
                            <DynamicLocationMapping
                                type={"lastHierarcyField"}
                                viewType={"add"}
                                screenName={"registrationFrom"}
                                isLabelVisible={false}
                                onApiCallData={(value) => this.onSelectLocationData(value)} />
                        }
                    </View>
                    :
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity style={styles.beatSelectionSec} activeOpacity={0.7} onPress={() => this.changeRouteModal()}>
                            <View style={{ flex: 0.9, flexDirection: 'row' }}>
                                <View style={{ flex: 0.8, paddingLeft: 20 }}>
                                    <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM, color: "#0A0A0A" }} numberOfLines={1}>{this.state.routeData.hmName ? this.state.routeData.hmName : ""}</Text>
                                </View>
                            </View>
                            <View style={styles.beatSvgIconSec}>
                                <SvgComponent svgName={"downArrow"} strokeColor={Color.COLOR.GRAY.GRAY_TINTS} height={15} width={15} />
                            </View>
                        </TouchableOpacity>
                    </View>
                }
                <View style={{ marginTop: 18 }}>
                    <TextInputBox
                        placeholder={"Address"}
                        value={this.state.allData.address}
                        onChangeText={(value) => this._onChangeAddress(value)}
                        height={90}
                        borderRadius={12}
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                        editable={!this.state.isPhoneExists ? true : false}
                    />
                </View>
                {this.dynamicFieldSec()}

                <View style={{ marginTop: 25, flexDirection: 'row' }}>
                    <View style={{ flex: 0.4 }}>

                    </View>
                    <View style={{ width: 10 }} />
                    <View style={{ flex: 0.6 }}>
                        {this.state.submitLoader ?
                            <View style={{ marginTop: 9 }}>
                                <ActivityIndicator size={"small"} />
                            </View> :
                            <React.Fragment>
                                {this.state.isPhoneExists ?
                                    null :
                                    <BigTextButton
                                        height={45}
                                        borderRadius={22}
                                        text={"Add New Influencer"}
                                        onPress={() => onInfluencerSubmit()}
                                    // isDisabled={this.state.isPhoneExists}
                                    />
                                }
                            </React.Fragment>

                        }
                    </View>
                </View>
            </>
        )
    }

    clearFormData = () => {
        this.setState({
            allData: {
                contactPerson: "",
                customerType: [],
                customerTypeObj: {},
                counterName: "",
                contactNo: "",
                pincode: "",
                address: "",
                market: "",
                counterVolume: "",
                unitArr: [],
                selectedUnitObj: {},
                visitNote: "",
                birthDatePicker: false,
                birthDateObj: {
                    rawDate: new Date(),
                    selectedDate: ""
                },
                anniversaryDatePicker: false,
                anniversaryDateObj: {
                    rawDate: new Date(),
                    selectedDate: ""
                },
                subordinateArr: [],
                selectedSubordinateObj: {},
                checkedItem: true,
                locationArr: [],
                locationObj: [],
                profileImg: "",
                profileRaw: "",
                imageLoader: false,
                custAccessType: "0",
                locationName: "",
                gstDoc: "",
                adhaarDoc: "",
                documentArr: [],

                dynamicFieldArr: [],
            },
        })
    }

    checkBoxSec = () => {
        return (
            <>
                <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 15 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <CheckBox
                                type={"singleSelectBox"}
                                borderRadius={40}
                                data={this.state.customerPartner}
                                onClickValue={() => this._onCheck("customer")}
                            />
                            <Text style={styles.selectionText}>Customer</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end" }}>
                            <CheckBox
                                type={"singleSelectBox"}
                                borderRadius={40}
                                data={this.state.influencerPartner}
                                onClickValue={() => this._onCheck("influencer")}
                            />
                            <Text style={styles.selectionText}>Influencer</Text>
                        </View>
                    </View>
                </View>
            </>
        )
    }

    // here main render the the page
    render() {
        return (
            <SafeAreaView style={styles.container} >
                {
                    this.state.cameraVisible ?
                        <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
                        :
                        null
                }
                < Header {...this.props} onRefresh={() => console.log("")} />
                {this.state.bravoModalVisiable ? <BravoModal isVisible={this.state.bravoModalVisiable} onAddVisitNote={() => this.addVisitNote()} onCloseModal={() => this.closeBravoModal()} props={this.props} data={this.state.data} custAccessType={this.state.allData.custAccessType} /> : null}
                {this._imageUploadModalSection()}
                {this.checkBoxSec()}
                {this.state.pageLoader ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <ActivityIndicator size={"large"} />
                    </View> :
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} ref={this.scrollViewRef}>
                        <View style={{ marginHorizontal: 15, marginTop: 10 }}>

                            <View style={{ marginHorizontal: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ borderWidth: 1, borderColor: Color.COLOR.RED.AMARANTH, height: 120, width: 120, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                    {this.state.allData.profileImg.length > 0 ?
                                        <React.Fragment>
                                            {this.state.profileImgLoader ?
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                    <ActivityIndicator size="small" color={Color.COLOR.BLUE.VIOLET_BLUE} />
                                                </View> :
                                                <TouchableOpacity onPress={() => this._onProfilePicModalVisible()} activeOpacity={0.9}>
                                                    <Image source={{ uri: App_uri.IMAGE_URI + this.state.allData.profileImg }} style={{ height: 110, width: 110, resizeMode: 'cover', borderRadius: 100 }} />
                                                </TouchableOpacity>
                                            }
                                        </React.Fragment> :
                                        <>
                                            <TouchableOpacity style={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, height: 110, width: 110, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.8} onPress={() => this._onProfilePicModalVisible()}>
                                                <SvgComponent svgName={"camera_with_pencil"} strokeColor={"#fff"} height={40} width={40} />
                                                <Text style={{ color: "#D1D1D1", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 4 }}>Add Image</Text>
                                            </TouchableOpacity>
                                        </>
                                    }
                                </View>
                            </View>
                            {this.state.customerPartner ? this.customerForm() : this.influencerForm()}
                        </View>
                        <View style={{ marginBottom: 60 }} />
                    </ScrollView >
                }
                {this.modalSec()}
            </SafeAreaView >
        )
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateAllCountries,
        stateCheckForNetwork,
        stateUserInformation,
        userSelectedBeatRouteData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UnplanVisitFrom);