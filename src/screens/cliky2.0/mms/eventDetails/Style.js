import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../../enums";


const styles = StyleSheet.create({
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
        flexDirection: "row",
        marginHorizontal: "5%"
    },
    mainHeadLeftSec: {
        flex: 0.5,
        padding: 5,
        justifyContent: "flex-end"
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
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: 12
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
        borderColor: "#f5f5f5",
        marginHorizontal: "5%",
        backgroundColor: "#f5f5f5"
    },

    mainHeaderMiddleSec: {
        flex: 1,
        alignItems: "flex-end",
        padding: "5%"
    },
    eventTypeTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 13,

    },
    locationTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 13,
        textAlign: "right"
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
        marginVertical: "5%",
        alignItems: "center",

    },
    dateSec: {
        flexDirection: "row",
        flex: 0.4,
        alignItems: "center"
    },
    calenderImg: {
        height: 16,
        width: 16,
        resizeMode: "contain"
    },
    dateTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 13,
    },
    timeSec: {
        flexDirection: "row",
        paddingHorizontal: "5%",
        borderRightWidth: 1,
        borderRightColor: "#7C7C7C",
        flex: 0.3,
        alignItems: "center"
    },
    minutesSec: {
        flexDirection: "row",
        flex: 0.3
    },
    locationSec: {
        flexDirection: "row",
        marginHorizontal: "5%",
        paddingBottom: "5%",
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
        // flexDirection: "row",
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
    }
})

export default styles;