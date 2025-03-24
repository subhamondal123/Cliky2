import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import { Modal, TextButton, CheckBox } from '../';
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
    Dimension,
    FontFamily,
    FontSize,
    ImageName,
    OtherSize
} from '../../enums';
import BigTextButton from '../big-text-button';
import { CommonFunctions } from '../../services/common-view-function';
import { modifyData } from './function';

function DetailsModal({
    modalPadding,
    isVisible,
    onCloseModal,
    data,
    type,
    onCheck,
    onContinue
}) {

    const _onClose = () => {
        onCloseModal();
    }

    const onRequestCloseModal = () => {
        onCloseModal()
    }


    const onBackDropPressModal = () => {
        onCloseModal();
    }

    const onBackButtonPressModal = () => {
        onCloseModal();
    }


    const _boxSection = () => {

        let modData = CommonFunctions.modifyArrIntoTwoObjArrList(data);
        const onClickCheck = (subItem, subKey) => {
            onCheck(subItem);
        }

        return (
            <React.Fragment>
                {modData.map((item, key) =>
                    <React.Fragment key={key}>
                        <View style={styles.flexView}>
                            {item.map((subItem, subKey) =>
                                <React.Fragment key={subKey}>
                                    <View style={{ marginHorizontal: '4%', marginTop: 15 }}>
                                        <View style={styles.visiableBox} >
                                            <View style={styles.imageSec}>
                                                <Image source={subItem.imageName} style={styles.logoImg} />
                                            </View>
                                            <Text style={styles.boxUnderText}>{subItem.boxName}</Text>
                                            <View style={{ top: 28 }}>
                                                <CheckBox
                                                    type={"tick"}
                                                    borderRadius={35}
                                                    // borderColor={"#000"}
                                                    backgroundColor={"#fff"}
                                                    data={subItem.check}
                                                    onClickValue={() => onClickCheck(subItem, subKey)}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </React.Fragment>
                            )}
                        </View>
                    </React.Fragment>
                )}
            </React.Fragment >
        )
    }

    const _onPressContinue = () => {
        onContinue();
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
                    <View style={{ marginHorizontal: '15%', marginTop: 10, flexDirection: 'row' }}>
                        <Text style={styles.headerText}>Lorem ipsum dolor sit amet</Text>
                        <View style={styles.marginView}>
                            <TouchableOpacity style={styles.cancelSec}
                                activeOpacity={0.8}
                                onPress={() => _onClose()}  >
                                <Image source={ImageName.WHITE_CROSS} style={styles.cancelImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {_boxSection()}
                    <View style={{ marginHorizontal: '10%', marginTop: 35 }}>
                        <BigTextButton
                            height={40}
                            borderRadius={16}
                            backgroundColor={"#3a34eb"}
                            text={"Continue"}
                            onPress={() => _onPressContinue()}
                        />
                    </View>

                    <View style={{ marginBottom: 30 }} />
                </View>
            }
        />
    );
}


DetailsModal.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    onCloseModal: () => { },
    data: [],
    type: "",
    onCheck: () => { },
    onContinue: () => { }
};

DetailsModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    onCloseModal: PropTypes.func,
    data: PropTypes.array,
    type: PropTypes.string,
    onCheck: PropTypes.func,
    onContinue: PropTypes.func
};


export default DetailsModal;