import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // height: Dimension.height,
        // flex: 1
    },

    touchableBox: {
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        flex: 1
    },

    textPayment: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginLeft: '8%'
    },

    yellowCircel: {
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS
    },

    whiteEdit: {
        height: 15,
        width: 15,
        resizeMode: 'contain'
    },


});

export default styles;