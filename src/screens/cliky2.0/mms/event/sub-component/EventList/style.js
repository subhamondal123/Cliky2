import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../../../../enums";

const styles = StyleSheet.create({

    tooltipText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.SM
    },

    tooltipListView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    //For modal css

    modalview: {
        backgroundColor: '#fff',
        marginRight: '5%',
        marginLeft: '5%',
        paddingBottom: 30,
        borderRadius: 10

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
        // alignItems: 'flex-start',
        // height: 25,
        marginRight: 5
    },

    headerActionArea: {
        flexDirection: 'row',
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    },
    filter_action_btn: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end",
    },
    filter_btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingLeft:15
    },
    crossImgView: {
        flex: 1
    },
    crossImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    checkBoxView: {
        alignSelf: "center",
        alignItems: "center",
        flex: 0.1,
        marginLeft: 10
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
    // ..........for list item

    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        borderRadius: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 5,
        padding: 20

    },

    listDataHeaderSection: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    listDataFooterSection: {
        flex: 1,
        flexDirection: "row",
        marginTop: 10
    },
    listDataLeftSection: {
        // backgroundColor:"pink",
        flex: 0.6
    },
    listDataRightSection: {
        padding:5,
        flex: 0.4,
        // alignSelf:"flex-end",
        // backgroundColor:"green",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    headTitle: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontSize: 16,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontWeight: "700"
    },
    slNo: {
        color: Color.COLOR.BLUE.MAGENTA_BLUE,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },
    dateTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontSize: 13,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 10
    },
    statusLogo: {
        height: 32,
        width: 32,
        borderRadius: 16,
        // flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    },
    statusLogoTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 32,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        position: "absolute"
    },
    statusNameTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontSize: 13,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },
    calenderLogo: {
        height: 15,
        width: 15,
        resizeMode: "contain"
    },
    proposedBudgetLabelTxt: {
        color: Color.COLOR.BLUE.MAGENTA_BLUE,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    budgetValue: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontSize: 18,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontWeight: "600"
    },



    blueBox: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
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
    textDealer: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },

    textFlexView: {
        flexDirection: 'row',
        marginTop: 5,
        paddingVertical: "5%",
        paddingHorizontal: "5%",
        borderBottomWidth: 0.5,
        borderBottomColor: Color.COLOR.GRAY.GRAY_TINTS
    },
    iconView: {
        padding: 5,
        marginRight: 5
    },

    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    textVisites: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    iconImg: {
        height: 15,
        width: 15,
        resizeMode: "contain"
    },

    arrowImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },

    starImg: {
        height: 15,
        width: 15,
        resizeMode: "contain",
        marginRight: 5
    },

    headerDataBox: {
        height: 120,
        borderRadius: 20,
        justifyContent: 'center',
        padding: 20,
        marginHorizontal: 15
    },
    headerDataViewFlex: {
        paddingHorizontal:'3%'
    },

    headerTextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataSection: {
        flexDirection: "row",

    },
    dataLabelTxt: {
        color: Color.COLOR.PURPLE.DAVY_PURPLE,
        fontSize: FontSize.XXS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    dataValueTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 16,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    dataUpcmingLabelTxt: {
        color: Color.COLOR.PURPLE.DAVY_PURPLE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    upcmingDataValueTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 26,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    mainStatusData: {
        flex: 0.2,
        paddingRight: 5
    },
    mainStatusRejectData: {
        flex: 0.2,
        alignItems: "flex-start",
        flexDirection: "row"

    },
    searchTextSec: {

        flexDirection: 'row',
        flex: 1
    },
    searchImgSec: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
    },
    searchImg: {
        width: 28,
        height: 28,
        resizeMode: 'contain'
    },


});

export default styles;
