import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../../../../../enums";

const styles = StyleSheet.create({
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
    allotedTxt: {
        fontSize: FontSize.SM,
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginLeft: 15
    },
    allotedAmt: {
        fontSize: FontSize.SM,
        color: Color.COLOR.BLUE.PACIFIC,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginLeft: 15,
    },
    whiteDeleteLogo: {
        height: 15,
        width: 15,
        resizeMode: "contain"
    },
    deleteLogoSec: {
        justifyContent: "center",
        backgroundColor: "#F76770",
        height: 24,
        width: 24,
        borderRadius: 12,
        alignItems: "center",

    },
    TakephotoImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 15,
        backgroundColor: "#fff"
    },
    flexANdMarginView: {
        flex: 0.33,
        marginHorizontal: '2%'
    },
    logisticImageView: {
        flex: 1,
        height: 100,
        borderRadius: 12,
    },
    addImgField: {
        height: 100,
        width: "100%",
        backgroundColor: "#E8E8E8",
        borderRadius: 10,
        marginTop: 15,
        borderColor: Color.COLOR,
        // borderWidth: 0.8,
        justifyContent: 'center',
        alignItems: "center",
        // borderStyle: "dashed"
    },

    addImg: {
        height: 100,
        width: 100,
        borderRadius: 15,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImgIcon: {
        height: 100,
        width: 100,
        resizeMode: 'contain'
    },
    mainView: {
        marginLeft: '3%',
        marginRight: '3%'
    },
    mainImageView: {
        flexDirection: 'row',
        marginTop: 20
    },
    imgUploadView: {
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        height: 80,
        width: 80,
        borderRadius: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tauchableSec: {
        height: 90,
        width: 90,
        borderRadius: 60,
        borderColor: Color.COLOR.BLUE.VIOLET_BLUE,
        borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
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
    downArrowImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    }


})

export default styles;
