
import { StyleSheet } from "react-native";
import { Color, Dimension } from '../../../../enums';

const styles = StyleSheet.create({

  container: {
    height: Dimension.height,
    backgroundColor: "#fff",
    flex: 1
  },
  advisorySec: {
    backgroundColor: "#172834",
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    paddingVertical: 15,
    marginHorizontal: 10
  },
  dottedLine: {
    width: 0.5,                  // Adjust the width of the line
    height: 100,               // Adjust the height of the line
    borderStyle: 'dotted',    // Set the line style to dotted
    borderColor: 'black',     // Set the color of the line
    borderWidth: 0.5,            // Set the width of the border
  },
  dashedLine: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 2,                 // Adjust the width of the line
    height: 100,              // Adjust the height of the line
  },
  dash: {
    width: 2,
    height: 10,               // Adjust the height of the dashes
    backgroundColor: 'black', // Set the color of the dashes
  },
  space: {
    width: 2,
    height: 5,                // Adjust the height of the spaces
    backgroundColor: 'transparent', // Transparent background for spaces
  },


  dotView: {
    height: 10,
    width: 10,
    borderRadius: 50
  },
  processLine: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    height: 8,
    borderRadius:10,
    margin: 2
  },
  shadowView: {
    height: 16,
    width: 16,
    backgroundColor:"#4D4D4D",
    borderRadius: 50,
    // opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default styles;