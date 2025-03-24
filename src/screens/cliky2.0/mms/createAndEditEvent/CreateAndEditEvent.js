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
    stateUserInformation,
    stateCheckForNetwork,
} from '../../../../redux/Sales360Action';
import { Color, Dimension, ImageName } from "../../../../enums";
import { EventInfo, EventLocation } from "./sub-component";
import { BigTextButton, Loader, Modal } from "../../../../shared";
import { CustomStyle } from "../../../style";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { ErrorCode } from "../../../../services/constant";
import { Toaster } from "../../../../services/common-view-function";
import { modifyDealerArr, modifyDistributorArr, modifymeetingTypeArr } from "./Function";



class NewEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            allData: {},
            allPageData: {
                indentID: "",
                indentId: "",
                indentNumber: "",
                // event iinfo
                meetingTitle: "",
                meetingTitleActive: false,
                meetingTypeArr: [],
                selectedMeetingTypeObj: {},

                date: "",
                dateCheck: false,
                dateRaw: new Date(),
                time: "",
                timeCheck: false,
                timeRaw: new Date(),

                distributorArr: [],
                selectedDistributorObj: {},
                dealerArr: [],
                selectedDealerObj: {},
                probableAttendees: "",
                probableAttendeesActive: false,
                meetingDescription: "",
                meetingDescriptionActive: false,

                // event location
                countryArr: this.props.Sales360Redux.allCountries,
                selectedCountryObj: {},
                stateArr: [],
                selectedStateObj: {},
                districtArr: [],
                selectedDistrictObj: {},
                zoneArr: [],
                selectedZoneObj: {},
                cityArr: [],
                selectedCityObj: {},
                city: "",
                cityActive: false,
                selectedContactTypeObj: {},
                locationArr: [],
                selectedContactObj: {},
                selectedContactIds:[],
                contactDataArr: [],
                selectedContactArr:[],
                pincode: "",
                pincodeActive: false,
                address: "",
                addressActive: false,
                isSuccessModalVisible: false

            },

            isEventInfoCompleted: true,
            isEventLocationCompleted: false,
            pageLoader: true
        };
    }

    componentDidMount = async () => {
        this.onLoad();

    }
    onLoad = async () => {

        await this._onGetMeetingType();
        this.setState({ pageLoader: false })
        StoreUserOtherInformations("", {}, this.props);
    }
    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    _onGetMeetingType = async () => {
        let reqData = {
            "type": "all"
        }

        let responseData = await MiddlewareCheck("mmsMeetingType", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allPageData.meetingTypeArr = modifymeetingTypeArr(responseData.response)
                this.setState({
                    allPageData: this.state.allPageData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onGetDealerDropdown = async () => {
        let reqData = {
            "type": "all"
        }
        let responseData = await MiddlewareCheck("getAllDealer", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allPageData.dealerArr = modifyDealerArr(responseData.response)
                this.setState({
                    allPageData: this.state.allPageData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onGetDistributorDropdown = async () => {
        let reqData = {
            "type": "all"
        }
        let responseData = await MiddlewareCheck("getAllDistributor", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allPageData.distributorArr = modifyDistributorArr(responseData.response)
                this.setState({
                    allPageData: this.state.allPageData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    onSaveDataFromEventInfo = (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData
        })

        if (childData.type == "next") {
            this.setState({
                isEventInfoCompleted: true,
                isEventLocationCompleted: true,
            })
        }
    }

    onSaveDataFromEventLocation = async (childData) => {
        let allData = this.state.allData;
        Object.assign(allData, childData.data);
        this.setState({
            pageNum: childData.pageNum,
            allData: allData,
        })

        if (childData.type == "next") {
            this.setState({
                isEventLocationCompleted: true,
            })

            this.state.allData["approvedBudget"] = "0",
                this.state.allData["companyBudget"] = "0",
                this.state.allData["duration"] = "0",
                this.state.allData["estimatedBudget"] = "0",
                this.state.allData["indentStatus"] = "0",
                this.state.allData["moId"] = "0",
                this.state.allData["partnerBudget"] = "0",
                this.state.allData["remark"] = "",

                this.setState({ pageLoader: true });
            let responseData = await MiddlewareCheck("mmsAddIndent", this.state.allData, this.props);

            if (responseData === false) {
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message);
                    this.state.allPageData.indentId = responseData.response.indentId;
                    this.state.allPageData.indentID = responseData.response.indentID;
                    this.state.allPageData.indentNumber = responseData.response.indentNumber;
                    this.onCloseModal();

                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }

            this.setState({ pageLoader: false })
            StoreUserOtherInformations("", {}, this.props);

        }
        if (childData.type == "previous") {
            this.setState({
                isEventInfoCompleted: true,
                isEventLocationCompleted: false,
            })
        }
    }

    progressBarSection = () => {
        return (
            <View>
                <View style={styles.progessSection}>
                    <View style={styles.progressView}>
                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isCustomerInfoCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isCustomerInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 1 ? styles.numTextActive : this.state.isCustomerInfoCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>

                        <View style={this.state.isCustomerInfoCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isContactInfoCompleted ? styles.numberCircleActive : styles.numberCircle}>
                                <Image source={this.state.isContactInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 2 ? styles.numTextActive : this.state.isContactInfoCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>

                        <View style={this.state.isContactInfoCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isBusinessInfoCompleted ? styles.numberCircleCompleted : styles.numberCircle}>
                                <Image source={this.state.isBusinessInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isBusinessInfoCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>

                        <View style={this.state.isBusinessInfoCompleted ? styles.lineViewCompleted : styles.lineView} />

                        <View style={styles.eachNumberCommonView}>
                            <View style={this.state.isDocumentInfoCompleted ? styles.numberCircleCompleted : styles.numberCircle}>
                                <Image source={this.state.isDocumentInfoCompleted ? ImageName.TICK_MARK_IMG : null} style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isDocumentInfoCompleted ? styles.numTextCompleted : styles.numText} />
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        )
    }

    headerSec = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: "2%", marginVertical: "5%" }}>
                <TouchableOpacity style={CustomStyle.backButtonView} onPress={() => this._onBack()}>
                    <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                </TouchableOpacity>
                <View style={CustomStyle.headerTextView}>
                    <Text style={styles.headerTxtMain}>{this.state.pageNum == 1 ? "Event Info" : "Event Location"}</Text>
                </View>
                <View style={CustomStyle.backButtonView} />
            </View>
        )
    }

    clearStateData = () => {
        this.state.allPageData.meetingTitle = "";
        this.state.allPageData.selectedMeetingTypeObj = {};
        this.state.allPageData.time = "";
        this.state.allPageData.dateRaw = new Date();
        this.state.allPageData.date = "";
        this.state.allPageData.timeRaw = new Date();
        this.state.allPageData.selectedDistributorObj = {};
        this.state.allPageData.selectedDealerObj = {};
        this.state.allPageData.probableAttendees = "";
        this.state.allPageData.meetingDescription = "";
        this.state.allPageData.selectedStateObj = {};
        this.state.allPageData.selectedDistrictObj = {};
        this.state.allPageData.selectedCityObj = {};
        this.state.allPageData.pincode = "";
        this.state.allPageData.address = "";
        this.setState({ allPageData: this.state.allPageData })

    }

    onSelectNo = () => {
        this.props.navigation.goBack()
        // this.clearStateData()
        this.onCloseModal()
    }

    onSelectYes = () => {
        this.onCloseModal()

        let propData = {
            indentNumber: this.state.allPageData.indentNumber,
            indentId: this.state.allPageData.indentID
        }
        this.props.navigation.replace("MmsCreateAndEditBudget", { data: propData, type: "reloadNotNeeded" })
    }

    onCloseModal = () => {
        this.state.allPageData.isSuccessModalVisible = !this.state.allPageData.isSuccessModalVisible
        this.setState({ allPageData: this.state.allPageData })
    }

    modalSection = () => {
        return (
            <>
                <Modal
                    isVisible={this.state.allPageData.isSuccessModalVisible}
                    onBackButtonPress={() => this.onSelectNo()}
                    // onBackdropPress={() => this.onCloseModal()}
                    children={
                        <View style={styles.modalview}>
                            <View style={{ justifyContent: "center", alignItems: "center", marginHorizontal: "5%" }}>
                                <View >
                                    <Image source={ImageName.SUCCESSFULL_GREEN_TICK} style={styles.successfullImg} />
                                </View>
                                <View style={styles.successheaderSec}>
                                    <View>
                                        <Text style={styles.successTitleTxt}>you have</Text>
                                    </View>
                                    <View >
                                        <Text style={styles.successTxt}>SUCCESSFULLY</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.successTitleTxt}> create your event proposal</Text>
                                    </View>
                                </View>
                                <View style={styles.proposedId}>
                                    <View>
                                        <Text style={styles.proposedIdTxt}>your proposed ID is</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.idTxt}>{this.state.allPageData.indentNumber}</Text>
                                    </View>
                                </View>
                                <View style={styles.questionSec}>
                                    <View>
                                        <Text style={styles.questionTxt}>Do you want to</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.questionTxt}>create your budget now ?</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={{ marginHorizontal: "20%", marginTop: "10%", height: 60, }}>
                                <BigTextButton
                                    onPress={() => this.onSelectNo()}
                                    text={"NO"}
                                    fontSize={12}
                                    borderRadius={25}
                                    backgroundColor={Color.COLOR.PINK.BEGONIA}
                                />
                            </View>

                            <View style={{ height: 50, marginHorizontal: "20%", }}>
                                <BigTextButton
                                    onPress={() => this.onSelectYes()}
                                    text={"YES"}
                                    fontSize={12}
                                    borderRadius={25}

                                    backgroundColor={Color.COLOR.BLUE.DARK_BLUE}
                                />
                            </View>
                        </View>
                    }
                />
            </>
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
                        {this.headerSec()}

                        {this.state.pageNum == 1 ?
                            <EventInfo {...this.props} onSaveDataToParent={this.onSaveDataFromEventInfo} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }

                        {this.state.pageNum == 2 ?
                            <EventLocation {...this.props} onSaveDataToParent={this.onSaveDataFromEventLocation} allData={this.state.allData} allPageData={this.state.allPageData} />
                            :
                            null
                        }
                    </>}

                {this.modalSection()}

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
        stateUserInformation,
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
