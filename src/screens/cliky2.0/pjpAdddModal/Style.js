import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },
    backImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height,
        right: 0,
        left: 0,
        marginHorizontal: "2%",
    },
    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textAlign: 'center'
    },
    marginView: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: '5%',
        marginRight: '3%'
    },
    cancelSec: {
        height: 22,
        width: 22,
        borderRadius: 14,
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        justifyContent: 'center',
        alignItems: 'center',
        right: 6
    },
    cancelImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    canlenderSec: {
        height: 45,
        backgroundColor: "#F0F4F7",
        elevation: 1,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    calenderImgSec: {
        marginRight: 10, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    calenderLogo: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        right: 10
    },
    selectionText: {
        color: Color.COLOR.GRAY.DARK_GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginLeft: '5%'
    },
    selectLabelText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: 21,
        flex: 1
    },
    buttonView: {
        height: 50,
        borderRadius: 10,
        marginTop: '10%',
        marginHorizontal: '5%'
    },
    linearGradient: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.RED.AMARANTH
    },
    buttonText: {
        fontSize: FontSize.MD,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    }



});

export default styles;