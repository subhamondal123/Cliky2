import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

  // ........list,,,,,,,,,,,,,,,,

  tooltipText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    fontSize: FontSize.SM
  },
  headerLabelText: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    fontSize: 11
  },

  tooltipListView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  //For modal css
  modalview: {
    backgroundColor: '#fff',
    marginRight: '5%',
    marginLeft: '5%',
    // paddingTop: 40,
    paddingBottom: 30,
    borderRadius: 10

  },
  modalImageView: {
    backgroundColor: '#fff',
    marginHorizontal: '5%',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10
  },
  dateData: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: 12,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },

  modalHeaderSec: {
    backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10

  },
  marginView: {
    marginLeft: '5%',
    flexDirection: 'row'
  },
  profileNameText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    flex: 1
  },

  filterImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  calenderImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  tooltipBtn: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  filterBtn: {
    alignItems: 'flex-start',
    height: 25,
    marginRight: 10
  },
  calenderBtn: {
    alignItems: 'flex-start',
    marginRight: 10
  },

  headerActionArea: {
    flexDirection: 'row',
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal:12,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE
  },
  filter_action_btn: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end"
  },
  crossImgView: {
    flex: 1
  },
  crossImg: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },

  priorityChangeButton: {
    backgroundColor: Color.COLOR.BLUE.PACIFIC,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },

  cancelButton: {
    backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: 14,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
  },
  // ..........for list item
  mainBox: {
    // paddingBottom: '10%',
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
    backgroundColor: Color.COLOR.RED.AMARANTH,
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
    height: 28,
    width: 28,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  saiEnterprisesText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },

  arrowCircel: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  arrowCircelUp: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  arrowImg: {
    height: 10,
    width: 10,
    resizeMode: "contain"

  },
  loaderView: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimension.height / 1.2,

  },
  headerTxt: {
    color: Color.COLOR.RED.AMARANTH,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    textAlign: 'center'
  },
  inOutImg: {
    height: 90,
    width: 90,
    resizeMode: 'cover',
    marginVertical: 15,
    borderRadius: 25,
    backgroundColor: "#e6f2ff"
  },
  logoImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },

  meterImg: {
    height: 17,
    width: 17,
    resizeMode: 'contain'
  },
  dateTimeTxt: {
    color: Color.COLOR.GRAY.GRAY_TINTS,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    marginTop: 1
  },
  modalFilterview: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE, borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: Dimension.width,
    alignSelf: 'center',
    bottom: -21,
    position: 'absolute',
  },
  crossImgSec: {
    height: 25,
    width: 25,
    borderRadius: 20,
    backgroundColor: Color.COLOR.GRAY.SONIC_SILVER,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 5
  },

  labelText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.INTER.REGULAR,
    fontSize: FontSize.XS
  },
  inputBoxStyle: {
    height: 45,
    backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
    elevation: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputBoxText: {
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    marginLeft: 21,
    marginRight: 10,
    flex: 1
  },
  redCrossImg: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    alignSelf: 'center'
  },

});

export default styles;