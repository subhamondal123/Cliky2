import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize,
    ImageName
} from '../../enums';
import { ScrollView } from 'react-native-gesture-handler';
import { modifyDataAfterSearch, modifyDropdownData, modifySelectDataArr } from './function';
import CommonModal from '../modal';

function MultipleSelectModalDropdown({
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    alignListItems,
    borderRadius,
    borderWidth,
    width,
    data,
    selectedValue,
    selectedValueType,
    aditionalTextStyle,
    aditionalDropdownViewStyle,
    aditionalMainViewStyle,
    aditionalListViewStyle,
    borderBottomWidth,
    selectedColor,
    isHidden,
    selectHeadText,
    scrollMaxHeight,
    borderBottomColor,
    onPress,
    isDisabled,
    type,
    activeOpacity,
    onChangeText,
    selectSearchText,
    loaderCheck,

    isVisible,
    containerStyle,
    headerText,
    headerTextStyle,
    isSearchable,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onClose,
    modalHeaderText,
    additionalListItemStyle,
    fetchMore,
    isApiCall,
    onSearchData,
    endReachedLoader
}) {
    if (isHidden) return null;

    const [dropdownData, setDropdownDataValue] = useState([]);
    const [searchText, setSearchText] = useState(selectSearchText);

    var dropdownNameArr = [];

    // modify the data with respect to the module
    if (data.length > 0) {
        var modifyData = modifyDropdownData(data, selectedValueType, selectedValue);
        selectHeadText = modifyData.headerText;
        data = modifyData.data;
        dropdownNameArr = modifyData.arrName;
    }
    useEffect(() => {
        // setDropdownDataValue(data);
        if (JSON.stringify(dropdownData) === JSON.stringify(data)) {

        } else {
            setDropdownDataValue(data);
        }
    }, [data]);

    const mainWidth = width.toString() + "%";
    const listWidth = (width + 10).toString() + "%";
    const mainViewStyle = {
        width: mainWidth,
        justifyContent: 'center',
        maxHeight: 300,
        borderRadius: borderRadius,
        backgroundColor: "#fff",
        paddingLeft: 9,
        paddingRight: 9,
        ...aditionalMainViewStyle
    }
    const dropdownListStyle = {
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        width: listWidth,
        alignItems: alignListItems,
        ...aditionalListViewStyle
    }

    const textStyle = {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontFamily: FontFamily.FONTS.INTER.LIGHT,
        fontSize: FontSize.MD,
        width: '90%',
        ...aditionalTextStyle
    }

    if (type === "small") {
        textViewWidth = "87%"
        smallViewWidth = "13%"
    }

    const mainContainerStyle = {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        ...containerStyle
    }

    const styleHeaderText = {
        ...headerTextStyle
    }

    const onSelect = (item) => {
        onPress({ selectItem: item, value: modifySelectDataArr(item, selectedValue) });
    }

    const onSearchTextChange = (value) => {
        setSearchText(value);
        // onChangeText(value);
        if (isApiCall) {
            onSearchData(value)
        } else {
            setDropdownDataValue(modifyDataAfterSearch(data, dropdownNameArr, value));   //get modify the data for dropdown
        }

        // value set by chen
        // dropdownDataBySearch(value);
    }

    const dropdownDataBySearch = (value) => {
        setDropdownDataValue(modifyDataAfterSearch(data, dropdownNameArr, value));   //get modify the data for dropdown
    }

    const onCloseModal = () => {
        setSearchText("");
        dropdownDataBySearch("");
        onClose();
    }

    const onRequestCloseModal = () => {
        setSearchText("");
        dropdownDataBySearch("");
        onRequestClose();
    }

    const onBackDropPressModal = () => {
        setSearchText("");
        dropdownDataBySearch("");
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        setSearchText("");
        dropdownDataBySearch("");
        onBackButtonPress();
    }

    // rendering the data
    const RenderContactList = ({ item, key }) => {
        return (
            <TouchableOpacity
                style={[dropdownListStyle, { ...additionalListItemStyle }, (item.check ? { backgroundColor: selectedColor ,borderBottomWidth: borderWidth, borderBottomColor: borderBottomColor, marginTop: 15, } : { backgroundColor: null ,borderBottomWidth: borderWidth, borderBottomColor: borderBottomColor, marginTop: 15, })]}
                onPress={() => onSelect(item)}
                key={key}
                activeOpacity={activeOpacity}
            >
                <Text style={[textStyle, item.check ? { color: "#0068FF" } : {}]}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    // loader for scroll
    const renderLoader = () => {
        return endReachedLoader ? (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 100,
                }}
            >
                <ActivityIndicator
                    size="small"
                    color={Color.COLOR.INDICATOR_COLOR.GRAY}
                />
            </View>
        ) : (
            <View style={{ marginBottom: 20 }} />
        );
    };

    return (
        <CommonModal
            isVisible={isVisible}
            additionalStyles={mainContainerStyle}
            // onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            // onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={mainViewStyle}>
                    <View style={{ borderBottomWidth: borderBottomWidth, borderBottomColor: borderBottomColor, paddingVertical: 5, marginHorizontal: 5, flexDirection: "row" }}>
                        <Text style={[{ color: "#000", fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, marginLeft: 5 }, styleHeaderText]} numberOfLines={1}>{modalHeaderText}</Text>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#999", height: 25, width: 25, borderRadius: 200, marginTop: 3 }} activeOpacity={0.9} onPress={() => onCloseModal()}>
                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.WHITE_CROSS} />
                        </TouchableOpacity>
                    </View>
                    <React.Fragment>
                        {isSearchable ?
                            <TextInput
                                value={searchText}
                                style={{
                                    height: 40,
                                    width: mainWidth,
                                    paddingLeft: 10,
                                    borderRadius: 10,
                                    paddingRight: 30,
                                    fontSize: FontSize.MD,
                                    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
                                    color: Color.COLOR.BLACK.PURE_BLACK,
                                    fontFamily: FontFamily.FONTS.INTER.LIGHT
                                }}
                                placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                placeholder="Search..."
                                keyboardType="name-phone-pad"
                                onChangeText={onSearchTextChange}
                            />
                            :
                            null
                        }
                        <View style={{ paddingBottom: "8%", maxHeight: 200 }}>
                            {loaderCheck ?
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} style={{ marginTop: 10, marginBottom: 10 }} /> :
                                <FlatList
                                    style={{ maxHeight: scrollMaxHeight }}
                                    data={dropdownData}
                                    renderItem={(item, key) => RenderContactList(item, key)}
                                    keyExtractor={(item, key) => key}
                                    onEndReachedThreshold={0.1}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    onEndReached={fetchMore}
                                    ListFooterComponent={renderLoader}
                                />
                            }
                        </View>
                    </ React.Fragment>
                    {/* } */}
                </View>
            }
        />
    )
}

MultipleSelectModalDropdown.defaultProps = {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignListItems: "flex-start",
    borderRadius: 0,
    borderWidth: 0,
    width: 90,
    selectItemAlign: "flex-start",
    data: [],
    selectedValue: [],
    selectedValueType: "id",    //type can be "id" or "name"
    aditionalMainViewStyle: {},
    aditionalTextStyle: {},
    aditionalDropdownViewStyle: {},
    aditionalListViewStyle: {},
    borderBottomWidth: 1,
    selectedColor: '#E5E5E5',
    selectHeadText: "Select",
    scrollMaxHeight: 250,
    borderBottomColor: "#DCDCDC",
    onPress: () => { },
    isDisabled: false,
    type: "big",
    activeOpacity: 0.8,
    selectTextColor: "#A1A4A3",
    aditionalSelectTextStyle: {},
    onChangeText: () => { },
    selectSearchText: "",
    loaderCheck: false,

    isVisible: false,
    containerStyle: {},
    headerText: "",
    headerTextStyle: {},
    isSearchable: false,
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onClose: () => { },
    modalHeaderText: "Select",
    additionalListItemStyle: {},
    isApiCall: false,
    onSearchData: () => { },
    fetchMore: () => { },
    endReachedLoader: false
};

MultipleSelectModalDropdown.propTypes = {
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    alignListItems: PropTypes.string,
    borderRadius: PropTypes.number,
    borderWidth: PropTypes.number,
    width: PropTypes.number,
    data: PropTypes.array.isRequired,
    selectedValue: PropTypes.array.isRequired,
    selectedValueType: PropTypes.string,
    dropdownUpImg: PropTypes.number,
    dropdownDownImg: PropTypes.number,
    aditionalMainViewStyle: PropTypes.instanceOf(Object),
    aditionalTextStyle: PropTypes.instanceOf(Object),
    aditionalDropdownViewStyle: PropTypes.instanceOf(Object),
    aditionalListViewStyle: PropTypes.instanceOf(Object),
    borderBottomWidth: PropTypes.number,
    selectedColor: PropTypes.string,
    selectHeadText: PropTypes.string,
    scrollMaxHeight: PropTypes.number,
    borderBottomColor: PropTypes.string,
    onPress: PropTypes.func,
    isDisabled: PropTypes.bool,
    type: PropTypes.string,
    activeOpacity: PropTypes.number,
    onChangeText: PropTypes.func,
    selectSearchText: PropTypes.string,
    loaderCheck: PropTypes.bool,
    isHidden: PropTypes.bool,

    isVisible: PropTypes.bool,
    containerStyle: PropTypes.instanceOf(Object),
    headerText: PropTypes.string,
    headerTextStyle: PropTypes.instanceOf(Object),
    isSearchable: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onClose: PropTypes.func,
    modalHeaderText: PropTypes.string,
    additionalListItemStyle: PropTypes.instanceOf(Object),
    isApiCall: PropTypes.bool,
    onSearchData: PropTypes.func,
    fetchMore: PropTypes.func,
    endReachedLoader: PropTypes.bool
};


export default MultipleSelectModalDropdown;