import React from "react";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../enums';
import styles from './style';
import { SafeAreaView, Text, View, Image, ActivityIndicator, ImageBackground } from 'react-native';
import {
    stateCheckForNetwork,
    setDeviceId,
    stateAllCountries,
    stateUserInformation
} from '../../../../redux/Sales360Action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { BigTextButton, DropdownInputBox, Modal, TextInputBox } from "../../../../shared";
import { GamificationLeadProgress } from "../../../../pageShared";
import { MiddlewareCheck } from "../../../../services/middleware";
import { ErrorCode } from "../../../../services/constant";
import { DateConvert, Toaster } from "../../../../services/common-view-function";
import { enquiryModifyData } from "./function";

class GamificationLeadStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leadProgressDetails: [],
            congratulationModal: false,
            pageLoader: true,
            collectCoinsLoader:false,
            titleName: this.props.route.params.data.enqueryTitle,

        }
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        await this.getHistoryLogOfLead()
    }

    getHistoryLogOfLead = async () => {
        let dataReq = { leadId: this.props.route.params.data.leadRefId.toString() }
        this.setState({ pageLoader: true })
        let responseData = await MiddlewareCheck("getHistoryLogOfLead", dataReq, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({ leadProgressDetails: enquiryModifyData(responseData.response).list })
                // Toaster.ShortCenterToaster(responseData.message)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ pageLoader: false })
    }

    headerSection = () => {
        return (
            <View style={styles.headerMainView}>
                <TouchableOpacity onPress={() => this._onBack()} >
                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <View style={styles.headerCoinsSec}>
                    <View style={styles.headerCoinUnderSec}>
                        <Image source={ImageName.YELLOW_COIN_ICON} style={styles.yellowCoinsLogo} />
                        <View style={{ width: 2 }} />
                        <Text style={styles.textcoinsNum}>200</Text>
                    </View>
                </View>
                {/* <View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.threeDot} />
                </View> */}
            </View>
        )
    }

    modalSection = () => {
        return (
            <Modal
                isVisible={this.state.congratulationModal}
                // padding={modalPadding}
                onRequestClose={() => this.closeModal()}
                // onBackdropPress={() => this.onOpenCongratulationModal()}
                onBackButtonPress={() => this.closeModal()}
                children={
                    <View style={styles.modalstatusview}>
                        <ImageBackground source={ImageName.CELEBRATION_LOGO} style={{ resizeMode: "contain", marginTop: 10 }}>
                            <View style={styles.marginView}>
                                <Text style={styles.profileNameText}></Text>
                                <TouchableOpacity style={{ marginRight: 10 }} activeOpacity={0.9} onPress={() => this.onOpenCongratulationModal()}>
                                    <Image source={ImageName.BLACK_CROSS_LOGO} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 30 }}>
                                <Image source={ImageName.YELLOW_STAR_ICON} style={{ height: 120, width: 120, resizeMode: "contain" }} />

                            </View>
                        </ImageBackground>
                        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
                            <Text style={styles.congratulationTxt}>Congratulations</Text>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
                            <Text style={styles.congratulationBottomTxt}>You have successfully add a new Dealer and win</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
                            <View>
                                <Image source={ImageName.YELLOW_COIN_ICON} style={{ height: 40, width: 40, resizeMode: "contain" }} />

                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.pointAmountTxt}>200</Text>
                                <Text style={styles.pointTxt}>points</Text>
                            </View>
                        </View>
                    </View>
                }
            />
        )
    }

    openModal = () => {
        this.props.navigation.navigate("GamificationDashboard")
    }

    closeModal = () => {
        this.setState({ congratulationModal: false })
    }

    _onColectCoins = async () => {
        let reqData = {
            "type": "leadConversion",
            "pointEarned": "200",
            "pointsEarnedDateTime": DateConvert.fullDateFormat(new Date()),
            "description":"Your reffered lead is converted"
        }
        this.setState({collectCoinsLoader:true})
        let responseData = await MiddlewareCheck("collectPointsForUser", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message)
                this.openModal()
            }
        }
        this.setState({collectCoinsLoader:false})
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.headerSection()}
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height / 1.4, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                    </View>
                    :
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={styles.mainView}>
                            <View style={styles.imageSec}>
                                <Image source={ImageName.LEAD_REFER_ICON} style={styles.referLeadLogo} />
                                <Text style={styles.leadStatusText}>Lead Status</Text>
                                <View style={{ marginTop: 8, flexDirection: 'row' }}>
                                    <Text style={styles.leadReferAtText}>Lead Refer at</Text>
                                    <View style={{ width: 5 }} />
                                    <Text style={styles.leadDateText}>29th April 2023</Text>
                                </View>
                            </View>
                            <View style={styles.rowFlex}>
                                <View style={styles.flexColumn}>
                                    <Text style={styles.leadOwanerText}>{this.props.route.params.data.enqueryTitle}</Text>
                                    <Text style={styles.dealerText}>{this.props.route.params.data.enquerySourceName}</Text>
                                    <Text style={styles.addressStatusText}>{this.props.route.params.data.districtName}, {this.props.route.params.data.zoneName}</Text>
                                </View>
                                <View style={styles.flexEnd}>
                                    <Text style={{ color: "#F13748", fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginTop: 3 }} />
                                    <Text style={styles.addressStatusText}>Last Status : <Text style={styles.verifiedText}>{this.props.route.params.data.approvedStatus == "1" ? "Verified" : "Not Verified"}</Text></Text>
                                    <Text style={styles.dateText}>{DateConvert.formatDDfullMonthYYYY(this.props.route.params.data.modifiedAt)}</Text>
                                </View>
                            </View>
                            <View style={styles.leadProgessDetailsTextSec}>
                                <Text style={styles.leadProgressDetailsText}>Lead Progress Detail</Text>
                            </View>
                            <View style={{ marginTop: 30 }}>
                                <GamificationLeadProgress
                                    data={this.state.leadProgressDetails}
                                />
                            </View>
                            {this.props.route.params.data.isConverted == "1" ?
                                <>
                                    <View style={styles.earnedTextSec}>
                                        <Text style={styles.youEarnedText}>You Have <Text style={styles.earnedText}>earned</Text></Text>
                                        <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                            <Image source={ImageName.YELLOW_COIN_ICON} style={styles.coinsIcon} />
                                            <View style={styles.coinsTwoTextColumnSec}>
                                                <Text style={styles.coinNumberText}>200</Text>
                                                <Text style={styles.textCoins}>Coins</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.buttonView}>
                                        
                                        <BigTextButton
                                            onPress={() => this._onColectCoins()}
                                            text={"Collect the Coins"}
                                            backgroundColor={"#1F2B4D"}
                                            borderRadius={22}
                                            height={35}
                                            fontSize={13}
                                        />
                                    </View>
                                </>
                                :
                                null} 
                            <View style={{ marginTop: 20 }} />
                        </View>
                    </ScrollView>
                }
                {this.modalSection()}

            </SafeAreaView >
        )
    };
};

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
        setDeviceId,
        stateAllCountries,
        stateUserInformation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(GamificationLeadStatus);