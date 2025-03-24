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
        alignItems: "center",
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
        resizeMode: "cover",
    },
    profileDetailsTopSec: {
        flexDirection: "row",
    },
    profileDetailsSec: {
        flex: 1,
        marginTop: 5,
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
        resizeMode: "contain",
    },
    profileDetailsBottomSec: {
        top: -5,
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
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    headingTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    titleTxt: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12,
        color: "#1F2B4D",
    },
    activeTitleTxt: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12,
        color: Color.COLOR.WHITE.PURE_WHITE,
    },

    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: "#000",

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 5,
    },

    blueBox: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        height: 110,
        borderRadius: 15,
        justifyContent: "center",
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
        paddingRight: 15,
    },
    categorySection: {
        flexDirection: "row",
        marginTop: 15,
        marginHorizontal: 15,
    },
    categoryMapSection: {
        flexDirection: "row",
        marginBottom: 10
    },
    dialPadImgSec: {
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        height: 22,
        width: 22,
        borderRadius: 11,
        marginRight: 5,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    dialPadImg: {
        height: 18,
        width: 18,
        resizeMode: "contain",
        borderRadius: 50,
    },
    listSec: {
        marginHorizontal: 15,
        marginTop: 10
    },
    totalAmountSec: {
        flexDirection: "row",
        marginTop: 5,
        alignItems: "center",
        marginRight: 10,
    },
    productViewModalSec: {
        flexDirection: "row",
        alignItems: "flex-start",
        flex: 1,
    },
    redParcentageLogo: {
        height: 26,
        width: 26,
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    productModalTxtTab: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: "2%",
    },
    totalAmountTxtSec: {
        flexDirection: "row",
        justifyContent: "flex-end",
        flex: 1,
    },
    totalAmountTxt: {
        color: "#747C90",
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: "5%",
    },
    viewStyle: {
        borderTopWidth: 1,
        borderColor: "#89CDEF",
        marginTop: 12,
        flex: 1,
    },
    upArrowTab: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    rateInput: {
        // width: "60%",
        // flex:0.5,
        width:70,
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        borderWidth: 0.8,
        borderColor: "#000",
        borderRadius: 20,
    },
    txtInputStyle: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        textAlign: "center"
    },
    ptrMrpTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginLeft: "2%",
    },
    productRateTxt: {
        color: Color.COLOR.GRAY.TAPA,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    editableUnitInputSec: {
        // flex: 0.4,
        flexDirection: "row"
    },
    editableUnitInput: {
        width: 70,
        // flex:0.4,
        // paddingHorizontal:15,
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        borderWidth: 0.8,
        borderColor: "#000",
        borderRadius: 20,
    },
    averageTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: "2%",
    },
    whiteTickImgSec: {
        height: 28,
        width: 28,
        borderRadius: 100,
        backgroundColor: Color.COLOR.GREEN.PURE_GREEN,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: Color.COLOR.WHITE.PURE_WHITE,
    },
    whiteTickImg: {
        height: 15,
        width: 15,
        resizeMode: "contain"
    },
    suggestedOrderSec: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 50,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5CA0C3",
    },
    suggestedOrderTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        marginLeft: "2%",
    },
    reloadWhiteImgTabSec: {
        width: "15%",
        alignItems: "flex-end",
        marginRight: 5,
    },
    reloadWhiteImgTab: {
        height: 35,
        width: 35,
        borderRadius: 100,
        backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,
        justifyContent: "center",
        alignItems: "center",
    },
    reloadWhiteImg: {
        height: 20,
        width: 20,
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    suggestedOrdercbSec: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 50,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#79BADB",
    },
    offerSec: {
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    avalaibleNowTxt: {
        color: "#DFF4FE",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        marginLeft: "2%",
    },
    headerSec: {
        marginTop: 10,
        flexDirection: "row",
        marginHorizontal: 15
    },
    backImg: {
        height: 25,
        width: 25,
        resizeMode: "contain"
    },
    profileTab: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 5,
    },
    imgPreviewSec: {
        height: 35,
        width: 35,
        borderRadius: 100
    },
    titleTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    cardTab: {
        flex: 0.2,
        backgroundColor: "#F13748",
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 18,
        height: 35,
    },
    shoppingImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    cartCountTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        marginTop: 2,
    },
    categorySec: {
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 5,
        marginHorizontal: 15,
    },
    footerSec: {
        marginHorizontal: "3%",
        marginTop: 10
    },
    selectedTxtSec: {
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    selectedTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
    itemLengthTxt: {
        color: Color.COLOR.RED.AMARANTH,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: 10,
    },
    addCartTxt: {
        width: "43%",
        justifyContent: "center"
    },
    addTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        marginTop: 2,
    },
    categoryskeletonSec: {
        flexDirection: "row",
        marginTop: 10,
        marginHorizontal: 8,
    },
    categoryskeletonStyle: {
        height: 30,
        width: 80,
        marginHorizontal: 5,
        borderRadius: 12,
    },
    searchProductInputsec: {
        flexDirection: "row",
        marginTop: 12,
        alignItems: "center",
        marginHorizontal: 15,
    },
});

export default styles;
