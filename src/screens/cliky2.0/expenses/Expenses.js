import React from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Color, Dimension, FontFamily, ImageName } from '../../../enums';
import styles from './Style';
import { OtherExpenses } from './sub-component';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../../redux/Sales360Action';
import { DynamicTab } from '../../../pageShared';
import { DynamicCalender } from '../../../shared';
import { VisitExpenses, FoodExpenses, OdometerExpenses } from './sub-component';
import { MiddlewareCheck, StoreUserOtherInformations } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import { DateConvert, Toaster } from '../../../services/common-view-function';
import { foodModifyData, modHeaderObj, modifyExpenceTypeArr, modifyFetchData, odometerModifyData, visitModifyData } from './Function';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { CustomStyle } from '../../style';

class Expenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            pageNum: 0,
            selectedIndex: 0,
            allData: {},
            calendarData: {},
            isNewEntryActive: true,
            isHistoryActive: false,
            pageLoader: false,
            dynamicLoader: false,
            mainArr: [],
            expenceCategoryType: {},
            selectedItem: {},
            fromDate: "",
            toDate: "",
            countLoader: true,

            visitData: {
                visitListData: [],
            },

            odometerData: {
                odometerListData: []
            },
            otherData: {
                otherListData: []
            },
            foodData: {
                foodListData: []
            },
            expenseHeaderData: {}

        }
    }

    componentDidMount = async () => {
        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this._load();
                StoreUserOtherInformations("", {}, this.props);
            })
    }

    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _load = async () => {
        await this.getTabData();
    }

    getAllExpensesCount = async (firstDate, lastDate) => {
        this.setState({
            countLoader: true
        })
        let reqData = {
            searchFrom: firstDate,
            searchTo: lastDate,
            // expenseTypeId: selectedItem.id.toString()
        }
        let responseData = await MiddlewareCheck("getAllExpenseCount", reqData, this.props);
        let totalHeaderData = modHeaderObj(responseData.response)
        if (responseData) {
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
            countLoader: false
        })
    }

    // get dynamic tab data
    getTabData = async () => {
        let currMonth = new Date().getMonth();
        let CurrentYear = new Date().getFullYear();
        // let currMonth = value.currentMonth == "January" ? 0 : value.currentMonth == "February" ? 1 : value.currentMonth == "March" ? 2 : value.currentMonth == "April" ? 3 : value.currentMonth == "May" ? 4 : value.currentMonth == "June" ? 5 : value.currentMonth == "July" ? 6 : value.currentMonth == "August" ? 7 : value.currentMonth == "September" ? 8 : value.currentMonth == "October" ? 9 : value.currentMonth == "November" ? 10 : 11
        const firstDate = new Date(CurrentYear, currMonth, 1);
        const lastDate = new Date(CurrentYear, currMonth + 1, 0);
        const currentMonthLastDate = DateConvert.formatYYYYMMDD(new Date());
        let fromDate = DateConvert.formatYYYYMMDD(firstDate);
        let toDate = new Date().getMonth() == currMonth ? currentMonthLastDate : DateConvert.formatYYYYMMDD(lastDate)
        this.setState({
            fromDate: fromDate,
            toDate: toDate,
            dynamicLoader: true,

        })
        let responseData = await MiddlewareCheck("masterExpenseTypes", {}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifyData = modifyExpenceTypeArr(responseData.response)
                this.setState({
                    mainArr: modifyData.expencrTypeArr
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            dynamicLoader: false
        })
        this.checkSelectedComponent(this.state.mainArr, fromDate, toDate)

    }

    checkSelectedComponent = async (arrData, firstDate, lastDate) => {
        let index = 0;
        let arr = this.state.mainArr;
        for (let i = 0; i < arr.length; i++) {
            // if (this.props.route.params.index == "add") {
            if (arr[i].check == true) {
                index = i;
                this.setState({ selectedItem: arr[i] })
                // await this.getAllExpensesCount(arr[i], firstDate, lastDate)
                await this.getAllExpensesCount(firstDate, lastDate)
                await this._onExpenseCategoryTypes(firstDate, lastDate)
                // await this._onOtherExpenseApi(firstDate, lastDate)

            }
            // } else {
            // if (arr[i].label == this.props.route.params.index) {
            //     if (arr[i].label == "Odometer") {
            //         this._onOdodmeterListApi(firstDate, lastDate)
            //     } else if (arr[i].label == "Food") {
            //         this._onFoodListApi(firstDate, lastDate)
            //     }
            //     arr[i].check = true
            //     index = i;

            // } else {
            //     arr[i].check = false
            // }
            // }
        }
        this.setState({ selectedIndex: index, countLoader: false })
    }


    _onExpenseCategoryTypes = async (firstDate, lastDate) => {
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchFrom": firstDate,
            "searchTo": lastDate,
        }
        this.setState({ pageLoader: true })
        let responseData = await MiddlewareCheck("getAllFieldVisitsByMonths", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let fieldVistList = await visitModifyData(responseData);
                this.state.visitData.visitListData = fieldVistList.visitListData;
                this.setState({
                    visitData: this.state.visitData
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false
        })
    }


    _onOdodmeterListApi = async (firstDate, lastDate) => {

        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchFrom": firstDate,
            "searchTo": lastDate
        }
        this.setState({
            pageLoader: true
        })
        let responseData = await MiddlewareCheck("getOdometerDetails", dataReq, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let odometerListData = await odometerModifyData(responseData);
                this.state.odometerData.odometerListData = odometerListData.odometerListData;
                this.setState({
                    odometerData: this.state.odometerData
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false
        })
    }

    _onFoodListApi = async (selectedItem, firstDate, lastDate) => {
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchFrom": firstDate,
            "searchTo": lastDate,
            "fieldVisitId": "",
            "dataListType": "singleUser",
            "expenseTypeId": selectedItem.id
        }

        this.setState({
            pageLoader: true
        })
        let responseData = await MiddlewareCheck("getFoodExpenseDetails", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let foodList = await foodModifyData(responseData);
                this.state.foodData.foodListData = foodList.foodListData;
                this.setState({
                    foodData: this.state.foodData
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false
        })
    }

    _onOtherExpenseApi = async (selectedItem, firstDate, lastDate) => {
        let dataReq = {
            "limit": "50",
            "offset": "0",
            "searchFrom": firstDate,
            "searchTo": lastDate,
            "fieldVisitId": "",
            "dataListType": "singleUser",
            "expenseTypeId": selectedItem.id
        }
        this.setState({ pageLoader: true })
        let responseData = await MiddlewareCheck("getExpenseList", dataReq, this.props);
        // console.log("countttt fetch----",responseData.response.resp.length)
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let fetchedData = await modifyFetchData(responseData.response);
                this.state.otherData.otherListData = fetchedData.visitListData;
                this.setState({
                    otherData: this.state.otherData
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ pageLoader: false })
    }


    _onBack = () => {
        this.props.navigation.goBack();
    };

    //on select tabs function
    selectedTab = async (value, index) => {

        this.state.dynamicArrValue = value
        this.setState({
            dynamicArrValue: this.state.dynamicArrValue
        })
        for (let i = 0; i < this.state.mainArr.length; i++) {
            if (i == index) {
                this.state.mainArr[i].check = true
                this.setState({ selectedItem: this.state.mainArr[i] })
                // this._onSelectedTab(value,this.state.mainArr[i])

                if (value.label == "Fieldvisit") {
                    this._onExpenseCategoryTypes(this.state.fromDate, this.state.toDate)
                    this.getAllExpensesCount(this.state.mainArr[i], this.state.fromDate, this.state.toDate)
                } else if (value.label == "Odometer") {
                    this._onOdodmeterListApi(this.state.fromDate, this.state.toDate)
                    this.getAllExpensesCount(this.state.mainArr[i], this.state.fromDate, this.state.toDate)
                }
                else if (value.label == "Other") {
                    this._onOtherExpenseApi(this.state.mainArr[i], this.state.fromDate, this.state.toDate)
                    this.getAllExpensesCount(this.state.mainArr[i], this.state.fromDate, this.state.toDate)
                }
                else if (value.label == "Food") {
                    this._onFoodListApi(this.state.mainArr[i], this.state.fromDate, this.state.toDate)
                    this.getAllExpensesCount(this.state.mainArr[i], this.state.fromDate, this.state.toDate)
                }
            } else {
                this.state.mainArr[i].check = false
            }
        }
        this.setState({ mainArr: this.state.mainArr, selectedIndex: index })

    }

    // _onSelectedTab = (value, mainObj) => {
    //     if (value.label == "Fieldvisit") {
    //         this._onExpenseCategoryTypes(this.state.fromDate, this.state.toDate)
    //         this.getAllExpensesCount(mainObj, this.state.fromDate, this.state.toDate)
    //     } else if (value.label == "Odometer") {
    //         this._onOdodmeterListApi(this.state.fromDate, this.state.toDate)
    //         this.getAllExpensesCount(mainObj, this.state.fromDate, this.state.toDate)
    //     }
    //     else if (value.label == "Other") {
    //         this._onOtherExpenseApi(mainObj, this.state.fromDate, this.state.toDate)
    //         this.getAllExpensesCount(mainObj, this.state.fromDate, this.state.toDate)
    //     }
    //     else if (value.label == "Food") {
    //         this._onFoodListApi(mainObj, this.state.fromDate, this.state.toDate)
    //         this.getAllExpensesCount(mainObj, this.state.fromDate, this.state.toDate)
    //     }
    // }

    tabSection = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <DynamicTab data={this.state.mainArr} onSelectedTab={(value, index) => this.selectedTab(value, index)} />
            </View>
        )
    }

    calenderData = (value) => {
        let currMonth = value.currentMonth == "January" ? 0 : value.currentMonth == "February" ? 1 : value.currentMonth == "March" ? 2 : value.currentMonth == "April" ? 3 : value.currentMonth == "May" ? 4 : value.currentMonth == "June" ? 5 : value.currentMonth == "July" ? 6 : value.currentMonth == "August" ? 7 : value.currentMonth == "September" ? 8 : value.currentMonth == "October" ? 9 : value.currentMonth == "November" ? 10 : 11
        const firstDate = new Date(value.CurrentYear, currMonth, 1);
        const lastDate = new Date(value.CurrentYear, currMonth + 1, 0);
        const currentMonthLastDate = DateConvert.formatYYYYMMDD(new Date());
        this.setState({
            fromDate: DateConvert.formatYYYYMMDD(firstDate),
            toDate: new Date().getMonth() == currMonth ? currentMonthLastDate : DateConvert.formatYYYYMMDD(lastDate)
        })
        if (this.state.selectedIndex == 0) {
            this._onExpenseCategoryTypes(DateConvert.formatYYYYMMDD(firstDate), new Date().getMonth() == currMonth ? currentMonthLastDate : DateConvert.formatYYYYMMDD(lastDate))

        } else if (this.state.selectedIndex == 1) {
            this._onOdodmeterListApi(DateConvert.formatYYYYMMDD(firstDate), new Date().getMonth() == currMonth ? currentMonthLastDate : DateConvert.formatYYYYMMDD(lastDate))

        } else if (this.state.selectedIndex == 2) {
            this._onOtherExpenseApi(this.state.selectedItem, DateConvert.formatYYYYMMDD(firstDate), new Date().getMonth() == currMonth ? currentMonthLastDate : DateConvert.formatYYYYMMDD(lastDate))

        } else if (this.state.selectedIndex == 3) {
            this._onFoodListApi(this.state.selectedItem, DateConvert.formatYYYYMMDD(firstDate), new Date().getMonth() == currMonth ? currentMonthLastDate : DateConvert.formatYYYYMMDD(lastDate))

        }
    }

    calenderSecton = () => {
        return (
            <>
                <DynamicCalender loadComponent={(value) => this.calenderData(value)} type={"expense"} headerData={this.state.expenseHeaderData} />
            </>
        )
    }

    listHeaderSection = () => {
        return (
            <View style={{ margin: 10 }}>
                <View style={styles.underline} />
                <View style={styles.mainHeaderSec}>
                    <View style={{ flex: 0.45, flexDirection: "row" }}>
                        <Image source={ImageName.EXPENSE_VISIT_ICON} style={styles.visitIconImg} />
                        <Text style={styles.amountLabel}>{this.state.selectedIndex == 2 || this.state.selectedIndex == 3 ? "Total Working Day" : "Total Visit"}</Text><Text style={styles.amountkm}>{this.state.selectedIndex == 0 || this.state.selectedIndex == 1 ? this.state.expenseHeaderData.TotalVisit : "00"}</Text>
                    </View>
                    <View style={styles.totalExpSec}>
                        <Image source={this.state.selectedIndex == 3 ? ImageName.EXPENSE_FOOD_ICON :
                            this.state.selectedIndex == 2 ? ImageName.EXPENSE_OTHER_ICON :
                                ImageName.GREEN_ODOMETER
                        }
                            style={styles.visitIconImg} />

                        <Text style={styles.amountLabel}>{this.state.selectedIndex == 3 ? "Total Food Exp." : this.state.selectedIndex == 2 ? "Other Expenses" : "Odometer"}</Text>
                        {this.state.selectedIndex == 2 || this.state.selectedIndex == 3 ? null :
                            <Text style={styles.amountkm}>{this.state.expenseHeaderData.totalOdometerKms} / </Text>
                        }
                        <Text style={styles.amount}>{'\u20B9' + " " + (this.state.selectedIndex == 2 ? this.state.expenseHeaderData.totalOtherExpense : this.state.selectedIndex == 3 ? this.state.expenseHeaderData.totalFoodExp : this.state.expenseHeaderData.odometerExpenses)}</Text>

                    </View>
                </View>

                <View style={styles.underline} />
            </View>
        )
    }

    skelitonSection = () => {
        return (
            <SkeletonPlaceholder>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={styles.skelitonSec} />
                    <View style={styles.skelitonSec} />
                    <View style={styles.skelitonSec} />
                    <View style={styles.skelitonSec} />
                    <View style={styles.skelitonSec} />
                </View>
            </SkeletonPlaceholder>
        )
    }

    onRefresh = () => {

        this.state.foodData.foodListData = [];
        // this.state.visitData.visitListData = [];
        this._onFoodListApi(this.state.selectedItem, this.state.fromDate, this.state.toDate)
        // this._onExpenseCategoryTypes(this.state.selectedItem, this.state.fromDate, this.state.toDate)
    }

    render() {
        return (
            // <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <SafeAreaView style={CustomStyle.container}>
                <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this._onBack()}>
                            <Image source={ImageName.BACK_IMG} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                    </View>
                    {this.state.countLoader == true ?
                        <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                            <SkeletonPlaceholder>
                                <View style={styles.skeletonView} />
                            </SkeletonPlaceholder>
                        </View>
                        :
                        this.calenderSecton()
                    }

                    <View>
                        {this.state.dynamicLoader == true ?
                            <View>
                                {this.skelitonSection()}
                            </View> :
                            <>
                                {this.tabSection()}
                            </>
                        }
                        {this.state.countLoader == true ?
                            <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                                <SkeletonPlaceholder>
                                    <View style={styles.skeletonView} />
                                </SkeletonPlaceholder>
                            </View>
                            : this.listHeaderSection()}
                        {/* {this.listHeaderSection()} */}
                        {this.state.pageLoader ?
                            <View style={{ height: Dimension.height / 2.4, justifyContent: "center", alignItems: "center" }}>
                                <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.DARK_BLUE} />
                            </View> :
                            <View>
                                {
                                    this.state.selectedIndex == 0 ?
                                        <VisitExpenses {...this.props} selectedTabData={this.state.selectedItem} mainData={this.state.visitData} />
                                        :
                                        null
                                }
                                {
                                    this.state.selectedIndex == 1 ?
                                        <OdometerExpenses {...this.props} selectedTabData={this.state.selectedItem} mainData={this.state.odometerData} />
                                        :
                                        null
                                }
                                {
                                    this.state.selectedIndex == 2 ?
                                        <OtherExpenses {...this.props} selectedTabData={this.state.selectedItem} mainData={this.state.otherData} date={{ "fromDate": this.state.fromDate, "toDate": this.state.toDate }} />
                                        :
                                        null
                                }
                                {
                                    this.state.selectedIndex == 3 ?
                                        <FoodExpenses {...this.props} selectedTabData={this.state.selectedItem} mainData={this.state.foodData} onReload={this.onRefresh} />
                                        :
                                        null

                                }
                            </View>




                        }
                    </View>
                </View>
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
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Expenses);