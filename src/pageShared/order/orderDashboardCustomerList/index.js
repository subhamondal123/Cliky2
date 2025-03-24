import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    SafeAreaView,

} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize,
    ImageName
} from '../../../enums';
import { NormalLoader } from '../../../shared';
import { App_uri } from '../../../services/config';
import { StorageDataModification } from '../../../services/common-view-function';

function OrderDashboardCustomerList({
    type,
    data,
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


    const getCustomerData = async () => {
        setCustomerLoader(false);
    }

    const statusBoxSec = (status) => {
        return (
            <>
                <View style={[styles.increaseBox, { borderColor: status == 1 ? "#149CE0" : status == 2 ? "#00B65E" : status == 3 ? "#F8B200" : "#604D8B" }]}>
                    <Text style={[styles.demandIncreaseText, { color: status == 1 ? "#149CE0" : status == 2 ? "#00B65E" : status == 3 ? "#F8B200" : "#604D8B" }]}>{status == 1 ? "Demand Increase" : status == 2 ? "New Cycle Start" : status == 3 ? "Low Stock" : "Order Request"}</Text>
                </View>
            </>
        )
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
                        <View style={styles.marginSec}>
                            <View >
                                <Image source={data.profilePic && data.profilePic.length > 0 ? { uri: App_uri.IMAGE_URI + data.profilePic } : ImageName.USER_IMG} style={styles.userImg} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.nameText}>{data.custBusinessName.length > 0 ? data.custBusinessName : data.customerName.length > 0 ? data.customerName : data.ownerName}</Text>
                                    </View>
                                    <View>
                                        {statusBoxSec(data.status)}
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.addressText}>{data.dealerText}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 10 }}>
                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                        {userData.clientId == 19 ? null : <>
                                            <Image source={ImageName.ACHIEVE_AMOUNT_LOGO} style={{ height: 17, width: 17, resizeMode: 'contain' }} />
                                            <Text style={{ color: '#F13748', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '5%' }}>{'\u20B9' + "" + data.orderPrice}</Text>
                                        </>}

                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image source={ImageName.ORDER_CLOCK_ICON} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '5%' }}>{data.orderPeriod} Days</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </React.Fragment >
            }
        </SafeAreaView >
    );

}

OrderDashboardCustomerList.defaultProps = {
    isHidden: false,
    data: {},
    type: "",
};

OrderDashboardCustomerList.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,
};


export default OrderDashboardCustomerList;