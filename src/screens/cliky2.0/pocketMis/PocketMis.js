import React from "react";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from '../../../enums';
import styles from './Style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,

} from 'react-native';
import {
    stateUserInformation,
    stateCheckForNetwork,
} from '../../../redux/Sales360Action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CheckBox, DropdownInputBox, Loader, Modal, NoDataFound, PhoneEmailLocationPopup, TextInputBox } from "../../../shared";
import BigTextButton from "../../../shared/big-text-button";
import { MiddlewareCheck } from "../../../services/middleware";
import { modifyAllData, validateActionData, _modifyAddDataArr, pocketModifyData } from "./Function";
import { CustomStyle } from "../../style";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { ErrorCode } from "../../../services/constant";
import { DateConvert, Toaster } from "../../../services/common-view-function";
import DatePicker from "react-native-date-picker";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
// import SwipeButton from 'rn-swipe-button';

const bar = {
    activeStrokeWidth: 15,
    inActiveStrokeWidth: 15,
    inActiveStrokeOpacity: 0.2
};


const subCategoryData = [
    {
        id: 1,
        title: " MTD ",
        name: "mtd",
        check: false

    },
    {
        id: 2,
        title: "LMTD",
        name: "lmtd",
        check: false

    },
    {
        id: 3,
        title: "Custom Date",
        name: "customDateRange",
        check: false
    },

]

class MyPocketMis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subCategoryData: subCategoryData,
            pageLoader: true,
            reportLoader: false,
            myPocketList: {},
            reportData: {},
            fromDatePicker: false,
            fromDateObj: {
                rawDate: new Date(),
                fromDate: ""
            },
            toDatePicker: false,
            toDateObj: {
                rawDate: new Date(),
                toDate: ""
            },
            selectedTab: "",
            showMainReportData: true,
            misDataLoader: true,
            misReportLoader: true,
        }
    }

    componentDidMount = async () => {
        await this._load();
        await this.getMisPerformanceReport("mtd")
        this.setState({ pageLoader: false });
    }
    _load = async () => {
        for (let i = 0; i < this.state.subCategoryData.length; i++) {
            if (i == 0) {
                this.state.subCategoryData[i].check = true
            } else {
                this.state.subCategoryData[i].check = false
            }
        }
        this.setState({ subCategoryData: this.state.subCategoryData })

        let reqData = {
            currentDate: DateConvert.formatYYYYMMDD(new Date())
        }
        let responseData = await MiddlewareCheck("getPocketMisDataForUser", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    myPocketList: responseData.response
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ misDataLoader: false })
    }

    getMisPerformanceReport = async (reportType) => {
        let reqData = {
            "reportType": reportType,
            "searchFrom": this.state.fromDateObj.fromDate,
            "searchTo": this.state.toDateObj.toDate
        }
        this.setState({ reportLoader: true })
        let responseData = await MiddlewareCheck("getPocketMisPerformanceReport", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    reportData: responseData.response
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ reportLoader: false, misReportLoader: false })

    }

    onBack = () => {
        this.props.navigation.goBack()
    }

    _onHeaderSec = () => {
        return (
            <View style={{ marginHorizontal: '5%', marginTop: 10, alignItems: 'center' }}>
                <View style={{ marginTop: 8, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.onBack()}>
                        <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: '5%', top: -5 }}>My Pocket MIS</Text>
                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 3 }} />
                </View>
            </View>
        )
    }

    onDayReport = () => {
        this.props.navigation.navigate("DayWiseReport", { prevProps: "this.props.route.params.item" });
    }

    onProductWiseReport = () => {
        this.props.navigation.navigate("ProductWiseSales", { prevProps: "this.props.route.params.item" });
    }

    footerSec = () => {
        return (
            <View style={{ marginHorizontal: '5%', flexDirection: 'row', marginTop: 25 }}>
                {/* <BigTextButton
                    text={"Day Wise Report"}
                    backgroundColor={"#1F2B4D"}
                    borderRadius={22}
                    fontSize={12}
                    onPress={() => this.onDayReport()}
                /> */}
                <View style={{ width: 15 }} />
                <BigTextButton
                    text={"Product Wise Report"}
                    backgroundColor={"#1F2B4D"}
                    borderRadius={22}
                    fontSize={12}
                    onPress={() => this.onProductWiseReport()}
                />
            </View>
        )
    }

    onSelectTab = async (val) => {
        for (let i = 0; i < this.state.subCategoryData.length; i++) {
            if (this.state.subCategoryData[i].id == val.id) {
                this.state.subCategoryData[i].check = true
            } else {
                this.state.subCategoryData[i].check = false
            }
        }
        this.setState({ subCategoryData: this.state.subCategoryData, selectedTab: val.name })
        if (val.name !== "customDateRange") {
            this.setState({ showMainReportData: true })
            await this.getMisPerformanceReport(val.name)
        } else {
            this.setState({
                showMainReportData: false,
                fromDateObj: {
                    rawDate: new Date(),
                    fromDate: ""
                },
                toDateObj: {
                    rawDate: new Date(),
                    toDate: ""
                }
            })

        }
    }

    onSearchByDate = async () => {
        if (this.state.fromDateObj.fromDate.length == 0) {
            Toaster.ShortCenterToaster("Please select from date !")
        } else if (this.state.toDateObj.toDate.length == 0) {
            Toaster.ShortCenterToaster("Please select to date !")
        } else {
            this.setState({ showMainReportData: true })
            await this.getMisPerformanceReport("customDateRange")
        }
    }

    _onFromDatePicker = () => {
        this.setState({
            fromDatePicker: true
        })
    }

    _onFromCloseDatePicker = () => {
        this.setState({
            fromDatePicker: false
        })
    }

    _onSelectFromDate = (date) => {
        this.state.fromDateObj.rawDate = date.date;
        this.state.fromDateObj.fromDate = DateConvert.formatYYYYMMDD(date.date);
        this.setState({
            fromDateObj: this.state.fromDateObj
        });
        this._onFromCloseDatePicker()
    }

    _onToDatePicker = () => {
        this.setState({
            toDatePicker: true
        })
    }

    _onToCloseDatePicker = () => {
        this.setState({
            toDatePicker: false
        })
    }

    _onSelectToDate = (date) => {
        this.state.toDateObj.rawDate = date.date;
        this.state.toDateObj.toDate = DateConvert.formatYYYYMMDD(date.date);
        this.setState({
            toDateObj: this.state.toDateObj
        });
        this._onToCloseDatePicker()
    }

    swipeSec = () => {
        return (
            <View>
                <SwipeButton
                    disabled={false}
                    //disable the button by doing true (Optional)
                    swipeSuccessThreshold={70}
                    height={45}
                    //height of the button (Optional)
                    width={330}
                    //width of the button (Optional)
                    title="Swipe to Submit"
                    //Text inside the button (Optional)
                    //thumbIconImageSource={thumbIcon}
                    //You can also set your own icon (Optional)
                    onSwipeSuccess={() => {
                        alert('Submitted Successfully!');
                    }}
                    //After the completion of swipe (Optional)
                    // thumbIconStyles={{borderRadius:10}}
                    railFillBackgroundColor="#e688a1" //(Optional)
                    railFillBorderColor="#e688ff" //(Optional)
                    thumbIconBackgroundColor="#ed9a73" //(Optional)
                    thumbIconBorderColor="#ed9aff" //(Optional)
                    railBackgroundColor="red" //(Optional)
                    railBorderColor="#bbeaff" //(Optional)
                />
            </View>
        )
    }

    performanceReportSec = () => {
        return (
            <>
                <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 }}>
                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Performance Report</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {this.state.subCategoryData.map((item, key) => (
                            <TouchableOpacity style={item.check ? styles.ActiveMainTab : styles.mainTab} onPress={() => this.onSelectTab(item)} activeOpacity={0.9} key={key}>
                                {item.title ?
                                    <View key={key}>
                                        <Text style={item.check ? styles.activeTitleTxt : styles.titleTxt}>{item.title}</Text>
                                    </View>
                                    : null}

                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={{ marginTop: 5 }} />
                <View style={{ backgroundColor: '#F0F4F7', padding: 6, borderRadius: 8 }}>
                    {this.state.selectedTab == "customDateRange" ?
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ flex: 0.45 }}>
                                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onFromDatePicker()} activeOpacity={0.9}>
                                    <Text style={[styles.inputBoxText, this.state.fromDateObj.fromDate.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>{this.state.fromDateObj.fromDate.length == 0 ? "*From Date" : this.state.fromDateObj.fromDate}</Text>
                                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ height: 16, width: 16, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                                    </View>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={this.state.fromDatePicker}
                                    date={this.state.fromDateObj.rawDate}
                                    maximumDate={new Date()}
                                    mode={"date"}
                                    onConfirm={(date) => {
                                        this._onSelectFromDate({ date })
                                    }}
                                    onCancel={() => {
                                        this._onFromCloseDatePicker()
                                    }}
                                />
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.45 }}>
                                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onToDatePicker()} activeOpacity={0.9}>
                                    <Text style={[styles.inputBoxText, this.state.toDateObj.toDate.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>{this.state.toDateObj.toDate.length == 0 ? "*To Date" : this.state.toDateObj.toDate}</Text>
                                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ height: 16, width: 16, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                                    </View>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={this.state.toDatePicker}
                                    date={this.state.toDateObj.rawDate}
                                    maximumDate={new Date()}
                                    mode={"date"}
                                    minimumDate={this.state.fromDateObj.rawDate}
                                    onConfirm={(date) => {
                                        this._onSelectToDate({ date })
                                    }}
                                    onCancel={() => {
                                        this._onToCloseDatePicker()
                                    }}
                                />
                            </View>
                            <View style={{ flex: 0.1, alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={() => this.onSearchByDate()}>
                                    <Image style={{ height: 30, width: 30, resizeMode: 'contain' }} source={ImageName.SEARCH_LOGO} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        null
                    }
                    {this.state.reportLoader ?
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
                            <ActivityIndicator size={"large"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                        </View>
                        :
                        <>
                            {this.state.showMainReportData ? <React.Fragment>
                                <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{(this.props.Sales360Redux.loginData.clientId == 19 ? null : "₹" + " " + this.state.reportData.netValue)}</Text>
                                </View>
                                <View style={{ marginHorizontal: 8 }}>
                                    <View style={{ borderWidth: 0.8, borderColor: Color.COLOR.GRAY.DAVY_GRAY, borderRadius: 8, height: 140, width: Dimension.width / 1.125, marginTop: 12 }}>
                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                            <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.reportData.stdUnitQty}</Text>
                                            </View>
                                            <View style={{ flex: 0.05 }} />
                                            <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.reportData.pc}</Text>
                                            </View>
                                            <View style={{ flex: 0.05 }} />
                                            <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.reportData.tc}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                            <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Qty(STD Unit)</Text>
                                            </View>
                                            <View style={{ flex: 0.05 }} />
                                            <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>PC</Text>
                                            </View>
                                            <View style={{ flex: 0.05 }} />
                                            <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>TC</Text>
                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: '#E3ECF4', height: 74, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                            <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                                <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Average</Text>
                                                </View>
                                                <View style={{ flex: 0.05 }} />
                                                <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Average</Text>
                                                </View>
                                                <View style={{ flex: 0.05 }} />
                                                <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Average</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                                <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.reportData.stdUnitQtyAvg}</Text>
                                                </View>
                                                <View style={{ flex: 0.05, }} />
                                                <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.reportData.pcAvg}</Text>
                                                </View>
                                                <View style={{ flex: 0.05 }} />
                                                <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.reportData.tcAvg}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    </View>

                                    <View style={{ borderWidth: 0.8, borderColor: Color.COLOR.GRAY.DAVY_GRAY, borderRadius: 8, height: 140, width: Dimension.width / 1.125, marginTop: 12 }}>
                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                            <View style={{ flex: 0.4, alignItems: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.reportData.productivity}</Text>
                                            </View>

                                            <View style={{ flex: 0.2 }} />
                                            <View style={{ flex: 0.4, alignItems: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.reportData.schProductivity}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                            <View style={{ flex: 0.4, alignItems: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Productivity</Text>
                                            </View>

                                            <View style={{ flex: 0.2 }} />
                                            <View style={{ flex: 0.4, alignItems: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>SCH Productivity</Text>
                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: '#E3ECF4', height: 74, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                            <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                                <View style={{ flex: 0.4, alignItems: 'center' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Average</Text>
                                                </View>
                                                <View style={{ flex: 0.2 }} />
                                                <View style={{ flex: 0.4, alignItems: 'center' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Average</Text>
                                                </View>

                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                                <View style={{ flex: 0.4, alignItems: 'center' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.reportData.productivityAvg}</Text>
                                                </View>
                                                <View style={{ flex: 0.2, }} />
                                                <View style={{ flex: 0.4, alignItems: 'center' }}>
                                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.reportData.schProductivityAvg}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </React.Fragment>
                                :
                                <View style={{ height: 100, justifyContent: "center", }} >
                                    <View style={{ flex: 1, marginTop: 20, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.noDataFountTxt}>No Data Found</Text>
                                    </View>
                                </View>
                            }
                        </>
                    }
                </View>
            </>
        )
    }

    misHeadSec = () => {
        return (
            <>
                <View style={{ backgroundColor: '#F0F4F7', padding: 6, borderRadius: 8 }}>
                    <View style={{ marginTop: 5, padding: 3, borderRadius: 16, backgroundColor: "#fff" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={ImageName.RED_LIVE_IMG} style={{ height: 30, width: 75, resizeMode: 'contain' }} />
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '5%' }}>Performance Summary</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
                        <Image source={ImageName.BEAT_ROUTE_BLUE} style={{ height: 24, width: 24, resizeMode: 'contain' }} />
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 3, textAlign: 'center' }}> {"Beat -" + this.state.myPocketList.selectedBeat}</Text>
                    </View>
                    <View style={{ borderBottomColor: Color.COLOR.BLACK.PURE_BLACK, borderBottomWidth: 0.5, marginTop: 5 }} />
                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <View style={{ flex: 0.3, alignItems: 'center' }}>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{this.state.myPocketList.qty} Qty</Text>
                        </View>
                        <View style={{ flex: 0.05 }} />
                        <View style={{ flex: 0.3, alignItems: 'center' }}>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{"Payable" + " " + "₹" + "" + this.state.myPocketList.payable}</Text>
                        </View>
                        <View style={{ flex: 0.05 }} />
                        <View style={{ flex: 0.3, alignItems: 'center' }}>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Net <Text style={{ color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{"₹" + " " + this.state.myPocketList.netValue}</Text></Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <View style={{ flex: 0.25, alignItems: 'center' }}>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{this.state.myPocketList.sc} SC</Text>
                        </View>
                        {/* <View style={{ flex: 0.05 }} /> */}
                        <View style={{ flex: 0.25, alignItems: 'center' }}>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{this.state.myPocketList.tc} TC</Text>
                        </View>
                        {/* <View style={{ flex: 0.05 }} /> */}
                        <View style={{ flex: 0.25, alignItems: 'center' }}>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{this.state.myPocketList.pc} PC</Text>
                        </View>
                        <View style={{ flex: 0.25, alignItems: 'center' }}>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{this.state.myPocketList.lpc} LPC</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 5 }} />
                </View>
                <View style={{ marginTop: 12, marginHorizontal: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgressBase
                        {...bar}
                        value={this.state.myPocketList.targetAchievePercentage}
                        radius={60}
                        activeStrokeColor={Color.COLOR.RED.AMARANTH}
                        inActiveStrokeColor={'#D1D1D1'}
                        clockwise={false}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{"Target"}</Text>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 2 }}>{this.state.myPocketList.targetAchievePercentage}%</Text>
                            <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, top: -4 }}>{"Achieved"}</Text>
                        </View>
                    </CircularProgressBase>
                    {this.props.Sales360Redux.loginData.clientId == 19 ? null :
                        <View style={{ marginTop: 8, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Target <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{"₹" + " " + this.state.myPocketList.target}</Text></Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Achived <Text style={{ color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{"₹" + " " + this.state.myPocketList.achevement}</Text></Text>
                            </View>
                        </View>
                    }
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            <View style={{ backgroundColor: '#F0F4F7', height: 120, width: 115, borderRadius: 8, marginHorizontal: 8 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 2 }}>Retailing</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.BOLD, top: -2 }}>{this.state.myPocketList.retaillingCount}</Text>
                                </View>
                                <View style={{ backgroundColor: '#D3E3EF', height: 60, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={ImageName.CLOCK_LOGO} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                                        <View style={{ width: 3 }} />
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Avg time</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.myPocketList.retaillingAvgTime}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ backgroundColor: '#F0F4F7', height: 120, width: 115, borderRadius: 8, marginHorizontal: 8 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 2 }}>Office Work</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.BOLD, top: -2 }}>{this.state.myPocketList.officeWorkCount}</Text>
                                </View>
                                <View style={{ backgroundColor: '#D3E3EF', height: 60, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={ImageName.CLOCK_LOGO} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                                        <View style={{ width: 3 }} />
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Avg time</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.myPocketList.officeWorkAvgTime}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ backgroundColor: '#FFD6D9', height: 120, width: 115, borderRadius: 8, marginHorizontal: 8 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 2 }}>Leave</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.BOLD, top: -2 }}>{this.state.myPocketList.totalcompletedLeave == null || this.state.myPocketList.totalcompletedLeave == undefined ? "0" : this.state.myPocketList.totalcompletedLeave}</Text>
                                </View>
                                <View style={{ backgroundColor: '#F13748', height: 60, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Remain</Text>
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.myPocketList.remainingLeave}</Text>
                                    </View>
                                </View>
                            </View>
                            {/* <View style={{ backgroundColor: '#F0F4F7', height: 120, width: 110, borderRadius: 8, marginHorizontal: 5 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 2 }}>Leace</Text>
                                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.BOLD, top: -2 }}>{this.state.myPocketList.totalcompletedLeave == null || this.state.myPocketList.totalcompletedLeave == undefined ? "0" : this.state.myPocketList.totalcompletedLeave}</Text>
                                        </View>
                                        <View style={{ backgroundColor: '#D3E3EF', height: 60, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={ImageName.CLOCK_LOGO} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                                                <View style={{ width: 3 }} />
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Avg time</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.myPocketList.officeWorkAvgTime}</Text>
                                            </View>
                                        </View>
                                    </View> */}
                            {/* <View style={{ backgroundColor: '#FFD6D9', height: 120, width: 110, borderRadius: 8, marginHorizontal: 5 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 2 }}>Retailing</Text>
                                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.BOLD, top: -2 }}>{this.state.myPocketList.retaillingCount}</Text>
                                        </View>
                                        <View style={{ backgroundColor: '#F13748', height: 60, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Remain</Text>
                                                <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{this.state.myPocketList.remainingLeave}</Text>
                                            </View>
                                        </View>
                                    </View> */}
                        </ScrollView>
                    </View>
                </View>
            </>
        )
    }

    misHeadSkeliton = () => {
        return (
            <>
                <SkeletonPlaceholder>
                    <View style={{ height: 160, borderRadius: 15 }} />
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                        <View style={{ height: 120, width: 120, borderRadius: 60 }} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                        <View style={{ borderRadius: 10, height: 30, width: 150 }} />
                        <View style={{ borderRadius: 10, height: 30, width: 150 }} />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ borderRadius: 10, height: 120, width: Dimension.width / 3, marginHorizontal: 5 }} />
                        <View style={{ borderRadius: 10, height: 120, width: Dimension.width / 3, marginHorizontal: 5 }} />
                        <View style={{ borderRadius: 10, height: 120, width: Dimension.width / 3, marginHorizontal: 5 }} />
                    </View>
                </SkeletonPlaceholder>

            </>
        )
    }

    misReportSkeliton = () => {
        return (
            <>
                <SkeletonPlaceholder>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                        <View style={{ height: 30, width: 180, borderRadius: 15 }} />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <View style={{ borderRadius: 20, height: 35, width: 70, marginHorizontal: 5 }} />
                        <View style={{ borderRadius: 20, height: 35, width: 70, marginHorizontal: 5 }} />
                        <View style={{ borderRadius: 20, height: 35, width: 120, marginHorizontal: 5 }} />
                    </View>
                    <View style={{ height: 240, borderRadius: 10, marginTop: 15 }} />
                </SkeletonPlaceholder>
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._onHeaderSec()}
                {/* {this.swipeSec()} */}
                {/* {this.state.pageLoader ?
                    <View style={CustomStyle.noDataFoundViewForTabList}>
                        <Loader />
                    </View> : */}
                <ScrollView>
                    <View style={{ marginHorizontal: 10, marginTop: 6 }}>


                        {this.state.misDataLoader ?
                            this.misHeadSkeliton()
                            : this.misHeadSec()}
                        {this.state.misReportLoader ?
                            this.misReportSkeliton()
                            : this.performanceReportSec()}
                    </View>
                    {this.footerSec()}
                    <View style={{ marginBottom: 20 }} />
                </ScrollView>
                {/* } */}
            </SafeAreaView >
        )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(MyPocketMis);