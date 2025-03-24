import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
// import { Modal, TextButton } from '../../';
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
} from '../../../enums';
import { Loader, Modal, TextInputBox } from '../../../shared';
import SvgComponent from '../../../assets/svg';
import { MiddlewareCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import { modData } from './function';
import { StorageDataModification, Toaster } from '../../../services/common-view-function';
import { DeviceInfo } from '../../../services/config';

function OfficeActivityModal({
    props,
    modalPadding,
    isVisible,
    fontFamily,
    fontSize,
    color,
    isHidden,
    isLoading,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing
    const [listdata, setListdata] = useState([]);
    const [pageLoader, setPageLoader] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState({});
    const [remark, setRemark] = useState("");
    const [submitLoader, setSubmitLoader] = useState(false);


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setPageLoader(true)
        let officeWork = await StorageDataModification.officeWorkData({}, "get");
        if (officeWork) {
            setListdata(officeWork)
            if (await DeviceInfo.CheckConnection()) {
                await apiCall();
            }
        } else {
            await apiCall();
        }
        setPageLoader(false)
    };

    const apiCall = async () => {
        let responseData = await MiddlewareCheck("getOfficialWorkTypes", {}, props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let listArrData = modData(responseData.data);
                setListdata(listArrData.list)
                await StorageDataModification.officeWorkData(listArrData.list, "store");

            }
        }
    }
    const _onClose = () => {
        setSelectedRoute({})
        onCloseModal();
    }

    const onRequestCloseModal = () => {
        onRequestClose();
    }

    const onBackDropPressModal = () => {
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        onBackButtonPress();
    }

    const onSelect = (item, key) => {
        const updatedArray = listdata.map((item, index) => ({
            ...item,
            check: index === key ? true : false,
        }));

        setListdata(updatedArray);

        setSelectedRoute(item)
    }

    const _onSubmit = () => {
        if (Object.keys(selectedRoute).length == 0) {
            Toaster.ShortCenterToaster("Please select office work !")
        } else if (remark.length == 0) {
            Toaster.ShortCenterToaster("Please enter Remarks !")
        } else {
            onSubmitOfficeWork()
            _onClose();
        }

    }

    const onSubmitOfficeWork = async () => {
        let reqData = {
            "isAttendence": props.Sales360Redux.attendanceData.isAttendance,
            "officialWOrkTypeId": selectedRoute.id,
            "remark": remark
        }
        setSubmitLoader(true)
        let responseData = await MiddlewareCheck("updateOfficialWorkType", reqData, props);
        if (responseData) {
            Toaster.ShortCenterToaster(responseData.message)
            const updatedArray = listdata.map((item, index) => ({
                ...item,
                check: false,
            }));

            setListdata(updatedArray);
        }
        setSubmitLoader(false)
    }

    const dataSection = () => {
        return (
            <View>
                {listdata.map((item, key) => (
                    <TouchableOpacity style={styles.greaySec} key={key} onPress={() => onSelect(item, key)}>
                        <View style={styles.greayBox}>
                            <View style={item.check ? styles.hafCircleGreen : styles.hafCircleGreay}>
                                {item.check ?
                                    <SvgComponent svgName={"tick"} strokeColor={"#fff"} height={18} width={18} />
                                    :
                                    null
                                }

                            </View>
                            <View style={styles.boxTextSec}>
                                <Text style={styles.reasonText}>{item.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    const onChangeRemark = (val) => {
        setRemark(val)
    }

    const remarkSection = () => {
        return (
            <View style={{ marginHorizontal: 20, marginTop: 15 }}>
                <TextInputBox
                    multiline={true}
                    placeholder={"Remark"}
                    value={remark}
                    height={80}
                    borderRadius={12}
                    returnKeyType="done"
                    keyboardType={"default"}
                    additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                    onChangeText={(value) => onChangeRemark(value)}
                />
            </View>
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
                            <View style={{}}>
                                <Text style={[styles.headerModalText, { color: "#fff" }]}>Office Work</Text>
                            </View>
                        </View>
                        {pageLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                <View>
                                    {dataSection()}
                                    {remarkSection()}
                                </View>
                                <View style={styles.modalMainMarginSec}>
                                    <View style={{ flexDirection: 'row', marginTop: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.cancelButton}
                                            onPress={() => _onClose()}
                                            activeOpacity={0.9}>
                                            <Text style={styles.cancelText}>Cancel</Text>
                                        </TouchableOpacity>
                                        <View style={{ marginLeft: '5%' }} />
                                        {submitLoader ?
                                            <Loader type={"normal"} />
                                            :
                                            <TouchableOpacity style={styles.logoutButton} onPress={() => _onSubmit()} activeOpacity={0.9}>
                                                <Text style={styles.cancelText}>Submit</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>
                            </ScrollView>
                        }
                    </React.Fragment>
                </View>
            }
        />
    );
}

OfficeActivityModal.defaultProps = {
    modalPadding: 0,
    isVisible: true,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    isLoading: false,
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { }
};

OfficeActivityModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func
};


export default OfficeActivityModal;