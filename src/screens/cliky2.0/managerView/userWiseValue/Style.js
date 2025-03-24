
import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../../enums";

const styles = StyleSheet.create({

    noDataFound: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    noDataFoundSec: {
        paddingTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    borderLine: {
        borderTopColor: Color.COLOR.GRAY.GRAY_COLOR,
        borderTopWidth: 0.5
    },
    mainScreenSec: {
        margin: 20,
        marginBottom: 100
    },
    headerSec: {
        flexDirection: 'row',
        marginBottom: 20
    },
    labelSec: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5
    },
    labelIconSec: {
        height: 18,
        width: 18,
        borderRadius: 5
    },
    labelTxt: {
        marginHorizontal: 7,
        color: Color.COLOR.GRAY.CORDUROY,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    listSec: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleSec: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    titleTxt: {
        textAlign: 'right',
        color: Color.COLOR.GRAY.CORDUROY,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    bodySec: {
        flex: 0.8,
        borderLeftWidth: 0.5,
        borderLeftColor: Color.COLOR.BLACK.PURE_BLACK
    },
    countTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    }


})

export default styles