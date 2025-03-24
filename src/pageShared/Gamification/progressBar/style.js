import { StyleSheet } from "react-native";
import { Color, FontFamily } from "../../../enums";

const styles = StyleSheet.create({
    container: {
        height: 10,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#f2f2f2',
        overflow: 'hidden',
        flexDirection: "row"
    },
    progress: {
        height: '100%',
    },
    percentageTxt: {
        fontSize: 12,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        color: Color.COLOR.WHITE.PURE_WHITE
    },
    remainingSec: {
        // flexWrap:"wrap",
        flexDirection: "row",
        // marginHorizontal:"10%",
        // justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"green",
        width: "100%"
    },
    activeSec:{
          alignItems: "center", 
          justifyContent: "center",
          marginRight:15 
    }
});

export default styles;