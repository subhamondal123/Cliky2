import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#fff",
    },

    tooltipText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.SM
    },

    tooltipListView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    modalview: {
        backgroundColor: '#fff',
        marginRight: '5%',
        marginLeft: '5%',
        paddingBottom: 30,
        borderRadius: 10

    },

    modalFilterview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: Dimension.width,
        alignSelf: 'center',
        bottom: -21,
        position: 'absolute',
    },

    modalHeaderSec: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
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

    cancelSec: {
        height: 25,
        width: 25,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        top: -15,
        left: 1
    },

    cancelImg: {
        height: 15,
        width: 15,
        resizeMode: 'contain'
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
        marginRight: 5
    },

    headerActionArea: {
        flexDirection: 'row',
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },

    filter_action_btn: {
        flexDirection: "row",
        alignItems: "center",
        // flex: 0.15,

    },

    crossImgView: {
        flex: 1
    },

    crossImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },

    productBtn: {
        position: "absolute",
        bottom: "5%",
        alignSelf: 'center',
        width: "100%",
        marginHorizontal: "35%"
    },

    buttonView: {
        height: 55,
        flex: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.COLOR.BLUE.CAPRI,
    },

    buttonText: {
        fontSize: FontSize.SM,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },

    selectAll: {
        flexDirection: "row",
        paddingBottom: 10,
        paddingHorizontal: "5%"
    },

    priorityChangeButton: {
        backgroundColor: Color.COLOR.BLUE.PACIFIC,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cancelButton: {
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cancelText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 14,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },

    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 5
    },

    blueBox: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center'
    },

    blueViewFlex: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        alignItems: "center"
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
        height: 28,
        width: 28,
        resizeMode: 'cover',
        borderRadius: 15,
    },

    saiEnterprisesText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    dateText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },

    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },


    arrowCircel: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '2%'
    },

    arrowImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },

    arrowCircelUp: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerTxt: {
        color: Color.COLOR.RED.AMARANTH,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textAlign: 'center'
    },

    logoImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    dateTimeTxt: {
        color: Color.COLOR.GRAY.GRAY_TINTS,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginTop: 1
    },

    labelText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        fontSize: FontSize.XS
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
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1
    },

    redCrossImg: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
        alignSelf: 'center'
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

    attendanceDetailsView: {
        borderColor: Color.COLOR.RED.AMARANTH,
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 30,
        marginBottom: 10,
        padding: 3,
        // flexDirection: 'row',
    },

    attendanceDetailsText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    }

});

export default styles;
