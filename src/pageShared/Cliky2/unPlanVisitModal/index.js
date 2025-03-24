import { PropTypes } from 'prop-types';
import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { Color, Dimension, ImageName } from "../../../enums";
import styles from "./style";
import { BottomModal, SwipeButton } from "../../../shared";
import SvgComponent from "../../../assets/svg";

function UnplanVisitModal({
    isHidden,
    isVisible,
    isLoading,
    type,
    data,
    onCloseModal,
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

    return (
        <BottomModal
            isVisible={isVisible}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ height: 28, width: 28, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#e06336' }}>
                                    <SvgComponent svgName={"location_with_route"} strokeColor={Color.COLOR.WHITE.PURE_WHITE} height={15} width={15} />
                                </View>
                                <View style={styles.userTextSec}>
                                    <Text style={styles.nameText}>Unplanned Visit</Text>
                                </View>
                                <TouchableOpacity style={styles.cancelView} onPress={() => onRequestCloseModal()} >
                                    <SvgComponent svgName={"cross"} strokeColor={Color.COLOR.WHITE.PURE_WHITE} height={15} width={15} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 20 }} />
                            <TouchableOpacity style={styles.grayBox} onPress={() => onExisitingVisit()} activeOpacity={0.9}>
                                <View style={{ marginLeft: 10 }}>
                                    <SvgComponent svgName={"shop"} strokeColor={"#000"} height={25} width={25} />
                                </View>
                                <View style={{ marginLeft: 15, flex: 1 }}>
                                    <Text style={styles.visitText}>Existing Visit</Text>
                                    <Text style={styles.dText}>unplanned visit for existing customer</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.grayBox} onPress={() => onNewVisit()} activeOpacity={0.9}>
                                <View style={{ marginLeft: 10 }}>
                                    <SvgComponent svgName={"locationSlash"} strokeColor={"#000"} height={25} width={25} />
                                </View>
                                <View style={{ marginLeft: 15, flex: 1 }}>
                                    <Text style={styles.visitText}>New Visit</Text>
                                    <Text style={styles.dText}>unplanned visit for new customer</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 60 }} />

                    </View>
                </ View >
            }
        />

    )
}

UnplanVisitModal.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    data: "",
    onCloseModal: () => { },
}

UnplanVisitModal.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.string,
    onCloseModal: PropTypes.func,
}

export default UnplanVisitModal;