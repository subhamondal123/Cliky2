import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: Dimension.height,
        flex: 1
    },
    backImg: {
        height: 25,
        width: 20,
        resizeMode: 'contain',
        // marginTop: 2,

    },
    backSec: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%',
        flex:1
    },
    shadowBox: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#f5faf9',
        borderRadius: 12,
        elevation: 1,
        shadowColor: Color.COLOR.BLACK.PURE_BLACK,
        shadowOffset: 0.5,
        shadowOpacity: 0.5,
        marginTop: 15
    },
    listHeaderText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textAlign: 'center'
    },
    underLine: {
        borderColor: Color.COLOR.GRAY.SONIC_SILVER,
        marginTop: 4,
        borderWidth: 0.3
    },
    listDataView: {
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        paddingBottom: 3,
        paddingTop: 3,
        borderRadius: 8
    },
    textList: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 0.4
    },
    textDate: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 0.3
    },
    nameText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 0.3,
        textAlign: 'center'
    },
    toolTipImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },





});

export default styles;