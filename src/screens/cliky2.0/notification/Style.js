import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../enums";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: Dimension.height

    },
    headerSection: {
        shadowColor: Color.COLOR.BLACK.PURE_BLACK,
        shadowOffset: { width: 1, height: 2 },
        backgroundColor: '#005D83',
        height: 80,
        elevation: 3,
        marginBottom: 5,
    },
    backImage: {
        height: 15,
        width: 18,
        resizeMode: 'contain',
        marginTop: 34,
        marginLeft: 15
    },
    RateCardUnderline: {
        borderBottomWidth: 1,
        borderBottomColor: Color.COLOR.WHITE.PURE_WHITE,
        marginLeft: 15,
        paddingRight: 15
    },
    headerText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BLACK,
        // color: Color.COLOR.WHITE.PURE_WHITE,
        alignSelf: 'flex-start',
        // marginTop: 38,

    },
    backImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    logo: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        marginRight: 15
    },
    bell: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        alignSelf: 'flex-start'
    },
    bellSec: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%'
    },
    notNotification: {
        right: 20,
        width: 17,
        height: 17
    },
    circle: {
        width: 17,
        height: 17,
        borderRadius: 10,
        backgroundColor: Color.COLOR.RED.RED_ORANGE,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BLACK
    },
    RateCardUnderline: {
        borderBottomWidth: 1,
        borderBottomColor: Color.COLOR.WHITE.PURE_WHITE,
        marginLeft: 15,
        paddingRight: 15
    },
    textUnderline: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BLACK,
        textDecorationLine: 'underline'
    },
    readTextSec: {
        marginTop: '10%',
        alignItems: 'flex-end'
    },
    underline: {
        borderWidth: .5,
        borderColor: '#e6e6e6',
        marginTop: 5
    },
    spaceUnderline: {
        borderWidth: .3,
        borderColor: '#e6e6e6',
        marginTop: '2%',
        marginHorizontal: '5%'
    },
    contentSec: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '2%'
    },
    paddingSec: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '5%'
        // marginTop: '5%'
    },
    redCircel: {
        backgroundColor: Color.COLOR.RED.LIGHT_RED,
        height: 15,
        width: 15,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Circel: {
        backgroundColor: Color.COLOR.RED.PURE_RED,
        height: 8,
        width: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },




    textSec: {
        flex: 1,
        marginLeft: 20
    },
    text: {
        fontFamily: FontFamily.FONTS.INTER.BLACK,
        fontSize: FontSize.XS,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    textInactive: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.XS,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    dateTimeText: {
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XS,
        color: Color.COLOR.GRAY.GRAY_COLOR,
        marginTop: 5
    },
    bodyText: {
        fontFamily: FontFamily.FONTS.INTER.BLACK,
        fontSize: FontSize.XS,
        color: Color.COLOR.GRAY.GRAY_COLOR,
        marginTop: 5
    },
    bodyTextInactive: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.XS,
        color: Color.COLOR.GRAY.GRAY_COLOR,
        marginTop: 5
    },
    status: {
        height: 10,
        width: 10,
        borderRadius: 10,
        backgroundColor: Color.COLOR.RED.RED_ORANGE
    },
    deleteImg: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignSelf: 'flex-start'
    },
    notificationImg: {
        width: 30,
        height: 30,
        borderRadius: 60,
        resizeMode: 'contain',
        alignSelf: 'flex-start'
    },
    nodataView: {
        shadowColor: Color.COLOR.BLACK.BLACK_PEARL,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        elevation: 3
    },
    pageLoaderFlexViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextSec: {
        borderColor: Color.COLOR.WHITE.PURE_WHITE,
        borderBottomWidth: 1,
        top: 10,
        marginLeft: 10,
        paddingRight: 15
    },
    headerIconSec: {
        flexDirection: 'row',
        right: 20,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    filterImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    tooltipBtn: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    filterBtn: {
        alignItems: 'flex-start',
        height: 25,
        marginRight: 10
    },
    actionBtn: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 50,
        borderWidth: 1,
    },
    headerActionArea: {
        flexDirection: 'row',
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // flex:1
    },
    filter_action_btn: {
        flexDirection: "row",
        alignItems: "center",
        // flex: 1,
        // width:"90%",
        justifyContent: "flex-end"
    },
    crossImgView: {
        flex: 1
    },
    crossImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },

    loaderView: {
        justifyContent: "center",
        alignItems: "center",
        height: Dimension.height / 1.2,

    },

    // Modal Section start
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height,
        right: 0,
        left: 0,
        marginHorizontal: "2%",
        width: "40%",
        alignSelf: 'center'

    },
    // =============================================================

    filterSec: {
        flexDirection: 'row',
        // marginTop: 8
    },

    dgText: {
        color: "#747C90",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginTop: 8
    },
    filterUnderLIne: {
        borderBottomWidth: 1,
        borderBottomColor: '#1F2B4D',
        marginTop: 8
    },
    notificationSec: {
        flexDirection: 'row',
        marginTop: 20,
        // alignItems: 'center'
    },
    notificationTextSec: {
        marginLeft: 12,
        flex: 1
    },

    notihead: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
    notibody: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },


})

export default styles;