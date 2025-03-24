import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Dimension } from '../../../enums';

const styles = StyleSheet.create({
    // Modal Section Start
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 20,
        width: Dimension.width,
        alignSelf: 'center',
        top: 50,
        position: 'absolute',
        width:Dimension.width - 50
    },

    crossImgSec: {
        height: 25,
        width: 25,
        borderRadius: 20,
        backgroundColor: Color.COLOR.GRAY.SONIC_SILVER,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginTop: 5,
        marginRight: 5
    },
    redCrossImg: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    headerModalText: {
        color: Color.COLOR.BLUE.VIOLET_BLUE,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        alignSelf: 'center',
        marginTop: '7%',
        fontSize: FontSize.MD
    },


})

export default styles;