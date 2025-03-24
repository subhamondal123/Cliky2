import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../enums";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
  },
  contactListBox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#fff',
    marginTop: 20,
    padding: "2%",
    borderRadius: 10,
    marginHorizontal: "5%",
    flexDirection: 'row'
  },

  noDataFoundTxt: {
    textAlign: "center",
    color: Color.COLOR.BLACK,
    fontFamily: FontFamily.FONTS.INTER.BLACK,
  },
  editBtn: {
    resizeMode: "contain",
    width: 20,
    height: 20,
  },
  deleteBtn: {
    resizeMode: "contain",
    width: 20,
    height: 20,
  },
  tooltipText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    fontSize: FontSize.SM
  },
  contactListLeftView: {
    width: '40%'
  },
  contactListRightView: {
    width: "60%",
  },
  contactLabelTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    fontSize: FontSize.SM
  },
  contactValueTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.INTER.LIGHT,
    fontSize: FontSize.SM,
  },
  tooltipView: {
    alignItems: 'flex-end',
    alignSelf: 'flex-start'
  },
  tooltipListView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  //For modal css

  modalview: {
    maxHeight: Dimension.height,
    backgroundColor: '#fff',
    marginRight: '5%',
    marginLeft: '5%',
    paddingBottom: 60,
    borderRadius: 10

  },
  modalHeaderSec: {
    backgroundColor: Color.COLOR.RED.AMARANTH,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10

  },
  profileNameText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    marginLeft: "5%"
  },
  cancelSec: {
    height: 25,
    width: 25,
    borderRadius: 14,
    // backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
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
  modalMainView: {
    marginLeft: '5%',
    marginRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  filterImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  filterBtn: {
    alignItems: 'flex-start',
    height: 25,
    marginRight: 10
  },
  actionBtn: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
  },
  headerActionArea: {
    flexDirection: 'row',
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE
  },
  filter_action_btn: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    // width:"90%",
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
    flex: 1,
    flexDirection: "row"
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
  filterFooterSec: {
    flex: 1,
    padding: 20,
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
    marginBottom: 5


  },
  blueBox: {
    backgroundColor: Color.COLOR.RED.AMARANTH,
    height: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center'
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
  addVisitsButton: {
    paddingLeft: 6,
    paddingRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flex: 0.1
  },
  // addVisitesText: {
  //   color: "#3168ff",
  //   fontSize: FontSize.XS,
  //   fontFamily: FontFamily.FONTS.INTER.BOLD
  // },
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
  arrowCircel: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,

  },
  arrowImg: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  tooltipBtn: {
    height: 25,
    width: 25,
    resizeMode: "contain"
  },
  starImg: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    marginRight:5
  },


});

export default styles;
