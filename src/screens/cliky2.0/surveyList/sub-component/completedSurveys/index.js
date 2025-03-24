import React from "react";
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import styles from "./style";
import { CustomStyle } from "../../../../style";
import { Loader, NoDataFound } from "../../../../../shared";
import { Color, Dimension, ImageName } from "../../../../../enums";
import { DateConvert } from "../../../../../services/common-view-function";
import { modifyListData } from "./function";
import { MiddlewareCheck } from "../../../../../services/middleware";
import { ErrorCode } from "../../../../../services/constant";

class CompletedSurveys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            listLoader: true,
            refreshing: false,
            limit: 10,
            pageNum: 0,
            allUpcomingSurveys: [],
            totalDataCount: 0
        }
    }

    componentDidMount() {
        this.load();
    }

    load = async () => {
        await this._onFetchData();
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
                    "hierarchyTypeId": "",
                    "hierarchyDataId": ""
                }
            ],
            "hmName": ""
        }
        let responseData = await MiddlewareCheck("completedSurveyList", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let listData = modifyListData(responseData);
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
            listLoader: false
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
                if (this.state.allUpcomingSurveys.length >= this.state.totalDataCount) {
                    this.setState({ listLoader: false })
                    return null;
                } else {
                    this._onFetchData();

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
            allUpcomingSurveys: [],
            totalDataCount: 0
        })
    }

    //refresh list
    onRefresh = async () => {
        await this._onStateVarReset();
        await this._onFetchData();
    }

    _onDetails = (item) => {
        this.props.navigation.navigate("SurveyReport", { data: item });
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
                                <Text style={styles.textDealer} numberOfLines={1}>{item.labelCode}</Text>
                            </View>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this._onDetails(item)} >
                                <Image source={ImageName.EXCLAMATION_IMG} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <View style={styles.textFlexView}>
                            {/* <View style={styles.iconView}>
                                <Image source={ImageName.LOCATION_MAIN} style={styles.iconImg} />
                            </View> */}
                            <View style={{ flex: 0.6 }}>
                                <Text style={styles.headerText}>Product Name</Text>
                                <Text style={styles.textVisites} numberOfLines={1}>{item.productName}</Text>
                            </View>
                            {/* <View style={styles.iconView}>
                                <Image source={ImageName.CALL_ICON} style={styles.iconImg} />
                            </View> */}
                            <View style={{ flex: 0.4 }}>
                                <Text style={styles.headerText}>Survey Date</Text>
                                <Text style={styles.textVisites}>{DateConvert.viewDateFormat(item.surveyDate)}</Text>
                            </View>
                        </View>
                        {/* <View style={styles.textFlexView}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.headerText}>Start Date</Text>
                                <Text style={styles.textVisites}>{DateConvert.viewDateFormat(item.startDate)}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.headerText}>End Date</Text>
                                <Text style={styles.textVisites}>{DateConvert.viewDateFormat(item.endDate)}</Text>
                            </View>
                        </View> */}
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

export default CompletedSurveys;