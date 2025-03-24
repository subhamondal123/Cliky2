import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../enums";

const styles = StyleSheet.create({

  tooltipText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    fontSize: FontSize.SM
  },

  tooltipListView: {
    justifyContent:"center",
    alignItems:"center",
    // paddingHorizontal: 10,
    paddingVertical: 5,
  },
  //For modal css
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

  headerActionArea: {
    flexDirection: 'row',
    alignItems: "center",
    paddingBottom: 10,
    // paddingTop: 10,
    paddingHorizontal: 20,
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
  checkBoxView: {
    alignSelf: "center",
    alignItems: "center",
    flex: 0.1,
    marginLeft: 10
  },
  productBtn: {
    position: "absolute",
    bottom: "5%",
    alignSelf: 'center',
    width: "100%",
    marginHorizontal: "35%"
  },
  buttonView: {
    height: 55,
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.COLOR.BLUE.CAPRI,
  },
  buttonText: {
    fontSize: FontSize.SM,
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
  },
  selectAll: {
    flexDirection: "row",
   flex:1
  },
  selectAllTxt: {
    paddingLeft: 10,
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    fontSize: FontSize.SM
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


  // ..........for list item

  mainBox: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    elevation: 2,
    shadowColor: '#000',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5


  },
  blueBox: {
    backgroundColor: Color.COLOR.RED.AMARANTH,
    height: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: "center"
  },
  blueViewFlex: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: "center"
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
  textDealer: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.BOLD
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
  iconImg: {
    height: 15,
    width: 15,
    resizeMode: "contain"
  },

  arrowImg: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },

  starImg: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    marginRight:5
  },

  // Modal Section Start
  modalview: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: Dimension.width,
    alignSelf: 'center',
    bottom: -21,
    position: 'absolute',
  },

  modalstatusview: {
    maxHeight: Dimension.height / 1.2,
    backgroundColor: '#fff',
    marginRight: '5%',
    marginLeft: '5%',
    paddingBottom: 60,
    borderRadius: 10
  },
  modalStatusHeaderSec: {
    backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
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
  redCrossImg: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    alignSelf: 'center'
  },

  cancelButton: {
    backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: 14,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },

  labelText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.INTER.REGULAR,
    fontSize: FontSize.XS
  },

});

export default styles;
