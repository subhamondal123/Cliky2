import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        // flex: 1
    },
    mainView: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 10
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
        // paddingBottom: '10%',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: 0.8,
        borderRadius: 8,
        marginTop: 20,
        marginHorizontal: '1%'

    },
    iamgeLogo: {
        height: 20,
        width: 20,
        marginTop: 2,
        resizeMode: 'contain'
    },
    flexColumnSec: {
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: '3%'
    },

    blueBox: {
        backgroundColor: "#4286A7",
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
    idText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
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

    inactiveTabText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    tabSec: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    activeUnderline: {
        borderWidth: 1.3,
        borderColor: "#fae141",
        marginTop: 12,
        marginHorizontal: '2%'
    },
    inactiveUnderline: {
        borderWidth: 1.3,
        borderColor: Color.COLOR.GRAY.GRAY_COLOR,
        marginTop: 12,
        marginHorizontal: '2%'

    },
    loaderView: {
        justifyContent: "center",
        alignItems: "center",
        height: Dimension.height,
    },
    recordText: {
        color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        flex: 1
    },
    canlenderSec: {
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
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
    addVisitsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // marginVertical:,
        marginHorizontal: 3,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    addVisitBtnTxt: {
        color: Color.COLOR.BLUE.VIOLET_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        marginHorizontal: 10,
        paddingVertical: 8
    },

    filterLogo: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginLeft: '2%'
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
        flex: 1,
        justifyContent: "flex-end"
    },
    filterBtn: {
        alignItems: 'flex-start',
        height: 25,
        // marginRight: 10
    },
    filterImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },

});

export default styles;