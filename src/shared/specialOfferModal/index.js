import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import { Modal, TextButton } from '..';
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
} from '../../enums';
import BigTextButton from '../big-text-button';

function SpecialOfferModal({
    modalPadding,
    isVisible,
    isHidden,
    isLoading,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing



    const _onClose = () => {
        onCloseModal();
    }

    const onBackDropPressModal = () => {
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        onBackButtonPress();
    }
    const onAvailModal = () => {
        onAvailButtonModal();
    }


    return (
        <Modal
            isVisible={isVisible}
            padding={modalPadding}
            onCloseModal={() => _onClose()}
            onAvailButtonModal={() => onAvailModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <View style={{ flexDirection: 'row', marginHorizontal: '5%', marginTop: 8 }}>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity style={styles.cancelSec}
                            activeOpacity={0.8}
                            onPress={() => _onClose()}>
                            <Image source={ImageName.WHITE_CROSS} style={styles.cancelImg} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainModalSec}>
                        <Text style={styles.modalHeaderText}>Special Offer</Text>
                        <Image source={ImageName.SPECIAL_OFFER_LOGO} style={{ height: 90, width: 90, resizeMode: 'contain', marginTop: 20 }} />
                        <Text style={styles.massegeText}>Get a 50% off and lorem lipsum dolor</Text>
                        <Text style={styles.modalsubText}>*Velid for only 48 hours</Text>
                    </View>
                    <View style={{ marginHorizontal: '10%', marginTop: 20, }}>
                        <BigTextButton
                            height={40}
                            borderRadius={16}
                            backgroundColor={"#3168ff"}
                            text={"Avail"}
                            onPress={() => onAvailModal()}
                        />
                    </View>
                </ View>
            }
        />
    );
}

SpecialOfferModal.defaultProps = {
    modalPadding: 0,
    isVisible: true,
    isHidden: false,
    isLoading: false,
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { }
};

SpecialOfferModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func
};


export default SpecialOfferModal;