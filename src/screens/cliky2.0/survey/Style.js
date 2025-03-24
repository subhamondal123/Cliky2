import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from '../../../enums';

const styles = StyleSheet.create({
    progessSection: {
        height: 70,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: "20%"

    },
    progressMainView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: "10%"
    },
    eachNumberCommonView: {
        justifyContent: 'center',
        alignItems: 'center',
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
        borderColor: Color.COLOR.RED.AMARANTH,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Color.COLOR.RED.AMARANTH,
    },
    lineView: {
        flex: 1,
        height: 2,
        backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
    },

    lineViewCompleted: {
        flex: 1,
        height: 2,
        backgroundColor: Color.COLOR.RED.AMARANTH,
    },

    numText: {
        height: 10,
        width: 10,
        resizeMode: "contain"
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