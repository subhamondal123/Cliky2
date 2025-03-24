import { PropTypes } from 'prop-types';
import React from 'react'
import styles from './style';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Color, Dimension, FontFamily, FontSize } from '../../../enums';

function DynamicCustomerProfile({
    type,
    data,
    isHidden,
    props,
    onSelectTab
}) {
    if (isHidden) return null;

    const onSelectProfile = () => {
        // props.navigation.navigate("RequestRedemtionCategory")
        onSelectTab()
    }


    return (
        <View>
            <TouchableOpacity
                onPress={() => onSelectProfile()}
                style={{ alignItems: 'center', marginHorizontal: 5 }}>
                <Image source={data.image} style={{ height: 65, width: 65, resizeMode: 'cover', borderRadius: 100, borderWidth: 0.3, borderColor: "#D1D1D1" }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 8 }}>{data.label}</Text>
            </TouchableOpacity>
        </View >
    );

}

DynamicCustomerProfile.defaultProps = {
    isHidden: false,
    data: {},
    type: "",
    onSelectTab: () => { }
};

DynamicCustomerProfile.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,
    onSelectTab: PropTypes.func
};


export default DynamicCustomerProfile;