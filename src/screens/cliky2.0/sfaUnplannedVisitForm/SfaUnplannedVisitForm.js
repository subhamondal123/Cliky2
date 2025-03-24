import React from "react";
import { Color, Dimension, FontFamily, ImageName } from '../../../enums';
import styles from './Style';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,

} from 'react-native';
import {
    stateUserInformation,
    stateCheckForNetwork,
} from '../../../redux/Sales360Action';
import { ErrorCode, LengthValidate } from '../../../services/constant';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CheckBox, CustomCamera, DropdownInputBox, ImageUploadModal, Loader, TextInputBox } from "../../../shared";
import BigTextButton from "../../../shared/big-text-button";
import { DateConvert, FileUpload, GetUserData, Toaster } from "../../../services/common-view-function";
import { districtModifyData, modifyBrandArr, modifyDistrictArrData, modifySizeSpecsArr, modifyStateArr, modifyStateArrData, modifyStatusArr, modifySubordinateArr, modifyUnitArr, modifyVisitorTypeArr, modifyZoneArr, modifyZoneArrData, setCustomerType, stateModifyData, validateData, zoneModifyData } from "./Function";
import { MiddlewareCheck, MiddlewareFileCheck, StoreUserOtherInformations } from "../../../services/middleware";
import { DataValidator } from "../../../validators";
import { CustomStyle } from "../../style";
import DatePicker from "react-native-date-picker";

class UnplannedVisitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            allObjData: {},
            stateArr: [],
            districtArr: [],
            zoneArr: [],
            typeArr: [],
            startDateCheck: false,
            distLoader: false,
            zoneLoader: false,
            sizeLoader: false,
            visibleProfileImgUploadModal: false,
            propsData: {},
            contactId: "",
            checkPhoneLoader: false,
            isPhoneExists: false,
            cameraVisible: false,
            fromDatePicker: false,
            fromDateObj: {
                rawDate: new Date(),
                fromDate: ""
            },
            feedbackLoader: false,
            propData: this.props.route.params.data,
            allData: {
                brandName: "",
                brandNameActive: false,
                customerTypeArr: [],
                selectedCustomerTypeObj: {},
                stateArr: [],
                selectedStateObj: {},
                districtArr: [],
                selectedDistrictObj: {},
                zoneArr: [],
                selectedZoneObj: {},
                customerName: "",
                customerNameActive: false,
                counterName: "",
                counterNameActive: false,
                contactNo: "",
                contactNoActive: false,
                address: "",
                addressActive: false,
                pincode: "",
                pincodeActive: false,
                contactPerson: "",
                contactPersonActive: false,
                email: "",
                emailActive: false,
                brandArr: [],
                selectedBrandObj: {},
                itemArr: [],
                selectedItemObj: {},
                counterVolume: "",
                counterVolumeActive: false,
                unitArr: [],
                selectedUnitObj: {},
                imageUrl: "",
                imageName: "",
                imageLoader: false,
                visitDateObj: {
                    rawDate: new Date(),
                    visitDate: ""
                },
                visibleVisitDate: false,
                statusArr: [],
                selectedStatusObj: {},
                visitNote: "",
                visitNoteActive: false,
                datePicker: false,
                dateObj: {
                    rawDate: new Date(),
                    selectedDate: ""
                },

                checkedItem: true,
                checkedItemFeedback: true,
                subordinateArr: [],
                selectedSubordinateObj: {},
                feedback: "",
                feedbackActive: false,
                feedbackStatusArr: [],
                selectedFeedbackStatusObj: {},
                enquiryStatusArr: [],
                selectedEnquiryStatusObj: {},
                dynamicLocation: ""
            },
        }
    }

    componentDidMount() {
        this._load();
        if (this.props.route.params.type == "enquiry") {
            this.setState({ contactId: this.props.route.params.data.contactId == undefined || this.props.route.params.data.contactId == null ? "" : this.props.route.params.data.contactId })
        } else if (this.props.route.params.type == "unplanned") {
            this.setState({ contactId: this.props.route.params.data.contactId == undefined || this.props.route.params.data.contactId == null ? "" : this.props.route.params.data.contactId })
        }
        StoreUserOtherInformations("", {}, this.props);
    }

    _load = async () => {
        await this._onCustomerType();
        await this._onBrandDropDownData();
        await this.getVisitStatusList();
        await this.getUnitData();
        await this.setVisitType(this.props.route.params.visitTypeId);
        if (this.props.route.params.type == "enquiry") {
            await this.getEnquiryStatusArr()
        }
        let userData = await GetUserData.getAllUserData();
        // await this.getDistrictData(userData.stateId);
        await this.getStateData(userData.countryId);
        if (this.props.route.params.data.contactId == undefined || this.props.route.params.data.contactId == null) {

        } else {
            await this.setExistingContactData();
        }

        this.setState({
            pageLoader: false
        })
    }

    getSubordinateData = async () => {
        let responseData = await MiddlewareCheck("getChildUserByParent", {}, this.props);
        if (responseData === false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.subordinateArr = modifySubordinateArr(responseData.data);
                this.setState({
                    allData: this.state.allData
                })
            }
        }
    }

    getEnquiryStatusArr = async () => {
        let responseData = await MiddlewareCheck("getLeadStatusV2", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.enquiryStatusArr = responseData.response;
                this.setState({
                    allData: this.state.allData
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setEnquiryStatus(responseData.response)
    }

    setEnquiryStatus = (data) => {
        if (data == undefined || data == null) {

        } else {
            let obj = {};
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == this.props.route.params.data.typeStatus) {
                    obj = {
                        "id": data[i].id,
                        "clientId": data[i].clientId,
                        "name": data[i].name,
                        "natureType": data[i].natureType,
                        "sequence": data[i].sequence,
                        "slNo": data[i].slNo,
                        "status": data[i].status,
                        "createDate": data[i].createDate,
                        "createdBy": data[i].createdBy,
                        "lastUpdatedBy": data[i].lastUpdatedBy,
                        "lastUpdated": data[i].lastUpdated
                    }
                }
                this.state.allData.selectedEnquiryStatusObj = obj;
                this.setState({ allData: this.state.allData })
            }
        }
    }

    setVisitType = async (id) => {
        let modObj = {};
        for (let i = 0; i < this.state.allData.customerTypeArr.length; i++) {
            if (id == this.state.allData.customerTypeArr[i].id) {
                modObj = {
                    id: this.state.allData.customerTypeArr[i].id,
                    name: this.state.allData.customerTypeArr[i].name
                }
            }
        }
        this.state.allData.selectedCustomerTypeObj = modObj;
        this.setState({ allData: this.state.allData })
    }

    setExistingContactData = async () => {
        this.state.allData.contactNo = this.props.route.params.data.ownerPhoneNo;
        this.state.allData.customerName = this.props.route.params.data.enqueryOwnerName;
        this.state.allData.contactPerson = this.props.route.params.data.enqueryOwnerName;
        this.state.allData.email = this.props.route.params.data.ownerEmail;
        this.state.allData.address = this.props.route.params.data.address;
        this.state.allData.pincode = this.props.route.params.data.pinCode;
        this.state.allData.counterName = this.props.route.params.data.businessName;
        this.state.allData.dynamicLocation = this.props.route.params.data.hmUpperNodes
        this.setState({
            allData: this.state.allData,
        })
    }

    modContactPhone = (phoneData) => {
        let modPh = phoneData.split(",")
        return modPh[0];
    }
    modContactEmail = (emailData) => {
        let modPh = emailData.split(",")
        return modPh[0];
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    // unit
    getUnitData = async () => {
        let responseData = await MiddlewareCheck("getAllMasterUnitList", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
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

    // fpr get customer type
    _onCustomerType = async () => {
        let responseData = await MiddlewareCheck("getVisitorType", {}, this.props);
        if (responseData == false) {
            this._onNetworkError();
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.customerTypeArr = modifyVisitorTypeArr(responseData.data)
                this.setState({
                    allData: this.state.allData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

        // let responseData = await MiddlewareCheck("getContactTypes", {});
        // if (responseData === false) {
        //     this._onNetworkError();
        // } else {
        //     if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //         this.state.allData.customerTypeArr = modifyCustomerTypeArr(responseData.response);
        //         this.setState({
        //             allData: this.state.allData
        //         })
        //     } else {
        //         Toaster.ShortCenterToaster(responseData.message)
        //     }
        // }
        this.state.allData.selectedCustomerTypeObj = setCustomerType(this.state.allData.customerTypeArr, this.props.route.params.data.contactTypeName)
        this.setState({
            allData: this.state.allData
        })
    }

    getStateData = async (value) => {
        let reqData = {
            countryId: value
        }

        let responseData = await MiddlewareCheck("getaStateData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let stateData = stateModifyData(responseData);
                this.state.allData.stateArr = modifyStateArrData(stateData.stateList)

                this.setState({
                    allData: this.state.allData
                })
            }
        }
    }

    // get district array
    getDistrictData = async (value, arr) => {
        let reqData = {
            stateId: value
        }
        this.setState({ distLoader: true })
        let responseData = await MiddlewareCheck("getaDistrictData", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let districtData = districtModifyData(responseData);
                this.state.allData.districtArr = modifyDistrictArrData(districtData.districtList)
                if (arr && arr.length > 0) {
                    this.state.allData.selectedDistrictObj.id = arr[0].contactDistrictId
                }

                this.setState({
                    allData: this.state.allData
                })
            }
        }
        this.setState({ distLoader: false })
    }
    // zone array

    getZoneData = async (value, arr) => {
        let reqData = {
            cityId: value
        }
        this.setState({ zoneLoader: true })
        let responseData = await MiddlewareCheck("getaZoneData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let zoneData = zoneModifyData(responseData);
                this.state.allData.zoneArr = modifyZoneArrData(zoneData.zoneList)
                this.setState({
                    allData: this.state.allData
                })
            }
        }
        this.setState({ zoneLoader: false })
    }

    _onBrandDropDownData = async () => {
        let responseData = await MiddlewareCheck("getProductCategory", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.brandArr = modifyBrandArr(responseData.data)
                this.setState({
                    allData: this.state.allData
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    getVisitStatusList = async () => {
        let responseData = await MiddlewareCheck("getVisitStatusList", {}, this.props);

        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.statusArr = modifyStatusArr(responseData.data);
                this.setState({
                    allData: this.state.allData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }


    // for Customer Type select
    _onSelectCustomerType = (data) => {
        this.state.allData.selectedCustomerTypeObj = data;
        this.setState({
            allData: this.state.allData
        })
    }

    _onSubordinateChange = (data) => {
        this.state.allData.selectedSubordinateObj = data;
        this.setState({
            allData: this.state.allData
        })
    }

    // for change the state

    _onSelectState = async (data) => {
        this.state.allData.selectedStateObj = data;
        this.setState({
            allData: this.state.allData
        })
        await this.getDistrictData(data.id, []);
    }

    // for change the dist and city
    _onSelectDistCity = async (data) => {
        this.state.allData.selectedDistrictObj = data;

        this.setState({
            allData: this.state.allData
        })
        await this.getZoneData(data.id);
    }
    // for select the the zone
    _onSelectZone = (data) => {
        this.state.allData.selectedZoneObj = data;
        this.setState({
            allData: this.state.allData
        })
    }

    // customer Name
    _onChangeCustomerName = (text) => {
        this.state.allData.customerName = DataValidator.inputEntryValidate(text, "nameSpace");
        this.setState({
            allData: this.state.allData
        })
    }
    // contact phone
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

    checkMobileNoExistOrNot = async (txt) => {
        let reqData = {
            "phoneNumber": txt,
            "isProject": "0"
        }
        this.setState({ checkPhoneLoader: true })
        let responseData = await MiddlewareCheck("phoneNumberExist", reqData, this.props);

        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message)
                this.setState({ isPhoneExists: false })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
                this.setState({ isPhoneExists: true })
                this.clearExistsData()
            }
        }
        this.setState({ checkPhoneLoader: false })
    }

    clearExistsData = () => {
        this.state.allData.address = "";
        this.state.allData.pincode = "";
        this.state.allData.email = "";
        this.state.allData.brandName = "";
        this.state.allData.counterVolume = "";
        this.state.allData.selectedUnitObj = {};
        this.state.allData.imageName = "";
        this.state.allData.selectedStatusObj = {};
        this.state.allData.visitNote = "";
        this.state.allData.dateObj = {
            rawDate: new Date(),
            selectedDate: ""
        }
        this.setState({
            allData: this.state.allData
        })
    }

    //address

    _onChangeAddress = (text) => {
        this.state.allData.address = text;
        this.setState({
            allData: this.state.allData
        })
    }

    // visitNote

    _onChangeVisitNote = (text) => {
        this.state.allData.visitNote = text;
        this.setState({
            allData: this.state.allData
        })
    }

    // pincode
    _onChangePincode = (text) => {
        this.state.allData.pincode = DataValidator.inputEntryValidate(text, "number");
        this.setState({
            allData: this.state.allData
        })
    }

    // contact person
    _onChangeContactPerson = (text) => {
        this.state.allData.contactPerson = DataValidator.inputEntryValidate(text, "nameSpace");
        this.setState({
            allData: this.state.allData
        })
    }
    _onChangeCounterName = (text) => {

        this.state.allData.counterName = DataValidator.inputEntryValidate(text, "nameSpace");
        this.setState({
            allData: this.state.allData
        })
    }
    _onChangeEmail = (text) => {
        this.state.allData.email = DataValidator.inputEntryValidate(text, "email");
        this.setState({
            allData: this.state.allData
        })
    }

    // brand name
    _onChangeBrand = (text) => {
        this.state.allData.brandName = text;
        this.setState({
            allData: this.state.allData
        })
    }

    //volume 
    _onChangeVolume = (text) => {
        this.state.allData.counterVolume = DataValidator.inputEntryValidate(text, "number");
        this.setState({
            allData: this.state.allData
        })
    }
    //unit 
    _onChangeUnit = (data) => {
        this.state.allData.selectedUnitObj = data;
        this.setState({
            allData: this.state.allData
        })
    }

    // brand dropdown
    _onSelectBrand = async (data) => {
        this.state.allData.selectedBrandObj = data;
        this.setState({
            allData: this.state.allData
        })
        await this._onGetSizeSpecs(data)
    }


    _onGetSizeSpecs = async (value) => {
        this.setState({ sizeLoader: true })
        let reqData = {
            "customerId": 12,
            "brand": value.id
        }
        let responseData = await MiddlewareCheck("addProductSIzeSpec", reqData, this.props)
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.itemArr = modifySizeSpecsArr(responseData.data);
                this.setState({
                    allData: this.state.allData
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ sizeLoader: false })
    }

    //item 
    _onSelectItem = (data) => {
        this.state.allData.selectedItemObj = data;
        this.setState({
            allData: this.state.allData
        })
    }

    //status

    _onSelectStatus = (data) => {
        this.state.allData.selectedStatusObj = data;
        this.setState({
            allData: this.state.allData
        })
    }

    _onChangeFeedback = (data) => {
        this.state.allData.feedback = data;
        this.setState({
            allData: this.state.allData
        })
    }

    _onFromDatePicker = () => {
        if (this.state.fromDatePicker == false) {
            this.setState({
                fromDatePicker: true
            })
        } else {
            this.setState({
                fromDatePicker: false
            })
        }

    }

    _onSelectFromDate = (date) => {
        this.state.fromDateObj.rawDate = date.date;
        this.state.fromDateObj.fromDate = DateConvert.formatYYYYMMDD(date.date);
        this.setState({
            fromDateObj: this.state.fromDateObj
        });
    }

    // for profile image upload visible
    _onProfilePicModalVisible = async () => {
        this.setState({
            visibleProfileImgUploadModal: !this.state.visibleProfileImgUploadModal
        })
    }

    onDeleteDoc = () => {

        this.state.allData.imageName = "";
        this.setState({
            allData: this.state.allData
        })
    }

    // for date of birth visible
    _onVisibleVisitDate = () => {
        this.state.allData.visibleVisitDate = !this.state.allData.visibleVisitDate;
        this.setState({
            allData: this.state.allData
        })
    }

    // for select the date of birth
    _onSelectVisitDate = (selectedDate) => {
        if (selectedDate) {
            this.state.allData.visitDateObj.visitDate = DateConvert.viewDateFormat(selectedDate);
            this.state.allData.visitDateObj.rawDate = selectedDate;
        }
        this.setState({
            allData: this.state.allData
        })
        this._onVisibleVisitDate();
    }

    onClickFeedback = () => {
        this.state.allData.checkedItemFeedback = !this.state.allData.checkedItemFeedback;
        this.setState({
            allData: this.state.allData,
        })

    }

    checkBoxSection = () => {
        const onClickNew = () => {
            if (this.state.allData.checkedItem == false) {
                this.state.allData.checkedItem = true;
                this.state.allData.selectedSubordinateObj.id = "";
                this.setState({
                    allData: this.state.allData,
                })
            }
        }
        const onClickExisting = async () => {
            if (this.state.allData.checkedItem == true) {
                this.state.allData.checkedItem = false;
                await this.getSubordinateData();
                this.setState({
                    allData: this.state.allData,
                })
            }
        }

        return (
            <>
                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <CheckBox
                            borderRadius={20}
                            height={20}
                            width={20}
                            data={this.state.allData.checkedItem}
                            onClickValue={() => onClickNew()}
                        />
                        <View style={{ width: 5 }} />
                        <Text style={styles.checkBoxLabel}>Solo</Text>
                    </View>
                    <View style={{ width: 7 }} />
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <CheckBox
                            borderRadius={20}
                            height={20}
                            width={20}
                            data={!this.state.allData.checkedItem}
                            onClickValue={() => onClickExisting()}
                        />
                        <View style={{ width: 5 }} />
                        <Text style={styles.checkBoxLabel}>Joint</Text>
                    </View>
                </View>
            </>
        )
    }

    _onSubmitFeedback = async () => {
        let reqData = {
            createdAt: DateConvert.fullDateFormat(new Date()),
            feedback: this.state.allData.feedback ? this.state.allData.feedback : "",
            leadId: this.props.route.params.data.leadRefId.toString(),
            followUpDate: this.state.fromDateObj.fromDate ? this.state.fromDateObj.fromDate : "",
            statusId: this.state.allData.selectedEnquiryStatusObj.id ? this.state.allData.selectedEnquiryStatusObj.id : ""
        }

        if (reqData.feedback.length == 0) {
            Toaster.ShortCenterToaster("Please Add Feedback")
        } else if (this.state.allData.selectedEnquiryStatusObj.id == "") {
            Toaster.ShortCenterToaster("Please Select Status !")
        } else {
            this.setState({ feedbackLoader: true })
            let responseData = await MiddlewareCheck("addEnquiryFeedback", reqData, this.props)
            if (responseData === false) {
                this._onNetworkError();
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.props.route.params.onRefreshEnquiryList()
                    this.onBack()
                    Toaster.ShortCenterToaster(responseData.message)

                } else {
                    Toaster.ShortCenterToaster(responseData.message)


                }
            }
            this.setState({ feedbackLoader: false })
        }
    }

    _onSubmit = async () => {
        let reqData = {
            "visitType": this.state.allData.checkedItem ? "1" : "0",
            "type": this.props.route.params.type,
            "jointVisitorId": this.state.allData.selectedSubordinateObj.id ? this.state.allData.selectedSubordinateObj.id.toString() : "",
            "enquiryId": this.props.route.params.data.enqueryId ? this.props.route.params.data.enqueryId.toString() : "",
            "contactId": this.state.contactId ? this.state.contactId : "",
            "customerTypeId": this.state.allData.selectedCustomerTypeObj.id ? this.state.allData.selectedCustomerTypeObj.id : "",
            "visitorTypeId": this.props.route.params.visitorTypeId,
            // "counterName": this.state.allData.counterName ? this.state.allData.counterName : "",
            "counterName": !this.state.allData.counterName.replace(/\s/g, '') ? "" : this.state.allData.counterName,
            "customerName": !this.state.allData.contactPerson.replace(/\s/g, '') ? "" : this.state.allData.contactPerson,
            "contactNumber": this.state.allData.contactNo ? this.state.allData.contactNo : "",
            "visitAddress": this.state.allData.address ? this.state.allData.address : "",
            "pincode": this.state.allData.pincode ? this.state.allData.pincode : "",
            "contactPerson": !this.state.allData.contactPerson.replace(/\s/g, '') ? "" : this.state.allData.contactPerson,
            "email": this.state.allData.email ? this.state.allData.email : "",
            "brandId": this.state.allData.brandName ? this.state.allData.brandName : "",
            "counterVolume": this.state.allData.counterVolume ? this.state.allData.counterVolume : "",
            "unitId": this.state.allData.selectedUnitObj.id ? this.state.allData.selectedUnitObj.id : "",
            "photo": this.state.allData.imageName ? this.state.allData.imageName : "",
            "visitDate": new Date(),
            "status": this.state.allData.selectedStatusObj.id ? this.state.allData.selectedStatusObj.id : "",
            "visitNote": this.state.allData.visitNote ? this.state.allData.visitNote : "",
            "nxtFollowUpDate": this.state.allData.dateObj.selectedDate.length > 0 ? DateConvert.formatYYYYMMDD(this.state.allData.dateObj.rawDate) : "",
            "hierarchyDataIdArr": [{ hierarchyDataId: this.props.route.params.data.hierarchyDataId, hierarchyTypeId: this.props.route.params.data.hierarchyTypeId }],
            "orgId": this.props.route.params.data.businessId ? this.props.route.params.data.businessId : "0",
            "leadId": this.props.route.params.data.leadRefId ? this.props.route.params.data.leadRefId : "0",
        }
        StoreUserOtherInformations("", {}, this.props);
        let validatedDataForAdd = validateData(reqData);
        if (validatedDataForAdd.status) {
            this.setState({ pageLoader: true })
            let responseData = await MiddlewareCheck("newUnplannedVisitCreate", reqData, this.props)
            if (responseData) {
                if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.data.message)
                    if (this.props.route.params.type == "enquiry") {
                        this.props.route.params.onRefreshEnquiryList();
                    }
                    this.props.navigation.goBack()
                }
                else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ pageLoader: false })
        }
    }

    onBack = () => {
        this.props.navigation.goBack()
    }

    _onOpenAndCloseDatePicker = (value) => {
        if (value) {
            this.state.allData.datePicker = value;
            this.setState({
                allData: this.state.allData
            });
        } else {
            this.state.allData.datePicker = value;
            this.setState({
                allData: this.state.allData
            });
        }
    }

    _onSelectDate = (date) => {
        if (date) {
            this.state.allData.dateObj.rawDate = date;
            this.state.allData.dateObj.selectedDate = DateConvert.viewDateFormat(date);
            this.setState({
                allData: this.state.allData
            });
        }
        this._onOpenAndCloseDatePicker(false);
    }

    // for custom camera open
    onSelectPic = async (value) => {
        await this._onProfilePicModalVisible(false);
        await this.ImageUploadApiCall(value);
    }

    ImageUploadApiCall = async (uploadData) => {

        this.setState({ visibleProfileImgUploadModal: true })
        let imgData = await MiddlewareFileCheck("imageupload", uploadData, this.props);
        if (imgData === false) {
            this._onNetworkError();
        } else {
            if (imgData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {

                this.state.allData.imageName = imgData.data.filename;
                this.state.allData.imageUrl = uploadData.uri;

                this.setState({ allData: this.state.allData })
            }
        }
        this.setState({ visibleProfileImgUploadModal: false })
    }

    _imageUploadModalSection = () => {

        const OnChooseGallery = async () => {
            let uploadData = await FileUpload.uploadDocumentAndImage();
            await this.ImageUploadApiCall(uploadData);
        }

        const OnChooseCamera = async () => {
            // let uploadData = await FileUpload.uploadCameraImg();
            // await this.ImageUploadApiCall(uploadData);
            this.setState({ cameraVisible: true });
        }



        return (
            <ImageUploadModal
                isVisible={this.state.visibleProfileImgUploadModal}
                onGallerySelect={(value) => OnChooseGallery(value)}
                onCameraSelect={(value) => OnChooseCamera(value)}
                onCloseModal={() => this._onProfilePicModalVisible()}
            />
        )
    }

    _onChangeEnquiryStatus = (data) => {
        this.state.allData.selectedEnquiryStatusObj = data;
        this.setState({
            allData: this.state.allData
        })
    }

    render() {

        if (this.state.cameraVisible) {
            return <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
        } else {

            return (
                <View style={styles.container}>
                    {this._imageUploadModalSection()}
                    {this.state.pageLoader ?
                        <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                            <Loader />
                        </View>
                        :
                        <React.Fragment>
                            {/* {this.props.route.params.type == "enquiry" ? 
                            :

                        } */}
                            <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ flex: 0.1 }}
                                        onPress={this.onBack}>
                                        <Image source={ImageName.BACK_IMG} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                    </TouchableOpacity>
                                    <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={CustomStyle.headerText}>{this.state.allData.checkedItemFeedback == false ? "Feedback Form" : "Visit Form"}</Text>
                                    </View>
                                    <View flex={0.1} />
                                </View>
                                {/* <View style={{ marginBottom: 10 }} /> */}
                                <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}>
                                    <View style={{ marginTop: 20 }}>
                                        <View>
                                            {this.props.route.params.type == "enquiry" ?
                                                <>
                                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                                        <CheckBox
                                                            borderRadius={20}
                                                            height={20}
                                                            width={20}
                                                            data={!this.state.allData.checkedItemFeedback}
                                                            onClickValue={() => this.onClickFeedback()}
                                                        />
                                                        <View style={{ width: 5 }} />
                                                        <Text style={styles.checkBoxLabel}>Add Feedback Only</Text>
                                                    </View>
                                                    <View style={styles.underline} />
                                                </>
                                                :
                                                null
                                            }
                                        </View>
                                        {this.state.allData.checkedItemFeedback == false ?
                                            <React.Fragment>
                                                <View style={{ marginVertical: 15 }}>
                                                    <TextInputBox
                                                        value={this.state.allData.feedback}
                                                        onChangeText={(value) => this._onChangeFeedback(value)}
                                                        placeholder={"Feedback*"}
                                                        keyboardType={"default"}
                                                        multiline={true}
                                                        isActive={this.state.allData.feedbackActive}
                                                        onFocus={() => { this.state.allData.feedbackActive = true, this.setState({ allData: this.state.allData }) }}
                                                        onBlur={() => { this.state.allData.feedbackActive = false, this.setState({ allData: this.state.allData }) }}
                                                        height={90}
                                                        returnKeyType="done"
                                                        alignItems={"flex-start"}
                                                    />
                                                </View>
                                                <View style={{ marginBottom: 15 }}>
                                                    <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onFromDatePicker()} activeOpacity={0.9}>
                                                        <Text style={[styles.inputBoxText, this.state.fromDateObj.fromDate.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>{this.state.fromDateObj.fromDate.length == 0 ? "Follow Up Date" : this.state.fromDateObj.fromDate}</Text>
                                                        <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <DatePicker
                                                        modal
                                                        open={this.state.fromDatePicker}
                                                        date={this.state.fromDateObj.rawDate}
                                                        mode={"date"}
                                                        minimumDate={new Date()}
                                                        onConfirm={(date) => {
                                                            this._onSelectFromDate({ date })
                                                        }}
                                                        onCancel={() => {
                                                            this._onFromDatePicker()
                                                        }}
                                                    />
                                                </View>
                                                <View>
                                                    <DropdownInputBox
                                                        selectedValue={this.state.allData.selectedEnquiryStatusObj.id ? this.state.allData.selectedEnquiryStatusObj.id.toString() : "0"}
                                                        data={this.state.allData.enquiryStatusArr}
                                                        onSelect={(value) => this._onChangeEnquiryStatus(value)}
                                                        headerText={"Status*"}
                                                        isBackButtonPressRequired={true}
                                                        isBackdropPressRequired={true}
                                                    />
                                                </View>
                                                <View style={{ marginVertical: 22 }}>
                                                    {this.state.feedbackLoader ?
                                                        <ActivityIndicator size={"small"} color={Color.COLOR.RED.AMARANTH} />
                                                        :
                                                        <View style={{ marginHorizontal: 20, marginTop: 20,paddingHorizontal:50 }}>

                                                            <BigTextButton
                                                                    height={40}
                                                                borderRadius={20}
                                                                text={"Submit"}
                                                                onPress={() => this._onSubmitFeedback()}
                                                            />
                                                        </View>
                                                    }

                                                </View>
                                            </React.Fragment>
                                            :
                                            <View>
                                                <View style={{ marginBottom: '5%' }}>
                                                    {this.checkBoxSection()}
                                                </View>
                                                {this.state.allData.checkedItem ? null :
                                                    <View style={{ marginVertical: 12 }}>
                                                        <DropdownInputBox
                                                            isSearchable={true}
                                                            selectedValue={this.state.allData.selectedSubordinateObj.id ? this.state.allData.selectedSubordinateObj.id.toString() : ""}
                                                            data={this.state.allData.subordinateArr}
                                                            onSelect={(value) => this._onSubordinateChange(value)}
                                                            headerText={"SubOrdinate"}
                                                            isBackButtonPressRequired={true}
                                                            isBackdropPressRequired={true}
                                                        />
                                                    </View>
                                                }

                                                {this.props.route.params.type == "enquiry" ? null : <>
                                                    <View style={{ marginVertical: 12 }}>
                                                        <DropdownInputBox
                                                            selectedValue={this.state.allData.selectedCustomerTypeObj.id ? this.state.allData.selectedCustomerTypeObj.id.toString() : "0"}
                                                            data={this.state.allData.customerTypeArr}
                                                            onSelect={(value) => this._onSelectCustomerType(value)}
                                                            headerText={"Visit Type*"}
                                                            isBackButtonPressRequired={true}
                                                            isBackdropPressRequired={true}
                                                            isDisabled={true}
                                                        />
                                                    </View>
                                                </>}

                                                <View style={{ marginVertical: 12 }}>
                                                    <TextInputBox
                                                        value={this.state.allData.contactPerson}
                                                        onChangeText={(value) => this._onChangeContactPerson(value)}
                                                        placeholder={"Contact Person Name*"}
                                                        keyboardType={"default"}
                                                        isActive={this.state.allData.contactPersonActive}
                                                        onFocus={() => { this.state.allData.contactPersonActive = true, this.setState({ allData: this.state.allData }) }}
                                                        onBlur={() => { this.state.allData.contactPersonActive = false, this.setState({ allData: this.state.allData }) }}
                                                        height={45}
                                                        returnKeyType="done"
                                                        editable={this.props.route.params.type == "enquiry" ? false : true}
                                                    />
                                                </View>
                                                <View style={{ marginVertical: 12 }}>
                                                    <TextInputBox
                                                        value={this.state.allData.counterName}
                                                        onChangeText={(value) => this._onChangeCounterName(value)}
                                                        placeholder={"Counter Name"}
                                                        keyboardType={"default"}
                                                        isActive={this.state.allData.counterNameActive}
                                                        onFocus={() => { this.state.allData.counterNameActive = true, this.setState({ allData: this.state.allData }) }}
                                                        onBlur={() => { this.state.allData.counterNameActive = false, this.setState({ allData: this.state.allData }) }}
                                                        height={45}
                                                        returnKeyType="done"
                                                    />
                                                </View>
                                                {Object.entries(this.state.allData.dynamicLocation).map(([item, key]) => (
                                                    <View style={{ marginVertical: 12 }} key={key}>
                                                        <TextInputBox
                                                            value={item + " : " + key}
                                                            onChangeText={(value) => this._onChangeCounterName(value)}
                                                            placeholder={"Location"}
                                                            keyboardType={"default"}
                                                            isActive={this.state.allData.counterNameActive}
                                                            onFocus={() => { this.state.allData.counterNameActive = true, this.setState({ allData: this.state.allData }) }}
                                                            onBlur={() => { this.state.allData.counterNameActive = false, this.setState({ allData: this.state.allData }) }}
                                                            height={key.length > 30 ? 90 : 45}
                                                            multiline={true}
                                                            returnKeyType="done"
                                                            alignItems={"flex-start"}
                                                            editable={this.props.route.params.type == "enquiry" ? false : true}
                                                        />
                                                    </View>
                                                ))}


                                                {/* <View style={{ marginVertical: 12 }}>
                                <TextInputBox
                                    value={this.state.allData.customerName}
                                    onChangeText={(value) => this._onChangeCustomerName(value)}
                                    placeholder={"Name"}
                                    keyboardType={"default"}
                                    isActive={this.state.allData.customerNameActive}
                                    onFocus={() => { this.state.allData.customerNameActive = true, this.setState({ allData: this.state.allData }) }}
                                    onBlur={() => { this.state.allData.customerNameActive = false, this.setState({ allData: this.state.allData }) }}
                                    height={45}
                                    returnKeyType="done"
                                />
                            </View> */}
                                                <View style={{ marginVertical: 12 }}>
                                                    <TextInputBox
                                                        value={this.state.allData.contactNo}
                                                        onChangeText={(value) => this._onChangeContactNo(value)}
                                                        placeholder={"Contact No*"}
                                                        keyboardType={"number-pad"}
                                                        maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                                                        isActive={this.state.allData.contactNoActive}
                                                        onFocus={() => { this.state.allData.contactNoActive = true, this.setState({ allData: this.state.allData }) }}
                                                        onBlur={() => { this.state.allData.contactNoActive = false, this.setState({ allData: this.state.allData }) }}
                                                        height={45}
                                                        isActivityLoader={this.state.checkPhoneLoader ? true : false}
                                                        activityLoaderColor={Color.COLOR.BLUE.CYAN_BLUE_AZURE}
                                                        activityLoaderSize={"small"}
                                                        returnKeyType="done"
                                                        editable={this.props.route.params.type == "enquiry" ? false : true}
                                                    />
                                                </View>
                                                <View style={{ marginVertical: 12 }}>
                                                    <TextInputBox
                                                        value={this.state.allData.address}
                                                        onChangeText={(value) => this._onChangeAddress(value)}
                                                        placeholder={"Address*"}
                                                        keyboardType={"default"}
                                                        isActive={this.state.allData.addressActive}
                                                        onFocus={() => { this.state.allData.addressActive = true, this.setState({ allData: this.state.allData }) }}
                                                        onBlur={() => { this.state.allData.addressActive = false, this.setState({ allData: this.state.allData }) }}
                                                        height={90}
                                                        multiline={true}
                                                        returnKeyType="done"
                                                        alignItems={"flex-start"}
                                                        editable={this.state.isPhoneExists ? false : true}
                                                    />
                                                </View>
                                                <View style={{ marginVertical: 12 }}>
                                                    <TextInputBox
                                                        value={this.state.allData.pincode}
                                                        onChangeText={(value) => this._onChangePincode(value)}
                                                        placeholder={"Pincode"}
                                                        keyboardType={"number-pad"}
                                                        isActive={this.state.allData.pincodeActive}
                                                        onFocus={() => { this.state.allData.pincodeActive = true, this.setState({ allData: this.state.allData }) }}
                                                        onBlur={() => { this.state.allData.pincodeActive = false, this.setState({ allData: this.state.allData }) }}
                                                        height={45}
                                                        returnKeyType="done"
                                                        maxLength={6}
                                                        editable={this.state.isPhoneExists ? false : true}
                                                    />
                                                </View>

                                                <View style={{ marginVertical: 12 }}>
                                                    <TextInputBox
                                                        value={this.state.allData.email}
                                                        onChangeText={(value) => this._onChangeEmail(value)}
                                                        placeholder={"Email"}
                                                        keyboardType={"default"}
                                                        isActive={this.state.allData.emailActive}
                                                        onFocus={() => { this.state.allData.emailActive = true, this.setState({ allData: this.state.allData }) }}
                                                        onBlur={() => { this.state.allData.emailActive = false, this.setState({ allData: this.state.allData }) }}
                                                        height={45}
                                                        returnKeyType="done"
                                                        editable={this.state.isPhoneExists ? false : true}
                                                    />
                                                </View>
                                                {/* <View style={{ marginVertical: 12 }}> */}
                                                {/* <TextInputBox
                                                        value={this.state.allData.brandName}
                                                        onChangeText={(value) => this._onChangeBrand(value)}
                                                        placeholder={"Brand Currently Using"}
                                                        keyboardType={"default"}
                                                        isActive={this.state.allData.brandNameActive}
                                                        onFocus={() => { this.state.allData.brandNameActive = true, this.setState({ allData: this.state.allData }) }}
                                                        onBlur={() => { this.state.allData.brandNameActive = false, this.setState({ allData: this.state.allData }) }}
                                                        height={45}
                                                        returnKeyType="done"
                                                        editable={this.state.isPhoneExists ? false : true}
                                                    /> */}
                                                {/* <DropdownInputBox
                                    selectedValue={this.state.allData.selectedBrandObj.id ? this.state.allData.selectedBrandObj.id.toString() : "0"}
                                    data={this.state.allData.brandArr}
                                    onSelect={(value) => this._onSelectBrand(value)}
                                    headerText={"Brand Name"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                /> */}
                                                {/* </View> */}
                                                {/* <View style={{ marginVertical: 12 }}>
                                {this.state.sizeLoader ? <>
                                    <ActivityIndicator />
                                </> : <>
                                    <DropdownInputBox
                                        selectedValue={this.state.allData.selectedItemObj.id ? this.state.allData.selectedItemObj.id.toString() : "0"}
                                        data={this.state.allData.itemArr}
                                        onSelect={(value) => this._onSelectItem(value)}
                                        headerText={"Item*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </>}
                            </View> */}
                                                {/* {this.props.route.params.visitorTypeName == "Distributor" || this.props.route.params.visitorTypeName == "Sub-Dealer" || this.props.route.params.visitorTypeName == "Dealer" ? <>
                                                    <View style={{ marginVertical: 12, flexDirection: "row" }}>
                                                        <View style={{ flex: 0.5 }}>
                                                            <TextInputBox
                                                                value={this.state.allData.counterVolume}
                                                                onChangeText={(value) => this._onChangeVolume(value)}
                                                                placeholder={"Counter Volume"}
                                                                keyboardType={"number-pad"}
                                                                isActive={this.state.allData.counterVolumeActive}
                                                                onFocus={() => { this.state.allData.counterVolumeActive = true, this.setState({ allData: this.state.allData }) }}
                                                                onBlur={() => { this.state.allData.counterVolumeActive = false, this.setState({ allData: this.state.allData }) }}
                                                                height={45}
                                                                returnKeyType="done"
                                                                editable={this.state.isPhoneExists ? false : true}
                                                            />
                                                        </View>
                                                        <View style={{ width: 10 }} />
                                                        <View style={{ flex: 0.5 }}>
                                                            <DropdownInputBox
                                                                selectedValue={this.state.allData.selectedUnitObj.id ? this.state.allData.selectedUnitObj.id.toString() : "0"}
                                                                data={this.state.allData.unitArr}
                                                                onSelect={(value) => this._onChangeUnit(value)}
                                                                headerText={"Unit"}
                                                                isBackButtonPressRequired={true}
                                                                isBackdropPressRequired={true}
                                                                isDisabled={this.state.isPhoneExists ? true : false}
                                                            />
                                                        </View>

                                                    </View>
                                                </> : null} */}

                                                <View style={{ marginVertical: 12 }}>
                                                    <View style={styles.uploadDocSection}>
                                                        <TouchableOpacity style={styles.uploadDocName} activeOpacity={0.8} onPress={() => this._onProfilePicModalVisible()}
                                                            disabled={this.state.allData.imageName == "" || this.state.isPhoneExists == false ? false : true}
                                                        >
                                                            <View style={{ flex: 1, marginRight: 20 }}>
                                                                <Text style={{ color: this.state.allData.imageName.length > 0 ? Color.COLOR.GRAY.DARK_GRAY_COLOR : Color.COLOR.GRAY.SILVER, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, paddingLeft: "8%" }}>
                                                                    {this.state.allData.imageName ? this.state.allData.imageName.length > 0 ? this.state.allData.imageName : "Take Photo" : "Take Photo"}
                                                                </Text>
                                                            </View>
                                                            {this.state.allData.imageName == "" ?
                                                                <View >
                                                                    <Image source={ImageName.ALPIN_LOGO} style={styles.calenderLogo} />
                                                                </View>
                                                                : <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#999", height: 20, width: 20, borderRadius: 200, marginRight: 10 }} activeOpacity={0.9} onPress={() => this.onDeleteDoc()}>
                                                                    <Image style={styles.whiteCrossImg} source={ImageName.WHITE_CROSS} />
                                                                </TouchableOpacity>}
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                {/* <View style={{ marginVertical: 12 }}>
                                <TouchableOpacity style={styles.canlenderSec}
                                    activeOpacity={0.9}
                                    onPress={() => this._onVisibleVisitDate()}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: this.state.allData.visitDateObj.visitDate.length > 0 ? Color.COLOR.GRAY.DARK_GRAY_COLOR : Color.COLOR.GRAY.SILVER, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, paddingLeft: "8%" }}>
                                            {this.state.allData.visitDateObj.visitDate ? this.state.allData.visitDateObj.visitDate.length > 0 ? this.state.allData.visitDateObj.visitDate : "Visit Date*" : "Visit Date*"}
                                        </Text>
                                    </View>

                                    <View style={styles.calenderImgSec}>
                                        <Image source={ImageName.CALENDER_LOGO} style={styles.calenderLogo} />
                                    </View>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={this.state.allData.visibleVisitDate}
                                    date={this.state.allData.visitDateObj.rawDate}
                                    // maximumDate={new Date()}
                                    mode="date"
                                    onConfirm={(date) => this._onSelectVisitDate(date)}
                                    onCancel={() => this._onVisibleVisitDate()}
                                />
                            </View> */}
                                                <View style={{ marginVertical: 12 }}>
                                                    <DropdownInputBox
                                                        selectedValue={this.state.allData.selectedStatusObj.id ? this.state.allData.selectedStatusObj.id.toString() : "0"}
                                                        data={this.state.allData.statusArr}
                                                        onSelect={(value) => this._onSelectStatus(value)}
                                                        headerText={"Status*"}
                                                        isBackButtonPressRequired={true}
                                                        isBackdropPressRequired={true}
                                                        isDisabled={this.state.isPhoneExists ? true : false}
                                                    />
                                                </View>
                                                <View style={{ marginVertical: 12 }}>
                                                    <TextInputBox
                                                        value={this.state.allData.visitNote}
                                                        onChangeText={(value) => this._onChangeVisitNote(value)}
                                                        placeholder={"Visit Note*"}
                                                        keyboardType={"default"}
                                                        isActive={this.state.allData.visitNoteActive}
                                                        onFocus={() => { this.state.allData.visitNoteActive = true, this.setState({ allData: this.state.allData }) }}
                                                        onBlur={() => { this.state.allData.visitNoteActive = false, this.setState({ allData: this.state.allData }) }}
                                                        height={90}
                                                        multiline={true}
                                                        returnKeyType="done"
                                                        alignItems={"flex-start"}
                                                        maxLength={999999999}
                                                        editable={this.state.isPhoneExists ? false : true}
                                                    />
                                                </View>


                                                <View style={{ marginVertical: 12 }}>
                                                    <TouchableOpacity style={styles.inputBoxStyle} activeOpacity={0.9} onPress={() => this._onOpenAndCloseDatePicker(true)} disabled={this.state.isPhoneExists ? true : false}>
                                                        <Text style={[styles.inputBoxText, { color: this.state.allData.dateObj.selectedDate.length == 0 ? "#C0C0C0" : "#0A0A0A" }]} numberOfLines={1}>{this.state.allData.dateObj.selectedDate.length == 0 ? "Next Visit Date" : this.state.allData.dateObj.selectedDate}</Text>
                                                        <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Image style={[{ height: 25, width: 25, resizeMode: 'contain' }]} source={ImageName.CALENDER_LOGO} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <DatePicker
                                                        modal
                                                        open={this.state.allData.datePicker}
                                                        date={this.state.allData.dateObj.rawDate}
                                                        mode={"date"}
                                                        minimumDate={new Date()}
                                                        onConfirm={(date) => {
                                                            this._onSelectDate(date);
                                                        }}
                                                        onCancel={() => {
                                                            this._onOpenAndCloseDatePicker(false)
                                                        }}
                                                    />
                                                </View>
                                                {this.state.isPhoneExists ?
                                                    null
                                                    :
                                                    <View style={{ marginHorizontal: '15%', marginTop: 25 }}>
                                                        {this.state.checkPhoneLoader ?
                                                            <ActivityIndicator color={Color.COLOR.BLUE.DARK_BLUE} />
                                                            :
                                                            <BigTextButton
                                                                height={40}
                                                                borderRadius={16}
                                                                text={"Submit"}
                                                                onPress={() => this._onSubmit()}
                                                            />
                                                        }

                                                    </View>
                                                }
                                            </View>
                                        }



                                    </View>
                                    <View style={{ marginBottom: 50 }} />
                                </ScrollView>
                            </View>
                        </React.Fragment>


                    }
                </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(UnplannedVisitForm);