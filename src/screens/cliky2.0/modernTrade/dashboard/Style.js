import { StyleSheet } from "react-native";
import { COLOR } from "../../../../enums/color";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimension.height,
    width: Dimension.width,
    backgroundColor: '#ffffff'
},
  outletBtn: {
    backgroundColor: '#F0F4F7',
    height: 119,
    width: 119,
    alignItems: 'center',
    justifyContent: 'center'
  },
  outletTxt: {
    color: '#1F2B4D',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500'
  },
  modalview: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
    borderRadius: 12,
    maxHeight: Dimension.height,
    right: 0,
    left: 0,
    marginHorizontal: "2%",
  },
  modalHeaderTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    textAlign: "center"
  },
  selectedLocationTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    textAlign: "center"
  },

  greaySec: {
    // marginLeft: '5%',
    // marginRight: '5%',
    marginTop: 10
  },
  greayBox: {
    height: 60,
    backgroundColor: '#F0F4F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    flexDirection: 'row'
  },

  boxTextSec: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
    paddingRight: 5
  },

  reasonText: {
    color: "#747C90",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,

  },
})
export default styles;