import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({

    headingTxt: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.LG,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    pointsTxt:{
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.SM,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    rewardPointSec:{
        flexDirection:"row",
        alignItems:"center",
        borderRadius:20,
        borderWidth:0.5,
        borderColor:Color.COLOR.GRAY.DAVY_GRAY,
        paddingVertical:5,
        paddingHorizontal:10,
    },

//list section
    mainBox: {
        backgroundColor: "#F0F4F7",
        elevation: 2,
        shadowColor: '#000',
        borderRadius: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        paddingHorizontal:15,
        paddingVertical:5,
        // marginBottom: 5
        flexDirection:"row",

    },
    blueBox: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        // height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center'
    },
    blueViewFlex: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        alignItems: "center"
    },
    homeCircel: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:10
    },
    homeLogo: {
        height: 28,
        width: 28,
        resizeMode: 'cover',
        borderRadius: 15,
    },
    saiEnterprisesText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    nameTxt:{
        color: Color.COLOR.BLUE.EBONY_CLAY,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    zoneTxt:{
        color: Color.COLOR.BLUE.EBONY_CLAY,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    posTxt:{
        color: "#A6B3BC",
        fontSize: FontSize.XL,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    posLvlTxt:{
        color: "#A6B3BC",
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    percentageTxt:{
        color: Color.COLOR.RED.AMARANTH,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    }

  
})

export default styles;