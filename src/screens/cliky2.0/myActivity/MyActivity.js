import { RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import styles from './Style';
import { DateConvert, GetUserData, Toaster } from '../../../services/common-view-function';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../enums';
import { NormalLoader } from '../../../shared';
import { stateCheckForNetwork, stateUserInformation } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MiddlewareCheck, StoreUserOtherInformations } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import Header from '../header/Header';
import SvgComponent from '../../../assets/svg';
import { ActivityInMap, ProgressViewSection } from './sub-component';


let tabSectionData = [
    {
        titie: DateConvert.getDayMonthYearName(new Date()),
        subTitle: "Check the day activity",
        iconName: "calender",
        iconBgColor: Color.COLOR.YELLOW.SELECTIVE,
        check: true
    },
    {
        titie: "Check Map",
        subTitle: "Check map locations",
        iconName: "scanning",
        iconBgColor: Color.COLOR.RED.AMARANTH,
        check: false
    }
]

class MyActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            userLocationArr: [],
            startDateRaw: new Date(),
            selectSubordinateId: "",
            tabItemArr: [],
            selectedTabIndex: 0,
            refreshing: true
        }
    }

    // set the initial data
    _onSetInitialStateData = async () => {
        this.setState({
            startDateRaw: new Date(),
            selectSubordinateId: "",
            // tabItemArr: tabSectionData,
            // selectedTabIndex: 0
        })
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                //         await this._onSetInitialStateData();
                const updatedArray = tabSectionData.map((item, index) => (
                    {
                        ...item,
                        check: index === 0 ? true : false,
                    }));
                this.setState({ tabItemArr: updatedArray })
                this._load();
            })
    }

    _load = async () => {
        await this._onSetInitialStateData();

        await this._onGetActivityDataFronApi(this.state.startDateRaw, this.state.selectSubordinateId);
        StoreUserOtherInformations("", {}, this.props);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    // for api calling to get data 
    _onGetActivityDataFronApi = async (selectDate, selectUser) => {
        this.setState({ refreshing: false })
        let userInfo = await GetUserData.getUserData();
        this.setState({ pageLoader: true });
        let data = {
            "createDate": DateConvert.formatYYYYMMDD(selectDate),
            "reqUserId": selectUser.toString().length > 0 ? selectUser : userInfo.userId,
            "hierarchyDataId": [],
        }
        let responseData = await MiddlewareCheck("getBeatData", data, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this._getAvarageCoOrdinate(responseData.data.beatData);
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ pageLoader: false, refreshing: false });
    }

    // get avarage co ordinate
    _getAvarageCoOrdinate = (data) => {
        let tepArrData = [];
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].latitude && data[i].longitude && data[i].id && data[i].address) {
                    data[i].title = data[i].description;
                    tepArrData.push(data[i]);
                }
            }
        }
        this.state.userLocationArr = tepArrData;
        this.setState(this.state);
    }

    // for click item from tab
    onTabItemCheck = (item, key) => {
        for (let i = 0; i < this.state.tabItemArr.length; i++) {
            if (i == key) {
                this.state.tabItemArr[i].check = true;
            } else {
                this.state.tabItemArr[i].check = false;
            }
        }
        this.state.selectedTabIndex = key;
        this.setState(this.state);
    }

    // for tab selection section 
    tabSelectionSection = () => {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '#F0F4F7', borderTopWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_COLOR, borderBottomWidth: 0.5 }}>
                {this.state.tabItemArr.map((item, key) => (
                    <TouchableOpacity style={{ flex: 1, flexDirection: "row", paddingVertical: 10, backgroundColor: item.check ? Color.COLOR.BLUE.LOTUS_BLUE : null }} key={key} onPress={() => this.onTabItemCheck(item, key)}>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                            <View style={{ paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10, backgroundColor: item.iconBgColor }}>
                                <SvgComponent svgName={item.iconName} />
                            </View>
                        </View>
                        <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
                            <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, color: item.check ? Color.COLOR.WHITE.PURE_WHITE : Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS }}>{item.titie}</Text>
                            <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: item.check ? Color.COLOR.WHITE.PURE_WHITE : Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XXS }}>{item.subTitle}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    // for apply the filter from api
    onApplyFilter = async (data) => {
        try {
            this.state.pageLoader = true;
            this.state.startDateRaw = data.date;
            this.state.selectSubordinateId = data.selectedSubordinateId;
            this.state.tabItemArr[0].titie = DateConvert.getDayMonthYearName(data.date);
            this.setState(this.state);
            await this._onGetActivityDataFronApi(data.date, data.selectedSubordinateId);
        } catch (error) {
            console.log(error);
        }
    }

    // for reset the filter
    onResetFilter = async () => {
        this.state.pageLoader = true;
        this.state.startDateRaw = new Date();
        this.state.selectSubordinateId = "";
        this.state.tabItemArr[0].titie = DateConvert.getDayMonthYearName(new Date());
        this.setState(this.state);
        await this._onGetActivityDataFronApi(new Date(), "");
    }

    _onRefresh = () => {
        this._load();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onFilterData={(data) => this.onApplyFilter(data)} onReset={() => this.onResetFilter()} />
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this._onRefresh()}
                    />
                }>
                    {this.state.pageLoader ?
                        <View style={{ height: Dimension.height - Dimension.height / 5, justifyContent: "center", alignItems: 'center' }}>
                            <NormalLoader />
                        </View> :
                        <React.Fragment>
                            {this.tabSelectionSection()}
                            {this.state.selectedTabIndex == 0 ?
                                <ProgressViewSection {...this.props} data={this.state.userLocationArr} /> :
                                <ActivityInMap {...this.props} data={this.state.userLocationArr} />
                            }
                        </React.Fragment>
                    }
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
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyActivity);