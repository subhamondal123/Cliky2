import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        backgroundColor: "#fff"
    },

    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 5,
    },

    blueBox: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        height: 150,
        borderRadius: 15,
        justifyContent: 'center',
    },
    addUnplanSec: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: Color.COLOR.RED.AMARANTH,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },

    buttomTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
    modalview: {
        backgroundColor: '#fff',
        marginRight: '5%',
        marginLeft: '5%',
        paddingBottom: 30,
        borderRadius: 10

    },
    modalHeaderSec: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        paddingTop: 15,
        paddingBottom: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      

    },
    marginView: {
        // marginLeft: '5%',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    },
    profileNameText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        // flex: 1
    },

    updateButton: {
        paddingBottom: 8,
        paddingTop: 8,
        paddingHorizontal: '5%',
        backgroundColor: Color.COLOR.RED.AMARANTH,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    updateText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },

})

export default styles