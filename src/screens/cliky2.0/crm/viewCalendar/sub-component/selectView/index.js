import React, { Component } from "react";
import styles from './style';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import DatePicker from "react-native-date-picker";
import { DateConvert, Toaster } from "../../../../../../services/common-view-function";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { ErrorCode } from "../../../../../../services/constant";
import { dateChangeForBeforeAfter } from "../../../../../../services/common-view-function/dateConvert";
import { Loader } from "../../../../../../shared";
import { modifyCalenderItemData, showHideDescription } from "./function";
const dateData = [
    {
        "date": "2022-07-25T12:18:49.377Z",
        "value": [
            {
                id: "1",
                time: "10 AM",
                visitHead: "Visit to das"
            }, {
                id: "2",
                time: "12 AM",
                visitHead: "Visit to bas"
            }, {
                id: "3",
                time: "09 PM",
                visitHead: "Visit to ds"
            }, {
                id: "4",
                time: "05 AM",
                visitHead: "Visit to pas"
            }
        ]

    },
    {
        "date": "2022-07-25T12:18:49.377Z",
        "value": [
            {
                id: "1",
                time: "10 AM",
                visitHead: "Visit to das"
            }, {
                id: "2",
                time: "12 AM",
                visitHead: "Visit to bas"
            }, {
                id: "3",
                time: "09 PM",
                visitHead: "Visit to ds"
            }, {
                id: "4",
                time: "05 AM",
                visitHead: "Visit to pas"
            }
        ]

    }
]

class SelectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: DateConvert.resDataDateFormat(new Date()),
            startDateCheck: false,
            statDateRaw: new Date(),
            endDate: DateConvert.resDataDateFormat(dateChangeForBeforeAfter(new Date(), "after", 6)),
            endDateCheck: false,
            endDateRaw: new Date(dateChangeForBeforeAfter(new Date(), "after", 6)),
            calenderType: "",
            calendarData: [],
            pageLoader: true
        }
    }

    componentDidMount() {
        this._load();
    }


    _load = async () => {
        this.setState({
            pageLoader: true
        })
        let responseData = await MiddlewareCheck("calenderList", { "searchFrom": this.state.startDate, "searchTo": this.state.endDate },this.props)
        if (responseData === false) {
            this.props.onNetworkError();
        } else {
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                this.setState({
                    // calendarData: modifyItemData(responseData.data)
                    calendarData: modifyCalenderItemData(responseData.data, this.state.statDateRaw, this.state.endDateRaw)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false
        })
    }


    // for visible date picker
    _onVisibleDate = (type) => {
        let startDateCheck = this.state.startDateCheck;
        let endDateCheck = this.state.endDateCheck;
        if (type == "start") {
            startDateCheck = !startDateCheck;
        }
        if (type == "end") {
            endDateCheck = !endDateCheck;
        }
        this.setState({
            startDateCheck: startDateCheck,
            endDateCheck: endDateCheck,
            calenderType: type
        })
    }

    // for select start and end date select
    _onStartEndDateSelect = (selectedDate, type) => {
        this._onVisibleDate(type);
        if (selectedDate) {
            if (type == "start") {
                this.state.startDate = DateConvert.resDataDateFormat(selectedDate);
                this.state.statDateRaw = selectedDate;
                let afterDate = dateChangeForBeforeAfter(selectedDate, "after", 6);
                this.state.endDateRaw = afterDate;
                this.state.endDate = DateConvert.resDataDateFormat(afterDate);
            }
            if (type == "end") {
                this.state.endDate = DateConvert.resDataDateFormat(selectedDate);
                this.state.endDateRaw = selectedDate;
                let beforeDate = dateChangeForBeforeAfter(selectedDate, "before", 6);
                this.state.statDateRaw = beforeDate;
                this.state.startDate = DateConvert.resDataDateFormat(beforeDate);
            }
        }
        this.setState({
            startDate: this.state.startDate,
            statDateRaw: this.state.statDateRaw,
            endDate: this.state.endDate,
            endDateRaw: this.state.endDateRaw
        })
        this._load();
    }

    // for view the start date section
    _onStartDate = () => {
        return (
            <View style={{ flex: 1, marginRight: '2%' }}>
                <TouchableOpacity style={styles.canlenderSec}
                    activeOpacity={0.9}
                    onPress={() => this._onVisibleDate("start")}
                >
                    <Text style={styles.selectDateText}>
                        {this.state.startDate}
                    </Text>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={this.state.startDateCheck}
                    date={this.state.statDateRaw}
                    mode="date"
                    onConfirm={(date) => this._onStartEndDateSelect(date, this.state.calenderType)}
                    onCancel={() => this._onVisibleDate(this.state.calenderType)}
                />
            </View>
        )
    }

    // for view end date secytion
    _onEndDate = () => {
        return (
            <View style={{ flex: 1, marginLeft: '2%' }}>
                <TouchableOpacity style={styles.canlenderSec}
                    activeOpacity={0.9}
                    onPress={() => this._onVisibleDate("end")}
                >
                    <Text style={styles.selectDateText}>
                        {this.state.endDate}
                    </Text>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={this.state.endDateCheck}
                    date={this.state.endDateRaw}
                    mode="date"
                    onConfirm={(date) => this._onStartEndDateSelect(date, this.state.calenderType)}
                    onCancel={() => this._onVisibleDate(this.state.calenderType)}
                />
            </View>
        )
    }

    // for view the list data
    _onViewListData = () => {
        const OnItemCheck = (dateItem, dateKey, item, key) => {
            if (item.data.length > 0) {
                this.state.calendarData = showHideDescription(dateItem, dateKey, item, key, this.state.calendarData);
                this.setState({
                    calendarData: this.state.calendarData
                })
            }
        }

        const _onAdd = (date) => {
            this.props.onOpenAddModal(date);
        }

        return (
            <View>
                <ScrollView
                    style={{ maxHeight: Dimension.height - Dimension.height / 4 }}
                    nestedScrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {this.state.calendarData.map((item, key) => (
                        <React.Fragment key={key}>
                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.dateText, { color: Color.COLOR.BLACK.PURE_BLACK, flex: 1 }]}>{item.date}</Text>
                                    <TouchableOpacity style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => _onAdd(item.date)} activeOpacity={0.9}>
                                        <Image source={ImageName.ADD_YELLOW} style={[styles.editImg, { height: 25, width: 25, }]} />
                                    </TouchableOpacity>
                                </View>
                                {item.data.map((dateItem, dateKey) => (
                                    <View style={styles.mainBox} key={dateKey}>
                                        <TouchableOpacity style={[styles.dateView, { backgroundColor: dateItem.color }]} onPress={() => OnItemCheck(dateItem, dateKey, item, key)} activeOpacity={0.9} key={dateKey}>
                                            <Text style={styles.dateText} numberOfLines={1}>{dateItem.data.eventName + " with " + dateItem.data.name}</Text>
                                        </TouchableOpacity>
                                        {dateItem.check ?
                                            <>
                                                {this._listItemView(dateItem.data)}
                                            </>
                                            :
                                            null
                                        }
                                    </View>
                                ))}
                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: Color.COLOR.GRAY.PHILIPPINE_GRAY }} />
                            </View>
                        </React.Fragment>
                    ))}
                    <View style={{ marginBottom: '25%' }} />
                </ScrollView>
            </View>
        )
    }

    // for view list data
    _listItemView = (data) => {
        return (
            <>
                <View style={{ flex: 1, backgroundColor: Color.COLOR.WHITE.PURE_WHITE }}>
                    <Text style={styles.bodyItemText}>{data.description}</Text>
                </View>
            </>
        )
    }



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mainView}>
                    <View style={styles.subView}>
                        {this._onStartDate()}
                        <View>
                            <Text style={styles.selectDateText}> To </Text>
                        </View>
                        {this._onEndDate()}
                    </View>
                </View>
                {this.state.pageLoader ?
                    <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                        <Loader />
                    </View> :
                    <View style={{ marginTop: '3%' }}>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            {this._onViewListData()}
                        </ScrollView>
                    </View>
                }
            </View >
        )
    };
}

export default SelectView;