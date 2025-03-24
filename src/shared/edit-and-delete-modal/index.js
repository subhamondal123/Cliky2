import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
// import styles from './style';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { Color, Dimension, FontFamily, ImageName } from '../../enums';
import Modal from '../modal';
import BigTextButton from '../big-text-button'
import styles from './style';

function EditAndDeleteModal({
    type,
    isVisible,
    isLoading,
    onCancel,
    onDelete,
    onEdit,
    onFavourite,
    messageText,
}) {

    const onClick = () => {
        onPress();
    }

    const onRequestCloseModal = () => {
        onCancel();
    }

    const onBackDropPressModal = () => {
        onCancel();
    }

    const onBackButtonPressModal = () => {
        onCancel();
    }

    const onClose = () => {
        onCancel();
    }

    const onCancelModal = () => {
        onCancel();
    }

    const onDeletePress = () => {
        onDelete();
    }

    const onEditPress = () => {
        onEdit();
    }
    
    const onFavouritePress = () => {
        onFavourite();
    }

    return (
        <Modal
            isVisible={isVisible}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    {type == "delete" ?
                        <React.Fragment>
                            <View style={styles.modalHeaderSec}>
                                <TouchableOpacity
                                    style={styles.crossImgSec}
                                    onPress={() => onClose()}
                                    activeOpacity={0.9}>
                                    <Image source={ImageName.CROSS_IMG} style={styles.redCrossImg} />
                                </TouchableOpacity>
                            </View>
                            {isLoading ?
                                <View style={{ height: 158, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator
                                        color={Color.COLOR.GRAY.GRAY_COLOR}
                                        size={'large'}
                                    />
                                </View>
                                :
                                <React.Fragment>
                                    <View style={{ height: 158 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 20 }}>
                                            <Image
                                                source={ImageName.DELETE_WITH_RED}
                                                style={{ height: 30, width: 30, resizeMode: 'contain' }}
                                            />
                                            <View style={{ height: 10 }} />
                                            <Text style={{
                                                textAlign: 'center',
                                                fontFamily: FontFamily.FONTS.INTER.BOLD,
                                                fontSize: 13,
                                                marginHorizontal: 10,
                                                color: Color.COLOR.BLACK.PURE_BLACK
                                            }}>
                                                Are you sure want to delete?
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginHorizontal: "5%", marginBottom: 20 }}>
                                            <BigTextButton
                                                // borderRadius={30}
                                                height={40}
                                                backgroundColor={Color.COLOR.GRAY.GRAY_TINTS}
                                                text={"Cancel"}
                                                onPress={() => onCancelModal()}
                                            />
                                            <View style={{ width: "5%" }} />
                                            <BigTextButton
                                                // borderRadius={30}
                                                height={40}
                                                backgroundColor={Color.COLOR.RED.RED_ORANGE}
                                                text={"Delete"}
                                                onPress={() => onDeletePress()}
                                            />
                                        </View>
                                    </View>
                                </React.Fragment>
                            }
                        </React.Fragment>
                        : type == "edit" ?
                            <React.Fragment>
                                <View style={[styles.modalHeaderSec, { backgroundColor: Color.COLOR.RED.AMARANTH }]}>
                                    <TouchableOpacity
                                        style={styles.crossImgSec}
                                        onPress={() => onClose()}
                                        activeOpacity={0.9}>
                                        <Image source={ImageName.CROSS_IMG} style={styles.redCrossImg} />
                                    </TouchableOpacity>
                                </View>
                                {isLoading ?
                                    <View style={{ height: 158, justifyContent: 'center', alignItems: 'center' }}>
                                        <ActivityIndicator
                                            color={Color.COLOR.GRAY.GRAY_COLOR}
                                            size={'large'}
                                        />
                                    </View>
                                    :
                                    <React.Fragment>
                                        <View style={{ height: 158 }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 20 }}>
                                                <Image
                                                    source={ImageName.EDIT}
                                                    style={{ height: 30, width: 30, resizeMode: 'contain' }}
                                                />
                                                <View style={{ height: 10 }} />
                                                <Text style={{
                                                    textAlign: 'center',
                                                    fontFamily: FontFamily.FONTS.INTER.BOLD,
                                                    fontSize: 16,
                                                    color: Color.COLOR.BLACK.PURE_BLACK,
                                                    marginHorizontal: 10
                                                }}>
                                                    Are you sure want to edit?
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginHorizontal: "5%", marginBottom: 20 }}>
                                                <BigTextButton
                                                    // borderRadius={30}
                                                    height={40}
                                                    backgroundColor={Color.COLOR.GRAY.GRAY_TINTS}
                                                    text={"Cancel"}
                                                    onPress={() => onCancelModal()}
                                                />
                                                <View style={{ width: "5%" }} />
                                                <BigTextButton
                                                    // borderRadius={30}
                                                    height={40}
                                                    // backgroundColor={Color.COLOR.RED.RED_ORANGE}
                                                    text={"Edit"}
                                                    onPress={() => onEditPress()}
                                                />
                                            </View>
                                        </View>
                                    </React.Fragment>
                                }

                            </React.Fragment>
                            :
                            <React.Fragment>
                                <View style={[styles.modalHeaderSec, { backgroundColor: Color.COLOR.BLUE.CAPRI }]}>
                                    <TouchableOpacity
                                        style={styles.crossImgSec}
                                        onPress={() => onClose()}
                                        activeOpacity={0.9}>
                                        <Image source={ImageName.CROSS_IMG} style={styles.redCrossImg} />
                                    </TouchableOpacity>
                                </View>
                                {isLoading ?
                                    <View style={{ height: 158, justifyContent: 'center', alignItems: 'center' }}>
                                        <ActivityIndicator
                                            color={Color.COLOR.GRAY.GRAY_COLOR}
                                            size={'large'}
                                        />
                                    </View>
                                    :
                                    <React.Fragment>
                                        <View style={{ height: 158 }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 20 }}>
                                                <Image
                                                    source={ImageName.YELLOW_STAR}
                                                    style={{ height: 30, width: 30, resizeMode: 'contain' }}
                                                />
                                                <View style={{ height: 10 }} />
                                                <Text style={{
                                                    textAlign: 'center',
                                                    fontFamily: FontFamily.FONTS.INTER.BOLD,
                                                    fontSize: 13,
                                                    color: Color.COLOR.BLACK.PURE_BLACK,
                                                    marginHorizontal: 10
                                                }}>
                                                    {messageText}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginHorizontal: "5%", marginBottom: 20 }}>
                                                <BigTextButton
                                                    // borderRadius={30}
                                                    height={40}
                                                    backgroundColor={Color.COLOR.GRAY.GRAY_TINTS}
                                                    text={"Cancel"}
                                                    onPress={() => onCancelModal()}
                                                />
                                                <View style={{ width: "5%" }} />
                                                <BigTextButton
                                                    // borderRadius={30}
                                                    height={40}
                                                    // backgroundColor={Color.COLOR.RED.RED_ORANGE}
                                                    text={"Ok"}
                                                    onPress={() => onFavouritePress()}
                                                />
                                            </View>
                                        </View>
                                    </React.Fragment>
                                }
                            </React.Fragment>
                    }
                </View>
            }

        />
    )
}

EditAndDeleteModal.defaultProps = {
    type: "edit",
    isVisible: false,
    isLoading: false,
    messageText:"",
    onCancel: () => { },
    onDelete: () => { },
    onEdit: () => { },
    onFavourite: () => { }
}

EditAndDeleteModal.propTypes = {
    type: PropTypes.string,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onFavourite:PropTypes.func,
    messageText:PropTypes.string
}

export default EditAndDeleteModal;