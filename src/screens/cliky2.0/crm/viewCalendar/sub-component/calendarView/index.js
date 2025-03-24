import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { Component } from 'react';
// import { LocaleConfig } from 'react-native-calendars';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../../enums';
import styles from './style';
import { modifyCalendarData, modifyItemData } from '../../Function';
import { MiddlewareCheck } from '../../../../../../services/middleware';
import { Toaster } from '../../../../../../services/common-view-function';
import { CommonData, ErrorCode } from '../../../../../../services/constant';
import { Loader } from '../../../../../../shared';
import { modifyCalendarItemData } from './function';

let d = [{
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
}]


class CalendarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            listData: [],
            calendarData: {},
            showHideCheck: false,
            selectedDate: ""
        };
    }


    componentDidMount() {
        this._load();
    }

    _load = async () => {
        let responseData = await MiddlewareCheck("calenderList", { "searchFrom": "", "searchTo": "" }, this.props)
        if (responseData === false) {
            this.props.onNetworkError();
        } else {
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                this.setState({
                    calendarData: modifyCalendarData(responseData.data)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false
        })
    }

    // for selection data
    _onSelectDate = async (day) => {
        this.setState({
            selectedDate: day.dateString
        })
        await this._onDateData(day);
        if (this.state.listData.length == 0) {
            this._onAdd();
        }
    }

    _onDateData = async (day) => {
        let modArr = [];
        if (this.state.calendarData[day.dateString] !== undefined) {
            modArr = modifyCalendarItemData((this.state.calendarData[day.dateString]).data, 0);
        }
        this.setState({
            listData: modArr
        })
    }
  
    // for calendre section
    _onCalender = () => {
        return (
            <Calendar
                onDayPress={day => {
                    this._onSelectDate(day);
                }}
                // onDayLongPress={day => {
                // }}
                onMonthChange={month => {
                    console.log('month changed', month);
                }}
                markingType={'multi-dot'}
                markedDates={this.state.calendarData}
                hideExtraDays={true}
                // current={new Date("2022-08-16")}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: Color.COLOR.RED.AMARANTH,
                    selectedDayTextColor: Color.COLOR.WHITE.PURE_WHITE,
                    todayTextColor: '#00adf5',
                    dayTextColor: '#616161',
                    textDisabledColor: '#d9e1e8',
                    selectedDotColor: '#ffffff',
                    arrowColor: Color.COLOR.RED.AMARANTH,
                    monthTextColor: Color.COLOR.RED.AMARANTH,
                    textDayFontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                    textMonthFontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                    textDayHeaderFontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                    textDayFontSize: 16,
                    textMonthFontSize: 14,
                    textDayHeaderFontSize: 14
                }}
            />
        )
    }
    // for view the calender
    _onCalenderView = () => {
        return (
            <View style={styles.calendarMainView}>
                {this._onCalender()}
            </View>
        )
    }

    // for view the list data
    _onViewList = () => {
        return (
            <View style={{ height: this.state.showHideCheck ? Dimension.height - Dimension.height / 6 : Dimension.height > 640 ? Dimension.height / 2.5 : Dimension.height / 3 }}>
                <ScrollView nestedScrollEnabled={true}>
                    {this.state.listData.map((item, key) => (
                        <React.Fragment key={key}>
                            {this._onListItem(item, key)}
                        </React.Fragment>
                    ))}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        )
    }

    // for click the view section
    _onClickView = (key) => {
        this.setState({
            listData: modifyCalendarItemData(this.state.listData, key)
        })
    }


    // for list item
    _onListItem = (item, key) => {
        let bgColor = "#eac8ff";
        if ((CommonData.ACTIVITY_DATA[item.eventName])) {
            bgColor = (CommonData.ACTIVITY_DATA[item.eventName]).color;
        }
        return (
            <TouchableOpacity style={[styles.listMainView, { marginHorizontal: 5 }]} onPress={() => this._onClickView(key)} activeOpacity={0.9}>
                <View style={[styles.listFirstView, { backgroundColor: bgColor }]}>
                    <Text style={styles.timeText}>{item.date}</Text>
                </View>
                <View style={styles.listTextSection}>
                    <View style={styles.bodyTextView}>
                        <Text style={[styles.bodyText, item.check ? { paddingBottom: 5 } : {}]} numberOfLines={1}>{item.eventName + " with " + item.name}</Text>
                        {item.check ?
                            <Text style={styles.bodyItemText}>{item.description}</Text> :
                            null
                        }
                    </View>
                    {/* <View style={styles.actionMainView}>
                        <TouchableOpacity style={styles.actionView}>
                            <Image source={ImageName.PENCIL} style={styles.editImg} />
                        </TouchableOpacity>
                    </View> */}
                </View>
            </TouchableOpacity>
        )
    }

    _onAdd = () => {
        this.props.onOpenAddModal(this.state.selectedDate);
    }

    // for accordian view
    _accordianview = () => {
        const HideShowCheck = () => {
            this.setState({
                showHideCheck: !this.state.showHideCheck
            })
        }

        return (
            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                <TouchableOpacity style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this._onAdd()} activeOpacity={0.9}>
                    <Image source={ImageName.ADD_YELLOW} style={[styles.editImg, { height: 25, width: 25, }]} />
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => HideShowCheck()} activeOpacity={0.9}>
                    <Image source={this.state.showHideCheck ? ImageName.DROPDOWN_DOWN_ARROW : ImageName.DROPDOWN_UP_ARROW} style={styles.editImg} />
                </TouchableOpacity>
            </View>
        )
    }



    render() {
        if (this.state.pageLoader == true) {
            return (
                <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                    <Loader />
                </View>);
        } else {
            return (
                // <ScrollView
                //     showsHorizontalScrollIndicator={false}
                //     showsVerticalScrollIndicator={false}
                // >
                <View>
                    {this.state.showHideCheck ?
                        null :
                        <>
                            {this._onCalenderView()}
                        </>
                    }
                    {this.state.listData.length > 0 ?
                        <>
                            {this._accordianview()}
                        </> :
                        null
                    }
                    {this._onViewList()}
                </View>
                // </ScrollView>
            )
        }
    }
}

export default CalendarView;