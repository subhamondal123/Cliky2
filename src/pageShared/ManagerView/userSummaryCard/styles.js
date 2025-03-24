import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
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
        // justifyContent: "center",
        // alignItems:"center",
        borderTopWidth: 0.5,
        borderTopColor: Color.COLOR.GRAY.GRAY_COLOR,
        paddingTop: 10
    },

    userSummProgressView: {
        marginTop: 10,
        width: Dimension.width / 4.8,
        // flex: 0.25,
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
})
export default styles;