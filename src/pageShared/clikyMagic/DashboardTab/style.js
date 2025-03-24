import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    mainSec: {
        borderRadius: 20,
        borderColor: "#D1D1D1",
        backgroundColor:Color.COLOR.WHITE.PURE_WHITE,
        borderWidth: 1,
        marginHorizontal:2,
        paddingVertical:5,
        paddingLeft:5,
        paddingRight:5,
        width:180,
        marginBottom:20,
    },
    labelTxt: {
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: FontSize.XS,
        color: "#63677A",
    },
    rightLabelTxt:{
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        fontSize: 11,
        color: Color.COLOR.WHITE.PURE_WHITE,
    },
    mainImg: {
        height: 22,
        width: 22,
        resizeMode: "contain"
    },
    rightIconImg:{
        height: 18,
        width: 18,
        resizeMode: "contain"
    }
})

export default styles;