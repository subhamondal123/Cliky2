import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({

    dgmMtdView: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 5,
        padding: 5,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    dgmMtdText: {
        color: "#4488A9",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    mainCardSec: {
        backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        padding: 15,
        borderRadius: 10
    },
    headerTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    topSection: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    progressSection: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    prodVisitPrcntTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    visitTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    labelTxt: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    amountWithUnitTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    }


})

export default styles