import React from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../enums";
import { Modal } from "../../../../shared";
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from "./style";

const stageData = [
    {
        id: 1,
        icon: ImageName.OPEN_BOOK,
        name: "Initiation",
        date: "10-05-2022",
        isCompleted: true
    },
    {
        id: 2,
        icon: ImageName.DIRECTIONS,
        name: "Follow up",
        date: "10-05-2022",
        isCompleted: true
    },
    {
        id: 3,
        icon: ImageName.CLIPBOARD,
        name: "Assigned",
        date: "10-05-2022",
        isCompleted: false
    },
    {
        id: 4,
        icon: ImageName.COINS,
        name: "Call",
        date: "10-05-2022",
        isCompleted: false
    },
    {
        id: 5,
        icon: ImageName.REVARSE,
        name: "Visited",
        date: "10-05-2022",
        isCompleted: false
    },
    {
        id: 6,
        icon: ImageName.CROSSED_EYE,
        name: "Email",
        date: "10-05-2022",
        isCompleted: false
    },
]

class ProgressModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            allData: {},

        };
    }

    onRequestCloseModal = () => {
        this.props.onRequestClose();
    }

    progressBarSection = () => {
        return (
            <View style={styles.progessSection}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.progressMainView, { flex: 0.1 }]}>
                        {stageData.map((item, key) => (
                            <React.Fragment key={key}>
                                <View style={styles.eachNumberCommonView}>
                                    <View style={item.isCompleted ? styles.numberCircleActive : styles.numberCircleInactive}>
                                        <Text style={item.isCompleted ? styles.numTextActive : styles.numText}>
                                            {item.id}
                                        </Text>
                                    </View>
                                </View>

                                {key == stageData.length - 1 ?
                                    null
                                    :
                                    <View style={item.isCompleted ? styles.lineViewActive : styles.lineView} />
                                }

                                {/* <View style={styles.eachNumberCommonView}>
                                <View style={this.state.pageNum == 2 ? styles.numberCircleActive : this.state.isAdditionalInformationCompleted ? styles.numberCircleCompleted : styles.numberCircle}>
                                    <Text style={this.state.pageNum == 2 ? styles.numTextActive : this.state.isAdditionalInformationCompleted ? styles.numTextCompleted : styles.numText}>
                                        2
                                    </Text>
                                </View>
                            </View>

                            <View style={this.state.pageNum == 2 ? styles.lineViewActive : this.state.isAdditionalInformationCompleted ? styles.lineViewCompleted : styles.lineView} />

                            <View style={styles.eachNumberCommonView}>
                                <View style={this.state.pageNum == 3 ? styles.numberCircleActive : this.state.isDescriptionCompleted ? styles.numberCircleCompleted : styles.numberCircle}>
                                    <Text style={this.state.pageNum == 3 ? styles.numTextActive : this.state.isDescriptionCompleted ? styles.numTextCompleted : styles.numText}>
                                        3
                                    </Text>
                                </View>
                            </View>

                            <View style={this.state.pageNum == 3 ? styles.lineViewActive : this.state.isDescriptionCompleted ? styles.lineViewCompleted : styles.lineView} />

                            <View style={styles.eachNumberCommonView}>
                                <View style={this.state.pageNum == 4 ? styles.numberCircleActive : this.state.isProductInterestedCompleted ? styles.numberCircleCompleted : styles.numberCircle}>
                                    <Text style={this.state.pageNum == 4 ? styles.numTextActive : this.state.isProductInterestedCompleted ? styles.numTextCompleted : styles.numText}>
                                        4
                                    </Text>
                                </View>
                            </View>

                            <View style={this.state.pageNum == 4 ? styles.lineViewActive : this.state.isProductInterestedCompleted ? styles.lineViewCompleted : styles.lineView} />

                            <View style={styles.eachNumberCommonView}>
                                <View style={this.state.pageNum == 5 ? styles.numberCircleActive : this.state.isCurrentAndCompetitorCompleted ? styles.numberCircleCompleted : styles.numberCircle}>
                                    <Text style={this.state.pageNum == 5 ? styles.numTextActive : this.state.isCurrentAndCompetitorCompleted ? styles.numTextCompleted : styles.numText}>
                                        5
                                    </Text>
                                </View>
                            </View>

                            <View style={this.state.pageNum == 5 ? styles.lineViewActive : this.state.isCurrentAndCompetitorCompleted ? styles.lineViewCompleted : styles.lineView} />

                            <View style={styles.eachNumberCommonView}>
                                <View style={this.state.pageNum == 6 ? styles.numberCircleActive : this.state.isVisibilityPermissionCompleted ? styles.numberCircleCompleted : styles.numberCircle}>
                                    <Text style={this.state.pageNum == 6 ? styles.numTextActive : this.state.isVisibilityPermissionCompleted ? styles.numTextCompleted : styles.numText}>
                                        6
                                    </Text>
                                </View>
                            </View> */}
                            </React.Fragment>
                        ))}
                    </View>
                    <View style={[styles.progressMainView, { flex: 0.3, alignItems: 'flex-start' }]}>
                        {stageData.map((item, key) => (
                            <React.Fragment key={key}>
                                {/* <Image source={item.icon} style={{ height: 25, width: 25 }} /> */}
                                <Text style={styles.stageName}>{item.name + "\n" + item.date}</Text>
                                {key == stageData.length - 1 ?
                                    null
                                    :
                                    <View style={{ flex: 1 }} />
                                }
                                {/* <Image source={ImageName.DIRECTIONS} style={{ height: 25, width: 25 }} />
                            <View style={{ flex: 1 }} />
                            <Image source={ImageName.CLIPBOARD} style={{ height: 25, width: 25 }} />
                            <View style={{ flex: 1 }} />
                            <Image source={ImageName.COINS} style={{ height: 25, width: 25 }} />
                            <View style={{ flex: 1 }} />
                            <Image source={ImageName.REVARSE} style={{ height: 25, width: 25 }} />
                            <View style={{ flex: 1 }} />
                            <Image source={ImageName.CROSSED_EYE} style={{ height: 25, width: 25 }} /> */}
                            </React.Fragment>
                        ))}
                    </View>
                    <View style={{ flex: 0.6, marginHorizontal: 10 }}>
                        <View style={{ marginTop: 15 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.profileImageView}>
                                    <Image source={ImageName.LOGIN_BACKGROUND_BIG_IMAGE} style={styles.profileImage} />
                                    {/* <TouchableOpacity style={styles.cameraView}
                                        onPress={() => this._onProfilePicModalVisible()}
                                    >
                                        <Image source={ImageName.CAMERA} style={styles.cameraImg} />
                                    </TouchableOpacity> */}
                                </View>

                                <View style={styles.belowImageText}>
                                    <Text style={{
                                        fontSize: FontSize.MD,
                                        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
                                        color: Color.COLOR.BLACK.PURE_BLACK
                                    }}>
                                        Saikat Das
                                    </Text>
                                    <Text style={{
                                        fontSize: FontSize.XS,
                                        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
                                        color: Color.COLOR.BLACK.PURE_BLACK
                                    }}>
                                        Marketing Office
                                    </Text>
                                    <AirbnbRating
                                        showRating={false}
                                        count={5}
                                        defaultRating={4}
                                        size={15}
                                    // starContainerStyle={{paddingVertical:5}}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 15, }}>
                            <View style={{ height: 30, flexDirection: 'row' }}>
                                <LinearGradient colors={[Color.COLOR.RED.AMARANTH, Color.COLOR.BLUE.EBONY_CLAY]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topBoxSection}>
                                    {/* <Text style={styles.boxAboveText}>Margin Type Count</Text> */}
                                    <Text style={styles.boxBelowText}>Prediction Score</Text>
                                </LinearGradient>
                            </View>
                            <View style={{ marginTop: 1, height: 40, }}>
                                <View style={[styles.bottomBoxSection, { backgroundColor: Color.COLOR.RED.AMARANTH }]}>
                                    <Text style={styles.boxAboveText}>70%</Text>
                                    {/* <Text style={styles.boxBelowText}>0</Text> */}
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 15, }}>
                            <View style={{ height: 30, }}>
                                <LinearGradient colors={[Color.COLOR.RED.AMARANTH, Color.COLOR.BLUE.EBONY_CLAY]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topBoxSection}>
                                    {/* <Text style={styles.boxAboveText}>Margin Type Count</Text> */}
                                    <Text style={styles.boxBelowText}>Type Count</Text>
                                </LinearGradient>
                            </View>
                            <View style={{ marginTop: 1, height: 40, flexDirection: 'row' }}>
                                <View style={[styles.bottomLeftBoxSection, { backgroundColor: Color.COLOR.RED.AMARANTH }]}>
                                    {/* <Text style={styles.boxAboveText}>DLR-0</Text> */}
                                    <Text style={styles.boxBelowText}>DLR-0</Text>
                                </View>
                                <View style={{ width: 1 }} />
                                <View style={[styles.middleBoxSection, { backgroundColor: Color.COLOR.RED.AMARANTH }]}>
                                    {/* <Text style={styles.boxAboveText}>DST-0</Text> */}
                                    <Text style={styles.boxBelowText}>DST-0</Text>
                                </View>
                                <View style={{ width: 1 }} />
                                <View style={[styles.bottomRightBoxSection, { backgroundColor: Color.COLOR.RED.AMARANTH }]}>
                                    {/* <Text style={styles.boxAboveText}>SD-0</Text> */}
                                    <Text style={styles.boxBelowText}>SD-0</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 15, }}>
                            <View style={{ height: 30, flexDirection: 'row' }}>
                                <LinearGradient colors={[Color.COLOR.RED.AMARANTH, Color.COLOR.BLUE.EBONY_CLAY]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topBoxSection}>
                                    {/* <Text style={styles.boxAboveText}>Margin Type Count</Text> */}
                                    <Text style={styles.boxBelowText}>Recommendation</Text>
                                </LinearGradient>
                            </View>
                            <View style={{ marginTop: 1, height: 40, flexDirection: 'row' }}>
                                <View style={[styles.bottomLeftBoxSection, { backgroundColor: Color.COLOR.RED.AMARANTH }]}>
                                    {/* <Text style={styles.boxAboveText}>DLR-0</Text> */}
                                    <Text style={[styles.boxBelowText, { fontSize: 12, textAlign: 'center' }]}>Regular Follow Up</Text>
                                </View>
                                <View style={{ width: 1 }} />
                                <View style={[styles.bottomRightBoxSection, { backgroundColor: Color.COLOR.RED.AMARANTH }]}>
                                    {/* <Text style={styles.boxAboveText}>SD-0</Text> */}
                                    <Text style={[styles.boxBelowText, { fontSize: 12 }]}>ASM Visit Required</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 15, }}>
                            <View style={{ height: 30, flexDirection: 'row' }}>
                                <LinearGradient colors={[Color.COLOR.RED.AMARANTH, Color.COLOR.BLUE.EBONY_CLAY]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topBoxSection}>
                                    {/* <Text style={styles.boxAboveText}>Margin Type Count</Text> */}
                                    <Text style={styles.boxBelowText}>Prospect value</Text>
                                </LinearGradient>
                            </View>
                            <View style={{ marginTop: 1, height: 40, }}>
                                <View style={[styles.bottomBoxSection, { backgroundColor: Color.COLOR.RED.AMARANTH }]}>
                                    {/* <Text style={styles.boxAboveText}>500000 INR</Text> */}
                                    <Text style={styles.boxBelowText}>500000 INR</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 15, }}>
                            <View style={{ height: 30, flexDirection: 'row' }}>
                                <LinearGradient colors={[Color.COLOR.RED.AMARANTH, Color.COLOR.BLUE.EBONY_CLAY]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topBoxSection}>
                                    {/* <Text style={styles.boxAboveText}>Margin Type Count</Text> */}
                                    <Text style={styles.boxBelowText}>Loyality Score</Text>
                                </LinearGradient>
                            </View>
                            <View style={{ marginTop: 1, height: 40, }}>
                                <View style={[styles.bottomBoxSection, { backgroundColor: Color.COLOR.RED.AMARANTH }]}>
                                    <Text style={styles.boxAboveText}>80%</Text>
                                    {/* <Text style={styles.boxBelowText}>0</Text> */}
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 15, }}>
                            <View style={{ height: 30, flexDirection: 'row' }}>
                                <LinearGradient colors={[Color.COLOR.RED.AMARANTH, Color.COLOR.BLUE.EBONY_CLAY]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topBoxSection}>
                                    {/* <Text style={styles.boxAboveText}>Margin Type Count</Text> */}
                                    <Text style={styles.boxBelowText}>Compitator Activity</Text>
                                </LinearGradient>
                            </View>
                            <View style={{ marginTop: 1, height: 40, }}>
                                <View style={[styles.bottomBoxSection, { backgroundColor: Color.COLOR.RED.AMARANTH }]}>
                                    {/* <Text style={styles.boxAboveText}>YES</Text> */}
                                    <Text style={styles.boxBelowText}>YES</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
            </View >
        )
    }

    render() {
        return (
            <Modal
                isVisible={this.props.isActive}
                children={
                    <View style={styles.modalMainView}>
                        <TouchableOpacity style={styles.cancelSec}
                            activeOpacity={0.8}
                            onPress={() => this.onRequestCloseModal()}  >
                            <Image source={ImageName.WHITE_CROSS} style={styles.cancelImg} />
                        </TouchableOpacity>
                        <ScrollView>
                            <View style={{ paddingHorizontal: 10, paddingBottom: 20 }}>
                                {this.progressBarSection()}
                            </View>
                        </ScrollView>
                    </View>
                }
            />
        )
    }
}

export default ProgressModal;