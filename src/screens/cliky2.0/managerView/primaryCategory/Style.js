import { StyleSheet } from "react-native";
import { Color, FontFamily } from "../../../../enums";
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    progressTxtContain: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pieTxtContain: {
        position: 'absolute',
        width: 100,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    crTxt: {
        color: '#1F2B4D',
        fontWeight: '600',
        fontSize: 15
    },
    totalTxt: {
        color: '#747C90',
        fontWeight: '400',
        fontSize: 11
    },
    mtdTxt: {
        color: '#747C90',
        fontWeight: '400',
        fontSize: 11
    },
    titleTxt: {
        color: '#747C90',
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontWeight: '600'
    },
    salesSec: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        flex: 0.2
    },
    amountTxt: {
        color: '#1F2B4D',
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    amountLabelTxt: {
        color: '#1F2B4D',
        fontSize: 10,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    }

})
export default styles;