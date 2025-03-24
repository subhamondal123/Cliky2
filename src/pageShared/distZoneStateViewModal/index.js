import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize,
    ImageName
} from '../../enums';
import { Loader, Modal, NormalLoader } from '../../shared';
import { CustomStyle } from '../../screens/style';
import { MiddlewareCheck } from '../../services/middleware';

function DistZoneStateViewModal({
    modalPadding,
    isVisible,
    data,
    isHidden,
    // onRequestClose,
    // onBackdropPress,
    // onBackButtonPress,
    onCloseModal,
    headerText,
    props
}) {
    if (isHidden) return null;
    const [customerLoder, setCustomerLoader] = useState(true);
    const [allItems, setAllItems] = useState([]);


    useEffect(() => {
        getCustomerData()
    }, [])


    const getCustomerData = async () => {
        setCustomerLoader(true);

        let itemArr = data.split(",");
        setAllItems(itemArr);

        setCustomerLoader(false);

    }

    const _onClose = () => {
        onCloseModal(false);
    }

    const onRequestCloseModal = () => {
        _onClose();
    }

    const onBackDropPressModal = () => {
        _onClose();
    }

    const onBackButtonPressModal = () => {
        _onClose();
    }

    const allItemSection = (item) => {
        let allItems = []
        for (let [key, value] of Object.entries(item)) {
            allItems.push(
                <View style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    alignItems: 'center',
                }} key={key}>
                    <Text style={styles.subTextName}>{value}</Text>
                    {item.length - 1 == key ?
                        <>
                            {item.length > 1 ?
                                <View style={{ height: 15 }} />
                                :
                                null
                            }
                        </>
                        :
                        <View style={{}} />
                    }
                </View>
            )
        }
        return (
            allItems
        );
    }



    return (
        <SafeAreaView>
            <Modal
                isVisible={isVisible}
                padding={modalPadding}
                onRequestClose={() => onRequestCloseModal()}
                onBackdropPress={() => onBackDropPressModal()}
                onBackButtonPress={() => onBackButtonPressModal()}
                children={
                    <View style={styles.modalView}>
                        <View style={{
                            backgroundColor: Color.COLOR.RED.AMARANTH,
                            alignItems: 'center',
                            paddingVertical: 10,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                        }}>
                            <Text style={[CustomStyle.headerText, { color: "#ffffff" }]}>{headerText}</Text>
                        </View>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            {customerLoder ?
                                <View style={{
                                    backgroundColor: "#ffffff",
                                    alignItems: 'center',
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10
                                }}>
                                    <NormalLoader />
                                </View>
                                :
                                <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                                    {allItemSection(allItems)}
                                </View>
                            }
                        </ScrollView>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

DistZoneStateViewModal.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    isHidden: false,
    data: "",
    headerText: "",
    onCloseModal: () => { },
    // onRequestClose: () => { },
    // onBackdropPress: () => { },
    // onBackButtonPress: () => { },
};

DistZoneStateViewModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    data: PropTypes.string,
    isHidden: PropTypes.bool,
    headerText: PropTypes.string,
    // onRequestClose: PropTypes.func,
    // onBackdropPress: PropTypes.func,
    // onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func
};


export default DistZoneStateViewModal;