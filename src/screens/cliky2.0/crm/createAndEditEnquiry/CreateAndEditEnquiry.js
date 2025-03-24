import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import styles from "./Style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../redux/Sales360Action';
import { CustomStyle } from "../../../style";
import {
    AssigneeDetails,
    BusinessDetails,
    DatesToRemember,
    Description,
    EnquiryDetails,
    OnlineExistence,
    PersonalAddressDetails,
    PersonalAndContactDetails
} from "./sub-component";
import { MiddlewareCheck } from "../../../../services/middleware";
import { CommonData, ErrorCode, LengthValidate } from "../../../../services/constant";
import { enquirySourceModifyData, modifyAllContactBusinessTypeData, modifyContactData, modifyEnquirySourceArrData, modifyEnquiryTypeArrData, modifyLandingData, modifyResp, onAddOrgValidation, onSaveApiCall, onSaveValidation, orgModifyData } from "./Function";
import { BigTextButton, CheckBox, DropdownInputBox, Loader, TextInputBox } from "../../../../shared";
import { Toaster } from "../../../../services/common-view-function";

const contactTypeArrData = [
    {
        id: 1,
        name: "New"
    },
    {
        id: 2,
        name: "Existing"
    },
]

const phoneTypeArray = [
    {
        id: 1,
        name: "business"
    }, {
        id: 2,
        name: "work"
    }, {
        id: 3,
        name: "personal"
    }, {
        id: 4,
        name: "home"
    }, {
        id: 5,
        name: "others"
    },
]

class CreateAndEditEnquiry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            isEnqueryInfoCompleted: true,
            isBusinessInfoCompleted: false,
            isAssignInfoCompleted: false,
            pageNum: 1,
            allPageData: {
                phLoader: false,

                mainEmail: "",
                firstName: "",
                firstNameActive: false,
                lastName: "",
                lastNameActive: false,
                contactTypeArr: contactTypeArrData,
                selectedContactTypeObj: {
                    id: 1,
                    name: "New"
                },
                allEnquirySourceArr: [],
                selectedEnquirySourceObj: {},
                allEnquiryTypeArr: [],
                selectedEnquiryTypeObj: {},
                businessPhoneArr: [{
                    phoneNumber: "",
                    countryCode: "91",
                    isPrimary: true,
                    selectedPhoneType: {
                        id: 3,
                        name: "personal"
                    },
                    phonetype: "personal",
                    phoneActive: false
                }],
                businessEmailArr: [{
                    email: "",
                    selectedEmailType: {
                        id: 3,
                        name: "personal"
                    },
                    emailtype: "personal",
                    isPrimary: true,
                    emailActive: false
                },
                ],
                locationData: {},
                locationArr: [],
                phoneTypeArr: phoneTypeArray,
                newContactFirstName: "",
                newContactFirstNameActive: false,
                newContactLastName: "",
                newContactLastNameActive: false,
                newContactPhoneNumber: "",
                newContactPhoneNumberActive: false,
                searchContactName: "",
                searchContactNameActive: false,
                contactList: [],
                searchContactLoader: false,
                selectedContactObj: {},
                address: "",
                addressActive: false,
                employeeNum: "",
                employeeNumActive: false,
                notes: "",
                notesActive: false,
                productNameArr: [],
                productArr: [],
                productData: [
                    {
                        selectedProductName: {},
                        productArr: [],
                        hierarchyDataId: "",
                        hierarchyTypeId: "",
                    }
                ],
                addContactLoader: false,
                account: "",
                accountListLoader: false,
                isNewAccount: false,
                newAccNumber: "",
                accountList: [],
                organizationLoader: false,
                selectedOrganization: {},
                contactId: "",
                organizationId: "",
                organizationName: "",
            },
            allData: {},
        };
    }

    componentDidMount = async () => {
        await this.getLandingData();
    }

    _onBack = () => {
        this.props.navigation.goBack()
    }
    getLandingData = async () => {
        await this.getEnquiryList();
        await this.fetchNewContactList();

        if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
            await this.getEnquiryDetails();
        }
        this.setState({
            pageLoader: false
        })
    }

    getHierarcyTypeIdAndDataId = (data) => {
        if (data.length > 0) {
            const result = data.reduce((acc, curr) => {
                if (!acc || curr.slNo > acc.slNo) {
                    return curr;
                } else {
                    return acc;
                }
            }, null);
            return result
        }
    }

    setProductArr = (productData) => {
        let productMainArr = [];
        if (productData.length > 0) {
            for (let i = 0; i < productData.length; i++) {
                let modObj = {}
                modObj["selectedProductName"] = {}
                modObj["productArr"] = productData[i]
                modObj["hierarchyDataId"] = this.getHierarcyTypeIdAndDataId(productData[i]).id
                modObj["hierarchyTypeId"] = this.getHierarcyTypeIdAndDataId(productData[i]).typeId

                productMainArr.push(modObj)
            }
        }

        return productMainArr

    }

    getEnquiryDetails = async () => {
        let reqData = {
            enquiryId: this.props.route.params.data.enqueryId.toString()
        }
        let responseData = await MiddlewareCheck("fetchEnquiryDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedApiResponse = modifyResp(responseData.response);
                this.state.allPageData.contactId = modifiedApiResponse.contactId;
                this.state.allPageData.selectedContactTypeObj.id = 2;
                this.state.allPageData.selectedContactObj.id = modifiedApiResponse.contactId;
                this.state.allPageData.businessPhoneArr = modifiedApiResponse.phoneNumber;
                this.state.allPageData.businessEmailArr = modifiedApiResponse.emailArr;
                this.state.allPageData.newContactFirstName = modifiedApiResponse.ownerFirstName;
                this.state.allPageData.newContactLastName = modifiedApiResponse.ownerLastName;

                this.state.allPageData.mainEmail = modifiedApiResponse.ownerEmail;
                this.state.allPageData.selectedEnquirySourceObj.id = modifiedApiResponse.enquerySourceId;
                this.state.allPageData.selectedEnquiryTypeObj.id = modifiedApiResponse.enquerySourceTypeId;
                //
                this.state.allPageData.account = modifiedApiResponse.organizationName
                this.state.allPageData.organizationName = modifiedApiResponse.organizationName
                this.state.allPageData.organizationId = modifiedApiResponse.organizationId
                this.state.allPageData.locationArr = modifiedApiResponse.location
                this.state.allPageData.address = modifiedApiResponse.address
                this.state.allPageData.locationData.hierarchyTypeId = modifiedApiResponse.location.length > 0 ? this.getHierarcyTypeIdAndDataId(modifiedApiResponse.location).typeId : ""
                this.state.allPageData.locationData.hierarchyDataId = modifiedApiResponse.location.length > 0 ? this.getHierarcyTypeIdAndDataId(modifiedApiResponse.location).id : ""

                this.state.allPageData.employeeNum = modifiedApiResponse.numberOfEmployee;
                this.state.allPageData.productData = this.setProductArr(modifiedApiResponse.productHierarchyArr);
                this.state.allPageData.notes = modifiedApiResponse.notes
            }
        }
    }

    fetchNewContactList = async () => {
        let reqData = {
            "limit": "50",
            "offset": "0",
            "searchName": "",
            "searchTextName": "",
            "searchTextPhone": "",
            "searchTextEmail": "",
            "searchContactTyp": "",
            "searchContactStatus": "",
            "searchFrom": "",
            "searchTo": "",
            "hierarchyDataIdArr": [],
            "view": "list",
            "isDownload": "0",
            "masterMdouleTypeId": "20"
        }
        this.state.allPageData.searchContactLoader = true;
        this.setState({ allPageData: this.state.allPageData })
        let responseData = await MiddlewareCheck("fetchNewContactList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifyContactData(responseData.response)
                this.state.allPageData.contactList = modData.list;
                this.setState({ allPageData: this.state.allPageData })
            }
        }
        this.state.allPageData.searchContactLoader = false;
        this.setState({ allPageData: this.state.allPageData })
    }

    getEnquiryList = async () => {
        let responseData = await MiddlewareCheck("getEnquiryLandingData", this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let enquirySourceData = enquirySourceModifyData(responseData.response);
                this.state.allPageData.allEnquirySourceArr = modifyEnquirySourceArrData(enquirySourceData.enquirySourceList);
                this.state.allPageData.allEnquiryTypeArr = modifyEnquiryTypeArrData(enquirySourceData.enquiryTypeList);
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
    }

    getOrganizationList = async () => {
        let dataReq = {
            "limit": 50,
            "offset": "0",
            "searchName": "",
            "searchFrom": "",
            "searchTo": "",
            "searchTextOrgName": "",
            "searchTextOwnerName": "",
            "searchTextContactType": "",
            "searchTextState": "",
            "searchTextPhone": "",
            "status": "",
            "isDownload": "0",
            "view": "list",
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("fetchOrganizationList", dataReq, this.props);

        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let contactData = orgModifyData(responseData.response);
                this.state.allPageData.accountList = contactData;
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }
    }

    onSaveDataFromEnquiryInfo = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })
        if (childData.type == "next") {
            this.setState({
                isEnqueryInfoCompleted: true,
                isBusinessInfoCompleted: true
            })
        }
    }

    onSaveDataFromBusinessInfo = async (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData,
        })

        if (childData.type == "previous") {
            this.setState({
                isEnqueryInfoCompleted: true,
                isBusinessInfoCompleted: false,
                isAssignInfoCompleted: false
            })
        }
        if (childData.type == "next") {
            this.setState({
                isBusinessInfoCompleted: true,
                isAssignInfoCompleted: true,
                // pageLoader: true
            })
        }
    }

    onSaveDataFromAssignInfo = async (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData,
        })

        if (childData.type == "previous") {
            this.setState({
                isEnqueryInfoCompleted: true,
                isBusinessInfoCompleted: true,
                isAssignInfoCompleted: false
            })
        }

        if (childData.type == "next") {
            this.setState({
                isAssignInfoCompleted: true,
                pageLoader: true
            })

            this.state.allData["enquiryPage"] = "crm";

            if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
                this.state.allData["enquiryId"] = this.props.route.params.data.enqueryId;
                let responseData = await MiddlewareCheck("updateEnquiryNewDetails", this.state.allData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message);
                        this.props.navigation.goBack();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }

            } else {
                let responseData = await MiddlewareCheck("addNewEnquiry", this.state.allData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message);
                        this.props.navigation.replace("CrmEnquiryList");
                    }
                }
            }

            this.setState({ pageLoader: false })
        }
    }

    progressBarSection = () => {
        return (
            <View>
                <View style={{ alignItems: "flex-start" }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this._onBack}
                        style={{ justifyContent: "center", alignItems: "center", padding: 10 }}
                    >
                        <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerSection}>
                    <Text style={styles.headerTxt}>{this.props.route.params.type == "edit" ? "Update Enquiry" : "New Enquiry"}</Text>
                </View>
                <View style={styles.progessSection}>


                    <View style={[styles.progressMainView, { marginTop: 3 }]}>
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isEnqueryInfoCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isEnqueryInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 1 ? styles.numTextActive : this.state.isEnqueryInfoCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>

                        <View style={this.state.isEnqueryInfoCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isBusinessInfoCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isBusinessInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 2 ? styles.numTextActive : this.state.isBusinessInfoCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>

                        <View style={this.state.isBusinessInfoCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isAssignInfoCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isAssignInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isAssignInfoCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>

                    </View>
                </View>
            </View>

        )
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                {this.state.pageLoader ?
                    <>
                        <Loader />
                    </>
                    :
                    <>
                        {this.progressBarSection()}

                        {this.state.pageNum == 1 ?
                            <EnquiryDetails {...this.props} onSaveDataToParent={this.onSaveDataFromEnquiryInfo} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 2 ?
                            <BusinessDetails {...this.props} onSaveDataToParent={this.onSaveDataFromBusinessInfo} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 3 ?
                            <AssigneeDetails {...this.props} onSaveDataToParent={this.onSaveDataFromAssignInfo} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }
                    </>
                }
            </SafeAreaView>
        )
    }
}

export default CreateAndEditEnquiry




