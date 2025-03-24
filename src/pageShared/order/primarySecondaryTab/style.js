import { StyleSheet } from "react-native"
import { Color, FontFamily, FontSize } from "../../../enums"

const styles = StyleSheet.create({

    activetabText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    inactivetabText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    activeLeftTabSec: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        paddingVertical: 10
    },
    inactiveLeftTabSec: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F0F4F7",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        paddingVertical: 10
    },
    activeRightTabSec: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        paddingVertical: 10
    },
    inactiveRightTabSec: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F0F4F7",
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        paddingVertical: 10
    },
})

export default styles