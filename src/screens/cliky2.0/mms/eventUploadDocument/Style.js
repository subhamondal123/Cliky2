import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../enums";


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

    underLine: {
        borderWidth: 0.5,
        borderColor: "#6E6C95",
        marginHorizontal: "5%",
        backgroundColor: "#6E6C95"
    },
    mainUnderLine:{
        borderWidth: 0.5,
        borderColor: "#6E6C95",
        marginHorizontal: "5%",
        backgroundColor: "#6E6C95"
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
   
})

export default styles;