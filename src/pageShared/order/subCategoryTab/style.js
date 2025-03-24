import { StyleSheet } from "react-native";
import { FontFamily } from "../../../enums";

const styles = StyleSheet.create({
    mainTab:{
        borderRadius:10,
        backgroundColor:"#F0F4F7",
        justifyContent:"center",
        alignItems:"center",
        paddingBottom:15,
        paddingTop:15,
        paddingRight:10,
        paddingLeft:10,
        marginLeft:5,
        marginRight:5,
        padding:8
    },
    mainImg:{
        height:22,
        width:22,
        resizeMode:"contain"
    },
    imgSec:{
        marginBottom:10
    },
    titleSec:{
        
    },
    titleTxt:{
        fontFamily:FontFamily.FONTS.POPPINS.REGULAR,
        fontSize:12,
        color:"#1F2B4D"
    },
  
})

export default styles;