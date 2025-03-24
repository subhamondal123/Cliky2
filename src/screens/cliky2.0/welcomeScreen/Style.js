import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimension.height,
        width: Dimension.width,
        backgroundColor: '#ffffff'
    },

    welcomeScreen: {
        height: 350,
        width: '100%',
        resizeMode: 'cover',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32
    },

    centerView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },

    redBoder: {
        height: 100,
        width: 100,
        borderRadius: 12,
        borderWidth: 1.6,
        borderColor: Color.COLOR.RED.AMARANTH,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    userImage: {
        height: 90,
        width: 90,
        borderRadius: 100,
        resizeMode: 'cover'
    },

    hiiText: {
        color: "#1F2B4D",
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginTop: 5
    },

    nameText: {
        color: '#1F2B4D',
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD
    },

    swapText: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginTop: 12
    },

    workLoginText: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD
    },

    marginView: {
        // marginHorizontal: "25%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    timeView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    clockImage: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },

    itsText: {
        color: '#1F2B4D',
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },

    timeText: {
        color: '#1F2B4D',
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD
    },

    skipButtonView: {
        alignSelf: "center",
        marginTop: 15,
    },

    buttonAdditionalStyle: {
        borderColor: Color.COLOR.RED.AMARANTH,
        borderWidth: 1
    },

    modalview: {
        justifyContent: 'center',
        maxHeight: Dimension.height - 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#fff",
        bottom: 0,
        right: 0,
        left: 0,
        // position: 'absolute',


    },
    headerModalSec: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#993921',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    swiperStyle: {
        height: Dimension.height / 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }


})

export default styles;