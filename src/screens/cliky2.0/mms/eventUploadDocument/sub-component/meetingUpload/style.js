import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../../../enums";

const styles = StyleSheet.create({
   

    container: {
        backgroundColor: "#ffffff",
        height: Dimension.height,
    },
    headerTxtMain: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.LG
    },
    detailHeaderSec: {

    },
    detailFooterSec: {

    },
    mainHeadSec: {
        marginHorizontal: "5%"
    },

    mainHeadRightSec: {
        flex: 0.5,
        padding: 5,
        alignItems: "flex-end"
    },
    mainHeadLeftSecTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.LG
    },
    statusTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        fontSize: 13
    },
    statusMainTxt: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: 12
    },
    statusFooterSec: {
        flexDirection: "row",
        borderRadius: 25,
        paddingLeft: 20,
        backgroundColor: Color.COLOR.SKY.EMERALD,
        alignItems: "center",

    },
    statusTypeTxt: {
        color: Color.COLOR.SKY.PEARL_AQUA,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XS
    },
    statusFieldTxt: {
        color: Color.COLOR.SKY.FLORA,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XL,
        position: "absolute",

    },
    statusTxtSection: {
        backgroundColor: Color.COLOR.SKY.PEARL_AQUA,
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15
    },
    underLine: {
        borderWidth: 0.5,
        borderColor: "#6E6C95",
        marginHorizontal: "5%",
        backgroundColor: "#6E6C95"
    },

    mainHeaderMiddleSec: {
        flex: 1,
        alignItems: "flex-end",
        padding: "5%"
    },
    eventTypeTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 14
    },
    mainHeaderIdSec: {
        // padding:"5%",
        flex: 1,
        flexDirection: "row",
        marginHorizontal: "5%"
    },
    idTxt: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontFamily: FontFamily.FONTS.INTER.EXTRA_BOLD,
        fontSize: 11,
    },
    idLeftSec: {
        flex: 0.5,
        paddingRight: 5,
        borderRightWidth: 1,
        borderRightColor: "#f5f5f5",
    },
    idRightSec: {
        flex: 0.5,
        paddingLeft: 5,
        // borderR:"#f5f5f5"
    },
    eventDateTimmeSec: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#EAEAEA",
        padding: "5%",
        marginVertical: "5%"
    },
    dateSec: {
        flexDirection: "row",
        flex: 0.4,
    },
    calenderImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    dateTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 14,
    },
    timeSec: {
        flexDirection: "row",
        paddingHorizontal: "5%",
        borderRightWidth: 1,
        borderRightColor: "#7C7C7C",
        flex: 0.3
    },
    minutesSec: {
        flexDirection: "row",
        flex: 0.3
    },
    locationSec: {
        flexDirection: "row",
        paddingHorizontal: "5%",
        paddingBottom: "5%"
    },
    locationData: {
        flex: 1,
        alignItems: "flex-end",
        paddingHorizontal: "3%"

    },
    locationImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    dealerDistributorSec: {
        flexDirection: "row",
        paddingHorizontal: "5%"

    },
    distributorSec: {
        flex: 0.5,
        paddingHorizontal: "2%"
    },
    distributorLabel: {
        paddingBottom: 5
    },
    dealerSec: {
        flex: 0.5,
        alignItems: "flex-end"
    },
    dealerLabel: {
        paddingBottom: 5
    },
    meetingSection: {
        padding: "5%"
    },
    descriptionTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: 13
    },
    budgetDataSec: {
        flexDirection: "row",
        paddingHorizontal: "5%",
        marginVertical: "5%",

    },
    companyBudgetSec: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "flex-end",
        paddingBottom: "1%"
    },
    approvedBudgetSec: {
        flex: 0.5,
        alignItems: "flex-end",
    },
    budgetLeftDataTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: 12
    },
    budgetLeftDataAmountTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: 12
    },
    approvedBudgetAmount: {
        color: "#2FA5BF",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 24
    },
    buttonSec: {
        flexDirection: "row",
        marginVertical: "5%",
        paddingHorizontal: "5%",
        alignItems: "center"
    },

    updateButtonSec: {
        flex: 1
    },
    cameraImg: {
        height: 45,
        width: 45,
        resizeMode: "contain"
    },
    tabMeetingButtonSec: {
        flexDirection: "row",
        height: 65,
        flex: 0.3,
        backgroundColor: Color.COLOR.BLUE.DARK_BLUE,
        paddingHorizontal: "4%",
        paddingVertical: "4%",
        justifyContent: "space-evenly",
        // alignItems:"center",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

    },
    tabAttendeeButtonSec: {
        flexDirection: "row",
        height: 65,
        flex: 0.33,
        backgroundColor: "#BECDF4",
        paddingHorizontal: "4%",
        paddingVertical: "4%",
        justifyContent: "space-evenly",
        // alignItems:"center",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    tabDocumentButtonSec: {
        flexDirection: "row",
        height: 65,
        flex: 0.33,
        backgroundColor: "#F3E990",
        paddingHorizontal: "4%",
        paddingVertical: "4%",
        justifyContent: "space-evenly",
        // alignItems:"center",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    group: {
        width: 15,
        height: 15,
        resizeMode: "contain"
    },
    tabButtonTxt: {
        color: "#D6D4FF",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 10
    },
    tabAttendeeButtonTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 10
    },
    tabDocButtonTxt: {
        color: "#74690C",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 10
    },
    body: {
        // height: Dimension.height,
        backgroundColor: "#070457",
    },
    mainBody: {
        bottom: 25,
        // height: Dimension.height,
        backgroundColor: "#070457",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    mainHeadBody: {
        alignItems: "center",
        paddingBottom: "5%"
    },
    mainHeaderLogo: {
        height: 130,
        width: 130,
        resizeMode: "contain"
    },
    headerLogoSec: {
        paddingTop: "5%"
    },
    headerLogoTxt: {
        color: "#C7C6E9",
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 11
    },
    arraySection: {
        marginHorizontal: "5%"
    },
    photoSec: {
        // margin:"3%",
        // width:"33%"
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
    addImgField: {
        height: 80,
        width: "100%",
        backgroundColor: Color.COLOR.BLUE.DARK_BLUE,
        borderRadius: 10,
        marginTop: 15,
        borderColor: Color.COLOR.WHITE.PURE_WHITE,
        borderWidth: 0.8,
        justifyContent: 'center',
        alignItems: "center",
        borderStyle: "dashed"
    },

    addImg: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImgIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    flexANdMarginView: {
        flex: 0.33,
        marginHorizontal: '2%'
    },
    logisticImageView: {
        flex: 1,
        height: 100,
        borderRadius: 12,
    },
    mainView: {
        marginLeft: '3%',
        marginRight: '3%'
    },
    mainImageView: {
        flexDirection: 'row',
        marginTop: 20
    },
    TakephotoImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 15,
        backgroundColor:"#fff"
    },
    remarkSec:{
        marginHorizontal:"5%",
        marginVertical:"5%"
    },
    bottomButtonSec:{
        marginVertical:"10%",
        marginHorizontal:"25%"
    },


    whiteDeleteLogo:{
        height:15,
        width:15,
        resizeMode:"contain"
    },
    deleteLogoSec:{
        justifyContent:"center",
        backgroundColor:"#F76770",
        height:24,
        width:24,
        borderRadius:12,
        alignItems:"center",

    }

});

export default styles;
