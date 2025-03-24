import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../../enums";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimension.height,
        width: Dimension.width,
        backgroundColor: '#ffffff'
    },
    // ==============================================================================

    nameText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },

    dropdownSec: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        height: 28,
        width: 28,
        backgroundColor: '#dbe0e7',
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

    userPSec: {
        justifyContent: 'center',
        width: 35,
        marginLeft: 10
    },
    boxshadowPopup: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: '#FFF',
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 10,
    },
    namePText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        marginTop: 10
    },
    reasonText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,

    },
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
        position: 'absolute',
        // position: 'absolute',
    },
    crossIcon: {
        width: 30,
        height: 30,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    redCrossIcon: {
        alignItems: 'center',
        marginTop: '10%'
    },
    redCrossImg: {
        width: 60,
        height: 60,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    timeSec: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'center'
    },
    timeImg: {
        width: 20,
        height: 20,
        borderRadius: 20,
        resizeMode: 'contain',
        marginRight: 5
    },
    greaySec: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 10
    },
    greayBox: {
        height: 40,
        backgroundColor: '#F0F4F7',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        flexDirection: 'row'
    },
    hafCircleGreay: {
        width: 40,
        height: 40,
        backgroundColor: '#D1D1D1',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 20
    },
    boxTextSec: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10
    },
    hafCircleGreen: {
        width: 40,
        height: 40,
        backgroundColor: '#00B65E',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightImg: {
        width: 25,
        height: 25,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    CancleButtonStyle: {
    },

    inputBoxStyle: {
        height: 45,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputBoxText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1,
        color: Color.COLOR.GRAY.DARK_GRAY_COLOR
    },

    profileImgView: {
        borderWidth: 1,
        borderColor: Color.COLOR.GRAY.CORDUROY,
        // elevation: 5,
        borderRadius: 500,
        // alignSelf: 'center',
        height: 75,
        width: 75,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    profileImg: {
        height: 75,
        width: 75,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 500
    },
    cameraView: {
        alignSelf: 'center',
        bottom: 30,
        marginLeft: 60
    },
    cameraIconImg: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },

})

export default styles;