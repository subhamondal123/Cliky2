import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../enums";


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




    // ============================================================================================
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
    modalHeader: {
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.BLACK.PURE_BLACK,
    },
    userImage: {
        height: 60,
        width: 60,
        borderRadius: 15
    },
    flexRow: {
        flexDirection: 'row',
        marginTop: 25,
        alignItems: 'center'
    },
    locationImage: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    blueUnderline: {
        flex: 1,
        height: 2,
        backgroundColor: '#286a94'
    },
    marginTopView: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center'
    },
    loactionStartEndText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    greenOdometerLogo: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        marginTop: 2
    },
    bikeText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        marginLeft: '5%'
    },
    inTimeText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.REGULAR
    },
    timeValueText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },

    // ===========



    whiteDeleteLogo: {
        height: 15,
        width: 15,
        resizeMode: "contain"
    },
    deleteLogoSec: {
        justifyContent: "center",
        backgroundColor: "#F76770",
        height: 24,
        width: 24,
        borderRadius: 12,
        alignItems: "center",

    },
    TakephotoImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 15,
        backgroundColor: "#fff"
    },
    flexANdMarginView: {
        // flex: 0.33,
        // marginHorizontal: '2%'
        width: 100,
        margin: 5
    },
    logisticImageView: {
        flex: 1,
        height: 100,
        borderRadius: 12,
    },
    addImgField: {
        width: "100%",
        backgroundColor: "#E8E8E8",
        borderRadius: 10,
        marginTop: 35,
        justifyContent: 'center',
        alignItems: "center",
    },

    addImg: {
        height: 100,
        width: 100,
        borderRadius: 15,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImgIcon: {
        height: 100,
        width: 100,
        resizeMode: 'contain'
    },
    imageMainView: {
        marginLeft: '3%',
        marginRight: '3%'
    },
    mainImageView: {
        flexDirection: 'row',
        marginTop: 20
    },
    imgUploadView: {
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        height: 80,
        width: 80,
        borderRadius: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tauchableSec: {
        height: 90,
        width: 90,
        borderRadius: 60,
        borderColor: Color.COLOR.BLUE.VIOLET_BLUE,
        borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },

    photoSec: {
        flexDirection: "row",
        flexWrap: "wrap"
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
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1
    },



});

export default styles;