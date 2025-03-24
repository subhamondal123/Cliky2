import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";

import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { CommonData, ErrorCode } from "../../../../../../services/constant";
import { CheckBox, DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import styles from "./style";
import { Modal } from '../../../../../../shared';
import DatePicker from 'react-native-date-picker';
import { DateConvert, Toaster } from '../../../../../../services/common-view-function';
import { modifyNextStageData, validationCheck, validUpdateMarkStage } from "./function"
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { MiddlewareCheck } from "../../../../../../services/middleware";


const RecurringType = [
    {
        id: 1,
        name: "Daily from a date",
        check: false
    },
    {
        id: 2,
        name: "From date to End Date",
        check: false
    }
]

const lostStatusData = [
    {
        id: 1,
        name: "Not possible to connect"
    },
    {
        id: 2,
        name: "Not interested"
    },
    {
        id: 3,
        name: "Contact in future"
    },
]

class LeadStatusModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,

            amount: "",
            amountActive: false,
            probablityWining: "",
            probablityActive: false,
            expectedRevenue: "",
            // expectedRevenue: false,
            expectedActive: false,
            stageDuration: "",
            stageDurationActive: false,
            startDate: "",
            startDateCheck: false,
            statDateRaw: new Date(),

            description: "",
            descriptionActive: false,
            followUpDate: "",
            followUpDateCheck: false,
            followUpDateRaw: new Date(),

            selectStage: CommonData.COMMON.SELECT_STAGE,
            selectStageObj: {},
            closeWonOrLost: true,
            allLoststatus: [],
            selectedLostStatus: {},
            disqualifiedDescription: "",
            activeDisqualifiedDescription: false,

            allStage: [],
            selectedNextStage: {},
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {
        await this._onFetchRemainingStatus();
        await this._onFetchAllLostStatus();

        this.setState({
            pageloader: false
        })
    }

    _onFetchAllLostStatus = async () => {
        this.setState({
            allLoststatus: lostStatusData
        })
    }

    _onFetchRemainingStatus = async () => {
        this.setState({
            allStage: modifyNextStageData(this.props.remainingStages)
        })
    }

    onRequestCloseModal = (type) => {
        this.props.onClose();

    }

    _onSubmitButton = async () => {
        let data = {
            amount: this.state.amount,
            probablityWining: this.state.probablityWining,
            expectedRevenue: this.state.expectedRevenue,
            startDate: this.state.startDate,
            stageDuration: this.state.stageDuration

        }
        let validmarkStage = validationCheck(data)

        if (validmarkStage.selectStage == true) {

        } else {
        }

    }

    // for network error
    _onNetworkError = () => {
        this.props.stateCheckForNetwork("LeadDetails");
        this.props.navigation.navigate("NetworkError");
    }

    _onUpdateButton = async () => {
        let validUpdateStage = validUpdateMarkStage(this.state)

        if (validUpdateStage.status == true) {
            this.setState({
                pageloader: true
            })
            let reqData = {
                leadId: this.props.leadId.toString(),
                stageId: this.props.stageId,
                nxtStageId: this.state.selectedNextStage.id,
                description: this.state.description,
                followUpDate: DateConvert.formatYYYYMMDD(this.state.followUpDateRaw),
                amount: this.state.amount,
                probOfWin: this.state.probablityWining,
                expectedRevenue: this.state.expectedRevenue,
                expectedClosingDate: DateConvert.formatYYYYMMDD(this.state.statDateRaw),
                stageDuration: this.state.stageDuration,
                isConverted: this.state.closeWonOrLost ? '1' : '2',
                lostReason: this.state.closeWonOrLost ? null : this.state.selectedLostStatus.id,
                lostDescription: this.state.closeWonOrLost ? null : this.state.disqualifiedDescription
            }
            let responseData = await MiddlewareCheck("addleadStageChange", reqData, this.props);
            if (responseData === false) {
                this._onNetworkError();
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message);
                    await this.resetStateValue();
                    await this._onUpdateSuccess();
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                }
            }

            this.setState({
                pageloader: false
            })
        }
    }

    resetStateValue = async () => {
        this.setState({
            amount: "",
            amountActive: false,
            probablityWining: "",
            probablityActive: false,
            expectedRevenue: "",
            // expectedRevenue: false,
            expectedActive: false,
            stageDuration: "",
            stageDurationActive: false,
            startDate: "",
            startDateCheck: false,
            statDateRaw: new Date(),

            description: "",
            descriptionActive: false,
            followUpDate: "",
            followUpDateCheck: false,
            followUpDateRaw: new Date(),

            selectStage: CommonData.COMMON.SELECT_STAGE,
            selectStageObj: {},
            closeWonOrLost: true,
            allLoststatus: [],
            selectedLostStatus: {},
            disqualifiedDescription: "",
            activeDisqualifiedDescription: false,

            allStage: [],
            selectedNextStage: {},
        })
    }

    _onUpdateSuccess = async () => {
        this.props.onUpdateSuccess();
    }

    nextStageChooseSection = () => {
        const _onSelectNextStage = (value) => {
            this.setState({
                selectedNextStage: value
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Next Stage</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <DropdownInputBox
                        selectedValue={this.state.selectedNextStage.id ? this.state.selectedNextStage.id.toString() : "0"}
                        data={this.state.allStage}
                        onSelect={(value) => _onSelectNextStage(value)}
                        headerText={"Select Next Stage"}
                        // selectedText={this.state.selectedZoneObj.name ? this.state.selectedZoneObj.name : "Zone"}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                    />
                </View>
            </React.Fragment>
        )
    }

    _amountSection = () => {
        const _onChangeAmount = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "amount");
            this.setState({
                amount: newText
            })
        }

        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>*<Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Amount</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Amount"}
                        value={this.state.amount}
                        onChangeText={(value) => _onChangeAmount(value)}
                        isRightIcon={false}
                        height={40}
                        fontSize={14}
                        keyboardType={"numeric"}
                        isActive={this.state.amountActive}
                        onFocus={() => { this.setState({ amountActive: true }) }}
                        onBlur={() => { this.setState({ amountActive: false }) }}

                    />
                </View>
            </React.Fragment>
        )
    }
    probablityOfWiningSection = () => {
        const _probablityWining = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "number");
            this.setState({
                probablityWining: newText
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>*<Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Probablity Win Percentage</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Probablity Win Percentage"}
                        value={this.state.probablityWining}
                        onChangeText={(value) => _probablityWining(value)}
                        isRightIcon={false}
                        height={40}
                        maxLength={2}
                        keyboardType={"numeric"}
                        isActive={this.state.probablityActive}
                        onFocus={() => { this.setState({ probablityActive: true }) }}
                        onBlur={() => { this.setState({ probablityActive: false }) }}
                    />
                </View>
            </React.Fragment>
        )
    }

    expectedRevenueSection = () => {
        const _onExpectedRevenue = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "number");
            this.setState({
                expectedRevenue: newText
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Expected Revenue</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Expected Revenue"}
                        value={this.state.expectedRevenue}
                        onChangeText={(value) => _onExpectedRevenue(value)}
                        isRightIcon={false}
                        keyboardType={"numeric"}
                        height={40}
                        fontSize={14}
                        isActive={this.state.expectedActive}
                        onFocus={() => { this.setState({ expectedActive: true }) }}
                        onBlur={() => { this.setState({ expectedActive: false }) }}
                    />
                </View>
            </React.Fragment>
        )
    }
    expectedCloseingDateSection = () => {
        const _onOpenStartDate = () => {
            this.setState({
                startDateCheck: !this.state.startDateCheck
            })
        }
        const _onStartDateSelect = (selectedDate) => {
            let statDateRaw = this.state.statDateRaw,
                startDate = "";
            if (selectedDate) {
                startDate = DateConvert.formatDateWithMonthDate(selectedDate);
                statDateRaw = selectedDate;
            }
            this.setState({
                startDate: startDate,
                statDateRaw: statDateRaw
            })
            _onOpenStartDate();
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Expected Closing Date</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity style={styles.canlenderSec}
                        activeOpacity={0.9}
                        onPress={_onOpenStartDate}
                    >
                        <Text style={{
                            color: this.state.startDate.length > 0 ? Color.COLOR.GRAY.DARK_GRAY_COLOR : Color.COLOR.GRAY.SILVER,
                            fontSize: FontSize.SM,
                            fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                            paddingLeft: 10,
                            top: 10
                        }}>
                            {this.state.startDate.length > 0 ? this.state.startDate : "dd/mm/yyyy"}
                        </Text>
                        <View style={styles.calenderImgSec}>
                            <Image source={ImageName.CALENDER_LOGO} style={styles.calenderLogo} />
                        </View>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={this.state.startDateCheck}
                        date={this.state.statDateRaw}
                        // maximumDate={this.state.endDateRaw}
                        mode="date"
                        onConfirm={(date) => _onStartDateSelect(date)}
                        onCancel={() => _onOpenStartDate()}
                    />
                </View>
            </React.Fragment>

        )
    }

    stageDurationSection = () => {

        const _onStageDuration = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "number");
            this.setState({
                stageDuration: newText
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Stage Duration (Days)</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Stage Duration"}
                        value={this.state.stageDuration}
                        onChangeText={(value) => _onStageDuration(value)}
                        isRightIcon={false}
                        keyboardType={"numeric"}
                        height={40}
                        fontSize={14}
                        // refName={ref => this.thirdTextInput = ref}
                        isActive={this.state.stageDurationActive}
                        onFocus={() => { this.setState({ stageDurationActive: true }) }}
                        onBlur={() => { this.setState({ stageDurationActive: false }) }}
                    />
                </View>
            </React.Fragment>
        )
    }

    closeSection = () => {
        const _onCheckBox = (type) => {
            if (type == "yes") {
                if (this.state.closeWonOrLost == false) {
                    this.setState({
                        closeWonOrLost: true,
                        selectedLostStatus: {},
                        disqualifiedDescription: "",
                    })
                }
            } else if (type == "no") {
                if (this.state.closeWonOrLost == true) {
                    this.setState({
                        closeWonOrLost: false,
                        selectedLostStatus: {},
                        disqualifiedDescription: "",
                    })
                }
            };
        }
        return (
            <React.Fragment>
                {/* <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Proposal sent</Text></Text> */}
                <View>
                    <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Mark As</Text></Text>
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            type={"tick"}
                            borderRadius={0}
                            data={this.state.closeWonOrLost}
                            onClickValue={() => _onCheckBox("yes")}
                        />
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '8%' }}>Convert</Text>
                    </View>
                    <View style={{ width: 30 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            type={"tick"}
                            borderRadius={0}
                            data={!this.state.closeWonOrLost}
                            onClickValue={() => _onCheckBox("no")}
                        />
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '8%' }}>Disqualified</Text>
                    </View>
                </View>
                {this.state.closeWonOrLost ?
                    <React.Fragment>

                    </React.Fragment>
                    :
                    <React.Fragment>
                        {this.lostStatusSection()}
                        {this.disqualifyDescription()}

                    </React.Fragment>
                }
            </React.Fragment>
        )
    }



    descriptionSection = () => {
        const _ondescription = (value) => {
            this.setState({
                description: value
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>*<Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Description</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Description"}
                        value={this.state.description}
                        onChangeText={(value) => _ondescription(value)}
                        height={40}
                        fontSize={14}
                        isActive={this.state.descriptionActive}
                        onFocus={() => { this.setState({ descriptionActive: true }) }}
                        onBlur={() => { this.setState({ descriptionActive: false }) }}
                    />
                </View>
            </React.Fragment>
        )
    }

    followUpDateSection = () => {

        const _onOpenFollowUpDate = () => {
            this.setState({
                followUpDateCheck: !this.state.followUpDateCheck
            })
        }

        const _onFollowUpDateSelect = (selectedDate) => {
            let followUpDateRaw = this.state.followUpDateRaw,
                followUpDate = "";
            if (selectedDate) {
                followUpDate = DateConvert.formatDateWithMonthDate(selectedDate)
                followUpDateRaw = selectedDate;
            }
            this.setState({
                followUpDate: followUpDate,
                followUpDateRaw: followUpDateRaw
            })
            _onOpenFollowUpDate
        }

        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Follow Up Date</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity style={styles.canlenderSec}
                        activeOpacity={0.9}
                        onPress={_onOpenFollowUpDate}
                    >
                        <Text style={{
                            color: this.state.followUpDate.length > 0 ? Color.COLOR.GRAY.DARK_GRAY_COLOR : Color.COLOR.GRAY.SILVER,
                            fontSize: FontSize.SM,
                            fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                            paddingLeft: 10,
                            top: 10
                        }}>
                            {this.state.followUpDate.length > 0 ? this.state.followUpDate : "dd/mm/yyyy"}
                        </Text>
                        <View style={styles.calenderImgSec}>
                            <Image source={ImageName.CALENDER_LOGO} style={styles.calenderLogo} />
                        </View>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={this.state.followUpDateCheck}
                        date={this.state.followUpDateRaw}
                        // maximumDate={this.state.endDateRaw}
                        mode="date"
                        onConfirm={(date) => _onFollowUpDateSelect(date)}
                        onCancel={() => _onOpenFollowUpDate()}
                    />
                </View>
            </React.Fragment>
        )


    }

    selectStageSection = () => {
        const _OnSelectStage = (value) => {
            let data = this.state.selectStage;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == value.id) {
                    data[i].check = true;
                }
            }

            this.setState({
                selectStageObj: value,
                selectStage: data,
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Select Stage</Text></Text>
                <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 0.5, marginTop: 10 }}>
                    <DropdownInputBox
                        selectedValue={this.state.selectStageObj.id ? this.state.selectStageObj.id.toString() : "0"}
                        data={this.state.selectStage}
                        onSelect={(value) => _OnSelectStage(value)}
                        headerText={"Status"}
                        selectedText={this.state.selectStageObj.name ? this.state.selectStageObj.name : "Select Stage"}
                    />
                </View>
            </React.Fragment>

        )
    }


    lostStatusSection = () => {
        const _OnSelectLostStatus = (value) => {
            let data = this.state.allLoststatus;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == value.id) {
                    data[i].check = true;
                }
            }

            this.setState({
                selectedLostStatus: value,
                allLoststatus: data,
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Lost Status</Text></Text>
                <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 0.5, marginTop: 10 }}>
                    <DropdownInputBox
                        selectedValue={this.state.selectedLostStatus.id ? this.state.selectedLostStatus.id.toString() : "0"}
                        data={this.state.allLoststatus}
                        onSelect={(value) => _OnSelectLostStatus(value)}
                        headerText={"Lost Status"}
                    />
                </View>
            </React.Fragment>

        )

    }


    disqualifyDescription = () => {
        const _ondisqualifydescription = (value) => {
            this.setState({
                disqualifiedDescription: value
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>*<Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Description</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Description"}
                        value={this.state.disqualifiedDescription}
                        onChangeText={(value) => _ondisqualifydescription(value)}
                        isRightIcon={false}
                        height={40}
                        fontSize={14}
                        isActive={this.state.activeDisqualifiedDescription}
                        onFocus={() => { this.setState({ activeDisqualifiedDescription: true }) }}
                        onBlur={() => { this.setState({ activeDisqualifiedDescription: false }) }}
                    />
                </View>
            </React.Fragment>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Modal
                    isVisible={this.props.isVisiable}
                    onBackButtonPress={() => this.onRequestCloseModal()}
                    onBackdropPress={() => this.onRequestCloseModal()}
                    onRequestClose={() => this.onRequestCloseModal()}
                    padding={10}
                    children={
                        <View style={styles.modalview}>
                            <View style={styles.modalHeaderSec}>
                                <View style={styles.marginView}>
                                    <Text style={styles.profileNameText}>Mark This Stage As Completed</Text>
                                    <TouchableOpacity style={styles.cancelSec}
                                        activeOpacity={0.8}
                                        onPress={() => this.onRequestCloseModal()}  >
                                        <Image source={ImageName.WHITE_CROSS} style={styles.cancelImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.state.pageloader ?
                                <View style={{ height: Dimension.height / 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Loader/>
                                </View>
                                :
                                <ScrollView>
                                    <View style={{ marginHorizontal: '5%', marginTop: 8 }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD }}>Present Stage Name : <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD }}>{this.props.presentStage}</Text></Text>
                                        {this.props.type == "markStage" ?
                                            <React.Fragment>
                                                {this.nextStageChooseSection()}
                                                {this.descriptionSection()}
                                                {this.followUpDateSection()}
                                                {this._amountSection()}
                                                {this.probablityOfWiningSection()}
                                                {this.expectedRevenueSection()}
                                                {this.expectedCloseingDateSection()}
                                                {this.stageDurationSection()}
                                                {this.closeSection()}

                                                <View style={{ marginTop: 15, marginHorizontal: '15%' }}>
                                                    <BigTextButton
                                                        height={40}
                                                        borderRadius={16}
                                                        backgroundColor={Color.COLOR.RED.AMARANTH}
                                                        text={"Submit"}
                                                        onPress={() => this._onUpdateButton()}
                                                    />
                                                </View>
                                            </React.Fragment>
                                            :
                                            <View>
                                                {this.descriptionSection()}
                                                {this.followUpDateSection()}
                                                {this.selectStageSection()}


                                                <View style={{ marginTop: 15, marginHorizontal: '15%' }}>
                                                    <BigTextButton
                                                        height={35}
                                                        borderRadius={16}
                                                        backgroundColor={Color.COLOR.GREEN.APPLE_GREEN}
                                                        text={"Update"}
                                                        onPress={() => this._onSubmitButton()}
                                                    />
                                                </View>
                                            </View>



                                        }
                                    </View>
                                    <View style={{ marginBottom: 20 }} />
                                </ScrollView>
                            }
                        </View>
                    }
                />
            </SafeAreaView>
        )
    }

}

export default LeadStatusModal;