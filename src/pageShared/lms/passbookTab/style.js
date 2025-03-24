import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily } from "../../../enums";


const styles = StyleSheet.create({
    mainView: {
        height:102,
        width:Dimension.width/3 - 15,
        paddingHorizontal:15,
        paddingVertical:15,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        elevation:1
    },
    labelTxt:{
        color:Color.COLOR.WHITE.PURE_WHITE,
        fontFamily:FontFamily.FONTS.INTER.MEDIUM,
        fontSize:14,
        textAlign:"center"
    }
});

export default styles;