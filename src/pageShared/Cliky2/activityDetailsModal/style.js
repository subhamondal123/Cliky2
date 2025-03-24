import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimension.height,
        width: Dimension.width,
        backgroundColor: '#ffffff'
    },
    // ==============================================================================

    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 15,
        borderRadius: 15,
        width: Dimension.width / 1.1,
        alignSelf: 'center',
        position: 'absolute'
    },

    cancleSec: {
        marginRight: 15,
        flex: 1,
        alignItems: 'flex-end',
    },

    cancelView: {
        height: 25,
        width: 25,
        borderRadius: 100,
        backgroundColor: '#8e94a5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    visitText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,

    },
    userPSec: {
        justifyContent: 'center',
        width: 35,
        marginLeft: 10
    },

    dText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    grayBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#eeebeb',
        borderRadius: 10,
        marginTop: 20
    },

    userPImage: {
        height: 30,
        width: 30,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    userTextSec: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'center',
    },
    crossIcon: {
        width: 30,
        height: 30,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    dropdownSec: {
        justifyContent: 'center',
        marginRight: 15
    },
    nameText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },

})

export default styles;