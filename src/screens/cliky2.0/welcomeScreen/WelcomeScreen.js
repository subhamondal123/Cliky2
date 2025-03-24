
import React from "react";
import { SafeAreaView, Image, View, ScrollView, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, ImageName } from "../../../enums";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation, userAttendanceData } from "../../../redux/Sales360Action";
import { bindActionCreators } from "redux";
import { Text } from "react-native";
import { BigTextButton, Loader, SwipeButton } from "../../../shared";
import { DateConvert, GetUserData, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { CommonActions } from "@react-navigation/native";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { App_uri } from "../../../services/config";
import { modBannerData, modifyUserObj } from "./Function";
import Carousel from "react-native-snap-carousel";

// for welcome screen page

class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            isVisible: true,
            authCheck: false,
            versionData: {},
            authorizationCheck: true,
            userData: {},
            pageLoader: false,
            attendanceObj: { isAttendance: 0, inLattitude: null, inLongitude: null, inTime: null, outLattitude: null, outLongitude: null, outTime: null },
            userGeneralData: {
                isAttendence: "",
                details: {}
            },
            bannerData: [],
            attendanceLoader: false,
            attendanceSubmitLoader: false,
            locationData: {}
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this.state.userData = await StorageDataModification.userCredential({}, "get");
        this.setState(this.state);
        await this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        this.getGeneralData();
        this.getBannerData();
    }

    //banner data api call here
    getBannerData = async () => {
        let reqData = {
            "limit": "50",
            "offset": "0",
            "status": "1",
            "searchText": "",
            "searchFrom": "",
            "searchTo": "",
        }
        let responseData = await MiddlewareCheck("getUploadPromationalBanners", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let bannerData = modBannerData(responseData.response)
                this.setState({ bannerData: bannerData })
            }
        }
    }

    // here general Data api call 
    getGeneralData = async () => {
        this.setState({ attendanceLoader: true })
        let responseData = await MiddlewareCheck("getGeneralData", {}, this.props);
        if (responseData) {
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR && responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.pageLoader = true;
                this.setState(this.state);
                let modUserData = modifyUserObj(responseData.data);
                let respData = modUserData ? modUserData : { "isAttendence": 0 };
                this.state.attendanceObj.isAttendance = respData.isAttendence;
                this.setState(this.state);
                await this.onStoreAttendanceData(this.state.attendanceObj);
                this.props.stateUserInformation(modUserData);
                await StorageDataModification.headerData(modUserData, "store");
                this.state.userGeneralData = modUserData;
                this.state.pageLoader = false;
                this.state.attendanceLoader = false;
                this.setState(this.state);
            }
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
    }


    // this function used for navigate to another page
    _onSkip = async () => {
        await this.onStoreAttendanceData(this.state.attendanceObj);
        this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'DrawerNav' }] }));
    }

    //  when swipe this function call
    swipeSuccess = async () => {
        await this.setAttendanceLoader(true)
        await this._onAddAttendance();
        this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'DrawerNav' }] }));
        await this.setAttendanceLoader(false)
    }

    setAttendanceLoader = async (type) => {
        this.setState({ attendanceSubmitLoader: type })
    }

    // for store attendance data 
    onStoreAttendanceData = async (attendanceData) => {
        this.props.userAttendanceData(attendanceData);
        await StorageDataModification.attendanceData(attendanceData, "store");
    }

    // here add attendance api call 
    _onAddAttendance = async () => {
        let locationData = await GetUserData.getUserLocation();
        this.state.attendanceObj.isAttendance = 1;
        this.state.attendanceObj.inLattitude = locationData.lattitude;
        this.state.attendanceObj.inLongitude = locationData.longitude;
        this.state.attendanceObj.inTime = DateConvert.fullDateFormat(new Date());
        await this.onStoreAttendanceData(this.state.attendanceObj);
        this.setState({ attendanceLoader: false });
    }

    // this function used for render the item
    _renderItem({ item, index }) {
        return (
            <View style={{
                backgroundColor: 'floralwhite',
                borderBottomLeftRadius: 32,
                borderBottomRightRadius: 32
            }}>
                <Image source={{ uri: item.fileName }} style={styles.welcomeScreen} />
            </View>
        )
    }

    // here the benner design implement 
    bannerSection = () => {
        return (
            <View style={{ height: 350 }}>
                <Carousel
                    enableSnap={true}
                    autoplay={true}
                    autoplayDelay={2000}
                    layout={"stack"}
                    loop={true}
                    onSnapToItem={index => this.setState({ activeIndex: index })}
                    data={this.state.bannerData}
                    renderItem={this._renderItem}
                    sliderWidth={Dimension.width}
                    itemWidth={Dimension.width}
                />
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.bannerSection()}
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.centerView}>
                        <View style={styles.redBoder}>
                            {this.state.attendanceLoader ?
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                                </View>
                                :
                                <Image source={this.state.userGeneralData.details.profileImgUrl == undefined || this.state.userGeneralData.details.profileImgUrl == null || this.state.userGeneralData.details.profileImgUrl.length == 0 ? ImageName.USER_IMG : { uri: App_uri.IMAGE_URI + this.state.userGeneralData.details.profileImgUrl }} style={styles.userImage} />
                            }
                        </View>
                        <Text style={styles.hiiText}>Hi,<Text style={styles.nameText}> {this.state.userData.firstName}</Text></Text>
                        {this.state.userGeneralData.isAttendence == 0 ?
                            <Text style={styles.swapText}>Please Swap <Text style={styles.workLoginText}>work login</Text> button before start work</Text>
                            :
                            null}
                    </View>
                    {this.state.attendanceLoader ?
                        null :
                        <React.Fragment>
                            {this.state.userGeneralData.isAttendence == 0 ?
                                <React.Fragment>
                                    <View style={styles.marginView}>
                                        {this.state.attendanceSubmitLoader ?
                                            <ActivityIndicator size={"small"} />
                                            :
                                            <SwipeButton
                                                title={"Swipe to start your work"}
                                                thumbIcon={ImageName.SWIPE_BUTTON_LOGO}
                                                width={Dimension.width / 1.5}
                                                // height={40}
                                                onSuccessSwipe={() => this.swipeSuccess()}
                                            />
                                        }
                                    </View>
                                </React.Fragment> :
                                null
                            }
                            <View style={styles.skipButtonView}>
                                <View style={styles.timeView}>
                                    <Image source={ImageName.CLOCK_IMG} style={styles.clockImage} />
                                    <Text style={styles.itsText}>it's <Text style={styles.timeText}>{DateConvert.getAllTimeData(new Date()).hour + ":" + DateConvert.getAllTimeData(new Date()).minutes}</Text> {DateConvert.getAllTimeData(new Date()).smallCaseAmPm}</Text>
                                </View>
                                {this.state.attendanceLoader ?
                                    null
                                    :
                                    <BigTextButton
                                        text={this.state.userGeneralData.isAttendence == 0 ? "Skip" : "Start"}
                                        backgroundColor={"#fff"}
                                        additionalStyles={styles.buttonAdditionalStyle}
                                        borderRadius={26}
                                        height={40}
                                        fontColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                        fontSize={12}
                                        onPress={() => this._onSkip()}
                                    />
                                }
                            </View>
                        </React.Fragment>
                    }
                    <View style={{ marginBottom: 10 }} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateAllCountries,
        stateCheckForNetwork,
        stateUserInformation,
        userAttendanceData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);