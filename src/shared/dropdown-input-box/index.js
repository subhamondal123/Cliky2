import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
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
import SingleSelectModalDropdown from '../single-select-modal-dropdown';
import SvgComponent from '../../assets/svg';

function DropdownInputBox({
    height,
    selectedText,
    selectedTextColor,
    unSelectedTextColor,
    selectedValue,
    selectedValueType,
    data,
    upDownImages,
    backgroundColor,
    upDownImgStyle,
    isDisabled,
    onSelect,
    headerText,
    borderRadius,
    isBackButtonPressRequired,
    isBackdropPressRequired,
    isSearchable,
    isApiCall,
    onSearchData,
    loaderCheck,
    fontSize,
    fontFamily,
    fetchMore,
    endReachedLoader,
    isHidden,
    additionalBoxStyle,
    isLeftIcon,
    leftIcon,
    leftIconColor,
    additionalTextStyle,
}) {

    if (isHidden) return null;  //if isHidden is true then it show nothing

    const [modalVisible, setModalVisible] = useState(false);

    const inputBoxStyle = {
        height: height,
        backgroundColor: backgroundColor,
        elevation: 1,
        borderRadius: borderRadius,
        flexDirection: 'row',
        alignItems: 'center'
    }

    const inputBoxText = {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 22,
        marginRight: 10,
        flex: 1,
        color: Color.COLOR.GRAY.DARK_GRAY_COLOR,
        ...additionalTextStyle
    }


    const onOpenAndCloseModal = () => {
        if (isDisabled == false) {
            setModalVisible(!modalVisible);
        }
    }

    const onSelectData = async (value) => {
        await onSelect(value);

        onOpenAndCloseModal();
    }

    const onBackButtonPress = () => {
        if (isBackButtonPressRequired) {
            onOpenAndCloseModal();
        }
    }

    const onRequestClose = () => {
        if (isBackButtonPressRequired) {
            onOpenAndCloseModal();
        }
    }

    const onBackdropPress = () => {
        if (isBackdropPressRequired) {
            onOpenAndCloseModal();
        }
    }

    const onFetchMore = () => {
        fetchMore()
    }

    let findData = false;
    for (let i = 0; i < data.length; i++) {
        if (selectedValueType == "id") {
            if (data[i].id == selectedValue) {
                headerText = data[i].name;
                findData = true;
                break;
            }
        } else if (selectedValueType == "name") {
            if (data[i].name == selectedValue) {
                headerText = data[i].name;
                findData = true;
                break;
            }
        }
    }

    return (
        <>
            <TouchableOpacity style={[inputBoxStyle, additionalBoxStyle]} onPress={() => onOpenAndCloseModal()} activeOpacity={0.9}>
                {isLeftIcon ?
                    <View style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <SvgComponent svgName={leftIcon} height={14} width={14} strokeColor={leftIconColor} />
                    </View>
                    :
                    null
                }
                <Text style={[inputBoxText, { color: findData == true ? selectedTextColor : unSelectedTextColor, fontSize: fontSize, fontFamily: fontFamily }]} numberOfLines={1}>{headerText}</Text>
                <View style={{ marginRight: 16, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={[{ height: 15, width: 15, resizeMode: 'contain' }, upDownImgStyle]} source={modalVisible ? upDownImages[0] : upDownImages[1]} />
                </View>
            </TouchableOpacity>
            <SingleSelectModalDropdown
                onSearchData={onSearchData}
                isApiCall={isApiCall}
                isSearchable={isSearchable}
                selectedValue={selectedValue}
                selectedValueType={selectedValueType}
                data={data}
                onPress={(value) => onSelectData(value)}
                isVisible={modalVisible}
                headerText={headerText}
                borderRadius={borderRadius}
                onClose={() => onOpenAndCloseModal()}
                onBackButtonPress={() => onBackButtonPress()}
                // onBackdropPress={() => onBackdropPress()}
                onRequestClose={() => onRequestClose()}
                loaderCheck={loaderCheck}
                fetchMore={() => onFetchMore()}
                endReachedLoader={endReachedLoader}
            />
        </>
    )
}


DropdownInputBox.defaultProps = {
    isHidden: false,
    height: 45,
    selectedText: "",
    selectedTextColor: "#0A0A0A",
    unSelectedTextColor: "#C0C0C0",
    selectedValue: "",
    selectedValueType: "id",
    data: [],
    upDownImages: [
        ImageName.GRAY_UP,
        ImageName.GRAY_DOWN
    ],
    upDownImgStyle: {},
    isDisabled: false,
    onSelect: () => { },
    headerText: "",
    borderRadius: 15,
    isBackButtonPressRequired: false,
    isBackdropPressRequired: false,
    isSearchable: false,
    isApiCall: false,
    onSearchData: () => { },
    loaderCheck: false,
    fontSize: 14,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
    fetchMore: () => { },
    endReachedLoader: false,
    additionalBoxStyle: {},
    isLeftIcon: false,
    leftIcon: "locationWithBGColor",
    leftIconColor: "#F13748",
    additionalTextStyle: {}
};

DropdownInputBox.propTypes = {
    isHidden: PropTypes.bool,
    height: PropTypes.number,
    selectedText: PropTypes.string,
    selectedTextColor: PropTypes.string,
    unSelectedTextColor: PropTypes.string,
    selectedValue: PropTypes.string,
    selectedValueType: PropTypes.string,
    data: PropTypes.array.isRequired,
    upDownImages: PropTypes.array.isRequired,
    upDownImgStyle: PropTypes.instanceOf(Object),
    isDisabled: PropTypes.bool,
    onSelect: PropTypes.func,
    headerText: PropTypes.string,
    borderRadius: PropTypes.number,
    isBackButtonPressRequired: PropTypes.bool,
    isBackdropPressRequired: PropTypes.bool,
    isSearchable: PropTypes.bool,
    isApiCall: PropTypes.bool,
    onSearchData: PropTypes.func,
    loaderCheck: PropTypes.bool,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    backgroundColor: PropTypes.string,
    fetchMore: PropTypes.func,
    endReachedLoader: PropTypes.bool,
    additionalBoxStyle: PropTypes.instanceOf(Object),
    isLeftIcon: PropTypes.bool,
    leftIcon: PropTypes.string,
    leftIconColor: PropTypes.string,
    additionalTextStyle: PropTypes.instanceOf(Object),
};


export default DropdownInputBox;