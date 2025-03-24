import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import { BigTextButton, Modal, TextButton } from '../';
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
} from '../../enums';
import DropdownInputBox from '../dropdown-input-box';
import { DateConvert, GetUserData, Toaster } from '../../services/common-view-function';
import { MiddlewareCheck } from '../../services/middleware';
import { enquirySourceModifyData, modifyAssignedEmpArr, modifyBrandArr, modifyBrandTypeArr, modifyCustomerTypeArr, modifyDesignationArr, modifyEnquirySourceArrData, modifymeetingTypeArr, modifyPriorityData, modifyPriorityStatus, modifyStateArrData, modifyStatusData, modifySubordinateArr, orgModifyData, stateModifyData } from './function';
import { CommonData, ErrorCode } from '../../services/constant';

function AssignedModal({
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
    props
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

    useEffect(() => {
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

    const _onUpdate = () => {
        let assignedData = {};
        if (type == "task") {
            assignedData["selectedAssignedTypeObj"] = selectedAssignedObj;

        }
        if (type == "lead") {
            assignedData["selectedAssignedTypeObj"] = selectedAssignedObj;
        }
        if (type == "opportunity") {
            assignedData["selectedAssignedTypeObj"] = selectedAssignedObj;
        }
        if (type == "sfaEnquiryList") {
            assignedData["selectedAssignedTypeObj"] = selectedAssignedEmployeeObj;
            assignedData["selectedDesignationObj"] = selectedDesignationObj;
        }
        if (type == "enquiryList") {
            assignedData["selectedDesignationObj"] = selectedDesignationObj;
            assignedData["selectedAssignedTypeObj"] = selectedAssignedCrmObj;
        }
        onUpdateButton(assignedData);
        clearData();
    }


    const assignedType = () => {
        const _OnSelectAssigned = (value) => {
            setSelectedAssignedObj(value)
        }
        return (
            <>
                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, marginLeft: '2%', marginTop: 5 }}>Assign To Employee</Text>
                <View style={{ marginTop: 10 }}>
                    <DropdownInputBox
                        isSearchable={true}
                        selectedValue={selectedAssignedObj.id ? selectedAssignedObj.id.toString() : ""}
                        data={assignedArr}
                        onSelect={(value) => _OnSelectAssigned(value)}
                        headerText={"Assign To Employee"}
                    />
                </View>
            </>
        )
    }


    const designation = () => {
        const _OnSelectDesignation = (value) => {
            setSelectedDesignationObj(value);
            getAssignedEmployee(value);

        }
        return (
            <>
                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, marginLeft: '2%', marginTop: 5 }}>Desgnation</Text>
                <View style={{ marginTop: 10 }}>
                    <DropdownInputBox
                        selectedValue={selectedDesignationObj.id ? selectedDesignationObj.id.toString() : ""}
                        data={designationArr}
                        onSelect={(value) => _OnSelectDesignation(value)}
                        headerText={"Designation"}
                    />
                </View>
            </>
        )
    }
    const designationCrm = () => {
        const _OnSelectDesignation = (value) => {
            setSelectedDesignationObj(value);
            getAssignedEmployeeforCrm(value)
        }
        return (
            <>
                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, marginLeft: '2%', marginTop: 5 }}>Desgnation</Text>
                <View style={{ marginTop: 10 }}>
                    <DropdownInputBox
                        selectedValue={selectedDesignationObj.id ? selectedDesignationObj.id.toString() : ""}
                        data={designationArr}
                        onSelect={(value) => _OnSelectDesignation(value)}
                        headerText={"Designation"}
                    />
                </View>
            </>
        )
    }

    const assignedEmployeeType = () => {
        const _OnSelectAssigned = (value) => {
            setSelectedAssignedEmployeeObj(value)
        }
        return (
            <>
                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, marginLeft: '2%', marginTop: 5 }}>Assign To Employee</Text>
                <View style={{ marginTop: 10 }}>
                    <DropdownInputBox
                        selectedValue={selectedAssignedEmployeeObj.id ? selectedAssignedEmployeeObj.id.toString() : ""}
                        data={assignedEmployeeArr}
                        onSelect={(value) => _OnSelectAssigned(value)}
                        headerText={"Assign To Employee"}
                    />
                </View>
            </>
        )
    }


    const assignedEmployeeTypeForCrmEnquiry = () => {
        const _OnSelectAssigned = (value) => {
            setSelectedAssignedEmployeeCrmObj(value)
        }
        return (
            <>
                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, marginLeft: '2%', marginTop: 5 }}>Assign To Employee</Text>
                <View style={{ marginTop: 10 }}>
                    <DropdownInputBox
                        selectedValue={selectedAssignedCrmObj.id ? selectedAssignedCrmObj.id.toString() : ""}
                        data={assignedCrmArr}
                        onSelect={(value) => _OnSelectAssigned(value)}
                        headerText={"Assign To Employee"}
                    />
                </View>
            </>
        )
    }


    const updateAssignee = () => {
        return (
            <>
                {type == "task" ?
                    <>
                        {assignedLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginHorizontal: 15 }}>
                                    {assignedType()}
                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "lead" ?
                    <>
                        {assignedLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginHorizontal: 15 }}>
                                    {assignedType()}

                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "sfaEnquiryList" ?
                    <>
                        {assignedLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginHorizontal: 15 }}>
                                    {designation()}
                                    {assignedEmployeeType()}

                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
                {type == "enquiryList" ?
                    <>
                        {assignedLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <>
                                <View style={{ marginHorizontal: 15 }}>
                                    {designationCrm()}
                                    {assignedEmployeeTypeForCrmEnquiry()}

                                </View>
                            </>
                        }
                    </>
                    :
                    null
                }
            </>
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
                    <View style={styles.modalHeaderSec}>
                        <View style={styles.marginView}>
                            <Text style={styles.profileNameText}>Update Assigned</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    </View>
                    {updateAssignee()}
                    <View style={{ marginHorizontal: '10%', marginTop: 15 }}>
                        <TouchableOpacity style={styles.updateButton}
                            activeOpacity={0.9}
                            onPress={() => _onUpdate()}>
                            <Text style={styles.updateText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        />
    );
}

AssignedModal.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    type: "organization",
    data: {},
    isHidden: false,
    isLoading: false,
    // onLogout: () => { },
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { },
    onUpdateButton: () => { },
};

AssignedModal.propTypes = {
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
};


export default AssignedModal;