import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize,
    ImageName,
    Padding
} from '../../enums';
import LinearGradient from 'react-native-linear-gradient';

function BigTextButton({
    text,
    height,
    borderRadius,
    backgroundColor,
    fontSize,
    fontColor,
    fontFamily,
    onPress,
    isDisabled,
    isLeftIcon,
    leftIcon,
    leftIconStyle,
    isRightIcon,
    rightIcon,
    rightIconStyle,
    isLinearGradient,
    gradientColors,
    start,
    end,
    additionalStyles,
    isHidden
}) {

    if (isHidden) return null;  //if isHidden is true then it show nothing
    
    const buttonView = {
        height: height,
        borderRadius: borderRadius
    }

    const linearGradient = {
        flex: 1,
        flexDirection: 'row',
        borderRadius: borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor
    }

    const buttonText = {
        fontSize: fontSize,
        color: fontColor,
        fontFamily: fontFamily
    }

    const onClickButton = () => {
        onPress();
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={[buttonView, { ...additionalStyles }]} disabled={isDisabled} activeOpacity={0.9} onPress={() => onClickButton()}>
                {isLinearGradient ?
                    <LinearGradient
                        start={start} end={end}
                        colors={gradientColors} style={linearGradient}>
                        {isLeftIcon ?
                            <View style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={[{ height: 20, width: 20, resizeMode: 'contain' }, leftIconStyle]} source={leftIcon} />
                            </View>
                            :
                            null
                        }
                        <Text style={buttonText}>{text}</Text>
                        {isRightIcon ?
                            <View style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={[{ height: 20, width: 20, resizeMode: 'contain' }, rightIconStyle]} source={rightIcon} />
                            </View>
                            :
                            null
                        }
                    </LinearGradient>
                    :
                    < View style={linearGradient}>
                        {isLeftIcon ?
                            <View style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={[{ height: 20, width: 20, resizeMode: 'contain' }, leftIconStyle]} source={leftIcon} />
                            </View>
                            :
                            null
                        }
                        <Text style={buttonText}>{text}</Text>
                        {isRightIcon ?
                            <View style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={[{ height: 20, width: 20, resizeMode: 'contain' }, rightIconStyle]} source={rightIcon} />
                            </View>
                            :
                            null
                        }
                    </View>
                }
            </TouchableOpacity >
        </View >
    )
}

BigTextButton.defaultProps = {
    isHidden: false,
    text: "Click Me!",
    height: 45,
    borderRadius: 10,
    backgroundColor: Color.COLOR.RED.AMARANTH,
    fontSize: FontSize.MD,
    fontColor: Color.COLOR.WHITE.PURE_WHITE,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    onPress: () => { },
    isDisabled: false,
    isLeftIcon: false,
    leftIcon: ImageName.SMS_NOTIFICATION,
    leftIconStyle: {
        height: 20,
        width: 20
    },
    isRightIcon: false,
    rightIcon: ImageName.SMS_NOTIFICATION,
    rightIconStyle: {
        height: 20,
        width: 20
    },
    isLinearGradient: false,
    gradientColors: [Color.COLOR.BLUE.CYAN_BLUE_AZURE, Color.COLOR.BLUE.LAPIS_LAZULI],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
    additionalStyles: {}
};

BigTextButton.propTypes = {
    isHidden: PropTypes.bool,
    text: PropTypes.string,
    height: PropTypes.number,
    borderRadius: PropTypes.number,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
    fontColor: PropTypes.string,
    fontFamily: PropTypes.string,
    onPress: PropTypes.func,
    isDisabled: PropTypes.bool,
    isLeftIcon: PropTypes.bool,
    leftIcon: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
        PropTypes.string
    ]),
    leftIconStyle: PropTypes.exact({
        height: PropTypes.number,
        width: PropTypes.number
    }),
    isRightIcon: PropTypes.bool,
    rightIcon: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
        PropTypes.string
    ]),
    rightIconStyle: PropTypes.exact({
        height: PropTypes.number,
        width: PropTypes.number
    }),
    isLinearGradient: PropTypes.bool,
    gradientColors: PropTypes.arrayOf(PropTypes.string),
    start: PropTypes.exact({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    end: PropTypes.exact({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    additionalStyles: PropTypes.instanceOf(Object)
};


export default BigTextButton;