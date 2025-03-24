import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    mainSec: {
        borderRadius: 15,
        borderColor: "#D1D1D1",
        // backgroundColor: "#D1D1D1",
        borderWidth: 1,
        // flexDirection: "row",
        // flexWrap: "wrap",
        // width: 100,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center",
        marginHorizontal:2,
        paddingVertical:2
    },
    labelTxt: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.XS,
        color: "#63677A",
    },
    mainImg: {
        height: 16,
        width: 16,
        resizeMode: "contain"
    }
})

export default styles;