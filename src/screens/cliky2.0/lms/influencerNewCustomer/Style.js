import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../enums";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimension.height,
        width: Dimension.width,
        backgroundColor: '#ffffff'
    },

    activeBoxshadowColor: {
        marginTop: 15,
        marginHorizontal: 5
    },

    dashUnderline: {
        borderStyle: 'dashed',
        borderColor: Color.COLOR.BLUE.LOTUS_BLUE,
        borderWidth: 0.7,
        marginHorizontal: 8
    },

    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 5,
    },

    blueBox: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        height: 80,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
    },

    mainTraderView: {
        marginHorizontal: 10,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    numberViewSec: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 24,
        borderColor: '#000',
        borderWidth: 0.5
    },
    textNumber: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

})

export default styles;