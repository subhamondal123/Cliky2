import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../enums";

const styles = StyleSheet.create({

    drawerImgView: {
        marginBottom: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgView: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginTop: 10,
        marginBottom: 10
    },
    textView: {
        marginBottom: 12,
        marginTop: 12,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        top: 2
    },
    text: {
        marginTop: 5,
        marginBottom: 5,
        // color: Color.COLOR.WHITE.PURE_WHITE,
        color:Color.COLOR.BLUE.EBONY_CLAY,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.MD
    },
    textType: {
        marginTop: 10,
        marginBottom: 7,
        color: "#255FB2",
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.MD
    },
    drawerImg: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        top: 2,
        // backgroundColor: '#FEE142'
        // backgroundColor:Color.COLOR.BLUE.EBONY_CLAY
        backgroundColor:Color.COLOR.RED.AMARANTH
    },

})

export default styles;