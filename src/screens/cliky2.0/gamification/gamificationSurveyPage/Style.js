import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },

    backImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    circelBackground: {
        height: 40,
        width: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFECC8'
    },

    greenCircel: {
        height: 20,
        width: 20,
        borderWidth: 0.8,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#0D9478'
    },

    surveyText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginTop: 10
    },

    surveyMarketCompilerText: {
        color: Color.COLOR.GRAY.GRAY_TINTS,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginTop: 8
    },

    surveyLogo: {
        height: 192,
        width: 246,
        resizeMode: 'cover'
    },

    imgCenterSec: {
        marginHorizontal: '15%',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    greenCircelView: {
        marginTop:30,
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'center',
        flexWrap:'wrap'
    },


});

export default styles;