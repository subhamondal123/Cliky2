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
import { DateConvert } from '../../../services/common-view-function';

function OrderHistoryListPage({
    type,
    data,
    onSelect,
    isHidden,
    props,
}) {
    if (isHidden) return null;
    const [pageLoader, setCustomerLoader] = useState(false);

    useEffect(() => {
        getCustomerData()
    }, [])


    const getCustomerData = async () => {
        setCustomerLoader(false);
    }

    const statusSection = (status) => {
        return (
            <Image source={status == 0 ? ImageName.RED_CLOSE_IMG:
                status == 2 ? ImageName.GREY_CIRCLE_IMG :
                    status == 3 ? ImageName.ORDER_PROCESSED_IMG :
                        status == 4 ? ImageName.ORDER_PROCESSED_IMG :
                            status == 1 ?  ImageName.ORDER_APPROVED_TICK :
                                status == 5 ? ImageName.RED_CLOSE_IMG :
                                    null}
                style={{ height: 22, width: 22, resizeMode: 'contain' }} />
        )
    }

    const onSelectTile = (data) => {
        onSelect(data)
    }

    return (
        <SafeAreaView>
            <React.Fragment>
                <TouchableOpacity style={styles.mainView} activeOpacity={0.8} onPress={() => onSelectTile(data)}>
                    <View style={{ flexDirection: 'row', marginHorizontal: '2%', alignItems: 'center', padding: 8 }}>
                        <Image source={ImageName.CALENDER_CLOCK_IMG} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 10 }}>{DateConvert.formatDDfullMonthYYYY(data.createdAt)}</Text>
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
                </TouchableOpacity>
            </React.Fragment >
        </SafeAreaView >
    );
}

OrderHistoryListPage.defaultProps = {
    isHidden: false,
    data: {},
    onSelect: () => { },
    type: "",
};

OrderHistoryListPage.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    onSelect: PropTypes.func,
    type: PropTypes.string,
};

export default OrderHistoryListPage;