import { StyleSheet } from "react-native";
import { Color, Dimension } from "../../../enums";


const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },
  twelvePointBurst: {},

  twelvePointBurstMain: {
    width: 15,
    height: 15,
    backgroundColor: "red",
    transform: [{ rotate: "20deg" }],
  },
  twelvePointBurst30: {
    width: 15,
    height: 15,
    position: "absolute",
    backgroundColor: "red",
    top: 0,
    left: 0,
    transform: [{ rotate: "155deg" }],
  },
  inActiveBox: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: '#B9C9D4',
    borderRadius: 18,
    padding: 6,
    backgroundColor: '#fff'
  },
  activeBox: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: '#B9C9D4',
    borderRadius: 18,
    padding: 6,
    backgroundColor: '#BED4E4'
  },



});

export default styles;