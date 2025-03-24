import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import { Modal, TextButton } from '../';
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

function CongratulationModal({
    modalPadding,
    isVisible,
    fontFamily,
    fontSize,
    color,
    isHidden,
    isLoading,
    okModalClose,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing



    const _onClose = () => {
        onCloseModal();
    }

    const onOkCloseModal = () => {
        okModalClose();
    }

    const onBackDropPressModal = () => {
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        onBackButtonPress();
    }


    return (
        <Modal
            isVisible={isVisible}
            padding={modalPadding}
            // okModalClose={() => onOkCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <View style={{ flexDirection: 'row', marginHorizontal: '5%', marginTop: 8 }}>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity style={styles.cancelSec}
                            activeOpacity={0.8}
                            onPress={() => onOkCloseModal()}>
                            <Image source={ImageName.WHITE_CROSS} style={styles.cancelImg} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: '5%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.modalHeaderText}>Congratulations!</Text>
                        <Image source={ImageName.BATCH_LOGO} style={{ height: 90, width: 90, resizeMode: 'contain' }} />
                        <Text style={styles.modalsubText}>Start Survey Successfully</Text>
                        <Text style={{ color: Color.COLOR.GRAY.SONIC_SILVER, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM, textAlign: 'center', marginTop: 8 }}>Lorem Ipsum is simply dummy text of the printing industry.</Text>
                    </View>
                    <View style={{ marginHorizontal: '10%', marginTop: 10, }}>
                        <BigTextButton
                            height={40}
                            borderRadius={16}
                            backgroundColor={"#3168ff"}
                            text={"OK"}
                            onPress={() => onOkCloseModal()}
                        />
                    </View>
                </ View>
            }
        />
    );
}

CongratulationModal.defaultProps = {
    modalPadding: 0,
    isVisible: true,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    isLoading: false,
    okModalClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { }
};

CongratulationModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    okModalClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func
};


export default CongratulationModal;