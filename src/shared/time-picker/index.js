import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
// import styles from './style';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize,
    ImageName,
    Padding
} from '../../enums';

function TimePicker({
    placeholder,
    placeholderTextColor,
    value,
    keyboardType,
    editable,
    secureTextEntry,
    onChangeText,
    refName,
    onSubmitEditing,
    returnKeyType,
    blurOnSubmit,
    maxLength,
    multiline,
    onFocus,
    onBlur,
    isActive,
    inactiveBGColor,
    activeBGColor,
    activeBorderColor,
    inactiveTextColor,
    activeTextColor,
    isLeftIcon,
    leftIcon,
    onPressLeftIcon,
    isRightIcon,
    rightIcon,
    onPressRightIcon,
    height,
    fontSize,
    fontFamily,
    additionalTextInput,
    alignItems
}) {

    // const inputRef = useRef(null);

    const boxStyle = {
        height: height,
        backgroundColor: inactiveBGColor,
        elevation: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: alignItems
    }

    const activeBoxStyle = {
        height: height,
        backgroundColor: activeBGColor,
        elevation: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: alignItems,
        borderColor: activeBorderColor,
        borderWidth: 1
    }

    const textInput = {
        fontSize: fontSize,
        color: inactiveTextColor,
        fontFamily: fontFamily,
        marginLeft: isLeftIcon ? 10 : 21,
        marginRight: isRightIcon ? 10 : 21,
        flex: 1
    }

    const activeTextInput = {
        fontSize: fontSize,
        color: activeTextColor,
        fontFamily: fontFamily,
        marginLeft: isLeftIcon ? 10 : 21,
        marginRight: isRightIcon ? 10 : 21,
        flex: 1
    }

    const focusedInput = () => {
        onFocus();
    }

    const blurredInput = () => {
        onBlur();
    }

    const changeText = (value) => {
        onChangeText(value);
    }

    const onSubmit = () => {
        onSubmitEditing();
    }

    const onLeftIconPress = () => {
        onPressLeftIcon();
    }

    const onRightIconPress = () => {
        onPressRightIcon();
    }

    // const onRef = (input) => {
    //     ref(input);
    // }


    return (
        <View style={isActive ? activeBoxStyle : boxStyle}>
            {isLeftIcon ?
                <TouchableOpacity
                    onPress={() => onLeftIconPress()}
                    style={{ marginLeft: 21, alignItems: 'center', justifyContent: 'center' }}
                    activeOpacity={1}>
                    <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={leftIcon} />
                </TouchableOpacity>
                :
                null
            }

            <TextInput
                style={[isActive ? activeTextInput : textInput, additionalTextInput]}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                maxLength={maxLength}
                multiline={multiline}
                // autoComplete={"email"}
                editable={editable}
                onChangeText={(value) => changeText(value)}
                ref={refName}
                onSubmitEditing={() => onSubmit()}
                returnKeyType={returnKeyType}
                blurOnSubmit={blurOnSubmit}
                onFocus={() => focusedInput()}
                onBlur={() => blurredInput()}
            />

            {isRightIcon ?
                <TouchableOpacity
                    onPress={() => onRightIconPress()}
                    style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}
                    activeOpacity={1}>
                    <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={rightIcon} />
                </TouchableOpacity>
                :
                null
            }
        </View>
    )
}

TimePicker.defaultProps = {
    placeholder: "Please Enter ...",
    placeholderTextColor: Color.COLOR.GRAY.SILVER,
    value: "",
    keyboardType: "default",
    editable: true,
    secureTextEntry: false,
    onChangeText: () => { },
    refName: () => { },
    onSubmitEditing: () => { },
    returnKeyType: "default",
    blurOnSubmit: true,
    maxLength: 250,
    multiline: false,
    onFocus: () => { },
    onBlur: () => { },
    isActive: false,
    inactiveBGColor: Color.COLOR.WHITE.WHITE_SMOKE,
    activeBGColor: Color.COLOR.WHITE.PURE_WHITE,
    activeBorderColor: Color.COLOR.BLACK.PURE_BLACK,
    inactiveTextColor: Color.COLOR.GRAY.DARK_GRAY_COLOR,
    activeTextColor: Color.COLOR.BLACK.PURE_BLACK,
    isLeftIcon: false,
    leftIcon: ImageName.CLOCK_LOGO,
    onPressLeftIcon: () => { },
    isRightIcon: false,
    rightIcon: ImageName.CLOCK_LOGO,
    onPressRightIcon: () => { },
    height: 55,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    additionalTextInput: {},
    alignItems: 'center'
};

TimePicker.propTypes = {
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    value: PropTypes.string,
    keyboardType: PropTypes.string,
    editable: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    onChangeText: PropTypes.func,
    refName: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    returnKeyType: PropTypes.string,
    blurOnSubmit: PropTypes.bool,
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    isActive: PropTypes.bool,
    inactiveBGColor: PropTypes.string,
    activeBGColor: PropTypes.string,
    activeBorderColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    isLeftIcon: PropTypes.bool,
    leftIcon: PropTypes.number,
    onPressLeftIcon: PropTypes.func,
    isRightIcon: PropTypes.bool,
    rightIcon: PropTypes.number,
    onPressRightIcon: PropTypes.func,
    height: PropTypes.number,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    additionalTextInput: PropTypes.instanceOf(Object),
    alignItems: PropTypes.string
};


export default TimePicker;