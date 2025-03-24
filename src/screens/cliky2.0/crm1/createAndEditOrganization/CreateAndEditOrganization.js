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
import { districtModifyData, enquirySourceModifyData, modifyDistrictArrData, modifyEnquiryTypeArrData, modifyProductData, modifyResp, modifyStateArrData, modifyZoneArrData, stateModifyData, userModifyData, zoneModifyData } from "./Function";
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

class CreateAndEditOrganization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            pageNum: 1,
            allData: {},
            allPageData: {
                contactId: "",
                //business contact details
                organizationName: "",
                organizationNameActive: false,
                businessPhoneArr: [{ phone: "", phoneActive: false }],
                businessEmailArr: [
                    { email: "", emailActive: false },
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

                //personal contact details
                locationData: {},
                locationArr: [],
                countryArr: this.props.Sales360Redux.allCountries,
                selectedPersonalCountryObj: {},
                stateArr: [],
                selectedPersonalStateObj: {},
                districtArr: [],
                selectedPersonalDistrictObj: {},
                zoneArr: [],
                selectedPersonalZoneObj: {},
                contactTypeArr: [],
                selectedContactObj: {},
                personalPhoneArr: [{ phone: "", phoneActive: false }],
                personalEmailArr: [
                    { email: "", emailActive: false },
                ],
                personalAddress: "",
                personalAddressActive: false,
                firstName: "",
                firstNameActive: false,
                lastName: "",
                lastNameActive: false,

                //business address Details
                orgLocationData: {},
                orgLocationArr: [],
                businessAddress: "",
                businessAddressActive: false,
                selectedBusinessCountryObj: {},
                selectedBusinessStateObj: {},
                selectedBusinessDistrictObj: {},
                selectedBusinessZoneObj: {},

                //description
                mainDescription: "",
                mainDescriptionActive: false,
                //current competitor
                productObj: {},
                productArr: [],
                productNameArr: [],
                productData: [
                    {

                        selectedProductName: {},
                        productArr: [],
                        hierarchyDataId: "",
                        hierarchyTypeId: "",
                        productDesc: "",
                        productDescActive: false,
                        isCurrentlyCheck: false,
                        isCompetitorCheck: false
                    }
                ],
                //visibility
                isEveryOneCheck: false,
                isRecordCheck: false,
                isIndividualCheck: false,
                selectedPermissionUser: {},

                userLoader: false

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
        await this.getUser();
        await this.getEnquiryLandingData();
        await this.productData();
        if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
            await this.getOrganizationDetails();
        }
        this.setState({
            pageLoader: false
        })
    }

    getOrganizationDetails = async () => {
        let reqData = {
            organizationId: this.props.route.params.data.organizationId.toString()
        }
        let responseData = await MiddlewareCheck("getOrganizationDetails", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedApiResponse = modifyResp(responseData.response[0]);
                this.state.allPageData.contactId = modifiedApiResponse.contactId;
                this.state.allPageData.organizationName = modifiedApiResponse.orgName;
                this.state.allPageData.businessPhoneArr = modifiedApiResponse.phoneNumberArr;
                this.state.allPageData.businessEmailArr = modifiedApiResponse.emailArr;
                this.state.allPageData.businesDescription = modifiedApiResponse.contactDescription;
                this.state.allPageData.annualRevenue = modifiedApiResponse.orgAnualRevenue;
                this.state.allPageData.noOfEmployee = modifiedApiResponse.orgNumberOfEmployee;
                this.state.allPageData.selectedAssignedUserObj.id = modifiedApiResponse.assignTo;

                this.state.allPageData.selectedContactObj.id = modifiedApiResponse.contactTypeId;
                this.state.allPageData.firstName = modifiedApiResponse.contactFirstName;
                this.state.allPageData.lastName = modifiedApiResponse.contactLastName;
                this.state.allPageData.personalPhoneArr = modifiedApiResponse.contactphoneNumberArr;
                this.state.allPageData.personalEmailArr = modifiedApiResponse.contactemailArr;
                this.state.allPageData.personalAddress = modifiedApiResponse.contactAddress;
                this.state.allPageData.locationArr = modifiedApiResponse.hierarchyDataIdArr;
                this.state.allPageData.locationData = { "hierarchyDataId": modifiedApiResponse.hierarchyDataId, "hierarchyTypeId": modifiedApiResponse.hierarchyTypeId }

                this.state.allPageData.selectedPersonalCountryObj.id = modifiedApiResponse.contactCountryId;
                await this.getExistingStateData(modifiedApiResponse);
                await this.getExistingDistrictData(modifiedApiResponse);
                await this.getExistingZoneData(modifiedApiResponse);
                this.state.allPageData.businessAddress = modifiedApiResponse.orgAddress;
                this.state.allPageData.selectedBusinessCountryObj.id = modifiedApiResponse.orgCountryId;
                await this.getExistingBusinessStateData(modifiedApiResponse);
                await this.getExistingBusinessDistrictData(modifiedApiResponse);
                await this.getExistingBusinessZoneData(modifiedApiResponse);
                this.state.allPageData.mainDescription = modifiedApiResponse.orgDescription;

                this.state.allPageData.productData = this.getCompetetorArray(modifiedApiResponse.competitors);
                this.state.allPageData.isEveryOneCheck = modifiedApiResponse.permissionType == 1 ? true : false;
                this.state.allPageData.isRecordCheck = modifiedApiResponse.permissionType == 2 ? true : false;
                this.state.allPageData.isIndividualCheck = modifiedApiResponse.permissionType == 4 ? true : false;

                this.state.allPageData.selectedPermissionUser.id = modifiedApiResponse.permissionTo;
            }
        }
    }



    getUser = async () => {
        this.setState({ userLoader: false })
        let responseDataUser = await MiddlewareCheck("getAllUser", {}, this.props);
        if (responseDataUser) {
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


    productData = async () => {
        let responseDataProduct = await MiddlewareCheck("orgnizationLandingData", {}, this.props);
        if (responseDataProduct === false) {
            this._onNetworkError();
        }
        else {
            if (responseDataProduct.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allPageData.productNameArr = modifyProductData(responseDataProduct.response.productList)
                // let enquirySourceData = enquirySourceModifyData(responseDataProduct.response);
                this.setState({
                    allPageData: this.state.allPageData,

                })
            }
        }
    }

    getEnquiryLandingData = async () => {
        let responseData = await MiddlewareCheck("getEnquiryLandingData", this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let enquirySourceData = enquirySourceModifyData(responseData.response);
                this.state.allPageData.contactTypeArr = modifyEnquiryTypeArrData(enquirySourceData.enquiryTypeList)
                this.setState({
                    allPageData: this.state.allPageData,

                })
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

    onSaveDataFromDescription = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })
        if (childData.type == "next") {
            this.setState({
                isBusinessAddressDetailsCompleted: true,
                isDescriptionCompleted: true,
                isCurrentAndCompetitorCompleted: true,
            })
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
                isCurrentAndCompetitorCompleted: false,
                isVisibilityPermissionCompleted: false,
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
                this.state.allData["contactId"] = "0"
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
                    <Text style={styles.headerTxt}>{this.props.route.params.type == "add" ? "New Organization" : "Update Organization"}</Text>
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

                        <View style={this.state.isDescriptionCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isCurrentAndCompetitorCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isCurrentAndCompetitorCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 5 ? styles.numTextActive : this.state.isCurrentAndCompetitorCompleted ? styles.numTextCompleted : styles.numText}>

                                </Image>
                            </View>
                        </View>

                        <View style={this.state.isCurrentAndCompetitorCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isVisibilityPermissionCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isVisibilityPermissionCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 6 ? styles.numTextActive : this.state.isVisibilityPermissionCompleted ? styles.numTextCompleted : styles.numText}>

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
                            <VisibilityPermission {...this.props} onSaveDataToParent={this.onSaveDataFromVisibilityPermission} allData={this.state.allData} allPageData={this.state.allPageData} />
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


