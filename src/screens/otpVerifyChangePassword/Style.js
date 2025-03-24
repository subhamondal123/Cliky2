import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from '../../enums';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1,
    },
    contentSec: {

        marginLeft: '10%',
        marginRight: '10%'
    },
    boxSec: {
        width: 120,
        height: 120,
        borderRadius: 30,
        backgroundColor: '#F6F5FF',
        // marginTop: '40%',
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxImg: {
        width: 135,
        height: 135,
        resizeMode:'contain'
    },
    mailText: {
        fontSize: 36,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    belowMailText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: 14,
        fontFamily: FontFamily.FONTS.INTER.LIGHT,
        marginTop: 5,
    },
    buttonSection: {
        marginTop: 20
    },
    buttonView: {
        height: 55,
        borderRadius: 10,
        // flex: 1,
        // borderRadius: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor:Color.COLOR.BLUE.CAPRI,

    },
    linearGradient: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.RED.AMARANTH,

    },
    buttonText: {
        fontSize: FontSize.MD,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    buttonSec: {
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: 23
    },

    otpmainView: {
        flexDirection: 'row',
        marginTop: 50,
        // marginLeft: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    otpView: {
        height: 45,
        width: 45,
        borderRadius: 40,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.LG,
    },

    underlineStyleHighLighted: {
        borderColor: Color.COLOR.BLACK.PURE_BLACK,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.LG,
    },

    resendText: {
        fontSize: FontSize.XS,
        color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        alignSelf: "flex-end"
    },

    backImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginTop: 10
    },
    backSec: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%'
    },
})

export default styles;