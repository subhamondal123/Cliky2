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

function ProfileModal({
    modalPadding,
    isVisible,
    fontFamily,
    fontSize,
    color,
    isHidden,
    onCloseModal,
    data,
    type,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    useEffect(() => {

    });

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

    // const profileData = {
    //     "Name": "Profile Name*",
    //     "Email": "abcd12@gmail.com",
    // };

    const ViewListData = () => {
        return (
            <View>
                <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                    <Text style={styles.headerText}>Name</Text>
                    <Text style={styles.subText}>{data.name}</Text>
                    <View style={styles.underLine} />
                </View>
                <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                    <Text style={styles.headerText}>Email</Text>
                    <Text style={styles.subText}>{data.email}</Text>
                    <View style={styles.underLine} />
                </View>
                <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                    <Text style={styles.headerText}>Phone</Text>
                    <Text style={styles.subText}>{data.phone}</Text>
                    <View style={styles.underLine} />
                </View>
            </View>

        );
    }
    
    const ViewOrganizationData = () => {
        let allProfileData = [];
        let i = 0;
        if (Object.keys(data).length > 0) {
            for (let [key, value] of Object.entries(data)) {
                i++;
                allProfileData.push(
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }} key={i}>
                        <Text style={styles.headerText}>{key}</Text>
                        <Text style={styles.subText}>{value}</Text>
                        <View style={styles.underLine} />
                    </View>
                )
            }
        }
        return (
            allProfileData
        );
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
                    <View style={styles.modalHeaderSec}>
                        <View style={styles.marginView}>
                            <Text style={styles.profileNameText}>Profile Info</Text>
                            <TouchableOpacity style={styles.cancelSec}
                                activeOpacity={0.8}
                                onPress={() => _onClose()}  >
                                <Image source={ImageName.CROSS_IMG} style={styles.cancelImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <Image source={data.imageUrl ? data.imageUrl : ImageName.NO_IMG} style={styles.profileImg} />
                        <Text style={styles.textProfileName}>USER NAME</Text>
                    </View>
                    <View style={{ maxHeight: Dimension.height / 2 }}>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            {type == "profile" ? ViewListData() : type == "organization" ? ViewOrganizationData() : null}
                        </ScrollView>
                    </View>

                </View>
            }
        />
    );
}


ProfileModal.defaultProps = {
    modalPadding: 0,
    isVisible: true,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    onCloseModal: () => { },
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    data: {
        // imageUrl: ImageName.ADD_ICON,
        name: "User",
        email: "user@mail.com",
        phone: "9999999999",
    },
    type: ""
};

ProfileModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    isHidden: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func,
    data: PropTypes.object,
    type: PropTypes.string
};


export default ProfileModal;