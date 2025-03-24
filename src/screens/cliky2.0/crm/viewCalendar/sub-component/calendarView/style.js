import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },
    bodyView: {
        marginHorizontal: '5%'
    },
    calendarMainView: {
        borderColor: Color.COLOR.RED.AMARANTH,
        borderWidth: 1,
        shadowColor: Color.COLOR.GRAY.GRAY_COLOR,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 3,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 10,
        marginTop: '5%',
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2
    },
    listMainView: {
        shadowColor: Color.COLOR.GRAY.GRAY_COLOR,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 3,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 10,
        marginTop: '5%',
        flexDirection: 'row'
    },
    listFirstView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    timeText: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.WHITE.PURE_WHITE
    },
    listTextSection: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    bodyTextView: {
        flex: 1
    },
    bodyText: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.GRAY.DAVY_GRAY
    },
    bodyItemText: {
        paddingHorizontal: 10,
        paddingBottom: 5,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        color: Color.COLOR.GRAY.GRAY_COLOR
    },
    actionMainView: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionView: {
        height: 25,
        width: 25,
        backgroundColor: '#FFE142',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    editImg: {
        resizeMode: 'contain'
    },
    actionFilterView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionWeekView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Color.COLOR.GRAY.GRAY_COLOR,
        marginHorizontal: '5%',
        paddingVertical: 10
    },
    fliterImg: {
        resizeMode: 'contain',
        height: 25,
        width: 25
    },
});

export default styles;