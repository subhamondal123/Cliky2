import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import {
    ImageBackground,
    TouchableOpacity,
    View,
} from 'react-native';
import { Modal } from '../../../shared';
import styles from './Style';
import { Text } from 'react-native';
import { Dimension, ImageName } from '../../../enums';
import SvgComponent from '../../../assets/svg';
import { App_uri } from '../../../services/config';

function FilterModal({
    modalPadding,
    isVisible,
    isHidden,
    data,
    isLoading,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal,
    props
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    const [filterLoader, setFilterLoader] = useState(false);


    useEffect(() => {
    }, [])

    const _onClose = () => {
        onCloseModal();

    }
    const onRequestCloseModal = () => {
        // onRequestClose();
        onCloseModal();
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
            // onRequestClose={() => onRequestCloseModal()}
            // onBackdropPress={() => onBackDropPressModal()}
            // onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    {/* <ImageBackground borderRadius={20} source={ImageName.LMS_BANNER} style={{ height: 680, width: Dimension.width - 50, resizeMode: "cover" }}> */}
                    <ImageBackground borderRadius={20} source={{ uri: App_uri.LMS_IMAGE_VIEW_URI + data.image }} style={{ height: 680, width: Dimension.width - 50, resizeMode: "cover" }}>

                        <TouchableOpacity style={{ marginTop: 30, marginRight: 30, left: 0, alignItems: "flex-end", alignSelf: "flex-end" }} activeOpacity={0.9} onPress={() => onCloseModal()}>
                            <SvgComponent svgName={"cross"} strokeColor={"#fff"} height={15} width={15} />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            }
        />
    );
}

FilterModal.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    data: {},
    isHidden: false,
    isLoading: false,
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { },

};

FilterModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func,
    data: PropTypes.object,
};


export default FilterModal;