import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        // height: Dimension.height,
        // flex: 1
    },

    touchableBox: {
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        flex: 1
    },

    textPayment: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginLeft: '8%'
    },

    yellowCircel: {
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS
    },

    whiteEdit: {
        height: 15,
        width: 15,
        resizeMode: 'contain'
    },
    headerTxtMain: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.LG
    },
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 12,
        height: Dimension.height / 1.2,
        marginHorizontal: "2%",
    },
    successfullImg:{
        height:150,
        width:150,
        resizeMode:"contain"
    },
    successTitleTxt:{
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.LIGHT,
        fontSize: 14,
        textAlign:"center"
    },
    successTxt:{
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: 24
    },
    proposedId:{
        marginVertical:"8%"
    },
    proposedIdTxt:{
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 14,
        textAlign:"center"
    },
    idTxt:{
        textAlign:"center",
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: 20
    },
    questionSec:{
        marginVertical:"5%"
    },
    questionTxt:{
        color: "#737373",
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: 14,
        textAlign:"center"
    }


});

export default styles;