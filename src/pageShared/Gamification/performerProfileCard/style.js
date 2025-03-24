import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({

    headingTxt: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.LG,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    pointsTxt: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.SM,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    rewardPointSec: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: Color.COLOR.GRAY.DAVY_GRAY,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    //top performer section
    mainBox: {
        backgroundColor: "#F0F4F7",
        width: 200,
        borderRadius: 15,
        paddingVertical: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    profileSec: {
        height: 90,
        width: 90,
        // alignItems:"center",
        justifyContent: "center",
        borderRadius: 500,
        alignSelf: 'center'
    },
    profileImg: {
        height: 90,
        width: 90,
        borderRadius: 500,
        resizeMode: "cover",
        alignSelf: 'center'
    },
    profileNameTxt: {
        textAlign: "center",
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: FontSize.SM,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    zoneTxt: {
        fontWeight: "400",
        textAlign: "center",
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: FontSize.XS,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    achievementPercentageTxt: {
        fontWeight: "400",
        textAlign: "center",
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.MD,
        color: Color.COLOR.RED.AMARANTH,
    },
    prcntTxt: {
        fontWeight: "400",
        textAlign: "center",
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 8,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    thumbImg: {
        height: 25,
        width: 25,
        // borderRadius:500,
        resizeMode: "contain",
        alignSelf: 'center'
    },
    likedSec: {
        marginTop: 10,
        height: 45,
        width: 45,
        backgroundColor: Color.COLOR.RED.AMARANTH,
        borderRadius: 500,
        alignItems: "center",
        justifyContent: "center"
    },

    
})

export default styles;