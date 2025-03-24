import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import styles from './style';
import { Modal, TextButton } from '../';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    AlertMessage,
    Color,
    FontFamily,
    FontSize,
    ImageName,
    OtherSize
} from '../../enums';

function ImageUploadModal({
    modalPadding,
    isVisible,
    fontFamily,
    fontSize,
    color,
    isHidden,
    onGallerySelect,
    onCameraSelect,
    hideModal,
    onCloseModal,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing


    const _onGallery = () => {
        onGallerySelect(false);
        // hideModal(false);
    }

    const _onCamera = () => {
        onCameraSelect(false);
        // hideModal(false);
    }

    const _onClose = () => {
        onCloseModal(false);
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
                <View style={styles.mainView}>
                    <TouchableOpacity style={{ backgroundColor: '#01497C', height: 25, width: 25, borderRadius: 50, alignSelf: 'flex-end', bottom: 20, left: 30, alignItems: "center", justifyContent: 'center' }} onPress={() => _onClose()} activeOpacity={0.9}>
                        <Image style={{ resizeMode: 'contain', height: 15, width: 15 }} source={ImageName.WHITE_CROSS} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: fontFamily, fontSize: fontSize, color: color }}>{AlertMessage.MESSAGE.CHOOSE_CAMERA_TYPE.SELECT}</Text>
                    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                        <TextButton
                            text={"Choose Gallery"}
                            onClickValue={() => _onGallery()}
                            color={Color.COLOR.BLUE.LAPIS_LAZULI}
                        />
                        <View style={{ width: '4%' }} />
                        <TextButton
                            text={"Choose Camera"}
                            onClickValue={() => _onCamera()}
                            color={Color.COLOR.BLUE.LAPIS_LAZULI}
                        />
                    </View>
                    <View style={{ marginBottom: '4%' }} />
                </View>
            }
        />
    );
}

ImageUploadModal.defaultProps = {
    modalPadding: 0,
    isVisible: true,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    onGallerySelect: () => { },
    onCameraSelect: () => { },
    onCloseModal: () => { },
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
};

ImageUploadModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    isHidden: PropTypes.bool,
    onGallerySelect: PropTypes.func,
    onCameraSelect: PropTypes.func,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func
};


export default ImageUploadModal;