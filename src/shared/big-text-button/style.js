import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from '../../enums';

const styles = StyleSheet.create({

    buttonView: {
        height: 55,
        borderRadius: 10
    },
    linearGradient: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.COLOR.BLUE.CAPRI
    },
    buttonText: {
        fontSize: FontSize.SM,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    }
})

export default styles;
