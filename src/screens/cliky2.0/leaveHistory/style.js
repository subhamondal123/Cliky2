import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
  mainBox: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: 0.8,
    borderRadius: 15,
    marginTop: 20
  },

  subBox: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    backgroundColor: '#F5F5F5',
    height: 60,
    justifyContent: 'center'

  },

  selectedsubBox: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    backgroundColor: '#F5F5F5',
    height: 60,
    justifyContent: 'center'

  },


  BoxMarginSec: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  violetSmallBox: {
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    backgroundColor: '#C7ECFF',
    height: 60,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center'

  },

  selectedVioletSmallBox: {
    borderTopLeftRadius: 14,
    // borderBottomLeftRadius: 14,
    backgroundColor: '#C7ECFF',
    height: 60,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center'

  },

  numberText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.INTER.REGULAR,
    fontSize: FontSize.SM
  },

  columnSec: {
    flexDirection: 'column',
    marginLeft: '4%',
    // flex: 0.4,
  },

  auctionText: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  auctionTypeText: {
    color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,

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

  addVisitsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // marginVertical:,
    marginLeft: 3,
    marginRight: 5,
    backgroundColor: "white"
  },
  addVisitBtnTxt: {
    color: Color.COLOR.BLUE.VIOLET_BLUE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    marginHorizontal: 10,
    paddingVertical: 8
  },

  textFlexView: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 8,
    // marginHorizontal: '5%'
  },

  // ........list,,,,,,,,,,,,,,,,
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
    paddingBottom: 30,
    borderRadius: 10

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
    marginTop: 15
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

  selectAll: {
    flexDirection: "row",
    paddingBottom: 10,
    paddingHorizontal: "5%"
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


  blueBox: {
    backgroundColor: "#4286A7",
    height: 50,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
  },

  blueViewFlex: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    justifyContent: 'center'
  },


  saiEnterprisesText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.BOLD,


  },

  textDealer: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.BOLD
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
    height: 20,
    width: 20,
    top: -5,
    resizeMode: "contain"
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
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },

  loaderView: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimension.height / 1.2,

  },

  activeReasonShortName: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD
  },

  circelView: {
    backgroundColor: Color.COLOR.GREEN.SEA_GREEN,
    height: 22,
    width: 22,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },

  leaveCount: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginTop: 1
  },

  reasonText: {
    color: "#747C90",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },

  activeReasonText: {
    color: "#fff",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  reasonShortName: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD
  },

  circelView: {
    backgroundColor: Color.COLOR.GREEN.SEA_GREEN,
    height: 22,
    width: 22,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },

  leaveCount: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginTop: 1
  },

});

export default styles;