
import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

import { Color, Dimension, FontFamily, ImageName } from "../../../../enums";
import { MeetingStatusBar } from "../../../../pageShared";
import { DateConvert, Toaster } from "../../../../services/common-view-function";
import { ErrorCode } from "../../../../services/constant";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { BigTextButton, Loader, TextButton } from "../../../../shared";
import { CustomStyle } from "../../../style";
import { meetingModifyData } from "./Function";
import styles from "./Style";

class EventDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            allPageData: {},
            visibleProfileImgUploadModal: false,
            detailsObjData: {
                eventName: "",
                status: "",
                eventType: "",
                proposedId: "",
                meetingId: "",
                date: "",
                rawDate: "",
                time: "",
                duration: "",
                state: "",
                district: "",
                city: "",
                address: "",
                pinCode: "",
                distributor: "",
                dealer: "",
                meetingDescription: "",
                companyBudget: "",
                partnerBudget: "",
                approvedBudget: "",
                eventStatus: "",
                IsPaymentReleased: "",
                attendeesArr: [],
                location: ""
            },

            currentDate: "",
            currentTime: ""
        };
    }

    componentDidMount = async () => {

        this.state.currentDate = DateConvert.formatYYYYMMDD(new Date());
        this.state.currentTime = DateConvert.viewTimeFormat(new Date());
        this.setState({
            currentDate: this.state.currentDate,
            currentTime: this.state.currentTime

        });

        this._onLoad();

    }
    _onLoad = async () => {
        await this.getDetails()
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

    onRefresh = async () => {
        this.setState({
            pageLoader: true,

        })
        await this.clearStateData();
        await this._onLoad()

    }

    onReloadPreviousPage = () => {
        this.props.route.params.onReloadPreviousPage();
        this.props.navigation.goBack();
    }

    clearStateData = async () => {
        this.setState({
            detailsObjData: {
                eventName: "",
                status: "",
                eventType: "",
                proposedId: "",
                meetingId: "",
                date: "",
                rawDate: "",
                time: "",
                duration: "",
                state: "",
                district: "",
                city: "",
                address: "",
                pinCode: "",
                distributor: "",
                dealer: "",
                meetingDescription: "",
                companyBudget: "",
                partnerBudget: "",
                approvedBudget: "",
                eventStatus: ""
            },
        })
    }


    getDetails = async () => {
        let reqData = {
            "isIndent": this.props.route.params.data.isIndent,
            "meetingId": this.props.route.params.data.indentId
        }
        console.log("---isIndent----", reqData)
        let responseData = await MiddlewareCheck("getMeetingDetails", reqData, this.props);
        console.log("---responseData----", JSON.stringify(responseData))

        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let meetingData = meetingModifyData(responseData);
                if (meetingData.meetingList.length > 0) {
                    this.state.detailsObjData.eventName = meetingData.meetingList[0].meetingTitle;
                    this.state.detailsObjData.status = meetingData.meetingList[0].eventStatus;
                    this.state.detailsObjData.eventType = meetingData.meetingList[0].meetingTypeName;
                    this.state.detailsObjData.proposedId = meetingData.meetingList[0].indentNumber;
                    this.state.detailsObjData.meetingId = meetingData.meetingList[0].meetingNumber;
                    this.state.detailsObjData.date = meetingData.meetingList[0].meetingDate;
                    this.state.detailsObjData.rawDate = meetingData.meetingList[0].meetingDateRaw;
                    this.state.detailsObjData.time = meetingData.meetingList[0].time;
                    this.state.detailsObjData.duration = meetingData.meetingList[0].duration;

                    this.state.detailsObjData.state = meetingData.meetingList[0].stateName;
                    this.state.detailsObjData.district = meetingData.meetingList[0].districtName;
                    this.state.detailsObjData.city = meetingData.meetingList[0].cityName;
                    this.state.detailsObjData.address = meetingData.meetingList[0].address;
                    this.state.detailsObjData.pinCode = meetingData.meetingList[0].pincode;
                    this.state.detailsObjData.attendeesArr = meetingData.meetingList[0].attendeesArr;
                    this.state.detailsObjData.location = meetingData.meetingList[0].hmUpperNodes;


                    this.state.detailsObjData.distributor = meetingData.meetingList[0].distributorName;
                    this.state.detailsObjData.dealer = meetingData.meetingList[0].dealerName;
                    this.state.detailsObjData.meetingDescription = meetingData.meetingList[0].description;
                    this.state.detailsObjData.companyBudget = meetingData.meetingList[0].companyBudget;
                    this.state.detailsObjData.partnerBudget = meetingData.meetingList[0].partnerBudget;
                    this.state.detailsObjData.approvedBudget = meetingData.meetingList[0].approvedBudget;

                    this.state.detailsObjData.IsPaymentReleased = meetingData.meetingList[0].IsPaymentReleased;

                    this.state.detailsObjData.eventStatus = meetingData.meetingList[0].eventStatus;
                    this.setState({
                        detailsObjData: this.state.detailsObjData
                    })
                }

            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    headerSec = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: "2%", marginVertical: "5%" }}>
                <TouchableOpacity style={CustomStyle.backButtonView} onPress={() => this._onBack()}>
                    <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                </TouchableOpacity>
                <View style={CustomStyle.headerTextView}>
                    <Text style={styles.headerTxtMain}>Event Details</Text>
                </View>
                <View style={CustomStyle.backButtonView} />
            </View>
        )
    }

    eventHeaderSection = () => {
        const mainHeaderSection = () => {
            return (
                <View style={styles.mainHeadSec}>
                    <View style={styles.mainHeadLeftSec}>
                        <Text style={styles.mainHeadLeftSecTxt}>{this.state.detailsObjData.eventName}</Text>
                    </View>
                    <View style={styles.mainHeadRightSec}>
                        <View style={{ marginBottom: 3 }}>
                            <Text style={styles.statusMainTxt}>Status</Text>
                        </View>
                        <MeetingStatusBar type={this.state.detailsObjData.status == "0" ? "draft" : this.state.detailsObjData.status == "1" ? "pending" : this.state.detailsObjData.status == "2" ? "accepted" : this.state.detailsObjData.status == "3" ? "completed" : this.state.detailsObjData.status == "4" ? "rejected" : this.state.detailsObjData.status == "5" ? "approved" : this.state.detailsObjData.status == "6" ? "hold" : "NA"} />
                        {/* <MeetingStatusBar type={"accepted"} /> */}

                    </View>
                </View>
            )
        }

        const eventTypeSection = () => {
            return (
                <View style={styles.mainHeaderMiddleSec}>
                    <View>
                        <Text style={styles.statusTxt}>Event Type Name</Text>
                    </View>
                    <Text style={styles.eventTypeTxt}>{this.state.detailsObjData.eventType}</Text>
                </View>
            )
        }

        const idSection = () => {
            return (
                <View style={styles.mainHeaderIdSec}>
                    <View style={styles.idLeftSec}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.statusTxt}>Proposed ID</Text>
                        </View>

                        <Text style={styles.idTxt}>{this.state.detailsObjData.proposedId}</Text>
                    </View>
                    <View style={styles.idRightSec}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.statusTxt}>Meeting ID</Text>
                        </View>
                        <Text style={styles.idTxt}>{this.state.detailsObjData.meetingId}</Text>
                    </View>
                </View>
            )
        }

        const DateTimeSection = () => {
            return (
                <View style={styles.eventDateTimmeSec}>
                    <View style={styles.dateSec}>
                        <Image source={ImageName.BLUE_CALENDER_LOGO} style={styles.calenderImg} />
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={styles.dateTxt}>{this.state.detailsObjData.date}</Text>
                        </View>
                    </View>
                    <View style={styles.timeSec}>
                        <Image source={ImageName.BLUE_CLOCK_LOGO} style={styles.calenderImg} />
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={styles.dateTxt}>{this.state.detailsObjData.time}</Text>
                        </View>
                    </View>
                    <View style={styles.minutesSec}>
                        {/* <Image source={ImageName.CLOCK_LOGO} style={styles.calenderImg} /> */}
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={styles.dateTxt}>{this.state.detailsObjData.duration + " " + "mins"}</Text>
                        </View>
                    </View>
                </View>
            )
        }
        const locationSection = () => {
            return (
                <View style={styles.locationSec}>
                    <View style={styles.locationData}>
                        <Text style={styles.locationTxt}>{this.state.detailsObjData.location}</Text>
                        <View style={{ flexDirection: "row", marginLeft: 60 }}>
                            <Text style={styles.statusTxt}>{this.state.detailsObjData.address.length > 0 ? (this.state.detailsObjData.address + ",") : ""} </Text>
                            <Text style={styles.statusTxt}>PIN : {this.state.detailsObjData.pinCode}</Text>
                        </View>
                    </View>
                    <View style={styles.locationIcon}>
                        <Image source={ImageName.LOCATION_BLACK} style={styles.locationImg} />
                    </View>
                </View>
            )
        }

        return (
            <View style={{ marginVertical: 10 }}>
                <View style={styles.detailHeaderSec}>
                    {mainHeaderSection()}
                    {eventTypeSection()}
                    {idSection()}
                    {DateTimeSection()}
                    {locationSection()}
                    <View style={styles.underLine} />
                </View>
            </View>
        )
    }

    eventFooterSection = () => {
        const dealerDistributorSection = () => {
            return (
                <View style={styles.dealerDistributorSec}>
                    {this.state.detailsObjData.attendeesArr.map((item, key) => (
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 0.3 }}>
                                <Text style={styles.eventTypeTxt}>{item.typeName}</Text>
                            </View>
                            <View style={{ flex: 0.7 }}>
                                <Text style={[styles.eventTypeTxt, { fontFamily: FontFamily.FONTS.INTER.MEDIUM }]}>{item.attendeesName}</Text>
                            </View>
                        </View>

                    ))}
                    {/* <View style={styles.distributorSec}>
                        <View style={styles.distributorLabel}>
                            <Text style={styles.statusTxt}>Distributor</Text>
                        </View>
                        <Text style={styles.eventTypeTxt}>{this.state.detailsObjData.distributor}</Text>
                    </View>
                    <View style={styles.dealerSec}>
                        <View style={styles.dealerLabel}>
                            <Text style={styles.statusTxt}>Dealer</Text>
                        </View>
                        <Text style={styles.eventTypeTxt}>{this.state.detailsObjData.dealer}</Text>
                    </View> */}
                </View>
            )
        }

        const meetingDescriptionSection = () => {
            return (
                <View style={styles.meetingSection}>
                    <View style={styles.distributorLabel}>
                        <Text style={styles.statusTxt}>Meeting Description</Text>
                    </View>
                    <Text style={styles.descriptionTxt}>{this.state.detailsObjData.meetingDescription}</Text>
                </View>
            )
        }

        const budgetDataSection = () => {
            return (
                <>
                    <View style={styles.budgetDataSec}>
                        <View style={styles.companyBudgetSec}>
                            <View style={styles.distributorSec}>
                                <View style={{ flex: 1 }} />
                                <View style={styles.distributorLabel}>
                                    <Text style={styles.budgetLeftDataTxt}>Company</Text>
                                </View>
                                <Text style={styles.budgetLeftDataAmountTxt}>{this.state.detailsObjData.companyBudget}</Text>
                            </View>
                            <View style={styles.distributorSec}>
                                <View style={styles.distributorLabel}>
                                    <Text style={styles.budgetLeftDataTxt}>Partner</Text>
                                </View>
                                <Text style={styles.budgetLeftDataAmountTxt}>{this.state.detailsObjData.partnerBudget}</Text>
                            </View>
                        </View>
                        <View style={styles.approvedBudgetSec}>
                            <View style={styles.distributorLabel}>
                                <Text style={styles.eventTypeTxt}>Approved Budget</Text>
                            </View>
                            <Text style={styles.approvedBudgetAmount}>{this.state.detailsObjData.approvedBudget}</Text>
                        </View>

                    </View>
                    <View style={{ marginHorizontal: "5%", marginTop: 10 }}>
                        <Text style={styles.eventTypeTxt}>Payment Status :  {this.state.detailsObjData.IsPaymentReleased == 0 ? "Not Released" : "Released"}</Text>
                    </View>
                </>

            )
        }
        const buttonSection = () => {
            const onUpdateBudget = () => {
                this.props.navigation.navigate("MmsCreateAndEditBudget", { data: this.props.route.params.data, onReloadPreviousPage: this.onReloadPreviousPage, type: "reloadNeeded" })
            }
            const onPressCamera = () => {
                this.props.navigation.navigate("MmsMeetingDocUpload", { data: this.props.route.params.data })
            }
            return (
                <View style={styles.buttonSec}>
                    <View style={styles.updateButtonSec}>
                        {((this.state.detailsObjData.date.length > 0 && ((new Date(this.state.currentDate) > new Date(this.state.detailsObjData.rawDate)) || (new Date(this.state.currentDate).toString() === new Date(this.state.detailsObjData.rawDate).toString()))) && (this.state.detailsObjData.eventStatus == "2" || this.state.detailsObjData.eventStatus == "0")) ?
                            <BigTextButton
                                onPress={() => onUpdateBudget()}
                                text={"+ Update Final Expences"}
                                backgroundColor={Color.COLOR.RED.AMARANTH}
                                fontSize={12}
                                borderRadius={25}

                            /> : null}
                    </View>
                    {((this.state.detailsObjData.date.length > 0 && ((new Date(this.state.currentDate) > new Date(this.state.detailsObjData.rawDate)) || (new Date(this.state.currentDate).toString() === new Date(this.state.detailsObjData.rawDate).toString()))) && (this.state.detailsObjData.eventStatus == "2" || this.state.detailsObjData.eventStatus == "5")) ?
                        <TouchableOpacity style={{ paddingHorizontal: 10 }} activeOpacity={0.9} onPress={() => onPressCamera()}>
                            <Image source={ImageName.BLUE_CAMERA_LOGO} style={styles.cameraImg} />
                        </TouchableOpacity>
                        :
                        null
                    }

                </View>
            )
        }
        return (
            <View style={{ marginVertical: 10 }}>
                <View style={styles.detailFooterSec}>
                    {dealerDistributorSection()}
                    {meetingDescriptionSection()}
                    {budgetDataSection()}
                    {buttonSection()}
                </View>

            </View>
        )
    }

    underLineSec = () => {
        return (
            <View style={styles.underLine} />
        )
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container} >
                {this.state.pageLoader ? <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                    <Loader />
                </View> : <>
                    {this.headerSec()}
                    {this.underLineSec()}

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.onRefresh()}
                            />
                        }>
                        <View>
                            {this.eventHeaderSection()}
                            {this.eventFooterSection()}
                        </View>
                        <View style={{ height: 100 }} />
                    </ScrollView>
                </>}


            </SafeAreaView>
        )
    }
}


export default EventDetails;