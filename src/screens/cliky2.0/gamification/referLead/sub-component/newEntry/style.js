import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },

    headerMainView: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
        marginHorizontal: '3%'
    },

    backImg: {
        height: 28,
        width: 28,
        resizeMode: "contain"
    },
    headerCoinsSec: {
        borderColor: '#000',
        borderWidth: 0.5,
        padding: 5,
        borderRadius: 100,
        marginRight: '5%',
        marginTop: 4
    },

    headerCoinUnderSec: {
        marginHorizontal: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    threeDot: {
        height: 25,
        width: 25,
        resizeMode: "contain"
    },

    yellowCoinsLogo: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    circelBackground: {
        height: 40,
        width: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFECC8'
    },
    mainView: {
        // marginHorizontal: '5%',
        marginTop: 10
    },

    centerView: {
        marginHorizontal: '15%',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    referLeadLogo: {
        height: 180,
        width: 180,
        resizeMode: 'cover'
    },

    textReferLead: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginTop: 8
    },

    flexRowView: {
        marginTop: 8,
        flexDirection: 'row'
    },

    textReferrenceId: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },

    referrenceNo: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },

    pdfImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    textCustomerInfo: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginTop: 10
    },

    textLocation: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },

    locationView: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    contactInfo: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },


});

export default styles;