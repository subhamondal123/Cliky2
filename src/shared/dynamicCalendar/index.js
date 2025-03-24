import React, { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions
} from 'react-native';
import styles from './style';
import Mcalendar from './calender';
import LinearGradient from 'react-native-linear-gradient';
import { modDayData, modMonthData, modWeekData, modifyColorData, modifyWeekData } from './function';
import { ImageName } from '../../enums';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BACK_ARROW = require("./icons/left_arrow_icon.png");
const FONT_ARROW = require("./icons/right_arrow_icon.png");
var obj = new Mcalendar();

// for color with color code
const WHITE_SMOKE = '#F8F8F8';
// const WHITE_SMOKE = '#000000';
const PURE_BLACK = '#000000';
const PURE_WHITE = '#FFFFFF';
const CURRENTDATE_COLOR = "#156A94";
const SELECT_LINNER_GRADIENT_COLOR = ['#006087', '#068cc2'];
const UNSELECT_LINNER_GRADIENT_COLOR = ['#EFEFEF', '#EFEFEF'];
const BORDER_WIDTH = 0.4;
const SELECT_BORDER_COLOR = '#005d83';


function CalenderScheduler({
    boldFont,
    lightFont,
    data,
    onClickValue,
    isDisabled,
    isHidden,
    type,
    loadComponent,
    headerData
}) {

    if (isHidden) return null;


    const [calenderData, setCalenderData] = useState({});
    const [calenderView, setCalenderView] = useState("M");
    const [loader, setLoader] = useState(true);
    const [selectDateInfo, setSelectDateInfo] = useState({});
    const [selectDateInfoAllDay, setSelectDateInfoAllDay] = useState({});
    const [currentMonthYear, setCurrentMonthYear] = useState("");


    useEffect(() => {

        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        let currentMonthOfYear = currentMonth == 0 ? "January" : currentMonth == 1 ? "February" : currentMonth == 2 ? "March" : currentMonth == 3 ? "April" : currentMonth == 4 ? "May" : currentMonth == 5 ? "June" : currentMonth == 6 ? "July" : currentMonth == 7 ? "August" : currentMonth == 8 ? "September" : currentMonth == 9 ? "October" : currentMonth == 10 ? "November" : "December"
        setCurrentMonthYear(currentMonthOfYear + " " + currentYear)
        calculateMapView();
        // setDashboardData(data)
    }, []);

    // for change the Day, Week and Month
    let changeView = (viewName) => {
        setLoader(true);
        obj.changeView(viewName);
        setCalenderView(viewName);
        if (viewName === "M") {
            setCalenderData(obj.getMonthView());
        } else if (viewName === "W") {
            setCalenderData(modWeekData(obj.getWeekView()));
        } else if (viewName === "D") {
            setCalenderData(modDayData(obj.getDayView()));
        }
        clearSelectedData();
        sendDataToParent([]);
        setLoader(false);
    };

    // call this function after page load
    let calculateMapView = () => {
        setLoader(true);
        obj.setEventsDetails(data);
        // [{ "date": "2022-02-28", "data": { "bal": "bichi3" } }, { "date": "2022-01-28", "data": { "bal": "bichi" } }, { "date": "2022-01-28", "data": { "bal": "bichi1" } }, { "date": "2022-01-29", "data": { "bal": "bichi2" } }]
        changeView(calenderView);
        clearSelectedData();
        setLoader(false);
        // loadComponent(obj.getMonthView());
        // type == "dashboard" ? "" : loadComponent(obj.getMonthView());

    }

    // for back arrow buttton
    let onPrev = () => {
        setLoader(true);
        if (calenderView === "M") {

            obj.changePrevMonth();
            setCalenderData(obj.getMonthView());
            loadComponent(obj.getMonthView());

        } else if (calenderView === "W") {
            obj.changePrevWeek();
            setCalenderData(modWeekData(obj.getWeekView()));
        } else if (calenderView === "D") {
            obj.changePrevDay();
            setCalenderData(modDayData(obj.getDayView()));
        }
        clearSelectedData();
        setLoader(false);
    }

    // for font arrow buttton
    let onFont = () => {
        setLoader(true);
        if (calenderView === "M") {

            obj.changeNextMonth();
            setCalenderData(obj.getMonthView());
            loadComponent(obj.getMonthView());

        } else if (calenderView === "W") {
            obj.changeNextWeek();
            setCalenderData(modWeekData(obj.getWeekView()));
        } else if (calenderView === "D") {
            obj.changeNextDay();
            setCalenderData(modDayData(obj.getDayView()));
        }
        clearSelectedData();
        setSelectDateInfo({});
        setLoader(false);
    }

    // for clear the selected data 
    let clearSelectedData = (type) => {
        if (type == "all") {
            setSelectDateInfoAllDay({});
        } else if (type == "select") {
            setSelectDateInfo({});
        } else {
            setSelectDateInfoAllDay({});
            setSelectDateInfo({});
        }
    }

    // for get data after click and send to the parent component
    let sendDataToParent = (data) => {
        onClickValue(data);
    }

    // date select after click
    let onDateSelect = (data, celkey, weekKey) => {
        setLoader(true);
        setSelectDateInfo({ ...data, "mainKey": celkey, "subKey": weekKey });
        clearSelectedData('all');
        sendDataToParent(data);
        setLoader(false);
    }

    // for week time select
    let onWeekTimeSelect = async (mainItem, item, k, key, interval) => {
        setLoader(true);
        setSelectDateInfo({ ...mainItem, ...item, "mainKey": k, "subKey": key, "interval": interval });
        clearSelectedData('all');
        sendDataToParent({ ...mainItem, ...item, "interval": interval });
        setLoader(false);
    }

    // for week view day selection
    let allDaySelectSection = async (item, key) => {
        setLoader(true);
        setSelectDateInfoAllDay({ ...item, "mainKey": key });
        clearSelectedData('select');
        sendDataToParent(item);
        setLoader(false);
    }

    // for day section
    let dayAllTimesSelect = async (data) => {
        setLoader(true);
        setSelectDateInfoAllDay({ ...data });
        clearSelectedData('select');
        sendDataToParent(data);
        setLoader(false);
    }

    // for time section from date
    let timeSelectFromDay = async (data, key, interval) => {
        setLoader(true);
        setSelectDateInfo({ ...data, "mainKey": key, "interval": interval });
        clearSelectedData('all');
        sendDataToParent({ ...data, "interval": interval });
        setLoader(false);
    }

    return (
        <View>
            {loader ?
                <ActivityIndicator size="large" color='#afb2b1' />
                // <SkeletonPlaceholder>
                //     <View style={styles.skeletonCalenderView} />
                // </SkeletonPlaceholder>
                :
                <React.Fragment>
                    {/* <View style={{ width: windowWidth, flexDirection: 'row' }}>
                        <View style={{ width: '5%' }} />
                        <TouchableOpacity style={{ width: '5%', alignItems: 'center' }} onPress={() => changeView("D")}>
                            <Text style={[{ paddingTop: 10, paddingBottom: 10, color: PURE_BLACK, fontSize: 14, fontFamily: boldFont }, calenderView == "D" ? { color: '#005d83', fontWeight: '700', textDecorationLine: 'underline' } : {}]}>D</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '5%', alignItems: 'center' }} onPress={() => changeView("W")}>
                            <Text style={[{ paddingTop: 10, paddingBottom: 10, color: PURE_BLACK, fontSize: 14, fontFamily: boldFont }, calenderView == "W" ? { color: '#005d83', fontWeight: '700', textDecorationLine: 'underline' } : {}]}>W</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '5%', alignItems: 'center' }} onPress={() => changeView("M")}>
                            <Text style={[{ paddingTop: 10, paddingBottom: 10, color: PURE_BLACK, fontSize: 14, fontFamily: boldFont }, calenderView == "M" ? { color: '#005d83', fontWeight: '700', textDecorationLine: 'underline' } : {}]}>M</Text>
                        </TouchableOpacity>
                        <View style={{ width: '80%' }} />
                    </View> */}
                    <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', flexWrap: "wrap", alignItems: "center" }}>
                        <View style={{ flex: 1, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: "center" }}>
                            <TouchableOpacity
                                style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => onPrev()}
                                activeOpacity={0.7}

                            >
                                <Image source={BACK_ARROW} style={{ height: 13, width: 13, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                            <View style={{ width: '70%', alignItems: 'center' }}>
                                {calenderView === "M" ?

                                    <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 14, color: PURE_BLACK, fontFamily: boldFont }}>{calenderData.currentMonth}<Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 14, fontFamily: boldFont }}>{" " + calenderData.CurrentYear}</Text></Text>
                                    :
                                    <React.Fragment>
                                        {calenderView === "W" ?
                                            <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 17, color: PURE_BLACK, fontFamily: lightFont }}>{calenderData.headerStr}</Text>
                                            :
                                            <React.Fragment>
                                                <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 17, color: PURE_BLACK, fontFamily: lightFont }}>{calenderData.headerStr},<Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 17, fontFamily: boldFont }}>{" " + calenderData.CurrentYear}</Text></Text>
                                            </React.Fragment>
                                        }
                                    </React.Fragment>
                                }
                            </View>
                            <TouchableOpacity
                                style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => onFont()}
                                activeOpacity={0.7}
                                disabled={(currentMonthYear == (calenderData.currentMonth + " " + calenderData.CurrentYear)) ? true : false}
                            >
                                <Image source={FONT_ARROW} style={{ height: 13, width: 13, resizeMode: 'contain' }} />
                            </TouchableOpacity>



                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.pendingAmtSec}>
                                <Image source={ImageName.TILTED_ARROW_ICON} style={styles.dashboardIcon} />
                                <View style={{ width: 7 }} />
                                <Text style={styles.dashboardTxt}>{'\u20B9' + " " + headerData.rejectedExpenseAmount}</Text>
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={styles.approvedAmtSec}>
                                <Image source={ImageName.WHITE_TICK_ICON} style={styles.dashboardIcon} />
                                <View style={{ width: 7 }} />
                                <Text style={styles.dashboardTxt}>{'\u20B9' + " " + headerData.approvedExpenseAmount}</Text>
                            </View>
                        </View>

                    </View>
                    {calenderView === "M" ?
                        <View style={{ width: '100%' }}>

                            {/* <View style={{ flexDirection: 'row', marginTop: 2 }}>
                                {calenderData.weekdays.map((item, key) => (
                                    <View style={[styles.touchView, { backgroundColor: PURE_WHITE, width: '14.22%', borderColor: WHITE_SMOKE, borderWidth: BORDER_WIDTH }]} key={key}>
                                        <Text style={{ color: PURE_BLACK, fontFamily: boldFont }}>{item}</Text>
                                    </View>
                                ))}
                            </View> */}

                            <View style={{ marginTop: 10 }} />

                            {type == "dashboard" ?
                                <React.Fragment>
                                    {calenderData.view.map((calItem, calKey) => (
                                        <View style={{ flexDirection: 'row', marginTop: 2 }} key={calKey}>
                                            {calItem.map((weekItem, weekKey) => (
                                                <React.Fragment key={weekKey}>
                                                    {weekItem.day ?
                                                        <React.Fragment>
                                                            <TouchableOpacity
                                                                activeOpacity={0.7}
                                                                style={{ width: '14.22%' }}
                                                                onPress={() => onDateSelect(weekItem, calKey, weekKey)}
                                                            >
                                                                <TouchableOpacity style={[styles.touchView, { backgroundColor: weekItem.isToday == true ? "#156A94" : Object.keys(weekItem.data).length > 0 ? modifyColorData(weekItem.data).color : "#EFEFEF" }]}>

                                                                    <Text style={[styles.dateText, { fontFamily: boldFont }, { color: weekItem.isToday == true ? "#ffffff" : modifyColorData(weekItem.data).txtColor  },{ fontWeight: Object.keys(weekItem.data).length > 0 ?  "600": "100" }]}>{weekItem.day}</Text>
                                                                    {/* {modifyColorData(weekItem.data).partiallyRejected ?
                                                                        <View style={styles.circle} />
                                                                      :
                                                                        null
                                                                    }  */}


                                                                </TouchableOpacity>
                                                                {/* <LinearGradient
                                                                    start={{ x: 0.0, y: 0.25 }} end={{ x: BORDER_WIDTH, y: 1.0 }}
                                                                    locations={[0.3, 1]}
                                                                    colors={Object.keys(selectDateInfo).length > 0 && selectDateInfo.mainKey == calKey && selectDateInfo.subKey == weekKey ? SELECT_LINNER_GRADIENT_COLOR : weekItem.isToday == true ? ["red", "green"] : UNSELECT_LINNER_GRADIENT_COLOR}
                                                                    style={styles.touchView}>
                                                                    {console.log("week item::::", weekItem)}
                                                                    <Text style={[styles.dateText, { fontFamily: boldFont }, Object.keys(selectDateInfo).length > 0 && selectDateInfo.mainKey == calKey && selectDateInfo.subKey == weekKey ? { color: PURE_WHITE } : { color: PURE_BLACK }]}>{weekItem.day}</Text>
                                                                    {Object.keys(selectDateInfo).length > 0 && selectDateInfo.mainKey == calKey && selectDateInfo.subKey == weekKey ?
                                                                        <Text style={[styles.dateNameText, { fontFamily: lightFont }]}>{calenderData.fWeekView[weekItem.weekIndex]}</Text> :
                                                                        <React.Fragment>
                                                                            {Array.isArray(weekItem.data) ?
                                                                                <React.Fragment>
                                                                                    <View style={{ flexDirection: 'row' }}>
                                                                                        {weekItem.data.map((statItem, statKey) => (
                                                                                            <React.Fragment key={statKey}>
                                                                                                {statKey < 5 ?
                                                                                                    <View style={[{ height: 5, width: 5, backgroundColor: statItem.color, alignSelf: 'center', borderRadius: 10 }, weekItem.data.length > 0 && statKey > 0 ? { marginLeft: '5%' } : {}]} /> :
                                                                                                    null
                                                                                                }
                                                                                            </React.Fragment>
                                                                                        ))}
                                                                                    </View>
                                                                                </React.Fragment> :
                                                                                null
                                                                            }
                                                                        </React.Fragment>
                                                                    }

                                                                </LinearGradient> */}
                                                                {/* <View style={[styles.touchView, { backgroundColor: weekItem.isToday == true ? "#156A94" : "#EFEFEF" }]}>
                                                                    <Text style={[styles.dateText, { fontFamily: boldFont }, { color: weekItem.isToday == true ? "#ffffff" : "#000000" }]}>{weekItem.day}</Text>

                                                                </View> */}
                                                            </TouchableOpacity>
                                                        </React.Fragment> :
                                                        <View style={[styles.touchView, { backgroundColor: PURE_WHITE, width: '14.22%', borderWidth: 0 }]} />
                                                    }
                                                </React.Fragment>
                                            ))}
                                        </View>
                                    ))}
                                </React.Fragment>
                                : null}
                            {/* for month view */}

                        </View> :
                        <React.Fragment>
                            {calenderView === "W" ?
                                <React.Fragment>

                                    <View style={{ flexDirection: 'row', marginTop: 2 }}>
                                        <View style={[styles.touchView, { backgroundColor: PURE_WHITE, flex: 1 }]} >
                                            <Text style={{ color: PURE_BLACK }}> </Text>
                                        </View>
                                        {calenderData.weekView.map((item, key) => (
                                            <View style={[styles.touchView, { backgroundColor: PURE_WHITE, flex: 1, borderColor: WHITE_SMOKE, borderWidth: BORDER_WIDTH }]} key={key}>
                                                <Text style={{ color: PURE_BLACK, textAlign: 'center', fontFamily: lightFont }}>{calenderData.weekdays[item.weekIndex]} {"\n"} {item.month}/{item.day} </Text>
                                            </View>
                                        ))}
                                    </View>
                                    {/* for week view */}
                                    <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                                        <View style={{ width: '12.5%', justifyContent: 'center', alignItems: 'center', borderColor: WHITE_SMOKE, borderWidth: BORDER_WIDTH, height: 30 }}>
                                            <Text style={{ color: PURE_BLACK, fontSize: 13, fontFamily: lightFont }}>All-Day</Text>
                                        </View>
                                        <View style={{ width: '87.5%', flexDirection: 'row' }}>
                                            {calenderData.view[0] && calenderData.view[0].map((item, key) => (
                                                <React.Fragment key={key}>
                                                    <TouchableOpacity style={[{ flexDirection: 'column', width: '14.22%', borderWidth: BORDER_WIDTH, borderColor: WHITE_SMOKE }, Object.keys(selectDateInfoAllDay).length > 0 && selectDateInfoAllDay.mainKey == key ? { borderColor: SELECT_BORDER_COLOR } : { borderColor: WHITE_SMOKE }]} onPress={() => allDaySelectSection(item, key)} activeOpacity={0.7}>
                                                        {item.data.length > 0 ?
                                                            <React.Fragment>
                                                                <View style={{ backgroundColor: item.data[0].color, height: 10, width: '100%', borderRadius: 10, paddingLeft: 5, paddingRight: 5, justifyContent: 'center', marginTop: 1 }}>
                                                                    <Text style={{ color: PURE_WHITE, fontSize: 9 }} numberOfLines={1}></Text>
                                                                </View>
                                                                {item.data.length > 1 ?
                                                                    <Text style={{ color: PURE_BLACK, fontSize: 8 }} numberOfLines={1}>more...</Text> :
                                                                    null
                                                                }
                                                            </React.Fragment> :
                                                            null
                                                        }
                                                    </TouchableOpacity>
                                                </React.Fragment>
                                            ))}
                                        </View>
                                    </View>
                                    <ScrollView
                                        style={{ maxHeight: 300 }}
                                        nestedScrollEnabled={true}
                                    >
                                        {calenderData.timeObj.map((i, k) => (
                                            <React.Fragment key={k}>
                                                <View style={{ flexDirection: 'row', flex: 1 }} >
                                                    <View style={{ width: '12.5%' }}>
                                                        <View style={{ flex: 0.2 }}>
                                                            <View style={{ width: '100%', borderColor: WHITE_SMOKE, borderWidth: BORDER_WIDTH, justifyContent: 'center', alignItems: 'center', height: 30 }}>
                                                                <Text style={{ color: PURE_BLACK, textAlign: 'center', fontFamily: lightFont }}>{i.ts + " " + i.ap}</Text>
                                                            </View>
                                                            <View style={{ width: '100%', borderColor: WHITE_SMOKE, borderWidth: BORDER_WIDTH, justifyContent: 'center', alignItems: 'center', height: 30 }}>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '87.5%', flexDirection: 'row' }}>
                                                        {calenderData.view[k + 1] && calenderData.view[k + 1].map((item, key) => (
                                                            <React.Fragment key={key}>
                                                                {/* {key > 0 ? */}
                                                                <React.Fragment>
                                                                    <View style={{ flexDirection: 'column', width: '14.22%' }}>
                                                                        <TouchableOpacity style={[{ width: '100%', borderWidth: BORDER_WIDTH, minHeight: 30 }, Object.keys(selectDateInfo).length > 0 && selectDateInfo.mainKey == k && selectDateInfo.subKey == key && selectDateInfo.interval == '1st' ? { borderColor: SELECT_BORDER_COLOR, } : { borderColor: WHITE_SMOKE }]} onPress={() => onWeekTimeSelect(i, item, k, key, "1st")} activeOpacity={0.7}>
                                                                            {item.data ?
                                                                                <React.Fragment>
                                                                                    {item.prevCount > 0 ?
                                                                                        <React.Fragment>
                                                                                            <View style={{ backgroundColor: item.prevColor, height: 10, width: '100%', borderRadius: 10, paddingLeft: 5, paddingRight: 5, justifyContent: 'center', marginTop: 1 }}>
                                                                                                <Text style={{ color: PURE_WHITE, fontSize: 9 }} numberOfLines={1}></Text>
                                                                                            </View>
                                                                                            {item.prevCount > 1 ?
                                                                                                <Text style={{ color: PURE_BLACK, fontSize: 8 }} numberOfLines={1}>more...</Text> :
                                                                                                null
                                                                                            }
                                                                                        </React.Fragment> :
                                                                                        null
                                                                                    }

                                                                                    {/* {item.data.map((selectItem, selectKey) => (
                                                                                        <React.Fragment key={selectKey}>
                                                                                            {selectItem.positionCheck == 0 ?
                                                                                                <React.Fragment>
                                                                                                    <View style={{ backgroundColor: selectItem.color, height: 10, width: '100%', borderRadius: 10, paddingLeft: 5, paddingRight: 5, justifyContent: 'center', marginTop: 1 }}>
                                                                                                        <Text style={{ color: PURE_WHITE, fontSize: 9 }} numberOfLines={1}></Text>
                                                                                                    </View>
                                                                                                </React.Fragment> :
                                                                                                null
                                                                                            }
                                                                                        </React.Fragment>
                                                                                    ))} */}

                                                                                </React.Fragment>
                                                                                :
                                                                                null
                                                                            }
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity style={[{ width: '100%', borderWidth: BORDER_WIDTH, minHeight: 30 }, Object.keys(selectDateInfo).length > 0 && selectDateInfo.mainKey == k && selectDateInfo.subKey == key && selectDateInfo.interval == '2nd' ? { borderColor: SELECT_BORDER_COLOR, } : { borderColor: WHITE_SMOKE }]} onPress={() => onWeekTimeSelect(i, item, k, key, "2nd")} activeOpacity={0.7}>
                                                                            {item.data ?
                                                                                <React.Fragment>
                                                                                    {item.frontCount > 0 ?
                                                                                        <React.Fragment>
                                                                                            <View style={{ backgroundColor: item.frontCount, height: 10, width: '100%', borderRadius: 10, paddingLeft: 5, paddingRight: 5, justifyContent: 'center', marginTop: 1 }}>
                                                                                                <Text style={{ color: PURE_WHITE, fontSize: 9 }} numberOfLines={1}></Text>
                                                                                            </View>
                                                                                            {item.frontCount > 1 ?
                                                                                                <Text style={{ color: PURE_BLACK, fontSize: 8 }} numberOfLines={1}>more...</Text> :
                                                                                                null
                                                                                            }
                                                                                        </React.Fragment> :
                                                                                        null
                                                                                    }

                                                                                    {/* {item.data.map((selectItem, selectKey) => (
                                                                                        <React.Fragment key={selectKey}>
                                                                                            {selectItem.positionCheck == 1 ?
                                                                                                <React.Fragment>
                                                                                                    <View style={{ backgroundColor: selectItem.color, height: 10, width: '100%', borderRadius: 10, paddingLeft: 5, paddingRight: 5, justifyContent: 'center', marginTop: 1 }}>
                                                                                                        <Text style={{ color: PURE_WHITE, fontSize: 9 }} numberOfLines={1}></Text>
                                                                                                    </View>
                                                                                                </React.Fragment> :
                                                                                                null
                                                                                            }
                                                                                        </React.Fragment>
                                                                                    ))} */}

                                                                                </React.Fragment>
                                                                                :
                                                                                null
                                                                            }
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </React.Fragment>
                                                                {/* :
                                                                    null
                                                                } */}
                                                            </React.Fragment>
                                                        ))}
                                                    </View>
                                                </View>
                                            </React.Fragment>
                                        ))}
                                    </ScrollView>
                                </React.Fragment> :

                                // for day view
                                <React.Fragment>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '12.5%', justifyContent: 'center', alignItems: 'center', borderColor: WHITE_SMOKE, borderWidth: BORDER_WIDTH, height: 40 }}>
                                            <Text style={{ color: PURE_BLACK, fontSize: 13, fontFamily: lightFont }}>All-Times</Text>
                                        </View>
                                        <View style={{ width: '87.5%' }}>
                                            {calenderData.view[0].data && calenderData.view[0].data.length > 0 ?
                                                <TouchableOpacity style={[{ width: '100%', borderWidth: BORDER_WIDTH, height: 40 }, Object.keys(selectDateInfoAllDay).length > 0 ? { borderColor: SELECT_BORDER_COLOR } : { borderColor: WHITE_SMOKE }]} onPress={() => dayAllTimesSelect(calenderData.view[0])} activeOpacity={0.7}>
                                                    <View style={{ backgroundColor: calenderData.view[0].data[0].color, height: 10, width: '100%', borderRadius: 10, paddingLeft: 5, paddingRight: 5, justifyContent: 'center', marginTop: 1 }}>
                                                        <Text style={{ color: PURE_WHITE, fontSize: 9 }} numberOfLines={1}></Text>
                                                    </View>
                                                    {calenderData.view[0].data.length > 1 ?
                                                        <Text style={{ color: PURE_BLACK, fontSize: 8 }} numberOfLines={1}>more...</Text> :
                                                        null
                                                    }
                                                </TouchableOpacity> :
                                                null
                                            }
                                        </View>
                                    </View>
                                    <ScrollView
                                        style={{ maxHeight: 300, marginTop: 2 }}
                                        nestedScrollEnabled={true}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '12.5%' }}>
                                                {calenderData.timeObj.map((i, k) => (
                                                    <React.Fragment key={k}>
                                                        <View style={{ borderColor: WHITE_SMOKE, borderWidth: BORDER_WIDTH, height: 25, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ color: PURE_BLACK, fontFamily: lightFont }}>{i.ts} {i.ap}</Text>
                                                        </View>
                                                        <View style={{ borderColor: WHITE_SMOKE, borderWidth: BORDER_WIDTH, height: 25, justifyContent: 'center', alignItems: 'center' }}>
                                                        </View>
                                                    </React.Fragment>
                                                ))}
                                            </View>
                                            <View style={{ width: '87.5%' }}>
                                                {calenderData.view && calenderData.view.map((timeItem, timeKey) => (
                                                    <React.Fragment key={timeKey}>
                                                        {timeKey > 0 ?
                                                            <React.Fragment>
                                                                {timeItem.data ?
                                                                    <React.Fragment>
                                                                        <TouchableOpacity style={[{ width: '100%', borderWidth: BORDER_WIDTH, height: 25, justifyContent: 'center' }, Object.keys(selectDateInfo).length > 0 && selectDateInfo.mainKey == timeKey && selectDateInfo.interval == '1st' ? { borderColor: SELECT_BORDER_COLOR, } : { borderColor: WHITE_SMOKE }]} onPress={() => timeSelectFromDay(timeItem, timeKey, "1st")} activeOpacity={0.7}>
                                                                            {timeItem.prevCount > 0 ?
                                                                                <React.Fragment>
                                                                                    <View style={{ backgroundColor: timeItem.prevColor, height: 10, width: '100%', borderRadius: 10, paddingLeft: 5, paddingRight: 5, justifyContent: 'center', marginTop: 1 }}>
                                                                                        <Text style={{ color: PURE_WHITE, fontSize: 9 }} numberOfLines={1}></Text>
                                                                                    </View>
                                                                                    {timeItem.prevCount > 1 ?
                                                                                        <Text style={{ color: PURE_BLACK, fontSize: 8 }} numberOfLines={1}>more...</Text> :
                                                                                        null
                                                                                    }
                                                                                </React.Fragment> :
                                                                                null
                                                                            }
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity style={[{ width: '100%', borderWidth: BORDER_WIDTH, height: 25, justifyContent: 'center' }, Object.keys(selectDateInfo).length > 0 && selectDateInfo.mainKey == timeKey && selectDateInfo.interval == '2nd' ? { borderColor: SELECT_BORDER_COLOR, } : { borderColor: WHITE_SMOKE }]} onPress={() => timeSelectFromDay(timeItem, timeKey, "2nd")} activeOpacity={0.7}>
                                                                            {timeItem.frontCount > 0 ?
                                                                                <React.Fragment>
                                                                                    <View style={{ backgroundColor: timeItem.frontColor, height: 10, width: '100%', borderRadius: 10, paddingLeft: 5, paddingRight: 5, justifyContent: 'center', marginTop: 1 }}>
                                                                                        <Text style={{ color: PURE_WHITE, fontSize: 9 }} numberOfLines={1}></Text>
                                                                                    </View>
                                                                                    {timeItem.frontCount > 1 ?
                                                                                        <Text style={{ color: PURE_BLACK, fontSize: 8 }} numberOfLines={1}>more...</Text> :
                                                                                        null
                                                                                    }
                                                                                </React.Fragment> :
                                                                                null
                                                                            }
                                                                        </TouchableOpacity>
                                                                    </React.Fragment> :
                                                                    null
                                                                }
                                                            </React.Fragment> :
                                                            null
                                                        }
                                                    </React.Fragment>
                                                ))}
                                            </View>
                                        </View>
                                    </ScrollView>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    }
                </React.Fragment>
            }
        </View>
    );
};



CalenderScheduler.defaultProps = {
    data: [],
    boldFont: null,
    lightFont: null,
    onClickValue: () => { },
    isDisabled: false,
    isHidden: false,
    type: "",
    loadComponent: () => { },
    headerData: {}
};

CalenderScheduler.propTypes = {
    data: PropTypes.array,
    boldFont: PropTypes.string,
    lightFont: PropTypes.string,
    onClickValue: PropTypes.func,
    isDisabled: PropTypes.bool,
    isHidden: PropTypes.bool,
    type: PropTypes.string,
    loadComponent: PropTypes.func,
    headerData: PropTypes.instanceOf(Object)
};



export default CalenderScheduler;