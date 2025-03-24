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
    ImageName
} from '../../../enums';
import { Color, FontFamily, FontSize } from '../../../enums';
import { DateConvert, StorageDataModification } from '../../../services/common-view-function';
import SvgComponent from '../../../assets/svg';
import { maskData } from '../../../services/common-view-function/commonFunctions';

function OrderHistoryListPage({
    type,
    data,
    onSelect,
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

    const onSelectTile = (data) => {
        onSelect(data)
    }

    const showHideData = (data) => {
        return (
            <>
                {data.showHide ?
                    <View style={{ marginHorizontal: '4%', }}>
                        <View>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 5 }}>{"Visited By : " + data.userName}</Text>

                        </View>
                        {data.items.data.map((item, key) => (
                            <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center', borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, borderRadius: 10, paddingLeft: 2, paddingVertical: 2 }} key={key}>
                                <View>
                                    <Image source={ImageName.PAPAD_IMG} style={{ height: 34, width: 34, resizeMode: "contain" }} />
                                </View>
                                <View style={{ flex: 0.6 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 5 }}>{item.prodHmUpperNodes["Primary Category"]}</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 5 }}>{item.prodHmUpperNodes["Product"]}</Text>
                                </View>
                                <View style={{ flex: 0.4 }}>
                                    <View>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, }}>{"QTY : " + item.approvedQuantity + " " + item.unit + " / " + item.stdUnitQty + " " + item.stdUnitValue}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>{"Total Price : \u20B9" + " " + (userData.clientId == 19 ? maskData(item.approvedTotalPrice) : item.approvedTotalPrice)}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}

                        {/* <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Order Approve </Text>
                                <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'center' }}>
                                    <SvgComponent svgName={"calender"} hight={15} width={15} strokeColor={"#1F2B4D"} />
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 5 }}>23rd</Text>
                                </View>
                            </View>
                            <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>All Approved</Text>
                        </View> */}
                        {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <SvgComponent svgName={"calender"} hight={25} width={25} strokeColor={"#1F2B4D"} />
                            <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 8 }}>Vehicle No. <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>WB658c96</Text></Text>
                        </View> */}
                        {/* <View style={{ borderBottomColor: "#747C90", borderBottomWidth: 0.5, borderTopColor: '#747C90', borderTopWidth: 0.5, paddingVertical: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 3 }}>Start</Text>
                                    <View style={{ marginLeft: '8%', flexDirection: 'row' }}>
                                        <SvgComponent svgName={"calender"} hight={15} width={15} strokeColor={"#1F2B4D"} />
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 8, marginTop: 2 }}>23rd</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                    <View style={{ marginLeft: 5, flexDirection: 'row' }}>
                                        <SvgComponent svgName={"calender"} hight={15} width={15} strokeColor={"#1F2B4D"} />
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 8, marginTop: 2 }}>23rd</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Vehicle in Time</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 3 }}>Start</Text>
                                    <View style={{ marginLeft: '8%', flexDirection: 'row' }}>
                                        <SvgComponent svgName={"calender"} hight={15} width={15} strokeColor={"#1F2B4D"} />
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 8, marginTop: 2 }}>23rd</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                    <View style={{ marginLeft: 5, flexDirection: 'row' }}>
                                        <SvgComponent svgName={"calender"} hight={15} width={15} strokeColor={"#1F2B4D"} />
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 8, marginTop: 2 }}>23rd</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: '#43b65e', padding: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 8, paddingHorizontal: 12 }}>
                                        <Text style={{ color: "#fff", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Delivered</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 3 }}>Start</Text>
                                    <View style={{ marginLeft: '8%', flexDirection: 'row' }}>
                                        <SvgComponent svgName={"calender"} hight={15} width={15} strokeColor={"#1F2B4D"} />
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 8, marginTop: 2 }}>23rd</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                    <View style={{ marginLeft: 5, flexDirection: 'row' }}>
                                        <SvgComponent svgName={"calender"} hight={15} width={15} strokeColor={"#1F2B4D"} />
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 8, marginTop: 2 }}>23rd</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: "#747C90", fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Dispatch Qty:<Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>12.06</Text></Text>
                                </View>
                            </View>

                        </View> */}
                    </View> :
                    null
                }
            </>

        )
    }


    return (
        <SafeAreaView>
            <React.Fragment>
                <TouchableOpacity style={styles.mainView} activeOpacity={0.8} onPress={() => onSelectTile(data)}>
                    {type == "online" ?
                        <View style={{ flexDirection: 'row', marginHorizontal: '2%', alignItems: 'center', padding: 8 }}>
                            <Image source={ImageName.CALENDER_CLOCK_IMG} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 10 }}>{DateConvert.getITCDateFormat(data.createdAt)}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: '9%' }}>
                                <Image source={ImageName.ORDER_HISTORYLIST_LOGO} style={{ height: 19, width: 18, resizeMode: 'contain', top: -1 }} />
                                <View style={{ width: 8 }} />
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{data.recordNumber}</Text>
                            </View>
                            <View style={{ flex: 1 }} />
                            {statusSection(data.approvedStatus)}
                            <View style={{ width: 10 }} />
                            <Image source={ImageName.DOWN_ARROW} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                        </View>
                        :
                        <View style={{ flexDirection: 'row', marginHorizontal: '2%', alignItems: 'center', padding: 8 }}>
                            <Image source={ImageName.CALENDER_CLOCK_IMG} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 10 }}>{data.orderDate && data.orderDate.length > 0 ? DateConvert.formatDDfullMonthYYYY((data.orderDate.split(" "))[0]) : ""}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: '9%' }}>
                                <Image source={ImageName.ORDER_HISTORYLIST_LOGO} style={{ height: 19, width: 18, resizeMode: 'contain', top: -1 }} />
                                <View style={{ width: 8 }} />
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{data.productName}</Text>
                            </View>
                            <View style={{ flex: 1 }} />
                            {statusSection(2)}
                            <View style={{ width: 10 }} />
                            {/* <Image source={ImageName.DOWN_ARROW} style={{ height: 20, width: 20, resizeMode: 'contain' }} /> */}
                        </View>
                    }
                    {data.showHide ?
                        <>
                            {type == "online" ?
                                <React.Fragment>
                                    {showHideData(data)}
                                </React.Fragment> :
                                null
                            }
                        </>
                        :
                        null
                    }
                </TouchableOpacity>
            </React.Fragment >
        </SafeAreaView >
    );
}

OrderHistoryListPage.defaultProps = {
    isHidden: false,
    data: {},
    onSelect: () => { },
    type: "online",
};

OrderHistoryListPage.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    onSelect: PropTypes.func,
    type: PropTypes.string,
};

export default OrderHistoryListPage;