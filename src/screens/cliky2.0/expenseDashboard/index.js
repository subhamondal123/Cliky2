import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dimension, ImageName } from '../../../enums'
import { BigTextButton, DynamicCalender } from '../../../shared'
// import Header from '../../header1'
import { CustomStyle } from '../../style'
import styles from './style'
import {
    stateUserInformation,
    stateCheckForNetwork,
} from '../../../redux/Sales360Action';
import { MiddlewareCheck, StoreUserOtherInformations } from '../../../services/middleware'
import { modHeaderObj, modRespData, modifyCalenderScheduleData, modifyExpenceDashboardArr } from './function'
import { CommonData, ErrorCode } from '../../../services/constant'
import { DateConvert, Toaster } from '../../../services/common-view-function'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { ExpenseChart } from '../../../pageShared'
import { RefreshControl } from 'react-native'
import Header from '../header/Header'


// const victoryData = {
//     previous: [
//         { x: "Visit", y: 7000, },
//         { x: "Meter", y: 15000 },
//         { x: "Food", y: 9000 },
//         { x: "Other", y: 10200 }],
//     current: [
//         { x: "Visit", y: 15500 },
//         { x: "Meter", y: 7200 },
//         { x: "Food", y: 16000 },
//         { x: "Other", y: 10000 }],
// }


// const calenderMainData = {
//     "data": [
//         {
//             "date": "2023-03-29T00:00:00.000Z",
//             "time": "18:06:20",
//             "data": {
//                 "id": 980,
//                 "date": "2023-03-29T00:00:00.000Z",
//                 "time": "18:06:20",
//                 "status": "Rejected",
//                 "statusId": "2"
//             }
//         },
//         {
//             "date": "2023-03-31T00:00:00.000Z",
//             "time": "18:06:20",
//             "data": {
//                 "id": 981,
//                 "date": "2023-03-31T00:00:00.000Z",
//                 "time": "18:06:20",
//                 "status": "Pending",
//                 "statusId": "0"
//             }
//         },
//         {
//             "date": "2023-04-01T00:00:00.000Z",
//             "time": "18:06:20",
//             "data": {
//                 "id": 983,
//                 "date": "2023-04-01T00:00:00.000Z",
//                 "time": "18:06:20",
//                 "status": "Pending",
//                 "statusId": "0"
//             }
//         },
//         {
//             "date": "2023-04-02T00:00:00.000Z",
//             "time": "18:06:20",
//             "data": {
//                 "id": 984,
//                 "date": "2023-04-02T00:00:00.000Z",
//                 "time": "18:06:20",
//                 "status": "Approved",
//                 "statusId": "1"
//             }
//         },
//         {
//             "date": "2023-04-03T00:00:00.000Z",
//             "time": "18:06:20",
//             "data": {
//                 "id": 985,
//                 "date": "2023-04-03T00:00:00.000Z",
//                 "time": "18:06:20",
//                 "status": "Rejected",
//                 "statusId": "2"
//             }
//         },
//         {
//             "date": "2023-04-04T00:00:00.000Z",
//             "time": "18:06:20",
//             "data": {
//                 "id": 986,
//                 "date": "2023-04-04T00:00:00.000Z",
//                 "time": "18:06:20",
//                 "status": "On Hold",
//                 "statusId": "3"
//             }
//         }
//     ],
//     "iat": 1679299036
// }


export class ExpenseDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dashBoardLoader: true,
            mainArr: [],
            odometerList: {},
            foodList: {},
            otherList: {},
            fromDate: "",
            toDate: "",
            mainCalenderData: [],
            chartData: {},
            calenderLoader: true,
            otherApiCall: false,
            expenseHeaderData: {}
        }
    }

    componentDidMount = async () => {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this._load()
                StoreUserOtherInformations("", {}, this.props);
            })
        // await this._load()
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    _load = async () => {
        let currMonth = new Date().getMonth();
        let CurrentYear = new Date().getFullYear();
        // let currMonth = value.currentMonth == "January" ? 0 : value.currentMonth == "February" ? 1 : value.currentMonth == "March" ? 2 : value.currentMonth == "April" ? 3 : value.currentMonth == "May" ? 4 : value.currentMonth == "June" ? 5 : value.currentMonth == "July" ? 6 : value.currentMonth == "August" ? 7 : value.currentMonth == "September" ? 8 : value.currentMonth == "October" ? 9 : value.currentMonth == "November" ? 10 : 11
        const firstDate = new Date(CurrentYear, currMonth, 1);
        const lastDate = new Date(CurrentYear, currMonth + 1, 0);
        const currentMonthLastDate = DateConvert.formatYYYYMMDD(new Date());
        let fromDate = DateConvert.formatYYYYMMDD(firstDate);
        let toDate = new Date().getMonth() == currMonth ? currentMonthLastDate : DateConvert.formatYYYYMMDD(lastDate)
        // StoreUserOtherInformations("", {}, this.props);
        await this.getAllExpensesCount(fromDate, toDate)
        await this.getExpenseCalenderData(fromDate, toDate)
        await this.onApiData(fromDate, toDate)
        await this.onChartData(fromDate, toDate)
        this.setState({ refreshing: false })
    }

    onRefresh = async () => {
        await this.clearStateData();
        await this._load()

    }
    clearStateData = async () => {
        this.setState({
            dashBoardLoader: true,
            mainArr: [],
            odometerList: {},
            foodList: {},
            otherList: {},
            fromDate: "",
            toDate: "",
            mainCalenderData: [],
            chartData: {},
            calenderLoader: true,
            otherApiCall: false,
            expenseHeaderData: {}

        })
    }

    getAllExpensesCount = async (firstDate, lastDate) => {
        this.setState({
            dashBoardLoader: true
        })
        let reqData = {
            searchFrom: firstDate,
            searchTo: lastDate,
        }

        let responseData = await MiddlewareCheck("getAllExpenseCount", reqData, this.props);
        let totalHeaderData = modHeaderObj(responseData.response)
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    expenseHeaderData: totalHeaderData
                })
            }

            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            dashBoardLoader: false
        })
    }



    onChartData = async (fromDate, toDate) => {
        let reqData = {
            "searchFrom": fromDate,
            "searchTo": toDate,
        }
        this.setState({
            dashBoardLoader: true
        })
        let responseData = await MiddlewareCheck("getChartData", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {

                this.setState({
                    chartData: responseData.response
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            dashBoardLoader: false
        })
    }

    onApiData = async (fromDate, toDate) => {
        let reqData = {
            "searchFrom": fromDate,
            "searchTo": toDate,
        }
        this.setState({
            dashBoardLoader: true
        })
        let responseData = await MiddlewareCheck("getExpenseDashboardData", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifyData = modifyExpenceDashboardArr(responseData)
                this.setState({
                    mainArr: modifyData.expenseDashBoardArr
                })
                this.setState({ otherApiCall: true })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.state.odometerList = this.state.mainArr[1];
        this.state.foodList = this.state.mainArr[3];
        this.state.otherList = this.state.mainArr[2]
        this.setState({
            odometerList: this.state.odometerList,
            foodList: this.state.foodList,
            otherList: this.state.otherList
        })

        this.setState({
            dashBoardLoader: false
        })
    }

    getExpenseCalenderData = async (fromDate, toDate) => {
        let reqData = {
            "searchFrom": fromDate,
            "searchTo": toDate,
        }
        this.setState({
            dashBoardLoader: true
        })
        let responseData = await MiddlewareCheck("getExpenseByApprovedStatusForCalender", reqData, this.props);

        let modRespDataMain = modRespData(responseData.response)
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modCalenderData = modifyCalenderScheduleData(modRespDataMain);
                this.setState({
                    mainCalenderData: modCalenderData
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            dashBoardLoader: false
        })
    }

    calenderData = async (value) => {

        let currMonth = value.currentMonth == "January" ? 0 : value.currentMonth == "February" ? 1 : value.currentMonth == "March" ? 2 : value.currentMonth == "April" ? 3 : value.currentMonth == "May" ? 4 : value.currentMonth == "June" ? 5 : value.currentMonth == "July" ? 6 : value.currentMonth == "August" ? 7 : value.currentMonth == "September" ? 8 : value.currentMonth == "October" ? 9 : value.currentMonth == "November" ? 10 : 11
        const firstDate = new Date(value.CurrentYear, currMonth, 1);
        const lastDate = new Date(value.CurrentYear, currMonth + 1, 0);
        const currentMonthLastDate = DateConvert.formatYYYYMMDD(new Date());
        let fromDate = DateConvert.formatYYYYMMDD(firstDate);
        let toDate = new Date().getMonth() == currMonth ? currentMonthLastDate : DateConvert.formatYYYYMMDD(lastDate)
        this.setState({ fromDate: fromDate, toDate: toDate })
        await this.getAllExpensesCount(fromDate, toDate)
        await this.getExpenseCalenderData(fromDate, toDate)
        await this.onApiData(fromDate, toDate)
        await this.onChartData(fromDate, toDate)
    }

    expenseTile = () => {
        return (
            <>
                {this.state.mainArr.map((item, key) => (
                    <>
                        {item.expenseType == "Fieldvisit" ? null :
                            <View style={styles.mainView}>
                                <TouchableOpacity activeOpacity={1} >
                                    {/* <TouchableOpacity activeOpacity={1} onPress={() => onClickOdometer()}> */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.boxView}>
                                            <View >
                                                <Image source={item.expenseType == "Other" ? ImageName.EXPENSE_OTHER_LOGO : item.expenseType == "Food" ? ImageName.EXPENSE_FOOD_LOGO : ImageName.EXPENSE_ODOMETER_LOGO} style={styles.iconImage} />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={styles.textCount}>{item.expenseType == "Other" ? "Other Expenses" : item.expenseType == "Food" ? "Total Present Days" : "Total Odometer Count"}</Text>
                                                <Text style={styles.textVisitCount}>{item.totalCount}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: "wrap" }}>
                                            <Text style={styles.textAmount}>{'\u20B9' + item.totalCost}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    </>

                ))}

            </>

        )
    }

    odometerTile = () => {
        const onClickOdometer = () => {
            this.props.navigation.navigate("Expenses", { index: "Odometer" })
        }
        return (
            <View style={styles.mainView}>
                <TouchableOpacity activeOpacity={1} >
                    {/* <TouchableOpacity activeOpacity={1} onPress={() => onClickOdometer()}> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.boxView}>
                            <View >
                                <Image source={ImageName.EXPENSE_ODOMETER_LOGO} style={styles.iconImage} />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.textCount}>Total Odometer Count</Text>
                                <Text style={styles.textVisitCount}>{this.state.odometerList.totalCount}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: "wrap" }}>
                            <Text style={styles.textAmount}>{'\u20B9' + this.state.odometerList.totalCost}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    foodTile = () => {

        const onClickFood = () => {
            this.props.navigation.navigate("Expenses", { index: "Food" })
        }
        return (
            <View style={styles.mainView}>
                <TouchableOpacity activeOpacity={1} >
                    {/* <TouchableOpacity activeOpacity={1} onPress={() => onClickFood()}> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.boxView}>
                            <View >
                                <Image source={ImageName.EXPENSE_FOOD_LOGO} style={styles.iconImage} />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.textCount}>Total Present Days</Text>
                                <Text style={styles.textVisitCount}>{this.state.foodList.totalCount}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: "wrap" }}>
                            <Text style={styles.textAmount}>{'\u20B9' + this.state.foodList.totalCost}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    otherTile = () => {
        const onClickOther = () => {
            this.props.navigation.navigate("Expenses", { index: "Other" })
        }
        return (
            <View style={styles.mainView}>
                <TouchableOpacity activeOpacity={1} >
                    {/* <TouchableOpacity activeOpacity={1} onPress={() => onClickOther()}> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.boxView}>
                            <View >
                                <Image source={ImageName.EXPENSE_OTHER_LOGO} style={styles.iconImage} />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.textCount}>Other Expenses</Text>
                                <Text style={styles.textVisitCount}>{this.state.otherList.totalCount}</Text>

                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: "wrap" }}>
                            <Text style={styles.textAmount}>{'\u20B9' + this.state.otherList.totalCost}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    chartSection = () => {
        return (
            <View style={{ marginTop: 20 }}>
                {/* <View style={styles.chartFilterSec}>
                    <Text style={styles.textCount}>Compare Expenses by</Text>
                    <View style={styles.tabView}>
                        <Text style={styles.tabViewTxt}>Month</Text>
                    </View>
                    <View style={styles.tabView}>
                        <Text style={styles.activeTabViewTxt}>Quarter</Text>
                    </View>
                    <View style={styles.tabView}>
                        <Text>Year</Text>
                    </View>
                </View> */}
                {/* chartttttt */}
                <View style={{ height: 20 }} />
                {this.state.dashBoardLoader ?
                    <View>
                        <SkeletonPlaceholder>
                            <View>
                                <View style={styles.skeletonCalenderMainView} />
                            </View>
                        </SkeletonPlaceholder>
                    </View>
                    :
                    <ExpenseChart data={this.state.chartData} />
                }

            </View>
        )
    }

    onExpenseListPage = () => {
        this.props.navigation.navigate("Expenses", { index: "add" })
    }

    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <Header {...this.props} onRefresh={() => console.log("")} />
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                    />
                }>
                    <View style={styles.mainContainer}>
                        {this.state.dashBoardLoader ?
                            <View>
                                <SkeletonPlaceholder>
                                    <View>
                                        <View style={styles.skeletonCalenderMainView} />
                                    </View>
                                </SkeletonPlaceholder>
                            </View>
                            :
                            <>
                                {/* <DynamicCalender loadComponent={(value) => this.calenderData(value)} type={"dashboard"} data={this.state.mainCalenderData} headerData={this.state.expenseHeaderData} /> */}
                                <DynamicCalender loadComponent={(value) => this.calenderData(value)} type={"dashboard"} data={this.state.mainCalenderData} headerData={this.state.expenseHeaderData} />

                                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginTop: 10 }}>
                                    {CommonData.COMMON.EXPENSES_STATUS.map((item, key) => (
                                        <View key={key} style={{ flexDirection: "row", alignItems: "center", }}>
                                            <View style={[styles.circle, { backgroundColor: item.color }]} />
                                            <View style={{ marginLeft: 5, marginRight: 8 }}>
                                                <Text style={styles.dotText}>{item.name}</Text>
                                            </View>
                                        </View>

                                    ))}

                                </View>

                            </>

                        }
                        {/* <View style={styles.bottomTxtCalender}>
                            <View style={{ flex: 1 }} />
                            {this.state.dashBoardLoader ?
                                <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                                    <SkeletonPlaceholder>
                                        <View style={styles.skeletonCalenderBottomView} />
                                    </SkeletonPlaceholder>
                                </View>
                                :
                                <>
                                    <Text style={styles.startTxt}>Expenses Final Submission will </Text>
                                    <Text style={styles.endTxt}>Closed by 30th</Text>
                                </>
                            }

                        </View> */}
                        <View style={styles.underLine} />
                        <View style={{ marginVertical: 15 }}>
                            {this.state.dashBoardLoader == true ?
                                <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                                    <SkeletonPlaceholder>
                                        <View style={styles.skeletonView} />
                                        <View style={styles.skeletonView} />
                                        <View style={styles.skeletonView} />
                                    </SkeletonPlaceholder>
                                    {/* <ActivityIndicator size="large" color={"#156A94"} /> */}
                                </View> :
                                <React.Fragment>
                                    {this.expenseTile()}
                                    {/* {this.odometerTile()}
                                    {this.foodTile()}
                                    {this.otherTile()} */}

                                </React.Fragment>

                            }
                            <View style={{ marginTop: 10 }}>
                                {this.chartSection()}
                            </View>
                            <View style={{ marginHorizontal: "30%", marginVertical: 20 }}>
                                <BigTextButton text={"Add Expenses"}
                                    backgroundColor={"#156A94"}
                                    onPress={() => this.onExpenseListPage()}
                                />
                            </View>

                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDashboard);

