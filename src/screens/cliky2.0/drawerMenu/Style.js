import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: Color.COLOR.BLUE.DS_BLUE,
  },
  clickTab: {
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  txtViewSec: { marginLeft: "5%", flex: 1 },
  analyticsTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  analyticsDataTxt: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  subContainer: {
    width: "85%",
    height: "100%",
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
  },
  drawerSec: { backgroundColor: Color.COLOR.RED.AMARANTH },
  selectLogoutSec: {
    flexDirection: "row",
    // marginTop: 10,
    // marginRight: 10,
    // marginBottom: 10,
  },
  selectMenuSec: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    //  width: "70%",
    // marginRight: 10 
  },
  selectMenuTab: {
    alignSelf: "center",
    backgroundColor: "#b23349",
    borderRadius: 20,
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 5,
  },
  itemNameTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  editTab: {
    backgroundColor: "#b23349",
    height: 32,
    width: 32,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  logOutTab: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 10,
  },
  logOutImg: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    alignSelf: "center",
  },
  first_designationNameSec: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    paddingBottom: 10,
    top: -10,
  },
  uriImgSec: {
    borderWidth: 3,
    borderColor: "#F8B200",
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  uriImg: {
    height: 70,
    width: 70,
    borderRadius: 100,
    resizeMode: "cover"
  },
  firstNameTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
  },
  designationNameTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  versionTxtSec: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 10,
    paddingTop: 10,
    paddingRight: 10,
  },
  versionTxt: {
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    color: Color.COLOR.GRAY.GRAY_COLOR,
    fontSize: FontSize.XS,
  },
  viewStyle: {
    width: 50,
    backgroundColor: Color.COLOR.BLUE.DS_BLUE,
    height: "100%",
  },
});
export default styles;
