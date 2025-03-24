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
    FontSize,
    ImageName
} from '../../../enums';

function DynamicOrderListPage({
    type,
    data,
    isHidden,
    onPressRemove,
    props
}) {
    if (isHidden) return null;
    const [pageLoader, setCustomerLoader] = useState(false);

    useEffect(() => {
        getCustomerData()
    }, [])


    const getCustomerData = async () => {
        setCustomerLoader(false);
    }

    const onRemove = (data) => {
        onPressRemove(data)
    }


    return (
        <SafeAreaView>
            <React.Fragment>
                <View style={styles.mainView}>
                    <View style={{ backgroundColor: '#F0F4F7', padding: 14, borderRadius: 22 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', flex: 1, marginLeft: '2%' }}>
                                {Object.keys(data.brandData).reverse().map((key) => (
                                    <>
                                        <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, top: -5 }}><Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.BOLD }}>{key}</Text> : {data.brandData[key]}</Text>
                                    </>
                                ))}
                                <Text style={{ color: "#1F2B4D", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 3 }}>{data.quantity + " " + data.unitShort}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                <TouchableOpacity onPress={() => onRemove(data)} activeOpacity={0.9}>
                                    <Image source={ImageName.RED_CLOSE_IMG} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                                <View style={{ marginTop: 10 }} />
                                {/* <Text style={{ fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#747C90", top: 8 }}>{"Applied Discount"}  <Text style={{ color: '#F13748', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{"20%"}</Text></Text> */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#747C90", top: 8, textDecorationLine: 'line-through' }}>{"₹" + " " + data.totalPrice}</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, top: 8, }}>  {"₹" + " " + data.totalPrice}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </React.Fragment >
        </SafeAreaView >
    );

}

DynamicOrderListPage.defaultProps = {
    isHidden: false,
    data: {},
    type: "",
    onPressRemove: () => { }
};

DynamicOrderListPage.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,
    onPressRemove: PropTypes.func
};


export default DynamicOrderListPage;