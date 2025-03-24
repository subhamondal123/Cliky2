import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    dgmMtdView: {
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
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
    headerTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        textAlign: "center"
    },
    iconSec: {
        paddingLeft: 10,
        alignItems: "flex-end",
        alignSelf: "flex-end"
    },
    threeDotImg: {
        height: 30,
        width: 30,
        resizeMode: "contain"
    },
    noDataFound: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    noDataFoundSec: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15
    },
    totalAmountSec: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.COLOR.RED.AMARANTH,
        padding: 15,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    totalTxt: {
        flex: 1,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    netAmountTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    }
})

export default styles