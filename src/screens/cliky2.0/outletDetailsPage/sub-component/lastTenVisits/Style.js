import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
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
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
    },
    noDataFound: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: FontSize.SM
    },
    visitedByTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.BLACK,
        fontSize: FontSize.XS
    },
    visitTimeDateTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: FontSize.XS
    }

});

export default styles;