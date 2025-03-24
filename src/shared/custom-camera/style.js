import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, OtherSize, Dimension } from '../../enums/';

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "#ffffff",
        height: Dimension.height,
        width: Dimension.width
    },
    container: {
        flex: 1
    }
})

export default styles;