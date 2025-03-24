
import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({

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
        paddingBottom: 15,
        marginBottom: 10
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
    },
    noDataFound: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    noDataFoundSec: {
        paddingTop: 20,
        justifyContent: "center",
        alignItems: "center"
    }

})

export default styles