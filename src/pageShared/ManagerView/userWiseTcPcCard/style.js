
import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    noDataFoundSec: {
        paddingTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    noDataFound: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    //
    cardSection: {
        marginTop: 20,
        backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        padding: 15,
        borderRadius: 10
    },
    cardHeaderTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    labelIcon: {
        height: 18,
        width: 18,
        borderRadius: 5
    },
    labelTxt: {
        marginHorizontal: 7,
        color: Color.COLOR.GRAY.CORDUROY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    listItemSec: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameSec: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    nameTxt: {
        textAlign: 'right',
        color: Color.COLOR.GRAY.CORDUROY,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    mainBarSec: {
        flex: 0.8,
        borderLeftWidth: 0.5,
        borderLeftColor: Color.COLOR.BLACK.PURE_BLACK,
        marginLeft: 10
    },
    amountSec: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
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



})

export default styles