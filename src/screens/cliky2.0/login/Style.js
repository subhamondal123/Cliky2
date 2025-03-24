import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Dimension } from '../../../enums';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        height: Dimension.height,
        flex: 1
    },
    backgroundImageView: {
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 20
    },
    backgroundImage: {
        width: 90,
        height: 90,
        resizeMode: 'contain'
    },
    belowImageView: {
        alignItems: "center",
        marginLeft: 30,
        flexDirection: "row"
    },
    loginImage: {
        width: 38,
        height: 38,
        resizeMode: 'contain',
        marginRight: 10
    },
    welcomeText: {
        fontSize: FontSize.SM,
        color: Color.COLOR.GRAY.PHILIPPINE_SILVER,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },
    loginText: {
        fontSize: 32,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },

    formInputSection: {
        marginTop: 32,
        marginHorizontal: "10%",
    },
    formLabel: {
        fontSize: 13,
        color: Color.COLOR.GRAY.PHILIPPINE_SILVER,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    formInputBox: {
        height: 55,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    formInputLeftIconView: {
        marginHorizontal: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formInputLeftIcon: {
        height: 14,
        width: 16,
        resizeMode: 'cover'
    },
    verticalBlueLine: {
        height: 20,
        width: 2,
        backgroundColor: Color.COLOR.BLUE.MAXIMUM_BLUE
    },
    textInput: {
        fontSize: FontSize.SM,
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginHorizontal: 21,
        flex: 1
    },
    focusedTextInput: {
        fontSize: FontSize.SM,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginHorizontal: 21,
        flex: 1
    },
    forgotText: {
        fontSize: 11,
        color: Color.COLOR.RED.AMARANTH,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        alignSelf: "flex-end",
        textDecorationLine: "underline"
    },
    forgotText2: {
        fontSize: FontSize.XS,
        color: Color.COLOR.BLUE.EBONY_CLAY,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    },
    forgotTextView: {
        justifyContent: "flex-end",
        // alignItems:"flex-end",
        flex: 0.4,
        marginRight: 10
    },
    chooseProductText: {
        fontSize: FontSize.XS,
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        alignSelf: "flex-end",
        marginTop: 10,
    },
    buttonSection: {
        marginTop: 35
    },
    buttonView: {
        height: 55,
        borderRadius: 10
    },
    linearGradient: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE
    },
    buttonText: {
        fontSize: FontSize.MD,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    alertMsg: {
        fontSize: 11,
        color: Color.COLOR.RED.PURE_RED,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    },

    textTremsConditions: {
        color: Color.COLOR.RED.AMARANTH,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textDecorationLine: 'underline',
    },

    orLoginByTxt: {
        fontSize: FontSize.SM,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    underline: {
        borderWidth: 0.5,
        borderColor: Color.COLOR.BLACK.PURE_BLACK,
        marginTop: 60
    },
    contactHeadingTxt: {
        fontSize: 18,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
    contactHeadingSubTxt: {
        fontSize: FontSize.SM,
        color: "#747C90",
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        textAlign: "center"
    },
    contactMailDataTxt: {
        fontSize: FontSize.XS,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: 8,
        textDecorationLine: "underline"
    },
    contactPhoneDataTxt: {
        fontSize: FontSize.XS,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: 5
    },
    otpmainView: {
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 20,
        // marginLeft: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    otpView: {
        height: 50,
        borderWidth: 0,
        borderBottomColor: Color.COLOR.BLACK.PURE_BLACK,
        borderBottomWidth: 1,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        margin: 4,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    underlineStyleHighLighted: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 16,
    },
    otpLabelTxt: {
        color: "#747C90",
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.XS,
    },
    timerTxt: {
        color: Color.COLOR.RED.AMARANTH,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.XS,
    },
    otpLabelUserIdlTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.XS,
    },
    loginPhoneIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain'
    },
    footerImg: {
        height: 100,
        width: Dimension.width,
        resizeMode: "contain"
    },
    contactIcon: {
        height: 24,
        width: 24,
        resizeMode: "contain"
    },
    contactTypeSec: {
        marginBottom: 30,
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        // marginHorizontal: '5%',
    },
    loginTypeIcon: {
        height: 46,
        width: 46,
        resizeMode: "contain"
    },

    //modal section
    modalview: {
        backgroundColor: '#fff',
        marginRight: '5%',
        marginLeft: '5%',
        paddingBottom: 30,
        borderRadius: 10

    },
    modalHeaderSec: {
        backgroundColor: "#3b1f77",
        paddingTop: 15,
        paddingBottom: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    },
    marginView: {
        marginLeft: '5%',
        flexDirection: 'row'
    },
    profileNameText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 1
    },

    updateButton: {
        paddingBottom: 8,
        paddingTop: 8,
        paddingHorizontal: '5%',
        backgroundColor: "#3b1f77",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    updateText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },

})

export default styles;