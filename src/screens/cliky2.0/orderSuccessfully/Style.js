import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },

  // profile Sec
  cardSection: {
    flexDirection: "row",
    backgroundColor: "#FFE1E1",
    borderRadius: 20,
    padding: 14,
    alignItems: "center",
  },

  profileSec: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },

  profileImgSec: {
    height: 60,
    width: 60,
    borderRadius: 30,
    resizeMode: "cover",
    borderColor: "#d1d1d1",
    borderWidth: 1,
  },

  profileDetailsTopSec: {
    flexDirection: "row",
  },

  profileDetailsSec: {
    flex: 1,
    marginTop: 5,
  },

  profileMainDetailsSec: {
    marginLeft: 10,
    flex: 1,
  },

  iconSection: {
    flexDirection: "row",
  },

  iconImg: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },

  profileDetailsBottomSec: {
    top: -5,
  },

  profileNameTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },

  profileTypeTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },

  // =================================================================================

  textMainView: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  youHaveText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },

  succesfullyText: {
    color: "#F13748",
    fontSize: 24,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    marginTop: 18,
  },

  pleaseOrderText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginTop: 5,
  },
  activityLoader: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimension.height / 1,
  },
  lottieLoadSec: {
    justifyContent: "center",
    alignItems: "center"
  },
  viewStyle: {
    marginTop: 50,
    borderWidth: 0.5,
    borderColor: "#000"
  },
  orderTxtSec: {
    flexDirection: "row",
    marginTop: 15
  },
  orderTxt: {
    color: "#1F2B4D",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    flex: 1,
  },
  hashTxt: {
    color: "#1F2B4D",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  orderStatusTxt: {
    color: "#1F2B4D",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    flex: 1,
    marginTop: 3,
  },
  approveStatusSec: {
    backgroundColor: "#D1D1D1",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  approveStatusTxt: {
    color: "#5F5F5F",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  deliveryStatus: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 5,
  },
  bigBtnSec: {
    marginHorizontal: "28%",
    marginTop: 20
  },
  outLetPageTab: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.COLOR.RED.AMARANTH,
    marginHorizontal: "25%",
    padding: 5,
    borderRadius: 18,
  },
  goShopePage: {
    color: "#FFFFFF",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  dateConvertTxt: {
    color: "#1F2B4D",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
});

export default styles;
