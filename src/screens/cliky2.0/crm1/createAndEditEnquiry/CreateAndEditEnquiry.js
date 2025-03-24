import React from "react";
import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,

} from "react-native";
import styles from "./Style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../../redux/Sales360Action';

import { MiddlewareCheck } from "../../../../services/middleware";
import { ErrorCode } from "../../../../services/constant";
import { GetUserData, Toaster } from "../../../../services/common-view-function";
import { CustomStyle } from "../../../style";
import { ImageName } from "../../../../enums";
import { BusinessDetails, EnquiryDetails } from "./sub-component";
import { assignedEmployeeModifyData, districtModifyData, enquirySourceModifyData, modifyAssignedEmployeeArrData, modifyDistrictArrData, modifyEmployeeTypeArrData, modifyEnquirySourceArrData, modifyEnquiryTypeArrData, modifyOrganizationArrData, modifyResp, modifyStateArrData, modifyZoneArrData, organizationModifyData, stateModifyData, zoneModifyData } from "./Function";
import { Loader } from "../../../../shared";

const businessTypeArr = [
    {
        id: "0",
        name: "New",
        check: false
    },
    {
        id: "1",
        name: "Existing",
        check: false
    }
]


class CreateAndEditEnquiry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            pageNum: 1,
            allData: {},
            allPageData: {
                allEnquirySourceArr: [],
                selectedEnquirySourceObj: {},
                allEnquiryTypeArr: [],
                selectedEnquiryTypeObj: {},
                ownerName: "",
                ownerNameActive: false,
                ownerFirstName: "",
                ownerFirstNameActive: false,
                ownerLastName: "",
                ownerLastNameActive: false,
                ownerPhoneArr: [{ phone: "", phoneActive: false }],
                ownerEmailArr: [
                    { email: "", emailActive: false },
                ],
                address: "",
                addressActive: false,
                approvedStatus: "",

                //business details
                businessId:"",
                businessName: "",
                businessNameActive: false,
                businessAddress: "",
                businessAddressActive: false,
                businessPhoneArr: [{ phone: "", phoneActive: false }],
                businessEmailArr: [
                    { email: "", emailActive: false },
                ],
                locationData: {},
                locationArr: [],
                stateArr: [],
                selectedStateObj: {},
                districtArr: [],
                selectedDistrictObj: {},
                zoneArr: [],
                selectedZoneObj: {},
                city: "",
                cityActive: false,
                pincode: "",
                pincodeActive: false,
                notes: "",
                notesActive: false,
                address: "",
                addressActive: false,
                countryId: "",
                allBusinessTypeArr: businessTypeArr,
                selectedBusinessTypeObj: {},
                allBusinessNameArr: [],
                selectedBusinessNameObj: {},

                //assignee details
                assignName: "",
                assignNameActive: false,
                allAssignedEmployeeArr: [],
                selectedAssignedEmployeeObj: {},
                allEmployeeTypeArr: [],
                selectedEmployeeTypeObj: {},

                assignedDatePicker: false,
                assignedDateObj: {
                    rawDate: new Date(),
                    assignedDate: ""
                },


                stateLoader: false,
                distLoader: false,
                zoneLoader: false,
                submitLoader: false
            },
            isEnqueryInfoCompleted: true,
            isBusinessInfoCompleted: false,
            isAssignInfoCompleted: false,
        };
    }

    componentDidMount = async () => {
        await this.getLandingData();
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    getLandingData = async () => {
        let userData = await GetUserData.getAllUserData();
        if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
            await this.getEnquiryDetails(userData.countryId);
        }

        await this.getEnquiryList();
        await this.getBusinessNameData();
        this.setState({
            pageLoader: false
        })
    }

    getEnquiryDetails = async (countryId) => {
        let reqData = {
            enquiryId: this.props.route.params.data.enqueryId.toString()
        }
        let responseData = await MiddlewareCheck("getEnquiryDetails", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let respArr = responseData.response;
                if (respArr && respArr.length > 0) {
                    let modifiedApiResponse = modifyResp(responseData.response[0]);
                    this.state.allPageData.businessId = modifiedApiResponse.businessId
                    this.state.allPageData.selectedEnquirySourceObj.id = modifiedApiResponse.enquerySourceId;
                    this.state.allPageData.selectedEnquiryTypeObj.id = modifiedApiResponse.enquerySourceTypeId;
                    this.state.allPageData.ownerFirstName = modifiedApiResponse.ownerFirstName;
                    this.state.allPageData.ownerLastName = modifiedApiResponse.ownerLastName;
                    this.state.allPageData.ownerPhoneArr = modifiedApiResponse.phoneNumberArr;
                    this.state.allPageData.ownerEmailArr = modifiedApiResponse.emailArr;
                    this.state.allPageData.address = modifiedApiResponse.address;
                    this.state.allPageData.approvedStatus = modifiedApiResponse.approvedStatus.toString()
                    // businessDetails
                    this.state.allPageData.businessName = modifiedApiResponse.businessName;
                    this.state.allPageData.businessPhoneArr = modifiedApiResponse.businessPhoneArr;
                    this.state.allPageData.businessEmailArr = modifiedApiResponse.businessEmailArr;
                    this.state.allPageData.businessAddress = modifiedApiResponse.businessAddress;
                    this.state.allPageData.locationArr = modifiedApiResponse.hierarchyDataIdArr;
                    this.state.allPageData.locationData = { "hierarchyDataId": modifiedApiResponse.hierarchyDataId, "hierarchyTypeId": modifiedApiResponse.hierarchyTypeId }
                    
                    this.state.allPageData.city = modifiedApiResponse.cityVillage;
                    this.state.allPageData.pincode = modifiedApiResponse.pinCode;
                    this.state.allPageData.notes = modifiedApiResponse.notes;
                    // assignee details
                    this.state.allPageData.selectedEmployeeTypeObj.id = modifiedApiResponse.empTypeId;
                    // this.state.allPageData.selectedAssignedEmployeeObj.id = modifiedApiResponse.assignTo;
                    this.state.allPageData.assignedDateObj.assignedDate = modifiedApiResponse.assignDatetime;
                    await this.getAssignedEmployeeData(modifiedApiResponse, countryId);
                }
                this.setState({
                    allPageData: this.state.allPageData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    getAssignedEmployeeData = async (value, countryId) => {
        this.setState({ assignedLoader: true })
        let reqData = {
            "countryId": countryId,
            "stateId": this.state.allPageData.selectedStateObj.id,
            "designationId": value.empTypeId ? value.empTypeId : "",
            "zoneId": this.state.allPageData.selectedZoneObj.id
        }
        let responseData = await MiddlewareCheck("getAssignedEmployeeData", reqData, this.props);

        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let assignedEmployeeData = assignedEmployeeModifyData(responseData);
                this.state.allPageData.allAssignedEmployeeArr = modifyAssignedEmployeeArrData(assignedEmployeeData.assignedEmployeeList);
                this.state.allPageData.selectedAssignedEmployeeObj.id = value.assignTo
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }
        this.setState({
            assignedLoader: false
        })
    }


    getExistingDistrictData = async (value, userData) => {
        let reqData = {
            stateId: value.stateId
        }

        let responseData = await MiddlewareCheck("getaDistrictData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let districtData = districtModifyData(responseData);
                this.state.allPageData.districtArr = modifyDistrictArrData(districtData.districtList)
                this.state.allPageData.selectedDistrictObj.id = value.cityId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
    }

    getExistingZoneData = async (value, userData) => {
        let reqData = {
            cityId: value.cityId
        }

        let responseData = await MiddlewareCheck("getaZoneData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let zoneData = zoneModifyData(responseData);
                this.state.allPageData.zoneArr = modifyZoneArrData(zoneData.zoneList)
                this.state.allPageData.selectedZoneObj.id = value.zoneId;
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ zoneLoader: false })
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    getEnquiryList = async () => {
        let responseData = await MiddlewareCheck("getEnquiryLandingData", this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let enquirySourceData = enquirySourceModifyData(responseData.response);
                this.state.allPageData.allEnquirySourceArr = modifyEnquirySourceArrData(enquirySourceData.enquirySourceList);
                this.state.allPageData.allEnquiryTypeArr = modifyEnquiryTypeArrData(enquirySourceData.enquiryTypeList);
                this.state.allPageData.allEmployeeTypeArr = modifyEmployeeTypeArrData(enquirySourceData.employeeTypeList);
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
    }

    getBusinessNameData = async () => {
        let responseData = await MiddlewareCheck("getExistingOrganization", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let organizationData = organizationModifyData(responseData);
                this.state.allPageData.allBusinessNameArr = modifyOrganizationArrData(organizationData.organizationList);
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ businessTypeLoader: false })
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
                pageLoader: true
            })
            this.state.allData["enquiryPage"] = "crm";
            if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
                this.state.allData["enquiryId"] = this.props.route.params.data.enqueryId;
                this.state.allData["approvedStatus"] = this.state.allPageData.approvedStatus
                this.state.allData["isUpdate"] = true
                this.state.allData["businessId"] = this.state.allPageData.businessId
                this.state.allData["brandId"] = "0"
                let responseData = await MiddlewareCheck("updateEnquiryDetails", this.state.allData, this.props);

                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message);
                        this.props.navigation.goBack();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }

            } else {
                let responseData = await MiddlewareCheck("addEnquiryData", this.state.allData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message);
                        this.props.navigation.goBack();
                    }
                }
            }

            this.setState({ pageLoader: false })
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

            // this.state.allData["enquiryPage"] = "crm";

            // if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
            //     this.state.allData["enquiryId"] = this.props.route.params.data.enqueryId;
            //     let responseData = await MiddlewareCheck("updateEnquiryDetails", this.state.allData, this.props);
            //     if (responseData === false) {
            //         this._onNetworkError();
            //     } else {
            //         if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            //             Toaster.ShortCenterToaster(responseData.message);
            //             this.props.navigation.goBack();
            //         } else {
            //             Toaster.ShortCenterToaster(responseData.message)
            //         }
            //     }

            // } else {
            //     let responseData = await MiddlewareCheck("addEnquiryData", this.state.allData, this.props);
            //     if (responseData === false) {
            //         this._onNetworkError();
            //     } else {
            //         if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            //             Toaster.ShortCenterToaster(responseData.message);
            //             this.props.navigation.goBack();
            //         }
            //     }
            // }

            // this.setState({ pageLoader: false })
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

                        {/* <View style={this.state.isBusinessInfoCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isAssignInfoCompleted ? styles.numberCircleCompleted : styles.numberCircle}>
                                <Image source={this.state.isAssignInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isAssignInfoCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View> */}

                    </View>
                </View>
            </View>

        )
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                {this.state.pageLoader ? <>
                    <Loader />
                </> : <>
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

                    {/* {this.state.pageNum == 3 ?
                        <AssigneeDetails {...this.props} onSaveDataToParent={this.onSaveDataFromAssignInfo} allData={this.state.allData} allPageData={this.state.allPageData} />
                        :
                        null
                    } */}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAndEditEnquiry);
