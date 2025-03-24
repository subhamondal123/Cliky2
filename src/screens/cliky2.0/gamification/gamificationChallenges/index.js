import React, { Component } from 'react'
import { View, Text, FlatList, RefreshControl, ScrollView, SafeAreaView } from 'react-native'
import { CustomStyle } from '../../../style'
import { Image } from 'react-native'
import { Color, Dimension, ImageName } from '../../../../enums'
import styles from './styles'
import { DynamicGamificationCard, DynamicGamificationTile } from '../../../../pageShared'
import { TouchableOpacity } from 'react-native'
import { BigTextButton, DynamicProgressBar, VirtualizedView } from '../../../../shared'

const cardData = {
    icon: ImageName.CARD_KING_LOGO,
    position: "1",
    executiveCount: "80",
    achievementPercentage: "80",
    lastDate: "2011-08-12T20:17:46.384Z",
    backgroundColor: "#604D8B"
}

const progressData = {
    mainPercent: "68",
    activeLabel: "2345MT.",
    primaryLabel: "324MT.",
    mainColor: "#F13748",
    totalColor: "#F0F4F7"
}

const listData = [
    {
        profilePic: ImageName.DUMMY_PROFILE,
        number: "1",
        position: "st",
        name: "Roma",
        zone: "Malda, Zone 2",
        achieved: "80"
    },
    {
        profilePic: ImageName.DUMMY_PROFILE,
        number: "2",
        position: "nd",
        name: "Roma",
        zone: "Malda, Zone 2",
        achieved: "80"
    },
    {
        profilePic: ImageName.DUMMY_PROFILE,
        number: "3",
        position: "rd",
        name: "Roma",
        zone: "Malda, Zone 2",
        achieved: "80"
    },
    {
        profilePic: ImageName.DUMMY_PROFILE,
        number: "4",
        position: "th",
        name: "Roma",
        zone: "Malda, Zone 2",
        achieved: "80"
    },
    {
        profilePic: ImageName.DUMMY_PROFILE,
        number: "5",
        position: "th",
        name: "Roma",
        zone: "Malda, Zone 2",
        achieved: "80"
    },
    {
        profilePic: ImageName.DUMMY_PROFILE,
        number: "6",
        position: "th",
        name: "Roma",
        zone: "Malda, Zone 2",
        achieved: "80"
    },
    {
        profilePic: ImageName.DUMMY_PROFILE,
        number: "7",
        position: "th",
        name: "Roma",
        zone: "Malda, Zone 2",
        achieved: "80"
    },
]

class ChallengesList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ""
        }
    }

    componentDidMount = () => {

    }

    _onBack = () => {
        this.props.navigation.goBack();
    };


    headerSection = () => {
        return (
            <View style={{ flexDirection: "row", marginVertical: 10, alignItems: "center" }}>
                <TouchableOpacity onPress={() => this._onBack()} activeOpacity={0.9}>
                    <Image source={ImageName.BACK_IMG} style={{ height: 28, width: 28, resizeMode: "contain" }} />

                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                {/* <View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 25, width: 25, resizeMode: "contain" }} />
                </View> */}
            </View>
        )
    }

    headingLabelSection = () => {
        return (
            <View style={{ flexDirection: "row", marginVertical: 10, alignItems: "center" }}>
                <Text style={styles.headingTxt}>Challenges</Text>
                <View style={{ flex: 1, backgroundColor: "red" }} />
                {/* <View style={styles.rewardPointSec}>
                    <View style={{ marginRight: 5 }}>
                        <Image source={ImageName.YELLOW_COIN_ICON} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                    </View>
                    <Text style={styles.pointsTxt}>200</Text>
                </View> */}
            </View>
        )
    }

    challengesGivenFromSection = () => {
        return (
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headingLabelTxt}>Challenges given from</Text>
                </View>
                <View style={styles.rewardPointSec}>
                    <View style={{ marginRight: 10 }}>
                        <Image source={ImageName.CUP_WITH_HAND_ICON} style={{ height: 25, width: 25, resizeMode: "contain" }} />
                    </View>
                    <Text style={styles.membersSecTxt}>3 Team / 25 Members</Text>
                </View>
            </View>
        )
    }

    cardSection = () => {
        return (
            <DynamicGamificationCard data={cardData} />
        )
    }

    progressBarSection = () => {
        return (
            <View style={{ marginTop: 15 }}>
                <DynamicProgressBar
                    data={6.5}
                    fontSize={12}
                    type={"shak"}
                    height={40}
                    borderRadius={25}
                    backgroundColor={Color.COLOR.RED.AMARANTH}
                    activeFontColor={Color.COLOR.WHITE.PURE_WHITE}
                    primaryFontColor={Color.COLOR.BLACK.PURE_BLACK}
                    mainValue={100}
                    totalValue={400}
                    isText={false} />
            </View>
        )
    }

    renderList = (item) => {
        return (
            <View >
                <View style={{ marginHorizontal: '2%' }}>
                    {this.ListData(item.item, item.index)}
                </View>
            </View>
        );
    };

    ListData = (item, key) => {
        return (
            <View style={{ marginTop: 15 }} >
                <DynamicGamificationTile data={item} />
            </View>
        )
    };

    renderLoader = () => {
        return (
            <View style={{ height: 500 }} />
        )
    };

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <VirtualizedView>
                    <View style={{ marginHorizontal: 15 }}>
                        {this.headerSection()}
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            {this.headingLabelSection()}
                            {this.challengesGivenFromSection()}
                            {this.cardSection()}
                            {this.progressBarSection()}
                            <View style={{ marginTop: 5 }}>

                                <View>
                                    <FlatList
                                        data={listData}
                                        renderItem={(item, key) => this.renderList(item, key)}
                                        keyExtractor={(item, key) => key}
                                        onEndReached={this.fetchMore}
                                        onEndReachedThreshold={0.1}
                                        // ListFooterComponent={this.renderLoader}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                    //  refreshControl={
                                    //      <RefreshControl
                                    //          refreshing={this.state.refreshing}
                                    //          onRefresh={() => this.onRefresh()}
                                    //      />
                                    //  }
                                    />


                                </View>

                                <View style={{ marginTop: 25, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={styles.bottomTxt}>Do you agree to Accept the Challenge with the team ?</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 20 }}>
                                    <View style={{ width: 80 }}>
                                        <BigTextButton
                                            borderRadius={25}
                                            backgroundColor={Color.COLOR.WHITE.PURE_WHITE}
                                            text={"No"}
                                            fontColor={Color.COLOR.BLUE.EBONY_CLAY}
                                            additionalStyles={{ borderWidth: 0.5, borderColor: Color.COLOR.BLUE.EBONY_CLAY }}
                                            fontSize={12}

                                        />
                                    </View>

                                    <View style={{ flex: 1 }} />
                                    <View style={{ width: 80 }}>
                                        <BigTextButton
                                            borderRadius={25}
                                            backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                            text={"Yes"}
                                            fontSize={12}
                                        />
                                    </View>

                                </View>
                                <View style={{ height: 50 }} />
                            </View>
                        </ScrollView>

                    </View>
                </VirtualizedView>
            </SafeAreaView >

        )
    }
}

export default ChallengesList