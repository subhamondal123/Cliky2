import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../../enums";

const styles = StyleSheet.create({

    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },

    headerLine: {
        borderTopColor: Color.COLOR.GRAY.GRAY_COLOR,
        borderTopWidth: 0.5
    },

    mainView: {
        margin: 20,
        marginBottom: 100
    },

    // User summery section
    userSummMainView: {
        backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        padding: 15,
        borderRadius: 10
    },

    userSummTitleView: {
        flexDirection: 'row',
        marginBottom: 10
    },

    userSummTitle: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    userSummTotal: {
        color: Color.COLOR.GRAY.CORDUROY,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    userSummNum: {
        marginLeft: 15,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    userSummBodyView: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: Color.COLOR.GRAY.GRAY_COLOR,
        paddingTop: 10
    },

    userSummProgressView: {
        marginTop: 10,
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    userSummScoreView: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    userSummScoreText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    userSummProgressTitle: {
        color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

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
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    callSumTargetText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
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

    // Primary Ctegory wise order vs sales progress section
    orderVsSalesView: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    orderVsSalesText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    tagMainView: {
        flexDirection: 'row',
        marginTop: 20,
        borderTopWidth: 0.5,
        borderTopColor: Color.COLOR.GRAY.GRAY_COLOR,
        paddingTop: 20
    },

    orderSalesTagView: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: Color.COLOR.RED.AMARANTH,
        padding: 8
    },

    orderSalesTagText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    mtdProgressMainView: {
        marginTop: 20,
        flexDirection: 'row'
    },

    orderSalesIndicatorView: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    orderIndicatorView: {
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        height: 10,
        width: 10,
        marginRight: 5
    },

    orderIndicatorText: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    orderSaleAmountText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    mtdProgressView: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center'
    },

    mtdProgressText: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    mtdProgressAmountText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XXXL,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    saleIndicatorMainView: {
        flex: 0.3,
        alignItems: 'flex-end'
    },

    saleIndicatorView: {
        backgroundColor: "#F13748",
        borderRadius: 10,
        height: 10,
        width: 10,
        marginRight: 5
    },

    momMainView: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    momPercentageText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    momArrowImg: {
        height: 10,
        width: 10,
        resizeMode: 'contain'
    },

    momText: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    // DGM wise order section
    dgmMainView: {
        marginTop: 20,
        backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        padding: 15,
        borderRadius: 10
    },

    dgmTitleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Color.COLOR.GRAY.GRAY_COLOR,
        borderBottomWidth: 0.5,
        paddingBottom: 15
    },

    dgmTitleText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        flex: 1
    },

    dgmMtdView: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 5,
        padding: 5,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    dgmMtdText: {
        color: "#4488A9",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    dgmBarChartMainView: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    dgmNameView: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },

    dgmBarView: {
        flex: 0.8,
        flexDirection: 'row'
    },

    dgmAmountView: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
 
    dgmAmountText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    }

})

export default styles;