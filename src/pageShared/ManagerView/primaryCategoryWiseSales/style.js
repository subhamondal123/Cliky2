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
    cardSection: {
        marginVertical: 20,
        backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        padding: 15,
        borderRadius: 10
    },
    headerSec: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: "center"
    },
    headerTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    totalMtdTxt: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    totalAmtUnitTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    listItemSec: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 160
    },
    titleSec: {
        width: "50%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    titleMainSec: {

        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    amountSec: {
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    amountPercentageTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    amountTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    titleTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 10,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    }
})

export default styles