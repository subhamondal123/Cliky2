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

function LogOutModal({
    modalPadding,
    isVisible,
    fontFamily,
    fontSize,
    color,
    isHidden,
    isLoading,
    onLogout,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing



    const _onClose = () => {
        onCloseModal();
    }

    const _onLogout = () => {
        onLogout();
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
                            <View style={styles.crossImgSec}>
                                <Image source={ImageName.LOGOUT_BLUE} style={styles.redCrossImg} />
                            </View>
                        </View>
                        {isLoading ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={styles.modalMainMarginSec}>
                                    <Text style={styles.headerModalText}>Are You Want to Logout ?</Text>
                                    <View style={{ flexDirection: 'row', marginTop: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.cancelButton}
                                            onPress={() => _onClose()}
                                            activeOpacity={0.9}>
                                            <Text style={styles.cancelText}>Cancel</Text>
                                        </TouchableOpacity>
                                        <View style={{ marginLeft: '5%' }} />
                                        <TouchableOpacity style={styles.logoutButton} onPress={() => _onLogout()} activeOpacity={0.9}>
                                            <Text style={styles.cancelText}>Logout</Text>
                                        </TouchableOpacity>
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

LogOutModal.defaultProps = {
    modalPadding: 0,
    isVisible: true,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    isLoading: false,
    onLogout: () => { },
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { }
};

LogOutModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    onLogout: PropTypes.func,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func
};


export default LogOutModal;