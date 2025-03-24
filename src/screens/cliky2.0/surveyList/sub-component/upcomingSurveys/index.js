import React from "react";
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import styles from "./style";
import { Color, Dimension, ImageName } from "../../../../../enums";
import { Loader, NoDataFound } from "../../../../../shared";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../../services/middleware";
import { ErrorCode } from "../../../../../services/constant";
import { DateConvert, Toaster } from "../../../../../services/common-view-function";
import { modifyListData } from "./function";

class UpcomingSurveys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            listLoader: true,
            refreshing: false,
            limit: 10,
            pageNum: 0,
            allUpcomingSurveys: [],
            totalDataCount: 0,
            isApiCall: true
        }
    }

    componentDidMount() {
        this.load();
    }

    load = async () => {
        await this._onFetchData();
        StoreUserOtherInformations("", {}, this.props);


    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _onFetchData = async () => {
        this.setState({ refreshing: false })
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "hierarchyDataId": [
                {
                    // "hierarchyTypeId": this.props.Sales360Redux.routeData.hierarchyTypeId,
                    // "hierarchyDataId": this.props.Sales360Redux.routeData.hierarchyDataId
                    "hierarchyTypeId": "",
                    "hierarchyDataId": ""
            
                }
            ],
            "hmName": ""
        }
        let responseData = await MiddlewareCheck("upcomingSurveyList", reqData, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let listData = modifyListData(responseData);
                if (listData.surveyList.length == 0) {
                    this.setState({ isApiCall: false })
                }
                this.setState({
                    allUpcomingSurveys: [...this.state.allUpcomingSurveys, ...listData.surveyList],
                    totalDataCount: listData.totalCount
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
        })
    }

    renderLoader = () => {
        if (this.state.listLoader) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 100,
                    }}
                >
                    <ActivityIndicator
                        size="large"
                        color={Color.COLOR.INDICATOR_COLOR.GRAY}
                    />
                </View>
            )
        } else {
            return (
                <View style={{ marginBottom: 200 }} />
            )
        }
    }

    // fetch more
    fetchMore = async () => {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.isApiCall) {
                    this._onFetchData();
                } else {
                    this.setState({ listLoader: false })
                    return null;

                }
            }
        );
    };

    _onStateVarReset = async () => {
        this.setState({
            pageLoader: true,
            listLoader: true,
            refreshing: true,
            limit: 10,
            pageNum: 0,
            isApiCall: true,
            allUpcomingSurveys: [],
            totalDataCount: 0
        })
    }

    //refresh list
    onRefresh = async () => {
        await this._onStateVarReset();
        await this._onFetchData();
    }

    _onSurveyStartSuccess = () => {
        this.onRefresh()
    }

    _onClickStartSurvey = (item) => {
        this.props.navigation.navigate("Survey", { data: item, onStartSurvey: this._onSurveyStartSuccess })
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ marginTop: 15 }}>
                <View style={styles.mainBox}>
                    <View style={[styles.blueBox, {}]}>
                        <View style={styles.blueViewFlex}>
                            <View style={styles.homeCircel}>
                                <Image source={ImageName.SURVEY_COLORED_ICON} style={styles.homeLogo} />
                            </View>
                            <View style={{ marginLeft: "5%", flex: 1, justifyContent: "center" }} activeOpacity={1} onPress={() => this.onShowHideData(item)}>
                                <Text style={styles.saiEnterprisesText} numberOfLines={1}>{item.title}</Text>
                                <Text style={styles.textDealer}>{item.labelCode}</Text>
                            </View>
                            <TouchableOpacity style={styles.addVisitsButton} activeOpacity={0.9} onPress={() => this._onClickStartSurvey(item)}>
                                <Text style={styles.addVisitBtnTxt}>Start</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <View style={styles.textFlexView}>
                            {/* <View style={styles.iconView}>
                                <Image source={ImageName.LOCATION_MAIN} style={styles.iconImg} />
                            </View> */}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.headerText}>Product Name</Text>
                                <Text style={styles.textVisites}>{item.productName}</Text>
                            </View>
                            {/* <View style={styles.iconView}>
                                <Image source={ImageName.CALL_ICON} style={styles.iconImg} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.headerText}>Call</Text>
                                <Text style={styles.textVisites}>9876543245</Text>
                            </View> */}
                        </View>
                        <View style={styles.textFlexView}>
                            {/* <View style={styles.iconView}>
                                <Image source={ImageName.LOCATION_MAIN} style={styles.iconImg} />
                            </View> */}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.headerText}>Start Date</Text>
                                <Text style={styles.textVisites}>{DateConvert.viewDateFormat(item.startDate)}</Text>
                            </View>
                            {/* <View style={styles.iconView}>
                                <Image source={ImageName.CALL_ICON} style={styles.iconImg} />
                            </View> */}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.headerText}>End Date</Text>
                                <Text style={styles.textVisites}>{DateConvert.viewDateFormat(item.endDate)}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    render() {
        if (this.state.pageLoader) {
            return (
                <View style={{ height: Dimension.height / 1.2, justifyContent: "center", alignItems: "center" }}>
                    <Loader />
                </View>
            )
        } else {
            return (
                <View>
                    {this.state.allUpcomingSurveys.length > 0 ?
                        <React.Fragment>
                            <FlatList
                                data={this.state.allUpcomingSurveys}
                                renderItem={(item, key) => this.renderItem(item, key)}
                                keyExtractor={(item, key) => key}
                                onEndReached={this.fetchMore}
                                onEndReachedThreshold={0.1}
                                ListFooterComponent={this.renderLoader}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.onRefresh()}
                                    />
                                }
                            />
                        </React.Fragment>
                        :
                        <View style={{ marginTop: 20, height: Dimension.height }}>
                            <NoDataFound />
                        </View>
                    }
                </View>
            )
        }
    }
}




export default UpcomingSurveys;