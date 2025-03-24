import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        backgroundColor: "#ffffff",
        flex: 1
    },
    backgroundImageView: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 50
    },
    belowImageView: {
        marginHorizontal: "10%",
        marginTop: 25
    },
    loginText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: 36,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },
    passConfirmText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontSize: 14,
        fontFamily: FontFamily.FONTS.INTER.LIGHT,
        marginTop: 20,
        // textAlign: 'center'
    },
    forgotDescriptionText: {
        fontSize: FontSize.SM,
        color: Color.COLOR.GRAY.PHILIPPINE_SILVER,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginHorizontal: "10%",
        textAlign: "center"

    },
    headView: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        borderRadius:10,
        backgroundColor:"#fff",
        alignSelf:"center"
    },
    forgotText: {
        fontSize: 18,
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },

    formInputSection: {
        marginTop: 25,
        marginHorizontal: "10%",
    },
    formLabel: {
        fontSize: 13,
        color: Color.COLOR.GRAY.PHILIPPINE_SILVER,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    formInputBox: {
        height: 55,
        backgroundColor: Color.COLOR.PURPLE.LAVENDER,
        elevation: 1,
        borderRadius: 10
    },
    formTextInput: {
        fontSize: FontSize.XS,
        color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        marginHorizontal: 17,
        flex: 1
    },
    buttonSection: {
        marginTop: 23
    },
    buttonView: {
        height: 55,
        borderRadius: 10,
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.RED.AMARANTH
    },
    linearGradient: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: FontSize.MD,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    backImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginTop: 10
    },
    backSec: {
        flexDirection: 'row',
        marginHorizontal: "5%"
    },
    backgroundImage: {
        width: 135,
        height: 135,
        resizeMode: 'contain'
    },
    keyImgSec: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEECFA',
        height: 120,
        width: 120,
        borderRadius: 30,
        elevation: 2,
    },
    keyImg: {
        height: 65,
        width: 65,
        resizeMode: 'contain'
    },
})

export default styles;