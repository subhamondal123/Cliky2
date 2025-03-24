import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({

    challengeHeaderSec: {
        flexDirection:"row",
        // flex:1,
        // alignItems:"center",
        // marginHorizontal:5,
        // backgroundColor:"green",
        
    },
    pointsTxt: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.SM,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    mainBox:{
        // borderRadius:20,
        // backgroundColor:"#D0F1F3",
        marginHorizontal:5,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:20,
        width:Dimension.width - 30,
    },
    profileImgSec: {
        height: 140,
        width: 140,
        alignItems:"center",
        justifyContent: "center",
        // alignSelf: 'center'
    },
    profileImg: {
        height: 140,
        width: 140,
        resizeMode: "contain",
    },
    mainChallengerDesc:{

        alignItems:"flex-end",
        // flex:1,
        // justifyContent:"flex-end",
        // alignItems:"flex-start",
        paddingLeft:5,
        paddingRight:130,
        // backgroundColor:"green"
    },
    challengerName:{
        textAlign:"right",
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: FontSize.SM,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    challengerLoc:{
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 11,
        color: "#747C90",
        textAlign:"left"
    },
    challengerLocBotom:{
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 11,
        color: "#747C90",
        textAlign:"right"
    },

    starImgSec: {
        top:-5,
        height: 45,
        width: 45,
        alignItems:"center",
        // justifyContent: "flex-start",
        // alignSelf: 'center'
    },
    starImg: {
        height: 45,
        width: 45,
        resizeMode: "stretch",
        alignSelf: 'center'
    },
    labelTxt:{
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 10,
        color: Color.COLOR.WHITE.PURE_WHITE,
    },
    coinIcon:{
        height: 10,
        width: 10,
        resizeMode: "contain",
    },
    winningPoints:{
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        fontSize: 11,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    termsCondition:{
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 11,
        color: "#1F2B4D",
        textDecorationLine:"underline"
    },

    // for company

    mainCompanyBox :{
        borderRadius:20,
        backgroundColor:"#FFE1E1",
        padding:10
    },
    realEdgeImgSec: {
        top:-5,
        height: 75,
        width: 75,
        alignItems:"center",
        // justifyContent: "flex-start",
        // alignSelf: 'center'
    },
    realEdgeImg:{
        height: 75,
        width: 75,
        resizeMode: "contain",
        alignSelf: 'center'
    }
  
})

export default styles;