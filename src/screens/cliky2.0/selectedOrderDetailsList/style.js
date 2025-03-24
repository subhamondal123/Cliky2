import { StyleSheet } from "react-native";
import { Color, Dimension } from "../../../enums";


const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },

  mainView: {
    marginHorizontal: 15,
    marginTop: 20,
  
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



});

export default styles;