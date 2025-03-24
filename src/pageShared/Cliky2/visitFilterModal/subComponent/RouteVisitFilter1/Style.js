import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../../../enums";


const styles = StyleSheet.create({
    filterLineText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
    applyBtnTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
    resetBtn: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
    greaySec: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 10
    },
    greayBox: {
        // height: 40,
        backgroundColor: '#F0F4F7',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        flexDirection: 'row'
    },
    hafCircleGreay: {
        width: 40,
        // height: 40,
        backgroundColor: '#D1D1D1',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 20
    },
    boxTextSec: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
        paddingVertical:5,
        paddingRight:5
    },
    hafCircleGreen: {
        width: 40,
        // height: 40,
        backgroundColor: '#00B65E',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reasonText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,

    },
})

export default styles