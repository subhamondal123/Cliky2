import React from "react";
import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    RefreshControl
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ImageName, AlertMessage, Color, FontSize, FontFamily } from "../../../../enums";
import { stateCheckForNetwork, stateUserInformation } from "../../../../redux/Sales360Action";
import { DateConvert } from "../../../../services/common-view-function";
import { ErrorCode } from "../../../../services/constant";
import { MiddlewareCheck } from "../../../../services/middleware";
import { Loader } from "../../../../shared";
import styles from "./Style";

class OrganizationActivityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leadactivitiesList: [],
            pageLoder: false,
            refreshing: false,
            listLoader: true,
            loadMore: true,
            limit: 10,
            offset: 0,
        };
    }
    componentDidMount() {
        this._onLoad();
    }

    _onLoad = async () => {
        this.setState({
            refreshing: false
        })
        let reqPastActivityData = {
            organizationId: this.props.route.params.data.organizationId.toString(),
            limit: this.state.limit,
            offset: this.state.offset,
            type: "all"
        }
        let pastActivityResponseData = await MiddlewareCheck("getOrganizationAllActivity", reqPastActivityData, this.props);
        if (pastActivityResponseData === false) {
        } else {
            if (pastActivityResponseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (pastActivityResponseData.response.activityListData.data.length < 10) {
                    this.setState({
                        loadMore: false
                    })
                }
                this.state.leadactivitiesList = [...this.state.leadactivitiesList, ...pastActivityResponseData.response.activityListData.data];
                this.setState({
                    leadactivitiesList: this.state.leadactivitiesList
                })
            } else {
                Toaster.ShortCenterToaster(pastActivityResponseData.message)
            }
        }
        // } else {

        //     let reqUpcomingActivityData = {
        //         opportunityId: this.props.route.params.data.id,
        //         limit: this.state.limit,
        //         offset: this.state.offset,
        //         type: "up"
        //     }
        //     let upcomingActivityResponseData = await MiddlewareCheck("getOpportunityActivityLog", reqUpcomingActivityData);

        //     if (upcomingActivityResponseData === false) {
        //         this._onNetworkError();
        //     } else {
        //         if (upcomingActivityResponseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //             if (upcomingActivityResponseData.response.activityListData.length < 10) {
        //                 this.setState({
        //                     loadMore: false
        //                 })
        //             }
        //             this.state.leadactivitiesList = [...this.state.leadactivitiesList, ...upcomingActivityResponseData.response.activityListData];
        //             this.setState({
        //                 leadactivitiesList: this.state.leadactivitiesList
        //             })
        //         } else {
        //             Toaster.ShortCenterToaster(upcomingActivityResponseData.message)
        //         }
        //     }
        // }
        this.setState({
            listLoader: false
        });
    };


    // fetch more
    fetchMore = async () => {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, offset: prevState.offset + 10 };
            },
            () => {
                if (this.state.loadMore) {
                    this._onLoad();
                } else {
                    this.setState({
                        listLoader: false
                    })
                    return null;
                }
            }
        );
    };


    _onBack = () => {
        this.props.navigation.goBack();
    }

    // loader for scroll
    renderLoader = () => {
        return (
            this.state.listLoader ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 100, marginTop: 30 }}>
                    {/* <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} /> */}
                    <Loader />
                </View> :
                <View style={{ marginBottom: 200 }} />

        )
    }


    listView = (item, key) => {
        return (
            <View style={styles.listDataView} key={key}>
                <Text style={[styles.textList, { flex: 0.25 }]}>{item.item.activityName ? item.item.activityName : "N/A"}</Text>
                <Text style={[styles.textDate, { textAlign: 'center', flex: 0.3 }]}>{item.item.dueDate ? DateConvert.formatYYYYMMDD(item.item.dueDate) : "N/A"}</Text>
                <Text style={[styles.nameText, { flex: 0.25 }]}>{item.item.firstName ? item.item.firstName : "" + " " + item.item.lastName ? item.item.lastName : ""}</Text>
                <Text numberOfLines={4} style={[styles.nameText, { flex: 0.2 }]}>{item.item.remarks ? item.item.remarks : "N/A"}</Text>
                {/* <TouchableOpacity
                    activeOpacity={0.9}>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.toolTipImg} />
                </TouchableOpacity> */}
            </View>
        )
    }

    onRefresh = async () => {
        await this.setState({
            leadactivitiesList: [],
            refreshing: true,
            listLoader: true,
            loadMore: true,
            limit: 10,
            offset: 0,
        })
        await this._onLoad();
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginHorizontal: '2%', marginTop: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginTop: 2, flex: 0.3 }}
                            activeOpacity={0.7}
                            onPress={this._onBack}>
                            <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                        </TouchableOpacity>
                        <View style={{ flex: 0.6 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: Color.COLOR.BLUE.VIOLET_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.BOLD }}>Organization Activity List</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.2 }} />
                    </View>
                </View>
                {/* <View style={styles.backSec}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this._onBack}>
                        <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                    </TouchableOpacity>
                </View> */}
                <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                    <View style={styles.shadowBox}>
                        <View style={{ flexDirection: 'row', marginHorizontal: '2%', marginTop: 8 }}>
                            <View style={{ flex: 0.3 }}>
                                <Text style={styles.listHeaderText}>Type</Text>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <Text style={styles.listHeaderText}>Date Due</Text>
                            </View>
                            <View style={{ flex: 0.2 }}>
                                <Text style={styles.listHeaderText}>Assigned to</Text>
                            </View>
                            <View style={{ flex: 0.2 }}>
                                <Text style={styles.listHeaderText}>Notes</Text>
                            </View>
                        </View>
                        <View style={styles.underLine} />
                        {this.state.listLoader == false && this.state.leadactivitiesList.length == 0 ?
                            <View>
                                <Text style={styles.noDataFoundText}>No Data Found</Text>
                            </View>
                            :
                            <FlatList
                                data={this.state.leadactivitiesList}
                                renderItem={(item, key) => this.listView(item, key)}
                                keyExtractor={(item, key) => key}
                                onEndReachedThreshold={0.1}
                                onEndReached={this.fetchMore}
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
                        }
                    </View>
                    {/* <View style={{ marginBottom: '20%' }} /> */}
                </View>







            </SafeAreaView >
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
            stateUserInformation
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationActivityList);