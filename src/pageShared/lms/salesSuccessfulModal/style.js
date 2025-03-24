import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../enums";

const styles = StyleSheet.create({
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height,
        width: Dimension.width - 20,
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        alignSelf: 'center',
    },
    inputBoxStyle: {
        height: 45,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputBoxText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        color: Color.COLOR.GRAY.GRAY_COLOR,
        flex: 1
    },
    sendSuccessfulImage: {
        height: 225,
        width: 300,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: FontSize.XXL,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT
    },
    iparagraphText: {
        fontSize: FontSize.SM,
        textAlign: 'center',
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
        marginHorizontal: 40,
    },
    coinImage: {
        height: 70,
        width: 60,
        resizeMode: 'contain',
    },
    crossImage: {
        height: 12,
        width: 12,
        resizeMode: 'contain',
        marginRight: 8,
        marginTop: 10
    },

    paragraphText: {
        fontSize: FontSize.SM,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginTop: 3,
        textAlign: 'center'
    }



})

export default styles;