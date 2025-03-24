import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../../../enums";

const styles = StyleSheet.create({
    titleTxt: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.SM,
        color: "#63677A",
    },
    titleSection: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    mainImg: {
        height: 60,
        width: 60,
        resizeMode: "contain"
    },
    arrImg: {
        height: 50,
        width: 50,
        resizeMode: "contain",

    },
    dltImg: {
        height: 25,
        width: 25,
        resizeMode: "contain",
        marginHorizontal: 5
    },
    bottomTxt: {
        fontFamily: FontFamily.FONTS.INTER.LIGHT,
        fontSize: FontSize.XS,
        color: "#63677A",
        marginTop: 5
    },
    imgSec: {
        marginHorizontal: 10,
        alignItems: "center"
    },
    underline: {
        borderWidth: 0.5,
        borderColor: Color.COLOR.BLUE.KIMBERLY,
        backgroundColor: Color.COLOR.BLUE.KIMBERLY
    },
    totalTxt: {
        fontFamily: FontFamily.FONTS.INTER.EXTRA_BOLD,
        fontSize: FontSize.MD,
        color: Color.COLOR.BLACK.PURE_BLACK,
    },
    totalAmtTxt: {
        fontFamily: FontFamily.FONTS.INTER.EXTRA_BOLD,
        fontSize: FontSize.MD,
        color: Color.COLOR.RED.AMARANTH,
    },
    boxView: {
        padding: 6,
        backgroundColor: '#b4d6d2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 10,
        marginHorizontal: 5
    },
    textdate: {
        color: "#156A94",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    labelTxt: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.XS,
        color: Color.COLOR.BLACK.PURE_BLACK,
    },
    amountTxt: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.XS,
        color: Color.COLOR.RED.AMARANTH,
    },
    mainImageView: {
        flexDirection: 'row',
        marginTop: 10
    },
    TakephotoImg: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 15,
        backgroundColor: "#fff"
    },
    logisticImageView: {
        flex: 1,
        height: 100,
        borderRadius: 12,
    },
    flexANdMarginView: {
        flex: 0.33,
        marginHorizontal: '2%'
    },
    photoSec: {
        //  backgroundColor:"red",
        // justifyContent:"center",
        flexDirection: "row",
        // alignItems: 'center'
    },
})

export default styles;