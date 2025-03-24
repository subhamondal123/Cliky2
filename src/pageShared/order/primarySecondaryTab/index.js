import React, { useState } from 'react'
import styles from "./style";
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

function PrimarySecondaryTab({
    props,
    data,
    onPressPrimary,
    onPressSecondary,
    isHidden
}) {

    if (isHidden) return null;

    const [primaryActive, setPrimaryActive] = useState(true);
    const [secondaryActive, setSecondaryActive] = useState(false);

    const onClickPrimary = (data) => {
        setPrimaryActive(true)
        setSecondaryActive(false)
        onPressPrimary()
    }
    const onClickSecondary = (data) => {
        setPrimaryActive(false)
        setSecondaryActive(true)
        onPressSecondary()
    }

    return (
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity style={{ flex: 0.5, }} onPress={() => onClickPrimary(data)} activeOpacity={0.9}>
                <View style={primaryActive ? styles.activeLeftTabSec : styles.inactiveLeftTabSec} >
                    <Text style={primaryActive ? styles.activetabText : styles.inactivetabText}>{data.primaryTxt}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.5, }} onPress={() => onClickSecondary(data)} activeOpacity={0.9}>
                <View style={secondaryActive ? styles.activeRightTabSec : styles.inactiveRightTabSec} >
                    <Text style={secondaryActive ? styles.activetabText : styles.inactivetabText}>{data.secondaryTxt}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

PrimarySecondaryTab.defaultProps = {
    isHidden: false,
    data: {},
    onPressPrimary: () => { },
    onPressSecondary: () => { }
};

PrimarySecondaryTab.propTypes = {
    isHidden: PropTypes.bool,
    data: PropTypes.instanceOf(Object),
    onPressPrimary: PropTypes.func,
    onPressSecondary: PropTypes.func,

};

export default PrimarySecondaryTab