import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../enums";


const styles = StyleSheet.create({
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height,
        right: 0,
        left: 0,
        marginHorizontal: "5%",
    },
    mainBox: {
        paddingBottom: '5%',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: 0.8,
        borderRadius: 8,
        marginTop: 20,
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: '5%',
        // alignItems:'center'
    },
    blueBox: {
        backgroundColor: '#609ef8',
        // backgroundColor: '#57caeb',
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgCircel: {
        height: 25,
        width: 25,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    rupeesImg: {
        height: 12,
        width: 12,
        resizeMode: 'contain'
    },
    boxNumberText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    mainBoxTextSec: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxMainText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    boxImglogo: {
        height: 14,
        width: 14,
        resizeMode: 'contain'
    },
    skyBox: {
        backgroundColor: '#57caeb',
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    greenBox: {
        backgroundColor: '#5ddab3',
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lightPinkBox: {
        backgroundColor: '#f37977',
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lightgrayBox: {
        backgroundColor: '#7d87bb',
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    violetBox: {
        backgroundColor: '#9694ff',
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export default styles;