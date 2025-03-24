import { PropTypes } from 'prop-types';
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { Modal } from "../../../shared";
import { Color, ImageName } from '../../../enums';
import { Image } from 'react-native';
import SvgComponent from '../../../assets/svg';

function StockUpdateSuccessfulModal({
    isHidden,
    isVisible,
    onCloseModal,
    props,


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
                        <View style={{ flex: 0.8 }} />
                        <TouchableOpacity style={{ flex: 0.2, alignItems: 'flex-end' }} activeOpacity={0.9} onPress={() => onRequestCloseModal()}>
                            <SvgComponent svgName={"cross"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={20} width={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                        <Image source={ImageName.STOCK_UPDATE_SUCCESSFUL_IMG} style={styles.updateStockImage} />
                        <View style={{ marginHorizontal: 40, marginTop: 10 }}>
                            <Text style={styles.headerText}>Successfully Update Stock</Text>
                        </View>
                        <Text style={styles.paragraphText}>You get</Text>
                        <Image source={ImageName.COINS_IMG} style={styles.coinImage}></Image>
                        <Text style={styles.pointText}>40 Points</Text>
                        <Text style={styles.paragraphText}>After approve by admin</Text>
                    </View>
                    <View style={{ marginBottom: 30 }} />
                </ View>
            }
        />

    )
}

StockUpdateSuccessfulModal.defaultProps = {
    isHidden: false,
    isVisible: false,
    onCloseModal: () => { },

}

StockUpdateSuccessfulModal.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    onCloseModal: PropTypes.func,
}

export default StockUpdateSuccessfulModal;

