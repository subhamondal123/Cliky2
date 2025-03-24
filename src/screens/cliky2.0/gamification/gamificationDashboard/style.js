import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../enums";

const styles = StyleSheet.create({

    progressHeaderTxt: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.XL,
        color: "#1F2B4D",
    },
    headerTxt: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.XL,
        color: "#1F2B4D",
    },
    progressFooterTxt: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.XS,
        color: "#1F2B4D",
        textAlign:"center"
    },
    progressValueTxt:{
      fontFamily: FontFamily.FONTS.INTER.BOLD,
      fontSize: FontSize.XS,
      color: "#1F2B4D",
    },
    footerTxt: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.XS,
        color: "#1F2B4D",
    },
    mainImg: {
        height: 16,
        width: 16,
        resizeMode: "contain"
    },
    progressBarSec: {
        marginVertical: 10
    },

    mainSec: {
        borderRadius: 15,
        borderColor: "#D1D1D1",
        // backgroundColor: "#D1D1D1",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginHorizontal: 2,
        paddingVertical: 2,
        marginTop: 5
    },
    labelTxt: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.XS,
        color: "#63677A",
    },
    mainImg: {
        height: 16,
        width: 16,
        resizeMode: "contain"
    },
    starImg: {
        height: 60,
        width: 60,
        resizeMode: "contain"
    },
    starSecTxt: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.XS,
        color: Color.COLOR.WHITE.PURE_WHITE,
    },
    starSecLevelTxt:{
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: 10,
        color: Color.COLOR.WHITE.PURE_WHITE,
    },
    
    triangleLeftShapeView:{
        width: 35,     // for width
        height: 0,
        borderBottomWidth: 50, //for height
        // borderBottomColor: "red",
        borderLeftWidth: 25, // for top left width
        borderLeftColor: "transparent",
        // borderRightWidth: 25,
        // borderRightColor: "transparent",
        borderStyle: "solid",
    },
    triangleRightShapeView:{
        width: 35,     // for width
        height: 0,
        borderBottomWidth: 50, //for height
        borderBottomColor: "red",
        // borderLeftWidth: 25, // for top left width
        // borderLeftColor: "transparent",
        borderRightWidth: 25,
        borderRightColor: "transparent",
        borderStyle: "solid",
    },
    footerLevelTxt:{
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: FontSize.XS,
        color: Color.COLOR.BLACK.PURE_BLACK,
    },
    footerLevelDateTxt:{
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.XS,
        color: Color.COLOR.BLACK.PURE_BLACK,
    },
    modalstatusview: {
        maxHeight: Dimension.height / 1.1,
        width: Dimension.width - 20,
        width:"100%",
        backgroundColor: '#fff',
        borderRadius:20
       
      },
      modalStatusHeaderSec: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingTop: 1,
        paddingBottom: 15,
      },
      marginView: {
        marginLeft: '5%',
        flexDirection: 'row'
      },
    
      profileNameText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        flex: 1
      },
      congratulationTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
      },
      congratulationBottomTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
      },
      pointAmountTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 20,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
      },
      pointTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 16,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
      },

      //promotion modal

      promotionTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 24,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
      },
      promotionLevelTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 28,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
      },
      promotionLevelBottomTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        textAlign:"center"
      },
      promotionLevelValueTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
      },
      //top performer
      topTeamTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
      },
      topTeamLabel:{
        paddingTop:30,
        paddingBottom:20
      },

      //challenges
      challengesSec:{
        justifyContent:"center",

      },
      challengeLabelTxt:{
        textAlign:"center",
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
      },
      trophyImg:{
        height:200,
        width:Dimension.width,
        resizeMode:"stretch"
      },
      contentContainer: {
        flexGrow: 1,
      },
    
})

export default styles;