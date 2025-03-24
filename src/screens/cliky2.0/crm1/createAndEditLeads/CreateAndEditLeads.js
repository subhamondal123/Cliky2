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
    BusinessDetails,
    Description,
    CurrentAndCompetitor,
    OnlineExistence,
    VisibilityPermission
} from "./sub-component";
import { ErrorCode } from "../../../../services/constant";
import { contactModifyData, customerModifyData, districtModifyData, enquirySourceModifyData, modifyBrandArr, modifyDistrictArrData, modifyEnquiryTypeArrData, modifyPlatformData, modifyProductData, modifyResp, modifyStateArrData, modifyStatgeArr, modifyStatusData, modifyUserData, modifyZoneArrData, orgModifyData, sourceTypeModifyData, stateModifyData, userModifyData, zoneModifyData } from "./Function";
import { MiddlewareCheck } from "../../../../services/middleware";
import { Loader } from "../../../../shared";
import { LocationData, Toaster } from "../../../../services/common-view-function";

const assignedArr = [
    {
        id: 1,
        name: "Users",
        check: true
    },
    {
        id: 2,
        name: "Groups",
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

const leadStageArr = [
    {
        id: 1,
        name: "Not Contacted",
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

                selectedCustomerContactData: {},

                allTypeData: allType,
                selectedTypeData: "",
                selectedOrgTakenType: {},
                selectedContactBusinessType: {},

                contactArr: [],
                selectedContactObj: {},
                customerArr: [],
                selectedCustomerObj: {},
                firstName: "",
                firstNameActive: false,
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
                leadStageArr: [],
                selectedLeadStageObj: {},
                leadSourceTypeArr: [],
                selectedSourceTypeObj: {},
                assignedToArr: assignedArr,
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

                //business details
                orgLocationData: {},
                orgLocationArr: [],
                organizationName: "",
                organizationNameActive: false,
                organizationArr: [],
                selectedOrganizationObj: {},
                ownerName: "",
                ownerNameActive: false,
                businessPhoneArr: [{ phone: "", phoneActive: false }],
                businessEmailArr: [
                    { email: "", emailActive: false },
                ],
                businessAddress: "",
                businessAddressActive: false,
                selectedBusinessCountryObj: {},
                selectedBusinessStateObj: {},
                selectedBusinessDistrictObj: {},
                selectedBusinessZoneObj: {},
                annualRevenue: "",
                annualRevenueActive: false,
                noOfEmployee: "",
                noOfEmployeeActive: false,

                //description
                mainDescription: "",
                mainDescriptionActive: false,
                //current competitor
                productNameArr: [],
                productData: [
                    {
                        selectedProductName: {},
                        productArr: [],
                        hierarchyDataId: "",
                        hierarchyTypeId: "",
                        productDesc: "",
                        productDescActive: false,
                        isCurrentlyCheck: true,
                        isCompetitorCheck: false
                    }
                ],
                //  onlineExistence
                imageUrl: "",
                imageName: "",
                platformName: [],
                platformData: [
                    {
                        selectedPlatformObj: {},
                        linkName: "",
                        linkNameActive: false
                    }
                ],
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
            isBusinessDetailsCompleted: false,
            isDescriptionCompleted: false,
            isCurrentAndCompetitorCompleted: false,
            isOnlineExistenceCompleted: false,
            isVisibilityPermissionCompleted: false,
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
        await this.getOwnerList();
        await this.getCustomerList();
        await this.getUserListData()
        await this.getContactType();
        await this.getLeadAndOpportunityStages();
        await this.getLeadSource();
        await this.getExistingUser();

        await this.getPlatform();
        await this.getLeadStatus();
        if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
            await this.getLeadDetails();
        }

        this.setState({
            pageLoader: false
        })
    }

    getUserListData = async (id) => {
        let reqData = {
            refDesignationId: id == undefined || id == null ? "" : id //used designationId as parameter
        }
        this.setState({ userLoader: true })
        let responseData = await MiddlewareCheck("getUserList", reqData, this.props);
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            let designationData = modifyUserData(responseData.response)
            this.state.allPageData.assignedUserArr = designationData;
            this.setState({
                allPageData: this.state.allPageData,
            })

            this.setState({ allUser: designationData })
        }
        this.setState({ userLoader: false })
    }


    getLeadAndOpportunityStages = async () => {
        let responseData = await MiddlewareCheck("getLeadOpportunityStages", { "salesStageFor": "1" }, this.props);
        if (responseData == false) {
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {

                this.state.allPageData.leadStageArr = modifyStatgeArr(responseData.data)
                this.setState({
                    allPageData: this.state.allPageData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }


    getLeadDetails = async () => {
        let reqData = {
            leadId: this.props.route.params.data.leadId.toString()
        }
        let responseData = await MiddlewareCheck("getLeadDetails", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedApiResponse = modifyResp(responseData.response[0]);
                this.state.allPageData.firstName = modifiedApiResponse.firstName;
                this.state.allPageData.lastName = modifiedApiResponse.lastName;
                this.state.allPageData.personalPhoneArr = modifiedApiResponse.phoneNumberArr;
                this.state.allPageData.personalEmailArr = modifiedApiResponse.emailArr;
                this.state.allPageData.designation = modifiedApiResponse.title;
                this.state.allPageData.selectedStatusObj.id = modifiedApiResponse.leadTypeStatusId;
                this.state.allPageData.selectedContactTypeObj.id = modifiedApiResponse.contactTypeId;
                this.state.allPageData.selectedLeadStageObj.id = modifiedApiResponse.leadStatus;
                this.state.allPageData.selectedSourceTypeObj.id = modifiedApiResponse.leadSourceType;
                this.state.allPageData.selectedAssignedUserObj.id = modifiedApiResponse.assignTo;

                this.state.allPageData.personalAddress = modifiedApiResponse.address;
                this.state.allPageData.selectedPersonalCountryObj.id = modifiedApiResponse.countryId;
                await this.getExistingStateData(modifiedApiResponse);
                await this.getExistingDistrictData(modifiedApiResponse);
                await this.getExistingZoneData(modifiedApiResponse);

                this.state.allPageData.organizationName = modifiedApiResponse.organizationName;
                this.state.allPageData.ownerName = modifiedApiResponse.ownerName;
                this.state.allPageData.businessPhoneArr = modifiedApiResponse.businessPhoneNumberArr;
                this.state.allPageData.businessEmailArr = modifiedApiResponse.businessEmailArr;
                this.state.allPageData.businessAddress = modifiedApiResponse.orgAddress;
                this.state.allPageData.selectedBusinessCountryObj.id = modifiedApiResponse.businessCountryId;
                await this.getExistingBusinessStateData(modifiedApiResponse);
                await this.getExistingBusinessDistrictData(modifiedApiResponse);
                await this.getExistingBusinessZoneData(modifiedApiResponse);
                this.state.allPageData.annualRevenue = modifiedApiResponse.anualRevenue;
                this.state.allPageData.noOfEmployee = modifiedApiResponse.numberOfEmployee;
                this.state.allPageData.mainDescription = modifiedApiResponse.description;
                this.state.allPageData.productData = await this.getCompetetorArray(modifiedApiResponse.Competitor);

                this.state.allPageData.imageName = modifiedApiResponse.profilePic;
                this.state.allPageData.platformData = await this.getProfileArray(modifiedApiResponse.Platform);
                this.state.allPageData.isIndividualCheck = modifiedApiResponse.permissionType == 4 ? true : false;
                this.state.allPageData.isRecordCheck = modifiedApiResponse.permissionType == 2 ? true : false;
                this.state.allPageData.isEveryOneCheck = modifiedApiResponse.permissionType == 1 ? true : false;
                this.state.allPageData.selectedPermissionUser.id = modifiedApiResponse.accessId;

            }
        }
    }

    getProfileArray = async (Arr) => {
        let modArr = [];

        if (Arr && Arr.length > 0) {
            for (let i = 0; i < Arr.length; i++) {
                let modObj = {};
                modObj["selectedPlatformObj"] = this.getPlatformObj(Arr[i].platformId);
                modObj["linkName"] = Arr[i].link;
                // modObj["isCurrentlyCheck"] = Arr[i].competitorType == "0" ? true : false;
                // modObj["isCompetitorCheck"] = Arr[i].competitorType == "1" ? true : false

                modArr.push(modObj)
            }
        }
        return modArr;
    }

    getPlatformObj = (productId) => {
        let modObj = {};
        let platfromArr = this.state.allPageData.platformName

        for (let i = 0; i < platfromArr.length; i++) {
            if (productId == platfromArr[i].id) {
                modObj = {
                    id: platfromArr[i].id,
                    name: platfromArr[i].name
                }
            }
        }
        return modObj;
    }

    getCompetetorArray = async (Arr) => {
        let modArr = [];

        if (Arr && Arr.length > 0) {
            for (let i = 0; i < Arr.length; i++) {
                let modObj = {};
                modObj["selectedProductName"] = this.getProductObj(Arr[i].productId);
                modObj["productDesc"] = Arr[i].description;
                modObj["isCurrentlyCheck"] = Arr[i].competitorType == "0" ? true : false;
                modObj["isCompetitorCheck"] = Arr[i].competitorType == "1" ? true : false

                modArr.push(modObj)
            }
        }
        return modArr;
    }

    getProductObj = (productId) => {

        let modObj = {};
        let productArr = this.state.allPageData.productNameArr

        for (let i = 0; i < productArr.length; i++) {
            if (productId == productArr[i].id) {
                modObj = {
                    id: productArr[i].id,
                    name: productArr[i].name
                }
            }
        }
        return modObj;
    }


    getExistingStateData = async (value) => {
        let reqData = {
            countryId: value.countryId
        }
        this.setState({ stateLoader: true })
        let responseData = await MiddlewareCheck("getaStateData", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let stateData = stateModifyData(responseData);
                this.state.allPageData.stateArr = modifyStateArrData(stateData.stateList);
                this.state.allPageData.selectedPersonalStateObj.id = value.stateId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ stateLoader: false })
    }

    getExistingDistrictData = async (value) => {
        let reqData = {
            stateId: value.stateId
        }

        let responseData = await MiddlewareCheck("getaDistrictData", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let districtData = districtModifyData(responseData);
                this.state.allPageData.districtArr = modifyDistrictArrData(districtData.districtList)
                this.state.allPageData.selectedPersonalDistrictObj.id = value.districtId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }

    }

    getExistingZoneData = async (value) => {
        let reqData = {
            cityId: value.districtId
        }

        let responseData = await MiddlewareCheck("getaZoneData", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let zoneData = zoneModifyData(responseData);
                this.state.allPageData.zoneArr = modifyZoneArrData(zoneData.zoneList)
                this.state.allPageData.selectedPersonalZoneObj.id = value.zoneId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ zoneLoader: false })
    }

    getExistingBusinessStateData = async (value) => {
        let reqData = {
            countryId: value.countryId
        }
        this.setState({ stateLoader: true })
        let responseData = await MiddlewareCheck("getaStateData", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let stateData = stateModifyData(responseData);
                this.state.allPageData.stateArr = modifyStateArrData(stateData.stateList);
                this.state.allPageData.selectedBusinessStateObj.id = value.stateId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ stateLoader: false })
    }

    getExistingBusinessDistrictData = async (value) => {
        let reqData = {
            stateId: value.stateId
        }

        let responseData = await MiddlewareCheck("getaDistrictData", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let districtData = districtModifyData(responseData);
                this.state.allPageData.districtArr = modifyDistrictArrData(districtData.districtList)
                this.state.allPageData.selectedBusinessDistrictObj.id = value.districtId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }

    }

    getExistingBusinessZoneData = async (value) => {
        let reqData = {
            cityId: value.districtId
        }

        let responseData = await MiddlewareCheck("getaZoneData", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let zoneData = zoneModifyData(responseData);
                this.state.allPageData.zoneArr = modifyZoneArrData(zoneData.zoneList)
                this.state.allPageData.selectedBusinessZoneObj.id = value.zoneId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ zoneLoader: false })
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

    getPlatform = async () => {
        let responseData = await MiddlewareCheck("getPlatform", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        }
        else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allPageData.platformName = modifyPlatformData(responseData.response)
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }
    }

    getProduct = async () => {

        let responseData = await MiddlewareCheck("getProductCategory", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allPageData.productNameArr = modifyBrandArr(responseData.data)
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    getExistingUser = async () => {
        this.setState({ existingUserLoader: false })
        let responseDataOrg = await MiddlewareCheck("getExistingOrganization", {}, this.props);
        if (responseDataOrg === false) {
            this._onNetworkError();
        } else {
            if (responseDataOrg.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let orgData = orgModifyData(responseDataOrg.response);
                this.state.allPageData.organizationArr = orgData;
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }
        this.setState({
            existingUserLoader: false
        })
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

    getOwnerList = async () => {
        let reqData = {
            "limit": "50",
            "offset": "0",
            "searchTextName": "",
        }
        this.setState({ ownerLoader: false })
        let responseData = await MiddlewareCheck("contactList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let contactData = contactModifyData(responseData.response.data);

                this.state.allPageData.contactArr = contactData;
                this.setState({
                    allPageData: this.state.allPageData,

                })
            }
        }
        this.setState({
            ownerLoader: false
        })
    }

    getCustomerList = async () => {
        let reqData = {
            "limit": "50",
            "offset": "0",
            "searchName": "",
            "isDownload": "0",
            "searchTextCustName": "",
            "searchTextCustType": "",
            "searchTextCustPhone": "",
            "searchTextCustBusinessName": "",
            "searchCustPartyCode": "",
            "searchCustVisitDate": "",
            "searchFrom": "",
            "searchTo": "",
            "status": "",
            "contactType": "",
            "phoneNo": "",
            "isProject": "0",
            "contactTypeId": "",
            "contactTypeIdArr": [],
            "isDownload": "0",
            "approvalList": "0",
            "customerAccessType": "",
            "hierarchyDataIdArr": [{ "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId, "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId }],

        }
        this.setState({ customerLoader: false })
        let responseData = await MiddlewareCheck("registrationList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let contactData = customerModifyData(responseData.response.data);

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
                isBusinessDetailsCompleted: true,
            })
        }
        if (childData.type == "previous") {
            this.setState({
                isPersonalAndContactDetailsCompleted: true,
                isPersonalAddressDetailsCompleted: false,
                isBusinessDetailsCompleted: false,
                isDescriptionCompleted: false,
                isCurrentAndCompetitorCompleted: false,
                isOnlineExistenceCompleted: false,
                isVisibilityPermissionCompleted: false,
            })
        }
    }

    onSaveDataFromBusinessDetails = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isBusinessDetailsCompleted: true,
                isDescriptionCompleted: true,
            })
        }

        if (childData.type == "previous") {
            this.setState({
                isPersonalAndContactDetailsCompleted: true,
                isPersonalAddressDetailsCompleted: true,
                isBusinessDetailsCompleted: false,
                isDescriptionCompleted: false,
                isCurrentAndCompetitorCompleted: false,
                isOnlineExistenceCompleted: false,
                isVisibilityPermissionCompleted: false,
            })
        }
    }

    onSaveDataFromDescription = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isDescriptionCompleted: true,
                isCurrentAndCompetitorCompleted: true,
            })
        }
        if (childData.type == "previous") {
            this.setState({
                isPersonalAndContactDetailsCompleted: true,
                isPersonalAddressDetailsCompleted: true,
                isBusinessDetailsCompleted: true,
                isDescriptionCompleted: false,
                isCurrentAndCompetitorCompleted: false,
                isOnlineExistenceCompleted: false,
                isVisibilityPermissionCompleted: false,
            })
        }
    }

    onSaveDataFromCurrentAndCompetitor = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })
        if (childData.type == "next") {
            this.setState({
                isCurrentAndCompetitorCompleted: true,
                isOnlineExistenceCompleted: true,
            })
        }
        if (childData.type == "previous") {
            this.setState({
                isCurrentAndCompetitorCompleted: true,
                isPersonalAndContactDetailsCompleted: true,
                isPersonalAddressDetailsCompleted: true,
                isBusinessDetailsCompleted: true,
                isDescriptionCompleted: true,
                isCurrentAndCompetitorCompleted: false,
                isOnlineExistenceCompleted: false,
                isVisibilityPermissionCompleted: false,
            })
        }
    }

    onSaveDataFromOnlineExistence = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isOnlineExistenceCompleted: true,
                isVisibilityPermissionCompleted: true
            })
        }
        if (childData.type == "previous") {
            this.setState({
                isCurrentAndCompetitorCompleted: true,
                isPersonalAndContactDetailsCompleted: true,
                isPersonalAddressDetailsCompleted: true,
                isBusinessDetailsCompleted: true,
                isDescriptionCompleted: true,
                isCurrentAndCompetitorCompleted: true,
                isOnlineExistenceCompleted: false,
                isVisibilityPermissionCompleted: false,
            })
        }
    }

    onSaveDataFromVisibilityPermission = async (childData) => {

        let randomData = Math.floor(Math.random() * 10000);


        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })
        if (childData.type == "next") {
            this.setState({
                isVisibilityPermissionCompleted: true,
                pageLoader: true
            })

            let loc = await LocationData.fetchCurrentLocation();
            this.state.allData["orgLatitude"] = loc.latitude;
            this.state.allData["orgLongitude"] = loc.longitude;
            this.state.allData["latitude"] = loc.latitude;
            this.state.allData["longitude"] = loc.longitude;
            this.state.allData["recordId"] = randomData;

            if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
                this.state.allData["leadId"] = this.props.route.params.data.leadId;
                let responseData = await MiddlewareCheck("updateLead", this.state.allData, this.props);
                if (responseData === false) {
                } else {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message)
                        this.props.navigation.goBack();
                    }
                }

            } else {
                let responseData = await MiddlewareCheck("addLead", this.state.allData, this.props);
                if (responseData === false) {
                } else {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message)
                        this.props.navigation.goBack();
                    }
                }
            }
            this.setState({ pageLoader: false })
        }
        if (childData.type == "previous") {
            this.setState({
                isCurrentAndCompetitorCompleted: true,
                isPersonalAndContactDetailsCompleted: true,
                isPersonalAddressDetailsCompleted: true,
                isBusinessDetailsCompleted: true,
                isDescriptionCompleted: true,
                isCurrentAndCompetitorCompleted: true,
                isOnlineExistenceCompleted: true,
                isVisibilityPermissionCompleted: false,
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
                            <View style={this.state.isBusinessDetailsCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isBusinessDetailsCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isBusinessDetailsCompleted ? styles.numTextCompleted : styles.numText}>

                                </Image>
                            </View>
                        </View>

                        <View style={this.state.isBusinessDetailsCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isDescriptionCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isDescriptionCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 4 ? styles.numTextActive : this.state.isDescriptionCompleted ? styles.numTextCompleted : styles.numText}>

                                </Image>
                            </View>
                        </View>

                        <View style={this.state.isDescriptionCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isCurrentAndCompetitorCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isCurrentAndCompetitorCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 5 ? styles.numTextActive : this.state.isCurrentAndCompetitorCompleted ? styles.numTextCompleted : styles.numText}>

                                </Image>
                            </View>
                        </View>

                        <View style={this.state.isCurrentAndCompetitorCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isOnlineExistenceCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isOnlineExistenceCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 6 ? styles.numTextActive : this.state.isOnlineExistenceCompleted ? styles.numTextCompleted : styles.numText}>

                                </Image>
                            </View>
                        </View>

                        <View style={this.state.isOnlineExistenceCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isVisibilityPermissionCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isVisibilityPermissionCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 7 ? styles.numTextActive : this.state.isVisibilityPermissionCompleted ? styles.numTextCompleted : styles.numText}>

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
                            <BusinessDetails {...this.props} onSaveDataToParent={this.onSaveDataFromBusinessDetails} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 4 ?
                            <Description {...this.props} onSaveDataToParent={this.onSaveDataFromDescription} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 5 ?
                            <CurrentAndCompetitor {...this.props} onSaveDataToParent={this.onSaveDataFromCurrentAndCompetitor} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 6 ?
                            <OnlineExistence {...this.props} onSaveDataToParent={this.onSaveDataFromOnlineExistence} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 7 ?
                            <VisibilityPermission {...this.props} onSaveDataToParent={this.onSaveDataFromVisibilityPermission} allData={this.state.allData} allPageData={this.state.allPageData} />
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


