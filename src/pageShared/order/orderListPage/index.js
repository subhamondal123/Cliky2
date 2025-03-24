import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,

} from 'react-native';
import {
    Color,
    FontFamily,
    ImageName
} from '../../../enums';
import { BigTextButton, NormalLoader } from '../../../shared';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { App_uri } from '../../../services/config';
import { StorageDataModification } from '../../../services/common-view-function';
import { maskData } from '../../../services/common-view-function/commonFunctions';

function OrderListPage({
    type,
    data,
    onSelectTile,
    onSelectDropdown,
    isHidden,
    props,


}) {
    if (isHidden) return null;
    const [pageLoader, setCustomerLoader] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(async () => {
        let userInfo = await StorageDataModification.userCredential({}, "get")
        setUserData(userInfo)
        getCustomerData()
    }, [])

    const bar = {
        activeStrokeWidth: 5,
        inActiveStrokeWidth: 5,
        inActiveStrokeOpacity: 0.2
    };

    const getCustomerData = async () => {
        setCustomerLoader(false);
    }

    const statusBoxSec = (status) => {
        return (
            <>
                {/* <View style={[styles.increaseBox, { borderColor: status == 1 ? "#149CE0" : status == 2 ? "#00B65E" : status == 3 ? "#F8B200" : "#604D8B" }]}>
                    <Text style={[styles.demandIncreaseText, { color: status == 1 ? "#149CE0" : status == 2 ? "#00B65E" : status == 3 ? "#F8B200" : "#604D8B" }]}>{status == 1 ? "Demand Increase" : status == 2 ? "New Cycle Start" : status == 3 ? "Low Stock" : "Order Request"}</Text>
                </View> */}
                <View style={[styles.increaseBox, { borderColor: "#00B65E" }]}>
                    <Text style={[styles.demandIncreaseText, { color: "#00B65E" }]}>{"New Cycle Start"}</Text>
                </View>
            </>
        )
    }

    const onSelect = (data) => {
        onSelectTile(data)
    }

    const onDropdownSelect = (data) => {
        onSelectDropdown(data)
    }


    return (
        <SafeAreaView>
            {pageLoader ?
                <View style={{ backgroundColor: "#fff", alignItems: 'center', paddingVertical: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <NormalLoader />
                </View>
                :
                <React.Fragment>
                    <View style={styles.mainView}>
                        <TouchableOpacity style={styles.marginSec} activeOpacity={0.9} onPress={() => onSelect(data)}>
                            <Image source={data.profilePic.length == 0 ? ImageName.USER_IMG : { uri: App_uri.CRM_BASE_URI + data.profilePic }} style={styles.userImg} />
                            <View style={styles.nameSec}>
                                <Text style={styles.nameText} numberOfLines={1}>{data.custBusinessName && data.custBusinessName.length > 0 ? data.custBusinessName : data.organizationName && data.organizationName.length > 0 ? data.organizationName : data.customerName}</Text>
                                <Text style={styles.dealerText}>{data.dealerText}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: "center", top: -9 }}>
                                {/* <Image source={ImageName.BULLS_EYE_ICON} style={{ height: 23, width: 23, resizeMode: 'contain', marginRight: '2%', marginTop: 1 }} /> */}
                                {statusBoxSec(data.status)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.orderCycleSec} activeOpacity={0.8} onPress={() => onDropdownSelect(data)}>
                            <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2, backgroundColor: '#F0F4F7', paddingHorizontal: 5, paddingVertical: 5 }}>
                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                    {userData.clientId == 19 ? null : <>
                                        <Image source={ImageName.ACHIEVE_AMOUNT_LOGO} style={{ height: 18, width: 18, resizeMode: 'contain', top: -2 }} />
                                        <View style={{ width: 5 }} />
                                        <Text style={styles.orderValue}>{'\u20B9' + " " + data.orderPrice}</Text>

                                    </>}
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={ImageName.ORDER_CLOCK_ICON} style={{ height: 18, width: 18, resizeMode: 'contain', top: -2 }} />
                                    <View style={{ width: 5 }} />
                                    <Text style={styles.orderCycleValue}>{data.orderPeriod == "-1" ? 0 + " " + "Days" : data.orderPeriod + " " + "Days"}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={ImageName.ORDER_CALENDER_ICON} style={{ height: 18, width: 18, resizeMode: 'contain', top: -2 }} />
                                    <View style={{ width: 5 }} />
                                    <Text style={styles.dateText}>{data.lastOrderDate}</Text>
                                </View>
                                {/* <Image source={data.showHide ? ImageName.UP_ARROW : ImageName.DOWN_ARROW} style={styles.blackDropDown} /> */}
                            </View>
                        </TouchableOpacity>
                        {/* {showhide section} */}

                        {/* {data.showHide ?
                            <View style={{ marginHorizontal: 12, marginVertical: 15 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image source={ImageName.ORDER_STOCKBOX_ICON} style={{ height: 15, width: 15, resizeMode: "contain" }} />
                                    <Text style={styles.stockTotalValue}>Stock {"2589"}MT <Text style={styles.stockCurrentValue}>/ {"2308"}MT</Text></Text>
                                    <View style={{ flex: 1 }} />
                                    <View style={{ flexDirection: "row", alignItems: "center", top: -10 }}>
                                        <CircularProgressBase
                                            {...bar}
                                            value={80}
                                            radius={12}
                                            activeStrokeColor={'#00B65E'}
                                            inActiveStrokeColor={'#D1D1D1'}
                                            clockwise={false} />
                                        <View style={{ marginLeft: 5, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={styles.percentageTxt}>80%</Text>
                                            <Text style={styles.percentageBottomTxt}>Remain</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
                                    <Image source={ImageName.ORDER_CALENDER_ICON} style={{ height: 15, width: 15, resizeMode: "contain" }} />
                                    <Text style={styles.stockTotalValue}>Last Stock Update <Text style={styles.stockCurrentValue}>{"25th Jan 23"}</Text></Text>
                                    <View style={{ flex: 1 }} />
                                    <View style={{ width: 95 }}>
                                        <BigTextButton
                                            height={30}
                                            text={"Stock Update"}
                                            backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                            fontSize={12}
                                            borderRadius={25}
                                            fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                                        />
                                    </View>
                                </View>
                                <View style={{ borderWidth: 0.5, borderColor: "#AAB6BF" }} />
                                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 15 }}>
                                    <Image source={ImageName.ORDER_CALENDER_ICON} style={{ height: 15, width: 15, resizeMode: "contain" }} />
                                    <Text style={styles.stockTotalValue}>Order History <Text style={styles.stockCurrentValue}>{"23"}</Text></Text>
                                    <View style={{ flex: 1 }} />
                                    <View style={{ width: 95 }}>
                                        <BigTextButton
                                            height={30}
                                            text={"Order History"}
                                            backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                            fontSize={12}
                                            borderRadius={25}
                                            fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                                        />
                                    </View>
                                </View>
                                <View style={{ borderWidth: 0.5, borderColor: "#AAB6BF" }} />

                            </View>
                            :
                            null
                        } */}

                    </View>
                    <View style={{ marginBottom: 20 }} />
                </React.Fragment >
            }
        </SafeAreaView >
    );

}

OrderListPage.defaultProps = {
    isHidden: false,
    data: {},
    onSelectDropdown: () => { },
    type: "",
    onSelectTile: () => { }
};

OrderListPage.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,
    onSelectTile: PropTypes.func,
    onSelectDropdown: PropTypes.func
};


export default OrderListPage;