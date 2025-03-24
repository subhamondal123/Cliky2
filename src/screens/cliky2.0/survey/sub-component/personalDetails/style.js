import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from '../../../../../enums';

const styles = StyleSheet.create({
    container: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        marginHorizontal: "5%"
    },
    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.LG
    },
    labelText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        fontSize: FontSize.SM
    },

    blueBox: {
        backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS,
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 10
        // marginHorizontal:"2%"
    },
    blueViewFlex: {
        flexDirection: 'row',
        marginHorizontal: '5%'
    },

    listHeaderText: {
        fontSize: FontSize.MD,
        color: Color.COLOR.BLACK.BLACK_PEARL,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    }
})

export default styles;