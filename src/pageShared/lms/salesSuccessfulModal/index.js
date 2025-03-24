import { PropTypes } from 'prop-types';
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import { Modal } from "../../../shared";
import { Color, ImageName } from '../../../enums';
import SvgComponent from '../../../assets/svg';

function ConfirmsalesSuccessfulModal({
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
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={ImageName.CONFIRM_SALES_SUCCESSFUL} style={styles.sendSuccessfulImage}></Image>
                        <Text style={styles.headerText}>Successfully Send</Text>
                        <View style={{ marginHorizontal: 50 }}>
                            <Text style={styles.paragraphText}>invoice confirmation to your customer</Text>
                        </View>
                        <View style={{ marginTop: 35 }} />
                        <Text style={styles.paragraphText}>You are about to get </Text>
                        <Image source={ImageName.COINS_IMG} style={styles.coinImage}></Image>
                        <Text style={styles.headerText}>40 Points</Text>
                        <View style={{ marginHorizontal: 45 }}>
                            <Text style={styles.paragraphText}>After confirm the invoice by your customer</Text>
                        </View>
                    </View>
                </ View>
            }
        />

    )
}

ConfirmsalesSuccessfulModal.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    data: "",
    onCloseModal: () => { },
    onFilter: () => { },
    onDataReset: () => { }
}

ConfirmsalesSuccessfulModal.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.string,
    onCloseModal: PropTypes.func,
    onFilter: PropTypes.func,
    onDataReset: PropTypes.func,
}

export default ConfirmsalesSuccessfulModal;

