import React from "react";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../enums';
import styles from './Style';
import { SafeAreaView, Text, View, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import {
    stateCheckForNetwork,
    setDeviceId,
    stateAllCountries,
    stateUserInformation
} from '../../../../redux/Sales360Action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { BigTextButton, DropdownInputBox, DynamicProgressBar, TextInputBox } from "../../../../shared";



class GamificationChallengePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideButtonSec: false
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
    }

    headerSection = () => {
        return (
            <View style={styles.headrFlexRow}>
                <TouchableOpacity onPress={() => this._onBack()} >
                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <View style={styles.headrFlexRow}>
                    <View style={styles.coinMainView}>
                        <Image source={ImageName.YELLOW_COIN_ICON} style={styles.coinLogo} />
                        <View style={{ width: 2 }} />
                        <Text style={styles.textCoinText}>200</Text>
                    </View>
                </View>
                <View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.threeDotImg} />
                </View>
            </View>
        )
    }

    youProgressBarSection = () => {
        return (
            <View style={{ marginTop: 20, alignItems: "center", flex: 1, }}>
                <DynamicProgressBar
                    data={(this.props.route.params.data.userAchievedPercentage / 10)}
                    // data={9}
                    fontSize={12}
                    type={"shak"}
                    height={40}
                    borderRadius={25}
                    backgroundColor={"#FFBD3D"}
                    activeFontColor={Color.COLOR.WHITE.PURE_WHITE}
                    primaryFontColor={Color.COLOR.BLACK.PURE_BLACK}
                    // mainValue={100}
                    // totalValue={400}
                    actualWidth={Dimension.width - 30}
                    additionalStyle={{ width: Dimension.width - 30 }}

                    isText={false} />
            </View>
        )
    }
    otherProgressBarSection = () => {
        return (
            <View style={{ marginTop: 5, alignItems: "center" }}>
                <DynamicProgressBar

                    data={(this.props.route.params.data.opponentAchievedPercentage / 10)}
                    // data={10}
                    fontSize={12}
                    type={"shak"}
                    height={40}
                    borderRadius={25}
                    backgroundColor={"#149CE0"}
                    activeFontColor={Color.COLOR.WHITE.PURE_WHITE}
                    primaryFontColor={Color.COLOR.BLACK.PURE_BLACK}
                    // mainValue={100}
                    // totalValue={400}  
                    actualWidth={Dimension.width - 30}
                    additionalStyle={{ width: Dimension.width - 30 }}
                    isText={false} />
            </View>
        )
    }

    onPressNo = () => {
        this.setState({ hideButtonSec: true })
    }
    onPressYes = () => {
        this.setState({ hideButtonSec: true })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.headerSection()}
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.mainView}>
                        <View style={styles.centerView}>
                            <Image source={ImageName.GET_THE_TROPHY_ICON} style={styles.challengeLogo} />
                            <Text style={styles.challengeText}>Challenge</Text>
                            <View style={styles.textCenterView}>
                                <View style={styles.skyCircel} />
                                <Text style={styles.personNameText}>{this.props.route.params.data.opponentName}</Text>
                                <Text style={styles.vsText}>Vs</Text>
                                <View style={styles.yellowCircel} />
                                <Text style={styles.youText}>You</Text>
                            </View>
                        </View>
                        <View style={styles.textSalesTarget}>
                            <Text style={styles.targetRemoveText}>Sales Challenge Target : <Text style={styles.targetRemoveText}>{this.props.route.params.data.challengeTargetQty}MT</Text></Text>
                            <Text style={styles.salesData}>{this.props.route.params.data.challengeEndDate}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                                <Image source={{ uri: this.props.route.params.data.opponentProfilePic }} style={styles.personLogo} />
                                <View style={styles.profileYellowCircel} />
                                <View style={styles.gamificationColumn}>
                                    <Text style={styles.personNameText}>{this.props.route.params.data.opponentName}</Text>
                                    <Text style={styles.salesExcitiveText}></Text>
                                    <Text style={styles.addressText}></Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: 0.5, alignItems: 'flex-end' }}>
                                <Text style={styles.addressText}>Achieved :<Text style={styles.achivementNo}>{this.props.route.params.data.opponentTotalAmount}MT</Text></Text>
                                <Text style={styles.persentNoText}>{this.props.route.params.data.opponentTargetPercentage}%</Text>
                                <Text style={styles.targetRemoveText}>remain to win</Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: 20, marginRight: 20 }}>
                            {this.youProgressBarSection()}
                        </View>

                        {this.otherProgressBarSection()}
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                                <Image source={{ uri: this.props.route.params.data.userProfilePic }} style={styles.personLogo} />
                                <View style={styles.profileSkyCircel} />
                                <View style={styles.gamificationColumn}>
                                    <Text style={styles.personNameText}>You</Text>
                                    <Text style={styles.salesExcitiveText}></Text>
                                    <Text style={styles.addressText}></Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: 0.5, alignItems: 'flex-end' }}>
                                <Text style={styles.addressText}>Achieved :<Text style={styles.achivementNo}>{this.props.route.params.data.userTotalAmount}MT</Text></Text>
                                <Text style={styles.persentNoText}>{this.props.route.params.data.userTargetPercentage}%</Text>
                                <Text style={styles.targetRemoveText}>remain to win</Text>
                            </View>
                        </View>
                        <View style={styles.hurryTextSec}>
                            <Text style={styles.hurryTextAchive}>Hurry ! Achieve the goal quickly</Text>
                            <Text style={styles.textAchivementText}>Achievement more than target will give you additional bonus</Text>
                        </View>
                        {this.state.hideButtonSec ?
                            null
                            :
                            <View style={styles.buttonView}>
                                <Text style={styles.ogleTimeText}>Do you think you could achieve the goal by the time ? </Text>
                                <View style={styles.twoButtonView}>
                                    <BigTextButton
                                        text={"No"}
                                        borderRadius={22}
                                        backgroundColor={"#fff"}
                                        fontColor={"#000"}
                                        height={50}
                                        additionalStyles={{ borderColor: "#000", borderWidth: 0.8 }}
                                        onPress={() => this.onPressNo()}
                                    />
                                    <View style={{ width: 12 }} />
                                    <BigTextButton
                                        text={"Yes"}
                                        backgroundColor={"#1F2B4D"}
                                        borderRadius={22}
                                        height={50}
                                        onPress={() => this.onPressYes()}
                                    />
                                </View>

                            </View>
                        }



                        <View style={{ marginTop: 20 }} />
                    </View>
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(GamificationChallengePage);