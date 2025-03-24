import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
// import styles from './style';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { ImageName } from '../../enums';
import styles from './style';

function AddButton({
    imageStyle,
    onPress,
    right,
    bottom
}) {
    const mainView = {
        justifyContent: 'center',
        alignItems: 'center',
        right: right,
        bottom: bottom,
        position: 'absolute'
    }

    const onClick = () => {
        onPress();
    }
    return (
        <TouchableOpacity style={mainView} activeOpacity={0.8} onPress={() => onClick()}>
            <Image source={ImageName.ADD_YELLOW} style={[imageStyle, styles.addImage]} />
        </TouchableOpacity>
    )
}

AddButton.defaultProps = {
    imageStyle: {},
    onPress: () => { },
    right: "3%",
    bottom: "5%"
}

AddButton.propTypes = {
    imageStyle: PropTypes.instanceOf(Object),
    onPress: PropTypes.func,
    right: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    bottom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
}

export default AddButton;