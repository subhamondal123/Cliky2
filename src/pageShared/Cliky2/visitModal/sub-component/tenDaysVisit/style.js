import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../../enums";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimension.height,
        width: Dimension.width,
        backgroundColor: '#ffffff'
    },

    secInfo: {
        height: 50,
        backgroundColor: '#F0F4F7',
        marginTop: 10,
        borderRadius: 10,
        flexDirection: 'row'
    },

    secImg: {
        backgroundColor: '#F13748',
        width: 25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10
    },

    secGreenImg: {
        backgroundColor: '#00B65E',
        width: 25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10
    },

    img: {
        width: 15,
        height: 15,
    },

    textSec: {
        justifyContent: 'center',
        marginLeft: 10
    },
    noOrderText: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.XS,
        color: '#1F2B4D'
    },
    noOrderText: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.XS,
        color: '#1F2B4D'
    },

    mainView: {
        marginHorizontal: '5%',
        marginTop: 15,
        backgroundColor: "#F0F4F7",
        borderRadius: 10
    },
    visitText: {
        color: "#747C90",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        marginRight: 15
    },
    canderDateText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        marginLeft: 15
    },
    allText: {
        color: "#747C90",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },
    deliverText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },

    qtyText: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },
    valueText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },


})

export default styles;