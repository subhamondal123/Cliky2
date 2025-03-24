import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../enums";

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        // elevation: 2,
        backgroundColor: "#fff",
        // shadowColor: Color.COLOR.GRAY.DARK_GRAY_COLOR,
        // shadowOffset: 5,
        // shadowOpacity: 5,

    },

    mainView: {
        marginHorizontal: "3%",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerIconSection: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor:"red",
    },
    drawerIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    profileImgView: {
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40
    },
    profileImg: {
        height: 35,
        width: 35,
        borderRadius: 40,
        resizeMode: 'cover',
        alignSelf: 'center'
    },
    headerMiddleSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.MD,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    otherItemCircle: {
        width: 35,
        height: 35,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '5%'
    },
    notiCountText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 8,
        fontFamily: FontFamily.FONTS.INTER.LIGHT
    },
    notificationSec: {
        flexDirection: 'row',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '1%'
    },
    emptyCircle: {
        width: 18,
        height: 18,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        right: 12,
        top: -7
    },
    countCircle: {
        width: 18,
        height: 18,
        borderRadius: 30,
        backgroundColor: Color.COLOR.RED.PURE_RED,
        justifyContent: 'center',
        alignItems: 'center',
        right: 12,
        top: -7
    },
    notiCircle: {
        width: 18,
        height: 18,
        borderRadius: 30,
        // backgroundColor: Color.COLOR.RED.PURE_RED,
        justifyContent: 'center',
        alignItems: 'center',
        right: 12,
        top: -7
    },
    logoImg: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        borderRadius: 20
    },

    // ....modal,,,,,
    modalview: {
        backgroundColor: '#fff',
        marginRight: '5%',
        marginLeft: '5%',
        // paddingTop: 40,
        paddingBottom: 30,
        borderRadius: 10

    },
    modalMainView: {
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    crossCircelView: {
        height: 40,
        width: 40,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#8D8D8D',
        borderWidth: 1
    },
    redCrossImage: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    attendanceHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    attendanceHeaderText: {

        marginLeft: 10,
        fontSize: FontSize.SM,
        color: Color.COLOR.RED.AMARANTH,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    attendanceBody: {
        marginTop: 10
    },
    underline: {
        marginVertical: 5,
        height: 1,
        borderColor: Color.COLOR.RED.AMARANTH,
        backgroundColor: Color.COLOR.RED.AMARANTH,
        borderWidth: 1,
        width: "100%"
    },
    attendanceBodyText: {
        fontWeight: '600',
        fontSize: FontSize.SM,
        color: Color.COLOR.BLACK.BLACK_PEARL,
        fontFamily: FontFamily.FONTS.INTER.LIGHT
    },
    attendanceButton: {
        alignItems: "flex-end",
        flexDirection: "row",
        marginTop: 15
    },
    yesBtn: {
        fontSize: 16,
        color: Color.COLOR.BLUE.EBONY_CLAY,
        fontFamily: FontFamily.FONTS.INTER.BOLD

    },
    noBtn: {
        fontSize: FontSize.MD,
        color: Color.COLOR.BLUE.EBONY_CLAY,
        fontFamily: FontFamily.FONTS.INTER.BOLD

    },
    yesBtnMain: {
        marginLeft: 10,
        borderWidth: 0.5,
        elevation: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 10
    },
    noBtnMain: {
        marginRight: 10,
        borderWidth: 0.5,
        elevation: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 10
    },
    congratulationTxt: {
        // fontSize: 22
        fontSize: FontSize.MD,
        color: Color.COLOR.BLUE.LAPIS_LAZULI,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    congratulationFooterTxt: {
        fontSize: 18,
        textAlign: "center",
        color: Color.COLOR.BLUE.LAPIS_LAZULI,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    attendanceSuccessBody: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    okMainBtn: {
        borderRadius: 10,
        borderColor: "#000305",
        borderStyle: "solid",
        marginTop: 20
    },
    okBtn: {
        fontSize: 16,
        color: Color.COLOR.BLUE.LAPIS_LAZULI,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    tooltipListView: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderColor: Color.COLOR.GRAY.GRAY_COLOR,
        borderBottomWidth: 0.5
    },
    tooltipText: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM
    },
    yesBtnok: {
        // marginTop:10,
        fontSize: 16,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    yesBtnMainOk: {
        marginLeft: 10,
        marginTop: 15,
        borderWidth: 0.5,
        elevation: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        borderRadius: 10
    },

    //gamification

    gamificationMainView: {
        marginHorizontal: "3%",
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    gamificationDrawerIcon: {
        height: 75,
        width: 75,
        resizeMode: 'contain'
    },

    gamificationProfileImgView: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    gamificationProfileImg: {
        height: 40,
        width: 40,
        borderRadius: 50,
        resizeMode: 'cover',
        alignSelf: 'center'
    },

    magicStickImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    bellImg: {
        height: 34,
        width: 34,
        resizeMode: 'contain',

    },
    dateTxt: {
        marginLeft:10,
        fontSize: 11,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    dateSec: {
        alignItems:"center",
        justifyContent:"center",
        borderWidth: 1,
        borderColor: Color.COLOR.RED.AMARANTH,
        borderRadius:25,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection:"row"
    }
})

export default styles;