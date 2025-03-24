import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color } from '../../../../../../enums';

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

    inputBoxStyle: {
        height: 45,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    inputBoxText: {
        fontSize: FontSize.SM,
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1
    },
    blueBox: {
        backgroundColor: Color.COLOR.RED.AMARANTH,
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: "center",
        // marginHorizontal:"5%",
        marginBottom: 10
    },
    blueViewFlex: {
        flexDirection: 'row',
        marginHorizontal: '5%'
    },
    listHeaderText: {
        fontSize: FontSize.MD,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    }
})

export default styles;