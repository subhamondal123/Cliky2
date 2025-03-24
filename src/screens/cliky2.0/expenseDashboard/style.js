import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginHorizontal: 10
    },
    bottomTxtCalender: {
        marginTop: 10,
        flexDirection: "row"
    },
    endTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.XS
    },
    startTxt: {
        color: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XS
    },
    boxView: {
        // alignItems: 'center',
        flexDirection: "row",
        alignItems: "center",
        flex: 1

    },
    textdate: {
        color: "#156A94",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    textDay: {
        color: "#156A94",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR
    },
    textCount: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    textVisitCount: {
        color: "#63677A",
        fontSize: 18,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,

        marginTop: 2
    },
    subViewImage: {
        height: 15,
        width: 15,
        resizeMode: 'contain'
    },
    iconImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    textAmount: {
        color: '#EF5C5C',
        fontSize: 16,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    imageDropDown: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        marginLeft: '10%'
    },
    mainView: {
        backgroundColor: "#f5f5f5",
        elevation: 3,
        shadowColor: '#000',
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 10,
        padding: 10,

    },
    skeletonView: {

        borderRadius: 8,
        height: 70,
        marginBottom: 10,

    },
    skeletonCalenderView: {
        borderRadius: 8,
        height: 35,
        marginBottom: 10,
    },
    skeletonCalenderMainView: {
        borderRadius: 8,
        height: 250,
        marginVertical: 10,
    },
    skeletonCalenderBottomView: {
        width: Dimension.width - 100,
        borderRadius: 8,
        height: 30,
        // marginVertical: 10,

    },
    activeTabViewTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    tabViewTxt: {
        color: Color.COLOR.GRAY.GRAY_TINTS,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    tabView: {
        borderWidth: 1,
        borderColor: Color.COLOR.GRAY.GRAY_TINTS,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5
    },
    chartFilterSec:
    {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    circle:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:"red"
    },
    dotText:{
        color: Color.COLOR.GRAY.CORDUROY,
        fontSize: 8,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    underLine:{
        borderWidth:0.5,
        borderColor:Color.COLOR.GRAY.CORDUROY,
        marginTop:10
    }
})

export default styles;