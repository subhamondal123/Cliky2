
import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View, FlatList, Share } from "react-native";
import { stateCheckForNetwork } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, NoDataFound } from "../../../shared";
import { PLAYSTORE_URL } from "../../../../globalConstant";
import { DateConvert, FileDownload, Toaster } from "../../../services/common-view-function";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { modifyDayreport } from "./Function";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


class DayWiseReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            showHide: true,
            dayReportList: []
        };
    }

    componentDidMount = async () => {
        await this._load();
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    onBack = () => {
        this.props.navigation.goBack();
    };

    _load = async () => {
        this.setState({ pageLoader: true });
        let reqDta = {
            "currentDate": DateConvert.formatYYYYMMDD(new Date())
        }
        let responseData = await MiddlewareCheck("getDayWiseSalesReport", reqDta, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let dayReportList = modifyDayreport(responseData.response)
                this.setState({
                    dayReportList: [...this.state.dayReportList, ...dayReportList.dayWiseReport],
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ pageLoader: false });
    };

    _onClick = () => {
        this.props.navigation.navigate("ProductWiseSales")
    }

    onShowHide = (item) => {
        let allItems = this.state.dayReportList;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].showHide == item.showHide) {
                allItems[i].check = !(allItems[i].check)
            } else {
                allItems[i].check = false
            }
        }
        this.state.dayReportList = allItems;
        this.setState({ dayReportList: this.state.dayReportList })
    }

    //header section
    headerSec = () => {
        return (
            <View style={{ marginVertical: 10, flexDirection: 'row', marginHorizontal: 15 }}>
                <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.9} onPress={() => this.onBack()}>
                    <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <View style={{ flex: 0.6, flexDirection: "row", alignItems: "center" }} activeOpacity={0.9} onPress={() => onProfileTab(this.state.profileData)}>
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }} numberOfLines={1}>Day Wise Report</Text>
                    </View>
                </View>
                <View style={{ flex: 0.1, justifyContent: "center", alignItems: 'flex-end' }}>
                    <TouchableOpacity activeOpacity={0.9} >
                        <Image source={ImageName.SEARCH_LOGO_WITH_BLUE_BORDER} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.1, justifyContent: "center", alignItems: 'flex-end' }}>
                    <TouchableOpacity activeOpacity={0.9} >
                        <Image source={ImageName.FILTER_WITH_BLUE_BORDER} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.1, justifyContent: "center", alignItems: 'flex-end' }}>
                    <TouchableOpacity activeOpacity={0.9} >
                        <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Use this link to download application named haldiram....\n' + PLAYSTORE_URL,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    onDownload = async () => {
        await FileDownload.downloadDocument("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
    }


    renderVisitList = ({ item, key }) => {
        return (
            <View key={key}>
                <View style={{}}>
                    {this.ListData(item, key)}
                </View>
            </View>
        );
    };


    ListData = (item, key) => {
        return (
            <TouchableOpacity style={{ backgroundColor: '#F0F4F7', borderRadius: 10, marginTop: 10 }} activeOpacity={0.6} onPress={() => this.onShowHide(item)}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={[styles.dateSec, { backgroundColor: item.activityName == "Retailing" ? "#149CE0" : item.activityName == "Regular Works" ? "#00B65E" : "#F13748" }]}>
                        <Text style={styles.boxText}>{item.currentDate} th</Text>
                        <Text style={styles.boxText}>{item.dayName}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 10, flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={[styles.circelView, { backgroundColor: item.activityName == "Retailing" ? "#149CE0" : item.activityName == "Regular Works" ? "#00B65E" : "#F13748" }]} ></View>
                            <Text style={styles.absentText}>{item.activityName}</Text>
                        </View>
                        {/* <Text style={styles.absentText}>{item.showText}</Text> */}
                    </View>
                    {item.activityName == "Absent" ?
                        null :
                        <TouchableOpacity style={{ justifyContent: 'center', marginRight: 10 }} onPress={() => this.onShowHide(item)}>
                            <Image source={ImageName.DOWNLOAD_ARROR_REPORT} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    }
                </View>
                {item.check ?
                    <React.Fragment>
                        <View style={{ borderBottomColor: '#000', borderBottomWidth: 0.4, marginLeft: 15 }} />
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.valueText}>{item.inTime}</Text>

                                <Text style={styles.loginText}>Login</Text>
                            </View>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.valueText}>{item.firstCallTime}</Text>
                                <Text style={styles.loginText}>First Call</Text>
                            </View>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.valueText}>{item.firstProductiveCallTime}</Text>
                                <Text style={styles.loginText}>First PC</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.valueText}>{item.sc}</Text>
                                <Text style={styles.valueText}>SC</Text>
                            </View>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.valueText}>{item.tc}</Text>
                                <Text style={styles.valueText}>TC</Text>
                            </View>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.valueText}>{item.pc}</Text>
                                <Text style={styles.valueText}>PC</Text>
                            </View>
                        </View>
                    </React.Fragment>
                    :
                    null
                }
            </TouchableOpacity>
        )
    }

    ViewSkeletonPlaceholder = () => {
        let resData = [];
        for (let i = 0; i < 1; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    footerSec = () => {
        return (
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, marginHorizontal: 8 }}>
                <BigTextButton
                    text={"Download"}
                    borderRadius={100}
                    backgroundColor={"#1F2B4D"}
                    fontSize={12}
                    height={42}
                    onPress={() => this.onDownload()}
                    isRightIcon={true}
                    rightIcon={ImageName.DOWNLOAD}
                    rightIconStyle={{ height: 20 }}
                />
                <View style={{ width: 60 }} />
                <BigTextButton
                    text={"Share"}
                    borderRadius={22}
                    backgroundColor={"#1F2B4D"}
                    fontSize={12}
                    height={42}
                    // onPress={() => this.onShare()}
                    isRightIcon={true}
                    rightIcon={ImageName.SHARE}
                    rightIconStyle={{ height: 20 }}
                />
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.headerSec()}
                {this.state.dayReportList.length > 0 ?
                    <React.Fragment>
                        {this.footerSec()}
                    </React.Fragment> :
                    null
                }
                <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                    {this.state.pageLoader ?
                        <SkeletonPlaceholder>
                            {this.ViewSkeletonPlaceholder()}
                        </SkeletonPlaceholder> :
                        <React.Fragment>
                            {this.state.dayReportList.length > 0 ?
                                <React.Fragment>
                                    <FlatList
                                        data={this.state.dayReportList}
                                        renderItem={(item, key) => this.renderVisitList(item, key)}
                                        keyExtractor={(item, key) => key}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </React.Fragment> :
                                <React.Fragment>
                                    <View style={{ height: Dimension.height, marginTop: 20 }}>
                                        <NoDataFound />
                                    </View>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    }
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DayWiseReport);
