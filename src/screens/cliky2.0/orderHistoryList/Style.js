import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily } from "../../../enums";


const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
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
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
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
    backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,

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

});

export default styles;