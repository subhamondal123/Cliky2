import React, { useEffect, useState } from 'react'
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../enums';
import { Image, TouchableOpacity, View } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from './style';
import { Text } from 'react-native';

function DashboardSelectionBox({
    props,
    data,
    onSelectTab,
    backgroundColor,
    isHidden
}) {

    if (isHidden) return null;
    const [orderSelectionBox, setOrderSelectionBox] = useState([]);

    useEffect(() => {
        getSectionBox()
    }, [])

    const getSectionBox = async () => {
        setOrderSelectionBox()
    }

    const onSelect = (item) => {
        onSelectTab(item)
    }

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.map((item, key) => (
                <TouchableOpacity style={{ marginTop: 15 }} key={key} activeOpacity={0.9} onPress={() => onSelect(item)}>
                    <View style={{ backgroundColor: item.backgroundColor ? item.backgroundColor : backgroundColor, justifyContent: 'center', alignItems: 'center', borderRadius: 14, height: 120, width: Dimension.width / 3.6, marginHorizontal: 5 }}>
                        {item.redIcon == true ?
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }} />
                                <View style={styles.traingle}>
                                    <Image source={ImageName.WHITE_PLUS} style={{ height: 10, width: 10, resizeMode: "contain", position: "absolute", top: -25, right: -15 }} />
                                </View>
                            </View>
                            :
                            null
                        }
                        <View style={{ top: item.redIcon ? -15 : 0, alignItems: "center" }}>
                            <View style={[styles.circelBox, { backgroundColor: item.iconBackgroundColor }]}>
                                <Image source={item.image} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                            </View>
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: item.fontSize ? 11 : FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 10, textAlign: 'center' }}>{item.text}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

DashboardSelectionBox.defaultProps = {
    isHidden: false,
    data: [],
    onSelectTab: () => { },
    backgroundColor: '#F0F4F7'

};

DashboardSelectionBox.propTypes = {
    isHidden: PropTypes.bool,
    data: PropTypes.array,
    onSelectTab: PropTypes.func,
    backgroundColor: PropTypes.string

};

export default DashboardSelectionBox