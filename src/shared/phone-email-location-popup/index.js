import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import { Modal, TextButton } from '../';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    Linking
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
import Clipboard from '@react-native-community/clipboard';
import { Toaster } from '../../services/common-view-function';
import { Regex } from '../../services/config';

function PhoneEmailLocationPopup({
    modalPadding,
    isVisible,
    isHidden,
    onCloseModal,
    data,
    type,
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    useEffect(() => {

    });

    const _onClose = () => {
        onCloseModal(false);
    }

    const onRequestCloseModal = () => {
        onCloseModal();
    }

    const onBackDropPressModal = () => {
        onCloseModal();
    }

    const onBackButtonPressModal = () => {
        onCloseModal();
    }

    // const profileData = {
    //     "Name": "Profile Name*",
    //     "Email": "abcd12@gmail.com",
    // };

    const onClickData = () => {
        if (data.length > 0 && data !== "NA" && data !== "N/A" && data !== "na" && data !== "n/a") {
            try {
                if (type == "phone") {
                    // if (data.match(Regex.NUMBER_REGEX)) {
                    Linking.openURL('tel:' + data);
                    // }
                } else if (type == "email") {
                    if (data.match(Regex.EMAIL_REGEX)) {
                        Linking.openURL('mailto:' + data);
                    }
                } else if (type == "location") {
                    // Clipboard.setString(data);
                    // Toaster.ShortCenterToaster("Location Copied")
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Modal
            isVisible={isVisible}
            padding={modalPadding}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={{ backgroundColor: "#fff", minHeight: 180, maxHeight: 500, width: 250, borderRadius: 15, alignSelf: 'center' }}>
                    <Text
                        style={{
                            fontSize: 14,
                            // marginLeft: '3%',
                            marginTop: '3%',
                            fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
                            textAlign: 'center',
                            color: Color.COLOR.RED.AMARANTH
                        }}>
                        {type == "phone" ? "Phone Number Info"
                            : type == "email" ? "Email Info"
                                : type == "location" ? "Location Info"
                                    : null
                        }
                    </Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                        <View style={styles.viewImg}>
                            <Image
                                source={type == "phone" ? ImageName.PHONE
                                    : type == "email" ? ImageName.SECURED_LETTER
                                        : type == "location" ? ImageName.LOCATION_ADDRESS
                                            : null
                                }
                                style={styles.img} />
                        </View>
                        <View style={styles.allDetailsView}>
                            <View style={{ flex: 0.3, justifyContent: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        source={type == "phone" ? ImageName.CALL_BLACK
                                            : type == "email" ? ImageName.MAIL_ICON
                                                : type == "location" ? ImageName.LOCATION_BLACK
                                                    : null
                                        }
                                        style={{ height: 25, width: 25 }} />
                                </View>
                            </View>
                            <View style={styles.textSec}>
                                <Text style={styles.viewHeaderText}>
                                    {type == "phone" ? "Phone Number"
                                        : type == "email" ? "Email"
                                            : type == "location" ? "Location"
                                                : null
                                    }
                                </Text>
                                <Text style={styles.viewSubText}
                                    selectable={type == "location" && data.length > 0 && data !== "NA" && data !== "N/A" && data !== "na" && data !== "n/a" ? true : false}
                                    onPress={() => onClickData()}
                                >
                                    {data}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            }
        />
    );
}


PhoneEmailLocationPopup.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    isHidden: false,
    onCloseModal: () => { },
    data: "",
    type: "phone"
};

PhoneEmailLocationPopup.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    isHidden: PropTypes.bool,
    onCloseModal: PropTypes.func,
    data: PropTypes.string,
    type: PropTypes.string
};


export default PhoneEmailLocationPopup;