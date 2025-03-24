
import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import { Image, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, } from "react-native";
import { Color, FontFamily, FontSize, ImageName } from "../../../../../enums";
import { MiddlewareCheck } from '../../../../../services/middleware';
import { orderHistoryModifyData } from './function';
import { FlatList } from 'react-native';
import { ErrorCode } from '../../../../../services/constant';
import { Loader } from '../../../../../shared';
import { DateConvert } from '../../../../../services/common-view-function';
import SvgComponent from '../../../../../assets/svg';

function TenDaysVisit({
    isHidden,
    isVisible,
    type,
    data,
    props

}) {
    if (isHidden) return null;

    const statusSection = (status) => {
        return (
            <Image source={status == 0 ? ImageName.RED_CLOSE_IMG :
                status == 2 ? ImageName.GREY_CIRCLE_IMG :
                    status == 3 ? ImageName.ORDER_PROCESSED_IMG :
                        status == 4 ? ImageName.ORDER_PROCESSED_IMG :
                            status == 1 ? ImageName.ORDER_APPROVED_TICK :
                                status == 5 ? ImageName.RED_CLOSE_IMG :
                                    null}
                style={{ height: 22, width: 22, resizeMode: 'contain' }} />
        )
    }

    const limit = 10;
    const [offset, setOffset] = useState(0);
    const [listdata, setListdata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isApiCall, setIsApiCall] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let reqData = {
            "limit": limit.toString(),
            "offset": offset.toString(),
            "customerId": "",
            "orderStatus": "1",
            "approvedStatus": ""
        }
        setIsLoading(true);
        let responseData = await MiddlewareCheck("getOrderHistory", reqData, props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let listArrData = orderHistoryModifyData(responseData);
                if (offset === 0) {
                    // Reset the data array when fetching the first page
                    setListdata(listArrData.pjpList);
                    if (listArrData.pjpList.length == 0) {
                        setIsApiCall(false)
                    }
                } else {
                    // Append new data to the existing data array for subsequent pages
                    if (listArrData.pjpList.length == 0) {
                        setIsApiCall(false)
                    }
                    setListdata((prevData) => [...prevData, ...listArrData.pjpList]);
                }
            }
        }
        setIsLoading(false);
    };

    const handleLoadMore = () => {
        if (!isLoading) {
            setOffset((prevOffset) => prevOffset + limit);
        }
        if (isApiCall) {
            fetchData();
        } else {
            return null;
        }
    };

    const renderFooter = () => {
        if (isLoading) {
            return (
                <View style={{ marginBottom: 50 }}>
                    <Loader type={"normal"} />
                </View>
            )
        } else {
            return <View style={{ marginBottom: 50 }} />
        }
        // return null;
    };

    const onselect = (item, key) => {
        const updatedArray = listdata.map((item, index) => ({
            ...item,
            check: index === key ? !item.check : false,
        }));

        setListdata(updatedArray);

        // setSelectedRoute(item)
    }

    const renderItem = (item) => {
        return (
            <View style={{ marginHorizontal: 5 }}>
                {listData(item.item, item.index)}
            </View>
        )
    }
    const listData = (item, key) => (
        < View >
            <TouchableOpacity style={styles.mainView} activeOpacity={0.8} onPress={() => onselect(item, key)}>
                <View style={{ flexDirection: 'row', marginHorizontal: '2%', alignItems: 'center', padding: 8 }}>
                    <Image source={ImageName.CALENDER_CLOCK_IMG} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 10 }}>{DateConvert.getDDthMonthNameYYYYformat(item.createdAt).day}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: '9%' }}>
                        <Image source={ImageName.ORDER_HISTORYLIST_LOGO} style={{ height: 19, width: 18, resizeMode: 'contain', top: -1 }} />
                        <View style={{ width: 8 }} />
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.recordNumber}</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    {statusSection(item.approvedStatus)}
                    <View style={{ width: 10 }} />
                    <Image source={item.check ? ImageName.UP_ARROW_WITH_GREY_CIRCLE : ImageName.BLUE_DROPDOWN_IMG_CLIKY2} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                </View>
            </TouchableOpacity>
            {item.check ?
                <>
                    <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Text style={styles.visitText}>Order Approve</Text>
                                <Image source={ImageName.CALENDER_CLOCK_IMG} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                                <Text style={styles.canderDateText}>23rd</Text>
                            </View>
                            <View>
                                <Text style={styles.allText}>All Approved</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", marginTop: 30 }}>
                            <Image source={ImageName.ORDER_DELIVERED_VAN} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ alignItems: "center", marginTop: 10 }}>
                            <Text style={styles.visitText}>Vehicle No.<Text style={styles.canderDateText}>WB33C8399</Text></Text>

                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#747C90' }} />
                    <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Text style={styles.visitText}>Start</Text>
                                <Image source={ImageName.CALENDER_CLOCK_IMG} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                                <Text style={styles.canderDateText}>23rd</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Image source={ImageName.ORDER_CLOCK_ICON} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                                <Text style={styles.canderDateText}>3:5</Text>
                                <Text style={styles.visitText}>PM</Text>
                            </View>
                            <View>
                                <Text style={styles.allText}>All Approved</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Text style={styles.visitText}>Start</Text>
                                <Image source={ImageName.CALENDER_CLOCK_IMG} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                                <Text style={styles.canderDateText}>23rd</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Image source={ImageName.ORDER_CLOCK_ICON} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                                <Text style={styles.canderDateText}>3:5</Text>
                                <Text style={styles.visitText}>PM</Text>
                            </View>
                            <View style={{ backgroundColor: '#00B65E', borderRadius: 10, paddingHorizontal: 10, alignItems: 'center' }}>
                                <Text style={styles.deliverText}>Delivered</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: .5 }}>
                                <Text style={styles.valueText}>ERP</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: .7, alignItems: 'center' }}>
                                <Text style={styles.qtyText}>DELR03127 </Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Text style={styles.qtyText}>Order Qty.</Text>
                                <Text style={styles.valueText}>12</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Text style={styles.qtyText}>Dispatch Qty.</Text>
                                <Text style={styles.valueText}>12.06</Text>
                            </View>
                        </View>
                    </View>
                </>

                :
                null
            }
        </View >
    );

    return (
        <React.Fragment>
            <View style={{ marginTop: 5, height: 350 }}>
                <View style={{ marginTop: 20, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.MD, color: Color.COLOR.BLUE.LOTUS_BLUE }}>Last 10 Orders</Text>
                </View>
                <FlatList
                    data={listdata}
                    keyExtractor={(item, key) => key}
                    renderItem={(item, key) => renderItem(item, key)}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                />
                {/* </ScrollView> */}
            </View>
        </React.Fragment>
    )
}

TenDaysVisit.defaultProps = {
    isHidden: false,
    isVisible: false,
    type: "accept",
    data: {}

}

TenDaysVisit.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.instanceOf(Object)

}

export default TenDaysVisit;