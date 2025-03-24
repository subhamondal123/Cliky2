import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

  blueViewFlex: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: "center",
  },
  mainView: {
    backgroundColor: "#F5F5F5",
    elevation: 2,
    shadowColor: '#000',
    shadowRadius: 8,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5,
    padding: 10,
    marginTop: 8
  },

  boxView: {
    padding: 8,
    backgroundColor: '#b4d6d2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: '3.5%'
  },
  textdate: {
    color: "#156A94",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },
  textDay: {
    color: "#156A94",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.REGULAR
  },
  textCount: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },
  textVisitCount: {
    color: "#63677A",
    fontSize: 10,
    fontFamily: FontFamily.FONTS.INTER.REGULAR,
    marginLeft: '5%',
    marginTop: 2
  },
  subViewImage: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },
  textAmount: {
    color: '#EF5C5C',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },
  imageDropDown: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginLeft: '5%',
    marginTop: 4
  },
  imageLogo: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginTop: 2
  },
  odometerOtherText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.REGULAR,
    marginLeft: '2%'
  },
  textKM: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },
  odometrAmount: {
    color: "#156A94",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },
  otherAmount: {
    color: "#EF5C5C",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.REGULAR
  },
  otherExpText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.REGULAR,
    marginLeft: '2%'
  },
  childView: {
    backgroundColor: "#E8E7E7",
    borderColor: "#000",
    borderWidth: 0.3,
    borderRadius: 12,
    padding: 15,
    marginTop: 10
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 15
  },
  userNameText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },
  loactionText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.REGULAR
  },
  rankText: {
    color: "#D9D9D9",
    fontSize: FontSize.XXL,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },
  inTextSec: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inTimeText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.REGULAR
  },
  timeValueText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },
  flexRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  locationImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  blueUnderline: {
    flex: 1,
    height: 2,
    backgroundColor: '#286a94'
  },
  marginTopView: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center'
  },
  loactionStartEndText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },
  greenOdometerLogo: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginTop: 2
  },
  bikeText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.REGULAR,
    marginLeft: '5%'
  },

  // odometer Sec CSS
  textOdometer: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.LIGHT
  },
  textOdometerKM: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    marginLeft: '5%'
  },
  odometerTextAmount: {
    color: '#156A94',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },

  // =======================================================

  // foodSection start from here

  foodTextAmount: {
    color: '#EF5C5C',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM

  },


  // ===========================================Modal Section Start


  whiteDeleteLogo: {
    height: 15,
    width: 15,
    resizeMode: "contain"
  },
  deleteLogoSec: {
    justifyContent: "center",
    backgroundColor: "#F76770",
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: "center",

  },
  TakephotoImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
    backgroundColor: "#fff"
  },
  flexANdMarginView: {
    width: 100,
    margin: 5
  },

  logisticImageView: {
    flex: 1,
    height: 100,
    borderRadius: 12,
  },
  addImgField: {
    width: "100%",
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    marginTop: 15,
    // borderWidth: 0.8,
    justifyContent: 'center',
    alignItems: "center",
    // borderStyle: "dashed"
  },

  addImg: {
    height: 100,
    width: 100,
    borderRadius: 15,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },

  addImgIcon: {
    height: 100,
    width: 100,
    resizeMode: 'contain'
  },

  imageMainView: {
    marginLeft: '3%',
    marginRight: '3%'
  },
  mainImageView: {
    flexDirection: 'row',
    marginTop: 20
  },
  imgUploadView: {
    backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
    height: 80,
    width: 80,
    borderRadius: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tauchableSec: {
    height: 90,
    width: 90,
    borderRadius: 60,
    borderColor: Color.COLOR.BLUE.VIOLET_BLUE,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },


  pageLoaderViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: '10%'
  },
  photoSec: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  foodExpenseTitle:
  {
    color: "#22253A",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  }
});

export default styles;