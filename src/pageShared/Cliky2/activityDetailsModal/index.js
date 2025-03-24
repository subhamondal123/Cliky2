import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import styles from "./style";
import { Modal, NormalLoader } from "../../../shared";
import SvgComponent from "../../../assets/svg";
import { DateConvert, Toaster } from '../../../services/common-view-function';
import { MiddlewareCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';

function ActivityDetailsModal({
    isHidden,
    isVisible,
    isLoading,
    type,
    data,
    onCloseModal,
    props

}) {
    if (isHidden) return null;

    const [headName, setHeadName] = useState("");
    const [pageLoader, setPageLoader] = useState(true);
    const [visitStatus, setVisitStatus] = useState("");
    const [nextAction, setNextAction] = useState("");

    useEffect(() => {
        setHeaderName();
        setPageLoader(false);
    }, []);

    // for set the header name
    const setHeaderName = async () => {
        if (data.refTable) {
            if (data.refTable == "attendenceManagement") {
                setHeadName("Attendance");
            } else if (data.refTable == "odometer") {
                setHeadName("Odometer");
            } else if (data.refTable == "fieldVisit") {
                setHeadName("Shop Visit");
                await onGetApiData();
            }
        }
    }

    // for api data
    const onGetApiData = async () => {
        let reqData = {
            reqUserId: data.refUserId,
            refClientId: data.refClientId,
            refTable: data.refTable,
            refId: data.refId
        };
        let responseData = await MiddlewareCheck("getBeatDataDetails", reqData, props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setVisitStatus(responseData.data.visitStatus ? responseData.data.visitStatus : "");
                setNextAction(responseData.data.nxtFollowUpDate ? DateConvert.getDayMonthYearName(responseData.data.nxtFollowUpDate) : "");
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    // for request to close the modal
    const onRequestCloseModal = () => {
        onCloseModal();
    }

    // for close the modal by clicking on the blank space
    const onBackDropPressModal = () => {
        onCloseModal();
    }

    // for colse the modal by click on the back button
    const onBackButtonPressModal = () => {
        onCloseModal();
    }


    return (
        <Modal
            isVisible={isVisible}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                            <View style={{ flexDirection: 'row', marginTop: 10, paddingBottom: 10, borderBottomColor: Color.COLOR.GRAY.GRAY_COLOR, borderBottomWidth: 1 }}>
                                <View style={{ height: 28, width: 28, justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                                    <SvgComponent svgName={(DateConvert.getTimePeriodSvgName(data.eventTime)).iconName} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} />
                                </View>
                                <View style={styles.userTextSec}>
                                    <Text style={styles.nameText}>{(data.eventTime)}</Text>
                                </View>
                                <TouchableOpacity style={styles.cancelView} onPress={() => onRequestCloseModal()} >
                                    <SvgComponent svgName={"cross"} strokeColor={Color.COLOR.WHITE.PURE_WHITE} height={15} width={15} />
                                </TouchableOpacity>
                            </View>
                            {pageLoader ?
                                <NormalLoader /> :
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                                    {headName.length > 0 ?
                                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, fontSize: FontSize.SM }}>{headName}</Text> :
                                        null
                                    }
                                    <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.LIGHT, fontSize: FontSize.SM, marginBottom: 10 }}>{data.address}</Text>
                                    {(visitStatus && visitStatus.length > 0) ?
                                        <View style={{ flexDirection: 'row', backgroundColor: Color.COLOR.BLUE.ALICE_BLUE, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 5, flex: 1 }}>
                                            <View style={{ backgroundColor: visitStatus == "Favourable" ? Color.COLOR.GREEN.PURE_GREEN : Color.COLOR.YELLOW.BEER, borderRadius: 100, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                <SvgComponent svgName={visitStatus == "Favourable" ? "tick" : "cross"} height={16} width={16} />
                                            </View>
                                            <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.LIGHT, fontSize: FontSize.SM }}>Visit : {visitStatus}</Text>
                                            </View>
                                        </View> :
                                        null
                                    }
                                    {(nextAction && nextAction.length > 0) ?
                                        <View style={{ flexDirection: 'row', backgroundColor: Color.COLOR.BLUE.ALICE_BLUE, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 5, flex: 1, marginTop: 5 }}>
                                            <View style={{ backgroundColor: Color.COLOR.YELLOW.BEER, borderRadius: 100, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                <SvgComponent svgName={"refresh"} height={20} width={20} />
                                            </View>
                                            <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>
                                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.LIGHT, fontSize: FontSize.SM }}>Next action - Schedule {nextAction}</Text>
                                            </View>
                                        </View> :
                                        null
                                    }
                                </View>
                            }
                        </View>
                    </View>
                </ View >
            }
        />

    )
}

ActivityDetailsModal.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    data: {},
    onCloseModal: () => { },
}

ActivityDetailsModal.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.instanceOf(Object),
    onCloseModal: PropTypes.func,
}

export default ActivityDetailsModal;