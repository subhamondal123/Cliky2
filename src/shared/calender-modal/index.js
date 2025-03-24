import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import { Modal, TextButton } from '../';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {
    AlertMessage,
    Color,
    FontFamily,
    FontSize,
    ImageName,
    OtherSize
} from '../../enums';
import DropdownInputBox from '../dropdown-input-box';
import CheckBox from '../check-box';
import BigTextButton from '../big-text-button';
import { Calendar } from 'react-native-calendars';
import { Toaster } from '../../services/common-view-function';

function CalenderModal({
    modalPadding,
    isVisible,
    // fontFamily,
    // fontSize,
    // color,
    isHidden,
    isLoading,
    // onLogout,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal,
    onSelectDate,
    onApply,
    resetData


}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    const [selectedDate, setselectedDate] = useState("");
    const [selectedSearchDate, setSelectedSearchDate] = useState("");
    const [isSearch, setIsSearch] = useState(false)


    const _onClose = () => {
        if (isSearch) {
            setselectedDate(selectedSearchDate);

        } else {
            _onResetAllStateData();
        }
        onCloseModal();

    }

    // const _onLogout = () => {
    //     onLogout();
    // }

    const onRequestCloseModal = () => {
        onRequestClose();
    }

    const onBackDropPressModal = () => {
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        onBackButtonPress();
    }

    const selectDate = (data) => {
        setselectedDate(data.dateString);
    }

    const onApplyPress = () => {
        if (selectedDate.length > 0) {
            setSelectedSearchDate(selectedDate);
            setIsSearch(true)
            let filterData = {};
            filterData["selectedDate"] = selectedDate;
            onApply(filterData);
        } else {
            Toaster.ShortCenterToaster("Please Select a Date !")
        }
    }

    // for reset
    const onReset = () => {
        _onClose();
        _onResetAllStateData();
        resetData();
    }

    const _onResetAllStateData = () => {
        setselectedDate("");
        setSelectedSearchDate("");
        setIsSearch()
    }

    // for calendre section
    const _onCalender = () => {
        return (
            <Calendar
                onDayPress={day => {
                    selectDate(day);
                    // console.log('selected date', day);
                }}
                // onDayLongPress={day => {
                //     console.log('selected day', day);
                // }}
                onMonthChange={month => {
                    console.log('month changed', month);
                }}
                markingType={'period'}
                markedDates={selectedDate.length == 0 ?
                    {

                    }
                    :
                    {
                        [(selectedDate)]: { selected: true, startingDay: true, textColor: Color.COLOR.WHITE.PURE_WHITE, color: Color.COLOR.RED.AMARANTH, endingDay: true }
                    }
                }
                hideExtraDays={true}
                // current={new Date()}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#f13748',
                    selectedDayTextColor: '#f13748',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#616161',
                    textDisabledColor: '#d9e1e8',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#f13748',
                    monthTextColor: '#f13748',
                    textDayFontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                    textMonthFontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                    textDayHeaderFontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                    textDayFontSize: 16,
                    textMonthFontSize: 14,
                    textDayHeaderFontSize: 14
                }}
            />
        )
    }

    return (
        <Modal
            isVisible={isVisible}
            padding={modalPadding}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <React.Fragment>
                        <View style={styles.modalHeaderSec}>
                            <TouchableOpacity
                                style={styles.crossImgSec}
                                activeOpacity={0.9}
                                onPress={() => _onClose()}>
                                <Image source={ImageName.WHITE_CROSS} style={styles.redCrossImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.modalHeaderText}>
                                Select Date
                            </Text>
                        </View>
                        {isLoading ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={{ marginHorizontal: 15 }}>
                                    {/* <View style={styles.calendarMainView}> */}
                                    {_onCalender()}
                                    {/* </View> */}
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    <BigTextButton
                                        backgroundColor={Color.COLOR.BLUE.EBONY_CLAY}
                                        fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                        text={"RESET"}
                                        onPress={() => onReset()}
                                    />
                                    <View style={{ width: 10 }} />
                                    <BigTextButton
                                        text={"APPLY"}
                                        onPress={() => onApplyPress()}
                                    />
                                </View>
                            </ScrollView>
                        }
                        <View style={{ height: 20 }} />
                    </React.Fragment>
                </View>
            }
        />
    );
}

CalenderModal.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    // fontFamily: FontFamily.FONTS.INTER.BOLD,
    // fontSize: FontSize.MD,
    // color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    isLoading: false,
    // onLogout: () => { },
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { },
    onSelectDate: () => { },
    onApply: () => { },
    resetData: () => { }


};

CalenderModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    // fontFamily: PropTypes.string,
    // fontSize: PropTypes.number,
    // color: PropTypes.string,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    // onLogout: PropTypes.func,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func,
    onSelectDate: PropTypes.func,
    onApply: PropTypes.func,
    resetData: PropTypes.func


};


export default CalenderModal;