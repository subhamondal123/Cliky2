import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },
  noOrderText: {
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    fontSize: FontSize.XS,
    color: '#1F2B4D'
  },
  noText: {
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    fontSize: FontSize.XS,
    color: '#1F2B4D',
    marginLeft:50
  },
  dateSec: {
    flexDirection: 'row'
  },
  calenderImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  textCircle: {
    backgroundColor: '#1F2B4D',
    width: 22,
    height: 22,
    borderRadius: 15,
    marginLeft: 10,
    justifyContent: 'center'
  },
  circleText: {
    color: '#fff',
    textAlign: 'center',
  },
  secInfo: {
    height: 50,
    backgroundColor: '#F0F4F7',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row'
  },
  secImg: {
    backgroundColor: '#F13748',
    width: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10
  },
  secGreenImg: {
    backgroundColor: '#00B65E',
    width: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10
  },
  img: {
    width: 15,
    height: 15,
  },
  textSec: {
    justifyContent: 'center',
    marginLeft: 10
  }

});

export default styles;