
import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


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
    // backImg: {
    //     height: 25,
    //     width: 20,
    //     resizeMode: 'contain',
    //     marginTop: 10,
    //     flex: 1
    // },
    // backSec: {
    //     flexDirection: 'row',
    //     marginLeft: '5%',
    //     marginRight: '5%'
    // },
    backImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    imgSec: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: '3%',
    },
    userName: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    userImg: {
        height: 45,
        width: 45,
        resizeMode: 'cover',
        borderRadius: 100
    },
    headerImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain',

    },
    imgCircel: {
        height: 25,
        width: 25,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },

    shadowBox: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 1,
        shadowColor: Color.COLOR.BLACK.PURE_BLACK,
        shadowOffset: 0.5,
        shadowOpacity: 0.5,
        marginTop: 10
    },

    showHideBox: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 12,
        elevation: 1,
        shadowColor: Color.COLOR.BLACK.PURE_BLACK,
        shadowOffset: 0.5,
        shadowOpacity: 0.5,
        marginTop: 15
    },

    dropDownSec: {
        flexDirection: 'row',
        marginLeft: '2%',
        marginRight: '2%'
    },
    boxMainText: {
        color: Color.COLOR.GRAY.ROUND_CAMEO,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        flex: 1
    },
    dropDownImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    detailsHeaderText: {
        color: Color.COLOR.GRAY.GRAY_TINTS,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    detailsSubText: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        textAlign: 'left'
    },
    profileImg: {
        height: 110,
        width: 110,
        resizeMode: 'cover',
        borderRadius: 55,
        borderColor: Color.COLOR.GRAY.TAPA,
        borderWidth: 1
    },
    leadName: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    textPhoneCall: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    },
    textFollowup: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    },
    textAssignTo: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },
    textAssigntoName: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    },
    textNextAction: {
        color: "#0068FF",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },
    textType: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    },
    // textTaskDetails: {
    //     color: Color.COLOR.BLACK.PURE_BLACK,
    //     fontSize: FontSize.SM,
    //     fontFamily: FontFamily.FONTS.INTER.BOLD
    // },
    textTab: {
        color: Color.COLOR.BLACK.BLACK_PEARL,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textAlign: 'center'
    },
    activeTextTab: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textAlign: 'center'
    },
    activitiesTabText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },
    inactiveActivitiesTabText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },
    textDetailsInfo: {
        color: Color.COLOR.RED.AMARANTH,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 1
    },
    modalTextDetailsInfo: {
        color: Color.COLOR.GRAY.ROUND_CAMEO,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },


    textLeadDetails: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 0.6
    },
    textShowMore: {
        color: "#0068FF",
        fontSize: FontSize.XXS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textDecorationLine: 'underline',
        alignItems: 'center'
    },
    greenBox: {
        paddingBottom: 6,
        paddingTop: 6,
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.GREEN.SEA_GREEN,
        borderRadius: 8,
        marginRight: '1%'
    },
    yellowBox: {
        paddingBottom: 6,
        paddingTop: 6,
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.YELLOW.SIMILER_YELLOW,
        borderRadius: 8,
        marginRight: '1%'
    },
    trianglebouttonText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XXS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    smallTabText: {
        fontSize: FontSize.XXS,
        fontFamily: FontFamily.FONTS.INTER.LIGHT,
        color: Color.COLOR.WHITE.PURE_WHITE
    },
    tabFlexView: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.GREEN.SEA_GREEN,
        elevation: 1,
        flex: 0.5,
        marginHorizontal: '2%',
        flex: 0.2
    },

    stageDetailsListTab: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 8
    },
    stageDetailsListView: {
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 8
    },
    listHeaderText: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        textAlign: 'center'
    },
    listText: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XXS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        textAlign: 'center'
    },



    allDetailsView: {
        marginHorizontal: '5%',
        marginTop: 15,
        flexDirection: 'row'
    },
    viewImg: {
        height: 50,
        width: 50,
        // resizeMode: 'cover',
        borderRadius: 500,
        borderColor: '#999',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        height: 35,
        width: 35,
        resizeMode: 'contain',
    },
    textSec: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        marginLeft: '5%'
    },
    tabSec: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: '10%',
        justifyContent: 'center',

    },
    modalTabSec: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: '5%',
        justifyContent: 'center',

    },
    modalTabView: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        flex: 0.5,
        marginHorizontal: '2%'
    },


    tabView: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        flex: 0.5,
        // marginHorizontal: '2%'
    },
    activeTabView: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#0068FF",
        elevation: 1,
        flex: 0.5,
        marginHorizontal: '2%'
    },
    madalactiveTabView: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#0068FF",
        elevation: 1,
        flex: 0.5,
        marginHorizontal: '2%'
    },

    activitiesView: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#0068FF",
        elevation: 1,
        flex: 0.5,
        marginHorizontal: '2%'
    },
    inactiveActivitiesView: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 1,
        flex: 0.5,
        marginHorizontal: '2%'
    },
    addactivitiesButton: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.ORANGE.MANGO_TANGO,
        elevation: 1,
        flex: 0.5,
        marginHorizontal: '2%',
        flexDirection: 'row',
        marginTop: 10
    },

    viewHeaderText: {
        color: Color.COLOR.BLUE.CAPRI,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },
    viewSubText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },
    shortheaderText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginTop: 10
    },
    underLine: {
        borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY,
        marginTop: 4,
        borderWidth: 0.5
    },
    topUnderLine: {
        borderColor: Color.COLOR.GRAY.SONIC_SILVER,
        borderWidth: 0.3,
        marginTop: 8
    },

    upDownArrowImg: {
        height: 20,
        width: 25,
        resizeMode: 'contain'
    },

    listDataView: {
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        paddingBottom: 3,
        paddingTop: 3,
        borderRadius: 8
    },
    textList: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        flex: 0.4
    },
    textDate: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        flex: 0.3
    },
    nameText: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        flex: 0.3,
        textAlign: 'center'
    },
    toolTipImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    keyImgSec: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEECFA',
        height: 120,
        width: 120,
        borderRadius: 30,
        elevation: 2
    },
    keyImg: {
        height: Dimension.height / 3.5,
        width: "90%",
        resizeMode: 'cover'
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 25,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: Color.COLOR.GREEN.SEA_GREEN,
        transform: [{ rotate: "90deg" }],

    },
    whiteImg: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        marginTop: 3
    },

    // Modal Section Start

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
    headerText: {
        color: "#0068FF",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        // textAlign: 'center'
    },
    marginView: {
        // marginLeft: '5%',
        // flexDirection: 'row',
        flex: 1
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
    tooltipListView: {
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderBottomColor: Color.COLOR.GRAY.GRAY_COLOR,
        borderBottomWidth: 0.5
    },
    tooltipText: {
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.SM
    },
    noDataFoundText: {
        textAlign: 'center',
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 14,
        color: Color.COLOR.GRAY.GRAY_COLOR,
        marginVertical: 10
    },
    modalstatusview: {
        maxHeight: Dimension.height,
        backgroundColor: '#fff',
        marginRight: '5%',
        marginLeft: '5%',
        paddingBottom: 60,
        borderRadius: 10

    },
    modalHeaderSec: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
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





});

export default styles;