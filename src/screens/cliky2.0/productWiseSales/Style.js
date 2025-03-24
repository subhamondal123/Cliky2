import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

   container: {
      backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
      height: Dimension.height,
   },
   priceText: {
      color: '#F13748',
      fontFamily: FontFamily.FONTS.POPPINS.BOLD,
      fontSize: FontSize.MD,
      textAlign: 'center'
   },
   verticleLine: {
      height: '100%',
      width: 1,
      backgroundColor: '#909090',
      justifyContent: 'center'
   },
   valueText: {
      fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
      fontSize: FontSize.SM,
      color: '#1F2B4D',
      textAlign: 'center'
   },
   unitText: {
      fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
      fontSize: FontSize.XS,
      color: '#1F2B4D',
      // textAlign:'center'
   },
   unitItemText: {
      fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
      fontSize: FontSize.SM,
      color: '#1F2B4D',
      marginTop: 15
      // textAlign:'center'
   },
   unitPriceText: {
      color: '#F13748',
      fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
      fontSize: FontSize.SM,
      marginTop: 15
   },
   unitPText: {
      color: '#F13748',
      fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
      fontSize: FontSize.XS,
   },
   mainTab: {
      borderRadius: 25,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 5,
      paddingTop: 5,
      paddingLeft: 15,
      paddingRight: 15,
      marginLeft: 5,
      marginRight: 5,
      borderWidth: 1,
      borderColor: Color.COLOR.GRAY.GRAY_TINTS,
   },
   ActiveMainTab: {
      borderRadius: 25,
      backgroundColor: Color.COLOR.RED.AMARANTH,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 5,
      paddingTop: 5,
      paddingLeft: 15,
      paddingRight: 15,
      marginLeft: 5,
      marginRight: 5,
   },

   titleTxt: {
      fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
      fontSize: 12,
      color: "#1F2B4D"
   },
   activeTitleTxt: {
      fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
      fontSize: 12,
      color: Color.COLOR.WHITE.PURE_WHITE
   },
   categoryText: {
      fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
      fontSize: 12,
      color: "#1F2B4D"
   },
   noDataFound: {
      color: Color.COLOR.BLUE.LOTUS_BLUE,
      fontSize:12,
      fontFamily:FontFamily.FONTS.POPPINS.MEDIUM
   }

});

export default styles;