import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../enums";

const styles = StyleSheet.create({
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
    backgroundColor: "#4286A7",
    height: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
  },

  blueViewFlex: {
    flexDirection: 'row',
    marginHorizontal: '5%'
  },

  homeCircel: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  homeLogo: {
    height: 20,
    width: 20,
    resizeMode: 'cover',
    borderRadius: 15,
  },

  saiEnterprisesText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },

  textDealer: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },

  addVisitsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // marginVertical:,
    marginHorizontal: 3,
    backgroundColor: "white"
  },
  addVisitBtnTxt: {
    color: Color.COLOR.BLUE.VIOLET_BLUE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    marginHorizontal: 15,
    paddingVertical: 8
  },
  textFlexView: {
    flexDirection: 'row',
    marginTop: 5,
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    borderBottomWidth: 0.5,
    borderBottomColor: Color.COLOR.GRAY.GRAY_TINTS
  },

  iconView: {
    padding: 5,
    marginRight: 5
  },
  iconImg: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  headerText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },

  textVisites: {
    color: Color.COLOR.GRAY.GRAY_COLOR,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },
})

export default styles;