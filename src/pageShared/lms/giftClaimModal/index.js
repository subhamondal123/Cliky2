import { PropTypes } from 'prop-types';
import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "./style";
import { BigTextButton, CheckBox, Modal } from "../../../shared";
import { Color, FontFamily, FontSize, ImageName } from '../../../enums';
import SvgComponent from '../../../assets/svg';

function GiftClaimModal({
    isHidden,
    isVisible,
    isLoading,
    type,
    data,
    onCloseModal,
    props,
    onFilter,
    onDataReset

}) {
    if (isHidden) return null;
    const onRequestCloseModal = () => {
        onCloseModal();
    }

    const onBackDropPressModal = () => {
        onCloseModal();
    }

    const onBackButtonPressModal = () => {
        onCloseModal();
    }

    const footerSec = () => {
        return (
            <React.Fragment>
                <View style={{ marginHorizontal: 15, flexDirection: 'row', marginTop: 30 }}>
                    <BigTextButton
                        text={"Reset"}
                        fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                        fontSize={FontSize.SM}
                        fontColor={"#000"}
                        borderRadius={30}
                        backgroundColor={"#fff"}
                        additionalStyles={{ borderColor: Color.COLOR.RED.AMARANTH, borderWidth: 0.8 }}
                    // onPress={() => this._onClassUpdate(item)}
                    />
                    <View style={{ width: 65 }} />
                    <BigTextButton
                        text={"Send"}
                        fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                        fontSize={FontSize.SM}
                        borderRadius={30}
                        start={{ x: 1, y: 0.3 }}
                        end={{ x: 0.5, y: 1 }}
                        onPress={() => this.onConfirm()}
                    />
                </View>
                <View style={{ marginBottom: 8 }} />
            </React.Fragment>
        )

    }


    return (
        <Modal
            isVisible={isVisible}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity activeOpacity={0.9} onPress={() => onRequestCloseModal()}>
                            <SvgComponent svgName={"cross"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={20} width={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: 15 }}>
                        <View style={{}}>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Gift Claim</Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Claim ID: <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>#CL23765</Text></Text>
                            <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Grivance ID: <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>#GVD23765</Text></Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                <SvgComponent svgName={"calender"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                                <Text style={{ fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: Color.COLOR.BLACK.PURE_BLACK, marginLeft: '5%' }}>12-12-2023</Text>
                                <View style={{ flex: 1 }} />
                                <SvgComponent svgName={"sendUp"} strokeColor={Color.COLOR.RED.AMARANTH} height={20} width={20} />
                            </View>
                            <Text style={{ color: "#5F5F5F", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 15 }}>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Text>

                            <View style={{ flexDirection: 'row', marginTop: 25, alignItems: 'center' }}>
                                <SvgComponent svgName={"calender"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                                <Text style={{ fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: Color.COLOR.BLACK.PURE_BLACK, marginLeft: '5%' }}>12-12-2023</Text>
                                <View style={{ flex: 1 }} />
                                <SvgComponent svgName={"sendDown"} strokeColor={"#0591B9"} height={20} width={20} />
                            </View>
                            <Text style={{ color: "#5F5F5F", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginTop: 15 }}>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Text>
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    placeholder='Write your message'
                                />
                                <View style={{ borderColor: "#000", borderWidth: 0.6 }} />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ marginTop: 10, color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>OR</Text>
                            </View>
                            <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                <CheckBox />

                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: '5%' }}>Solved , Please Close the Grivance</Text>
                            </View>
                            {footerSec()}
                        </View>
                    </View>
                </ View>
            }
        />

    )
}

GiftClaimModal.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    data: "",
    onCloseModal: () => { },
    onFilter: () => { },
    onDataReset: () => { }
}

GiftClaimModal.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.string,
    onCloseModal: PropTypes.func,
    onFilter: PropTypes.func,
    onDataReset: PropTypes.func,
}

export default GiftClaimModal;

