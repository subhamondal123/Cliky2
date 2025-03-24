import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // height: Dimension.height,
        flex: 1
    },
    boxText: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12,
        color: "#FFF"
    },
    absentText: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12,
        color: "#1F2B4D",
        marginLeft: 10
    },
    valueText: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.SM,
        color: '#1F2B4D',
        textAlign: 'center'
    },

    loginText: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.XS,
        color: '#1F2B4D',
        textAlign: 'center'
    },

    dateSec: {
        backgroundColor: '#00B65E',
        justifyContent: 'center',
        width: 80,
        alignItems: 'center',
        borderTopStartRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 10
    },

    circelView: {
        width: 10,
        height: 10,
        borderRadius: 8,
        backgroundColor: '#00B65E'
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
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        height: 70,
        borderRadius: 8,
        justifyContent: 'center',
    },

});

export default styles;