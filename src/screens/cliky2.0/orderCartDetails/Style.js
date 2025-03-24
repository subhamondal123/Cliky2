import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

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
    height: 90,
    borderRadius: 8,
    justifyContent: 'center',
  },

  // profile Sec
  cardSection: {
    flexDirection: "row",
    backgroundColor: "#FFE1E1",
    borderRadius: 20,
    padding: 14,
    alignItems: "center"

  },

  activeCardSection: {
    flexDirection: "row",
    backgroundColor: "#BED9ED",
    borderRadius: 20,
    padding: 14,
    alignItems: "center"

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
    resizeMode: "cover"
  },
  profileDetailsTopSec: {
    flexDirection: "row",
  },
  profileDetailsSec: {
    flex: 1,
    marginTop: 5
  },
  profileMainDetailsSec: {
    marginLeft: 10,
    flex: 1
  },
  iconSection: {
    flexDirection: "row",
  },
  iconImg: {
    height: 40,
    width: 40,
    resizeMode: "contain"
  },
  profileDetailsBottomSec: {
    top: -5
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

  delivaryPartnerView: {
    marginTop: 60,
    marginHorizontal: '5%',
    flexDirection: 'row',
    borderTopColor: '#000',
    borderBottomColor: "#000",
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    alignItems: 'center',
    padding: 4
  },
  deliveryPartnerText: {
    color: "#1F2B4D",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    flex: 1
  },

  // modal Section 

  // ....modal,,,,,
  modalview: {
    backgroundColor: '#fff',
    marginRight: '5%',
    marginLeft: '5%',
    // paddingTop: 40,
    paddingBottom: 30,
    borderRadius: 10

  },
  modalMainView: {
    marginLeft: '5%',
    marginRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },

  marginView: {
    // flexDirection: 'row',
    alignItems: 'flex-end'
  },

  cancelSec: {
    height: 20,
    width: 20,
    borderRadius: 14,
    backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5
  },
  cancelImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },

  canlenderSec: {
    borderColor: Color.COLOR.WHITE.WHITE_SMOKE,
    elevation: 1,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
},
calenderImgSec: {
    borderStyle: 'solid',
    alignSelf: 'flex-end',
    height: 20,
    width: 20,
    bottom: 10
},
calenderLogo: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    right: 10
},


});

export default styles;