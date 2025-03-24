import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize,
    ImageName
} from '../../enums';
import { DateConvert, Toaster } from '../../services/common-view-function';
import { Loader, Modal, NormalLoader } from '../../shared';
import { CustomStyle } from '../../screens/style';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { modifyAllData } from './function';

function AllCustomerDetails({
    modalPadding,
    isVisible,
    fontFamily,
    fontSize,
    color,
    type,
    data,
    isHidden,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal,
    props
}) {
    if (isHidden) return null;
    const [customerLoder, setCustomerLoader] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({});



    useEffect(() => {
        getCustomerData()
    }, [])


    const getCustomerData = async () => {
        setCustomerLoader(true);

        await loadCustomerBusinessData();

        setCustomerLoader(false);
    }

    const loadCustomerBusinessData = async () => {
        let reqData = {
            customerId: data.customerId
        }
        let responseData = await MiddlewareCheck("getCustomerBusinessDetails", reqData, props);
        if (responseData == false) {
            Toaster.ShortCenterToaster("Network Error!");
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setCustomerDetails(modifyAllData(responseData.data));
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    const _onClose = () => {
        onCloseModal(false);
    }

    const onRequestCloseModal = () => {
        onRequestClose();
    }

    const onBackDropPressModal = () => {
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        onBackButtonPress();
    }





    return (
        <SafeAreaView>
            <Modal
                isVisible={isVisible}
                padding={modalPadding}
                onRequestClose={() => onRequestCloseModal()}
                onBackdropPress={() => onBackDropPressModal()}
                onBackButtonPress={() => onBackButtonPressModal()}
                children={
                    <View style={styles.modalview}>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            {customerLoder ?
                                <View style={{
                                    backgroundColor: "#fff",
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10
                                }}>
                                    <NormalLoader />
                                </View>
                                :
                                <React.Fragment>
                                    <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            <TouchableOpacity style={CustomStyle.backButtonView} >
                                                {/* <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} /> */}
                                            </TouchableOpacity>
                                            <View style={CustomStyle.headerTextView}>
                                                <Text style={CustomStyle.headerText}>Customer Details</Text>
                                            </View>
                                            <View style={CustomStyle.backButtonView} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={styles.mainBox}>
                                            <View style={styles.blueBox}>
                                                <View style={styles.imgCircel}>
                                                    <Image source={ImageName.RUPEES_LOGO} style={styles.rupeesImg} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.boxNumberText}>{customerDetails.totalOutStanding && customerDetails.totalOutStanding.length > 0 ? customerDetails.totalOutStanding : "0"}</Text>
                                            </View>
                                            <View style={styles.mainBoxTextSec}>
                                                <Text numberOfLines={1} style={styles.boxMainText}>Outstanding</Text>
                                            </View>
                                        </View>
                                        <View style={styles.mainBox}>
                                            <View style={styles.skyBox}>
                                                <View style={styles.imgCircel}>
                                                    <Image source={ImageName.WALLET_LOGO} style={styles.boxImglogo} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.boxNumberText}>{customerDetails.lastThreeMonthsBusiness && customerDetails.lastThreeMonthsBusiness.length > 0 ? customerDetails.lastThreeMonthsBusiness : "0"}</Text>
                                            </View>
                                            <View style={styles.mainBoxTextSec}>
                                                <Text numberOfLines={1} style={styles.boxMainText}>Last 3 Month's Business</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={styles.mainBox}>
                                            <View style={styles.greenBox}>
                                                <View style={styles.imgCircel}>
                                                    <Image source={ImageName.MONEY_LOGO} style={styles.boxImglogo} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.boxNumberText}>{customerDetails.loyalty && customerDetails.loyalty.length > 0 ? customerDetails.loyalty : "0"}</Text>
                                            </View>
                                            <View style={styles.mainBoxTextSec}>
                                                <Text numberOfLines={1} style={styles.boxMainText}>Loyalty</Text>
                                            </View>
                                        </View>
                                        <View style={styles.mainBox}>
                                            <View style={styles.lightPinkBox}>
                                                <View style={styles.imgCircel}>
                                                    <Image source={ImageName.CONVERT_CARD} style={styles.boxImglogo} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.boxNumberText}>{customerDetails.creditCycle && customerDetails.creditCycle.length > 0 ? customerDetails.creditCycle : "0"}</Text>
                                            </View>
                                            <View style={styles.mainBoxTextSec}>
                                                <Text numberOfLines={1} style={styles.boxMainText}>Credit Cycle</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={styles.mainBox}>
                                            <View style={styles.lightgrayBox}>
                                                <View style={styles.imgCircel}>
                                                    <Image source={ImageName.WALLET_GRAY} style={styles.boxImglogo} />
                                                </View>
                                                <Text style={styles.boxNumberText}>{customerDetails.lastInvoiceQty && customerDetails.lastInvoiceQty.length > 0 ? customerDetails.lastInvoiceQty : "0"}</Text>
                                            </View>
                                            <View style={styles.mainBoxTextSec}>
                                                <Text numberOfLines={1} style={styles.boxMainText}>Last Invoice Qty</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.mainBox}
                                            activeOpacity={0.9}
                                        >
                                            <View style={styles.violetBox}>
                                                <View style={styles.imgCircel}>
                                                    <Image source={ImageName.LOCATION_VIOLET} style={styles.boxImglogo} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.boxNumberText}>{customerDetails.visitsLastMonths && customerDetails.visitsLastMonths.length > 0 ? customerDetails.visitsLastMonths : "0"}</Text>
                                            </View>
                                            <View style={styles.mainBoxTextSec}>
                                                <Text numberOfLines={1} style={styles.boxMainText}>Visits Last Month</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {/* <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={styles.mainBox}>
                                            <View style={styles.blueBox}>
                                                <View style={styles.imgCircel}>
                                                    <Image source={ImageName.RUPEES_LOGO} style={styles.rupeesImg} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.boxNumberText}>97853.00</Text>
                                            </View>
                                            <View style={styles.mainBoxTextSec}>
                                                <Text numberOfLines={1} style={styles.boxMainText}>Last Month Order</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, marginHorizontal: '2%' }} />
                                    </View> */}
                                    < View style={{ marginBottom: '5%' }} />
                                </React.Fragment>
                            }
                        </ScrollView>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

AllCustomerDetails.defaultProps = {
    modalPadding: 0,
    isVisible: true,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    data: {},
    type: "",
    onCloseModal: () => { },
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
};

AllCustomerDetails.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    data: PropTypes.instanceOf(Object),
    color: PropTypes.string,
    isHidden: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func
};


export default AllCustomerDetails;