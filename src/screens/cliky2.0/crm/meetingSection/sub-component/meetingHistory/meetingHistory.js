import React from "react";
import { AlertMessage, Color, Dimension, ImageName, Padding, ScreenText } from '../../../../../../enums';
import styles from './style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    RefreshControl

} from 'react-native';
import {
    stateUserInformation,
    stateCheckForNetwork,
} from '../../../../../../redux/Sales360Action';
import { CommonData, LengthValidate, ErrorCode } from '../../../../../../services/constant';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AddButton, FilterModal, Loader, NoDataFound, TextInputBox } from "../../../../../../shared";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { meetinglistModifyData } from "./function";
import { DateConvert, Toaster } from "../../../../../../services/common-view-function";


class MeetingHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meetingListData: [],
            totalDataCount: 0,
            pageNum: 0,
            limit: 5,
            refreshing: true,
            listDataLoader: true,
            listLoader: true,

            filterVisibility: false,
            fromDate: "",
            toDate: "",
            meetingType: ""
        }
    }

    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        this.setState({ refreshing: false, });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchFrom": this.state.fromDate,
            "searchTo": this.state.toDate,
            "meetingType": this.state.meetingType
        }
        let responseData = await MiddlewareCheck("meetingRequestList", dataReq,this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let meetingDataList = meetinglistModifyData(responseData.data)
                this.setState({
                    meetingListData: [...this.state.meetingListData, ...meetingDataList.meetingList],
                    totalDataCount: meetingDataList.totalCount
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            listLoader: false,
            listDataLoader: false
        })

    }

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 5,
            totalDataCount: 0,
            meetingListData: [],
            refreshing: true,
            listLoader: true,
            listDataLoader: true,
        })
    }

    onShowHideData = (item) => {

        let allItems = this.state.meetingListData;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].id == item.id) {
                allItems[i].showHide = !(allItems[i].showHide)
            } else {
                allItems[i].showHide = false
            }
        }
        this.state.meetingListData = allItems;
        this.setState({ meetingListData: this.state.meetingListData })
    }
    renderLoader = () => {
        return this.state.listLoader ? (
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
        ) : (
            <View style={{ marginBottom: 200 }} />
        );
    };

    onRefresh = async () => {
        this.setState({
            // refreshing: true,
            // listLoader: true,
            // listDataLoader:true,
            meetingListData: [],
        })
        await this._onStatusChange();
        await this._load();
    }

    fetchMore = async () => {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.meetingListData.length >= this.state.totalDataCount) {
                    this.setState({ listLoader: false })
                    return null;
                } else {
                    this._load();
                }
            }
        );
    };

    renderMeetingList = ({ item, key }) => {
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

            <React.Fragment>
                <View style={styles.mainBox}>
                    <View style={styles.blueBox}>
                        <TouchableOpacity style={styles.blueViewFlex}
                            activeOpacity={1}
                            onPress={() => this.onShowHideData(item)}>
                            <View style={styles.homeCircel}>
                                <Image source={ImageName.HOME_LOGO} style={styles.homeLogo} />
                            </View>
                            <View style={{ marginLeft: '5%', flex: 1 }}>
                                <Text style={styles.saiEnterprisesText}>{item.meetingTypeName}</Text>
                            </View>
                            <View style={{ marginLeft: '2%' }}>
                                <Image source={item.showHide ? ImageName.YELLOW_UP_ARROW : ImageName.YELLOW_DOWN_ARROW} style={styles.dropDownArrow} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {item.showHide ?
                        <React.Fragment>
                            <View style={{ marginHorizontal: '2%', marginTop: 5 }}>
                                <View style={{ flexDirection: 'row', marginTop: 15, }}>
                                    <View style={styles.flexColumnSec}>
                                        <Text style={styles.headerText}>Location</Text>
                                        <Text style={styles.textVisites}>{item.location}</Text>
                                    </View>
                                    <View style={styles.flexColumnSec}>
                                        <Text style={styles.headerText}>ProposedBudget </Text>
                                        <Text style={styles.textVisites}>{item.proposedBudget}</Text>
                                    </View>
                                </View>
                                <View style={{ borderWidth: 0.3, borderColor: "#999", marginTop: 14 }} />
                                <View style={{ flexDirection: 'row', marginTop: 15, }}>
                                    <View style={styles.flexColumnSec}>
                                        <Text style={styles.headerText}>Name</Text>
                                        <Text style={styles.textVisites}>{item.name}</Text>
                                    </View>
                                    <View style={styles.flexColumnSec}>
                                        <Text style={styles.headerText}>Date</Text>
                                        <Text style={styles.textVisites}>{DateConvert.viewDateFormat(item.eventDate)}</Text>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 15 }} />
                            </View>

                        </React.Fragment>
                        :
                        null
                    }
                </View>
            </React.Fragment>
        )
    }


    onFilterOpenAndClose = () => {
        this.setState({
            filterVisibility: !this.state.filterVisibility
        })
    }
    _onFilterWithApi = async (data) => {
        this.state.meetingType = data.selectedMeetingTypeObj.id ? data.selectedMeetingTypeObj.id.toString() : "";
        this.setState({
            fromDate: data.fromDateObj.fromDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.fromDateObj.rawDate),
            toDate: data.toDateObj.toDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.toDateObj.rawDate),
            meetingType: this.state.meetingType

        })
        this.onFilterOpenAndClose();
        await this._onStatusChange();
        await this._load();
    }


    _onReset = async () => {
        await this.onFilterOpenAndClose();
        await this._onStatusChange();
        await this._onClearData()
        await this._load();

    }

    _onClearData = () => {
        this.setState({
            fromDate: "",
            toDate: "",
            meetingType: ""
        })
    }

    listHeaderSection = () => {
        return (
            <View>
                <View style={styles.headerActionArea}>
                    <View style={{ flex: 1 }} />
                    <View style={styles.filter_action_btn}>
                        <TouchableOpacity
                            style={styles.filterBtn}
                            activeOpacity={0.8}
                            onPress={() => this.onFilterOpenAndClose()}>
                            <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        )
    }




    render() {

        const modalSec = () => {
            return (
                <FilterModal
                    isVisible={this.state.filterVisibility}
                    onCloseModal={() => this.onFilterOpenAndClose()}
                    type={"meetingList"}
                    onApply={(data) => this._onFilterWithApi(data)}
                    resetData={() => this._onReset()}
                    props={this.props}
                />
            )
        }

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginBottom: 10 }} />
                {this.state.listDataLoader ?
                    <View style={{ height: Dimension.height / 1.5, justifyContent: 'center', alignItems: 'center' }}>
                        <Loader />
                    </View> :
                    <React.Fragment>
                        {this.listHeaderSection()}
                        {this.state.meetingListData.length > 0 ?
                            <React.Fragment>
                                <FlatList
                                    data={this.state.meetingListData}
                                    renderItem={(item, key) => this.renderMeetingList(item, key)}
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
                            <React.Fragment>
                                <View style={{ flex: 1, marginTop: 20 }}>
                                    <NoDataFound />
                                </View>
                            </React.Fragment>
                        }
                    </React.Fragment>

                }
                {modalSec()}
                <View style={{ marginBottom: 130 }} />

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
        stateUserInformation,
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MeetingHistory);