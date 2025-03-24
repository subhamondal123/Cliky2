import { PropTypes } from 'prop-types';
import React from 'react'
import {
    View
} from 'react-native';
import CommonModal from '../modal';
import { Dimension } from '../../enums';

function BottomModal({
    isVisible,
    isHidden,
    containerStyle,
    aditionalMainViewStyle,
    borderRadius,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    children
}) {
    if (isHidden) return null;

    const onRequestCloseModal = () => {
        onRequestClose();
    }

    const onBackDropPressModal = () => {
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        onBackButtonPress();
    }

    const mainViewStyle = {
        justifyContent: 'center',
        maxHeight: Dimension.height - 40,
        borderRadius: borderRadius,
        bottom: 0,
        right: 0,
        left: 0,
        position: 'absolute',
        ...aditionalMainViewStyle
    }

    const mainContainerStyle = {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        ...containerStyle
    }



    return (
        <CommonModal
            isVisible={isVisible}
            additionalStyles={mainContainerStyle}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={mainViewStyle}>
                    {children}
                </View>
            }
        />
    )
}

BottomModal.defaultProps = {
    isVisible: false,
    isHidden: false,
    containerStyle: {},
    aditionalMainViewStyle: {},
    borderRadius: 0,
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    children: null
};

BottomModal.propTypes = {
    isVisible: PropTypes.bool,
    isHidden: PropTypes.bool,
    containerStyle: PropTypes.instanceOf(Object),
    aditionalMainViewStyle: PropTypes.instanceOf(Object),
    borderRadius: PropTypes.number,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    children: PropTypes.node
};


export default BottomModal;