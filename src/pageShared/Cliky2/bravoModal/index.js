import { PropTypes } from 'prop-types';
import React from "react";
import { Image, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import styles from "./style";
import { BigTextButton, BottomModal, SwipeButton } from "../../../shared";
import SvgComponent from "../../../assets/svg";
import { App_uri } from '../../../services/config';

function BravoModal({
    isHidden,
    isVisible,
    isLoading,
    type,
    data,
    onCloseModal,
    onAddVisitNote,
    custAccessType,
    props

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

    const swipeSuccess = () => {
        // this.props.onSuccessSwipe()
        props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'DrawerNav' }] }));
    }

    const onExisitingVisit = () => {
        props.navigation.navigate("UnplanVisitList")

    }

    const onNewVisit = () => {
        props.navigation.navigate("UnplanVisitFrom")
    }

    const footerSec = () => {
        return (
            <View style={{ marginTop: 20 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{ borderTopColor: Color.COLOR.BLUE.LOTUS_BLUE, borderTopWidth: 0.6, borderBottomColor: Color.COLOR.BLUE.LOTUS_BLUE, borderBottomWidth: 0.6 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', width: Dimension.width / 5.2, borderRightWidth: 1, borderRightColor: Color.COLOR.GRAY.GRAY_COLOR, paddingVertical: 10 }}>
                                <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"locationAdd"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: 'center' }}>Add Expenses</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ height: 5, width: 5, backgroundColor: 'red', borderRadius: 50, bottom: 5 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', width: Dimension.width / 5.2, borderRightWidth: 1, borderRightColor: Color.COLOR.GRAY.GRAY_COLOR, paddingVertical: 10 }}>
                                <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"locationAdd"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: 'center' }}>Payment</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ height: 5, width: 5, backgroundColor: 'red', borderRadius: 50, bottom: 5 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', width: Dimension.width / 5.2, borderRightWidth: 1, borderRightColor: Color.COLOR.GRAY.GRAY_COLOR, paddingVertical: 10 }}>
                                <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"hording"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: 'center' }}>Branding</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ height: 5, width: 5, backgroundColor: 'red', borderRadius: 50, bottom: 5 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', width: Dimension.width / 5.2, borderRightWidth: 1, borderRightColor: Color.COLOR.GRAY.GRAY_COLOR, paddingVertical: 10 }}>
                                <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"grievance"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: 'center' }}>Grievances</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ height: 5, width: 5, backgroundColor: 'red', borderRadius: 50, bottom: 5 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', width: Dimension.width / 5.2, borderRightWidth: 1, borderRightColor: Color.COLOR.GRAY.GRAY_COLOR, paddingVertical: 10 }}>
                                <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"contactId"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: 'center' }}>Meeting</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ height: 5, width: 5, backgroundColor: 'red', borderRadius: 50, bottom: 5 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ marginBottom: 20 }} />
            </View>
        )
    }

    const addOrder = () => {
        onRequestCloseModal()
        props.navigation.navigate("OrderProductList", { type: "OrderProductList", data: data, custAccessType: custAccessType, flow: "fromAddShop" })
    }

    const addVisitNote = () => {
        onAddVisitNote()
    }

    return (
        <BottomModal
            isVisible={isVisible}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.userPSec}>
                                <Image source={data.profilePic ? { uri: App_uri.IMAGE_URI + data.profilePic } : ImageName.USER_IMG} style={{ height: 45, width: 45, resizeMode: 'cover', borderRadius: 100 }} />
                            </View>
                            <View style={styles.userTextSec}>
                                <Text style={styles.nameText}>{data.firstName ? data.firstName : 'N/A'}</Text>
                                <Text style={styles.dText}>Phone No :<Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>{data.phoneNumber ? data.phoneNumber : "N/A"}</Text></Text>
                            </View>
                            <TouchableOpacity style={styles.dropdownSec} onPress={() => onCloseModal()} >
                                <SvgComponent svgName={"cross"} strokeColor={"#fff"} height={15} width={15} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                        </View>
                        <View style={{ borderWidth: 0.5, borderColor: '#AAB6BF', marginTop: 10 }} />
                        {/* <View style={{ flexDirection: 'row', backgroundColor: '#F0F4F7', marginTop: 2 }}>
                            <TouchableOpacity style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginLeft: 10 }} activeOpacity={0.9}>
                                <View style={{ height: 28, width: 28, borderRadius: 8, backgroundColor: "#f7bd3e", justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"threeDCubeScan"} strokeColor={"#fff"} height={20} width={20} />
                                </View>
                                <View style={{ marginLeft: '3%' }}>
                                    <Text style={styles.TextSec}>Stock Update</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.verticleLine}></View>
                            <TouchableOpacity style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} activeOpacity={0.9}>
                                <View style={{ height: 28, width: 28, borderRadius: 8, backgroundColor: Color.COLOR.RED.AMARANTH, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"scanning"} strokeColor={"#fff"} height={18} width={18} />
                                </View>
                                <View style={{ marginLeft: '3%' }}>
                                    <Text style={styles.TextSec}>Competitor Activity</Text>
                                </View>
                            </TouchableOpacity>
                        </View> */}
                        <View style={{ borderWidth: 0.5, borderColor: '#AAB6BF', marginTop: 2 }} />
                        <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                            <View style={{ marginTop: 30, alignItems: 'center' }}>
                                <Image source={ImageName.BRAVO_LIKE} style={{ height: 70, width: 70, resizeMode: 'contain' }} />
                            </View>
                            <Text style={styles.bravoText}>Bravo!</Text>
                            <View style={{ alignItems: 'center', marginHorizontal: 15 }}>
                                <Text style={styles.canlenderText}>You Have Successfully add your visit update for the client</Text>
                            </View>
                            <Text style={styles.deddleText}>Do you like to place an order ?</Text>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <BigTextButton
                                        text={"Add Visit Notes"}
                                        backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                        additionalStyles={{ borderColor: Color.COLOR.RED.AMARANTH, borderWidth: 1 }}
                                        borderRadius={26}
                                        height={45}
                                        fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                        fontSize={15}
                                        onPress={() => onAddVisitNote()}
                                    />
                                </View>
                                <View style={{ width: 50 }} />
                                <View style={{ flex: 1 }}>
                                    <BigTextButton
                                        text={"Add Order"}
                                        backgroundColor={"#F13748"}
                                        additionalStyles={styles.buttonAdditionalStyle}
                                        borderRadius={26}
                                        height={45}
                                        fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                        fontSize={15}
                                        onPress={() => addOrder()}
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <BigTextButton
                                    text={"Later"}
                                    backgroundColor={"#fff"}
                                    additionalStyles={{borderColor: Color.COLOR.BLUE.LOTUS_BLUE, borderWidth: 1}}
                                    borderRadius={26}
                                    height={45}
                                    fontColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                    fontSize={15}
                                    onPress={() => onCloseModal()}
                                />
                            </View>
                            <View style={{ marginTop: 40, alignItems: 'center' }}>
                                <Text style={styles.activityText}>Other Activity</Text>
                            </View>
                        </View>
                        {/* {footerSec()} */}
                    </View>
                </ View >
            }
        />

    )
}

BravoModal.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    data: {},
    onCloseModal: () => { },
    onAddVisitNote: () => { },
    custAccessType: 0
}

BravoModal.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.instanceOf(Object),
    onCloseModal: PropTypes.func,
    onAddVisitNote: PropTypes.func,
    custAccessType: PropTypes.string,
}

export default BravoModal;