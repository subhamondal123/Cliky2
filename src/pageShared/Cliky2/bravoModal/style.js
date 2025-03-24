import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: Dimension.width / 1.1,
        // maxHeight: Dimension.height,
        alignSelf: 'center',
        // right: 0,
        // left: 0,
        bottom: -21,
        position: 'absolute',
        // position: 'absolute',
    },
    verticleLine: {
        height: '100%',
        borderWidth: 0.3,
        backgroundColor: '#AAB6BF',
        marginLeft: '2%'
    },
    TextSec: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },

    canlenderText: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        textAlign: 'center'
    },

    dateText: {
        color: "#1F2B4D",
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        textAlign: 'center'
    },
    bravoText: {
        color: "#F13748",
        fontSize: FontSize.XL,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        marginTop: 15,
        textAlign: 'center'
    },
    deddleText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        textAlign: 'center',
        marginTop: 10
    },
    activityText: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },



    userPSec: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 100,
        marginLeft: 10,
        borderWidth: 0.5,
        borderColor: "#000"
    },
    userPImage: {
        height: 30,
        width: 30,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    userTextSec: {
        marginLeft: 20,
        flex: 1,
        justifyContent: 'center',
    },
    nameText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
    dText: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    dropdownSec: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        height: 28,
        width: 28,
        backgroundColor: '#9298a9',
        borderRadius: 100,
        marginTop: 10
    },
    crossIcon: {
        width: 30,
        height: 30,
        borderRadius: 20,
        resizeMode: 'contain'
    },

})

export default styles;