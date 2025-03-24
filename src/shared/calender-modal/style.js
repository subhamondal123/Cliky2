import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, OtherSize, Padding, Dimension } from '../../enums/';

const styles = StyleSheet.create({


    // Modal Section Start
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
        borderRadius: 15,
        width: Dimension.width - 50,
        maxHeight: Dimension.height,
        alignSelf: 'center',
        // right: 0,
        // left: 0,
        // bottom: -16,
        // position: 'absolute',
        // marginHorizontal: "10%"
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
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize:FontSize.XL,
        alignSelf: 'center',
        // marginTop: 5,
        // flex: 1,
        // marginLeft: '5%'
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
        // backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        // paddingTop: 15,
        // paddingBottom: 15,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10
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
        backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
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

    labelText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        fontSize: FontSize.XS
    },

    calendarMainView: {
        borderColor: '#0068FF',
        borderWidth: 1,
        shadowColor: Color.COLOR.GRAY.GRAY_COLOR,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 3,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 10,
        marginTop: '5%',
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2
    },

})

export default styles;