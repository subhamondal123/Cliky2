import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { Color, FontFamily, FontSize, ImageName } from '../../../enums';
import { App_uri } from '../../../services/config';
import { ImagePreview } from '../../../shared';

function DynamicProfileCard({
    props,
    data,
    onPressCart,
    onPressTab,
    backgroundColor,
    additionStyles,
    isHidden
}) {

    if (isHidden) return null;

    const onProfileTab = (data) => {
        onPressTab(data)
    }

    const onCart = (data) => {
        onPressCart(data)
    }

    return (
        <View>
            <View style={{ backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, borderRadius: 12, padding: 8, marginHorizontal: 15, marginTop: 10 }}>
                <View style={{ marginHorizontal: '2%', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flex: 1, flexDirection: "row", alignItems: "center",marginRight:10 }} activeOpacity={0.9} onPress={() => onProfileTab(data)}>
                        <ImagePreview source={data.profileImg && data.profileImg.length > 0 ? { uri: App_uri.CRM_BASE_URI + data.profileImg } : ImageName.DUMMY_PROFILE} style={{ height: 42, width: 42, borderRadius: 100, resizeMode: 'cover' }} />
                        <View style={{ marginLeft: '3%' }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{data.title}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#F13748', paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 18, height: 35 }} onPress={() => onCart(data)}>
                        <Image source={ImageName.SHOPING_ORDER_BOX} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                        <View style={{ width: 5 }} />
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 2 }}>{data.cartCount ? data.cartCount : 0}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

DynamicProfileCard.defaultProps = {
    isHidden: false,
    data: {},
    onPressCart: () => { },
    onPressTab: () => { },
    backgroundColor: "#F0F4F7",
    additionStyles: {}
};

DynamicProfileCard.propTypes = {
    isHidden: PropTypes.bool,
    data: PropTypes.instanceOf(Object),
    onPressCart: PropTypes.func,
    onPressTab: PropTypes.func,
    backgroundColor: PropTypes.string,
    additionStyles: PropTypes.instanceOf(Object),
};

export default DynamicProfileCard