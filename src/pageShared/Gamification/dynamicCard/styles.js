import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    mainCard:{
        backgroundColor:Color.COLOR.BLACK.PURE_BLACK,
        borderRadius:20,
        elevation:2,
        // paddingBottom:10
    },
    positionTxt:{
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize:9,
        color: "#9C85D1",
    },
    executiveTxt:{
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize:FontSize.XS,
        color:Color.COLOR.WHITE.PURE_WHITE,
    },
    executiveBottomTxt:{
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize:9,
        color:Color.COLOR.WHITE.PURE_WHITE,
    },
    acheivementPercentTxt:{
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize:FontSize.XL,
        color:Color.COLOR.WHITE.PURE_WHITE,
    },
    starSecLevelTxt:{
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize:11,
        color:Color.COLOR.BLACK.PURE_BLACK,
        transform:[{
            rotate:'20deg'
        }]
    }
})

export default styles;