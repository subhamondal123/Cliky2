import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../enums";

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        height: Dimension.height,

    },
    keyboardStyle:{
        backgroundColor: '#fff',
        flex:1
    },


    inputBoxStyle: {
        height: 45,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputBoxText: {
        fontSize: FontSize.SM,
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1
    },

    crossBtnImg: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        height: 18,
        width: 18,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    reasonShortName: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD
    },

    activeReasonShortName: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD
    },

    circelView: {
        backgroundColor: Color.COLOR.GREEN.SEA_GREEN,
        height: 22,
        width: 22,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    leaveCount: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginTop: 1
    },

    reasonText: {
        color: "#747C90",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    activeReasonText: {
        color: "#fff",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    }


});

export default styles;