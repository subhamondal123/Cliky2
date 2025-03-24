import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    circelBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        backgroundColor: '#E06336',
        borderRadius: 100
    },
    traingle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 30,
        borderTopWidth: 30,
        borderTopLeftRadius:10,
        borderRightColor: "transparent",
        borderTopColor: "red",
        transform: [{ rotate: "90deg" }],
        justifyContent: "center",
        alignItems: "center",
        top:-3
    },
   
})

export default styles;