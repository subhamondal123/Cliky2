const { StyleSheet } = require("react-native");
const { Color, FontSize, FontFamily, Dimension } = require("../../../enums");

const styles = StyleSheet.create({
    headerTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    btn: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    btnView: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25
    },

    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: Dimension.width / 1.02,
        // maxHeight: Dimension.height / 1.2,
        alignSelf: 'center',
        bottom: 0,
        position: 'absolute',
    },
    dropdownSec: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        height: 28,
        width: 28,
        backgroundColor: '#9298a9',
        borderRadius: 100,
        marginTop: 10,
        alignSelf: "flex-end"
    },
    crossIcon: {
        width: 30,
        height: 30,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    textDealer: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
})

export default styles;