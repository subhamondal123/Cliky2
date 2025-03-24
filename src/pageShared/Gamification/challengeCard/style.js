import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({

    challengeHeaderSec: {
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10
    },
    pointsTxt: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.SM,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    mainBox:{
        borderRadius:20,
        backgroundColor:"#D0F1F3",
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        paddingTop:10,
        marginHorizontal:5,
        width:Dimension.width - 30
    },
    profileImgSec: {
        height: 70,
        width: 70,
        alignItems:"center",
        justifyContent: "center",
        borderRadius: 40,
        // alignSelf: 'center'
    },
    profileImg: {
        height: 70,
        width: 70,
        borderRadius: 40,
        resizeMode: "cover",
        alignSelf: 'center'
    },
    mainChallengerDesc:{
        flex:1,
        marginLeft:15
    },
    surveyChallengerDesc:{
        flex:1,
    },
    challengerName:{
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: FontSize.SM,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    challengerLoc:{
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 11,
        color: "#747C90",
    },
    challengerLocAccept:{
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 11,
        color: "#747C90",
        textAlign:"right"
    },
    challengerLocAcceptMid:{
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 11,
        color: "#747C90",
    },

    challengerLocCompanyAccept:{
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 11,
        color: "#763B3B",
        textAlign:"right"
    },

    challengerLocAcceptCompanyMid:{
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 11,
        color: "#763B3B",
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
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
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
        padding:10,
        marginHorizontal:5,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        paddingTop:10,
        width:Dimension.width - 30
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
    },
    acceptChallengeHeaderSec:{
        flexDirection:"row",
        alignItems:"center",
        marginLeft:5
    },
    acceptchallengerName:{
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: FontSize.XS,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    loyaltyPointsSec:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",
        paddingRight:10,
        marginTop:10
    },
    loyaltyPointsSec_Company:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",
        paddingRight:10,
        marginTop:15
    },
    saleSec:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        marginTop:10,
        marginLeft:5
    },
    saleSec_company:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        marginTop:20,
        marginLeft:5,
        marginBottom:10
    },

    profileChallengerSec:{
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        marginTop:10
    },
    profDateTxt:{
        textAlign:"right",
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 10,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    progressBarSec:{
        marginTop:5,
        marginRight:10,
        marginLeft:10
       
    },
    challengerLocRedTxt:{
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 11,
        color: "#763B3B",
    }

  
})

export default styles;