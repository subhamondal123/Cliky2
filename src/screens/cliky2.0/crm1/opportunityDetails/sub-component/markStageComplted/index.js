import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { CommonData, ErrorCode } from "../../../../../../services/constant";
import { CheckBox, DropdownInputBox, ImageUploadModal, Loader, TextInputBox } from "../../../../../../shared";
import styles from "./style";
import { Modal } from '../../../../../../shared';
import DatePicker from 'react-native-date-picker';
import { DateConvert, FileUpload, Toaster } from '../../../../../../services/common-view-function';
import { modifyNextStageData, validationCheck, validUpdateMarkStage } from "./function"
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { MiddlewareCheck, MiddlewareFileCheck } from "../../../../../../services/middleware";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { stateCheckForNetwork,stateUserInformation } from "../../../../../../redux/Sales360Action";



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

class MarkStageCompletedModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,

            statusDetailsModal: false,
            amount: "",
            amountActive: false,
            probablityWining: "",
            probablityActive: false,
            expectedRevenue: "",
            expectedActive: false,

            startDate: "",
            startDateCheck: false,
            statDateRaw: new Date(),

            followUpDate: "",
            followUpDateCheck: false,
            followUpDateRaw: new Date(),

            proposalValue: "",
            proposalValueActive: false,
            proposalNumber: "",
            proposalNumberActive: false,

            proposalSentDate: "",
            proposalSentDateCheck: false,
            proposalSentDateRaw: new Date(),

            nextFollowUpDate: "",
            nextFollowUpDateCheck: false,
            nextFollowUpDateRaw: new Date(),
            showHideCheck: false,

            customerProposedValue: "",
            customerProposedValueActive: false,

            mutuallyAgreedContactValue: "",
            mutuallyAgreedContactValueActive: false,

            closeWonOrLost: true,

            closingAmount: "",
            closingAmountActive: false,

            closingDate: "",
            closingDateCheck: false,
            closingDateRaw: new Date(),

            closingDescription: "",
            closingDescriptionActive: false,

            reasonList: [],
            selectedReason: {},

            allStage: [],
            selectedNextStage: {},

            visibleProfileImgUploadModal: false,

            imgData: {
                imgRaw: "",
                imgUri: ""
            }
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {
        await this._onFetchCloseReasonList();
        await this._onFetchRemainingStatus()
        this.setState({
            pageloader: false
        })
    }

    closeAllDateModal = async() => {
        this.setState({
            
            startDateCheck: false,
            followUpDateCheck: false,
            proposalSentDateCheck: false,
            nextFollowUpDateCheck: false,
            closingDateCheck: false,
        })
    }

    _onFetchCloseReasonList = async () => {
        let responseData = await MiddlewareCheck("getMasterReasonslist", {},this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    reasonList: responseData.response
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onFetchRemainingStatus = async () => {
        this.setState({
            allStage: modifyNextStageData(this.props.remainingStage)
        })
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    onRequestCloseModal = (type) => {
        this.props.onClose();

    }

    _onUpdateButton = async () => {


    }

    _onSubmitButton = async () => {
        let validmarkStage = validationCheck(this.state);
        if (validmarkStage.status == true) {
            await this.closeAllDateModal();
            this.setState({
                pageloader: true
            });
            let data = {
                "nxtStageId": this.state.selectedNextStage.id.toString(),
                "opportunityId": this.props.opportunityId.toString(),
                "stageId": this.props.stageId.toString(),
                "amount": this.state.amount,
                "probOfWin": this.state.probablityWining,
                "revenue": this.state.expectedRevenue,
                "expectedClosingDate": DateConvert.formatYYYYMMDD(this.state.statDateRaw),
                "followUpDate": DateConvert.formatYYYYMMDD(this.state.followUpDateRaw),
                "proposalValue": this.state.proposalValue,
                "proposalNumber": this.state.proposalNumber,
                "proposalSent": this.state.showHideCheck ? "1" : "0",
                "proposalFile": this.state.imgData.imgUri,
                "proposalSentDate": DateConvert.formatYYYYMMDD(this.state.proposalSentDateRaw),
                "nextFollowUpDate": DateConvert.formatYYYYMMDD(this.state.nextFollowUpDateRaw),
                "customerProposedValue": this.state.customerProposedValue.length > 0 ? this.state.customerProposedValue : "0",
                "mutuallyAgreedContactValue": this.state.mutuallyAgreedContactValue,
                "closeType": this.state.closeWonOrLost ? "1" : "2",
                "closingAmount": this.state.closingAmount.length > 0 ? this.state.closingAmount : "0",
                "closingDate": DateConvert.formatYYYYMMDD(this.state.closingDateRaw),
                "closingReason": this.state.selectedReason.id ? this.state.selectedReason.id : "0",
                "description": this.state.closingDescription,
                "decisionArr": []
            }
            let responseData = await MiddlewareCheck("addOpportunityStageChange", data,this.props);
            if (responseData === false) {
                this._onNetworkError();
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message);
                    this.props.onClose();
                    this.props.reload();
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({
                pageloader: false
            });
        }
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
                        height={45}
                        fontSize={14}
                        keyboardType={"numeric"}
                        isActive={this.state.amountActive}
                        // refName={ref => this.firstTextInput = ref}
                        onFocus={() => { this.setState({ amountActive: true }) }}
                        onBlur={() => { this.setState({ amountActive: false }) }}
                    // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    // returnKeyType="next"
                    // blurOnSubmit={false}
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
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>*<Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Probablity Of Wining</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Probability of Winning"}
                        value={this.state.probablityWining}
                        onChangeText={(value) => _probablityWining(value)}
                        isRightIcon={false}
                        keyboardType={"numeric"}
                        height={45}
                        fontSize={14}
                        isActive={this.state.probablityActive}
                        // refName={ref => this.secondTextInput = ref}
                        maxLength={2}
                        onFocus={() => { this.setState({ probablityActive: true }) }}
                        onBlur={() => { this.setState({ probablityActive: false }) }}
                    // onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                    // returnKeyType="next"
                    // blurOnSubmit={false}

                    />
                </View>
            </React.Fragment>
        )
    }

    expectedRevenueSection = () => {
        const _onExpectedRevenue = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "amount");
            this.setState({
                expectedRevenue: newText
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Expected Revenue</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Expected Revenue (₹)"}
                        value={this.state.expectedRevenue}
                        onChangeText={(value) => _onExpectedRevenue(value)}
                        isRightIcon={false}
                        keyboardType={"numeric"}
                        height={45}
                        fontSize={14}
                        refName={ref => this.thirdTextInput = ref}
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
                startDate = DateConvert.viewDateFormat(selectedDate);
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
                            color: this.state.startDate.length == 0 ? Color.COLOR.GRAY.SILVER : Color.COLOR.GRAY.DARK_GRAY_COLOR,
                            fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                            marginLeft: 21,
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
                followUpDate = DateConvert.viewDateFormat(selectedDate)
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
                            color: this.state.followUpDate.length == 0 ? Color.COLOR.GRAY.SILVER : Color.COLOR.GRAY.DARK_GRAY_COLOR,
                            fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                            marginLeft: 21,
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
    proposalValueSection = () => {
        const _onProposalValue = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "amount");
            this.setState({
                proposalValue: newText
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>*<Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Proposal value</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Proposal Value (₹)"}
                        value={this.state.proposalValue}
                        onChangeText={(value) => _onProposalValue(value)}
                        isRightIcon={false}
                        keyboardType={"numeric"}
                        height={45}
                        fontSize={14}
                        // refName={ref => this.thirdTextInput = ref}
                        isActive={this.state.proposalValueActive}
                        onFocus={() => { this.setState({ proposalValueActive: true }) }}
                        onBlur={() => { this.setState({ proposalValueActive: false }) }}
                    />
                </View>
            </React.Fragment>
        )
    }

    proposlNumberSection = () => {
        const _onProposalNumber = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "number");
            this.setState({
                proposalNumber: newText
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Proposal Number</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Proposal Number"}
                        value={this.state.proposalNumber}
                        onChangeText={(value) => _onProposalNumber(value)}
                        isRightIcon={false}
                        keyboardType={"numeric"}
                        height={45}
                        fontSize={14}
                        // refName={ref => this.thirdTextInput = ref}
                        isActive={this.state.proposalNumberActive}
                        onFocus={() => { this.setState({ proposalNumberActive: true }) }}
                        onBlur={() => { this.setState({ proposalNumberActive: false }) }}
                    />
                </View>
            </React.Fragment>
        )
    }

    proposalSent = () => {

        const _onCheckBox = (type) => {
            // this.setState({
            //     showHideCheck: !this.state.showHideCheck,

            // })

            if (type == "yes") {
                if (this.state.showHideCheck == false) {
                    this.setState({
                        showHideCheck: true,
                        proposalSentDate: "",
                        proposalSentDateCheck: false,
                        proposalSentDateRaw: new Date(),
                        nextFollowUpDate: "",
                        nextFollowUpDateCheck: false,
                        nextFollowUpDateRaw: new Date(),
                        imgData: {
                            imgRaw: "",
                            imgUri: ""
                        }
                    })
                }
            } else if (type == "no") {
                if (this.state.showHideCheck == true) {
                    this.setState({
                        showHideCheck: false,
                        proposalSentDate: "",
                        proposalSentDateCheck: false,
                        proposalSentDateRaw: new Date(),
                        nextFollowUpDate: "",
                        nextFollowUpDateCheck: false,
                        nextFollowUpDateRaw: new Date(),
                        imgData: {
                            imgRaw: "",
                            imgUri: ""
                        }
                    })
                }
            };
        }

        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Proposal sent</Text></Text>
                <View style={{ marginTop: 8, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            type={"tick"}
                            borderRadius={30}
                            data={this.state.showHideCheck}
                            onClickValue={() => _onCheckBox("yes")}
                        />
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '8%' }}>Yes</Text>
                    </View>
                    <View style={{ width: 30 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            type={"tick"}
                            borderRadius={30}
                            data={!this.state.showHideCheck}
                            onClickValue={() => _onCheckBox("no")}
                        />
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '8%' }}>No</Text>
                    </View>
                </View>
                {this.state.showHideCheck == true ?
                    <React.Fragment>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.BOLD, marginTop: 15 }}>Upload Proposal</Text>
                        <View style={{ marginTop: 25 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.profileImageView}>
                                    {this.state.imageUploadLoader ?
                                        <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.VIOLET_BLUE} />
                                        :
                                        <Image source={this.state.imgData.imgRaw.length == 0 ? ImageName.LOGIN_BACKGROUND_BIG_IMAGE : { uri: this.state.imgData.imgRaw }} style={styles.profileImage} />
                                    }
                                    <TouchableOpacity style={styles.cameraView}
                                        onPress={() => this._onProfilePicModalVisible()}
                                    >
                                        <Image source={ImageName.CAMERA} style={styles.cameraImg} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.belowImageText}>
                                    <Text style={{
                                        fontSize: FontSize.XS,
                                        fontFamily: FontFamily.FONTS.INTER.REGULAR,
                                        color: Color.COLOR.BLACK.PURE_BLACK
                                    }}>
                                        {"Upload File Below 100mb.\nSupported Format : Jpeg, jpg, png"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {this.proposalSentDateSection()}
                        {this.nextFollowUpDateSection()}
                    </React.Fragment> :
                    null
                }
            </React.Fragment>
        )
    }

    proposalSentDateSection = () => {
        const _onOpenProposalSentDate = () => {
            this.setState({
                proposalSentDateCheck: !this.state.proposalSentDateCheck
            })
        }

        const _onProposalSentDateSelect = (selectedDate) => {
            let proposalSentDateRaw = this.state.proposalSentDateRaw,
                proposalSentDate = "";
            if (selectedDate) {
                proposalSentDate = DateConvert.viewDateFormat(selectedDate)
                proposalSentDateRaw = selectedDate;
            }
            this.setState({
                proposalSentDate: proposalSentDate,
                proposalSentDateRaw: proposalSentDateRaw
            })
            _onOpenProposalSentDate
        }

        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Proposal Sent Date</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity style={styles.canlenderSec}
                        activeOpacity={0.9}
                        onPress={_onOpenProposalSentDate}
                    >
                        <Text style={{
                            color: this.state.proposalSentDate.length == 0 ? Color.COLOR.GRAY.SILVER : Color.COLOR.GRAY.DARK_GRAY_COLOR,
                            fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                            marginLeft: 21,
                            top: 10
                        }}>
                            {this.state.proposalSentDate.length > 0 ? this.state.proposalSentDate : "dd/mm/yyyy"}
                        </Text>
                        <View style={styles.calenderImgSec}>
                            <Image source={ImageName.CALENDER_LOGO} style={styles.calenderLogo} />
                        </View>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={this.state.proposalSentDateCheck}
                        date={this.state.proposalSentDateRaw}
                        // maximumDate={this.state.endDateRaw}
                        mode="date"
                        onConfirm={(date) => _onProposalSentDateSelect(date)}
                        onCancel={() => _onOpenProposalSentDate()}
                    />
                </View>
            </React.Fragment>
        )
    }

    nextFollowUpDateSection = () => {
        const _onOpennextFollowUpDate = () => {
            this.setState({
                nextFollowUpDateCheck: !this.state.nextFollowUpDateCheck
            })
        }

        const _onNextFollowUpDateSelect = (selectedDate) => {
            let nextFollowUpDateRaw = this.state.nextFollowUpDateRaw,
                nextFollowUpDate = "";
            if (selectedDate) {
                nextFollowUpDate = DateConvert.viewDateFormat(selectedDate)
                nextFollowUpDateRaw = selectedDate;
            }
            this.setState({
                nextFollowUpDate: nextFollowUpDate,
                nextFollowUpDateRaw: nextFollowUpDateRaw
            })
            _onOpennextFollowUpDate
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Next Follow Up Date</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity style={styles.canlenderSec}
                        activeOpacity={0.9}
                        onPress={_onOpennextFollowUpDate}
                    >
                        <Text style={{
                            color: this.state.nextFollowUpDate.length == 0 ? Color.COLOR.GRAY.SILVER : Color.COLOR.GRAY.DARK_GRAY_COLOR,
                            fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                            marginLeft: 21,
                            top: 10
                        }}>
                            {this.state.nextFollowUpDate.length > 0 ? this.state.nextFollowUpDate : "dd/mm/yyyy"}
                        </Text>
                        <View style={styles.calenderImgSec}>
                            <Image source={ImageName.CALENDER_LOGO} style={styles.calenderLogo} />
                        </View>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={this.state.nextFollowUpDateCheck}
                        date={this.state.nextFollowUpDateRaw}
                        // maximumDate={this.state.endDateRaw}
                        mode="date"
                        onConfirm={(date) => _onNextFollowUpDateSelect(date)}
                        onCancel={() => _onOpennextFollowUpDate()}
                    />
                </View>
            </React.Fragment>
        )
    }

    customerProposedValue = () => {
        const _oncustomerProposedValue = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "amount");
            this.state.customerProposedValue = newText;
            this.setState({
                customerProposedValue: this.state.customerProposedValue
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>  <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Customer Proposed Value</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Customer Proposed Value (₹)"}
                        value={this.state.customerProposedValue}
                        onChangeText={(value) => _oncustomerProposedValue(value)}
                        isRightIcon={false}
                        keyboardType={"numeric"}
                        height={45}
                        fontSize={14}
                        // refName={ref => this.thirdTextInput = ref}
                        isActive={this.state.customerProposedValueActive}
                        onFocus={() => { this.setState({ customerProposedValueActive: true }) }}
                        onBlur={() => { this.setState({ customerProposedValueActive: false }) }}
                    />
                </View>
            </React.Fragment>
        )
    }

    mutuallyAgreedContactValueSection = () => {
        const _onMutuallyAgreedContactValue = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "amount");
            this.state.mutuallyAgreedContactValue = newText;
            this.setState({
                mutuallyAgreedContactValue: this.state.mutuallyAgreedContactValue
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Mutually Agreed Contact Value</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Mutually Agreed Contact Value (₹)"}
                        value={this.state.mutuallyAgreedContactValue}
                        onChangeText={(value) => _onMutuallyAgreedContactValue(value)}
                        isRightIcon={false}
                        keyboardType={"numeric"}
                        height={45}
                        fontSize={14}
                        // refName={ref => this.thirdTextInput = ref}
                        isActive={this.state.mutuallyAgreedContactValueActive}
                        onFocus={() => { this.setState({ mutuallyAgreedContactValueActive: true }) }}
                        onBlur={() => { this.setState({ mutuallyAgreedContactValueActive: false }) }}
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
                        closingDate: "",
                        closingDateCheck: false,
                        closingDateRaw: new Date(),
                        closingDescription: "",
                        closingDescriptionActive: false,
                        selectedReason: {},
                    })
                }
            } else if (type == "no") {
                if (this.state.closeWonOrLost == true) {
                    this.setState({
                        closeWonOrLost: false,
                        closingDate: "",
                        closingDateCheck: false,
                        closingDateRaw: new Date(),
                        closingDescription: "",
                        closingDescriptionActive: false,
                        closingAmount: "",
                        closingAmountActive: false,
                    })
                }
            };
        }
        return (
            <React.Fragment>
                {/* <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Proposal sent</Text></Text> */}
                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            type={"tick"}
                            borderRadius={0}
                            data={this.state.closeWonOrLost}
                            onClickValue={() => _onCheckBox("yes")}
                        />
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '8%' }}>Closed Won</Text>
                    </View>
                    <View style={{ width: 30 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            type={"tick"}
                            borderRadius={0}
                            data={!this.state.closeWonOrLost}
                            onClickValue={() => _onCheckBox("no")}
                        />
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '8%' }}>Closed Lost</Text>
                    </View>
                </View>
                {this.state.closeWonOrLost ?
                    <React.Fragment>
                        {this._closingAmount()}
                        {this._closingDate()}
                        {this._description()}
                    </React.Fragment>
                    :
                    <React.Fragment>
                        {this._closingReason()}
                        {this._closingDate()}
                        {this._description()}
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }

    _closingReason = () => {
        const _onSelectReason = (value) => {
            this.setState({
                selectedReason: value
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Reason</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <DropdownInputBox
                        selectedValue={this.state.selectedReason.id ? this.state.selectedReason.id.toString() : "0"}
                        data={this.state.reasonList}
                        onSelect={(value) => _onSelectReason(value)}
                        headerText={"Select Reason"}
                        // selectedText={this.state.selectedZoneObj.name ? this.state.selectedZoneObj.name : "Zone"}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                    />
                </View>
            </React.Fragment>
        )
    }

    _closingDate = () => {
        const _onOpenClosingDate = () => {
            this.setState({
                closingDateCheck: !this.state.closingDateCheck
            })
        }

        const _onClosingDateSelect = (selectedDate) => {
            let closingDateRaw = this.state.closingDateRaw,
                closingDate = "";
            if (selectedDate) {
                closingDate = DateConvert.viewDateFormat(selectedDate)
                closingDateRaw = selectedDate;
            }
            this.setState({
                closingDate: closingDate,
                closingDateRaw: closingDateRaw
            })
            _onOpenClosingDate
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Closing Date</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity style={styles.canlenderSec}
                        activeOpacity={0.9}
                        onPress={_onOpenClosingDate}
                    >
                        <Text style={{
                            color: this.state.closingDate.length == 0 ? Color.COLOR.GRAY.SILVER : Color.COLOR.GRAY.DARK_GRAY_COLOR,
                            fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                            marginLeft: 21,
                            top: 10
                        }}>
                            {this.state.closingDate.length > 0 ? this.state.closingDate : "dd/mm/yyyy"}
                        </Text>
                        <View style={styles.calenderImgSec}>
                            <Image source={ImageName.CALENDER_LOGO} style={styles.calenderLogo} />
                        </View>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={this.state.closingDateCheck}
                        date={this.state.closingDateRaw}
                        // maximumDate={this.state.endDateRaw}
                        mode="date"
                        onConfirm={(date) => _onClosingDateSelect(date)}
                        onCancel={() => _onOpenClosingDate()}
                    />
                </View>
            </React.Fragment>
        )
    }

    _description = () => {
        const _onClosingDescription = (value) => {
            this.state.closingDescription = value;
            this.setState({
                closingDescription: this.state.closingDescription
            })
        }
        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>  <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Description</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Description"}
                        value={this.state.closingDescription}
                        onChangeText={(value) => _onClosingDescription(value)}
                        // isRightIcon={false}
                        // keyboardType={"numeric"}
                        alignItems={"flex-start"}
                        height={110}
                        fontSize={14}
                        multiline={true}
                        // refName={ref => this.thirdTextInput = ref}
                        isActive={this.state.closingDescriptionActive}
                        onFocus={() => { this.setState({ closingDescriptionActive: true }) }}
                        onBlur={() => { this.setState({ closingDescriptionActive: false }) }}
                    />
                </View>
            </React.Fragment>
        )
    }

    _closingAmount = () => {
        const _onChangeAmount = (value) => {
            let newText = '';
            newText = DataValidator.inputEntryValidate(value, "amount");
            this.setState({
                closingAmount: newText
            })
        }

        return (
            <React.Fragment>
                <Text style={{ color: Color.COLOR.RED.PURE_RED, marginTop: 15, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>*<Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, marginTop: 5, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>Amount</Text></Text>
                <View style={{ marginTop: 10 }}>
                    <TextInputBox
                        placeholder={"Enter Closing Amount (₹)"}
                        value={this.state.closingAmount}
                        onChangeText={(value) => _onChangeAmount(value)}
                        isRightIcon={false}
                        height={45}
                        fontSize={14}
                        keyboardType={"numeric"}
                        isActive={this.state.closingAmountActive}
                        refName={ref => this.firstTextInput = ref}
                        onFocus={() => { this.setState({ closingAmountActive: true }) }}
                        onBlur={() => { this.setState({ closingAmountActive: false }) }}
                    />
                </View>
            </React.Fragment>
        )
    }

    _imageUploadModalSection = () => {
        const OnChooseGallery = async () => {
            let uploadData = await FileUpload.uploadImg();
            await ImageUploadApiCall(uploadData);
        }

        const OnChooseCamera = async () => {
            let uploadData = await FileUpload.uploadCameraImg();
            await ImageUploadApiCall(uploadData);
        }

        const ImageUploadApiCall = async (uploadData) => {
            this.setState({ visibleProfileImgUploadModal: false, imageUploadLoader: true })
            let imgData = await MiddlewareFileCheck("imageupload", uploadData,this.props);
            if (imgData === false) {
                this._onNetworkError();
            } else {
                if (imgData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                    this.state.imgData.imgUri = imgData.data.path + imgData.data.fileName;
                    this.state.imgData.imgRaw = uploadData.uri;
                }
            }
            this.setState({ imageUploadLoader: false })
        }

        return (
            <ImageUploadModal
                isVisible={this.state.visibleProfileImgUploadModal}
                onGallerySelect={(value) => OnChooseGallery(value)}
                onCameraSelect={(value) => OnChooseCamera(value)}
                onCloseModal={(value) => this._onProfilePicModalVisible(value)}
            />
        )
    }

    // for profile image upload visible
    _onProfilePicModalVisible = async () => {
        this.setState({
            visibleProfileImgUploadModal: !this.state.visibleProfileImgUploadModal
        })
    }


    render() {
        return (
            // <SafeAreaView style={styles.container}>
            <Modal
                isVisible={this.props.isVisiable}
                onBackButtonPress={() => this.onRequestCloseModal()}
                onBackdropPress={() => this.onRequestCloseModal()}
                onRequestClose={() => this.onRequestCloseModal()}
                padding={10}
                children={
                    <View style={styles.modalview}>

                        {this._imageUploadModalSection()}

                        <View style={styles.modalHeaderSec}>
                            <TouchableOpacity style={styles.cancelSec}
                                activeOpacity={0.8}
                                onPress={() => this.onRequestCloseModal()}  >
                                <Image source={ImageName.WHITE_CROSS} style={styles.cancelImg} />
                            </TouchableOpacity>
                            <View style={styles.marginView}>
                                <Text style={styles.profileNameText}>Mark This Stage As Completed</Text>
                            </View>
                        </View>
                        {this.state.pageloader ?
                            <View style={{ height: Dimension.height / 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Loader />
                            </View>
                            :
                            <ScrollView>
                                <View style={{ marginHorizontal: '5%', marginTop: 8 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD }}>Present Stage Name : <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD }}>{this.props.stageName ? this.props.stageName : ""}</Text></Text>
                                    {this.props.type == "markStage" ?
                                        <React.Fragment>
                                            {this.nextStageChooseSection()}
                                            {this._amountSection()}
                                            {this.probablityOfWiningSection()}
                                            {this.expectedRevenueSection()}
                                            {this.expectedCloseingDateSection()}
                                            {this.followUpDateSection()}
                                            {this.proposalValueSection()}
                                            {this.proposlNumberSection()}
                                            {this.proposalSent()}
                                            {this.customerProposedValue()}
                                            {this.mutuallyAgreedContactValueSection()}
                                            {this.closeSection()}
                                            <View style={{ marginTop: 15, marginHorizontal: '15%' }}>
                                                <BigTextButton
                                                    height={45}
                                                    borderRadius={16}
                                                    backgroundColor={'#3168ff'}
                                                    text={"Submit"}
                                                    // isRightIcon={true}
                                                    // rightIcon={ImageName.NEXT_PAGE_IMG}
                                                    onPress={() => this._onSubmitButton()}
                                                />
                                            </View>
                                        </React.Fragment> :
                                        <View>
                                            {this._amountSection()}
                                            {this.probablityOfWiningSection()}
                                            {this.expectedRevenueSection()}
                                            {this.expectedCloseingDateSection()}
                                            {this.followUpDateSection()}
                                            <View style={{ marginTop: 15, marginHorizontal: '15%' }}>

                                                <BigTextButton
                                                    height={30}
                                                    borderRadius={16}
                                                    backgroundColor={Color.COLOR.GREEN.SEA_GREEN}
                                                    text={"Update"}
                                                    // isRightIcon={true}
                                                    // rightIcon={ImageName.NEXT_PAGE_IMG}
                                                    onPress={() => this._onUpdateButton()}
                                                />
                                            </View>
                                        </View>



                                    }
                                </View>
                            </ScrollView>
                        }

                        {/* <View style={{ marginBottom: 20 }} /> */}
                    </View>
                }
            />
            // </SafeAreaView>
        )
    }

}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateUserInformation,
        stateCheckForNetwork
    }, dispatch);



export default connect(mapStateToProps, mapDispatchToProps)(MarkStageCompletedModal);
