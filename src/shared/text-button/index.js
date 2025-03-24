import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize,
    Padding
} from '../../enums';

function TextButton({
    isHidden,
    backgroundColor,
    padding,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderBottomLeftRadius,
    marginTop,
    fontSize,
    fontFamily,
    color,
    text,
    activeOpacity,
    borderWidth,
    borderColor,
    isDisabled,
    onClickValue,
}) {
    if (isHidden) return null;

    const logIn_btn = { backgroundColor: backgroundColor, alignSelf: 'center', borderTopRightRadius: borderTopRightRadius, borderBottomRightRadius: borderBottomRightRadius, borderTopLeftRadius: borderTopLeftRadius, borderBottomLeftRadius: borderBottomLeftRadius, marginTop: marginTop, padding: padding, borderColor: borderColor, borderWidth: borderWidth };
    const logInText = { fontSize: fontSize, fontFamily: fontFamily, color: color, paddingLeft: padding, paddingRight: padding, textAlign: 'center' };

    const _onLogin = () => {
        onClickValue({ value: true })
    } 

    return (
        <View>
            <TouchableOpacity
                style={logIn_btn}
                activeOpacity={activeOpacity}
                onPress={_onLogin}
                disabled={isDisabled}
            >
                <Text style={logInText}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

TextButton.defaultProps = {
    isHidden: false,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    padding: 10,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginTop: 0,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.LIGHT,
    color: Color.COLOR.BLUE.PACIFIC,
    text: "LOGIN",
    activeOpacity: 0.9,
    borderWidth: 0,
    borderColor: null,
    isDisabled: false,
    onClickValue: () => { },
};

TextButton.propTypes = {
    isHidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
    padding: PropTypes.number,
    borderTopRightRadius: PropTypes.number,
    borderBottomRightRadius: PropTypes.number,
    borderTopLeftRadius: PropTypes.number,
    borderBottomLeftRadius: PropTypes.number,
    marginTop: PropTypes.number,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string,
    activeOpacity: PropTypes.number,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    isDisabled: PropTypes.bool,
    onClickValue: PropTypes.func
};


export default TextButton;