import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DropdownInputBox, Modal } from '..';
import { Color, FontFamily, FontSize, ImageName } from '../../enums';
import SvgComponent from '../../assets/svg';
import { PropTypes } from 'prop-types';
import styles from './style';
import DatePicker from 'react-native-date-picker';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { modifyData } from './function';
import { DateConvert, Toaster } from '../../services/common-view-function';


function ActivityFilterModal({
    isVisible,
    onCloseModal,
    isHidden,
    onSearch,
    onReset,
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    if (isVisible == false) return null;

    const [activityTypeDropdownData, setActivityTypeDropdownData] = useState([]);
    const [selectedActivity, setSetselectedActivity] = useState({});
    const [date, setDate] = useState("");
    const [dateCheck, setDateCheck] = useState(false);
    const [dateRaw, setDateRaw] = useState(new Date());
    const [visibleDatePicker, setVisibleDatePicker] = useState(false);
    const [selectRawDate, setSelectRawDate] = useState(new Date());
    const [selectDate, setSelectDate] = useState("");
    const [filterLoader, setFilterLoader] = useState(false);

    useEffect(() => {
        activityTypeData();
        // SetInitialStateData();
    }, []);

    const activityTypeData = async () => {
        let reqData = {
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("activityTypeDropdown", reqData, this.props);
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            let modActivityTypeData = modifyData(responseData.response.data)
            setActivityTypeDropdownData(modActivityTypeData);
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
    }

    const OnSelectActivityType = (value) => {
        setSetselectedActivity(value);
        // setSelectActivityType(value.id);
    }

    const onDatePickerView = (type) => {
        setVisibleDatePicker(type);
    }

    const OnSelectDateTime = (selectedDate) => {
        let rawDate = selectRawDate,
            viewDate = "";
        if (selectedDate) {
            viewDate = DateConvert.resDataDateFormat(selectedDate);
            rawDate = selectedDate;
        }
        setSelectDate(viewDate);
        setSelectRawDate(rawDate);
        onDatePickerView(false);
    }

    const onFilter = () => {
        setFilterLoader(true);
        let reqData = {
            "activityId": selectedActivity.id,
            "date": selectDate
        }

        onSearch(reqData);

        setFilterLoader(false);
    }

    const onRequestCloseModal = () => {
        onCloseModal();
    }

    const onResetActivity = () => {
        setSetselectedActivity({});
        setSelectDate("");
        onReset()
    }

    return (
        <Modal
            isVisible={isVisible}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onRequestCloseModal()}
            onBackButtonPress={() => onRequestCloseModal()}
            children={
                <View style={styles.modalview}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
                                <Text style={{ flex: 1, color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Advance Search</Text>
                                <TouchableOpacity onPress={() => onRequestCloseModal()} >
                                    <SvgComponent svgName={"cross"} strokeColor={"#000"} height={15} width={15} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ padding: 10 }}>
                                <View style={{ marginHorizontal: 5, marginBottom: 15 }}>
                                    <DropdownInputBox
                                        selectedValue={selectedActivity.id}
                                        // selectedValueType={activityTypeDropdownData}
                                        data={activityTypeDropdownData}
                                        onSelect={(value) => OnSelectActivityType(value)}
                                        headerText={"Select Activity"}
                                        selectedText={"Select an option"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </View>
                                <View style={{ marginHorizontal: 5 }} >
                                    <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onDatePickerView(true)} activeOpacity={0.9}>
                                        <Text style={styles.inputBoxText}>{selectDate.length == 0 ? "yyyy-mm-dd" : selectDate}</Text>
                                        <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                                        </View>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        open={visibleDatePicker}
                                        date={selectRawDate}
                                        mode={"date"}
                                        // maximumDate={new Date()}
                                        onConfirm={(date) => OnSelectDateTime(date)}
                                        onCancel={() => onDatePickerView(false)}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ backgroundColor: Color.COLOR.BLUE.DARK_BLUE, borderRadius: 10, margin: 10, height: 40, width: 80, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 0.5 }} onPress={() => onResetActivity()}>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Reset</Text>
                                </TouchableOpacity>
                                {filterLoader ?
                                    <ActivityIndicator color={Color.COLOR.BLACK.PURE_BLACK} />
                                    :
                                    <TouchableOpacity style={{ backgroundColor: Color.COLOR.RED.AMARANTH, borderRadius: 10, margin: 10, height: 40, width: 80, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 0.5 }} onPress={() => onFilter()}>
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Filter</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={{ marginBottom: 30 }} />
                        </ View>
                    </ScrollView>
                </ View>
            }
        />
    )
}

ActivityFilterModal.defaultProps = {
    isVisible: false,
    onCloseModal: () => { },
    isHidden: false,
    onSearch: () => { },
    onReset: () => { }
};

ActivityFilterModal.propTypes = {
    isVisible: PropTypes.bool,
    onCloseModal: PropTypes.func,
    isHidden: PropTypes.bool,
    onSearch: PropTypes.func,
    onReset: PropTypes.func,
};

export default ActivityFilterModal;