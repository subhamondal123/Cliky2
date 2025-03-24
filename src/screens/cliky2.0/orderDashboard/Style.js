import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },

  todayOrderCard: {
    backgroundColor: "#F0F4F7",
    padding: 14,
    marginTop: 20,
    borderRadius: 15
  },

  marginSec: {
    marginHorizontal: '3%',
    flexDirection: 'row'
  },

  todayOrderText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  todayOrderValueText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  mtText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  qtyText: {
    color: "#F13748",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  lastWeekOrderStatusText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginTop: 5
  },

  flexRow: {
    flexDirection: 'row',
    marginTop: 8
  },

  approvedSec: {
    backgroundColor: '#00B65E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 105,
    height: 32
  },

  partialSec: {
    backgroundColor: '#F8B200',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 105,
    height: 32
  },

  pendingSec: {
    backgroundColor: '#D1D1D1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 105,
    height: 32
  },
  truckImg:{
    height:27,
    width:42,
    resizeMode:"contain"
  }


});

export default styles;