
import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import DatePicker from "react-native-date-picker";

import { Color, Dimension, ImageName } from "../../../../../../enums";
import { DateConvert, Toaster } from "../../../../../../services/common-view-function";
import { viewDateFormat } from "../../../../../../services/common-view-function/dateConvert";
import { ErrorCode } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import TextInputBox from "../../../../../../shared/text-input-box";
import { DataValidator } from "../../../../../../validators";
import { CustomStyle } from "../../../../../style";
import { modifyDealerArr, modifyDistributorArr, validateData } from "./function";
import styles from "./style";

class EventInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            allPageData: {},
            visibleProfileImgUploadModal: false,
            registrationObjData: {},
        };
    }

    componentDidMount = async () => {

        this._onLoad();
    }
    _onLoad = async () => {

        await this.setState({ allPageData: this.props.allPageData, pageLoader: false })
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    meetingTitleSection = () => {

        const _onChangeMeetingTitle = (value) => {
            let newText = '';
            newText = DataValidator.checkFirstIndexWhiteSpace(value);
            this.state.allPageData.meetingTitle = newText;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    borderRadius={25}
                    value={this.state.allPageData.meetingTitle}
                    onChangeText={(value) => _onChangeMeetingTitle(value)}
                    placeholder={"Write Your Meeting Title"}
                    keyboardType={"default"}
                    isActive={this.state.allPageData.meetingTitleActive}
                    onFocus={() => { this.state.allPageData.meetingTitleActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                    onBlur={() => { this.state.allPageData.meetingTitleActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                    height={50}
                    returnKeyType={'default'}
                />
            </View>
        )
    }

    probableAttendeesSection = () => {
        const _onChangeAttendees = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "number");
            this.state.allPageData.probableAttendees = newText;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    borderRadius={25}
                    value={this.state.allPageData.probableAttendees}
                    onChangeText={(value) => _onChangeAttendees(value)}
                    placeholder={"Probable Attendees*"}
                    keyboardType={"number-pad"}
                    isActive={this.state.allPageData.probableAttendeesActive}
                    onFocus={() => { this.state.allPageData.probableAttendeesActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                    onBlur={() => { this.state.allPageData.probableAttendeesActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                    height={50}
                    returnKeyType={'default'}
                    maxLength={15}

                />
            </View>
        )
    }

    meetingTypeSection = () => {

        const _onSelectMeetingType = (value) => {
            this.state.allPageData.selectedMeetingTypeObj = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    borderRadius={25}
                    selectedValue={this.state.allPageData.selectedMeetingTypeObj.id ? this.state.allPageData.selectedMeetingTypeObj.id.toString() : "0"}
                    data={this.state.allPageData.meetingTypeArr}
                    onSelect={(value) => _onSelectMeetingType(value)}
                    headerText={"Choose Meeting Type*"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                    height={50}
                    isSearchable={true}
                />
            </View>
        )
    }

    dateTimeSection = () => {

        const _onOpenDate = (type) => {
            this.state.allPageData.dateCheck = type
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        const _onDateSelect = (selectedDate) => {
            let dateRaw = this.state.allPageData.dateRaw,
                date = "";
            if (selectedDate) {
                date = selectedDate.toString()
                // date = DateConvert.formatDateWithMonthDate(selectedDate);
                dateRaw = selectedDate;
            }
            this.state.allPageData.date = date;
            this.state.allPageData.dateRaw = dateRaw;
            this.setState({
                allPageData: this.state.allPageData
            })
            _onOpenDate(false);
        }

        // for time

        const _onOpenTime = () => {
            this.state.allPageData.timeCheck = !this.state.allPageData.timeCheck
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        const _onTimeSelect = (selectedDate) => {
            let dateRaw = this.state.allPageData.dateRaw;
            let timeRaw = this.state.allPageData.timeRaw,
                date = "";
            if (selectedDate) {
                date = DateConvert.viewTimeFormat(selectedDate);
                dateRaw = selectedDate;
                timeRaw = selectedDate;
            }
            this.state.allPageData.time = date;
            this.state.allPageData.timeRaw = timeRaw;
            this.setState({
                allPageData: this.state.allPageData
            })
            _onOpenTime();
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, marginHorizontal: '1%' }}>
                        <TouchableOpacity style={styles.canlenderSec}
                            activeOpacity={0.9}
                            onPress={() => _onOpenDate(true)}>
                            <Text style={this.state.allPageData.date.length > 0 ? styles.activeDatePickerTxt : styles.datePickerTxt}>
                                {this.state.allPageData.date.length > 0 ? DateConvert.viewDateFormat(this.state.allPageData.date) : "Choose Date"}
                            </Text>

                            <View style={styles.calenderImgSec}>
                                <Image source={ImageName.CALENDER_LOGO} style={styles.calenderLogo} />
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={this.state.allPageData.dateCheck}
                            date={this.state.allPageData.dateRaw}
                            minimumDate={new Date()}
                            mode="date"
                            onConfirm={(date) => _onDateSelect(date)}
                            onCancel={() => _onOpenDate(false)}
                        />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: "1%" }}>
                        <TouchableOpacity style={styles.canlenderSec}
                            activeOpacity={0.9}
                            onPress={() => _onOpenTime()}
                        >
                            <Text style={this.state.allPageData.time.length > 0 ? styles.activeDatePickerTxt : styles.datePickerTxt}>
                                {this.state.allPageData.time.length > 0 ? this.state.allPageData.time : "Select Time"}
                            </Text>
                            <View style={styles.calenderImgSec}>
                                <Image source={ImageName.CLOCK_LOGO} style={styles.calenderLogo} />
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={this.state.allPageData.timeCheck}
                            date={this.state.allPageData.timeRaw}
                            mode="time"
                            onConfirm={(date) => _onTimeSelect(date)}
                            onCancel={() => _onOpenTime()}
                        />
                    </View>
                </View>

            </View>
        )
    }


    distributorSection = () => {

        const _onSelectDistributor = (value) => {
            this.state.allPageData.selectedDistributorObj = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        const onSearch = async (value) => {
            this.setState({ searchableLoader: true })
            let reqData = {
                "type": "all",
                "isSearch": "1",
                "searchName": value
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
            this.setState({ searchableLoader: false })

        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    isApiCall={true}
                    onSearchData={(value) => onSearch(value)}
                    isSearchable={true}
                    selectedValue={this.state.allPageData.selectedDistributorObj.id ? this.state.allPageData.selectedDistributorObj.id.toString() : "0"}
                    data={this.state.allPageData.distributorArr}
                    onSelect={(value) => _onSelectDistributor(value)}
                    headerText={"Select Distributor*"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                    height={50}
                    borderRadius={25}
                    loaderCheck={this.state.searchableLoader}
                />
            </View>
        )
    }


    dealerSection = () => {
        const _onSelectDealer = (value) => {
            this.state.allPageData.selectedDealerObj = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        const onSearch = async (value) => {
            this.setState({ searchableLoader: true })
            let reqData = {
                "type": "all",
                "isSearch": "1",
                "searchName": value
            }
            let responseData = await MiddlewareCheck("getAllDealer", reqData, this.props);

            if (responseData === false) {
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.state.allPageData.dealerArr = modifyDealerArr(responseData.response)
                    this.setState({
                        allPageData: this.state.allPageData
                    })
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }

            this.setState({ searchableLoader: false })

        }


        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    isApiCall={true}
                    onSearchData={(value) => onSearch(value)}
                    isSearchable={true}
                    selectedValue={this.state.allPageData.selectedDealerObj.id ? this.state.allPageData.selectedDealerObj.id.toString() : "0"}
                    data={this.state.allPageData.dealerArr}
                    onSelect={(value) => _onSelectDealer(value)}
                    headerText={"Select Dealer*"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                    height={50}
                    borderRadius={25}
                    loaderCheck={this.state.searchableLoader}
                />
            </View>
        )
    }

    meetingDescripionSection = () => {
        const _onChangeMeetingDescription = (value) => {
            let newText = "";
            newText = DataValidator.checkFirstIndexWhiteSpace(value);
            this.state.allPageData.meetingDescription = newText;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    borderRadius={25}
                    value={this.state.allPageData.meetingDescription}
                    onChangeText={(value) => _onChangeMeetingDescription(value)}
                    placeholder={"Write Your Meeting Description*"}
                    keyboardType={"default"}
                    isActive={this.state.allPageData.meetingDescriptionActive}
                    onFocus={() => { this.state.allPageData.meetingDescriptionActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                    onBlur={() => { this.state.allPageData.meetingDescriptionActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                    height={90}
                    returnKeyType={'default'}
                    alignItems={"flex-start"}
                    multiline={true}
                    maxLength={10000}
                // editable={this.state.allPageData.selectedCustomerSourceTypeObj.id == "1" ? false : true}
                />
            </View>
        )
    }

    _onSave = () => {
        let reqData = {
            "indentTitle": this.state.allPageData.meetingTitle ? this.state.allPageData.meetingTitle : "",
            "type": this.state.allPageData.selectedMeetingTypeObj.id ? this.state.allPageData.selectedMeetingTypeObj.id : "",
            "date": this.state.allPageData.date ? this.state.allPageData.date : "",
            "indentDate": this.state.allPageData.dateRaw ? DateConvert.formatYYYYMMDD(this.state.allPageData.dateRaw) + " " + DateConvert.get24HourFormatTime(this.state.allPageData.timeRaw) : "",
            "time": this.state.allPageData.time ? this.state.allPageData.time : "",
            "description": this.state.allPageData.meetingDescription ? this.state.allPageData.meetingDescription : "",
            "probableAttendees": this.state.allPageData.probableAttendees ? this.state.allPageData.probableAttendees : ""
        }

        let validData = validateData(reqData);
        if (validData.status == true) {
            let data = {
                type: "next",
                data: reqData,
                pageNum: 2
            }
            this.props.onSaveDataToParent(data);
        }
    }



    render() {
        return (
            <SafeAreaView style={CustomStyle.container} >
                {this.state.pageLoader ? <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                    <Loader />
                </View> : <>

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>

                        {/* <View style={styles.blueBox}>
                            <View style={styles.blueViewFlex}>
                                <Text style={styles.listHeaderText}>Event Info</Text>

                            </View>
                        </View> */}
                        <View style={{ marginHorizontal: "5%", marrginTop: 15 }}>
                            {this.meetingTitleSection()}
                            {this.meetingTypeSection()}
                            {this.dateTimeSection()}
                            {/* {this.distributorSection()}
                            {this.dealerSection()} */}
                            {this.probableAttendeesSection()}
                            {this.meetingDescripionSection()}

                            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: "row" }}>
                                <View style={{ flex: 0.6 }} />
                                <View style={{ flex: 0.4 }}>
                                    <BigTextButton
                                        backgroundColor={Color.COLOR.RED.AMARANTH}
                                        borderRadius={40}

                                        text={"Next"}
                                        onPress={() => this._onSave()}
                                    />
                                </View>

                            </View>
                        </View>
                        {/* </View> */}
                        <View style={{ height: 100 }} />
                    </ScrollView>
                </>}


            </SafeAreaView>
        )
    }
}


export default EventInfo;