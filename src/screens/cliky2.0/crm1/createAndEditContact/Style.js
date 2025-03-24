import { StyleSheet } from "react-native";
import { FontFamily, Color } from '../../../../enums';

const styles = StyleSheet.create({
    progessSection: {
        height: 70,
        // backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressMainView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: "10%"
    },
    eachNumberCommonView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: 1
    },
    numberCircle: {
        height: 25,
        width: 25,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,

    },
    numberCircleActive: {
        height: 25,
        width: 25,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Color.COLOR.RED.AMARANTH,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Color.COLOR.RED.AMARANTH,
    },
    numberCircleCompleted: {
        height: 25,
        width: 25,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Color.COLOR.GREEN.SEA_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Color.COLOR.GREEN.SEA_GREEN,
    },
    lineView: {
        flex: 1,
        height: 2,
        backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
    },
    lineViewActive: {
        flex: 1,
        height: 5,
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        borderRadius: 3
    },
    lineViewCompleted: {
        flex: 1,
        height: 2,
        backgroundColor: Color.COLOR.RED.AMARANTH,
    },
    numText: {
        // color: Color.COLOR.GRAY.DARK_GRAY_COLOR,
        // fontFamily: FontFamily.FONTS.INTER.BOLD,
        // fontSize: 16,
        // alignSelf: 'center',
        // textAlign: "center",
        height: 10,
        width: 10,
        resizeMode: "contain"
        // top: -3
    },
    numTextActive: {
        height: 10,
        width: 10,
        resizeMode: 'contain'
    },
    numTextCompleted: {
        // color: Color.COLOR.WHITE.PURE_WHITE,
        // fontFamily: FontFamily.FONTS.INTER.BOLD,
        // fontSize: 16,
        // alignSelf: 'center',
        // textAlign: "center",
        height: 10,
        width: 10,
        resizeMode: "contain"

        // top: -3
    },
    headerTxt: {
        color: Color.COLOR.BLACK.BLACK_PEARL,
        fontFamily: FontFamily.FONTS.INTER.EXTRA_BOLD,
        fontSize: 16,
    },
    headerSection: {
        justifyContent: "center",
        alignItems: "center",
        // flex:1
    }
})

export default styles;