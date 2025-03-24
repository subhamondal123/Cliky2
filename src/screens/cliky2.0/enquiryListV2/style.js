import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },

    backImg: {
        height: 25,
        width: 20,
        resizeMode: 'contain',
        marginTop: 10,
        flex: 1
    },

    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },


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
        borderWidth: 1.3,
        borderColor: Color.COLOR.GRAY.GRAY_COLOR,
        marginTop: 12,
        marginHorizontal: '2%'

    },

});

export default styles;