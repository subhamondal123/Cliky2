import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
    },
    mainTab:{
        width:85,
        borderRadius:10,
        backgroundColor:Color.COLOR.BLUE.LOTUS_BLUE,
        justifyContent:"center",
        alignItems:"center",
        paddingBottom:5,
        paddingTop:5,
        paddingRight:10,
        paddingLeft:10,
        marginLeft:5,
        marginRight:5,
        height:85
    },
    mainImg:{
        height:16,
        width:16,
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
        color:Color.COLOR.WHITE.PURE_WHITE
    },
    headingTxt :{
        color: Color.COLOR.BLUE.LOTUS_BLUE, 
        fontSize: FontSize.LG, 
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR, 
        
    },

    //......

    container1: {
        alignItems: 'center',
      },

    rectangle: {
        width: 200,
        height: 100,
        backgroundColor: '#D9D9D9',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
       
      },
      triangle: {
        width: 10,
        height: 10,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#D9D9D9',
        transform: [{ rotate: "180deg" }],
      },

      modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
        borderRadius: 12,
        maxHeight: Dimension.height,
        right: 0,
        left: 0,
        marginHorizontal: "2%",
      },
      modalHeaderTxt:{
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        textAlign:"center"
      },
      selectedLocationTxt:{
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        textAlign:"center"
      }
});

export default styles;