import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import { BigTextButton, CheckBox, Modal, TextButton, TextInputBox } from '../';
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
} from '../../enums';
import DropdownInputBox from '../dropdown-input-box';
import { DateConvert, GetUserData, StorageDataModification, Toaster } from '../../services/common-view-function';
import { MiddlewareCheck } from '../../services/middleware';
import { enquirySourceModifyData, modifyAssignedEmpArr, modifyBrandArr, modifyBrandTypeArr, modifyCustomerTypeArr, modifyDesignationArr, modifyEnquirySourceArrData, modifymeetingTypeArr, modifyPriorityData, modifyPriorityStatus, modifyStateArrData, modifyStatusData, modifySubordinateArr, orgModifyData, stateModifyData } from './function';
import { CommonData, ErrorCode } from '../../services/constant';
import DatePicker from 'react-native-date-picker';

function AssignmentModal({
    modalPadding,
    isVisible,
    type,
    selectedDataObj,
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
    onUpdateButton,
    data,
    props,
    onRemarks,
    remarks,
    selectCustomer,
    onAssignCustomer,
    assignLoader
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    const [assignedArr, setassignedArr] = useState([]);
    const [selectedAssignedObj, setSelectedAssignedObj] = useState({});

    const [assignedEmployeeArr, setAssignedEmployeeArr] = useState([]);
    const [selectedAssignedEmployeeObj, setSelectedAssignedEmployeeObj] = useState({});

    const [designationArr, setDesignationArr] = useState([]);
    const [selectedDesignationObj, setSelectedDesignationObj] = useState({});
    const [assignedLoader, setAssignedLoader] = useState(false);

    const [assignedCrmArr, setassignedCrmArr] = useState([]);
    const [selectedAssignedCrmObj, setSelectedAssignedEmployeeCrmObj] = useState({});


    const [selectedCustomerObj, setSelectedCustomerObj] = useState({});
    const [visibleDueDatePicker, setVisibleDueDatePicker] = useState(false);
    const [selectRawDueDate, setSelectRawDueDate] = useState(new Date());
    const [selectDueDate, setSelectDueDate] = useState("");
    const [selectRawDate, setSelectRawDate] = useState(new Date());
    const [remark, setRemark] = useState("");
    const [checkAssignType, setCheckAssignType] = useState("self");
    const [fullName, setFullName] = useState("");



    useEffect(async () => {
        let userInfo = await StorageDataModification.userCredential({}, "get");
        setFullName(userInfo.firstName + " " + userInfo.lastName);
        setSelectedCustomerObj({
            id: userInfo.userId,
            name: userInfo.firstName + " " + userInfo.lastName
        })
        if (type == "task" || type == "lead" || type == "opportunity") {
            assigendDropDownData();
        }
        if (type == "sfaEnquiryList") {
            assigendDropDownData();
            getDesignationDropdown()

        }
        if (type == "enquiryList") {
            // assigendDropDownData();
            getDesignationDropdown()

        }


    }, [])


    const getDesignationDropdown = async () => {
        setAssignedLoader(true)
        let responseData = await MiddlewareCheck("getAllDesignation", {}, props);

        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setDesignationArr(modifyDesignationArr(responseData.response))
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        setAssignedLoader(false)
    }


    const assigendDropDownData = async () => {
        setAssignedLoader(true)
        let responseData = await MiddlewareCheck("getUserList", {}, props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setassignedArr(modifyBrandArr(responseData.response))
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        setAssignedLoader(false)
    }

    const getAssignedEmployee = async (value) => {
        setAssignedLoader(true)
        let reqData = {
            designationId: value.id,
            zoneId: data ? data.zoneId : ""
        }
        let responseData = await MiddlewareCheck("getAssignedEmployeeByDesignation", reqData, props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setAssignedEmployeeArr(modifyAssignedEmpArr(responseData.response))
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        setAssignedLoader(false)
    }

    const getAssignedEmployeeforCrm = async (value) => {
        setAssignedLoader(true)
        let reqData = {
            designationId: value.id,
            zoneId: data ? data.zoneId : ""
        }
        let responseData = await MiddlewareCheck("getAssignedEmployeeByDesignationCrm", reqData, props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setassignedCrmArr(modifyAssignedEmpArr(responseData.response))
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        setAssignedLoader(false)
    }

    const _onClose = () => {
        onCloseModal();

    }

    const onRequestCloseModal = () => {
        // onRequestClose();
        onCloseModal();
        clearData();
    }

    const onBackDropPressModal = () => {
        onCloseModal();
        clearData()
    }

    const onBackButtonPressModal = () => {
        onCloseModal();
        clearData()
    }

    const clearData = () => {
        setSelectedAssignedObj({});
        setSelectedDesignationObj({});
        setSelectedAssignedEmployeeObj({});
        setSelectedAssignedEmployeeCrmObj({});
    }

    const _onChangeRemarks = (value) => {
        setRemark(value);
    }

    const _onSelectCustomer = (value) => {
        selectCustomer(value);
        setSelectedCustomerObj(value);
    }


    const _onAssign = () => {
        let data = {
            selectedCustomer: selectedCustomerObj,
            dueDate: selectDueDate,
            remark: remark
        }
        onAssignCustomer(data);
        clearModalData()
    }

    const clearModalData = () => {
        setSelectDueDate("")
        setSelectRawDate(new Date())
        setSelectedCustomerObj({})
        setRemark("")

    }

    const _onCheckType = async (type) => {
        let userInfo = await StorageDataModification.userCredential({}, "get");
        if (type == "subordinate") {
            setSelectedCustomerObj({})
        } else {
            setSelectedCustomerObj({
                id: userInfo.userId,
                name: userInfo.firstName + " " + userInfo.lastName
            })
        }
        setCheckAssignType(type);
    }

    const DueDateView = () => {
        const OnDueDatePickerView = (type) => {
            setVisibleDueDatePicker(type)
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
            OnDueDatePickerView(false);
        }

        let activityView =
            (<View style={{ marginBottom: 15 }} >
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Due Date</Text>
                <View style={{ height: 10 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => OnDueDatePickerView(true)} activeOpacity={0.9}>
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
                    onCancel={() => OnDueDatePickerView(false)}
                />
            </View>)
        return activityView;
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
                    <View style={styles.modalHeaderSec}>
                        <View style={styles.marginView}>
                            <Text style={styles.profileNameText}>Assigned Employee</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    </View>
                    {/* {updateAssignee()} */}
                    <View style={{ margin: 10 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 15 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <CheckBox
                                    type={"singleSelectBox"}
                                    borderRadius={40}
                                    data={checkAssignType == "self" ? true : false}
                                    onClickValue={() => _onCheckType("self")}
                                />
                                <Text style={styles.selectionText}>Self</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <CheckBox
                                    type={"singleSelectBox"}
                                    borderRadius={40}
                                    data={checkAssignType == "subordinate" ? true : false}
                                    onClickValue={() => _onCheckType("subordinate")}
                                />
                                <Text style={styles.selectionText}>Subordinate</Text>
                            </View>
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            {checkAssignType == "self" ?
                                <Text style={styles.selectionText}>{fullName}</Text>
                                :
                                <DropdownInputBox
                                    selectedValue={selectedCustomerObj.id}
                                    data={data}
                                    onSelect={(value) => _onSelectCustomer(value)}
                                    headerText={"Select Customer from list*"}
                                    // selectedText={this.state.selectedContactType.name ? this.state.selectedContactType.name : "Select Contract Type"}
                                    // selectedTextColor={this.state.selectedContactType.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                />
                            }
                        </View>
                        {DueDateView()}
                        <Text style={{ margin: 5, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>*</Text>Assigned Remarks</Text>
                        <TextInputBox
                            value={remark}
                            onChangeText={(value) => _onChangeRemarks(value)}
                            placeholder={"Enter Remark"}
                            keyboardType={"default"}
                            // isActive={this.state.allPageData.firstNameAcive}
                            // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                            // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                            height={45}
                        />
                    </View>
                    <View style={{ marginHorizontal: '10%', marginTop: 15 }}>
                        {assignLoader ?
                            <ActivityIndicator color={Color.COLOR.BLACK.PURE_BLACK} />
                            :
                            <TouchableOpacity style={styles.updateButton}
                                activeOpacity={0.9}
                                onPress={() => _onAssign()}>
                                <Text style={styles.updateText}>Assign</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            }
        />
    );
}

AssignmentModal.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    type: "organization",
    data: {},
    isHidden: false,
    isLoading: false,
    remarks: "",
    assignLoader: false,
    // onLogout: () => { },
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { },
    onUpdateButton: () => { },
    onRemarks: () => { },
    selectCustomer: () => { },
    onAssignCustomer: () => { }
};

AssignmentModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    type: PropTypes.string,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func,
    onUpdateButton: PropTypes.func,
    data: PropTypes.object,
    remarks: PropTypes.string,
    onRemarks: PropTypes.func,
    selectCustomer: PropTypes.func,
    onAssignCustomer: PropTypes.func,
    assignLoader: PropTypes.bool
};


export default AssignmentModal;