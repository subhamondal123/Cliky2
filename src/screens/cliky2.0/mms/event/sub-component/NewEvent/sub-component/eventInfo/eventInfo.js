
import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView
} from "react-native";
import DatePicker from "react-native-date-picker";

import { Color, Dimension, FontFamily, ImageName } from "../../../../../../../../enums";
import { DateConvert, FileUpload, Toaster } from "../../../../../../../../services/common-view-function";
import { viewDateFormat } from "../../../../../../../../services/common-view-function/dateConvert";
import { DropdownInputBox, ImageUploadModal, Loader, TextButton } from "../../../../../../../../shared";
import BigTextButton from "../../../../../../../../shared/big-text-button";
import TextInputBox from "../../../../../../../../shared/text-input-box";
import { DataValidator } from "../../../../../../../../validators";
import { CustomStyle } from "../../../../../../../style";
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

    // for last name chnage
    _onLastName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.lastName = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    meetingTitleSection = () => {

        const _onChangeMeetingTitle = (value) => {
            // let newText = '';
            // newText = DataValidator.inputEntryValidate(value, "nameSpace");
            this.state.allPageData.meetingTitle = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    borderRadius={20}
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
                    selectedValue={this.state.allPageData.selectedMeetingTypeObj.id ? this.state.allPageData.selectedMeetingTypeObj.id.toString() : "0"}
                    data={this.state.allPageData.meetingTypeArr}
                    onSelect={(value) => _onSelectMeetingType(value)}
                    headerText={"Choose Meeting Type*"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                    height={50}
                />
            </View>
        )
    }

    dateTimeSection = () => {

        const _onOpenDate = () => {
            this.state.allPageData.dateCheck = !this.state.allPageData.dateCheck
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        const _onDateSelect = (selectedDate) => {
            let dateRaw = this.state.allPageData.dateRaw,
                date = "";
            if (selectedDate) {
                date = DateConvert.formatDateWithMonthDate(selectedDate);
                dateRaw = selectedDate;
            }
            this.state.allPageData.date = date;
            this.state.allPageData.dateRaw = dateRaw;
            this.setState({
                allPageData: this.state.allPageData
            })
            _onOpenDate();
        }

        // for time

        const _onOpenTime = () => {
            this.state.allPageData.timeCheck = !this.state.allPageData.timeCheck
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        const _onTimeSelect = (selectedDate) => {
            let dateRaw = this.state.allPageData.dateRaw,
                date = "";
            if (selectedDate) {
                date = DateConvert.viewTimeFormat(selectedDate);
                dateRaw = selectedDate;
            }
            this.state.allPageData.time = date;
            this.state.allPageData.timeRaw = dateRaw;
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
                            onPress={() => _onOpenDate()}>
                            <Text style={styles.datePickerTxt}>
                                {this.state.allPageData.date.length > 0 ? viewDateFormat(this.state.allPageData.date) : "Choose Date"}
                            </Text>

                            <View style={styles.calenderImgSec}>
                                <Image source={ImageName.CALENDER_LOGO} style={styles.calenderLogo} />
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={this.state.allPageData.dateCheck}
                            date={this.state.allPageData.dateRaw}
                            // maximumDate={this.state.endDateRaw}
                            mode="date"
                            onConfirm={(date) => _onDateSelect(date)}
                            onCancel={() => _onOpenDate()}
                        />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: "1%" }}>
                        <TouchableOpacity style={styles.canlenderSec}
                            activeOpacity={0.9}
                            onPress={() => _onOpenTime()}
                        >
                            <Text style={styles.datePickerTxt}>
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
                            // maximumDate={this.state.endDateRaw}
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

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    selectedValue={this.state.allPageData.selectedDistributorObj.id ? this.state.allPageData.selectedDistributorObj.id.toString() : "0"}
                    data={this.state.allPageData.distributorArr}
                    onSelect={(value) => _onSelectDistributor(value)}
                    headerText={"Select Distriibutor*"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                    height={50}
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

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    selectedValue={this.state.allPageData.selectedDealerObj.id ? this.state.allPageData.selectedDealerObj.id.toString() : "0"}
                    data={this.state.allPageData.dealerArr}
                    onSelect={(value) => _onSelectDealer(value)}
                    headerText={"Select Dealer*"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                    height={50}
                />
            </View>
        )
    }

    meetingDescripionSection = () => {

        const _onChangeMeetingDescription = (value) => {
            // let newText = '';
            // newText = DataValidator.inputEntryValidate(value, "nameSpace");
            this.state.allPageData.meetingDescription = value;
            this.setState({
                allPageData: this.state.allPageData
            })
        }

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ height: 10 }} />
                <TextInputBox
                    borderRadius={20}
                    value={this.state.allPageData.meetingDescription}
                    onChangeText={(value) => _onChangeMeetingDescription(value)}
                    placeholder={"Write Your Meeting Title"}
                    keyboardType={"default"}
                    isActive={this.state.allPageData.meetingDescriptionActive}
                    onFocus={() => { this.state.allPageData.meetingDescriptionActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                    onBlur={() => { this.state.allPageData.meetingDescriptionActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                    height={90}
                    returnKeyType={'default'}
                    alignItems={"flex-start"}
                // editable={this.state.allPageData.selectedCustomerSourceTypeObj.id == "1" ? false : true}
                />
            </View>
        )
    }



    _onSave = () => {

        // let reqData = {
        //     "sourceType": this.state.allPageData.selectedCustomerSourceTypeObj.id ? this.state.allPageData.selectedCustomerSourceTypeObj.id : "0",
        //     "contactType": this.state.allPageData.selectedContactObj.id ? this.state.allPageData.selectedContactObj.id : "",
        //     "profilePic": this.state.allPageData.profileImg ? this.state.allPageData.profileImg : "",
        //     "visitDate": this.state.allPageData.visitDateObj.visitDate ? DateConvert.formatYYYYMMDD(this.state.allPageData.visitDateObj.rawDate) : "",
        //     "customerTypeId": this.state.allPageData.selectedCustomerTypeObj.id ? this.state.allPageData.selectedCustomerTypeObj.id : "",
        //     "custBusinessName": this.state.allPageData.businessName ? this.state.allPageData.businessName : "",
        //     "firstName": this.state.allPageData.firstName ? this.state.allPageData.firstName : "",
        //     "lastName": this.state.allPageData.lastName ? this.state.allPageData.lastName : "",
        //     "gender": this.state.allPageData.selectedGenderObj.sName ? this.state.allPageData.selectedGenderObj.sName : "",
        //     "dob": this.state.allPageData.dobDateObj.dobDate ? DateConvert.formatYYYYMMDD(this.state.allPageData.dobDateObj.rawDate) : "",
        //     "title": this.state.allPageData.title,
        //     "customerDescription": this.state.allPageData.customerDesription,
        //     "erpCode": this.state.allPageData.erpCode ? this.state.allPageData.erpCode : ""
        // }
        // let validData = validateData(reqData);
        // if (validData.status == true) {
        let data = {
            type: "next",
            // data: reqData,
            pageNum: 2
        }
        this.props.onSaveDataToParent(data);
        // }
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

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity style={CustomStyle.backButtonView} onPress={() => this._onBack()}>
                                <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                            </TouchableOpacity>
                            <View style={styles.blueBox}>
                                <Text style={styles.blueViewFlex}>Event Info</Text>
                            </View>
                            <View style={CustomStyle.backButtonView} />
                        </View>

                        {/* <View style={styles.blueBox}>
                            <View style={styles.blueViewFlex}>
                                <Text style={styles.listHeaderText}>Event Info</Text>

                            </View>
                        </View> */}

                        {this.meetingTitleSection()}
                        {this.meetingTypeSection()}
                        {this.dateTimeSection()}
                        {this.distributorSection()}
                        {this.dealerSection()}
                        {this.meetingDescripionSection()}


                        <View style={{ marginTop: 20, marginBottom: 40, flexDirection: "row" }}>
                            <View style={{ flex: 0.6 }} />
                            <View style={{ flex: 0.4 }}>
                                <BigTextButton
                                    backgroundColor={Color.COLOR.BLUE.DARK_BLUE}
                                    borderRadius={40}

                                    text={"Next"}
                                    onPress={() => this._onSave()}
                                />
                            </View>

                        </View>
                        {/* </View> */}
                        <View style={{ height: 150 }} />
                    </ScrollView>
                </>}


            </SafeAreaView>
        )
    }
}


export default EventInfo;