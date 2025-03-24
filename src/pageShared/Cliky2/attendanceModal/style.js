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
    welcomeScreen: {
        height: Dimension.height/3,
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
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD
    },

    swapText: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginTop: 12
    },

    workLoginText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD
    },

    marginView: {
        justifyContent:"center",
        alignItems:"center",
        marginTop: 10
    },

    timeView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    clockImage: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },

    itsText: {
        color: '#1F2B4D',
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    timeText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD
    },

    skipButtonView: {
        marginHorizontal: "38%",
        marginTop: 15
    },

    buttonAdditionalStyle: {
        borderColor: Color.COLOR.RED.AMARANTH,
        borderWidth: 1
    },


})

export default styles;