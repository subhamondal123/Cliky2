import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../enums";

const styles = StyleSheet.create({

    headingTxt: {
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: FontSize.LG,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },
    headingLabelTxt:{
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.XS,
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
    membersSecTxt:{
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 11,
        color: Color.COLOR.BLUE.EBONY_CLAY,
    },

//list section
    bottomTxt:{
        color: "#A6B3BC",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    }
  
})

export default styles;