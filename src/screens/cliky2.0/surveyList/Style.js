import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../enums";

const styles = StyleSheet.create({
    activetabText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.EXTRA_BOLD
    },

    inactivetabText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },

    tabSec: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    activeUnderline: {
        borderWidth: 1.1,
        borderColor: Color.COLOR.RED.AMARANTH,
        marginTop: 12,
        marginHorizontal: '2%'
    },

    inactiveUnderline: {
        borderWidth: 1.1,
        borderColor: Color.COLOR.GRAY.GRAY_COLOR,
        marginTop: 12,
        marginHorizontal: '2%'

    },
})

export default styles;