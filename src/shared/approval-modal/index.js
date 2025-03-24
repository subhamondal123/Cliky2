import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
// import styles from './style';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { Color, Dimension, FontFamily, ImageName } from '../../enums';
import Modal from '../modal';
import BigTextButton from '../big-text-button'
import styles from './style';
import DropdownInputBox from '../dropdown-input-box';
import TextInputBox from '../text-input-box';
import { DynamicLocationMapping } from '../../pageShared';
import { StorageDataModification } from '../../services/common-view-function';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { modifyLocationMappedData } from './function';

const approvalStausData = [
    { "id": "1", "name": "Approved" },
    { "id": "0", "name": "Not Approved" }
]


function ApprovalModal({
    isHidden,
    isVisible,
    isLoading,
    type,
    onCancel,
    onAccept,
    data,
}) {
    if (isHidden) return null;

    const [selectedApprovalStatus, setSelectedApprovalStatus] = useState({});
    const [remarks, setRemarks] = useState({});
    const [locationLoader, setLocationLoader] = useState(false);
    const [locationData, setLocationData] = useState({});


    useEffect(async () => {
        await getHierarchyTypesSlNo();
    }, [])

    const getHierarchyTypesSlNo = async () => {
        setLocationLoader(true);
        let mappedData = await StorageDataModification.mappedLocationData({}, "get");
        if ((await StorageDataModification.locationMappedData({}, "get")) === null) {
            let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "1" });
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    await StorageDataModification.locationMappedData(modifyLocationMappedData(responseData.response, mappedData), "store");
                } else {
                    // this.setState({ alertMessage: responseData.message });
                }
            }
        }
        setLocationLoader(false);

    }

    let bodyText = "";

    if (type == "acceptReq") {
        bodyText = "Do you want to accept the request ?";
    } else if (type == "declineReq") {
        bodyText = "Do you want to decline the request ?";
    }


    const onRequestCloseModal = () => {
        onCancel();
    }

    const onBackDropPressModal = () => {
        onCancel();
    }

    const onBackButtonPressModal = () => {
        onCancel();
    }

    const onCancelModal = () => {
        onCancel();
    }

    const onOk = () => {
        let data = { "locationDataArr": [locationData], "approvedRemark": remarks, "approvedStatus": selectedApprovalStatus.id }
        onAccept(data);
        clearModalData()
    }

    const clearModalData = () => {
        setSelectedApprovalStatus({})
    }

    const _onSelectApprovalStatus = (value) => {
        setSelectedApprovalStatus(value);
    }

    const _onChangeRemarks = (value) => {
        setRemarks(value);
    }

    const onSelectLocationData = (val) => {
        setLocationData(val.value);
    }


    return (
        <Modal
            isVisible={isVisible}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: FontFamily.FONTS.INTER.BOLD,
                            fontSize: 16,
                            marginHorizontal: 10,
                            color: Color.COLOR.BLACK.BLACK_PEARL
                        }}>
                            Approve Enquiry
                        </Text>
                    </View>
                    <View style={{ height: 15 }} />

                    <DropdownInputBox
                        selectedValue={selectedApprovalStatus.id}
                        data={approvalStausData}
                        onSelect={(value) => _onSelectApprovalStatus(value)}
                        headerText={"Approval Status*"}
                        // selectedText={this.state.selectedContactType.name ? this.state.selectedContactType.name : "Select Contract Type"}
                        // selectedTextColor={this.state.selectedContactType.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                    />
                    <View style={{ height: 10 }} />
                    <TextInputBox
                        value={data.ownerPhoneNo}
                        placeholder={"Enter Account"}
                        keyboardType={"default"}
                        editable={false}
                        // isActive={this.state.allPageData.firstNameAcive}
                        // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                        // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                        height={45}
                    />
                    <View style={{ height: 10 }} />
                    <TextInputBox
                        value={data.enqueryTitle}
                        placeholder={"Enter Account"}
                        keyboardType={"default"}
                        editable={false}
                        // isActive={this.state.allPageData.firstNameAcive}
                        // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                        // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                        height={45}
                    />
                    <View style={{ height: 10 }} />
                    {locationLoader ?
                        null :
                        <View>

                            <DynamicLocationMapping
                                // type={"lastHierarcyField"}
                                screenName={"Crm"}
                                marginBottom={15}
                                flexDirection={"column"}
                                viewType={"add"}
                                isLabelVisible={false}
                                onApiCallData={(value) => onSelectLocationData(value)} />
                            {/* } */}
                        </View>
                    }
                    <View style={{ height: 10 }} />
                    <TextInputBox
                        value={remarks}
                        placeholder={"Enter Remark"}
                        onChangeText={(value) => _onChangeRemarks(value)}
                        keyboardType={"default"}
                        alignItems={"flex-start"}
                        // isActive={this.state.allPageData.firstNameAcive}
                        // onFocus={() => { this.state.allPageData.firstNameAcive = true, this.setState({ allPageData: this.state.allPageData }) }}
                        // onBlur={() => { this.state.allPageData.firstNameAcive = false, this.setState({ allPageData: this.state.allPageData }) }}
                        height={90}
                        multiline={true}
                    />
                    <View style={{ height: 10 }} />

                    {/* </View> */}
                    {isLoading ?
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                            <ActivityIndicator
                                color={Color.COLOR.GRAY.GRAY_COLOR}
                                size={'large'}
                            />
                        </View>
                        :
                        <View style={{ flexDirection: 'row', marginHorizontal: "5%", marginBottom: 20 }}>
                            <BigTextButton
                                borderRadius={30}
                                height={40}
                                backgroundColor={Color.COLOR.GRAY.GRAY_TINTS}
                                text={"Cancel"}
                                onPress={() => onCancelModal()}
                            />
                            <View style={{ width: "5%" }} />
                            <BigTextButton
                                borderRadius={30}
                                height={40}
                                backgroundColor={Color.COLOR.RED.AMARANTH}
                                text={"Ok"}
                                onPress={() => onOk()}
                            />

                        </View>
                    }
                </View>
            }

        />
    )
}

ApprovalModal.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    onCancel: () => { },
    onAccept: () => { },
    data: {},
}

ApprovalModal.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    onCancel: PropTypes.func,
    onAccept: PropTypes.func,
    data: PropTypes.object,
}

export default ApprovalModal;