import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, OtherSize, Padding, Dimension } from '../../../enums';

const styles = StyleSheet.create({


    // Modal Section Start
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height,
        right: 0,
        left: 0,
        marginHorizontal: "10%"
    },

    otherText: {
        height: 40,
        padding: 10,
        borderRadius: 10,
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        borderWidth: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },

    headerModalSec: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#993921',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalHeaderText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        alignSelf: 'center',
        marginTop: 5,
        flex: 1,
        marginLeft: '5%'
    },
    cancelSec: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        top: -5
    },
    cancelImg: {
        height: 12,
        width: 12,
        resizeMode: 'contain',
        alignItems: 'center'
    },
    modalmarginSec: {
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '10%'
    },
    modalHeaderSec: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        paddingTop: 15,
        paddingBottom: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    },
    crossImgSec: {
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    redCrossImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    headerModalText: {
        color: Color.COLOR.BLUE.EBONY_CLAY,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        alignSelf: 'center',
        marginTop: '7%',
        fontSize: FontSize.MD
    },

    modalMainMarginSec: {
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '10%'
    },
    actionSec: {
        flexDirection: 'row',
        marginTop: 3,
        alignSelf: 'center'
    },
    containerStyle: {
        width: 40,
        height: 20,
        borderRadius: 13,
        padding: 5,
    },
    circleStyle: {
        width: 13,
        height: 13,
        borderRadius: 10,
    },

    cancelButton: {
        backgroundColor: Color.COLOR.BLUE.EBONY_CLAY,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 14,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },

    pageLoaderViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: '10%'
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
        paddingVertical: 5,
        paddingRight: 5
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