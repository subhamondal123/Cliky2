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
    BusinessDetails,
    DatesToRemember,
    Description,
    OnlineExistence,
    PersonalAddressDetails,
    PersonalAndContactDetails
} from "./sub-component";
import { MiddlewareCheck } from "../../../../services/middleware";
import { CommonData, ErrorCode } from "../../../../services/constant";
import { modifyAllContactBusinessTypeData, modifyLandingData, modifyResp } from "./Function";
import { Loader } from "../../../../shared";
import { Toaster } from "../../../../services/common-view-function";

class CreateAndEditContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            pageNum: 1,
            allContactLanding: {},
            allData: {},
            allPageData: {
                //personal details
                allContactBusinessTypeData: [],
                selectedContactBusinessTypeData: "",
                firstName: "",
                firstNameAcive: false,
                lastName: "",
                lastNameAcive: false,
                phoneNumberArr: [
                    { phoneNumber: "", phoneNumberActive: false },
                ],
                emailArr: [
                    { emailId: "", emailActive: false },
                ],
                title: "",
                titleAcive: false,

                allContactType: [],
                selectedContactType: {},
                allStatus: CommonData.COMMON.CREATE_CONTACT.PERSONAL_AND_CONTACT_DETAILS.STATUS,
                selectedStatus: {},

                allLeadStatus: [],
                selectedLeadStatusObj: {},
                allLeadSourceType: [],
                selectedLeadSourceType: {},
                allLeadSource: [],
                selectedLeadSource: {},
                checkPhoneLoader: false,
                isPhoneExists: false,

                //contact details
                locationData: {},
                locationArr: [],
                address: "",
                addressActive: false,

                //Dates to Remember
                allDataArr: [
                    {
                        selectedOccasion: {},
                        datePicker: false,
                        dateObj: {
                            rawDate: new Date(),
                            date: ""
                        },
                        isReminder: false,
                        isYearlyRepeat: false
                    }
                ],
                //business
                orgEmailArr: [
                    { emailId: "", emailActive: false },
                ],
                orgPhoneNumberArr: [
                    { phoneNumber: "", phoneNumberActive: false },
                ],
                orgName: "",
                orgNameActive: false,
                orgAddress: "",
                orgAddressActive: false,
                annualRevenue: "",
                annualRevenueActive: false,
                numOfEmp: "",
                numOfEmpActive: false,

                //description
                description: "",
                descriptionActive: false,

                //online Existance
                imageUploadModal: false,
                profileImgLoader: false,
                imageName: "",
                imageUrl: "",
                allPlatformArr: [
                    {
                        selectedTypeObj: {},
                        link: "",
                        linkActive: false
                    }
                ]
            },
            isPersonalAndContactDetailsCompleted: true,
            isPersonalAddressDetailsCompleted: false,
            isBusinessDetailsCompleted: false,
            isDatestoRemCompleted: false,
            isDescriptionCompleted: false,
            isOnlineExistenceCompleted: false,
        };
    }

    componentDidMount() {
        this.load();
    }

    load = async () => {
        await this.getLandingData();
        if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
            await this.getContactDetails();
        }
        this.setState({
            pageloader: false
        })
    }


    getContactDetails = async () => {
        let reqData = {
            contactId: this.props.route.params.data.contactId

        }
        let responseData = await MiddlewareCheck("getContactDetailsToEdit", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedApiResponse = modifyResp(responseData.response[0], this.state.allContactLanding);
                this.state.allData = modifiedApiResponse;
                this.setState({
                    allData: this.state.allData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    getLandingData = async () => {
        this.state.allPageData.allContactBusinessTypeData = modifyAllContactBusinessTypeData(CommonData.COMMON.CREATE_CONTACT.PERSONAL_AND_CONTACT_DETAILS.CONTACT_BUSINESS_TYPE_DATA);

        this.setState({
            allPageData: this.state.allPageData,
        })
        let responseData = await MiddlewareCheck("contactLandingData", {}, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    allContactLanding: modifyLandingData(responseData.response)
                })

            }
        }
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
                isPersonalAddressDetailsCompleted: true
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
                isOnlineExistenceCompleted: true
            })
        } else {
            this.setState({
                isDescriptionCompleted: false
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
                isBusinessDetailsCompleted: true
            })
        } else {
            this.setState({
                isPersonalAddressDetailsCompleted: false
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
                isDatestoRemCompleted: true
            })
        } else {
            this.setState({
                isBusinessDetailsCompleted: false
            })
        }
    }

    onSaveDataFromDatesToRem = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isDescriptionCompleted: true
            })
        } else {
            this.setState({
                isDatestoRemCompleted: false
            })
        }
    }

    onSaveDataFromOnlineExistence = async (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isOnlineExistenceCompleted: true,
                pageloader: true
            })
            if (this.props.route.params.type !== undefined && this.props.route.params.type == "edit") {
                this.state.allData["orgId"] = this.state.allData.organizationId;
                this.state.allData["contactId"] = this.props.route.params.data.contactId;

                // let responseData = await MiddlewareCheck("updateContactDetails", reqData, this.props);
                // if (responseData === false) {
                // } else {
                //     if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                //         Toaster.ShortCenterToaster(responseData.message);
                //         this.props.route.params.onReloadPage();
                //         this.props.navigation.goBack();
                //     } else {
                //         Toaster.ShortCenterToaster(responseData.message)
                //     }
                // }
                this.setState({ pageloader: false })
            } else {

                this.state.allData["bussinessType"] = this.state.allData.selectedContactBusinessTypeData.toString()
                this.state.allData["contactTypeId"] = this.state.allData.selectedContactType.toString()
                this.state.allData["status"] = this.state.allData.selectedStatus.toString()
                this.state.allData["geoLocation"] = null
                this.state.allData["orgGeoLocation"] = null
                this.state.allData["orgLattitude"] = ""
                this.state.allData["orgLongitude"] = ""
                this.state.allData["orgNumberOfEmployee"] = this.state.allData.orgNumOfEmp
                let responseData = await MiddlewareCheck("addContactDetails", this.state.allData, this.props);
                if (responseData) {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(responseData.message);
                        this.props.navigation.goBack();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }

                this.setState({ pageloader: false })
            }
        } else {
            this.setState({
                isOnlineExistenceCompleted: false,
            })
        }
    }

    _onBack = () => {
        this.props.navigation.goBack();
    }

    progressBarSection = () => {
        return (
            <>
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
                    <Text style={styles.headerTxt}>{this.props.route.params.type == "edit" ? "Update Contact" : "New Contact"}</Text>
                </View>
                <View style={styles.progessSection}>
                    <View style={[styles.progressMainView]}>
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isPersonalAndContactDetailsCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isPersonalAndContactDetailsCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 1 ? styles.numTextActive : this.state.isPersonalAndContactDetailsCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>
                        <View style={this.state.isPersonalAndContactDetailsCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isPersonalAddressDetailsCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isPersonalAddressDetailsCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 1 ? styles.numTextActive : this.state.isPersonalAddressDetailsCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>
                        <View style={this.state.isPersonalAddressDetailsCompleted ? styles.lineViewCompleted : styles.lineView} />
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isBusinessDetailsCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isBusinessDetailsCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 2 ? styles.numTextActive : this.state.isBusinessDetailsCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>
                        <View style={this.state.isBusinessDetailsCompleted ? styles.lineViewCompleted : styles.lineView} />
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isDatestoRemCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isDatestoRemCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isDatestoRemCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>
                        <View style={this.state.isDatestoRemCompleted ? styles.lineViewCompleted : styles.lineView} />
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isDescriptionCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isDescriptionCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isDescriptionCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>
                        <View style={this.state.isDescriptionCompleted ? styles.lineViewCompleted : styles.lineView} />
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isOnlineExistenceCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isOnlineExistenceCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isOnlineExistenceCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>
                    </View>
                </View>
            </>
        )
    }

    render() {
        if (this.state.pageloader) {
            return (
                <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                    <Loader />
                </View>
            )
        } else {
            return (
                <SafeAreaView style={CustomStyle.container}>

                    {this.progressBarSection()}

                    {this.state.pageNum == 1 ?
                        <PersonalAndContactDetails {...this.props} onSaveDataToParent={this.onSaveDataFromPersonaAndContactDetails} contactLandingData={this.state.allContactLanding} allData={this.state.allData} allPageData={this.state.allPageData} />
                        :
                        null
                    }

                    {this.state.pageNum == 2 ?
                        <PersonalAddressDetails {...this.props} onSaveDataToParent={this.onSaveDataFromPersonalAddressDetails} contactLandingData={this.state.allContactLanding} allData={this.state.allData} allPageData={this.state.allPageData} />
                        :
                        null
                    }

                    {this.state.pageNum == 3 ?
                        <BusinessDetails {...this.props} onSaveDataToParent={this.onSaveDataFromBusinessDetails} contactLandingData={this.state.allContactLanding} allData={this.state.allData} allPageData={this.state.allPageData} />
                        :
                        null
                    }

                    {this.state.pageNum == 4 ?
                        <DatesToRemember {...this.props} onSaveDataToParent={this.onSaveDataFromDatesToRem} contactLandingData={this.state.allContactLanding} allData={this.state.allData} allPageData={this.state.allPageData} />
                        :
                        null
                    }

                    {this.state.pageNum == 5 ?
                        <Description {...this.props} onSaveDataToParent={this.onSaveDataFromDescription} contactLandingData={this.state.allContactLanding} allData={this.state.allData} allPageData={this.state.allPageData} />
                        :
                        null
                    }

                    {this.state.pageNum == 6 ?
                        <OnlineExistence {...this.props} onSaveDataToParent={this.onSaveDataFromOnlineExistence} contactLandingData={this.state.allContactLanding} allData={this.state.allData} allPageData={this.state.allPageData} />
                        :
                        null
                    }

                </SafeAreaView>
            )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAndEditContact);


