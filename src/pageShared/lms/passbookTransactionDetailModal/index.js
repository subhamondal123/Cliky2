import { PropTypes } from 'prop-types';
import React from 'react'
import styles from './style';
import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,

} from 'react-native';
import { Color, FontFamily, ImageName } from '../../../enums';
import { Modal } from '../../../shared';
import SvgComponent from '../../../assets/svg';

function PassbookTransactionDetailsModal({
    data,
    isVisible,
    onCloseModal,
    isHidden,

}) {
    if (isHidden) return null;

    const onClose = () => {
        onCloseModal()
    }

    return (
        <SafeAreaView>
            <React.Fragment>
                <Modal
                    isVisible={isVisible}
                    // padding={modalPadding}
                    onRequestClose={() => onClose()}
                    onBackdropPress={() => onClose()}
                    onBackButtonPress={() => onClose()}
                    children={
                        <View style={styles.modalview}>
                            <React.Fragment>
                                <View style={styles.modalHeaderSec}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 16 }}>Transaction Detail</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.crossImgSec}
                                        activeOpacity={0.9}
                                        onPress={() => onClose()}>
                                        <Image source={ImageName.CROSS_IMG} style={styles.redCrossImg} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "flex-start", marginHorizontal: 15, marginTop: 20 }}>
                                    <SvgComponent svgName={"lmsUser"} strokeColor={"#292D32"} height={18} width={18} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: 14 }}>Reference Point</Text>
                                        <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.MEDIUM, fontSize: 12 }}>Joydeb Roy</Text>
                                        <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.MEDIUM, fontSize: 14, marginTop: 20 }}>Mason</Text>

                                    </View>
                                    <View style={{ flex: 1 }} />
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <SvgComponent svgName={"unlock"} strokeColor={"#61C234"} height={18} width={18} />
                                        <SvgComponent svgName={"greenDownArrow"} strokeColor={"#61C234"} height={14} width={14} />
                                        <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.MEDIUM, fontSize: 12, marginLeft: 5 }}>20</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 15, marginTop: 20 }}>
                                    <SvgComponent svgName={"lmsCalender"} strokeColor={"#292D32"} height={18} width={18} />
                                    <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.MEDIUM, fontSize: 14, marginLeft: 10 }}>20th January 2023</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "flex-start", marginHorizontal: 15, marginTop: 20 }}>

                                    <SvgComponent svgName={"locationWithBGColor"} strokeColor={"#292D32"} height={18} width={18} />
                                    <View>
                                        <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: 14, marginLeft: 10 }}>WB | Bankura | Zone 2</Text>
                                        <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.MEDIUM, fontSize: 12, marginLeft: 10 }}>Flat No. 4B, Block A</Text>
                                    </View>
                                </View>


                                <View style={{ height: 20 }} />
                            </React.Fragment>
                        </View>
                    }
                />
            </React.Fragment >
        </SafeAreaView >
    );

}

PassbookTransactionDetailsModal.defaultProps = {
    isHidden: false,
    isVisible: false,
    data: {},
    onSelectTab: () => { }
};

PassbookTransactionDetailsModal.propTypes = {
    data: PropTypes.instanceOf(Object),
    isVisible: PropTypes.bool,
    isHidden: PropTypes.bool,
    onSelectTab: PropTypes.func
};


export default PassbookTransactionDetailsModal;