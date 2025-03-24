import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },
    backImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    userName: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },
    userImg: {
        height: 40,
        width: 40,
        resizeMode: 'cover',
        borderRadius: 20
    },
    headerImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    imgCircel: {
        height: 25,
        width: 25,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    rupeesImg: {
        height: 12,
        width: 12,
        resizeMode: 'contain'
    },
    boxNumberText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    boxMainText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    boxImglogo: {
        height: 14,
        width: 14,
        resizeMode: 'contain'
    },
    mainBoxTextSec: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainView: {
        marginLeft: '5%',
        marginRight: '5%'
    },
    mainBox: {
        paddingBottom: '5%',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: 0.8,
        borderRadius: 8,
        marginTop: 20,
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: '2%'
        // alignItems:'center'
    },
    blueBox: {
        backgroundColor: '#609ef8',
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    skyBox: {
        backgroundColor: '#57caeb',
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    greenBox: {
        backgroundColor: '#5ddab3',
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lightPinkBox: {
        backgroundColor: '#f37977',
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lightgrayBox: {
        backgroundColor: '#7d87bb',
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    violetBox: {
        backgroundColor: '#9694ff',
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subMainBox: {
        paddingBottom: 18,
        paddingTop: 18,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: 0.8,
        borderRadius: 8,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: '2%',
        borderWidth: 0.5,
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR
    },

    subMainBoxSec: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '10%'
    },
    subCircel: {
        height: 35,
        width: 35,
        borderRadius: 18,
        backgroundColor: "#41AEE4",
        justifyContent: 'center',
        alignItems: "center"
    },
    subImgLogo: {
        height: 18,
        width: 18,
        resizeMode: 'center'
    },
    subBoxText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },


    // Modal Section Start 

    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height,
        right: 0,
        left: 0,
        marginHorizontal: "2%",
        width: Dimension.width - 30,
        alignSelf: 'center'

    },
    headerSec: {
        marginHorizontal: '5%',
        marginTop: 10,
        flexDirection: 'row',
    },
    modalHeaderText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        marginTop: 8,
        textAlign: 'center'
    },
    marginView: {
        marginLeft: '5%',
        flexDirection: 'row'
    },
    cancelSec: {
        height: 22,
        width: 22,
        borderRadius: 14,
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        justifyContent: 'center',
        alignItems: 'center',

    },
    cancelImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },


    canlenderSec: {
        borderColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
    },
    calenderImgSec: {
        borderStyle: 'solid',
        alignSelf: 'flex-end',
        height: 20,
        width: 20,
        bottom: 10
    },
    calenderLogo: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        right: 10
    },
    // statusModal CSS start from here

    modalstatusview: {
        maxHeight: Dimension.height / 1.2,
        backgroundColor: '#fff',
        marginRight: '5%',
        marginLeft: '5%',
        paddingBottom: 60,
        borderRadius: 10
    },
    modalHeaderSec: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        paddingTop: 15,
        paddingBottom: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    },
    madalMarginView: {
        marginLeft: '5%',
        flexDirection: 'row'
    },
    profileNameText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 1
    },

    shortheaderText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginTop: 10
    },

    checkBoxLabel: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        fontSize: FontSize.SM
    },

    imgSec: {
        flexDirection: 'row',
        flex: 0.5,
        marginLeft: '3%',
    },

    //-----------------------------------------------------//
    addMoreButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        borderRadius: 10
    },
    addMoreText: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: 10,
        color: Color.COLOR.WHITE.PURE_WHITE
    },
    flexANdMarginView: {
        flex: 0.5,
        marginHorizontal: '2%',
    },
    timeSec: {
        height: 50,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTime: {
        color: Color.COLOR.GRAY.CORDUROY,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginHorizontal: "2%"
    },
    crossBtnImg: {
        backgroundColor: Color.COLOR.GRAY.SONIC_SILVER,
        height: 20,
        width: 20,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    crossImg: {
        resizeMode: 'contain',
        height: 17,
        width: 17
    },
    textType: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },
    //modal section,

    modalMainView: {
        bottom: -20,
        right: 0,
        left: 0,
        position: 'absolute',
        alignItems: 'center'
    },
    modalView: {
        height: Dimension.height / 2.2,
        width: Dimension.width,
        backgroundColor: Color.COLOR.BLUE.DARK_BLUE,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    modalHeader: {
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.WHITE.PURE_WHITE,
    },
    proposedBudgetUpperText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.WHITE.PURE_WHITE,
    },
    proposedBudgetLowerText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.WHITE.PURE_WHITE,
    },
    proposedBudgetText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
    },
    proposedBudgetTextCredit: {
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.GREEN.LIGHT_GREEN,
    },
    proposedBudgetLabelText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
    },
    creditBottomSec: {
        flexDirection: "row",
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderColor: Color.COLOR.BLUE.LOTUS_BLUE,
        borderBottomWidth: 0.5,

    },
    bottomDaysSec: {
        justifyContent: "center",
        flex: 0.25,
        borderRightWidth: 0.5,
        borderColor: Color.COLOR.BLUE.LOTUS_BLUE,
    },
    bottomDaysSecRight: {
        justifyContent: "center",
        flex: 0.25,
        borderRightWidth: 0.5,
        borderColor: Color.COLOR.WHITE.PURE_WHITE,
    },
    bottomDaysTxt: {
        textAlign: "center",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
    },
    bottomDaysSecRight: {

    },
    valueText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        marginTop: 5
    },
    swaiperText: {
        color: "#1C165B",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },
    partyAccountCode: {
        color: "#1C165B",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    totalStanding: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textAlign: "center"
    },
    shadowText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        // textShadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // textShadowRadius: 5,
        fontSize: 16,
        fontWeight: '600',
        textAlign: "center"
    },

    activeTab: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F2B4D',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        marginHorizontal: '2%'
    },

    inActiveTab: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        marginHorizontal: '2%'
    },


    activeText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    inActiveText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    mainTab: {
        borderRadius: 25,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderColor: Color.COLOR.GRAY.GRAY_TINTS,
    },
    ActiveMainTab: {
        borderRadius: 25,
        backgroundColor: Color.COLOR.RED.AMARANTH,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 5,
        marginRight: 5,
    },

    titleTxt: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12,
        color: "#1F2B4D"
    },
    activeTitleTxt: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12,
        color: Color.COLOR.WHITE.PURE_WHITE
    },
    inputBoxStyle: {
        height: 40,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputBoxText: {
        fontSize: FontSize.XS,
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1
    },
    noDataFountTxt: {
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 12,
        color: Color.COLOR.BLUE.LOTUS_BLUE
    }

});

export default styles;