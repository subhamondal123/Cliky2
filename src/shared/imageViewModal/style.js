import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../enums";

const styles = StyleSheet.create({
    container: {
        height: Dimension.height ,
        flex: 1,
        width: Dimension.width ,
        justifyContent:"center",
        alignItems:"center"
    },
    imgView: {
        // flex: 1,
        height: Dimension.height - Dimension.height / 4,
        width: '100%',
        resizeMode: 'contain'
    },
    docView: {
        height: 100,
        width: 100,
        resizeMode: "contain"
    },
    imgSec: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius:15,
        backgroundColor: "#fff",
        width: Dimension.width / 1.5,
        height: Dimension.height / 2
    }
})

export default styles;