import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
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
import { DropdownInputBox, TextInputBox, BigTextButton } from '../';
import DatePicker from 'react-native-date-picker';
import { DateConvert } from '../../services/common-view-function';
import { DataValidator } from '../../validators';
let allActivityArr = [{ id: "1", name: "suk" }, { id: "2", name: "sam" }, { id: "3", name: "jam" }];
let allAssignToArr = [{ id: "1", name: "suk" }, { id: "2", name: "sam" }, { id: "3", name: "jam" }];
let allUserListArr = [{ id: "1", name: "suk_user" }, { id: "2", name: "sam_user" }, { id: "3", name: "jam_usetr" }];


function AddActivity({
    modalPadding,
    isVisible,
    fontFamily,
    fontSize,
    color,
    isHidden,
    onCloseModal,
    modalType,
    submitData,
    data
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    if (isVisible == false) return null;

    const [selectActivityType, setSelectActivityType] = useState(data.activityType == undefined || data.activityType == null ? "" : data.activityType);
    const [selectAssignTo, setSelectAssignTo] = useState(data.assignTo == undefined || data.assignTo == null ? "" : data.assignTo);
    const [selectUser, setSelectUser] = useState(data.user == undefined || data.user == null ? "" : data.user);
    const [selectDate, setSelectDate] = useState(data.date == undefined || data.date == null ? "" : data.date);
    const [selectRawDate, setSelectRawDate] = useState(data.date == undefined || data.date == null ? new Date() : new Date(data.date));
    const [visibleDatePicker, setVisibleDatePicker] = useState(false);
    const [selectDueDate, setSelectDueDate] = useState(data.dueDate == undefined || data.dueDate == null ? "" : data.dueDate);
    const [selectRawDueDate, setSelectRawDueDate] = useState(data.dueDate == undefined || data.dueDate == null ? new Date() : new Date(data.dueDate));
    const [visibleDueDatePicker, setVisibleDueDatePicker] = useState(false);
    const [description, setDescription] = useState(data.description == undefined || data.description == null ? "" : data.description);
    const [descriptionActive, setDescriptionActive] = useState(false);

    useEffect(() => {
        SetInitialStateData();
    }, []);


    const SetInitialStateData = () => {
        setSelectActivityType("");
        setSelectAssignTo("");
        setSelectDate("");
        setSelectRawDate(new Date());
        setVisibleDatePicker(false);
        setDescription("");
        setDescriptionActive(false);
    }

    const _onClose = () => {
        onCloseModal(false);
    }


    // for Activity type
    const ActivityType = (key) => {
        const OnSelectActivityType = (value) => {
            setSelectActivityType(value.id);
        }

        let activityView =
            (<View style={{ marginBottom: 15 }} key={key}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Activity Type</Text>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    selectedValue={selectActivityType}
                    selectedValueType={"id"}
                    data={allActivityArr}
                    onSelect={(value) => OnSelectActivityType(value)}
                    headerText={"Select Task Category"}
                    selectedText={"Select Task Category"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>)
        return activityView;
    }

    // for Date
    const DateView = (key) => {
        const OnDatePickerView = () => {
            setVisibleDatePicker(!visibleDatePicker);
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
            OnDatePickerView();
        }

        let activityView =
            (<View style={{ marginBottom: 15 }} key={key}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Date</Text>
                <View style={{ height: 10 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => OnDatePickerView()} activeOpacity={0.9}>
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
                    onCancel={() => OnDatePickerView()}
                />
            </View>)
        return activityView;
    }

    // for Date
    const DueDateView = (key) => {
        const OnDueDatePickerView = () => {
            setVisibleDueDatePicker(!visibleDueDatePicker);
        }

        const OnSelectDueDateTime = (selectedDate) => {
            let rawDueDate = selectRawDueDate,
                viewDate = "";
            if (selectedDate) {
                viewDate = DateConvert.resDataDateFormat(selectedDate);
                rawDueDate = selectedDate;
            }
            setSelectDueDate(viewDate);
            setSelectRawDueDate(rawDueDate);
            OnDueDatePickerView();
        }

        let activityView =
            (<View style={{ marginBottom: 15 }} key={key}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Due Date</Text>
                <View style={{ height: 10 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => OnDueDatePickerView()} activeOpacity={0.9}>
                    <Text style={styles.inputBoxText}>{selectDueDate.length == 0 ? "yyyy-mm-dd" : selectDueDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={visibleDueDatePicker}
                    date={selectRawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => OnSelectDueDateTime(date)}
                    onCancel={() => OnDueDatePickerView()}
                />
            </View>)
        return activityView;
    }


    // for Activity type
    const AssignTo = (key) => {
        const OnSelectActivityType = (value) => {
            setSelectAssignTo(value.id);
        }

        let activityView =
            (<View style={{ marginBottom: 15 }} key={key}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Assign To</Text>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    selectedValue={selectAssignTo}
                    selectedValueType={"id"}
                    data={allAssignToArr}
                    onSelect={(value) => OnSelectActivityType(value)}
                    headerText={"Select Task Category"}
                    selectedText={"Select Task Category"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>)
        return activityView;
    }


    // for User List
    const UserList = (key) => {
        const OnSelectUser = (value) => {
            setSelectUser(value.id);
        }

        let activityView =
            (<View style={{ marginBottom: 15 }} key={key}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>User List</Text>
                <View style={{ height: 10 }} />
                <DropdownInputBox
                    selectedValue={selectUser}
                    selectedValueType={"id"}
                    data={allUserListArr}
                    onSelect={(value) => OnSelectUser(value)}
                    headerText={"Select User"}
                    selectedText={"Select User"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>)
        return activityView;
    }

    // for description view
    const DescriptionView = (key) => {
        const OnChangeDescription = (e) => {
            let descData = description;
            descData = DataValidator.inputEntryValidate(e, "alphanumeric");
            setDescription(descData);
        }

        let activityView =
            (<View style={{ marginBottom: 15 }} key={key}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{ }</Text>Description</Text>
                <View style={{ height: 10 }} />
                <TextInputBox
                    value={description}
                    onChangeText={(value) => OnChangeDescription(value)}
                    placeholder={"Enter Description"}
                    keyboardType={"default"}
                    multiline={true}
                    isActive={descriptionActive}
                    additionalTextInput={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                    alignItems={'flex-start'}
                    onFocus={() => { setDescriptionActive(true) }}
                    onBlur={() => { setDescriptionActive(false) }}
                    height={90}
                    returnKeyType={'default'}
                />
            </View>)
        return activityView;
    }

// view the fields section
    const ViewFields = () => {
        let activityData = [];
        activityData.push(ActivityType(0));
        if (modalType == "contact") {
            activityData.push(DateView(1));
            activityData.push(AssignTo(2));
        }
        if (modalType == "organization") {
            activityData.push(DateView(1));
        }
        if (modalType == "lead") {
            activityData.push(DateView(1));
            activityData.push(UserList(4));
        }
        if (modalType == "opportunity") {
            activityData.push(DueDateView(3));
        }
        activityData.push(DescriptionView(5));
        return activityData;
    }

    // view the add activity button
    const ViewButton = () => {
        const AddActivity = () => {
            let selectData = {
                activityType: selectActivityType,
                assignTo: selectAssignTo,
                date: selectDate,
                rawDate: selectRawDate,
                description: description,
                dueDate: selectDueDate,
                rawDueDate: selectRawDueDate,
                user: selectUser
            }
            submitData(selectData);
            onCloseModal(false);
        }

        return (<BigTextButton
            text={"Add Activity"}
            onPress={() => AddActivity()}
        />)
    }

    return (
        <Modal
            isVisible={isVisible}
            padding={modalPadding}
            children={
                <View style={styles.modalview}>
                    <View style={styles.modalHeaderSec}>
                        <View style={styles.marginView}>
                            <Text style={styles.profileNameText}>Create New Activity</Text>
                            <TouchableOpacity style={styles.cancelSec}
                                activeOpacity={0.8}
                                onPress={() => _onClose()}  >
                                <Image source={ImageName.CROSS_IMG} style={styles.cancelImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
                            {ViewFields()}
                            {ViewButton()}
                        </View>
                    </ScrollView>
                </View>
            }
        />
    );
}


AddActivity.defaultProps = {
    modalPadding: 0,
    isVisible: true,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    onCloseModal: () => { },
    modalType: "contact",
    submitData: () => { },
    data: {}
};

AddActivity.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    isHidden: PropTypes.bool,
    onCloseModal: PropTypes.func,
    modalType: PropTypes.string,
    submitData: PropTypes.func,
    data: PropTypes.instanceOf(Object)
};


export default AddActivity;