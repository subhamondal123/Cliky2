import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: Dimension.width / 1.1,
        // maxHeight: Dimension.height,
        alignSelf: 'center',
        // right: 0,
        // left: 0,
        bottom: -21,
        // position: 'absolute',
        // position: 'absolute',
    },
    userPImage: {
        height: 30,
        width: 30,
        borderRadius: 100,
        resizeMode: 'cover'
    },

    userPSec: {
        // justifyContent: 'center',
        width: 35,
        marginLeft: 10
    },
    nameText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },

    userTextSec: {
        marginLeft: 15,
        // flex: 1
    },

    dropdownSec: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        height: 28,
        width: 28,
        backgroundColor: '#9298a9',
        borderRadius: 100,
        marginTop: 10
    },

    dText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },

    userPImage: {
        height: 30,
        width: 30,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    greaySec: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 10
    },
    greayBox: {
        // height: 40,
        backgroundColor: '#F0F4F7',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        flexDirection: 'row'
    },
    hafCircleGreay: {
        width: 40,
        // height: 40,
        backgroundColor: '#D1D1D1',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 20
    },
    boxTextSec: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
        paddingVertical:5,
        paddingRight:5
    },
    hafCircleGreen: {
        width: 40,
        // height: 40,
        backgroundColor: '#00B65E',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reasonText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,

    },
})

export default styles;