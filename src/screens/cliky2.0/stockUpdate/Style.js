import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
    },
    cardSection: {
        flexDirection: "row",
        backgroundColor: "#FFE1E1",
        borderRadius: 20,
        padding: 10,
        alignItems: "center"

    },
    profileSec: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    profileImgSec: {
        height: 60,
        width: 60,
        borderRadius: 30,
        resizeMode: "cover"
    },
    profileDetailsTopSec: {
        flexDirection: "row",
    },
    profileDetailsSec: {
        flex: 1,
        marginTop: 5
    },
    profileMainDetailsSec: {
        marginLeft: 10,
        flex: 1,
    },
    iconSection: {
        flexDirection: "row",
    },
    iconImg: {
        height: 40,
        width: 40,
        resizeMode: "contain"
    },
    profileDetailsBottomSec: {
        top: -5
    },
    profileNameTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    profileTypeTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    percentageTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 9,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    headingTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,

    },
    titleTxt: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12,
        color: "#1F2B4D"
    },
    activeTitleTxt: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12,
        color: Color.COLOR.WHITE.PURE_WHITE
    },

    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 5,
    },

    blueBox: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        height: 110,
        borderRadius: 15,
        justifyContent: 'center',
    },
    mainTab: {
        borderRadius: 25,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderColor: Color.COLOR.GRAY.GRAY_TINTS,
    },
    ActiveMainTab: {
        borderRadius: 25,
        backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,

        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 5,
        marginRight: 5,
    },
    borderText: {
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15
    }

});

export default styles;