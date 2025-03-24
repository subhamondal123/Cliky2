import { StyleSheet } from "react-native";
import { Color } from "../../../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        flex: 1
    },

    canlenderSec: {
        height: 45,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    calenderImgSec: {
        borderStyle: 'solid',
        alignSelf: 'flex-end',
        height: 20,
        width: 20,
        bottom: 10
    },

    calenderLogo: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        right: 10
    },

    shadowBox: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 1,
        shadowColor: Color.COLOR.BLACK.PURE_BLACK,
        shadowOffset: 0.5,
        shadowOpacity: 0.5,
        marginTop: 10
    },

    marginView: {
        alignItems: 'flex-end'
    },

    cancelSec: {
        height: 20,
        width: 20,
        borderRadius: 14,
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5
    },

    cancelImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
});

export default styles;