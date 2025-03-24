import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { Dimension, ImageName } from "../../../../enums";
import styles from "./Style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../redux/Sales360Action';
import { CustomStyle } from "../../../style";
import {
    PersonalAndContactDetails,
    PersonalAddressDetails,
    AdditionalDetails
} from "./sub-component";
import { ErrorCode } from "../../../../services/constant";
import { customerModifyData, enquirySourceModifyData, modifyBrandArr, modifyDistrictArrData, modifyEnquiryTypeArrData, modifyPlatformData, modifyProductData, modifyResp, modifyStateArrData, modifyStatgeArr, modifyStatusData, modifyUserData, modifyZoneArrData, orgModifyData, sourceTypeModifyData, stateModifyData, userModifyData, zoneModifyData } from "./Function";
import { MiddlewareCheck } from "../../../../services/middleware";
import { Loader } from "../../../../shared";
import { GetUserData, Toaster } from "../../../../services/common-view-function";

const assignedArr = [
    {
        id: 1,
        name: "Self",
        check: false
    },
    {
        id: 2,
        name: "Subordinate",
        check: false
    },
]
const allType = [
    {
        id: 1,
        name: "New",
        check: false
    },
    {
        id: 2,
        name: "Existing",
        check: false
    },
]
const currencyArrData = [
    {
        id: 1,
        name: "\u20B9 Rupees",
        shortName: "Rupees",
        check: false
    },
    {
        id: 2,
        name: "$ Dollar",
        shortName: "Dollar",
        check: false
    },
]


const probabilityArrdata = [
    {
        id: 20,
        name: "20%",
        value: "20",
        check: false
    },
    {
        id: 40,
        name: "40%",
        value: "40",
        check: false
    },
    {
        id: 60,
        name: "60%",
        value: "60",
        check: false
    },
    {
        id: 80,
        name: "80%",
        value: "80",
        check: false
    },
    {
        id: 100,
        name: "100%",
        value: "100",
        check: false
    },
]

class CreateAndEditLeads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "add",
            pageLoader: true,
            pageNum: 1,
            allData: {},
            allPageData: {
                editable: true,
                //personal and contact details
                contactId: "",
                organizationId: "",
                organizationName:"",

                isNewAccount: false,
                isNewOrgAccount: false,
                newContactAccNumber: "",
                newOrgAccNumber: "",
                contact: "",
                organization: "",
                selectedCustomerContactData: {},

                allTypeData: allType,
                selectedTypeData: "",
                selectedOrgTakenType: {},
                selectedContactBusinessType: {},

                contactArr: [],
                selectedContactObj: {},
                customerArr: [],
                selectedCustomerObj: {},
                organizationArr: [],
                selectedOrganizationObj: {},
                leadName: "",
                leadNameActive: false,
                lastName: "",
                lastNameActive: false,
                personalPhoneArr: [{ phone: "", phoneActive: false }],
                personalEmailArr: [
                    { email: "", emailActive: false },
                ],
                designation: "",
                designationActive: false,
                contactTypeArr: [],
                selectedContactTypeObj: {},
                leadStatusArr: [],
                selectedStatusObj: {},
                leadStageRemark: "",
                leadStageRemarkActive: false,
                leadStageArr: [],
                selectedLeadStageObj: {},
                leadSourceTypeArr: [],
                selectedSourceTypeObj: {},
                selfSubordinate: assignedArr,
                selectedSelfSubordinate: "1",
                selectedAssigedToCheck: "",
                assignedUserArr: [],
                selectedAssignedUserObj: {},

                //personal address
                locationData: {},
                locationArr: [],
                personalAddress: "",
                personalAddressActive: false,
                countryArr: this.props.Sales360Redux.allCountries,
                stateArr: [],
                districtArr: [],
                zoneArr: [],
                selectedPersonalCountryObj: {},
                selectedPersonalStateObj: {},
                selectedPersonalDistrictObj: {},
                selectedPersonalZoneObj: {},

                //additionalInfo
                leadValue: "",
                leadValueActive: false,
                currencyArr: currencyArrData,
                selectedCurrencyObj: {},
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
                fromDatePicker: false,
                fromDateObj: {
                    rawDate: new Date(),
                    fromDate: ""
                },
                probabilityArr: probabilityArrdata,
                selectedProbabilityObj: {},
                probability: "",
                leadAge: "0",
                leadAgeActive: false,
                ownLeadValue: "",
                ownLeadValueActive: false,


                //visibility
                isEveryOneCheck: false,
                isRecordCheck: false,
                isIndividualCheck: false,
                selectedPermissionUser: {},

                //loader
                existingUserLoader: false,
                userLoader: false,
                sourceLoader: false,
                ownerLoader: false,
                customerLoader: false,
                contactTypeLoader: false,

                submitLoader: false

            },

            isPersonalAndContactDetailsCompleted: true,
            isPersonalAddressDetailsCompleted: false,
            isAdditionalInfoCompleted: false,
            // isDescriptionCompleted: false,
            // isCurrentAndCompetitorCompleted: false,
            // isOnlineExistenceCompleted: false,
            // isVisibilityPermissionCompleted: false,
        };
    }

    // getOwnerList

    componentDidMount = async () => {
        await this.getLandingData();
    }

    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    getLandingData = async () => {
        this.setSelfOrSubordinate()
        await this.getCustomerList();
        await this.getOrganizationList()
        await this.getUserListData()
        await this.getContactType();
        await this.getLeadAndOpportunityStages();
        await this.getLeadSource();
        await this.getLeadStatus();
        if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
            await this.getLeadDetails();
        }

        this.setState({
            pageLoader: false
        })
    }

    setSelfOrSubordinate = () => {
        let arr = this.state.allPageData.selfSubordinate
        arr[0].check = true
        this.state.allPageData.selfSubordinate = arr
        this.setState({ allPageData: this.state.allPageData })
    }

    getUserListData = async () => {
        let reqData = {
            "searchName": "",
            "masterMdouleTypeId": "20",
        }
        this.setState({ userLoader: true })
        let responseData = await MiddlewareCheck("getAllSubordinatesOfUser", reqData, this.props);

        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            let designationData = modifyUserData(responseData.response)
            this.state.allPageData.assignedUserArr = designationData;
            this.setState({
                allPageData: this.state.allPageData,
            })

        }
        this.setState({ userLoader: false })
    }


    getLeadAndOpportunityStages = async () => {
        let responseData = await MiddlewareCheck("getSalesStage", { "moduleType": "lead", "masterMdouleTypeId": "20" }, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allPageData.leadStageArr = modifyStatgeArr(responseData.response)
                this.setState({
                    allPageData: this.state.allPageData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    setSelfSubordinateCheckBox = (assignTo, userData) => {
        let self = this.state.allPageData.selfSubordinate;
        // for (let i = 0; i < this.state.allPageData.selfSubordinate.length; i++) {
        if (assignTo == userData.userId) {
            self[0].check = true
            self[1].check = false
        } else {
            self[1].check = true
            self[0].check = false

        }
        return self
        // }
    }


    setCUrrencyType = (currencyType) => {
        let id = "";
        let arrData = this.state.allPageData.currencyArr
        for (let i = 0; i < arrData.length; i++) {
            if (currencyType == arrData[i].shortName) {
                id = arrData[i].id
            }
        }
        return id
    }

    setProductArr = (productData) => {
        let productMainArr = [];
        if (productData.length > 0) {
            for (let i = 0; i < productData.length; i++) {

                let modObj = {}

                modObj["selectedProductName"] = {}
                modObj["productArr"] = productData[i].prodhArr
                modObj["hierarchyDataId"] = productData[i].hierarchyDataId
                modObj["hierarchyTypeId"] = productData[i].hierarchyTypeId

                productMainArr.push(modObj)
            }
        }

        return productMainArr

    }

    getLeadDetails = async () => {
        let userData = await GetUserData.getUserData()
        let reqData = {
            leadId: this.props.route.params.data.leadId.toString(),
            contactType: this.props.route.params.data.contactType
        }
        let responseData = await MiddlewareCheck("fetchLeadDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedApiResponse = modifyResp(responseData.response[0]);
                this.state.allPageData.contactId = modifiedApiResponse.contactId;
                this.state.allPageData.organizationId = modifiedApiResponse.organizationId;
                this.state.allPageData.contact = modifiedApiResponse.contactFullName;

                this.state.allPageData.organization = modifiedApiResponse.organizationName;
                this.state.allPageData.organizationName = modifiedApiResponse.organizationName;

                this.state.allPageData.selectedCustomerObj.id = modifiedApiResponse.contactId;
                this.state.allPageData.selectedOrganizationObj.id = modifiedApiResponse.organizationId;
                this.state.allPageData.leadName = modifiedApiResponse.leadName
                this.state.allPageData.selectedContactTypeObj.id = modifiedApiResponse.leadType
                this.state.allPageData.selectedStatusObj.id = modifiedApiResponse.leadTypeStatus
                this.state.allPageData.selectedSourceTypeObj.id = modifiedApiResponse.leadSourceType
                this.state.allPageData.selectedLeadStageObj.id = modifiedApiResponse.leadStatus
                this.state.allPageData.leadStageRemark = modifiedApiResponse.leadStageRemarks
                this.state.allPageData.selectedSelfSubordinate = modifiedApiResponse.assignTo == userData.userId ? "1" : "2"
                this.state.allPageData.selfSubordinate = this.setSelfSubordinateCheckBox(modifiedApiResponse.assignTo, userData)
                this.state.allPageData.selectedAssignedUserObj.id = modifiedApiResponse.assignTo
                //location
                this.state.allPageData.locationArr = modifiedApiResponse.location
                this.state.allPageData.locationData.hierarchyDataId = modifiedApiResponse.hierarchyDataId
                this.state.allPageData.locationData.hierarchyTypeId = modifiedApiResponse.hierarchyTypeId
                //additional info
                this.state.allPageData.leadValue = modifiedApiResponse.leadValue.toString()
                this.state.allPageData.selectedCurrencyObj.id = this.setCUrrencyType(modifiedApiResponse.leadCurrencyType)
                this.state.allPageData.selectedCurrencyObj.shortName = modifiedApiResponse.leadCurrencyType

                this.state.allPageData.selectedCurrencyObj.shortName = modifiedApiResponse.leadCurrencyType
                this.state.allPageData.productData = this.setProductArr(modifiedApiResponse.productHierarchyArr)
                this.state.allPageData.fromDateObj.fromDate = modifiedApiResponse.assignDatetime
                this.state.allPageData.probability = modifiedApiResponse.probability

                // this.state.allPageData.selectedProbabilityObj.value = modifiedApiResponse.probability
                // this.state.allPageData.selectedProbabilityObj.id = modifiedApiResponse.probability
                this.state.allPageData.leadAge = modifiedApiResponse.leadAge
                this.state.allPageData.ownLeadValue = modifiedApiResponse.leadOwnValue

            }
        }
    }

    getLeadStatus = async () => {
        let responseData = await MiddlewareCheck("getLeadStatus", { type: "1" }, this.props);
        if (responseData === false) {
            this._onNetworkError();
        }
        else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allPageData.leadStatusArr = modifyStatusData(responseData.response)
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }
    }


    getUser = async () => {
        this.setState({ userLoader: false })
        let responseDataUser = await MiddlewareCheck("getAllUser", {}, this.props);
        if (responseDataUser === false) {
            this._onNetworkError();
        } else {
            if (responseDataUser.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let userTypeData = userModifyData(responseDataUser.response);
                this.state.allPageData.assignedUserArr = userTypeData;
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }
        this.setState({
            userLoader: false
        })
    }

    getLeadSource = async () => {
        this.setState({ sourceLoader: false })
        let responseDataSource = await MiddlewareCheck("getLeadSource", {}, this.props);
        if (responseDataSource === false) {
            this._onNetworkError();
        } else {
            if (responseDataSource.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let sourceTypeData = sourceTypeModifyData(responseDataSource.response);
                this.state.allPageData.leadSourceTypeArr = sourceTypeData;
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }
        this.setState({
            sourceLoader: false
        })
    }

    getCustomerList = async () => {
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
        this.setState({ customerLoader: false })
        let responseData = await MiddlewareCheck("fetchNewContactList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let contactData = customerModifyData(responseData.response);

                this.state.allPageData.customerArr = contactData;
                this.setState({
                    allPageData: this.state.allPageData,

                })
            }
        }
        this.setState({
            customerLoader: false
        })
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
                this.state.allPageData.organizationArr = contactData;
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }
        this.setState({
            customerLoader: false
        })
    }

    getContactType = async () => {
        this.setState({ contactTypeLoader: false })
        let responseDataContact = await MiddlewareCheck("getEnquiryLandingData", {}, this.props);
        if (responseDataContact === false) {
            this._onNetworkError();
        } else {
            if (responseDataContact.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let enquirySourceData = enquirySourceModifyData(responseDataContact.response);
                this.state.allPageData.contactTypeArr = modifyEnquiryTypeArrData(enquirySourceData.enquiryTypeList)
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }
        this.setState({
            contactTypeLoader: false
        })
    }

    onSaveDataFromPersonaAndContactDetails = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isPersonalAndContactDetailsCompleted: true,
                isPersonalAddressDetailsCompleted: true,
            })
        }

    }

    onSaveDataFromPersonalAddressDetails = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isPersonalAddressDetailsCompleted: true,
                isAdditionalInfoCompleted: true,
            })
        }
        if (childData.type == "previous") {
            this.setState({
                isPersonalAndContactDetailsCompleted: true,
                isPersonalAddressDetailsCompleted: false,
                isAdditionalInfoCompleted: false,
            })
        }
    }

    onSaveDataFromAdditionalDetails = async (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData,
        })

        if (childData.type == "next") {
            this.setState({
                isAdditionalInfoCompleted: true,
                pageLoader: true
            })

            if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
                this.state.allData["leadId"] = this.props.route.params.data.leadId;
                this.state.allData["contactType"] = this.props.route.params.data.contactType;
                let responseData = await MiddlewareCheck("updateNewLead", this.state.allData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message)
                        this.props.navigation.goBack();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)

                    }
                }

            } else {
                let responseData = await MiddlewareCheck("createNewLead", this.state.allData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message)
                        // this.props.navigation.goBack();
                        this.props.navigation.replace("LeadsList");

                    }
                }
            }
            this.setState({ pageLoader: false })
        }

        if (childData.type == "previous") {
            this.setState({
                isPersonalAndContactDetailsCompleted: true,
                isPersonalAddressDetailsCompleted: true,
                isAdditionalInfoCompleted: false,
            })
        }
    }


    _onBack = () => {
        this.props.navigation.goBack();
    }

    progressBarSection = () => {
        return (
            <View>
                <View style={{ alignItems: "flex-start" }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this._onBack}
                        style={{ padding: 10, justifyContent: "center", alignItems: "center" }}
                    >
                        <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                    </TouchableOpacity>
                </View>

                <View style={styles.headerSection}>
                    <Text style={styles.headerTxt}>{this.props.route.params.type == "edit" ? "Update Lead" : "New Lead"}</Text>
                </View>
                <View style={styles.progessSection}>
                    <View style={[styles.progressMainView, { marginTop: 3 }]}>
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isPersonalAndContactDetailsCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isPersonalAndContactDetailsCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 1 ? styles.numTextActive : this.state.isPersonalAndContactDetailsCompleted ? styles.numTextCompleted : styles.numText}>

                                </Image>
                            </View>
                        </View>

                        <View style={this.state.isPersonalAndContactDetailsCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isPersonalAddressDetailsCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isPersonalAddressDetailsCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 2 ? styles.numTextActive : this.state.isPersonalAddressDetailsCompleted ? styles.numTextCompleted : styles.numText}>

                                </Image>
                            </View>
                        </View>

                        <View style={this.state.isPersonalAddressDetailsCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isAdditionalInfoCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isAdditionalInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isAdditionalInfoCompleted ? styles.numTextCompleted : styles.numText}>

                                </Image>
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
                    <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View>
                    : <>
                        {this.progressBarSection()}

                        {this.state.pageNum == 1 ?
                            <PersonalAndContactDetails {...this.props} onSaveDataToParent={this.onSaveDataFromPersonaAndContactDetails} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 2 ?
                            <PersonalAddressDetails {...this.props} onSaveDataToParent={this.onSaveDataFromPersonalAddressDetails} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 3 ?
                            <AdditionalDetails {...this.props} onSaveDataToParent={this.onSaveDataFromAdditionalDetails} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                    </>}

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
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateAndEditLeads);


