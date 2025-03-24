import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import { Modal, TextButton } from '../../shared';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName, OtherSize } from '../../enums';
import Clipboard from '@react-native-community/clipboard';
import { Toaster } from '../../services/common-view-function';
import { Regex } from '../../services/config';
import { color } from 'react-native-reanimated';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';

const bar = {
    activeStrokeWidth: 8,
    inActiveStrokeWidth: 8,
    inActiveStrokeOpacity: 0.2
};


function ProjectViewModal({
    modalPadding,
    isVisible,
    isHidden,
    onCloseModal,
    data,
    type,
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing


    const onClose = () => {
        onCloseModal(false);
    }

    const onRequestCloseModal = () => {
        onClose();
    }

    const onBackDropPressModal = () => {
        onClose();
    }

    const onBackButtonPressModal = () => {
        onClose();
    }


    return (
        <Modal
            isVisible={isVisible}
            padding={modalPadding}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalView}>
                    <View style={{ marginHorizontal: 8, marginTop: 4 }}>
                        <View style={{ flexDirection: 'row', marginTop: 18 }}>
                            <Text style={{ flex: 1, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: Color.COLOR.BLACK.PURE_BLACK }}>Haldiram</Text>
                            <TouchableOpacity onPress={() => onBackButtonPressModal()} activeOpacity={0.9}>
                                <Image source={ImageName.GRAY_CIRCEL_CANCEL_LOGO} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        {/* <Text style={{ marginTop: 2, color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.LIGHT }}>700 CM</Text> */}
                        <View style={{ marginHorizontal: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Image source={ImageName.PAPAD_IMG} style={{ height: 150, width: 150, resizeMode: 'cover' }} />
                            <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 12 }}>ERP ID <Text style={{ color: "#1F2B4D", fontFamily: FontFamily.FONTS.POPPINS.REGULAR, fontSize: FontSize.XS }}>{(data.productAttributes.ERPId ? data.productAttributes.ERPId : "")}</Text></Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 6 }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                                <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 5 }}>PTR <Text style={{ color: Color.COLOR.BLUE.DARK_BLUE, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, fontSize: FontSize.XS }}>{'\u20B9' + " " + (data.productAttributes.PTR ? parseFloat(data.productAttributes.PTR).toFixed(2) : "0")}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                                <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 5 }}>MRP <Text style={{ color: Color.COLOR.BLUE.DARK_BLUE, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, fontSize: FontSize.XS }}>{'\u20B9' + " " + (data.productAttributes.MRP ? parseFloat(data.productAttributes.MRP).toFixed(2) : "0")}</Text></Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 8, flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                                <CircularProgressBase
                                    {...bar}
                                    value={19}
                                    radius={20}
                                    activeStrokeColor={'#00B65E'}
                                    inActiveStrokeColor={'#D1D1D1'}
                                    clockwise={false}>
                                </CircularProgressBase>
                                <View style={{ backgroundColor: '#00B65E', justifyContent: 'center', alignItems: 'center', marginTop: 8, paddingHorizontal: 8, paddingVertical: 2 }}>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XXS, fontFamily: FontFamily.FONTS.POPPINS.LIGHT }}>AVAILABLE</Text>
                                </View>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 4 }}>Company Stock</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                                <Image source={ImageName.RED_DOWN_ARROW_ICON} style={{ height: 44, width: 30, resizeMode: 'contain' }} />
                                <View style={{ backgroundColor: '#F13748', justifyContent: 'center', alignItems: 'center', marginTop: 8, paddingHorizontal: 8, paddingVertical: 2 }}>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XXS, fontFamily: FontFamily.FONTS.POPPINS.LIGHT }}>LOW</Text>
                                </View>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 4 }}>Season Demand</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }} />
                        <View style={{ top: 10, flexDirection: 'row', marginHorizontal: '5%', borderBottomColor: "#000", borderBottomWidth: 0.9, borderTopColor: '#000', borderTopWidth: 0.9, padding: 4, alignItems: 'center' }}>
                            <Image source={ImageName.RED_PERCENTAGE_LOGO} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: '2%' }}>3 Offers Available</Text>
                        </View>
                        <Text style={{ marginTop: 15, color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: 'center', marginHorizontal: '2%' }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </Text>
                        <View style={{ marginBottom: 20 }} />
                    </View>
                </View>
            }
        />
    );
}


ProjectViewModal.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    isHidden: false,
    onCloseModal: () => { },
    data: {},
    type: "phone"
};

ProjectViewModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    isHidden: PropTypes.bool,
    onCloseModal: PropTypes.func,
    data: PropTypes.instanceOf(Object),
    type: PropTypes.string
};


export default ProjectViewModal;