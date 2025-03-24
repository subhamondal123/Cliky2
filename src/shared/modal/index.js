import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import Modal from "react-native-modal";

function CommonModal({
    children,
    isHidden,
    isVisible,
    additionalStyles,
    padding,
    margin,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    transparent
}) {

    if (isHidden) return null;

    // const [visible, setVisible] = useState(isVisible);

    const containerStyle = {
        padding: padding,
        margin: margin,
        ...additionalStyles
    };

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
            style={containerStyle}
            animationType="fade"
            transparent={transparent}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}>
            {children}
        </Modal>
    );
}

CommonModal.defaultProps = {
    children: null,
    isHidden: false,
    isVisible: false,
    additionalStyles: {},
    padding: 20,
    margin: 0,
    transparent: true,
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
};

CommonModal.propTypes = {
    children: PropTypes.node,
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool.isRequired,
    additionalStyles: PropTypes.instanceOf(Object),
    padding: PropTypes.number,
    margin: PropTypes.number,
    transparent: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
};


export default CommonModal;