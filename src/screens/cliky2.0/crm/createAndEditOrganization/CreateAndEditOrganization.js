import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity
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
    AdditionalInfo,
    BusinessAddressDetails,
    BusinessContactDetails,
    CurrentAndCompetitor,
    Description,
    PersonalContactDetails,
    VisibilityPermission
} from "./sub-component";
import { Loader } from "../../../../shared";
import { MiddlewareCheck } from "../../../../services/middleware";
import { ErrorCode } from "../../../../services/constant";
import { districtModifyData, enquirySourceModifyData, modifyDistrictArrData, modifyDomainData, modifyEnquiryTypeArrData, modifyOrgData, modifyProductData, modifyResp, modifyStateArrData, modifyZoneArrData, stateModifyData, userModifyData, zoneModifyData } from "./Function";
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


const contactTypeArray = [
    {
        id: "1",
        name: "New",
        check: false
    },
    {
        id: "2",
        name: "Existing",
        check: false
    }
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


class CreateAndEditOrganization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            pageNum: 1,
            allData: {},
            allPageData: {
                contactId: "",
                contactList: [],
                //business contact details
                phoneTypeArr: phoneTypeArray,
                organizationName: "",
                organizationNameActive: false,
                ownerName: "",
                ownerNameActive: false,
                businessPhoneArr: [{
                    phoneNumber: "",
                    countryCode: "91",
                    isPrimary: true,
                    selectedPhoneType: {
                        id: 3,
                        name: "Personal"
                    },
                    phonetype: "Personal",
                    phoneActive: false
                }],
                businessEmailArr: [{
                    email: "",
                    selectedEmailType: {
                        id: 3,
                        name: "Personal"
                    },
                    emailtype: "Personal",
                    isPrimary: true,
                    emailActive: false
                },
                ],
                businesDescription: "",
                businesDescriptionActive: false,
                annualRevenue: "",
                annualRevenueActive: false,
                noOfEmployee: "",
                noOfEmployeeActive: false,
                assignedToArr: assignedArr,
                selectedAssigedToCheck: "",
                assignedUserArr: [],
                selectedAssignedUserObj: {},

                //contact details
                contactTypeArr: contactTypeArray,
                selectedContactTypeObj: {
                    id: "1",
                    name: "New"
                },
                firstName: "",
                firstNameActive: false,
                lastName: "",
                lastNameActive: false,
                ownerPhone: "",
                ownerPhoneActive: false,
                searchContact: "",
                searchContactActive: false,
                selectedContactObj: {},

                //personal address details
                locationData: {},
                locationArr: [],


                //business address Details
                orgLocationData: {},
                orgLocationArr: [],
                businessAddress: "",
                businessAddressActive: false,

                //additional info
                website: "",
                websiteActive: false,
                selectedDomainObj: {},
                domainArr: [],
                subDomainArr: [],
                selectedSubDomainObj: {},
                parentOrg: "",
                parentOrgActive: false,
                parentOrgArr: [],
                selectedParentOrgObj: {},

            },
            isBusinessContactDetailsCompleted: true,
            isPersonalContactDetailsCompleted: false,
            isBusinessAddressDetailsCompleted: false,
            isDescriptionCompleted: false,
            isCurrentAndCompetitorCompleted: false,
            isVisibilityPermissionCompleted: false,

            userLoader: false,
        };
    }

    componentDidMount = async () => {
        this.getDropdownData();
    }

    getDropdownData = async () => {
        await this.getLandingData();
    }

    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    getLandingData = async () => {
        await this.getParentOrganization()
        await this.getAllDomain()
        if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
            await this.getOrganizationDetails();
        }
        this.setState({
            pageLoader: false
        })
    }

    getParentOrganization = async () => {
        this.setState({ searchableContactLoader: true })

        let reqData = {
            "limit": 50,
            "offset": "0",
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
            "searchName": "",
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("fetchOrganizationList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifyOrgData(responseData.response)
                this.state.allPageData.parentOrgArr = modData.list
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ searchableContactLoader: false })

    }
    getAllDomain = async () => {
        let reqData = {
            "limit": 100,
            "offset": "0",
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("getAllDomain", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifyDomainData(responseData.response)
                this.state.allPageData.domainArr = modData.list
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
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

    getOrganizationDetails = async () => {
        let reqData = {
            organizationId: this.props.route.params.data.organizationId.toString()
        }
        let responseData = await MiddlewareCheck("fetchOrganizationDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedApiResponse = modifyResp(responseData.response);
                this.state.allPageData.organizationName = modifiedApiResponse.organizationName;
                this.state.allPageData.ownerName = modifiedApiResponse.ownerName;
                this.state.allPageData.businessPhoneArr = modifiedApiResponse.phoneNumber;
                this.state.allPageData.businessEmailArr = modifiedApiResponse.emailArr;
                this.state.allPageData.annualRevenue = modifiedApiResponse.anualRevenue;
                this.state.allPageData.noOfEmployee = modifiedApiResponse.numberOfEmployee;
                //contact
                this.state.allPageData.selectedContactTypeObj.id = 2;
                this.state.allPageData.searchContact = modifiedApiResponse.contactName;
                this.state.allPageData.selectedContactObj.id = modifiedApiResponse.contactId;
                //address
                this.state.allPageData.businessAddress = modifiedApiResponse.address;
                this.state.allPageData.orgLocationArr = modifiedApiResponse.location
                this.state.allPageData.orgLocationData.hierarchyTypeId = modifiedApiResponse.location.length > 0 ? this.getHierarcyTypeIdAndDataId(modifiedApiResponse.location).typeId : ""
                this.state.allPageData.orgLocationData.hierarchyDataId = modifiedApiResponse.location.length > 0 ? this.getHierarcyTypeIdAndDataId(modifiedApiResponse.location).id : ""
                //additional
                this.state.allPageData.website = modifiedApiResponse.website;
                this.state.allPageData.selectedDomainObj.id = modifiedApiResponse.domain;
                this.state.allPageData.selectedSubDomainObj.id = modifiedApiResponse.sub_domain;
                this.state.allPageData.selectedParentOrgObj.id = modifiedApiResponse.parent_org_id;
            }
        }
    }

    onSaveDataFromBusinessContactDetails = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })
        if (childData.type == "next") {
            this.setState({
                isBusinessContactDetailsCompleted: true,
                isPersonalContactDetailsCompleted: true

            })
        }
    }

    onSaveDataFromPersonalContactDetails = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })
        if (childData.type == "next") {
            this.setState({
                isPersonalContactDetailsCompleted: true,
                isBusinessAddressDetailsCompleted: true
            })
        }
        if (childData.type == "previous") {
            this.setState({
                isBusinessContactDetailsCompleted: true,
                isPersonalContactDetailsCompleted: false,
                isBusinessAddressDetailsCompleted: false,
                isDescriptionCompleted: false,
                isCurrentAndCompetitorCompleted: false,
                isVisibilityPermissionCompleted: false,
            })
        }
    }

    onSaveDataFromBusinessAddressDetails = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })
        if (childData.type == "next") {
            this.setState({
                isPersonalContactDetailsCompleted: true,
                isBusinessAddressDetailsCompleted: true,
                isDescriptionCompleted: true,
            })
        }
        if (childData.type == "previous") {
            this.setState({
                isBusinessContactDetailsCompleted: true,
                isPersonalContactDetailsCompleted: true,
                isBusinessAddressDetailsCompleted: false,
                isDescriptionCompleted: false,
                isCurrentAndCompetitorCompleted: false,
                isVisibilityPermissionCompleted: false,
            })
        }
    }

    onSaveDataFromAdditionalInfo = async (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData,
        })
        if (childData.type == "next") {
            this.setState({
                isBusinessAddressDetailsCompleted: true,
                isDescriptionCompleted: true,
                pageLoader: true
            })

            if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
                this.state.allData["organizationId"] = this.props.route.params.data.organizationId;
                let responseData = await MiddlewareCheck("updateNewOrganization", this.state.allData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message)
                        this.props.navigation.replace("OrganizationList");
                    }
                }

            } else {
                let responseData = await MiddlewareCheck("createNewOrganization", this.state.allData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message)
                        // this.props.navigation.goBack();
                        this.props.navigation.replace("OrganizationList");

                    }
                }
            }

            this.setState({ pageLoader: false })
        }
        if (childData.type == "previous") {
            this.setState({
                isBusinessContactDetailsCompleted: true,
                isPersonalContactDetailsCompleted: true,
                isBusinessAddressDetailsCompleted: true,
                isDescriptionCompleted: false,
                isCurrentAndCompetitorCompleted: false,
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
                isDescriptionCompleted: true,
                isCurrentAndCompetitorCompleted: true,
                isVisibilityPermissionCompleted: true
            })
        }
        if (childData.type == "previous") {
            this.setState({
                isBusinessContactDetailsCompleted: true,
                isPersonalContactDetailsCompleted: true,
                isBusinessAddressDetailsCompleted: true,
                isDescriptionCompleted: true,
            })
        }
    }

    onSaveDataFromVisibilityPermission = async (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })
        if (childData.type == "next") {
            this.setState({
                isCurrentAndCompetitorCompleted: true,
                isVisibilityPermissionCompleted: true,
                pageLoader: true
            })

            let loc = await LocationData.fetchCurrentLocation()
            this.state.allData["orgLattitude"] = loc.latitude;
            this.state.allData["orgLongitude"] = loc.longitude;
            this.state.allData["latitude"] = loc.latitude;
            this.state.allData["longitude"] = loc.longitude;

            this.state.allData["geoLocation"] = "";
            this.state.allData["orgGeoLocation"] = "";
            // this.state.allData["assignTo"] = "0";
            // this.state.allData["assignType"] = "0";
            // this.state.allData["permissionTo"] = "0";


            if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
                this.state.allData["organizationId"] = this.props.route.params.data.organizationId;
                this.state.allData["competitors"] = this.state.allData.productArr;
                this.state.allData["contactId"] = this.state.allPageData.contactId

                let responseData = await MiddlewareCheck("updateOrganization", this.state.allData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message)
                        this.props.navigation.goBack();
                    }
                }

            } else {
                let responseData = await MiddlewareCheck("addOrganization", this.state.allData, this.props);
                if (responseData) {
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
                isBusinessContactDetailsCompleted: true,
                isPersonalContactDetailsCompleted: true,
                isBusinessAddressDetailsCompleted: true,
                isDescriptionCompleted: true,
                isCurrentAndCompetitorCompleted: true,
                isVisibilityPermissionCompleted: false
            })
        }
    }

    getCompetetorArray = (Arr) => {
        let modArr = [];
        if (Arr && Arr.length > 0) {
            for (let i = 0; i < Arr.length; i++) {
                let modObj = {};
                modObj["selectedProductName"] = this.getProductObj(Arr[i].productId);
                modObj["productDesc"] = Arr[i].productDescription;
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
                    <Text style={styles.headerTxt}>{this.props.route.params.type == "add" ? "New Account" : "Update Account"}</Text>
                </View>
                <View style={styles.progessSection}>
                    <View style={[styles.progressMainView, { marginTop: 3 }]}>
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isBusinessContactDetailsCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isBusinessContactDetailsCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 1 ? styles.numTextActive : this.state.isBusinessContactDetailsCompleted ? styles.numTextCompleted : styles.numText}>

                                </Image>
                            </View>
                        </View>

                        <View style={this.state.isBusinessContactDetailsCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isPersonalContactDetailsCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isPersonalContactDetailsCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 2 ? styles.numTextActive : this.state.isPersonalContactDetailsCompleted ? styles.numTextCompleted : styles.numText}>

                                </Image>
                            </View>
                        </View>

                        <View style={this.state.isPersonalContactDetailsCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isBusinessAddressDetailsCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isBusinessAddressDetailsCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isBusinessAddressDetailsCompleted ? styles.numTextCompleted : styles.numText}>

                                </Image>
                            </View>
                        </View>

                        <View style={this.state.isBusinessAddressDetailsCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isDescriptionCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isDescriptionCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 4 ? styles.numTextActive : this.state.isDescriptionCompleted ? styles.numTextCompleted : styles.numText}>

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
                    :

                    <React.Fragment>
                        {this.progressBarSection()}

                        {this.state.pageNum == 1 ?
                            <BusinessContactDetails {...this.props} onSaveDataToParent={this.onSaveDataFromBusinessContactDetails} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 2 ?
                            <PersonalContactDetails {...this.props} onSaveDataToParent={this.onSaveDataFromPersonalContactDetails} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 3 ?
                            <BusinessAddressDetails {...this.props} onSaveDataToParent={this.onSaveDataFromBusinessAddressDetails} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 4 ?
                            <AdditionalInfo {...this.props} onSaveDataToParent={this.onSaveDataFromAdditionalInfo} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }


                    </React.Fragment>
                }



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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAndEditOrganization);


