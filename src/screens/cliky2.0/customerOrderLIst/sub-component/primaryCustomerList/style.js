import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../enums";


const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },
  headingTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,

  },
  mainBox: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    elevation: 2,
    shadowColor: '#000',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5,
  },

  blueBox: {
    backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
    height: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
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