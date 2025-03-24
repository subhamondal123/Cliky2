import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },
    mainView: {
        marginLeft: '5%',
        marginRight: '5%'
    },
    backImg: {
        height: 25,
        width: 20,
        resizeMode: 'contain',
        marginTop: 10,
        flex: 1
    },
    backSec: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%'
    },
    mainBox: {
        paddingBottom: '10%',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: 0.8,
        borderRadius: 8,
        marginTop: 20,
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        borderWidth: 0.7
    },
    blueBox: {
        backgroundColor: '#3168ff',
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center'
    },
    blueViewFlex: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        alignItems: 'center'
    },
    homeCircel: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    homeLogo: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },
    dropDownArrow: {
        height: 18,
        width: 18,
        resizeMode: 'contain',

    },
    saiEnterprisesText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    textDealer: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    addVisitsButton: {
        paddingLeft: 3,
        paddingRight: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 8,
        flex: 0.2,
        paddingTop: 5,
        paddingBottom: 5
    },
    addVisitesText: {
        color: "#3168ff",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    textFlexView: {
        flexDirection: 'row',
        marginTop: 8,
        marginHorizontal: '5%'
    },
    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    textVisites: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    calenderimgSec: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginRight: '2%'
    },
    imgSec: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginLeft: '2%'
    },
    activetabText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.EXTRA_BOLD
    },
    inactivetabText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    tabSec: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeUnderline: {
        borderWidth: 1.3,
        borderColor: Color.COLOR.YELLOW.GARGOYLE_GAS,
        marginTop: 12,
        marginHorizontal: '2%'
    },
    inactiveUnderline: {
        borderWidth: 1.3,
        borderColor: Color.COLOR.GRAY.GRAY_COLOR,
        marginTop: 12,
        marginHorizontal: '2%'

    },
    underline: {
        borderWidth: 0.3,
        borderColor: Color.COLOR.GRAY.GRAY_COLOR,
        marginVertical: 5
    },
    amount: {
        color: Color.COLOR.RED.AMARANTH,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    amountkm: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: 10,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    amountLabel: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: 11,
        justifyContent: "flex-end",
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        marginHorizontal: 5
    },
    visitIconImg: {
        height: 18,
        width: 18,
        resizeMode: "contain"
    },
    totalExpSec: {
        flex: 0.55,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    mainHeaderSec: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    skelitonSec: {
        borderRadius: 10,
        marginHorizontal: 5,
        height: 115,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    skeletonView: {
        borderRadius: 8,
        height: 50,
        marginBottom: 10,
        marginTop: 10,
    },

});

export default styles;