import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
    bottomTxt: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.XS,
        color: "#63677A",
    },
    mainImg: {
        height: 60,
        width: 60,
        resizeMode: "contain"
    }
})

export default styles;