import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, OtherSize, Padding, Dimension } from '../../enums/';

const styles = StyleSheet.create({
    allDetailsView: {
        marginHorizontal: '5%',
        marginTop: 15,
        flexDirection: 'row'
    },
    viewImg: {
        height: 50,
        width: 50,
        // resizeMode: 'cover',
        borderRadius: 500,
        borderColor: '#999',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        height: 35,
        width: 35,
        resizeMode: 'contain',
    },
    textSec: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        marginLeft: '5%',
        marginBottom: 10
    },
    viewHeaderText: {
        color: Color.COLOR.BLUE.CAPRI,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },
    viewSubText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },
})

export default styles;