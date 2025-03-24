import React, { useEffect, useState } from 'react';
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
import { modDayData, modWeekData } from './function';
import { Color, Dimension, FontFamily } from '../../enums';
import SvgComponent from '../../assets/svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BACK_ARROW = require("./icons/blue_left.png");
const FONT_ARROW = require("./icons/blue_right.png");
var obj = new Mcalendar();

// for color with color code
const WHITE_SMOKE = '#F8F8F8';
// const WHITE_SMOKE = '#000000';
const PURE_BLACK = '#000000';
const PURE_WHITE = '#FFFFFF';
const RED_AMARANTH = "#F13748";
const SELECT_LINNER_GRADIENT_COLOR = ['#1F2B4D', '#4368d1'];
const UNSELECT_LINNER_GRADIENT_COLOR = ['#FFFFFF', '#FFFFFF'];
const BORDER_WIDTH = 0.4;
const SELECT_BORDER_COLOR = '#005d83';



function CustomCalender({
    boldFont,
    lightFont,
    data,
    onClickValue,
    isDisabled,
    isHidden
}) {

    if (isHidden) return null;

    const [calenderData, setCalenderData] = useState({});
    const [calenderView, setCalenderView] = useState("M");
    const [loader, setLoader] = useState(true);
    const [selectDateInfo, setSelectDateInfo] = useState({});
    const [selectDateInfoAllDay, setSelectDateInfoAllDay] = useState({});

    useEffect(() => {
        calculateMapView();
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
        changeView(calenderView);
        clearSelectedData();
        setLoader(false);
    }

    // for back arrow buttton
    let onPrev = () => {
        setLoader(true);
        if (calenderView === "M") {
            obj.changePrevMonth();
            setCalenderData(obj.getMonthView());
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


    // for month view
    let onMonthView = () => {
        return (
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    {calenderData.weekdays.map((item, key) => (
                        <View style={[styles.weekView, { backgroundColor: PURE_WHITE, width: '14.22%', borderColor: WHITE_SMOKE, borderWidth: BORDER_WIDTH }]} key={key}>
                            <Text style={{ color: key == 0 ? RED_AMARANTH : PURE_BLACK, fontFamily: boldFont }}>{item}</Text>
                        </View>
                    ))}
                </View>
                {/* for month view */}
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
                                            <LinearGradient
                                                start={{ x: 0.0, y: 0.25 }} end={{ x: BORDER_WIDTH, y: 1.0 }}
                                                locations={[0.3, 1]}
                                                colors={Object.keys(selectDateInfo).length > 0 && selectDateInfo.mainKey == calKey && selectDateInfo.subKey == weekKey ? SELECT_LINNER_GRADIENT_COLOR : UNSELECT_LINNER_GRADIENT_COLOR}
                                                style={[styles.touchView, { height: ((Dimension.height - 270) / (calenderData.view).length) }]}>
                                                <Text style={[styles.dateText, { fontFamily: boldFont }, Object.keys(selectDateInfo).length > 0 && selectDateInfo.mainKey == calKey && selectDateInfo.subKey == weekKey ? { color: PURE_WHITE } : { color: PURE_BLACK }, weekKey == 0 ? { color: RED_AMARANTH } : {}]}>{weekItem.day}</Text>
                                                {Object.keys(selectDateInfo).length > 0 && selectDateInfo.mainKey == calKey && selectDateInfo.subKey == weekKey ?
                                                    <Text style={[styles.dateNameText, { fontFamily: lightFont }, weekKey == 0 ? { color: RED_AMARANTH } : {}]}>{calenderData.fWeekView[weekItem.weekIndex]}</Text> :
                                                    <React.Fragment>
                                                        {Array.isArray(weekItem.data) ?
                                                            <React.Fragment>
                                                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: (((Dimension.height - 230) / (calenderData.view).length) - 20) }}>
                                                                    {weekItem.data.map((statItem, statKey) => (
                                                                        <React.Fragment key={statKey}>
                                                                            {statKey < 8 ?
                                                                                <TouchableOpacity style={[{ height: 20, width: 20, marginTop: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: statItem.color, alignSelf: 'center', borderRadius: 10 }, weekItem.data.length > 0 && statKey > 0 ? { marginLeft: '5%' } : {}]}>
                                                                                    <Text style={{ color: "#fff", fontSize: 9 }}>5</Text>
                                                                                </TouchableOpacity> :
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
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </React.Fragment> :
                                    <View style={[styles.touchView, { backgroundColor: PURE_WHITE, width: '14.22%' }]} />
                                }
                            </React.Fragment>
                        ))}
                    </View>
                ))}
            </View>
        )
    }

    // for week view
    let weekView = () => {
        return (
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
            </React.Fragment>
        )
    }

    // for day view 
    let onDayView = () => {
        return (
            <View style={{ height: (Dimension.height - 190) }}>
                {/* <View style={{ flexDirection: 'row' }}>
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
                </View> */}
                <ScrollView
                    style={{ marginTop: 2 }}
                    nestedScrollEnabled={true}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '12.5%' }}>
                            {calenderData.timeObj.map((i, k) => (
                                <React.Fragment key={k}>
                                    <View style={{ borderColor: "#000", borderRightWidth: BORDER_WIDTH, height: 25, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: PURE_BLACK, fontFamily: lightFont }}>{i.ts} {i.ap}</Text>
                                    </View>
                                    <View style={{ borderColor: "#000", borderRightWidth: BORDER_WIDTH, height: 25, justifyContent: 'center', alignItems: 'center' }}>
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
                                                    <React.Fragment>
                                                        <TouchableOpacity style={[{ borderWidth: BORDER_WIDTH, justifyContent: 'center', alignItems: 'flex-start' }, Object.keys(selectDateInfo).length > 0 && selectDateInfo.mainKey == timeKey && selectDateInfo.interval == '1st' ? { borderColor: SELECT_BORDER_COLOR, } : { borderColor: WHITE_SMOKE }]} onPress={() => timeSelectFromDay(timeItem, timeKey, "1st")} activeOpacity={0.7}>
                                                            {timeItem.prevCount > 0 ?
                                                                <React.Fragment>
                                                                    <View style={{ backgroundColor: timeItem.prevColor, borderRadius: 10, justifyContent: 'center', marginTop: 1, paddingHorizontal: 5, paddingVertical: 2 }}>
                                                                        <Text style={{ color: PURE_WHITE, fontSize: 9 }} numberOfLines={1}>kkk</Text>
                                                                    </View>
                                                                </React.Fragment> :
                                                                null
                                                            }
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={[{ borderWidth: BORDER_WIDTH, height: 25, justifyContent: 'center' }, Object.keys(selectDateInfo).length > 0 && selectDateInfo.mainKey == timeKey && selectDateInfo.interval == '2nd' ? { borderColor: SELECT_BORDER_COLOR, } : { borderColor: WHITE_SMOKE }]} onPress={() => timeSelectFromDay(timeItem, timeKey, "2nd")} activeOpacity={0.7}>
                                                            {timeItem.frontCount > 0 ?
                                                                <React.Fragment>
                                                                    <View style={{ backgroundColor: timeItem.frontColor, height: 10, borderRadius: 10, paddingLeft: 5, paddingRight: 5, justifyContent: 'center', marginTop: 1 }}>
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
                                                    </React.Fragment>
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
            </View>
        )
    }

    // for change the calender view section
    let onChangeCalenderViewSection = () => {
        return (
            <View style={{ width: windowWidth, flexDirection: 'row' }}>
                <View style={{ width: '5%' }} />
                <TouchableOpacity style={{ width: '5%', alignItems: 'center' }} onPress={() => changeView("D")}>
                    <Text style={[{ paddingTop: 10, paddingBottom: 10, color: PURE_BLACK, fontSize: 16, fontFamily: boldFont }, calenderView == "D" ? { color: '#1F2B4D', fontWeight: '700', textDecorationLine: 'underline' } : {}]}>D</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ width: '5%', alignItems: 'center' }} onPress={() => changeView("W")}>
                    <Text style={[{ paddingTop: 10, paddingBottom: 10, color: PURE_BLACK, fontSize: 14, fontFamily: boldFont }, calenderView == "W" ? { color: '#005d83', fontWeight: '700', textDecorationLine: 'underline' } : {}]}>W</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={{ width: '5%', alignItems: 'center' }} onPress={() => changeView("M")}>
                    <Text style={[{ paddingTop: 10, paddingBottom: 10, color: PURE_BLACK, fontSize: 16, fontFamily: boldFont }, calenderView == "M" ? { color: '#1F2B4D', fontWeight: '700', textDecorationLine: 'underline' } : {}]}>M</Text>
                </TouchableOpacity>
                <View style={{ width: '80%', flexDirection: "row" }} >
                    <View style={{ width: '70%' }} />
                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                        <SvgComponent svgName={"search"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE}/>
                    </View>
                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                        <SvgComponent svgName={"filter"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE}/>
                    </View>
                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                        <SvgComponent svgName={"download"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE}/>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            {loader ?
                <ActivityIndicator size="large" color='#afb2b1' />
                :
                <React.Fragment>
                    {onChangeCalenderViewSection()}
                    <View style={{ width: windowWidth, borderWidth: BORDER_WIDTH, borderColor: 'gray', backgroundColor: '#fbfbfb', flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => onPrev()}
                            activeOpacity={0.7}
                        >
                            <Image source={BACK_ARROW} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                        <View style={{ width: '70%', alignItems: 'center' }}>
                            {calenderView === "M" ?
                                <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 17, color: PURE_BLACK, fontFamily: lightFont }}>{calenderData.currentMonth}<Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 17, fontFamily: boldFont }}>{" " + calenderData.CurrentYear}</Text></Text>
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
                            style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => onFont()}
                            activeOpacity={0.7}
                        >
                            <Image source={FONT_ARROW} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                    {calenderView === "M" ?
                        // for month view
                        onMonthView() :
                        <React.Fragment>
                            {calenderView === "W" ?
                                // for week view
                                weekView() :
                                // for day view
                                onDayView()
                            }
                        </React.Fragment>
                    }
                </React.Fragment>
            }
        </View>
    );
};



CustomCalender.defaultProps = {
    data: [],
    boldFont: FontFamily.FONTS.POPPINS.MEDIUM,
    lightFont: FontFamily.FONTS.POPPINS.MEDIUM,
    onClickValue: () => { },
    isDisabled: false,
    isHidden: false
};

CustomCalender.propTypes = {
    data: PropTypes.array,
    boldFont: PropTypes.string,
    lightFont: PropTypes.string,
    onClickValue: PropTypes.func,
    isDisabled: PropTypes.bool,
    isHidden: PropTypes.bool
};



export default CustomCalender;