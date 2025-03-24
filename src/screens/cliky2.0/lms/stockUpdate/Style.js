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
        marginHorizontal: 5,
    },

    cicelView: {
        backgroundColor: '#77DFC0',
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },

    itemHeaderName: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    itemName: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    itemWeightText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    textInputView: {
        width: "85%",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderWidth: 0.8,
        borderColor: "#000",
        borderRadius: 20,
        backgroundColor: '#fff'
    },

    inputFeildMainView: {
        flex: 0.5,
        alignItems: 'flex-end'
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

})

export default styles;