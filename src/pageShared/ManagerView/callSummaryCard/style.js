import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({
    // Call summery section
    callSummMainView: {
        backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        padding: 15,
        borderRadius: 10,
        marginTop: 20
    },

    callSummTitleText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    callSummMainBodyView: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: Color.COLOR.GRAY.GRAY_COLOR,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: Color.COLOR.GRAY.GRAY_COLOR,
    },

    callSummSubBodyView: {
        marginTop: 10,
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRightWidth: 0.5,
        borderRightColor: Color.COLOR.GRAY.GRAY_COLOR
    },

    callSummProgressView: {
        flexDirection: "column",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    callSummPercentageView: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    callSummPercentageText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    callSumTargetText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    callSummAvgView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    callSummAvgTarget: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    callSummAvgText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    tcGrowthTitleView: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    tcGrowthTitleText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    tcGrowthMainView: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    tcGrowthAmountText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    ltdLmtdText: {
        color: Color.COLOR.GRAY.CORDUROY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    tcGrowthPercentageView: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },

    tcGrowthPercentageText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    tcGrowthArrowImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    netValMainView: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: "#F13748",
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },

    netValText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    netValAmountText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

})

export default styles