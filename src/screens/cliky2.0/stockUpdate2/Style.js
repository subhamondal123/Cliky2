import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        // flex: 1
        paddingHorizontal:15
    },

    timeSec: {
        height: 60,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textTime: {
        color: Color.COLOR.GRAY.CORDUROY,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },

    flexANdMarginView: {
        flex: 0.5,
        marginHorizontal: '2%',
    },

    crossBtnImg: {
        backgroundColor: Color.COLOR.GRAY.SONIC_SILVER,
        height: 20,
        width: 20,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    crossImg: {
        resizeMode: 'contain',
        height: 17,
        width: 17
    },

});

export default styles;