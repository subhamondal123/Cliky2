import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, OtherSize, Padding, Dimension } from '../../enums/';

const styles = StyleSheet.create({


    // Modal Section Start
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: 55,
        borderRadius: 12,
        maxHeight: Dimension.height,
        right: 0,
        left: 0,
        marginHorizontal: "5%",
    },
    cancelSec: {
        height: 22,
        width: 22,
        borderRadius: 14,
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    modalHeaderText: {
        color: Color.COLOR.BLUE.VIOLET_BLUE,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textAlign: 'center',
        // top: -7
    },
    modalsubText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textAlign: 'center',
        // marginTop: 5
    },



})

export default styles;