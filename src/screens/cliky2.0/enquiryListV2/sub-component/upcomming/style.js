import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../../enums";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
  },
  tooltipText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    fontSize: FontSize.SM
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
  modalHeaderSec: {
    backgroundColor: Color.COLOR.RED.AMARANTH,
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

  cancelSec: {
    height: 25,
    width: 25,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    top: -15,
    left: 1
  },

  cancelImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
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
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 10,
    // paddingHorizontal: 20,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE
  },

  filter_action_btn: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.2,
    // width:"90%",
    justifyContent: "flex-end",
    marginLeft:20
  },

  crossImgView: {
    flex: 0.2
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
    paddingBottom: 10,
    paddingHorizontal: "5%"
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
    marginBottom: 5
  },

  blueBox: {
    backgroundColor: Color.COLOR.RED.AMARANTH,
    height: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: "center",
  },

  blueViewFlex: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: "center",
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

  addVisitsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 2,
    marginHorizontal: 5,
    backgroundColor: "white"
  },

  addVisitBtnTxt: {
    color: Color.COLOR.RED.AMARANTH,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    marginHorizontal: 10,
    paddingVertical: 10
  },

  textFlexView: {
    flexDirection: 'row',
    marginTop: 5,
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    // marginHorizontal: '5%',
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
  headerAssignedText:{
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: 11,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },
  textVisites: {
    color: Color.COLOR.GRAY.GRAY_COLOR,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },
  textAssignedVisites:{
    color: Color.COLOR.GRAY.GRAY_COLOR,
    fontSize: 10,
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

  cancelSec: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    top: -5
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
  starImg: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    marginRight: 5
  },
  subImgLogo: {
    height: 18,
    width: 18,
    resizeMode: 'center'
},

subBoxText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.BOLD
},

conversionButton: {
    flexDirection: 'row',
    marginLeft: '2%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    elevation: 2,
    borderColor: Color.COLOR.RED.AMARANTH,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: 0.8,
},
subCircel: {
  height: 20,
  width: 20,
  borderRadius: 18,
  backgroundColor: Color.COLOR.RED.AMARANTH,
  justifyContent: 'center',
  alignItems: "center",
  marginRight: 5
},
modalview_feedback: {
  backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
  // paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
  borderRadius: 12,
  maxHeight: Dimension.height,
  right: 0,
  left: 0,
  marginHorizontal: "5%"
},
feedbackForm:{
  flexDirection:"row",
  backgroundColor:Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
  borderRadius:10,
  padding:10,
  marginBottom:5,
  
},
feedbackLabel:{
  color: Color.COLOR.BLACK.PURE_BLACK,
  fontSize: FontSize.XS,
  fontFamily: FontFamily.FONTS.INTER.BOLD
},
feedbackLabelData:{
  color: Color.COLOR.BLACK.PURE_BLACK,
  fontSize: FontSize.XS,
  fontFamily: FontFamily.FONTS.INTER.MEDIUM
},
inputBoxStyle: {
  height: 45,
  backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
  elevation: 1,
  borderRadius: 15,
  flexDirection: 'row',
  alignItems: 'center'
},

inputBoxText: {
  fontSize: FontSize.SM,
  fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
  marginLeft: 21,
  marginRight: 10,
  flex: 1,
  color: Color.COLOR.GRAY.DARK_GRAY_COLOR
},

});

export default styles;
