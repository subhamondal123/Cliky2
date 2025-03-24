import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
    },

    profileLocTxt: {
        color: "#747C90",
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },

    billSec: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15
    },
    billImg: {
        height: 110,
        width: 140,
        resizeMode: "center"
    },
    billAmountTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 25,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        top: -5
    },
    checkBoxTxt: {
        marginLeft: 10,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.XS,
        color: Color.COLOR.BLACK.PURE_BLACK
    },

    selectActivePaymentMode: {
        height: 75,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#00B65E',
        borderRadius: 12,
        elevation: 1,
        marginHorizontal: 5,
        padding:10
    },
    inActivePaymentMode: {
        height: 75,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: 12,
        elevation: 1,
        marginHorizontal: 5,
        padding:10
    }




});

export default styles;