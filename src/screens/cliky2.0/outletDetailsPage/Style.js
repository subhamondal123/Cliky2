import { StyleSheet } from "react-native";
import {
    Color,
    Dimension,
    FontFamily,
    FontSize,
    Padding,
} from "../../../enums";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1,
    },
    backImg: {
        height: 20,
        width: 20,
        resizeMode: "contain",
    },

    // Modal Section Start
    headerSec: {
        marginHorizontal: "5%",
        marginTop: 10,
        flexDirection: "row",
    },

    //-----------------------------------------------------//

    //modal section,


    activeTab: {
        paddingHorizontal: 4,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1F2B4D",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        marginHorizontal: 10,
    },

    inActiveTab: {
        paddingHorizontal: 4,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 0.5,
        borderColor: "#000",
        marginHorizontal: 10,
    },

    activeText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },

    inActiveText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    footerSec: {
        marginHorizontal: "5%",
        flexDirection: "row",
        marginTop: 45,
        bottom: 0,
        position: "absolute",
        marginBottom: 10,
    },
    headerSec: {
        marginVertical: 10,
        flexDirection: "row",
        marginHorizontal: 15,
        alignItems: "center",
    },
    BackImg: {
        height: 25,
        width: 25,
        resizeMode: "contain"
    },
    business_imgSec: {
        flex: 0.8,
        flexDirection: "row",
        alignItems: "center"
    },
    imgUriSec: {
        height: 35,
        width: 35,
        borderRadius: 100
    },
    uriImg: {
        height: 35,
        width: 35,
        borderRadius: 100,
        resizeMode: "cover"
    },
    businessNameTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    footerBtnSec: {
        flexDirection: "row",
        marginTop: 8
    },
    visitClickTab: {
        backgroundColor: "#1F2B4D",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 8,
        flex: 1,
    },
    footerBtnImg: {
        height: 22,
        width: 22,
        resizeMode: "contain"
    },
    tabBarSec: {
        flexDirection: "row",
        marginHorizontal: 15,
        // width:"100%",
        alignItems: "center",
        justifyContent: "center",
    },
    loaderSec: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    profileImgLoaderSec: {
        height: 240,
        justifyContent: "center",
        alignItems: "center",
    },
    profilePicModal: {
        flexDirection: "row",
        bottom: 3,
        position: "absolute"
    },
    profilePicModalTabSec: {
        flex: 0.2,
        alignItems: "center"
    },
    profilePicModalTab: {
        backgroundColor: "red",
        height: 45,
        width: 45,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    ptrMrp: {
        marginHorizontal: 10,
        marginTop: 10
    },
    ptrMrpImgSec: {
        flexDirection: "row",
        marginTop: 8
    },
    callRecieveImg: {
        height: 30,
        width: 30,
        resizeMode: "contain"
    },
    achivedImg: {
        height: 70,
        width: 140,
        resizeMode: "contain"
    },
    ptrMrpImgsection: {
        flex: 1,
        alignItems: "center"
    },
    ptrMrpTxtSec: {
        flexDirection: "row",
        marginTop: 3
    },
    ptrTxtSec: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "5%",
    },
    ptrMrpTxt: {
        color: Color.COLOR.BLACK.BLACK_PEARL,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginTop: 5,
    },
    mrpTxtSec: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginRight: "5%",
    },
    ptrMrpValTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.XS,
    },
    viewStyle: {
        borderBottomColor: "#000",
        borderBottomWidth: 0.8,
        top: -1
    },

    //


    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // width: Dimension.width,
        // marginLeft:20,
        // marginRight:20,
        maxHeight: Dimension.height / 1.5,
        // alignSelf: 'center',
        // right: 0,
        // left: 0,
        // bottom: -21,
        // position: 'absolute',
        // position: 'absolute',
    },
    dropdownSec: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        height: 28,
        width: 28,
        backgroundColor: '#9298a9',
        borderRadius: 100,
        marginTop: 10,
        alignSelf: "flex-end"
    },

});

export default styles;
